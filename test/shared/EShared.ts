/**
 * @file Declares the shared constants and types.
 */
import { E } from "emath.js";
import type { ESource, MeanMode } from "emath.js";

interface EEqualsToleranceConfig {
    verbose: boolean;
    mode: MeanMode;
}

/**
 * The default amount of iterations to perform for the inverse function approximation and sum calculation.
 * @param a - The lower bound.
 * @param b - The upper bound.
 * @param tolerance - The tolerance to compare the values with.
 * @param config - The configuration object.
 * @returns Whether the values are equal within the tolerance.
 */
function EEqualsTolerance (a: ESource, b: ESource, tolerance: ESource, config?: Partial<EEqualsToleranceConfig>): boolean {
    config = Object.assign({}, config, {
        verbose: false,
        mode: "geometric",
    });
    a = E(a);
    b = E(b);
    tolerance = E(tolerance);
    // const diff = a.sub(b).abs();
    const diff = config.mode === "arithmetic" ? a.sub(b).abs() : a.sub(b).abs().div(a.abs().add(b.abs()).div(2));
    const result = diff.lte(tolerance);
    if (config.verbose) console.log({ a, b, tolerance, config, diff, result });
    return result;
}

export { EEqualsTolerance };