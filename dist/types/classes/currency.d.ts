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
    setLevel: (n: ESource) => void;
    level: E;
}
/**
 * Represents the frontend READONLY for a currency. Useful for saving / data management.
 * @deprecated This class is created by default when creating a `currencyStatic` class. Use that instead as there are no methods here.
 * @class
 */
declare class currency {
    /**
     * The current value of the currency.
     */
    value: E;
    /**
     * An array that represents upgrades and their levels.
     */
    upgrades: upgrade[];
    /**
     * A boost object that affects the currency gain.
     */
    boost: boost;
    /**
     * Constructs a new currency object with an initial value of 0.
     *
     * @constructor
     */
    constructor();
}
/**
 * Represents the backend for a currency in the game.
 * All the functions are here instead of the `currency` class.
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
     */
    protected pointer: currency;
    /**
     * A boost object that affects the currency gain.
     * @type {boost}
     */
    boost: boost;
    protected defaultVal: E;
    protected defaultBoost: E;
    /**
     * @constructor
     * @param pointer - A function or reference that returns the pointer of the data / frontend.
     * @param defaultVal - The default value of the currency.
     * @param defaultBoost - The default boost of the currency.
     */
    constructor(pointer?: currency | (() => currency), defaultVal?: ESource, defaultBoost?: ESource);
    /**
     * The current value of the currency.
     * @type {E}
     */
    get value(): E;
    /**
     * The current value of the currency.
     * @type {E}
     */
    set value(value: E);
    /**
     * Resets the currency and upgrade levels.
     * @param resetCurrency - Whether to reset the currency value. Default is true.
     * @param resetUpgradeLevels - Whether to reset the upgrade levels. Default is true.
     */
    reset(resetCurrency?: boolean, resetUpgradeLevels?: boolean): void;
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
    addUpgrade(upgrades: upgradeInit | upgradeInit[], runEffectInstantly?: boolean): void;
    /**
     * Calculates the cost and how many upgrades you can buy
     *
     * NOTE: This becomes very slow for higher levels. Use el=true to skip the sum calculation and speed up dramatically.
     *
     * @param id
     * @param target
     * @param el ie Endless: Flag to exclude the sum calculation and only perform binary search.
     * @returns [amount, cost] | amount | false - Returns the amount of upgrades you can buy, the cost of the upgrades, or false if the upgrade does not exist.
     */
    calculateUpgrade(id: string | number, target: E, el?: boolean): [E, E] | E | false;
    /**
     * Buys an upgrade based on its ID or array position if enough currency is available.
     *
     * @param id - The ID or position of the upgrade to buy or upgrade.
     * If a string is provided, it is treated as the upgrade's ID. If a number is provided, it is treated as the upgrade's array position (starting from 0).
     * @param target - The target level or quantity to reach for the upgrade.
     * This represents how many upgrades to buy or upgrade.
     *
     * @returns {boolean} Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
     *
     */
    buyUpgrade(id: string | number, target: ESource): boolean;
}
export { currency, currencyStatic };
