/**
 * @file Test suite for the Decimal class
 */
import { describe, it, beforeEach } from "mocha";
import { assert } from "chai";

import { Decimal } from "emath.js";

interface TestE {
    value: Decimal;
    formatted: string;
}

describe("Decimal", () => {
    let testE: Decimal;
    let testEArray: TestE[];
    // let testEArrayFormatted: string[];

    beforeEach(() => {
        testE = new Decimal(123.4567);
        // testEArray = [new Decimal(423), new Decimal(1e4), new Decimal("1e999")];
        // testEArrayFormatted = ["423", "10,000", "1e999"];
        testEArray = [
            {
                value: new Decimal(423),
                formatted: "423",
            },
            {
                value: new Decimal(1e4),
                formatted: "10,000",
            },
            {
                value: new Decimal("1e999"),
                formatted: "1.00e999",
            },
            {
                value: new Decimal(2).tetrate(5),
                formatted: "2.00e19,728",
            },
            {
                value: new Decimal(23.42345),
                formatted: "23.4",
            },
        ];
    });

    describe("constructor", () => {
        it("should create an Decimal with correct value", () => {
            assert(testE.equals(new Decimal("123456.7e-3")) && testE.equals(new Decimal(testE)));
        });
    });

    describe("format", () => {
        it("should format correctly", () => {
            assert.equal(testE.format(), "123");
            assert.equal(Decimal.format(testE), "123");
            testEArray.forEach((e, i) => {
                // assert.equal(e.format(), testEArrayFormatted[i]);
                assert.equal(e.value.format(), testEArray[i].formatted);
            });
        });
    });
});
