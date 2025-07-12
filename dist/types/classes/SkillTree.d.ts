/**
 * @file Skill tree class
 */
import "reflect-metadata";
import { Decimal } from "../E/e";
import type { DecimalSource } from "../E/e";
import { UpgradeData, UpgradeStatic } from "./Upgrade";
import type { UpgradeInit } from "./Upgrade";
import type { CurrencyStatic } from "./Currency";
import { MeanMode } from "./numericalAnalysis/numericalAnalysis";
import { Pointer } from "../common/types";
/**
 * The requirements for a skill tree node. Can be a {@link SkillNodeStatic} or an object with a skill and a level that is required.
 */
interface SkillRequirement {
    /**
     * The skill node that is required.
     */
    skill: SkillNodeStatic;
    /**
     * The level that is required for the skill node.
     * If not specified, the skill node must be at least level 1.
     */
    level: DecimalSource;
}
/**
 * The interface for initializing a skill tree node.
 * @template TId - The ID of the skill node. Defaults to `string`.
 */
interface SkillInit<TId extends string = string> extends UpgradeInit<TId> {
    /**
     * The currency that is used to purchase the skill node.
     */
    readonly costCurrency: CurrencyStatic;
    /**
     * The skill nodes that are required to unlock this skill node.
     * See {@link SkillRequirement} for more information.
     * - Can also be a function that takes the skill tree context and returns the required skills.
     * - Can also be a function that takes the contexts and returns a boolean indicating if the skill is unlocked (`true` is unlocked, `false` is not unlocked).
     */
    readonly requirements?: (TId | SkillNodeStatic | SkillRequirement)[] | ((skillTreeContext: SkillTreeStatic, skillNodeContext: SkillNodeStatic) => (TId | SkillNodeStatic | SkillRequirement)[]) | ((skillTreeContext: SkillTreeStatic, skillNodeContext: SkillNodeStatic) => boolean);
}
/**
 * The skill tree data.
 * A wrapper around the {@link UpgradeData} class that adds the skill tree specific properties.
 */
declare class SkillNodeData extends UpgradeData {
    /**
     * Constructs a new skill node data.
     * @param init - The skill node object initialization.
     */
    constructor(init: SkillInit);
}
/**
 * Represents an upgrade in the skill tree.
 * Each upgrade has its own id, name, description, cost, required skills, maximum level, and effect.
 */
declare class SkillNodeStatic extends UpgradeStatic implements SkillInit {
    readonly costCurrency: CurrencyStatic<string, string>;
    readonly requirements: ((skillTreeContext: SkillTreeStatic, skillNodeContext: SkillNodeStatic) => boolean) | (string | SkillRequirement | SkillNodeStatic)[] | ((skillTreeContext: SkillTreeStatic, skillNodeContext: SkillNodeStatic) => (string | SkillRequirement | SkillNodeStatic)[]);
    /**
     * Represents a skill tree node.
     * @param init - The skill tree node to initialize.
     * @param dataPointer - The data of the skill tree node.
     */
    constructor(init: SkillInit, dataPointer?: Pointer<SkillNodeData>);
}
/**
 * The frontend data for the skill tree.
 * This is used to serialize the skill tree data for saving and loading.
 */
declare class SkillTreeData {
    skills: Record<string, SkillNodeData>;
    constructor();
}
/**
 * The backend for the skill tree.
 * Includes methods for interfacing with the skill tree data.
 * @template TSkillNames - A string union that represents the names of the skill nodes.
 */
declare class SkillTreeStatic<TSkillNames extends string = string> {
    /**
     * The skills in the skill tree.
     */
    readonly skills: Record<TSkillNames, SkillNodeStatic>;
    /** A function that returns the pointer of the data */
    protected readonly pointerFn: () => SkillTreeData;
    /** @returns The pointer of the data. */
    protected get pointer(): SkillTreeData;
    /**
     * Creates a new skill tree.
     * @param skills - The skills in the skill tree.
     * @param pointer - The pointer to the skill tree data.
     */
    constructor(skills: SkillInit<TSkillNames>[], pointer?: Pointer<SkillTreeData>);
    /**
     * Adds an skill node to the data class.
     * @param skill - Skill node to add
     * @returns The skill node object.
     */
    private pointerAddSkill;
    /**
     * Adds a skill to the skill tree.
     * Recommended to use the constructor instead of this method.
     * @param skillNodeMember - The skill to add to the skill tree.
     */
    addSkill(skillNodeMember: SkillInit<TSkillNames>[]): void;
    /**
     * Gets a skill from the skill tree.
     * @param id - The id of the skill to get.
     * @returns The skill node.
     */
    getSkill(id: TSkillNames): SkillNodeStatic | null;
    /**
     * Checks if a skill is unlocked.
     * @param id - The id of the skill to check.
     * @returns If the skill is unlocked.
     */
    isSkillUnlocked(id: TSkillNames | SkillNodeStatic): boolean;
    /**
     * Calculates the cost and how many upgrades you can buy. A wrapper around {@link CurrencyStatic.calculateUpgrade}.
     * See {@link calculateUpgrade} and {@link CurrencyStatic.calculateUpgrade} for more information.
     * @param id - The upgrade ID or the upgrade to calculate.
     * @param target - The target level or quantity to reach for the upgrade. If omitted, it calculates the maximum affordable quantity.
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns The amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [Decimal.dZero, Decimal.dZero].
     * @example
     * // Calculate how many healthBoost upgrades you can buy and the cost of the upgrades
     * const [amount, cost] = currency.calculateUpgrade("healthBoost", 10);
     */
    calculateSkill(id: TSkillNames | SkillNodeStatic, target?: DecimalSource, mode?: MeanMode, iterations?: number): [amount: Decimal, cost: Decimal];
    /**
     * Calculates how much is needed for the next skill. A wrapper around {@link CurrencyStatic.getNextCost}.
     * @deprecated Use {@link getNextCostMax} instead as it is more versatile.
     * @param id - Index or ID of the upgrade.
     * @param target - How many before the next upgrade.
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns The cost of the next upgrade.
     */
    getNextCost(id: TSkillNames | SkillNodeStatic, target?: DecimalSource, mode?: MeanMode, iterations?: number): Decimal;
    /**
     * Calculates the cost of the next upgrade after the maximum affordable quantity. A wrapper around {@link CurrencyStatic.getNextCostMax}.
     * @param id - Upgrade ID or upgrade object to calculate the next cost for.
     * @param target - How many before the next upgrade.
     * @param mode  - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns The cost of the next upgrade.
     * @example
     * // Calculate the cost of the next healthBoost upgrade
     * currency.gain(1e6); // Gain 1 thousand currency
     * console.log(currency.calculateUpgrade("healthBoost")); // The maximum affordable quantity and the cost of the upgrades. Ex. [new Decimal(100), new Decimal(1000)]
     * console.log(currency.getNextCostMax("healthBoost")); // The cost of the next upgrade after the maximum affordable quantity. (The cost of the 101st upgrade)
     */
    getNextCostMax(id: TSkillNames | SkillNodeStatic, target?: DecimalSource, mode?: MeanMode, iterations?: number): Decimal;
    /**
     * Buys an upgrade based on its ID or array position if enough currency is available.
     * @param id - The upgrade ID or the upgrade to buy.
     * @param target - The target level or quantity to reach for the upgrade. See the argument in {@link calculateUpgrade}.
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
     * @example
     * // Attempt to buy up to 10 healthBoost upgrades at once
     * currency.buyUpgrade("healthBoost", 10);
     */
    buySkill(id: TSkillNames | SkillNodeStatic, target?: DecimalSource, mode?: MeanMode, iterations?: number): boolean;
}
export type { SkillInit, SkillRequirement };
export { SkillNodeStatic, SkillTreeStatic, SkillTreeData, SkillNodeData };
