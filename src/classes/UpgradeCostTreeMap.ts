/**
 * @file Declares classes related to caching and looking up upgrade costs.
 */

import { DecimalArray } from "../E/DecimalArray";
import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";

interface LookupResult {
    lowerNode: Decimal;
    upperNode: Decimal;
}

enum CachedUpgradeLookupMode {
    accumulatedCost,
    costAtLevel,
}

/**
 * Contains a cache of upgrade levels and their corresponding costs for lookups when buying upgrades in bulk.
 * Stores a precomputed map of the cost and the accumulated cost of the upgrade at each level up to a certain size
 * to use for lookups when buying upgrades in bulk without having to recalculate the cost each time.
 */
class LowerCachedUpgradeLookup {
    /**
     * A placeholder DecimalArray used to initialize the accumulatedCostArray and costAtLevelArray properties before they are populated with actual values in the fill method.
     */
    private static readonly initialPlaceholderDecimalArray = new DecimalArray(0);

    /**
     * Stores the accumulated cost to reach each level from the default level.
     */
    public accumulatedCostArray: DecimalArray = LowerCachedUpgradeLookup.initialPlaceholderDecimalArray;

    /**
     * Stores the cost at each level from the default level. The cost at index 0 corresponds to the cost at defaultLevel + 1, index 1 corresponds to defaultLevel + 2, and so on.
     */
    public costAtLevelArray: DecimalArray = LowerCachedUpgradeLookup.initialPlaceholderDecimalArray;

    /**
     * The level at which to start caching. The cost at index 0 of the arrays corresponds to the cost at this level + 1.
     */
    public defaultLevel: Decimal = Decimal.dZero;

    public get length(): number {
        return this.accumulatedCostArray.length;
    }

    /**
     * Fills the cache with the accumulated costs and costs at each level for a given size, cost function, and default level.
     * @param size - The number of levels to cache.
     * @param costFn - A function that takes a level and returns the cost to reach that level.
     * @param defaultLevel - The level at which to start caching. Defaults to 0.
     */
    public fill(size: number, costFn: (level: Decimal) => Decimal, defaultLevel: DecimalSource = Decimal.dZero): void {
        defaultLevel = Decimal.fromValue_noAlloc(defaultLevel);
        this.defaultLevel = defaultLevel;

        // Evaluate the cost function at upper bound to see if DecimalArrays need to be resized to accommodate the values
        const upperBoundCost = costFn(defaultLevel.add(size));

        this.accumulatedCostArray = new DecimalArray(size, upperBoundCost.layer);
        this.costAtLevelArray = new DecimalArray(size, upperBoundCost.layer);

        // Populate the arrays with the accumulated cost and cost at level for each level from defaultLevel + 1 to defaultLevel + size
        let currentAccumulatedCost = Decimal.dZero;
        for (let i = 0; i < size; i++) {
            const level = defaultLevel.add(i);
            const costAtLevel = costFn(level);
            currentAccumulatedCost = currentAccumulatedCost.add(costAtLevel);

            this.accumulatedCostArray.set(i, currentAccumulatedCost);
            this.costAtLevelArray.set(i, costAtLevel);
        }
    }

    /**
     * @returns Whether the cache has been populated with values (ie {@link fill} has been called).
     */
    public hasBeenPopulated(): boolean {
        return this.accumulatedCostArray.length > 0 && this.costAtLevelArray.length > 0;
    }

    /**
     * @param index - The index of the level to get. 0 corresponds to the default level + 1.
     * @returns The level at the given index.
     */
    public getLevelFromIndex(index: number): Decimal {
        return this.defaultLevel.add(index + 1);
    }

    /**
     * Looks up the cache for the given level or cost and returns the closest levels that are less than or equal to and greater than or equal to the given value.
     * @param x - The level or cost to look up.
     * @param lookupMode - The mode to use for looking up the value. Defaults to {@link CachedUpgradeLookupMode.accumulatedCost}.
     * @returns An object containing the closest levels that are less than or equal to and greater than or equal to the given value.
     */
    public lookUp(
        x: DecimalSource,
        lookupMode: CachedUpgradeLookupMode = CachedUpgradeLookupMode.accumulatedCost,
    ): LookupResult {
        x = Decimal.fromValue_noAlloc(x);

        const arrayToSearch =
            lookupMode === CachedUpgradeLookupMode.accumulatedCost ? this.accumulatedCostArray : this.costAtLevelArray;

        const result = arrayToSearch.search(x);
        return {
            lowerNode: this.getLevelFromIndex(Math.floor(result)),
            upperNode: this.getLevelFromIndex(Math.ceil(result)),
        };
    }

    /**
     * Looks up the cache for the cost at the given level.
     * @param level - The level to look up the cost for.
     * @param lookupMode - The mode to use for looking up the value. Defaults to {@link CachedUpgradeLookupMode.accumulatedCost}.
     * @returns The cost at the given level, or 0 if the level is out of bounds of the cache.
     */
    public getCostAtLevel(
        level: DecimalSource,
        lookupMode: CachedUpgradeLookupMode = CachedUpgradeLookupMode.accumulatedCost,
    ): Decimal {
        level = Decimal.fromValue_noAlloc(level);

        // Bounds check
        const index = Math.floor(level.sub(this.defaultLevel).toNumber() - 1);
        if (index < 0 || index >= this.costAtLevelArray.length) {
            return Decimal.dZero;
        }

        if (lookupMode === CachedUpgradeLookupMode.accumulatedCost) {
            return this.accumulatedCostArray.get(index);
        } else {
            return this.costAtLevelArray.get(index);
        }
    }

    /**
     * Checks if the given level or cost is within the bounds of the cache.
     * @param x - The level or cost to check.
     * @param lookupMode - The mode to use for looking up the value. Defaults to {@link CachedUpgradeLookupMode.accumulatedCost}.
     * @returns Whether the given level or cost is within the bounds of the cache.
     */
    public isWithinBounds(
        x: DecimalSource,
        lookupMode: CachedUpgradeLookupMode = CachedUpgradeLookupMode.accumulatedCost,
    ): boolean {
        x = Decimal.fromValue_noAlloc(x);

        if (lookupMode === CachedUpgradeLookupMode.accumulatedCost) {
            const accumulatedCostAtLevel = this.accumulatedCostArray.get(this.accumulatedCostArray.length - 1);
            return x.lte(accumulatedCostAtLevel);
        } else {
            const costAtLevelAtLevel = this.costAtLevelArray.get(this.costAtLevelArray.length - 1);
            return x.lte(costAtLevelAtLevel);
        }
    }

    public isLevelWithinBounds(level: DecimalSource) {
        level = Decimal.fromValue_noAlloc(level);
        const index = level.sub(this.defaultLevel).toNumber() - 1;

        // -1 is allowed because the cost at index 0 corresponds to the cost at defaultLevel + 1, so if the level is equal to defaultLevel, it is still within bounds
        return index >= -1 && index < this.costAtLevelArray.length;
    }

    /**
     * @returns The maximum level that can be reached with the current cache based on the {@link defaultLevel} and the length of the {@link costAtLevelArray}.
     */
    public getMaxLevel(): Decimal {
        return this.getLevelFromIndex(this.costAtLevelArray.length - 1);
    }
}

export { CachedUpgradeLookupMode, LowerCachedUpgradeLookup };
