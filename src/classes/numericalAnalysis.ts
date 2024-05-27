/**
 * @file Declares the numerical analysis functions (inverse function approximation, sum calculation).
 */
import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";

/**
 * The default amount of iterations to perform for the inverse function approximation and sum calculation.
 * Can be overriden by passing a custom amount of iterations.
 *
 * Notes:
 * - The higher the amount of iterations, the more accurate the result will be, but the longer it will take to calculate.
 * - Time complexity is O(n) where n is the amount of iterations, scaling with the complexity of the function.
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
 * @default 1e-3
 */
const DEFAULT_TOLERANCE = 1e-3;

/**
 * Represents different methods to calculate the mean.
 * Mode 1 `"arithmetic"` `(a+b)/2` is a bit faster but way less accurate for large numbers.
 * Mode 2 `"geometric"` `sqrt(ab)` is more accurate, and is the default.
 */
type MeanMode = "arithmetic" | "geometric" | 1 | 2;

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
function equalsTolerance (a: DecimalSource, b: DecimalSource, tolerance: DecimalSource, config?: Partial<EqualsToleranceConfig>): boolean {
    // Set the default values
    config = Object.assign({}, {
        verbose: false,
        mode: "geometric",
    } as EqualsToleranceConfig, config);

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

    if (config.verbose === true || (config.verbose === "onlyOnFail" && !result)) console.log({ a, b, tolerance, config, diff, result });

    return result;
}

/**
 * Approximates the inverse of a function at `n` using the bisection / binary search method.
 * @param f - The function to approximate the inverse of. It must be monotonically increasing and satisfy `f(n) >= n` for all `n >= 0`.
 * @param n - The value to approximate the inverse at.
 * @param mode - The mode/mean method to use. See {@link MeanMode}
 * @param iterations - The amount of iterations to perform. Defaults to {@link DEFAULT_ITERATIONS}.
 * @param tolerance - The tolerance to approximate the inverse with. Defaults to {@link DEFAULT_TOLERANCE}.
 * @returns An object containing the approximate inverse value `"value"` (defaults to the lower bound), the lower bound `"lowerBound"`, and the upper bound `"upperBound"`.
 * @example
 * const f = (x) => x.pow(2);
 * const inverse = inverseFunctionApprox(f, 16);
 * console.log(inverse.value); // ~3.9999999999999996
 */
function inverseFunctionApprox (f: (x: Decimal) => Decimal, n: DecimalSource, mode: MeanMode = "geometric", iterations = DEFAULT_ITERATIONS, tolerance = DEFAULT_TOLERANCE): { value: Decimal; lowerBound: Decimal; upperBound: Decimal } {
    // Set the initial bounds
    let lowerBound = new Decimal(1);
    // let upperBound = new Decimal(n);
    let upperBound = new Decimal(n);

    // If the function evaluates to 0, return 0
    if (f(upperBound).eq(0)) {
        return {
            value: new Decimal(0),
            lowerBound: new Decimal(0),
            upperBound: new Decimal(0),
        };
    }

    // If the function is not monotonically increasing, return the upper bound
    if (f(upperBound).lt(n)) {
        console.warn("The function is not monotonically increasing. (f(n) < n)");
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
        let mid: Decimal;

        // Determine the mean value
        switch (mode) {
            case "arithmetic":
            case 1:
                mid = lowerBound.add(upperBound).div(2);
                break;
            case "geometric":
            case 2:
                mid = lowerBound.mul(upperBound).sqrt();
                break;
        }

        const midValue = f(mid);
        // console.log({ lowerBound, upperBound, mid, midValue, n, i });

        // Stop the loop if the bounds are close enough
        if (equalsTolerance(lowerBound, upperBound, tolerance, { verbose: false, mode: "geometric" })) {
            // console.log("bounds close", { lowerBound, upperBound, mid, midValue, n, i });
            break;
        }

        if (midValue.lt(n)) {
            // If the value is less than the target, set the lower bound to the mid value
            lowerBound = mid;
        } else {
            // If the value is greater than the target, set the upper bound to the mid value
            upperBound = mid;
        }
    }

    const out = {
        value: lowerBound,
        lowerBound,
        upperBound,
    };

    // console.log(out);
    return out;
}

/**
 * Calculates the sum of `f(n)` from `a` to `b` using a basic loop until the sum is less than or equal to `epsilon` geometrically.
 * See {@link calculateSum} for a more general function.
 * @param f - The function `f(n)` to calculate the sum.
 * @param b - The upper limit for the sum.
 * @param a - The lower limit for the sum. Defaults to `0`. The order is reversed because `a` is optional. Deal with it.
 * @param epsilon - The maximum error tolerance, geometrically. Defaults to {@link DEFAULT_TOLERANCE}.
 * @returns The calculated sum of `f(n)`.
 */
function calculateSumLoop (f: (n: Decimal) => Decimal, b: DecimalSource, a: DecimalSource = 0, epsilon: DecimalSource = DEFAULT_TOLERANCE): Decimal {
    // epsilon = epsilon;
    let sum: Decimal = new Decimal();

    let n = new Decimal(b);

    // for (let n = new Decimal(a); n.lte(b); n = n.add(1)) {
    for (; n.gte(a); n = n.sub(1)) {
        // if (f(n).div(n).lt(epsilon)) break;
        const initSum = sum;
        const value = f(n);

        sum = sum.add(value);

        // If the difference/quotent between the inital sum and the new sum is less than epsilon, break
        const diff = initSum.div(sum);
        if (diff.lte(1) && diff.gt(new Decimal(1).sub(epsilon))) break;
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
 * @returns The calculated sum of `f(n)`.
 */
function calculateSumApprox (f: (n: Decimal) => Decimal, b: DecimalSource, a: DecimalSource = 0, iterations: number = DEFAULT_ITERATIONS): Decimal {
    // Initialize the values
    a = new Decimal(a);
    b = new Decimal(b);

    let sum = new Decimal(0);
    const intervalWidth = b.sub(a).div(iterations);

    for (let i = 0; i < iterations; i++) {
        const x0 = a.add(intervalWidth.mul(i));
        const x1 = a.add(intervalWidth.mul(i + 1));

        sum = sum.add(f(x0).add(f(x1)).div(2).mul(intervalWidth));
    }
    return sum;
}

/**
 * Calculates the sum of `f(n)` from `a` to `b` using either the trapezoidal rule or a basic loop depending on the size of `b - a`.
 * @param f - The function `f(n)` to calculate the sum.
 * @param b - The upper limit for the sum.
 * @param a - The lower limit for the sum. Defaults to `0`. The order is reversed because `a` is optional. Deal with it.
 * @param epsilon - The maximum error tolerance, geometrically. Defaults to {@link DEFAULT_TOLERANCE}. Only used if `b - a` is less than or equal to {@link DEFAULT_ITERATIONS}.
 * @param iterations - The amount of iterations to perform. Defaults to {@link DEFAULT_ITERATIONS}. Only used if `b - a` is greater than {@link DEFAULT_ITERATIONS}.
 * @returns - The calculated sum of `f(n)`.
 * @example
 * const f = (x) => x.pow(2);
 * const sum = calculateSum(f, 10);
 * console.log(sum); // ~385
 */
function calculateSum (f: (n: Decimal) => Decimal, b: DecimalSource, a: DecimalSource = 0, epsilon?: DecimalSource, iterations?: number): Decimal {
    a = new Decimal(a);
    b = new Decimal(b);
    if (b.sub(a).lte(DEFAULT_ITERATIONS)) {
        return calculateSumLoop(f, b, a, epsilon);
    } else {
        return calculateSumApprox(f, b, a, iterations);
    }
}

/**
 * Function to round a number to the nearest power of a specified base. Warning: Experimental, not tested on negative numbers / parameters.
 * @param x - The number to round.
 * @param base - The power base to round to.
 * @param acc - The accuracy / significant figures to round to.
 * @param max - The maximum power to round to.
 * @returns - The rounded number.
 * @example
 * console.log(roundingBase(123456789, 10, 0, 10)); // 100000000
 * console.log(roundingBase(123456789, 10, 1, 10)); // 120000000
 * console.log(roundingBase(123456789, 10, 2, 10)); // 123000000
 * console.log(roundingBase(245, 2, 0, 10)); // 256
 */
function roundingBase (x: DecimalSource, base: DecimalSource = 10, acc: DecimalSource = 0, max: DecimalSource = 1000): Decimal {
    x = new Decimal(x);
    // If the number is too large, don't round it
    if (x.gte(Decimal.pow(base, max))) return x;

    /** The power of the number, rounded. acc^power = x */
    const powerN = Decimal.floor(Decimal.log(x, base));

    let out = x.div(Decimal.pow(base, powerN));
    out = out.mul(Decimal.pow(base, acc)).round();
    out = out.div(Decimal.pow(base, acc));
    out = out.mul(Decimal.pow(base, powerN));
    return out;
}

export { equalsTolerance, inverseFunctionApprox, calculateSumLoop, calculateSumApprox, calculateSum, roundingBase, DEFAULT_ITERATIONS };
export type { MeanMode, EqualsToleranceConfig };
