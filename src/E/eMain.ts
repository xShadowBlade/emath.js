/**
 * @file The main file for the Decimal library. Declares the E function and the E type.
 */
import { Decimal } from "./e";
import type { DecimalSource } from "./e";

/**
 * A function that returns a {@link Decimal} instance.
 * Also contains static methods and properties of the {@link Decimal} class,
 * and also functions as a type alias for the {@link Decimal} class.
 * @param x - The value to convert to a Decimal instance.
 * @returns The Decimal instance.
 */
const E: ((x?: DecimalSource) => Decimal) & typeof Decimal = ((): typeof E => {
    let shownWarning = false;
    const out = (x?: DecimalSource): Decimal => {
        if (!shownWarning) {
            console.warn(
                "eMath.js: The E function is deprecated. Use the Decimal class directly.",
            );
            shownWarning = true;
        }
        return new Decimal(x);
    };

    // Copy properties from Decimal to E
    Object.getOwnPropertyNames(Decimal)
        // Remove the properties that are not present in an empty class
        // eslint-disable-next-line @typescript-eslint/no-extraneous-class
        .filter((b) => !Object.getOwnPropertyNames(class {}).includes(b))
        // Assign the rest
        .forEach((prop) => {
            // @ts-expect-error - Assignment to a read-only property
            (out as typeof E)[prop as keyof typeof Decimal] =
                Decimal[prop as keyof typeof Decimal];
        });

    return out as typeof E;
})();

type E = Decimal;

/**
 * A Decimal source, which can be a number, a Decimal instance, or a string that can be converted to a Decimal.
 */
type ESource = DecimalSource;

export { E };
export type { ESource };
