/**
 * @file Declares the currency class and its related classes (upgrade)
 */
import "reflect-metadata";
import { E, ESource } from "../E/eMain";
import { Decimal } from "../E/e";
import type { Pointer } from "../game/Game";
import { Boost } from "./Boost";
import { MeanMode } from "./numericalAnalysis";
import { UpgradeData, UpgradeStatic, UpgradeInit } from "./Upgrade";
/**
 * Represents the frontend READONLY for a currency. Useful for saving / data management.
 * Note: This class is created by default when creating a {@link CurrencyStatic} class. Use that instead as there are no methods here.
 */
declare class Currency {
    /** The current value of the currency. */
    value: E;
    /** An array that represents upgrades and their levels. */
    upgrades: Record<string, UpgradeData>;
    /**
     * Constructs a new currency object with an initial value of 0.
     */
    constructor();
}
/**
 * Represents the backend for a currency in the game.
 * All the functions are here instead of the `currency` class.
 * @template U - An array that represents the names of the upgrades.
 * @example
 * const currency = new currencyStatic();
 * currency.gain();
 * console.log(currency.value); // E(1)
 */
declare class CurrencyStatic<U extends string[] = string[]> {
    /** An array that represents upgrades, their costs, and their effects. */
    readonly upgrades: Record<U[number] | string, UpgradeStatic<U[number]>>;
    /** A function that returns the pointer of the data */
    protected readonly pointerFn: (() => Currency);
    /** @returns The pointer of the data. */
    protected get pointer(): Currency;
    /** A boost object that affects the currency gain. */
    readonly boost: Boost;
    /** The default value of the currency. */
    readonly defaultVal: E;
    /** The default boost of the currency. */
    readonly defaultBoost: E;
    /**
     * The current value of the currency.
     * Note: If you want to change the value, use {@link gain} instead.
     * @returns The current value of the currency.
     */
    get value(): E;
    set value(value: E);
    /**
     * @param pointer - A function or reference that returns the pointer of the data / frontend.
     * @param upgrades - An array of upgrade objects.
     * @param defaults - The default value and boost of the currency.
     */
    constructor(pointer?: Pointer<Currency>, upgrades?: UpgradeInit<U[number]>[], defaults?: {
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
     * console.log(currency.value); // E(0), or the default value
     */
    reset(resetCurrency?: boolean, resetUpgradeLevels?: boolean, runUpgradeEffect?: boolean): void;
    /**
     * The new currency value after applying the boost.
     * @param dt - Deltatime / multipler in milliseconds, assuming you gain once every second. Ex. 500 = 0.5 seconds = half gain.
     * @returns What was gained, NOT the new value.
     * @example
     * // Gain a random number between 1 and 10, and return the amount gained.
     * currency.gain(Math.random() * 10000);
     */
    gain(dt?: ESource): E;
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
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object if found, otherwise null.
     * @example
     * const upgrade = currency.getUpgrade("healthBoost");
     * console.log(upgrade); // upgrade object
     */
    getUpgrade(id: string | U[number]): typeof id extends U[number] ? UpgradeStatic<U[number]> : UpgradeStatic<U[number]> | null;
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
     *             n => n.mul(E.pow(2, level.sub(1))),
     *             2,
     *         );
     *     }
     * });
     */
    addUpgrade(upgrades: UpgradeInit | UpgradeInit[], runEffectInstantly?: boolean): UpgradeStatic[];
    /**
     * Updates an upgrade. To create an upgrade, use {@link addUpgrade} instead.
     * @param id - The id of the upgrade to update.
     * @param upgrade - The upgrade object to update.
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
    updateUpgrade(id: string, upgrade: Partial<UpgradeInit>): void;
    /**
     * Calculates the cost and how many upgrades you can buy.
     * See {@link calculateUpgrade} for more information.
     * @param id - The ID or position of the upgrade to calculate.
     * @param target - The target level or quantity to reach for the upgrade. If omitted, it calculates the maximum affordable quantity.
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns The amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [E(0), E(0)].
     * @example
     * // Calculate how many healthBoost upgrades you can buy and the cost of the upgrades
     * const [amount, cost] = currency.calculateUpgrade("healthBoost", 10);
     */
    calculateUpgrade(id: string, target?: ESource, mode?: MeanMode, iterations?: number): [amount: E, cost: E];
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
    getNextCost(id: string, target?: ESource, mode?: MeanMode, iterations?: number): E;
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
     * console.log(currency.calculateUpgrade("healthBoost")); // The maximum affordable quantity and the cost of the upgrades. Ex. [E(100), E(1000)]
     * console.log(currency.getNextCostMax("healthBoost")); // The cost of the next upgrade after the maximum affordable quantity. (The cost of the 101st upgrade)
     */
    getNextCostMax(id: string, target?: ESource, mode?: MeanMode, iterations?: number): E;
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
    buyUpgrade(id: string, target?: ESource, mode?: MeanMode, iterations?: number): boolean;
}
export { Currency, CurrencyStatic };
