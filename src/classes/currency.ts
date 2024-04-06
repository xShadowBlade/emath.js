/**
 * @file Declares the currency class and its related classes (upgrade)
 */
import "reflect-metadata"; // Required for class-transformer
import { Type } from "class-transformer";
import { E, ESource } from "../E/eMain";
import { Decimal } from "../E/e";
import type { Pointer } from "../game/game";

import { Boost } from "./boost";
import { MeanMode } from "./numericalAnalysis";
import { UpgradeData, UpgradeStatic, UpgradeInit, calculateUpgrade } from "./upgrade";

/**
 * Represents the frontend READONLY for a currency. Useful for saving / data management.
 * Note: This class is created by default when creating a {@link CurrencyStatic} class. Use that instead as there are no methods here.
 */
class Currency {
    /** The current value of the currency. */
    @Type(() => Decimal)
    public value: E;

    /** An array that represents upgrades and their levels. */
    @Type(() => UpgradeData)
    // public upgrades: UpgradeData<string>[];
    public upgrades: Record<string, UpgradeData<string>>;

    // /** A boost object that affects the currency gain. */
    // @Expose()
    // public boost: boost;

    /**
     * Constructs a new currency object with an initial value of 0.
     */
    constructor () {
        this.value = E(0);
        // this.upgrades = [];
        this.upgrades = {};
        // this.boost = new boost();
    }
}

/**
 * Represents the backend for a currency in the game.
 * All the functions are here instead of the `currency` class.
 * @template U - An array that represents the names of the upgrades.
 * @example
 * const currency = new currencyStatic();
 * currency.gain();
 * console.log(currency.value); // E(1)
 */
class CurrencyStatic<U extends string[] = string[]> {
    /** An array that represents upgrades, their costs, and their effects. */
    // public upgrades: upgradeStatic[];
    public readonly upgrades: Record<U[number] | string, UpgradeStatic<U[number]>>;
    // public upgrades: {
    //     [id: string]: UpgradeStatic;
    //     [Symbol.iterator]: IterableIterator<UpgradeStatic>;
    // };

    /** A function that returns the pointer of the data */
    protected readonly pointerFn: (() => Currency);

    /** @returns The pointer of the data. */
    protected get pointer () { return this.pointerFn(); }

    /** A boost object that affects the currency gain. */
    public readonly boost: Boost;

    /** The default value of the currency. */
    public readonly defaultVal: E;

    /** The default boost of the currency. */
    public readonly defaultBoost: E;

    /**
     * The current value of the currency.
     * Note: If you want to change the value, use {@link gain} instead.
     * @returns The current value of the currency.
     */
    get value (): E {
        return this.pointer.value;
    }
    set value (value: E) {
        this.pointer.value = value;
    }

    /**
     * @param pointer - A function or reference that returns the pointer of the data / frontend.
     * @param upgrades - An array of upgrade objects.
     * @param defaults - The default value and boost of the currency.
     */
    constructor (pointer: Pointer<Currency> = new Currency(), upgrades?: UpgradeInit<U[number]>[], defaults = { defaultVal: E(0), defaultBoost: E(1) }) {
        // this.defaultVal = E(defaultVal);
        // this.defaultBoost = E(defaultBoost);
        this.defaultVal = defaults.defaultVal;
        this.defaultBoost = defaults.defaultBoost;

        // this.upgrades = [];
        // @ts-expect-error - Properties are added in the next line
        this.upgrades = {
            // *[Symbol.iterator] () {
            //     for (const upgrade of Object.values(this)) {
            //         yield upgrade;
            //     }
            // },
        };

        if (upgrades) this.addUpgrade(upgrades);

        this.upgrades = this.upgrades as Record<U[number] | string, UpgradeStatic<U[number]>>;

        this.pointerFn = typeof pointer === "function" ? pointer : () => pointer;
        this.boost = new Boost(this.defaultBoost);
        // this.upgradeCache = new LRUCache(CurrencyStatic.cacheSize);

        this.pointer.value = this.defaultVal;
    }

    /**
     * Updates / applies effects to the currency on load.
     */
    public onLoadData () {
        for (const upgrade of Object.values(this.upgrades)) {
            upgrade.effect?.(upgrade.level, upgrade);
        }
    }

    /**
     * Resets the currency and upgrade levels.
     * @param resetCurrency - Whether to reset the currency value. Default is true.
     * @param resetUpgradeLevels - Whether to reset the upgrade levels. Default is true.
     * @example
     * currency.reset();
     * console.log(currency.value); // E(0), or the default value
     */
    public reset (resetCurrency = true, resetUpgradeLevels = true): void {
        if (resetCurrency) this.value = this.defaultVal;
        if (resetUpgradeLevels) {
            // this.upgrades.forEach((upgrade) => {
            //     upgrade.level = E(0);
            // });
            for (const upgrade of Object.values(this.upgrades)) {
                upgrade.level = E(0);
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
    public gain (dt: ESource = 1000): E {
        const toAdd = this.boost.calculate().mul(E(dt).div(1000));
        this.pointer.value = this.pointer.value.add(toAdd);
        return toAdd;
    }

    /**
     * Adds an upgrade to the data class.
     * @param upgrades - Upgrade to add
     * @returns The upgrade object.
     */
    private pointerAddUpgrade (upgrades: UpgradeInit<U[number]>): UpgradeData<U[number]> {
        const upgradesToAdd = new UpgradeData(upgrades);
        // this.pointer.upgrades.push(upgradesToAdd);
        this.pointer.upgrades[upgradesToAdd.id] = upgradesToAdd;
        return upgradesToAdd;
    };

    /**
     * Retrieves an upgrade object from the data pointer based on the provided id.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object if found, otherwise null.
     */
    private pointerGetUpgrade (id: string): UpgradeData<string> | null {
        return this.pointer.upgrades[id] ?? null;
    }

    /**
     * Retrieves an upgrade object based on the provided id.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object if found, otherwise null.
     * @example
     * const upgrade = currency.getUpgrade("healthBoost");
     * console.log(upgrade); // upgrade object
     */
    // public getUpgrade (id: string): UpgradeStatic | null {
    public getUpgrade (id: string | U[number]): typeof id extends U[number] ? UpgradeStatic<U[number]> : UpgradeStatic<U[number]> | null {
        return this.upgrades[id] ?? null;
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
     *             n => n.mul(E.pow(2, level.sub(1))),
     *             2,
     *         );
     *     }
     * });
     */
    public addUpgrade (upgrades: UpgradeInit<string> | UpgradeInit<string>[], runEffectInstantly: boolean = true): UpgradeStatic<string>[] {
        if (!Array.isArray(upgrades)) upgrades = [upgrades];

        console.log(upgrades);

        // Adds standard (object instead of array)
        const addedUpgradeList: Record<string, UpgradeStatic<string>> = {};
        for (const upgrade of upgrades) {
            // console.log(upgrade.id);

            const addedUpgradeData = this.pointerAddUpgrade(upgrade);
            const addedUpgradeStatic = new UpgradeStatic(upgrade, () => addedUpgradeData);
            // const addedUpgradeStatic = new UpgradeStatic(upgrade, () => this.pointerGetUpgrade(upgrade.id) ?? addedUpgradeData);

            if (addedUpgradeStatic.effect && runEffectInstantly) addedUpgradeStatic.effect(addedUpgradeStatic.level, addedUpgradeStatic);
            addedUpgradeList[upgrade.id] = addedUpgradeStatic;
            (this.upgrades as Record<string, UpgradeStatic>)[upgrade.id] = addedUpgradeStatic;
        }

        console.log(addedUpgradeList);

        // return addedUpgradeList;
        return Object.values(addedUpgradeList);
    }

    /**
     * Updates an upgrade. To create an upgrade, use {@link addUpgrade} instead.
     * @param id - The id of the upgrade to update.
     * @param upgrade - The upgrade object to update.
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
    public updateUpgrade (id: string, upgrade: UpgradeInit<string>): void {
        const upgrade1 = this.getUpgrade(id);
        if (upgrade1 === null) return;

        upgrade1.name = upgrade.name ?? upgrade1.name;
        upgrade1.cost = upgrade.cost ?? upgrade1.cost;
        upgrade1.maxLevel = upgrade.maxLevel ?? upgrade1.maxLevel;
        upgrade1.effect = upgrade.effect ?? upgrade1.effect;
    }

    /**
     * Calculates the cost and how many upgrades you can buy.
     * See {@link calculateUpgrade} for more information.
     * @param id - The ID or position of the upgrade to calculate.
     * @param target - The target level or quantity to reach for the upgrade. If omitted, it calculates the maximum affordable quantity.
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns The amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [E(0), E(0)].
     * @example
     * // Calculate how many healthBoost upgrades you can buy and the cost of the upgrades
     * const [amount, cost] = currency.calculateUpgrade("healthBoost", 10);
     */
    // public calculateUpgrade (id: string, target: ESource = 1, el: boolean = false): [amount: E, cost: E] {
    public calculateUpgrade (id: string, target?: ESource, mode?: MeanMode, iterations?: number): [amount: E, cost: E] {
        // const [id] = args;
        const upgrade = this.getUpgrade(id);
        if (upgrade === null) {
            console.warn(`Upgrade "${id}" not found.`);
            return [E(0), E(0)];
        }
        // return calculateUpgrade(this.value, upgrade, target, el);
        return calculateUpgrade(this.value, upgrade, upgrade.level, target ? upgrade.level.add(target) : undefined, mode, iterations);
    }

    /**
     * Calculates how much is needed for the next upgrade.
     * @param id - Index or ID of the upgrade
     * @param target - How many before the next upgrade
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns The cost of the next upgrade.
     * @example
     * // Calculate the cost of the next healthBoost upgrade
     * const nextCost = currency.getNextCost("healthBoost");
     */
    public getNextCost (id: string, target: ESource = 0, mode?: MeanMode, iterations?: number): E {
        const upgrade = this.getUpgrade(id);
        if (upgrade === null) {
            console.warn(`Upgrade "${id}" not found.`);
            return E(0);
        }
        const amount = calculateUpgrade(this.value, upgrade, upgrade.level, upgrade.level.add(target), mode, iterations)[1];

        const nextCost = upgrade.cost(upgrade.level.add(amount));
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
    public buyUpgrade (id: string, target?: ESource, mode?: MeanMode, iterations?: number): boolean {
        const upgrade = this.getUpgrade(id);
        if (upgrade === null) {
            console.warn(`Upgrade "${id}" not found.`);
            return false;
        }

        const [amount, cost] = this.calculateUpgrade(id, target, mode, iterations);

        // Check if affordable
        if (amount.lte(0)) {
            return false;
        }

        // Deduct the cost from available currency
        this.pointer.value = this.pointer.value.sub(cost);

        // Set the upgrade level
        upgrade.level = upgrade.level.add(amount);

        // console.log("upgrade.level", upgrade.level);

        // Call the effect function if it exists
        upgrade.effect?.(upgrade.level, upgrade);

        // Return true to indicate a successful upgrade
        return true;
    }
}

export { Currency, CurrencyStatic };

// Test
/*
const costFn = (level: E) => level.pow(2);

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

const myCurrency = new CurrencyStatic(undefined, [
    {
        id: "healthBoost",
        name: "Health Boost",
        description: "Increases health by 10.",
        cost: costFn,
        // maxLevel: 10,
        // effect: (level) => {
        //     // console.log("Health Boost effect", level);
        // },
        el: true,
    },
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

// console.log("calc sum", calculateSum(costFn, E(100)));
calculateSum(costFn, E(1000), 0, "1e-4");

const x = E("123.34344e3");

const formatFn = (n: E) => n.format(5, 9, "sc");

for (let i = 0; i < 3; i++) {
    myCurrency.gain(x.mul(1000));

    const newCurrency = myCurrency.value;

    const calc = myCurrency.calculateUpgrade("healthBoost", undefined, "geometric", 15);

    myCurrency.buyUpgrade("healthBoost");

    const upgrade = myCurrency.getUpgrade("healthBoost");

    console.log({
        calc: calc.map(formatFn),
        acc: formatFn(costFn(upgrade?.level ?? E(1)).div(newCurrency)),
    });

    console.log({
        value: formatFn(myCurrency.value),
        level: upgrade?.level,
    });
}

*/