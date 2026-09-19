import { Decimal } from "../E/e";
import { Currency } from "./Currency";
import { calculateInverseFunction, InverseFunctionApproxResult } from "./numericalAnalysis/inverseFunction";
import { calculateSum } from "./numericalAnalysis/sum";
import { Upgrade } from "./Upgrade";
import { CachedUpgradeLookupMode, LowerCachedUpgradeLookup } from "./UpgradeCostTreeMap";

type UpgradeCostBounds = [minLevel: Decimal, maxLevel: Decimal];

/**
 *
 */
class UpgradeCost {
    /**
     * The upgrade that this cost is associated with.
     */
    protected upgrade?: Upgrade;

    /**
     * The currency that is being costed.
     */
    public readonly currency: Currency;

    /**
     * Everlasting: Flag for this upgrade to not take away currency when bought.
     * When buying max, the level would be set to the highest level that can be bought with the current currency.
     *
     * A function value is also allowed, and will be evaluated when the upgrade is bought or calculated.
     */
    public el: boolean | (() => boolean) = false;

    /**
     * @returns Whether this upgrade is currently el.
     * @see {@link el}
     */
    public isEl(): boolean {
        return typeof this.el === "function" ? this.el() : this.el;
    }

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

    public accumulatedCost?: (level: Decimal) => Decimal;

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
    public maxAffordable?: (currencyValue: Decimal, startLevel: Decimal) => Decimal;
    public maxAffordableEl?: (currencyValue: Decimal, startLevel: Decimal) => Decimal;

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
    public bounds?: (adjustedTotalCurrency: Decimal) => UpgradeCostBounds;
    public boundsEl?: (adjustedTotalCurrency: Decimal) => UpgradeCostBounds;

    /**
     * The lower cache for the upgrade.
     * @see {@link LowerCachedUpgradeLookup}.
     */
    protected lowerCache: LowerCachedUpgradeLookup | null = null;

    public lastAdjustmentValue: Decimal = Decimal.dZero;

    /**
     * Creates a new cost with the given currency and cost function.
     * @param currency - The currency that is being costed.
     * @param cost - The cost of the upgrade.
     */
    constructor(currency: Currency, cost?: typeof this.cost) {
        this.currency = currency;
        if (cost) this.cost = cost;
    }

    public initCache() {
        if (!this.upgrade) return;

        this.lowerCache = new LowerCachedUpgradeLookup();
    }

    public fillCache(cacheSize: number | null) {
        if (!this.upgrade) return;

        if (cacheSize === null) {
            this.lowerCache = null;
            return;
        }

        if (this.lowerCache) {
            this.lowerCache.fill(
                Math.min(this.upgrade.maxLevel.sub(this.upgrade.defaultLevel).toNumber(), cacheSize),
                this.cost,
                this.upgrade.defaultLevel,
            );
        }
    }

    /**
     * Asserts that the upgrade is defined. If not, warn.
     * @returns True if the upgrade is defined, false otherwise.
     */
    protected assertUpgradeShouldBeDefined(): boolean {
        if (!this.upgrade) {
            console.warn(
                "eMath.js: UpgradeCost is being used without an upgrade. This may cause inaccurate calculations.",
            );
            return false;
        }

        return true;
    }

    /**
     * @returns The accumulated cost of the upgrade at a certain level.
     * If the level is within the lower cache bounds, it will use the lower cache to get the cost.
     * If not, it will use the accumulatedCost function if it exists.
     * If not, it will approximate the cost using the cost function.
     * @param level - The level to get the accumulated cost at.
     */
    public getAccumulatedCostAtLevel(level: Decimal) {
        // Use the cache if it exists
        if (this.lowerCache && this.lowerCache.isLevelWithinBounds(level)) {
            return this.lowerCache.getCostAtLevel(level, CachedUpgradeLookupMode.accumulatedCost);
        }

        // Use accumulatedCost if it exists
        if (this.accumulatedCost) {
            return this.accumulatedCost(level);
        }

        // Approximate
        this.assertUpgradeShouldBeDefined();

        return calculateSum(this.cost, level, this.upgrade?.defaultLevel);
    }

    /**
     * Calculates the adjusted value of the currency based on the level and whether the upgrade is el.
     * If the upgrade is el, the adjusted value is just the currency value.
     * If not, the adjusted value is the currency value plus the accumulated cost at the level.
     * @param level - The level to get the adjusted value at.
     * @param isEl - Whether the upgrade is el. If not provided, it will be calculated using {@link isEl}.
     * @param currencyValue - The value of the currency. If not provided, it will be calculated using {@link currency}.
     * @returns The adjusted value of the currency.
     */
    protected getAdjustment(level: Decimal, isEl: boolean = this.isEl()): Decimal {
        if (isEl) {
            // No adjustment needed for el
            return Decimal.dZero;
        }

        return this.getAccumulatedCostAtLevel(level);
    }

    /**
     * Gets the bounds of the upgrade cost at a certain adjusted value.
     * If the upgrade is el, it will use the boundsEl function if it exists.
     * If not, it will use the bounds function if it exists.
     * If not, it will return [defaultLevel, adjustedValue].
     * @param adjustedValue - The adjusted value of the currency.
     * @param isEl - Whether the upgrade is el. If not provided, it will be calculated using {@link isEl}.
     * @returns The bounds of the upgrade cost at the adjusted value.
     */
    protected getBounds(adjustedValue: Decimal, isEl: boolean = this.isEl()): UpgradeCostBounds {
        if (isEl && this.boundsEl) return this.boundsEl(adjustedValue);
        if (!isEl && this.bounds) return this.bounds(adjustedValue);

        this.assertUpgradeShouldBeDefined();

        return [this.upgrade?.defaultLevel ?? Decimal.dZero, adjustedValue];
    }

    /**
     * Calculates the maximum affordable level of the upgrade given a starting level and an ending level.
     * If the upgrade is el, it will use the maxAffordableEl function if it exists.
     * If not, it will use the maxAffordable function if it exists.
     * If not, it will use the lower cache if it exists and the adjusted value is within bounds.
     * If not, it will calculate the bounds and use the inverse of the cost function to approximate the maximum affordable level.
     * @param startLevel - The starting level of the upgrade.
     * @param endLevel - The ending level of the upgrade. If not provided, it will be set to Infinity.
     * @param currencyValue - The value of the currency. If not provided, it will be calculated using {@link currency}.
     * @returns The maximum affordable level of the upgrade.
     */
    public getMaximumAffordable(
        startLevel: Decimal,
        endLevel: Decimal = Decimal.dInf,
        currencyValue: Decimal = this.currency.value,
    ): Decimal {
        const targetDifference = endLevel.sub(startLevel);
        const isEl = this.isEl();
        const lookupMode = isEl ? CachedUpgradeLookupMode.costAtLevel : CachedUpgradeLookupMode.accumulatedCost;
        this.lastAdjustmentValue = this.getAdjustment(startLevel, isEl);
        const adjustedValue = currencyValue.add(this.lastAdjustmentValue);

        // If target is 1, just check it manually
        if (targetDifference.eq(Decimal.dOne)) {
            return this.currency.value.gte(this.cost(startLevel)) ? startLevel.add(Decimal.dOne) : startLevel;
        }

        // Use them if given
        if (isEl && this.maxAffordableEl) return this.maxAffordableEl(adjustedValue, startLevel).min(endLevel);
        if (!isEl && this.maxAffordable) return this.maxAffordable(adjustedValue, startLevel).min(endLevel);

        // Use the lower cache if the value is within bounds
        if (this.lowerCache && this.lowerCache.isWithinBounds(adjustedValue, lookupMode)) {
            return this.lowerCache.lookUp(adjustedValue, lookupMode).lowerNode.min(endLevel);
        }

        // If the value is not within lower cache bounds but the lower cache bounds is the max level, return the max level
        if (this.upgrade) {
            if (this.lowerCache && this.lowerCache.getMaxLevel().gte(this.upgrade.maxLevel)) {
                return this.upgrade.maxLevel.min(endLevel);
            }
        } else {
            this.assertUpgradeShouldBeDefined();
        }

        // Lower cache doesn't have the value, so we need to calculate it manually
        const bounds = this.getBounds(adjustedValue, isEl);

        const costFunctionToUse = isEl ? this.cost : this.getAccumulatedCostAtLevel;

        let result: InverseFunctionApproxResult = calculateInverseFunction(costFunctionToUse, adjustedValue, {
            lowerBound: bounds[0].max(startLevel),
            upperBound: bounds[1].min(endLevel),
        });

        return result.lowerBound.floor().clamp(this.upgrade?.defaultLevel ?? Decimal.dZero, endLevel);
    }

    public withUpgrade(upgrade: Upgrade<any>): this {
        this.upgrade = upgrade;
        return this;
    }

    /** @see {@link UpgradeCost.cost} */
    public withCost(cost: typeof this.cost): this {
        this.cost = cost;
        return this;
    }

    /** @see {@link UpgradeCost.costBulk} */
    public withCostBulk(costBulk: typeof this.maxAffordableEl): this {
        this.maxAffordableEl = costBulk;
        return this;
    }

    /** @see {@link UpgradeCost.el} */
    public withEl(el: typeof this.el): this {
        this.el = el;
        return this;
    }
}

export { UpgradeCost };
