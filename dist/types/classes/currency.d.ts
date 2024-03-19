/**
 * @file Declares the currency class and its related classes (upgrade)
 */
import "reflect-metadata";
import { E, ESource } from "../E/eMain";
import { Decimal } from "../E/e";
import type { Pointer } from "../game/game";
import { Boost } from "./boost";
import { LRUCache } from "../E/lru-cache";
import { MeanMode } from "./numericalAnalysis";
/**
 * Interface for initializing an upgrade.
 * @template N - The ID of the upgrade.
 */
interface UpgradeInit<N extends string = string> {
    /**
     * The ID of the upgrade.
     * Used to retrieve the upgrade later.
     */
    readonly id: N;
    /** The name of the upgrade. Defaults to the ID. */
    name?: string;
    /**
     * The description of the upgrade.
     * Can be a string or a function that returns a string.
     * Made into a getter function to allow for dynamic descriptions.
     * @example
     * // A dynamic description that returns a string
     * const description = (a, b) => `This is a ${a} that returns a ${b}`;
     *
     * // ... create upgrade here (see currencyStatic.addUpgrade)
     *
     * const upgrade = currencyStatic.getUpgrade("upgradeID");
     *
     * // Getter property
     * console.log(upgrade.description); // "This is a undefined that returns a undefined"
     *
     * // Getter function
     * console.log(upgrade.descriptionFn("dynamic", "string")); // "This is a dynamic that returns a string"
     */
    description?: ((...args: any[]) => string) | string;
    /**
     * The cost of upgrades at a certain level.
     * This function should evaluate to a non-negative number, and should be deterministic and continuous for all levels above 0.
     * Also, if you do not set your own `costBulk` function, the function should always be greater than the level.
     * @param level - The CURRENT (not next) level of the upgrade. It will always be a positive integer.
     * @returns The cost of the upgrade. It should be a non-negative integer greater than or equal to 0.
     * @example
     * // A cost function that returns twice the level.
     * (level) => level.mul(2)
     */
    cost: (level: E) => E;
    /**
     * The cost of buying a bulk of upgrades at a certain level. (inverse of cost function)
     * @param level - The current level of the upgrade.
     * @param target - The target level of the upgrade.
     * @returns [cost, amount] - The cost of the upgrades and the amount of upgrades you can buy. If you can't afford any, it returns [E(0), E(0)].
     * @example
     * // A cost function that returns the sum of the levels and the target.
     * // In this example, the cost function is twice the level. The cost bulk function is the sum of the levels and the target.
     * // -target^2 + target + level^2 + level
     * (level, target) => target.pow(2).mul(-1).add(target).add(level.pow(2)).add(level)
     */
    costBulk?: (currencyValue: E, level: E, target: E) => [cost: E, amount: E];
    /**
     * The maximum level of the upgrade.
     * Warning: If not set, the upgrade will not have a maximum level and can continue to increase indefinitely.
     */
    maxLevel?: E;
    /**
     * The effect of the upgrade. This runs when the upgrade is bought, and instantly if `runEffectInstantly` is true.
     * @param level - The current level of the upgrade.
     * @param context - The upgrade object.
     */
    effect?: (level: E, context: UpgradeStatic<N>) => void;
    /**
     * Endless / Everlasting: Flag to exclude the sum calculation and only perform binary search.
     * Note: A function value is also allowed, and will be evaluated when the upgrade is bought or calculated.
     * (but you should use a getter function instead)
     */
    el?: boolean | (() => boolean);
    /**
     * The default level of the upgrade.
     * Automatically set to `1` if not provided.
     */
    level?: E;
}
/**
 * Interface for an upgrade.
 * @template N - The ID of the upgrade. See {@link UpgradeInit}
 */
interface IUpgradeStatic<N extends string = string> extends Omit<UpgradeInit<N>, "level"> {
    maxLevel?: E;
    name: string;
    description: string;
    /**
     * A function that returns a description of the upgrade.
     * @param args - Arguments to pass to the description function.
     * @returns The description of the upgrade.
     */
    descriptionFn: (...args: any[]) => string;
}
/**
 * Interface for upgrade data.
 * @template N - The ID of the upgrade. See {@link UpgradeInit}
 */
interface IUpgradeData<N extends string = string> extends Pick<UpgradeInit<N>, "id" | "level"> {
}
/**
 * Represents a decimal number in the form of a string. `sign/mag/layer`
 */
type DecimalJSONString = `${number}/${number}/${number}`;
/**
 * Represents the name of an upgrade (EL) that is cached (for map keys fast lookup instead of looping through all upgrades).
 * In the form of: "${id}/el/${level: {@link DecimalJSONString}}"
 */
type UpgradeCachedELName = `${string}/el/${DecimalJSONString}`;
/**
 * Represents the name of an upgrade (Sum) that is cached (for map keys fast lookup instead of looping through all upgrades).
 * In the form of: "${id}/sum/${start: {@link DecimalJSONString}}/${end: {@link DecimalJSONString}}"
 */
type UpgradeCachedSumName = `${string}/sum/${DecimalJSONString}/${DecimalJSONString}`;
/** Interface for an upgrade that is cached. */
/** Interface for an upgrade that is cached. (EL) */
/** Interface for an upgrade that is cached. (Not EL) */
/** Represents the frontend for an upgrade. */
declare class UpgradeData<N extends string = string> implements IUpgradeData<N> {
    id: N;
    level: Decimal;
    constructor(init: Pick<UpgradeInit<N>, "id" | "level">);
}
/** Represents the backend for an upgrade. */
declare class UpgradeStatic<N extends string = string> implements IUpgradeStatic<N> {
    id: N;
    name: string;
    cost: (level: Decimal) => Decimal;
    costBulk: ((currencyValue: Decimal, level: Decimal, target: Decimal) => [cost: Decimal, amount: Decimal]) | undefined;
    maxLevel: Decimal | undefined;
    effect: ((level: Decimal, context: UpgradeStatic<N>) => void) | undefined;
    el?: boolean | (() => boolean) | undefined;
    descriptionFn: (...args: any[]) => string;
    get description(): string;
    /**
     * @returns The data of the upgrade.
     */
    protected dataPointerFn: () => UpgradeData<N>;
    get data(): UpgradeData<N>;
    /**
     * @param init - The upgrade object to initialize.
     * @param dataPointer - A function or reference that returns the pointer of the data / frontend.
     */
    constructor(init: UpgradeInit<N>, dataPointer: Pointer<UpgradeData<N>>);
    /**
     * The current level of the upgrade.
     * @returns The current level of the upgrade.
     */
    get level(): E;
    set level(n: ESource);
}
/**
 * Represents the frontend READONLY for a currency. Useful for saving / data management.
 * Note: This class is created by default when creating a `currencyStatic` class. Use that instead as there are no methods here.
 */
declare class Currency {
    /** The current value of the currency. */
    value: E;
    /** An array that represents upgrades and their levels. */
    upgrades: UpgradeData<string>[];
    /** Constructs a new currency object with an initial value of 0. */
    constructor();
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
declare class CurrencyStatic<U extends string[] = string[]> {
    /** An array that represents upgrades, their costs, and their effects. */
    upgrades: Record<U[number] | string, UpgradeStatic<U[number]>>;
    /** A cache for upgrades. */
    protected upgradeCache: LRUCache<UpgradeCachedELName | UpgradeCachedSumName, undefined>;
    /** The size of the cache. Should be one less than a power of 2. See {@link upgradeCache} */
    protected static cacheSize: number;
    /** A function that returns the pointer of the data */
    protected pointerFn: (() => Currency);
    /** @returns The pointer of the data. */
    protected get pointer(): Currency;
    /**
     * Updates / applies effects to the currency on load.
     */
    onLoadData(): void;
    /** A boost object that affects the currency gain. */
    boost: Boost;
    /** The default value of the currency. */
    readonly defaultVal: E;
    /** The default boost of the currency. */
    readonly defaultBoost: E;
    /**
     * @param pointer - A function or reference that returns the pointer of the data / frontend.
     * @param upgrades - An array of upgrade objects.
     * @param defaults - The default value and boost of the currency.
     */
    constructor(pointer?: Pointer<Currency>, upgrades?: UpgradeInit<U[number]>[], defaults?: {
        defaultVal: Decimal;
        defaultBoost: Decimal;
    });
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
     * @example
     * currency.reset();
     * console.log(currency.value); // E(0), or the default value
     */
    reset(resetCurrency?: boolean, resetUpgradeLevels?: boolean): void;
    /**
     * The new currency value after applying the boost.
     * @param dt Deltatime / multipler in milliseconds, assuming you gain once every second. Ex. 500 = 0.5 seconds = half gain.
     * @returns What you gained.
     * @example
     * currency.gain(Math.random() * 10000); // Gain a random number between 1 and 10.
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
    private pointerGetUpgrade;
    /**
     * Retrieves an upgrade object based on the provided id.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object if found, otherwise null.
     * @example
     * const upgrade = currency.getUpgrade("healthBoost");
     * console.log(upgrade); // upgrade object
     */
    getUpgrade(id: string | U[number]): typeof id extends U[number] ? UpgradeStatic<U[number]> : UpgradeStatic<U[number]> | null;
    /**
     * Creates upgrades. To update an upgrade, use {@link updateUpgrade} instead.
     * @param upgrades - An array of upgrade objects.
     * @param runEffectInstantly - Whether to run the effect immediately. Defaults to `true`.
     * @example
     * currenct.addUpgrade({
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
    addUpgrade(upgrades: UpgradeInit<string> | UpgradeInit<string>[] | Record<string, UpgradeInit<string>>, runEffectInstantly?: boolean): void;
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
    updateUpgrade(id: string, upgrade: UpgradeInit<string>): void;
    /**
     * Calculates the cost and how many upgrades you can buy
     * NOTE: This becomes very slow for higher levels. Use el=`true` to skip the sum calculation and speed up dramatically.
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
    calculateUpgrade(id: string, target?: ESource, mode?: MeanMode, iterations?: number): [amount: E, cost: E];
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
    getNextCost(id: string, target?: ESource, mode?: MeanMode, iterations?: number): E;
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
    buyUpgrade(id: string, target?: ESource, mode?: MeanMode, iterations?: number): boolean;
}
export { Currency as currency, CurrencyStatic as currencyStatic, UpgradeInit, IUpgradeStatic, UpgradeData as upgradeData, UpgradeStatic as upgradeStatic, IUpgradeData };
