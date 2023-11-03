/* eslint-disable no-unused-vars */
"use strict";

import Decimal, { DecimalSource, CompareResult } from "./E/e";

type DecimalStatc = {
    readonly dZero: Decimal;
    readonly dOne: Decimal;
    readonly dNegOne: Decimal;
    readonly dTwo: Decimal;
    readonly dTen: Decimal;
    readonly dNaN: Decimal;
    readonly dInf: Decimal;
    readonly dNegInf: Decimal;
    readonly dNumberMax: Decimal;
    readonly dNumberMin: Decimal;
    fromComponents(sign: number, layer: number, mag: number): Decimal;
    fromComponents_noNormalize(sign: number, layer: number, mag: number): Decimal;
    fromMantissaExponent(mantissa: number, exponent: number): Decimal;
    fromMantissaExponent_noNormalize(mantissa: number, exponent: number): Decimal;
    fromDecimal(value: Decimal): Decimal;
    fromNumber(value: number): Decimal;
    fromString(value: string): Decimal;
    fromValue(value: DecimalSource): Decimal;
    fromValue_noAlloc(value: DecimalSource): Readonly<Decimal>;
    abs(value: DecimalSource): Decimal;
    neg(value: DecimalSource): Decimal;
    negate(value: DecimalSource): Decimal;
    negated(value: DecimalSource): Decimal;
    sign(value: DecimalSource): number;
    sgn(value: DecimalSource): number;
    round(value: DecimalSource): Decimal;
    floor(value: DecimalSource): Decimal;
    ceil(value: DecimalSource): Decimal;
    trunc(value: DecimalSource): Decimal;
    add(value: DecimalSource, other: DecimalSource): Decimal;
    plus(value: DecimalSource, other: DecimalSource): Decimal;
    sub(value: DecimalSource, other: DecimalSource): Decimal;
    subtract(value: DecimalSource, other: DecimalSource): Decimal;
    minus(value: DecimalSource, other: DecimalSource): Decimal;
    mul(value: DecimalSource, other: DecimalSource): Decimal;
    multiply(value: DecimalSource, other: DecimalSource): Decimal;
    times(value: DecimalSource, other: DecimalSource): Decimal;
    div(value: DecimalSource, other: DecimalSource): Decimal;
    divide(value: DecimalSource, other: DecimalSource): Decimal;
    recip(value: DecimalSource): Decimal;
    reciprocal(value: DecimalSource): Decimal;
    reciprocate(value: DecimalSource): Decimal;
    cmp(value: DecimalSource, other: DecimalSource): CompareResult;
    cmpabs(value: DecimalSource, other: DecimalSource): CompareResult;
    compare(value: DecimalSource, other: DecimalSource): CompareResult;
    isNaN(value: DecimalSource): boolean;
    isFinite(value: DecimalSource): boolean;
    eq(value: DecimalSource, other: DecimalSource): boolean;
    equals(value: DecimalSource, other: DecimalSource): boolean;
    neq(value: DecimalSource, other: DecimalSource): boolean;
    notEquals(value: DecimalSource, other: DecimalSource): boolean;
    lt(value: DecimalSource, other: DecimalSource): boolean;
    lte(value: DecimalSource, other: DecimalSource): boolean;
    gt(value: DecimalSource, other: DecimalSource): boolean;
    gte(value: DecimalSource, other: DecimalSource): boolean;
    max(value: DecimalSource, other: DecimalSource): Decimal;
    min(value: DecimalSource, other: DecimalSource): Decimal;
    minabs(value: DecimalSource, other: DecimalSource): Decimal;
    maxabs(value: DecimalSource, other: DecimalSource): Decimal;
    clamp(value: DecimalSource, min: DecimalSource, max: DecimalSource): Decimal;
    clampMin(value: DecimalSource, min: DecimalSource): Decimal;
    clampMax(value: DecimalSource, max: DecimalSource): Decimal;
    cmp_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): CompareResult;
    compare_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): CompareResult;
    eq_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
    equals_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
    neq_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
    notEquals_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
    lt_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
    lte_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
    gt_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
    gte_tolerance(value: DecimalSource, other: DecimalSource, tolerance: number): boolean;
    pLog10(value: DecimalSource): Decimal;
    absLog10(value: DecimalSource): Decimal;
    log10(value: DecimalSource): Decimal;
    log(value: DecimalSource, base: DecimalSource): Decimal;
    log2(value: DecimalSource): Decimal;
    ln(value: DecimalSource): Decimal;
    logarithm(value: DecimalSource, base: DecimalSource): Decimal;
    pow(value: DecimalSource, other: DecimalSource): Decimal;
    pow10(value: DecimalSource): Decimal;
    root(value: DecimalSource, other: DecimalSource): Decimal;
    factorial(value: DecimalSource, _other?: never): Decimal;
    gamma(value: DecimalSource, _other?: never): Decimal;
    lngamma(value: DecimalSource, _other?: never): Decimal;
    exp(value: DecimalSource): Decimal;
    sqr(value: DecimalSource): Decimal;
    sqrt(value: DecimalSource): Decimal;
    cube(value: DecimalSource): Decimal;
    cbrt(value: DecimalSource): Decimal;
    tetrate(value: DecimalSource, height?: number, payload?: DecimalSource): Decimal;
    iteratedexp(value: DecimalSource, height?: number, payload?: Decimal): Decimal;
    iteratedlog(value: DecimalSource, base?: DecimalSource, times?: number): Decimal;
    layeradd10(value: DecimalSource, diff: DecimalSource): Decimal;
    layeradd(value: DecimalSource, diff: number, base?: number): Decimal;
    slog(value: DecimalSource, base?: number): Decimal;
    lambertw(value: DecimalSource): Decimal;
    ssqrt(value: DecimalSource): Decimal;
    pentate(value: DecimalSource, height?: number, payload?: DecimalSource): Decimal;
    affordGeometricSeries(resourcesAvailable: DecimalSource, priceStart: DecimalSource, priceRatio: DecimalSource, currentOwned: DecimalSource): Decimal;
    sumGeometricSeries(numItems: DecimalSource, priceStart: DecimalSource, priceRatio: DecimalSource, currentOwned: DecimalSource): Decimal;
    affordArithmeticSeries(resourcesAvailable: DecimalSource, priceStart: DecimalSource, priceAdd: DecimalSource, currentOwned: DecimalSource): Decimal;
    sumArithmeticSeries(numItems: DecimalSource, priceStart: DecimalSource, priceAdd: DecimalSource, currentOwned: DecimalSource): Decimal;
    efficiencyOfPurchase(cost: DecimalSource, currentRpS: DecimalSource, deltaRpS: DecimalSource): Decimal;
    randomDecimalForTesting(maxLayers: number): Decimal;
    affordGeometricSeries_core(resourcesAvailable: Decimal, priceStart: Decimal, priceRatio: Decimal, currentOwned: DecimalSource): Decimal;
    sumGeometricSeries_core(numItems: DecimalSource, priceStart: Decimal, priceRatio: Decimal, currentOwned: DecimalSource): Decimal;
    affordArithmeticSeries_core(resourcesAvailable: Decimal, priceStart: Decimal, priceAdd: Decimal, currentOwned: Decimal): Decimal;
    sumArithmeticSeries_core(numItems: Decimal, priceStart: Decimal, priceAdd: Decimal, currentOwned: Decimal): Decimal;
    efficiencyOfPurchase_core(cost: Decimal, currentRpS: Decimal, deltaRpS: Decimal): Decimal;
    slog_critical(base: number, height: number): number;
    tetrate_critical(base: number, height: number): number;
    critical_section(base: number, height: number, grid: number[][]): number;

    smoothDamp(current: DecimalSource, target: DecimalSource, smoothing: DecimalSource, deltaTime: DecimalSource): Decimal;
    format(e: DecimalSource, acc?: number, max?: number): string;
}

// @ts-ignore
const E: DecimalStatc & {
	/* eslint-disable no-unused-vars */
	(x?: DecimalSource): Decimal;
	/* eslint-enable */
} = (x?: DecimalSource) => new Decimal(x);

// Copy static properties from Decimal to E
(Object.getOwnPropertyNames(Decimal).filter((b) => !Object.getOwnPropertyNames(class {}).includes(b)) as string[]).forEach((prop) => {
    (E as any)[prop] = (Decimal as any)[prop];
});

// eslint-disable-next-line no-redeclare
type E = Decimal;

/**
 * A collection of math-related utility functions and classes.
 */
const eMath = {
    getFast: function (object: any, id: string): object | null { // search by convert to string, fast but omits document and class data
        object = JSON.stringify(object);
        const length = id.toString().replace(/\\/g, "").length;
        const searchIndex = object.search(id);
        let output = "";
        let offset = length + 2;
        let unclosedQdb = 0; // ""
        let unclosedQsb = 0; // ''
        let unclosedQib = 0; // ``
        let unclosedB = 0; // []
        let unclosedCB = 0; // {}

        function check () {
            const read = object[searchIndex + offset];
            if (object[searchIndex + offset - 1] != "\\") {
                switch (read) {
                case "\"":
                    if (unclosedQdb == 0) {
                        unclosedQdb = 1;
                    } else {
                        unclosedQdb = 0;
                    }
                    break;
                case "'":
                    if (unclosedQsb == 0) {
                        unclosedQsb = 1;
                    } else {
                        unclosedQsb = 0;
                    }
                    break;
                case "`":
                    if (unclosedQib == 0) {
                        unclosedQib = 1;
                    } else {
                        unclosedQib = 0;
                    }
                    break;

                case "[":
                    unclosedB++;
                    break;
                case "]":
                    unclosedB--;
                    break;
                case "{":
                    unclosedCB++;
                    break;
                case "}":
                    unclosedCB--;
                    break;
                }
            }
            output += read;
            offset++;
        }
        check();
        while (unclosedQdb + unclosedQsb + unclosedQib + unclosedB + unclosedCB != 0) {
            check();
        }
        return JSON.parse(output);
    },
    get: function (object: any, id: string): object | null { // recursive search
        try {
            for (let i = 0; i < Object.keys(object).length; i++) {
                if (Object.keys(object)[i] == "sign") break;
                if (Object.keys(object)[i] == id) {
                    return object[Object.keys(object)[i]];
                } else if (typeof object[Object.keys(object)[i]] == "object") {
                    const output: object | null = this.get(object[Object.keys(object)[i]], id);
                    if (output != null) return output;
                } else {
                    continue;
                }
            }
            return null;
        } catch {
            return null;
        }
    },
};

export { eMath, E, DecimalSource as ESource };