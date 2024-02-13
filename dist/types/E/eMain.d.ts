/**
 * @file The main file for the E library.
 */
import { Decimal } from "./e";
import type { DecimalSource } from "./e";
/**
 * A function that returns a Decimal instance. Also contains static methods and properties of the Decimal class.
 * @param x - The value to convert to a Decimal instance.
 * @returns - The Decimal instance.
 */
declare const E: typeof Decimal & ((x?: DecimalSource) => Decimal);
type E = Decimal;
export { E, DecimalSource as ESource };
export { FORMATS, FormatTypeList } from "./e";
export type { FormatType } from "./e";
