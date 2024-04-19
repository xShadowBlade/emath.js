/**
 * @file Test suite for the E class
 */
// import { E } from "../src/index";
import { E } from "emath.js";
import assert from "assert";

interface TestE {
    value: E;
    formatted: string;
}

describe("E", () => {
    let testE: E;
    let testEArray: TestE[];
    // let testEArrayFormatted: string[];

    beforeEach(() => {
        testE = E(123.4567);
        // testEArray = [E(423), E(1e4), E("1e999")];
        // testEArrayFormatted = ["423", "10,000", "1e999"];
        testEArray = [
            {
                value: E(423),
                formatted: "423",
            },
            {
                value: E(1e4),
                formatted: "10,000",
            },
            {
                value: E("1e999"),
                formatted: "1.00e999",
            },
            {
                value: E(2).tetrate(5),
                formatted: "2.00e19,728",
            },
            {
                value: E(23.42345),
                formatted: "23.4",
            },
        ];
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
            testEArray.forEach((e, i) => {
                // assert.equal(e.format(), testEArrayFormatted[i]);
                assert.equal(e.value.format(), testEArray[i].formatted);
            });
        });
    });
});
