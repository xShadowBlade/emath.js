/**
 * @file Numerical analysis functions for approximating inverse functions.
 */
import type { DecimalSource } from "../../E/e";
import { Decimal } from "../../E/e";
import type { MeanMode } from "./numericalAnalysis";
/**
 * Represents the options for the {@link inverseFunctionApprox} function.
 */
interface InverseFunctionOptions {
    /**
     * The mode/mean method to use. See {@link MeanMode}
     */
    mode: MeanMode;
    /**
     * The amount of iterations to perform. Defaults to {@link DEFAULT_ITERATIONS}.
     */
    iterations: number;
    /**
     * The tolerance to approximate the inverse with. Defaults to {@link DEFAULT_TOLERANCE}.
     */
    tolerance: DecimalSource;
    /**
     * The lower bound to start the search from. Defaults to `1`.
     */
    lowerBound: DecimalSource;
    /**
     * The upper bound to start the search from. Defaults to `n`.
     */
    upperBound: DecimalSource;
    /**
     * Whether to round the bound and search only through integers. Defaults to `false`.
     */
    round: boolean;
}
/**
 * Represents the result of an inverse function approximation.
 * See {@link inverseFunctionApprox} and {@link inverseFunctionApproxInt}.
 */
interface InverseFunctionApproxResult {
    /**
     * The value of the inverse function approximation.
     * Defaults to the lower bound ({@link lowerBound}).
     */
    value: Decimal;
    /**
     * The lower bound of the inverse function approximation.
     */
    lowerBound: Decimal;
    /**
     * The upper bound of the inverse function approximation
     */
    upperBound: Decimal;
}
/**
 * Approximates the inverse of a function at `n` using the bisection / binary search method.
 * See {@link Decimal.increasingInverse} for a more general function.
 * @param f - The function to approximate the inverse of. It must be monotonically increasing and satisfy `f(n) >= n` for all `n >= 0`.
 * @param n - The value to approximate the inverse at.
 * @param options - The options for the approximation. See {@link InverseFunctionOptions}
 * @returns An object containing the approximate inverse value `"value"` (defaults to the lower bound), the lower bound `"lowerBound"`, and the upper bound `"upperBound"`, all as {@link Decimal} instances.
 * @example
 * const f = (x) => x.pow(2);
 * const inverse = inverseFunctionApprox(f, 16);
 * console.log(inverse.value); // ~3.9999999999999996
 */
declare function calculateInverseFunction(f: (x: Decimal) => Decimal, n: DecimalSource, options?: Partial<InverseFunctionOptions>): InverseFunctionApproxResult;
/**
 * Approximates the inverse of a function at `n` using the bisection / binary search method.
 * @deprecated Use {@link Decimal.increasingInverse} instead.
 * @param f - The function to approximate the inverse of. It must be monotonically increasing and satisfy `f(n) >= n` for all `n >= 0`.
 * @param n - The value to approximate the inverse at.
 * @param mode - The mode/mean method to use. See {@link MeanMode}
 * @param iterations - The amount of iterations to perform. Defaults to {@link DEFAULT_ITERATIONS}.
 * @param tolerance - The tolerance to approximate the inverse with. Defaults to {@link DEFAULT_TOLERANCE}.
 * @param lowerBound - The lower bound to start the search from. Defaults to `1`.
 * @param upperBound - The upper bound to start the search from. Defaults to `n`.
 * @param round - Whether to round the bound and search only through integers. Defaults to `false`.
 * @returns An object containing the approximate inverse value `"value"` (defaults to the lower bound), the lower bound `"lowerBound"`, and the upper bound `"upperBound"`, all as {@link Decimal} instances.
 * @example
 * const f = (x) => x.pow(2);
 * const inverse = inverseFunctionApprox(f, 16);
 * console.log(inverse.value); // ~3.9999999999999996
 */
declare function inverseFunctionApprox(f: (x: Decimal) => Decimal, n: DecimalSource, mode?: MeanMode, iterations?: number, tolerance?: DecimalSource, lowerBound?: DecimalSource, upperBound?: DecimalSource, round?: boolean): InverseFunctionApproxResult;
export type { InverseFunctionOptions, InverseFunctionApproxResult };
export { calculateInverseFunction, inverseFunctionApprox };
