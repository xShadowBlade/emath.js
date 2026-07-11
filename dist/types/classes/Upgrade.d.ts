import "reflect-metadata";
import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";
import { DataManager, StaticClassWithData, SubscribableDataEntry } from "../game";
import { Currency } from "./Currency";
import { InvalidDecimalProtections } from "./InvalidDecimalProtections";
import type { MeanMode } from "./numericalAnalysis/numericalAnalysis";
import { LowerCachedUpgradeLookup } from "./UpgradeCostTreeMap";
/**
 * Stores the data for an upgrade.
 */
declare class UpgradeData {
    /**
     * A placeholder readonly upgrade data object that returns a level of 0.
     */
    static readonly placeholderUpgradeData: UpgradeData;
    /**
     * The current level of the upgrade.
     */
    level: Decimal;
}
/**
 * The result returned by {@link Upgrade.calculate}.
 * An array with the first element being the new level to set to, and the second element being the cost of the upgrades.
 */
type UpgradeCalculationResult = [newLevelToSetTo: Decimal, cost: Decimal];
/**
 * An upgrade that can be purchased with a currency.
 */
declare class Upgrade implements StaticClassWithData {
    /**
     * A helper function to generate a costBulk function for upgrades with a non-scaling cost (cost is independent of the level).
     * @param cost - The cost of the upgrade.
     * @returns A costBulk function that can be used in the upgrade object.
     */
    static getCostBulkForNonScalingUpgrade(cost: DecimalSource): typeof Upgrade.prototype.costBulk;
    /**
     * The ID of the upgrade.
     * Used to retrieve the upgrade when its data is stored in the data manager.
     */
    readonly id: string;
    /**
     * The name of the upgrade. Defaults to the ID.
     */
    name: string;
    /**
     * The cost of upgrades at a certain level.
     * - Should evaluate to a non-negative number for all levels above 0.
     * - Should be continuous for all levels above {@link lowerCache}'s {@link LowerCachedUpgradeLookup.getMaxLevel}. Non integer arguments to {@link level} will be passed to this function when calculating above the lower cache levels.
     * - Should be deterministic for cache calculations to work. If the cost function is not deterministic (not recommended), you should disable the cache by calling {@link withCacheSize} with `null` as the argument.
     *
     * Also, if you do not set your own `costBulk` function, the function should always be greater than the level.
     * @param level - The CURRENT (not next) level of the upgrade.
     * @returns The cost of the upgrade.
     * @example
     * // A cost function that returns twice the level.
     * (level) => level.mul(2)
     */
    cost: (level: Decimal) => Decimal;
    /**
     * The cost of buying a bulk of upgrades at a certain level. (inverse of cost function).
     * EL is automatically applied to the cost.
     * WARNING: In v8.x.x and above, the return order is [amount, cost] instead of [cost, amount].
     * @param level - The current level of the upgrade.
     * @param target - The target level of the upgrade. If you want to buy the maximum amount of upgrades possible, this will be `Infinity`.
     * @returns [amount, cost] - The cost of the upgrades and the amount of upgrades you can buy. If you can't afford any, it returns [Decimal.dZero, Decimal.dZero].
     * @example
     * // A cost function that returns the sum of the levels and the target.
     * // In this example, the cost function is twice the level. The cost bulk function is the sum of the levels and the target.
     * // -target^2 + target + level^2 + level
     * (level, target) => target.pow(2).mul(-1).add(target).add(level.pow(2)).add(level)
     */
    costBulk?: (currencyValue: Decimal, level: Decimal, target: Decimal) => [amount: Decimal, cost: Decimal];
    /**
     * The maximum level of the upgrade.
     * If not set, the upgrade will have a maximum level of `Infinity` and can continue to increase indefinitely.
     */
    maxLevel: Decimal;
    /**
     * The effect of the upgrade. This runs when the upgrade is bought, and instantly if `runEffectInstantly` is true.
     * @param level - The current level of the upgrade.
     * @param upgradeContext - The upgrade object that the effect is being run on.
     * @param currencyContext - The currency static class that the upgrade is being run on.
     */
    effect: (level: Decimal, upgradeContext: Upgrade, currencyContext: Currency) => void;
    /**
     * The effect that runs only once when the upgrade is added to the data manager.
     * @param upgradeContext - The upgrade object that the effect is being run on.
     * @param currencyContext - The currency object that the upgrade is being run on.
     */
    effectOnAdd: (upgradeContext: Upgrade, currencyContext: Currency) => void;
    /**
     * Endless / Everlasting: Flag for this upgrade to not take away currency when bought.
     * When buying max, the level would be set to the highest level that can be bought with the current currency.
     *
     * A function value is also allowed, and will be evaluated when the upgrade is bought or calculated.
     */
    el: boolean | (() => boolean);
    /**
     * A function to provide the bounds of what level could be given `currency`.
     * By default, the lower bound is 0 and the upper bound is `currency`.
     * This can make calculations extremely inaccurate at higher currencies.
     *
     * For example, if you have a currency that is 1e100, and you can only buy 102 upgrades with it,
     * the function first has to binary search from 1e50, then to 1e25, then to 3.16e12, etc.
     *
     * By providing a bounds function, you can make the calculations more accurate.
     * For example, if you can only buy 102 upgrades with 1e100 currency, you can provide a bounds function that returns something like [0, 1000].
     *
     * It should satisfy the following for all `adjustedTotalCurrency` >= 0 (and where cost' is the inverse of the cost function):
     * - 0 <= min < cost'(adjustedTotalCurrency) < max < adjustedTotalCurrency
     *
     * Basically, the bounds function should include the interval where the inverse cost function is within that interval,
     * but the max bound should grow slower than the currency (y=x), for accurate calculations.
     * @param adjustedTotalCurrency - The adjusted total currency value.
     * @returns [min, max] - The minimum and maximum level that can be bought with the currency.
     * @example
     * // Given a cost function,
     * const costFn = (n) => n.pow(2);
     * // the bounds function should be something like:
     * const boundsFn = (adjustedTotalCurrency: Decimal) => [new Decimal(0), adjustedTotalCurrency.pow(0.75)];
     *
     * // This is because the inverse of the cost function is n = sqrt(cost),
     * // and the maximum level that can be bought with the currency is the square root of the currency.
     * // So the bounds grows faster (y=x^0.75) than the inverse (y=x^0.5), but still slower than the currency (y=x).
     */
    bounds?: (adjustedTotalCurrency: Decimal) => [min: Decimal, max: Decimal];
    /**
     * The level to set this upgrade when it is reset in {@link Currency.reset}.
     */
    defaultLevel: Decimal;
    /**
     * The protections for {@link level}.
     * @see {@link InvalidDecimalProtections}.
     */
    readonly levelProtections: InvalidDecimalProtections;
    /**
     * The default size of the {@link lowerCache} when it is first created. Can be changed with {@link withCacheSize}.
     * @default 10000
     */
    static readonly defaultCacheSize = 10000;
    /**
     * The lower cache for the upgrade.
     * @see {@link LowerCachedUpgradeLookup}.
     */
    protected lowerCache: LowerCachedUpgradeLookup | null;
    /**
     * @returns A reference to the data of the upgrade.
     * Before this upgrade is added to the data manager ({@link onAddToDataManager}) (can occur when the upgrade is initialized/{@link effectOnAdd} is called),
     * this will return the {@link UpgradeData.placeholderUpgradeData} object.
     */
    protected dataSupplier: () => UpgradeData;
    /**
     * @returns A reference to the data of the upgrade.
     * @see {@link dataSupplier}
     */
    protected get data(): UpgradeData;
    /**
     * @returns A reference to the currency object that the upgrade is being run on.
     * Before this upgrade is added to the data manager ({@link onAddToDataManager}) (can occur when the upgrade is initialized/{@link effectOnAdd} is called),
     * this will return the {@link Currency.placeholderCurrency} object.
     */
    protected currencySupplier: () => Currency;
    /**
     * @returns A reference to the currency object that the upgrade is being run on.
     * @see {@link currencySupplier}
     */
    get currency(): Currency;
    /**
     * @returns A description of the upgrade based on this upgrade and its currency.
     * Not used internally, but you can use it to display a description.
     * @param upgradeContext - The upgrade object that the description is being run on.
     * @param currencyContext - The currency object that the upgrade is being run on.
     * @example
     * const description = (upgrade) => `This upgrade is at level ${upgrade.level}`;
     *
     * const upgrade = new Upgrade(...);
     *
     * // Buy a level of the upgrade
     * upgrade.buyOne();
     *
     * // Getter property
     * console.log(upgrade.description); // "This upgrade is at level 1"
     */
    descriptionSupplier: (upgradeContext: Upgrade, currencyContext: Currency) => string;
    /**
     * @returns A description of the upgrade.
     * @see {@link descriptionSupplier}
     */
    get description(): string;
    /**
     * The current level of the upgrade.
     * @returns The current level of the upgrade.
     */
    get level(): Decimal;
    set level(level: DecimalSource);
    /**
     * A {@link SubscribableDataEntry} for the {@link level} of this upgrade.
     * @see {@link SubscribableDataEntry}
     */
    readonly levelDataEntry: SubscribableDataEntry<Decimal>;
    /**
     * Creates a new upgrade object with the given id.
     * @param id - The {@link id} of the upgrade.
     */
    constructor(id: string);
    /**
     * @returns Whether this upgrade is currently el.
     * @see {@link el}
     */
    isEl(): boolean;
    /**
     * Calls the {@link effect} function with the arguments for this and the currency.
     */
    runEffect(): void;
    /**
     * Calls the {@link runEffectOnAdd} function with the arguments for this and the currency.
     */
    runEffectOnAdd(): void;
    /**
     * Called when the upgrade is added to the data manager.
     * Sets the {@link dataSupplier} and {@link currencySupplier} functions to return the correct data and currency.
     * @param dataManager - The data manager that the upgrade is being added to.
     * @param prefix - An optional prefix to add to the data key. If not provided, the data key will be the same as the upgrade id. If provided, the data key will be `${prefix}_${id}`.
     */
    onAddToDataManager(dataManager: DataManager, prefix?: string): void;
    /**
     * Called when the upgrade data is loaded from the data manager.
     */
    onLoadData(): void;
    /**
     * @returns The cost to buy the next upgrade. Equal to the {@link cost} evaluated at the current {@link level}.
     */
    getNextCost(): Decimal;
    /**
     * Calculates the cost and how many upgrades you can buy.
     * If the {@link endLevel} is within the {@link lowerCache} bounds, it will use the {@link lowerCache} to calculate the cost and amount significantly faster.
     * Otherwise, it will use {@link calculateInverseFunction} and {@link calculateSum} (if applicable) to calculate the cost and amount.
     *
     * The priority is:
     * 1. `target === 1`: buy one, manual check next cost
     * 2. {@link costBulk} exists: use it
     * 3. `lowerCache.isWithinBounds()`: look up in cache
     * 4. `el === true`: use {@link calculateInverseFunction}
     * 5. Otherwise: use {@link calculateInverseFunction} and {@link calculateSum}.
     *
     * - For {@link endLevel}s within the {@link lowerCache} bounds, this function has a max time complexity of O(log(n)) where n is the size of the {@link lowerCache}.
     * - For sum upgrades, this function has a max time complexity of O(n^2) where n is the number of iterations ({@link maxUpperIterations}).
     * - For el upgrades, this function has a max time complexity of O(n) where n is the number of iterations ({@link maxUpperIterations}).
     * @param value - The current value of the currency. Defaults to the current value of the currency.
     * @param startLevel - The starting level of the upgrade. Defaults the current level of the upgrade.
     * @param endLevel - The ending level or quantity to reach for the upgrade. If not provided, it will buy the maximum amount of upgrades possible (using target = Infinity).
     * @param meanMode - The mode/mean method to use. See {@link MeanMode}
     * @param maxUpperIterations - The amount of iterations to perform. Defaults to `15`.
     * @returns a {@link UpgradeCalculationResult} or [amount, cost] - Returns the amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [0, 0].
     * @see {@link UpgradeCalculationResult}
     */
    calculate(value?: DecimalSource, startLevel?: DecimalSource, endLevel?: DecimalSource, meanMode?: MeanMode, maxUpperIterations?: number): UpgradeCalculationResult;
    /**
     * Calculates the cost and how many upgrades you can buy with an end level that is the current level plus the {@link additiveLevelTarget}.
     * @param additiveLevelTarget - The additive level target to add to the current level.
     * @returns a {@link UpgradeCalculationResult}.
     * @see {@link calculate}
     */
    calculateWithAdditiveLevelTarget(additiveLevelTarget: DecimalSource): UpgradeCalculationResult;
    /**
     * Calculates the cost of the next upgrade after the maximum affordable quantity.
     * @param calculationResult - The result of {@link calculate}. If not provided, it will calculate it using the current currency value and level.
     * @returns The cost of the next upgrade. Equal to the cost of the upgrade at the level of `amountAffordable` plus the cost of the next upgrade
     * @example
     * // Calculate the cost of the next healthBoost upgrade
     * currency.gain(1e6); // Gain 1 thousand currency
     * console.log(currency.calculateUpgrade("healthBoost")); // The maximum affordable quantity and the cost of the upgrades. Ex. [new Decimal(100), new Decimal(1000)]
     * console.log(currency.getCumulativeSubsequentCost("healthBoost")); // The cost of the next upgrade after the maximum affordable quantity. (The cost of the 101st upgrade)
     */
    getCumulativeSubsequentCost(calculationResult?: UpgradeCalculationResult): Decimal;
    /**
     * Buys an upgrade based on its ID or array position if enough currency is available.
     * @param calculationResult - The result of {@link Upgrade.calculate}. If not provided, it will calculate it using the current currency value and level.
     * @returns Returns true if the purchase or upgrade is successful, or false if a level cannot be bought or the new level is less than the current level.
     * @example
     * // Attempt to buy up to 10 healthBoost upgrades at once
     * currency.buyUpgrade("healthBoost", 10);
     */
    buyMax(calculationResult?: UpgradeCalculationResult): boolean;
    /**
     * Buys one upgrade if enough currency is available.
     * @returns Returns true if enough currency is available and the 1 upgrade is bought, or false if there is not enough currency.
     */
    buyOne(): boolean;
    /**
     * A helper function to set the cost and costBulk functions for upgrades with a non-scaling cost (cost is independent of the level).
     * Functions same as the former `Item` from versions before v10.
     * @param cost - The cost of the upgrade.
     * @returns The upgrade object with the cost and costBulk functions set. The costBulk function is generated using {@link getCostBulkForNonScalingUpgrade}.
     */
    asNonScalingUpgrade(cost: DecimalSource): this;
    /**
     * Sets the size or disables the lower cache for the upgrade.
     * @param cacheSize - The size of the lower cache. If `null`, the lower cache will be disabled.
     * @returns this
     */
    withCacheSize(cacheSize: number | null): this;
    /**
     * Changes the {@link levelProtections} options for this upgrade.
     * Equivalent to calling {@link InvalidDecimalProtections.setProtections} on the {@link levelProtections} object.
     * @param newLevelProtections - The new level protections to set.
     * @returns this
     */
    withLevelProtectionOptions(newLevelProtections: Parameters<InvalidDecimalProtections["setProtections"]>[0]): this;
    /** @see {@link Upgrade.prototype.name} */
    withName(name: typeof this.name): this;
    /** @see {@link Upgrade.cost} */
    withCost(cost: typeof this.cost): this;
    /** @see {@link Upgrade.costBulk} */
    withCostBulk(costBulk: typeof this.costBulk): this;
    /** @see {@link Upgrade.maxLevel} */
    withMaxLevel(maxLevel: typeof this.maxLevel): this;
    /** @see {@link Upgrade.effect} */
    withEffect(effect: typeof this.effect): this;
    /** @see {@link Upgrade.effectOnAdd} */
    withEffectOnAdd(effectOnAdd: typeof this.effectOnAdd): this;
    /** @see {@link Upgrade.el} */
    withEl(el: typeof this.el): this;
    /** @see {@link Upgrade.bounds} */
    withBounds(bounds: typeof this.bounds): this;
    /** @see {@link Upgrade.defaultLevel} */
    withDefaultLevel(defaultLevel: typeof this.defaultLevel): this;
    /** @see {@link Upgrade.descriptionSupplier} */
    withDescriptionSupplier(descriptionSupplier: typeof this.descriptionSupplier): this;
    /** @see {@link Upgrade.currencySupplier} */
    withCurrencySupplier(currencySupplier: typeof this.currencySupplier): this;
}
/**
 * The requirements for a skill tree node. Can be a {@link SkillNode} or an object with a skill and a level that is required.
 */
interface SkillRequirement {
    /**
     * The skill node that is required.
     */
    skill: Upgrade;
    /**
     * The level that is required for the skill node.
     * If not specified, the skill node must be at least level 1.
     */
    level: DecimalSource;
}
/**
 * Represents an upgrade in the skill tree.
 * Each upgrade has its own id, name, description, cost, required skills, maximum level, and effect.
 */
declare class SkillNode extends Upgrade {
    static fromUpgrade(upgrade: Upgrade): SkillNode;
    /**
     * The skill nodes that are required to unlock this skill node.
     * See {@link SkillRequirement} for more information.
     * - Can also be a function that takes the skill tree context and returns the required skills.
     * - Can also be a function that takes the contexts and returns a boolean indicating if the skill is unlocked (`true` is unlocked, `false` is not unlocked).
     */
    requirements?: (SkillNode | SkillRequirement)[] | ((currencyContext: Currency, skillNodeContext: SkillNode) => (SkillNode | SkillRequirement)[]) | ((currencyContext: Currency, skillNodeContext: SkillNode) => boolean);
    withRequirements(requirements: typeof this.requirements): this;
    /**
     * @returns If this skill is unlocked.
     */
    isUnlocked(): boolean;
}
export { SkillNode, Upgrade, UpgradeData };
export type { SkillRequirement, UpgradeCalculationResult };
