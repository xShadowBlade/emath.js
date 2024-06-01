/**
 * @file Test suite for the numerical analysis functions
 */
import { describe, it, beforeEach } from "mocha";
import { assert } from "chai";

import { Decimal, inverseFunctionApprox, calculateSum, equalsTolerance, roundingBase } from "emath.js";
import type { EqualsToleranceConfig } from "emath.js";

// import { EEqualsTolerance as equalsTolerance, EEqualsToleranceConfig } from "../shared/EShared";

const equalTolerance = 5e-3;
const toleranceConfig: EqualsToleranceConfig = {
    verbose: "onlyOnFail",
    mode: "geometric",
};

// describe("equalsTolerance", () => {
//     it("should return true for equal numbers", () => {
//         assert(equalsTolerance(1, 1, equalTolerance, toleranceConfig));
//     });

//     it("should return true for numbers within the tolerance", () => {
//         assert(equalsTolerance(1, 1 + 5e-4, equalTolerance, toleranceConfig));
//     });

//     it("should return false for numbers outside the tolerance", () => {
//         assert(!equalsTolerance(1, 1 + 5e-3, equalTolerance, toleranceConfig));
//     });
// });

describe("inverseFunctionApprox", () => {
    it("should return the correct result when the function evaluates to 0", () => {
        const f = (x: Decimal) => x.sub(5);
        const result = inverseFunctionApprox(f, new Decimal(5));
        assert(result.value.eq(0));
        assert(result.lowerBound.eq(0));
        assert(result.upperBound.eq(0));
    });

    it("should return the upper bound when the function is not monotonically increasing", () => {
        const f = (x: Decimal) => x.sub(5);
        const result = inverseFunctionApprox(f, new Decimal(10));
        assert(equalsTolerance(result.value, 10, equalTolerance, toleranceConfig));
        assert(equalsTolerance(result.lowerBound, 10, equalTolerance, toleranceConfig));
        assert(equalsTolerance(result.upperBound, 10, equalTolerance, toleranceConfig));
    });

    it("should return the correct result for arithmetic mode", () => {
        const f = (x: Decimal) => x.mul(x).sub(9);
        const result = inverseFunctionApprox(f, 16, "arithmetic");
        assert(equalsTolerance(result.value, 5, equalTolerance, toleranceConfig));
        assert(equalsTolerance(result.lowerBound, 5, equalTolerance, toleranceConfig));
        assert(equalsTolerance(result.upperBound, 5, equalTolerance, toleranceConfig));
    });

    it("should return the correct result for geometric mode", () => {
        const f = (x: Decimal) => x.mul(x).sub(9);
        const result = inverseFunctionApprox(f, 16, "geometric");
        assert(equalsTolerance(result.value, 5, equalTolerance, toleranceConfig));
        assert(equalsTolerance(result.lowerBound, 5, equalTolerance, toleranceConfig));
        assert(equalsTolerance(result.upperBound, 5, equalTolerance, toleranceConfig));
    });

    it("should return the correct result for the default number of iterations", () => {
        const f = (x: Decimal) => x.mul(x).sub(9);
        const result = inverseFunctionApprox(f, 16);
        assert(equalsTolerance(result.value, 5, equalTolerance, toleranceConfig));
        assert(equalsTolerance(result.lowerBound, 5, equalTolerance, toleranceConfig));
        assert(equalsTolerance(result.upperBound, 5, equalTolerance, toleranceConfig));
    });

    it("should return the correct result for a custom number of iterations", () => {
        const f = (x: Decimal) => x.mul(x).sub(9);
        const result = inverseFunctionApprox(f, 16, "geometric", 10);
        assert(equalsTolerance(result.value, 5, equalTolerance * 100, toleranceConfig));
        assert(equalsTolerance(result.lowerBound, 5, equalTolerance * 100, toleranceConfig));
        assert(equalsTolerance(result.upperBound, 5, equalTolerance * 100, toleranceConfig));
    });

    it("should return the correct result for large inputs", () => {
        const f = (x: Decimal) => x.mul(x).sub(9);
        const result = inverseFunctionApprox(f, 152399016);
        assert(equalsTolerance(result.value, 12345, equalTolerance, toleranceConfig));
    });
});

describe("calculateSum", () => {
    it("should return the correct result for a simple sum", () => {
        const f = (x: Decimal) => x;
        const result = calculateSum(f, 10);
        assert(equalsTolerance(result, 55, equalTolerance, toleranceConfig));
    });

    it("should return the correct result for a more complex sum", () => {
        const f = (x: Decimal) => x.pow(2);
        const result = calculateSum(f, 10);
        assert(equalsTolerance(result, 385, equalTolerance, toleranceConfig));
    });

    it("should return the correct result for higher bounds, using approximation", () => {
        const f = (x: Decimal) => x.pow(2);
        const result = calculateSum(f, 1e3);
        assert(equalsTolerance(result, 333833500, equalTolerance, toleranceConfig));
    });

    it("should return the correct result for a custom lower bound", () => {
        const f = (x: Decimal) => x;
        const result = calculateSum(f, 10, 5);
        assert(equalsTolerance(result, 45, equalTolerance, toleranceConfig));
    });
});

// describe("roundingBase", () => {
//     it("should return the correct result for a simple base", () => {
//         assert(roundingBase(123456789, 10, 0, 10).eq(100000000));
//     });

//     it("should return the correct result for a more simple base with the desired accuracy", () => {
//         assert(roundingBase(123456789, 10, 1, 10).eq(120000000));
//         assert(roundingBase(123456789, 10, 2, 10).eq(123000000));
//     });

//     it("should return the correct result for a more complex base", () => {
//         assert(roundingBase(245, 2, 0, 10).eq(256));
//     });
// });
