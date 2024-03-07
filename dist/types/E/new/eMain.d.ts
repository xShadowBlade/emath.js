/**
 * @file idk use black magic and type gymnastics to make this work or something
 */
import type { DecimalSource, CompareResult } from "break_eternity.js";
import { Decimal } from "./declare";
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
     * @returns A string representing the formatted gain
     * @example
     * const currency = new Decimal(100);
     * const currencyGain = new Decimal(12);
     * const formatted = currency.formats.formatGain(currencyGain);
     * console.log(formatted); // should return "(+12/sec)"
     */
    formatGain(this: Decimal, gain: DecimalSource, type?: FormatType): string;
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
    softcap(value: DecimalSource, start: DecimalSource, power: number, mode: string): Decimal;
    scale(value: DecimalSource, s: DecimalSource, p: DecimalSource, mode: string | number, rev?: boolean): Decimal;
    /**
     * Formats the E instance with a specified accuracy and maximum Decimal places.
     * @param e - The E instance to format.
     * @param [acc] - The desired accuracy (number of significant figures), defaults to `2`.
     * @param [max] - The maximum number of Decimal places to display, defaults to `9`.
     * @param [type] - The type of format, defaults to `"mixed_sc"`.
     * @returns A string representing the formatted E value.
     */
    format(e: DecimalSource, acc?: number, max?: number, type?: FormatType): string;
    formatST(value: DecimalSource, acc?: number, max?: number, type?: FormatType): string;
    formatGain(value: DecimalSource, gain: DecimalSource, type?: FormatType): string;
    toRoman(value: DecimalSource, max: DecimalSource): string | Decimal;
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
/** A list of names for the standard notation */
declare const ST_NAMES: string[][][];
type FormatType = "st" | "sc" | "scientific" | "omega" | "omega_short" | "elemental" | "old_sc" | "eng" | "mixed_sc" | "layer" | "standard" | "inf";
declare const FormatTypeList: FormatType[];
/** A list of formats */
declare const FORMATS: {
    /** Omega format */
    omega: {
        config: {
            greek: string;
            infinity: string;
        };
        /**
         * Format the value into omega format
         * @param value - The value to format
         * @returns - The formatted value
         */
        format(value: DecimalSource): string;
    };
    /** Short omega format */
    omega_short: {
        config: {
            greek: string;
            infinity: string;
        };
        /**
         * Format the value into short omega format
         * @param value - The value to format
         * @returns - The formatted value
         */
        format(value: DecimalSource): string;
    };
    elemental: {
        config: {
            /** The list of elements */
            element_lists: string[][];
        };
        getOffset(group: number): number;
        getAbbreviation(group: number, progress: number): string;
        beyondOg(x: number): string;
        abbreviationLength(group: number): number;
        getAbbreviationAndValue(x: E): (string | Decimal)[];
        formatElementalPart(abbreviation: string, n: E): string;
        format(value: E, acc: number): string;
    };
    /** Old scientific format */
    old_sc: {
        /**
         * Format the value into old scientific format
         * @param ex - The value to format
         * @param acc - The accuracy
         * @returns - The formatted value
         */
        format(ex: DecimalSource, acc: number): string;
    };
    /** Engineering format */
    eng: {
        /**
         * Format the value into engineering format
         * @param ex - The value to format
         * @param acc - The accuracy
         * @returns - The formatted value
         * @example
         * console.log(FORMATS.eng.format(1e20, 2)); // 100.00e18
         */
        format(ex: DecimalSource, acc: number): string;
    };
    mixed_sc: {
        /**
         * Format the value into mixed scientific format (standard or scientific depending on the value)
         * @param ex - The value to format
         * @param acc - The accuracy
         * @param max - The maximum value
         * @returns - The formatted value
         * @example
         * console.log(FORMATS.mixed_sc.format(1e20, 2, 9)); // 100.00 Qt
         * console.log(FORMATS.mixed_sc.format(1e400, 2, 303)); // 1.00e400
         */
        format(ex: DecimalSource, acc: number, max: number): string;
    };
    layer: {
        layers: string[];
        format(ex: DecimalSource, acc: number, max: number): string;
    };
    /** Standard (letter abbv) format */
    standard: {
        /**
         * Gets the letter abbreviation for a number (e.g. 1 -> K) (0-1e3000)
         * @param x - The number to get the letter abbreviation for
         * @returns - The letter abbreviation
         */
        tier1(x: number): string;
        /**
         * Gets the tier 2 letter abbreviation for a number (e.g. 1 -> Mi) (1e3000+)
         * @param x - The number to get the letter abbreviation for
         * @returns - The letter abbreviation
         */
        tier2(x: number): string;
    };
    inf: {
        format(ex: DecimalSource, acc: number, max: number): string;
    };
};
/**
 * Convert a number to a subscript
 * @param value - The value to convert
 * @returns - The value in subscript
 */
declare function toSubscript(value: number): string;
/**
 * Convert a number to a superscript
 * @param value - The value to convert
 * @returns - The value in superscript
 */
declare function toSuperscript(value: number): string;
/**
 * Format the value into standard (letter abbv) format
 * @deprecated Use {@link format} instead (with the type "st")
 */
declare function formatST(ex: DecimalSource, acc?: number, max?: number, type?: "sc" | "st" | FormatType): string;
/**
 * Format the value into a specific format type
 * @param ex - The value to format
 * @param acc - The desired accuracy (number of significant figures), defaults to `2`.
 * @param max - The maximum number of E places to display, defaults to `9`.
 * @param type - The type of format to use (default "mixed_sc")
 * @returns - The formatted value
 */
declare function format(ex: DecimalSource, acc?: number, max?: number, type?: FormatType): string;
/**
 * Format the gain
 * @param amt - The amount
 * @param gain - The gain
 * @param type - The type
 * @returns - The formatted gain
 * @example
 * console.log(formatGain(1e20, 1e10)); // (+1.00e10/sec)
 * console.log(formatGain(1e200, 1e210)); // (+10.00 OoMs/sec)
 */
declare function formatGain(amt: DecimalSource, gain: DecimalSource, type?: FormatType): string;
/**
 * Format the time
 * @param ex - The value to format (in seconds)
 * @param acc - The accuracy
 * @param type - The type
 * @returns - The formatted time
 */
declare function formatTime(ex: DecimalSource, acc?: number, type?: string): string;
/**
 * Format the time long
 * @param ex - The value to format (in seconds)
 * @param ms - Whether to include milliseconds
 * @param acc - The accuracy
 * @param max - The maximum value
 * @param type - The type
 * @returns - The formatted time
 */
declare function formatTimeLong(ex: DecimalSource, ms?: boolean, acc?: number, max?: number, type?: FormatType): string;
/**
 * Format the reduction
 * @param ex - The value to format
 * @returns - The formatted reduction
 */
declare function formatReduction(ex: DecimalSource): string;
/**
 * Format the percent
 * @param ex - The value to format
 * @returns - The formatted percent
 */
declare function formatPercent(ex: DecimalSource): string;
/**
 * Format the multiplier
 * @param ex - The value to format
 * @param acc - The accuracy
 * @returns - The formatted multiplier
 */
declare function formatMult(ex: DecimalSource, acc?: number): string;
/**
 * Exponential multiplier
 * @param a - The value to exponentiate
 * @param b - The exponent
 * @param base - The base
 * @returns - The value after being exponentiated
 */
declare function expMult(a: DecimalSource, b: DecimalSource, base?: number): Decimal;
/**
 * Converts a number to a metric representation based on the specified type.
 * @param num - The number to convert.
 * @param type - The type of metric representation to return.
 *   - 0: Returns the number with the metric abbreviation (e.g., "1.23 K").
 *   - 1: Returns only the metric abbreviation (e.g., "K").
 *   - 2: Returns the number divided by the metric value (e.g., "1.23").
 *   - 3: Returns the alternative name of the metric abbreviation (e.g., "Kilo").
 * @returns The metric representation of the number. If the number is greater than the highest metric value, the function returns the highest metric abbreviation.
 * @example
 * metric(1234, 0); // Returns "1.23 K"
 * metric(1234, 1); // Returns "K"
 * metric(1234, 2); // Returns "1.23"
 * metric(1234, 3); // Returns "Kilo"
 */
declare function metric(num: DecimalSource, type?: 0 | 1 | 2 | 3): string;
/**
 * Format the value into eV (includes metric prefixes)
 * @deprecated Use {@link metric} instead
 * @param num - The value to format
 * @param c2 - Whether to include /c^2
 * @returns The formatted value
 */
declare function ev(num: DecimalSource, c2?: boolean): string;
declare const formats: {
    toSubscript: typeof toSubscript;
    toSuperscript: typeof toSuperscript;
    formatST: typeof formatST;
    format: typeof format;
    formatGain: typeof formatGain;
    formatTime: typeof formatTime;
    formatTimeLong: typeof formatTimeLong;
    formatReduction: typeof formatReduction;
    formatPercent: typeof formatPercent;
    formatMult: typeof formatMult;
    expMult: typeof expMult;
    metric: typeof metric;
    ev: typeof ev;
    /** Omega format */
    omega: {
        config: {
            greek: string;
            infinity: string;
        };
        /**
         * Format the value into omega format
         * @param value - The value to format
         * @returns - The formatted value
         */
        format(value: DecimalSource): string;
    };
    /** Short omega format */
    omega_short: {
        config: {
            greek: string;
            infinity: string;
        };
        /**
         * Format the value into short omega format
         * @param value - The value to format
         * @returns - The formatted value
         */
        format(value: DecimalSource): string;
    };
    elemental: {
        config: {
            /** The list of elements */
            element_lists: string[][];
        };
        getOffset(group: number): number;
        getAbbreviation(group: number, progress: number): string;
        beyondOg(x: number): string;
        abbreviationLength(group: number): number;
        getAbbreviationAndValue(x: E): (string | Decimal)[];
        formatElementalPart(abbreviation: string, n: E): string;
        format(value: E, acc: number): string;
    };
    /** Old scientific format */
    old_sc: {
        /**
         * Format the value into old scientific format
         * @param ex - The value to format
         * @param acc - The accuracy
         * @returns - The formatted value
         */
        format(ex: DecimalSource, acc: number): string;
    };
    /** Engineering format */
    eng: {
        /**
         * Format the value into engineering format
         * @param ex - The value to format
         * @param acc - The accuracy
         * @returns - The formatted value
         * @example
         * console.log(FORMATS.eng.format(1e20, 2)); // 100.00e18
         */
        format(ex: DecimalSource, acc: number): string;
    };
    mixed_sc: {
        /**
         * Format the value into mixed scientific format (standard or scientific depending on the value)
         * @param ex - The value to format
         * @param acc - The accuracy
         * @param max - The maximum value
         * @returns - The formatted value
         * @example
         * console.log(FORMATS.mixed_sc.format(1e20, 2, 9)); // 100.00 Qt
         * console.log(FORMATS.mixed_sc.format(1e400, 2, 303)); // 1.00e400
         */
        format(ex: DecimalSource, acc: number, max: number): string;
    };
    layer: {
        layers: string[];
        format(ex: DecimalSource, acc: number, max: number): string;
    };
    /** Standard (letter abbv) format */
    standard: {
        /**
         * Gets the letter abbreviation for a number (e.g. 1 -> K) (0-1e3000)
         * @param x - The number to get the letter abbreviation for
         * @returns - The letter abbreviation
         */
        tier1(x: number): string;
        /**
         * Gets the tier 2 letter abbreviation for a number (e.g. 1 -> Mi) (1e3000+)
         * @param x - The number to get the letter abbreviation for
         * @returns - The letter abbreviation
         */
        tier2(x: number): string;
    };
    inf: {
        format(ex: DecimalSource, acc: number, max: number): string;
    };
};
export { formats, FORMATS, ST_NAMES, FormatTypeList };
export { E };
export type { CompareResult, DecimalSource as ESource, FormatType };
/**
 * @deprecated Use {@link E} instead
 */
export { Decimal };
