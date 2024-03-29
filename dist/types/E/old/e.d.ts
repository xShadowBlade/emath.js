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
    private static fromStringCache;
    sign: number;
    mag: number;
    layer: number;
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
    /**
     * Turns the given components into a valid Decimal.
     */
    static fromComponents(sign: number, layer: number, mag: number): Decimal;
    /**
     * Turns the given components into a Decimal, but not necessarily a valid one (it's only valid if the components would already create a valid Decimal without normalization). Users of this library should not use this function.
     */
    static fromComponents_noNormalize(sign: number, layer: number, mag: number): Decimal;
    /**
     * Turns the mantissa and exponent into a valid Decimal with value mantissa * 10^exponent.
     */
    static fromMantissaExponent(mantissa: number, exponent: number): Decimal;
    /**
     * Turns the mantissa and exponent into a Decimal, but not necessarily a valid one. Users of this library should not use this function.
     */
    static fromMantissaExponent_noNormalize(mantissa: number, exponent: number): Decimal;
    /**
     * Creates a deep copy of the provided value.
     */
    static fromDecimal(value: Decimal): Decimal;
    /**
     * Converts a floating-point number into a Decimal.
     */
    static fromNumber(value: number): Decimal;
    /**
     * Converts a string into a Decimal.
     *
     * If linearhyper4 is true, then strings like "10^^8.5" will use the linear approximation of tetration even for bases <= 10.
     */
    static fromString(value: string, linearhyper4?: boolean): Decimal;
    /**
     * The function used by new Decimal() to create a new Decimal. Accepts a DecimalSource: uses fromNumber if given a number, uses fromString if given a string, and uses fromDecimal if given a Decimal.
     */
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
    /**
     * Absolute value function: returns 'value' if 'value' >= 0, returns the negative of 'value' if 'value' < 0.
     */
    static abs(value: DecimalSource): Decimal;
    /**
     * Returns the negative of the given value.
     */
    static neg(value: DecimalSource): Decimal;
    /**
     * Returns the negative of the given value.
     */
    static negate(value: DecimalSource): Decimal;
    /**
     * Returns the negative of the given value.
     */
    static negated(value: DecimalSource): Decimal;
    /**
     * Returns the sign of the given value.
     */
    static sign(value: DecimalSource): number;
    /**
     * Returns the sign of the given value.
     */
    static sgn(value: DecimalSource): number;
    /**
     * Rounds the value to the nearest integer.
     */
    static round(value: DecimalSource): Decimal;
    /**
     * "Rounds" the value to the nearest integer that's less than or equal to it.
     */
    static floor(value: DecimalSource): Decimal;
    /**
     * "Rounds" the value to the nearest integer that's greater than or equal to it.
     */
    static ceil(value: DecimalSource): Decimal;
    /**
     * Extracts the integer part of the Decimal and returns it. Behaves like floor on positive numbers, but behaves like ceiling on negative numbers.
     */
    static trunc(value: DecimalSource): Decimal;
    /**
     * Addition: returns the sum of the two Decimals.
     */
    static add(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * Addition: returns the sum of the two Decimals.
     */
    static plus(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * Subtraction: returns the difference between 'value' and 'other'.
     */
    static sub(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * Subtraction: returns the difference between 'value' and 'other'.
     */
    static subtract(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * Subtraction: returns the difference between 'value' and 'other'.
     */
    static minus(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * Multiplication: returns the product of the two Decimals.
     */
    static mul(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * Multiplication: returns the product of the two Decimals.
     */
    static multiply(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * Multiplication: returns the product of the two Decimals.
     */
    static times(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * Division: returns the quotient of 'value' and 'other'.
     */
    static div(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * Division: returns the quotient of 'value' and 'other'.
     */
    static divide(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * Returns the reciprocal (1 / X) of the given value.
     */
    static recip(value: DecimalSource): Decimal;
    /**
     * Returns the reciprocal (1 / X) of the given value.
     */
    static reciprocal(value: DecimalSource): Decimal;
    /**
     * Returns the reciprocal (1 / X) of the given value.
     */
    static reciprocate(value: DecimalSource): Decimal;
    /**
     * Returns the remainder of 'value' divided by 'other': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
    static mod(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * Returns the remainder of 'value' divided by 'other': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
    static modulo(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * Returns the remainder of 'value' divided by 'other': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
    static modular(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * Returns 1 if 'value' > 'other', returns -1 if 'value' < 'other', returns 0 if 'value' == 'other'.
     */
    static cmp(value: DecimalSource, other: DecimalSource): CompareResult;
    /**
     * Compares the absolute values of this and value.
     * Returns 1 if |'value'| > |'other'|, returns -1 if |'value'| < |'other'|, returns 0 if |'value'| == |'other'|.
     */
    static cmpabs(value: DecimalSource, other: DecimalSource): CompareResult;
    /**
     * Returns 1 if 'value' > 'other', returns -1 if 'value' < 'other', returns 0 if 'value' == 'other'.
     */
    static compare(value: DecimalSource, other: DecimalSource): CompareResult;
    /**
     * Returns true if the given value is an NaN value.
     */
    static isNaN(value: DecimalSource): boolean;
    /**
     * Returns true if the given value is finite (by Decimal standards, not by floating point standards - a humongous Decimal like 10^^10^100 is still finite!)
     */
    static isFinite(value: DecimalSource): boolean;
    /**
     * The Decimal equivalent of ==. Returns true if 'value' and 'other' have equal values.
     */
    static eq(value: DecimalSource, other: DecimalSource): boolean;
    /**
     * Returns true if 'value' and 'other' have equal values.
     */
    static equals(value: DecimalSource, other: DecimalSource): boolean;
    /**
     * The Decimal equivalent of !=. Returns true if 'value' and 'other' do not have equal values.
     */
    static neq(value: DecimalSource, other: DecimalSource): boolean;
    /**
     * Returns true if 'value' and 'other' do not have equal values.
     */
    static notEquals(value: DecimalSource, other: DecimalSource): boolean;
    /**
     * The Decimal equivalent of <. Returns true if 'value' is less than 'other'.
     */
    static lt(value: DecimalSource, other: DecimalSource): boolean;
    /**
     * The Decimal equivalent of <=. Returns true if 'value' is less than or equal to 'other'.
     */
    static lte(value: DecimalSource, other: DecimalSource): boolean;
    /**
     * The Decimal equivalent of >. Returns true if 'value' is greater than 'other'.
     */
    static gt(value: DecimalSource, other: DecimalSource): boolean;
    /**
     * The Decimal equivalent of >=. Returns true if 'value' is greater than or equal to 'other'.
     */
    static gte(value: DecimalSource, other: DecimalSource): boolean;
    /**
     * Returns whichever of 'value' and 'other' is higher.
     */
    static max(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * Returns whichever of 'value' and 'other' is lower.
     */
    static min(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * Returns whichever of 'value' and 'other' has a larger absolute value.
     */
    static minabs(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * Returns whichever of 'value' and 'other' has a smaller absolute value.
     */
    static maxabs(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * A combination of minimum and maximum: the value returned by clamp is normally 'value', but it won't go below 'min' and it won't go above 'max'.
     * Therefore, if 'value' < 'min', then 'min' is returned, and if 'value' > 'max', then 'max' is returned.
     */
    static clamp(value: DecimalSource, min: DecimalSource, max: DecimalSource): Decimal;
    /**
     * Returns 'value', unless 'value' is less than 'min', in which case 'min' is returned.
     */
    static clampMin(value: DecimalSource, min: DecimalSource): Decimal;
    /**
     * Returns 'value', unless 'value' is greater than 'max', in which case 'max' is returned.
     */
    static clampMax(value: DecimalSource, max: DecimalSource): Decimal;
    /**
     * Returns 1 if 'value' is greater than 'other', returns -1 if 'value' is less than 'other', returns 0 if 'value' is equal to 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    static cmp_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): CompareResult;
    /**
     * Returns 1 if 'value' is greater than 'other', returns -1 if 'value' is less than 'other', returns 0 if 'value' is equal to 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    static compare_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): CompareResult;
    /**
     * Tests whether two Decimals are approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    static eq_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
    /**
     * Tests whether two Decimals are approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    static equals_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
    /**
     * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    static neq_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
    /**
     * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    static notEquals_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
    /**
     * Returns true if 'value' is less than 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    static lt_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
    /**
     * Returns true if 'value' is less than or equal to 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    static lte_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
    /**
     * Returns true if 'value' is greater than 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    static gt_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
    /**
     * Returns true if 'value' is greater than or equal to 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    static gte_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
    /**
     * "Positive log10": Returns the base-10 logarithm of nonnegative Decimals, but returns 0 for negative Decimals.
     */
    static pLog10(value: DecimalSource): Decimal;
    /**
     * Returns the base-10 logarithm of abs('value').
     */
    static absLog10(value: DecimalSource): Decimal;
    /**
     * Base-10 logarithm: returns the Decimal X such that 10^X = 'value'.
     * For numbers above layer 0, this is equivalent to subtracting 1 from layer and normalizing.
     */
    static log10(value: DecimalSource): Decimal;
    /**
     * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'value'.
     */
    static log(value: DecimalSource, base: DecimalSource): Decimal;
    /**
     * Base-2 logarithm: returns the Decimal X such that 2^X = 'value'.
     */
    static log2(value: DecimalSource): Decimal;
    /**
     * Base-e logarithm, also known as the "natural" logarithm: returns the Decimal X such that e^X = 'value'.
     */
    static ln(value: DecimalSource): Decimal;
    /**
     * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'value'.
     */
    static logarithm(value: DecimalSource, base: DecimalSource): Decimal;
    /**
     * Exponentiation: Returns the result of 'value' ^ 'other' (often written as 'value' ** 'other' in programming languages).
     */
    static pow(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * Raises 10 to the power of 'value', i.e. (10^'value'). For positive numbers above 1, this is equivalent to adding 1 to the value's layer and normalizing.
     */
    static pow10(value: DecimalSource): Decimal;
    /**
     * Roots are one of the inverses of exponentiation: this function finds the Decimal X such that X ^ 'other' = 'value'.
     * Equivalent to 'value' ^ (1 / 'other'), which is written here as value.pow(other.recip()).
     */
    static root(value: DecimalSource, other: DecimalSource): Decimal;
    /**
     * For positive integers, X factorial (written as X!) equals X * (X - 1) * (X - 2) *... * 3 * 2 * 1. 0! equals 1.
     * This can be extended to real numbers (except for negative integers) via the gamma function, which is what this function does.
     */
    static factorial(value: DecimalSource, _other?: never): Decimal;
    /**
     * The gamma function extends the idea of factorials to non-whole numbers using some calculus.
     * Gamma(x) is defined as the integral of t^(x-1) * e^-t dt from t = 0 to t = infinity,
     * and gamma(x) = (x - 1)! for nonnegative integer x, so the factorial for non-whole numbers is defined using the gamma function.
     */
    static gamma(value: DecimalSource, _other?: never): Decimal;
    /**
     * Returns the natural (base-e) logarithm of Gamma('value').
     */
    static lngamma(value: DecimalSource, _other?: never): Decimal;
    /**
     * Base-e exponentiation: returns e^'value'.
     */
    static exp(value: DecimalSource): Decimal;
    /**
     * Squaring a number means multiplying it by itself, a.k.a. raising it to the second power.
     */
    static sqr(value: DecimalSource): Decimal;
    /**
     * Square root: finds the Decimal X such that X * X, a.k.a X^2, equals 'value'. Equivalent to X^(1/2).
     */
    static sqrt(value: DecimalSource): Decimal;
    /**
     * Cubing a number means raising it to the third power.
     */
    static cube(value: DecimalSource): Decimal;
    /**
     * Cube root: finds the Decimal X such that X^3 equals 'value'. Equivalent to X^(1/3).
     */
    static cbrt(value: DecimalSource): Decimal;
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
    static tetrate(value: DecimalSource, height?: number, payload?: DecimalSource, linear?: boolean): Decimal;
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
    static iteratedexp(value: DecimalSource, height?: number, payload?: Decimal, linear?: boolean): Decimal;
    /**
     * iterated log/repeated log: The result of applying log(base) 'times' times in a row. Approximately equal to subtracting 'times' from the number's slog representation. Equivalent to tetrating to a negative height.
     *
     * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
    static iteratedlog(value: DecimalSource, base?: DecimalSource, times?: number, linear?: boolean): Decimal;
    /**
     * Adds/removes layers from a Decimal, even fractional layers (e.g. its slog10 representation). Very similar to tetrate base 10 and iterated log base 10.
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
    static layeradd10(value: DecimalSource, diff: DecimalSource, linear?: boolean): Decimal;
    /**
     * layeradd: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 'base' and iterated log base 'base'.
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
    static layeradd(value: DecimalSource, diff: number, base?: DecimalSource, linear?: boolean): Decimal;
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
    static slog(value: DecimalSource, base?: DecimalSource, linear?: boolean): Decimal;
    /**
     * The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
     * https://en.wikipedia.org/wiki/Lambert_W_function
     */
    static lambertw(value: DecimalSource): Decimal;
    /**
     * The super square-root function - what number, tetrated to height 2, equals 'value'? https://en.wikipedia.org/wiki/Tetration#Super-root
     */
    static ssqrt(value: DecimalSource): Decimal;
    /**
     * Super-root, one of tetration's inverses - what number, tetrated to height 'degree', equals 'value'? https://en.wikipedia.org/wiki/Tetration#Super-root
     *
     * Only works with the linear approximation of tetration, as starting with analytic and then switching to linear would result in inconsistent behavior for super-roots.
     * This only matters for non-integer degrees.
     */
    static linear_sroot(value: DecimalSource, degree: number): Decimal;
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
    static pentate(value: DecimalSource, height?: number, payload?: DecimalSource, linear?: boolean): Decimal;
    /**
     * The sine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
     */
    static sin(value: DecimalSource): Decimal;
    /**
     * The cosine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
     */
    static cos(value: DecimalSource): Decimal;
    /**
     * The tangent function, equal to sine divided by cosine. Behaves periodically with period pi.
     */
    static tan(value: DecimalSource): Decimal;
    /**
     * The arcsine function, the inverse of the sine function.
     */
    static asin(value: DecimalSource): Decimal;
    /**
     * The arccosine function, the inverse of the cosine function.
     */
    static acos(value: DecimalSource): Decimal;
    /**
     * The arctangent function, the inverse of the tangent function.
     */
    static atan(value: DecimalSource): Decimal;
    /**
     * Hyperbolic sine: sinh(X) = (e^x - e^-x)/2.
     */
    static sinh(value: DecimalSource): Decimal;
    /**
     * Hyperbolic cosine: cosh(x) = (e^x + e^-x)/2.
     */
    static cosh(value: DecimalSource): Decimal;
    /**
     * Hyperbolic tangent: tanh(x) = sinh(x)/cosh(x).
     */
    static tanh(value: DecimalSource): Decimal;
    /**
     * Hyperbolic arcsine, the inverse of hyperbolic sine.
     */
    static asinh(value: DecimalSource): Decimal;
    /**
     * Hyperbolic arccosine, the inverse of hyperbolic cosine.
     */
    static acosh(value: DecimalSource): Decimal;
    /**
     * Hyperbolic arcctangent, the inverse of hyperbolic tangent.
     */
    static atanh(value: DecimalSource): Decimal;
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
    /**
     * Turns the Decimal into a valid Decimal. This function is meant for internal purposes - users of this library should not need to use normalize.
     *
     * Note: this function mutates the Decimal it is called on.
     */
    normalize(): this;
    /**
     * Turns the given components into a valid Decimal.
     *
     * Note: this function mutates the Decimal it is called on.
     */
    fromComponents(sign: number, layer: number, mag: number): this;
    /**
     * Turns the given components into a Decimal, but not necessarily a valid one (it's only valid if the components would already create a valid Decimal without normalization). Users of this library should not use this function.
     *
     * Note: this function mutates the Decimal it is called on.
     */
    fromComponents_noNormalize(sign: number, layer: number, mag: number): this;
    /**
     * Turns the mantissa and exponent into a valid Decimal with value mantissa * 10^exponent.
     *
     * Note: this function mutates the Decimal it is called on.
     */
    fromMantissaExponent(mantissa: number, exponent: number): this;
    /**
     * Turns the mantissa and exponent into a Decimal, but not necessarily a valid one. Users of this library should not use this function.
     *
     * Note: this function mutates the Decimal it is called on.
     */
    fromMantissaExponent_noNormalize(mantissa: number, exponent: number): this;
    /**
     * Turns the Decimal that this function is called on into a deep copy of the provided value.
     *
     * Note: this function mutates the Decimal it is called on.
     */
    fromDecimal(value: Decimal): this;
    /**
     * Converts a floating-point number into a Decimal.
     *
     * Note: this function mutates the Decimal it is called on.
     */
    fromNumber(value: number): this;
    /**
     * Converts a string into a Decimal.
     *
     * If linearhyper4 is true, then strings like "10^^8.5" will use the linear approximation of tetration even for bases <= 10.
     *
     * Note: this function mutates the Decimal it is called on.
     */
    fromString(value: string, linearhyper4?: boolean): Decimal;
    /**
     * The function used by new Decimal() to create a new Decimal. Accepts a DecimalSource: uses fromNumber if given a number, uses fromString if given a string, and uses fromDecimal if given a Decimal.
     *
     * Note: this function mutates the Decimal it is called on.
     */
    fromValue(value: DecimalSource): Decimal;
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
    abs(): Decimal;
    /**
     * Negates the Decimal it's called on: in other words, when given X, returns -X.
     */
    neg(): Decimal;
    /**
     * Negates the Decimal it's called on: in other words, when given X, returns -X.
     */
    negate(): Decimal;
    /**
     * Negates the Decimal it's called on: in other words, when given X, returns -X.
     */
    negated(): Decimal;
    /**
     * Returns the sign of the Decimal it's called on. (Though, since sign is a public data member of Decimal, you might as well just call .sign instead of .sgn())
     */
    sgn(): number;
    /**
     * Rounds the Decimal it's called on to the nearest integer.
     */
    round(): this | Decimal;
    /**
     * "Rounds" the Decimal it's called on to the nearest integer that's less than or equal to it.
     */
    floor(): this | Decimal;
    /**
     * "Rounds" the Decimal it's called on to the nearest integer that's greater than or equal to it.
     */
    ceil(): this | Decimal;
    /**
     * Extracts the integer part of the Decimal and returns it. Behaves like floor on positive numbers, but behaves like ceiling on negative numbers.
     */
    trunc(): this | Decimal;
    /**
     * Addition: returns the sum of 'this' and 'value'.
     */
    add(value: DecimalSource): this | Decimal;
    /**
     * Addition: returns the sum of 'this' and 'value'.
     */
    plus(value: DecimalSource): Decimal;
    /**
     * Subtraction: returns the difference between 'this' and 'value'.
     */
    sub(value: DecimalSource): Decimal;
    /**
     * Subtraction: returns the difference between 'this' and 'value'.
     */
    subtract(value: DecimalSource): Decimal;
    /**
     * Subtraction: returns the difference between 'this' and 'value'.
     */
    minus(value: DecimalSource): Decimal;
    /**
     * Multiplication: returns the product of 'this' and 'value'.
     */
    mul(value: DecimalSource): Decimal;
    /**
     * Multiplication: returns the product of 'this' and 'value'.
     */
    multiply(value: DecimalSource): Decimal;
    /**
     * Multiplication: returns the product of 'this' and 'value'.
     */
    times(value: DecimalSource): Decimal;
    /**
     * Division: returns the quotient of 'this' and 'value'.
     */
    div(value: DecimalSource): Decimal;
    /**
     * Division: returns the quotient of 'this' and 'value'.
     */
    divide(value: DecimalSource): Decimal;
    /**
     * Division: returns the quotient of 'this' and 'value'.
     */
    divideBy(value: DecimalSource): Decimal;
    /**
     * Division: returns the quotient of 'this' and 'value'.
     */
    dividedBy(value: DecimalSource): Decimal;
    /**
     * Returns the reciprocal (1 / X) of the Decimal it's called on.
     */
    recip(): Decimal;
    /**
     * Returns the reciprocal (1 / X) of the Decimal it's called on.
     */
    reciprocal(): Decimal;
    /**
     * Returns the reciprocal (1 / X) of the Decimal it's called on.
     */
    reciprocate(): Decimal;
    /**
     * Returns the remainder of 'this' divided by 'value': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
    mod(value: DecimalSource): Decimal;
    /**
     * Returns the remainder of 'this' divided by 'value': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
    modulo(value: DecimalSource): Decimal;
    /**
     * Returns the remainder of this / value: for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
    modular(value: DecimalSource): Decimal;
    /**
     * Returns 1 if 'this' > 'value', returns -1 if 'this' < 'value', returns 0 if 'this' == 'value'.
     */
    cmp(value: DecimalSource): CompareResult;
    /**
     * Compares the absolute values of this and value.
     * Returns 1 if |'this'| > |'value'|, returns -1 if |'this'| < |'value'|, returns 0 if |'this'| == |'value'|.
     */
    cmpabs(value: DecimalSource): CompareResult;
    /**
     * Returns 1 if 'this' > 'value', returns -1 if 'this' < 'value', returns 0 if 'this' == 'value'.
     */
    compare(value: DecimalSource): CompareResult;
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
    eq(value: DecimalSource): boolean;
    /**
     * Returns true if 'this' and 'value' have equal values.
     */
    equals(value: DecimalSource): boolean;
    /**
     * The Decimal equivalent of !=. Returns true if 'this' and 'value' do not have equal values.
     */
    neq(value: DecimalSource): boolean;
    /**
     * Returns true if 'this' and 'value' do not have equal values.
     */
    notEquals(value: DecimalSource): boolean;
    /**
     * The Decimal equivalent of <. Returns true if 'this' is less than 'value'.
     */
    lt(value: DecimalSource): boolean;
    /**
     * The Decimal equivalent of <=. Returns true if 'this' is less than or equal to 'value'.
     */
    lte(value: DecimalSource): boolean;
    /**
     * The Decimal equivalent of >. Returns true if 'this' is greater than 'value'.
     */
    gt(value: DecimalSource): boolean;
    /**
     * The Decimal equivalent of >=. Returns true if 'this' is greater than or equal to 'value'.
     */
    gte(value: DecimalSource): boolean;
    /**
     * Returns whichever of 'this' and 'value' is higher.
     */
    max(value: DecimalSource): Decimal;
    /**
     * Returns whichever of 'this' and 'value' is lower.
     */
    min(value: DecimalSource): Decimal;
    /**
     * Returns whichever of 'this' and 'value' has a larger absolute value.
     */
    maxabs(value: DecimalSource): Decimal;
    /**
     * Returns whichever of 'this' and 'value' has a smaller absolute value.
     */
    minabs(value: DecimalSource): Decimal;
    /**
     * A combination of minimum and maximum: the value returned by clamp is normally 'this', but it won't go below 'min' and it won't go above 'max'.
     * Therefore, if 'this' < 'min', then 'min' is returned, and if 'this' > 'max', then 'max' is returned.
     */
    clamp(min: DecimalSource, max: DecimalSource): Decimal;
    /**
     * Returns 'this', unless 'this' is less than 'min', in which case 'min' is returned.
     */
    clampMin(min: DecimalSource): Decimal;
    /**
     * Returns 'this', unless 'this' is greater than 'max', in which case 'max' is returned.
     */
    clampMax(max: DecimalSource): Decimal;
    /**
     * Returns 1 if 'this' is greater than 'value', returns -1 if 'this' is less than 'value', returns 0 if 'this' is equal to 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    cmp_tolerance(value: DecimalSource, tolerance: number): CompareResult;
    /**
     * Returns 1 if 'this' is greater than 'value', returns -1 if 'this' is less than 'value', returns 0 if 'this' is equal to 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    compare_tolerance(value: DecimalSource, tolerance: number): CompareResult;
    /**
     * Tests whether two Decimals are approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    eq_tolerance(value: DecimalSource, tolerance: number): boolean;
    /**
     * Tests whether two Decimals are approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    equals_tolerance(value: DecimalSource, tolerance: number): boolean;
    /**
     * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    neq_tolerance(value: DecimalSource, tolerance: number): boolean;
    /**
     * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    notEquals_tolerance(value: DecimalSource, tolerance: number): boolean;
    /**
     * Returns true if 'this' is less than 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    lt_tolerance(value: DecimalSource, tolerance: number): boolean;
    /**
     * Returns true if 'this' is less than or equal to 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    lte_tolerance(value: DecimalSource, tolerance: number): boolean;
    /**
     * Returns true if 'this' is greater than 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    gt_tolerance(value: DecimalSource, tolerance: number): boolean;
    /**
     * Returns true if 'this' is greater than or equal to 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    gte_tolerance(value: DecimalSource, tolerance: number): boolean;
    /**
     * "Positive log10": Returns the base-10 logarithm of nonnegative Decimals, but returns 0 for negative Decimals.
     */
    pLog10(): Decimal;
    /**
     * Returns the base-10 logarithm of abs('this').
     */
    absLog10(): Decimal;
    /**
     * Base-10 logarithm: returns the Decimal X such that 10^X = 'this'.
     * For numbers above layer 0, this is equivalent to subtracting 1 from layer and normalizing.
     */
    log10(): Decimal;
    /**
     * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'this'.
     */
    log(base: DecimalSource): Decimal;
    /**
     * Base-2 logarithm: returns the Decimal X such that 2^X = 'this'.
     */
    log2(): Decimal;
    /**
     * Base-e logarithm, also known as the "natural" logarithm: returns the Decimal X such that e^X = 'this'.
     */
    ln(): Decimal;
    /**
     * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'this'.
     */
    logarithm(base: DecimalSource): Decimal;
    /**
     * Exponentiation: Returns the result of 'this' ^ 'value' (often written as 'this' ** 'value' in programming languages).
     */
    pow(value: DecimalSource): Decimal;
    /**
     * Raises 10 to the power of 'this', i.e. (10^'this'). For positive numbers above 1, this is equivalent to adding 1 to layer and normalizing.
     */
    pow10(): Decimal;
    /**
     * Exponentiation: Returns the result of 'value' ^ 'this' (often written as 'value' ** 'this' in programming languages).
     */
    pow_base(value: DecimalSource): Decimal;
    /**
     * Roots are one of the inverses of exponentiation: this function finds the Decimal X such that X ^ 'value' = 'this'.
     * Equivalent to 'this' ^ (1 / 'value'), which is written here as this.pow(value.recip()).
     */
    root(value: DecimalSource): Decimal;
    /**
     * For positive integers, X factorial (written as X!) equals X * (X - 1) * (X - 2) *... * 3 * 2 * 1. 0! equals 1.
     * This can be extended to real numbers (except for negative integers) via the gamma function, which is what this function does.
     */
    factorial(): Decimal;
    /**
     * The gamma function extends the idea of factorials to non-whole numbers using some calculus.
     * Gamma(x) is defined as the integral of t^(x-1) * e^-t dt from t = 0 to t = infinity,
     * and gamma(x) = (x - 1)! for nonnegative integer x, so the factorial for non-whole numbers is defined using the gamma function.
     */
    gamma(): Decimal;
    /**
     * Returns the natural logarithm of Gamma('this').
     */
    lngamma(): Decimal;
    /**
     * Base-e exponentiation: returns e^'this'.
     */
    exp(): Decimal;
    /**
     * Squaring a number means multiplying it by itself, a.k.a. raising it to the second power.
     */
    sqr(): Decimal;
    /**
     * Square root: finds the Decimal X such that X * X, a.k.a X^2, equals 'this'. Equivalent to X^(1/2).
     */
    sqrt(): Decimal;
    /**
     * Cubing a number means raising it to the third power.
     */
    cube(): Decimal;
    /**
     * Cube root: finds the Decimal X such that X^3 equals 'this'. Equivalent to X^(1/3).
     */
    cbrt(): Decimal;
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
    tetrate(height?: number, payload?: DecimalSource, linear?: boolean): Decimal;
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
    iteratedexp(height?: number, payload?: Decimal, linear?: boolean): Decimal;
    /**
     * iterated log/repeated log: The result of applying log(base) 'times' times in a row. Approximately equal to subtracting 'times' from the number's slog representation. Equivalent to tetrating to a negative height.
     *
     * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
    iteratedlog(base?: DecimalSource, times?: number, linear?: boolean): Decimal;
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
    slog(base?: DecimalSource, iterations?: number, linear?: boolean): Decimal;
    slog_internal(base?: DecimalSource, linear?: boolean): Decimal;
    static slog_critical(base: number, height: number): number;
    static tetrate_critical(base: number, height: number): number;
    static critical_section(base: number, height: number, grid: number[][], linear?: boolean): number;
    /**
     * Adds/removes layers from a Decimal, even fractional layers (e.g. its slog10 representation). Very similar to tetrate base 10 and iterated log base 10.
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
    layeradd10(diff: DecimalSource, linear?: boolean): Decimal;
    /**
     * layeradd: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 'base' and iterated log base 'base'.
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
    layeradd(diff: number, base: DecimalSource, linear?: boolean): Decimal;
    /**
     * The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
     * https://en.wikipedia.org/wiki/Lambert_W_function
     */
    lambertw(): Decimal;
    /**
     * The super square-root function - what number, tetrated to height 2, equals 'this'? https://en.wikipedia.org/wiki/Tetration#Super-root
     */
    ssqrt(): Decimal;
    /**
     * Super-root, one of tetration's inverses - what number, tetrated to height 'degree', equals 'this'? https://en.wikipedia.org/wiki/Tetration#Super-root
     *
     * Only works with the linear approximation of tetration, as starting with analytic and then switching to linear would result in inconsistent behavior for super-roots.
     * This only matters for non-integer degrees.
     */
    linear_sroot(degree: number): Decimal;
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
    pentate(height?: number, payload?: DecimalSource, linear?: boolean): Decimal;
    /**
     * The sine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
     */
    sin(): this | Decimal;
    /**
     * The cosine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
     */
    cos(): Decimal;
    /**
     * The tangent function, equal to sine divided by cosine. Behaves periodically with period pi.
     */
    tan(): this | Decimal;
    /**
     * The arcsine function, the inverse of the sine function.
     */
    asin(): this | Decimal;
    /**
     * The arccosine function, the inverse of the cosine function.
     */
    acos(): Decimal;
    /**
     * The arctangent function, the inverse of the tangent function.
     */
    atan(): this | Decimal;
    /**
     * Hyperbolic sine: sinh(X) = (e^x - e^-x)/2.
     */
    sinh(): Decimal;
    /**
     * Hyperbolic cosine: cosh(x) = (e^x + e^-x)/2.
     */
    cosh(): Decimal;
    /**
     * Hyperbolic tangent: tanh(x) = sinh(x)/cosh(x).
     */
    tanh(): Decimal;
    /**
     * Hyperbolic arcsine, the inverse of hyperbolic sine.
     */
    asinh(): Decimal;
    /**
     * Hyperbolic arccosine, the inverse of hyperbolic cosine.
     */
    acosh(): Decimal;
    /**
     * Hyperbolic arcctangent, the inverse of hyperbolic tangent.
     */
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
    static formats: typeof formats;
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
    static smoothDamp(current: DecimalSource, target: DecimalSource, smoothing: DecimalSource, deltaTime: DecimalSource): Decimal;
    /**
     * Creates a clone of the E instance.
     * @deprecated
     * @returns A EClone instance that is a clone of the original.
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
     * Applies a soft cap to a DecimalClone value using a specified soft cap function.
     * @param start - The value at which the soft cap starts.
     * @param power - The power or factor used in the soft cap calculation.
     * @param mode - The soft cap mode. Use "pow" for power soft cap, "mul" for multiplication soft cap,
     *                       or "exp" for exponential soft cap.
     * @returns - The DecimalClone value after applying the soft cap.
     */
    softcap(start: DecimalSource, power: number, mode: string): Decimal;
    static softcap(value: DecimalSource, start: DecimalSource, power: number, mode: string): Decimal;
    /**
     * Scales a currency value using a specified scaling function.
     * @param s - The value at which scaling starts.
     * @param p - The scaling factor.
     * @param mode - The scaling mode. Use "pow" for power scaling or "exp" for exponential scaling.
     * @param [rev] - Whether to reverse the scaling operation (unscaling).
     * @returns - The scaled currency value.
     */
    scale(s: DecimalSource, p: DecimalSource, mode: string | number, rev?: boolean): Decimal;
    static scale(value: DecimalSource, s: DecimalSource, p: DecimalSource, mode: string | number, rev?: boolean): Decimal;
    /**
     * Formats the E instance with a specified accuracy and maximum decimal places.
     * @param [acc] - The desired accuracy (number of significant figures), defaults to `2`.
     * @param [max] - The maximum number of decimal places to display, defaults to `9`.
     * @param [type] - The type of format, defaults to `"mixed_sc"`.
     * @returns A string representing the formatted E value.
     */
    format(acc?: number, max?: number, type?: FormatType): string;
    /**
     * Formats the E instance with a specified accuracy and maximum decimal places.
     * @param e - The E instance to format.
     * @param [acc] - The desired accuracy (number of significant figures), defaults to `2`.
     * @param [max] - The maximum number of decimal places to display, defaults to `9`.
     * @param [type] - The type of format, defaults to `"mixed_sc"`.
     * @returns A string representing the formatted E value.
     */
    static format(e: DecimalSource, acc?: number, max?: number, type?: FormatType): string;
    /**
     * Formats the E instance in standard leter notation with a specified accuracy and maximum decimal places.
     * @param [acc] - The desired accuracy (number of significant figures).
     * @param [max] - The maximum number of decimal places to display.
     * @param [type] - The type of format (default standard)
     * @returns A string representing the formatted E value.
     */
    formatST(acc?: number, max?: number, type?: FormatType): string;
    static formatST(value: DecimalSource, acc?: number, max?: number, type?: FormatType): string;
    /**
     * Formats the gain rate using the E instance.
     * @param gain - The gain value to compare
     * @param [mass] - Indicates whether the gain represents a mass value.
     * @param [type] - The type of format (default mixed scientific)
     * @returns A string representing the formatted gain
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
     * @param [max] - Max before it returns the original
     * @returns A string representing the Roman numeral equivalent of the E value,
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
 * @param ex - The value to format (in seconds)
 * @param acc - The accuracy
 * @param type - The type
 * @returns - The formatted time
 */
declare function formatTime(ex: DecimalSource, acc?: number, type?: string): string;
/**
 * Format the time long
 * @param ex - The value to format (in seconds)
 * @param ms - Whether to include milliseconds
 * @param acc - The accuracy
 * @param max - The maximum value
 * @param type - The type
 * @returns - The formatted time
 */
declare function formatTimeLong(ex: DecimalSource, ms?: boolean, acc?: number, max?: number, type?: FormatType): string;
/**
 * Format the reduction
 * @param ex - The value to format
 * @returns - The formatted reduction
 */
declare function formatReduction(ex: DecimalSource): string;
/**
 * Format the percent
 * @param ex - The value to format
 * @returns - The formatted percent
 */
declare function formatPercent(ex: DecimalSource): string;
/**
 * Format the multiplier
 * @param ex - The value to format
 * @param acc - The accuracy
 * @returns - The formatted multiplier
 */
declare function formatMult(ex: DecimalSource, acc?: number): string;
/**
 * Exponential multiplier
 * @param a - The value to exponentiate
 * @param b - The exponent
 * @param base - The base
 * @returns - The value after being exponentiated
 */
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
declare function metric(num: DecimalSource, type: 0 | 1 | 2 | 3): string;
/**
 * Format the value into eV (includes metric prefixes)
 * @deprecated Use {@link metric} instead
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
