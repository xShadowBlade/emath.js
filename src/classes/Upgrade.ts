/**
 * @file Declares the upgrade and upgradeStatic classes as well as the calculateUpgrade function.
 */
import "reflect-metadata";
import { Type, Expose } from "class-transformer";
import { Decimal, DecimalSource } from "../E/e";
import type { Pointer } from "../common/types";
import { LRUCache } from "../E/lru-cache";
import type { MeanMode } from "./numericalAnalysis/numericalAnalysis";
import { inverseFunctionApprox, calculateInverseFunction } from "./numericalAnalysis/inverseFunction";
import { calculateSum } from "./numericalAnalysis/sum";
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
function calculateUpgrade(
    value: DecimalSource,
    upgrade: UpgradeStatic,
    start?: DecimalSource,
    end: DecimalSource = Decimal.dInf,
    mode?: MeanMode,
    iterations?: number,
    el = false,
): [amount: Decimal, cost: Decimal] {
    // Normalize the values
    value = new Decimal(value);
    start = new Decimal(start ?? upgrade.level);
    end = new Decimal(end);

    const target = end.sub(start);

    // console.log("calculateUpgrade", { value, start, end, target, mode, iterations, el });

    // Special case: If target is less than 1, just return 0
    if (target.lt(0)) {
        console.warn("eMath.js: Invalid target for calculateItem: ", target);
        return [Decimal.dZero, Decimal.dZero];
    }

    // Set el from the upgrade object if it exists
    el = (typeof upgrade.el === "function" ? upgrade.el() : upgrade.el) ?? el;

    // Get the cache
    // TODO: Fix cache
    // const cached = el ? upgrade.getCached("el", start) : upgrade.getCached("sum", start, end);
    // if (cached) {
    //     console.log("cached", cached, el, start, end, upgrade.id, upgrade.level.toString());
    //     const { cost } = cached;
    //     if (value.gte(cost)) {
    //         if (el) {
    //             const cachedEL = cached as UpgradeCachedEL;
    //             return [cachedEL.level, Decimal.dZero];
    //         }
    //         const cachedSum = cached as UpgradeCachedSum;
    //         return [cachedSum.end.sub(cachedSum.start), cost];
    //     }
    // }

    // Special case: If target is 1, just check it manually
    if (target.eq(1)) {
        // console.log("target === 1");
        const cost = upgrade.cost(upgrade.level);
        const canAfford = value.gte(cost);
        let out: [Decimal, Decimal] = [Decimal.dZero, Decimal.dZero];
        if (el) {
            // return [canAfford ? Decimal.dOne : Decimal.dZero, Decimal.dZero];
            out[0] = canAfford ? Decimal.dOne : Decimal.dZero;

            // Set the cache
            // upgrade.setCached("el", start, cost);
            return out;
        } else {
            out = [canAfford ? Decimal.dOne : Decimal.dZero, canAfford ? cost : Decimal.dZero];

            // Set the cache
            // upgrade.setCached("sum", start, end, cost);
            return out;
        }
    }

    // Special case: If costBulk exists, use it
    if (upgrade.costBulk) {
        // console.log("costBulk");
        const [amount, cost] = upgrade.costBulk(value, upgrade.level, target);
        const canAfford = value.gte(cost);
        const out: [Decimal, Decimal] = [canAfford ? amount : Decimal.dZero, canAfford && !el ? cost : Decimal.dZero];

        // Set the cache

        // TODO
        // if (el) {
        //     upgrade.setCached("el", start, cost);
        // } else {
        //     upgrade.setCached("sum", start, end, cost);
        // }

        return out;
    }

    // Special case for endless upgrades
    if (el) {
        // console.log("el");
        const costTargetFn = (level: Decimal): Decimal => upgrade.cost(level.add(start));
        const maxLevelAffordable = Decimal.min(
            end,
            calculateInverseFunction(costTargetFn, value, {
                mode,
                iterations,
            }).value.floor(),
        );
        // const cost = upgrade.cost(maxLevelAffordable);
        const cost = Decimal.dZero;

        // Set the cache
        // upgrade.setCached("el", start, cost);
        return [maxLevelAffordable, cost];
    }

    // Binary Search with sum calculation
    // console.log("binary search");
    const maxLevelAffordable = calculateInverseFunction((x: Decimal) => calculateSum(upgrade.cost, x, start), value, {
        mode,
        iterations,
    })
        .value.floor()
        .min(start.add(target).sub(1));

    // After finding the max level affordable, calculate the cost at that level
    const cost = calculateSum(upgrade.cost, maxLevelAffordable, start);

    // console.log({ maxLevelAffordable, cost });
    const maxLevelAffordableActual = maxLevelAffordable.sub(start).add(1).max(0);
    // console.log({ maxLevelAffordable, maxLevelAffordableActual, cost });

    // Set the cache
    // upgrade.setCached("sum", start, end, cost);
    return [maxLevelAffordableActual, cost];
}

/**
 * Interface for initializing an upgrade.
 * @template TId - The ID of the upgrade. Defaults to `string`.
 */
interface UpgradeInit<TId extends string = string> {
    /**
     * The ID of the upgrade.
     * Used to retrieve the upgrade later.
     */
    readonly id: TId;

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
     * A function to provide the bounds of what level could be given `currency`.
     * By default, the lower bound is 0 and the upper bound is `currency`.
     * This can make calculations extremely inaccurate at higher currencies.
     *
     * For example, if you have a currency that is 1e100, and you can only buy 102 upgrades with it,
     * the function first has to binary search from 1e50, then to 1e25, then to 3.16e12, etc.
     *
     * By providing a bounds function, you can make the calculations more accurate.
     * For example, if you can only buy 102 upgrades with 1e100 currency, you can provide a bounds function that returns something like [0, 1000].
     *
     * It should satisfy the following for all `currency` >= 0 (and where cost' is the inverse of the cost function):
     * - 0 <= min < cost'(currency) < max < currency
     *
     * Basically, the bounds function should include the interval where the inverse cost function is within that interval,
     * but the max bound should grow slower than the currency (y=x), for accurate calculations.
     * @param currency - The currency value.
     * @param start - The starting level of the upgrade.
     * @param end - The ending level or quantity to reach for the upgrade.
     * @returns [min, max] - The minimum and maximum level that can be bought with the currency.
     * @example
     * // Given a cost function,
     * const costFn = (n) => n.pow(2);
     * // the bounds function should be something like:
     * const boundsFn = (currency) => [new Decimal(0), currency.pow(0.75)];
     *
     * // This is because the inverse of the cost function is n = sqrt(cost),
     * // and the maximum level that can be bought with the currency is the square root of the currency.
     * // So the bounds grows faster (y=x^0.75) than the inverse (y=x^0.5), but still slower than the currency (y=x).
     */
    // TODO: Implement upgrade bounds in calculateUpgrade
    bounds?: (currency: Decimal, start: Decimal, end: Decimal) => [min: Decimal, max: Decimal];

    // Below are types that are automatically added
    /**
     * The default level of the upgrade.
     * Automatically set to `1` if not provided.
     */
    level?: Decimal;
}

/**
 * Infers the id type of an upgrade array.
 * @deprecated Infer using the array type directly instead.
 * @template TUpgradeArray - The upgrade array.
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
type UpgradeInitArrayType<TUpgradeArray extends Readonly<UpgradeInit>[]> = TUpgradeArray[number]["id"] extends never
    ? string
    : TUpgradeArray[number]["id"];

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
function decimalToJSONString(n: DecimalSource): DecimalJSONString {
    n = new Decimal(n);
    return `${n.sign}/${n.mag}/${n.layer}`;
}

/**
 * Converts an upgrade to a cache name (sum)
 * @deprecated Use an object index instead.
 * @param start - The starting level of the upgrade.
 * @param end - The ending level or quantity to reach for the upgrade.
 * @returns The name of the upgrade (Sum) that is cached. See {@link UpgradeCachedSumName}
 */
function upgradeToCacheNameSum(start: DecimalSource, end: DecimalSource): UpgradeCachedSumName {
    // return `${upgrade.id}/sum/${start.toString()}/${end.toString()}/${cost.toString()}` as UpgradeCachedSumName;
    return `sum/${decimalToJSONString(start)}/${decimalToJSONString(end)}}` as UpgradeCachedSumName;
}

/**
 * Converts an upgrade to a cache name (EL)
 * @deprecated Use an object index instead.
 * @param level - The level of the upgrade.
 * @returns The name of the upgrade (EL) that is cached. See {@link UpgradeCachedELName}
 */
function upgradeToCacheNameEL(level: DecimalSource): UpgradeCachedELName {
    // return `${upgrade.id}/el/${level.toString()}` as UpgradeCachedELName;
    return `el/${decimalToJSONString(level)}`;
}

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
class UpgradeData implements IUpgradeData {
    @Expose() public id: string;
    @Type(() => Decimal) public level;

    /**
     * Constructs a new upgrade object with an initial level of 1 (or the provided level)
     * @param init - The upgrade object to initialize.
     */
    constructor(init: IUpgradeData) {
        // class-transformer bug
        init = init ?? {};

        this.id = init.id;
        this.level = init.level ? new Decimal(init.level) : Decimal.dOne;
    }
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
class UpgradeStatic implements IUpgradeStatic {
    public id;
    name;
    cost;
    costBulk;
    maxLevel;
    effect;
    el?;
    defaultLevel;
    bounds?;

    /** The default size of the cache. Should be one less than a power of 2. */
    public static cacheSize = 15;

    /**
     * The cache to store the values of certain upgrade levels.
     * @deprecated Unfinished
     */
    public cache: LRUCache<UpgradeCachedELName | UpgradeCachedSumName, UpgradeCached>;

    /** @returns The data of the upgrade. */
    private dataPointerFn: () => UpgradeData;

    /** @returns The data of the upgrade. */
    public get data(): UpgradeData {
        return this.dataPointerFn();
    }

    protected currencyPointerFn: () => CurrencyStatic;

    /** @returns The currency static class that the upgrade is being run on. */
    public get currency(): CurrencyStatic {
        return this.currencyPointerFn();
    }

    /** The description of the upgrade as a function. */
    private descriptionFn: Exclude<UpgradeInit["description"], string | undefined>;

    public get description(): string {
        return this.descriptionFn(this.level, this, this.currencyPointerFn());
    }
    public set description(value: Exclude<UpgradeInit["description"], undefined>) {
        this.descriptionFn = typeof value === "function" ? value : (): string => value;
    }

    /**
     * The current level of the upgrade.
     * @returns The current level of the upgrade.
     */
    get level(): Decimal {
        // many fallbacks for some reason
        return (
            (this ?? { data: { level: Decimal.dOne } }).data ?? {
                level: Decimal.dOne,
            }
        ).level;
    }
    set level(n: DecimalSource) {
        this.data.level = new Decimal(n);
    }

    /**
     * Constructs a new static upgrade object.
     * @param init - The upgrade object to initialize.
     * @param dataPointer - A function or reference that returns the pointer of the data / frontend.
     * @param currencyPointer - A function or reference that returns the pointer of the {@link CurrencyStatic} class.
     * @param cacheSize - The size of the cache. Should be one less than a power of 2. See {@link cache}. Set to `0` to disable caching.
     */
    constructor(
        init: UpgradeInit,
        dataPointer: Pointer<UpgradeData>,
        currencyPointer: Pointer<CurrencyStatic>,
        cacheSize?: number,
    ) {
        const data = typeof dataPointer === "function" ? dataPointer() : dataPointer;
        this.dataPointerFn = typeof dataPointer === "function" ? dataPointer : (): UpgradeData => data;
        this.currencyPointerFn =
            typeof currencyPointer === "function" ? currencyPointer : (): CurrencyStatic => currencyPointer;

        this.cache = new LRUCache(cacheSize ?? UpgradeStatic.cacheSize);
        this.id = init.id;
        this.name = init.name ?? init.id;
        this.descriptionFn = init.description
            ? typeof init.description === "function"
                ? init.description
                : (): string => init.description as string
            : (): string => "";
        this.cost = init.cost;
        this.costBulk = init.costBulk;
        this.maxLevel = init.maxLevel;
        this.effect = init.effect;
        this.el = init.el;
        this.defaultLevel = init.level ?? Decimal.dOne;
        this.bounds = init.bounds;
    }

    // /**
    //  * Gets the cached data of the upgrade.
    //  * @param type - The type of the cache. "sum" or "el"
    //  * @param start - The starting level of the upgrade.
    //  * @param end - The ending level or quantity to reach for the upgrade.
    //  * @returns The data of the upgrade.
    //  */
    // public getCached (type: "sum", start: DecimalSource, end: DecimalSource): UpgradeCachedSum | undefined;
    // public getCached (type: "el", start: DecimalSource): UpgradeCachedEL | undefined;
    // public getCached (type: "sum" | "el", start: DecimalSource, end?: DecimalSource): UpgradeCachedEL | UpgradeCachedSum | undefined {
    //     if (type === "sum") {
    //         return this.cache.get(upgradeToCacheNameSum(start, end ?? Decimal.dZero));
    //     } else {
    //         return this.cache.get(upgradeToCacheNameEL(start));
    //     }
    // }

    // /**
    //  * Sets the cached data of the upgrade.
    //  * @param type - The type of the cache. "sum" or "el"
    //  * @param start - The starting level of the upgrade.
    //  * @param end - The ending level or quantity to reach for the upgrade.
    //  * @param cost - The cost of the upgrade.
    //  */
    // public setCached(type: "sum", start: DecimalSource, end: DecimalSource, cost: DecimalSource): UpgradeCachedSum;
    // public setCached(type: "el", level: DecimalSource, cost: DecimalSource): UpgradeCachedEL;
    // public setCached (type: "sum" | "el", start: DecimalSource, endOrStart: DecimalSource, costSum?: DecimalSource): UpgradeCachedEL | UpgradeCachedSum {
    //     const data = type === "sum" ? {
    //         id: this.id,
    //         el: false,
    //         start: new Decimal(start),
    //         end: new Decimal(endOrStart),
    //         cost: new Decimal(costSum),
    //     } : {
    //         id: this.id,
    //         el: true,
    //         level: new Decimal(start),
    //         cost: new Decimal(endOrStart),
    //     };

    //     if (type === "sum") {
    //         this.cache.set(upgradeToCacheNameSum(start, endOrStart), data as UpgradeCachedSum);
    //     } else {
    //         this.cache.set(upgradeToCacheNameEL(start), data as UpgradeCachedEL);
    //     }

    //     return data as UpgradeCachedEL | UpgradeCachedSum;
    // }
}

export type { IUpgradeStatic, IUpgradeData, UpgradeInit, UpgradeInitArrayType };
export { UpgradeData, UpgradeStatic, calculateUpgrade };
export type { DecimalJSONString, UpgradeCachedELName, UpgradeCachedSumName, UpgradeCached };
export { decimalToJSONString, upgradeToCacheNameEL };
