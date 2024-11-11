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
/**
 * The default tolerance to compare the values with.
 * Can be overridden by passing a custom tolerance.
 *
 * Used by:
 * - {@link equalsTolerance}
 * - {@link calculateSum} and {@link calculateSumApprox}, the latter of which uses the tolerance * 2 for speed.
 * - {@link roundingBase}
 * @default 0.001
 */
declare const DEFAULT_TOLERANCE = 0.001;
/**
 * Represents different methods to calculate the mean.
 *
 * - Mode 1 `"arithmetic"` `(a+b)/2` is a bit faster but way less accurate for large numbers.
 * - Mode 2 `"geometric"` `sqrt(ab)` is more accurate, and is the default.
 * - Mode 3 `"harmonic"` `2/(1/a+1/b)` is the slowest. You probably don't need this.
 * - Mode 4 `"logarithmic"` `10^sqrt(log10(a)*log10(b))` is the most "accurate" and slightly slower.
 */
type MeanMode = "arithmetic" | "geometric" | "harmonic" | "logarithmic" | 1 | 2 | 3 | 4;
/**
 * Calculates the mean of two values using a specified method.
 * @param a - The first value.
 * @param b - The second value.
 * @param mode - The mode/mean method to use. See {@link MeanMode}
 * @returns The mean of the two values, as a {@link Decimal}.
 */
export declare function mean(a: DecimalSource, b: DecimalSource, mode?: MeanMode): Decimal;
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
export { equalsTolerance, roundingBase, DEFAULT_ITERATIONS, DEFAULT_TOLERANCE, };
export type { MeanMode, EqualsToleranceConfig };