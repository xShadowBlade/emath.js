/**
 * @file Declares the numerical analysis functions (inverse function approximation, sum calculation).
 */
import { E, ESource } from "../E/eMain";
/**
 * The default amount of iterations to perform for the inverse function approximation and sum calculation.
 * Can be overriden by passing a custom amount of iterations.
 *
 * Notes:
 * - The higher the amount of iterations, the more accurate the result will be, but the longer it will take to calculate.
 * - Time complexity is O(n) where n is the amount of iterations, scaling with the complexity of the function.
 * - At 10 or less iterations, the time it takes to calculate is almost instant.
 * - At 25 iterations, the time it takes to calculate is ~1 ms
 * - At 100 iterations, the time it takes to calculate is ~2 ms but with marginal accuracy improvements.
 * - At 1000 iterations, the time it takes to calculate is ~7 ms but with very marginal accuracy improvements.
 * - At 10000 iterations, the time it takes to calculate is ~30 ms.
 * @default 25
 */
declare const DEFAULT_ITERATIONS = 25;
/**
 * Represents different methods to calculate the mean.
 * Mode 1 `"arithmetic"` `(a+b)/2` is a bit faster but way less accurate for large numbers.
 * Mode 2 `"geometric"` `sqrt(ab)` is more accurate, and is the default.
 */
type MeanMode = "arithmetic" | "geometric" | 1 | 2;
/**
 * Approximates the inverse of a function at `n` using the bisection / binary search method.
 * @param f - The function to approximate the inverse of. It must be monotonically increasing.
 * @param n - The value to approximate the inverse at.
 * @param mode - The mode/mean method to use. See {@link MeanMode}
 * @param iterations - The amount of iterations to perform. Defaults to {@link DEFAULT_ITERATIONS}.
 * @returns An object containing the approximate inverse value `"value"` (defaults to the lower bound), the lower bound `"lowerBound"`, and the upper bound `"upperBound"`.
 * @example
 * const f = (x) => x.pow(2);
 * const inverse = inverseFunctionApprox(f, 16);
 * console.log(inverse.value); // ~3.9999999999999996
 */
declare function inverseFunctionApprox(f: (x: E) => E, n: ESource, mode?: MeanMode, iterations?: number): {
    value: import("../E/e").Decimal;
    lowerBound: import("../E/e").Decimal;
    upperBound: import("../E/e").Decimal;
};
/**
 * Calculates the sum of `f(n)` from `a` to `b` using a basic loop until the sum is less than or equal to `epsilon` geometrically.
 * See {@link calculateSum} for a more general function.
 * @param f - The function `f(n)` to calculate the sum.
 * @param b - The upper limit for the sum.
 * @param a - The lower limit for the sum. Defaults to `0`. The order is reversed because `a` is optional. Deal with it.
 * @param epsilon - The maximum error tolerance, geometrically. Defaults to `1e-3`.
 * @returns The calculated sum of `f(n)`.
 */
declare function calculateSumLoop(f: (n: E) => E, b: ESource, a?: ESource, epsilon?: ESource): E;
/**
 * Approximates the sum of `f(n)` from `a` to `b` using the trapezoidal rule.
 * See {@link calculateSum} for a more general function.
 * @param f - The function `f(n)` to calculate the sum.
 * @param b - The upper limit for the sum.
 * @param a - The lower limit for the sum. Defaults to `0`. The order is reversed because `a` is optional. Deal with it.
 * @param iterations - The amount of iterations to perform. Defaults to {@link DEFAULT_ITERATIONS}.
 * @returns The calculated sum of `f(n)`.
 */
declare function calculateSumApprox(f: (n: E) => E, b: ESource, a?: ESource, iterations?: number): E;
/**
 * Calculates the sum of `f(n)` from `a` to `b` using either the trapezoidal rule or a basic loop depending on the size of `b - a`.
 * @param f - The function `f(n)` to calculate the sum.
 * @param b - The upper limit for the sum.
 * @param a - The lower limit for the sum. Defaults to `0`. The order is reversed because `a` is optional. Deal with it.
 * @param epsilon - The maximum error tolerance, geometrically. Defaults to `1e-3`. Only used if `b - a` is less than or equal to {@link DEFAULT_ITERATIONS}.
 * @param iterations - The amount of iterations to perform. Defaults to {@link DEFAULT_ITERATIONS}. Only used if `b - a` is greater than {@link DEFAULT_ITERATIONS}.
 * @returns - The calculated sum of `f(n)`.
 * @example
 * const f = (x) => x.pow(2);
 * const sum = calculateSum(f, 10);
 * console.log(sum); // ~385
 */
declare function calculateSum(f: (n: E) => E, b: ESource, a?: ESource, epsilon?: ESource, iterations?: number): E;
export { inverseFunctionApprox, calculateSumLoop, calculateSumApprox, calculateSum, MeanMode, DEFAULT_ITERATIONS };
