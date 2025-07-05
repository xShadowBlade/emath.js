/**
 * @file Declares the currency class and its related classes (upgrade)
 */
import "reflect-metadata";
import { Decimal, DecimalSource } from "../E/e";
import { Boost } from "./Boost";
import { MeanMode } from "./numericalAnalysis/numericalAnalysis";
import { UpgradeData, UpgradeStatic } from "./Upgrade";
import { ItemData, Item } from "./Item";
import type { UpgradeInit } from "./Upgrade";
import type { ItemInit } from "./Item";
import type { Pointer, IsPrimitiveString } from "../common/types";
interface CurrencyStaticResetOptions {
    resetCurrency: boolean;
    resetUpgradeLevels: boolean;
    resetItemAmounts: boolean;
    runUpgradeEffect: boolean;
}
/**
 * Represents the frontend READONLY for a currency. Useful for saving / data management.
 * Note: This class is created by default when creating a {@link CurrencyStatic} class. Use that instead as there are no methods here.
 */
declare class Currency {
    /** The current value of the currency. */
    value: Decimal;
    /** An array that represents upgrades and their levels. */
    upgrades: Record<string, UpgradeData>;
    /** An array that represents items and their effects. */
    items: Record<string, ItemData>;
    /**
     * Constructs a new currency object with an initial value of 0.
     */
    constructor();
}
/**
 * Represents the backend for a currency in the game.
 * All the functions are here instead of the `currency` class.
 * @template UpgradeIds - An string union that represents the names of the upgrades.
 * @template ItemIds - An string union that represents the names of the items.
 * @example
 * const currency = new CurrencyStatic();
 * currency.gain();
 * console.log(currency.value); // Decimal.dOne
 */
declare class CurrencyStatic<UpgradeIds extends string = string, ItemIds extends string = string> {
    /** An array that represents upgrades */
    readonly upgrades: Record<UpgradeIds, UpgradeStatic>;
    /** An array that represents items and their effects. */
    readonly items: Record<ItemIds, Item>;
    /** A function that returns the pointer of the data */
    protected readonly pointerFn: () => Currency;
    /** @returns The pointer of the data. */
    protected get pointer(): Currency;
    /** A boost object that affects the currency gain. */
    readonly boost: Boost;
    /** The default value of the currency. */
    readonly defaultVal: Decimal;
    /** The default boost of the currency. */
    readonly defaultBoost: Decimal;
    /**
     * The current value of the currency.
     * Note: If you want to change the value, use {@link gain} instead.
     * @returns The current value of the currency.
     */
    get value(): Decimal;
    set value(value: Decimal);
    /**
     * Constructs a new currency
     * @param pointer - A function or reference that returns the pointer of the data / frontend.
     * @param upgrades - An array of upgrade objects.
     * @param items - An array of item objects.
     * @param defaults - The default value and boost of the currency.
     * @example
     * const currency = new CurrencyStatic(undefined, [
     *     {
     *         id: "upgId1",
     *         cost: (level: Decimal): Decimal => level.mul(10),
     *     },
     *     {
     *         id: "upgId2",
     *         cost: (level: Decimal): Decimal => level.mul(20),
     *     }
     * ] as const satisfies UpgradeInit[]);
     * // CurrencyStatic<["upgId1", "upgId2"]>
     */
    constructor(pointer?: Pointer<Currency>, upgrades?: UpgradeInit<UpgradeIds>[], items?: ItemInit<ItemIds>[], defaults?: {
        defaultVal: Decimal;
        defaultBoost: Decimal;
    });
    /**
     * Updates / applies effects to the currency on load.
     */
    onLoadData(): void;
    /**
     * Resets the currency and upgrade levels.
     * @param resetCurrency - Whether to reset the currency value. Default is true.
     * @param resetUpgradeLevels - Whether to reset the upgrade levels. Default is true.
     * @param runUpgradeEffect - Whether to run the upgrade effect. Default is true.
     * @example
     * currency.reset();
     * console.log(currency.value); // Decimal.dZero, or the default value
     */
    reset(resetCurrency?: boolean, resetUpgradeLevels?: boolean, runUpgradeEffect?: boolean): void;
    reset(reset?: Partial<CurrencyStaticResetOptions>): void;
    /**
     * The new currency value after applying the boost.
     * @param dt - Delta time / multiplier in milliseconds, assuming you gain once every second. Ex. 500 = 0.5 seconds = half gain.
     * @returns What was gained, NOT the new value.
     * @example
     * // Gain a random number between 1 and 10, and return the amount gained.
     * currency.gain(Math.random() * 10000);
     */
    gain(dt?: DecimalSource): Decimal;
    /**
     * Adds an upgrade to the data class.
     * @param upgrades - Upgrade to add
     * @returns The upgrade object.
     */
    private pointerAddUpgrade;
    /**
     * Retrieves an upgrade object from the data pointer based on the provided id.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object if found, otherwise null.
     */
    private pointerGetUpgrade;
    /**
     * Retrieves an upgrade object based on the provided id.
     * @template T - The type of the upgrade ID.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object if found, otherwise null.
     * @example
     * const upgrade = currency.getUpgrade("healthBoost");
     * console.log(upgrade); // upgrade object
     */
    getUpgrade<T extends UpgradeIds>(id: T): IsPrimitiveString<UpgradeIds> extends false ? UpgradeStatic : UpgradeStatic | null;
    /**
     * Queries upgrades based on the provided id. Returns an array of upgrades that match the id.
     * @param id - The id of the upgrade to query.
     * @returns An array of upgrades that match the id.
     * @example
     * const currency = new CurrencyStatic(undefined, [
     *     { id: "healthBoostSmall", cost: (level) => level.mul(10) },
     *     { id: "healthBoostLarge", cost: (level) => level.mul(20) },
     *     { id: "damageBoostSmall", cost: (level) => level.mul(10) },
     *     { id: "damageBoostLarge", cost: (level) => level.mul(20) },
     * ] as const satisfies UpgradeInit[]);
     *
     * // Get all health upgrades
     * const healthUpgrades = currency.queryUpgrade(/health/); // [{ id: "healthBoostSmall", ... }, { id: "healthBoostLarge", ... }]
     *
     * // Get all small upgrades
     * const smallUpgrades = currency.queryUpgrade(["healthBoostSmall", "damageBoostSmall"]);
     * // or
     * const smallUpgrades2 = currency.queryUpgrade(/.*Small/);
     */
    queryUpgrade(id: UpgradeIds | UpgradeIds[] | RegExp): UpgradeStatic[];
    /**
     * Creates upgrades. To update an upgrade, use {@link updateUpgrade} instead.
     * @param upgrades - An array of upgrade objects.
     * @param runEffectInstantly - Whether to run the effect immediately. Defaults to `true`.
     * @returns The added upgrades.
     * @example
     * currency.addUpgrade({
     *     id: "healthBoost", // The ID of the upgrade, used to retrieve it later
     *     name: "Health Boost", // The name of the upgrade, for display purposes (optional, defaults to the ID)
     *     description: "Increases health by 10.", // The description of the upgrade, for display purposes (optional, defaults to "")
     *     cost: (level) => level.mul(10), // Cost of the upgrade, 10 times the level
     *     maxLevel: 10, // Maximum level of the upgrade (optional, defaults to 1)
     *     // Effect of the upgrade (runs when the upgrade is bought, and instantly if runEffectInstantly is true)
     *     effect: (level, context) => {
     *         // Set / update the boost
     *         // health: currencyStatic
     *         health.boost.setBoost(
     *             "healthBoost",
     *             "Health Boost",
     *             "Boosts health by 2x per level.",
     *             n => n.mul(Decimal.pow(2, level.sub(1))),
     *             2,
     *         );
     *     }
     * });
     */
    addUpgrade(upgrades: UpgradeInit | UpgradeInit[], runEffectInstantly?: boolean): UpgradeStatic[];
    /**
     * Updates an upgrade. To create an upgrade, use {@link addUpgrade} instead.
     * @param id - The id of the upgrade to update.
     * @param newUpgrade - The new upgrade object.
     * @example
     * currency.updateUpgrade("healthBoost", {
     *     name: "New Health Boost".
     *     cost: (level) => level.mul(20),
     *     maxLevel: 20,
     *     effect: (level, context) => {
     *         console.log("Health Boost effect");
     *     }
     * });
     */
    updateUpgrade(id: UpgradeIds, newUpgrade: Partial<UpgradeInit>): void;
    /**
     * Runs the effect of an upgrade or item.
     * @param upgrade - The upgrade to run the effect for.
     */
    runUpgradeEffect(upgrade: UpgradeStatic): void;
    /**
     * Runs the effect of an upgrade or item.
     * @param item - The item to run the effect for.
     * @param tier - The tier of the item that was bought.
     */
    runItemEffect(item: Item, tier?: DecimalSource): void;
    /**
     * Calculates the cost and how many upgrades you can buy.
     * See {@link calculateUpgrade} for more information.
     * @param id - The ID or position of the upgrade to calculate.
     * @param target - The target level or quantity to reach for the upgrade. If omitted, it calculates the maximum affordable quantity.
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns The amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [Decimal.dZero, Decimal.dZero].
     * @example
     * // Calculate how many healthBoost upgrades you can buy and the cost of the upgrades
     * const [amount, cost] = currency.calculateUpgrade("healthBoost", 10);
     */
    calculateUpgrade(id: UpgradeIds, target?: DecimalSource, mode?: MeanMode, iterations?: number): [amount: Decimal, cost: Decimal];
    /**
     * Calculates how much is needed for the next upgrade.
     * @deprecated Use {@link getNextCostMax} instead as it is more versatile.
     * @param id - Index or ID of the upgrade
     * @param target - How many before the next upgrade
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns The cost of the next upgrade.
     * @example
     * // Calculate the cost of the next healthBoost upgrade
     * const nextCost = currency.getNextCost("healthBoost");
     */
    getNextCost(id: UpgradeIds, target?: DecimalSource, mode?: MeanMode, iterations?: number): Decimal;
    /**
     * Calculates the cost of the next upgrade after the maximum affordable quantity.
     * @param id - Index or ID of the upgrade
     * @param target - How many before the next upgrade
     * @param mode  - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns The cost of the next upgrade.
     * @example
     * // Calculate the cost of the next healthBoost upgrade
     * currency.gain(1e6); // Gain 1 thousand currency
     * console.log(currency.calculateUpgrade("healthBoost")); // The maximum affordable quantity and the cost of the upgrades. Ex. [new Decimal(100), new Decimal(1000)]
     * console.log(currency.getNextCostMax("healthBoost")); // The cost of the next upgrade after the maximum affordable quantity. (The cost of the 101st upgrade)
     */
    getNextCostMax(id: UpgradeIds, target?: DecimalSource, mode?: MeanMode, iterations?: number): Decimal;
    /**
     * Buys an upgrade based on its ID or array position if enough currency is available.
     * @param id - The ID or position of the upgrade to buy or upgrade.
     * @param target - The target level or quantity to reach for the upgrade. See the argument in {@link calculateUpgrade}.
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
     * @example
     * // Attempt to buy up to 10 healthBoost upgrades at once
     * currency.buyUpgrade("healthBoost", 10);
     */
    buyUpgrade(id: UpgradeIds, target?: DecimalSource, mode?: MeanMode, iterations?: number): boolean;
    /**
     * Adds an item to the data class.
     * @param items - The items to add.
     * @returns The added items.
     */
    private pointerAddItem;
    /**
     * Retrieves an item object from the data pointer based on the provided id.
     * @param id - The id of the item to retrieve.
     * @returns The item object if found, otherwise null.
     */
    private pointerGetItem;
    /**
     * Adds an item.
     * @param items - The items to add.
     * @param runEffectInstantly - Whether to run the effect immediately. Defaults to `true`.
     */
    addItem(items: ItemInit | ItemInit[], runEffectInstantly?: boolean): void;
    /**
     * Retrieves an item object based on the provided id.
     * @param id - The id of the item to retrieve.
     * @returns The item object if found, otherwise null.
     */
    getItem<T extends ItemIds>(id: T): IsPrimitiveString<ItemIds> extends false ? Item : Item | null;
    /**
     * Calculates the cost and how many items you can buy.
     * See {@link calculateItem} for more information.
     * @param id - The ID or position of the item to calculate.
     * @param tier - The tier of the item that to calculate.
     * @param target - The target level or quantity to reach for the item. If omitted, it calculates the maximum affordable quantity.
     * @returns The amount of items you can buy and the cost of the items. If you can't afford any, it returns [Decimal.dZero, Decimal.dZero].
     */
    calculateItem(id: ItemIds, tier?: DecimalSource, target?: DecimalSource): [amount: Decimal, cost: Decimal];
    /**
     * Buys an item based on its ID or array position if enough currency is available.
     * @param id - The ID or position of the item to buy or upgrade.
     * @param tier - The tier of the item that to calculate.
     * @param target - The target level or quantity to reach for the item. See the argument in {@link calculateItem}.
     * @returns Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the item does not exist.
     */
    buyItem(id: ItemIds, tier?: DecimalSource, target?: DecimalSource): boolean;
}
export { Currency, CurrencyStatic };
