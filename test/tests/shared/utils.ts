/**
 * @file Declares utility functions for the tests
 */
import { Decimal } from "emath.js";
import type { DecimalSource } from "emath.js";
import { assert } from "chai";

/**
 * Asserts that two Decimal instances are equal.
 * @deprecated
 * @param e1 - The first Decimal instance.
 * @param e2 - The second Decimal instance.
 */
function assertDecimal(e1: DecimalSource, e2: DecimalSource): void {
    e1 = new Decimal(e1);
    e2 = new Decimal(e2);

    // Could be sometimes buggy, so we need to check if the values are the same
    assert.equal(e1.toString(), e2.toString());
}

/**
 * Implementation of `window.localStorage` for server-side testing.
 * Use {@link localStorageTest} instead of `window.localStorage` in tests.
 */
class LocalStorageTest implements Storage {
    private store: Record<string, string> = {};

    public clear(): void {
        this.store = {};
    }

    public key(index: number): string | null {
        return Object.keys(this.store)[index] ?? null;
    }

    public get length(): number {
        return Object.keys(this.store).length;
    }

    public getItem(key: string): string | null {
        return this.store[key] ?? null;
    }

    public setItem(key: string, value: string): void {
        this.store[key] = value;
    }

    public removeItem(key: string): void {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete this.store[key];
    }
}

/**
 * An instance of {@link LocalStorageTest} for testing.
 */
const localStorageTest = new LocalStorageTest();

export { assertDecimal, LocalStorageTest, localStorageTest };
