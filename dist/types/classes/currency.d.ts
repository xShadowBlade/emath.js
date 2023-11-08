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
    id?: string | number;
    name?: string;
    cost?: E;
    costScaling: (input: E) => E;
    maxLevel: E;
    effect: (level?: E, context?: any) => any;
    level?: E;
}
interface upgrade extends upgradeInit {
    getLevel: () => E;
    setLevel: (n: E) => void;
    level: E;
}
/**
 * Represents the frontend READONLY for a currency. (unless you want to hack in currency or smth)
 *
 * @class
 */
declare class currency {
    /**
     * The current value of the currency.
     * @type {E}
     */
    value: E;
    /**
     * An array that represents upgrades and their levels.
     * @type {Array}
     */
    upgrades: upgrade[];
    /**
     * Constructs a new currency object with an initial value of 0 and a boost.
     *
     * @constructor
     */
    constructor();
}
/**
 * Represents the backend for a currency in the game.
 *
 * @class
 */
declare class currencyStatic {
    /**
     * An array that represents upgrades, their costs, and their effects.
     * @type {Array}
     */
    upgrades: upgrade[];
    /**
     * A function that returns the pointer of the data
     * @type {function}
     */
    pointer: () => currency;
    /**
     * A boost object that affects the currency gain.
     * @type {boost}
     */
    boost: boost;
    /**
     * @constructor
     * @param {function} pointer - returns Game.classes.currency
     */
    constructor(pointer: () => currency);
    /**
     * The new currency value after applying the boost.
     * @type {E}
     * @param {number|E} [dt=1000] Deltatime
     * @returns {E}
     */
    gain(dt?: ESource): E;
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
    addUpgrade(upgrades: upgradeInit[], runEffectInstantly?: boolean): void;
    /**
     * Calculates the cost and how many upgrades you can buy
     *
     * @param {*} id
     * @param {*} target
     * @param {boolean} [el=false] - ie Endless: Flag to exclude the sum calculation and only perform binary search.
     * @returns {array} - [amount, cost]
     */
    calculateUpgrade(id: string | number, target: E, el?: boolean): [E, E] | E | Boolean;
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
    buyUpgrade(id: string | number, target: E): boolean;
}
export { currency, currencyStatic };
