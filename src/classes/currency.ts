/**
 * @file Declares the currency class and its related classes (upgrade)
 */
import { Type, Expose } from "class-transformer";
import { E, ESource } from "../E/eMain";
import Decimal from "../E/e";

import { boost } from "./boost";

/**
 * Calculates the cost and how many upgrades you can buy
 *
 * NOTE: This becomes very slow for higher levels. Use el=`true` to skip the sum calculation and speed up dramatically.
 * @param value - The current value of the currency.
 * @param upgrade - The upgrade object to calculate.
 * @param target - How many to buy
 * @param el - ie Endless: Flag to exclude the sum calculation and only perform binary search. (DEPRECATED, use `el` in the upgrade object instead)
 * @returns [amount, cost] - Returns the amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [E(0), E(0)].
 */
function calculateUpgrade (value: E, upgrade: upgradeStatic, target: ESource = 1, el: boolean = false): [amount: E, cost: E] {
    target = E(target);
    // const upgrade = this.getUpgrade(id);
    // if (upgrade === null) {
    //     console.warn(`Upgrade "${id}" not found.`);
    //     return [E(0), E(0)];
    // }

    // Special case: If target is less than 1, just return 0
    if (target.lte(0)) {
        return [E(0), E(0)];
    }

    el = upgrade.el ?? el;

    // Special case: If target is 1, just check it manually
    if (target.eq(1)) {
        if (el) {
            const cost = upgrade.cost(upgrade.level);
            const canAfford = value.gte(cost);
            return [canAfford ? E(1) : E(0), canAfford ? cost : E(0)];
        }
        const cost = upgrade.cost(upgrade.level);
        const canAfford = value.gte(cost);
        return [canAfford ? E(1) : E(0), canAfford ? cost : E(0)];
    }

    // Special case: If costBulk exists, use it
    if (upgrade.costBulk) {
        const [cost, amount] = upgrade.costBulk(upgrade.level, target);
        const canAfford = value.gte(cost);
        return [canAfford ? amount : E(0), canAfford ? cost : E(0)];
    }

    /**
     * Calculates the sum of 'f(n)' from 0 to 'b'.
     * @param f - The function 'f(n)' to calculate the sum.
     * @param b - The upper limit for the sum.
     * @returns The calculated sum of 'f(n)'.
     */
    function calculateSum (f: (n: E) => E, b: E): E {
        let sum: E = E();
        for (let n = E(0); n.lte(b); n = n.add(1)) {
            sum = sum.add(f(n));
        }
        return sum;
    }
    // Binary Search
    /**
     * Finds the highest value of 'b' for which the sum of 'f(n)' from 0 to 'b' is less than or equal to 'a'.
     * @param f - The function 'f(n)' to calculate the sum.
     * @param a - The target sum value to compare against.
     * @returns The highest 'b' value for which the sum is less than or equal to 'a'.
     */
    function findHighestB (f: (n: E) => E, a: E): [E, E] {
        if (el) {
            // Binary search without sum calculation

            let left = E(0);
            let right = target;
            let result = E(0);

            while (left.lessThanOrEqualTo(right)) {
                const mid = left.plus(right).dividedBy(2).floor();
                const valueF = f(mid);

                if (valueF.lte(a)) {
                    result = mid;
                    left = mid.plus(1);
                } else {
                    right = mid.minus(1);
                }
            }
            return [result, result.gt(0) ? f(result) : E(0)];
        }
        // Basic sum calculation binary search

        let left = E(0);
        let right = E(1);
        // let highestB = E(0);

        // Find an upper bound for 'b' by exponentially increasing it
        while (calculateSum(f, right).lt(a)) {
            // highestB = right;
            right = right.mul(2);
        }

        // Perform binary search within the estimated range
        while (left.lt(right)) {
            const mid = E.floor(left.add(right).div(2));
            const sum = calculateSum(f, mid);

            if (sum.lt(a)) {
                left = mid.add(1);
            } else {
                right = mid;
            }
        }

        return [left, left.gt(0) ? calculateSum(f, left.sub(1)) : E(0)];
    }

    // Example
    // console.log(findHighestB((n) => n.mul(n), 100))
    // Assuming you have found the upgrade object, calculate the maximum affordable quantity
    return findHighestB(
        (level: E) => upgrade.cost(upgrade.level.add(level)),
        value,
    );
}

/**
 * Interface for initializing an upgrade.
 */
interface upgradeInit {
    /** The ID of the upgrade. */
    id: string,

    /** The name of the upgrade. Defaults to the ID. */
    name?: string,

    /** The description of the upgrade. */
    description?: string,

    /**
     * The cost of upgrades at a certain level.
     * @param level - The current level of the upgrade.
     * @returns The cost of the upgrade.
     * @example
     * // A cost function that returns twice the level.
     * (level) => level.mul(2)
     */
    cost: (level: E) => E,

    /**
     * The cost of buying a bulk of upgrades at a certain level.
     * @param level - The current level of the upgrade.
     * @param target - The target level of the upgrade.
     * @returns [cost, amount] - The cost of the upgrades and the amount of upgrades you can buy. If you can't afford any, it returns [E(0), E(0)].
     * @example
     * // A cost function that returns the sum of the levels and the target.
     * // In this example, the cost function is twice the level. The cost bulk function is the sum of the levels and the target.
     * // -target^2 + target + level^2 + level
     * (level, target) => target.pow(2).mul(-1).add(target).add(level.pow(2)).add(level)
     */
    costBulk?: (level: E, target: E) => [cost: E, amount: E],

    /** The maximum level of the upgrade. */
    maxLevel: E

    /**
     * The effect of the upgrade.
     * @param level - The current level of the upgrade.
     * @param context - The upgrade object.
     */
    effect: (level: E, context: upgradeStatic) => void,

    /** Endless: Flag to exclude the sum calculation and only perform binary search. */
    el?: boolean,

    // Below are types that are automatically added
    /** The current level of the upgrade. Automatically added. */
    level?: E;
}

/** Interface for an upgrade. */
interface IUpgradeStatic extends Omit<upgradeInit, "level"> {
    name: string,
    description: string,
}

interface IUpgradeData {
    id: string | number,
    level: E
}

class upgradeData implements IUpgradeData {
    @Expose() public id;
    @Type(() => Decimal) public level;

    constructor (init: upgradeInit) {
        init = init ?? {}; // class-transformer bug
        this.id = init.id ?? -1;
        this.level = init.level ? E(init.level) : E(1);
    }
}

class upgradeStatic implements IUpgradeStatic {
    public id; name; description; cost; costBulk; maxLevel; effect; el?;

    protected dataPointerFn: () => upgradeData;

    public get data (): upgradeData {
        return this.dataPointerFn();
    }

    /**
     * @param init - The upgrade object to initialize.
     * @param dataPointer - A function or reference that returns the pointer of the data / frontend.
     */
    constructor (init: upgradeInit, dataPointer: (() => upgradeData) | upgradeData) {
        const data = (typeof dataPointer === "function" ? dataPointer() : dataPointer);
        // this.data = data;
        this.dataPointerFn = typeof dataPointer === "function" ? dataPointer : () => data;
        this.id = init.id;
        this.name = init.name ?? init.id;
        this.description = init.description ?? "";
        this.cost = init.cost;
        this.costBulk = init.costBulk;
        this.maxLevel = init.maxLevel;
        this.effect = init.effect;
        this.el = init.el;
    }

    /**
     * The current level of the upgrade.
     * @returns The current level of the upgrade.
     */
    get level (): E {
        return this.data.level;
    }
    set level (n: ESource) {
        this.data.level = E(n);
    }
}

/**
 * Represents the frontend READONLY for a currency. Useful for saving / data management.
 * @deprecated This class is created by default when creating a `currencyStatic` class. Use that instead as there are no methods here.
 */
class currency {
    /** The current value of the currency. */
    @Type(() => Decimal)
    public value: E;

    /** An array that represents upgrades and their levels. */
    @Type(() => upgradeData)
    public upgrades: upgradeData[];

    // /** A boost object that affects the currency gain. */
    // @Expose()
    // public boost: boost;

    /** Constructs a new currency object with an initial value of 0. */
    constructor () {
        this.value = E(0);
        this.upgrades = [];
        // this.boost = new boost();
    }
}

/**
 * Represents the backend for a currency in the game.
 * All the functions are here instead of the `currency` class.
 */
class currencyStatic {
    /** An array that represents upgrades, their costs, and their effects. */
    public upgrades: upgradeStatic[];

    /** A function that returns the pointer of the data */
    protected pointerFn: (() => currency);

    get pointer () { return this.pointerFn(); }

    /**
     * Updates / applies effects to the currency on load.
     */
    public onLoadData () {
        // console.log("onLoadData", this.upgrades);
        this.upgrades.forEach((upgrade) => {
            upgrade.effect(upgrade.level, upgrade);
        });
    }

    /** A boost object that affects the currency gain. */
    public boost: boost;

    /** The default value of the currency. */
    public defaultVal: E;

    /** The default boost of the currency. */
    public defaultBoost: E;

    /**
     * @param pointer - A function or reference that returns the pointer of the data / frontend.
     * @param defaultVal - The default value of the currency.
     * @param defaultBoost - The default boost of the currency.
     */
    constructor (pointer: currency | (() => currency) = new currency(), defaultVal: ESource = E(0), defaultBoost: ESource = E(1)) {
        this.defaultVal = E(defaultVal);
        this.defaultBoost = E(defaultBoost);

        this.upgrades = [];
        this.pointerFn = typeof pointer === "function" ? pointer : () => pointer;
        this.boost = new boost(defaultBoost);

        this.pointer.value = this.defaultVal;
    }

    /**
     * The current value of the currency.
     * @returns The current value of the currency.
     */
    get value (): E {
        return this.pointer.value;
    }
    set value (value: E) {
        this.pointer.value = value;
    }

    /**
     * Resets the currency and upgrade levels.
     * @param resetCurrency - Whether to reset the currency value. Default is true.
     * @param resetUpgradeLevels - Whether to reset the upgrade levels. Default is true.
     */
    public reset (resetCurrency: boolean = true, resetUpgradeLevels = true): void {
        if (resetCurrency) this.value = this.defaultVal;
        if (resetUpgradeLevels) {
            this.upgrades.forEach((upgrade) => {
                upgrade.level = E(0);
            });
        };
    }

    /**
     * The new currency value after applying the boost.
     * @param dt Deltatime / multipler in milliseconds, assuming you gain once every second. Ex. 500 = 0.5 seconds = half gain.
     * @returns What you gained.
     */
    public gain (dt: ESource = 1000): E {
        const toAdd = this.boost.calculate().mul(E(dt).div(1000));
        this.pointer.value = this.pointer.value.add(toAdd);
        return toAdd;
    }

    /**
     * Adds an upgrade to the upgrades array.
     * @param upgrades1 Upgrade to add
     * @returns The upgrade object.
     */
    private pointerAddUpgrade (upgrades1: upgradeInit): upgradeInit {
        const upgrades2 = new upgradeData(upgrades1);
        this.pointer.upgrades.push(upgrades2);
        return upgrades1;
    };

    /**
     * Retrieves an upgrade object based on the provided id.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object if found, otherwise null.
     */
    private pointerGetUpgrade (id?: string): upgradeData | null {
        let upgradeToGet: upgradeData | null = null;
        if (id === undefined) {
            return null;
        }
        for (let i = 0; i < this.pointer.upgrades.length; i++) {
            if (this.pointer.upgrades[i].id === id) {
                upgradeToGet = this.pointer.upgrades[i];
                break;
            }
        }
        return upgradeToGet;
    }


    /**
     * Retrieves an upgrade object based on the provided id.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object if found, otherwise null.
     */
    public getUpgrade (id?: string): upgradeStatic | null {
        let upgradeToGet: upgradeStatic | null = null;
        if (id === undefined) {
            return null;
        }
        // else if (typeof id == "number") {
        //     upgradeToGet = this.upgrades[id];
        // }
        else if (typeof id == "string") {
            for (let i = 0; i < this.upgrades.length; i++) {
                if (this.upgrades[i].id === id) {
                    upgradeToGet = this.upgrades[i];
                    break;
                }
            }
        }
        return upgradeToGet;
    }

    /**
     * Creates upgrades. To update an upgrade, use {@link updateUpgrade} instead.
     * @param upgrades - An array of upgrade objects.
     * @param runEffectInstantly - Whether to run the effect immediately. Defaults to `true`.
     */
    public addUpgrade (upgrades: upgradeInit | upgradeInit[], runEffectInstantly: boolean = true): void {
        if (!Array.isArray(upgrades)) upgrades = [upgrades];

        // Adds standard
        const upgradesDefault: upgradeStatic[] = [];
        for (let i = 0; i < upgrades.length; i++) {
            // if (!upgrades[i].id) upgrades[i].id = this.upgrades.length + i;
            this.pointerAddUpgrade(upgrades[i]);
            const currentLength = this.pointer.upgrades.length;
            const upgrade = new upgradeStatic(upgrades[i], () =>
                this.pointerGetUpgrade((upgrades as upgradeInit[])[i].id) as upgradeData
                ??
                this.pointer.upgrades[currentLength - 1],
            );
            if (runEffectInstantly) upgrade.effect(upgrade.level, upgrade);
            upgradesDefault.push(upgrade);
        }

        this.upgrades = this.upgrades.concat(upgradesDefault);
    }

    /**
     * Updates an upgrade. To create an upgrade, use {@link addUpgrade} instead.
     * @param id - The id of the upgrade to update.
     * @param upgrade - The upgrade object to update.
     */
    public updateUpgrade (id: string, upgrade: upgradeInit): void {
        const upgrade1 = this.getUpgrade(id);
        if (upgrade1 === null) return;

        upgrade1.name = upgrade.name ?? upgrade1.name;
        upgrade1.cost = upgrade.cost ?? upgrade1.cost;
        upgrade1.maxLevel = upgrade.maxLevel ?? upgrade1.maxLevel;
        upgrade1.effect = upgrade.effect ?? upgrade1.effect;
    }

    /**
     * Calculates the cost and how many upgrades you can buy
     * NOTE: This becomes very slow for higher levels. Use el=`true` to skip the sum calculation and speed up dramatically.
     * @deprecated Use {@link calculateUpgrade} instead.
     * @param id - The ID or position of the upgrade to calculate.
     * @param target - How many to buy
     * @param el - ie Endless: Flag to exclude the sum calculation and only perform binary search. (DEPRECATED, use `el` in the upgrade object instead)
     * @returns [amount, cost] - Returns the amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [E(0), E(0)].
     */
    public calculateUpgrade (id: string, target: ESource = 1, el: boolean = false): [amount: E, cost: E] {
        const upgrade = this.getUpgrade(id);
        if (upgrade === null) {
            console.warn(`Upgrade "${id}" not found.`);
            return [E(0), E(0)];
        }
        return calculateUpgrade(this.value, upgrade, target, el);
    }

    /**
     * Calculates how much is needed for the next upgrade.
     * @param id - Index or ID of the upgrade
     * @param target - How many before the next upgrade
     * @param el - Endless: Flag to exclude the sum calculation and only perform binary search.
     * @returns The cost of the next upgrade.
     */
    public getNextCost (id: string, target: ESource = 0, el: boolean = false): E {
        const upgrade = this.getUpgrade(id);
        if (upgrade === null) {
            console.warn(`Upgrade "${id}" not found.`);
            return E(0);
        }
        const amount = calculateUpgrade(this.value, upgrade, target, el)[1];

        const nextCost = upgrade.cost(upgrade.level.add(amount));
        return nextCost;
    }

    /**
     * Buys an upgrade based on its ID or array position if enough currency is available.
     * @param id - The ID or position of the upgrade to buy or upgrade.
     * If a string is provided, it is treated as the upgrade's ID. If a number is provided, it is treated as the upgrade's array position (starting from 0).
     * @param target - The target level or quantity to reach for the upgrade.
     * This represents how many upgrades to buy or upgrade.
     * @returns Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
     */
    public buyUpgrade (id: string, target: ESource = 1): boolean {
        const upgrade = this.getUpgrade(id);
        if (upgrade === null) return false;

        target = E(target);
        // console.log("targetC", target);
        // TODO: Determine the actual quantity to purchase based on 'target' and 'maxLevel'
        // target =
        //     E.clone(upgrade.level).add(target).lte(upgrade.maxLevel)
        //         ? target
        //         : E.clone(upgrade.maxLevel).sub(E.clone(upgrade.level));

        // Calculate the maximum affordable quantity
        const maxAffordableQuantity = calculateUpgrade(
            this.value,
            upgrade,
            target,
        );

        // Check if affordable
        if (maxAffordableQuantity[0].lte(0)) {
            return false;
        }

        // Check if the calculated quantity exceeds the affordable quantity
        // const condition = maxAffordableQuantity[0].lte(target);

        // Update the affordable quantity and cost if needed
        // maxAffordableQuantity[0] = condition
        //     ? maxAffordableQuantity[0]
        //     : target;
        // maxAffordableQuantity[1] = condition
        //     ? maxAffordableQuantity[1]
        //     : this.calculateSum(upgrade.cost, target);

        // Deduct the cost from available currency and increase the upgrade level
        this.pointer.value = this.pointer.value.sub(maxAffordableQuantity[1]);

        // Set the upgrade level
        upgrade.level = upgrade.level.add(maxAffordableQuantity[0]);

        // console.log("upgrade.level", upgrade.level);

        // Call the effect function if it exists
        if (typeof upgrade.effect === "function") {
            upgrade.effect(upgrade.level, upgrade);
        }

        // Return true to indicate a successful purchase or upgrade
        return true;
    }
}

export { currency, currencyStatic, upgradeInit, IUpgradeStatic, upgradeData, upgradeStatic, IUpgradeData, calculateUpgrade };
