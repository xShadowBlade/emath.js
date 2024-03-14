/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable */
/**
 * @file idk use black magic and type gymnastics to make this work or something
 */
import type { DecimalSource, CompareResult } from "break_eternity.js";
import { Decimal } from "./declare";

// type RecordClass<C> = Record<keyof C, C[keyof C]>;

interface DecimalAddedMethodsInterface {
    /**
     * Creates a clone of the Decimal instance.
     * @deprecated
     * @returns A Decimal instance that is a clone of the original.
     */
    clone (this: Decimal): Decimal;
    /**
     * Applies a soft cap to a Decimal value using a specified soft cap function.
     * @param start - The value at which the soft cap starts.
     * @param power - The power or factor used in the soft cap calculation.
     * @param mode - The soft cap mode. Use "pow" for power soft cap, "mul" for multiplication soft cap,
     * or "exp" for exponential soft cap.
     * @returns The Decimal value after applying the soft cap.
     */
    softcap (this: Decimal, start: DecimalSource, power: number, mode: string): Decimal;
    /**
     * Scales a currency value using a specified scaling function.
     * @param s - The value at which scaling starts.
     * @param p - The scaling factor.
     * @param mode - The scaling mode. Use "pow" for power scaling or "exp" for exponential scaling.
     * @param rev - Whether to reverse the scaling operation
     * @returns The scaled currency value.
     */
    scale (this: Decimal, s: DecimalSource, p: DecimalSource, mode: string | number, rev?: boolean): Decimal;
    /**
     * Formats the E instance with a specified accuracy and maximum Decimal places.
     * @param [acc] - The desired accuracy (number of significant figures), defaults to `2`.
     * @param [max] - The maximum number of Decimal places to display, defaults to `9`.
     * @param [type] - The type of format, defaults to `"mixed_sc"`.
     * @returns A string representing the formatted E value.
     */
    format (this: Decimal, acc?: number, max?: number, type?: FormatType): string;
    /**
     * Formats the E instance in standard leter notation with a specified accuracy and maximum Decimal places.
     * @param [acc] - The desired accuracy (number of significant figures).
     * @param [max] - The maximum number of Decimal places to display.
     * @param [type] - The type of format (default standard)
     * @returns A string representing the formatted E value.
     */
    formatST (this: Decimal, acc?: number, max?: number, type?: FormatType): string;
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
    formatGain (this: Decimal, gain: DecimalSource, type?: FormatType): string;
    /**
     * Converts the E instance to a Roman numeral representation.
     * @param [max] - Max before it returns the original
     * @returns A string representing the Roman numeral equivalent of the E value,
     * or the original E instance if it is greater than or equal to 5000 or less than 1.
     */
    toRoman (this: Decimal, max?: DecimalSource): string | Decimal;
}

// Class and interface merging / Module Augmentation
declare module "./declare" {
    // eslint-disable-next-line no-shadow
    /**
     * @deprecated If you are using `emath.js`, use {@link E} instead
     */
    // eslint-disable-next-line no-shadow
    interface Decimal extends DecimalAddedMethodsInterface {}
}

const DecimalAddedMethods: DecimalAddedMethodsInterface = {
    clone (this: Decimal): Decimal {
        // return this;
        // console.log(this);
        return new Decimal(this);
    },

    softcap (this: Decimal, start: DecimalSource, power: number, mode: string): Decimal {
        let x = this.clone();
        if (x.gte(start)) {
            if ([0, "pow"].includes(mode)) x = x.div(start).pow(power).mul(start);
            if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start);
            // if ([2, "exp"].includes(mode)) x = expMult(x.div(start), power).mul(start);
        }
        return x;
    },

    scale (this: Decimal, s: DecimalSource, p: DecimalSource, mode: string | number, rev: boolean = false): Decimal {
        s = new Decimal(s);
        p = new Decimal(p);
        let x = this.clone();
        if (x.gte(s)) {
            if ([0, "pow"].includes(mode)) {x = rev ?
                x.mul(s.pow(p.sub(1))).root(p) : // (x * s^(p - 1))^(1 / p)
                x.pow(p).div(s.pow(p.sub(1)));} // x^p / s^(p - 1)
            if ([1, "exp"].includes(mode)) {x = rev ?
                x.div(s).max(1).log(p).add(s) : // log_p((x / s).max(1)) + s
                Decimal.pow(p, x.sub(s)).mul(s);} // p^(x - s) * s
        }
        return x;
    },

    format (this: Decimal, acc: number = 2, max: number = 9, type: FormatType = "mixed_sc"): string {
        return formats.format(this.clone(), acc, max, type);
    },

    formatST (this: Decimal, acc: number = 2, max: number = 9, type: FormatType = "st"): string {
        return formats.format(this.clone(), acc, max, type);
    },

    formatGain (this: Decimal, gain: DecimalSource, type: FormatType = "mixed_sc"): string {
        return formats.formatGain(this.clone(), gain, type);
    },

    toRoman (this: Decimal, max: DecimalSource = 5000): string | Decimal {
        max = new Decimal(max);

        const num: Decimal = this.clone();
        if (num.gte(max) || num.lt(1)) return num;
        let newNum: number = num.toNumber();

        const roman = {
            M: 1000,
            CM: 900,
            D: 500,
            CD: 400,
            C: 100,
            XC: 90,
            L: 50,
            XL: 40,
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1,
        };
        let str = "";

        for (const i of Object.keys(roman)) {
            const q = Math.floor(newNum / (roman as any)[i]);
            newNum -= q * (roman as any)[i];
            str += i.repeat(q);
        }

        return str;
    },
};

// for (const key in DecimalAddedMethods) {
//     console.log(key);
//     (Decimal.prototype as any)[key] = DecimalAddedMethods[key as keyof typeof DecimalAddedMethods].bind(Decimal.prototype);
// }
/**
 * Adds methods to an object
 * @param obj - The object to add methods to
 * @param methods - The methods to add
 */
function addMethods (obj: Record<string, any>, methods: Record<string, any>): void {
    for (const key in methods) {
        // (obj as any)[key] = (methods[key as keyof typeof methods] as (...args: any[]) => any).bind(obj);
        (obj as any)[key] = methods[key as keyof typeof methods];
    }
}
addMethods(Decimal.prototype, DecimalAddedMethods);

// interface DecimalAddedStaticMethodsInterface {
//     smoothDamp (current: DecimalSource, target: DecimalSource, smoothing: DecimalSource, deltaTime: DecimalSource): Decimal;
//     clone (x: Decimal): Decimal;
//     softcap (value: DecimalSource, start: DecimalSource, power: number, mode: string): Decimal;
//     scale (value: DecimalSource, s: DecimalSource, p: DecimalSource, mode: string | number, rev?: boolean): Decimal;
//     format (e: DecimalSource, acc?: number, max?: number, type?: FormatType): string;
//     formatST (value: DecimalSource, acc?: number, max?: number, type?: FormatType): string;
//     formatGain (value: DecimalSource, gain: DecimalSource, type?: FormatType): string;
//     toRoman (value: DecimalSource, max?: DecimalSource): string | Decimal;
// }

const DecimalAddedStaticMethods = {
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
    smoothDamp (current: DecimalSource, target: DecimalSource, smoothing: DecimalSource, deltaTime: DecimalSource): Decimal {
        return new Decimal(current).add(new Decimal(target).minus(new Decimal(current)).times(new Decimal(smoothing)).times(new Decimal(deltaTime)));
    },

    /**
     * Creates a clone of the E instance. Helps with a webpack(?) bug
     * @alias Decimal.normalizeFromComponents
     * @param x - The number to clone
     * @returns - The cloned number
     */
    clone (x: Decimal): Decimal {
        // return Decimal.fromComponents(x.sign, x.layer, x.mag);
        return x;
    },

    softcap (value: DecimalSource, start: DecimalSource, power: number, mode: string): Decimal {
        return new Decimal(value).softcap(start, power, mode);
    },
    scale (value: DecimalSource, s: DecimalSource, p: DecimalSource, mode: string | number, rev: boolean = false): Decimal {
        return new Decimal(value).scale(s, p, mode, rev);
    },
    /**
     * Formats the E instance with a specified accuracy and maximum Decimal places.
     * @param e - The E instance to format.
     * @param [acc] - The desired accuracy (number of significant figures), defaults to `2`.
     * @param [max] - The maximum number of Decimal places to display, defaults to `9`.
     * @param [type] - The type of format, defaults to `"mixed_sc"`.
     * @returns A string representing the formatted E value.
     */
    format (e: DecimalSource, acc: number = 2, max: number = 9, type: FormatType = "mixed_sc"): string {
        return formats.format(new Decimal(e), acc, max, type);
    },
    formatST (value: DecimalSource, acc: number = 2, max: number = 9, type: FormatType = "st"): string {
        return formats.format(new Decimal(value), acc, max, type);
    },
    formatGain (value: DecimalSource, gain: DecimalSource, type: FormatType = "mixed_sc"): string {
        return formats.formatGain(new Decimal(value), gain, type);
    },
    toRoman (value: DecimalSource, max: DecimalSource): string | Decimal {
        return new Decimal(value).toRoman(max);
    },
};

for (const key in DecimalAddedStaticMethods) {
    // (Decimal as any)[key] = (DecimalAddedStaticMethods as any)[key].bind(Decimal);
    (Decimal as any)[key] = (DecimalAddedStaticMethods as any)[key];
}

/**
 * A function that returns a Decimal instance. Also contains static methods and properties of the Decimal class.
 * @param x - The value to convert to a Decimal instance.
 * @returns - The Decimal instance.
 */
// @ts-expect-error Declared as a function, but adds properties later
const E: ((x?: DecimalSource) => Decimal) & typeof Decimal & typeof DecimalAddedStaticMethods & { formats: typeof formats } = (() => {
    // const out = (x?: DecimalSource) => {
    //     const instance = new Decimal(x);
    //     addMethods(instance, DecimalAddedMethods);
    //     return instance;
    // };
    const out = (x?: DecimalSource) => new Decimal(x);

    // Copy properties from Decimal to E
    (Object.getOwnPropertyNames(Decimal).filter((b) => ![...Object.getOwnPropertyNames(class {}), "arguments", "caller", "callee"].includes(b)) as string[]).forEach((prop) => {
        // console.log(prop);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (out as any)[prop] = (Decimal as any)[prop];
    });
    return out;
})();

type E = Decimal;

// console.log("clone test", E(5).format());

// Formats
/** A list of names for the standard notation */
const ST_NAMES = [
    [
        // Tier 1 (0-1e3000)
        ["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"],
        ["", "Dc", "Vg", "Tg", "Qag", "Qtg", "Sxg", "Spg", "Ocg", "Nog"],
        ["", "Ce", "De", "Te", "Qae", "Qte", "Sxe", "Spe", "Oce", "Noe"],
    ], [
        // Higher tiers
        ["", "Mi", "Mc", "Na", "Pc", "Fm", "At", "Zp", "Yc", "Xn"],
        ["", "Me", "Du", "Tr", "Te", "Pe", "He", "Hp", "Ot", "En"],
        ["", "c", "Ic", "TCn", "TeC", "PCn", "HCn", "HpC", "OCn", "ECn"],
        ["", "Hc", "DHe", "THt", "TeH", "PHc", "HHe", "HpH", "OHt", "EHc"],
    ],
];

type FormatType = "st" | "sc" | "scientific" | "omega" | "omega_short" | "elemental" | "old_sc" | "eng" | "mixed_sc" | "layer" | "standard" | "inf";
const FormatTypeList: FormatType[] = ["st", "sc", "scientific", "omega", "omega_short", "elemental", "old_sc", "eng", "mixed_sc", "layer", "standard", "inf"];

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
            value = E(value);
            const step = E.floor(value.div(1000));
            const omegaAmount = E.floor(step.div(FORMATS.omega.config.greek.length));
            let lastLetter = FORMATS.omega.config.greek[step.toNumber() % FORMATS.omega.config.greek.length] + toSubscript(value.toNumber() % 1000);
            const beyondGreekArrayBounds = FORMATS.omega.config.greek[step.toNumber() % FORMATS.omega.config.greek.length] === undefined;
            if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
                lastLetter = "ω";
            }
            const omegaOrder = E.log(value, 8000).toNumber();
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
            const val = E.pow(8000, omegaOrder % 1);
            const orderStr = omegaOrder < 100
                ? Math.floor(omegaOrder).toFixed(0)
                : FORMATS.omega.format(E.floor(omegaOrder));
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
            value = E(value);
            const step = E.floor(value.div(1000));
            const omegaAmount = E.floor(step.div(FORMATS.omega_short.config.greek.length));
            let lastLetter = FORMATS.omega_short.config.greek[step.toNumber() % FORMATS.omega_short.config.greek.length] + toSubscript(value.toNumber() % 1000);
            const beyondGreekArrayBounds = FORMATS.omega_short.config.greek[step.toNumber() % FORMATS.omega_short.config.greek.length] === undefined;
            if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
                lastLetter = "ω";
            }
            const omegaOrder = E.log(value, 8000).toNumber();
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
            const val = E.pow(8000, omegaOrder % 1);
            const orderStr = omegaOrder < 100
                ? Math.floor(omegaOrder).toFixed(0)
                : FORMATS.omega_short.format(E.floor(omegaOrder));
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
        getAbbreviationAndValue (x: E) {
            const abbreviationListUnfloored = x.log(118).toNumber();
            const abbreviationListIndex = Math.floor(abbreviationListUnfloored) + 1;
            const abbreviationLength = FORMATS.elemental.abbreviationLength(abbreviationListIndex);
            const abbreviationProgress = abbreviationListUnfloored - abbreviationListIndex + 1;
            const abbreviationIndex = Math.floor(abbreviationProgress * abbreviationLength);
            const abbreviation = FORMATS.elemental.getAbbreviation(abbreviationListIndex, abbreviationProgress);
            const value = E(118).pow(abbreviationListIndex + abbreviationIndex / abbreviationLength - 1);
            return [abbreviation, value];
        },
        formatElementalPart (abbreviation: string, n: E) {
            if (n.eq(1)) {
                return abbreviation;
            }
            return `${n} ${abbreviation}`;
        },
        format (value: E, acc: number): string {
            if (value.gt(E(118).pow(E(118).pow(E(118).pow(4))))) return "e" + FORMATS.elemental.format(value.log10(), acc);

            let log = value.log(118);
            const slog = log.log(118);
            const sslog = slog.log(118).toNumber();
            const max = Math.max(4 - sslog * 2, 1);
            const parts = [];
            while (log.gte(1) && parts.length < max) {
                const [abbreviation, valueAb] = FORMATS.elemental.getAbbreviationAndValue(log);
                const n = log.div(valueAb).floor();
                log = log.sub(n.mul(valueAb));
                parts.unshift([abbreviation, n]);
            }
            if (parts.length >= max) {
                // @ts-ignore
                return parts.map((x) => FORMATS.elemental.formatElementalPart(x[0], x[1])).join(" + ");
            }
            const formattedMantissa = E(118).pow(log).toFixed(parts.length === 1 ? 3 : acc);
            if (parts.length === 0) {
                return formattedMantissa;
            }
            if (parts.length === 1) {
                // @ts-ignore
                return `${formattedMantissa} × ${FORMATS.elemental.formatElementalPart(parts[0][0], parts[0][1])}`;
            }
            // @ts-ignore
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
            ex = E(ex);
            const e = ex.log10().floor();
            if (e.lt(9)) {
                if (e.lt(3)) {
                    return ex.toFixed(acc);
                }
                return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            } else {
                if (ex.gte("eeee10")) {
                    const slog = ex.slog();
                    return (slog.gte(1e9) ? "" : E(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + FORMATS.old_sc.format(slog.floor(), 0);
                }
                const m = ex.div(E(10).pow(e));
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
        format (ex: DecimalSource, acc: number): string {
            ex = E(ex);
            const e = ex.log10().floor();
            if (e.lt(9)) {
                if (e.lt(3)) {
                    return ex.toFixed(acc);
                }
                return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            } else {
                if (ex.gte("eeee10")) {
                    const slog = ex.slog();
                    return (slog.gte(1e9) ? "" : E(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + FORMATS.eng.format(slog.floor(), 0);
                }
                const m = ex.div(E(1000).pow(e.div(3).floor()));
                // @ts-ignore
                return (e.log10().gte(9) ? "" : m.toFixed(E(4).sub(e.sub(e.div(3).floor().mul(3))))) + "e" + FORMATS.eng.format(e.div(3).floor().mul(3), 0);
            }
        },
    },
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
        format (ex: DecimalSource, acc: number, max: number): string {
            ex = E(ex);
            const e = ex.log10().floor();
            if (e.lt(303) && e.gte(max)) return format(ex, acc, max, "st");
            else return format(ex, acc, max, "sc");
        },
    },
    layer: {
        layers: ["infinity", "eternity", "reality", "equality", "affinity", "celerity", "identity", "vitality", "immunity", "atrocity"],
        format (ex: DecimalSource, acc: number, max: number): string {
            ex = E(ex);
            const layer = ex.max(1).log10().max(1).log(INFINITY_NUM.log10()).floor();
            if (layer.lte(0)) return format(ex, acc, max, "sc");
            ex = E(10).pow(ex.max(1).log10().div(INFINITY_NUM.log10().pow(layer)).sub(layer.gte(1) ? 1 : 0));
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
    inf: {
        format (ex: DecimalSource, acc: number, max: number): string {
            ex = E(ex);
            let meta = 0;
            const inf = E(Number.MAX_VALUE);
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
};

// console.log(E);

const INFINITY_NUM = E(2).pow(1024);
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
 * @param max - The maximum number of E places to display, defaults to `9`.
 * @param type - The type of format to use (default "mixed_sc")
 * @returns - The formatted value
 */
function format (ex: DecimalSource, acc: number = 2, max: number = 9, type: FormatType = "mixed_sc"): string {
    ex = E(ex);
    const neg = ex.lt(0) ? "-" : "";
    if (ex.mag == Infinity) return neg + "Infinity";
    if (Number.isNaN(ex.mag)) return neg + "NaN";
    if (ex.lt(0)) ex = ex.mul(-1);
    if (ex.eq(0)) return ex.toFixed(acc);
    const e = ex.log10().floor();
    switch (type) {
    case "sc":
    case "scientific":
        if (ex.log10().lt(Math.min(-acc, 0)) && acc > 1) {
            const e1 = ex.log10().ceil();
            const m = ex.div(e1.eq(-1) ? E(0.1) : E(10).pow(e1));
            const be = e1.mul(-1).max(1).log10().gte(9);
            return neg + (be ? "" : m.toFixed(2)) + "e" + format(e, 0, max, "mixed_sc");
        } else if (e.lt(max)) {
            const a = Math.max(Math.min(acc - e.toNumber(), acc), 0);
            return neg + (a > 0 ? ex.toFixed(a) : ex.toFixed(a).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
        } else {
            if (ex.gte("eeee10")) {
                const slog = ex.slog();
                return (slog.gte(1e9) ? "" : E(10).pow(slog.sub(slog.floor())).toFixed(2)) + "F" + format(slog.floor(), 0);
            }
            const m = ex.div(E(10).pow(e));
            const be = e.log10().gte(9);
            return neg + (be ? "" : m.toFixed(2)) + "e" + format(e, 0, max, "mixed_sc");
        }
    case "st":
    case "standard":
    {
        let e3 = ex.log(1e3).floor();
        if (e3.lt(1)) {
            return neg + ex.toFixed(Math.max(Math.min(acc - e.toNumber(), acc), 0));
        } else {
            const e3_mul = e3.mul(3);
            const ee = e3.log10().floor();
            if (ee.gte(3000)) return "e" + format(e, acc, max, "st");

            let final = "";
            if (e3.lt(4)) final = ["", "K", "M", "B"][Math.round(e3.toNumber())];
            else {
                let ee3 = Math.floor(e3.log(1e3).toNumber());
                if (ee3 < 100) ee3 = Math.max(ee3 - 1, 0);
                e3 = e3.sub(1).div(E(10).pow(ee3 * 3));
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

            const m = ex.div(E(10).pow(e3_mul));
            return neg + (ee.gte(10) ? "" : (m.toFixed(E(2).sub(e.sub(e3_mul)).add(1).toNumber())) + " ") + final;
        }
    }
    default:
        // Other formats
        if (!FORMATS[type]) console.error(`Invalid format type "${type}"`);
        return neg + FORMATS[type]?.format(ex, acc, max);
    }
}

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
function formatGain (amt: DecimalSource, gain: DecimalSource, type: FormatType = "mixed_sc"): string {
    amt = E(amt);
    gain = E(gain);
    const next = amt.add(gain);
    let rate;
    let ooms = next.div(amt);
    if (ooms.gte(10) && amt.gte(1e100)) {
        ooms = ooms.log10().mul(20);
        rate = "(+" + format(ooms, 2, 9, type) + " OoMs/sec)";
    }
    else rate = "(+" + format(gain, 2, 9, type) + "/sec)";
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
    ex = E(ex);
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
    ex = E(ex);
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
    ex = E(ex);
    return format(E(1).sub(ex).mul(100)) + "%";
}

/**
 * Format the percent
 * @param ex - The value to format
 * @returns - The formatted percent
 */
function formatPercent (ex: DecimalSource): string {
    ex = E(ex);
    return format(ex.mul(100)) + "%";
}

/**
 * Format the multiplier
 * @param ex - The value to format
 * @param acc - The accuracy
 * @returns - The formatted multiplier
 */
function formatMult (ex: DecimalSource, acc: number = 2): string {
    ex = E(ex);
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
    return E.gte(a, 10) ? E.pow(base, E.log(a, base).pow(b)) : E(a);
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
    num = E(num);
    interface IAbb {
        name: string;
        altName: string;
        value: E;
    }
    const abb = ((abbM: Omit<IAbb, "value">[]): IAbb[] => {
        return abbM.map((x, i) => {
            return {
                name: x.name,
                altName: x.altName,
                value: E.pow(1000, E(i).add(1)),
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
    const abbNum = num.lte(0) ? 0 : E.min(E.log(num, 1000).sub(1), abb.length - 1).floor().toNumber();
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

/*
// Test
const testA = E(Math.random()).mul("1e" + Math.floor(Math.random() * 1e3));
console.log(testA);
const testB = E(Math.random()).mul("1e" + Math.floor(Math.random() * 1e3));
console.log(testB);

const testFormats = {
    toString: (x: DecimalSource) => E(x).toString(),
    prototype: (x: DecimalSource) => E(x).format(),
    standard: (x: DecimalSource) => format(x, 2, 9, "st"),
    sc: (x: DecimalSource) => format(x, 2, 9, "sc"),
    default: format,
    gain: [formatGain],
    omega: (x: DecimalSource) => format(x, 2, 9, "omega"),
    omega_short: (x: DecimalSource) => format(x, 2, 9, "omega_short"),
    elemental: (x: DecimalSource) => format(x, 2, 9, "elemental"),
    old_sc: (x: DecimalSource) => format(x, 2, 9, "old_sc"),
    eng: (x: DecimalSource) => format(x, 2, 9, "eng"),
    mixed_sc: (x: DecimalSource) => format(x, 2, 9, "mixed_sc"),
    layer: (x: DecimalSource) => format(x, 2, 9, "layer"),
    inf: (x: DecimalSource) => format(x, 2, 9, "inf"),
    metric: metric,
    ev: ev,
    time: formatTime,
    timeLong: formatTimeLong,
    formatReduction,
    formatPercent,
    formatMult,
    // expMult: [expMult],
};

console.table(Object.keys(testFormats).map((x) => {
    let value: string;
    const formatFn = (testFormats)[x as keyof typeof testFormats];
    try {
        if (Array.isArray(formatFn)) {
            value = formatFn[0](testA, testB);
        } else {
            value = formatFn(testA);
        }
    } catch (e) {
        console.error(e);
        value = "Error";
    }
    return {
        format: x,
        value,
    };
}));
// end test
*/

export { formats, FORMATS, ST_NAMES, FormatTypeList };

// Decimal.formats = formats;

// import { formats, FormatType } from "./formats";

E.formats = formats;

export { E };
export type { CompareResult, DecimalSource as ESource, FormatType };
/**
 * @deprecated Use {@link E} instead
 */
export { Decimal };

// return Decimal;