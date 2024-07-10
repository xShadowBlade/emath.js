/**
 * @file Declares the Item class and related types.
 */
import "reflect-metadata";
import { Type, Expose } from "class-transformer";
import { Decimal, DecimalSource } from "../E/e";
import type { Pointer } from "../common/types";
import type { CurrencyStatic } from "./Currency";
import type { UpgradeInitArrayType } from "./Upgrade";

/**
 * Calculates the cost and how many items you can buy.
 * @param value - The current value of the currency.
 * @param item - The item object to calculate.
 * @param tier - The tier of the item to buy. Defaults to 1.
 * @param target - The target quantity to reach for the item. If not provided, it will buy the maximum amount of items possible (using target = Infinity).
 * @returns [amount, cost] - Returns the amount of items you can buy and the cost of the items. If you can't afford any, it returns [Decimal.dZero, Decimal.dZero].
 */
function calculateItem (
    value: DecimalSource,
    item: Item,
    tier: DecimalSource = Decimal.dOne,
    target: DecimalSource = Decimal.dInf,
): [amount: Decimal, cost: Decimal] {
    // Normalize the values
    value = new Decimal(value);
    tier = new Decimal(tier);
    target = new Decimal(target);

    // Special case: If target is less than 1, just return 0
    if (target.lt(0)) {
        console.warn("calculateItem: Invalid target: ", target);
        return [Decimal.dZero, Decimal.dZero];
    }

    // Special case: If target is 1, just check it manually
    if (target.eq(1)) {
        const cost = item.cost(tier);
        return [value.gte(cost) ? Decimal.dOne : Decimal.dZero, value.gte(cost) ? cost : Decimal.dZero];
    }

    // no need to do binary search just divide lol
    const maxLevelAffordable = value.div(item.cost(tier)).floor().min(target);
    const cost = item.cost(tier).mul(maxLevelAffordable);

    return [maxLevelAffordable, cost];
}

/**
 * An interface for an item. An item is a type of upgrade that does not have a level. Ex. A potion that gives you 10 gold.
 */
interface ItemInit {
    /**
     * The ID of the item.
     * Used to retrieve the item later.
     */
    readonly id: string;

    /** The name of the item. Defaults to the ID. */
    name?: string;

    /**
     * The description of the item.
     * Can be a string or a function that returns a string.
     * @param level - The current level of the item.
     * @param itemContext - The item object that the description is being run on.
     * @param currencyContext - The currency static class that the item is being run on.
     * @example
     * // A dynamic description that returns a string
     * const description = (a, b) => `This is a ${a} that returns a ${b}`;
     *
     * // ... create item here (see currencyStatic.addUpgrade)
     *
     * const item = currencyStatic.getUpgrade("itemID");
     *
     * // Getter property
     * console.log(item.description); // "This is a undefined that returns a undefined"
     *
     * // Getter function
     * console.log(item.descriptionFn("dynamic", "string")); // "This is a dynamic that returns a string"
     */
    description?: ((level: Decimal, itemContext: Item, currencyContext: CurrencyStatic) => string) | string;

    /**
     * The cost of items at a certain level.
     * @param level - The level that the cost is being calculated for.
     * @returns The cost of the item. It should be a non-negative integer greater than or equal to 0.
     * @example
     * // An item that costs 10 times the level
     * (level) => level.mul(10);
     */
    cost: ((level: Decimal) => Decimal);

    /**
     * The effect of the item. This runs when the item is bought, and instantly if `runEffectInstantly` is true.
     * @param tier - The tier of the item that was bought.
     * @param amount - The amount of the item currently owned.
     * @param itemContext - The item object that the effect is being run on.
     * @param currencyContext - The currency static class that the item is being run on.
     */
    effect?: (tier: Decimal, amount: Decimal, itemContext: Item, currencyContext: CurrencyStatic) => void;

    // Below are types that are automatically added
    /**
     * The default amount of the item.
     * Automatically set to `0` if not provided.
     * @deprecated This does not account for items that were bought on different tiers. You should use your own amount system.
     */
    amount?: Decimal;
}

/**
 * Infers the id type of an item array. See {@link UpgradeInitArrayType}
 * @template I - The item array
 */
type ItemInitArrayType<I extends Readonly<ItemInit>[]> = I[number]["id"] extends never ? string : I[number]["id"];

/**
 * Represents an item.
 */
class Item implements ItemInit {
    public id; name; cost; effect;

    public defaultAmount = Decimal.dZero;

    /** @returns The data of the item. */
    private dataPointerFn: () => ItemData;

    /** @returns The data of the item. */
    public get data (): ItemData {
        return this.dataPointerFn();
    }

    /** @returns The currency static class that the item is being run on. */
    protected currencyPointerFn: () => CurrencyStatic;

    /** The description of the item as a function. */
    private descriptionFn: Exclude<ItemInit["description"], string | undefined>;

    public get description (): string {
        return this.descriptionFn(this.amount, this, this.currencyPointerFn());
    }
    public set description (value: Exclude<ItemInit["description"], undefined>) {
        this.descriptionFn = typeof value === "function" ? value : (): string => value;
    }

    /**
     * The amount of the item that was bought.
     * @deprecated This does not account for items that were bought on different tiers.
     * @returns The amount of the item that was bought.
     */
    get amount (): Decimal {
        // many fallbacks for some reason
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        return ((this ?? { data: { amount: Decimal.dOne } }).data ?? { amount: Decimal.dOne }).amount;
    }
    set amount (n: DecimalSource) {
        this.data.amount = new Decimal(n);
    }

    /**
     * Creates a new item.
     * @param init - The initialization data for the item.
     * @param dataPointer - The pointer to the data of the item.
     * @param currencyPointer - The pointer to the currency static class that the item is being run on.
     */
    constructor (init: ItemInit, dataPointer: Pointer<ItemData>, currencyPointer: Pointer<CurrencyStatic>) {
        const data = (typeof dataPointer === "function" ? dataPointer() : dataPointer);
        this.dataPointerFn = typeof dataPointer === "function" ? dataPointer : (): ItemData => data;
        this.currencyPointerFn = typeof currencyPointer === "function" ? currencyPointer : (): CurrencyStatic => currencyPointer;

        this.id = init.id;
        this.name = init.name ?? init.id;
        this.cost = init.cost;
        this.effect = init.effect;
        this.descriptionFn = init.description ? (typeof init.description === "function" ? init.description : (): string => init.description as string) : (): string => "";
        this.defaultAmount = init.amount ?? Decimal.dZero;

    };
}

/**
 * The data of an item.
 */
type IItemData = Pick<ItemInit, "id" | "amount">;

/**
 * Represents the frontend for an item.
 */
class ItemData implements IItemData {
    @Expose() public id: string;
    @Type(() => Decimal) public amount;

    constructor (init: IItemData) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        init = init ?? {}; // class-transformer bug

        this.id = init.id;
        this.amount = init.amount ?? Decimal.dZero;
    }
}

export { Item, ItemData, calculateItem };
export type { ItemInit, IItemData, ItemInitArrayType };
