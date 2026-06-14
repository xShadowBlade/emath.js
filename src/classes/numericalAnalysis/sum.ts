/**
 * @file Numerical analysis functions for approximating summations.
 */
import type { DecimalSource } from "../../E/e";
import { Decimal } from "../../E/e";
import { DEFAULT_TOLERANCE, DEFAULT_ITERATIONS, geometricEqualsTolerance, DEFAULT_ITERATIONS_AS_DECIMAL } from "./numericalAnalysis";

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
    a: DecimalSource = Decimal.dZero,
    epsilon: number = DEFAULT_TOLERANCE,
): Decimal {
    // Initialize the values
    let sum: Decimal = Decimal.dZero;
    let n = Decimal.fromValue_noAlloc(b);

    // Perform the loop (decrementing n to sometimes take advantage of epsilon)
    for (; n.gte(a); n = n.add(Decimal.dNegOne)) {
        const initSum = sum;
        const value = f(n);

        sum = sum.add(value);

        // If the difference/quotient between the initial sum and the new sum is less than epsilon, break
        if (geometricEqualsTolerance(initSum, sum, epsilon)) break;
    }
    return sum;
}

/**
 * Approximates the sum of `f(n)` from `a` to `b` using a midpoint riemann sum.
 * See {@link calculateSum} for a more general function.
 * @param f - The function `f(n)` to calculate the sum.
 * @param b - The upper limit for the sum.
 * @param a - The lower limit for the sum. Defaults to `0`. The order is reversed because `a` is optional. Deal with it.
 * @param iterations - The amount of iterations to perform. Defaults to {@link DEFAULT_ITERATIONS} - 10.
 * @param bSubA - The value of `b - a`. If not provided, it will be calculated as `b - a`. This is an optimization for when you want to calculate multiple sums with the same `b - a` but different `a` and `b`, so you don't have to calculate `b - a` every time.
 * @returns The calculated sum of `f(n)`, as a {@link Decimal}.
 */
function calculateSumApprox(
    f: (n: Decimal) => Decimal,
    b: DecimalSource,
    a: DecimalSource = Decimal.dZero,
    iterations: number = DEFAULT_ITERATIONS - 10,
    bSubA?: Decimal,
): Decimal {
    // Initialize the values
    a = Decimal.fromValue_noAlloc(a);
    b = Decimal.fromValue_noAlloc(b);

    let sum = Decimal.dZero;
    const intervalWidth = bSubA ? bSubA.div(iterations) : b.sub(a).div(iterations);

    let currentSample = b;

    // w\sum_{n=0}^{i}f\left(a+nw\right)
    for (let i = iterations - 1; i >= 0; i--) {
        const oldSum = sum;
        currentSample = currentSample.sub(intervalWidth);
        sum = sum.add(f(currentSample));

        // console.log({
        //     oldSum: oldSum.format(),
        //     sum: sum.format(),
        //     delta: sum.sub(oldSum).format(),
        //     x0: x0.format(),
        //     x1: x1.format(),
        //     i,
        // });

        // Stop the loop if the sums don't change much
        if (geometricEqualsTolerance(oldSum, sum)) break;
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
    a: DecimalSource = Decimal.dZero,
    epsilon?: number,
    iterations?: number,
): Decimal {
    a = Decimal.fromValue_noAlloc(a);
    b = Decimal.fromValue_noAlloc(b);

    const bMinusA = b.sub(a);

    if (bMinusA.lte(DEFAULT_ITERATIONS_AS_DECIMAL)) {
        return calculateSumLoop(f, b, a, epsilon);
    } else {
        return calculateSumApprox(f, b, a, iterations, bMinusA);
    }
}

export { calculateSumLoop, calculateSumApprox, calculateSum };
