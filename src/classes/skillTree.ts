/**
 * @file Skill tree class
 */
import { E, ESource } from "../E/eMain";
import type { currencyStatic } from "./currency";

interface Skill {
    id: string;
    name: string;
    description?: string;
    cost: [currency: currencyStatic, cost: (level: E, context: Skill) => E];
    required: Skill[];
    maxLevel: E;
    effect?: (level: E, context: Skill) => void;
}

/**
 * Represents a skill tree node.
 */
class skillNode implements Skill {
    public id: string;
    public name: string;
    public description: string;
    public cost: [currency: currencyStatic, cost: (level: E, context: Skill) => E];
    public required: Skill[];
    public maxLevel: E;
    public effect?: (level: E, context: Skill) => void;

    /**
     * Represents a skill tree node.
     * @param id - The ID of the skill tree node.
     * @param name - The name of the skill tree node. Defaults to the id.
     * @param description - The description of the skill tree node.
     * @param cost - The cost of the skill tree node. Defaults to 0.
     * @param effect - The effect of the skill tree node.
     * @param maxLevel - The maximum level of the skill tree node. Defaults to 1.
     * @param required - The IDs of the required skill tree nodes.
     */
    constructor (
        id: string,
        name: string,
        cost: [currency: currencyStatic, cost: (level: E, context: Skill) => E],
        description?: string,
        effect?: (level: E, context: Skill) => void,
        maxLevel?: ESource,
        required?: Skill[],
    )
    // constructor (skillNode: Skill);
    // constructor (idOrSkillNode: string | Skill, name: string, description: string, cost: ESource, effect: (level: E, context: Skill) => void, maxLevel: ESource, required: Skill[])
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
        this.cost = cost ?? (() => E(0));
        this.effect = effect;
        this.required = required ?? [];
        this.maxLevel = maxLevel ? E(maxLevel) : E(0);
    }

    /**
     * Converts a skill to a skill tree node.
     * @param skillObj - The skill to convert to a skill tree node.
     * @returns The skill tree node.
     */
    public static fromSkill (skillObj: Skill): skillNode {
        return new skillNode(skillObj.id, skillObj.name, skillObj.cost, skillObj.description, skillObj.effect, skillObj.maxLevel, skillObj.required);
    }
}

/**
 * Represents a skill tree.
 */
class skillTree {
    public skills: Skill[];

    /**
     * Represents a skill tree.
     * @param skills - The skills in the skill tree.
     */
    constructor (skills: (Skill | skillNode)[]) {
        this.skills = skills.map(skillNodeMember => {
            if (skillNodeMember instanceof skillNode) {
                return skillNodeMember;
            } else {
                return skillNode.fromSkill(skillNodeMember);
            }
        });
    }

    /**
     * Adds a skill to the skill tree.
     * @param skillNodeMember - The skill to add to the skill tree.
     */
    public addSkill (skillNodeMember: (Skill | skillNode)[]): void {
        if (Array.isArray(skillNodeMember)) {
            this.skills.push(...skillNodeMember);
        } else {
            this.skills.push(skillNodeMember);
        }
    }
}

export { skillNode, skillTree, Skill };