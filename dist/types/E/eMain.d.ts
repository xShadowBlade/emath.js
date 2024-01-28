import Decimal, { DecimalSource, CompareResult } from "./e";
declare const E: {
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
    /**
     * Converts a DecimalSource to a Decimal, without constructing a new Decimal
     * if the provided value is already a Decimal.
     *
     * As the return value could be the provided value itself, this function
     * returns a read-only Decimal to prevent accidental mutations of the value.
     * Use `new Decimal(value)` to explicitly create a writeable copy if mutation
     * is required.
     */
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
    mod(value: DecimalSource, other: DecimalSource): Decimal;
    modulo(value: DecimalSource, other: DecimalSource): Decimal;
    modular(value: DecimalSource, other: DecimalSource): Decimal;
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
    tetrate(value: DecimalSource, height?: number, payload?: DecimalSource, linear?: boolean): Decimal;
    iteratedexp(value: DecimalSource, height?: number, payload?: Decimal, linear?: boolean): Decimal;
    iteratedlog(value: DecimalSource, base?: DecimalSource, times?: number, linear?: boolean): Decimal;
    layeradd10(value: DecimalSource, diff: DecimalSource, linear?: boolean): Decimal;
    layeradd(value: DecimalSource, diff: number, base?: number, linear?: boolean): Decimal;
    slog(value: DecimalSource, base?: number, linear?: boolean): Decimal;
    lambertw(value: DecimalSource): Decimal;
    ssqrt(value: DecimalSource): Decimal;
    linear_sroot(value: DecimalSource, height: number): Decimal;
    pentate(value: DecimalSource, height?: number, payload?: DecimalSource, linear?: boolean): Decimal;
    /**
     * If you're willing to spend 'resourcesAvailable' and want to buy something
     * with exponentially increasing cost each purchase (start at priceStart,
     * multiply by priceRatio, already own currentOwned), how much of it can you buy?
     * Adapted from Trimps source code.
     */
    affordGeometricSeries(resourcesAvailable: DecimalSource, priceStart: DecimalSource, priceRatio: DecimalSource, currentOwned: DecimalSource): Decimal;
    /**
     * How much resource would it cost to buy (numItems) items if you already have currentOwned,
     * the initial price is priceStart and it multiplies by priceRatio each purchase?
     */
    sumGeometricSeries(numItems: DecimalSource, priceStart: DecimalSource, priceRatio: DecimalSource, currentOwned: DecimalSource): Decimal;
    /**
     * If you're willing to spend 'resourcesAvailable' and want to buy something with additively
     * increasing cost each purchase (start at priceStart, add by priceAdd, already own currentOwned),
     * how much of it can you buy?
     */
    affordArithmeticSeries(resourcesAvailable: DecimalSource, priceStart: DecimalSource, priceAdd: DecimalSource, currentOwned: DecimalSource): Decimal;
    /**
     * How much resource would it cost to buy (numItems) items if you already have currentOwned,
     * the initial price is priceStart and it adds priceAdd each purchase?
     * Adapted from http://www.mathwords.com/a/arithmetic_series.htm
     */
    sumArithmeticSeries(numItems: DecimalSource, priceStart: DecimalSource, priceAdd: DecimalSource, currentOwned: DecimalSource): Decimal;
    /**
     * When comparing two purchases that cost (resource) and increase your resource/sec by (deltaRpS),
     * the lowest efficiency score is the better one to purchase.
     * From Frozen Cookies:
     * http://cookieclicker.wikia.com/wiki/Frozen_Cookies_(JavaScript_Add-on)#Efficiency.3F_What.27s_that.3F
     */
    efficiencyOfPurchase(cost: DecimalSource, currentRpS: DecimalSource, deltaRpS: DecimalSource): Decimal;
    randomDecimalForTesting(maxLayers: number): Decimal;
    affordGeometricSeries_core(resourcesAvailable: Decimal, priceStart: Decimal, priceRatio: Decimal, currentOwned: DecimalSource): Decimal;
    sumGeometricSeries_core(numItems: DecimalSource, priceStart: Decimal, priceRatio: Decimal, currentOwned: DecimalSource): Decimal;
    affordArithmeticSeries_core(resourcesAvailable: Decimal, priceStart: Decimal, priceAdd: Decimal, currentOwned: Decimal): Decimal;
    sumArithmeticSeries_core(numItems: Decimal, priceStart: Decimal, priceAdd: Decimal, currentOwned: Decimal): Decimal;
    efficiencyOfPurchase_core(cost: Decimal, currentRpS: Decimal, deltaRpS: Decimal): Decimal;
    slog_critical(base: number, height: number): number;
    tetrate_critical(base: number, height: number): number;
    critical_section(base: number, height: number, grid: number[][], linear?: boolean): number;
    smoothDamp(current: DecimalSource, target: DecimalSource, smoothing: DecimalSource, deltaTime: DecimalSource): Decimal;
    format(e: DecimalSource, acc?: number, max?: number): string;
    softcap(value: DecimalSource, start: DecimalSource, power: number, mode: string): Decimal;
    scale(value: DecimalSource, s: DecimalSource, p: DecimalSource, mode: string | number, rev?: boolean): Decimal;
    formatST(value: DecimalSource, acc?: number, max?: number, type?: string): string;
    formatGain(value: DecimalSource, gain: DecimalSource): string;
    toRoman(value: DecimalSource, max: DecimalSource): string | Decimal;
    /**
     * Normalizes the Decimal instance. Helps with a webpack bug .-.
     * @param {Decimal} x - The Decimal instance to normalize
     * @returns The normalized decimal
     */
    normalizeFromComponents(x: Decimal): Decimal;
    /**
     * Creates a clone of the E instance. Helps with a webpack(?) bug
     * @alias Decimal.normalizeFromComponents
     * @param x - The number to clone
     * @returns - The cloned number
     */
    clone(x: Decimal): Decimal;
};
type E = Decimal;
export { E, DecimalSource as ESource };
