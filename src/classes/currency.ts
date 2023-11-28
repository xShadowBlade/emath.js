import { E, ESource } from "../eMath";
import { boost } from "./boost";

/**
 * Interface for initializing an upgrade.
 */
interface upgradeInit {
    /**
     * The ID of the upgrade. If not provided, it will default to the array position.
     */
    id?: string | number,

    /**
     * The name of the upgrade.
     */
    name?: string,

    /**
     * The cost of the first upgrade.
     * @deprecated Use `costScaling` function instead.
     */
    cost?: E,

    /**
     * The cost of upgrades at a certain level.
     */
    costScaling: (level: E) => E,

    /**
     * The maximum level of the upgrade.
     */
    maxLevel: E

    /**
     * The effect of the upgrade.
     */
    effect: (level?: E, context?: any) => any,

    // Below are types that are automatically added
    /**
     * The current level of the upgrade. Automatically added.
     */
    level?: E;
}

/**
 * Interface for an upgrade.
 */
interface upgrade extends Omit<upgradeInit, "level"> {

}

interface upgradeDataInterface {
    id?: string | number,
    // name?: string,
    // cost?: E,
    // costScaling: (level: E) => E,
    // maxLevel: E,
    // effect: (level?: E, context?: any) => any,
    level?: E
}

class upgradeData implements upgradeDataInterface {
    id?: string | number;
    level: E;

    constructor (init: upgradeInit) {
        this.id = init.id;
        this.level = init.level ? E(init.level) : E(1);
    }
}

class upgradeStatic implements upgrade {
    public id?: string | number;
    public name?: string;
    public cost?: E;
    public costScaling: (level: E) => E;
    public maxLevel: E;
    public effect: (level?: E, context?: any) => any;

    protected data: upgradeData;

    /**
     * @constructor
     * @param init - The upgrade object to initialize.
     */
    constructor (init: upgradeInit, dataPointer: (() => upgradeData) | upgradeData) {
        const data = (typeof dataPointer === "function" ? dataPointer() : dataPointer);
        this.data = data;
        this.id = init.id;
        this.name = init.name;
        this.cost = init.cost;
        this.costScaling = init.costScaling;
        this.maxLevel = init.maxLevel;
        this.effect = init.effect;
    }

    /**
     * The current level of the upgrade.
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
 * @class
 */
class currency {
    /**
     * The current value of the currency.
     */
    public value: E;

    /**
     * An array that represents upgrades and their levels.
     */
    public upgrades: upgradeData[];

    /**
     * A boost object that affects the currency gain.
     */
    public boost: boost;

    /**
     * Constructs a new currency object with an initial value of 0.
     *
     * @constructor
     */
    constructor () {
        this.value = E(0);
        this.upgrades = [];
        this.boost = new boost();
    }
}

/**
 * Represents the backend for a currency in the game.
 * All the functions are here instead of the `currency` class.
 *
 * @class
 */
class currencyStatic {
    /**
     * An array that represents upgrades, their costs, and their effects.
     */
    public upgrades: upgradeStatic[];

    /**
     * A function that returns the pointer of the data
     */
    protected pointer: currency;

    /**
     * A boost object that affects the currency gain.
     */
    public boost: boost;

    protected defaultVal: E;
    protected defaultBoost: E;

    /**
     * @constructor
     * @param pointer - A function or reference that returns the pointer of the data / frontend.
     * @param defaultVal - The default value of the currency.
     * @param defaultBoost - The default boost of the currency.
     */
    constructor (pointer: currency | (() => currency) = new currency(), defaultVal: ESource = E(0), defaultBoost: ESource = E(1)) {
        this.defaultVal = E(defaultVal);
        this.defaultBoost = E(defaultBoost);

        this.upgrades = [];
        this.pointer = typeof pointer === "function" ? pointer() : pointer;
        this.boost = new boost(defaultBoost);

        this.pointer.value = this.defaultVal;
    }

    /**
     * The current value of the currency.
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
    // public reset ({
    //     resetCurrency = true,
    //     resetUpgradeAmount = true,
    // }): void
    // public reset (...params): void {
    //     // Function implementation
    // }

    /**
     * The new currency value after applying the boost.
     * @type {E}
     * @param {number|E} [dt=1000] Deltatime
     * @returns {E}
     */
    public gain (dt: ESource = 1000): E {
        this.value = this.value.add(
            this.boost.calculate().mul(E(dt).div(1000)),
        );
        return this.value;
    }

    /**
     * Adds an upgrade to the upgrades array.
     * @param upgrades1 Upgrade to add
     */
    private pointerAddUpgrade (upgrades1: upgradeInit): upgradeInit {
        // If level exists, add it else default to 1
        const upgrades2 = new upgradeData(upgrades1);
        this.pointer.upgrades.push(upgrades2);
        return upgrades1;
    };


    /**
     * Retrieves an upgrade object based on the provided id.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object if found, otherwise null.
     */
    public getUpgrade (id?: string | number): upgradeStatic | null {
        let upgrade: upgradeStatic | null = null;
        if (id === undefined) {
            return null;
        } else if (typeof id == "number") {
            upgrade = this.upgrades[id];
        } else if (typeof id == "string") {
            for (let i = 0; i < this.upgrades.length; i++) {
                if (this.upgrades[i].id === id) {
                    upgrade = this.upgrades[i];
                    break;
                }
            }
        }
        return upgrade;
    }

    /**
     * Creates or updates upgrades
     *
     * @param upgrades - An array of upgrade objects.
     * @param runEffectInstantly - Whether to run the effect immediately. Defaults to `true`.
     */
    public addUpgrade (upgrades: upgradeInit | upgradeInit[], runEffectInstantly: boolean = true): void {
        if (!Array.isArray(upgrades)) upgrades = [upgrades];

        // Adds standard
        const upgradesDefault: upgradeStatic[] = [];
        for (let i = 0; i < upgrades.length; i++) {
            if (!upgrades[i].id) upgrades[i].id = i;
            if (this.getUpgrade(upgrades[i].id)) {
                // Update upgrade
                const upgrade = this.getUpgrade(upgrades[i].id);
                if (upgrade === null) continue;
                upgrade.name = upgrades[i].name ?? upgrade.name;
                upgrade.cost = upgrades[i].cost ?? upgrade.cost;
                upgrade.costScaling = upgrades[i].costScaling ?? upgrade.costScaling;
                upgrade.maxLevel = upgrades[i].maxLevel ?? upgrade.maxLevel;
                upgrade.effect = upgrades[i].effect ?? upgrade.effect;
                if (runEffectInstantly) upgrade.effect(upgrade.level);
            } else {
                // Create upgrade
                this.pointerAddUpgrade(upgrades[i]);
                const upgrade = this.getUpgrade(upgrades[i].id);
                if (upgrade === null) continue;
                if (runEffectInstantly) upgrade.effect(upgrade.level);
                upgradesDefault.push(upgrade);
            }
        }

        this.upgrades = this.upgrades.concat(upgradesDefault);
    }

    /**
     * Calculates the cost and how many upgrades you can buy
     *
     * NOTE: This becomes very slow for higher levels. Use el=`true` to skip the sum calculation and speed up dramatically.
     *
     * @param id - Index or ID of the upgrade
     * @param target - How many to buy
     * @param el - ie Endless: Flag to exclude the sum calculation and only perform binary search.
     * @returns [amount, cost] - Returns the amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [E(0), E(0)].
     */
    public calculateUpgrade (id: string | number, target: E, el: boolean = false): [amount: E, cost: E] {
        target = E(target);

        /**
         * Calculates the sum of 'f(n)' from 0 to 'b'.
         *
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
         *
         * @param f - The function 'f(n)' to calculate the sum.
         * @param a - The target sum value to compare against.
         * @returns The highest 'b' value for which the sum is less than or equal to 'a'.
         */
        function findHighestB (f: (n: E) => E, a: E, el1: boolean = el): [E, E] {
            if (!el1) {
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
            } else {
                // Binary search without sum calculation

                let left = E(0);
                let right = target;
                let result = E(0);

                while (left.lessThanOrEqualTo(right)) {
                    const mid: E = left.plus(right).dividedBy(2).floor();
                    const value: E = f(mid);

                    if (value.lte(a)) {
                        result = mid;
                        left = mid.plus(1);
                    } else {
                        right = mid.minus(1);
                    }
                }
                return [result, result.gt(0) ? f(result) : E(0)];
            }
        }

        // Example
        // console.log(findHighestB((n) => n.mul(n), 100))

        const upgrade = this.getUpgrade(id);
        if (upgrade === null) return [E(0), E(0)];
        // Assuming you have found the upgrade object, calculate the maximum affordable quantity
        return findHighestB(
            (level: E) => upgrade.costScaling(upgrade.level.add(level)),
            this.value,
        );
    }

    /**
     * Buys an upgrade based on its ID or array position if enough currency is available.
     *
     * @param id - The ID or position of the upgrade to buy or upgrade.
     * If a string is provided, it is treated as the upgrade's ID. If a number is provided, it is treated as the upgrade's array position (starting from 0).
     * @param target - The target level or quantity to reach for the upgrade.
     * This represents how many upgrades to buy or upgrade.
     *
     * @returns Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
     *
     */
    public buyUpgrade (id: string | number, target: ESource): boolean {
        const upgrade = this.getUpgrade(id);
        if (upgrade === null) return false;

        target = E(target);
        // Determine the actual quantity to purchase based on 'target' and 'maxLevel'
        target =
            upgrade.level.add(target).lte(upgrade.maxLevel)
                ? target
                : upgrade.maxLevel.sub(upgrade.level);

        // Calculate the maximum affordable quantity
        const maxAffordableQuantity = this.calculateUpgrade(
            id,
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
        //     : this.calculateSum(upgrade.costScaling, target);

        // Deduct the cost from available currency and increase the upgrade level
        this.value = this.value.sub(maxAffordableQuantity[1]);

        // Set the upgrade level
        upgrade.level = upgrade.level.add(maxAffordableQuantity[0]);

        // Call the effect function if it exists
        if (typeof upgrade.effect === "function") {
            upgrade.effect(upgrade.level, upgrade);
        }

        // Return true to indicate a successful purchase or upgrade
        return true;
    }
}

export { currency, currencyStatic };
