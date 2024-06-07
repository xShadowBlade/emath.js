---
id: upgrade
title: Upgrade
sidebar_label: Upgrade
---

<!-- .d.ts for reference
/**
 * Calculates the cost and how many upgrades you can buy
 * Uses {@link inverseFunctionApprox} to calculate the maximum affordable quantity.
 * The priority is: `target === 1` > `costBulk` > `el`
 * @param value - The current value of the currency.
 * @param upgrade - The upgrade object to calculate.
 * @param start - The starting level of the upgrade. Defaults the current level of the upgrade.
 * @param end - The ending level or quantity to reach for the upgrade.
 * @param mode - The mode/mean method to use. See {@link MeanMode}
 * @param iterations - The amount of iterations to perform. Defaults to `15`.
 * @param el - ie Endless: Flag to exclude the sum calculation and only perform binary search. (DEPRECATED, use `el` in the upgrade object instead)
 * @returns [amount, cost] - Returns the amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [new Decimal(0), new Decimal(0)].
 */
declare function calculateUpgrade(value: DecimalSource, upgrade: UpgradeStatic<string>, start?: DecimalSource, end?: DecimalSource, mode?: MeanMode, iterations?: number, el?: boolean): [amount: Decimal, cost: Decimal];
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
    cost: (level: Decimal) => Decimal;
    /**
     * The cost of buying a bulk of upgrades at a certain level. (inverse of cost function).
     * EL is automatically applied to the cost.
     * WARNING: In v8.x.x and above, the return order is [amount, cost] instead of [cost, amount].
     * @param level - The current level of the upgrade.
     * @param target - The target level of the upgrade.
     * @returns [cost, amount] - The cost of the upgrades and the amount of upgrades you can buy. If you can't afford any, it returns [new Decimal(0), new Decimal(0)].
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
     * @param context - The upgrade object.
     */
    effect?: (level: Decimal, context: UpgradeStatic<N>) => void;
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
 * Interface for an upgrade.
 * @template N - The ID of the upgrade. See {@link UpgradeInit}
 */
interface IUpgradeStatic<N extends string = string> extends Omit<UpgradeInit<N>, "level"> {
    maxLevel?: Decimal;
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
 * @template EL - Whether the upgrade is EL or not.
 */
interface UpgradeCached<EL extends boolean = false> extends Pick<UpgradeInit, "id" | "el"> {
    el: EL;
}
/** Interface for an upgrade that is cached. (EL) */
interface UpgradeCachedEL extends UpgradeCached<true>, Pick<UpgradeInit, "level"> {
    level: Decimal;
    /** The cost of the upgrade at level (el) */
    cost: Decimal;
}
/** Interface for an upgrade that is cached. (Not EL) */
interface UpgradeCachedSum extends UpgradeCached<false> {
    start: Decimal;
    end: Decimal;
    /**
     * The cost of the upgrade from start to end. (summation)
     */
    cost: Decimal;
}
/**
 * Represents the frontend for an upgrade.
 * @template N - The ID of the upgrade. See {@link UpgradeInit}
 */
declare class UpgradeData<N extends string = string> implements IUpgradeData<N> {
    id: N;
    level: Decimal;
    /**
     * Constructs a new upgrade object with an initial level of 1 (or the provided level)
     * @param init - The upgrade object to initialize.
     */
    constructor(init: Pick<UpgradeInit<N>, "id" | "level">);
}
/**
 * Represents the backend for an upgrade.
 * @template N - The ID of the upgrade. See {@link UpgradeInit}
 */
declare class UpgradeStatic<N extends string = string> implements IUpgradeStatic<N> {
    id: N;
    name: string;
    cost: (level: Decimal) => Decimal;
    costBulk: ((currencyValue: Decimal, level: Decimal, target: Decimal) => [amount: Decimal, cost: Decimal]) | undefined;
    maxLevel: Decimal | undefined;
    effect: ((level: Decimal, context: UpgradeStatic<N>) => void) | undefined;
    el?: boolean | (() => boolean) | undefined;
    descriptionFn: (...args: any[]) => string;
    /** The default size of the cache. Should be one less than a power of 2. */
    static cacheSize: number;
    /** The cache to store the values of certain upgrade levels */
    cache: LRUCache<UpgradeCachedELName | UpgradeCachedSumName, UpgradeCachedEL | UpgradeCachedSum>;
    /** @returns The data of the upgrade. */
    protected dataPointerFn: () => UpgradeData<N>;
    /** @returns The data of the upgrade. */
    get data(): UpgradeData<N>;
    get description(): string;
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
     * @param cacheSize - The size of the cache. Should be one less than a power of 2. See {@link cache}
     */
    constructor(init: UpgradeInit<N>, dataPointer: Pointer<UpgradeData<N>>, cacheSize?: number);
    /**
     * Gets the cached data of the upgrade.
     * @param type - The type of the cache. "sum" or "el"
     * @param start - The starting level of the upgrade.
     * @param end - The ending level or quantity to reach for the upgrade.
     * @returns The data of the upgrade.
     */
    getCached(type: "sum", start: DecimalSource, end: DecimalSource): UpgradeCachedSum | undefined;
    getCached(type: "el", start: DecimalSource): UpgradeCachedEL | undefined;
    /**
     * Sets the cached data of the upgrade.
     * @param type - The type of the cache. "sum" or "el"
     * @param start - The starting level of the upgrade.
     * @param end - The ending level or quantity to reach for the upgrade.
     * @param cost - The cost of the upgrade.
     */
    setCached(type: "sum", start: DecimalSource, end: DecimalSource, cost: DecimalSource): UpgradeCachedSum;
    setCached(type: "el", level: DecimalSource, cost: DecimalSource): UpgradeCachedEL;
}
 -->

[Link to auto generated docs](https://xshadowblade.github.io/emath.js/typedoc/classes/classes_Upgrade.UpgradeStatic.html)

The `Upgrade` class represents an upgrade that can be bought with a currency. It is used to store the cost of the upgrade, the effect of the upgrade, and the maximum level of the upgrade.

It is used internally by the `CurrencyStatic` class to calculate the cost and amount of upgrades that can be bought. It is not recommended to use this class on its own without a `CurrencyStatic` class.
 
## Usage

To create an upgrade, use the `addUpgrade` method in the `CurrencyStatic` class:

```js
import { myCurrency } from "./currency.js";

// Create a new upgrade with an initial level of 1
myCurrency.addUpgrade({
    id: "myUpgrade",
    name: "My Upgrade",
    desc: "This is my upgrade",
    cost: (level) => level.mul(2),
    effect: (level) => console.log(`Bought upgrade to level ${level}`), // Also runs instantly if `runEffectInstantly` is true
});

// Buy the upgrade
myCurrency.gain("1e6"); // Gain 1,000 currency
myCurrency.buyUpgrade("myUpgrade"); // Buy the upgrade

// Since there was no target level, it will buy the upgrade to its maximum affordable quantity (which is 32)

// Buy the upgrade to a specific level
myCurrency.gain("1e12"); // Gain 1,000,000,000 currency
myCurrency.buyUpgrade("myUpgrade", "1e3"); // Buy the upgrade to level 1,000 (if affordable, otherwise it will buy as many as possible)
```
