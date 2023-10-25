"use strict";

import Decimal from "break_eternity.js";
import formats from "./format.js";

const { format, formatGain } = formats;

const DecimalClone = Decimal;

function E (x?: number|string|Decimal): Decimal { return new DecimalClone(x); };

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
        value: (current: Decimal, target: Decimal, smoothing: Decimal, deltaTime: Decimal): Decimal => current.add(new Decimal(target).minus(new Decimal(current)).times(new Decimal(smoothing)).times(new Decimal(deltaTime))),
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
        value: function (e: Decimal, acc: number = 2, max: number = 9): string { return format(E(e), acc, max); },
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
         * @returns {E} A new DecimalClone instance that is a clone of the original.
         */
        value: function (): Decimal {
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
         * @returns {E} A new DecimalClone instance representing the result of the modular operation.
         */
        value: function (other: Decimal | number | string): Decimal {
            other = E(other);
            if (other.eq(0)) return E(0);
            if (this.sign * other.sign == -1) return this.abs().mod(other.abs()).neg();
            if (this.sign == -1) return this.abs().mod(other.abs());
            return this.sub(this.div(other).floor().mul(other));
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
        value: function (start: Decimal, power: number, mode: string): Decimal {
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
        value: function (s: Decimal, p: Decimal, mode: string, rev: boolean = false): Decimal {
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
        value: function (gain: Decimal | number | string, mass: boolean = false): string { return formatGain(this.clone(), gain, mass); },
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

            let num = this.clone();
            if (num.gte(max)) return num;
            num = num.toNumber();

            const digits = String(+num).split(""), key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

            let roman = "", i = 3;
            while (i--) {roman = (key[+digits.pop() + (i * 10)] || "") + roman;}
            return Array(+digits.join("") + 1).join("M") + roman;
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
    E[value] = DecimalClone[value];
});

// eslint-disable-next-line no-redeclare
type E = Decimal;
// & {
//     clone (): Decimal;
//     mod (other: Decimal | number | string): Decimal;
//     softcap (start: Decimal, power: number, mode: string): Decimal;
//     scale (s: Decimal, p: Decimal, mode: string, rev?: boolean): Decimal;
//     format (acc?: number, max?: number): string;
//     formatST (acc?: number, max?: number, type?: string): string;
//     formatGain (gain: Decimal | number | string, mass?: boolean): string;
//     toRoman (max?: number | Decimal): string | Decimal;
// };
export { eMath, E, formats };