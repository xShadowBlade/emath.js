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
declare module "classes/utility/eString" {
    class EString extends String {
        constructor(value?: string);
        forEach: (this: String, callbackfn: (value: string) => void) => void;
        forEachAdvanced: (this: EString, callbackfn: (char: {
            value: string;
            index: number;
        }) => void, start: number, end: number) => void;
        toNumber: (this: EString) => number;
        toArray: (this: EString) => string[];
        before: (this: EString, index: number) => string;
        after: (this: EString, index: number) => string;
        customSplit: (this: EString, index: number) => string[];
        random: (this: EString, qty: number) => string;
    }
    export { EString };
}
declare module "eMath" {
    import Decimal, { DecimalSource, CompareResult } from "E/e";
    const E: {
        (x?: DecimalSource): Decimal;
        readonly dZero: Decimal;
        readonly dOne: Decimal;
        readonly dNegOne: Decimal;
        readonly dTwo: Decimal;
        readonly dTen: Decimal;
        readonly dNaN: Decimal;
        readonly dInf: Decimal;
        readonly dNegInf: Decimal;
        readonly dNumberMax: Decimal;
        readonly dNumberMin: Decimal;
        fromComponents(sign: number, layer: number, mag: number): Decimal;
        fromComponents_noNormalize(sign: number, layer: number, mag: number): Decimal;
        fromMantissaExponent(mantissa: number, exponent: number): Decimal;
        fromMantissaExponent_noNormalize(mantissa: number, exponent: number): Decimal;
        fromDecimal(value: Decimal): Decimal;
        fromNumber(value: number): Decimal;
        fromString(value: string): Decimal;
        fromValue(value: DecimalSource): Decimal;
        fromValue_noAlloc(value: DecimalSource): Readonly<Decimal>;
        abs(value: DecimalSource): Decimal;
        neg(value: DecimalSource): Decimal;
        negate(value: DecimalSource): Decimal;
        negated(value: DecimalSource): Decimal;
        sign(value: DecimalSource): number;
        sgn(value: DecimalSource): number;
        round(value: DecimalSource): Decimal;
        floor(value: DecimalSource): Decimal;
        ceil(value: DecimalSource): Decimal;
        trunc(value: DecimalSource): Decimal;
        add(value: DecimalSource, other: DecimalSource): Decimal;
        plus(value: DecimalSource, other: DecimalSource): Decimal;
        sub(value: DecimalSource, other: DecimalSource): Decimal;
        subtract(value: DecimalSource, other: DecimalSource): Decimal;
        minus(value: DecimalSource, other: DecimalSource): Decimal;
        mul(value: DecimalSource, other: DecimalSource): Decimal;
        multiply(value: DecimalSource, other: DecimalSource): Decimal;
        times(value: DecimalSource, other: DecimalSource): Decimal;
        div(value: DecimalSource, other: DecimalSource): Decimal;
        divide(value: DecimalSource, other: DecimalSource): Decimal;
        recip(value: DecimalSource): Decimal;
        reciprocal(value: DecimalSource): Decimal;
        reciprocate(value: DecimalSource): Decimal;
        cmp(value: DecimalSource, other: DecimalSource): CompareResult;
        cmpabs(value: DecimalSource, other: DecimalSource): CompareResult;
        compare(value: DecimalSource, other: DecimalSource): CompareResult;
        isNaN(value: DecimalSource): boolean;
        isFinite(value: DecimalSource): boolean;
        eq(value: DecimalSource, other: DecimalSource): boolean;
        equals(value: DecimalSource, other: DecimalSource): boolean;
        neq(value: DecimalSource, other: DecimalSource): boolean;
        notEquals(value: DecimalSource, other: DecimalSource): boolean;
        lt(value: DecimalSource, other: DecimalSource): boolean;
        lte(value: DecimalSource, other: DecimalSource): boolean;
        gt(value: DecimalSource, other: DecimalSource): boolean;
        gte(value: DecimalSource, other: DecimalSource): boolean;
        max(value: DecimalSource, other: DecimalSource): Decimal;
        min(value: DecimalSource, other: DecimalSource): Decimal;
        minabs(value: DecimalSource, other: DecimalSource): Decimal;
        maxabs(value: DecimalSource, other: DecimalSource): Decimal;
        clamp(value: DecimalSource, min: DecimalSource, max: DecimalSource): Decimal;
        clampMin(value: DecimalSource, min: DecimalSource): Decimal;
        clampMax(value: DecimalSource, max: DecimalSource): Decimal;
        cmp_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): CompareResult;
        compare_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): CompareResult;
        eq_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
        equals_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
        neq_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
        notEquals_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
        lt_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
        lte_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
        gt_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
        gte_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
        pLog10(value: DecimalSource): Decimal;
        absLog10(value: DecimalSource): Decimal;
        log10(value: DecimalSource): Decimal;
        log(value: DecimalSource, base: DecimalSource): Decimal;
        log2(value: DecimalSource): Decimal;
        ln(value: DecimalSource): Decimal;
        logarithm(value: DecimalSource, base: DecimalSource): Decimal;
        pow(value: DecimalSource, other: DecimalSource): Decimal;
        pow10(value: DecimalSource): Decimal;
        root(value: DecimalSource, other: DecimalSource): Decimal;
        factorial(value: DecimalSource, _other?: never): Decimal;
        gamma(value: DecimalSource, _other?: never): Decimal;
        lngamma(value: DecimalSource, _other?: never): Decimal;
        exp(value: DecimalSource): Decimal;
        sqr(value: DecimalSource): Decimal;
        sqrt(value: DecimalSource): Decimal;
        cube(value: DecimalSource): Decimal;
        cbrt(value: DecimalSource): Decimal;
        tetrate(value: DecimalSource, height?: number, payload?: DecimalSource): Decimal;
        iteratedexp(value: DecimalSource, height?: number, payload?: Decimal): Decimal;
        iteratedlog(value: DecimalSource, base?: DecimalSource, times?: number): Decimal;
        layeradd10(value: DecimalSource, diff: DecimalSource): Decimal;
        layeradd(value: DecimalSource, diff: number, base?: number): Decimal;
        slog(value: DecimalSource, base?: number): Decimal;
        lambertw(value: DecimalSource): Decimal;
        ssqrt(value: DecimalSource): Decimal;
        pentate(value: DecimalSource, height?: number, payload?: DecimalSource): Decimal;
        affordGeometricSeries(resourcesAvailable: DecimalSource, priceStart: DecimalSource, priceRatio: DecimalSource, currentOwned: DecimalSource): Decimal;
        sumGeometricSeries(numItems: DecimalSource, priceStart: DecimalSource, priceRatio: DecimalSource, currentOwned: DecimalSource): Decimal;
        affordArithmeticSeries(resourcesAvailable: DecimalSource, priceStart: DecimalSource, priceAdd: DecimalSource, currentOwned: DecimalSource): Decimal;
        sumArithmeticSeries(numItems: DecimalSource, priceStart: DecimalSource, priceAdd: DecimalSource, currentOwned: DecimalSource): Decimal;
        efficiencyOfPurchase(cost: DecimalSource, currentRpS: DecimalSource, deltaRpS: DecimalSource): Decimal;
        randomDecimalForTesting(maxLayers: number): Decimal;
        affordGeometricSeries_core(resourcesAvailable: Decimal, priceStart: Decimal, priceRatio: Decimal, currentOwned: DecimalSource): Decimal;
        sumGeometricSeries_core(numItems: DecimalSource, priceStart: Decimal, priceRatio: Decimal, currentOwned: DecimalSource): Decimal;
        affordArithmeticSeries_core(resourcesAvailable: Decimal, priceStart: Decimal, priceAdd: Decimal, currentOwned: Decimal): Decimal;
        sumArithmeticSeries_core(numItems: Decimal, priceStart: Decimal, priceAdd: Decimal, currentOwned: Decimal): Decimal;
        efficiencyOfPurchase_core(cost: Decimal, currentRpS: Decimal, deltaRpS: Decimal): Decimal;
        slog_critical(base: number, height: number): number;
        tetrate_critical(base: number, height: number): number;
        critical_section(base: number, height: number, grid: number[][]): number;
        smoothDamp(current: DecimalSource, target: DecimalSource, smoothing: DecimalSource, deltaTime: DecimalSource): Decimal;
        format(e: DecimalSource, acc?: number, max?: number): string;
    };
    type E = Decimal;
    /**
     * A collection of math-related utility functions and classes.
     */
    const eMath: {
        getFast: (object: any, id: string) => object | null;
        get: (object: any, id: string) => object | null;
        randomNumber: (min: number, max: number, round?: boolean) => number;
        /**
         * @deprecated dont ever use this
         */
        randomString64: (times: number, type: boolean) => string | number;
        randomString: (length: number) => string;
    };
    export { eMath, E, DecimalSource as ESource };
}
declare module "classes/boost" {
    import { E, ESource } from "eMath";
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
    /**
     * An object representing a boost.
     */
    interface boostsObject {
        /**
         * The ID of the boost.
         */
        id: string;
        /**
         * The name of the boost.
         */
        name: string;
        /**
         * An optional description of the boost.
         */
        desc?: string;
        /**
         * @deprecated
         * The type of the boost.
         */
        type?: "add" | "mul" | "pow" | "tetr" | "pent";
        /**
         * The function that calculates the value of the boost.
         * @param input The input value.
         * @returns The calculated value.
         */
        value: (input: E) => E;
        /**
         * The order at which the boost is applied. Lower orders are applied first.
         */
        order?: number;
        /**
         * The index of the boost.
         */
        index?: number;
    }
    type boostArrayObject = ({
        index: number;
        order: number;
    } & boostsObject);
    class boost {
        /**
         * An array of boost objects.
         * @type {boostArrayObject[]}
         */
        boostArray: boostArrayObject[];
        /**
         * The base effect value.
         * @type {E}
         */
        baseEffect: E;
        /**
         * Normalizes the given boosts object to a boost array object.
         * @param boosts - The boosts object to normalize.
         * @param index - The index to use for the boost array object.
         * @returns The normalized boost array object.
         */
        private static normalizeBoost;
        /**
         * Normalizes an array of boosts to a standardized format.
         * @param boosts - The array of boosts to normalize.
         * @returns An array of normalized boosts.
         */
        private static normalizeBoostArray;
        /**
         * Constructs a new boost manager.
         *
         * @constructor
         * @param {number} [baseEffect] - The base effect value to which boosts are applied.
         * @param {...boostsObject} boosts - An array of boost objects to initialize with.
         */
        constructor(baseEffect?: ESource, boosts?: boostsObject[]);
        /**
         * Gets a boost object by its ID.
         *
         * @param {string} id - The ID of the boost to retrieve.
         * @returns {boostsObject|null} The boost object if found, or null if not found.
         */
        bGet(id: string): boostArrayObject | null;
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
        bSet(id: string, name: string, desc: string, value: () => E, order?: number): void;
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
        calculate(base?: ESource): E;
    }
    export { boost };
}
declare module "classes/currency" {
    import { E, ESource } from "eMath";
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
}
declare module "classes/attribute" {
    import { E, ESource } from "eMath";
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
        initial: E;
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
         * @param {ESource} initial - The inital value of the attribute.
         */
        constructor(initial: ESource);
        /**
         * Updates the value of the attribute based on the provided effect function and initial value.
         *
         * @param {function} effect - The effect function to apply to the attribute.
         * @returns {E} The updated value of the attribute after applying the effect.
         */
        update(effect?: Function): E;
    }
    export { attribute };
}
declare module "classes/grid" {
    /**
     * Represents a grid cell with coordinates and properties.
     * @class
     */
    class gridCell {
        x: number;
        y: number;
        properties: any;
        /**
         * Initializes a new instance of the grid cell.
         * @constructor
         * @param {number} x - The x-coordinate.
         * @param {number} y - The y-coordinate.
         * @param {any} [props] - The properties to initialize with.
         */
        constructor(x: number, y: number, props?: object);
        /**
         * Sets the value of a property on the cell.
         * @param {string} name - The name of the property.
         * @param {any} value - The value to set.
         * @returns {any} - The set value.
         */
        setValue(name: string, value: any): any;
        /**
         * Gets the value of a property on the cell.
         * @param {string} name - The name of the property.
         * @returns {any} - The value of the property.
         */
        getValue(name: string): any;
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
         * @param {any} [starterProps] - The properties to initialize with.
         */
        constructor(x_size: number, y_size: number, starterProps?: object);
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
        /**
         * Calculates the distance between two points on the grid.
         * @param {number} x1 - The x-coordinate of the first point.
         * @param {number} y1 - The y-coordinate of the first point.
         * @param {number} x2 - The x-coordinate of the second point.
         * @param {number} y2 - The y-coordinate of the second point.
         * @returns {number} The distance between the two points.
         */
        static getDistance(x1: number, y1: number, x2: number, y2: number): number;
    }
    /**
     * Exports the gridCell and grid classes.
     * @module
     */
    export { gridCell, grid };
}
declare module "classes/utility/obb" {
    interface obbInit {
        name: string;
        value: any;
    }
    /**
     * @deprecated dont ever use this
     */
    class obb {
        [key: string]: any;
        constructor(array: obbInit[], methods: obbInit[]);
    }
    export { obb };
}
declare module "classes/utility/eArray" {
    class EArray extends Array {
        constructor(value?: any);
        random(qty: number): string;
    }
    export { EArray };
}
declare module "classes/utility/eObject" {
    class EObject extends Object {
        constructor(value?: object);
        static getFast(object: any, id: string): any;
        getFast(this: any, id: string): any;
        static get(object: any, id: string): any;
        get(this: any, id: string): any;
    }
    export { EObject };
}
declare module "index" {
    import { boost } from "classes/boost";
    import { currency, currencyStatic } from "classes/currency";
    import { attribute } from "classes/attribute";
    import { grid, gridCell } from "classes/grid";
    import { EString } from "classes/utility/eString";
    import { obb } from "classes/utility/obb";
    import { EArray } from "classes/utility/eArray";
    import { EObject } from "classes/utility/eObject";
    const eMath: {
        /**
         * @deprecated Use `import { E } from "emath.js"` instead.
         */
        E: {
            (x?: import("eMath").ESource | undefined): import("E/e").default;
            readonly dZero: import("E/e").default;
            readonly dOne: import("E/e").default;
            readonly dNegOne: import("E/e").default;
            readonly dTwo: import("E/e").default;
            readonly dTen: import("E/e").default;
            readonly dNaN: import("E/e").default;
            readonly dInf: import("E/e").default;
            readonly dNegInf: import("E/e").default;
            readonly dNumberMax: import("E/e").default;
            readonly dNumberMin: import("E/e").default;
            fromComponents(sign: number, layer: number, mag: number): import("E/e").default;
            fromComponents_noNormalize(sign: number, layer: number, mag: number): import("E/e").default;
            fromMantissaExponent(mantissa: number, exponent: number): import("E/e").default;
            /**
             * @deprecated Use `import { currency } from "emath.js"` instead.
             */
            fromMantissaExponent_noNormalize(mantissa: number, exponent: number): import("E/e").default;
            fromDecimal(value: import("E/e").default): import("E/e").default; /**
             * @deprecated Use `import { currencyStatic } from "emath.js"` instead.
             */
            fromNumber(value: number): import("E/e").default;
            fromString(value: string): import("E/e").default;
            fromValue(value: import("eMath").ESource): import("E/e").default;
            /**
             * @deprecated Use `import { attribute } from "emath.js"` instead.
             */
            fromValue_noAlloc(value: import("eMath").ESource): Readonly<import("E/e").default>;
            abs(value: import("eMath").ESource): import("E/e").default;
            neg(value: import("eMath").ESource): import("E/e").default;
            negate(value: import("eMath").ESource): import("E/e").default;
            negated(value: import("eMath").ESource): import("E/e").default;
            /**
             * @deprecated Use `import { gridCell } from "emath.js"` instead.
             */
            sign(value: import("eMath").ESource): number;
            sgn(value: import("eMath").ESource): number;
            round(value: import("eMath").ESource): import("E/e").default;
            /**
             * @deprecated Use `import { EString } from "emath.js"` instead.
             */
            floor(value: import("eMath").ESource): import("E/e").default;
            ceil(value: import("eMath").ESource): import("E/e").default;
            trunc(value: import("eMath").ESource): import("E/e").default; /**
             * @deprecated Use `import { EArray } from "emath.js"` instead.
             */
            add(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").default;
            plus(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").default;
            sub(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").default;
            subtract(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").default;
            minus(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").default;
            mul(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").default;
            multiply(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").default;
            times(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").default;
            div(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").default;
            divide(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").default;
            recip(value: import("eMath").ESource): import("E/e").default;
            reciprocal(value: import("eMath").ESource): import("E/e").default;
            reciprocate(value: import("eMath").ESource): import("E/e").default;
            cmp(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").CompareResult;
            cmpabs(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").CompareResult;
            compare(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").CompareResult;
            isNaN(value: import("eMath").ESource): boolean;
            isFinite(value: import("eMath").ESource): boolean;
            eq(value: import("eMath").ESource, other: import("eMath").ESource): boolean;
            equals(value: import("eMath").ESource, other: import("eMath").ESource): boolean;
            neq(value: import("eMath").ESource, other: import("eMath").ESource): boolean;
            notEquals(value: import("eMath").ESource, other: import("eMath").ESource): boolean;
            lt(value: import("eMath").ESource, other: import("eMath").ESource): boolean;
            lte(value: import("eMath").ESource, other: import("eMath").ESource): boolean;
            gt(value: import("eMath").ESource, other: import("eMath").ESource): boolean;
            gte(value: import("eMath").ESource, other: import("eMath").ESource): boolean;
            max(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").default;
            min(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").default;
            minabs(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").default;
            maxabs(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").default;
            clamp(value: import("eMath").ESource, min: import("eMath").ESource, max: import("eMath").ESource): import("E/e").default;
            clampMin(value: import("eMath").ESource, min: import("eMath").ESource): import("E/e").default;
            clampMax(value: import("eMath").ESource, max: import("eMath").ESource): import("E/e").default;
            cmp_tolerance(value: import("eMath").ESource, other: import("eMath").ESource, tolerance: number): import("E/e").CompareResult;
            compare_tolerance(value: import("eMath").ESource, other: import("eMath").ESource, tolerance: number): import("E/e").CompareResult;
            eq_tolerance(value: import("eMath").ESource, other: import("eMath").ESource, tolerance: number): boolean;
            equals_tolerance(value: import("eMath").ESource, other: import("eMath").ESource, tolerance: number): boolean;
            neq_tolerance(value: import("eMath").ESource, other: import("eMath").ESource, tolerance: number): boolean;
            notEquals_tolerance(value: import("eMath").ESource, other: import("eMath").ESource, tolerance: number): boolean;
            lt_tolerance(value: import("eMath").ESource, other: import("eMath").ESource, tolerance: number): boolean;
            lte_tolerance(value: import("eMath").ESource, other: import("eMath").ESource, tolerance: number): boolean;
            gt_tolerance(value: import("eMath").ESource, other: import("eMath").ESource, tolerance: number): boolean;
            gte_tolerance(value: import("eMath").ESource, other: import("eMath").ESource, tolerance: number): boolean;
            pLog10(value: import("eMath").ESource): import("E/e").default;
            absLog10(value: import("eMath").ESource): import("E/e").default;
            log10(value: import("eMath").ESource): import("E/e").default;
            log(value: import("eMath").ESource, base: import("eMath").ESource): import("E/e").default;
            log2(value: import("eMath").ESource): import("E/e").default;
            ln(value: import("eMath").ESource): import("E/e").default;
            logarithm(value: import("eMath").ESource, base: import("eMath").ESource): import("E/e").default;
            pow(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").default;
            pow10(value: import("eMath").ESource): import("E/e").default;
            root(value: import("eMath").ESource, other: import("eMath").ESource): import("E/e").default;
            factorial(value: import("eMath").ESource, _other?: undefined): import("E/e").default;
            gamma(value: import("eMath").ESource, _other?: undefined): import("E/e").default;
            lngamma(value: import("eMath").ESource, _other?: undefined): import("E/e").default;
            exp(value: import("eMath").ESource): import("E/e").default;
            sqr(value: import("eMath").ESource): import("E/e").default;
            sqrt(value: import("eMath").ESource): import("E/e").default;
            cube(value: import("eMath").ESource): import("E/e").default;
            cbrt(value: import("eMath").ESource): import("E/e").default;
            tetrate(value: import("eMath").ESource, height?: number | undefined, payload?: import("eMath").ESource | undefined): import("E/e").default;
            iteratedexp(value: import("eMath").ESource, height?: number | undefined, payload?: import("E/e").default | undefined): import("E/e").default;
            iteratedlog(value: import("eMath").ESource, base?: import("eMath").ESource | undefined, times?: number | undefined): import("E/e").default;
            layeradd10(value: import("eMath").ESource, diff: import("eMath").ESource): import("E/e").default;
            layeradd(value: import("eMath").ESource, diff: number, base?: number | undefined): import("E/e").default;
            slog(value: import("eMath").ESource, base?: number | undefined): import("E/e").default;
            lambertw(value: import("eMath").ESource): import("E/e").default;
            ssqrt(value: import("eMath").ESource): import("E/e").default;
            pentate(value: import("eMath").ESource, height?: number | undefined, payload?: import("eMath").ESource | undefined): import("E/e").default;
            affordGeometricSeries(resourcesAvailable: import("eMath").ESource, priceStart: import("eMath").ESource, priceRatio: import("eMath").ESource, currentOwned: import("eMath").ESource): import("E/e").default;
            sumGeometricSeries(numItems: import("eMath").ESource, priceStart: import("eMath").ESource, priceRatio: import("eMath").ESource, currentOwned: import("eMath").ESource): import("E/e").default;
            affordArithmeticSeries(resourcesAvailable: import("eMath").ESource, priceStart: import("eMath").ESource, priceAdd: import("eMath").ESource, currentOwned: import("eMath").ESource): import("E/e").default;
            sumArithmeticSeries(numItems: import("eMath").ESource, priceStart: import("eMath").ESource, priceAdd: import("eMath").ESource, currentOwned: import("eMath").ESource): import("E/e").default;
            efficiencyOfPurchase(cost: import("eMath").ESource, currentRpS: import("eMath").ESource, deltaRpS: import("eMath").ESource): import("E/e").default;
            randomDecimalForTesting(maxLayers: number): import("E/e").default;
            affordGeometricSeries_core(resourcesAvailable: import("E/e").default, priceStart: import("E/e").default, priceRatio: import("E/e").default, currentOwned: import("eMath").ESource): import("E/e").default;
            sumGeometricSeries_core(numItems: import("eMath").ESource, priceStart: import("E/e").default, priceRatio: import("E/e").default, currentOwned: import("eMath").ESource): import("E/e").default;
            affordArithmeticSeries_core(resourcesAvailable: import("E/e").default, priceStart: import("E/e").default, priceAdd: import("E/e").default, currentOwned: import("E/e").default): import("E/e").default;
            sumArithmeticSeries_core(numItems: import("E/e").default, priceStart: import("E/e").default, priceAdd: import("E/e").default, currentOwned: import("E/e").default): import("E/e").default;
            efficiencyOfPurchase_core(cost: import("E/e").default, currentRpS: import("E/e").default, deltaRpS: import("E/e").default): import("E/e").default;
            slog_critical(base: number, height: number): number;
            tetrate_critical(base: number, height: number): number;
            critical_section(base: number, height: number, grid: number[][]): number;
            smoothDamp(current: import("eMath").ESource, target: import("eMath").ESource, smoothing: import("eMath").ESource, deltaTime: import("eMath").ESource): import("E/e").default;
            format(e: import("eMath").ESource, acc?: number | undefined, max?: number | undefined): string;
        };
        classes: {
            /**
             * @deprecated Use `import { boost } from "emath.js"` instead.
             */
            boost: typeof boost;
            /**
             * @deprecated Use `import { currency } from "emath.js"` instead.
             */
            currency: typeof currency;
            /**
             * @deprecated Use `import { currencyStatic } from "emath.js"` instead.
             */
            currencyStatic: typeof currencyStatic;
            /**
             * @deprecated Use `import { attribute } from "emath.js"` instead.
             */
            attribute: typeof attribute;
            /**
             * @deprecated Use `import { grid } from "emath.js"` instead.
             */
            grid: typeof grid;
            /**
             * @deprecated Use `import { gridCell } from "emath.js"` instead.
             */
            gridCell: typeof gridCell;
            /**
             * @deprecated Use `import { EString } from "emath.js"` instead.
             */
            EString: typeof EString;
            /**
             * @deprecated Use `import { EArray } from "emath.js"` instead.
             */
            EArray: typeof EArray;
            /**
             * @deprecated Use `import { EObject } from "emath.js"` instead.
             */
            EObject: typeof EObject;
            /**
             * @deprecated Use `import { obb } from "emath.js"` instead.
             */
            obb: typeof obb;
        };
        getFast: (object: any, id: string) => object | null;
        get: (object: any, id: string) => object | null;
        randomNumber: (min: number, max: number, round?: boolean | undefined) => number;
        randomString64: (times: number, type: boolean) => string | number;
        randomString: (length: number) => string;
    };
    export default eMath;
    export { E } from "eMath";
    export { boost } from "classes/boost";
    export { currency, currencyStatic } from "classes/currency";
    export { attribute } from "classes/attribute";
    export { grid, gridCell } from "classes/grid";
    export { EString } from "classes/utility/eString";
    export { obb } from "classes/utility/obb";
    export { EArray } from "classes/utility/eArray";
    export { EObject } from "classes/utility/eObject";
}
