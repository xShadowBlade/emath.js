/**
 * @file Numerical analysis functions for approximating inverse functions.
 */
import type { DecimalSource } from "../../E/e";
import { Decimal } from "../../E/e";
import type { MeanMode } from "./numericalAnalysis";
import { DEFAULT_TOLERANCE, DEFAULT_ITERATIONS, equalsTolerance, mean } from "./numericalAnalysis";

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
function calculateInverseFunction(
    f: (x: Decimal) => Decimal,
    n: DecimalSource,
    options: Partial<InverseFunctionOptions> = {},
): InverseFunctionApproxResult {
    // Wrapper, call the old function
    const { iterations, tolerance, lowerBound, upperBound, round, mode } = options;

    return inverseFunctionApprox(f, n, mode, iterations, tolerance, lowerBound, upperBound, round);
}

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
function inverseFunctionApprox(
    f: (x: Decimal) => Decimal,
    n: DecimalSource,
    mode: MeanMode = "geometric",
    iterations = DEFAULT_ITERATIONS,
    tolerance: DecimalSource = DEFAULT_TOLERANCE,
    lowerBound: DecimalSource = 1,
    upperBound: DecimalSource = n,
    round = false,
): InverseFunctionApproxResult {
    // Set the initial bounds
    lowerBound = new Decimal(lowerBound);
    lowerBound = round ? lowerBound.floor() : lowerBound;

    upperBound = new Decimal(upperBound);
    upperBound = round ? upperBound.ceil() : upperBound;

    /**
     * If round is true and upperBound - lowerBound is less than this value, search through all the values manually and return the closest one.
     */
    const BOUND_THRESHOLD = 5;

    // Reorder the bounds if they are in the wrong order
    if (lowerBound.gt(upperBound)) {
        [lowerBound, upperBound] = [upperBound, lowerBound];
    }

    // If the function evaluates to 0, return 0
    if (f(upperBound).eq(0)) {
        return {
            value: Decimal.dZero,
            lowerBound: Decimal.dZero,
            upperBound: Decimal.dZero,
        };
    }

    // If the interval does not contain the value, warn and return the upper bound
    // (Note: This assumes the function is monotonically increasing)
    if (f(lowerBound).gt(n)) {
        console.warn("The interval does not contain the value. (f(lowerBound) > n)", {
            lowerBound,
            upperBound,
            n,
            /* eslint-disable @typescript-eslint/naming-convention */
            "f(lowerBound)": f(lowerBound),
            "f(upperBound)": f(upperBound),
            /* eslint-enable @typescript-eslint/naming-convention */
        });

        // If the lower bound is not already 0, try again with 0 as the lower bound
        if (!lowerBound.eq(0)) {
            return inverseFunctionApprox(f, n, mode, iterations, tolerance, 0, upperBound, round);
        }

        // If the lower bound is already 0, return the upper bound
        return {
            value: upperBound,
            lowerBound: upperBound,
            upperBound: upperBound,
        };
    }
    if (f(upperBound).lt(n)) {
        console.warn("The interval does not contain the value. (f(upperBound) < n)", {
            lowerBound,
            upperBound,
            n,
            /* eslint-disable @typescript-eslint/naming-convention */
            "f(lowerBound)": f(lowerBound),
            "f(upperBound)": f(upperBound),
            /* eslint-enable @typescript-eslint/naming-convention */
        });

        // If the upper bound is not already n, try again with n as the upper bound
        if (!upperBound.eq(n)) {
            return inverseFunctionApprox(f, n, mode, iterations, tolerance, lowerBound, n, round);
        }

        // If the upper bound is already n, return the upper bound
        return {
            value: upperBound,
            lowerBound: upperBound,
            upperBound: upperBound,
        };
    }

    // Perform the bisection / binary search
    for (let i = 0; i < iterations; i++) {
        /**
         * The mid x-value of the bounds.
         * If `round` is `true`, the mid value is floored.
         */
        let mid: Decimal = mean(lowerBound, upperBound, mode);
        mid = round ? mid.floor() : mid;

        /**
         * The y-value of the function at the mid x-value ({@link mid}).
         */
        const midValue = f(mid);

        // Stop the loop if the bounds are close enough (removed, slower)
        // if (
        //     equalsTolerance(lowerBound, upperBound, tolerance, {
        //         verbose: false,
        //         mode: "geometric",
        //     })
        // ) {
        //     // console.log("bounds close", { lowerBound, upperBound, mid, midValue, n, i });
        //     break;
        // }

        // Adjust the bounds based on the mid value (binary search)
        if (midValue.lt(n)) {
            // If the value is less than the target, set the lower bound to the mid value
            lowerBound = mid;
        } else {
            // If the value is greater than the target, set the upper bound to the mid value
            upperBound = mid;
        }

        // Stop the loop if the mid value is close enough to the target value
        if (
            midValue.eq(n)
            // || equalsTolerance(midValue, n, tolerance, { verbose: false, mode: "geometric" })
        ) {
            // console.log("mid value close", { lowerBound, upperBound, mid, midValue, n, i });
            return {
                value: mid,
                lowerBound: mid,
                upperBound: mid,
            };
        }

        // If the bounds are close enough and round is true, search through all the values manually and return the closest one
        if (round && upperBound.sub(lowerBound).lte(BOUND_THRESHOLD)) {
            let closest = upperBound;
            let closestDiff = f(upperBound).sub(n).abs();
            for (let j = lowerBound; j.lte(upperBound); j = j.add(1)) {
                const diff = f(j).sub(n).abs();
                if (diff.lt(closestDiff)) {
                    closest = new Decimal(j);
                    closestDiff = diff;
                }
            }
            return {
                value: closest,
                lowerBound: lowerBound,
                upperBound: upperBound,
            };
        }
    }

    const out: InverseFunctionApproxResult = {
        value: lowerBound,
        lowerBound,
        upperBound,
    };

    // test
    // console.log({
    //     out,
    // });
    // console.trace();
    return out;
}

// Test
// const f = (x: Decimal): Decimal => x.pow(2);

// console.time("old");
// for (let i = 0; i < 10000; i++) calculateInverseFunction(f, 152399025);
// console.timeEnd("old");

// console.time("new");
// for (let i = 0; i < 10000; i++) inverseFunctionApproxNew(f, 152399025);
// console.timeEnd("new");

// const inverse = inverseFunctionApprox(f, 152399025);
// console.log(inverse.value.format());
// console.log(equalsTolerance(inverse.value, 12345, 1e-3, { verbose: true, mode: "geometric" }));

export type { InverseFunctionOptions, InverseFunctionApproxResult };
export { calculateInverseFunction, inverseFunctionApprox };
