/**
 * @file Declares the number formatting functions
 */
import { E, ESource } from "./eMain";
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
        format(value: ESource): string;
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
        format(value: ESource): string;
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
        getAbbreviationAndValue(x: E): (string | import("break_eternity.js").default)[];
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
        format(ex: ESource, acc: number): string;
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
        format(ex: ESource, acc: number): string;
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
        format(ex: ESource, acc: number, max: number): string;
    };
    layer: {
        layers: string[];
        format(ex: ESource, acc: number, max: number): string;
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
        format(ex: ESource, acc: number, max: number): string;
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
declare function formatST(ex: ESource, acc?: number, max?: number, type?: "sc" | "st" | FormatType): string;
/**
 * Format the value into a specific format type
 * @param ex - The value to format
 * @param acc - The desired accuracy (number of significant figures), defaults to `2`.
 * @param max - The maximum number of E places to display, defaults to `9`.
 * @param type - The type of format to use (default "mixed_sc")
 * @returns - The formatted value
 */
declare function format(ex: ESource, acc?: number, max?: number, type?: FormatType): string;
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
declare function formatGain(amt: ESource, gain: ESource, type?: FormatType): string;
/**
 * Format the time
 * @param ex - The value to format (in seconds)
 * @param acc - The accuracy
 * @param type - The type
 * @returns - The formatted time
 */
declare function formatTime(ex: ESource, acc?: number, type?: string): string;
/**
 * Format the time long
 * @param ex - The value to format (in seconds)
 * @param ms - Whether to include milliseconds
 * @param acc - The accuracy
 * @param max - The maximum value
 * @param type - The type
 * @returns - The formatted time
 */
declare function formatTimeLong(ex: ESource, ms?: boolean, acc?: number, max?: number, type?: FormatType): string;
/**
 * Format the reduction
 * @param ex - The value to format
 * @returns - The formatted reduction
 */
declare function formatReduction(ex: ESource): string;
/**
 * Format the percent
 * @param ex - The value to format
 * @returns - The formatted percent
 */
declare function formatPercent(ex: ESource): string;
/**
 * Format the multiplier
 * @param ex - The value to format
 * @param acc - The accuracy
 * @returns - The formatted multiplier
 */
declare function formatMult(ex: ESource, acc?: number): string;
/**
 * Exponential multiplier
 * @param a - The value to exponentiate
 * @param b - The exponent
 * @param base - The base
 * @returns - The value after being exponentiated
 */
declare function expMult(a: ESource, b: ESource, base?: number): import("break_eternity.js").default;
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
declare function metric(num: ESource, type?: 0 | 1 | 2 | 3): string;
/**
 * Format the value into eV (includes metric prefixes)
 * @deprecated Use {@link metric} instead
 * @param num - The value to format
 * @param c2 - Whether to include /c^2
 * @returns The formatted value
 */
declare function ev(num: ESource, c2?: boolean): string;
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
        format(value: ESource): string;
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
        format(value: ESource): string;
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
        getAbbreviationAndValue(x: E): (string | import("break_eternity.js").default)[];
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
        format(ex: ESource, acc: number): string;
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
        format(ex: ESource, acc: number): string;
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
        format(ex: ESource, acc: number, max: number): string;
    };
    layer: {
        layers: string[];
        format(ex: ESource, acc: number, max: number): string;
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
        format(ex: ESource, acc: number, max: number): string;
    };
};
export { formats, FORMATS, ST_NAMES, FormatType, FormatTypeList };
