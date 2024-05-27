/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file idk use black magic and type gymnastics to make this work or something
 */
import type { DecimalSource, CompareResult } from "break_eternity.js";
import { Decimal } from "./declare";

import { decimalFormatGenerator, FormatType } from "../format";

/**
 * A type representing the additional methods added to the Decimal class.
 */
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
     * @param [acc] - The desired accuracy (number of significant figures).
     * @param [max] - The maximum number of decimal places to display.
     * @returns A string representing the formatted gain
     * @example
     * const currency = new Decimal(100);
     * const currencyGain = new Decimal(12);
     * const formatted = currency.formats.formatGain(currencyGain);
     * console.log(formatted); // should return "(+12/sec)"
     */
    formatGain (gain: DecimalSource, type: FormatType, acc?: number, max?: number): string;
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
    /**
     * @deprecated If you are using `emath.js`, use {@link E} instead
     */
    // eslint-disable-next-line no-shadow
    interface Decimal extends DecimalAddedMethodsInterface {}
    // namespace Decimal {
    //     // eslint-disable-next-line no-shadow
    //     // let formats: typeof formats;
    // }
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

    formatGain (this: Decimal, gain: DecimalSource, type: FormatType = "mixed_sc", acc?: number, max?: number): string {
        return formats.formatGain(this.clone(), gain, type, acc, max);
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
            const q = Math.floor(newNum / roman[i as keyof typeof roman]);
            newNum -= q * roman[i as keyof typeof roman];
            str += i.repeat(q);
        }

        return str;
    },
};

/**
 * Adds methods to an object
 * @param obj - The object to add methods to
 * @param methods - The methods to add
 */
function addMethods (obj: Record<string, any>, methods: Record<string, any>): void {
    for (const key in methods) {
        // (obj as any)[key] = (methods[key as keyof typeof methods] as (...args: any[]) => any).bind(obj);
        (obj as any)[key] = methods[key];
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
    softcap (value: DecimalSource, start: DecimalSource, power: number, mode: string): Decimal {
        return new Decimal(value).softcap(start, power, mode);
    },

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
    scale (value: DecimalSource, s: DecimalSource, p: DecimalSource, mode: string | number, rev: boolean = false): Decimal {
        return new Decimal(value).scale(s, p, mode, rev);
    },

    /**
     * Formats the E instance with a specified accuracy and maximum Decimal places.
     * See {@link DecimalAddedMethods.format} for more details.
     * @param e - The E instance to format.
     * @param [acc] - The desired accuracy (number of significant figures), defaults to `2`.
     * @param [max] - The maximum number of Decimal places to display, defaults to `9`.
     * @param [type] - The type of format, defaults to `"mixed_sc"`.
     * @returns A string representing the formatted E value.
     */
    format (e: DecimalSource, acc: number = 2, max: number = 9, type: FormatType = "mixed_sc"): string {
        return formats.format(new Decimal(e), acc, max, type);
    },

    /**
     * Formats the E instance in standard leter notation with a specified accuracy and maximum Decimal places.
     * See {@link DecimalAddedMethods.formatST} for more details.
     * @param value - The value to format.
     * @param [acc] - The desired accuracy (number of significant figures).
     * @param [max] - The maximum number of Decimal places to display.
     * @param [type] - The type of format (default standard)
     * @returns A string representing the formatted E value.
     */
    formatST (value: DecimalSource, acc: number = 2, max: number = 9, type: FormatType = "st"): string {
        return formats.format(new Decimal(value), acc, max, type);
    },

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
    formatGain (value: DecimalSource, gain: DecimalSource, type: FormatType = "mixed_sc", acc?: number, max?: number): string {
        return formats.formatGain(new Decimal(value), gain, type, acc, max);
    },

    /**
     * Converts the E instance to a Roman numeral representation.
     * See {@link DecimalAddedMethods.toRoman} for more details.
     * @param value - The value to convert to a Roman numeral.
     * @param [max] - Max before it returns the original
     * @returns A string representing the Roman numeral equivalent of the E value,
     * or the original E instance if it is greater than or equal to 5000 or less than 1.
     */
    toRoman (value: DecimalSource, max: DecimalSource): string | Decimal {
        return new Decimal(value).toRoman(max);
    },

    /**
     * Returns a random Decimal value between the specified minimum and maximum values.
     * This suffers from floating point errors if you want to generate a random number close to either the minimum or the maximum.
     * @param [min] - The minimum value, defaults to `0`.
     * @param [max] - The maximum value, defaults to `1`.
     * @returns A random Decimal value between the minimum and maximum values.
     */
    random (min: DecimalSource = 0, max: DecimalSource = 1): Decimal {
        min = new Decimal(min);
        max = new Decimal(max);
        min = min.lt(max) ? min : max;
        max = max.gt(min) ? max : min;
        return new Decimal(Math.random()).mul(max.sub(min)).add(min);
    },

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
    randomProb (rng: DecimalSource): boolean {
        return new Decimal(Math.random()).lt(rng);
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
    (Object.getOwnPropertyNames(Decimal).filter((b) => ![...Object.getOwnPropertyNames(class {}), "arguments", "caller", "callee"].includes(b))).forEach((prop) => {
        // console.log(prop);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (out as any)[prop] = (Decimal as any)[prop];
    });
    return out;
})();

type E = Decimal;

// console.log("clone test", E(5).format());

// Formats
const { formats } = decimalFormatGenerator(Decimal as unknown as Parameters<typeof decimalFormatGenerator>[0]);

/*
// Test
const mag = 1e6;
const testA = E(Math.random()).mul("1e" + Math.floor(Math.random() * mag));
console.log(testA);
const testB = E(Math.random()).mul("1e" + Math.floor(Math.random() * mag));
console.log(testB);
// const testShort = E(Math.random()).mul(10e3);

const { format, formatGain, metric, ev, formatTime, formatTimeLong, formatReduction, formatPercent, formatMult } = formats;

const testFormats = {
    toString: (x: DecimalSource) => E(x).toString(),
    prototype: (x: DecimalSource) => E(x).format(),
    standard: (x: DecimalSource) => format(x, 2, 9, "st"),
    sc: (x: DecimalSource) => format(x, 2, 9, "sc"),
    default: format,
    gain: [formatGain],
    // TODO: Omega format is broken for very large numbers (call stack size exceeded)
    // omega: (x: DecimalSource) => format(x, 2, 9, "omega"),
    // omega_short: (x: DecimalSource) => format(x, 2, 9, "omega_short"),
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
    alphabet: (x: DecimalSource) => format(x, 2, 9, "alphabet"),
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

export { ST_NAMES, FormatTypeList } from "../format";
export type { FormatType } from "../format";

// Decimal.formats = formats;

// import { formats, FormatType } from "./formats";

E.formats = formats;

export { E };
export type { CompareResult, DecimalSource as DecimalSource };
/**
 * @deprecated Use {@link E} instead
 */
export { Decimal };

// return Decimal;
