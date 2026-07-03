/**
 * @file Declares the upgrade and upgradeStatic classes as well as the calculateUpgrade function.
 */
import "reflect-metadata";
import { Type } from "class-transformer";
import { Decimal, DecimalSource } from "../E/e";
import { DEFAULT_ITERATIONS, type MeanMode } from "./numericalAnalysis/numericalAnalysis";
import { inverseFunctionApprox, calculateInverseFunction } from "./numericalAnalysis/inverseFunction";
import { calculateSum } from "./numericalAnalysis/sum";
import { Currency } from "./Currency";
import { DataManager, StaticClassWithData, SubscribableDataEntry } from "../game";
import { InvalidDecimalProtections } from "./InvalidDecimalProtections";
import { CachedUpgradeLookupMode, LowerCachedUpgradeLookup } from "./UpgradeCostTreeMap";

/**
 * Infers the id type of an upgrade array.
 * @template TUpgradeArray - The upgrade array.
 * @example
 * const testUpg = [
 *     {
 *         id: "upgId1",
 *         cost: (level: Decimal): Decimal => level.mul(10),
 *     },
 *     {
 *         id: "upgId2",
 *         cost: (level: Decimal): Decimal => level.mul(20),
 *     },
 * ] as const satisfies UpgradeInit[] // Must be readonly and satisfy UpgradeInit
 *
 * type test = UpgradeInitArrayType<typeof testUpg> // "upgId1" | "upgId2"
 */
// type UpgradeInitArrayType<TUpgradeArray extends Readonly<UpgradeInit>[]> = TUpgradeArray[number]["id"] extends never
//     ? string
//     : TUpgradeArray[number]["id"];

class PlaceholderImmutableUpgradeData implements UpgradeData {
    public get level(): Decimal {
        return new Decimal(Decimal.dZero);
    }

    public set level(placeholder: Decimal) {
        return;
    }
}

/**
 * Represents the frontend for an upgrade.
 * @template N - The ID of the upgrade. See {@link UpgradeInit}
 */
class UpgradeData {
    public static readonly defaultUpgradeData: UpgradeData = new PlaceholderImmutableUpgradeData();

    @Type(() => Decimal)
    public level: Decimal;

    /**
     * Constructs a new upgrade object with an initial level of 0.
     */
    constructor() {
        this.level = Decimal.dZero;
    }
}


/**
 * Represents the backend for an upgrade.
 */
class Upgrade implements StaticClassWithData {
    /**
     * A helper function to generate a costBulk function for upgrades with a non-scaling cost (cost is independent of the level).
     * @param cost - The cost of the upgrade.
     * @returns A costBulk function that can be used in the upgrade object.
     */
    public static getCostBulkForNonScalingUpgrade(cost: DecimalSource): typeof Upgrade.prototype.costBulk {
        cost = new Decimal(cost);

        return (currencyValue: Decimal, level: Decimal, target: Decimal): [Decimal, Decimal] => {
            const amountBuyable = currencyValue.div(cost).floor().clamp(Decimal.dZero, target);

            return [amountBuyable, amountBuyable.mul(cost)];
        };
    }

    /**
     * The ID of the upgrade.
     * Used to retrieve the upgrade later.
     */
    public readonly id: string;

    /**
     * The name of the upgrade. Defaults to the ID.
     */
    public name = "";

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
    public cost: (level: Decimal) => Decimal = () => Decimal.dOne;

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
    public costBulk?: (currencyValue: Decimal, level: Decimal, target: Decimal) => [amount: Decimal, cost: Decimal];

    /**
     * The maximum level of the upgrade.
     * Warning: If not set, the upgrade will not have a maximum level and can continue to increase indefinitely.
     */
    public maxLevel: Decimal = Decimal.dInf;

    /**
     * The effect of the upgrade. This runs when the upgrade is bought, and instantly if `runEffectInstantly` is true.
     * @param level - The current level of the upgrade.
     * @param upgradeContext - The upgrade object that the effect is being run on.
     * @param currencyContext - The currency static class that the upgrade is being run on.
     */
    public effect: (level: Decimal, upgradeContext: Upgrade, currencyContext: Currency) => void = () => {
        // Empty effect placeholder
    };

    /**
     * The effect that runs when the upgrade is added to the data manager.
     * This runs only once when the upgrade is added to the data manager.
     * @param upgradeContext - The upgrade object that the effect is being run on.
     * @param currencyContext - The currency static class that the upgrade is being run on.
     */
    public effectOnAdd: (upgradeContext: Upgrade, currencyContext: Currency) => void = () => {
        // Empty effect placeholder
    };

    /**
     * Endless / Everlasting: Flag to exclude the sum calculation and only perform binary search.
     * Note: A function value is also allowed, and will be evaluated when the upgrade is bought or calculated.
     */
    public el: boolean | (() => boolean) = false;

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
    // TODO: Implement upgrade bounds in calculateUpgrade
    public bounds?: (currency: Decimal, start: Decimal, end: Decimal) => [min: Decimal, max: Decimal];

    /**
     * The level to set this upgrade when it is reset.
     */
    public defaultLevel: Decimal = Decimal.dZero;

    /**
     * The protections for {@link level}.
     * See {@link InvalidDecimalProtections}.
     */
    public readonly levelProtections = new InvalidDecimalProtections({
        allowNaN: false,
        allowInfinite: false,
        allowNegative: false,
    });

    /** The default size of the cache. */
    public static readonly defaultCacheSize = 10000;

    private readonly lowerCache = new LowerCachedUpgradeLookup();

    /** @returns The data of the upgrade. */
    private dataSupplier: () => UpgradeData = () => {
        console.warn("eMath.js: Upgrade dataSupplier has not set. Returning placeholder data.");
        return UpgradeData.defaultUpgradeData;
    };

    /** @returns The data of the upgrade. */
    protected get data(): UpgradeData {
        return this.dataSupplier();
    }

    protected currencySupplier: () => Currency = () => {
        console.warn("eMath.js: Upgrade currencySupplier has not set");
        return new Currency("");
    };
    /** @returns The currency static class that the upgrade is being run on. */
    public get currency(): Currency {
        return this.currencySupplier();
    }

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
    private descriptionSupplier: (upgradeContext: Upgrade, currencyContext: Currency) => string = () => "";
    public get description(): string {
        return this.descriptionSupplier(this, this.currencySupplier());
    }

    /**
     * The current level of the upgrade.
     * @returns The current level of the upgrade.
     */
    get level(): Decimal {
        return this.data.level;
    }
    set level(level: DecimalSource) {
        this.data.level = this.levelProtections.validateValueOrElse(
            level,
            this.data.level,
            `Upgrade "${this.id}" level`,
            this,
        );
    }

    public readonly levelDataEntry = SubscribableDataEntry.fromGetterSetter(
        () => this.level,
        (newLevel) => {
            this.level = newLevel;
        },
        false,
    );

    /**
     * Creates a new upgrade object with the given ID.
     * @param id - The ID of the upgrade. Used to retrieve the upgrade later. See {@link Upgrade.id}.
     */
    constructor(id: string) {
        this.id = id;
    }

    // Data manager functions
    public onAddToDataManager(dataManager: DataManager, prefix?: string): void {
        const dataKey = `${prefix ? prefix + "_" : ""}${this.id}`;

        this.dataSupplier = dataManager.setData(dataKey, new UpgradeData());

        // Populate the cache if it hasn't been populated yet
        if (!this.lowerCache.hasBeenPopulated()) {
            this.withCacheSize(Upgrade.defaultCacheSize);
        }
    }

    public onLoadData(): void {
        // Run setter method to run protections and other side effects of setting the level.
        this.level = this.data.level;
    }

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
    public calculate(
        value: DecimalSource,
        start?: DecimalSource,
        end: DecimalSource = Decimal.dInf,
        mode?: MeanMode,
        iterations?: number,
        el = false,
    ): [newLevelToSetTo: Decimal, cost: Decimal] {
        // Normalize the values
        value = Decimal.fromValue_noAlloc(value);
        start = Decimal.fromValue_noAlloc(start ?? this.level);
        end = Decimal.fromValue_noAlloc(end);

        const currentLevel = this.level;

        const target = end.sub(start);

        // Special case: If target is less than 0, just return 0
        if (target.lt(Decimal.dZero)) {
            console.warn("eMath.js: Invalid target for calculateItem: ", target);
            return [currentLevel, Decimal.dZero];
        }

        // Set el from the upgrade object if it exists
        el = (typeof this.el === "function" ? this.el() : this.el) ?? el;

        // Special case: If target is 1, just check it manually
        if (target.eq(Decimal.dOne)) {
            const cost = this.cost(this.level);
            const canAfford = value.gte(cost);
            let out: [Decimal, Decimal] = [Decimal.dZero, Decimal.dZero];

            if (el) {
                out[0] = canAfford ? currentLevel.add(Decimal.dOne) : currentLevel;
                return out;
            } else {
                out = [canAfford ? currentLevel.add(Decimal.dOne) : currentLevel, canAfford ? cost : Decimal.dZero];
                return out;
            }
        }

        // Special case: If costBulk exists, use it
        if (this.costBulk) {
            // console.log("costBulk");
            const [amount, cost] = this.costBulk(value, start, target);
            const canAfford = value.gte(cost);
            const out: [Decimal, Decimal] = [canAfford ? amount : currentLevel, canAfford && !el ? cost : Decimal.dZero];

            return out;
        }

        const lookupMode = el ? CachedUpgradeLookupMode.costAtLevel : CachedUpgradeLookupMode.accumulatedCost;

        if (this.lowerCache.isWithinBounds(value, lookupMode)) {
            const adjustment = !el ? this.lowerCache.getCostAtLevel(start, lookupMode) : Decimal.dZero;

            const adjustedCurrencyValue = !el ? value.add(adjustment) : value;

            const lookupResult = this.lowerCache.lookUp(adjustedCurrencyValue, lookupMode);

            const cost = el ? Decimal.dZero : this.lowerCache.getCostAtLevel(lookupResult.lowerNode).sub(adjustment);

            // console.log({
            //     value,
            //     adjustment,
            //     adjustedCurrencyValue,
            //     lookupResult,
            //     cost,
            // })

            return [lookupResult.lowerNode, cost];
        }

        // TODO: upper
        return [currentLevel, Decimal.dZero];

        // // Special case for el upgrades
        // if (el) {
        //     const costTargetFn = (level: Decimal): Decimal => this.cost(level.add(start));
        //     const maxLevelAffordable = Decimal.min(
        //         end,
        //         calculateInverseFunction(costTargetFn, value, {
        //             mode,
        //             iterations,
        //         }).value.floor(),
        //     );
        //     const cost = Decimal.dZero;

        //     // Set the cache
        //     // this.setCached("el", start, cost);
        //     return [maxLevelAffordable, cost];
        // }

        // // Binary Search with sum calculation
        // // console.log("binary search");
        // const maxLevelAffordable = calculateInverseFunction((x: Decimal) => calculateSum(this.cost, x, start), value, {
        //     mode,
        //     iterations,
        // })
        //     .value.floor()
        //     .min(start.add(target).add(Decimal.dNegOne));

        // // After finding the max level affordable, calculate the cost at that level
        // const cost = calculateSum(this.cost, maxLevelAffordable, start, undefined, DEFAULT_ITERATIONS);

        // // console.log({ maxLevelAffordable, cost });
        // const maxLevelAffordableActual = maxLevelAffordable.sub(start).add(Decimal.dOne).max(Decimal.dZero);
        // // console.log({ maxLevelAffordable, maxLevelAffordableActual, cost });

        // return [maxLevelAffordableActual, cost];
    }

    // Chainable setters
    // TODO: jsdoc
    public withName(name: typeof this.name): this {
        this.name = name;
        return this;
    }
    public withCost(cost: typeof this.cost): this {
        this.cost = cost;
        return this;
    }
    public withCostBulk(costBulk: typeof this.costBulk): this {
        this.costBulk = costBulk;
        return this;
    }
    public withMaxLevel(maxLevel: typeof this.maxLevel): this {
        this.maxLevel = maxLevel;
        return this;
    }
    public withEffect(effect: typeof this.effect): this {
        this.effect = effect;
        return this;
    }
    public withEffectOnAdd(effectOnAdd: typeof this.effectOnAdd): this {
        this.effectOnAdd = effectOnAdd;
        return this;
    }
    public withEl(el: typeof this.el): this {
        this.el = el;
        return this;
    }
    public withBounds(bounds: typeof this.bounds): this {
        this.bounds = bounds;
        return this;
    }
    public withDefaultLevel(defaultLevel: typeof this.defaultLevel): this {
        this.defaultLevel = defaultLevel;
        return this;
    }
    public withDescriptionSupplier(descriptionSupplier: typeof this.descriptionSupplier): this {
        this.descriptionSupplier = descriptionSupplier;
        return this;
    }
    public withLevelProtectionOptions(
        newLevelProtections: Parameters<InvalidDecimalProtections["setProtections"]>[0],
    ): this {
        this.levelProtections.setProtections(newLevelProtections);
        return this;
    }

    public withCacheSize(cacheSize: number): this {
        this.lowerCache.fill(Math.min(this.maxLevel.toNumber(), cacheSize), this.cost, this.defaultLevel);
        return this;
    }

    /**
     * A helper function to set the cost and costBulk functions for upgrades with a non-scaling cost (cost is independent of the level).
     * @param cost - The cost of the upgrade.
     * @returns The upgrade object with the cost and costBulk functions set. The costBulk function is generated using {@link getCostBulkForNonScalingUpgrade}.
     */
    public asNonScalingUpgrade(cost: DecimalSource): this {
        cost = Decimal.fromValue_noAlloc(cost);

        this.cost = (): Decimal => cost;
        this.costBulk = Upgrade.getCostBulkForNonScalingUpgrade(cost);
        return this;
    }

    // Internal setters
    public withCurrencySupplier(currencySupplier: typeof this.currencySupplier): this {
        this.currencySupplier = currencySupplier;
        return this;
    }
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
class SkillNode extends Upgrade {
    public static fromUpgrade(upgrade: Upgrade): SkillNode {
        const out = new SkillNode(upgrade.id);

        Object.assign(out, upgrade);

        return out;
    }

    /**
     * The skill nodes that are required to unlock this skill node.
     * See {@link SkillRequirement} for more information.
     * - Can also be a function that takes the skill tree context and returns the required skills.
     * - Can also be a function that takes the contexts and returns a boolean indicating if the skill is unlocked (`true` is unlocked, `false` is not unlocked).
     */
    public requirements?:
        | (SkillNode | SkillRequirement)[]
        | ((currencyContext: Currency, skillNodeContext: SkillNode) => (SkillNode | SkillRequirement)[])
        | ((currencyContext: Currency, skillNodeContext: SkillNode) => boolean);

    public withRequirements(requirements: typeof this.requirements): this {
        this.requirements = requirements;
        return this;
    }

    /**
     * @returns If this skill is unlocked.
     */
    public isUnlocked(): boolean {
        // If there are no required skills, the skill is unlocked
        if (!this.requirements || this.requirements.length === 0) {
            return true;
        }

        // If the required skills are a function, call it
        const requiredSkills =
            typeof this.requirements === "function" ? this.requirements(this.currency, this) : this.requirements;

        // If the requirements is a boolean, return the boolean value
        if (typeof requiredSkills === "boolean") {
            return requiredSkills;
        }

        // Check if all the required skills are unlocked
        return requiredSkills.every((requiredSkill) => {
            // If the required skill is a string, get the skill node
            // if (typeof requiredSkill === "string") {
            //     const skillNode = this.currency.getUpgrade(requiredSkill);

            //     // If the skill node is not found, return false
            //     if (!skillNode) {
            //         console.warn(`eMath.js: Required skill "${requiredSkill}" not found in skill tree.`);
            //         return false;
            //     }

            //     requiredSkill = skillNode;
            // }

            // If the required skill is a skill node with extra levels, check if the level is high enough
            if ("skill" in requiredSkill) {
                if (requiredSkill.skill instanceof SkillNode) {
                    return requiredSkill.skill.level.gte(requiredSkill.level) && requiredSkill.skill.isUnlocked();
                }

                return requiredSkill.skill.level.gte(requiredSkill.level);
            }

            // If the required skill is just a skill node, check if it is unlocked
            return requiredSkill.isUnlocked();
        });
    }
}

export { UpgradeData, Upgrade, SkillNode };
export type { SkillRequirement };
