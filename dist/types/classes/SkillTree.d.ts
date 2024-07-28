import { Decimal } from "../E/e";
import type { CurrencyStatic } from "./Currency";
import type { UpgradeInit } from "./Upgrade";
/**
 * Represents a skill tree node.
 * WIP
 */
interface SkillInit extends Omit<UpgradeInit, "costBulk" | "effect" | "cost" | "descriptionFn" | "defaultLevel"> {
    cost: [
        currency: CurrencyStatic,
        cost: (level: Decimal, context: SkillInit) => Decimal
    ];
    costBulk?: [
        currency: CurrencyStatic,
        cost: (level: Decimal, context: SkillInit) => [cost: Decimal, amount: Decimal]
    ];
    required?: SkillInit[];
    effect?: (level: Decimal, context: SkillInit) => void;
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
    required: SkillInit[];
    maxLevel: Decimal;
    effect: ((level: Decimal, context: SkillInit) => void) | undefined;
    /**
     * Represents a skill tree node.
     * @param id - The ID of the skill tree node.
     * @param name - The name of the skill tree node. Defaults to the id.
     * @param cost - The cost of the skill tree node. Defaults to 0.
     * @param description - The description of the skill tree node.
     * @param effect - The effect of the skill tree node.
     * @param maxLevel - The maximum level of the skill tree node. Defaults to 1.
     * @param required - The IDs of the required skill tree nodes.
     * @param skill
     */
    constructor(skill: SkillInit);
}
/**
 * Represents a skill tree.
 * WIP
 */
declare class SkillTree {
    skills: SkillInit[];
    /**
     * Represents a skill tree.
     * @param skills - The skills in the skill tree.
     */
    constructor(skills: (SkillInit | SkillNode)[]);
    /**
     * Adds a skill to the skill tree.
     * @param skillNodeMember - The skill to add to the skill tree.
     */
    addSkill(skillNodeMember: (SkillInit | SkillNode)[]): void;
}
export type { SkillInit as ISkill };
export { SkillNode, SkillTree };
