/**
 * @file Skill tree class
 */
import "reflect-metadata";

import { Expose, Type } from "class-transformer";
import { Decimal } from "../E/e";
import type { DecimalSource } from "../E/e";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UpgradeData, UpgradeStatic, calculateUpgrade } from "./Upgrade";
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
    readonly requirements?:
        | (TId | SkillNodeStatic | SkillRequirement)[]
        | ((
              skillTreeContext: SkillTreeStatic,
              skillNodeContext: SkillNodeStatic,
          ) => (TId | SkillNodeStatic | SkillRequirement)[])
        | ((skillTreeContext: SkillTreeStatic, skillNodeContext: SkillNodeStatic) => boolean);
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
    public readonly requirements;

    /**
     * Represents a skill tree node.
     * @param init - The skill tree node to initialize.
     * @param dataPointer - The data of the skill tree node.
     */
    constructor(init: SkillInit, dataPointer: Pointer<SkillNodeData> = new SkillNodeData(init)) {
        super(init, dataPointer, init.costCurrency);

        // Assign properties
        this.costCurrency = init.costCurrency;
        this.requirements = init.requirements ?? [];
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
        if (!skillToCheck.requirements || skillToCheck.requirements.length === 0) {
            return true;
        }

        // If the required skills are a function, call it
        const requiredSkills =
            typeof skillToCheck.requirements === "function"
                ? skillToCheck.requirements(this, skillToCheck)
                : skillToCheck.requirements;

        // If the requirements is a boolean, return the boolean value
        if (typeof requiredSkills === "boolean") {
            return requiredSkills;
        }

        // Check if all the required skills are unlocked
        return requiredSkills.every((requiredSkill) => {
            // If the required skill is a string, get the skill node
            if (typeof requiredSkill === "string") {
                const skillNode = this.getSkill(requiredSkill as TSkillNames);

                // If the skill node is not found, return false
                if (!skillNode) {
                    console.warn(`eMath.js: Required skill "${requiredSkill}" not found in skill tree.`);
                    return false;
                }

                requiredSkill = skillNode;
            }

            // If the required skill is a skill node with extra levels, check if the level is high enough
            if ("skill" in requiredSkill) {
                return requiredSkill.skill.level.gte(requiredSkill.level) && this.isSkillUnlocked(requiredSkill.skill);
            }

            // If the required skill is just a skill node, check if it is unlocked
            return this.isSkillUnlocked(requiredSkill);
        });
    }

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

        return skillToCalculate.costCurrency.calculateUpgrade(skillToCalculate, target, mode, iterations);
    }

    /**
     * Calculates how much is needed for the next skill. A wrapper around {@link CurrencyStatic.getNextCost}.
     * @deprecated Use {@link getNextCostMax} instead as it is more versatile.
     * @param id - Index or ID of the upgrade.
     * @param target - How many before the next upgrade.
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns The cost of the next upgrade.
     */
    public getNextCost(
        id: TSkillNames | SkillNodeStatic,
        target: DecimalSource = 1,
        mode?: MeanMode,
        iterations?: number,
    ): Decimal {
        // Get the skill
        const skillToCalculate = typeof id === "string" ? this.getSkill(id) : id;

        // If the skill is not found, return 0
        if (!skillToCalculate) {
            console.warn(`eMath.js: Skill "${id as string}" not found in skill tree.`);
            return Decimal.dZero;
        }

        // If the skill is not unlocked, return 0
        if (!this.isSkillUnlocked(skillToCalculate)) {
            return Decimal.dZero;
        }

        return skillToCalculate.costCurrency.getNextCost(skillToCalculate, target, mode, iterations);
    }

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
    public getNextCostMax(
        id: TSkillNames | SkillNodeStatic,
        target: DecimalSource = 1,
        mode?: MeanMode,
        iterations?: number,
    ): Decimal {
        // Get the skill
        const skillToCalculate = typeof id === "string" ? this.getSkill(id) : id;

        // If the skill is not found, return 0
        if (!skillToCalculate) {
            console.warn(`eMath.js: Skill "${id as string}" not found in skill tree.`);
            return Decimal.dZero;
        }

        // If the skill is not unlocked, return 0
        if (!this.isSkillUnlocked(skillToCalculate)) {
            return Decimal.dZero;
        }

        return skillToCalculate.costCurrency.getNextCostMax(skillToCalculate, target, mode, iterations);
    }

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
    public buySkill(
        id: TSkillNames | SkillNodeStatic,
        target: DecimalSource = Infinity,
        mode?: MeanMode,
        iterations?: number,
    ): boolean {
        // Get the skill
        const skillToBuy = typeof id === "string" ? this.getSkill(id) : id;

        // If the skill is not found, return false
        if (!skillToBuy) {
            console.warn(`eMath.js: Skill "${id as string}" not found in skill tree.`);
            return false;
        }

        // If the skill is not unlocked, return false
        if (!this.isSkillUnlocked(skillToBuy)) {
            return false;
        }

        // Try to buy the upgrade
        return skillToBuy.costCurrency.buyUpgrade(skillToBuy, target, mode, iterations);
    }
}

export type { SkillInit, SkillRequirement };
export { SkillNodeStatic, SkillTreeStatic, SkillTreeData, SkillNodeData };
