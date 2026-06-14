/**
 * @file Declares the numerical analysis functions (inverse function approximation, sum calculation).
 */
import type { DecimalSource } from "../../E/e";
import { Decimal } from "../../E/e";
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
declare const DEFAULT_ITERATIONS = 30;
declare const DEFAULT_ITERATIONS_AS_DECIMAL: Readonly<Decimal>;
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
declare const DEFAULT_TOLERANCE = 0.0001;
/**
 * Represents different methods to calculate the mean.
 *
 * - Mode 1 `"arithmetic"` `(a+b)/2` is a bit faster but way less accurate for large numbers.
 * - Mode 2 `"geometric"` `sqrt(ab)` is more accurate, and is the default.
 * - Mode 3 `"harmonic"` `2/(1/a+1/b)` is the slowest. You probably don't need this.
 * - Mode 4 `"logarithmic"` `10^sqrt(log10(a)*log10(b))` is the most "accurate" and slightly slower.
 */
declare enum MeanMode {
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
     * See {@link decimalMagDifference}.
     */
    tetrational = 5
}
/**
 * Calculates the mean of two values using a specified method.
 * @param a - The first value.
 * @param b - The second value.
 * @param mode - The mode/mean method to use. See {@link MeanMode}
 * @returns The mean of the two values, as a {@link Decimal}.
 */
export declare function mean(a: DecimalSource, b: DecimalSource, mode?: MeanMode): Decimal;
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
 * Compares two values with a tolerance.
 * @param a - The lower bound.
 * @param b - The upper bound.
 * @param tolerance - The tolerance to compare the values with.
 * @param config - The configuration object.
 * @returns Whether the values are equal within the tolerance.
 */
declare function geometricEqualsTolerance(a: DecimalSource, b: DecimalSource, tolerance?: number, verbose?: boolean | "onlyOnFail"): boolean;
declare function decimalMagDifference(a: DecimalSource, b: DecimalSource): number;
declare function decimalMagGeometricMean(a: Decimal, b: Decimal): Decimal;
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
declare function roundingBase(x: DecimalSource, base?: DecimalSource, acc?: DecimalSource, max?: DecimalSource): Decimal;
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
declare function approximateDerivative(f: (x: Decimal) => Decimal, x: DecimalSource, epsilon?: number): Decimal;
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
declare function newtonRaphson(initialGuess: DecimalSource, f: (x: Decimal) => Decimal, fPrime?: (x: Decimal) => Decimal, tolerance?: number, maxIterations?: number): Decimal;
export { geometricEqualsTolerance, approximateDerivative, newtonRaphson, decimalMagDifference, decimalMagGeometricMean, roundingBase, DEFAULT_ITERATIONS, DEFAULT_ITERATIONS_AS_DECIMAL, DEFAULT_TOLERANCE, MeanMode, };
export type { EqualsToleranceConfig };
