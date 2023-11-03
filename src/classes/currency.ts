"use strict";
import { E, ESource } from "../eMath";
import { boost } from "./boost";

/**
 * Upgrades
 *
 * @property {string} [id] - id
 * @property {string} [name] - name
 * @property {E} cost - The cost of the first upgrade (deprecated)
 * @property {function} costScaling - Scalar function for cost with param level
 * @property {E} [maxLevel] - Max level
 * @property {function} [effect] - Function to call after the upgrade is bought with param upgrade.level and param context
 */
interface upgradeInit {
    /* eslint-disable no-unused-vars */
    id?: string | number,
    name?: string,
    cost?: E, // Deprecated
    costScaling: (input: E) => E,
    maxLevel: E
    effect: (level?: E, context?: any) => any,

    // Below are types that are automatically added
    level?: E;

    /* eslint-enable */
}
interface upgrade extends upgradeInit {
    /* eslint-disable no-unused-vars */
    // Below are types that are automatically added
    getLevel: () => E;
    setLevel: (n: E) => void;
    level: E;
    /* eslint-enable */
}

/**
 * Represents the frontend READONLY for a currency. (unless you want to hack in currency or smth)
 *
 * @class
 */
class currency {
    /**
     * The current value of the currency.
     * @type {E}
     */
    public value: E;

    /**
     * An array that represents upgrades and their levels.
     * @type {Array}
     */
    public upgrades: upgrade[];

    /**
     * Constructs a new currency object with an initial value of 0 and a boost.
     *
     * @constructor
     */
    constructor () {
        this.value = E(0);
        this.upgrades = [];
    }
}

/**
 * Represents the backend for a currency in the game.
 *
 * @class
 */
class currencyStatic {
    /**
     * An array that represents upgrades, their costs, and their effects.
     * @type {Array}
     */
    public upgrades: upgrade[];

    /**
     * A function that returns the pointer of the data
     * @type {function}
     */
    public pointer: () => currency;

    /**
     * A boost object that affects the currency gain.
     * @type {boost}
     */
    public boost: boost;

    /**
     * @constructor
     * @param {function} pointer - returns Game.classes.currency
     */
    constructor (pointer: () => currency) {
        this.upgrades = [];
        this.pointer = pointer;
        this.boost = new boost(1);
    }

    /**
     * The new currency value after applying the boost.
     * @type {E}
     * @param {number|E} [dt=1000] Deltatime
     * @returns {E}
     */
    public gain (dt: ESource = 1000): E {
        this.pointer().value = this.pointer().value.add(
            this.boost.calculate().mul(E(dt).div(1000)),
        );
        return this.pointer().value;
    }

    /**
     * Create new upgrades
     *
     * @typedef {Object} currencyUpgrade
     * @property {string} [id] - id
     * @property {string} [name] - name
     * @property {E} cost - The cost of the first upgrade
     * @property {function} costScaling - Scalar function for cost with param level
     * @property {E} maxLevel - Max level
     * @property {function} [effect] - Function to call after the upgrade is bought with param upgrade.level and param context
     *
     * @param {Array<currencyUpgrade>} upgrades - An array of upgrade objects.
     * @param {boolean} [runEffectInstantly] - Whether to run the effect immediately
     */
    public addUpgrade (upgrades: upgradeInit[], runEffectInstantly: boolean = true): void {
        const pointerAddUpgrade = (upgrades1: upgradeInit) => {
            // @ts-ignore

            // If level exists, add it else default to 1
            const upgrades2: upgrade = upgrades1.level
                ? { level: upgrades1.level }
                : { level: E(1) };
            this.pointer().upgrades.push(upgrades2);
            return upgrades1;
        };

        // Adds standard
        const upgradesDefault: upgrade[] = [];
        for (let i = 0; i < upgrades.length; i++) {
            const upgrade = pointerAddUpgrade(upgrades[i]);
            // @ts-ignore
            upgrade.getLevel = () => this.pointer().upgrades[i].level ?? E(0);
            // @ts-ignore
            upgrade.setLevel = (n: E) => this.pointer().upgrades[i].level = this.pointer().upgrades[i].level?.add(n) ?? n;
            if (runEffectInstantly) upgrade.effect(upgrade.level);
            // @ts-ignore
            upgradesDefault.push(upgrade);
        }

        this.upgrades = this.upgrades.concat(upgradesDefault);
    }
    /**
     * Calculates the cost and how many upgrades you can buy
     *
     * @param {*} id
     * @param {*} target
     * @param {boolean} [el=false] - ie Endless: Flag to exclude the sum calculation and only perform binary search.
     * @returns {array} - [amount, cost]
     */
    public calculateUpgrade (
        id: string | number,
        target: E,
        el: boolean = false,
    ): [E, E] | E | Boolean {
        target = E(target);

        /**
         * Calculates the sum of 'f(n)' from 0 to 'b'.
         *
         * @param {function} f - The function 'f(n)' to calculate the sum.
         * @param {number} b - The upper limit for the sum.
         * @returns {number} - The calculated sum of 'f(n)'.
         */
        function calculateSum (f: Function, b: E): E {
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
         * @param {function} f - The function 'f(n)' to calculate the sum.
         * @param {number} a - The target sum value to compare against.
         * @returns {number} - The highest 'b' value for which the sum is less than or equal to 'a'.
         */
        function findHighestB (f: Function, a: E, el1: boolean = el): [E, E] | E {
            if (!el1) {
                let left: E = E(0);
                let right: E = E(1);
                let highestB: E = E(0);

                // Find an upper bound for 'b' by exponentially increasing it
                while (calculateSum(f, right).lt(a)) {
                    // eslint-disable-next-line no-unused-vars
                    highestB = right;
                    right = right.mul(2);
                }

                // Perform binary search within the estimated range
                while (left.lt(right)) {
                    // @ts-ignore
                    const mid: E = E.floor(left.add(right).div(2));
                    const sum: E = calculateSum(f, mid);

                    if (sum.lt(a)) {
                        left = mid.add(1);
                    } else {
                        right = mid;
                    }
                }

                return [left, calculateSum(f, left.sub(1))];
            } else {
                /**
                 * Finds the highest value of 'b' for which 'f(b)' is less than or equal to 'a'.
                 *
                 * @param {function} f - The function 'f(n)' to calculate the sum.
                 * @param {E} a - The target value to compare against.
                 * @returns {E} - The highest 'b' value for which the sum is less than or equal to 'a'.
                 */
                let left: E = E(0);
                let right: E = target;
                let result: E = E(-1);

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
                return result;
            }
        }

        // Example
        // console.log(findHighestB((n) => n.mul(n), 100))

        // Implementation logic to find the upgrade based on ID or position
        let upgrade: upgrade;
        if (typeof id == "number") {
            upgrade = this.upgrades[id];
        } else if (typeof id == "string") {
            for (let i = 0; i < this.upgrades.length; i++) {
                if (this.upgrades[i].id == id) {
                    upgrade = this.upgrades[i];
                    break;
                } else {
                    continue;
                }
            }
        } else {
            return false;
        }

        // Assuming you have found the upgrade object, calculate the maximum affordable quantity
        return findHighestB(
            (level: number | E) => upgrade.costScaling(upgrade.getLevel().add(level)),
            this.pointer().value,
        );
    }

    /**
     * Buys an upgrade based on its ID or array position,
     * if enough currency is available.
     *
     * @param {string|number} id - The ID or position of the upgrade to buy or upgrade.
     * If a string is provided, it is treated as the upgrade's ID. If a number is provided, it is treated as the upgrade's array position (starting from 0).
     * @param {E} target - The target level or quantity to reach for the upgrade.
     * This represents how many upgrades to buy or upgrade.
     *
     * @returns {boolean} Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
     *
     */
    public buyUpgrade (id: string | number, target: E): boolean {
        // Implementation logic to find the upgrade based on ID or position
        const upgrade: upgrade | boolean = (() => {
            let output1: upgrade | boolean;
            if (typeof id == "number") {
                output1 = this.upgrades[id];
            } else if (typeof id == "string") {
                for (let i = 0; i < this.upgrades.length; i++) {
                    if (this.upgrades[i].id === id) {
                        output1 = this.upgrades[i];
                        break;
                    }
                }
            } else {
                output1 = false;
            }
            // @ts-ignore
            return output1;
        })();

        if (typeof upgrade === "boolean") return false;

        // Assuming you have found the upgrade object, calculate the maximum affordable quantity
        // @ts-ignore
        const maxAffordableQuantity: [E, E] | E | boolean = this.calculateUpgrade(
            id,
            target,
        );

        // Check if maxAffordableQuantity is a valid array
        if (
            !Array.isArray(maxAffordableQuantity) ||
            maxAffordableQuantity.length !== 2
        ) {
            return false;
        }

        // Check if there's enough currency to afford any upgrades
        if (!maxAffordableQuantity[0].lte(0)) {
            // Determine the actual quantity to purchase based on 'target' and 'maxLevel'
            target =
                upgrade.getLevel().add(target).lte(upgrade.maxLevel)
                    ? target
                    : upgrade.maxLevel.sub(upgrade.getLevel());

            // Check if the calculated quantity exceeds the affordable quantity
            const condition = maxAffordableQuantity[0].lte(target);

            // Update the affordable quantity and cost if needed
            // maxAffordableQuantity[0] = condition
            //     ? maxAffordableQuantity[0]
            //     : target;
            // maxAffordableQuantity[1] = condition
            //     ? maxAffordableQuantity[1]
            //     : this.calculateSum(upgrade.costScaling, target);

            // Deduct the cost from available currency and increase the upgrade level
            this.pointer().value = this.pointer().value.sub(
                maxAffordableQuantity[1],
            );
            upgrade.setLevel(upgrade.getLevel().add(maxAffordableQuantity[0]));

            // Call the effect function if it exists
            if (typeof upgrade.effect === "function") {
                upgrade.effect(upgrade.getLevel(), upgrade);
            }

            // Return true to indicate a successful purchase or upgrade
            return true;
        } else {
            // Return false if unable to afford any upgrades
            return false;
        }
    }
}

export { currency, currencyStatic };