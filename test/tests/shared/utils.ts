/**
 * @file Declares utility functions for the tests
 */
import { Decimal } from "emath.js";
import type { DecimalSource } from "emath.js";
import { assert } from "chai";

/**
 * Asserts that two Decimal instances are equal.
 * @param e1 - The first Decimal instance.
 * @param e2 - The second Decimal instance.
 */
function assertDecimal(e1: DecimalSource, e2: DecimalSource): void {
    e1 = new Decimal(e1);
    e2 = new Decimal(e2);

    // Could be sometimes buggy, so we need to check if the values are the same
    assert.equal(e1.toString(), e2.toString());
}

export { assertDecimal };
