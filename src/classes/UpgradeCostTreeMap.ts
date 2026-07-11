/**
 * @file Declares classes related to caching and looking up upgrade costs.
 */

import { DecimalArray } from "../E/DecimalArray";
import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";

/**
 *
 */
class CachedUpgradeTreeNode {
    public level: Decimal;
    public accumulatedCost: Decimal;
    public costAtLevel: Decimal;

    public left?: CachedUpgradeTreeNode;
    public right?: CachedUpgradeTreeNode;

    /**
     * Creates a new CachedUpgradeTreeNode with the given level and cost.
     * @param level - The level of the upgrade at this node.
     * @param cost - The cost of the upgrade at this node.
     * @param costAtLevel - The cost of the upgrade at this node, calculated at the given level.
     */
    public constructor(
        level: DecimalSource = Decimal.dZero,
        cost: DecimalSource = Decimal.dZero,
        costAtLevel: DecimalSource = Decimal.dZero,
    ) {
        this.level = Decimal.fromValue_noAlloc(level);
        this.accumulatedCost = Decimal.fromValue_noAlloc(cost);
        this.costAtLevel = Decimal.fromValue_noAlloc(costAtLevel);
    }

    public populate(
        targetDepth: number,
        generatorCostFn: Generator<void, void, CachedUpgradeTreeNode>,
        lowerBound: CachedUpgradeTreeNode,
        upperBound: CachedUpgradeTreeNode,
        currentDepth = 1,
    ): void {
        // Reached target depth, stop populating
        if (currentDepth >= targetDepth) {
            generatorCostFn.next(this);
            return;
        }

        // Populate left
        this.left = new CachedUpgradeTreeNode();
        this.left.populate(targetDepth, generatorCostFn, lowerBound, this, currentDepth + 1);

        // After populating left, current node would be the next one in the generator, so yield it
        generatorCostFn.next(this);

        // Populate right
        this.right = new CachedUpgradeTreeNode();
        this.right.populate(targetDepth, generatorCostFn, this, upperBound, currentDepth + 1);
    }

    /**
     * @param lookupMode - The mode to use for looking up the value.
     * @returns The value to look up based on the given lookup mode.
     */
    public getLookupValue(lookupMode: CachedUpgradeLookupMode): Decimal {
        switch (lookupMode) {
            // case LookupMode.level:
            // default:
            //     return this.level;
            case CachedUpgradeLookupMode.accumulatedCost:
                return this.accumulatedCost;
            case CachedUpgradeLookupMode.costAtLevel:
                return this.costAtLevel;
        }
    }
}

interface LookupResult {
    // lowerNode: CachedUpgradeTreeNode;
    // upperNode: CachedUpgradeTreeNode;

    lowerNode: Decimal;
    upperNode: Decimal;
}

enum CachedUpgradeLookupMode {
    // level,
    accumulatedCost,
    costAtLevel,
}

// /**
//  * A specialized binary tree data structure to store the levels and costs of an upgrade for lookups when buying upgrades in bulk.
//  * The tree is populated with a 2 ** depth number of nodes. Nodes cannot be added or removed individually.
//  * Each node {@link CachedUpgradeTreeNode} represents a certain level and the cost to reach that level from the initial level.
//  */
// class LowerCachedUpgradeTreeMap {
//     /**
//      * Generates an infinite sequence of accumulated costs for each level starting from the initial level.
//      * Each yielded value represents the total cost to reach that level from the initial level (sum of costs from initialLevel to current level).
//      * @param initialLevel - The starting level from which to begin accumulating costs.
//      * @param costFn - A function that takes a level and returns the cost to reach that level.
//      * @yields Accumulated cost for each level starting from the initial level.
//      */
//     public static *accumulateCost(
//         initialLevel: DecimalSource,
//         costFn: (level: Decimal) => Decimal,
//         entrySetToPopulate: CachedUpgradeTreeNode[]
//     ): Generator<void, void, CachedUpgradeTreeNode> {
//         initialLevel = Decimal.fromValue_noAlloc(initialLevel);

//         let currentLevel = initialLevel;
//         let currentCost = Decimal.dZero;

//         while (true) {
//             currentLevel = currentLevel.add(Decimal.dOne);
//             const costAtLevel = costFn(currentLevel);
//             currentCost = currentCost.add(costAtLevel);

//             const node = yield;
//             if (node) {
//                 node.level = currentLevel;
//                 node.accumulatedCost = currentCost;
//                 node.costAtLevel = costAtLevel;
//                 entrySetToPopulate.push(node);
//             }
//         }
//     }

//     public readonly lowerBound = new CachedUpgradeTreeNode();
//     public readonly upperBound = new CachedUpgradeTreeNode();

//     public readonly root = new CachedUpgradeTreeNode();

//     private depth = -1;

//     /**
//      * A list of all the nodes in the tree, sorted by level ascending for iteration.
//      */
//     public readonly entrySet: CachedUpgradeTreeNode[] = [];

//     /**
//      * Populates the tree with nodes up to the specified depth using the provided cost function and starting level.
//      * Creates 2 ** depth nodes in total, including the lower and upper bounds.
//      * @param depth - The depth of the tree to populate. The total number of nodes will be 2 ** depth.
//      * @param costFn - A function that takes a level and returns the cost to reach that level.
//      * @param startingLevel - The level at which to start populating the tree. Must be greater than 0 and less than the max level of the upgrade.
//      */
//     public populate(
//         depth: number,
//         costFn: (level: Decimal) => Decimal,
//         startingLevel: DecimalSource = Decimal.dOne,
//     ): void {
//         this.depth = depth;
//         startingLevel = Decimal.fromValue_noAlloc(startingLevel);

//         // Assign bounds
//         this.lowerBound.level = startingLevel;
//         this.lowerBound.accumulatedCost = costFn(this.lowerBound.level);
//         this.lowerBound.costAtLevel = this.lowerBound.accumulatedCost;

//         const generator = LowerCachedUpgradeTreeMap.accumulateCost(startingLevel, costFn, this.entrySet);

//         this.entrySet.push(this.lowerBound);
//         this.root.populate(depth, generator, this.lowerBound, this.upperBound);

//         generator.next(this.upperBound);
//     }

//     /**
//      * @returns Whether the tree has been populated with nodes (ie {@link populate} has been called).
//      */
//     public hasBeenPopulated(): boolean {
//         return this.depth !== -1;
//     }

//     /**
//      * Looks up the tree for the given level or cost and returns the closest nodes that are less than or equal to and greater than or equal to the given value.
//      * @param x - The level or cost to look up.
//      * @param lookupMode - The mode to use for looking up the value. Defaults to {@link LookupMode.level}.
//      * @returns An object containing the closest nodes that are less than or equal to and greater than or equal to the given value.
//      */
//     public lookUp(x: DecimalSource, lookupMode: LookupMode = LookupMode.level): LookupResult {
//         x = Decimal.fromValue_noAlloc(x);

//         // Make sure x is within the bounds
//         if (x.gte(this.upperBound.getLookupValue(lookupMode))) {
//             return {
//                 lowerNode: this.upperBound,
//                 upperNode: this.upperBound,
//             };
//         }
//         if (x.lte(this.lowerBound.getLookupValue(lookupMode))) {
//             return {
//                 lowerNode: this.lowerBound,
//                 upperNode: this.lowerBound,
//             };
//         }

//         let bestFloorCandidate = this.root;
//         let bestCeilCandidate = this.root;
//         let currentNode = this.root;

//         while (true) {
//             const compareResult = x.cmp(currentNode.getLookupValue(lookupMode));

//             if (compareResult === 0) {
//                 // Equal, found
//                 return {
//                     lowerNode: currentNode,
//                     upperNode: currentNode,
//                 };
//             } else if (compareResult === 1) {
//                 // x is greater, go to right
//                 if (!currentNode.right) {
//                     return {
//                         lowerNode: currentNode,
//                         upperNode: bestCeilCandidate,
//                     };
//                 }

//                 bestFloorCandidate = currentNode;
//                 currentNode = currentNode.right;
//             } else {
//                 // x is less, go to left
//                 if (!currentNode.left) {
//                     return {
//                         lowerNode: bestFloorCandidate,
//                         upperNode: currentNode,
//                     };
//                 }

//                 bestCeilCandidate = currentNode;
//                 currentNode = currentNode.left;
//             }
//         }
//     }

//     public [Symbol.iterator](): Iterator<CachedUpgradeTreeNode> {
//         return this.entrySet[Symbol.iterator]();
//     }
// }

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
        const index = level.sub(this.defaultLevel).toNumber() - 1;
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

    /**
     * @returns The maximum level that can be reached with the current cache based on the {@link defaultLevel} and the length of the {@link costAtLevelArray}.
     */
    public getMaxLevel(): Decimal {
        return this.getLevelFromIndex(this.costAtLevelArray.length - 1);
    }
}

export { CachedUpgradeLookupMode, CachedUpgradeTreeNode, LowerCachedUpgradeLookup };
