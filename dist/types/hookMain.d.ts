import { boost } from "./classes/boost";
import { currency, currencyStatic } from "./classes/currency";
import { attribute } from "./classes/attribute";
import { grid, gridCell } from "./classes/grid";
declare const eMathWeb: {
    /**
     * @deprecated Use `import { E } from "emath.js"` instead.
     */
    E: {
        (x?: import("./E/e").DecimalSource | undefined): import("./E/e").default;
        formats: {
            toSubscript: (value: number) => string;
            toSuperscript: (value: number) => string;
            formatST: (ex: import("./E/e").DecimalSource, acc?: number | undefined, max?: number | undefined, type?: string | undefined) => string;
            format: (ex: import("./E/e").DecimalSource, acc?: number | undefined, max?: number | undefined, type?: string | undefined) => string;
            formatGain: (amt: import("./E/e").DecimalSource, gain: import("./E/e").DecimalSource) => string;
            formatTime: (ex: import("./E/e").DecimalSource, acc?: number | undefined, type?: string | undefined) => string;
            formatReduction: (ex: import("./E/e").DecimalSource) => string;
            formatPercent: (ex: import("./E/e").DecimalSource) => string;
            formatMult: (ex: import("./E/e").DecimalSource, acc?: number | undefined) => string;
            expMult: (a: import("./E/e").DecimalSource, b: import("./E/e").DecimalSource, base?: number | undefined) => import("./E/e").default;
            metric: (num: import("./E/e").DecimalSource, type: number) => string;
            ev: (num: import("./E/e").DecimalSource, c2?: boolean | undefined) => string;
            omega: {
                config: {
                    greek: string;
                    infinity: string;
                };
                format(value: import("./E/e").default): string;
            };
            omega_short: {
                config: {
                    greek: string;
                    infinity: string;
                };
                format(value: import("./E/e").default): string;
            };
            elemental: {
                config: {
                    element_lists: string[][];
                };
                getOffset(group: number): number;
                getAbbreviation(group: number, progress: number): string;
                beyondOg(x: number): string;
                abbreviationLength(group: number): number;
                getAbbreviationAndValue(x: import("./E/e").default): (string | import("./E/e").default)[];
                formatElementalPart(abbreviation: string, n: import("./E/e").default): string;
                format(value: import("./E/e").default, acc: number): string;
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
        readonly dZero: import("./E/e").default;
        readonly dOne: import("./E/e").default;
        readonly dNegOne: import("./E/e").default;
        readonly dTwo: import("./E/e").default;
        readonly dTen: import("./E/e").default;
        readonly dNaN: import("./E/e").default;
        readonly dInf: import("./E/e").default;
        readonly dNegInf: import("./E/e").default;
        readonly dNumberMax: import("./E/e").default;
        readonly dNumberMin: import("./E/e").default;
        fromComponents(sign: number, layer: number, mag: number): import("./E/e").default;
        fromComponents_noNormalize(sign: number, layer: number, mag: number): import("./E/e").default;
        fromMantissaExponent(mantissa: number, exponent: number): import("./E/e").default;
        fromMantissaExponent_noNormalize(mantissa: number, exponent: number): import("./E/e").default;
        fromDecimal(value: import("./E/e").default): import("./E/e").default;
        fromNumber(value: number): import("./E/e").default;
        fromString(value: string): import("./E/e").default;
        fromValue(value: import("./E/e").DecimalSource): import("./E/e").default;
        fromValue_noAlloc(value: import("./E/e").DecimalSource): Readonly<import("./E/e").default>;
        abs(value: import("./E/e").DecimalSource): import("./E/e").default;
        neg(value: import("./E/e").DecimalSource): import("./E/e").default;
        negate(value: import("./E/e").DecimalSource): import("./E/e").default;
        negated(value: import("./E/e").DecimalSource): import("./E/e").default;
        sign(value: import("./E/e").DecimalSource): number;
        sgn(value: import("./E/e").DecimalSource): number;
        round(value: import("./E/e").DecimalSource): import("./E/e").default;
        floor(value: import("./E/e").DecimalSource): import("./E/e").default;
        ceil(value: import("./E/e").DecimalSource): import("./E/e").default;
        trunc(value: import("./E/e").DecimalSource): import("./E/e").default;
        add(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
        plus(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
        sub(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
        subtract(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
        minus(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
        mul(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
        multiply(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
        times(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
        div(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
        divide(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
        recip(value: import("./E/e").DecimalSource): import("./E/e").default;
        reciprocal(value: import("./E/e").DecimalSource): import("./E/e").default;
        reciprocate(value: import("./E/e").DecimalSource): import("./E/e").default;
        mod(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
        modulo(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
        modular(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
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
        max(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
        min(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
        minabs(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
        maxabs(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
        clamp(value: import("./E/e").DecimalSource, min: import("./E/e").DecimalSource, max: import("./E/e").DecimalSource): import("./E/e").default;
        clampMin(value: import("./E/e").DecimalSource, min: import("./E/e").DecimalSource): import("./E/e").default;
        clampMax(value: import("./E/e").DecimalSource, max: import("./E/e").DecimalSource): import("./E/e").default;
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
        pLog10(value: import("./E/e").DecimalSource): import("./E/e").default;
        absLog10(value: import("./E/e").DecimalSource): import("./E/e").default;
        log10(value: import("./E/e").DecimalSource): import("./E/e").default;
        log(value: import("./E/e").DecimalSource, base: import("./E/e").DecimalSource): import("./E/e").default;
        log2(value: import("./E/e").DecimalSource): import("./E/e").default;
        ln(value: import("./E/e").DecimalSource): import("./E/e").default;
        logarithm(value: import("./E/e").DecimalSource, base: import("./E/e").DecimalSource): import("./E/e").default;
        pow(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
        pow10(value: import("./E/e").DecimalSource): import("./E/e").default;
        root(value: import("./E/e").DecimalSource, other: import("./E/e").DecimalSource): import("./E/e").default;
        factorial(value: import("./E/e").DecimalSource, _other?: undefined): import("./E/e").default;
        gamma(value: import("./E/e").DecimalSource, _other?: undefined): import("./E/e").default;
        lngamma(value: import("./E/e").DecimalSource, _other?: undefined): import("./E/e").default;
        exp(value: import("./E/e").DecimalSource): import("./E/e").default;
        sqr(value: import("./E/e").DecimalSource): import("./E/e").default;
        sqrt(value: import("./E/e").DecimalSource): import("./E/e").default;
        cube(value: import("./E/e").DecimalSource): import("./E/e").default;
        cbrt(value: import("./E/e").DecimalSource): import("./E/e").default;
        tetrate(value: import("./E/e").DecimalSource, height?: number | undefined, payload?: import("./E/e").DecimalSource | undefined, linear?: boolean | undefined): import("./E/e").default;
        iteratedexp(value: import("./E/e").DecimalSource, height?: number | undefined, payload?: import("./E/e").default | undefined, linear?: boolean | undefined): import("./E/e").default;
        iteratedlog(value: import("./E/e").DecimalSource, base?: import("./E/e").DecimalSource | undefined, times?: number | undefined, linear?: boolean | undefined): import("./E/e").default;
        layeradd10(value: import("./E/e").DecimalSource, diff: import("./E/e").DecimalSource, linear?: boolean | undefined): import("./E/e").default;
        layeradd(value: import("./E/e").DecimalSource, diff: number, base?: number | undefined, linear?: boolean | undefined): import("./E/e").default;
        slog(value: import("./E/e").DecimalSource, base?: number | undefined, linear?: boolean | undefined): import("./E/e").default;
        lambertw(value: import("./E/e").DecimalSource): import("./E/e").default;
        ssqrt(value: import("./E/e").DecimalSource): import("./E/e").default;
        linear_sroot(value: import("./E/e").DecimalSource, height: number): import("./E/e").default;
        pentate(value: import("./E/e").DecimalSource, height?: number | undefined, payload?: import("./E/e").DecimalSource | undefined, linear?: boolean | undefined): import("./E/e").default;
        affordGeometricSeries(resourcesAvailable: import("./E/e").DecimalSource, priceStart: import("./E/e").DecimalSource, priceRatio: import("./E/e").DecimalSource, currentOwned: import("./E/e").DecimalSource): import("./E/e").default;
        sumGeometricSeries(numItems: import("./E/e").DecimalSource, priceStart: import("./E/e").DecimalSource, priceRatio: import("./E/e").DecimalSource, currentOwned: import("./E/e").DecimalSource): import("./E/e").default;
        affordArithmeticSeries(resourcesAvailable: import("./E/e").DecimalSource, priceStart: import("./E/e").DecimalSource, priceAdd: import("./E/e").DecimalSource, currentOwned: import("./E/e").DecimalSource): import("./E/e").default;
        sumArithmeticSeries(numItems: import("./E/e").DecimalSource, priceStart: import("./E/e").DecimalSource, priceAdd: import("./E/e").DecimalSource, currentOwned: import("./E/e").DecimalSource): import("./E/e").default;
        efficiencyOfPurchase(cost: import("./E/e").DecimalSource, currentRpS: import("./E/e").DecimalSource, deltaRpS: import("./E/e").DecimalSource): import("./E/e").default;
        randomDecimalForTesting(maxLayers: number): import("./E/e").default;
        affordGeometricSeries_core(resourcesAvailable: import("./E/e").default, priceStart: import("./E/e").default, priceRatio: import("./E/e").default, currentOwned: import("./E/e").DecimalSource): import("./E/e").default;
        sumGeometricSeries_core(numItems: import("./E/e").DecimalSource, priceStart: import("./E/e").default, priceRatio: import("./E/e").default, currentOwned: import("./E/e").DecimalSource): import("./E/e").default;
        affordArithmeticSeries_core(resourcesAvailable: import("./E/e").default, priceStart: import("./E/e").default, priceAdd: import("./E/e").default, currentOwned: import("./E/e").default): import("./E/e").default;
        sumArithmeticSeries_core(numItems: import("./E/e").default, priceStart: import("./E/e").default, priceAdd: import("./E/e").default, currentOwned: import("./E/e").default): import("./E/e").default;
        efficiencyOfPurchase_core(cost: import("./E/e").default, currentRpS: import("./E/e").default, deltaRpS: import("./E/e").default): import("./E/e").default;
        slog_critical(base: number, height: number): number;
        tetrate_critical(base: number, height: number): number;
        critical_section(base: number, height: number, grid: number[][], linear?: boolean | undefined): number;
        smoothDamp(current: import("./E/e").DecimalSource, target: import("./E/e").DecimalSource, smoothing: import("./E/e").DecimalSource, deltaTime: import("./E/e").DecimalSource): import("./E/e").default;
        format(e: import("./E/e").DecimalSource, acc?: number | undefined, max?: number | undefined): string;
        softcap(value: import("./E/e").DecimalSource, start: import("./E/e").DecimalSource, power: number, mode: string): import("./E/e").default;
        scale(value: import("./E/e").DecimalSource, s: import("./E/e").DecimalSource, p: import("./E/e").DecimalSource, mode: string | number, rev?: boolean | undefined): import("./E/e").default;
        formatST(value: import("./E/e").DecimalSource, acc?: number | undefined, max?: number | undefined, type?: string | undefined): string;
        formatGain(value: import("./E/e").DecimalSource, gain: import("./E/e").DecimalSource): string;
        toRoman(value: import("./E/e").DecimalSource, max: import("./E/e").DecimalSource): string | import("./E/e").default;
        normalizeFromComponents(x: import("./E/e").default): import("./E/e").default;
        clone(x: import("./E/e").default): import("./E/e").default;
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
