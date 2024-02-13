import { LRUCache } from "./lru-cache";
export type CompareResult = -1 | 0 | 1;
export type DecimalSource = Decimal | number | string;
/**
 * The value of the Decimal is sign * 10^10^10...^mag, with (layer) 10s. If the layer is not 0, then negative mag means it's the reciprocal of the corresponding number with positive mag.
 */
declare class Decimal {
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
    static formats: typeof formats;
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
    static mod(value: DecimalSource, other: DecimalSource): Decimal;
    static modulo(value: DecimalSource, other: DecimalSource): Decimal;
    static modular(value: DecimalSource, other: DecimalSource): Decimal;
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
    static tetrate(value: DecimalSource, height?: number, payload?: DecimalSource, linear?: boolean): Decimal;
    static iteratedexp(value: DecimalSource, height?: number, payload?: Decimal, linear?: boolean): Decimal;
    static iteratedlog(value: DecimalSource, base?: DecimalSource, times?: number, linear?: boolean): Decimal;
    static layeradd10(value: DecimalSource, diff: DecimalSource, linear?: boolean): Decimal;
    static layeradd(value: DecimalSource, diff: number, base?: number, linear?: boolean): Decimal;
    static slog(value: DecimalSource, base?: number, linear?: boolean): Decimal;
    static lambertw(value: DecimalSource): Decimal;
    static ssqrt(value: DecimalSource): Decimal;
    static linear_sroot(value: DecimalSource, height: number): Decimal;
    static pentate(value: DecimalSource, height?: number, payload?: DecimalSource, linear?: boolean): Decimal;
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
    tetrate(height?: number, payload?: DecimalSource, linear?: boolean): Decimal;
    iteratedexp(height?: number, payload?: Decimal, linear?: boolean): Decimal;
    iteratedlog(base?: DecimalSource, times?: number, linear?: boolean): Decimal;
    slog(base?: DecimalSource, iterations?: number, linear?: boolean): Decimal;
    slog_internal(base?: DecimalSource, linear?: boolean): Decimal;
    static slog_critical(base: number, height: number): number;
    static tetrate_critical(base: number, height: number): number;
    static critical_section(base: number, height: number, grid: number[][], linear?: boolean): number;
    layeradd10(diff: DecimalSource, linear?: boolean): Decimal;
    layeradd(diff: number, base: DecimalSource, linear?: boolean): Decimal;
    lambertw(): Decimal;
    ssqrt(): Decimal;
    linear_sroot(degree: number): Decimal;
    pentate(height?: number, payload?: DecimalSource, linear?: boolean): Decimal;
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
     * Creates a clone of the E instance.
     * @deprecated
     * @returns {Decimal} A EClone instance that is a clone of the original.
     */
    clone(): Decimal;
    /**
     * Creates a clone of the E instance. Helps with a webpack(?) bug
     * @alias Decimal.normalizeFromComponents
     * @param x - The number to clone
     * @returns - The cloned number
     */
    static clone(x: Decimal): Decimal;
    /**
     * Performs modular arithmetic on the DecimalClone instance.
     * @alias modular
     * @alias modulo
     * @param {DecimalSource} other - The number or DecimalClone instance to use for modular arithmetic.
     * @returns {Decimal} A EClone instance representing the result of the modular operation.
     */
    mod(value: DecimalSource): Decimal;
    modulo(value: DecimalSource): Decimal;
    modular(value: DecimalSource): Decimal;
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
    static softcap(value: DecimalSource, start: DecimalSource, power: number, mode: string): Decimal;
    /**
    * Scales a currency value using a specified scaling function.
    *
    * @param {DecimalSource} s - The value at which scaling starts.
    * @param {DecimalSource} p - The scaling factor.
    * @param {string} mode - The scaling mode. Use "pow" for power scaling or "exp" for exponential scaling.
    * @param {boolean} [rev=false] - Whether to reverse the scaling operation (unscaling).
    * @returns {Decimal} - The scaled currency value.
    */
    scale(s: DecimalSource, p: DecimalSource, mode: string | number, rev?: boolean): Decimal;
    static scale(value: DecimalSource, s: DecimalSource, p: DecimalSource, mode: string | number, rev?: boolean): Decimal;
    /**
     * Formats the E instance with a specified accuracy and maximum decimal places.
     * @param {number} [acc=2] - The desired accuracy (number of significant figures), defaults to `2`.
     * @param {number} [max=9] - The maximum number of decimal places to display, defaults to `9`.
     * @param {string} [type="mixed_sc"] - The type of format, defaults to `"mixed_sc"`.
     * @returns {string} A string representing the formatted E value.
     */
    format(acc?: number, max?: number, type?: FormatType): string;
    /**
     * Formats the E instance with a specified accuracy and maximum decimal places.
     * @param {DecimalSource} e - The E instance to format.
     * @param {number} [acc=2] - The desired accuracy (number of significant figures), defaults to `2`.
     * @param {number} [max=9] - The maximum number of decimal places to display, defaults to `9`.
     * @param {string} [type="mixed_sc"] - The type of format, defaults to `"mixed_sc"`.
     * @returns {string} A string representing the formatted E value.
     */
    static format(e: DecimalSource, acc?: number, max?: number, type?: FormatType): string;
    /**
     * Formats the E instance in standard leter notation with a specified accuracy and maximum decimal places.
     * @param {number} [acc=2] - The desired accuracy (number of significant figures).
     * @param {number} [max=9] - The maximum number of decimal places to display.
     * @param {string} [type="st"] - The type of format (default standard)
     * @returns {string} A string representing the formatted E value.
     */
    formatST(acc?: number, max?: number, type?: FormatType): string;
    static formatST(value: DecimalSource, acc?: number, max?: number, type?: FormatType): string;
    /**
     * Formats the gain rate using the E instance.
     * @param {DecimalSource} gain - The gain value to compare
     * @param {boolean} [mass=false] - Indicates whether the gain represents a mass value.
     * @param {string} [type="mixed_sc"] - The type of format (default mixed scientific)
     * @returns {string} A string representing the formatted gain
     *
     * @example
     * const currency = new Decimal(100);
     * const currencyGain = new Decimal(12);
     * const formatted = currency.formats.formatGain(currencyGain);
     * console.log(formatted); // should return "(+12/sec)"
     */
    formatGain(gain: DecimalSource, type?: FormatType): string;
    static formatGain(value: DecimalSource, gain: DecimalSource, type?: FormatType): string;
    /**
     * Converts the E instance to a Roman numeral representation.
     * @param {number|Decimal} [max=5000] - Max before it returns the original
     * @returns {string|Decimal} A string representing the Roman numeral equivalent of the E value,
     * or the original E instance if it is greater than or equal to 5000 or less than 1.
     */
    toRoman(max?: DecimalSource): string | Decimal;
    static toRoman(value: DecimalSource, max: DecimalSource): string | Decimal;
}
/** A list of names for the standard notation */
declare const ST_NAMES: string[][][];
type FormatType = "st" | "sc" | "scientific" | "omega" | "omega_short" | "elemental" | "old_sc" | "eng" | "mixed_sc" | "layer" | "standard" | "inf";
declare const FormatTypeList: FormatType[];
/** A list of formats */
declare const FORMATS: {
    /** Omega format */
    omega: {
        config: {
            greek: string;
            infinity: string;
        };
        /**
         * Format the value into omega format
         * @param value - The value to format
         * @returns - The formatted value
         */
        format(value: DecimalSource): string;
    };
    /** Short omega format */
    omega_short: {
        config: {
            greek: string;
            infinity: string;
        };
        /**
         * Format the value into short omega format
         * @param value - The value to format
         * @returns - The formatted value
         */
        format(value: DecimalSource): string;
    };
    elemental: {
        config: {
            /** The list of elements */
            element_lists: string[][];
        };
        getOffset(group: number): number;
        getAbbreviation(group: number, progress: number): string;
        beyondOg(x: number): string;
        abbreviationLength(group: number): number;
        getAbbreviationAndValue(x: Decimal): (string | Decimal)[];
        formatElementalPart(abbreviation: string, n: Decimal): string;
        format(value: Decimal, acc: number): string;
    };
    /** Old scientific format */
    old_sc: {
        /**
         * Format the value into old scientific format
         * @param ex - The value to format
         * @param acc - The accuracy
         * @returns - The formatted value
         */
        format(ex: DecimalSource, acc: number): string;
    };
    /** Engineering format */
    eng: {
        /**
         * Format the value into engineering format
         * @param ex - The value to format
         * @param acc - The accuracy
         * @returns - The formatted value
         * @example
         * console.log(FORMATS.eng.format(1e20, 2)); // 100.00e18
         */
        format(ex: DecimalSource, acc: number): string;
    };
    mixed_sc: {
        /**
         * Format the value into mixed scientific format (standard or scientific depending on the value)
         * @param ex - The value to format
         * @param acc - The accuracy
         * @param max - The maximum value
         * @returns - The formatted value
         * @example
         * console.log(FORMATS.mixed_sc.format(1e20, 2, 9)); // 100.00 Qt
         * console.log(FORMATS.mixed_sc.format(1e400, 2, 303)); // 1.00e400
         */
        format(ex: DecimalSource, acc: number, max: number): string;
    };
    layer: {
        layers: string[];
        format(ex: DecimalSource, acc: number, max: number): string;
    };
    /** Standard (letter abbv) format */
    standard: {
        /**
         * Gets the letter abbreviation for a number (e.g. 1 -> K) (0-1e3000)
         * @param x - The number to get the letter abbreviation for
         * @returns - The letter abbreviation
         */
        tier1(x: number): string;
        /**
         * Gets the tier 2 letter abbreviation for a number (e.g. 1 -> Mi) (1e3000+)
         * @param x - The number to get the letter abbreviation for
         * @returns - The letter abbreviation
         */
        tier2(x: number): string;
    };
    inf: {
        format(ex: DecimalSource, acc: number, max: number): string;
    };
};
/**
 * Convert a number to a subscript
 * @param value - The value to convert
 * @returns - The value in subscript
 */
declare function toSubscript(value: number): string;
/**
 * Convert a number to a superscript
 * @param value - The value to convert
 * @returns - The value in superscript
 */
declare function toSuperscript(value: number): string;
/**
 * Format the value into standard (letter abbv) format
 * @deprecated Use {@link format} instead (with the type "st")
 */
declare function formatST(ex: DecimalSource, acc?: number, max?: number, type?: "sc" | "st" | FormatType): string;
/**
 * Format the value into a specific format type
 * @param ex - The value to format
 * @param acc - The desired accuracy (number of significant figures), defaults to `2`.
 * @param max - The maximum number of decimal places to display, defaults to `9`.
 * @param type - The type of format to use (default "mixed_sc")
 * @returns - The formatted value
 */
declare function format(ex: DecimalSource, acc?: number, max?: number, type?: FormatType): string;
/**
 * Format the gain
 * @param amt - The amount
 * @param gain - The gain
 * @returns - The formatted gain
 * @example
 * console.log(formatGain(1e20, 1e10)); // (+1.00e10/sec)
 * console.log(formatGain(1e200, 1e210)); // (+10.00 OoMs/sec)
 */
declare function formatGain(amt: DecimalSource, gain: DecimalSource, type?: FormatType): string;
/**
 * Format the time
 * @param ex - The value to format
 * @param acc - The accuracy
 * @param type - The type
 * @returns - The formatted time
 */
declare function formatTime(ex: DecimalSource, acc?: number, type?: string): string;
declare function formatReduction(ex: DecimalSource): string;
declare function formatPercent(ex: DecimalSource): string;
declare function formatMult(ex: DecimalSource, acc?: number): string;
declare function expMult(a: DecimalSource, b: DecimalSource, base?: number): Decimal;
/**
 * Converts a number to a metric representation based on the specified type.
 * @param num - The number to convert.
 * @param type - The type of metric representation to return.
 *   - 0: Returns the number with the metric abbreviation (e.g., "1.23 K").
 *   - 1: Returns only the metric abbreviation (e.g., "K").
 *   - 2: Returns the number divided by the metric value (e.g., "1.23").
 *   - 3: Returns the alternative name of the metric abbreviation (e.g., "Kilo").
 * @returns The metric representation of the number. If the number is greater than the highest metric value, the function returns the highest metric abbreviation.
 * @example
 * metric(1234, 0); // Returns "1.23 K"
 * metric(1234, 1); // Returns "K"
 * metric(1234, 2); // Returns "1.23"
 * metric(1234, 3); // Returns "Kilo"
 */
declare function metric(num: DecimalSource, type: number): string;
/**
 * Format the value into eV (includes metric prefixes)
 * @param num - The value to format
 * @param c2 - Whether to include /c^2
 * @returns The formatted value
 */
declare function ev(num: DecimalSource, c2?: boolean): string;
declare const formats: {
    toSubscript: typeof toSubscript;
    toSuperscript: typeof toSuperscript;
    formatST: typeof formatST;
    format: typeof format;
    formatGain: typeof formatGain;
    formatTime: typeof formatTime;
    formatReduction: typeof formatReduction;
    formatPercent: typeof formatPercent;
    formatMult: typeof formatMult;
    expMult: typeof expMult;
    metric: typeof metric;
    ev: typeof ev;
    /** Omega format */
    omega: {
        config: {
            greek: string;
            infinity: string;
        };
        /**
         * Format the value into omega format
         * @param value - The value to format
         * @returns - The formatted value
         */
        format(value: DecimalSource): string;
    };
    /** Short omega format */
    omega_short: {
        config: {
            greek: string;
            infinity: string;
        };
        /**
         * Format the value into short omega format
         * @param value - The value to format
         * @returns - The formatted value
         */
        format(value: DecimalSource): string;
    };
    elemental: {
        config: {
            /** The list of elements */
            element_lists: string[][];
        };
        getOffset(group: number): number;
        getAbbreviation(group: number, progress: number): string;
        beyondOg(x: number): string;
        abbreviationLength(group: number): number;
        getAbbreviationAndValue(x: Decimal): (string | Decimal)[];
        formatElementalPart(abbreviation: string, n: Decimal): string;
        format(value: Decimal, acc: number): string;
    };
    /** Old scientific format */
    old_sc: {
        /**
         * Format the value into old scientific format
         * @param ex - The value to format
         * @param acc - The accuracy
         * @returns - The formatted value
         */
        format(ex: DecimalSource, acc: number): string;
    };
    /** Engineering format */
    eng: {
        /**
         * Format the value into engineering format
         * @param ex - The value to format
         * @param acc - The accuracy
         * @returns - The formatted value
         * @example
         * console.log(FORMATS.eng.format(1e20, 2)); // 100.00e18
         */
        format(ex: DecimalSource, acc: number): string;
    };
    mixed_sc: {
        /**
         * Format the value into mixed scientific format (standard or scientific depending on the value)
         * @param ex - The value to format
         * @param acc - The accuracy
         * @param max - The maximum value
         * @returns - The formatted value
         * @example
         * console.log(FORMATS.mixed_sc.format(1e20, 2, 9)); // 100.00 Qt
         * console.log(FORMATS.mixed_sc.format(1e400, 2, 303)); // 1.00e400
         */
        format(ex: DecimalSource, acc: number, max: number): string;
    };
    layer: {
        layers: string[];
        format(ex: DecimalSource, acc: number, max: number): string;
    };
    /** Standard (letter abbv) format */
    standard: {
        /**
         * Gets the letter abbreviation for a number (e.g. 1 -> K) (0-1e3000)
         * @param x - The number to get the letter abbreviation for
         * @returns - The letter abbreviation
         */
        tier1(x: number): string;
        /**
         * Gets the tier 2 letter abbreviation for a number (e.g. 1 -> Mi) (1e3000+)
         * @param x - The number to get the letter abbreviation for
         * @returns - The letter abbreviation
         */
        tier2(x: number): string;
    };
    inf: {
        format(ex: DecimalSource, acc: number, max: number): string;
    };
};
export { formats, FORMATS, ST_NAMES, FormatType, FormatTypeList };
export { Decimal };
