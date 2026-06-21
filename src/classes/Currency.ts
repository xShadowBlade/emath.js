/**
 * @file Declares the currency class and its related classes (upgrade)
 */
import "reflect-metadata"; // Required for class-transformer
import { Type } from "class-transformer";

import { Decimal, DecimalSource } from "../E/e";
import { Boost } from "./Boost";
import { MeanMode } from "./numericalAnalysis/numericalAnalysis";
import { SkillNode, Upgrade } from "./Upgrade";
import type { Mutable } from "../common/types";
import type { DataManager, StaticClassWithData } from "../game";
import { InvalidDecimalProtections } from "./InvalidDecimalProtections";

interface CurrencyStaticResetOptions {
    resetCurrency: boolean;
    resetUpgradeLevels: boolean;
    resetItemAmounts: boolean;
    runUpgradeEffect: boolean;
}

/**
 * Represents the frontend READONLY for a currency. Useful for saving / data management.
 * Note: This class is created by default when creating a {@link Currency} class. Use that instead as there are no methods here.
 */
class CurrencyData {
    /** The current value of the currency. */
    @Type(() => Decimal)
    public value: Decimal;

    /**
     * Constructs a new currency object with an initial value of 0.
     */
    constructor() {
        this.value = Decimal.dZero;
    }
}

/**
 * Represents the backend for a currency in the game.
 * All the functions are here instead of the `currency` class.
 * @example
 * const currency = new Currency();
 * currency.gain();
 * console.log(currency.value); // Decimal.dOne
 */
class Currency implements StaticClassWithData {
    public readonly id: string;

    /**
     * Stores a list of each of this currency's upgrades and their corresponding data.
     */
    public readonly upgrades: Upgrade[] = [];

    /** A function that returns the pointer of the data */
    protected dataSupplier: () => CurrencyData = () => {
        console.warn("emath.js: Currency dataSupplier has not set. Returning placeholder data.");
        return new CurrencyData();
    };

    /** @returns The pointer of the data. */
    protected get data(): CurrencyData {
        return this.dataSupplier();
    }

    /** A boost object that affects the currency gain. */
    public readonly boost: Boost = new Boost();

    /** The default value of the currency. */
    public readonly defaultValue: Decimal = Decimal.dZero;

    /**
     * The protections for {@link value}.
     * See {@link InvalidDecimalProtections}.
     */
    public readonly valueProtections = new InvalidDecimalProtections({
        allowNaN: false,
        allowInfinite: false,
    });

    /**
     * The current value of the currency.
     * Note: If you want to change the value, use {@link gain} instead.
     * @returns The current value of the currency.
     */
    get value(): Decimal {
        return this.data.value;
    }
    set value(value: DecimalSource) {
        this.data.value = this.valueProtections.validateValueOrElse(
            value,
            this.data.value,
            `Currency "${this.id}" value`,
            this,
        );
    }

    private dataManagerReference: DataManager | null = null;

    /**
     * Creates a new currency with the given id.
     * @param id - The id of the currency. See {@link id}.
     */
    constructor(id: string) {
        this.id = id;
    }

    /**
     * Updates / applies effects to the currency on load.
     */
    public onLoadData(): void {
        // Run setter method to run protections and other side effects of setting the value.
        this.value = this.data.value;

        // Call the effect function for each upgrade
        for (const upgrade of this.upgrades) {
            this.runUpgradeEffect(upgrade);
        }
    }

    public onAddToDataManager(dataManager: DataManager): void {
        this.dataManagerReference = dataManager;

        this.dataSupplier = dataManager.setData(this.id, new CurrencyData());

        // Add existing upgrades to the data manager
        for (const upgrade of this.upgrades) {
            upgrade.onAddToDataManager(dataManager, this.id);
        }
    }

    /**
     * Resets the currency and upgrade levels.
     * @param resetCurrency - Whether to reset the currency value. Default is true.
     * @param resetUpgradeLevels - Whether to reset the upgrade levels. Default is true.
     * @param runUpgradeEffect - Whether to run the upgrade effect. Default is true.
     * @example
     * currency.reset();
     * console.log(currency.value); // Decimal.dZero, or the default value
     */
    public reset(resetCurrency?: boolean, resetUpgradeLevels?: boolean, runUpgradeEffect?: boolean): void;
    public reset(reset?: Partial<CurrencyStaticResetOptions>): void;
    public reset(
        resetCurrencyOrResetObj?: boolean | Partial<CurrencyStaticResetOptions>,
        resetUpgradeLevels?: boolean,
        runUpgradeEffect?: boolean,
    ): void {
        const resetObj: CurrencyStaticResetOptions = {
            resetCurrency: true,
            resetUpgradeLevels: true,
            resetItemAmounts: true,
            runUpgradeEffect: true,
        };
        // Parse the arguments
        if (typeof resetCurrencyOrResetObj === "object") {
            Object.assign(resetObj, resetCurrencyOrResetObj);
        } else {
            Object.assign(resetObj, {
                resetCurrency: resetCurrencyOrResetObj,
                resetUpgradeLevels: resetUpgradeLevels,
                runUpgradeEffect: runUpgradeEffect,
            });
        }

        // Reset the value
        if (resetObj.resetCurrency) this.value = this.defaultValue;

        // Reset the upgrades
        if (resetObj.resetUpgradeLevels) {
            for (const upgrade of Object.values<Upgrade>(this.upgrades)) {
                // Reset the level to the default level
                upgrade.level = new Decimal(upgrade.defaultLevel);

                // Call the effect function for each upgrade
                if (resetObj.runUpgradeEffect) this.runUpgradeEffect(upgrade);
            }
        }
    }

    /**
     * The new currency value after applying the boost.
     * @param dt - Delta time / multiplier, assuming you gain once every second. Ex. 0.5 = half gain.
     * @returns What was gained, NOT the new value.
     * @example
     * // Gain a random number between 1 and 10, and return the amount gained.
     * currency.gain(Math.random() * 10);
     */
    public gain(dt?: DecimalSource): Decimal {
        let toAdd = this.boost.calculate();
        if (dt) {
            toAdd = toAdd.mul(dt);
        }

        this.value = this.value.add(toAdd);
        return toAdd;
    }

    /**
     * Retrieves an upgrade object based on the provided id.
     * @template T - The type of the upgrade ID.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object if found, otherwise null.
     * @example
     * const upgrade = currency.getUpgrade("healthBoost");
     * console.log(upgrade); // upgrade object
     */
    public getUpgrade(id: string): Upgrade | null {
        return this.upgrades.find((upgrade) => upgrade.id === id) ?? null;
    }

    public getUpgradeAsSkillNode(id: string): SkillNode | null {
        const upgrade = this.getUpgrade(id);

        if (!upgrade) {
            return null;
        }

        if (upgrade instanceof SkillNode) {
            return upgrade;
        }

        return null;
    }

    /**
     * Creates upgrades. To update an upgrade, use {@link updateUpgrade} instead.
     * @param upgrades - An array of upgrade objects.
     * @param runEffectInstantly - Whether to run the effect immediately. Defaults to `true`.
     * @returns The added upgrades.
     * @example
     * currency.addUpgrade({
     *     id: "healthBoost", // The ID of the upgrade, used to retrieve it later
     *     name: "Health Boost", // The name of the upgrade, for display purposes (optional, defaults to the ID)
     *     description: "Increases health by 10.", // The description of the upgrade, for display purposes (optional, defaults to "")
     *     cost: (level) => level.mul(10), // Cost of the upgrade, 10 times the level
     *     maxLevel: 10, // Maximum level of the upgrade (optional, defaults to 1)
     *     // Effect of the upgrade (runs when the upgrade is bought, and instantly if runEffectInstantly is true)
     *     effect: (level, context) => {
     *         // Set / update the boost
     *         // health: currencyStatic
     *         health.boost.setBoost(
     *             "healthBoost",
     *             "Health Boost",
     *             "Boosts health by 2x per level.",
     *             n => n.mul(Decimal.pow(2, level.sub(1))),
     *             2,
     *         );
     *     }
     * });
     */
    public addUpgrade(upgrades: Upgrade | Upgrade[], runEffectInstantly = true): void {
        // Convert to array if not already
        if (!Array.isArray(upgrades)) upgrades = [upgrades];

        for (const upgrade of upgrades) {
            // Run the effect instantly if needed
            if (runEffectInstantly) this.runUpgradeEffect(upgrade);
            this.runUpgradeEffectOnAdd(upgrade);

            upgrade.withCurrencySupplier(() => this);

            // Add the upgrade to this.upgrades
            this.upgrades.push(upgrade);

            // If the data manager reference exists, add the upgrade to the data manager
            if (this.dataManagerReference) {
                upgrade.onAddToDataManager(this.dataManagerReference, this.id);
            }
        }
    }

    /**
     * Runs the effect of an upgrade or item.
     * @param upgrade - The upgrade to run the effect for.
     */
    public runUpgradeEffect(upgrade: Upgrade): void {
        upgrade.effect?.(upgrade.level, upgrade, this as Currency);
    }

    /**
     * Runs the effect on add of an upgrade or item.
     * @param upgrade - The upgrade to run the effect on add for.
     */
    public runUpgradeEffectOnAdd(upgrade: Upgrade): void {
        upgrade.effectOnAdd?.(upgrade, this as Currency);
    }

    private getUpgradeOrElse<T>(
        id: string | Upgrade,
        elseValue: T,
    ): [isFound: true, upgrade: Upgrade] | [isFound: false, elseValue: T] {
        // Get the upgrade
        const upgrade = typeof id === "string" ? this.getUpgrade(id) : id;

        // If the upgrade doesn't exist, return [0, 0]
        if (upgrade === null) {
            console.warn(`eMath.js: Upgrade "${id as string}" not found.`);
            return [false, elseValue];
        }

        // If the upgrade is a skill, check if it is unlocked
        if (upgrade instanceof SkillNode) {
            if (!upgrade.isUnlocked()) {
                return [false, elseValue];
            }
        }

        return [true, upgrade];
    }

    /**
     * Calculates the cost and how many upgrades you can buy.
     * See {@link calculateUpgrade} for more information.
     * @param id - The upgrade ID or the upgrade to calculate.
     * @param target - The target level or quantity to reach for the upgrade. If omitted, it calculates the maximum affordable quantity.
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @param value - The value of the currency to use for the calculation. Defaults to the current value of the currency.
     * @returns The amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [Decimal.dZero, Decimal.dZero].
     * @example
     * // Calculate how many healthBoost upgrades you can buy and the cost of the upgrades
     * const [amount, cost] = currency.calculateUpgrade("healthBoost", 10);
     */
    public calculateUpgrade(
        id: string | Upgrade,
        target: DecimalSource = Decimal.dInf,
        mode?: MeanMode,
        iterations?: number,
        value: DecimalSource = this.value,
    ): [newLevelToSetTo: Decimal, cost: Decimal] {
        // Get the upgrade
        const [upgradeExists, upgrade] = this.getUpgradeOrElse(id, [Decimal.dZero, Decimal.dZero] as const);
        if (!upgradeExists) {
            return upgrade as Mutable<typeof upgrade>;
        }

        // Calculate the target based on the maxLevel
        target = upgrade.level.add(target);

        // Cap the target to the max level if it exists
        if (upgrade.maxLevel !== undefined) {
            target = Decimal.min(target, upgrade.maxLevel);
        }

        return upgrade.calculate(value, upgrade.level, target, mode, iterations);
    }

    /**
     * Calculates how much is needed for the next upgrade.
     * @deprecated Use {@link getNextCostMax} instead as it is more versatile.
     * @param id - Index or ID of the upgrade
     * @param target - How many before the next upgrade
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @param value - The value of the currency to use for the calculation. Defaults to the current value of the currency.
     * @returns The cost of the next upgrade.
     * @example
     * // Calculate the cost of the next healthBoost upgrade
     * const nextCost = currency.getNextCost("healthBoost");
     */
    public getNextCost(
        id: string | Upgrade,
        // target: DecimalSource = Decimal.dOne,
        // mode?: MeanMode,
        // iterations?: number,
        // value?: DecimalSource,
    ): Decimal {
        // Get the upgrade
        const [upgradeExists, upgrade] = this.getUpgradeOrElse(id, Decimal.dZero);
        if (!upgradeExists) {
            return upgrade;
        }

        // // Calculate the amount of upgrades you can buy
        // const amount = this.calculateUpgrade(id, target, mode, iterations, value)[0];

        // // Calculate the cost of the next upgrade
        // const nextCost = upgrade.cost(amount);
        // return nextCost;

        return upgrade.cost(upgrade.level);
    }

    /**
     * Calculates the cost of the next upgrade after the maximum affordable quantity.
     * @param id - Upgrade ID or upgrade object to calculate the next cost for.
     * @param target - How many before the next upgrade.
     * @param mode  - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @param value - The value of the currency to use for the calculation. Defaults to the current value of the currency.
     * @returns The cost of the next upgrade.
     * @example
     * // Calculate the cost of the next healthBoost upgrade
     * currency.gain(1e6); // Gain 1 thousand currency
     * console.log(currency.calculateUpgrade("healthBoost")); // The maximum affordable quantity and the cost of the upgrades. Ex. [new Decimal(100), new Decimal(1000)]
     * console.log(currency.getNextCostMax("healthBoost")); // The cost of the next upgrade after the maximum affordable quantity. (The cost of the 101st upgrade)
     */
    public getNextCostMax(
        id: string | Upgrade,
        target: DecimalSource = Decimal.dOne,
        mode?: MeanMode,
        iterations?: number,
        value?: DecimalSource,
    ): Decimal {
        // Get the upgrade
        const [upgradeExists, upgrade] = this.getUpgradeOrElse(id, Decimal.dZero);
        if (!upgradeExists) {
            return upgrade;
        }

        // Calculate the amount of upgrades you can buy
        const upgCalc = this.calculateUpgrade(id, target, mode, iterations, value);

        // Calculate the cost of the next upgrade after the maximum affordable quantity
        const nextCost = upgrade.cost(upgrade.level.add(upgCalc[0])).add(upgCalc[1]);
        return nextCost;
    }

    /**
     * Buys an upgrade based on its ID or array position if enough currency is available.
     * @param id - The upgrade ID or the upgrade to buy.
     * @param target - The target level or quantity to reach for the upgrade. See the argument in {@link calculateUpgrade}.
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @param value - The value of the currency to use for the calculation. Defaults to the current value of the currency.
     * @returns Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
     * @example
     * // Attempt to buy up to 10 healthBoost upgrades at once
     * currency.buyUpgrade("healthBoost", 10);
     */
    public buyUpgrade(
        id: string | Upgrade,
        target?: DecimalSource,
        mode?: MeanMode,
        iterations?: number,
        value?: DecimalSource,
    ): boolean {
        // Get the upgrade
        const [upgradeExists, upgrade] = this.getUpgradeOrElse(id, false);
        if (!upgradeExists) {
            return upgrade;
        }

        // Calculate the amount of upgrades you can buy
        const [amount, cost] = this.calculateUpgrade(id, target, mode, iterations, value);

        // Check if affordable
        if (amount.eq(upgrade.level)) {
            return false;
        }

        // Deduct the cost from available currency
        this.value = this.value.sub(cost);

        // Set the upgrade level
        upgrade.level = amount;

        // Call the effect function if it exists
        this.runUpgradeEffect(upgrade);

        // Return true to indicate a successful upgrade
        return true;
    }

    // Setters
    public withValueProtectionOptions(
        newValueProtections: Parameters<InvalidDecimalProtections["setProtections"]>[0],
    ): this {
        this.valueProtections.setProtections(newValueProtections);
        return this;
    }
}

export { CurrencyData, Currency };

// Test

// const upgradesTest = [
//     {
//         id: "upgId1",
//         cost: (level: Decimal): Decimal => level.mul(10),
//     },
//     {
//         id: "upgId2",
//         cost: (level: Decimal): Decimal => level.mul(20),
//     },
// ] as const satisfies UpgradeInit[];

// const currency = new CurrencyStatic(undefined, upgradesTest);

// const upgrade1 = currency.getUpgrade("upgId1a");

/*
import { calculateSum } from "./numericalAnalysis";
const costFn = (level: Decimal) => level.pow(2);

const testUpgrade: UpgradeInit = {
    id: "healthBoost",
    name: "Health Boost",
    description: "Increases health by 10.",
    cost: costFn,
    // maxLevel: 10,
    // effect: (level) => {
    //     // console.log("Health Boost effect", level);
    // },
    el: true,
};

const myCurrency = new CurrencyStatic(new Currency(), [
    testUpgrade,
]);

// Add an upgrade
// myCurrency.addUpgrade({
//     id: "healthBoost",
//     name: "Health Boost",
//     description: "Increases health by 10.",
//     cost: costFn,
//     // maxLevel: 10,
//     // effect: (level) => {
//     //     // console.log("Health Boost effect", level);
//     // },
//     el: true,
// });

// Gain currency

// console.log("calc sum", calculateSum(costFn, new Decimal(100)));
calculateSum(costFn, new Decimal(1000), 0, "1e-4");

const x = new Decimal("123.34344e3");

const formatFn = (n: Decimal) => n.format(5, 9, "sc");
for (let i = 0; i < 3; i++) {
    myCurrency.gain(x.mul(1000));

    const newCurrency = myCurrency.value;
    console.time("upg");
    const calc = myCurrency.calculateUpgrade("healthBoost", undefined, "geometric");
    console.timeEnd("upg");

    myCurrency.buyUpgrade("healthBoost");

    const upgrade = myCurrency.getUpgrade("healthBoost");

    console.log({
        calc: calc.map(formatFn),
        acc: formatFn(costFn(upgrade?.level ?? Decimal.dOne).div(newCurrency)),
    });

    console.log({
        value: formatFn(myCurrency.value),
        level: upgrade?.level,
    });
}

*/
