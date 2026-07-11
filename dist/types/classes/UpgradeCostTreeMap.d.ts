/**
 * @file Declares classes related to caching and looking up upgrade costs.
 */
import { DecimalArray } from "../E/DecimalArray";
import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";
/**
 *
 */
declare class CachedUpgradeTreeNode {
    level: Decimal;
    accumulatedCost: Decimal;
    costAtLevel: Decimal;
    left?: CachedUpgradeTreeNode;
    right?: CachedUpgradeTreeNode;
    /**
     * Creates a new CachedUpgradeTreeNode with the given level and cost.
     * @param level - The level of the upgrade at this node.
     * @param cost - The cost of the upgrade at this node.
     * @param costAtLevel - The cost of the upgrade at this node, calculated at the given level.
     */
    constructor(level?: DecimalSource, cost?: DecimalSource, costAtLevel?: DecimalSource);
    populate(targetDepth: number, generatorCostFn: Generator<void, void, CachedUpgradeTreeNode>, lowerBound: CachedUpgradeTreeNode, upperBound: CachedUpgradeTreeNode, currentDepth?: number): void;
    /**
     * @param lookupMode - The mode to use for looking up the value.
     * @returns The value to look up based on the given lookup mode.
     */
    getLookupValue(lookupMode: CachedUpgradeLookupMode): Decimal;
}
interface LookupResult {
    lowerNode: Decimal;
    upperNode: Decimal;
}
declare enum CachedUpgradeLookupMode {
    accumulatedCost = 0,
    costAtLevel = 1
}
/**
 * Contains a cache of upgrade levels and their corresponding costs for lookups when buying upgrades in bulk.
 * Stores a precomputed map of the cost and the accumulated cost of the upgrade at each level up to a certain size
 * to use for lookups when buying upgrades in bulk without having to recalculate the cost each time.
 */
declare class LowerCachedUpgradeLookup {
    /**
     * A placeholder DecimalArray used to initialize the accumulatedCostArray and costAtLevelArray properties before they are populated with actual values in the fill method.
     */
    private static readonly initialPlaceholderDecimalArray;
    /**
     * Stores the accumulated cost to reach each level from the default level.
     */
    accumulatedCostArray: DecimalArray;
    /**
     * Stores the cost at each level from the default level. The cost at index 0 corresponds to the cost at defaultLevel + 1, index 1 corresponds to defaultLevel + 2, and so on.
     */
    costAtLevelArray: DecimalArray;
    /**
     * The level at which to start caching. The cost at index 0 of the arrays corresponds to the cost at this level + 1.
     */
    defaultLevel: Decimal;
    /**
     * Fills the cache with the accumulated costs and costs at each level for a given size, cost function, and default level.
     * @param size - The number of levels to cache.
     * @param costFn - A function that takes a level and returns the cost to reach that level.
     * @param defaultLevel - The level at which to start caching. Defaults to 0.
     */
    fill(size: number, costFn: (level: Decimal) => Decimal, defaultLevel?: DecimalSource): void;
    /**
     * @returns Whether the cache has been populated with values (ie {@link fill} has been called).
     */
    hasBeenPopulated(): boolean;
    /**
     * @param index - The index of the level to get. 0 corresponds to the default level + 1.
     * @returns The level at the given index.
     */
    getLevelFromIndex(index: number): Decimal;
    /**
     * Looks up the cache for the given level or cost and returns the closest levels that are less than or equal to and greater than or equal to the given value.
     * @param x - The level or cost to look up.
     * @param lookupMode - The mode to use for looking up the value. Defaults to {@link CachedUpgradeLookupMode.accumulatedCost}.
     * @returns An object containing the closest levels that are less than or equal to and greater than or equal to the given value.
     */
    lookUp(x: DecimalSource, lookupMode?: CachedUpgradeLookupMode): LookupResult;
    /**
     * Looks up the cache for the cost at the given level.
     * @param level - The level to look up the cost for.
     * @param lookupMode - The mode to use for looking up the value. Defaults to {@link CachedUpgradeLookupMode.accumulatedCost}.
     * @returns The cost at the given level, or 0 if the level is out of bounds of the cache.
     */
    getCostAtLevel(level: DecimalSource, lookupMode?: CachedUpgradeLookupMode): Decimal;
    /**
     * Checks if the given level or cost is within the bounds of the cache.
     * @param x - The level or cost to check.
     * @param lookupMode - The mode to use for looking up the value. Defaults to {@link CachedUpgradeLookupMode.accumulatedCost}.
     * @returns Whether the given level or cost is within the bounds of the cache.
     */
    isWithinBounds(x: DecimalSource, lookupMode?: CachedUpgradeLookupMode): boolean;
    /**
     * @returns The maximum level that can be reached with the current cache based on the {@link defaultLevel} and the length of the {@link costAtLevelArray}.
     */
    getMaxLevel(): Decimal;
}
export { CachedUpgradeLookupMode, CachedUpgradeTreeNode, LowerCachedUpgradeLookup };
