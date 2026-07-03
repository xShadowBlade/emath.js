/**
 * @file Declares the currency class and its related classes (upgrade)
 */
import "reflect-metadata";
import { Decimal, DecimalSource } from "../E/e";
import { Boost } from "./Boost";
import { MeanMode } from "./numericalAnalysis/numericalAnalysis";
import { SkillNode, Upgrade } from "./Upgrade";
import type { DataManager, StaticClassWithData } from "../game";
import { InvalidDecimalProtections } from "./InvalidDecimalProtections";
import { SubscribableDataEntry } from "../game/managers/DataEntry";
interface CurrencyStaticResetOptions {
    resetCurrency: boolean;
    resetUpgradeLevels: boolean;
    resetItemAmounts: boolean;
    runUpgradeEffect: boolean;
}
/**
 * Represents the frontend READONLY for a currency. Useful for saving / data management.
 * Note: This class is created by default when creating a {@link Currency} class. Use that instead as there are no methods here.
 */
declare class CurrencyData {
    /** The current value of the currency. */
    value: Decimal;
    /**
     * Constructs a new currency object with an initial value of 0.
     */
    constructor();
}
/**
 * Represents the backend for a currency in the game.
 * All the functions are here instead of the `currency` class.
 * @example
 * const currency = new Currency();
 * currency.gain();
 * console.log(currency.value); // Decimal.dOne
 */
declare class Currency implements StaticClassWithData {
    readonly id: string;
    /**
     * Stores a list of each of this currency's upgrades and their corresponding data.
     */
    readonly upgrades: Upgrade[];
    /** A function that returns the pointer of the data */
    protected dataSupplier: () => CurrencyData;
    /** @returns The pointer of the data. */
    protected get data(): CurrencyData;
    /** A boost object that affects the currency gain. */
    readonly boost: Boost;
    /** The default value of the currency. */
    readonly defaultValue: Decimal;
    /**
     * The protections for {@link value}.
     * See {@link InvalidDecimalProtections}.
     */
    readonly valueProtections: InvalidDecimalProtections;
    /**
     * The current value of the currency.
     * Note: If you want to change the value, use {@link gain} instead.
     * @returns The current value of the currency.
     */
    get value(): Decimal;
    set value(value: DecimalSource);
    readonly valueDataEntry: SubscribableDataEntry<Decimal>;
    private dataManagerReference;
    /**
     * Creates a new currency with the given id.
     * @param id - The id of the currency. See {@link id}.
     */
    constructor(id: string);
    /**
     * Updates / applies effects to the currency on load.
     */
    onLoadData(): void;
    onAddToDataManager(dataManager: DataManager): void;
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
     * @param dt - Delta time / multiplier, assuming you gain once every second. Ex. 0.5 = half gain.
     * @returns What was gained, NOT the new value.
     * @example
     * // Gain a random number between 1 and 10, and return the amount gained.
     * currency.gain(Math.random() * 10);
     */
    gain(dt?: DecimalSource): Decimal;
    /**
     * Retrieves an upgrade object based on the provided id.
     * @template T - The type of the upgrade ID.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object if found, otherwise null.
     * @example
     * const upgrade = currency.getUpgrade("healthBoost");
     * console.log(upgrade); // upgrade object
     */
    getUpgrade(id: string): Upgrade | null;
    getUpgradeAsSkillNode(id: string): SkillNode | null;
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
    addUpgrade(upgrade: Upgrade, runEffectInstantly?: boolean): Upgrade;
    addUpgrades(upgrades: Upgrade[], runEffectInstantly?: boolean): Upgrade[];
    /**
     * Runs the effect of an upgrade or item.
     * @param upgrade - The upgrade to run the effect for.
     */
    runUpgradeEffect(upgrade: Upgrade): void;
    /**
     * Runs the effect on add of an upgrade or item.
     * @param upgrade - The upgrade to run the effect on add for.
     */
    runUpgradeEffectOnAdd(upgrade: Upgrade): void;
    private getUpgradeOrElse;
    /**
     * Calculates the cost and how many upgrades you can buy.
     * See {@link calculateUpgrade} for more information.
     * @param id - The upgrade ID or the upgrade to calculate.
     * @param target - The target level or quantity to reach for the upgrade. If omitted, it calculates the maximum affordable quantity.
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @param value - The value of the currency to use for the calculation. Defaults to the current value of the currency.
     * @returns The amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [Decimal.dZero, Decimal.dZero].
     * @example
     * // Calculate how many healthBoost upgrades you can buy and the cost of the upgrades
     * const [amount, cost] = currency.calculateUpgrade("healthBoost", 10);
     */
    calculateUpgrade(id: string | Upgrade, target?: DecimalSource, mode?: MeanMode, iterations?: number, value?: DecimalSource): [newLevelToSetTo: Decimal, cost: Decimal];
    /**
     * Calculates how much is needed for the next upgrade.
     * @deprecated Use {@link getNextCostMax} instead as it is more versatile.
     * @param id - Index or ID of the upgrade
     * @param target - How many before the next upgrade
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @param value - The value of the currency to use for the calculation. Defaults to the current value of the currency.
     * @returns The cost of the next upgrade.
     * @example
     * // Calculate the cost of the next healthBoost upgrade
     * const nextCost = currency.getNextCost("healthBoost");
     */
    getNextCost(id: string | Upgrade): Decimal;
    /**
     * Calculates the cost of the next upgrade after the maximum affordable quantity.
     * @param id - Upgrade ID or upgrade object to calculate the next cost for.
     * @param target - How many before the next upgrade.
     * @param mode  - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @param value - The value of the currency to use for the calculation. Defaults to the current value of the currency.
     * @returns The cost of the next upgrade.
     * @example
     * // Calculate the cost of the next healthBoost upgrade
     * currency.gain(1e6); // Gain 1 thousand currency
     * console.log(currency.calculateUpgrade("healthBoost")); // The maximum affordable quantity and the cost of the upgrades. Ex. [new Decimal(100), new Decimal(1000)]
     * console.log(currency.getNextCostMax("healthBoost")); // The cost of the next upgrade after the maximum affordable quantity. (The cost of the 101st upgrade)
     */
    getNextCostMax(id: string | Upgrade, target?: DecimalSource, mode?: MeanMode, iterations?: number, value?: DecimalSource): Decimal;
    /**
     * Buys an upgrade based on its ID or array position if enough currency is available.
     * @param id - The upgrade ID or the upgrade to buy.
     * @param target - The target level or quantity to reach for the upgrade. See the argument in {@link calculateUpgrade}.
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @param value - The value of the currency to use for the calculation. Defaults to the current value of the currency.
     * @returns Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
     * @example
     * // Attempt to buy up to 10 healthBoost upgrades at once
     * currency.buyUpgrade("healthBoost", 10);
     */
    buyUpgrade(id: string | Upgrade, target?: DecimalSource, mode?: MeanMode, iterations?: number, value?: DecimalSource): boolean;
    withValueProtectionOptions(newValueProtections: Parameters<InvalidDecimalProtections["setProtections"]>[0]): this;
}
export { CurrencyData, Currency };
