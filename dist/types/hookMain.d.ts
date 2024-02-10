import { boost } from "./classes/boost";
import { currency, currencyStatic } from "./classes/currency";
import { attribute } from "./classes/attribute";
import { grid, gridCell } from "./classes/grid";
declare const eMathWeb: {
    /**
     * @deprecated Use `import { E } from "emath.js"` instead.
     */
    E: {
        (x?: import("./E/e").DecimalSource | undefined): import("./E/e").Decimal;
        formats: {
            toSubscript: (value: number) => string;
            toSuperscript: (value: number) => string;
            formatST: (ex: import("./E/e").DecimalSource, acc?: number | undefined, max?: number | undefined, type?: string | undefined) => string;
            format: (ex: import("./E/e").DecimalSource, acc?: number | undefined, max?: number | undefined, type?: string | undefined) => string;
            formatGain: (amt: import("./E/e").DecimalSource, gain: import("./E/e").DecimalSource) => string;
            formatTime: (ex: import("./E/e").DecimalSource, acc?: number | undefined, type?: string | undefined) => string;
            formatReduction: (ex: import("./E/e").DecimalSource) => string;
            formatPercent: (ex: import("./E/e").DecimalSource) => string; /**
             * @deprecated Use `import { attribute } from "emath.js"` instead.
             */
            formatMult: (ex: import("./E/e").DecimalSource, acc?: number | undefined) => string;
            expMult: (a: import("./E/e").DecimalSource, b: import("./E/e").DecimalSource, base?: number | undefined) => import("./E/e").Decimal;
            metric: (num: import("./E/e").DecimalSource, type: number) => string;
            ev: (num: import("./E/e").DecimalSource, c2?: boolean | undefined) => string;
            omega: {
                config: {
                    greek: string;
                    infinity: string;
                };
                format(value: import("./E/e").Decimal): string;
            };
            omega_short: {
                config: {
                    greek: string;
                    infinity: string;
                };
                format(value: import("./E/e").Decimal): string;
            };
            elemental: {
                config: {
                    element_lists: string[][];
                };
                getOffset(group: number): number;
                getAbbreviation(group: number, progress: number): string;
                beyondOg(x: number): string;
                abbreviationLength(group: number): number;
                getAbbreviationAndValue(x: import("./E/e").Decimal): (string | import("./E/e").Decimal)[];
                formatElementalPart(abbreviation: string, n: import("./E/e").Decimal): string;
                /**
                 * Attach eMath to the window object
                 */
                format(value: import("./E/e").Decimal, acc: number): string;
            };
            old_sc: {
                format(ex: import("./E/e").DecimalSource, acc: number): string;
            };
            eng: {
                format(ex: import("./E/e").DecimalSource, acc: number): string;
            };
            mixed_sc: {
                format(ex: import("./E/e").DecimalSource, acc: number, max: number): string;
            };
            layer: {
                layers: string[];
                format(ex: import("./E/e").DecimalSource, acc: number, max: number): string;
            };
            standard: {
                tier1(x: number): string;
                tier2(x: number): string;
            };
            inf: {
                format(ex: import("./E/e").DecimalSource, acc: number, max: number): string;
            };
        };
        readonly dZero: import("./E/e").Decimal;
        readonly dOne: import("./E/e").Decimal;
        readonly dNegOne: import("./E/e").Decimal;
        readonly dTwo: import("./E/e").Decimal;
        readonly dTen: import("./E/e").Decimal;
        readonly dNaN: import("./E/e").Decimal;
        readonly dInf: import("./E/e").Decimal;
        readonly dNegInf: import("./E/e").Decimal;
        readonly dNumberMax: import("./E/e").Decimal;
        readonly dNumberMin: import("./E/e").Decimal;
        fromComponents(sign: number, layer: number, mag: number): import("./E/e").Decimal;
        fromComponents_noNormalize(sign: number, layer: number, mag: number): import("./E/e").Decimal;
        fromMantissaExponent(mantissa: number, exponent: number): import("./E/e").Decimal;
        fromMantissaExponent_noNormalize(mantissa: number, exponent: number): import("./E/e").Decimal;
        fromDecimal(value: import("./E/e").Decimal): import("./E/e").Decimal;
        fromNumber(value: number): import("./E/e").Decimal;
        fromString(value: string): import("./E/e").Decimal;
        fromValue(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        fromValue_noAlloc(value: import("./E/e").DecimalSource): Readonly<import("./E/e").Decimal>;
        abs(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        neg(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        negate(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        negated(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        sign(value: import("./E/e").DecimalSource): number;
        sgn(value: import("./E/e").DecimalSource): number;
        round(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        floor(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        ceil(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        trunc(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        add(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        plus(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        sub(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        subtract(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        minus(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        mul(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        multiply(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        times(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        div(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        divide(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        recip(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        reciprocal(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        reciprocate(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        mod(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        modulo(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        modular(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        cmp(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").CompareResult;
        cmpabs(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").CompareResult;
        compare(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").CompareResult;
        isNaN(value: import("./E/e").DecimalSource): boolean;
        isFinite(value: import("./E/e").DecimalSource): boolean;
        eq(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): boolean;
        equals(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): boolean;
        neq(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): boolean;
        notEquals(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): boolean;
        lt(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): boolean;
        lte(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): boolean;
        gt(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): boolean;
        gte(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): boolean;
        max(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        min(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        minabs(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        maxabs(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        clamp(value: import("./E/e").DecimalSource, min: import("./E/e").DecimalSource, max: import("./E/e").DecimalSource): import("./E/e").Decimal;
        clampMin(value: import("./E/e").DecimalSource, min: import("./E/e").DecimalSource): import("./E/e").Decimal;
        clampMax(value: import("./E/e").DecimalSource, max: import("./E/e").DecimalSource): import("./E/e").Decimal;
        cmp_tolerance(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource, tolerance: number): import("./E/e").CompareResult;
        compare_tolerance(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource, tolerance: number): import("./E/e").CompareResult;
        eq_tolerance(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource, tolerance: number): boolean;
        equals_tolerance(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource, tolerance: number): boolean;
        neq_tolerance(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource, tolerance: number): boolean;
        notEquals_tolerance(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource, tolerance: number): boolean;
        lt_tolerance(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource, tolerance: number): boolean;
        lte_tolerance(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource, tolerance: number): boolean;
        gt_tolerance(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource, tolerance: number): boolean;
        gte_tolerance(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource, tolerance: number): boolean;
        pLog10(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        absLog10(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        log10(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        log(value: import("./E/e").DecimalSource, base: import("./E/e").DecimalSource): import("./E/e").Decimal;
        log2(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        ln(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        logarithm(value: import("./E/e").DecimalSource, base: import("./E/e").DecimalSource): import("./E/e").Decimal;
        pow(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        pow10(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        root(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").Decimal;
        factorial(value: import("./E/e").DecimalSource, _other?: undefined): import("./E/e").Decimal;
        gamma(value: import("./E/e").DecimalSource, _other?: undefined): import("./E/e").Decimal;
        lngamma(value: import("./E/e").DecimalSource, _other?: undefined): import("./E/e").Decimal;
        exp(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        sqr(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        sqrt(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        cube(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        cbrt(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        tetrate(value: import("./E/e").DecimalSource, height?: number | undefined, payload?: import("./E/e").DecimalSource | undefined, linear?: boolean | undefined): import("./E/e").Decimal;
        iteratedexp(value: import("./E/e").DecimalSource, height?: number | undefined, payload?: import("./E/e").Decimal | undefined, linear?: boolean | undefined): import("./E/e").Decimal;
        iteratedlog(value: import("./E/e").DecimalSource, base?: import("./E/e").DecimalSource | undefined, times?: number | undefined, linear?: boolean | undefined): import("./E/e").Decimal;
        layeradd10(value: import("./E/e").DecimalSource, diff: import("./E/e").DecimalSource, linear?: boolean | undefined): import("./E/e").Decimal;
        layeradd(value: import("./E/e").DecimalSource, diff: number, base?: number | undefined, linear?: boolean | undefined): import("./E/e").Decimal;
        slog(value: import("./E/e").DecimalSource, base?: number | undefined, linear?: boolean | undefined): import("./E/e").Decimal;
        lambertw(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        ssqrt(value: import("./E/e").DecimalSource): import("./E/e").Decimal;
        linear_sroot(value: import("./E/e").DecimalSource, height: number): import("./E/e").Decimal;
        pentate(value: import("./E/e").DecimalSource, height?: number | undefined, payload?: import("./E/e").DecimalSource | undefined, linear?: boolean | undefined): import("./E/e").Decimal;
        affordGeometricSeries(resourcesAvailable: import("./E/e").DecimalSource, priceStart: import("./E/e").DecimalSource, priceRatio: import("./E/e").DecimalSource, currentOwned: import("./E/e").DecimalSource): import("./E/e").Decimal;
        sumGeometricSeries(numItems: import("./E/e").DecimalSource, priceStart: import("./E/e").DecimalSource, priceRatio: import("./E/e").DecimalSource, currentOwned: import("./E/e").DecimalSource): import("./E/e").Decimal;
        affordArithmeticSeries(resourcesAvailable: import("./E/e").DecimalSource, priceStart: import("./E/e").DecimalSource, priceAdd: import("./E/e").DecimalSource, currentOwned: import("./E/e").DecimalSource): import("./E/e").Decimal;
        sumArithmeticSeries(numItems: import("./E/e").DecimalSource, priceStart: import("./E/e").DecimalSource, priceAdd: import("./E/e").DecimalSource, currentOwned: import("./E/e").DecimalSource): import("./E/e").Decimal;
        efficiencyOfPurchase(cost: import("./E/e").DecimalSource, currentRpS: import("./E/e").DecimalSource, deltaRpS: import("./E/e").DecimalSource): import("./E/e").Decimal;
        randomDecimalForTesting(maxLayers: number): import("./E/e").Decimal;
        affordGeometricSeries_core(resourcesAvailable: import("./E/e").Decimal, priceStart: import("./E/e").Decimal, priceRatio: import("./E/e").Decimal, currentOwned: import("./E/e").DecimalSource): import("./E/e").Decimal;
        sumGeometricSeries_core(numItems: import("./E/e").DecimalSource, priceStart: import("./E/e").Decimal, priceRatio: import("./E/e").Decimal, currentOwned: import("./E/e").DecimalSource): import("./E/e").Decimal;
        affordArithmeticSeries_core(resourcesAvailable: import("./E/e").Decimal, priceStart: import("./E/e").Decimal, priceAdd: import("./E/e").Decimal, currentOwned: import("./E/e").Decimal): import("./E/e").Decimal;
        sumArithmeticSeries_core(numItems: import("./E/e").Decimal, priceStart: import("./E/e").Decimal, priceAdd: import("./E/e").Decimal, currentOwned: import("./E/e").Decimal): import("./E/e").Decimal;
        efficiencyOfPurchase_core(cost: import("./E/e").Decimal, currentRpS: import("./E/e").Decimal, deltaRpS: import("./E/e").Decimal): import("./E/e").Decimal;
        slog_critical(base: number, height: number): number;
        tetrate_critical(base: number, height: number): number;
        critical_section(base: number, height: number, grid: number[][], linear?: boolean | undefined): number;
        smoothDamp(current: import("./E/e").DecimalSource, target: import("./E/e").DecimalSource, smoothing: import("./E/e").DecimalSource, deltaTime: import("./E/e").DecimalSource): import("./E/e").Decimal;
        format(e: import("./E/e").DecimalSource, acc?: number | undefined, max?: number | undefined): string;
        softcap(value: import("./E/e").DecimalSource, start: import("./E/e").DecimalSource, power: number, mode: string): import("./E/e").Decimal;
        scale(value: import("./E/e").DecimalSource, s: import("./E/e").DecimalSource, p: import("./E/e").DecimalSource, mode: string | number, rev?: boolean | undefined): import("./E/e").Decimal;
        formatST(value: import("./E/e").DecimalSource, acc?: number | undefined, max?: number | undefined, type?: string | undefined): string;
        formatGain(value: import("./E/e").DecimalSource, gain: import("./E/e").DecimalSource): string;
        toRoman(value: import("./E/e").DecimalSource, max: import("./E/e").DecimalSource): string | import("./E/e").Decimal;
        normalizeFromComponents(x: import("./E/e").Decimal): import("./E/e").Decimal;
        clone(x: import("./E/e").Decimal): import("./E/e").Decimal;
    };
    classes: {
        /**
         * @deprecated Use `import { boost } from "emath.js"` instead.
         */
        boost: typeof boost;
        /**
         * @deprecated Use `import { currency } from "emath.js"` instead.
         */
        currency: typeof currency;
        /**
         * @deprecated Use `import { currencyStatic } from "emath.js"` instead.
         */
        currencyStatic: typeof currencyStatic;
        /**
         * @deprecated Use `import { attribute } from "emath.js"` instead.
         */
        attribute: typeof attribute;
        /**
         * @deprecated Use `import { grid } from "emath.js"` instead.
         */
        grid: typeof grid;
        /**
         * @deprecated Use `import { gridCell } from "emath.js"` instead.
         */
        gridCell: typeof gridCell;
    };
};
/**
 * Attach eMath to the window object
 */
declare function hookMain(): void;
export { hookMain };
export type { eMathWeb };
