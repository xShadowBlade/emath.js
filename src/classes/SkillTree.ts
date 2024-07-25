/**
 * @file Skill tree class
 * Work in progress
 */
import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";
// import { calculateUpgrade } from "./currency";
import type { CurrencyStatic } from "./Currency";
import type { IUpgradeStatic } from "./Upgrade";

interface SkillInit extends Omit<IUpgradeStatic, "costBulk" | "effect" | "cost" | "descriptionFn" | "defaultLevel"> {
    cost: [currency: CurrencyStatic, cost: (level: Decimal, context: SkillInit) => Decimal];
    costBulk?: [currency: CurrencyStatic, cost: (level: Decimal, context: SkillInit) => [cost: Decimal, amount: Decimal]];
    required: SkillInit[];
    effect?: (level: Decimal, context: SkillInit) => void;
}

/**
 * Represents a skill tree node.
 * WIP
 */
class SkillNode implements SkillInit {
    public id; name; description; cost; required; maxLevel; effect;

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
    constructor (
        // id: string,
        // name: string,
        // cost: [currency: CurrencyStatic, cost: (level: Decimal, context: SkillInit) => Decimal],
        // description?: string,
        // effect?: (level: Decimal, context: SkillInit) => void,
        // maxLevel?: DecimalSource,
        // required?: SkillInit[],
        skill: SkillInit,
    )
    {
        // Assign the values
        this.id = skill.id;
        this.name = skill.name ?? skill.id;
        this.description = skill.description ?? "";
        this.cost = skill.cost ?? (() => Decimal.dZero);
        this.effect = skill.effect;
        this.required = skill.required ?? [];
        this.maxLevel = skill.maxLevel ? new Decimal(skill.maxLevel) : Decimal.dZero;
    }

    // /**
    //  * Converts a skill to a skill tree node.
    //  * @param skillObj - The skill to convert to a skill tree node.
    //  * @returns The skill tree node.
    //  */
    // public static fromSkill (skillObj: SkillInit): SkillNode {
    //     return new SkillNode(skillObj.id, skillObj.name, skillObj.cost, skillObj.description, skillObj.effect, skillObj.maxLevel, skillObj.required);
    // }
}

/**
 * Represents a skill tree.
 */
class SkillTree {
    public skills: SkillInit[];

    /**
     * Represents a skill tree.
     * @param skills - The skills in the skill tree.
     */
    constructor (skills: (SkillInit | SkillNode)[]) {
        this.skills = skills.map(skillNodeMember => {
            if (skillNodeMember instanceof SkillNode) {
                return skillNodeMember;
            } else {
                return SkillNode.fromSkill(skillNodeMember);
            }
        });
    }

    /**
     * Adds a skill to the skill tree.
     * @param skillNodeMember - The skill to add to the skill tree.
     */
    public addSkill (skillNodeMember: (SkillInit | SkillNode)[]): void {
        if (Array.isArray(skillNodeMember)) {
            this.skills.push(...skillNodeMember);
        } else {
            this.skills.push(skillNodeMember);
        }
    }
}

export type { SkillInit as ISkill };
export { SkillNode, SkillTree };
