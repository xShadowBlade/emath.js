/**
 * @file Declares the numerical analysis functions (inverse function approximation, sum calculation).
 */
import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";

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
const DEFAULT_ITERATIONS = 30;

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
const DEFAULT_TOLERANCE = 0.001;

/**
 * Represents different methods to calculate the mean.
 *
 * - Mode 1 `"arithmetic"` `(a+b)/2` is a bit faster but way less accurate for large numbers.
 * - Mode 2 `"geometric"` `sqrt(ab)` is more accurate, and is the default.
 * - Mode 3 `"harmonic"` `2/(1/a+1/b)` is the slowest. You probably don't need this.
 */
type MeanMode = "arithmetic" | "geometric" | "harmonic" | 1 | 2 | 3;

/**
 * Calculates the mean of two values using a specified method.
 * @param a - The first value.
 * @param b - The second value.
 * @param mode - The mode/mean method to use. See {@link MeanMode}
 * @returns The mean of the two values, as a {@link Decimal}.
 */
function mean(a: DecimalSource, b: DecimalSource, mode: MeanMode = "geometric"): Decimal {
    a = new Decimal(a);
    b = new Decimal(b);

    switch (mode) {
        case "arithmetic":
        case 1:
            return a.add(b).div(2);
        case "geometric":
        case 2:
        default:
            return a.mul(b).sqrt();
        case "harmonic":
        case 3:
            return Decimal.dTwo.div(a.reciprocal().add(b.reciprocal()));
    }
}

interface EqualsToleranceBounds {
    lowerBound: DecimalSource;
    upperBound: DecimalSource;
}

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
function equalsTolerance(
    a: DecimalSource,
    b: DecimalSource,
    tolerance: DecimalSource,
    config?: Partial<EqualsToleranceConfig>,
): boolean {
    // Set the default values
    config = Object.assign(
        {},
        {
            verbose: false,
            mode: "geometric",
        } as EqualsToleranceConfig,
        config,
    );

    // Convert the values to Decimal instances
    a = new Decimal(a);
    b = new Decimal(b);
    tolerance = new Decimal(tolerance);

    let diff: Decimal;
    let result: boolean;

    // Compare the values
    if (config.mode === "geometric") {
        diff = a.sub(b).abs().div(a.abs().add(b.abs()).div(2));
        result = diff.lte(tolerance);
    } else {
        diff = a.sub(b).abs();
        result = diff.lte(tolerance);
    }

    if (config.verbose === true || (config.verbose === "onlyOnFail" && !result)) {
        console.log({ a, b, tolerance, config, diff, result });
    }

    return result;
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
    tolerance = DEFAULT_TOLERANCE,
    lowerBound: DecimalSource = 1,
    upperBound: DecimalSource = n,
    round = false,
): InverseFunctionApproxResult {
    // Set the initial bounds
    lowerBound = new Decimal(lowerBound);
    lowerBound = round ? lowerBound.floor() : lowerBound;

    upperBound = new Decimal(upperBound);
    upperBound = round ? upperBound.ceil() : upperBound;

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
    // if (f(lowerBound).gt(n)) {
    //     console.warn(
    //         "The interval does not contain the value. (f(lowerBound) > n)",
    //         lowerBound,
    //         upperBound,
    //     );
    //     // console.log({ lowerBound, upperBound, iterations, n, f: f(lowerBound)});
    //     return {
    //         value: upperBound,
    //         lowerBound: upperBound,
    //         upperBound: upperBound,
    //     };
    // }

    // If the function is not monotonically increasing, return the upper bound
    if (f(upperBound).lt(n)) {
        console.warn("eMath.js: The function is not monotonically increasing. (f(n) < n)");
        // console.log({ lowerBound, upperBound, iterations, n, f: f(upperBound)});
        return {
            value: upperBound,
            lowerBound: upperBound,
            upperBound: upperBound,
        };
    }

    // console.log({ lowerBound, upperBound, iterations });

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

        // Stop the loop if the bounds are close enough
        if (
            equalsTolerance(lowerBound, upperBound, tolerance, {
                verbose: false,
                mode: "geometric",
            })
        ) {
            // console.log("bounds close", { lowerBound, upperBound, mid, midValue, n, i });
            break;
        }

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
    }

    const out: InverseFunctionApproxResult = {
        value: lowerBound,
        lowerBound,
        upperBound,
    };

    return out;
}

/**
 * Calculates the sum of `f(n)` from `a` to `b` using a basic loop until the sum is less than or equal to `epsilon` geometrically.
 * See {@link calculateSum} for a more general function.
 * @param f - The function `f(n)` to calculate the sum.
 * @param b - The upper limit for the sum.
 * @param a - The lower limit for the sum. Defaults to `0`. The order is reversed because `a` is optional. Deal with it.
 * @param epsilon - The maximum error tolerance, geometrically. Defaults to {@link DEFAULT_TOLERANCE}.
 * @returns The calculated sum of `f(n)`, as a {@link Decimal}.
 */
function calculateSumLoop(
    f: (n: Decimal) => Decimal,
    b: DecimalSource,
    a: DecimalSource = 0,
    epsilon: DecimalSource = DEFAULT_TOLERANCE,
): Decimal {
    // Initialize the values
    let sum: Decimal = new Decimal();
    let n = new Decimal(b);

    // Perform the loop (decrementing n to sometimes take advantage of epsilon)
    for (; n.gte(a); n = n.sub(1)) {
        const initSum = sum;
        const value = f(n);

        sum = sum.add(value);

        // If the difference/quotient between the initial sum and the new sum is less than epsilon, break
        const diff = initSum.div(sum);
        if (diff.lte(1) && diff.gt(Decimal.dOne.sub(epsilon))) break;
    }
    // console.log({ sum, iterations: new Decimal(b).sub(n).add(a) });
    return sum;
}

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
function calculateSumApprox(
    f: (n: Decimal) => Decimal,
    b: DecimalSource,
    a: DecimalSource = 0,
    iterations: number = DEFAULT_ITERATIONS,
    tolerance: DecimalSource = DEFAULT_TOLERANCE * 2,
): Decimal {
    // Initialize the values
    a = new Decimal(a);
    b = new Decimal(b);

    let sum = Decimal.dZero;
    const intervalWidth = b.sub(a).div(iterations);

    // for (let i = 0; i < iterations; i++) {
    for (let i = iterations - 1; i >= 0; i--) {
        const x0 = a.add(intervalWidth.mul(i));
        const x1 = a.add(intervalWidth.mul(i + 1));

        const oldSum = sum;

        sum = sum.add(f(x0).add(f(x1)).div(2).mul(intervalWidth));

        // console.log({
        //     oldSum: oldSum.format(),
        //     sum: sum.format(),
        //     delta: sum.sub(oldSum).format(),
        //     x0: x0.format(),
        //     x1: x1.format(),
        //     i,
        // });

        // Stop the loop if the sums don't change much
        if (
            equalsTolerance(oldSum, sum, tolerance, {
                verbose: false,
                mode: "geometric",
            })
        ) {
            // console.log("sums close", { oldSum, sum, x0, x1, i, i2: iterations - i });
            break;
        }
    }
    return sum;
}

// test
// const f = (x: Decimal): Decimal => x.pow(2);
// const sum = calculateSumApprox(f, 10000);
// console.log(sum.format());
// console.log(equalsTolerance(sum, 333383335000, 1e-3, { verbose: true, mode: "geometric" }));

// const inverse = inverseFunctionApprox(f, 152399025);
// console.log(inverse.value.format());
// console.log(equalsTolerance(inverse.value, 12345, 1e-3, { verbose: true, mode: "geometric" }));

// /**
//  * Approximates the sum of `f(n)` from `a` to `b` using a binary search method. Note: In versions before v9.0.0, this function used a trapezoidal rule method. This may cause slight inaccuracies but is overall significantly faster.
//  * See {@link calculateSum} for a more general function.
//  * @param f - The function `f(n)` to calculate the sum.
//  * @param b - The upper limit for the sum.
//  * @param a - The lower limit for the sum. Defaults to `0`. The order is reversed because `a` is optional. Deal with it.
//  * @param iterations - The amount of iterations to perform. Defaults to {@link DEFAULT_ITERATIONS}.
//  * @param mode - The mode/mean method to use. See {@link MeanMode}
//  * @param tolerance - The tolerance to approximate the sum with. Defaults to {@link DEFAULT_TOLERANCE}.
//  * @returns The calculated sum of `f(n)`.
//  */
// function calculateSumApprox (
//     f: (n: Decimal) => Decimal,
//     b: DecimalSource,
//     a: DecimalSource = 0,
//     iterations: number = DEFAULT_ITERATIONS,
//     mode: MeanMode = "geometric",
//     tolerance: DecimalSource = DEFAULT_TOLERANCE,
// ): Decimal {
//     // Initialize the values
//     a = new Decimal(a);
//     b = new Decimal(b);

//     // Calculate the interval width
//     const n = new Decimal(iterations);
//     const h = b.sub(a).div(n);

//     let sum = Decimal.dZero;
//     // for (let i = 0; i < iterations; i++) {
//     for (let i = iterations; i > 0; i--) {
//         // const mid = a.add(h.mul(i)).add(h.div(2));
//         const mid = mean(a.add(h.mul(i)), a.add(h.mul(i + 1)), mode);

//         const oldSum = sum;
//         sum = sum.add(f(mid).mul(h));

//         // debug
//         // console.log({ oldSum, sum, delta: sum.sub(oldSum), mid, i });
//         console.log({
//             oldSum: oldSum.format(),
//             sum: sum.format(),
//             delta: sum.sub(oldSum).format(),
//             mid: mid.format(),
//             i,
//         });

//         // Stop the loop if the sums don't change much
//         if (equalsTolerance(oldSum, sum, tolerance, { verbose: false, mode: "geometric" })) {
//             console.log("sums close", { oldSum, sum, mid, i });
//             break;
//         }
//     }

//     return sum;
// }

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
function calculateSum(
    f: (n: Decimal) => Decimal,
    b: DecimalSource,
    a: DecimalSource = 0,
    epsilon?: DecimalSource,
    iterations?: number,
): Decimal {
    a = new Decimal(a);
    b = new Decimal(b);
    if (b.sub(a).lte(DEFAULT_ITERATIONS)) {
        return calculateSumLoop(f, b, a, epsilon);
    } else {
        return calculateSumApprox(f, b, a, iterations);
    }
}

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
function roundingBase(
    x: DecimalSource,
    base: DecimalSource = 10,
    acc: DecimalSource = 0,
    max: DecimalSource = 1000,
): Decimal {
    // Normalize the inputs
    x = new Decimal(x);
    base = new Decimal(base);
    acc = new Decimal(acc);
    max = new Decimal(max);

    // If base or acc is less than 1, return NaN
    if (base.lt(1) || acc.lt(1)) return Decimal.dNaN;

    // If the number is negative, round it as positive and then add the sign back
    const xSign = x.sign as -1 | 0 | 1;
    x = x.abs();

    // If the number is too large, don't round it
    if (x.gte(Decimal.pow(base, max))) return x;

    /**
     * The power of the number, rounded. acc^power = x.
     * It is the highest power of the base that is less than x.
     * For example, if x = 123 and base = 10, power = 2.
     */
    const powerN = Decimal.floor(Decimal.log(x, base));

    // First, divide the number by the base^powerN. This will give us a number between 1 and base, which we can round.
    // Example: 123 / 10^2 = 1.23
    let out = x.div(Decimal.pow(base, powerN));

    // Round the number to the accuracy
    // Example, with an accuracy of 1: 1.23 -> 1.2
    out = out.mul(Decimal.pow(base, acc)).round();
    out = out.div(Decimal.pow(base, acc));

    // Multiply the number by the base^powerN and add the sign back
    out = out.mul(Decimal.pow(base, powerN)).mul(xSign);
    return out;
}

export {
    equalsTolerance,
    inverseFunctionApprox,
    calculateSumLoop,
    calculateSumApprox,
    calculateSum,
    roundingBase,
    DEFAULT_ITERATIONS,
};
export type { MeanMode, EqualsToleranceConfig };
