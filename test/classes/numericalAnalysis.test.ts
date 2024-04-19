/**
 * @file Test suite for the numerical analysis functions
 */
import { E, inverseFunctionApprox, calculateSum } from "emath.js";
import assert from "assert";
import { EEqualsTolerance, EEqualsToleranceConfig } from "../shared/EShared";

const equalTolerance = 1e-3;
const toleranceConfig: EEqualsToleranceConfig = {
    verbose: "onlyOnFail",
    mode: "geometric",
};

describe("inverseFunctionApprox", () => {
    it("should return the correct result when the function evaluates to 0", () => {
        const f = (x: E) => x.sub(5);
        const result = inverseFunctionApprox(f, E(5));
        assert(result.value.eq(0));
        assert(result.lowerBound.eq(0));
        assert(result.upperBound.eq(0));
    });

    it("should return the upper bound when the function is not monotonically increasing", () => {
        const f = (x: E) => x.sub(5);
        const result = inverseFunctionApprox(f, E(10));
        assert(EEqualsTolerance(result.value, 10, equalTolerance, toleranceConfig));
        assert(EEqualsTolerance(result.lowerBound, 10, equalTolerance, toleranceConfig));
        assert(EEqualsTolerance(result.upperBound, 10, equalTolerance, toleranceConfig));
    });

    it("should return the correct result for arithmetic mode", () => {
        const f = (x: E) => x.mul(x).sub(9);
        const result = inverseFunctionApprox(f, 16, "arithmetic");
        assert(EEqualsTolerance(result.value, 5, equalTolerance, toleranceConfig));
        assert(EEqualsTolerance(result.lowerBound, 5, equalTolerance, toleranceConfig));
        assert(EEqualsTolerance(result.upperBound, 5, equalTolerance, toleranceConfig));
    });

    it("should return the correct result for geometric mode", () => {
        const f = (x: E) => x.mul(x).sub(9);
        const result = inverseFunctionApprox(f, 16, "geometric");
        assert(EEqualsTolerance(result.value, 5, equalTolerance, toleranceConfig));
        assert(EEqualsTolerance(result.lowerBound, 5, equalTolerance, toleranceConfig));
        assert(EEqualsTolerance(result.upperBound, 5, equalTolerance, toleranceConfig));
    });

    it("should return the correct result for the default number of iterations", () => {
        const f = (x: E) => x.mul(x).sub(9);
        const result = inverseFunctionApprox(f, 16);
        assert(EEqualsTolerance(result.value, 5, equalTolerance, toleranceConfig));
        assert(EEqualsTolerance(result.lowerBound, 5, equalTolerance, toleranceConfig));
        assert(EEqualsTolerance(result.upperBound, 5, equalTolerance, toleranceConfig));
    });

    it("should return the correct result for a custom number of iterations", () => {
        const f = (x: E) => x.mul(x).sub(9);
        const result = inverseFunctionApprox(f, 16, "geometric", 10);
        assert(EEqualsTolerance(result.value, 5, equalTolerance * 100, toleranceConfig));
        assert(EEqualsTolerance(result.lowerBound, 5, equalTolerance * 100, toleranceConfig));
        assert(EEqualsTolerance(result.upperBound, 5, equalTolerance * 100, toleranceConfig));
    });
});

describe("calculateSum", () => {
    it("should return the correct result for a simple sum", () => {
        const f = (x: E) => x;
        const result = calculateSum(f, 10);
        assert(EEqualsTolerance(result, 55, equalTolerance, toleranceConfig));
    });

    it("should return the correct result for a more complex sum", () => {
        const f = (x: E) => x.pow(2);
        const result = calculateSum(f, 10);
        assert(EEqualsTolerance(result, 385, equalTolerance, toleranceConfig));
    });

    it("should return the correct result for higher bounds, using approximation", () => {
        const f = (x: E) => x.pow(2);
        const result = calculateSum(f, 1e3);
        assert(EEqualsTolerance(result, 333833500, equalTolerance, toleranceConfig));
    });

    it("should return the correct result for a custom lower bound", () => {
        const f = (x: E) => x;
        const result = calculateSum(f, 10, 5);
        assert(EEqualsTolerance(result, 45, equalTolerance, toleranceConfig));
    });
});