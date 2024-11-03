/**
 * @file Numerical analysis functions for approximating summations.
 */
import type { DecimalSource } from "../../E/e";
import { Decimal } from "../../E/e";
import { DEFAULT_TOLERANCE, DEFAULT_ITERATIONS, equalsTolerance } from "./numericalAnalysis";

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
// TODO: this is a pretty terrible approximation ngl

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
function calculateSumApproxOld(
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

        sum = sum.add(f(x0).add(f(x1)));

        // console.log({
        //     oldSum: oldSum.format(),
        //     sum: sum.format(),
        //     delta: sum.sub(oldSum).format(),
        //     x0: x0.format(),
        //     x1: x1.format(),
        //     i,
        // });

        // Stop the loop if the sums don't change much (removed, it is actually slower)
    }
    return sum.div(2).mul(intervalWidth);
}

/**
 * Approximates the sum of `f(n)` from `a` to `b` using a midpoint riemann sum.
 * See {@link calculateSum} for a more general function.
 * @param f - The function `f(n)` to calculate the sum.
 * @param b - The upper limit for the sum.
 * @param a - The lower limit for the sum. Defaults to `0`. The order is reversed because `a` is optional. Deal with it.
 * @param iterations - The amount of iterations to perform. Defaults to {@link DEFAULT_ITERATIONS}.
 * @returns The calculated sum of `f(n)`, as a {@link Decimal}.
 */
function calculateSumApprox(
    f: (n: Decimal) => Decimal,
    b: DecimalSource,
    a: DecimalSource = 0,
    iterations: number = DEFAULT_ITERATIONS,
): Decimal {
    // Initialize the values
    a = new Decimal(a);
    b = new Decimal(b);

    let sum = Decimal.dZero;
    const intervalWidth = b.sub(a).div(iterations);

    // w\sum_{n=0}^{i}f\left(a+nw\right)
    for (let i = iterations - 1; i >= 0; i--) {
        sum = sum.add(f(a.add(intervalWidth.mul(i))));

        // console.log({
        //     oldSum: oldSum.format(),
        //     sum: sum.format(),
        //     delta: sum.sub(oldSum).format(),
        //     x0: x0.format(),
        //     x1: x1.format(),
        //     i,
        // });

        // Stop the loop if the sums don't change much (removed, it is actually slower)
    }

    return sum.mul(intervalWidth);
}

// Test
// const f = (x: Decimal): Decimal => x.pow(1.1).add(x);

// Compare the two methods
// console.time("old");
// for (let i = 0; i < 10000; i++) calculateSumApproxOld(f, 10000);

// const sumOld = calculateSumApproxOld(f, 10000);
// console.log(sumOld.format());
// console.log(equalsTolerance(sumOld, 333383335000, 1e-3, { verbose: true, mode: "geometric" }));
// console.timeEnd("old");

// console.time("new");
// for (let i = 0; i < 10000; i++) calculateSumApprox(f, 10000);

// const sumNew = calculateSumApprox(f, 10000);
// console.log(sumNew.format());
// console.log(equalsTolerance(sumNew, 333383335000, 1e-3, { verbose: true, mode: "geometric" }));
// console.timeEnd("new");

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

export { calculateSumLoop, calculateSumApprox, calculateSum, calculateSumApproxOld };
