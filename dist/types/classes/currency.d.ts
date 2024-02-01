import { E, ESource } from "../E/eMain";
import { boost } from "./boost";
/**
 * Interface for initializing an upgrade.
 */
interface upgradeInit {
    /**
     * The ID of the upgrade. If not provided, it will default to the array position.
     */
    id?: string | number;
    /**
     * The name of the upgrade.
     */
    name?: string;
    /**
     * The cost of upgrades at a certain level.
     */
    costScaling: (level: E) => E;
    /**
     * The maximum level of the upgrade.
     */
    maxLevel: E;
    /**
     * The effect of the upgrade.
     * @param level - The current level of the upgrade.
     * @param context - The upgrade object.
     */
    effect: (level: E, context: upgradeStatic) => void;
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
    id: string | number;
    level: E;
}
declare class upgradeData implements upgradeDataInterface {
    id: string | number;
    level: import("../E/e").default;
    constructor(init: upgradeInit);
}
declare class upgradeStatic implements upgrade {
    id?: string | number | undefined;
    name?: string | undefined;
    costScaling: (level: import("../E/e").default) => import("../E/e").default;
    maxLevel: import("../E/e").default;
    effect: (level: import("../E/e").default, context: upgradeStatic) => void;
    protected data: upgradeData;
    /**
     * @param init - The upgrade object to initialize.
     * @param dataPointer - A function or reference that returns the pointer of the data / frontend.
     */
    constructor(init: upgradeInit, dataPointer: (() => upgradeData) | upgradeData);
    /**
     * The current level of the upgrade.
     * @returns The current level of the upgrade.
     */
    get level(): E;
    set level(n: ESource);
}
/**
 * Represents the frontend READONLY for a currency. Useful for saving / data management.
 * @deprecated This class is created by default when creating a `currencyStatic` class. Use that instead as there are no methods here.
 */
declare class currency {
    /**
     * The current value of the currency.
     */
    value: E;
    /**
     * An array that represents upgrades and their levels.
     */
    upgrades: upgradeData[];
    /**
     * A boost object that affects the currency gain.
     */
    boost: boost;
    /**
     * Constructs a new currency object with an initial value of 0.
     */
    constructor();
}
/**
 * Represents the backend for a currency in the game.
 * All the functions are here instead of the `currency` class.
 */
declare class currencyStatic {
    /**
     * An array that represents upgrades, their costs, and their effects.
     */
    upgrades: upgradeStatic[];
    /**
     * A function that returns the pointer of the data
     */
    protected pointer: currency;
    /**
     * A boost object that affects the currency gain.
     */
    boost: boost;
    protected defaultVal: E;
    protected defaultBoost: E;
    /**
     * @param pointer - A function or reference that returns the pointer of the data / frontend.
     * @param defaultVal - The default value of the currency.
     * @param defaultBoost - The default boost of the currency.
     */
    constructor(pointer?: currency | (() => currency), defaultVal?: ESource, defaultBoost?: ESource);
    /**
     * The current value of the currency.
     * @returns The current value of the currency.
     */
    get value(): E;
    set value(value: E);
    /**
     * Resets the currency and upgrade levels.
     * @param resetCurrency - Whether to reset the currency value. Default is true.
     * @param resetUpgradeLevels - Whether to reset the upgrade levels. Default is true.
     */
    reset(resetCurrency?: boolean, resetUpgradeLevels?: boolean): void;
    /**
     * The new currency value after applying the boost.
     * @param dt Deltatime / multipler in milliseconds, assuming you gain once every second. Ex. 500 = 0.5 seconds = half gain.
     * @returns The new currency value after applying the boost.
     */
    gain(dt?: ESource): E;
    /**
     * Adds an upgrade to the upgrades array.
     * @param upgrades1 Upgrade to add
     * @returns The upgrade object.
     */
    private pointerAddUpgrade;
    /**
     * Retrieves an upgrade object based on the provided id.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object if found, otherwise null.
     */
    getUpgrade(id?: string | number): upgradeStatic | null;
    /**
     * Creates upgrades. To update an upgrade, use {@link updateUpgrade} instead.
     * @param upgrades - An array of upgrade objects.
     * @param runEffectInstantly - Whether to run the effect immediately. Defaults to `true`.
     */
    addUpgrade(upgrades: upgradeInit | upgradeInit[], runEffectInstantly?: boolean): void;
    /**
     * Updates an upgrade. To create an upgrade, use {@link addUpgrade} instead.
     * @param id - The id of the upgrade to update.
     * @param upgrade - The upgrade object to update.
     */
    updateUpgrade(id: string | number, upgrade: upgradeInit): void;
    /**
     * Calculates the cost and how many upgrades you can buy
     *
     * NOTE: This becomes very slow for higher levels. Use el=`true` to skip the sum calculation and speed up dramatically.
     * @param id - Index or ID of the upgrade
     * @param target - How many to buy
     * @param el - ie Endless: Flag to exclude the sum calculation and only perform binary search.
     * @returns [amount, cost] - Returns the amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [E(0), E(0)].
     */
    calculateUpgrade(id: string | number, target?: ESource, el?: boolean): [amount: E, cost: E];
    /**
     * Calculates how much is needed for the next upgrade.
     * @param id - Index or ID of the upgrade
     * @param target - How many before the next upgrade
     * @param el - Endless: Flag to exclude the sum calculation and only perform binary search.
     * @returns The cost of the next upgrade.
     */
    getNextCost(id: string | number, target?: ESource, el?: boolean): E;
    /**
     * Buys an upgrade based on its ID or array position if enough currency is available.
     * @param id - The ID or position of the upgrade to buy or upgrade.
     * If a string is provided, it is treated as the upgrade's ID. If a number is provided, it is treated as the upgrade's array position (starting from 0).
     * @param target - The target level or quantity to reach for the upgrade.
     * This represents how many upgrades to buy or upgrade.
     * @returns Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
     */
    buyUpgrade(id: string | number, target?: ESource): boolean;
}
export { currency, currencyStatic, upgradeInit, upgrade, upgradeData, upgradeStatic, upgradeDataInterface };
