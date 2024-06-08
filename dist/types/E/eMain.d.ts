/**
 * @file The main file for the Decimal library.
 */
import { Decimal } from "./e";
import type { DecimalSource } from "./e";
/**
 * A function that returns a Decimal instance. Also contains static methods and properties of the Decimal class.
 * @deprecated Use the Decimal class directly. This function will be removed in a future version.
 * @param x - The value to convert to a Decimal instance.
 * @returns - The Decimal instance.
 */
declare const E: ((x?: DecimalSource) => Decimal) & typeof Decimal;
type E = Decimal;
/**
 * @deprecated Use the DecimalSource type directly. This type will be removed in a future version.
 */
type ESource = DecimalSource;
export { E };
export type { ESource };
