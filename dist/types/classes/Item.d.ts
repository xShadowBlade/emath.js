/**
 * @file Declares the Item class and related types.
 */
import "reflect-metadata";
import { Decimal, DecimalSource } from "../E/e";
import type { Pointer } from "../common/types";
import type { CurrencyStatic } from "./Currency";
/**
 * Calculates the cost and how many items you can buy.
 * @param value - The current value of the currency.
 * @param item - The item object to calculate.
 * @param target - The target quantity to reach for the item. If not provided, it will buy the maximum amount of items possible (using target = Infinity).
 * @returns [amount, cost] - Returns the amount of items you can buy and the cost of the items. If you can't afford any, it returns [Decimal.dZero, Decimal.dZero].
 */
declare function calculateItem(value: DecimalSource, item: Item, target?: DecimalSource): [amount: Decimal, cost: Decimal];
/**
 * An interface for an item. An item is a type of upgrade that does not have a level. Ex. A potion that gives you 10 gold.
 */
interface ItemInit {
    /**
     * The ID of the upgrade.
     * Used to retrieve the upgrade later.
     */
    readonly id: string;
    /** The name of the upgrade. Defaults to the ID. */
    name?: string;
    /**
     * The description of the upgrade.
     * Can be a string or a function that returns a string.
     * @param level - The current level of the upgrade.
     * @param itemContext - The upgrade object that the description is being run on.
     * @param currencyContext - The currency static class that the upgrade is being run on.
     * @example
     * // A dynamic description that returns a string
     * const description = (a, b) => `This is a ${a} that returns a ${b}`;
     *
     * // ... create upgrade here (see currencyStatic.addUpgrade)
     *
     * const upgrade = currencyStatic.getUpgrade("upgradeID");
     *
     * // Getter property
     * console.log(upgrade.description); // "This is a undefined that returns a undefined"
     *
     * // Getter function
     * console.log(upgrade.descriptionFn("dynamic", "string")); // "This is a dynamic that returns a string"
     */
    description?: ((level: Decimal, itemContext: Item, currencyContext: CurrencyStatic) => string) | string;
    /**
     * The cost of upgrades at a certain level.
     * This function should evaluate to a non-negative number, and should be deterministic and continuous for all levels above 0.
     * Also, if you do not set your own `costBulk` function, the function should always be greater than the level.
     * @param level - The CURRENT (not next) level of the upgrade. It will always be a positive integer.
     * @returns The cost of the upgrade. It should be a non-negative integer greater than or equal to 0.
     * @example
     * // An item that costs 10.
     * () => new Decimal(10)
     */
    cost: (() => Decimal);
    /**
     * The effect of the item. This runs when the item is bought, and instantly if `runEffectInstantly` is true.
     * @param amount - The amount of the item that was bought.
     * @param itemContext - The item object that the effect is being run on.
     * @param currencyContext - The currency static class that the item is being run on.
     */
    effect?: (amount: Decimal, itemContext: Item, currencyContext: CurrencyStatic) => void;
    /**
     * The default amount of the item.
     * Automatically set to `0` if not provided.
     */
    amount?: Decimal;
}
/**
 * Represents an item.
 */
declare class Item implements ItemInit {
    id: string;
    name: string;
    cost: () => Decimal;
    effect: ((amount: Decimal, itemContext: Item, currencyContext: CurrencyStatic) => void) | undefined;
    defaultAmount: Decimal;
    /** @returns The data of the item. */
    private dataPointerFn;
    /** @returns The data of the item. */
    get data(): ItemData;
    /** @returns The currency static class that the upgrade is being run on. */
    protected currencyPointerFn: () => CurrencyStatic;
    /** The description of the upgrade as a function. */
    private descriptionFn;
    get description(): string;
    set description(value: Exclude<ItemInit["description"], undefined>);
    /**
     * The amount of the item that was bought.
     * @returns The amount of the item that was bought.
     */
    get amount(): Decimal;
    set amount(n: DecimalSource);
    /**
     * Creates a new item.
     * @param init - The initialization data for the item.
     * @param dataPointer - The pointer to the data of the item.
     * @param currencyPointer - The pointer to the currency static class that the item is being run on.
     */
    constructor(init: ItemInit, dataPointer: Pointer<ItemData>, currencyPointer: Pointer<CurrencyStatic>);
}
/**
 * The data of an item.
 */
type IItemData = Pick<ItemInit, "id" | "amount">;
/**
 * Represents the frontend for an item.
 */
declare class ItemData implements IItemData {
    id: string;
    amount: Decimal;
    constructor(init: IItemData);
}
export { Item, ItemData, calculateItem };
export type { ItemInit, IItemData };
