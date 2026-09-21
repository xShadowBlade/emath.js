/* eslint-disable jsdoc/check-param-names */
/**
 * @file Declares classes related to upgrades.
 */
import { Type } from "class-transformer";
import "reflect-metadata";

import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";
import { DataManager, StaticClassWithData, SubscribableDataEntry } from "../game";
import { Currency } from "./Currency";
import { InvalidDecimalProtections } from "./InvalidDecimalProtections";
import { calculateInverseFunction } from "./numericalAnalysis/inverseFunction";
import type { MeanMode } from "./numericalAnalysis/numericalAnalysis";
import { calculateSum } from "./numericalAnalysis/sum";
import { UpgradeCost } from "./UpgradeCost";

/**
 * Stores the data for an upgrade.
 */
class UpgradeData {
    /**
     * A placeholder readonly upgrade data object that returns a level of 0.
     */
    public static readonly placeholderUpgradeData: UpgradeData = new (class implements UpgradeData {
        public get level(): Decimal {
            return new Decimal(Decimal.dZero);
        }

        public set level(level: Decimal) {
            console.warn(
                "eMath.js: Attempted to set level on placeholder upgrade data. Possibly Upgrade dataSupplier has not been set yet.",
            );
        }
    })();

    /**
     * The current level of the upgrade.
     */
    @Type(() => Decimal)
    public level: Decimal = new Decimal(Decimal.dZero);
}

/**
 * The result returned by {@link Upgrade.calculate}.
 */
type UpgradeCalculationResult = {
    /**
     * The new level of the upgrade after the calculation.
     */
    newLevel: Decimal;

    /**
     * Entries of the cost for each currency used to buy the upgrade.
     * Is not included if the upgrade is an el upgrade (el = true).
     */
    costs: [currency: Currency, cost: Decimal][];
};

/**
 * An upgrade that can be purchased with a currency.
 */
class Upgrade<TEffectReturnType = unknown> implements StaticClassWithData {
    /**
     * A helper function to generate a costBulk function for upgrades with a non-scaling cost (cost is independent of the level).
     * @param cost - The cost of the upgrade.
     * @returns A costBulk function that can be used in the upgrade object.
     */
    // public static getCostBulkForNonScalingUpgrade(cost: DecimalSource): typeof Upgrade.prototype.costBulk {
    //     cost = new Decimal(cost);

    //     return (currencyValue: Decimal, level: Decimal, target: Decimal): [Decimal, Decimal] => {
    //         const amountBuyable = currencyValue.div(cost).floor().clamp(Decimal.dZero, target);

    //         return [amountBuyable, amountBuyable.mul(cost)];
    //     };
    // }

    /**
     * The ID of the upgrade.
     * Used to retrieve the upgrade when its data is stored in the data manager.
     */
    public readonly id: string;

    /**
     * The name of the upgrade. Defaults to the ID.
     * For display purposes only. Not used internally.
     */
    public name = "";

    /**
     * The maximum level of the upgrade.
     * If not set, the upgrade will have a maximum level of `Infinity` and can continue to increase indefinitely.
     */
    public maxLevel: Decimal = Decimal.dInf;

    /**
     * The effect of the upgrade. This runs when the upgrade is bought, and instantly if `runEffectInstantly` is true.
     * @param level - The current level of the upgrade.
     * @param upgradeContext - The upgrade object that the effect is being run on.
     */
    public effect: (level: Decimal, upgradeContext: this) => TEffectReturnType = () => {
        // Empty effect placeholder
        return undefined as unknown as TEffectReturnType;
    };

    /**
     * The effect that runs only once when the upgrade is added to the data manager.
     * @param upgradeContext - The upgrade object that the effect is being run on.
     */
    public effectOnAdd: (upgradeContext: this) => TEffectReturnType = () => {
        // Empty effect placeholder
        return undefined as unknown as TEffectReturnType;
    };

    /**
     * The level to set this upgrade when it is reset in {@link Currency.reset}.
     */
    public defaultLevel: Decimal = Decimal.dZero;

    /**
     * The protections for {@link level}.
     * @see {@link InvalidDecimalProtections}.
     */
    public readonly levelProtections = new InvalidDecimalProtections({
        allowNaN: false,
        allowInfinite: false,
        allowNegative: false,
    });

    /**
     * The default size of the {@link lowerCache} when it is first created. Can be changed with {@link withCacheSize}.
     * @default 10000
     */
    public static readonly defaultCacheSize = 10000;

    /**
     * @returns A reference to the data of the upgrade.
     * Before this upgrade is added to the data manager ({@link onAddToDataManager}) (can occur when the upgrade is initialized/{@link effectOnAdd} is called),
     * this will return the {@link UpgradeData.placeholderUpgradeData} object.
     */
    protected dataSupplier: () => UpgradeData = () => UpgradeData.placeholderUpgradeData;

    /**
     * @returns A reference to the data of the upgrade.
     * @see {@link dataSupplier}
     */
    protected get data(): UpgradeData {
        return this.dataSupplier();
    }

    /**
     * @returns A description of the upgrade based on this upgrade.
     * Not used internally, but you can use it to display a description.
     * @param upgradeContext - The upgrade object that the description is being run on.
     * @example
     * const description = (upgrade) => `This upgrade is at level ${upgrade.level}`;
     *
     * const upgrade = new Upgrade(...);
     *
     * // Buy a level of the upgrade
     * upgrade.buyOne();
     *
     * // Getter property
     * console.log(upgrade.description); // "This upgrade is at level 1"
     */
    public descriptionSupplier: (upgradeContext: this) => string = () => "";

    /**
     * @returns A description of the upgrade.
     * @see {@link descriptionSupplier}
     */
    public get description(): string {
        return this.descriptionSupplier(this);
    }

    /**
     * The current level of the upgrade.
     * @returns The current level of the upgrade.
     */
    get level(): Decimal {
        return this.data.level;
    }
    set level(level: DecimalSource) {
        this.data.level = this.levelProtections.validateValueOrElse(
            level,
            this.data.level,
            `Upgrade "${this.id}" level`,
            this,
        );

        this.levelDataEntry.notifyListeners();
    }

    /**
     * A {@link SubscribableDataEntry} for the {@link level} of this upgrade.
     * @see {@link SubscribableDataEntry}
     */
    public readonly levelDataEntry = SubscribableDataEntry.fromGetterSetter(
        () => this.level,
        (newLevel) => {
            this.level = newLevel;
        },
        false,
    );

    public readonly costs: UpgradeCost[] = [];

    public latestEffectOnAddResult: TEffectReturnType | undefined = undefined;
    public latestEffectResult: TEffectReturnType | undefined = undefined;

    protected lowerCacheSize: number | null = Upgrade.defaultCacheSize;

    /**
     * Creates a new upgrade object with the given id.
     * @param id - The {@link id} of the upgrade.
     */
    constructor(id: string) {
        this.id = id;
        this.name = id;
    }

    protected getEffect(): TEffectReturnType {
        return this.effect(this.level, this);
    }

    /**
     * Calls the {@link effect} function with the arguments for this and the currency.
     */
    public runEffect(): void {
        this.latestEffectResult = this.getEffect();
    }

    protected getEffectOnAdd(): TEffectReturnType {
        return this.effectOnAdd(this);
    }

    /**
     * Calls the {@link runEffectOnAdd} function with the arguments for this and the currency.
     */
    public runEffectOnAdd(): void {
        this.latestEffectOnAddResult = this.getEffectOnAdd();
    }

    /**
     * Called when the upgrade is added to the data manager.
     * Sets the {@link dataSupplier} and {@link currencySupplier} functions to return the correct data and currency.
     * @param dataManager - The data manager that the upgrade is being added to.
     * @param prefix - An optional prefix to add to the data key. If not provided, the data key will be the same as the upgrade id. If provided, the data key will be `${prefix}_${id}`.
     */
    public onAddToDataManager(dataManager: DataManager, prefix?: string): void {
        const dataKey = `${prefix ? prefix + "_" : ""}${this.id}`;

        this.dataSupplier = dataManager.setData(dataKey, new UpgradeData());

        // Populate the cache if it hasn't been populated yet
        this.withCacheSize(undefined, true);

        this.runEffectOnAdd();
    }

    /**
     * Called when the upgrade data is loaded from the data manager.
     */
    public onLoadData(): void {
        // Run setter method to run protections and other side effects of setting the level.
        this.level = this.data.level;

        this.runEffect();
    }

    /**
     * Gets the value of a field with an alternate level.
     * @param levelOverride - The level to temporarily override the current level with.
     * @param supplier - A function that returns the value of the field to get.
     * @returns The value of the field with the alternate level.
     */
    public getFieldWithAlternateLevel<T>(levelOverride: DecimalSource, supplier: () => T): T {
        // Store and change the level to the alternate level
        const originalLevel = this.level;
        this.data.level = new Decimal(levelOverride);

        const result = supplier();

        // Set back original using .data directly to bypass protections (probably the original level is already valid)
        this.data.level = originalLevel;

        return result;
    }

    /**
     * @param level - The level to get the description for.
     * @returns A description of the upgrade at the given level.
     */
    public getDescriptionWithAlternateLevel(level: DecimalSource): string {
        return this.getFieldWithAlternateLevel(level, () => this.description);
    }

    /**
     * @returns The cost to buy the next upgrade. Equal to the {@link cost} evaluated at the current {@link level}.
     */
    public getNextCost(): UpgradeCalculationResult {
        return {
            newLevel: this.level.add(Decimal.dOne),
            costs: this.costs.map((cost) => [cost.currency, cost.cost(this.level)]),
        };
    }

    /**
     * Calculates the cost and how many upgrades you can buy.
     * If the {@link endLevel} is within the {@link lowerCache} bounds, it will use the {@link lowerCache} to calculate the cost and amount significantly faster.
     * Otherwise, it will use {@link calculateInverseFunction} and {@link calculateSum} (if applicable) to calculate the cost and amount.
     *
     * If this upgrade is a {@link SkillNode}, if this skill node has not been {@link SkillNode.isUnlocked} yet, an upgrade cannot be bought.
     *
     * The priority is:
     * 1. `target === 1`: buy one, manual check next cost
     * 2. {@link costBulk} exists: use it
     * 3. `lowerCache.isWithinBounds()`: look up in cache
     * 4. `el === true`: use {@link calculateInverseFunction}
     * 5. Otherwise: use {@link calculateInverseFunction} and {@link calculateSum}.
     *
     * - For {@link endLevel}s within the {@link lowerCache} bounds, this function has a max time complexity of O(log(n)) where n is the size of the {@link lowerCache}.
     * - For sum upgrades, this function has a max time complexity of O(n^2) where n is the number of iterations ({@link maxUpperIterations}).
     * - For el upgrades, this function has a max time complexity of O(n) where n is the number of iterations ({@link maxUpperIterations}).
     * @param value - The current value of the currency. Defaults to the current value of the currency.
     * @param startLevel - The starting level of the upgrade. Defaults the current level of the upgrade.
     * @param endLevel - The ending level or quantity to reach for the upgrade. If not provided, it will buy the maximum amount of upgrades possible (using target = `Infinity`).
     * @param meanMode - The mode/mean method to use. See {@link MeanMode}
     * @param maxUpperIterations - The amount of iterations to perform. Defaults to `15`.
     * @returns a {@link UpgradeCalculationResult} or [amount, cost] - Returns the amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns `[currentLevel, 0]`.
     * @see {@link UpgradeCalculationResult}
     */
    public calculate(
        startLevel: DecimalSource = this.level,
        endLevel: DecimalSource = Decimal.dInf,
        currencyValues?: Decimal[],
    ): UpgradeCalculationResult {
        // Check if upgrade has a cost
        if (this.costs.length === 0) {
            console.warn(`eMath.js: Upgrade "${this.id}" has no costs defined. Cannot calculate.`);
            return {
                newLevel: this.level,
                costs: [],
            };
        }

        // Normalize the values
        startLevel = Decimal.fromValue_noAlloc(startLevel);
        endLevel = Decimal.fromValue_noAlloc(endLevel).min(this.maxLevel);

        // Bounds check
        if (startLevel.gte(endLevel)) {
            return {
                newLevel: this.level,
                costs: [],
            };
        }

        // For every cost, calculate the amount of upgrades that can be bought
        let maxAffordableLevel = endLevel;
        for (let i = 0; i < this.costs.length; i++) {
            const cost = this.costs[i];
            const amount = cost.getMaximumAffordable(startLevel, endLevel, currencyValues?.[i]);

            if (amount.lt(maxAffordableLevel)) {
                maxAffordableLevel = amount;
            }
        }

        const result: UpgradeCalculationResult = {
            newLevel: maxAffordableLevel,
            costs: [],
        };

        // If the max affordable level is less than or equal to the start level, return early
        if (maxAffordableLevel.lte(startLevel)) {
            return result;
        }

        for (const cost of this.costs) {
            if (cost.isEl()) {
                continue;
            }

            result.costs.push([
                cost.currency,
                cost.getAccumulatedCostAtLevel(maxAffordableLevel).sub(cost.lastAdjustmentValue),
            ]);
        }

        return result;
    }

    /**
     * Calculates the cost and how many upgrades you can buy with an end level that is the current level plus the {@link additiveLevelTarget}.
     * @param additiveLevelTarget - The additive level target to add to the current level.
     * @returns a {@link UpgradeCalculationResult}.
     * @see {@link calculate}
     */
    public calculateWithAdditiveLevelTarget(additiveLevelTarget: DecimalSource): UpgradeCalculationResult {
        return this.calculate(undefined, this.level.add(additiveLevelTarget));
    }

    /**
     * Calculates the cost of the next upgrade after the maximum affordable quantity.
     * @param calculationResult - The result of {@link calculate}. If not provided, it will calculate it using the current currency value and level.
     * @returns The cost of the next upgrade. Equal to the cost of the upgrade at the level of `amountAffordable` plus the cost of the next upgrade
     */
    public getCumulativeSubsequentCost(
        calculationResult: UpgradeCalculationResult = this.calculate(),
    ): UpgradeCalculationResult {
        // const nextCost = this.cost(calculationResult[0]).add(calculationResult[1]);
        // return nextCost;
        return {
            newLevel: calculationResult.newLevel.add(Decimal.dOne),
            costs: this.costs.map((cost) => [
                cost.currency,
                cost
                    .cost(calculationResult.newLevel)
                    .add(
                        calculationResult.costs.find(([currency]) => currency === cost.currency)?.[1] ?? Decimal.dZero,
                    ),
            ]),
        };
    }

    /**
     * Buys an upgrade based on its ID or array position if enough currency is available.
     * @param calculationResult - The result of {@link Upgrade.calculate}. If not provided, it will calculate it using the current currency value and level.
     * @returns Returns true if the purchase or upgrade is successful, or false if a level cannot be bought or the new level is less than the current level.
     */
    public buyMax(calculationResult: UpgradeCalculationResult = this.calculate()): boolean {
        // Check if affordable
        if (calculationResult.newLevel.lte(this.level)) {
            return false;
        }

        // Deduct the cost from available currency
        for (const [currency, cost] of calculationResult.costs ?? []) {
            currency.value = currency.value.sub(cost);
        }

        // Set the upgrade level
        this.level = calculationResult.newLevel;

        // Call the effect function if it exists
        this.runEffect();

        return true;
    }

    /**
     * Buys one upgrade if enough currency is available.
     * @returns Returns true if enough currency is available and the 1 upgrade is bought, or false if there is not enough currency.
     */
    public buyOne(): boolean {
        return this.buyMax(this.calculate(undefined, this.level.add(Decimal.dOne)));
    }

    // Chainable setters

    /**
     * A helper function to set the cost and costBulk functions for upgrades with a non-scaling cost (cost is independent of the level).
     * Functions same as the former `Item` from versions before v10.
     * @param cost - The cost of the upgrade.
     * @returns The upgrade object with the cost and costBulk functions set. The costBulk function is generated using {@link getCostBulkForNonScalingUpgrade}.
     */
    // public asNonScalingUpgrade(cost: DecimalSource): this {
    //     // New Decimal here for a copy of the cost
    //     cost = new Decimal(cost);

    //     this.cost = (): Decimal => cost;
    //     this.costBulk = Upgrade.getCostBulkForNonScalingUpgrade(cost);
    //     return this;
    // }

    /**
     * Sets the size or disables the lower cache for the upgrade.
     * @param cacheSize - The size of the lower cache. If `null`, the lower cache will be disabled.
     * @returns this
     */
    public withCacheSize(cacheSize: number | null = this.lowerCacheSize, init = false): this {
        this.lowerCacheSize = cacheSize;

        for (const cost of this.costs) {
            if (init) cost.initCache();
            cost.fillCache(this.lowerCacheSize);
        }

        return this;
    }

    /**
     * Changes the {@link levelProtections} options for this upgrade.
     * Equivalent to calling {@link InvalidDecimalProtections.setProtections} on the {@link levelProtections} object.
     * @param newLevelProtections - The new level protections to set.
     * @returns this
     */
    public withLevelProtectionOptions(
        newLevelProtections: Parameters<InvalidDecimalProtections["setProtections"]>[0],
    ): this {
        this.levelProtections.setProtections(newLevelProtections);
        return this;
    }

    /* oxlint-disable jsdoc/require-param, jsdoc/require-returns */
    /** @see {@link Upgrade.prototype.name} */
    public withName(name: typeof this.name): this {
        this.name = name;
        return this;
    }

    /** @see {@link Upgrade.maxLevel} */
    public withMaxLevel(maxLevel: typeof this.maxLevel): this {
        this.maxLevel = maxLevel;

        // If the lower cache exists, fill it with the new max level
        this.withCacheSize();
        return this;
    }

    /** @see {@link Upgrade.effect} */
    public withEffect(effect: typeof this.effect): this {
        this.effect = effect;
        return this;
    }

    /** @see {@link Upgrade.effectOnAdd} */
    public withEffectOnAdd(effectOnAdd: typeof this.effectOnAdd): this {
        this.effectOnAdd = effectOnAdd;
        return this;
    }

    /** @see {@link UpgradeCost} */
    public withCost(costCurrency: Currency, costFn: typeof UpgradeCost.prototype.cost): this {
        return this.withCustomCost(new UpgradeCost(costCurrency, costFn));
    }

    /** @see {@link UpgradeCost} */
    public withCustomCost(cost: UpgradeCost): this {
        cost.withUpgrade(this);
        this.costs.push(cost);
        return this;
    }

    /** @see {@link UpgradeCost.prototype.el} */
    public withEl(el: typeof UpgradeCost.prototype.el): this {
        for (const cost of this.costs) {
            cost.withEl(el);
        }

        return this;
    }

    /** @see {@link Upgrade.defaultLevel} */
    public withDefaultLevel(defaultLevel: typeof this.defaultLevel): this {
        this.defaultLevel = defaultLevel;

        this.withCacheSize();

        // If the current level is less than the new default level, set the level to the new default level
        if (this.level.lt(defaultLevel)) {
            this.level = defaultLevel;
        }

        return this;
    }

    /** @see {@link Upgrade.descriptionSupplier} */
    public withDescriptionSupplier(descriptionSupplier: typeof this.descriptionSupplier): this {
        this.descriptionSupplier = descriptionSupplier;
        return this;
    }
    /* oxlint-enable jsdoc/require-param, jsdoc/require-returns */
}

/**
 * The requirements for a skill tree node. Can be a {@link SkillNode} or an object with a skill and a level that is required.
 */
interface SkillRequirement {
    /**
     * The skill node that is required.
     */
    skill: Upgrade<any> | SkillNode<any>;

    /**
     * The level that is required for the skill node.
     * If not specified, the skill node must be at least level 1.
     */
    level: DecimalSource;
}

/**
 * Represents an upgrade in the skill tree.
 * Each upgrade has its own id, name, description, cost, required skills, maximum level, and effect.
 */
class SkillNode<TEffectReturnType = unknown> extends Upgrade<TEffectReturnType> {
    public static fromUpgrade(upgrade: Upgrade): SkillNode {
        const out = new SkillNode(upgrade.id);

        Object.assign(out, upgrade);

        return out;
    }

    /**
     * The skill nodes that are required to unlock this skill node.
     * See {@link SkillRequirement} for more information.
     * - Can also be a function that takes the skill tree context and returns the required skills.
     * - Can also be a function that takes the contexts and returns a boolean indicating if the skill is unlocked (`true` is unlocked, `false` is not unlocked).
     */
    public requirements?:
        | (SkillNode | SkillRequirement)[]
        | ((skillNodeContext: SkillNode<TEffectReturnType>) => (SkillNode | SkillRequirement)[])
        | ((skillNodeContext: SkillNode<TEffectReturnType>) => boolean);

    public withRequirements(requirements: typeof this.requirements): this {
        this.requirements = requirements;
        return this;
    }

    /**
     * @returns If this skill is unlocked.
     */
    public isUnlocked(): boolean {
        // If there are no required skills, the skill is unlocked
        if (!this.requirements || this.requirements.length === 0) {
            return true;
        }

        // If the required skills are a function, call it
        const requiredSkills = typeof this.requirements === "function" ? this.requirements(this) : this.requirements;

        // If the requirements is a boolean, return the boolean value
        if (typeof requiredSkills === "boolean") {
            return requiredSkills;
        }

        // Check if all the required skills are unlocked
        return requiredSkills.every((requiredSkill) => {
            // If the required skill is a skill node with extra levels, check if the level is high enough
            if ("skill" in requiredSkill) {
                if (requiredSkill.skill instanceof SkillNode) {
                    return requiredSkill.skill.level.gte(requiredSkill.level) && requiredSkill.skill.isUnlocked();
                }

                return requiredSkill.skill.level.gte(requiredSkill.level);
            }

            // If the required skill is just a skill node, check if it is unlocked
            return requiredSkill.isUnlocked();
        });
    }

    public override calculate(startLevel?: DecimalSource, endLevel?: DecimalSource): UpgradeCalculationResult {
        if (!this.isUnlocked()) {
            return {
                newLevel: this.level,
                costs: [],
            };
        }

        return super.calculate(startLevel, endLevel);
    }
}

export { SkillNode, Upgrade, UpgradeData };
export type { SkillRequirement, UpgradeCalculationResult };
