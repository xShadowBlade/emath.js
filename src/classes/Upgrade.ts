/* eslint-disable jsdoc/check-param-names */
/**
 * @file Declares classes related to upgrades.
 */
import { Type } from "class-transformer";
import "reflect-metadata";

import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";
import { DataManager, StaticClassWithData, SubscribableDataEntry } from "../game";
import { Currency } from "./Currency";
import { InvalidDecimalProtections } from "./InvalidDecimalProtections";
import { calculateInverseFunction } from "./numericalAnalysis/inverseFunction";
import type { MeanMode } from "./numericalAnalysis/numericalAnalysis";
import { DEFAULT_ITERATIONS } from "./numericalAnalysis/numericalAnalysis";
import { calculateSum } from "./numericalAnalysis/sum";
import { CachedUpgradeLookupMode, LowerCachedUpgradeLookup } from "./UpgradeCostTreeMap";

/**
 * Stores the data for an upgrade.
 */
class UpgradeData {
    /**
     * A placeholder readonly upgrade data object that returns a level of 0.
     */
    public static readonly placeholderUpgradeData: UpgradeData = new (class implements UpgradeData {
        public get level(): Decimal {
            return new Decimal(Decimal.dZero);
        }

        public set level(level: Decimal) {
            console.warn(
                "eMath.js: Attempted to set level on placeholder upgrade data. Possibly Upgrade dataSupplier has not been set yet.",
            );
        }
    })();

    /**
     * The current level of the upgrade.
     */
    @Type(() => Decimal)
    public level: Decimal = new Decimal(Decimal.dZero);
}

/**
 * The result returned by {@link Upgrade.calculate}.
 * An array with the first element being the new level to set to, and the second element being the cost of the upgrades.
 */
type UpgradeCalculationResult = [newLevelToSetTo: Decimal, cost: Decimal];

/**
 * An upgrade that can be purchased with a currency.
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
     * Used to retrieve the upgrade when its data is stored in the data manager.
     */
    public readonly id: string;

    /**
     * The name of the upgrade. Defaults to the ID.
     */
    public name = "";

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
    // TODO: update doc
    public costBulk?: (currencyValue: Decimal, level: Decimal, target: Decimal) => [amount: Decimal, cost: Decimal];

    /**
     * The maximum level of the upgrade.
     * If not set, the upgrade will have a maximum level of `Infinity` and can continue to increase indefinitely.
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
     * The effect that runs only once when the upgrade is added to the data manager.
     * @param upgradeContext - The upgrade object that the effect is being run on.
     * @param currencyContext - The currency object that the upgrade is being run on.
     */
    public effectOnAdd: (upgradeContext: Upgrade, currencyContext: Currency) => void = () => {
        // Empty effect placeholder
    };

    /**
     * Endless / Everlasting: Flag for this upgrade to not take away currency when bought.
     * When buying max, the level would be set to the highest level that can be bought with the current currency.
     *
     * A function value is also allowed, and will be evaluated when the upgrade is bought or calculated.
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
    // TODO: update doc
    public bounds?: (adjustedTotalCurrency: Decimal) => [min: Decimal, max: Decimal];

    /**
     * The level to set this upgrade when it is reset in {@link Currency.reset}.
     */
    public defaultLevel: Decimal = Decimal.dZero;

    /**
     * The protections for {@link level}.
     * @see {@link InvalidDecimalProtections}.
     */
    public readonly levelProtections = new InvalidDecimalProtections({
        allowNaN: false,
        allowInfinite: false,
        allowNegative: false,
    });

    /**
     * The default size of the {@link lowerCache} when it is first created. Can be changed with {@link withCacheSize}.
     * @default 10000
     */
    public static readonly defaultCacheSize = 10000;

    /**
     * The lower cache for the upgrade.
     * @see {@link LowerCachedUpgradeLookup}.
     */
    protected lowerCache: LowerCachedUpgradeLookup | null = new LowerCachedUpgradeLookup();

    /**
     * @returns A reference to the data of the upgrade.
     * Before this upgrade is added to the data manager ({@link onAddToDataManager}) (can occur when the upgrade is initialized/{@link effectOnAdd} is called),
     * this will return the {@link UpgradeData.placeholderUpgradeData} object.
     */
    protected dataSupplier: () => UpgradeData = () => UpgradeData.placeholderUpgradeData;

    /**
     * @returns A reference to the data of the upgrade.
     * @see {@link dataSupplier}
     */
    protected get data(): UpgradeData {
        return this.dataSupplier();
    }

    /**
     * @returns A reference to the currency object that the upgrade is being run on.
     * Before this upgrade is added to the data manager ({@link onAddToDataManager}) (can occur when the upgrade is initialized/{@link effectOnAdd} is called),
     * this will return the {@link Currency.placeholderCurrency} object.
     */
    protected currencySupplier: () => Currency = () => Currency.placeholderCurrency;

    /**
     * @returns A reference to the currency object that the upgrade is being run on.
     * @see {@link currencySupplier}
     */
    public get currency(): Currency {
        return this.currencySupplier();
    }

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
    public descriptionSupplier: (upgradeContext: Upgrade, currencyContext: Currency) => string = () => "";

    /**
     * @returns A description of the upgrade.
     * @see {@link descriptionSupplier}
     */
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

    /**
     * A {@link SubscribableDataEntry} for the {@link level} of this upgrade.
     * @see {@link SubscribableDataEntry}
     */
    public readonly levelDataEntry = SubscribableDataEntry.fromGetterSetter(
        () => this.level,
        (newLevel) => {
            this.level = newLevel;
        },
        false,
    );

    /**
     * Creates a new upgrade object with the given id.
     * @param id - The {@link id} of the upgrade.
     */
    constructor(id: string) {
        this.id = id;
        this.name = id;
    }

    /**
     * @returns Whether this upgrade is currently el.
     * @see {@link el}
     */
    public isEl(): boolean {
        return typeof this.el === "function" ? this.el() : this.el;
    }

    /**
     * Calls the {@link effect} function with the arguments for this and the currency.
     */
    public runEffect(): void {
        this.effect(this.level, this, this.currency);
    }

    /**
     * Calls the {@link runEffectOnAdd} function with the arguments for this and the currency.
     */
    public runEffectOnAdd(): void {
        this.effectOnAdd(this, this.currency);
    }

    /**
     * Called when the upgrade is added to the data manager.
     * Sets the {@link dataSupplier} and {@link currencySupplier} functions to return the correct data and currency.
     * @param dataManager - The data manager that the upgrade is being added to.
     * @param prefix - An optional prefix to add to the data key. If not provided, the data key will be the same as the upgrade id. If provided, the data key will be `${prefix}_${id}`.
     */
    public onAddToDataManager(dataManager: DataManager, prefix?: string): void {
        const dataKey = `${prefix ? prefix + "_" : ""}${this.id}`;

        this.dataSupplier = dataManager.setData(dataKey, new UpgradeData());

        // Populate the cache if it hasn't been populated yet
        if (this.lowerCache && !this.lowerCache.hasBeenPopulated()) {
            this.withCacheSize(Upgrade.defaultCacheSize);
        }
    }

    /**
     * Called when the upgrade data is loaded from the data manager.
     */
    public onLoadData(): void {
        // Run setter method to run protections and other side effects of setting the level.
        this.level = this.data.level;
    }

    /**
     * @returns The cost to buy the next upgrade. Equal to the {@link cost} evaluated at the current {@link level}.
     */
    public getNextCost(): Decimal {
        return this.cost(this.level);
    }

    /**
     * Calculates the cost and how many upgrades you can buy.
     * If the {@link endLevel} is within the {@link lowerCache} bounds, it will use the {@link lowerCache} to calculate the cost and amount significantly faster.
     * Otherwise, it will use {@link calculateInverseFunction} and {@link calculateSum} (if applicable) to calculate the cost and amount.
     *
     * If this upgrade is a {@link SkillNode}, if this skill node has not been {@link SkillNode.isUnlocked} yet, an upgrade cannot be bought.
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
     * @param endLevel - The ending level or quantity to reach for the upgrade. If not provided, it will buy the maximum amount of upgrades possible (using target = `Infinity`).
     * @param meanMode - The mode/mean method to use. See {@link MeanMode}
     * @param maxUpperIterations - The amount of iterations to perform. Defaults to `15`.
     * @returns a {@link UpgradeCalculationResult} or [amount, cost] - Returns the amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns `[currentLevel, 0]`.
     * @see {@link UpgradeCalculationResult}
     */
    public calculate(
        value: DecimalSource = this.currency.value,
        startLevel: DecimalSource = this.level,
        endLevel: DecimalSource = Decimal.dInf,
        meanMode?: MeanMode,
        maxUpperIterations?: number,
    ): UpgradeCalculationResult {
        // Normalize the values
        value = Decimal.fromValue_noAlloc(value);
        startLevel = Decimal.fromValue_noAlloc(startLevel);
        endLevel = Decimal.fromValue_noAlloc(endLevel).min(this.maxLevel);

        // Check if the start level is greater than the end level. If so, return the current level and 0 cost.
        if (startLevel.gte(endLevel)) {
            return [this.level, Decimal.dZero];
        }

        const currentLevel = this.level;

        const targetDifference = endLevel.sub(startLevel);

        // Special case: If target is less than 0, just return 0
        if (targetDifference.lt(Decimal.dZero)) {
            console.warn("eMath.js: Invalid target for calculateItem: ", targetDifference);
            return [currentLevel, Decimal.dZero];
        }

        // Set el from the upgrade object if it exists
        const el = this.isEl();

        // Special case: If target is 1, just check it manually
        if (targetDifference.eq(Decimal.dOne)) {
            const cost = this.cost(this.level);
            const canAfford = value.gte(cost);
            let out: UpgradeCalculationResult = [Decimal.dZero, Decimal.dZero];

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
            const [amount, cost] = this.costBulk(value, startLevel, targetDifference);
            const canAfford = value.gte(cost);
            const out: UpgradeCalculationResult = [
                canAfford ? amount : currentLevel,
                canAfford && !el ? cost : Decimal.dZero,
            ];

            return out;
        }

        const lookupMode = el ? CachedUpgradeLookupMode.costAtLevel : CachedUpgradeLookupMode.accumulatedCost;
        const adjustment = !el
            ? this.lowerCache
                ? this.lowerCache.getCostAtLevel(startLevel, CachedUpgradeLookupMode.accumulatedCost)
                : calculateSum(this.cost, startLevel, this.defaultLevel)
            : Decimal.dZero;
        const adjustedCurrencyValue = !el ? value.add(adjustment) : value;

        // Use the lower cache if the value is within bounds
        if (this.lowerCache && this.lowerCache.isWithinBounds(value, lookupMode)) {
            const lookupResult = this.lowerCache.lookUp(adjustedCurrencyValue, lookupMode);

            const resultLevel = lookupResult.lowerNode.min(endLevel);

            const cost = el ? Decimal.dZero : this.lowerCache.getCostAtLevel(resultLevel).sub(adjustment);

            // console.log({
            //     value,
            //     adjustment,
            //     adjustedCurrencyValue,
            //     lookupResult,
            //     cost,
            // })

            return [resultLevel, cost];
        }

        // If the value is not within lower cache bounds but the lower cache bounds is the max level, return the max level and the cost to reach it
        if (this.lowerCache && this.lowerCache.getMaxLevel().gte(this.maxLevel)) {
            const resultLevel = this.lowerCache.getMaxLevel().min(endLevel);
            const cost = el ? Decimal.dZero : this.lowerCache.getCostAtLevel(resultLevel).sub(adjustment);
            return [resultLevel, cost];
        }

        // Lower cache doesn't have the value, so we need to calculate it manually

        const bounds = this.bounds ? this.bounds(adjustedCurrencyValue) : [this.defaultLevel, adjustedCurrencyValue];

        // Special case for el upgrades
        if (el) {
            const maxLevelAffordable = calculateInverseFunction(this.cost, value, {
                mode: meanMode,
                iterations: maxUpperIterations,
                lowerBound: bounds[0].max(startLevel),
                upperBound: bounds[1].min(endLevel),
            })
                .value.min(endLevel)
                .floor();
            const cost = Decimal.dZero;

            return [maxLevelAffordable, cost];
        }

        const maxLevelAffordable = calculateInverseFunction(
            (x: Decimal) => calculateSum(this.cost, x, this.defaultLevel),
            adjustedCurrencyValue,
            {
                mode: meanMode,
                iterations: maxUpperIterations,
                lowerBound: bounds[0].max(startLevel),
                upperBound: bounds[1].min(endLevel),
            },
        )
            .value.floor()
            .clamp(this.defaultLevel, endLevel);

        // After finding the max level affordable, calculate the cost at that level
        const cost = calculateSum(this.cost, maxLevelAffordable, this.defaultLevel, undefined, DEFAULT_ITERATIONS).sub(
            adjustment,
        );

        // console.log({ maxLevelAffordable, cost });
        // console.log({ maxLevelAffordable, maxLevelAffordableActual, cost });

        return [maxLevelAffordable, cost];
    }

    /**
     * Calculates the cost and how many upgrades you can buy with an end level that is the current level plus the {@link additiveLevelTarget}.
     * @param additiveLevelTarget - The additive level target to add to the current level.
     * @returns a {@link UpgradeCalculationResult}.
     * @see {@link calculate}
     */
    public calculateWithAdditiveLevelTarget(additiveLevelTarget: DecimalSource): UpgradeCalculationResult {
        return this.calculate(undefined, undefined, this.level.add(additiveLevelTarget));
    }

    /**
     * Calculates the cost of the next upgrade after the maximum affordable quantity.
     * @param calculationResult - The result of {@link calculate}. If not provided, it will calculate it using the current currency value and level.
     * @returns The cost of the next upgrade. Equal to the cost of the upgrade at the level of `amountAffordable` plus the cost of the next upgrade
     */
    public getCumulativeSubsequentCost(calculationResult: UpgradeCalculationResult = this.calculate()): Decimal {
        const nextCost = this.cost(calculationResult[0]).add(calculationResult[1]);
        return nextCost;
    }

    /**
     * Buys an upgrade based on its ID or array position if enough currency is available.
     * @param calculationResult - The result of {@link Upgrade.calculate}. If not provided, it will calculate it using the current currency value and level.
     * @returns Returns true if the purchase or upgrade is successful, or false if a level cannot be bought or the new level is less than the current level.
     */
    public buyMax(calculationResult: UpgradeCalculationResult = this.calculate()): boolean {
        const [newLevel, cost] = calculationResult;

        // Check if affordable
        if (newLevel.lte(this.level)) {
            return false;
        }

        // Deduct the cost from available currency
        this.currency.value = this.currency.value.sub(cost);

        // Set the upgrade level
        this.level = newLevel;

        // Call the effect function if it exists
        this.runEffect();

        return true;
    }

    /**
     * Buys one upgrade if enough currency is available.
     * @returns Returns true if enough currency is available and the 1 upgrade is bought, or false if there is not enough currency.
     */
    public buyOne(): boolean {
        return this.buyMax(this.calculate(undefined, undefined, this.level.add(Decimal.dOne)));
    }

    // Chainable setters

    /**
     * A helper function to set the cost and costBulk functions for upgrades with a non-scaling cost (cost is independent of the level).
     * Functions same as the former `Item` from versions before v10.
     * @param cost - The cost of the upgrade.
     * @returns The upgrade object with the cost and costBulk functions set. The costBulk function is generated using {@link getCostBulkForNonScalingUpgrade}.
     */
    public asNonScalingUpgrade(cost: DecimalSource): this {
        // New Decimal here for a copy of the cost
        cost = new Decimal(cost);

        this.cost = (): Decimal => cost;
        this.costBulk = Upgrade.getCostBulkForNonScalingUpgrade(cost);
        return this;
    }

    /**
     * Sets the size or disables the lower cache for the upgrade.
     * @param cacheSize - The size of the lower cache. If `null`, the lower cache will be disabled.
     * @returns this
     */
    public withCacheSize(cacheSize: number | null): this {
        if (cacheSize === null) {
            this.lowerCache = null;
            return this;
        }

        this.lowerCache = new LowerCachedUpgradeLookup();
        this.lowerCache.fill(Math.min(this.maxLevel.toNumber(), cacheSize), this.cost, this.defaultLevel);
        return this;
    }

    /**
     * Changes the {@link levelProtections} options for this upgrade.
     * Equivalent to calling {@link InvalidDecimalProtections.setProtections} on the {@link levelProtections} object.
     * @param newLevelProtections - The new level protections to set.
     * @returns this
     */
    public withLevelProtectionOptions(
        newLevelProtections: Parameters<InvalidDecimalProtections["setProtections"]>[0],
    ): this {
        this.levelProtections.setProtections(newLevelProtections);
        return this;
    }

    /* eslint-disable jsdoc/require-param, jsdoc/require-returns */
    /** @see {@link Upgrade.prototype.name} */
    public withName(name: typeof this.name): this {
        this.name = name;
        return this;
    }

    /** @see {@link Upgrade.cost} */
    public withCost(cost: typeof this.cost): this {
        this.cost = cost;
        return this;
    }

    /** @see {@link Upgrade.costBulk} */
    public withCostBulk(costBulk: typeof this.costBulk): this {
        this.costBulk = costBulk;
        return this;
    }

    /** @see {@link Upgrade.maxLevel} */
    public withMaxLevel(maxLevel: typeof this.maxLevel): this {
        this.maxLevel = maxLevel;

        // If the lower cache exists, fill it with the new max level
        if (this.lowerCache) {
            this.lowerCache.fill(Math.min(maxLevel.toNumber(), Upgrade.defaultCacheSize), this.cost, this.defaultLevel);
        }

        return this;
    }

    /** @see {@link Upgrade.effect} */
    public withEffect(effect: typeof this.effect): this {
        this.effect = effect;
        return this;
    }

    /** @see {@link Upgrade.effectOnAdd} */
    public withEffectOnAdd(effectOnAdd: typeof this.effectOnAdd): this {
        this.effectOnAdd = effectOnAdd;
        return this;
    }

    /** @see {@link Upgrade.el} */
    public withEl(el: typeof this.el): this {
        this.el = el;
        return this;
    }

    /** @see {@link Upgrade.bounds} */
    public withBounds(bounds: typeof this.bounds): this {
        this.bounds = bounds;
        return this;
    }

    /** @see {@link Upgrade.defaultLevel} */
    public withDefaultLevel(defaultLevel: typeof this.defaultLevel): this {
        this.defaultLevel = defaultLevel;

        // If the lower cache exists, fill it with the new default level
        if (this.lowerCache) {
            this.lowerCache.fill(Math.min(this.maxLevel.toNumber(), Upgrade.defaultCacheSize), this.cost, defaultLevel);
        }

        // If the current level is less than the new default level, set the level to the new default level
        if (this.level.lt(defaultLevel)) {
            this.level = defaultLevel;
        }

        return this;
    }

    /** @see {@link Upgrade.descriptionSupplier} */
    public withDescriptionSupplier(descriptionSupplier: typeof this.descriptionSupplier): this {
        this.descriptionSupplier = descriptionSupplier;
        return this;
    }

    /** @see {@link Upgrade.currencySupplier} */
    // Internal setter
    public withCurrencySupplier(currencySupplier: typeof this.currencySupplier): this {
        this.currencySupplier = currencySupplier;
        return this;
    }
    /* eslint-enable jsdoc/require-param, jsdoc/require-returns */
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

    public calculate(
        value?: DecimalSource,
        startLevel?: DecimalSource,
        endLevel?: DecimalSource,
        meanMode?: MeanMode,
        maxUpperIterations?: number,
    ): UpgradeCalculationResult {
        if (!this.isUnlocked()) {
            return [this.level, Decimal.dZero];
        }

        return super.calculate(value, startLevel, endLevel, meanMode, maxUpperIterations);
    }
}

export { SkillNode, Upgrade, UpgradeData };
export type { SkillRequirement, UpgradeCalculationResult };
