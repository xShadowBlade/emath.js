declare module "E/lru-cache" {
    /**
     * A LRU cache intended for caching pure functions.
     */
    export class LRUCache<K, V> {
        private map;
        private first;
        private last;
        maxSize: number;
        /**
         * @param maxSize The maximum size for this cache. We recommend setting this
         * to be one less than a power of 2, as most hashtables - including V8's
         * Object hashtable (https://crsrc.org/c/v8/src/objects/ordered-hash-table.cc)
         * - uses powers of two for hashtable sizes. It can't exactly be a power of
         * two, as a .set() call could temporarily set the size of the map to be
         * maxSize + 1.
         */
        constructor(maxSize: number);
        get size(): number;
        /**
         * Gets the specified key from the cache, or undefined if it is not in the
         * cache.
         * @param key The key to get.
         * @returns The cached value, or undefined if key is not in the cache.
         */
        get(key: K): V | undefined;
        /**
         * Sets an entry in the cache.
         *
         * @param key The key of the entry.
         * @param value The value of the entry.
         * @throws Error, if the map already contains the key.
         */
        set(key: K, value: V): void;
    }
}
declare module "E/e" {
    import { LRUCache } from "E/lru-cache";
    export type CompareResult = -1 | 0 | 1;
    export type DecimalSource = Decimal | number | string;
    /**
     * The Decimal's value is simply mantissa * 10^exponent.
     */
    class Decimal {
        static readonly dZero: Decimal;
        static readonly dOne: Decimal;
        static readonly dNegOne: Decimal;
        static readonly dTwo: Decimal;
        static readonly dTen: Decimal;
        static readonly dNaN: Decimal;
        static readonly dInf: Decimal;
        static readonly dNegInf: Decimal;
        static readonly dNumberMax: Decimal;
        static readonly dNumberMin: Decimal;
        static fromStringCache: LRUCache<string, Decimal>;
        sign: number;
        mag: number;
        layer: number;
        static formats: {
            toSubscript: (value: number) => string;
            toSuperscript: (value: number) => string;
            formatST: (ex: DecimalSource, acc?: number, max?: number, type?: string) => string;
            format: (ex: DecimalSource, acc?: number, max?: number, type?: string) => string;
            formatGain: (amt: DecimalSource, gain: DecimalSource) => string;
            formatTime: (ex: DecimalSource, acc?: number, type?: string) => string;
            formatReduction: (ex: DecimalSource) => string;
            formatPercent: (ex: DecimalSource) => string;
            formatMult: (ex: DecimalSource, acc?: number) => string;
            expMult: (a: DecimalSource, b: DecimalSource, base?: number) => Decimal;
            metric: (num: DecimalSource, type: number) => string;
            ev: (num: DecimalSource, c2?: boolean) => string;
            omega: {
                config: {
                    greek: string;
                    infinity: string;
                };
                format(value: Decimal): string;
            };
            omega_short: {
                config: {
                    greek: string;
                    infinity: string;
                };
                format(value: Decimal): string;
            };
            elemental: {
                config: {
                    element_lists: string[][];
                };
                getOffset(group: number): number;
                getAbbreviation(// For default toString behaviour, when to swap from eee... to (e^n) syntax.
                group: number, progress: number): string;
                beyondOg(x: number): string;
                abbreviationLength(group: number): number;
                getAbbreviationAndValue(x: Decimal): (string | Decimal)[];
                formatElementalPart(abbreviation: string, n: Decimal): string;
                format(value: Decimal, acc: number): string;
            };
            old_sc: {
                format(ex: DecimalSource, // We need this lookup table because Math.pow(10, exponent)
                acc: number): string;
            };
            eng: {
                format(ex: DecimalSource, acc: number): string;
            };
            mixed_sc: {
                format(ex: DecimalSource, acc: number, // You can fix it with the power of math... or just make a lookup table.
                max: number): string;
            };
            layer: {
                layers: string[];
                format(ex: DecimalSource, // Faster AND simpler
                acc: number, max: number): string;
            };
            standard: {
                tier1(x: number): string;
                tier2(x: number): string;
            };
            inf: {
                format(ex: DecimalSource, acc: number, max: number): string;
            };
        };
        constructor(value?: DecimalSource);
        get m(): number;
        set m(value: number);
        get e(): number;
        set e(value: number);
        get s(): number;
        set s(value: number);
        get mantissa(): number;
        set mantissa(value: number);
        get exponent(): number;
        set exponent(value: number);
        static fromComponents(sign: number, layer: number, mag: number): Decimal;
        static fromComponents_noNormalize(sign: number, layer: number, mag: number): Decimal;
        static fromMantissaExponent(mantissa: number, exponent: number): Decimal;
        static fromMantissaExponent_noNormalize(mantissa: number, exponent: number): Decimal;
        static fromDecimal(value: Decimal): Decimal;
        static fromNumber(value: number): Decimal;
        static fromString(value: string): Decimal;
        static fromValue(value: DecimalSource): Decimal;
        /**
       * Converts a DecimalSource to a Decimal, without constructing a new Decimal
       * if the provided value is already a Decimal.
       *
       * As the return value could be the provided value itself, this function
       * returns a read-only Decimal to prevent accidental mutations of the value.
       * Use `new Decimal(value)` to explicitly create a writeable copy if mutation
       * is required.
       */
        static fromValue_noAlloc(value: DecimalSource): Readonly<Decimal>;
        static abs(value: DecimalSource): Decimal;
        static neg(value: DecimalSource): Decimal;
        static negate(value: DecimalSource): Decimal;
        static negated(value: DecimalSource): Decimal;
        static sign(value: DecimalSource): number;
        static sgn(value: DecimalSource): number;
        static round(value: DecimalSource): Decimal;
        static floor(value: DecimalSource): Decimal;
        static ceil(value: DecimalSource): Decimal;
        static trunc(value: DecimalSource): Decimal;
        static add(value: DecimalSource, other: DecimalSource): Decimal;
        static plus(value: DecimalSource, other: DecimalSource): Decimal;
        static sub(value: DecimalSource, other: DecimalSource): Decimal;
        static subtract(value: DecimalSource, other: DecimalSource): Decimal;
        static minus(value: DecimalSource, other: DecimalSource): Decimal;
        static mul(value: DecimalSource, other: DecimalSource): Decimal;
        static multiply(value: DecimalSource, other: DecimalSource): Decimal;
        static times(value: DecimalSource, other: DecimalSource): Decimal;
        static div(value: DecimalSource, other: DecimalSource): Decimal;
        static divide(value: DecimalSource, other: DecimalSource): Decimal;
        static recip(value: DecimalSource): Decimal;
        static reciprocal(value: DecimalSource): Decimal;
        static reciprocate(value: DecimalSource): Decimal;
        static cmp(value: DecimalSource, other: DecimalSource): CompareResult;
        static cmpabs(value: DecimalSource, other: DecimalSource): CompareResult;
        static compare(value: DecimalSource, other: DecimalSource): CompareResult;
        static isNaN(value: DecimalSource): boolean;
        static isFinite(value: DecimalSource): boolean;
        static eq(value: DecimalSource, other: DecimalSource): boolean;
        static equals(value: DecimalSource, other: DecimalSource): boolean;
        static neq(value: DecimalSource, other: DecimalSource): boolean;
        static notEquals(value: DecimalSource, other: DecimalSource): boolean;
        static lt(value: DecimalSource, other: DecimalSource): boolean;
        static lte(value: DecimalSource, other: DecimalSource): boolean;
        static gt(value: DecimalSource, other: DecimalSource): boolean;
        static gte(value: DecimalSource, other: DecimalSource): boolean;
        static max(value: DecimalSource, other: DecimalSource): Decimal;
        static min(value: DecimalSource, other: DecimalSource): Decimal;
        static minabs(value: DecimalSource, other: DecimalSource): Decimal;
        static maxabs(value: DecimalSource, other: DecimalSource): Decimal;
        static clamp(value: DecimalSource, min: DecimalSource, max: DecimalSource): Decimal;
        static clampMin(value: DecimalSource, min: DecimalSource): Decimal;
        static clampMax(value: DecimalSource, max: DecimalSource): Decimal;
        static cmp_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): CompareResult;
        static compare_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): CompareResult;
        static eq_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
        static equals_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
        static neq_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
        static notEquals_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
        static lt_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
        static lte_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
        static gt_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
        static gte_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
        static pLog10(value: DecimalSource): Decimal;
        static absLog10(value: DecimalSource): Decimal;
        static log10(value: DecimalSource): Decimal;
        static log(value: DecimalSource, base: DecimalSource): Decimal;
        static log2(value: DecimalSource): Decimal;
        static ln(value: DecimalSource): Decimal;
        static logarithm(value: DecimalSource, base: DecimalSource): Decimal;
        static pow(value: DecimalSource, other: DecimalSource): Decimal;
        static pow10(value: DecimalSource): Decimal;
        static root(value: DecimalSource, other: DecimalSource): Decimal;
        static factorial(value: DecimalSource, _other?: never): Decimal;
        static gamma(value: DecimalSource, _other?: never): Decimal;
        static lngamma(value: DecimalSource, _other?: never): Decimal;
        static exp(value: DecimalSource): Decimal;
        static sqr(value: DecimalSource): Decimal;
        static sqrt(value: DecimalSource): Decimal;
        static cube(value: DecimalSource): Decimal;
        static cbrt(value: DecimalSource): Decimal;
        static tetrate(value: DecimalSource, height?: number, payload?: DecimalSource): Decimal;
        static iteratedexp(value: DecimalSource, height?: number, payload?: Decimal): Decimal;
        static iteratedlog(value: DecimalSource, base?: DecimalSource, times?: number): Decimal;
        static layeradd10(value: DecimalSource, diff: DecimalSource): Decimal;
        static layeradd(value: DecimalSource, diff: number, base?: number): Decimal;
        static slog(value: DecimalSource, base?: number): Decimal;
        static lambertw(value: DecimalSource): Decimal;
        static ssqrt(value: DecimalSource): Decimal;
        static pentate(value: DecimalSource, height?: number, payload?: DecimalSource): Decimal;
        /**
       * If you're willing to spend 'resourcesAvailable' and want to buy something
       * with exponentially increasing cost each purchase (start at priceStart,
       * multiply by priceRatio, already own currentOwned), how much of it can you buy?
       * Adapted from Trimps source code.
       */
        static affordGeometricSeries(resourcesAvailable: DecimalSource, priceStart: DecimalSource, priceRatio: DecimalSource, currentOwned: DecimalSource): Decimal;
        /**
       * How much resource would it cost to buy (numItems) items if you already have currentOwned,
       * the initial price is priceStart and it multiplies by priceRatio each purchase?
       */
        static sumGeometricSeries(numItems: DecimalSource, priceStart: DecimalSource, priceRatio: DecimalSource, currentOwned: DecimalSource): Decimal;
        /**
       * If you're willing to spend 'resourcesAvailable' and want to buy something with additively
       * increasing cost each purchase (start at priceStart, add by priceAdd, already own currentOwned),
       * how much of it can you buy?
       */
        static affordArithmeticSeries(resourcesAvailable: DecimalSource, priceStart: DecimalSource, priceAdd: DecimalSource, currentOwned: DecimalSource): Decimal;
        /**
       * How much resource would it cost to buy (numItems) items if you already have currentOwned,
       * the initial price is priceStart and it adds priceAdd each purchase?
       * Adapted from http://www.mathwords.com/a/arithmetic_series.htm
       */
        static sumArithmeticSeries(numItems: DecimalSource, priceStart: DecimalSource, priceAdd: DecimalSource, currentOwned: DecimalSource): Decimal;
        /**
       * When comparing two purchases that cost (resource) and increase your resource/sec by (deltaRpS),
       * the lowest efficiency score is the better one to purchase.
       * From Frozen Cookies:
       * http://cookieclicker.wikia.com/wiki/Frozen_Cookies_(JavaScript_Add-on)#Efficiency.3F_What.27s_that.3F
       */
        static efficiencyOfPurchase(cost: DecimalSource, currentRpS: DecimalSource, deltaRpS: DecimalSource): Decimal;
        static randomDecimalForTesting(maxLayers: number): Decimal;
        static affordGeometricSeries_core(resourcesAvailable: Decimal, priceStart: Decimal, priceRatio: Decimal, currentOwned: DecimalSource): Decimal;
        static sumGeometricSeries_core(numItems: DecimalSource, priceStart: Decimal, priceRatio: Decimal, currentOwned: DecimalSource): Decimal;
        static affordArithmeticSeries_core(resourcesAvailable: Decimal, priceStart: Decimal, priceAdd: Decimal, currentOwned: Decimal): Decimal;
        static sumArithmeticSeries_core(numItems: Decimal, priceStart: Decimal, priceAdd: Decimal, currentOwned: Decimal): Decimal;
        static efficiencyOfPurchase_core(cost: Decimal, currentRpS: Decimal, deltaRpS: Decimal): Decimal;
        normalize(): this;
        fromComponents(sign: number, layer: number, mag: number): this;
        fromComponents_noNormalize(sign: number, layer: number, mag: number): this;
        fromMantissaExponent(mantissa: number, exponent: number): this;
        fromMantissaExponent_noNormalize(mantissa: number, exponent: number): this;
        fromDecimal(value: Decimal): this;
        fromNumber(value: number): this;
        fromString(value: string): Decimal;
        fromValue(value: DecimalSource): Decimal;
        toNumber(): number;
        mantissaWithDecimalPlaces(places: number): number;
        magnitudeWithDecimalPlaces(places: number): number;
        toString(): string;
        toExponential(places: number): string;
        toFixed(places: number): string;
        toPrecision(places: number): string;
        valueOf(): string;
        toJSON(): string;
        toStringWithDecimalPlaces(places: number): string;
        abs(): Decimal;
        neg(): Decimal;
        negate(): Decimal;
        negated(): Decimal;
        sgn(): number;
        round(): this | Decimal;
        floor(): this | Decimal;
        ceil(): this | Decimal;
        trunc(): this | Decimal;
        add(value: DecimalSource): this | Decimal;
        plus(value: DecimalSource): Decimal;
        sub(value: DecimalSource): Decimal;
        subtract(value: DecimalSource): Decimal;
        minus(value: DecimalSource): Decimal;
        mul(value: DecimalSource): Decimal;
        multiply(value: DecimalSource): Decimal;
        times(value: DecimalSource): Decimal;
        div(value: DecimalSource): Decimal;
        divide(value: DecimalSource): Decimal;
        divideBy(value: DecimalSource): Decimal;
        dividedBy(value: DecimalSource): Decimal;
        recip(): Decimal;
        reciprocal(): Decimal;
        reciprocate(): Decimal;
        /**
       * -1 for less than value, 0 for equals value, 1 for greater than value
       */
        cmp(value: DecimalSource): CompareResult;
        cmpabs(value: DecimalSource): CompareResult;
        compare(value: DecimalSource): CompareResult;
        isNan(): boolean;
        isFinite(): boolean;
        eq(value: DecimalSource): boolean;
        equals(value: DecimalSource): boolean;
        neq(value: DecimalSource): boolean;
        notEquals(value: DecimalSource): boolean;
        lt(value: DecimalSource): boolean;
        lte(value: DecimalSource): boolean;
        gt(value: DecimalSource): boolean;
        gte(value: DecimalSource): boolean;
        max(value: DecimalSource): Decimal;
        min(value: DecimalSource): Decimal;
        maxabs(value: DecimalSource): Decimal;
        minabs(value: DecimalSource): Decimal;
        clamp(min: DecimalSource, max: DecimalSource): Decimal;
        clampMin(min: DecimalSource): Decimal;
        clampMax(max: DecimalSource): Decimal;
        cmp_tolerance(value: DecimalSource, tolerance: number): CompareResult;
        compare_tolerance(value: DecimalSource, tolerance: number): CompareResult;
        /**
       * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
       * For example, if you put in 1e-9, then any number closer to the
       * larger number than (larger number)*1e-9 will be considered equal.
       */
        eq_tolerance(value: DecimalSource, tolerance: number): boolean;
        equals_tolerance(value: DecimalSource, tolerance: number): boolean;
        neq_tolerance(value: DecimalSource, tolerance: number): boolean;
        notEquals_tolerance(value: DecimalSource, tolerance: number): boolean;
        lt_tolerance(value: DecimalSource, tolerance: number): boolean;
        lte_tolerance(value: DecimalSource, tolerance: number): boolean;
        gt_tolerance(value: DecimalSource, tolerance: number): boolean;
        gte_tolerance(value: DecimalSource, tolerance: number): boolean;
        pLog10(): Decimal;
        absLog10(): Decimal;
        log10(): Decimal;
        log(base: DecimalSource): Decimal;
        log2(): Decimal;
        ln(): Decimal;
        logarithm(base: DecimalSource): Decimal;
        pow(value: DecimalSource): Decimal;
        pow10(): Decimal;
        pow_base(value: DecimalSource): Decimal;
        root(value: DecimalSource): Decimal;
        factorial(): Decimal;
        gamma(): Decimal;
        lngamma(): Decimal;
        exp(): Decimal;
        sqr(): Decimal;
        sqrt(): Decimal;
        cube(): Decimal;
        cbrt(): Decimal;
        tetrate(height?: number, payload?: DecimalSource): Decimal;
        iteratedexp(height?: number, payload?: Decimal): Decimal;
        iteratedlog(base?: DecimalSource, times?: number): Decimal;
        slog(base?: DecimalSource, iterations?: number): Decimal;
        slog_internal(base?: DecimalSource): Decimal;
        static slog_critical(base: number, height: number): number;
        static tetrate_critical(base: number, height: number): number;
        static critical_section(base: number, height: number, grid: number[][]): number;
        layeradd10(diff: DecimalSource): Decimal;
        layeradd(diff: number, base: DecimalSource): Decimal;
        lambertw(): Decimal;
        ssqrt(): Decimal;
        pentate(height?: number, payload?: DecimalSource): Decimal;
        sin(): this | Decimal;
        cos(): Decimal;
        tan(): this | Decimal;
        asin(): this | Decimal;
        acos(): Decimal;
        atan(): this | Decimal;
        sinh(): Decimal;
        cosh(): Decimal;
        tanh(): Decimal;
        asinh(): Decimal;
        acosh(): Decimal;
        atanh(): Decimal;
        /**
       * Joke function from Realm Grinder
       */
        ascensionPenalty(ascensions: DecimalSource): Decimal;
        /**
       * Joke function from Cookie Clicker. It's 'egg'
       */
        egg(): Decimal;
        lessThanOrEqualTo(other: DecimalSource): boolean;
        lessThan(other: DecimalSource): boolean;
        greaterThanOrEqualTo(other: DecimalSource): boolean;
        greaterThan(other: DecimalSource): boolean;
        /**
         * Smoothly interpolates between the current value and the target value over time
         * using a smoothing factor and deltaTime.
         *
         * @param {Decimal} current - The current value to interpolate from.
         * @param {Decimal} target - The target value to interpolate towards.
         * @param {Decimal} smoothing - The smoothing factor controlling the interpolation speed.
         *                           A higher value results in slower interpolation.
         * @param {Decimal} deltaTime - The time elapsed since the last frame in seconds.
         * @returns {Decimal} - The interpolated value between `current` and `target`.
         */
        static smoothDamp(current: DecimalSource, target: DecimalSource, smoothing: DecimalSource, deltaTime: DecimalSource): Decimal;
        /**
        * Formats the E instance with a specified accuracy and maximum decimal places.
        *
        * @function
        * @name format
        * @param {number} [acc=2] - The desired accuracy (number of significant figures).
        * @param {number} [max=9] - The maximum number of decimal places to display.
        * @returns {string} A string representing the formatted E value.
        */
        static format(e: DecimalSource, acc?: number, max?: number): string;
        /**
         * Creates a clone of the E instance.
         *
         * @function
         * @name clone
         * @returns {Decimal} A EClone instance that is a clone of the original.
         */
        clone(): Decimal;
        /**
         * Performs modular arithmetic on the DecimalClone instance.
         *
         * @function
         * @name modular
         * @alias mod
         * @param {DecimalSource} other - The number or DecimalClone instance to use for modular arithmetic.
         * @returns {Decimal} A EClone instance representing the result of the modular operation.
         */
        mod(other: DecimalSource): Decimal;
        /**
        * Applies a soft cap to a DecimalClone value using a specified soft cap function.
        *
        * @param {DecimalSource} start - The value at which the soft cap starts.
        * @param {number} power - The power or factor used in the soft cap calculation.
        * @param {string} mode - The soft cap mode. Use "pow" for power soft cap, "mul" for multiplication soft cap,
        *                       or "exp" for exponential soft cap.
        * @returns {Decimal} - The DecimalClone value after applying the soft cap.
        */
        softcap(start: DecimalSource, power: number, mode: string): Decimal;
        /**
        * Scales a currency value using a specified scaling function.
        *
        * @param {DecimalSource} s - The value at which scaling starts.
        * @param {DecimalSource} p - The scaling factor.
        * @param {string} mode - The scaling mode. Use "pow" for power scaling or "exp" for exponential scaling.
        * @param {boolean} [rev=false] - Whether to reverse the scaling operation (unscaling).
        * @returns {Decimal} - The scaled currency value.
        */
        scale(s: DecimalSource, p: DecimalSource, mode: string, rev?: boolean): Decimal;
        /**
         * Formats the E instance with a specified accuracy and maximum decimal places.
         *
         * @function
         * @name format
         * @param {number} [acc=2] - The desired accuracy (number of significant figures).
         * @param {number} [max=9] - The maximum number of decimal places to display.
         * @returns {string} A string representing the formatted E value.
         */
        format(acc?: number, max?: number): string;
        /**
         * Formats the E instance in standard leter notation with a specified accuracy and maximum decimal places.
         *
         * @function
         * @name formatST
         * @param {number} [acc=2] - The desired accuracy (number of significant figures).
         * @param {number} [max=9] - The maximum number of decimal places to display.
         * @param {string} [type="st"] - The type of format (default standard)
         * @returns {string} A string representing the formatted E value.
         */
        formatST(acc?: number, max?: number, type?: string): string;
        /**
         * Formats the gain rate using the E instance.
         *
         * @function
         * @name formatGain
         * @param {DecimalSource} gain - The gain value to compare
         * @param {boolean} [mass=false] - Indicates whether the gain represents a mass value.
         * @returns {string} A string representing the formatted gain
         *
         * @example
         * const currency = new Decimal(100);
         * const currencyGain = new Decimal(12);
         * const formatted = currency.formatGain(currencyGain);
         * console.log(formatted); // should return "(+12/sec)"
         */
        formatGain(gain: DecimalSource): string;
        /**
         * Converts the E instance to a Roman numeral representation.
         *
         * @function
         * @name toRoman
         * @param {number|Decimal} [max=5000] - Max before it returns the original
         * @returns {string|Decimal} A string representing the Roman numeral equivalent of the E value,
         * or the original E instance if it is greater than or equal to 5000.
         */
        toRoman(max: DecimalSource): string | Decimal;
    }
    export default Decimal;
}
declare module "eMath" {
    import Decimal, { DecimalSource } from "E/e";
    type StaticMethods<T> = {
        [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K];
    };
    const E: StaticMethods<Decimal> & {
        (x?: DecimalSource): Decimal;
    };
    type E = Decimal;
    const eMath: {};
    export { eMath, E };
}
declare module "classes/boost" {
    import { E } from "eMath";
    /**
     * Represents a boost manager that applies various effects to a base value.
     *
     * @class
     * @param {number|E} baseEffect - The base effect value to which boosts are applied.
     * @param {...Object} boosts - An array of boost objects to initialize with.
     * @example
     * const myboost = new Game.classes.boost(100, {
     *   id: "reallyCoolboost124",
     *   name: "buff this",
     *   desc: "really cool lol",
     *   type: "add",
     *   value: E(124),
     * });
     */
    interface boostsObject {
        id: string;
        name: string;
        desc?: string;
        type: "add" | "mul" | "pow" | "tetr" | "pent";
        value: (input: E) => E;
        order?: number;
        index: number;
    }
    class boost {
        /**
         * An array of boost objects.
         * @type {boostsObject[]}
         */
        boostArray: boostsObject[];
        /**
         * The base effect value.
         * @type {E}
         */
        baseEffect: E;
        /**
         * Constructs a new boost manager.
         *
         * @constructor
         * @param {number} [baseEffect] - The base effect value to which boosts are applied.
         * @param {...boostsObject} boosts - An array of boost objects to initialize with.
         */
        constructor(baseEffect?: number | E, boosts?: boostsObject[]);
        /**
         * Gets a boost object by its ID.
         *
         * @param {string} id - The ID of the boost to retrieve.
         * @returns {boostsObject|null} The boost object if found, or null if not found.
         */
        bGet(id: string): boostsObject | null;
        /**
         * Removes a boost by its ID.
         *
         * @param {string} id - The ID of the boost to remove.
         */
        bRemove(id: string): void;
        /**
         * Sets or updates a boost with the given parameters.
         *
         * @param {string} id - The ID of the boost.
         * @param {string} name - The name of the boost.
         * @param {string} desc - The description of the boost.
         * @param {function} value - The value of the boost (function).
         * @param {number} order - The order of the boost (higher order are go first)
         */
        bSet(id: string, name: string, desc: string, type: "add" | "mul" | "pow" | "tetr" | "pent", value: () => E, order: number): void;
        /**
         * Sets or updates multiple boosts with advanced parameters.
         *
         * @param {...boostsObject} x - boost objects to set or update.
         */
        bSetAdvanced(...x: boostsObject[]): void;
        /**
         * Calculates the cumulative effect of all boosts on the base effect.
         *
         * @param {number|E} [base=this.baseEffect] - The base effect value to calculate with.
         * @returns {E} The calculated effect after applying boosts.
         */
        calculate(base?: number | E): E;
    }
    export { boost };
}
declare module "classes/currency" {
    import { E } from "eMath";
    import { boost } from "classes/boost";
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
    class currency {
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
    class currencyStatic {
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
        gain(dt?: number | E): E;
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
}
declare module "classes/attribute" {
    import { E } from "eMath";
    import { boost } from "classes/boost";
    /**
     * Represents a static attribute in the game.
     *
     * @class
     */
    class attribute {
        /**
         * The inital value of the attribute.
         * @type {E}
         */
        initial: E | number;
        /**
         * The current value of the attribute.
         * @type {E}
         */
        value: E;
        /**
         * A boost object that affects the attribute.
         * @type {boost}
         */
        boost: boost;
        /**
         * Constructs a static attribute with an initial effect.
         *
         * @constructor
         * @param {E|Number} initial - The inital value of the attribute.
         */
        constructor(initial: E | number);
        /**
         * Updates the value of the attribute based on the provided effect function and initial value.
         *
         * @param {function} effect - The effect function to apply to the attribute.
         * @returns {E} The updated value of the attribute after applying the effect.
         */
        update(effect: Function): E;
    }
    export { attribute };
}
declare module "classes/grid" {
    /**
     * Represents a grid cell with coordinates.
     * @class
     */
    class gridCell {
        x: number;
        y: number;
        [key: string]: any;
        /**
         * Initializes a new instance of the grid cell.
         * @constructor
         * @param {number} x - The x-coordinate.
         * @param {number} y - The y-coordinate.
         */
        constructor(x: number, y: number);
        /**
         * Sets the value of a property on the cell.
         * @param {string} name - The name of the property.
         * @param {any} value - The value to set.
         * @returns {any} - The set value.
         */
        setValue(name: string, value: any): any;
        /**
         * Calculates the distance from the cell to a specified point.
         * @param {number} x - The x-coordinate of the target point.
         * @param {number} y - The y-coordinate of the target point.
         * @returns {number} - The distance between the cell and the target point.
         */
        getDistance(x: number, y: number): number;
    }
    /**
     * Represents a grid with cells.
     * @class
     */
    class grid {
        x_size: number;
        y_size: number;
        /**
         * Represents the cells of the grid.
         * @type {gridCell[][]}
         */
        [key: number]: gridCell[];
        /**
         * Initializes a new instance of the grid.
         * @constructor
         * @param {number} x_size - The size of the grid along the x-axis.
         * @param {number} y_size - The size of the grid along the y-axis.
         */
        constructor(x_size: number, y_size: number);
        /**
         * Gets an array containing all cells in the grid.
         * @returns {gridCell[]} - An array of all cells.
         */
        all(): gridCell[];
        /**
         * Gets an array containing all cells that have the same x coordinate.
         * @returns {gridCell[]} - An array of all cells.
         * @param {number} x - The x coordinate to check.
         */
        allX(x: number): gridCell[];
        /**
         * Gets an array containing all cells that have the same y coordinate.
         * @returns {gridCell[]} - An array of all cells.
         * @param {number} y - The y coordinate to check.
         */
        allY(y: number): gridCell[];
        /**
         * Gets a cell.
         * @returns {gridCell} - The cell.
         * @param {number} x - The x coordinate to check.
         * @param {number} y - The y coordinate to check.
         */
        getCell(x: number, y: number): gridCell;
        /**
         * Gets an array containing all cells adjacent to a specific cell.
         * @returns {gridCell[]} - An array of all cells.
         * @param {number} x - The x coordinate to check.
         * @param {number} y - The y coordinate to check.
         */
        getAdjacent(x: number, y: number): gridCell[];
        /**
         * Gets an array containing all cells diagonal from a specific cell.
         * @returns {gridCell[]} - An array of all cells.
         * @param {number} x - The x coordinate to check.
         * @param {number} y - The y coordinate to check.
         */
        getDiagonal(x: number, y: number): gridCell[];
        /**
         * Gets an array containing all cells that surround a cell.
         * @returns {gridCell[]} - An array of all cells.
         * @param {number} x - The x coordinate to check.
         * @param {number} y - The y coordinate to check.
         */
        getEncircling(x: number, y: number): gridCell[];
    }
    /**
     * Exports the gridCell and grid classes.
     * @module
     */
    export { gridCell, grid };
}
declare module "index" {
    import { boost } from "classes/boost";
    import { currency, currencyStatic } from "classes/currency";
    import { attribute } from "classes/attribute";
    import { grid } from "classes/grid";
    const eMath: {
        E: {
            normalize: () => import("E/e").default;
            fromComponents: (sign: number, layer: number, mag: number) => import("E/e").default;
            fromComponents_noNormalize: (sign: number, layer: number, mag: number) => import("E/e").default;
            fromMantissaExponent: (mantissa: number, exponent: number) => import("E/e").default;
            fromMantissaExponent_noNormalize: (mantissa: number, exponent: number) => import("E/e").default;
            fromDecimal: (value: import("E/e").default) => import("E/e").default;
            fromNumber: (value: number) => import("E/e").default;
            fromString: (value: string) => import("E/e").default;
            fromValue: (value: import("E/e").DecimalSource) => import("E/e").default;
            toNumber: () => number;
            mantissaWithDecimalPlaces: (places: number) => number;
            magnitudeWithDecimalPlaces: (places: number) => number;
            toString: () => string;
            toExponential: (places: number) => string;
            toFixed: (places: number) => string;
            toPrecision: (places: number) => string;
            valueOf: () => string;
            toJSON: () => string;
            toStringWithDecimalPlaces: (places: number) => string;
            abs: () => import("E/e").default;
            neg: () => import("E/e").default;
            negate: () => import("E/e").default;
            negated: () => import("E/e").default;
            sgn: () => number;
            round: () => import("E/e").default;
            floor: () => import("E/e").default;
            ceil: () => import("E/e").default;
            trunc: () => import("E/e").default;
            add: (value: import("E/e").DecimalSource) => import("E/e").default;
            plus: (value: import("E/e").DecimalSource) => import("E/e").default;
            sub: (value: import("E/e").DecimalSource) => import("E/e").default;
            subtract: (value: import("E/e").DecimalSource) => import("E/e").default;
            minus: (value: import("E/e").DecimalSource) => import("E/e").default;
            mul: (value: import("E/e").DecimalSource) => import("E/e").default;
            multiply: (value: import("E/e").DecimalSource) => import("E/e").default;
            times: (value: import("E/e").DecimalSource) => import("E/e").default;
            div: (value: import("E/e").DecimalSource) => import("E/e").default;
            divide: (value: import("E/e").DecimalSource) => import("E/e").default;
            divideBy: (value: import("E/e").DecimalSource) => import("E/e").default;
            dividedBy: (value: import("E/e").DecimalSource) => import("E/e").default;
            recip: () => import("E/e").default;
            reciprocal: () => import("E/e").default;
            reciprocate: () => import("E/e").default;
            cmp: (value: import("E/e").DecimalSource) => import("E/e").CompareResult;
            cmpabs: (value: import("E/e").DecimalSource) => import("E/e").CompareResult;
            compare: (value: import("E/e").DecimalSource) => import("E/e").CompareResult;
            isNan: () => boolean;
            isFinite: () => boolean;
            eq: (value: import("E/e").DecimalSource) => boolean;
            equals: (value: import("E/e").DecimalSource) => boolean;
            neq: (value: import("E/e").DecimalSource) => boolean;
            notEquals: (value: import("E/e").DecimalSource) => boolean;
            lt: (value: import("E/e").DecimalSource) => boolean;
            lte: (value: import("E/e").DecimalSource) => boolean;
            gt: (value: import("E/e").DecimalSource) => boolean;
            gte: (value: import("E/e").DecimalSource) => boolean;
            max: (value: import("E/e").DecimalSource) => import("E/e").default;
            min: (value: import("E/e").DecimalSource) => import("E/e").default;
            maxabs: (value: import("E/e").DecimalSource) => import("E/e").default;
            minabs: (value: import("E/e").DecimalSource) => import("E/e").default;
            clamp: (min: import("E/e").DecimalSource, max: import("E/e").DecimalSource) => import("E/e").default;
            clampMin: (min: import("E/e").DecimalSource) => import("E/e").default;
            clampMax: (max: import("E/e").DecimalSource) => import("E/e").default;
            cmp_tolerance: (value: import("E/e").DecimalSource, tolerance: number) => import("E/e").CompareResult;
            compare_tolerance: (value: import("E/e").DecimalSource, tolerance: number) => import("E/e").CompareResult;
            eq_tolerance: (value: import("E/e").DecimalSource, tolerance: number) => boolean;
            equals_tolerance: (value: import("E/e").DecimalSource, tolerance: number) => boolean;
            neq_tolerance: (value: import("E/e").DecimalSource, tolerance: number) => boolean;
            notEquals_tolerance: (value: import("E/e").DecimalSource, tolerance: number) => boolean;
            lt_tolerance: (value: import("E/e").DecimalSource, tolerance: number) => boolean;
            lte_tolerance: (value: import("E/e").DecimalSource, tolerance: number) => boolean;
            gt_tolerance: (value: import("E/e").DecimalSource, tolerance: number) => boolean;
            gte_tolerance: (value: import("E/e").DecimalSource, tolerance: number) => boolean;
            pLog10: () => import("E/e").default;
            absLog10: () => import("E/e").default;
            log10: () => import("E/e").default;
            log: (base: import("E/e").DecimalSource) => import("E/e").default;
            log2: () => import("E/e").default;
            ln: () => import("E/e").default;
            logarithm: (base: import("E/e").DecimalSource) => import("E/e").default;
            pow: (value: import("E/e").DecimalSource) => import("E/e").default;
            pow10: () => import("E/e").default;
            pow_base: (value: import("E/e").DecimalSource) => import("E/e").default;
            root: (value: import("E/e").DecimalSource) => import("E/e").default;
            factorial: () => import("E/e").default;
            gamma: () => import("E/e").default;
            lngamma: () => import("E/e").default;
            exp: () => import("E/e").default;
            sqr: () => import("E/e").default;
            sqrt: () => import("E/e").default;
            cube: () => import("E/e").default;
            cbrt: () => import("E/e").default;
            tetrate: (height?: number, payload?: import("E/e").DecimalSource) => import("E/e").default;
            iteratedexp: (height?: number, payload?: import("E/e").default) => import("E/e").default;
            iteratedlog: (base?: import("E/e").DecimalSource, times?: number) => import("E/e").default;
            slog: (base?: import("E/e").DecimalSource, iterations?: number) => import("E/e").default;
            slog_internal: (base?: import("E/e").DecimalSource) => import("E/e").default;
            layeradd10: (diff: import("E/e").DecimalSource) => import("E/e").default;
            layeradd: (diff: number, base: import("E/e").DecimalSource) => import("E/e").default;
            lambertw: () => import("E/e").default;
            ssqrt: () => import("E/e").default;
            pentate: (height?: number, payload?: import("E/e").DecimalSource) => import("E/e").default;
            sin: () => import("E/e").default;
            cos: () => import("E/e").default;
            tan: () => import("E/e").default;
            asin: () => import("E/e").default;
            acos: () => import("E/e").default;
            atan: () => import("E/e").default;
            sinh: () => import("E/e").default;
            cosh: () => import("E/e").default;
            tanh: () => import("E/e").default;
            asinh: () => import("E/e").default;
            acosh: () => import("E/e").default;
            atanh: () => import("E/e").default;
            ascensionPenalty: (ascensions: import("E/e").DecimalSource) => import("E/e").default;
            egg: () => import("E/e").default;
            lessThanOrEqualTo: (other: import("E/e").DecimalSource) => boolean;
            lessThan: (other: import("E/e").DecimalSource) => boolean;
            greaterThanOrEqualTo: (other: import("E/e").DecimalSource) => boolean;
            greaterThan: (other: import("E/e").DecimalSource) => boolean;
            clone: () => import("E/e").default;
            mod: (other: import("E/e").DecimalSource) => import("E/e").default;
            softcap: (start: import("E/e").DecimalSource, power: number, mode: string) => import("E/e").default;
            scale: (s: import("E/e").DecimalSource, p: import("E/e").DecimalSource, mode: string, rev?: boolean) => import("E/e").default;
            format: (acc?: number, max?: number) => string;
            formatST: (acc?: number, max?: number, type?: string) => string;
            formatGain: (gain: import("E/e").DecimalSource) => string;
            toRoman: (max: import("E/e").DecimalSource) => string | import("E/e").default;
        } & ((x?: import("E/e").DecimalSource | undefined) => import("E/e").default);
        classes: {
            boost: typeof boost;
            currency: typeof currency;
            currencyStatic: typeof currencyStatic;
            attribute: typeof attribute;
            grid: typeof grid;
        };
    };
    export default eMath;
}
