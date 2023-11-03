/* global describe it beforeEach */
import { E } from "../src/index";

// @ts-ignore
import assert from "assert";

describe("E", () => {
    let testE: E;

    beforeEach(() => {
        testE = E(123.4567);
    });

    describe("constructor", () => {
        it("should create an E with correct value", () => {
            assert.equal(testE.equals(E("123456.7e-3")) && testE.equals(E(testE)), true);
        });
    });

    describe("format", () => {
        it("should format correctly", () => {
            assert.equal(testE.format(), "123");
            assert.equal(E.format(testE), "123");
        });
    });
});