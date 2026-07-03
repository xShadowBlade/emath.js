/**
 * @file Declares the numerical analysis functions (inverse function approximation, sum calculation).
 */
import type { DecimalSource } from "../../E/e";
import { Decimal, f_maglog10 } from "../../E/e";

/**
 * The default amount of iterations to perform for the inverse function approximation and sum calculation.
 * Can be overridden by passing a custom amount of iterations.
 *
 * Notes:
 * - The higher the amount of iterations, the more accurate the result will be, but the longer it will take to calculate.
 * - Time complexity is O(n) where n is the amount of iterations, scaling with the complexity of the function.
 *
 * Behold the extremely inaccurate benchmarking results:
 * - At 10 or less iterations, the time it takes to calculate is almost instant.
 * - At 25 iterations, the time it takes to calculate is ~1 ms and is accurate to a margin of error of ~1e-3.
 * - At 35 iterations, the time it takes to calculate is ~2 ms and is accurate to a margin of error of ~1e-5.
 * - At 50 iterations, the time it takes to calculate is ~3 ms and is accurate to a margin of error of ~1e-7.
 * - At 100 iterations, the time it takes to calculate is ~2 ms but with marginal accuracy improvements.
 * - At 1000 iterations, the time it takes to calculate is ~7 ms but with very marginal accuracy improvements.
 * - At 10000 iterations, the time it takes to calculate is ~30 ms.
 * @default 30
 */
const DEFAULT_ITERATIONS = 30;
const DEFAULT_ITERATIONS_AS_DECIMAL: Readonly<Decimal> = new Decimal(DEFAULT_ITERATIONS);

/**
 * The default tolerance to compare the values with.
 * Can be overridden by passing a custom tolerance.
 *
 * Used by:
 * - {@link geometricEqualsTolerance}
 * - {@link calculateSum} and {@link calculateSumApprox}, the latter of which uses the tolerance * 2 for speed.
 * - {@link roundingBase}
 * @default 5e-5
 */
const DEFAULT_TOLERANCE = 1e-4;

/**
 * Represents different methods to calculate the mean.
 *
 * - Mode 1 `"arithmetic"` `(a+b)/2` is a bit faster but way less accurate for large numbers.
 * - Mode 2 `"geometric"` `sqrt(ab)` is more accurate, and is the default.
 * - Mode 3 `"harmonic"` `2/(1/a+1/b)` is the slowest. You probably don't need this.
 * - Mode 4 `"logarithmic"` `10^sqrt(log10(a)*log10(b))` is the most "accurate" and slightly slower.
 */
enum MeanMode {
    /**
     * The arithmetic mean of two values.
     * @example (a + b) / 2
     */
    arithmetic = 1,

    /**
     * The geometric mean of two values.
     * @example sqrt(a * b)
     */
    geometric = 2,

    /**
     * The harmonic mean of two values.
     * @example 2 / (1/a + 1/b)
     */
    harmonic = 3,

    /**
     * The logarithmic mean of two values.
     * @example 10^sqrt(log10(a) * log10(b))
     */
    logarithmic = 4,

    /**
     * See {@link decimalMagGeometricMean}.
     */
    // tetrational = 5,
}

const oneHalf = Decimal.dTwo.recip();

/**
 * Calculates the mean of two values using a specified method.
 * @param a - The first value.
 * @param b - The second value.
 * @param mode - The mode/mean method to use. See {@link MeanMode}
 * @returns The mean of the two values, as a {@link Decimal}.
 */
export function mean(a: DecimalSource, b: DecimalSource, mode: MeanMode = MeanMode.geometric): Decimal {
    a = Decimal.fromValue_noAlloc(a);
    b = Decimal.fromValue_noAlloc(b);

    switch (mode) {
        case MeanMode.arithmetic:
            return a.add(b).mul(oneHalf);
        case MeanMode.geometric:
        default:
            return a.mul(b).sqrt();
        case MeanMode.harmonic:
            return Decimal.dTwo.div(a.reciprocal().add(b.reciprocal()));
        case MeanMode.logarithmic:
            return Decimal.pow10(a.log10().mul(b.log10()).sqrt());
        // case MeanMode.tetrational:
        //     return decimalMagGeometricMean(a, b);
    }
}

/**
 * The configuration object for the {@link geometricEqualsTolerance} function.
 */
interface EqualsToleranceConfig {
    /**
     * Whether to log the values (a, b, tolerance, config, diff, result) to the console.
     * - `true` - Log the values to the console.
     * - `false` - Do not log the values to the console.
     * - `"onlyOnFail"` - Only log the values to the console if the result is `false`.
     */
    verbose: boolean | "onlyOnFail";

    /**
     * The mode/mean method to use. See {@link MeanMode}
     */
    mode: MeanMode;
}

/**
 * Compares two values for equality within a specified tolerance, using a geometric comparison method that takes into account the magnitude of the values.
 * @param a - The first value.
 * @param b - The second value.
 * @param tolerance - The tolerance to compare the values with.
 * @param verbose - Whether to log the values (a, b, tolerance, config, diff, result) to the console. See {@link EqualsToleranceConfig.verbose}.
 * @returns Whether the values are equal within the tolerance.
 */
function geometricEqualsTolerance(
    a: DecimalSource,
    b: DecimalSource,
    tolerance: number = DEFAULT_TOLERANCE,
    verbose: boolean | "onlyOnFail" = false,
): boolean {
    // Convert the values to Decimal instances
    a = Decimal.fromValue_noAlloc(a);
    b = Decimal.fromValue_noAlloc(b);

    const diff = decimalMagDifference(a, b) - 1;

    const result = Math.abs(diff) < tolerance;
    if (verbose === true || (verbose === "onlyOnFail" && !result)) {
        console.log({ a, b, tolerance, diff, result });
    }

    return result;
}

/**
 * Calculates the difference in magnitude between two Decimal values.
 * The difference is calculated as the ratio of the magnitudes of the two values, taking into account their layers.
 * If the layers differ by 2 or more, the difference is considered infinite (if a is larger) or zero (if b is larger).
 * @param a - The first Decimal value.
 * @param b - The second Decimal value.
 * @returns The difference in magnitude between the two Decimal values. A value of 1 means they are of the same magnitude, a value greater than 1 means a is larger, and a value less than 1 means b is larger.
 */
function decimalMagDifference(a: DecimalSource, b: DecimalSource): number {
    a = Decimal.fromValue_noAlloc(a);
    b = Decimal.fromValue_noAlloc(b);

    // Same layer, just compare the magnitudes
    if (a.layer === b.layer) {
        return a.mag / b.mag;
    }

    // If differ by too much, consider the difference to be infinite or zero
    if (a.layer - b.layer >= 2) {
        return Infinity;
    }
    if (a.layer - b.layer <= -2) {
        return 0;
    }

    // If they differ by 1 layer, compare the magnitude of the larger one to the log10 of the smaller one
    // TODO: test negative mag
    if (a.layer > b.layer) {
        return a.mag / f_maglog10(b.mag);
    } else {
        return f_maglog10(a.mag) / b.mag;
    }
}

// function decimalMagGeometricMean(a: Decimal, b: Decimal): Decimal {
//     // if (a.layer === b.layer) {
//     //     // No need to worry about a.mag * b.mag being infinity as normalization means the mag has to be < 9e15
//     //     return Decimal.fromComponents(1, a.layer, Math.sqrt(a.mag * b.mag));
//     // }

//     // const averageLayer = (a.layer + b.layer) / 2;

//     // return Decimal.dTen.tetrate(averageLayer, Math.sqrt(a.mag * b.mag));

//     // return Decimal.fromComponents(1, a.layer, Math.sqrt(a.mag * b.mag));

//     // test
//     // return Decimal.dTen.tetrate((a.slog(10).toNumber() + b.slog(10).toNumber()) / 2);
// }

/**
 * Function to round a number to the nearest power of a specified base.
 * @param x - The number to round.
 * @param base - The power base to round to. Defaults to `10`. Must be greater than `1` (can be fractional, although not recommended).
 * @param acc - The accuracy / significant figures to round to. Defaults to `0`. Must be greater than `1`.
 * @param max - The maximum power to round to. Defaults to `1000`. If x > base^max, x is returned.
 * @returns - The rounded number, as a {@link Decimal}. If parameters are invalid, returns {@link Decimal.dNaN}.
 * @example
 * roundingBase(123456789, 10); // 100000000
 * roundingBase(123456789, 10, 1); // 120000000
 * roundingBase(123456789, 10, 2); // 123000000
 * roundingBase(245, 2); // 256
 */
function roundingBase(
    x: DecimalSource,
    base: DecimalSource = Decimal.dTen,
    acc: DecimalSource = Decimal.dZero,
    // max: DecimalSource = 1000,
): Decimal {
    // Normalize the inputs
    x = Decimal.fromValue_noAlloc(x);
    base = Decimal.fromValue_noAlloc(base);
    acc = Decimal.fromValue_noAlloc(acc);
    // max = Decimal.fromValue_noAlloc(max);

    // If base or acc is less than 1, return NaN
    if (base.lt(Decimal.dOne) || acc.lt(Decimal.dOne)) return Decimal.dNaN;

    // If the number is negative, round it as positive and then add the sign back
    const xSign = x.sign;
    x = x.abs();

    const isBaseTen = base.equals(Decimal.dTen);

    // If the number is too large, don't round it
    // if (x.gte(Decimal.pow(base, max))) return x;

    /**
     * The power of the number, rounded. acc^power = x.
     * It is the highest power of the base that is less than x.
     * For example, if x = 123 and base = 10, power = 2.
     */
    const powerN = isBaseTen ? x.log10().floor() : x.log(base).floor();

    const highestSignificantNumber = isBaseTen ? powerN.pow10() : base.pow(powerN);
    const factorToScaleWhenRounding = isBaseTen ? acc.pow10() : base.pow(acc);

    // First, divide the number by the base^powerN. This will give us a number between 1 and base, which we can round.
    // Example: 123 / 10^2 = 1.23
    let out = x.div(highestSignificantNumber);

    // Round the number to the accuracy
    // Example, with an accuracy of 1: 1.23 -> 1.2
    out = out.mul(factorToScaleWhenRounding).round().div(factorToScaleWhenRounding);

    // Multiply the number by the base^powerN and add the sign back
    out = out.mul(highestSignificantNumber);
    out.sign = xSign;

    return out;
}

/**
 * Approximates the derivative of a function at a given point using the difference quotient method.
 * Assumes that the function is differentiable at the given point and the derivative is not zero.
 * @param f - The function to differentiate. Must be a function that takes a Decimal and returns a Decimal.
 * @param x - The point at which to approximate the derivative.
 * @param epsilon - The small value to use for the difference quotient. Defaults to `1e-12`, which is a good balance between accuracy and avoiding numerical instability for most functions. Can be adjusted for specific functions or ranges of x.
 * @returns The approximate derivative of the function at the given point, as a {@link Decimal}.
 * @example
 * const f = (x: Decimal) => x.pow(2).mul(2).add(x.mul(3)).add(5);
 * approximateDerivative(f, 10); // 23
 */
function approximateDerivative(f: (x: Decimal) => Decimal, x: DecimalSource, epsilon = 1e-12): Decimal {
    x = Decimal.fromValue_noAlloc(x);
    const fX = f(x);

    // Choose a delta x that is small relative to x. Using a fixed small delta can cause issues with very large or very small x, so we can use a delta that is a small fraction of x.
    let xPlusH = Decimal.fromComponents(x.sign, x.layer, x.mag * (1 + epsilon));
    let fXPlusH = f(xPlusH);

    // If f(x+h) = f(x), try a larger epsilon to avoid numerical instability
    while (fXPlusH.equals(fX) && epsilon < 1) {
        epsilon *= 10;
        xPlusH = Decimal.fromComponents(x.sign, x.layer, x.mag * (1 + epsilon));
        fXPlusH = f(xPlusH);
    }

    const deltaX = xPlusH.sub(x);

    // debug
    // console.log({ x, xPlusH, deltaX, f_x: f(x), f_xPlusH: f(xPlusH) });

    return fXPlusH.sub(fX).div(deltaX);
}

/**
 * Uses the Newton-Raphson method to find a root of the function f, starting from an initial guess.
 * @param initialGuess - The initial guess for the root.
 * @param f - The function for which to find the root.
 * @param fPrime - The derivative of the function. If not provided, it will be approximated using the {@link approximateDerivative} function.
 * @param tolerance - The tolerance for convergence. The method will stop when the difference between successive approximations is less than or equal to this value. Defaults to {@link DEFAULT_TOLERANCE}.
 * @param maxIterations - The maximum number of iterations to perform. Defaults to {@link DEFAULT_ITERATIONS}.
 * @returns An approximation of the root of the function, as a {@link Decimal}.
 * @example
 * const f = (x: Decimal) => x.pow(2).mul(2).add(x.mul(3)).add(5);
 * const fPrime = (x: Decimal) => x.mul(4).add(3);
 * newtonRaphson(10, f, fPrime); // Approximately -0.780776406404415
 */
function newtonRaphson(
    initialGuess: DecimalSource,
    f: (x: Decimal) => Decimal,
    fPrime?: (x: Decimal) => Decimal,
    tolerance: number = DEFAULT_TOLERANCE,
    maxIterations: number = DEFAULT_ITERATIONS,
): Decimal {
    let x = Decimal.fromValue_noAlloc(initialGuess);

    fPrime ??= (x): Decimal => approximateDerivative(f, x);

    for (let i = 0; i < maxIterations; i++) {
        const fx = f(x);
        const fxPrime = fPrime(x);

        // Check if derivative is 0 to avoid divide by 0
        if (fxPrime.equals(Decimal.dZero)) {
            console.warn("eMath.js: Derivative is zero. No solution found. Returning current approximation.");
            return x;
        }

        const xNext = x.sub(fx.div(fxPrime));

        // If the difference between successive approximations is less than or equal to the tolerance, we have converged to a solution
        if (geometricEqualsTolerance(xNext, x)) {
            return xNext;
        }

        // debug
        // console.log({
        //     i,
        //     xNext,
        //     fx,
        //     fxPrime,
        // });

        x = xNext;
    }

    return x;
}

export {
    geometricEqualsTolerance,
    approximateDerivative,
    newtonRaphson,
    decimalMagDifference,
    roundingBase,
    DEFAULT_ITERATIONS,
    DEFAULT_ITERATIONS_AS_DECIMAL,
    DEFAULT_TOLERANCE,
    MeanMode,
};
export type { EqualsToleranceConfig };

// test
// const testFunc = (x: Decimal) => x.pow(2).mul(2).add(x.mul(3)).add(5);
// const testFuncDerivative = (x: Decimal) => x.mul(4).add(3);

// const testFunc = (x: Decimal) => Decimal.exp(x);
// const testFuncDerivative = (x: Decimal) => Decimal.exp(x);

// const testFunc = (x: Decimal) => Decimal.pow(x, x);
// const testFuncDerivative = (x: Decimal) => Decimal.pow(x, x).mul(Decimal.ln(x).add(1));

// const xTests: Decimal[] = Array.from({ length: 20 }, (_, i) => Decimal.dTwo.pow(i * 2));

// const results = xTests.map((x) => ({
//     x: x.toString(),
//     approx: approximateDerivative(testFunc, x).toString(),
//     actual: testFuncDerivative(x).toString(),
//     differenceMult: approximateDerivative(testFunc, x).div(testFuncDerivative(x)).toString(),
//     differenceMagMult: betterDifference(approximateDerivative(testFunc, x), testFuncDerivative(x)),
// }));
// console.table(results);

// Test 2
// const testFunctionsAndTheirDerivatives: [
//     testFn: (x: Decimal) => Decimal,
//     derivativeFn: (x: Decimal) => Decimal,
//     name: string,
// ][] = [
//     /* eslint-disable prettier/prettier */
//     [
//         (x: Decimal) => x.pow(2).mul(2).add(x.mul(3)).add(5),
//         (x: Decimal) => x.mul(4).add(3),
//         "Quadratic Function",
//     ],
//     [
//         (x: Decimal) => Decimal.exp(x),
//         (x: Decimal) => Decimal.exp(x),
//         "Exponential Function",
//     ],
//     [
//         (x: Decimal) => Decimal.pow(x, x),
//         (x: Decimal) => Decimal.pow(x, x).mul(Decimal.ln(x).add(1)),
//         "Power Tower Function",
//     ]
//     /* eslint-enable prettier/prettier */
// ];

// const testEpsilons = Array.from({ length: 15 }, (_, i) => 10 ** (-i - 1));

// function computeDifferenceBetweenApproxDerivativeAndActual(f: (x: Decimal) => Decimal, fPrime: (x: Decimal) => Decimal, x: DecimalSource, epsilon: number) {
//     const approx = approximateDerivative(f, x, epsilon);
//     const actual = fPrime(new Decimal(x));
//     const differenceMult = approx.div(actual);
//     const differenceMagMult = approx.mag / actual.mag;

//     return { approx, actual, differenceMult, differenceMagMult };
// }

// const result = testFunctionsAndTheirDerivatives.map(([f, fPrime, name]) => {
//     const xTests: Decimal[] = Array.from({ length: 20 }, (_, i) => Decimal.dTwo.pow(i * 2));
//     const differenceMultForEpsilons = testEpsilons.map((epsilon) => xTests.map((x) => computeDifferenceBetweenApproxDerivativeAndActual(f, fPrime, x, epsilon).differenceMult));
//     const averageDifferenceMultForEpsilons = differenceMultForEpsilons.map((differences) => differences.reduce((sum, val) => sum.add(val), Decimal.dZero).div(differences.length));

//     return { name, averageDifferenceMultForEpsilons };
// });
// console.table(result);

// Test 3 benchmark

// const a = Decimal.dTwo;
// const b = Decimal.dTwo.pow(1e6 + 3);

// for (const mode of [MeanMode.arithmetic, MeanMode.geometric, MeanMode.harmonic, MeanMode.logarithmic, MeanMode.tetrational]) {
//     console.time(MeanMode[mode]);
//     // console.log(mean(a, b, mode).toString());
//     for (let i = 0; i < 1e3; i++) mean(a, b, mode);
//     console.timeEnd(MeanMode[mode]);
// }
