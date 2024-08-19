/**
 * @file Test suite for the Attribute class
 */
import { describe, it, beforeEach } from "mocha";
import { assert } from "chai";

import { AttributeStatic, Attribute, Decimal } from "emath.js";

describe("Attribute", () => {
    let testAttribute: Attribute;

    beforeEach(() => {
        testAttribute = new Attribute();
    });

    describe("constructor", () => {
        it("should create an attribute with default value 0", () => {
            assert(testAttribute.value.equals(Decimal.dZero));
        });

        it("should create an attribute with specified initial value", () => {
            const initialValue = new Decimal(100);
            testAttribute = new Attribute(initialValue);
            assert(testAttribute.value.equals(initialValue));
        });
    });
});

describe("AttributeStatic", () => {
    describe("constructor", () => {
        it("should create an attribute static with default initial value and boost disabled", () => {
            const attributeStatic = new AttributeStatic(undefined, false);
            assert(attributeStatic.value.equals(Decimal.dZero));
            assert.isNull(attributeStatic.boost);
        });

        it("should create an attribute static with specified initial value and boost enabled", () => {
            const initialValue = new Decimal(100);
            const attributeStatic = new AttributeStatic(
                undefined,
                true,
                initialValue,
            );
            assert(attributeStatic.value.equals(initialValue));
            assert.isNotNull(attributeStatic.boost);
        });
    });

    describe("value", () => {
        it("should return the value of the attribute static", () => {
            const initialValue = new Decimal(100);
            const attributeStatic = new AttributeStatic(
                undefined,
                true,
                initialValue,
            );
            assert(attributeStatic.value.equals(initialValue));
        });

        it("should update the value when the boost is updated", () => {
            const initialValue = new Decimal(100);
            const attributeStatic = new AttributeStatic(
                undefined,
                true,
                initialValue,
            );

            // Set boost
            attributeStatic.boost.setBoost({
                id: "testBoost",
                value: (e) => e.mul(2),
            });

            // Check updated value
            assert(attributeStatic.value.equals(new Decimal(200)));
        });
    });

    describe("set value", () => {
        it("should throw an error when boost is enabled", () => {
            const attributeStatic = new AttributeStatic(undefined, true);
            assert.throws(() => {
                attributeStatic.value = new Decimal(100);
            }, "Cannot set value of attributeStatic when boost is enabled.");
        });

        it("should set the value when boost is disabled", () => {
            const attributeStatic = new AttributeStatic(undefined, false);
            const newValue = new Decimal(100);
            attributeStatic.value = newValue;
            assert(attributeStatic.value.equals(newValue));
        });
    });
});
