/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file idk use black magic and type gymnastics to make this work or something
 */
import Decimal, { DecimalSource, CompareResult } from "break_eternity.js";

// let EDecimal = Decimal as (typeof Decimal & typeof DecimalClone);
let EDecimal = Decimal as unknown as (DecimalClassStatic & typeof DecimalClone);
// type EDecimal = InstanceType<typeof Decimal> & InstanceType<typeof DecimalClone>;
type EDecimal = DecimalClassInstance;
type ESource = DecimalSource | (InstanceType<typeof DecimalClone>);

type DecimalClassStatic = typeof DecimalClone & {
    readonly dZero: EDecimal;
    readonly dOne: EDecimal;
    readonly dNegOne: EDecimal;
    readonly dTwo: EDecimal;
    readonly dTen: EDecimal;
    readonly dNaN: EDecimal;
    readonly dInf: EDecimal;
    readonly dNegInf: EDecimal;
    readonly dNumberMax: EDecimal;
    readonly dNumberMin: EDecimal;
    // private fromStringCache;
    // sign: number;
    // mag: number;
    // layer: number;
    // constructor(value?: ESource);
    new (value?: ESource): EDecimal;
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
    /**
     * Turns the given components into a valid Decimal.
     */
    fromComponents(sign: number, layer: number, mag: number): EDecimal;
    /**
     * Turns the given components into a Decimal, but not necessarily a valid one (it's only valid if the components would already create a valid Decimal without normalization). Users of this library should not use this function.
     */
    fromComponents_noNormalize(sign: number, layer: number, mag: number): EDecimal;
    /**
     * Turns the mantissa and exponent into a valid Decimal with value mantissa * 10^exponent.
     */
    fromMantissaExponent(mantissa: number, exponent: number): EDecimal;
    /**
     * Turns the mantissa and exponent into a Decimal, but not necessarily a valid one. Users of this library should not use this function.
     */
    fromMantissaExponent_noNormalize(mantissa: number, exponent: number): EDecimal;
    /**
     * Creates a deep copy of the provided value.
     */
    fromDecimal(value: EDecimal): EDecimal;
    /**
     * Converts a floating-point number into a Decimal.
     */
    fromNumber(value: number): EDecimal;
    /**
     * Converts a string into a Decimal.
     *
     * If linearhyper4 is true, then strings like "10^^8.5" will use the linear approximation of tetration even for bases <= 10.
     */
    fromString(value: string, linearhyper4?: boolean): EDecimal;
    /**
     * The function used by new Decimal() to create a new Decimal. Accepts a ESource: uses fromNumber if given a number, uses fromString if given a string, and uses fromDecimal if given a Decimal.
     */
    fromValue(value: ESource): EDecimal;
    /**
     * Converts a ESource to a Decimal, without constructing a new Decimal
     * if the provided value is already a Decimal.
     *
     * As the return value could be the provided value itself, this function
     * returns a read-only Decimal to prevent accidental mutations of the value.
     * Use `new Decimal(value)` to explicitly create a writeable copy if mutation
     * is required.
     */
    fromValue_noAlloc(value: ESource): Readonly<Decimal>;
    /**
     * Absolute value function: returns 'value' if 'value' >= 0, returns the negative of 'value' if 'value' < 0.
     */
    abs(value: ESource): EDecimal;
    /**
     * Returns the negative of the given value.
     */
    neg(value: ESource): EDecimal;
    /**
     * Returns the negative of the given value.
     */
    negate(value: ESource): EDecimal;
    /**
     * Returns the negative of the given value.
     */
    negated(value: ESource): EDecimal;
    /**
     * Returns the sign of the given value.
     */
    sign(value: ESource): number;
    /**
     * Returns the sign of the given value.
     */
    sgn(value: ESource): number;
    /**
     * Rounds the value to the nearest integer.
     */
    round(value: ESource): EDecimal;
    /**
     * "Rounds" the value to the nearest integer that's less than or equal to it.
     */
    floor(value: ESource): EDecimal;
    /**
     * "Rounds" the value to the nearest integer that's greater than or equal to it.
     */
    ceil(value: ESource): EDecimal;
    /**
     * Extracts the integer part of the Decimal and returns it. Behaves like floor on positive numbers, but behaves like ceiling on negative numbers.
     */
    trunc(value: ESource): EDecimal;
    /**
     * Addition: returns the sum of the two Decimals.
     */
    add(value: ESource, other: ESource): EDecimal;
    /**
     * Addition: returns the sum of the two Decimals.
     */
    plus(value: ESource, other: ESource): EDecimal;
    /**
     * Subtraction: returns the difference between 'value' and 'other'.
     */
    sub(value: ESource, other: ESource): EDecimal;
    /**
     * Subtraction: returns the difference between 'value' and 'other'.
     */
    subtract(value: ESource, other: ESource): EDecimal;
    /**
     * Subtraction: returns the difference between 'value' and 'other'.
     */
    minus(value: ESource, other: ESource): EDecimal;
    /**
     * Multiplication: returns the product of the two Decimals.
     */
    mul(value: ESource, other: ESource): EDecimal;
    /**
     * Multiplication: returns the product of the two Decimals.
     */
    multiply(value: ESource, other: ESource): EDecimal;
    /**
     * Multiplication: returns the product of the two Decimals.
     */
    times(value: ESource, other: ESource): EDecimal;
    /**
     * Division: returns the quotient of 'value' and 'other'.
     */
    div(value: ESource, other: ESource): EDecimal;
    /**
     * Division: returns the quotient of 'value' and 'other'.
     */
    divide(value: ESource, other: ESource): EDecimal;
    /**
     * Returns the reciprocal (1 / X) of the given value.
     */
    recip(value: ESource): EDecimal;
    /**
     * Returns the reciprocal (1 / X) of the given value.
     */
    reciprocal(value: ESource): EDecimal;
    /**
     * Returns the reciprocal (1 / X) of the given value.
     */
    reciprocate(value: ESource): EDecimal;
    /**
     * Returns the remainder of 'value' divided by 'other': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
    mod(value: ESource, other: ESource): EDecimal;
    /**
     * Returns the remainder of 'value' divided by 'other': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
    modulo(value: ESource, other: ESource): EDecimal;
    /**
     * Returns the remainder of 'value' divided by 'other': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
    modular(value: ESource, other: ESource): EDecimal;
    /**
     * Returns 1 if 'value' > 'other', returns -1 if 'value' < 'other', returns 0 if 'value' == 'other'.
     */
    cmp(value: ESource, other: ESource): CompareResult;
    /**
     * Compares the absolute values of this and value.
     * Returns 1 if |'value'| > |'other'|, returns -1 if |'value'| < |'other'|, returns 0 if |'value'| == |'other'|.
     */
    cmpabs(value: ESource, other: ESource): CompareResult;
    /**
     * Returns 1 if 'value' > 'other', returns -1 if 'value' < 'other', returns 0 if 'value' == 'other'.
     */
    compare(value: ESource, other: ESource): CompareResult;
    /**
     * Returns true if the given value is an NaN value.
     */
    isNaN(value: ESource): boolean;
    /**
     * Returns true if the given value is finite (by Decimal standards, not by floating point standards - a humongous Decimal like 10^^10^100 is still finite!)
     */
    isFinite(value: ESource): boolean;
    /**
     * The Decimal equivalent of ==. Returns true if 'value' and 'other' have equal values.
     */
    eq(value: ESource, other: ESource): boolean;
    /**
     * Returns true if 'value' and 'other' have equal values.
     */
    equals(value: ESource, other: ESource): boolean;
    /**
     * The Decimal equivalent of !=. Returns true if 'value' and 'other' do not have equal values.
     */
    neq(value: ESource, other: ESource): boolean;
    /**
     * Returns true if 'value' and 'other' do not have equal values.
     */
    notEquals(value: ESource, other: ESource): boolean;
    /**
     * The Decimal equivalent of <. Returns true if 'value' is less than 'other'.
     */
    lt(value: ESource, other: ESource): boolean;
    /**
     * The Decimal equivalent of <=. Returns true if 'value' is less than or equal to 'other'.
     */
    lte(value: ESource, other: ESource): boolean;
    /**
     * The Decimal equivalent of >. Returns true if 'value' is greater than 'other'.
     */
    gt(value: ESource, other: ESource): boolean;
    /**
     * The Decimal equivalent of >=. Returns true if 'value' is greater than or equal to 'other'.
     */
    gte(value: ESource, other: ESource): boolean;
    /**
     * Returns whichever of 'value' and 'other' is higher.
     */
    max(value: ESource, other: ESource): EDecimal;
    /**
     * Returns whichever of 'value' and 'other' is lower.
     */
    min(value: ESource, other: ESource): EDecimal;
    /**
     * Returns whichever of 'value' and 'other' has a larger absolute value.
     */
    minabs(value: ESource, other: ESource): EDecimal;
    /**
     * Returns whichever of 'value' and 'other' has a smaller absolute value.
     */
    maxabs(value: ESource, other: ESource): EDecimal;
    /**
     * A combination of minimum and maximum: the value returned by clamp is normally 'value', but it won't go below 'min' and it won't go above 'max'.
     * Therefore, if 'value' < 'min', then 'min' is returned, and if 'value' > 'max', then 'max' is returned.
     */
    clamp(value: ESource, min: ESource, max: ESource): EDecimal;
    /**
     * Returns 'value', unless 'value' is less than 'min', in which case 'min' is returned.
     */
    clampMin(value: ESource, min: ESource): EDecimal;
    /**
     * Returns 'value', unless 'value' is greater than 'max', in which case 'max' is returned.
     */
    clampMax(value: ESource, max: ESource): EDecimal;
    /**
     * Returns 1 if 'value' is greater than 'other', returns -1 if 'value' is less than 'other', returns 0 if 'value' is equal to 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    cmp_tolerance(value: ESource, other: ESource, tolerance: number): CompareResult;
    /**
     * Returns 1 if 'value' is greater than 'other', returns -1 if 'value' is less than 'other', returns 0 if 'value' is equal to 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    compare_tolerance(value: ESource, other: ESource, tolerance: number): CompareResult;
    /**
     * Tests whether two Decimals are approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    eq_tolerance(value: ESource, other: ESource, tolerance: number): boolean;
    /**
     * Tests whether two Decimals are approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    equals_tolerance(value: ESource, other: ESource, tolerance: number): boolean;
    /**
     * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    neq_tolerance(value: ESource, other: ESource, tolerance: number): boolean;
    /**
     * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    notEquals_tolerance(value: ESource, other: ESource, tolerance: number): boolean;
    /**
     * Returns true if 'value' is less than 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    lt_tolerance(value: ESource, other: ESource, tolerance: number): boolean;
    /**
     * Returns true if 'value' is less than or equal to 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    lte_tolerance(value: ESource, other: ESource, tolerance: number): boolean;
    /**
     * Returns true if 'value' is greater than 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    gt_tolerance(value: ESource, other: ESource, tolerance: number): boolean;
    /**
     * Returns true if 'value' is greater than or equal to 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    gte_tolerance(value: ESource, other: ESource, tolerance: number): boolean;
    /**
     * "Positive log10": Returns the base-10 logarithm of nonnegative Decimals, but returns 0 for negative Decimals.
     */
    pLog10(value: ESource): EDecimal;
    /**
     * Returns the base-10 logarithm of abs('value').
     */
    absLog10(value: ESource): EDecimal;
    /**
     * Base-10 logarithm: returns the Decimal X such that 10^X = 'value'.
     * For numbers above layer 0, this is equivalent to subtracting 1 from layer and normalizing.
     */
    log10(value: ESource): EDecimal;
    /**
     * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'value'.
     */
    log(value: ESource, base: ESource): EDecimal;
    /**
     * Base-2 logarithm: returns the Decimal X such that 2^X = 'value'.
     */
    log2(value: ESource): EDecimal;
    /**
     * Base-e logarithm, also known as the "natural" logarithm: returns the Decimal X such that e^X = 'value'.
     */
    ln(value: ESource): EDecimal;
    /**
     * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'value'.
     */
    logarithm(value: ESource, base: ESource): EDecimal;
    /**
     * Exponentiation: Returns the result of 'value' ^ 'other' (often written as 'value' ** 'other' in programming languages).
     */
    pow(value: ESource, other: ESource): EDecimal;
    /**
     * Raises 10 to the power of 'value', i.e. (10^'value'). For positive numbers above 1, this is equivalent to adding 1 to the value's layer and normalizing.
     */
    pow10(value: ESource): EDecimal;
    /**
     * Roots are one of the inverses of exponentiation: this function finds the Decimal X such that X ^ 'other' = 'value'.
     * Equivalent to 'value' ^ (1 / 'other'), which is written here as value.pow(other.recip()).
     */
    root(value: ESource, other: ESource): EDecimal;
    /**
     * For positive integers, X factorial (written as X!) equals X * (X - 1) * (X - 2) *... * 3 * 2 * 1. 0! equals 1.
     * This can be extended to real numbers (except for negative integers) via the gamma function, which is what this function does.
     */
    factorial(value: ESource, _other?: never): EDecimal;
    /**
     * The gamma function extends the idea of factorials to non-whole numbers using some calculus.
     * Gamma(x) is defined as the integral of t^(x-1) * e^-t dt from t = 0 to t = infinity,
     * and gamma(x) = (x - 1)! for nonnegative integer x, so the factorial for non-whole numbers is defined using the gamma function.
     */
    gamma(value: ESource, _other?: never): EDecimal;
    /**
     * Returns the natural (base-e) logarithm of Gamma('value').
     */
    lngamma(value: ESource, _other?: never): EDecimal;
    /**
     * Base-e exponentiation: returns e^'value'.
     */
    exp(value: ESource): EDecimal;
    /**
     * Squaring a number means multiplying it by itself, a.k.a. raising it to the second power.
     */
    sqr(value: ESource): EDecimal;
    /**
     * Square root: finds the Decimal X such that X * X, a.k.a X^2, equals 'value'. Equivalent to X^(1/2).
     */
    sqrt(value: ESource): EDecimal;
    /**
     * Cubing a number means raising it to the third power.
     */
    cube(value: ESource): EDecimal;
    /**
     * Cube root: finds the Decimal X such that X^3 equals 'value'. Equivalent to X^(1/3).
     */
    cbrt(value: ESource): EDecimal;
    /**
     *
     * Tetration: The result of exponentiating 'value' to 'value' 'height' times in a row.  https://en.wikipedia.org/wiki/Tetration
     *
     * If payload != 1, then this is 'iterated exponentiation', the result of exping 'payload' to base 'value' 'height' times. https://andydude.github.io/tetration/archives/tetration2/ident.html
     *
     * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
    tetrate(value: ESource, height?: number, payload?: ESource, linear?: boolean): EDecimal;
    /**
     * Iterated exponentiation, the result of exping 'payload' to base 'value' 'height' times. https://andydude.github.io/tetration/archives/tetration2/ident.html
     *
     * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     *
     * Identical to tetrate.
     */
    iteratedexp(value: ESource, height?: number, payload?: EDecimal, linear?: boolean): EDecimal;
    /**
     * iterated log/repeated log: The result of applying log(base) 'times' times in a row. Approximately equal to subtracting 'times' from the number's slog representation. Equivalent to tetrating to a negative height.
     *
     * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
    iteratedlog(value: ESource, base?: ESource, times?: number, linear?: boolean): EDecimal;
    /**
     * Adds/removes layers from a Decimal, even fractional layers (e.g. its slog10 representation). Very similar to tetrate base 10 and iterated log base 10.
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
    layeradd10(value: ESource, diff: ESource, linear?: boolean): EDecimal;
    /**
     * layeradd: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 'base' and iterated log base 'base'.
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
    layeradd(value: ESource, diff: number, base?: ESource, linear?: boolean): EDecimal;
    /**
     * Super-logarithm, one of tetration's inverses, tells you what size power tower you'd have to tetrate 'base' to to get 'value'. https://en.wikipedia.org/wiki/Super-logarithm
     *
     * By definition, will never be higher than 1.8e308 in break_eternity.js, since a power tower 1.8e308 numbers tall is the largest representable number.
     *
     * Accepts a number of iterations (default is 100), and use binary search to, after making an initial guess, hone in on the true value, assuming tetration as the ground truth.
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
    slog(value: ESource, base?: ESource, linear?: boolean): EDecimal;
    /**
     * The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
     * https://en.wikipedia.org/wiki/Lambert_W_function
     */
    lambertw(value: ESource): EDecimal;
    /**
     * The super square-root function - what number, tetrated to height 2, equals 'value'? https://en.wikipedia.org/wiki/Tetration#Super-root
     */
    ssqrt(value: ESource): EDecimal;
    /**
     * Super-root, one of tetration's inverses - what number, tetrated to height 'degree', equals 'value'? https://en.wikipedia.org/wiki/Tetration#Super-root
     *
     * Only works with the linear approximation of tetration, as starting with analytic and then switching to linear would result in inconsistent behavior for super-roots.
     * This only matters for non-integer degrees.
     */
    linear_sroot(value: ESource, degree: number): EDecimal;
    /**
     * Pentation/pentate: The result of tetrating 'height' times in a row. An absurdly strong operator - Decimal.pentate(2, 4.28) and Decimal.pentate(10, 2.37) are already too huge for break_eternity.js!
     * https://en.wikipedia.org/wiki/Pentation
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     *
     * For non-whole pentation heights, the linear approximation of pentation is always used, as there is no defined analytic approximation of pentation.
     */
    pentate(value: ESource, height?: number, payload?: ESource, linear?: boolean): EDecimal;
    /**
     * The sine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
     */
    sin(value: ESource): EDecimal;
    /**
     * The cosine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
     */
    cos(value: ESource): EDecimal;
    /**
     * The tangent function, equal to sine divided by cosine. Behaves periodically with period pi.
     */
    tan(value: ESource): EDecimal;
    /**
     * The arcsine function, the inverse of the sine function.
     */
    asin(value: ESource): EDecimal;
    /**
     * The arccosine function, the inverse of the cosine function.
     */
    acos(value: ESource): EDecimal;
    /**
     * The arctangent function, the inverse of the tangent function.
     */
    atan(value: ESource): EDecimal;
    /**
     * Hyperbolic sine: sinh(X) = (e^x - e^-x)/2.
     */
    sinh(value: ESource): EDecimal;
    /**
     * Hyperbolic cosine: cosh(x) = (e^x + e^-x)/2.
     */
    cosh(value: ESource): EDecimal;
    /**
     * Hyperbolic tangent: tanh(x) = sinh(x)/cosh(x).
     */
    tanh(value: ESource): EDecimal;
    /**
     * Hyperbolic arcsine, the inverse of hyperbolic sine.
     */
    asinh(value: ESource): EDecimal;
    /**
     * Hyperbolic arccosine, the inverse of hyperbolic cosine.
     */
    acosh(value: ESource): EDecimal;
    /**
     * Hyperbolic arcctangent, the inverse of hyperbolic tangent.
     */
    atanh(value: ESource): EDecimal;
    /**
     * If you're willing to spend 'resourcesAvailable' and want to buy something
     * with exponentially increasing cost each purchase (start at priceStart,
     * multiply by priceRatio, already own currentOwned), how much of it can you buy?
     * Adapted from Trimps source code.
     */
    affordGeometricSeries(resourcesAvailable: ESource, priceStart: ESource, priceRatio: ESource, currentOwned: ESource): EDecimal;
    /**
     * How much resource would it cost to buy (numItems) items if you already have currentOwned,
     * the initial price is priceStart and it multiplies by priceRatio each purchase?
     */
    sumGeometricSeries(numItems: ESource, priceStart: ESource, priceRatio: ESource, currentOwned: ESource): EDecimal;
    /**
     * If you're willing to spend 'resourcesAvailable' and want to buy something with additively
     * increasing cost each purchase (start at priceStart, add by priceAdd, already own currentOwned),
     * how much of it can you buy?
     */
    affordArithmeticSeries(resourcesAvailable: ESource, priceStart: ESource, priceAdd: ESource, currentOwned: ESource): EDecimal;
    /**
     * How much resource would it cost to buy (numItems) items if you already have currentOwned,
     * the initial price is priceStart and it adds priceAdd each purchase?
     * Adapted from http://www.mathwords.com/a/arithmetic_series.htm
     */
    sumArithmeticSeries(numItems: ESource, priceStart: ESource, priceAdd: ESource, currentOwned: ESource): EDecimal;
    /**
     * When comparing two purchases that cost (resource) and increase your resource/sec by (deltaRpS),
     * the lowest efficiency score is the better one to purchase.
     * From Frozen Cookies:
     * http://cookieclicker.wikia.com/wiki/Frozen_Cookies_(JavaScript_Add-on)#Efficiency.3F_What.27s_that.3F
     */
    efficiencyOfPurchase(cost: ESource, currentRpS: ESource, deltaRpS: ESource): EDecimal;
    randomDecimalForTesting(maxLayers: number): EDecimal;
    affordGeometricSeries_core(resourcesAvailable: EDecimal, priceStart: EDecimal, priceRatio: EDecimal, currentOwned: ESource): EDecimal;
    sumGeometricSeries_core(numItems: ESource, priceStart: EDecimal, priceRatio: EDecimal, currentOwned: ESource): EDecimal;
    affordArithmeticSeries_core(resourcesAvailable: EDecimal, priceStart: EDecimal, priceAdd: EDecimal, currentOwned: EDecimal): EDecimal;
    sumArithmeticSeries_core(numItems: EDecimal, priceStart: EDecimal, priceAdd: EDecimal, currentOwned: EDecimal): EDecimal;
    efficiencyOfPurchase_core(cost: EDecimal, currentRpS: EDecimal, deltaRpS: EDecimal): EDecimal;
    slog_critical(base: number, height: number): number;
    tetrate_critical(base: number, height: number): number;
    critical_section(base: number, height: number, grid: number[][], linear?: boolean): number;
}
type DecimalClassInstance = InstanceType<typeof DecimalClone> & {
    // readonly dZero: EDecimal;
    // readonly dOne: EDecimal;
    // readonly dNegOne: EDecimal;
    // readonly dTwo: EDecimal;
    // readonly dTen: EDecimal;
    // readonly dNaN: EDecimal;
    // readonly dInf: EDecimal;
    // readonly dNegInf: EDecimal;
    // readonly dNumberMax: EDecimal;
    // readonly dNumberMin: EDecimal;
    // private fromStringCache;
    sign: number;
    mag: number;
    layer: number;
    // constructor(value?: ESource);
    // get m(): number;
    // set m(value: number);
    // get e(): number;
    // set e(value: number);
    // get s(): number;
    // set s(value: number);
    // get mantissa(): number;
    // set mantissa(value: number);
    // get exponent(): number;
    // set exponent(value: number);
    /**
     * Turns the Decimal into a valid Decimal. This function is meant for internal purposes - users of this library should not need to use normalize.
     *
     * Note: this function mutates the Decimal it is called on.
     */
    normalize(): EDecimal;
    /**
     * Turns the given components into a valid Decimal.
     *
     * Note: this function mutates the Decimal it is called on.
     */
    fromComponents(sign: number, layer: number, mag: number): EDecimal;
    /**
     * Turns the given components into a Decimal, but not necessarily a valid one (it's only valid if the components would already create a valid Decimal without normalization). Users of this library should not use this function.
     *
     * Note: this function mutates the Decimal it is called on.
     */
    fromComponents_noNormalize(sign: number, layer: number, mag: number): EDecimal;
    /**
     * Turns the mantissa and exponent into a valid Decimal with value mantissa * 10^exponent.
     *
     * Note: this function mutates the Decimal it is called on.
     */
    fromMantissaExponent(mantissa: number, exponent: number): EDecimal;
    /**
     * Turns the mantissa and exponent into a Decimal, but not necessarily a valid one. Users of this library should not use this function.
     *
     * Note: this function mutates the Decimal it is called on.
     */
    fromMantissaExponent_noNormalize(mantissa: number, exponent: number): EDecimal;
    /**
     * Turns the Decimal that this function is called on into a deep copy of the provided value.
     *
     * Note: this function mutates the Decimal it is called on.
     */
    fromDecimal(value: EDecimal): EDecimal;
    /**
     * Converts a floating-point number into a Decimal.
     *
     * Note: this function mutates the Decimal it is called on.
     */
    fromNumber(value: number): EDecimal;
    /**
     * Converts a string into a Decimal.
     *
     * If linearhyper4 is true, then strings like "10^^8.5" will use the linear approximation of tetration even for bases <= 10.
     *
     * Note: this function mutates the Decimal it is called on.
     */
    fromString(value: string, linearhyper4?: boolean): EDecimal;
    /**
     * The function used by new Decimal() to create a new Decimal. Accepts a ESource: uses fromNumber if given a number, uses fromString if given a string, and uses fromDecimal if given a Decimal.
     *
     * Note: this function mutates the Decimal it is called on.
     */
    fromValue(value: ESource): EDecimal;
    /**
     * Returns the numeric value of the Decimal it's called on. Will return Infinity (or -Infinity for negatives) for Decimals that are larger than Number.MAX_VALUE.
     */
    toNumber(): number;
    mantissaWithDecimalPlaces(places: number): number;
    magnitudeWithDecimalPlaces(places: number): number;
    /**
     * Returns a string representation of the Decimal it's called on.
     * This string is written as a plain number for most layer 0 numbers, in scientific notation for layer 1 numbers (and layer 0 numbers below 1e-6),
     * in "ee...X" form for numbers from layers 2 to 5, and in (e^N)X form for layer > 5.
     */
    toString(): string;
    toExponential(places: number): string;
    toFixed(places: number): string;
    toPrecision(places: number): string;
    valueOf(): string;
    toJSON(): string;
    toStringWithDecimalPlaces(places: number): string;
    /**
     * Absolute value function: returns 'this' if 'this' >= 0, returns the negative of 'this' if this < 0.
     */
    abs(): EDecimal;
    /**
     * Negates the Decimal it's called on: in other words, when given X, returns -X.
     */
    neg(): EDecimal;
    /**
     * Negates the Decimal it's called on: in other words, when given X, returns -X.
     */
    negate(): EDecimal;
    /**
     * Negates the Decimal it's called on: in other words, when given X, returns -X.
     */
    negated(): EDecimal;
    /**
     * Returns the sign of the Decimal it's called on. (Though, since sign is a public data member of Decimal, you might as well just call .sign instead of .sgn())
     */
    sgn(): number;
    /**
     * Rounds the Decimal it's called on to the nearest integer.
     */
    round(): EDecimal;
    /**
     * "Rounds" the Decimal it's called on to the nearest integer that's less than or equal to it.
     */
    floor(): EDecimal;
    /**
     * "Rounds" the Decimal it's called on to the nearest integer that's greater than or equal to it.
     */
    ceil(): EDecimal;
    /**
     * Extracts the integer part of the Decimal and returns it. Behaves like floor on positive numbers, but behaves like ceiling on negative numbers.
     */
    trunc(): EDecimal;
    /**
     * Addition: returns the sum of 'this' and 'value'.
     */
    add(value: ESource): EDecimal;
    /**
     * Addition: returns the sum of 'this' and 'value'.
     */
    plus(value: ESource): EDecimal;
    /**
     * Subtraction: returns the difference between 'this' and 'value'.
     */
    sub(value: ESource): EDecimal;
    /**
     * Subtraction: returns the difference between 'this' and 'value'.
     */
    subtract(value: ESource): EDecimal;
    /**
     * Subtraction: returns the difference between 'this' and 'value'.
     */
    minus(value: ESource): EDecimal;
    /**
     * Multiplication: returns the product of 'this' and 'value'.
     */
    mul(value: ESource): EDecimal;
    /**
     * Multiplication: returns the product of 'this' and 'value'.
     */
    multiply(value: ESource): EDecimal;
    /**
     * Multiplication: returns the product of 'this' and 'value'.
     */
    times(value: ESource): EDecimal;
    /**
     * Division: returns the quotient of 'this' and 'value'.
     */
    div(value: ESource): EDecimal;
    /**
     * Division: returns the quotient of 'this' and 'value'.
     */
    divide(value: ESource): EDecimal;
    /**
     * Division: returns the quotient of 'this' and 'value'.
     */
    divideBy(value: ESource): EDecimal;
    /**
     * Division: returns the quotient of 'this' and 'value'.
     */
    dividedBy(value: ESource): EDecimal;
    /**
     * Returns the reciprocal (1 / X) of the Decimal it's called on.
     */
    recip(): EDecimal;
    /**
     * Returns the reciprocal (1 / X) of the Decimal it's called on.
     */
    reciprocal(): EDecimal;
    /**
     * Returns the reciprocal (1 / X) of the Decimal it's called on.
     */
    reciprocate(): EDecimal;
    /**
     * Returns the remainder of 'this' divided by 'value': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
    mod(value: ESource): EDecimal;
    /**
     * Returns the remainder of 'this' divided by 'value': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
    modulo(value: ESource): EDecimal;
    /**
     * Returns the remainder of this / value: for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
    modular(value: ESource): EDecimal;
    /**
     * Returns 1 if 'this' > 'value', returns -1 if 'this' < 'value', returns 0 if 'this' == 'value'.
     */
    cmp(value: ESource): CompareResult;
    /**
     * Compares the absolute values of this and value.
     * Returns 1 if |'this'| > |'value'|, returns -1 if |'this'| < |'value'|, returns 0 if |'this'| == |'value'|.
     */
    cmpabs(value: ESource): CompareResult;
    /**
     * Returns 1 if 'this' > 'value', returns -1 if 'this' < 'value', returns 0 if 'this' == 'value'.
     */
    compare(value: ESource): CompareResult;
    /**
     * Returns true if the Decimal is an NaN value.
     */
    isNan(): boolean;
    /**
     * Returns true if the Decimal is finite (by Decimal standards, not by floating point standards - a humongous Decimal like 10^^10^100 is still finite!)
     */
    isFinite(): boolean;
    /**
     * The Decimal equivalent of ==. Returns true if 'this' and 'value' have equal values.
     */
    eq(value: ESource): boolean;
    /**
     * Returns true if 'this' and 'value' have equal values.
     */
    equals(value: ESource): boolean;
    /**
     * The Decimal equivalent of !=. Returns true if 'this' and 'value' do not have equal values.
     */
    neq(value: ESource): boolean;
    /**
     * Returns true if 'this' and 'value' do not have equal values.
     */
    notEquals(value: ESource): boolean;
    /**
     * The Decimal equivalent of <. Returns true if 'this' is less than 'value'.
     */
    lt(value: ESource): boolean;
    /**
     * The Decimal equivalent of <=. Returns true if 'this' is less than or equal to 'value'.
     */
    lte(value: ESource): boolean;
    /**
     * The Decimal equivalent of >. Returns true if 'this' is greater than 'value'.
     */
    gt(value: ESource): boolean;
    /**
     * The Decimal equivalent of >=. Returns true if 'this' is greater than or equal to 'value'.
     */
    gte(value: ESource): boolean;
    /**
     * Returns whichever of 'this' and 'value' is higher.
     */
    max(value: ESource): EDecimal;
    /**
     * Returns whichever of 'this' and 'value' is lower.
     */
    min(value: ESource): EDecimal;
    /**
     * Returns whichever of 'this' and 'value' has a larger absolute value.
     */
    maxabs(value: ESource): EDecimal;
    /**
     * Returns whichever of 'this' and 'value' has a smaller absolute value.
     */
    minabs(value: ESource): EDecimal;
    /**
     * A combination of minimum and maximum: the value returned by clamp is normally 'this', but it won't go below 'min' and it won't go above 'max'.
     * Therefore, if 'this' < 'min', then 'min' is returned, and if 'this' > 'max', then 'max' is returned.
     */
    clamp(min: ESource, max: ESource): EDecimal;
    /**
     * Returns 'this', unless 'this' is less than 'min', in which case 'min' is returned.
     */
    clampMin(min: ESource): EDecimal;
    /**
     * Returns 'this', unless 'this' is greater than 'max', in which case 'max' is returned.
     */
    clampMax(max: ESource): EDecimal;
    /**
     * Returns 1 if 'this' is greater than 'value', returns -1 if 'this' is less than 'value', returns 0 if 'this' is equal to 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    cmp_tolerance(value: ESource, tolerance: number): CompareResult;
    /**
     * Returns 1 if 'this' is greater than 'value', returns -1 if 'this' is less than 'value', returns 0 if 'this' is equal to 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    compare_tolerance(value: ESource, tolerance: number): CompareResult;
    /**
     * Tests whether two Decimals are approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    eq_tolerance(value: ESource, tolerance: number): boolean;
    /**
     * Tests whether two Decimals are approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    equals_tolerance(value: ESource, tolerance: number): boolean;
    /**
     * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    neq_tolerance(value: ESource, tolerance: number): boolean;
    /**
     * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    notEquals_tolerance(value: ESource, tolerance: number): boolean;
    /**
     * Returns true if 'this' is less than 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    lt_tolerance(value: ESource, tolerance: number): boolean;
    /**
     * Returns true if 'this' is less than or equal to 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    lte_tolerance(value: ESource, tolerance: number): boolean;
    /**
     * Returns true if 'this' is greater than 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    gt_tolerance(value: ESource, tolerance: number): boolean;
    /**
     * Returns true if 'this' is greater than or equal to 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    gte_tolerance(value: ESource, tolerance: number): boolean;
    /**
     * "Positive log10": Returns the base-10 logarithm of nonnegative Decimals, but returns 0 for negative Decimals.
     */
    pLog10(): EDecimal;
    /**
     * Returns the base-10 logarithm of abs('this').
     */
    absLog10(): EDecimal;
    /**
     * Base-10 logarithm: returns the Decimal X such that 10^X = 'this'.
     * For numbers above layer 0, this is equivalent to subtracting 1 from layer and normalizing.
     */
    log10(): EDecimal;
    /**
     * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'this'.
     */
    log(base: ESource): EDecimal;
    /**
     * Base-2 logarithm: returns the Decimal X such that 2^X = 'this'.
     */
    log2(): EDecimal;
    /**
     * Base-e logarithm, also known as the "natural" logarithm: returns the Decimal X such that e^X = 'this'.
     */
    ln(): EDecimal;
    /**
     * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'this'.
     */
    logarithm(base: ESource): EDecimal;
    /**
     * Exponentiation: Returns the result of 'this' ^ 'value' (often written as 'this' ** 'value' in programming languages).
     */
    pow(value: ESource): EDecimal;
    /**
     * Raises 10 to the power of 'this', i.e. (10^'this'). For positive numbers above 1, this is equivalent to adding 1 to layer and normalizing.
     */
    pow10(): EDecimal;
    /**
     * Exponentiation: Returns the result of 'value' ^ 'this' (often written as 'value' ** 'this' in programming languages).
     */
    pow_base(value: ESource): EDecimal;
    /**
     * Roots are one of the inverses of exponentiation: this function finds the Decimal X such that X ^ 'value' = 'this'.
     * Equivalent to 'this' ^ (1 / 'value'), which is written here as this.pow(value.recip()).
     */
    root(value: ESource): EDecimal;
    /**
     * For positive integers, X factorial (written as X!) equals X * (X - 1) * (X - 2) *... * 3 * 2 * 1. 0! equals 1.
     * This can be extended to real numbers (except for negative integers) via the gamma function, which is what this function does.
     */
    factorial(): EDecimal;
    /**
     * The gamma function extends the idea of factorials to non-whole numbers using some calculus.
     * Gamma(x) is defined as the integral of t^(x-1) * e^-t dt from t = 0 to t = infinity,
     * and gamma(x) = (x - 1)! for nonnegative integer x, so the factorial for non-whole numbers is defined using the gamma function.
     */
    gamma(): EDecimal;
    /**
     * Returns the natural logarithm of Gamma('this').
     */
    lngamma(): EDecimal;
    /**
     * Base-e exponentiation: returns e^'this'.
     */
    exp(): EDecimal;
    /**
     * Squaring a number means multiplying it by itself, a.k.a. raising it to the second power.
     */
    sqr(): EDecimal;
    /**
     * Square root: finds the Decimal X such that X * X, a.k.a X^2, equals 'this'. Equivalent to X^(1/2).
     */
    sqrt(): EDecimal;
    /**
     * Cubing a number means raising it to the third power.
     */
    cube(): EDecimal;
    /**
     * Cube root: finds the Decimal X such that X^3 equals 'this'. Equivalent to X^(1/3).
     */
    cbrt(): EDecimal;
    /**
     *
     * Tetration: The result of exponentiating 'this' to 'this' 'height' times in a row.  https://en.wikipedia.org/wiki/Tetration
     *
     * If payload != 1, then this is 'iterated exponentiation', the result of exping 'payload' to base 'this' 'height' times. https://andydude.github.io/tetration/archives/tetration2/ident.html
     *
     * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
    tetrate(height?: number, payload?: ESource, linear?: boolean): EDecimal;
    /**
     * Iterated exponentiation, the result of exping 'payload' to base 'this' 'height' times. https://andydude.github.io/tetration/archives/tetration2/ident.html
     *
     * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     *
     * Identical to tetrate.
     */
    iteratedexp(height?: number, payload?: EDecimal, linear?: boolean): EDecimal;
    /**
     * iterated log/repeated log: The result of applying log(base) 'times' times in a row. Approximately equal to subtracting 'times' from the number's slog representation. Equivalent to tetrating to a negative height.
     *
     * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
    iteratedlog(base?: ESource, times?: number, linear?: boolean): EDecimal;
    /**
     * Super-logarithm, one of tetration's inverses, tells you what size power tower you'd have to tetrate 'base' to to get 'this'. https://en.wikipedia.org/wiki/Super-logarithm
     *
     * By definition, will never be higher than 1.8e308 in break_eternity.js, since a power tower 1.8e308 numbers tall is the largest representable number.
     *
     * Accepts a number of iterations (default is 100), and use binary search to, after making an initial guess, hone in on the true value, assuming tetration as the ground truth.
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
    slog(base?: ESource, iterations?: number, linear?: boolean): EDecimal;
    slog_internal(base?: ESource, linear?: boolean): EDecimal;
    /**
     * Adds/removes layers from a Decimal, even fractional layers (e.g. its slog10 representation). Very similar to tetrate base 10 and iterated log base 10.
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
    layeradd10(diff: ESource, linear?: boolean): EDecimal;
    /**
     * layeradd: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 'base' and iterated log base 'base'.
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
    layeradd(diff: number, base: ESource, linear?: boolean): EDecimal;
    /**
     * The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
     * https://en.wikipedia.org/wiki/Lambert_W_function
     */
    lambertw(): EDecimal;
    /**
     * The super square-root function - what number, tetrated to height 2, equals 'this'? https://en.wikipedia.org/wiki/Tetration#Super-root
     */
    ssqrt(): EDecimal;
    /**
     * Super-root, one of tetration's inverses - what number, tetrated to height 'degree', equals 'this'? https://en.wikipedia.org/wiki/Tetration#Super-root
     *
     * Only works with the linear approximation of tetration, as starting with analytic and then switching to linear would result in inconsistent behavior for super-roots.
     * This only matters for non-integer degrees.
     */
    linear_sroot(degree: number): EDecimal;
    /**
     * Pentation/pentate: The result of tetrating 'height' times in a row. An absurdly strong operator - Decimal.pentate(2, 4.28) and Decimal.pentate(10, 2.37) are already too huge for break_eternity.js!
     * https://en.wikipedia.org/wiki/Pentation
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     *
     * For non-whole pentation heights, the linear approximation of pentation is always used, as there is no defined analytic approximation of pentation.
     */
    pentate(height?: number, payload?: ESource, linear?: boolean): EDecimal;
    /**
     * The sine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
     */
    sin(): EDecimal;
    /**
     * The cosine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
     */
    cos(): EDecimal;
    /**
     * The tangent function, equal to sine divided by cosine. Behaves periodically with period pi.
     */
    tan(): EDecimal;
    /**
     * The arcsine function, the inverse of the sine function.
     */
    asin(): EDecimal;
    /**
     * The arccosine function, the inverse of the cosine function.
     */
    acos(): EDecimal;
    /**
     * The arctangent function, the inverse of the tangent function.
     */
    atan(): EDecimal;
    /**
     * Hyperbolic sine: sinh(X) = (e^x - e^-x)/2.
     */
    sinh(): EDecimal;
    /**
     * Hyperbolic cosine: cosh(x) = (e^x + e^-x)/2.
     */
    cosh(): EDecimal;
    /**
     * Hyperbolic tangent: tanh(x) = sinh(x)/cosh(x).
     */
    tanh(): EDecimal;
    /**
     * Hyperbolic arcsine, the inverse of hyperbolic sine.
     */
    asinh(): EDecimal;
    /**
     * Hyperbolic arccosine, the inverse of hyperbolic cosine.
     */
    acosh(): EDecimal;
    /**
     * Hyperbolic arcctangent, the inverse of hyperbolic tangent.
     */
    atanh(): EDecimal;
    /**
     * Joke function from Realm Grinder
     */
    ascensionPenalty(ascensions: ESource): EDecimal;
    /**
     * Joke function from Cookie Clicker. It's 'egg'
     */
    egg(): EDecimal;
    lessThanOrEqualTo(other: ESource): boolean;
    lessThan(other: ESource): boolean;
    greaterThanOrEqualTo(other: ESource): boolean;
    greaterThan(other: ESource): boolean;
}

class DecimalClone {
    // constructor(value: ESource) {
    //     super(value);
    // }

    /**
     * WARNING: DO NOT USE THIS CONSTRUCTOR.
     */
    // constructor (value?: ESource | DecimalClone) {}

    public static formats: typeof FORMATS;

    /**
     * Smoothly interpolates between the current value and the target value over time
     * using a smoothing factor and deltaTime.
     * @param current - The current value to interpolate from.
     * @param target - The target value to interpolate towards.
     * @param smoothing - The smoothing factor controlling the interpolation speed.
     *                           A higher value results in slower interpolation.
     * @param deltaTime - The time elapsed since the last frame in seconds.
     * @returns - The interpolated value between `current` and `target`.
     */
    // @ts-expect-error - Bound function
    public static smoothDamp = function (current: ESource, target: ESource, smoothing: ESource, deltaTime: ESource): EDecimal { return new EDecimal(current).add(new EDecimal(target).minus(new EDecimal(current)).times(new EDecimal(smoothing)).times(new EDecimal(deltaTime))); };

    /**
     * Creates a clone of the E instance. Helps with a webpack(?) bug
     * @alias EDecimal.normalizeFromComponents
     * @param x - The number to clone
     * @returns - The cloned number
     */
    public static clone = function (x: EDecimal): EDecimal {
        return EDecimal.fromComponents(x.sign, x.layer, x.mag);
    };

    public static softcap = function (value: ESource, start: ESource, power: number, mode: string): EDecimal {
        return new EDecimal(value).softcap(start, power, mode);
    };
    public static scale = function (value: ESource, s: ESource, p: ESource, mode: string | number, rev: boolean = false): EDecimal {
        return new EDecimal(value).scale(s, p, mode, rev);
    };

    /**
     * Creates a clone of the EDecimal instance.
     * @deprecated
     * @returns A EDecimal instance that is a clone of the original.
     */
    public clone = function (this: EDecimal): EDecimal {
        return this;
    };

    /**
     * Applies a soft cap to a EDecimal value using a specified soft cap function.
     * @param start - The value at which the soft cap starts.
     * @param power - The power or factor used in the soft cap calculation.
     * @param mode - The soft cap mode. Use "pow" for power soft cap, "mul" for multiplication soft cap,
     * or "exp" for exponential soft cap.
     * @returns The EDecimal value after applying the soft cap.
     */
    public softcap = function (this: EDecimal, start: ESource, power: number, mode: string): EDecimal {
        let x = this.clone();
        if (x.gte(start)) {
            if ([0, "pow"].includes(mode)) x = x.div(start).pow(power).mul(start);
            if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start);
            // if ([2, "exp"].includes(mode)) x = expMult(x.div(start), power).mul(start);
        }
        return x;
    };

    /**
     * Scales a currency value using a specified scaling function.
     * @param s - The value at which scaling starts.
     * @param p - The scaling factor.
     * @param mode - The scaling mode. Use "pow" for power scaling or "exp" for exponential scaling.
     * @param rev - Whether to reverse the scaling operation
     * @returns The scaled currency value.
     */
    public scale = function (this: EDecimal, s: ESource, p: ESource, mode: string | number, rev: boolean = false): EDecimal {
        s = new EDecimal(s);
        p = new EDecimal(p);
        let x = this.clone();
        if (x.gte(s)) {
            if ([0, "pow"].includes(mode)) {x = rev ?
                x.mul(s.pow(p.sub(1))).root(p) : // (x * s^(p - 1))^(1 / p)
                x.pow(p).div(s.pow(p.sub(1)));} // x^p / s^(p - 1)
            if ([1, "exp"].includes(mode)) {x = rev ?
                x.div(s).max(1).log(p).add(s) : // log_p((x / s).max(1)) + s
                EDecimal.pow(p, x.sub(s)).mul(s);} // p^(x - s) * s
        }
        return x;
    };

    /**
     * Formats the E instance with a specified accuracy and maximum EDecimal places.
     * @param [acc] - The desired accuracy (number of significant figures), defaults to `2`.
     * @param [max] - The maximum number of EDecimal places to display, defaults to `9`.
     * @param [type] - The type of format, defaults to `"mixed_sc"`.
     * @returns A string representing the formatted E value.
     */
    public format = function (this: EDecimal, acc: number = 2, max: number = 9, type: FormatType = "mixed_sc"): string {
        return formats.format(this.clone(), acc, max, type);
    };
    /**
     * Formats the E instance with a specified accuracy and maximum EDecimal places.
     * @param e - The E instance to format.
     * @param [acc] - The desired accuracy (number of significant figures), defaults to `2`.
     * @param [max] - The maximum number of EDecimal places to display, defaults to `9`.
     * @param [type] - The type of format, defaults to `"mixed_sc"`.
     * @returns A string representing the formatted E value.
     */
    public static format = function (e: ESource, acc: number = 2, max: number = 9, type: FormatType = "mixed_sc"): string {
        return formats.format(new EDecimal(e), acc, max, type);
    };

    /**
     * Formats the E instance in standard leter notation with a specified accuracy and maximum EDecimal places.
     * @param [acc] - The desired accuracy (number of significant figures).
     * @param [max] - The maximum number of EDecimal places to display.
     * @param [type] - The type of format (default standard)
     * @returns A string representing the formatted E value.
     */
    public formatST = function (this: EDecimal, acc: number = 2, max: number = 9, type: FormatType = "st"): string { return formats.format(this.clone(), acc, max, type); };
    public static formatST = function (value: ESource, acc: number = 2, max: number = 9, type: FormatType = "st"): string { return formats.format(new EDecimal(value), acc, max, type); };

    /**
     * Formats the gain rate using the E instance.
     * @param gain - The gain value to compare
     * @param [mass] - Indicates whether the gain represents a mass value.
     * @param [type] - The type of format (default mixed scientific)
     * @returns A string representing the formatted gain
     * @example
     * const currency = new EDecimal(100);
     * const currencyGain = new EDecimal(12);
     * const formatted = currency.formats.formatGain(currencyGain);
     * console.log(formatted); // should return "(+12/sec)"
     */
    public formatGain = function (this: EDecimal, gain: ESource, type: FormatType = "mixed_sc"): string { return formats.formatGain(this.clone(), gain, type); };
    public static formatGain = function (value: ESource, gain: ESource, type: FormatType = "mixed_sc"): string { return formats.formatGain(new EDecimal(value), gain, type); };

    /**
     * Converts the E instance to a Roman numeral representation.
     * @param [max] - Max before it returns the original
     * @returns A string representing the Roman numeral equivalent of the E value,
     * or the original E instance if it is greater than or equal to 5000 or less than 1.
     */
    public toRoman = function (this: EDecimal, max: ESource = 5000): string | EDecimal {
        max = new EDecimal(max);

        const num: EDecimal = this.clone();
        if (num.gte(max) || num.lt(1)) return num;
        let newNum: number = num.toNumber();

        const roman = {
            M: 1000,
            CM: 900,
            D: 500,
            CD: 400,
            C: 100,
            XC: 90,
            L: 50,
            XL: 40,
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1,
        };
        let str = "";

        for (const i of Object.keys(roman)) {
            const q = Math.floor(newNum / (roman as any)[i]);
            newNum -= q * (roman as any)[i];
            str += i.repeat(q);
        }

        return str;
    };
    public static toRoman = function (this: EDecimal, value: ESource, max: ESource): string | EDecimal {
        return new EDecimal(value).toRoman(max);
    };
}

class test extends EDecimal {
    constructor (value: ESource) {
        super(value);
    }
}

// bug lol

for (const key in DecimalClone) {
    if (typeof (DecimalClone as any)[key] === "function") {
        (EDecimal as any)[key] = (DecimalClone as any)[key].bind(EDecimal);
        // console.log(key, (DecimalClone as any)[key].bind(EDecimal), (EDecimal as any)[key]);
    }
}

// for (const key in DecimalClone.prototype) {
//     // console.log(key, (DecimalClone.prototype as any)[key]);
//     if (typeof (DecimalClone.prototype as any)[key] === "function") {
//         (EDecimal.prototype as any)[key] = (DecimalClone.prototype as any)[key].bind(EDecimal);
//     }
// }

const newProto = {};

for (const key of Object.getOwnPropertyNames(new DecimalClone())) {
    const clone = new DecimalClone();
    // if (typeof (clone)[key] === "function") {
    // console.log(key);
    (newProto as any)[key] = (clone as any)[key].bind(EDecimal);
    // }
}

Object.assign(EDecimal.prototype, newProto);

// Change the return type of every method in EDecimal to EDecimal & DecimalClone
type ReplaceReturnType<T extends (...a: any) => any, TOldReturn, TNewReturn> = (...a: Parameters<T>) =>
    ReturnType<T> extends TOldReturn ? TNewReturn : ReturnType<T>;
    // ReplaceType<ReturnType<T>, TOldReturn, TNewReturn>;
type DecimalWithNewMethods = {
    [K in keyof EDecimal]: EDecimal[K] extends (...a: any) => any ? ReplaceReturnType<EDecimal[K], InstanceType<typeof Decimal>, (InstanceType<typeof Decimal> & InstanceType<typeof DecimalClone>)> : EDecimal[K];
};

// test
// declare function testFn (a: number): EDecimal;
// type testFnType = ReplaceReturnType<typeof testFn, Decimal, EDecimal>;

// @ts-expect-error - type gymnastics
EDecimal = EDecimal as unknown as DecimalWithNewMethods;

// Change the return type of the constructor to EDecimal & DecimalClone
// type DecimalConstructor = {
//     new (value: ESource): EDecimal & DecimalClone;
//     (value: ESource): EDecimal & DecimalClone;
// }

/**
 * A function that returns a EDecimal instance. Also contains static methods and properties of the EDecimal class.
 * @param x - The value to convert to a EDecimal instance.
 * @returns - The EDecimal instance.
 */
// @ts-expect-error Declared as a function, but adds properties later
const E: ((x?: ESource) => DecimalClassInstance) & typeof EDecimal & typeof DecimalClone & DecimalClassStatic = (() => {
    const out = (x?: ESource) => E(x);

    // Copy properties from EDecimal to E
    (Object.getOwnPropertyNames(EDecimal).filter((b) => !Object.getOwnPropertyNames(class {}).includes(b)) as string[]).forEach((prop) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (out as any)[prop] = (EDecimal as any)[prop];
    });
    return out;
})();

E(2).add(23).format();

// console.log(Object.getOwnPropertyNames(new DecimalClone()));

// console.log(EDecimal.prototype);

// console.log("clone", E().clone());

// console.log(E(100));
// console.log(DecimalClone.prototype, EDecimal.prototype);

// Formats
/** A list of names for the standard notation */
const ST_NAMES = [
    [
        // Tier 1 (0-1e3000)
        ["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"],
        ["", "Dc", "Vg", "Tg", "Qag", "Qtg", "Sxg", "Spg", "Ocg", "Nog"],
        ["", "Ce", "De", "Te", "Qae", "Qte", "Sxe", "Spe", "Oce", "Noe"],
    ], [
        // Higher tiers
        ["", "Mi", "Mc", "Na", "Pc", "Fm", "At", "Zp", "Yc", "Xn"],
        ["", "Me", "Du", "Tr", "Te", "Pe", "He", "Hp", "Ot", "En"],
        ["", "c", "Ic", "TCn", "TeC", "PCn", "HCn", "HpC", "OCn", "ECn"],
        ["", "Hc", "DHe", "THt", "TeH", "PHc", "HHe", "HpH", "OHt", "EHc"],
    ],
];

type FormatType = "st" | "sc" | "scientific" | "omega" | "omega_short" | "elemental" | "old_sc" | "eng" | "mixed_sc" | "layer" | "standard" | "inf";
const FormatTypeList: FormatType[] = ["st", "sc", "scientific", "omega", "omega_short", "elemental", "old_sc", "eng", "mixed_sc", "layer", "standard", "inf"];

/** A list of formats */
const FORMATS = {
    /** Omega format */
    omega: {
        config: {
            greek: "βζλψΣΘΨω",
            infinity: "Ω",
        },
        /**
         * Format the value into omega format
         * @param value - The value to format
         * @returns - The formatted value
         */
        format (value: ESource): string {
            value = E(value);
            const step = EDecimal.floor(value.div(1000));
            const omegaAmount = EDecimal.floor(step.div(FORMATS.omega.config.greek.length));
            let lastLetter = FORMATS.omega.config.greek[step.toNumber() % FORMATS.omega.config.greek.length] + toSubscript(value.toNumber() % 1000);
            const beyondGreekArrayBounds = FORMATS.omega.config.greek[step.toNumber() % FORMATS.omega.config.greek.length] === undefined;
            if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
                lastLetter = "ω";
            }
            const omegaOrder = EDecimal.log(value, 8000).toNumber();
            if (omegaAmount.equals(0)) {
                return lastLetter;
            } else if (omegaAmount.gt(0) && omegaAmount.lte(3)) {
                const omegas = [];
                for (let i = 0; i < omegaAmount.toNumber(); i++) {
                    omegas.push("ω");
                }
                return `${omegas.join("^")}^${lastLetter}`;
            } else if (omegaAmount.gt(3) && omegaAmount.lt(10)) {
                return `ω(${omegaAmount.toFixed(0)})^${lastLetter}`;
            } else if (omegaOrder < 3) {
                return `ω(${FORMATS.omega.format(omegaAmount)})^${lastLetter}`;
            } else if (omegaOrder < 6) {
                return `ω(${FORMATS.omega.format(omegaAmount)})`;
            }
            const val = EDecimal.pow(8000, omegaOrder % 1);
            const orderStr = omegaOrder < 100
                ? Math.floor(omegaOrder).toFixed(0)
                : FORMATS.omega.format(EDecimal.floor(omegaOrder));
            return `ω[${orderStr}](${FORMATS.omega.format(val)})`;
        },
    },
    /** Short omega format */
    omega_short: {
        config: {
            greek: "βζλψΣΘΨω",
            infinity: "Ω",
        },
        /**
         * Format the value into short omega format
         * @param value - The value to format
         * @returns - The formatted value
         */
        format (value: ESource): string {
            value = E(value);
            const step = EDecimal.floor(value.div(1000));
            const omegaAmount = EDecimal.floor(step.div(FORMATS.omega_short.config.greek.length));
            let lastLetter = FORMATS.omega_short.config.greek[step.toNumber() % FORMATS.omega_short.config.greek.length] + toSubscript(value.toNumber() % 1000);
            const beyondGreekArrayBounds = FORMATS.omega_short.config.greek[step.toNumber() % FORMATS.omega_short.config.greek.length] === undefined;
            if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
                lastLetter = "ω";
            }
            const omegaOrder = EDecimal.log(value, 8000).toNumber();
            if (omegaAmount.equals(0)) {
                return lastLetter;
            } else if (omegaAmount.gt(0) && omegaAmount.lte(2)) {
                const omegas = [];
                for (let i = 0; i < omegaAmount.toNumber(); i++) {
                    omegas.push("ω");
                }
                return `${omegas.join("^")}^${lastLetter}`;
            } else if (omegaAmount.gt(2) && omegaAmount.lt(10)) {
                return `ω(${omegaAmount.toFixed(0)})^${lastLetter}`;
            }
            const val = EDecimal.pow(8000, omegaOrder % 1);
            const orderStr = omegaOrder < 100
                ? Math.floor(omegaOrder).toFixed(0)
                : FORMATS.omega_short.format(EDecimal.floor(omegaOrder));
            return `ω[${orderStr}](${FORMATS.omega_short.format(val)})`;
        },
    },
    elemental: {
        config: {
            /** The list of elements */
            element_lists: [["H"],
                ["He", "Li", "Be", "B", "C", "N", "O", "F"],
                ["Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl"],
                [
                    "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe",
                    "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br",
                ],
                [
                    "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru",
                    "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I",
                ],
                [
                    "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm",
                    "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm",
                    "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir",
                    "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At",
                ],
                [
                    "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np",
                    "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md",
                    "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt",
                    "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts",
                ],
                ["Og"]],
        },
        getOffset (group: number): number {
            if (group == 1) return 1;
            const n = Math.floor(group / 2);
            let r = 2 * n * (n + 1) * (2 * n + 1) / 3 - 2;
            if (group % 2 == 1) r += 2 * Math.pow(n + 1, 2);
            return r;
        },
        getAbbreviation (group: number, progress: number) {
            const length = FORMATS.elemental.abbreviationLength(group);
            const elemRel = Math.floor(length * progress);

            const elem = elemRel + FORMATS.elemental.getOffset(group);

            return elem > 118 ? FORMATS.elemental.beyondOg(elem) : FORMATS.elemental.config.element_lists[group - 1][elemRel];
        },
        beyondOg (x: number): string {
            const log = Math.floor(Math.log10(x));
            const list = ["n", "u", "b", "t", "q", "p", "h", "s", "o", "e"];
            let r = "";
            for (let i = log; i >= 0; i--) {
                const n = Math.floor(x / Math.pow(10, i)) % 10;
                if (r == "") r = list[n].toUpperCase();
                else r += list[n];
            }
            return r;
        },
        abbreviationLength (group: number): number {
            return group == 1 ? 1 : Math.pow(Math.floor(group / 2) + 1, 2) * 2;
        },
        getAbbreviationAndValue (x: EDecimal) {
            const abbreviationListUnfloored = x.log(118).toNumber();
            const abbreviationListIndex = Math.floor(abbreviationListUnfloored) + 1;
            const abbreviationLength = FORMATS.elemental.abbreviationLength(abbreviationListIndex);
            const abbreviationProgress = abbreviationListUnfloored - abbreviationListIndex + 1;
            const abbreviationIndex = Math.floor(abbreviationProgress * abbreviationLength);
            const abbreviation = FORMATS.elemental.getAbbreviation(abbreviationListIndex, abbreviationProgress);
            const value = E(118).pow(abbreviationListIndex + abbreviationIndex / abbreviationLength - 1);
            return [abbreviation, value];
        },
        formatElementalPart (abbreviation: string, n: EDecimal) {
            if (n.eq(1)) {
                return abbreviation;
            }
            return `${n} ${abbreviation}`;
        },
        format (value: EDecimal, acc: number): string {
            if (value.gt(E(118).pow(E(118).pow(E(118).pow(4))))) return "e" + FORMATS.elemental.format(value.log10(), acc);

            let log = value.log(118);
            const slog = log.log(118);
            const sslog = slog.log(118).toNumber();
            const max = Math.max(4 - sslog * 2, 1);
            const parts = [];
            while (log.gte(1) && parts.length < max) {
                const [abbreviation, value] = FORMATS.elemental.getAbbreviationAndValue(log);
                const n = log.div(value).floor();
                log = log.sub(n.mul(value));
                parts.unshift([abbreviation, n]);
            }
            if (parts.length >= max) {
                // @ts-ignore
                return parts.map((x) => FORMATS.elemental.formatElementalPart(x[0], x[1])).join(" + ");
            }
            const formattedMantissa = E(118).pow(log).toFixed(parts.length === 1 ? 3 : acc);
            if (parts.length === 0) {
                return formattedMantissa;
            }
            if (parts.length === 1) {
                // @ts-ignore
                return `${formattedMantissa} × ${FORMATS.elemental.formatElementalPart(parts[0][0], parts[0][1])}`;
            }
            // @ts-ignore
            return `${formattedMantissa} × (${parts.map((x) => FORMATS.elemental.formatElementalPart(x[0], x[1])).join(" + ")})`;
        },
    },
    /** Old scientific format */
    old_sc: {
        /**
         * Format the value into old scientific format
         * @param ex - The value to format
         * @param acc - The accuracy
         * @returns - The formatted value
         */
        format (ex: ESource, acc: number): string {
            ex = E(ex);
            const e = ex.log10().floor();
            if (e.lt(9)) {
                if (e.lt(3)) {
                    return ex.toFixed(acc);
                }
                return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            } else {
                if (ex.gte("eeee10")) {
                    const slog = ex.slog();
                    return (slog.gte(1e9) ? "" : E(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + FORMATS.old_sc.format(slog.floor(), 0);
                }
                const m = ex.div(E(10).pow(e));
                return (e.log10().gte(9) ? "" : m.toFixed(4)) + "e" + FORMATS.old_sc.format(e, 0);
            }
        },
    },
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
        format (ex: ESource, acc: number): string {
            ex = E(ex);
            const e = ex.log10().floor();
            if (e.lt(9)) {
                if (e.lt(3)) {
                    return ex.toFixed(acc);
                }
                return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            } else {
                if (ex.gte("eeee10")) {
                    const slog = ex.slog();
                    return (slog.gte(1e9) ? "" : E(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + FORMATS.eng.format(slog.floor(), 0);
                }
                const m = ex.div(E(1000).pow(e.div(3).floor()));
                // @ts-ignore
                return (e.log10().gte(9) ? "" : m.toFixed(E(4).sub(e.sub(e.div(3).floor().mul(3))))) + "e" + FORMATS.eng.format(e.div(3).floor().mul(3), 0);
            }
        },
    },
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
        format (ex: ESource, acc: number, max: number): string {
            ex = E(ex);
            const e = ex.log10().floor();
            if (e.lt(303) && e.gte(max)) return format(ex, acc, max, "st");
            else return format(ex, acc, max, "sc");
        },
    },
    layer: {
        layers: ["infinity", "eternity", "reality", "equality", "affinity", "celerity", "identity", "vitality", "immunity", "atrocity"],
        format (ex: ESource, acc: number, max: number): string {
            ex = E(ex);
            const layer = ex.max(1).log10().max(1).log(INFINITY_NUM.log10()).floor();
            if (layer.lte(0)) return format(ex, acc, max, "sc");
            ex = E(10).pow(ex.max(1).log10().div(INFINITY_NUM.log10().pow(layer)).sub(layer.gte(1) ? 1 : 0));
            const meta = layer.div(10).floor();
            const layer_id = layer.toNumber() % 10 - 1;
            return format(ex, Math.max(4, acc), max, "sc") + " " + (meta.gte(1) ? "meta" + (meta.gte(2) ? "^" + format(meta, 0, max, "sc") : "") + "-" : "") + (isNaN(layer_id) ? "nanity" : FORMATS.layer.layers[layer_id]);
        },
    },
    /** Standard (letter abbv) format */
    standard: {
        /**
         * Gets the letter abbreviation for a number (e.g. 1 -> K) (0-1e3000)
         * @param x - The number to get the letter abbreviation for
         * @returns - The letter abbreviation
         */
        tier1 (x: number): string {
            return ST_NAMES[0][0][x % 10] +
            ST_NAMES[0][1][Math.floor(x / 10) % 10] +
            ST_NAMES[0][2][Math.floor(x / 100)];
        },
        /**
         * Gets the tier 2 letter abbreviation for a number (e.g. 1 -> Mi) (1e3000+)
         * @param x - The number to get the letter abbreviation for
         * @returns - The letter abbreviation
         */
        tier2 (x: number): string {
            const o = x % 10;
            const t = Math.floor(x / 10) % 10;
            const h = Math.floor(x / 100) % 10;

            let r = "";
            if (x < 10) return ST_NAMES[1][0][x];
            if (t == 1 && o == 0) r += "Vec";
            else r += ST_NAMES[1][1][o] + ST_NAMES[1][2][t];
            r += ST_NAMES[1][3][h];

            return r;
        },
    },
    inf: {
        format (ex: ESource, acc: number, max: number): string {
            ex = E(ex);
            let meta = 0;
            const inf = E(Number.MAX_VALUE);
            const symbols = ["", "∞", "Ω", "Ψ", "ʊ"];
            const symbols2 = ["", "", "m", "mm", "mmm"];
            while (ex.gte(inf)) {
                ex = ex.log(inf);
                meta++;
            }

            if (meta == 0) return format(ex, acc, max, "sc");
            if (ex.gte(3)) return symbols2[meta] + symbols[meta] + "ω^" + format(ex.sub(1), acc, max, "sc");
            if (ex.gte(2)) return symbols2[meta] + "ω" + symbols[meta] + "-" + format(inf.pow(ex.sub(2)), acc, max, "sc");
            return symbols2[meta] + symbols[meta] + "-" + format(inf.pow(ex.sub(1)), acc, max, "sc");
        },
    },
};

// console.log(EDecimal);

const INFINITY_NUM = E(2).pow(1024);
const SUBSCRIPT_NUMBERS = "₀₁₂₃₄₅₆₇₈₉";
const SUPERSCRIPT_NUMBERS = "⁰¹²³⁴⁵⁶⁷⁸⁹";

/**
 * Convert a number to a subscript
 * @param value - The value to convert
 * @returns - The value in subscript
 */
function toSubscript (value: number): string {
    return value.toFixed(0).split("")
        .map((x) => x === "-" ? "₋" : SUBSCRIPT_NUMBERS[parseInt(x, 10)])
        .join("");
}

/**
 * Convert a number to a superscript
 * @param value - The value to convert
 * @returns - The value in superscript
 */
function toSuperscript (value: number): string {
    return value.toFixed(0).split("")
        .map((x) => x === "-" ? "₋" : SUPERSCRIPT_NUMBERS[parseInt(x, 10)])
        .join("");
}

// eslint-disable-next-line
/**
 * Format the value into standard (letter abbv) format
 * @deprecated Use {@link format} instead (with the type "st")
 */
function formatST (ex: ESource, acc: number = 2, max: number = 9, type: "sc" | "st" | FormatType = "st"): string { return format(ex, acc, max, type); }

/**
 * Format the value into a specific format type
 * @param ex - The value to format
 * @param acc - The desired accuracy (number of significant figures), defaults to `2`.
 * @param max - The maximum number of EDecimal places to display, defaults to `9`.
 * @param type - The type of format to use (default "mixed_sc")
 * @returns - The formatted value
 */
function format (ex: ESource, acc: number = 2, max: number = 9, type: FormatType = "mixed_sc"): string {
    ex = E(ex);
    const neg = ex.lt(0) ? "-" : "";
    if (ex.mag == Infinity) return neg + "Infinity";
    if (Number.isNaN(ex.mag)) return neg + "NaN";
    if (ex.lt(0)) ex = ex.mul(-1);
    if (ex.eq(0)) return ex.toFixed(acc);
    const e = ex.log10().floor();
    switch (type) {
    case "sc":
    case "scientific":
        if (ex.log10().lt(Math.min(-acc, 0)) && acc > 1) {
            const e = ex.log10().ceil();
            const m = ex.div(e.eq(-1) ? E(0.1) : E(10).pow(e));
            const be = e.mul(-1).max(1).log10().gte(9);
            return neg + (be ? "" : m.toFixed(2)) + "e" + format(e, 0, max, "mixed_sc");
        } else if (e.lt(max)) {
            const a = Math.max(Math.min(acc - e.toNumber(), acc), 0);
            return neg + (a > 0 ? ex.toFixed(a) : ex.toFixed(a).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
        } else {
            if (ex.gte("eeee10")) {
                const slog = ex.slog();
                return (slog.gte(1e9) ? "" : E(10).pow(slog.sub(slog.floor())).toFixed(2)) + "F" + format(slog.floor(), 0);
            }
            const m = ex.div(E(10).pow(e));
            const be = e.log10().gte(9);
            return neg + (be ? "" : m.toFixed(2)) + "e" + format(e, 0, max, "mixed_sc");
        }
    case "st":
    case "standard":
    {
        let e3 = ex.log(1e3).floor();
        if (e3.lt(1)) {
            return neg + ex.toFixed(Math.max(Math.min(acc - e.toNumber(), acc), 0));
        } else {
            const e3_mul = e3.mul(3);
            const ee = e3.log10().floor();
            if (ee.gte(3000)) return "e" + format(e, acc, max, "st");

            let final = "";
            if (e3.lt(4)) final = ["", "K", "M", "B"][Math.round(e3.toNumber())];
            else {
                let ee3 = Math.floor(e3.log(1e3).toNumber());
                if (ee3 < 100) ee3 = Math.max(ee3 - 1, 0);
                e3 = e3.sub(1).div(E(10).pow(ee3 * 3));
                while (e3.gt(0)) {
                    const div1000 = e3.div(1e3).floor();
                    const mod1000 = e3.sub(div1000.mul(1e3)).floor().toNumber();
                    if (mod1000 > 0) {
                        if (mod1000 == 1 && !ee3) final = "U";
                        if (ee3) final = FORMATS.standard.tier2(ee3) + (final ? "-" + final : "");
                        if (mod1000 > 1) final = FORMATS.standard.tier1(mod1000) + final;
                    }
                    e3 = div1000;
                    ee3++;
                }
            }

            const m = ex.div(E(10).pow(e3_mul));
            return neg + (ee.gte(10) ? "" : (m.toFixed(E(2).sub(e.sub(e3_mul)).add(1).toNumber())) + " ") + final;
        }
    }
    default:
        // Other formats
        return neg + FORMATS[type].format(ex, acc, max);
    }
}

/**
 * Format the gain
 * @param amt - The amount
 * @param gain - The gain
 * @param type
 * @returns - The formatted gain
 * @example
 * console.log(formatGain(1e20, 1e10)); // (+1.00e10/sec)
 * console.log(formatGain(1e200, 1e210)); // (+10.00 OoMs/sec)
 */
function formatGain (amt: ESource, gain: ESource, type: FormatType = "mixed_sc"): string {
    amt = E(amt);
    gain = E(gain);
    const next = amt.add(gain);
    let rate;
    let ooms = next.div(amt);
    if (ooms.gte(10) && amt.gte(1e100)) {
        ooms = ooms.log10().mul(20);
        rate = "(+" + format(ooms, 2, 9, type) + " OoMs/sec)";
    }
    else rate = "(+" + format(gain, 2, 9, type) + "/sec)";
    return rate;
}

/**
 * Format the time
 * @param ex - The value to format (in seconds)
 * @param acc - The accuracy
 * @param type - The type
 * @returns - The formatted time
 */
function formatTime (ex: ESource, acc: number = 2, type: string = "s"): string {
    ex = E(ex);
    if (ex.gte(86400)) return format(ex.div(86400).floor(), 0, 12, "sc") + ":" + formatTime(ex.mod(86400), acc, "d");
    if (ex.gte(3600) || type == "d") return (ex.div(3600).gte(10) || type != "d" ? "" : "0") + format(ex.div(3600).floor(), 0, 12, "sc") + ":" + formatTime(ex.mod(3600), acc, "h");
    if (ex.gte(60) || type == "h") return (ex.div(60).gte(10) || type != "h" ? "" : "0") + format(ex.div(60).floor(), 0, 12, "sc") + ":" + formatTime(ex.mod(60), acc, "m");
    return (ex.gte(10) || type != "m" ? "" : "0") + format(ex, acc, 12, "sc");
}

/**
 * Format the time long
 * @param ex - The value to format (in seconds)
 * @param ms - Whether to include milliseconds
 * @param acc - The accuracy
 * @param max - The maximum value
 * @param type - The type
 * @returns - The formatted time
 */
function formatTimeLong (ex: ESource, ms = false, acc = 0, max = 9, type: FormatType = "mixed_sc"): string {
    const formatFn = (ex: ESource) => format(ex, acc, max, type);
    ex = E(ex);
    const mls = ex.mul(1000).mod(1000).floor();
    const sec = ex.mod(60).floor();
    const min = ex.div(60).mod(60).floor();
    const hour = ex.div(3600).mod(24).floor();
    const day = ex.div(86400).mod(365.2425).floor();
    const year = ex.div(31556952).floor();
    const yearStr = year.eq(1) ? " year" : " years";
    const dayStr = day.eq(1) ? " day" : " days";
    const hourStr = hour.eq(1) ? " hour" : " hours";
    const minStr = min.eq(1) ? " minute" : " minutes";
    const secStr = sec.eq(1) ? " second" : " seconds";
    const mlsStr = mls.eq(1) ? " millisecond" : " milliseconds";
    return `${year.gt(0) ? formatFn(year) + yearStr + ", " : ""}${day.gt(0) ? formatFn(day) + dayStr + ", " : ""}${hour.gt(0) ? formatFn(hour) + hourStr + ", " : ""}${min.gt(0) ? formatFn(min) + minStr + ", " : ""}${sec.gt(0) ? formatFn(sec) + secStr + "," : ""}${ms && mls.gt(0) ? " " + formatFn(mls) + mlsStr : ""}`.replace(/,([^,]*)$/, "$1").trim();
}

/**
 * Format the reduction
 * @param ex - The value to format
 * @returns - The formatted reduction
 */
function formatReduction (ex: ESource): string {
    ex = E(ex);
    return format(E(1).sub(ex).mul(100)) + "%";
}

/**
 * Format the percent
 * @param ex - The value to format
 * @returns - The formatted percent
 */
function formatPercent (ex: ESource): string {
    ex = E(ex);
    return format(ex.mul(100)) + "%";
}

/**
 * Format the multiplier
 * @param ex - The value to format
 * @param acc - The accuracy
 * @returns - The formatted multiplier
 */
function formatMult (ex: ESource, acc: number = 2): string {
    ex = E(ex);
    return ex.gte(1) ? "×" + ex.format(acc) : "/" + ex.pow(-1).format(acc);
}

/**
 * Exponential multiplier
 * @param a - The value to exponentiate
 * @param b - The exponent
 * @param base - The base
 * @returns - The value after being exponentiated
 */
function expMult (a: ESource, b: ESource, base: number = 10) {
    return EDecimal.gte(a, 10) ? EDecimal.pow(base, EDecimal.log(a, base).pow(b)) : E(a);
}

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
function metric (num: ESource, type: 0 | 1 | 2 | 3): string {
    num = E(num);
    interface IAbb {
        name: string;
        altName: string;
        value: EDecimal;
    }
    const abb = ((abbM: Omit<IAbb, "value">[]): IAbb[] => {
        return abbM.map((x, i) => {
            return {
                name: x.name,
                altName: x.altName,
                value: EDecimal.pow(1000, E(i).add(1)),
            };
        });
    })([
        {
            name: "K",
            altName: "Kilo",
        },
        {
            name: "M",
            altName: "Mega",
        },
        {
            name: "G",
            altName: "Giga",
        },
        {
            name: "T",
            altName: "Tera",
        },
        {
            name: "P",
            altName: "Peta",
        },
        {
            name: "E",
            altName: "Exa",
        },
        {
            name: "Z",
            altName: "Zetta",
        },
        {
            name: "Y",
            altName: "Yotta",
        },
        {
            name: "R",
            altName: "Ronna",
        },
        {
            name: "Q",
            altName: "Quetta",
        },
    ]);
    // console.log("ev", abb);
    let output = "";
    const abbNum = num.lte(0) ? 0 : EDecimal.min(EDecimal.log(num, 1000).sub(1), abb.length - 1).floor().toNumber();
    const abbMax = abb[abbNum];
    if (abbNum === 0) {
        switch (type) {
        case 1:
            output = "";
            break;
        case 2:
        case 0:
        default:
            output = num.format();
            break;
        }
    }
    switch (type) {
    case 1:
        output = abbMax["name"];
        break;
    case 2:
        output = `${num.divide(abbMax["value"]).format()}`;
        break;
    case 3:
        output = abbMax["altName"];
        break;
    case 0:
    default:
        output = `${num.divide(abbMax["value"]).format()} ${abbMax["name"]}`;
        break;
    }
    return output;
}
/**
 * Format the value into eV (includes metric prefixes)
 * @deprecated Use {@link metric} instead
 * @param num - The value to format
 * @param c2 - Whether to include /c^2
 * @returns The formatted value
 */
function ev (num: ESource, c2 = false) {
    return `${metric(num, 2)} ${metric(num, 1)}eV${c2 ? "/c^2" : ""}`;
}

const formats = {...FORMATS, ...{
    toSubscript,
    toSuperscript,
    formatST,
    format,
    formatGain,
    formatTime,
    formatTimeLong,
    formatReduction,
    formatPercent,
    formatMult,
    expMult,
    metric,
    ev,
}};

// Test
// /*
const testA = E(Math.random()).mul("1e" + Math.floor(Math.random() * 1e6));
console.log(testA);
const testB = E(Math.random()).mul("1e" + Math.floor(Math.random() * 1e6));
console.log(testB);

const testFormats = {
    toString: (x: ESource) => E(x).toString(),
    standard: (x: ESource) => format(x, 2, 9, "st"),
    sc: (x: ESource) => format(x, 2, 9, "sc"),
    default: format,
    gain: [formatGain],
    omega: (x: ESource) => format(x, 2, 9, "omega"),
    omega_short: (x: ESource) => format(x, 2, 9, "omega_short"),
    elemental: (x: ESource) => format(x, 2, 9, "elemental"),
    old_sc: (x: ESource) => format(x, 2, 9, "old_sc"),
    eng: (x: ESource) => format(x, 2, 9, "eng"),
    mixed_sc: (x: ESource) => format(x, 2, 9, "mixed_sc"),
    layer: (x: ESource) => format(x, 2, 9, "layer"),
    inf: (x: ESource) => format(x, 2, 9, "inf"),
    metric: metric,
    ev: ev,
    time: formatTime,
    timeLong: formatTimeLong,
    formatReduction,
    formatPercent,
    formatMult,
    expMult: [expMult],
};

console.table(Object.keys(testFormats).map((x) => {
    let value;
    try {
        if (Array.isArray((testFormats as any)[x])) {
            value = (testFormats as any)[x][0](testA, testB);
        } else {
            value = (testFormats as any)[x](testA);
        }
    } catch (e) {
        console.error(e);
        value = "Error";
    }
    return {
        format: x,
        value,
    };
}));
// end test
// */

export { formats, FORMATS, ST_NAMES, FormatType, FormatTypeList };

EDecimal.formats = formats;

// export default EDecimal;

export { EDecimal, ESource, DecimalClone };

// return EDecimal;