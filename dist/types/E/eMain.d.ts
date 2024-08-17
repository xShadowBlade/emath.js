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
declare const E: ((x?: DecimalSource) => Decimal) & typeof Decimal;
type E = Decimal;
/**
 * A Decimal source, which can be a number, a Decimal instance, or a string that can be converted to a Decimal.
 */
type ESource = DecimalSource;
export { E };
export type { ESource };
