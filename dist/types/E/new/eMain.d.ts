/**
 * @file idk use black magic and type gymnastics to make this work or something
 */
import type { DecimalSource, CompareResult } from "break_eternity.js";
import { Decimal } from "./declare";
import { FormatType } from "../format";
/**
 * A type representing the additional methods added to the Decimal class.
 */
interface DecimalAddedMethodsInterface {
    /**
     * Creates a clone of the Decimal instance.
     * @deprecated
     * @returns A Decimal instance that is a clone of the original.
     */
    clone(this: Decimal): Decimal;
    /**
     * Applies a soft cap to a Decimal value using a specified soft cap function.
     * @param start - The value at which the soft cap starts.
     * @param power - The power or factor used in the soft cap calculation.
     * @param mode - The soft cap mode. Use "pow" for power soft cap, "mul" for multiplication soft cap,
     * or "exp" for exponential soft cap.
     * @returns The Decimal value after applying the soft cap.
     */
    softcap(this: Decimal, start: DecimalSource, power: number, mode: string): Decimal;
    /**
     * Scales a currency value using a specified scaling function.
     * @param s - The value at which scaling starts.
     * @param p - The scaling factor.
     * @param mode - The scaling mode. Use "pow" for power scaling or "exp" for exponential scaling.
     * @param rev - Whether to reverse the scaling operation
     * @returns The scaled currency value.
     */
    scale(this: Decimal, s: DecimalSource, p: DecimalSource, mode: string | number, rev?: boolean): Decimal;
    /**
     * Formats the E instance with a specified accuracy and maximum Decimal places.
     * @param [acc] - The desired accuracy (number of significant figures), defaults to `2`.
     * @param [max] - The maximum number of Decimal places to display, defaults to `9`.
     * @param [type] - The type of format, defaults to `"mixed_sc"`.
     * @returns A string representing the formatted E value.
     */
    format(this: Decimal, acc?: number, max?: number, type?: FormatType): string;
    /**
     * Formats the E instance in standard leter notation with a specified accuracy and maximum Decimal places.
     * @param [acc] - The desired accuracy (number of significant figures).
     * @param [max] - The maximum number of Decimal places to display.
     * @param [type] - The type of format (default standard)
     * @returns A string representing the formatted E value.
     */
    formatST(this: Decimal, acc?: number, max?: number, type?: FormatType): string;
    /**
     * Formats the gain rate using the E instance.
     * @param gain - The gain value to compare
     * @param [type] - The type of format (default mixed scientific)
     * @param [acc] - The desired accuracy (number of significant figures).
     * @param [max] - The maximum number of decimal places to display.
     * @returns A string representing the formatted gain
     * @example
     * const currency = new Decimal(100);
     * const currencyGain = new Decimal(12);
     * const formatted = currency.formats.formatGain(currencyGain);
     * console.log(formatted); // should return "(+12/sec)"
     */
    formatGain(gain: DecimalSource, type: FormatType, acc?: number, max?: number): string;
    /**
     * Converts the E instance to a Roman numeral representation.
     * @param [max] - Max before it returns the original
     * @returns A string representing the Roman numeral equivalent of the E value,
     * or the original E instance if it is greater than or equal to 5000 or less than 1.
     */
    toRoman(this: Decimal, max?: DecimalSource): string | Decimal;
}
declare module "./declare" {
    /**
     * @deprecated If you are using `emath.js`, use {@link E} instead
     */
    interface Decimal extends DecimalAddedMethodsInterface {
    }
}
declare const DecimalAddedStaticMethods: {
    /**
     * Smoothly interpolates between the current value and the target value over time
     * using a smoothing factor and deltaTime.
     * @param current - The current value to interpolate from.
     * @param target - The target value to interpolate towards.
     * @param smoothing - The smoothing factor controlling the interpolation speed.
     *                           A higher value results in slower interpolation.
     * @param deltaTime - The time elapsed since the last frame in seconds.
     * @returns - The interpolated value between `current` and `target`.
     */
    smoothDamp(current: DecimalSource, target: DecimalSource, smoothing: DecimalSource, deltaTime: DecimalSource): Decimal;
    /**
     * Creates a clone of the E instance. Helps with a webpack(?) bug
     * @alias Decimal.normalizeFromComponents
     * @param x - The number to clone
     * @returns - The cloned number
     */
    clone(x: Decimal): Decimal;
    /**
     * Applies a soft cap to a Decimal value using a specified soft cap function.
     * See {@link DecimalAddedMethods.softcap} for more details.
     * @param value - The value to apply the soft cap to.
     * @param start - The value at which the soft cap starts.
     * @param power - The power or factor used in the soft cap calculation.
     * @param mode - The soft cap mode. Use "pow" for power soft cap, "mul" for multiplication soft cap,
     * or "exp" for exponential soft cap.
     * @returns The Decimal value after applying the soft cap.
     */
    softcap(value: DecimalSource, start: DecimalSource, power: number, mode: string): Decimal;
    /**
     * Scales a currency value using a specified scaling function.
     * See {@link DecimalAddedMethods.scale} for more details.
     * @param value - The value to scale.
     * @param s - The value at which scaling starts.
     * @param p - The scaling factor.
     * @param mode - The scaling mode. Use "pow" for power scaling or "exp" for exponential scaling.
     * @param rev - Whether to reverse the scaling operation
     * @returns The scaled currency value.
     */
    scale(value: DecimalSource, s: DecimalSource, p: DecimalSource, mode: string | number, rev?: boolean): Decimal;
    /**
     * Formats the E instance with a specified accuracy and maximum Decimal places.
     * See {@link DecimalAddedMethods.format} for more details.
     * @param e - The E instance to format.
     * @param [acc] - The desired accuracy (number of significant figures), defaults to `2`.
     * @param [max] - The maximum number of Decimal places to display, defaults to `9`.
     * @param [type] - The type of format, defaults to `"mixed_sc"`.
     * @returns A string representing the formatted E value.
     */
    format(e: DecimalSource, acc?: number, max?: number, type?: FormatType): string;
    /**
     * Formats the E instance in standard leter notation with a specified accuracy and maximum Decimal places.
     * See {@link DecimalAddedMethods.formatST} for more details.
     * @param value - The value to format.
     * @param [acc] - The desired accuracy (number of significant figures).
     * @param [max] - The maximum number of Decimal places to display.
     * @param [type] - The type of format (default standard)
     * @returns A string representing the formatted E value.
     */
    formatST(value: DecimalSource, acc?: number, max?: number, type?: FormatType): string;
    /**
     * Formats the gain rate using the E instance.
     * See {@link DecimalAddedMethods.formatGain} for more details.
     * @param value - The value to compare
     * @param gain - The gain value to compare
     * @param [type] - The type of format (default mixed scientific)
     * @param [acc] - The desired accuracy (number of significant figures).
     * @param [max] - The maximum number of decimal places to display.
     * @returns A string representing the formatted gain
     */
    formatGain(value: DecimalSource, gain: DecimalSource, type?: FormatType, acc?: number, max?: number): string;
    /**
     * Converts the E instance to a Roman numeral representation.
     * See {@link DecimalAddedMethods.toRoman} for more details.
     * @param value - The value to convert to a Roman numeral.
     * @param [max] - Max before it returns the original
     * @returns A string representing the Roman numeral equivalent of the E value,
     * or the original E instance if it is greater than or equal to 5000 or less than 1.
     */
    toRoman(value: DecimalSource, max: DecimalSource): string | Decimal;
    /**
     * Returns a random Decimal value between the specified minimum and maximum values.
     * This suffers from floating point errors if you want to generate a random number close to either the minimum or the maximum.
     * @param [min] - The minimum value, defaults to `0`.
     * @param [max] - The maximum value, defaults to `1`.
     * @returns A random Decimal value between the minimum and maximum values.
     */
    random(min?: DecimalSource, max?: DecimalSource): Decimal;
    /**
     * Returns a random boolean value based on the specified probability.
     * @param rng - The probability of returning `true`. Must be between `0` and `1`.
     * @returns A boolean value based on the probability.
     * @example
     * randomProb(0.5); // 50% chance of returning true
     * randomProb(0.25); // 25% chance of returning true
     * randomProb(new Decimal(1).div(1000)); // 1 in 1000 chance of returning true
     * // Anything less than ~1e-16 will always return false due to floating point errors
     */
    randomProb(rng: DecimalSource): boolean;
};
/**
 * A function that returns a Decimal instance. Also contains static methods and properties of the Decimal class.
 * @param x - The value to convert to a Decimal instance.
 * @returns - The Decimal instance.
 */
declare const E: ((x?: DecimalSource) => Decimal) & typeof Decimal & typeof DecimalAddedStaticMethods & {
    formats: typeof formats;
};
type E = Decimal;
declare const formats: {
    toSubscript: (value: number) => string;
    toSuperscript: (value: number) => string;
    formatST: (ex: import("index").ESource, acc?: number, max?: number, type?: FormatType) => string;
    format: (ex: import("index").ESource, acc?: number, max?: number, type?: FormatType) => string;
    formatGain: (amt: import("index").ESource, gain: import("index").ESource, type?: FormatType, acc?: number | undefined, max?: number | undefined) => string;
    formatTime: (ex: import("index").ESource, acc?: number, type?: string) => string;
    formatTimeLong: (ex: import("index").ESource, ms?: boolean, acc?: number, max?: number, type?: FormatType) => string;
    formatReduction: (ex: import("index").ESource) => string;
    formatPercent: (ex: import("index").ESource) => string;
    formatMult: (ex: import("index").ESource, acc?: number) => string;
    expMult: (a: import("index").ESource, b: import("index").ESource, base?: number) => import("E/e").Decimal;
    metric: (num: import("index").ESource, type: 0 | 1 | 2 | 3) => string;
    ev: (num: import("index").ESource, c2?: boolean) => string;
    omega: {
        config: {
            greek: string;
            infinity: string;
        };
        format(value: import("index").ESource): string;
    };
    omega_short: {
        config: {
            greek: string;
            infinity: string;
        };
        format(value: import("index").ESource): string;
    };
    elemental: {
        config: {
            element_lists: string[][];
        };
        getOffset(group: number): number;
        getAbbreviation(group: number, progress: number): string;
        beyondOg(x: number): string;
        abbreviationLength(group: number): number;
        getAbbreviationAndValue(x: import("E/e").Decimal): (string | import("E/e").Decimal)[];
        formatElementalPart(abbreviation: string, n: import("E/e").Decimal): string;
        format(value: import("E/e").Decimal, acc?: number): string;
    };
    old_sc: {
        format(ex: import("index").ESource, acc: number): string;
    };
    eng: {
        format(ex: import("index").ESource, acc?: number): string;
    };
    mixed_sc: {
        format(ex: import("index").ESource, acc?: number | undefined, max?: number): string;
    };
    layer: {
        layers: string[];
        format(ex: import("index").ESource, acc?: number, max?: number | undefined): string;
    };
    standard: {
        tier1(x: number): string;
        tier2(x: number): string;
    };
    inf: {
        format(ex: import("index").ESource, acc?: number | undefined, max?: number | undefined): string;
    };
    alphabet: {
        config: {
            alphabet: string;
        };
        getAbbreviation(ex: import("index").ESource, start?: import("index").ESource, startDouble?: boolean, abbStart?: number): string;
        format(ex: import("index").ESource, acc?: number, max?: number, type?: FormatType, start?: import("index").ESource, startDouble?: boolean, abbStart?: number | undefined): string;
    };
};
export { ST_NAMES, FormatTypeList } from "../format";
export type { FormatType } from "../format";
export { E };
export type { CompareResult, DecimalSource as ESource };
/**
 * @deprecated Use {@link E} instead
 */
export { Decimal };
