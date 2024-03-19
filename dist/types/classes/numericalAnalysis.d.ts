/**
 * @file Declares the numerical analysis functions (inverse function approximation, sum calculation).
 */
import { E, ESource } from "../E/eMain";
declare const DEFAULT_ITERATIONS = 15;
/**
 * Represents different methods to calculate the mean.
 * Mode 1 `"arithmetic"` `(a+b)/2` is the default and a bit faster but way less accurate for large numbers.
 * Mode 2 `"geometric"` `sqrt(ab)` is more accurate.
 */
type MeanMode = "arithmetic" | "geometric" | 1 | 2;
/**
 * Approximates the inverse of a function at `n` using the bisection / binary search method.
 * @param f - The function to approximate the inverse of. It must be monotonically increasing.
 * @param n - The value to approximate the inverse at.
 * @param mode - The mode/mean method to use. See {@link MeanMode}
 * @param iterations - The amount of iterations to perform. Defaults to `15`.
 * @param target - The target value to reach. If not provided, it defaults to `n`.
 * @returns An object containing the approximate inverse value `"value"` (defaults to the lower bound), the lower bound `"lowerBound"`, and the upper bound `"upperBound"`.
 */
declare function inverseFunctionApprox(f: (x: E) => E, n: ESource, mode?: MeanMode, iterations?: number, target?: ESource): {
    value: import("E/e").Decimal;
    lowerBound: import("E/e").Decimal;
    upperBound: import("E/e").Decimal;
};
/**
 * Calculates the sum of `f(n)` from `a` to `b` using a basic loop until the sum is less than or equal to `epsilon` geometrically.
 * @param f - The function `f(n)` to calculate the sum.
 * @param b - The upper limit for the sum.
 * @param a - The lower limit for the sum. Defaults to `0`. The order is reversed because `a` is optional. Deal with it.
 * @param epsilon - The maximum error tolerance, geometrically. Defaults to `1e-3`.
 * @returns The calculated sum of `f(n)`.
 */
declare function calculateSumLoop(f: (n: E) => E, b: ESource, a?: ESource, epsilon?: ESource): E;
/**
 * Approximates the sum of `f(n)` from `a` to `b` using the trapezoidal rule.
 * @param f - The function `f(n)` to calculate the sum.
 * @param b - The upper limit for the sum.
 * @param a - The lower limit for the sum. Defaults to `0`. The order is reversed because `a` is optional. Deal with it.
 * @param iterations - The amount of iterations to perform. Defaults to `15`.
 * @returns The calculated sum of `f(n)`.
 */
declare function calculateSumApprox(f: (n: E) => E, b: ESource, a?: ESource, iterations?: number): E;
/**
 * Calculates the sum of `f(n)` from `a` to `b` using either the trapezoidal rule or a basic loop depending on the size of `b - a`.
 * @param f - The function `f(n)` to calculate the sum.
 * @param b - The upper limit for the sum.
 * @param a - The lower limit for the sum. Defaults to `0`. The order is reversed because `a` is optional. Deal with it.
 * @param epsilon - The maximum error tolerance, geometrically. Defaults to `1e-3`. Only used if `b - a` is less than or equal to `15`.
 * @param iterations - The amount of iterations to perform. Defaults to `15`. Only used if `b - a` is greater than `15`.
 * @returns - The calculated sum of `f(n)`.
 */
declare function calculateSum(f: (n: E) => E, b: ESource, a?: ESource, epsilon?: ESource, iterations?: number): E;
export { inverseFunctionApprox, calculateSumLoop, calculateSumApprox, calculateSum, MeanMode, DEFAULT_ITERATIONS };
