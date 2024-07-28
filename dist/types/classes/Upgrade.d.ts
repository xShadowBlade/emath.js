/**
 * @file Declares the upgrade and upgradeStatic classes as well as the calculateUpgrade function.
 */
import "reflect-metadata";
import { Decimal, DecimalSource } from "../E/e";
import type { Pointer } from "../common/types";
import { LRUCache } from "../E/lru-cache";
import { MeanMode } from "./numericalAnalysis";
import type { CurrencyStatic } from "./Currency";
/**
 * Calculates the cost and how many upgrades you can buy
 * Uses {@link inverseFunctionApprox} to calculate the maximum affordable quantity.
 * The priority is: `target === 1` > `costBulk` > `el`.
 * For sum upgrades, this function has a max time complexity of O(n^2) where n is the number of iterations.
 * For el upgrades, this function has a max time complexity of O(n) where n is the number of iterations.
 * @param value - The current value of the currency.
 * @param upgrade - The upgrade object to calculate.
 * @param start - The starting level of the upgrade. Defaults the current level of the upgrade.
 * @param end - The ending level or quantity to reach for the upgrade. If not provided, it will buy the maximum amount of upgrades possible (using target = Infinity).
 * @param mode - The mode/mean method to use. See {@link MeanMode}
 * @param iterations - The amount of iterations to perform. Defaults to `15`.
 * @param el - ie Endless: Flag to exclude the sum calculation and only perform binary search. (DEPRECATED, use `el` in the upgrade object instead)
 * @returns [amount, cost] - Returns the amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [Decimal.dZero, Decimal.dZero].
 */
declare function calculateUpgrade(value: DecimalSource, upgrade: UpgradeStatic, start?: DecimalSource, end?: DecimalSource, mode?: MeanMode, iterations?: number, el?: boolean): [amount: Decimal, cost: Decimal];
/**
 * Interface for initializing an upgrade.
 */
interface UpgradeInit {
    /**
     * The ID of the upgrade.
     * Used to retrieve the upgrade later.
     */
    readonly id: string;
    /** The name of the upgrade. Defaults to the ID. */
    name?: string;
    /**
     * The description of the upgrade.
     * Can be a string or a function that returns a string.
     * @param level - The current level of the upgrade.
     * @param upgradeContext - The upgrade object that the description is being run on.
     * @param currencyContext - The currency static class that the upgrade is being run on.
     * @example
     * // A dynamic description that returns a string
     * const description = (level) => `This upgrade is at level ${level}`;
     *
     * // ... create upgrade here (see currencyStatic.addUpgrade)
     *
     * const upgrade = currencyStatic.getUpgrade("upgradeID");
     *
     * // Buy 1 level of the upgrade
     * currencyStatic.buyUpgrade("upgradeID", 1);
     *
     * // Getter property
     * console.log(upgrade.description); // "This upgrade is at level 1"
     */
    description?: ((level: Decimal, upgradeContext: UpgradeStatic, currencyContext: CurrencyStatic) => string) | string;
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
    cost: (level: Decimal) => Decimal;
    /**
     * The cost of buying a bulk of upgrades at a certain level. (inverse of cost function).
     * EL is automatically applied to the cost.
     * WARNING: In v8.x.x and above, the return order is [amount, cost] instead of [cost, amount].
     * @param level - The current level of the upgrade.
     * @param target - The target level of the upgrade. If you want to buy the maximum amount of upgrades possible, this will be `Infinity`.
     * @returns [amount, cost] - The cost of the upgrades and the amount of upgrades you can buy. If you can't afford any, it returns [Decimal.dZero, Decimal.dZero].
     * @example
     * // A cost function that returns the sum of the levels and the target.
     * // In this example, the cost function is twice the level. The cost bulk function is the sum of the levels and the target.
     * // -target^2 + target + level^2 + level
     * (level, target) => target.pow(2).mul(-1).add(target).add(level.pow(2)).add(level)
     */
    costBulk?: (currencyValue: Decimal, level: Decimal, target: Decimal) => [amount: Decimal, cost: Decimal];
    /**
     * The maximum level of the upgrade.
     * Warning: If not set, the upgrade will not have a maximum level and can continue to increase indefinitely.
     */
    maxLevel?: Decimal;
    /**
     * The effect of the upgrade. This runs when the upgrade is bought, and instantly if `runEffectInstantly` is true.
     * @param level - The current level of the upgrade.
     * @param upgradeContext - The upgrade object that the effect is being run on.
     * @param currencyContext - The currency static class that the upgrade is being run on.
     */
    effect?: (level: Decimal, upgradeContext: UpgradeStatic, currencyContext: CurrencyStatic) => void;
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
    level?: Decimal;
}
/**
 * Infers the id type of an upgrade array
 * @template U - The upgrade array
 * @example
 * const testUpg = [
 *     {
 *         id: "upgId1",
 *         cost: (level: Decimal): Decimal => level.mul(10),
 *     },
 *     {
 *         id: "upgId2",
 *         cost: (level: Decimal): Decimal => level.mul(20),
 *     },
 * ] as const satisfies UpgradeInit[] // Must be readonly and satisfy UpgradeInit
 *
 * type test = UpgradeInitArrayType<typeof testUpg> // "upgId1" | "upgId2"
 */
type UpgradeInitArrayType<U extends Readonly<UpgradeInit>[]> = U[number]["id"] extends never ? string : U[number]["id"];
/**
 * Represents a decimal number in the form of a string. `sign/mag/layer`
 * @deprecated Use an object index instead.
 */
type DecimalJSONString = `${number}/${number}/${number}`;
/**
 * Represents the name of an upgrade (EL) that is cached (for map keys fast lookup instead of looping through all upgrades).
 * In the form of: "el/${level: {@link DecimalJSONString}}"
 * @deprecated Use an object index instead.
 */
type UpgradeCachedELName = `el/${DecimalJSONString}`;
/**
 * Represents the name of an upgrade (Sum) that is cached (for map keys fast lookup instead of looping through all upgrades).
 * In the form of: "sum/${start: {@link DecimalJSONString}}/${end: {@link DecimalJSONString}}"
 * @deprecated Use an object index instead.
 */
type UpgradeCachedSumName = `sum/${DecimalJSONString}/${DecimalJSONString}`;
/**
 * Converts a decimal number to a JSON string.
 * @deprecated Use an object index instead.
 * @param n - The decimal number to convert.
 * @returns The decimal number in the form of a string. `sign/mag/layer` See {@link DecimalJSONString}
 */
declare function decimalToJSONString(n: DecimalSource): DecimalJSONString;
/**
 * Converts an upgrade to a cache name (EL)
 * @deprecated Use an object index instead.
 * @param level - The level of the upgrade.
 * @returns The name of the upgrade (EL) that is cached. See {@link UpgradeCachedELName}
 */
declare function upgradeToCacheNameEL(level: DecimalSource): UpgradeCachedELName;
/**
 * Interface for an upgrade that is cached.
 * We need a cache to reduce redundant calculations.
 *
 * We store the level, and the level +/- 1, or times/divided by 1 + 1e-3 if the level is larger than ~2e3.
 * and the cost of the upgrade at those levels.
 *
 * This approach might be useful for lower levels of upgrades, but it's not very useful for higher levels.
 */
interface UpgradeCached extends Pick<UpgradeInit, "id" | "el"> {
    el: boolean;
    endLower: UpgradeCachedLevel;
    end: UpgradeCachedLevel;
    endUpper: UpgradeCachedLevel;
}
interface UpgradeCachedLevel {
    level: Decimal;
    cost: Decimal;
}
/**
 * Interface for upgrade data.
 */
type IUpgradeData = Pick<UpgradeInit, "id" | "level">;
/**
 * Represents the frontend for an upgrade.
 * @template N - The ID of the upgrade. See {@link UpgradeInit}
 */
declare class UpgradeData implements IUpgradeData {
    id: string;
    level: Decimal;
    /**
     * Constructs a new upgrade object with an initial level of 1 (or the provided level)
     * @param init - The upgrade object to initialize.
     */
    constructor(init: IUpgradeData);
}
/**
 * Interface for an upgrade.
 */
interface IUpgradeStatic extends Omit<UpgradeInit, "level"> {
    maxLevel?: Decimal;
    name: string;
    readonly description: string;
    defaultLevel: Decimal;
}
/**
 * Represents the backend for an upgrade.
 */
declare class UpgradeStatic implements IUpgradeStatic {
    id: string;
    name: string;
    cost: (level: Decimal) => Decimal;
    costBulk: ((currencyValue: Decimal, level: Decimal, target: Decimal) => [amount: Decimal, cost: Decimal]) | undefined;
    maxLevel: Decimal | undefined;
    effect: ((level: Decimal, upgradeContext: UpgradeStatic, currencyContext: CurrencyStatic) => void) | undefined;
    el?: boolean | (() => boolean) | undefined;
    defaultLevel: Decimal;
    /** The default size of the cache. Should be one less than a power of 2. */
    static cacheSize: number;
    /**
     * The cache to store the values of certain upgrade levels.
     * @deprecated Unfinished
     */
    cache: LRUCache<UpgradeCachedELName | UpgradeCachedSumName, UpgradeCached>;
    /** @returns The data of the upgrade. */
    private dataPointerFn;
    /** @returns The data of the upgrade. */
    get data(): UpgradeData;
    /** @returns The currency static class that the upgrade is being run on. */
    protected currencyPointerFn: () => CurrencyStatic;
    /** The description of the upgrade as a function. */
    private descriptionFn;
    get description(): string;
    set description(value: Exclude<UpgradeInit["description"], undefined>);
    /**
     * The current level of the upgrade.
     * @returns The current level of the upgrade.
     */
    get level(): Decimal;
    set level(n: DecimalSource);
    /**
     * Constructs a new static upgrade object.
     * @param init - The upgrade object to initialize.
     * @param dataPointer - A function or reference that returns the pointer of the data / frontend.
     * @param currencyPointer - A function or reference that returns the pointer of the {@link CurrencyStatic} class.
     * @param cacheSize - The size of the cache. Should be one less than a power of 2. See {@link cache}. Set to `0` to disable caching.
     */
    constructor(init: UpgradeInit, dataPointer: Pointer<UpgradeData>, currencyPointer: Pointer<CurrencyStatic>, cacheSize?: number);
}
export type { IUpgradeStatic, IUpgradeData, UpgradeInit, UpgradeInitArrayType };
export { UpgradeData, UpgradeStatic, calculateUpgrade };
export type { DecimalJSONString, UpgradeCachedELName, UpgradeCachedSumName, UpgradeCached, };
export { decimalToJSONString, upgradeToCacheNameEL };
