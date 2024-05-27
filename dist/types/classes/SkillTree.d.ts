/**
 * @file Skill tree class
 * Work in progress
 */
import type { DecimalSource } from "../E/eMain";
import { E } from "../E/eMain";
import type { CurrencyStatic } from "./Currency";
import type { IUpgradeStatic } from "./Upgrade";
interface ISkill extends Omit<IUpgradeStatic, "costBulk" | "effect" | "cost" | "descriptionFn" | "defaultLevel"> {
    cost: [currency: CurrencyStatic, cost: (level: E, context: ISkill) => E];
    costBulk?: [currency: CurrencyStatic, cost: (level: E, context: ISkill) => [cost: E, amount: E]];
    required: ISkill[];
    effect?: (level: E, context: ISkill) => void;
}
/**
 * Represents a skill tree node.
 * WIP
 */
declare class SkillNode implements ISkill {
    id: string;
    name: string;
    description: string;
    cost: [currency: CurrencyStatic<[], string>, cost: (level: E, context: ISkill) => E];
    required: ISkill[];
    maxLevel: import("../E/e").Decimal;
    effect: ((level: E, context: ISkill) => void) | undefined;
    /**
     * Represents a skill tree node.
     * @param id - The ID of the skill tree node.
     * @param name - The name of the skill tree node. Defaults to the id.
     * @param cost - The cost of the skill tree node. Defaults to 0.
     * @param description - The description of the skill tree node.
     * @param effect - The effect of the skill tree node.
     * @param maxLevel - The maximum level of the skill tree node. Defaults to 1.
     * @param required - The IDs of the required skill tree nodes.
     */
    constructor(id: string, name: string, cost: [currency: CurrencyStatic, cost: (level: E, context: ISkill) => E], description?: string, effect?: (level: E, context: ISkill) => void, maxLevel?: DecimalSource, required?: ISkill[]);
    /**
     * Converts a skill to a skill tree node.
     * @param skillObj - The skill to convert to a skill tree node.
     * @returns The skill tree node.
     */
    static fromSkill(skillObj: ISkill): SkillNode;
}
/**
 * Represents a skill tree.
 */
declare class SkillTree {
    skills: ISkill[];
    /**
     * Represents a skill tree.
     * @param skills - The skills in the skill tree.
     */
    constructor(skills: (ISkill | SkillNode)[]);
    /**
     * Adds a skill to the skill tree.
     * @param skillNodeMember - The skill to add to the skill tree.
     */
    addSkill(skillNodeMember: (ISkill | SkillNode)[]): void;
}
export type { ISkill };
export { SkillNode, SkillTree };
