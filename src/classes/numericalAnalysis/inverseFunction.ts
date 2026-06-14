/**
 * @file Numerical analysis functions for approximating inverse functions.
 */
import type { DecimalSource } from "../../E/e";
import { Decimal } from "../../E/e";
import {
    DEFAULT_TOLERANCE,
    DEFAULT_ITERATIONS,
    mean,
    newtonRaphson,
    approximateDerivative,
    MeanMode,
    geometricEqualsTolerance,
} from "./numericalAnalysis";

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
    tolerance: number;

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
//  * @param useNewtonIterations - Whether to use Newton's method to calculate the next mid value instead of the mean. Defaults to `false`. If `true`, the function will use the derivative of `f` (or an approximation of it) to calculate the next mid value, which can speed up convergence for some functions.
//  * @param fPrime - The derivative of `f`. If not provided and `useNewtonIterations` is `true`, the function will approximate the derivative using the `approximateDerivative` function.
 * @returns An object containing the approximate inverse value `"value"` (defaults to the lower bound), the lower bound `"lowerBound"`, and the upper bound `"upperBound"`, all as {@link Decimal} instances.
 * @example
 * const f = (x) => x.pow(2);
 * const inverse = inverseFunctionApprox(f, 16);
 * console.log(inverse.value); // ~3.9999999999999996
 */
function inverseFunctionApprox(
    f: (x: Decimal) => Decimal,
    n: DecimalSource,
    mode: MeanMode = MeanMode.geometric,
    iterations = DEFAULT_ITERATIONS,
    tolerance: number = DEFAULT_TOLERANCE,
    lowerBound: DecimalSource = Decimal.dOne,
    upperBound: DecimalSource = n,
    round = false,
    // useNewtonIterations = false,
    // fPrime?: (x: Decimal) => Decimal,
): InverseFunctionApproxResult {
    // Normalize values
    lowerBound = Decimal.fromValue_noAlloc(lowerBound);
    lowerBound = round ? lowerBound.floor() : lowerBound;

    upperBound = Decimal.fromValue_noAlloc(upperBound);
    upperBound = round ? upperBound.ceil() : upperBound;

    n = Decimal.fromValue_noAlloc(n);

    // if (useNewtonIterations) {
    //     fPrime ??= (x): Decimal => approximateDerivative(f, x);
    // }

    /**
     * If round is true and upperBound - lowerBound is less than this value, search through all the values manually and return the closest one.
     */
    const BOUND_THRESHOLD = 5;

    // Reorder the bounds if they are in the wrong order
    if (lowerBound.gt(upperBound)) {
        [lowerBound, upperBound] = [upperBound, lowerBound];
    }

    const fInitialLowerBound = f(lowerBound);
    const fInitialUpperBound = f(upperBound);

    // If the function evaluates to 0, return 0
    if (fInitialUpperBound.eq(Decimal.dZero)) {
        return {
            value: Decimal.dZero,
            lowerBound: Decimal.dZero,
            upperBound: Decimal.dZero,
        };
    }

    // If the interval does not contain the value, warn and return the upper bound
    // (Note: This assumes the function is monotonically increasing)
    if (fInitialLowerBound.gt(n)) {
        console.warn("The interval does not contain the value. (f(lowerBound) > n)", {
            lowerBound,
            upperBound,
            n,
            /* eslint-disable @typescript-eslint/naming-convention */
            "f(lowerBound)": fInitialLowerBound,
            "f(upperBound)": fInitialUpperBound,
            /* eslint-enable @typescript-eslint/naming-convention */
        });

        // If the lower bound is not already 0, try again with 0 as the lower bound
        if (!lowerBound.eq(Decimal.dZero)) {
            // return inverseFunctionApprox(f, n, mode, iterations, tolerance, Decimal.dZero, upperBound, round, useNewtonIterations, fPrime);
            return inverseFunctionApprox(f, n, mode, iterations, tolerance, Decimal.dZero, upperBound, round);
        }

        // If the lower bound is already 0, return the upper bound
        return {
            value: upperBound,
            lowerBound: upperBound,
            upperBound: upperBound,
        };
    }
    if (fInitialUpperBound.lt(n)) {
        console.warn("The interval does not contain the value. (f(upperBound) < n)", {
            lowerBound,
            upperBound,
            n,
            /* eslint-disable @typescript-eslint/naming-convention */
            "f(lowerBound)": fInitialLowerBound,
            "f(upperBound)": fInitialUpperBound,
            /* eslint-enable @typescript-eslint/naming-convention */
        });

        // If the upper bound is not already n, try again with n as the upper bound
        if (!upperBound.eq(n)) {
            // return inverseFunctionApprox(f, n, mode, iterations, tolerance, lowerBound, n, round, useNewtonIterations, fPrime);
            return inverseFunctionApprox(f, n, mode, iterations, tolerance, lowerBound, n, round);
        }

        // If the upper bound is already n, return the upper bound
        return {
            value: upperBound,
            lowerBound: upperBound,
            upperBound: upperBound,
        };
    }

    /**
     * The mid x-value of the bounds.
     * If `round` is `true`, the mid value is floored.
     */
    let mid = Decimal.dZero;

    /**
     * The y-value of the function at the mid x-value ({@link mid}).
     */
    let midValue = Decimal.dZero;

    let nextMid = mean(lowerBound, upperBound, mode);

    // Binary search
    for (let i = 0; i < iterations; i++) {
        mid = nextMid;
        mid = round ? mid.floor() : mid;
        midValue = f(mid);

        // Adjust the bounds based on the mid value (binary search)
        if (midValue.lt(n)) {
            // If the value is less than the target, set the lower bound to the mid value
            lowerBound = mid;
        } else {
            // If the value is greater than the target, set the upper bound to the mid value
            upperBound = mid;
        }

        // Stop the loop if the mid value is close enough to the target value
        if (geometricEqualsTolerance(midValue, n, tolerance)) {
            // console.log("mid value close", { lowerBound, upperBound, mid, midValue, n, i });
            break;
        }

        // If the bounds are close enough and round is true, search through all the values manually and return the closest one
        if (round && upperBound.sub(lowerBound).lte(BOUND_THRESHOLD)) {
            let closest = upperBound;
            let closestDiff = f(upperBound).sub(n).abs();

            for (let j = lowerBound; j.lte(upperBound); j = j.add(Decimal.dOne)) {
                const diff = f(j).sub(n).abs();
                if (diff.lt(closestDiff)) {
                    closest = Decimal.fromValue_noAlloc(j);
                    closestDiff = diff;
                }
            }

            return {
                value: closest,
                lowerBound: lowerBound,
                upperBound: upperBound,
            };
        }

        nextMid = mean(lowerBound, upperBound, mode);

        // if (useNewtonIterations) {
        //     const fxPrime = fPrime?.(mid) ?? Decimal.dZero;

        //     // Check if derivative is 0 to avoid divide by 0
        //     if (Decimal.dZero.equals(fxPrime)) {
        //         // console.warn("Derivative is zero. No solution found. Returning current approximation.");
        //         continue;
        //     }

        //     const xNext = mid.sub(midValue.div(fxPrime));

        //     console.log({
        //         i,
        //         xNext,
        //         currentMid: nextMid,
        //         newMid: mean(nextMid, xNext, mode).clamp(lowerBound, upperBound),
        //         lowerBound,
        //         upperBound,
        //     });

        //     nextMid = mean(nextMid, xNext, mode).clamp(lowerBound, upperBound);
        // }
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

/**
 * Approximates the inverse of a function at `n` using the Newton-Raphson method.
 * @param f - The function to approximate the inverse of. It must be monotonically increasing and satisfy `f(n) >= n` for all `n >= 0`.
 * @param n - The value to approximate the inverse at.
 * @param fPrime - The derivative of `f`. If not provided, the function will approximate the derivative using the `approximateDerivative` function.
 * @param initialGuess - The initial guess to start the search from. Defaults to the geometric mean of `1` and `n`.
 * @param iterations - The amount of iterations to perform. Defaults to {@link DEFAULT_ITERATIONS}.
 * @param tolerance - The tolerance to approximate the inverse with. Defaults to {@link DEFAULT_TOLERANCE}.
 * @returns An approximation of the inverse of `f` at `n` as a {@link Decimal} instance.
 */
function inverseFunctionApproxUsingNewtonRaphson(
    f: (x: Decimal) => Decimal,
    n: DecimalSource,
    fPrime?: (x: Decimal) => Decimal,
    initialGuess?: DecimalSource,
    iterations = DEFAULT_ITERATIONS,
    tolerance: number = DEFAULT_TOLERANCE,
): Decimal {
    initialGuess = initialGuess ? Decimal.fromValue_noAlloc(initialGuess) : mean(Decimal.dOne, n, MeanMode.geometric);

    fPrime ??= (x): Decimal => approximateDerivative(f, x);

    return newtonRaphson(initialGuess, (x: Decimal) => f(x).sub(n), fPrime, tolerance, iterations);
}

// Test
// const f = (x: Decimal): Decimal => x.exp().mul(x.pow(2)).add(x.mul(3)).add(5);

// console.time("old");
// for (let i = 0; i < 10000; i++) calculateInverseFunction(f, 152399025);
// console.timeEnd("old");

// console.time("new");
// for (let i = 0; i < 10000; i++) inverseFunctionApproxUsingNewtonRaphson(f, 152399025);
// console.timeEnd("new");

// const testCases = Array.from({ length: 10 }, (_, i) => Decimal.dTwo.pow(i * 2));

// const results = testCases.map((n) => {
//     const oldResult = calculateInverseFunction(f, f(n));
//     const newResult = inverseFunctionApproxUsingNewtonRaphson(f, f(n));

//     return {
//         n: n.toString(),
//         f_n: f(n).toString(),
//         oldResult: oldResult.value.toString(),
//         newResult: newResult.toString(),
//         oldError: betterDifference(oldResult.value, n),
//         newError: betterDifference(newResult, n),
//     };
// });
// console.table(results);

export type { InverseFunctionOptions, InverseFunctionApproxResult };
export { calculateInverseFunction, inverseFunctionApprox, inverseFunctionApproxUsingNewtonRaphson };
