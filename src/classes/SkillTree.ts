/**
 * @file Skill tree class
 * Work in progress
 */
import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";
// import { calculateUpgrade } from "./currency";
import type { CurrencyStatic } from "./Currency";
import type { IUpgradeStatic } from "./Upgrade";

interface ISkill extends Omit<IUpgradeStatic, "costBulk" | "effect" | "cost" | "descriptionFn" | "defaultLevel"> {
    cost: [currency: CurrencyStatic, cost: (level: Decimal, context: ISkill) => Decimal];
    costBulk?: [currency: CurrencyStatic, cost: (level: Decimal, context: ISkill) => [cost: Decimal, amount: Decimal]];
    required: ISkill[];
    effect?: (level: Decimal, context: ISkill) => void;
}

/**
 * Represents a skill tree node.
 * WIP
 */
class SkillNode implements ISkill {
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
        id: string,
        name: string,
        cost: [currency: CurrencyStatic, cost: (level: Decimal, context: ISkill) => Decimal],
        description?: string,
        effect?: (level: Decimal, context: ISkill) => void,
        maxLevel?: DecimalSource,
        required?: ISkill[],
    )
    // constructor (skillNode: ISkill);
    // constructor (idOrSkillNode: string | ISkill, name: string, description: string, cost: DecimalSource, effect: (level: Decimal, context: ISkill) => void, maxLevel: DecimalSource, required: ISkill[])
    {
        // if (typeof idOrSkillNode === "object") {
        //     const skillNode = idOrSkillNode;
        //     this.id = skillNode.id;
        //     this.name = skillNode.name;
        //     this.description = skillNode.description;
        //     this.cost = skillNode.cost;
        //     this.effect = skillNode.effect;
        //     this.required = skillNode.required;
        //     this.maxLevel = skillNode.maxLevel;
        //     return;
        // }
        // this.id = idOrSkillNode;
        this.id = id;
        this.name = name ?? id;
        this.description = description ?? "";
        this.cost = cost ?? (() => new Decimal(0));
        this.effect = effect;
        this.required = required ?? [];
        this.maxLevel = maxLevel ? new Decimal(maxLevel) : new Decimal(0);
    }

    /**
     * Converts a skill to a skill tree node.
     * @param skillObj - The skill to convert to a skill tree node.
     * @returns The skill tree node.
     */
    public static fromSkill (skillObj: ISkill): SkillNode {
        return new SkillNode(skillObj.id, skillObj.name, skillObj.cost, skillObj.description, skillObj.effect, skillObj.maxLevel, skillObj.required);
    }
}

/**
 * Represents a skill tree.
 */
class SkillTree {
    public skills: ISkill[];

    /**
     * Represents a skill tree.
     * @param skills - The skills in the skill tree.
     */
    constructor (skills: (ISkill | SkillNode)[]) {
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
    public addSkill (skillNodeMember: (ISkill | SkillNode)[]): void {
        if (Array.isArray(skillNodeMember)) {
            this.skills.push(...skillNodeMember);
        } else {
            this.skills.push(skillNodeMember);
        }
    }
}

export type { ISkill };
export { SkillNode, SkillTree };
