/**
 * @file Declares a generator function for formats for the E library.
 */
import type { Decimal as DecimalType, DecimalSource } from "./e";

type Decimal = DecimalType;

type FormatType = "st" | "sc" | "scientific" | "omega" | "omega_short" | "elemental" | "old_sc" | "eng" | "mixed_sc" | "layer" | "standard" | "inf" | "alphabet";

/** A list of names for the standard notation */
const ST_NAMES = [
    [
        // Tier 1 (0-1e3000)
        ["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"],
        ["", "Dc", "Vg", "Tg", "Qag", "Qtg", "Sxg", "Spg", "Ocg", "Nog"],
        ["", "Ce", "De", "Te", "Qae", "Qte", "Sxe", "Spe", "Oce", "Noe"],
    ],
    [
        // Higher tiers
        ["", "Mi", "Mc", "Na", "Pc", "Fm", "At", "Zp", "Yc", "Xn"],
        ["", "Me", "Du", "Tr", "Te", "Pe", "He", "Hp", "Ot", "En"],
        ["", "c", "Ic", "TCn", "TeC", "PCn", "HCn", "HpC", "OCn", "ECn"],
        ["", "Hc", "DHe", "THt", "TeH", "PHc", "HHe", "HpH", "OHt", "EHc"],
    ],
];

const FormatTypeList: FormatType[] = ["st", "sc", "scientific", "omega", "omega_short", "elemental", "old_sc", "eng", "mixed_sc", "layer", "standard", "inf", "alphabet"];

/**
 * Generates a format function for the E library.
 * @param Decimal - The Decimal constructor to use.
 * @returns - The format function.
 */
// eslint-disable-next-line no-shadow
function decimalFormatGenerator (Decimal: typeof DecimalType) {
    /** A list of formats */
    const FORMATS = {
        /** Omega format */
        omega: {
            config: {
                greek: "βζλψΣΘΨω",
                infinity: "Ω",
            },
            /**
             * Format the value into omega format
             * @param value - The value to format
             * @returns - The formatted value
             */
            format (value: DecimalSource): string {
                value = new Decimal(value);
                const step = Decimal.floor(value.div(1000));
                const omegaAmount = Decimal.floor(step.div(FORMATS.omega.config.greek.length));
                let lastLetter = FORMATS.omega.config.greek[step.toNumber() % FORMATS.omega.config.greek.length] + toSubscript(value.toNumber() % 1000);
                const beyondGreekArrayBounds = FORMATS.omega.config.greek[step.toNumber() % FORMATS.omega.config.greek.length] === undefined;
                if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
                    lastLetter = "ω";
                }
                const omegaOrder = Decimal.log(value, 8000).toNumber();
                if (omegaAmount.equals(0)) {
                    return lastLetter;
                } else if (omegaAmount.gt(0) && omegaAmount.lte(3)) {
                    const omegas = [];
                    for (let i = 0; i < omegaAmount.toNumber(); i++) {
                        omegas.push("ω");
                    }
                    return `${omegas.join("^")}^${lastLetter}`;
                } else if (omegaAmount.gt(3) && omegaAmount.lt(10)) {
                    return `ω(${omegaAmount.toFixed(0)})^${lastLetter}`;
                } else if (omegaOrder < 3) {
                    return `ω(${FORMATS.omega.format(omegaAmount)})^${lastLetter}`;
                } else if (omegaOrder < 6) {
                    return `ω(${FORMATS.omega.format(omegaAmount)})`;
                }
                const val = Decimal.pow(8000, omegaOrder % 1);
                const orderStr = omegaOrder < 100
                    ? Math.floor(omegaOrder).toFixed(0)
                    : FORMATS.omega.format(Decimal.floor(omegaOrder));
                return `ω[${orderStr}](${FORMATS.omega.format(val)})`;
            },
        },
        /** Short omega format */
        omega_short: {
            config: {
                greek: "βζλψΣΘΨω",
                infinity: "Ω",
            },
            /**
             * Format the value into short omega format
             * @param value - The value to format
             * @returns - The formatted value
             */
            format (value: DecimalSource): string {
                value = new Decimal(value);
                const step = Decimal.floor(value.div(1000));
                const omegaAmount = Decimal.floor(step.div(FORMATS.omega_short.config.greek.length));
                let lastLetter = FORMATS.omega_short.config.greek[step.toNumber() % FORMATS.omega_short.config.greek.length] + toSubscript(value.toNumber() % 1000);
                const beyondGreekArrayBounds = FORMATS.omega_short.config.greek[step.toNumber() % FORMATS.omega_short.config.greek.length] === undefined;
                if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
                    lastLetter = "ω";
                }
                const omegaOrder = Decimal.log(value, 8000).toNumber();
                if (omegaAmount.equals(0)) {
                    return lastLetter;
                } else if (omegaAmount.gt(0) && omegaAmount.lte(2)) {
                    const omegas = [];
                    for (let i = 0; i < omegaAmount.toNumber(); i++) {
                        omegas.push("ω");
                    }
                    return `${omegas.join("^")}^${lastLetter}`;
                } else if (omegaAmount.gt(2) && omegaAmount.lt(10)) {
                    return `ω(${omegaAmount.toFixed(0)})^${lastLetter}`;
                }
                const val = Decimal.pow(8000, omegaOrder % 1);
                const orderStr = omegaOrder < 100
                    ? Math.floor(omegaOrder).toFixed(0)
                    : FORMATS.omega_short.format(Decimal.floor(omegaOrder));
                return `ω[${orderStr}](${FORMATS.omega_short.format(val)})`;
            },
        },
        elemental: {
            config: {
                /** The list of elements */
                element_lists: [["H"],
                    ["He", "Li", "Be", "B", "C", "N", "O", "F"],
                    ["Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl"],
                    [
                        "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe",
                        "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br",
                    ],
                    [
                        "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru",
                        "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I",
                    ],
                    [
                        "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm",
                        "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm",
                        "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir",
                        "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At",
                    ],
                    [
                        "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np",
                        "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md",
                        "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt",
                        "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts",
                    ],
                    ["Og"]],
            },
            getOffset (group: number): number {
                if (group == 1) return 1;
                const n = Math.floor(group / 2);
                let r = 2 * n * (n + 1) * (2 * n + 1) / 3 - 2;
                if (group % 2 == 1) r += 2 * Math.pow(n + 1, 2);
                return r;
            },
            getAbbreviation (group: number, progress: number) {
                const length = FORMATS.elemental.abbreviationLength(group);
                const elemRel = Math.floor(length * progress);

                const elem = elemRel + FORMATS.elemental.getOffset(group);

                return elem > 118 ? FORMATS.elemental.beyondOg(elem) : FORMATS.elemental.config.element_lists[group - 1][elemRel];
            },
            beyondOg (x: number): string {
                const log = Math.floor(Math.log10(x));
                const list = ["n", "u", "b", "t", "q", "p", "h", "s", "o", "e"];
                let r = "";
                for (let i = log; i >= 0; i--) {
                    const n = Math.floor(x / Math.pow(10, i)) % 10;
                    if (r == "") r = list[n].toUpperCase();
                    else r += list[n];
                }
                return r;
            },
            abbreviationLength (group: number): number {
                return group == 1 ? 1 : Math.pow(Math.floor(group / 2) + 1, 2) * 2;
            },
            getAbbreviationAndValue (x: Decimal) {
                const abbreviationListUnfloored = x.log(118).toNumber();
                const abbreviationListIndex = Math.floor(abbreviationListUnfloored) + 1;
                const abbreviationLength = FORMATS.elemental.abbreviationLength(abbreviationListIndex);
                const abbreviationProgress = abbreviationListUnfloored - abbreviationListIndex + 1;
                const abbreviationIndex = Math.floor(abbreviationProgress * abbreviationLength);
                const abbreviation = FORMATS.elemental.getAbbreviation(abbreviationListIndex, abbreviationProgress);
                const value = new Decimal(118).pow(abbreviationListIndex + abbreviationIndex / abbreviationLength - 1);
                return [abbreviation, value];
            },
            formatElementalPart (abbreviation: string, n: Decimal) {
                if (n.eq(1)) {
                    return abbreviation;
                }
                return `${n} ${abbreviation}`;
            },
            format (value: Decimal, acc: number = 2): string {
                if (value.gt(new Decimal(118).pow(new Decimal(118).pow(new Decimal(118).pow(4))))) return "e" + FORMATS.elemental.format(value.log10(), acc);

                let log = value.log(118);
                const slog = log.log(118);
                const sslog = slog.log(118).toNumber();
                const max = Math.max(4 - sslog * 2, 1);
                const parts = [];
                while (log.gte(1) && parts.length < max) {
                    const [abbreviation, value2] = FORMATS.elemental.getAbbreviationAndValue(log);
                    const n = log.div(value2).floor();
                    log = log.sub(n.mul(value2));
                    parts.unshift([abbreviation, n]);
                }
                if (parts.length >= max) {
                    // @ts-expect-error - x has both string and decimal for some reason
                    return parts.map((x) => FORMATS.elemental.formatElementalPart(x[0], x[1])).join(" + ");
                }
                const formattedMantissa = new Decimal(118).pow(log).toFixed(parts.length === 1 ? 3 : acc);
                if (parts.length === 0) {
                    return formattedMantissa;
                }
                if (parts.length === 1) {
                    // @ts-expect-error - x has both string and decimal for some reason
                    return `${formattedMantissa} × ${FORMATS.elemental.formatElementalPart(parts[0][0], parts[0][1])}`;
                }
                // @ts-expect-error - x has both string and decimal for some reason
                return `${formattedMantissa} × (${parts.map((x) => FORMATS.elemental.formatElementalPart(x[0], x[1])).join(" + ")})`;
            },
        },
        /** Old scientific format */
        old_sc: {
            /**
             * Format the value into old scientific format
             * @param ex - The value to format
             * @param acc - The accuracy
             * @returns - The formatted value
             */
            format (ex: DecimalSource, acc: number): string {
                ex = new Decimal(ex);
                const e = ex.log10().floor();
                if (e.lt(9)) {
                    if (e.lt(3)) {
                        return ex.toFixed(acc);
                    }
                    return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                } else {
                    if (ex.gte("eeee10")) {
                        const slog = ex.slog();
                        return (slog.gte(1e9) ? "" : new Decimal(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + FORMATS.old_sc.format(slog.floor(), 0);
                    }
                    const m = ex.div(new Decimal(10).pow(e));
                    return (e.log10().gte(9) ? "" : m.toFixed(4)) + "e" + FORMATS.old_sc.format(e, 0);
                }
            },
        },
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
            format (ex: DecimalSource, acc: number = 2): string {
                ex = new Decimal(ex);
                const e = ex.log10().floor();
                if (e.lt(9)) {
                    if (e.lt(3)) {
                        return ex.toFixed(acc);
                    }
                    return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                } else {
                    if (ex.gte("eeee10")) {
                        const slog = ex.slog();
                        return (slog.gte(1e9) ? "" : new Decimal(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + FORMATS.eng.format(slog.floor(), 0);
                    }
                    const m = ex.div(new Decimal(1000).pow(e.div(3).floor()));

                    return (e.log10().gte(9) ? "" : m.toFixed(new Decimal(4).sub(e.sub(e.div(3).floor().mul(3))).toNumber())) + "e" + FORMATS.eng.format(e.div(3).floor().mul(3), 0);
                }
            },
        },
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
            format (ex: DecimalSource, acc?: number, max: number = 9): string {
                ex = new Decimal(ex);
                const e = ex.log10().floor();
                if (e.lt(303) && e.gte(max)) return format(ex, acc, max, "st");
                else return format(ex, acc, max, "sc");
            },
        },
        /** Layer format */
        layer: {
            layers: ["infinity", "eternity", "reality", "equality", "affinity", "celerity", "identity", "vitality", "immunity", "atrocity"],
            format (ex: DecimalSource, acc: number = 2, max?: number): string {
                ex = new Decimal(ex);
                const layer = ex.max(1).log10().max(1).log(INFINITY_NUM.log10()).floor();
                if (layer.lte(0)) return format(ex, acc, max, "sc");
                ex = new Decimal(10).pow(ex.max(1).log10().div(INFINITY_NUM.log10().pow(layer)).sub(layer.gte(1) ? 1 : 0));
                const meta = layer.div(10).floor();
                const layer_id = layer.toNumber() % 10 - 1;
                return format(ex, Math.max(4, acc), max, "sc") + " " + (meta.gte(1) ? "meta" + (meta.gte(2) ? "^" + format(meta, 0, max, "sc") : "") + "-" : "") + (isNaN(layer_id) ? "nanity" : FORMATS.layer.layers[layer_id]);
            },
        },
        /** Standard (letter abbv) format */
        standard: {
            /**
             * Gets the letter abbreviation for a number (e.g. 1 -> K) (0-1e3000)
             * @param x - The number to get the letter abbreviation for
             * @returns - The letter abbreviation
             */
            tier1 (x: number): string {
                return ST_NAMES[0][0][x % 10] +
                ST_NAMES[0][1][Math.floor(x / 10) % 10] +
                ST_NAMES[0][2][Math.floor(x / 100)];
            },
            /**
             * Gets the tier 2 letter abbreviation for a number (e.g. 1 -> Mi) (1e3000+)
             * @param x - The number to get the letter abbreviation for
             * @returns - The letter abbreviation
             */
            tier2 (x: number): string {
                const o = x % 10;
                const t = Math.floor(x / 10) % 10;
                const h = Math.floor(x / 100) % 10;

                let r = "";
                if (x < 10) return ST_NAMES[1][0][x];
                if (t == 1 && o == 0) r += "Vec";
                else r += ST_NAMES[1][1][o] + ST_NAMES[1][2][t];
                r += ST_NAMES[1][3][h];

                return r;
            },
        },
        /** Infinity format */
        inf: {
            format (ex: DecimalSource, acc?: number, max?: number): string {
                ex = new Decimal(ex);
                let meta = 0;
                const inf = new Decimal(Number.MAX_VALUE);
                const symbols = ["", "∞", "Ω", "Ψ", "ʊ"];
                const symbols2 = ["", "", "m", "mm", "mmm"];
                while (ex.gte(inf)) {
                    ex = ex.log(inf);
                    meta++;
                }

                if (meta == 0) return format(ex, acc, max, "sc");
                if (ex.gte(3)) return symbols2[meta] + symbols[meta] + "ω^" + format(ex.sub(1), acc, max, "sc");
                if (ex.gte(2)) return symbols2[meta] + "ω" + symbols[meta] + "-" + format(inf.pow(ex.sub(2)), acc, max, "sc");
                return symbols2[meta] + symbols[meta] + "-" + format(inf.pow(ex.sub(1)), acc, max, "sc");
            },
        },
        // Add more formats here
        /** Alphabet format */
        alphabet: {
            config: {
                alphabet: "abcdefghijklmnopqrstuvwxyz",
            },

            /**
             * Get the abbreviation for a number
             * @param ex - The value to get the abbreviation for
             * @param start - The starting value
             * @param startDouble - Whether to start at aa instead of a
             * @param abbStart - The starting value for abbreviations
             * @returns - The abbreviation
             */
            getAbbreviation (ex: DecimalSource, start: DecimalSource = new Decimal(1e15), startDouble = false, abbStart: number = 9): string {
                // there were so many off by one errors in this function

                ex = new Decimal(ex);
                start = new Decimal(start).div(1e3);

                // If the value is less than the starting value, return the standard format
                if (ex.lt(start.mul(1e3))) return "";

                const { alphabet } = FORMATS.alphabet.config;
                const alphabetLength = alphabet.length;
                const exponent = ex.log(1e3).sub(start.log(1e3)).floor();

                const numLetters = exponent.add(1).log(alphabetLength + 1).ceil();

                let letters = "";

                const convertToLetters = (num: Decimal, length: Decimal): string => {
                    let remaining = num;
                    let out = "";
                    for (let i = 0; i < length.toNumber(); i++) {
                        const letter = remaining.sub(1).mod(alphabetLength).toNumber();
                        // letters.unshift(alphabet[letter]);
                        // console.log({ letter, remaining, out });
                        if (letter < 0 || letter >= alphabetLength) {
                            // This should never happen, but due to floating point errors on very large numbers (above ~eee10), it can
                            // So we just return a random letter
                            // out = alphabet[Math.floor(Math.random() * alphabetLength)] + out;

                            // out = alphabet[alphabetLength - 1] + out;
                            // remaining = remaining.sub(1).div(alphabetLength).floor();
                            // continue;

                            return "ω";
                        }
                        out = alphabet[letter] + out;
                        remaining = remaining.sub(1).div(alphabetLength).floor();
                    }
                    return out;
                };

                if (numLetters.lt(abbStart)) {
                    // If the number of letters is less than the abbreviation start, do a loop
                    letters = convertToLetters(exponent, numLetters);
                } else {
                    // TODO
                    // throw new Error("Not implemented");
                    const trunc = numLetters.sub(abbStart).add(1);
                    const truncExponent = exponent.div(Decimal.pow(alphabetLength + 1, trunc.sub(1))).floor();
                    const truncLetters = convertToLetters(truncExponent, new Decimal(abbStart));
                    letters = `${truncLetters}(${trunc.gt("1e9") ? trunc.format() : trunc.format(0)})`;
                }

                // return letters.join("");
                return letters;
            },

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
            format (ex: DecimalSource, acc: number = 2, max: number = 9, type: FormatType = "mixed_sc", start: DecimalSource = new Decimal(1e15), startDouble = false, abbStart?: number): string {
                ex = new Decimal(ex);
                start = new Decimal(start).div(1e3);

                // If the value is less than the starting value, return the standard format
                if (ex.lt(start.mul(1e3))) return format(ex, acc, max, type);

                const letters = FORMATS.alphabet.getAbbreviation(ex, start, startDouble, abbStart);
                const mantissa = ex.div(Decimal.pow(1e3, ex.log(1e3).floor()));

                // console.log({ mantissa, exponent, letters, numLetters });
                const isAbbreviation = letters.length > (abbStart ?? 9) + 2;
                return `${(!isAbbreviation ? (mantissa.toFixed(acc) + " ") : "")}${letters}`;
            },
        },
    };

    // console.log(Decimal);

    const INFINITY_NUM = new Decimal(2).pow(1024);
    const SUBSCRIPT_NUMBERS = "₀₁₂₃₄₅₆₇₈₉";
    const SUPERSCRIPT_NUMBERS = "⁰¹²³⁴⁵⁶⁷⁸⁹";

    /**
     * Convert a number to a subscript
     * @param value - The value to convert
     * @returns - The value in subscript
     */
    function toSubscript (value: number): string {
        return value.toFixed(0).split("")
            .map((x) => x === "-" ? "₋" : SUBSCRIPT_NUMBERS[parseInt(x, 10)])
            .join("");
    }

    /**
     * Convert a number to a superscript
     * @param value - The value to convert
     * @returns - The value in superscript
     */
    function toSuperscript (value: number): string {
        return value.toFixed(0).split("")
            .map((x) => x === "-" ? "₋" : SUPERSCRIPT_NUMBERS[parseInt(x, 10)])
            .join("");
    }

    // eslint-disable-next-line
    /**
     * Format the value into standard (letter abbv) format
     * @deprecated Use {@link format} instead (with the type "st")
     */
    function formatST (ex: DecimalSource, acc: number = 2, max: number = 9, type: "sc" | "st" | FormatType = "st"): string { return format(ex, acc, max, type); }

    /**
     * Format the value into a specific format type
     * @param ex - The value to format
     * @param acc - The desired accuracy (number of significant figures), defaults to `2`.
     * @param max - The maximum number of decimal places to display, defaults to `9`.
     * @param type - The type of format to use (default "mixed_sc")
     * @returns - The formatted value
     */
    function format (ex: DecimalSource, acc: number = 2, max: number = 9, type: FormatType = "mixed_sc"): string {
        ex = new Decimal(ex);
        const neg = ex.lt(0) ? "-" : "";
        if (ex.mag == Infinity) return neg + "Infinity";
        if (Number.isNaN(ex.mag)) return neg + "NaN";
        if (ex.lt(0)) ex = ex.mul(-1);
        if (ex.eq(0)) return ex.toFixed(acc);
        const e = ex.log10().floor();
        switch (type) {
        case "sc":
        case "scientific": {
            if (ex.log10().lt(Math.min(-acc, 0)) && acc > 1) {
                const e2 = ex.log10().ceil();
                const m = ex.div(e2.eq(-1) ? new Decimal(0.1) : new Decimal(10).pow(e2));
                const be = e2.mul(-1).max(1).log10().gte(9);
                return neg + (be ? "" : m.toFixed(2)) + "e" + format(e2, 0, max, "mixed_sc");
            } else if (e.lt(max)) {
                const a = Math.max(Math.min(acc - e.toNumber(), acc), 0);
                return neg + (a > 0 ? ex.toFixed(a) : ex.toFixed(a).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
            } else {
                if (ex.gte("eeee10")) {
                    const slog = ex.slog();
                    return (slog.gte(1e9) ? "" : new Decimal(10).pow(slog.sub(slog.floor())).toFixed(2)) + "F" + format(slog.floor(), 0);
                }
                const m = ex.div(new Decimal(10).pow(e));
                const be = e.log10().gte(9);
                return neg + (be ? "" : m.toFixed(2)) + "e" + format(e, 0, max, "mixed_sc");
            }
        }
        case "st":
        case "standard": {
            let e3 = ex.log(1e3).floor();
            if (e3.lt(1)) {
                return neg + ex.toFixed(Math.max(Math.min(acc - e.toNumber(), acc), 0));
            }

            const e3_mul = e3.mul(3);
            const ee = e3.log10().floor();
            if (ee.gte(3000)) return "e" + format(e, acc, max, "st");

            let final = "";
            if (e3.lt(4)) final = ["", "K", "M", "B"][Math.round(e3.toNumber())];
            else {
                let ee3 = Math.floor(e3.log(1e3).toNumber());
                if (ee3 < 100) ee3 = Math.max(ee3 - 1, 0);
                e3 = e3.sub(1).div(new Decimal(10).pow(ee3 * 3));
                while (e3.gt(0)) {
                    const div1000 = e3.div(1e3).floor();
                    const mod1000 = e3.sub(div1000.mul(1e3)).floor().toNumber();
                    if (mod1000 > 0) {
                        if (mod1000 == 1 && !ee3) final = "U";
                        if (ee3) final = FORMATS.standard.tier2(ee3) + (final ? "-" + final : "");
                        if (mod1000 > 1) final = FORMATS.standard.tier1(mod1000) + final;
                    }
                    e3 = div1000;
                    ee3++;
                }
            }

            const m = ex.div(new Decimal(10).pow(e3_mul));
            const fixedAmt = acc === 2 ? new Decimal(2).sub(e.sub(e3_mul)).add(1).toNumber() : acc;
            return neg + (ee.gte(10) ? "" : (m.toFixed(fixedAmt)) + " ") + final;
        }
        default:
            // Other formats
            if (!FORMATS[type]) console.error(`Invalid format type "`, type, `"`);
            return neg + FORMATS[type]?.format(ex, acc, max);
        }
    }

    /**
     * Format the gain
     * @param amt - The amount
     * @param gain - The gain
     * @param type - The type
     * @param acc - The accuracy
     * @param max - The maximum value
     * @returns - The formatted gain
     * @example
     * console.log(formatGain(1e20, 1e10)); // (+1.00e10/sec)
     * console.log(formatGain(1e200, 1e210)); // (+10.00 OoMs/sec)
     */
    function formatGain (amt: DecimalSource, gain: DecimalSource, type: FormatType = "mixed_sc", acc?: number, max?: number): string {
        amt = new Decimal(amt);
        gain = new Decimal(gain);
        const next = amt.add(gain);
        let rate;
        let ooms = next.div(amt);
        if (ooms.gte(10) && amt.gte(1e100)) {
            ooms = ooms.log10().mul(20);
            rate = "(+" + format(ooms, acc, max, type) + " OoMs/sec)";
        }
        else rate = "(+" + format(gain, acc, max, type) + "/sec)";
        return rate;
    }

    /**
     * Format the time
     * @param ex - The value to format (in seconds)
     * @param acc - The accuracy
     * @param type - The type
     * @returns - The formatted time
     */
    function formatTime (ex: DecimalSource, acc: number = 2, type: string = "s"): string {
        ex = new Decimal(ex);
        if (ex.gte(86400)) return format(ex.div(86400).floor(), 0, 12, "sc") + ":" + formatTime(ex.mod(86400), acc, "d");
        if (ex.gte(3600) || type == "d") return (ex.div(3600).gte(10) || type != "d" ? "" : "0") + format(ex.div(3600).floor(), 0, 12, "sc") + ":" + formatTime(ex.mod(3600), acc, "h");
        if (ex.gte(60) || type == "h") return (ex.div(60).gte(10) || type != "h" ? "" : "0") + format(ex.div(60).floor(), 0, 12, "sc") + ":" + formatTime(ex.mod(60), acc, "m");
        return (ex.gte(10) || type != "m" ? "" : "0") + format(ex, acc, 12, "sc");
    }

    /**
     * Format the time long
     * @param ex - The value to format (in seconds)
     * @param ms - Whether to include milliseconds
     * @param acc - The accuracy
     * @param max - The maximum value
     * @param type - The type
     * @returns - The formatted time
     */
    function formatTimeLong (ex: DecimalSource, ms = false, acc = 0, max = 9, type: FormatType = "mixed_sc"): string {
        const formatFn = (exf: DecimalSource) => format(exf, acc, max, type);
        ex = new Decimal(ex);
        const mls = ex.mul(1000).mod(1000).floor();
        const sec = ex.mod(60).floor();
        const min = ex.div(60).mod(60).floor();
        const hour = ex.div(3600).mod(24).floor();
        const day = ex.div(86400).mod(365.2425).floor();
        const year = ex.div(31556952).floor();
        const yearStr = year.eq(1) ? " year" : " years";
        const dayStr = day.eq(1) ? " day" : " days";
        const hourStr = hour.eq(1) ? " hour" : " hours";
        const minStr = min.eq(1) ? " minute" : " minutes";
        const secStr = sec.eq(1) ? " second" : " seconds";
        const mlsStr = mls.eq(1) ? " millisecond" : " milliseconds";
        return `${year.gt(0) ? formatFn(year) + yearStr + ", " : ""}${day.gt(0) ? formatFn(day) + dayStr + ", " : ""}${hour.gt(0) ? formatFn(hour) + hourStr + ", " : ""}${min.gt(0) ? formatFn(min) + minStr + ", " : ""}${sec.gt(0) ? formatFn(sec) + secStr + "," : ""}${ms && mls.gt(0) ? " " + formatFn(mls) + mlsStr : ""}`.replace(/,([^,]*)$/, "$1").trim();
    }

    /**
     * Format the reduction
     * @param ex - The value to format
     * @returns - The formatted reduction
     */
    function formatReduction (ex: DecimalSource): string {
        ex = new Decimal(ex);
        return format(new Decimal(1).sub(ex).mul(100)) + "%";
    }

    /**
     * Format the percent
     * @param ex - The value to format
     * @returns - The formatted percent
     */
    function formatPercent (ex: DecimalSource): string {
        ex = new Decimal(ex);
        return format(ex.mul(100)) + "%";
    }

    /**
     * Format the multiplier
     * @param ex - The value to format
     * @param acc - The accuracy
     * @returns - The formatted multiplier
     */
    function formatMult (ex: DecimalSource, acc: number = 2): string {
        ex = new Decimal(ex);
        return ex.gte(1) ? "×" + ex.format(acc) : "/" + ex.pow(-1).format(acc);
    }

    /**
     * Exponential multiplier
     * @param a - The value to exponentiate
     * @param b - The exponent
     * @param base - The base
     * @returns - The value after being exponentiated
     */
    function expMult (a: DecimalSource, b: DecimalSource, base: number = 10) {
        return Decimal.gte(a, 10) ? Decimal.pow(base, Decimal.log(a, base).pow(b)) : new Decimal(a);
    }

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
    function metric (num: DecimalSource, type: 0 | 1 | 2 | 3 = 0): string {
        num = new Decimal(num);
        interface IAbb {
            name: string;
            altName: string;
            value: Decimal;
        }
        const abb = ((abbM: Omit<IAbb, "value">[]): IAbb[] => {
            return abbM.map((x, i) => {
                return {
                    name: x.name,
                    altName: x.altName,
                    value: Decimal.pow(1000, new Decimal(i).add(1)),
                };
            });
        })([
            {
                name: "K",
                altName: "Kilo",
            },
            {
                name: "M",
                altName: "Mega",
            },
            {
                name: "G",
                altName: "Giga",
            },
            {
                name: "T",
                altName: "Tera",
            },
            {
                name: "P",
                altName: "Peta",
            },
            {
                name: "E",
                altName: "Exa",
            },
            {
                name: "Z",
                altName: "Zetta",
            },
            {
                name: "Y",
                altName: "Yotta",
            },
            {
                name: "R",
                altName: "Ronna",
            },
            {
                name: "Q",
                altName: "Quetta",
            },
        ]);
        // console.log("ev", abb);
        let output = "";
        const abbNum = num.lte(0) ? 0 : Decimal.min(Decimal.log(num, 1000).sub(1), abb.length - 1).floor().toNumber();
        const abbMax = abb[abbNum];
        if (abbNum === 0) {
            switch (type) {
            case 1:
                output = "";
                break;
            case 2:
            case 0:
            default:
                output = num.format();
                break;
            }
        }
        switch (type) {
        case 1:
            output = abbMax["name"];
            break;
        case 2:
            output = `${num.divide(abbMax["value"]).format()}`;
            break;
        case 3:
            output = abbMax["altName"];
            break;
        case 0:
        default:
            output = `${num.divide(abbMax["value"]).format()} ${abbMax["name"]}`;
            break;
        }
        return output;
    }
    /**
     * Format the value into eV (includes metric prefixes)
     * @deprecated Use {@link metric} instead
     * @param num - The value to format
     * @param c2 - Whether to include /c^2
     * @returns The formatted value
     */
    function ev (num: DecimalSource, c2 = false) {
        return `${metric(num, 2)} ${metric(num, 1)}eV${c2 ? "/c^2" : ""}`;
    }

    const formats = {...FORMATS, ...{
        toSubscript,
        toSuperscript,
        formatST,
        format,
        formatGain,
        formatTime,
        formatTimeLong,
        formatReduction,
        formatPercent,
        formatMult,
        expMult,
        metric,
        ev,
    }};

    return {
        FORMATS,
        formats,
    };
}

export { decimalFormatGenerator, FormatType, ST_NAMES, FormatTypeList };