/**
 * @file Declares the numerical analysis functions (inverse function approximation, sum calculation).
 */
import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";
/**
 * The default amount of iterations to perform for the inverse function approximation and sum calculation.
 * Can be overriden by passing a custom amount of iterations.
 *
 * Notes:
 * - The higher the amount of iterations, the more accurate the result will be, but the longer it will take to calculate.
 * - Time complexity is O(n) where n is the amount of iterations, scaling with the complexity of the function.
 *
 * Behold the extermely inaccurate benchmarking results:
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
/**
 * Represents different methods to calculate the mean.
 *
 * - Mode 1 `"arithmetic"` `(a+b)/2` is a bit faster but way less accurate for large numbers.
 * - Mode 2 `"geometric"` `sqrt(ab)` is more accurate, and is the default.
 * - Mode 3 `"harmonic"` `2/(1/a+1/b)` is the slowest. You probably don't need this.
 */
type MeanMode = "arithmetic" | "geometric" | "harmonic" | 1 | 2 | 3;
/**
 * The configuration object for the {@link equalsTolerance} function.
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
declare function equalsTolerance(a: DecimalSource, b: DecimalSource, tolerance: DecimalSource, config?: Partial<EqualsToleranceConfig>): boolean;
/**
 * Approximates the inverse of a function at `n` using the bisection / binary search method.
 * @param f - The function to approximate the inverse of. It must be monotonically increasing and satisfy `f(n) >= n` for all `n >= 0`.
 * @param n - The value to approximate the inverse at.
 * @param mode - The mode/mean method to use. See {@link MeanMode}
 * @param iterations - The amount of iterations to perform. Defaults to {@link DEFAULT_ITERATIONS}.
 * @param tolerance - The tolerance to approximate the inverse with. Defaults to {@link DEFAULT_TOLERANCE}.
 * @returns An object containing the approximate inverse value `"value"` (defaults to the lower bound), the lower bound `"lowerBound"`, and the upper bound `"upperBound"`.
 * @example
 * const f = (x) => x.pow(2);
 * const inverse = inverseFunctionApprox(f, 16);
 * console.log(inverse.value); // ~3.9999999999999996
 */
declare function inverseFunctionApprox(f: (x: Decimal) => Decimal, n: DecimalSource, mode?: MeanMode, iterations?: number, tolerance?: number): {
    value: Decimal;
    lowerBound: Decimal;
    upperBound: Decimal;
};
/**
 * Calculates the sum of `f(n)` from `a` to `b` using a basic loop until the sum is less than or equal to `epsilon` geometrically.
 * See {@link calculateSum} for a more general function.
 * @param f - The function `f(n)` to calculate the sum.
 * @param b - The upper limit for the sum.
 * @param a - The lower limit for the sum. Defaults to `0`. The order is reversed because `a` is optional. Deal with it.
 * @param epsilon - The maximum error tolerance, geometrically. Defaults to {@link DEFAULT_TOLERANCE}.
 * @returns The calculated sum of `f(n)`.
 */
declare function calculateSumLoop(f: (n: Decimal) => Decimal, b: DecimalSource, a?: DecimalSource, epsilon?: DecimalSource): Decimal;
/**
 * Approximates the sum of `f(n)` from `a` to `b` using the trapezoidal rule.
 * See {@link calculateSum} for a more general function.
 * @param f - The function `f(n)` to calculate the sum.
 * @param b - The upper limit for the sum.
 * @param a - The lower limit for the sum. Defaults to `0`. The order is reversed because `a` is optional. Deal with it.
 * @param iterations - The amount of iterations to perform. Defaults to {@link DEFAULT_ITERATIONS}.
 * @param tolerance - The tolerance to approximate the sum with. Defaults to {@link DEFAULT_TOLERANCE} * 2 (to be more a bit faster).
 * @returns The calculated sum of `f(n)`.
 */
declare function calculateSumApprox(f: (n: Decimal) => Decimal, b: DecimalSource, a?: DecimalSource, iterations?: number, tolerance?: DecimalSource): Decimal;
/**
 * Calculates the sum of `f(n)` from `a` to `b` using either the trapezoidal rule or a basic loop depending on the size of `b - a`.
 * @param f - The function `f(n)` to calculate the sum.
 * @param b - The upper limit for the sum.
 * @param a - The lower limit for the sum. Defaults to `0`. The order is reversed because `a` is optional. Deal with it.
 * @param epsilon - The maximum error tolerance, geometrically. Defaults to {@link DEFAULT_TOLERANCE}. Only used if `b - a` is less than or equal to {@link DEFAULT_ITERATIONS}.
 * @param iterations - The amount of iterations to perform. Defaults to {@link DEFAULT_ITERATIONS}. Only used if `b - a` is greater than {@link DEFAULT_ITERATIONS}.
 * @returns - The calculated sum of `f(n)`.
 * @example
 * const f = (x) => x.pow(2);
 * const sum = calculateSum(f, 10);
 * console.log(sum); // ~385
 */
declare function calculateSum(f: (n: Decimal) => Decimal, b: DecimalSource, a?: DecimalSource, epsilon?: DecimalSource, iterations?: number): Decimal;
/**
 * Function to round a number to the nearest power of a specified base. Warning: Experimental, not tested on negative numbers / parameters.
 * @param x - The number to round.
 * @param base - The power base to round to.
 * @param acc - The accuracy / significant figures to round to.
 * @param max - The maximum power to round to.
 * @returns - The rounded number.
 * @example
 * console.log(roundingBase(123456789, 10, 0, 10)); // 100000000
 * console.log(roundingBase(123456789, 10, 1, 10)); // 120000000
 * console.log(roundingBase(123456789, 10, 2, 10)); // 123000000
 * console.log(roundingBase(245, 2, 0, 10)); // 256
 */
declare function roundingBase(x: DecimalSource, base?: DecimalSource, acc?: DecimalSource, max?: DecimalSource): Decimal;
export { equalsTolerance, inverseFunctionApprox, calculateSumLoop, calculateSumApprox, calculateSum, roundingBase, DEFAULT_ITERATIONS, };
export type { MeanMode, EqualsToleranceConfig };
