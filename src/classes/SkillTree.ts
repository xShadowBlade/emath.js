/**
 * @file Skill tree class
 * Work in progress
 */
import { Expose, Type } from "class-transformer";
import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";
// import { calculateUpgrade } from "./currency";
import type { CurrencyStatic } from "./Currency";
import { UpgradeData, UpgradeStatic, type UpgradeInit } from "./Upgrade";
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
     * Can also be a function that takes the skill tree context and returns the required skills.
     */
    readonly required?:
        | (SkillNodeStatic | SkillRequirement)[]
        | ((skillTreeContext: SkillTreeStatic) => (SkillNodeStatic | SkillRequirement)[]);
}

/**
 * The skill tree data.
 * A wrapper around the {@link UpgradeData} class that adds the skill tree specific properties.
 */
class SkillNodeData extends UpgradeData {
    /**
     * Constructs a new skill node data.
     * @param init - The skill node object initialization.
     */
    constructor(init: SkillInit) {
        // class-transformer bug
        init = init ?? {};

        super(init);
    }
}

/**
 * Represents an upgrade in the skill tree.
 * Each upgrade has its own id, name, description, cost, required skills, maximum level, and effect.
 */
class SkillNodeStatic extends UpgradeStatic implements SkillInit {
    public readonly costCurrency;
    public readonly required;

    /**
     * Represents a skill tree node.
     * @param init - The skill tree node to initialize.
     * @param dataPointer - The data of the skill tree node.
     */
    constructor(init: SkillInit, dataPointer: Pointer<SkillNodeData> = new SkillNodeData(init)) {
        super(init, dataPointer, init.costCurrency);

        // Assign properties
        this.costCurrency = init.costCurrency;
        this.required = init.required ?? [];
    }
}

/**
 * The frontend data for the skill tree.
 * This is used to serialize the skill tree data for saving and loading.
 */
class SkillTreeData {
    @Type(() => SkillNodeData)
    @Expose()
    public skills: Record<string, SkillNodeData>;

    constructor() {
        this.skills = {};
    }
}

/**
 * The backend for the skill tree.
 * Includes methods for interfacing with the skill tree data.
 * @template TSkillNames - A string union that represents the names of the skill nodes.
 */
class SkillTreeStatic<TSkillNames extends string = string> {
    /**
     * The skills in the skill tree.
     */
    public readonly skills = {} as Record<TSkillNames, SkillNodeStatic>;

    /** A function that returns the pointer of the data */
    protected readonly pointerFn: () => SkillTreeData;

    /** @returns The pointer of the data. */
    protected get pointer(): SkillTreeData {
        return this.pointerFn();
    }

    /**
     * Creates a new skill tree.
     * @param skills - The skills in the skill tree.
     * @param pointer - The pointer to the skill tree data.
     */
    constructor(skills: SkillInit<TSkillNames>[], pointer: Pointer<SkillTreeData> = new SkillTreeData()) {
        this.pointerFn = typeof pointer === "function" ? pointer : (): SkillTreeData => pointer;

        // If the skills are not an array, make them an array.
        skills = Array.isArray(skills) ? skills : [skills];

        this.addSkill(skills);
    }

    /**
     * Adds an skill node to the data class.
     * @param skill - Skill node to add
     * @returns The skill node object.
     */
    private pointerAddSkill(skill: SkillInit): SkillNodeData {
        const skillsToAdd = new SkillNodeData(skill);
        this.pointer.skills[skillsToAdd.id] = skillsToAdd;
        return skillsToAdd;
    }

    /**
     * Adds a skill to the skill tree.
     * Recommended to use the constructor instead of this method.
     * @param skillNodeMember - The skill to add to the skill tree.
     */
    public addSkill(skillNodeMember: SkillInit<TSkillNames>[]): void {
        // If the skills are not an array, make them an array.
        skillNodeMember = Array.isArray(skillNodeMember) ? skillNodeMember : [skillNodeMember];

        // For each skill in the init array, create a new skill node and add it to the skill tree.
        skillNodeMember.forEach((skillNode) => {
            // TODO: Also add it to the pointer
            this.skills[skillNode.id] = new SkillNodeStatic(skillNode);
        });
    }

    /**
     * Gets a skill from the skill tree.
     * @param id - The id of the skill to get.
     * @returns The skill node.
     */
    public getSkill(id: TSkillNames): SkillNodeStatic | null {
        return this.skills[id] ?? null;
    }

    /**
     * Checks if a skill is unlocked.
     * @param id - The id of the skill to check.
     * @returns If the skill is unlocked.
     */
    public isSkillUnlocked(id: TSkillNames | SkillNodeStatic): boolean {
        const skillToCheck = typeof id === "string" ? this.getSkill(id) : id;

        // If the skill is not found, it is not unlocked
        if (!skillToCheck) {
            return false;
        }

        // If there are no required skills, the skill is unlocked
        if (!skillToCheck.required || skillToCheck.required.length === 0) {
            return true;
        }

        // If the required skills are a function, call it
        const requiredSkills =
            typeof skillToCheck.required === "function" ? skillToCheck.required(this) : skillToCheck.required;

        // Check if all the required skills are unlocked
        return requiredSkills.every((requiredSkill) => {
            // If the required skill is a skill node with extra levels, check if the level is high enough
            if ("skill" in requiredSkill) {
                return requiredSkill.skill.level.gte(requiredSkill.level) && this.isSkillUnlocked(requiredSkill.skill);
            }

            // If the required skill is just a skill node, check if it is unlocked
            return this.isSkillUnlocked(requiredSkill);
        });
    }

    public calculateSkill(
        id: TSkillNames | SkillNodeStatic,
        target: DecimalSource = Infinity,
        mode?: MeanMode,
        iterations?: number,
    ): [amount: Decimal, cost: Decimal] {
        // Get the skill
        const skillToCalculate = typeof id === "string" ? this.getSkill(id) : id;

        // If the skill is not found, return 0
        if (!skillToCalculate) {
            console.warn(`eMath.js: Skill "${id as string}" not found in skill tree.`);
            return [Decimal.dZero, Decimal.dZero];
        }

        // If the skill is not unlocked, return 0
        if (!this.isSkillUnlocked(skillToCalculate)) {
            return [Decimal.dZero, Decimal.dZero];
        }

        // TODO: Complete this
        throw new Error();
    }
}

export type { SkillInit };
export { SkillNodeStatic as SkillNode, SkillTreeStatic as SkillTree };
