/**
 * @file Declares a generator function for formats for the Decimal library.
 * Adapted from MrRedShark77's Incremental Mass Rewritten (https://github.com/MrRedShark77/incremental-mass-rewritten)
 * Modified to be written in typescript and adds JSDoc comments.
 */
/**
 * MIT License
 *
 * Copyright (c) 2021 MrRedShark77
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 */
import type { Decimal as DecimalType, DecimalSource } from "./e";
type Decimal = DecimalType;
type FormatType = "st" | "sc" | "scientific" | "omega" | "omega_short" | "elemental" | "old_sc" | "eng" | "mixed_sc" | "layer" | "standard" | "inf" | "alphabet";
/** A list of names for the standard notation */
declare const ST_NAMES: string[][][];
declare const FormatTypeList: FormatType[];
/**
 * Generates a format function for the Decimal library.
 * @param Decimal - The Decimal constructor to use.
 * @returns - The format function.
 */
declare function decimalFormatGenerator(Decimal: typeof DecimalType): {
    FORMATS: {
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
            getAbbreviationAndValue(x: Decimal): [string, Decimal];
            formatElementalPart(abbreviation: string, n: Decimal): string;
            format(value: Decimal, acc?: number): string;
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
            format(ex: DecimalSource, acc?: number): string;
        };
        /** Mixed scientific format */
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
            format(ex: DecimalSource, acc?: number, max?: number): string;
        };
        /** Layer format */
        layer: {
            layers: string[];
            format(ex: DecimalSource, acc?: number, max?: number): string;
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
        /** Infinity format */
        inf: {
            format(ex: DecimalSource, acc?: number, max?: number): string;
        };
        /** Alphabet format */
        alphabet: {
            config: {
                alphabet: string;
            };
            /**
             * Get the abbreviation for a number
             * @param ex - The value to get the abbreviation for
             * @param start - The starting value
             * @param startDouble - Whether to start at aa instead of a
             * @param abbStart - The starting value for abbreviations
             * @returns - The abbreviation
             */
            getAbbreviation(ex: DecimalSource, start?: DecimalSource, startDouble?: boolean, abbStart?: number): string;
            /**
             * Format the value into alphabet format (a, b, c, ..., z, aa, ab, ac, ... aaa, aab, ... aaaa, ... aaaaaaaaaaaaaaa, ... aaaaaaaaaaaaaaa(2), aaaaaaaaaaaaaaa(3), ...)
             * Basically base 26 for the exponential part / 3
             * Work in progress
             * @param ex - The value to format
             * @param acc - The accuracy
             * @param max - The maximum value before switching to an abbreviation
             * @param type - The type of format to use
             * @param start - The starting value. Defaults to 1e15, or 1 quadrillion.
             * @param startDouble - Whether to start at aa instead of a. Defaults to false.
             * @param abbStart - The starting value for abbreviations. Defaults to 9.
             * @returns - The formatted value
             */
            format(ex: DecimalSource, acc?: number, max?: number, type?: FormatType, start?: DecimalSource, startDouble?: boolean, abbStart?: number): string;
        };
    };
    formats: {
        toSubscript: (value: number) => string;
        toSuperscript: (value: number) => string;
        formatST: (ex: DecimalSource, acc?: number, max?: number, type?: "sc" | "st" | FormatType) => string;
        format: (ex: DecimalSource, acc?: number, max?: number, type?: FormatType) => string;
        formatGain: (amt: DecimalSource, gain: DecimalSource, type?: FormatType, acc?: number, max?: number) => string;
        formatTime: (ex: DecimalSource, acc?: number, type?: string) => string;
        formatTimeLong: (ex: DecimalSource, ms?: boolean, acc?: number, max?: number, type?: FormatType) => string;
        formatReduction: (ex: DecimalSource) => string;
        formatPercent: (ex: DecimalSource) => string;
        formatMult: (ex: DecimalSource, acc?: number) => string;
        expMult: (a: DecimalSource, b: DecimalSource, base?: number) => DecimalType;
        metric: (num: DecimalSource, type?: 0 | 1 | 2 | 3) => string;
        ev: (num: DecimalSource, c2?: boolean) => string;
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
            getAbbreviationAndValue(x: Decimal): [string, Decimal];
            formatElementalPart(abbreviation: string, n: Decimal): string;
            format(value: Decimal, acc?: number): string;
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
            format(ex: DecimalSource, acc?: number): string;
        };
        /** Mixed scientific format */
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
            format(ex: DecimalSource, acc?: number, max?: number): string;
        };
        /** Layer format */
        layer: {
            layers: string[];
            format(ex: DecimalSource, acc?: number, max?: number): string;
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
        /** Infinity format */
        inf: {
            format(ex: DecimalSource, acc?: number, max?: number): string;
        };
        /** Alphabet format */
        alphabet: {
            config: {
                alphabet: string;
            };
            /**
             * Get the abbreviation for a number
             * @param ex - The value to get the abbreviation for
             * @param start - The starting value
             * @param startDouble - Whether to start at aa instead of a
             * @param abbStart - The starting value for abbreviations
             * @returns - The abbreviation
             */
            getAbbreviation(ex: DecimalSource, start?: DecimalSource, startDouble?: boolean, abbStart?: number): string;
            /**
             * Format the value into alphabet format (a, b, c, ..., z, aa, ab, ac, ... aaa, aab, ... aaaa, ... aaaaaaaaaaaaaaa, ... aaaaaaaaaaaaaaa(2), aaaaaaaaaaaaaaa(3), ...)
             * Basically base 26 for the exponential part / 3
             * Work in progress
             * @param ex - The value to format
             * @param acc - The accuracy
             * @param max - The maximum value before switching to an abbreviation
             * @param type - The type of format to use
             * @param start - The starting value. Defaults to 1e15, or 1 quadrillion.
             * @param startDouble - Whether to start at aa instead of a. Defaults to false.
             * @param abbStart - The starting value for abbreviations. Defaults to 9.
             * @returns - The formatted value
             */
            format(ex: DecimalSource, acc?: number, max?: number, type?: FormatType, start?: DecimalSource, startDouble?: boolean, abbStart?: number): string;
        };
    };
};
export type { FormatType };
export { decimalFormatGenerator, ST_NAMES, FormatTypeList };
