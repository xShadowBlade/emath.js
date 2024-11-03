/**
 * @file Numerical analysis functions for approximating summations.
 */
import type { DecimalSource } from "../../E/e";
import { Decimal } from "../../E/e";
/**
 * Calculates the sum of `f(n)` from `a` to `b` using a basic loop until the sum is less than or equal to `epsilon` geometrically.
 * See {@link calculateSum} for a more general function.
 * @param f - The function `f(n)` to calculate the sum.
 * @param b - The upper limit for the sum.
 * @param a - The lower limit for the sum. Defaults to `0`. The order is reversed because `a` is optional. Deal with it.
 * @param epsilon - The maximum error tolerance, geometrically. Defaults to {@link DEFAULT_TOLERANCE}.
 * @returns The calculated sum of `f(n)`, as a {@link Decimal}.
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
 * @returns The calculated sum of `f(n)`, as a {@link Decimal}.
 */
declare function calculateSumApprox(f: (n: Decimal) => Decimal, b: DecimalSource, a?: DecimalSource, iterations?: number, tolerance?: DecimalSource): Decimal;
/**
 * Calculates the sum of `f(n)` from `a` to `b` using either the trapezoidal rule or a basic loop depending on the size of `b - a`.
 * @param f - The function `f(n)` to calculate the sum.
 * @param b - The upper limit for the sum.
 * @param a - The lower limit for the sum. Defaults to `0`. The order is reversed because `a` is optional. Deal with it.
 * @param epsilon - The maximum error tolerance, geometrically. Defaults to {@link DEFAULT_TOLERANCE}. Only used if `b - a` is less than or equal to {@link DEFAULT_ITERATIONS}.
 * @param iterations - The amount of iterations to perform. Defaults to {@link DEFAULT_ITERATIONS}. Only used if `b - a` is greater than {@link DEFAULT_ITERATIONS}.
 * @returns - The calculated sum of `f(n)`, as a {@link Decimal}.
 * @example
 * const f = (x) => x.pow(2);
 * const sum = calculateSum(f, 10);
 * console.log(sum); // ~385
 */
declare function calculateSum(f: (n: Decimal) => Decimal, b: DecimalSource, a?: DecimalSource, epsilon?: DecimalSource, iterations?: number): Decimal;
export { calculateSumLoop, calculateSumApprox, calculateSum };
