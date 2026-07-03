/**
 * @file Declares the upgrade and upgradeStatic classes as well as the calculateUpgrade function.
 */
import "reflect-metadata";
import { Decimal, DecimalSource } from "../E/e";
import { type MeanMode } from "./numericalAnalysis/numericalAnalysis";
import { Currency } from "./Currency";
import { DataManager, StaticClassWithData, SubscribableDataEntry } from "../game";
import { InvalidDecimalProtections } from "./InvalidDecimalProtections";
/**
 * Represents the frontend for an upgrade.
 * @template N - The ID of the upgrade. See {@link UpgradeInit}
 */
declare class UpgradeData {
    static readonly defaultUpgradeData: UpgradeData;
    level: Decimal;
    /**
     * Constructs a new upgrade object with an initial level of 0.
     */
    constructor();
}
/**
 * Represents the backend for an upgrade.
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
     * Used to retrieve the upgrade later.
     */
    readonly id: string;
    /**
     * The name of the upgrade. Defaults to the ID.
     */
    name: string;
    /**
     * The cost of upgrades at a certain level.
     * This function should evaluate to a non-negative number, and should be deterministic and continuous for all levels above 0.
     * Also, if you do not set your own `costBulk` function, the function should always be greater than the level.
     * @param level - The CURRENT (not next) level of the upgrade. It will always be a positive integer.
     * @returns The cost of the upgrade. It should be a non-negative integer greater than or equal to 0.
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
     * Warning: If not set, the upgrade will not have a maximum level and can continue to increase indefinitely.
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
     * The effect that runs when the upgrade is added to the data manager.
     * This runs only once when the upgrade is added to the data manager.
     * @param upgradeContext - The upgrade object that the effect is being run on.
     * @param currencyContext - The currency static class that the upgrade is being run on.
     */
    effectOnAdd: (upgradeContext: Upgrade, currencyContext: Currency) => void;
    /**
     * Endless / Everlasting: Flag to exclude the sum calculation and only perform binary search.
     * Note: A function value is also allowed, and will be evaluated when the upgrade is bought or calculated.
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
     * It should satisfy the following for all `currency` >= 0 (and where cost' is the inverse of the cost function):
     * - 0 <= min < cost'(currency) < max < currency
     *
     * Basically, the bounds function should include the interval where the inverse cost function is within that interval,
     * but the max bound should grow slower than the currency (y=x), for accurate calculations.
     * @param currency - The currency value.
     * @param start - The starting level of the upgrade.
     * @param end - The ending level or quantity to reach for the upgrade.
     * @returns [min, max] - The minimum and maximum level that can be bought with the currency.
     * @example
     * // Given a cost function,
     * const costFn = (n) => n.pow(2);
     * // the bounds function should be something like:
     * const boundsFn = (currency) => [new Decimal(0), currency.pow(0.75)];
     *
     * // This is because the inverse of the cost function is n = sqrt(cost),
     * // and the maximum level that can be bought with the currency is the square root of the currency.
     * // So the bounds grows faster (y=x^0.75) than the inverse (y=x^0.5), but still slower than the currency (y=x).
     */
    bounds?: (currency: Decimal, start: Decimal, end: Decimal) => [min: Decimal, max: Decimal];
    /**
     * The level to set this upgrade when it is reset.
     */
    defaultLevel: Decimal;
    /**
     * The protections for {@link level}.
     * See {@link InvalidDecimalProtections}.
     */
    readonly levelProtections: InvalidDecimalProtections;
    /** The default size of the cache. */
    static readonly defaultCacheSize = 10000;
    private readonly lowerCache;
    /** @returns The data of the upgrade. */
    private dataSupplier;
    /** @returns The data of the upgrade. */
    protected get data(): UpgradeData;
    protected currencySupplier: () => Currency;
    /** @returns The currency static class that the upgrade is being run on. */
    get currency(): Currency;
    /**
     * The description of the upgrade as a function that returns a string.
     * @param upgradeContext - The upgrade object that the description is being run on.
     * @param currencyContext - The currency static class that the upgrade is being run on.
     * @example
     * // A dynamic description that returns a string
     * const description = (upgrade) => `This upgrade is at level ${upgrade.level}`;
     *
     * // ... create upgrade here (see currencyStatic.addUpgrade)
     *
     * const upgrade = currencyStatic.getUpgrade("upgradeID");
     *
     * // Buy 1 level of the upgrade
     * currencyStatic.buyUpgrade("upgradeID", 1);
     *
     * // Getter property
     * console.log(upgrade.description); // "This upgrade is at level 1"
     */
    private descriptionSupplier;
    get description(): string;
    /**
     * The current level of the upgrade.
     * @returns The current level of the upgrade.
     */
    get level(): Decimal;
    set level(level: DecimalSource);
    readonly levelDataEntry: SubscribableDataEntry<Decimal>;
    /**
     * Creates a new upgrade object with the given ID.
     * @param id - The ID of the upgrade. Used to retrieve the upgrade later. See {@link Upgrade.id}.
     */
    constructor(id: string);
    onAddToDataManager(dataManager: DataManager, prefix?: string): void;
    onLoadData(): void;
    /**
     * Calculates the cost and how many upgrades you can buy
     * Uses {@link inverseFunctionApprox} to calculate the maximum affordable quantity.
     * The priority is: `target === 1` > `costBulk` > `el`.
     * For sum upgrades, this function has a max time complexity of O(n^2) where n is the number of iterations.
     * For el upgrades, this function has a max time complexity of O(n) where n is the number of iterations.
     * @param value - The current value of the currency.
     * @param upgrade - The upgrade object to calculate.
     * @param start - The starting level of the upgrade. Defaults the current level of the upgrade.
     * @param end - The ending level or quantity to reach for the upgrade. If not provided, it will buy the maximum amount of upgrades possible (using target = Infinity).
     * @param mode - The mode/mean method to use. See {@link MeanMode}
     * @param iterations - The amount of iterations to perform. Defaults to `15`.
     * @param el - ie Endless: Flag to exclude the sum calculation and only perform binary search. (DEPRECATED, use `el` in the upgrade object instead)
     * @returns [amount, cost] - Returns the amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [Decimal.dZero, Decimal.dZero].
     */
    calculate(value: DecimalSource, start?: DecimalSource, end?: DecimalSource, mode?: MeanMode, iterations?: number, el?: boolean): [newLevelToSetTo: Decimal, cost: Decimal];
    withName(name: typeof this.name): this;
    withCost(cost: typeof this.cost): this;
    withCostBulk(costBulk: typeof this.costBulk): this;
    withMaxLevel(maxLevel: typeof this.maxLevel): this;
    withEffect(effect: typeof this.effect): this;
    withEffectOnAdd(effectOnAdd: typeof this.effectOnAdd): this;
    withEl(el: typeof this.el): this;
    withBounds(bounds: typeof this.bounds): this;
    withDefaultLevel(defaultLevel: typeof this.defaultLevel): this;
    withDescriptionSupplier(descriptionSupplier: typeof this.descriptionSupplier): this;
    withLevelProtectionOptions(newLevelProtections: Parameters<InvalidDecimalProtections["setProtections"]>[0]): this;
    withCacheSize(cacheSize: number): this;
    /**
     * A helper function to set the cost and costBulk functions for upgrades with a non-scaling cost (cost is independent of the level).
     * @param cost - The cost of the upgrade.
     * @returns The upgrade object with the cost and costBulk functions set. The costBulk function is generated using {@link getCostBulkForNonScalingUpgrade}.
     */
    asNonScalingUpgrade(cost: DecimalSource): this;
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
export { UpgradeData, Upgrade, SkillNode };
export type { SkillRequirement };
