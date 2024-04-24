/**
 * @file Declares the shared constants and types.
 */
import { E } from "emath.js";
import type { ESource, MeanMode } from "emath.js";

interface EEqualsToleranceConfig {
    verbose: boolean | "onlyOnFail";
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
    // Set the default values
    config = Object.assign({}, {
        verbose: false,
        mode: "geometric",
    } as EEqualsToleranceConfig, config);

    // Convert the values to E instances
    a = E(a);
    b = E(b);
    tolerance = E(tolerance);

    let diff: E;
    let result: boolean;

    // Compare the values
    if (config.mode === "geometric") {
        diff = a.sub(b).abs().div(a.abs().add(b.abs()).div(2));
        result = diff.lte(tolerance);
    } else {
        diff = a.sub(b).abs();
        result = diff.lte(tolerance);
    }

    if (config.verbose === true || (config.verbose === "onlyOnFail" && !result)) console.log({ a, b, tolerance, config, diff, result });

    return result;
}

export { EEqualsTolerance };
export type { EEqualsToleranceConfig };