/**
 * @file idk use black magic and type gymnastics to make this work or something
 */
import Decimal, { DecimalSource, CompareResult } from "break_eternity.js";
declare let EDecimal: typeof DecimalClone & {
    new (value?: ESource): EDecimal;
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
    m: number;
    e: number;
    s: number;
    mantissa: number;
    exponent: number;
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
};
type EDecimal = DecimalClassInstance;
type ESource = DecimalSource | (InstanceType<typeof DecimalClone>);
type DecimalClassInstance = InstanceType<typeof DecimalClone> & {
    sign: number;
    mag: number;
    layer: number;
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
};
declare class DecimalClone {
    /**
     * WARNING: DO NOT USE THIS CONSTRUCTOR.
     */
    static formats: typeof FORMATS;
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
    static smoothDamp: (current: ESource, target: ESource, smoothing: ESource, deltaTime: ESource) => EDecimal;
    /**
     * Creates a clone of the E instance. Helps with a webpack(?) bug
     * @alias EDecimal.normalizeFromComponents
     * @param x - The number to clone
     * @returns - The cloned number
     */
    static clone: (x: EDecimal) => EDecimal;
    static softcap: (value: ESource, start: ESource, power: number, mode: string) => EDecimal;
    static scale: (value: ESource, s: ESource, p: ESource, mode: string | number, rev?: boolean) => EDecimal;
    /**
     * Creates a clone of the EDecimal instance.
     * @deprecated
     * @returns A EDecimal instance that is a clone of the original.
     */
    clone: (this: EDecimal) => EDecimal;
    /**
     * Applies a soft cap to a EDecimal value using a specified soft cap function.
     * @param start - The value at which the soft cap starts.
     * @param power - The power or factor used in the soft cap calculation.
     * @param mode - The soft cap mode. Use "pow" for power soft cap, "mul" for multiplication soft cap,
     * or "exp" for exponential soft cap.
     * @returns The EDecimal value after applying the soft cap.
     */
    softcap: (this: EDecimal, start: ESource, power: number, mode: string) => EDecimal;
    /**
     * Scales a currency value using a specified scaling function.
     * @param s - The value at which scaling starts.
     * @param p - The scaling factor.
     * @param mode - The scaling mode. Use "pow" for power scaling or "exp" for exponential scaling.
     * @param rev - Whether to reverse the scaling operation
     * @returns The scaled currency value.
     */
    scale: (this: EDecimal, s: ESource, p: ESource, mode: string | number, rev?: boolean) => EDecimal;
    /**
     * Formats the E instance with a specified accuracy and maximum EDecimal places.
     * @param [acc] - The desired accuracy (number of significant figures), defaults to `2`.
     * @param [max] - The maximum number of EDecimal places to display, defaults to `9`.
     * @param [type] - The type of format, defaults to `"mixed_sc"`.
     * @returns A string representing the formatted E value.
     */
    format: (this: EDecimal, acc?: number, max?: number, type?: FormatType) => string;
    /**
     * Formats the E instance with a specified accuracy and maximum EDecimal places.
     * @param e - The E instance to format.
     * @param [acc] - The desired accuracy (number of significant figures), defaults to `2`.
     * @param [max] - The maximum number of EDecimal places to display, defaults to `9`.
     * @param [type] - The type of format, defaults to `"mixed_sc"`.
     * @returns A string representing the formatted E value.
     */
    static format: (e: ESource, acc?: number, max?: number, type?: FormatType) => string;
    /**
     * Formats the E instance in standard leter notation with a specified accuracy and maximum EDecimal places.
     * @param [acc] - The desired accuracy (number of significant figures).
     * @param [max] - The maximum number of EDecimal places to display.
     * @param [type] - The type of format (default standard)
     * @returns A string representing the formatted E value.
     */
    formatST: (this: EDecimal, acc?: number, max?: number, type?: FormatType) => string;
    static formatST: (value: ESource, acc?: number, max?: number, type?: FormatType) => string;
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
    formatGain: (this: EDecimal, gain: ESource, type?: FormatType) => string;
    static formatGain: (value: ESource, gain: ESource, type?: FormatType) => string;
    /**
     * Converts the E instance to a Roman numeral representation.
     * @param [max] - Max before it returns the original
     * @returns A string representing the Roman numeral equivalent of the E value,
     * or the original E instance if it is greater than or equal to 5000 or less than 1.
     */
    toRoman: (this: EDecimal, max?: ESource) => string | EDecimal;
    static toRoman: (this: EDecimal, value: ESource, max: ESource) => string | EDecimal;
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
        format(value: ESource): string;
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
        format(value: ESource): string;
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
        getAbbreviationAndValue(x: EDecimal): (string | DecimalClassInstance)[];
        formatElementalPart(abbreviation: string, n: EDecimal): string;
        format(value: EDecimal, acc: number): string;
    };
    /** Old scientific format */
    old_sc: {
        /**
         * Format the value into old scientific format
         * @param ex - The value to format
         * @param acc - The accuracy
         * @returns - The formatted value
         */
        format(ex: ESource, acc: number): string;
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
        format(ex: ESource, acc: number): string;
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
        format(ex: ESource, acc: number, max: number): string;
    };
    layer: {
        layers: string[];
        format(ex: ESource, acc: number, max: number): string;
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
        format(ex: ESource, acc: number, max: number): string;
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
declare function formatST(ex: ESource, acc?: number, max?: number, type?: "sc" | "st" | FormatType): string;
/**
 * Format the value into a specific format type
 * @param ex - The value to format
 * @param acc - The desired accuracy (number of significant figures), defaults to `2`.
 * @param max - The maximum number of EDecimal places to display, defaults to `9`.
 * @param type - The type of format to use (default "mixed_sc")
 * @returns - The formatted value
 */
declare function format(ex: ESource, acc?: number, max?: number, type?: FormatType): string;
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
declare function formatGain(amt: ESource, gain: ESource, type?: FormatType): string;
/**
 * Format the time
 * @param ex - The value to format (in seconds)
 * @param acc - The accuracy
 * @param type - The type
 * @returns - The formatted time
 */
declare function formatTime(ex: ESource, acc?: number, type?: string): string;
/**
 * Format the time long
 * @param ex - The value to format (in seconds)
 * @param ms - Whether to include milliseconds
 * @param acc - The accuracy
 * @param max - The maximum value
 * @param type - The type
 * @returns - The formatted time
 */
declare function formatTimeLong(ex: ESource, ms?: boolean, acc?: number, max?: number, type?: FormatType): string;
/**
 * Format the reduction
 * @param ex - The value to format
 * @returns - The formatted reduction
 */
declare function formatReduction(ex: ESource): string;
/**
 * Format the percent
 * @param ex - The value to format
 * @returns - The formatted percent
 */
declare function formatPercent(ex: ESource): string;
/**
 * Format the multiplier
 * @param ex - The value to format
 * @param acc - The accuracy
 * @returns - The formatted multiplier
 */
declare function formatMult(ex: ESource, acc?: number): string;
/**
 * Exponential multiplier
 * @param a - The value to exponentiate
 * @param b - The exponent
 * @param base - The base
 * @returns - The value after being exponentiated
 */
declare function expMult(a: ESource, b: ESource, base?: number): DecimalClassInstance;
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
declare function metric(num: ESource, type: 0 | 1 | 2 | 3): string;
/**
 * Format the value into eV (includes metric prefixes)
 * @deprecated Use {@link metric} instead
 * @param num - The value to format
 * @param c2 - Whether to include /c^2
 * @returns The formatted value
 */
declare function ev(num: ESource, c2?: boolean): string;
declare const formats: {
    toSubscript: typeof toSubscript;
    toSuperscript: typeof toSuperscript;
    formatST: typeof formatST;
    format: typeof format;
    formatGain: typeof formatGain;
    formatTime: typeof formatTime;
    formatTimeLong: typeof formatTimeLong;
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
        format(value: ESource): string;
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
        format(value: ESource): string;
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
        getAbbreviationAndValue(x: EDecimal): (string | DecimalClassInstance)[];
        formatElementalPart(abbreviation: string, n: EDecimal): string;
        format(value: EDecimal, acc: number): string;
    };
    /** Old scientific format */
    old_sc: {
        /**
         * Format the value into old scientific format
         * @param ex - The value to format
         * @param acc - The accuracy
         * @returns - The formatted value
         */
        format(ex: ESource, acc: number): string;
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
        format(ex: ESource, acc: number): string;
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
        format(ex: ESource, acc: number, max: number): string;
    };
    layer: {
        layers: string[];
        format(ex: ESource, acc: number, max: number): string;
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
        format(ex: ESource, acc: number, max: number): string;
    };
};
export { formats, FORMATS, ST_NAMES, FormatType, FormatTypeList };
export { EDecimal, ESource, DecimalClone };
