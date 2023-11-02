"use strict";

import Decimal from "break_eternity.js";
import formats from "./format";

const { format, formatGain } = formats;

const DecimalClone: any = Decimal;

// @ts-expect-error
const E: {
    /* eslint-disable no-unused-vars */
    (x?: number|string|Decimal): E;
    formats: any;
    smoothDamp: (current: E, target: E, smoothing: E, deltaTime: E) => Decimal;
    format: (e: E, acc?: number, max?: number) => string;
    /* eslint-enable */
} = (x?: number|string|Decimal): E => { return DecimalClone(x); };

const eMath = {};

interface DecimalFunctions {
    [key: string]: any;
}

const decimalFunctions: DecimalFunctions[] = [
    {
        name: "smoothDamp",
        /**
         * Smoothly interpolates between the current value and the target value over time
         * using a smoothing factor and deltaTime.
         *
         * @param {E} current - The current value to interpolate from.
         * @param {E} target - The target value to interpolate towards.
         * @param {E} smoothing - The smoothing factor controlling the interpolation speed.
         *                           A higher value results in slower interpolation.
         * @param {E} deltaTime - The time elapsed since the last frame in seconds.
         * @returns {E} - The interpolated value between `current` and `target`.
         */
        // @ts-ignore
        value: (current: E, target: E, smoothing: E, deltaTime: E): E => current.add(E(target).minus(E(current)).times(E(smoothing)).times(E(deltaTime))),
    },
    {
        name: "format",
        /**
         * Formats the E instance with a specified accuracy and maximum decimal places.
         *
         * @function
         * @memberof E.prototype
         * @name format
         * @param {number} [acc=2] - The desired accuracy (number of significant figures).
         * @param {number} [max=9] - The maximum number of decimal places to display.
         * @returns {string} A string representing the formatted E value.
         */
        value: function (e: E, acc: number = 2, max: number = 9): string { return format(E(e), acc, max); },
    },
];
for (const x of decimalFunctions) {
    DecimalClone[x["name"]] = x["value"];
}
const decimalPrototypeFunctions: DecimalFunctions[] = [
    {
        name: "clone",

        /**
         * Creates a clone of the E instance.
         *
         * @function
         * @memberof E.prototype
         * @name clone
         * @returns {E} A EClone instance that is a clone of the original.
         */
        // eslint-disable-next-line no-unused-vars
        value: function (this: E): E {
            return this;
        },
    },
    {

        name: "mod",

        /**
         * Performs modular arithmetic on the DecimalClone instance.
         *
         * @function
         * @memberof E.prototype
         * @name modular
         * @alias mod
         * @param {E|number|string} other - The number or DecimalClone instance to use for modular arithmetic.
         * @returns {E} A EClone instance representing the result of the modular operation.
         */
        value: function (other: E | number | string): E {
            const other1 = E(other);
            if (other1.eq(0)) return E(0);
            if (this.sign * other1.sign == -1) return this.abs().mod(other1.abs()).neg();
            if (this.sign == -1) return this.abs().mod(other1.abs());
            return this.sub(this.div(other1).floor().mul(other1));
        },
    },
    {
        name: "softcap",

        /**
         * Applies a soft cap to a DecimalClone value using a specified soft cap function.
         *
         * @param {Decimal} start - The value at which the soft cap starts.
         * @param {number} power - The power or factor used in the soft cap calculation.
         * @param {string} mode - The soft cap mode. Use "pow" for power soft cap, "mul" for multiplication soft cap,
         *                       or "exp" for exponential soft cap.
         * @returns {Decimal} - The DecimalClone value after applying the soft cap.
         */
        value: function (start: E, power: number, mode: string): E {
            let x = this.clone();
            if (x.gte(start)) {
                if ([0, "pow"].includes(mode)) x = x.div(start).pow(power).mul(start);
                if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start);
                // if ([2, "exp"].includes(mode)) x = expMult(x.div(start), power).mul(start);
            }
            return x;
        },
    },
    {
        name: "scale",
        /**
        * Scales a currency value using a specified scaling function.
        *
        * @param {Decimal} x - The value of the currency to be scaled.
        * @param {Decimal} s - The value at which scaling starts.
        * @param {Decimal} p - The scaling factor.
        * @param {string} mode - The scaling mode. Use "pow" for power scaling or "exp" for exponential scaling.
        * @param {boolean} [rev=false] - Whether to reverse the scaling operation (unscaling).
        * @returns {Decimal} - The scaled currency value.
        */
        value: function (s: E, p: E, mode: string, rev: boolean = false): E {
            s = E(s);
            p = E(p);
            let x = this.clone();
            if (x.gte(s)) {
                if ([0, "pow"].includes(mode)) x = rev ? x.mul(s.pow(p.sub(1))).root(p) : x.pow(p).div(s.pow(p.sub(1)));
                if ([1, "exp"].includes(mode)) x = rev ? x.div(s).max(1).log(p).add(s) : DecimalClone.pow(p, x.sub(s)).mul(s);
            }
            return x;
        },
    },

    // Formats
    {
        name: "format",

        /**
         * Formats the E instance with a specified accuracy and maximum decimal places.
         *
         * @function
         * @memberof E.prototype
         * @name format
         * @param {number} [acc=2] - The desired accuracy (number of significant figures).
         * @param {number} [max=9] - The maximum number of decimal places to display.
         * @returns {string} A string representing the formatted E value.
         */
        value: function (acc: number = 2, max: number = 9): string { return format(this.clone(), acc, max); },
    },
    {
        name: "formatST",

        /**
         * Formats the E instance in standard leter notation with a specified accuracy and maximum decimal places.
         *
         * @function
         * @memberof E.prototype
         * @name formatST
         * @param {number} [acc=2] - The desired accuracy (number of significant figures).
         * @param {number} [max=9] - The maximum number of decimal places to display.
         * @param {string} [type="st"] - The type of format (default standard)
         * @returns {string} A string representing the formatted E value.
         */
        value: function (acc: number = 2, max: number = 9, type: string = "st"): string { return format(this.clone(), acc, max, type); },
    },
    {
        name: "formatGain",

        /**
         * Formats the gain rate using the E instance.
         *
         * @function
         * @memberof E.prototype
         * @name formatGain
         * @param {E|number|string} gain - The gain value to compare
         * @param {boolean} [mass=false] - Indicates whether the gain represents a mass value.
         * @returns {string} A string representing the formatted gain
         *
         * @example
         * const currency = E(100);
         * const currencyGain = E(12);
         * const formatted = currency.formatGain(currencyGain);
         * console.log(formatted); // should return "(+12/sec)"
         */
        value: function (gain: E): string { return formatGain(this.clone(), gain); },
    },
    {
        name: "toRoman",
        /**
         * Converts the E instance to a Roman numeral representation.
         *
         * @function
         * @memberof E.prototype
         * @name toRoman
         * @param {number|E} [max=5000] - Max before it returns the original
         * @returns {string|E} A string representing the Roman numeral equivalent of the E value,
         * or the original E instance if it is greater than or equal to 5000.
         */
        value: function (max: number | Decimal): string | Decimal {
            max = max ? max : 5000;

            const num: E = this.clone();
            if (num.gte(max)) return num;
            const newNum: number = num.toNumber();

            const digits = String(+newNum).split("");
            const key = [
                "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX",
            ];

            let roman = "", i = 3;
            if (typeof digits.pop() !== "undefined") {
                // @ts-ignore
                while (i--) {roman = (key[+digits.pop() + (i * 10)] || "") + roman;}
                return Array(+digits.join("") + 1).join("M") + roman;
            } else {
                return "";
            }
        },
    },
];

for (const x of decimalPrototypeFunctions) {
    DecimalClone.prototype[x["name"]] = x["value"];
}

Object.getOwnPropertyNames(DecimalClone).forEach((value) => {
    if (value.match(/^(length|constructor|prototype|name)$/)) {
        return;
    };
    // @ts-expect-error
    E[value] = DecimalClone[value];
});

E.formats = formats;

// eslint-disable-next-line no-redeclare
type E = Decimal & {
    /* eslint-disable no-unused-vars */
    clone: (this: E) => Decimal;
    mod: (other: E | number | string) => Decimal;
    softcap: (start: E, power: number, mode: string) => Decimal;
    scale: (s: E, p: E, mode: string, rev?: boolean) => Decimal;
    formatST: (acc?: number, max?: number, type?: string) => string;
    formatGain: (gain: E) => string;
    toRoman: (max: number | Decimal) => string | Decimal;
    /* eslint-enable */
}
export { eMath, E };