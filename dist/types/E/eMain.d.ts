/**
 * @file The main file for the Decimal library.
 */
import { Decimal } from "./e";
import type { DecimalSource } from "./e";
/**
 * A function that returns a Decimal instance. Also contains static methods and properties of the Decimal class.
 * @param x - The value to convert to a Decimal instance.
 * @returns - The Decimal instance.
 */
declare const Decimal: ((x?: DecimalSource) => Decimal) & typeof Decimal;
type Decimal = Decimal;
export { Decimal, DecimalSource };
export { FORMATS, FormatTypeList } from "./e";
export type { FormatType } from "./e";
