import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";
import type { CurrencyStatic } from "./Currency";
import type { UpgradeInit } from "./Upgrade";
/**
 * The requirements for a skill tree node. Can be a {@link SkillNode} or an object with a skill and a level that is required.
 */
interface RequiredSkill {
    skill: SkillNode;
    level: DecimalSource;
}
/**
 * The interface for initializing a skill tree node.
 */
interface SkillInit extends Omit<UpgradeInit, "costBulk" | "effect" | "cost" | "descriptionFn" | "defaultLevel"> {
    /**
     * The cost of the skill tree node.
     * [currency, cost] - The currency and cost of the skill tree node.
     */
    cost: [
        currency: CurrencyStatic,
        cost: (level: Decimal, context: SkillInit) => Decimal
    ];
    /**
     * A function that returns the cost of buying multiple levels of the skill.
     */
    costBulk?: [
        currency: CurrencyStatic,
        cost: (level: Decimal, context: SkillInit) => [cost: Decimal, amount: Decimal]
    ];
    /**
     * The skill nodes that are required to unlock this skill node.
     * See {@link RequiredSkill} for more information.
     * Can also be a function that takes the skill tree context and returns the required skills.
     */
    required?: (SkillNode | RequiredSkill)[] | ((skillTreeContext: SkillTree) => (SkillNode | RequiredSkill)[]);
    /**
     * The effect of the skill tree node.
     * @param level - The level of the skill tree node.
     * @param context - The skill tree node.
     */
    effect?: (level: Decimal, context: SkillNode) => void;
}
declare class SkillNodeData {
    id: string;
    level: Decimal;
    constructor(id: string, level?: DecimalSource);
}
/**
 * Represents a skill tree node.
 * WIP
 */
declare class SkillNode implements SkillInit {
    id: string;
    name: string;
    description: string | ((level: Decimal, upgradeContext: import("./Upgrade").UpgradeStatic, currencyContext: CurrencyStatic) => string);
    cost: [currency: CurrencyStatic<[], string, [], string>, cost: (level: Decimal, context: SkillInit) => Decimal];
    required: (RequiredSkill | SkillNode)[] | ((skillTreeContext: SkillTree) => (SkillNode | RequiredSkill)[]);
    maxLevel: Decimal;
    effect: ((level: Decimal, context: SkillNode) => void) | undefined;
    /**
     * @returns The data of the skill node.
     */
    private data;
    /**
     * @returns The level of the skill node.
     */
    get level(): Decimal;
    /**
     * Represents a skill tree node.
     * @param skill - The skill tree node to initialize.
     * @param data - The data of the skill tree node.
     */
    constructor(skill: SkillInit, data?: SkillNodeData);
}
/**
 * A skill tree.
 * WIP
 */
declare class SkillTree {
    /**
     * The skills in the skill tree.
     */
    readonly skills: Record<string, SkillNode>;
    /**
     * Creates a new skill tree.
     * @param skills - The skills in the skill tree.
     */
    constructor(skills: (SkillInit | SkillNode)[] | (SkillInit | SkillNode));
    /**
     * Adds a skill to the skill tree.
     * @param skillNodeMember - The skill to add to the skill tree.
     */
    addSkill(skillNodeMember: (SkillInit | SkillNode)[] | (SkillInit | SkillNode)): void;
    /**
     * Gets a skill from the skill tree.
     * @param id - The id of the skill to get.
     * @returns The skill node.
     */
    getSkill(id: string): SkillNode;
    /**
     * Checks if a skill is unlocked.
     * @param id - The id of the skill to check.
     * @returns If the skill is unlocked.
     */
    isSkillUnlocked(id: string): boolean;
}
export type { SkillInit };
export { SkillNode, SkillTree };
