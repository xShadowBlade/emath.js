/**
 * @file Declares the numerical analysis functions (inverse function approximation, sum calculation).
 */
import { E, ESource } from "../E/eMain";

/**
 * The default amount of iterations to perform for the inverse function approximation and sum calculation.
 * Can be overriden by passing a custom amount of iterations.
 *
 * Notes:
 * - The higher the amount of iterations, the more accurate the result will be, but the longer it will take to calculate.
 * - Time complexity is O(n) where n is the amount of iterations, scaling with the complexity of the function.
 * - At 10 or less iterations, the time it takes to calculate is almost instant.
 * - At 25 iterations, the time it takes to calculate is ~1 ms
 * - At 100 iterations, the time it takes to calculate is ~2 ms but with marginal accuracy improvements.
 * - At 1000 iterations, the time it takes to calculate is ~7 ms but with very marginal accuracy improvements.
 * - At 10000 iterations, the time it takes to calculate is ~30 ms.
 * @default 25
 */
const DEFAULT_ITERATIONS = 25;

/**
 * Represents different methods to calculate the mean.
 * Mode 1 `"arithmetic"` `(a+b)/2` is a bit faster but way less accurate for large numbers.
 * Mode 2 `"geometric"` `sqrt(ab)` is more accurate, and is the default.
 */
type MeanMode = "arithmetic" | "geometric" | 1 | 2;

/**
 * Approximates the inverse of a function at `n` using the bisection / binary search method.
 * @param f - The function to approximate the inverse of. It must be monotonically increasing.
 * @param n - The value to approximate the inverse at.
 * @param mode - The mode/mean method to use. See {@link MeanMode}
 * @param iterations - The amount of iterations to perform. Defaults to {@link DEFAULT_ITERATIONS}.
 * @returns An object containing the approximate inverse value `"value"` (defaults to the lower bound), the lower bound `"lowerBound"`, and the upper bound `"upperBound"`.
 * @example
 * const f = (x) => x.pow(2);
 * const inverse = inverseFunctionApprox(f, 16);
 * console.log(inverse.value); // ~3.9999999999999996
 */
function inverseFunctionApprox (f: (x: E) => E, n: ESource, mode: MeanMode = "geometric", iterations = DEFAULT_ITERATIONS) {
    // Set the initial bounds
    let lowerBound = E(1);
    // let upperBound = E(n);
    let upperBound = E(n);

    // If the function evaluates to 0, return 0
    if (f(upperBound).eq(0)) {
        return {
            value: E(0),
            lowerBound: E(0),
            upperBound: E(0),
        };
    }

    // If the function is not monotonically increasing, return the upper bound
    if (f(upperBound).lt(n)) {
        console.warn("The function is not monotonically increasing. (f(n) < n)");
        console.log({ lowerBound, upperBound, iterations, n, f: f(upperBound)});
        return {
            value: upperBound,
            lowerBound: upperBound,
            upperBound: upperBound,
        };
    }

    // console.log({ lowerBound, upperBound, iterations });
    // Perform the bisection / binary search
    for (let i = 0; i < iterations; i++) {
        let mid: E;
        switch (mode) {
        case "arithmetic":
        case 1:
            mid = lowerBound.add(upperBound).div(2);
            break;
        case "geometric":
        case 2:
            mid = lowerBound.mul(upperBound).sqrt();
            break;
            // case "pow":
            //     mid = lowerBound.pow(upperBound).ssqrt();
        }

        const midValue = f(mid);
        if (midValue.eq(n)) {
            return {
                value: mid,
                lowerBound: mid,
                upperBound: mid,
            };
        } else if (midValue.lt(n)) {
            lowerBound = mid;
        } else {
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
 * @param epsilon - The maximum error tolerance, geometrically. Defaults to `1e-3`.
 * @returns The calculated sum of `f(n)`.
 */
function calculateSumLoop (f: (n: E) => E, b: ESource, a: ESource = 0, epsilon: ESource = E("1e-3")): E {
    // epsilon = epsilon;
    let sum: E = E();

    let n = E(b);

    // for (let n = E(a); n.lte(b); n = n.add(1)) {
    for (; n.gte(a); n = n.sub(1)) {
        // if (f(n).div(n).lt(epsilon)) break;
        const initSum = sum;
        const value = f(n);

        sum = sum.add(value);

        // If the difference/quotent between the inital sum and the new sum is less than epsilon, break
        const diff = initSum.div(sum);
        if (diff.lte(1) && diff.gt(E(1).sub(epsilon))) break;
    }
    // console.log({ sum, iterations: E(b).sub(n).add(a) });
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
function calculateSumApprox (f: (n: E) => E, b: ESource, a: ESource = 0, iterations: number = DEFAULT_ITERATIONS): E {
    a = E(a);
    b = E(b);

    let sum = E(0);
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
 * @param epsilon - The maximum error tolerance, geometrically. Defaults to `1e-3`. Only used if `b - a` is less than or equal to {@link DEFAULT_ITERATIONS}.
 * @param iterations - The amount of iterations to perform. Defaults to {@link DEFAULT_ITERATIONS}. Only used if `b - a` is greater than {@link DEFAULT_ITERATIONS}.
 * @returns - The calculated sum of `f(n)`.
 * @example
 * const f = (x) => x.pow(2);
 * const sum = calculateSum(f, 10);
 * console.log(sum); // ~385
 */
function calculateSum (f: (n: E) => E, b: ESource, a: ESource = 0, epsilon?: ESource, iterations?: number): E {
    a = E(a);
    b = E(b);
    if (b.sub(a).lte(DEFAULT_ITERATIONS)) {
        return calculateSumLoop(f, b, a, epsilon);
    } else {
        return calculateSumApprox(f, b, a, iterations);
    }
}

export { inverseFunctionApprox, calculateSumLoop, calculateSumApprox, calculateSum, MeanMode, DEFAULT_ITERATIONS };