/**
 * @file Declares the currency class and its related classes (upgrade)
 */
import "reflect-metadata"; // Required for class-transformer
import { Type } from "class-transformer";

import { Decimal, DecimalSource } from "../E/e";
import { Boost } from "./Boost";
import { MeanMode } from "./numericalAnalysis";
import { UpgradeData, UpgradeStatic, calculateUpgrade } from "./Upgrade";
import { ItemData, Item, calculateItem } from "./Item";

import type { UpgradeInitArrayType, UpgradeInit } from "./Upgrade";
import type { ItemInit } from "./Item";
import type { Pointer, IsPrimitiveString, Mutable } from "../common/types";

interface CurrencyStaticResetOptions {
    resetCurrency: boolean;
    resetUpgradeLevels: boolean;
    resetItemAmounts: boolean;
    runUpgradeEffect: boolean;
}

/**
 * Represents the frontend READONLY for a currency. Useful for saving / data management.
 * Note: This class is created by default when creating a {@link CurrencyStatic} class. Use that instead as there are no methods here.
 */
class Currency {
    /** The current value of the currency. */
    @Type(() => Decimal)
    public value: Decimal;

    /** An array that represents upgrades and their levels. */
    @Type(() => UpgradeData)
    public upgrades: Record<string, UpgradeData>;

    /** An array that represents items and their effects. */
    @Type(() => ItemData)
    public items: Record<string, ItemData>;

    /**
     * Constructs a new currency object with an initial value of 0.
     */
    constructor () {
        this.value = Decimal.dZero;
        this.upgrades = {};
        this.items = {};
    }
}

/**
 * Represents the backend for a currency in the game.
 * All the functions are here instead of the `currency` class.
 * @template U - The inital upgrades
 * @template S - An string union that represents the names of the upgrades.
 * @example
 * const currency = new CurrencyStatic();
 * currency.gain();
 * console.log(currency.value); // Decimal.dOne
 */
class CurrencyStatic<U extends Readonly<UpgradeInit>[] = [], S extends string = UpgradeInitArrayType<U>> {
    /** An array that represents upgrades */
    public readonly upgrades: Record<S, UpgradeStatic>;

    /** An array that represents items and their effects. */
    public readonly items: Record<string, Item> = {};

    /** A function that returns the pointer of the data */
    protected readonly pointerFn: (() => Currency);

    /** @returns The pointer of the data. */
    protected get pointer (): Currency {
        return this.pointerFn();
    }

    /** A boost object that affects the currency gain. */
    public readonly boost: Boost;

    /** The default value of the currency. */
    public readonly defaultVal: Decimal;

    /** The default boost of the currency. */
    public readonly defaultBoost: Decimal;

    /**
     * The current value of the currency.
     * Note: If you want to change the value, use {@link gain} instead.
     * @returns The current value of the currency.
     */
    get value (): Decimal {
        return this.pointer.value;
    }
    set value (value: Decimal) {
        this.pointer.value = value;
    }

    /**
     * Constructs a new currnecy
     * @param pointer - A function or reference that returns the pointer of the data / frontend.
     * @param upgrades - An array of upgrade objects.
     * @param defaults - The default value and boost of the currency.
     * @example
     * const currency = new CurrencyStatic(undefined, [
     *     {
     *         id: "upgId1",
     *         cost: (level: Decimal): Decimal => level.mul(10),
     *     },
     *     {
     *         id: "upgId2",
     *         cost: (level: Decimal): Decimal => level.mul(20),
     *     }
     * ] as const satisfies UpgradeInit[]);
     * // CurrencyStatic<["upgId1", "upgId2"]>
     */
    constructor (pointer: Pointer<Currency> = new Currency(), upgrades?: U, defaults = { defaultVal: Decimal.dZero, defaultBoost: Decimal.dOne }) {
        // Assign the default values
        this.defaultVal = defaults.defaultVal;
        this.defaultBoost = defaults.defaultBoost;

        // Assign the pointer function
        this.pointerFn = typeof pointer === "function" ? pointer : (): Currency => pointer;

        // Set the boost object
        this.boost = new Boost(this.defaultBoost);

        // Set the pointer value to the default value
        this.pointer.value = this.defaultVal;

        // @ts-expect-error - Properties are added in the next line
        this.upgrades = {};

        // Add upgrades
        if (upgrades) this.addUpgrade(upgrades);
    }

    /**
     * Updates / applies effects to the currency on load.
     */
    public onLoadData (): void {
        // Call the effect function for each upgrade
        for (const upgrade of Object.values<UpgradeStatic>(this.upgrades)) {
            this.runUpgradeEffect(upgrade);
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
    public reset (resetCurrency?: boolean, resetUpgradeLevels?: boolean, runUpgradeEffect?: boolean): void;
    public reset (reset?: Partial<CurrencyStaticResetOptions>): void;
    public reset (resetCurrencyOrResetObj?: boolean | Partial<CurrencyStaticResetOptions>, resetUpgradeLevels?: boolean, runUpgradeEffect?: boolean): void {
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
        if (resetObj.resetCurrency) this.value = this.defaultVal;

        // Reset the upgrades
        if (resetObj.resetUpgradeLevels) {
            for (const upgrade of Object.values<UpgradeStatic>(this.upgrades)) {
                // Reset the level to the default level
                upgrade.level = new Decimal(upgrade.defaultLevel);

                // Call the effect function for each upgrade
                if (resetObj.runUpgradeEffect) this.runUpgradeEffect(upgrade);
            }
        };

        // Reset the items
        if (resetObj.resetItemAmounts) {
            for (const item of Object.values<Item>(this.items)) {
                // Reset the amount to the default amount
                item.amount = new Decimal(item.defaultAmount);

                // Call the effect function for each item
                if (resetObj.runUpgradeEffect) this.runUpgradeEffect(item);
            }
        };
    }

    /**
     * The new currency value after applying the boost.
     * @param dt - Deltatime / multipler in milliseconds, assuming you gain once every second. Ex. 500 = 0.5 seconds = half gain.
     * @returns What was gained, NOT the new value.
     * @example
     * // Gain a random number between 1 and 10, and return the amount gained.
     * currency.gain(Math.random() * 10000);
     */
    public gain (dt: DecimalSource = 1000): Decimal {
        const toAdd = this.boost.calculate().mul(new Decimal(dt).div(1000));
        this.pointer.value = this.pointer.value.add(toAdd);
        return toAdd;
    }

    /**
     * Adds an upgrade to the data class.
     * @param upgrades - Upgrade to add
     * @returns The upgrade object.
     */
    private pointerAddUpgrade (upgrades: UpgradeInit): UpgradeData {
        const upgradesToAdd = new UpgradeData(upgrades);
        this.pointer.upgrades[upgradesToAdd.id] = upgradesToAdd;
        return upgradesToAdd;
    };

    /**
     * Retrieves an upgrade object from the data pointer based on the provided id.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object if found, otherwise null.
     */
    private pointerGetUpgrade (id: string): UpgradeData | null {
        return this.pointer.upgrades[id] ?? null;
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
    public getUpgrade<T extends S> (id: T): IsPrimitiveString<S> extends false ? UpgradeStatic : UpgradeStatic | null {
        // // @ts-expect-error - This is a hack to get the type to work
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        return this.upgrades[id] ?? null;
    }

    /**
     * Queries upgrades based on the provided id. Returns an array of upgrades that match the id.
     * @param id - The id of the upgrade to query.
     * @returns An array of upgrades that match the id.
     * @example
     * const currency = new CurrencyStatic(undefined, [
     *     { id: "healthBoostSmall", cost: (level) => level.mul(10) },
     *     { id: "healthBoostLarge", cost: (level) => level.mul(20) },
     *     { id: "damageBoostSmall", cost: (level) => level.mul(10) },
     *     { id: "damageBoostLarge", cost: (level) => level.mul(20) },
     * ] as const satisfies UpgradeInit[]);
     *
     * // Get all health upgrades
     * const healthUpgrades = currency.queryUpgrade(/health/); // [{ id: "healthBoostSmall", ... }, { id: "healthBoostLarge", ... }]
     *
     * // Get all small upgrades
     * const smallUpgrades = currency.queryUpgrade(["healthBoostSmall", "damageBoostSmall"]);
     * // or
     * const smallUpgrades2 = currency.queryUpgrade(/.*Small/);
     */
    public queryUpgrade (id: S | S[] | RegExp): UpgradeStatic[] {
        const allUpgradeIds = Object.keys(this.upgrades) as S[];

        // If the id is a regular expression search for all upgrades that match the regex
        if (id instanceof RegExp) {
            const regex = id;
            const matchedIds = allUpgradeIds.filter((upgrade) => regex.test(upgrade));
            return matchedIds.map((matchedId) => this.upgrades[matchedId]);
        }

        // Convert to array if not already
        if (typeof id === "string") {
            id = [id];
        }

        // If the id is an array, return all upgrades that match the ids
        const matchedUpgrades = allUpgradeIds.filter((upgrade) => id.includes(upgrade));
        return matchedUpgrades.map((matchedId) => this.upgrades[matchedId]);
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
    public addUpgrade (upgrades: UpgradeInit | UpgradeInit[], runEffectInstantly = true): UpgradeStatic[] {
        // Convert to array if not already
        if (!Array.isArray(upgrades)) upgrades = [upgrades];

        // Create an array to store the added upgrades
        const addedUpgradeList: UpgradeStatic[] = [];

        for (const upgrade of upgrades) {
            // Add the upgrade to the data
            this.pointerAddUpgrade(upgrade);

            // Create the upgrade object
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const addedUpgradeStatic = new UpgradeStatic(upgrade, () => this.pointerGetUpgrade(upgrade.id)!, () => this as CurrencyStatic);

            // Run the effect instantly if needed
            if (runEffectInstantly) this.runUpgradeEffect(addedUpgradeStatic);

            // Add the upgrade to this.upgrades
            this.upgrades[upgrade.id as S] = addedUpgradeStatic;

            // Add the upgrade to the list
            addedUpgradeList.push(addedUpgradeStatic);
        }

        return addedUpgradeList;
    }

    /**
     * Updates an upgrade. To create an upgrade, use {@link addUpgrade} instead.
     * @param id - The id of the upgrade to update.
     * @param newUpgrade - The new upgrade object.
     * @example
     * currency.updateUpgrade("healthBoost", {
     *     name: "New Health Boost".
     *     cost: (level) => level.mul(20),
     *     maxLevel: 20,
     *     effect: (level, context) => {
     *         console.log("Health Boost effect");
     *     }
     * });
     */
    public updateUpgrade (id: S, newUpgrade: Partial<UpgradeInit>): void {
        // Get the upgrade
        const oldUpgrade = (this.getUpgrade(id) as Mutable<UpgradeStatic> | null);

        // If the upgrade doesn't exist, return
        if (oldUpgrade === null) return;

        // Update the upgrade
        Object.assign(oldUpgrade, newUpgrade);
    }

    /**
     * Runs the effect of an upgrade or item.
     * @param upgrade - The upgrade to run the effect for.
     */
    public runUpgradeEffect (upgrade: UpgradeStatic | Item): void {
        if (upgrade instanceof UpgradeStatic) {
            upgrade.effect?.(upgrade.level, upgrade, this as CurrencyStatic);
        } else {
            upgrade.effect?.(upgrade.amount, upgrade, this as CurrencyStatic);
        }
    }

    /**
     * Calculates the cost and how many upgrades you can buy.
     * See {@link calculateUpgrade} for more information.
     * @param id - The ID or position of the upgrade to calculate.
     * @param target - The target level or quantity to reach for the upgrade. If omitted, it calculates the maximum affordable quantity.
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns The amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [Decimal.dZero, Decimal.dZero].
     * @example
     * // Calculate how many healthBoost upgrades you can buy and the cost of the upgrades
     * const [amount, cost] = currency.calculateUpgrade("healthBoost", 10);
     */
    public calculateUpgrade (id: S, target: DecimalSource = Infinity, mode?: MeanMode, iterations?: number): [amount: Decimal, cost: Decimal] {
        // Get the upgrade
        const upgrade = this.getUpgrade(id);

        // If the upgrade doesn't exist, return [0, 0]
        if (upgrade === null) {
            console.warn(`Upgrade "${id}" not found.`);
            return [Decimal.dZero, Decimal.dZero];
        }

        // Calculate the target based on the maxLevel
        target = upgrade.level.add(target);

        // Cap the target to the max level if it exists
        if (upgrade.maxLevel !== undefined) {
            target = Decimal.min(target, upgrade.maxLevel);
        }

        return calculateUpgrade(this.value, upgrade, upgrade.level, target, mode, iterations);
    }

    /**
     * Calculates how much is needed for the next upgrade.
     * @deprecated Use {@link getNextCostMax} instead as it is more versatile.
     * @param id - Index or ID of the upgrade
     * @param target - How many before the next upgrade
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns The cost of the next upgrade.
     * @example
     * // Calculate the cost of the next healthBoost upgrade
     * const nextCost = currency.getNextCost("healthBoost");
     */
    public getNextCost (id: S, target: DecimalSource = 1, mode?: MeanMode, iterations?: number): Decimal {
        // Get the upgrade
        const upgrade = this.getUpgrade(id);

        // If the upgrade doesn't exist, return 0
        if (upgrade === null) {
            console.warn(`Upgrade "${id}" not found.`);
            return Decimal.dZero;
        }

        // Calculate the amount of upgrades you can buy
        const amount = this.calculateUpgrade(id, target, mode, iterations)[0];

        // Calculate the cost of the next upgrade
        const nextCost = upgrade.cost(upgrade.level.add(amount));
        return nextCost;
    }

    /**
     * Calculates the cost of the next upgrade after the maximum affordable quantity.
     * @param id - Index or ID of the upgrade
     * @param target - How many before the next upgrade
     * @param mode  - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns The cost of the next upgrade.
     * @example
     * // Calculate the cost of the next healthBoost upgrade
     * currency.gain(1e6); // Gain 1 thousand currency
     * console.log(currency.calculateUpgrade("healthBoost")); // The maximum affordable quantity and the cost of the upgrades. Ex. [new Decimal(100), new Decimal(1000)]
     * console.log(currency.getNextCostMax("healthBoost")); // The cost of the next upgrade after the maximum affordable quantity. (The cost of the 101st upgrade)
     */
    public getNextCostMax (id: S, target: DecimalSource = 1, mode?: MeanMode, iterations?: number): Decimal {
        // Get the upgrade
        const upgrade = this.getUpgrade(id);

        // If the upgrade doesn't exist, return 0
        if (upgrade === null) {
            console.warn(`Upgrade "${id}" not found.`);
            return Decimal.dZero;
        }

        // Calculate the amount of upgrades you can buy
        const upgCalc = this.calculateUpgrade(id, target, mode, iterations);

        // Calculate the cost of the next upgrade after the maximum affordable quantity
        const nextCost = upgrade.cost(upgrade.level.add(upgCalc[0]))
            .add(upgCalc[1]);
        return nextCost;
    }

    /**
     * Buys an upgrade based on its ID or array position if enough currency is available.
     * @param id - The ID or position of the upgrade to buy or upgrade.
     * @param target - The target level or quantity to reach for the upgrade. See the argument in {@link calculateUpgrade}.
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
     * @example
     * // Attempt to buy up to 10 healthBoost upgrades at once
     * currency.buyUpgrade("healthBoost", 10);
     */
    public buyUpgrade (id: S, target?: DecimalSource, mode?: MeanMode, iterations?: number): boolean {
        // Get the upgrade
        const upgrade = this.getUpgrade(id);

        // If the upgrade doesn't exist, return false
        if (upgrade === null) {
            console.warn(`Upgrade "${id}" not found.`);
            return false;
        }

        // Calculate the amount of upgrades you can buy
        const [amount, cost] = this.calculateUpgrade(id, target, mode, iterations);

        // Check if affordable
        if (amount.lte(0)) {
            return false;
        }

        // Deduct the cost from available currency
        this.pointer.value = this.pointer.value.sub(cost);

        // Set the upgrade level
        upgrade.level = upgrade.level.add(amount);

        // Call the effect function if it exists
        this.runUpgradeEffect(upgrade);

        // Return true to indicate a successful upgrade
        return true;
    }

    /**
     * Adds an item to the data class.
     * @param items - The items to add.
     * @returns The added items.
     */
    private pointerAddItem (items: ItemInit): ItemData {
        const itemToAdd = new ItemData(items);
        this.pointer.items[items.id] = itemToAdd;
        return itemToAdd;
    };

    /**
     * Retrieves an item object from the data pointer based on the provided id.
     * @param id - The id of the item to retrieve.
     * @returns The item object if found, otherwise null.
     */
    private pointerGetItem (id: string): ItemData | null {
        return this.pointer.items[id] ?? null;
    }

    /**
     * Adds an item.
     * @param items - The items to add.
     * @param runEffectInstantly - Whether to run the effect immediately. Defaults to `true`.
     */
    public addItem (items: ItemInit | ItemInit[], runEffectInstantly = true): void {
        // Convert to array if not already
        if (!Array.isArray(items)) items = [items];

        for (const item of items) {
            // Add the item to the data
            this.pointerAddItem(item);

            // Create the upgrade object
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const addedUpgradeStatic = new Item(item, () => this.pointerGetItem(item.id)!, () => this as CurrencyStatic);

            // Run the effect instantly if needed
            if (runEffectInstantly) this.runUpgradeEffect(addedUpgradeStatic);

            // Add the upgrade to this.item
            this.items[item.id] = addedUpgradeStatic;
        }
    }

    /**
     * Retrieves an item object based on the provided id.
     * @param id - The id of the item to retrieve.
     * @returns The item object if found, otherwise null.
     */
    public getItem (id: string): Item | null {
        return this.items[id] ?? null;
    }

    /**
     * Calculates the cost and how many items you can buy.
     * See {@link calculateItem} for more information.
     * @param id - The ID or position of the item to calculate.
     * @param target - The target level or quantity to reach for the item. If omitted, it calculates the maximum affordable quantity.
     * @returns The amount of items you can buy and the cost of the items. If you can't afford any, it returns [Decimal.dZero, Decimal.dZero].
     */
    public calculateItem (id: string, target: DecimalSource = Infinity): [amount: Decimal, cost: Decimal] {
        // Get the item
        const item = this.getItem(id);

        // If the item doesn't exist, return [0, 0]
        if (item === null) {
            console.warn(`Item "${id}" not found.`);
            return [Decimal.dZero, Decimal.dZero];
        }

        return calculateItem(this.value, item, target);
    }

    /**
     * Buys an item based on its ID or array position if enough currency is available.
     * @param id - The ID or position of the item to buy or upgrade.
     * @param target - The target level or quantity to reach for the item. See the argument in {@link calculateItem}.
     * @returns Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the item does not exist.
     */
    public buyItem (id: string, target?: DecimalSource): boolean {
        // Get the item
        const item = this.getItem(id);

        // If the item doesn't exist, return false
        if (item === null) {
            console.warn(`Item "${id}" not found.`);
            return false;
        }

        // Calculate the amount of items you can buy
        const [amount, cost] = this.calculateItem(id, target);

        // Check if affordable
        if (amount.lte(0)) {
            return false;
        }

        // Deduct the cost from available currency
        this.pointer.value = this.pointer.value.sub(cost);

        // Set the item level
        item.amount = item.amount.add(amount);

        // Call the effect function if it exists
        this.runUpgradeEffect(item);

        // Return true to indicate a successful upgrade
        return true;
    }
}

export { Currency, CurrencyStatic };

// Test

// const upgsTest = [
//     {
//         id: "upgId1",
//         cost: (level: Decimal): Decimal => level.mul(10),
//     },
//     {
//         id: "upgId2",
//         cost: (level: Decimal): Decimal => level.mul(20),
//     },
// ] as const satisfies UpgradeInit[];

// const currency = new CurrencyStatic(undefined, upgsTest);

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
