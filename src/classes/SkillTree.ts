/**
 * @file Skill tree class
 * Work in progress
 */
import { Expose, Type } from "class-transformer";
import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";
// import { calculateUpgrade } from "./currency";
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
interface SkillInit
    extends Omit<
        UpgradeInit,
        "costBulk" | "effect" | "cost" | "descriptionFn" | "defaultLevel"
    > {
    /**
     * The cost of the skill tree node.
     * [currency, cost] - The currency and cost of the skill tree node.
     */
    cost: [
        currency: CurrencyStatic,
        cost: (level: Decimal, context: SkillInit) => Decimal,
    ];

    /**
     * A function that returns the cost of buying multiple levels of the skill.
     */
    costBulk?: [
        currency: CurrencyStatic,
        cost: (
            level: Decimal,
            context: SkillInit,
        ) => [cost: Decimal, amount: Decimal],
    ];

    /**
     * The skill nodes that are required to unlock this skill node.
     * See {@link RequiredSkill} for more information.
     * Can also be a function that takes the skill tree context and returns the required skills.
     */
    required?:
        | (SkillNode | RequiredSkill)[]
        | ((skillTreeContext: SkillTree) => (SkillNode | RequiredSkill)[]);

    /**
     * The effect of the skill tree node.
     * @param level - The level of the skill tree node.
     * @param context - The skill tree node.
     */
    effect?: (level: Decimal, context: SkillNode) => void;
}

class SkillNodeData {
    @Expose()
    public id: string;

    @Expose()
    @Type(() => Decimal)
    public level: Decimal;

    constructor(id: string, level: DecimalSource = Decimal.dZero) {
        this.id = id;
        this.level = new Decimal(level);
    }
}

/**
 * Represents a skill tree node.
 * WIP
 */
class SkillNode implements SkillInit {
    public id;
    name;
    description;
    cost;
    required;
    maxLevel;
    effect;

    /**
     * @returns The data of the skill node.
     */
    private data: () => SkillNodeData;

    /**
     * @returns The level of the skill node.
     */
    public get level(): Decimal {
        return this.data().level;
    }

    /**
     * Represents a skill tree node.
     * @param skill - The skill tree node to initialize.
     * @param data
     */
    constructor(
        skill: SkillInit,
        data: SkillNodeData = new SkillNodeData(skill.id, skill.level),
    ) {
        // Assign the values
        this.id = skill.id;
        this.name = skill.name ?? skill.id;
        this.description = skill.description ?? "";
        this.cost = skill.cost;
        this.effect = skill.effect;
        this.required = skill.required ?? [];
        this.maxLevel = skill.maxLevel
            ? new Decimal(skill.maxLevel)
            : Decimal.dZero;

        // Create the data function
        this.data = (): SkillNodeData => data;
    }
}

class SkillTreeData {
    @Type(() => SkillNode)
    @Expose()
    public skills: Record<string, SkillNode>;

    constructor(skills: Record<string, SkillNode>) {
        this.skills = skills;
    }
}

/**
 * A skill tree.
 * WIP
 */
class SkillTree {
    /**
     * The skills in the skill tree.
     */
    public readonly skills: Record<string, SkillNode>;

    /**
     * Creates a new skill tree.
     * @param skills - The skills in the skill tree.
     */
    constructor(skills: (SkillInit | SkillNode)[] | (SkillInit | SkillNode)) {
        // If the skills are not an array, make them an array.
        skills = Array.isArray(skills) ? skills : [skills];

        this.skills = {};
        this.addSkill(skills);
    }

    /**
     * Adds a skill to the skill tree.
     * @param skillNodeMember - The skill to add to the skill tree.
     */
    public addSkill(
        skillNodeMember: (SkillInit | SkillNode)[] | (SkillInit | SkillNode),
    ): void {
        // If the skills are not an array, make them an array.
        skillNodeMember = Array.isArray(skillNodeMember)
            ? skillNodeMember
            : [skillNodeMember];

        // For each skill in the init array, if it is not a skill node, create a new skill node and add it to the skill tree.
        skillNodeMember.forEach((skillNode) => {
            if (skillNode instanceof SkillNode) {
                this.skills[skillNode.id] = skillNode;
            } else {
                this.skills[skillNode.id] = new SkillNode(skillNode);
            }
        });
    }

    /**
     * Gets a skill from the skill tree.
     * @param id - The id of the skill to get.
     * @returns The skill node.
     */
    public getSkill(id: string): SkillNode {
        return this.skills[id];
    }

    /**
     * Checks if a skill is unlocked.
     * @param id - The id of the skill to check.
     * @returns If the skill is unlocked.
     */
    public isSkillUnlocked(id: string): boolean {
        const skillToCheck = this.getSkill(id);

        // If there are no required skills, the skill is unlocked
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!skillToCheck.required || skillToCheck.required.length === 0) {
            return true;
        }

        // If the required skills are a function, call it
        const requiredSkills =
            typeof skillToCheck.required === "function"
                ? skillToCheck.required(this)
                : skillToCheck.required;

        // Check if all the required skills are unlocked
        return requiredSkills.every((requiredSkill) => {
            // If the required skill is a skill node with extra levels, check if the level is high enough
            if ("skill" in requiredSkill) {
                return (
                    requiredSkill.skill.level.gte(requiredSkill.level) &&
                    this.isSkillUnlocked(requiredSkill.skill.id)
                );
            }

            // If the required skill is just a skill node, check if it is unlocked
            return this.isSkillUnlocked(requiredSkill.id);
        });
    }
}

export type { SkillInit };
export { SkillNode, SkillTree };
