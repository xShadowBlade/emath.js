import { E } from "./eMath";
import { boost } from "./classes/boost";
import { currency, currencyStatic } from "./classes/currency";
import { attribute } from "./classes/attribute";
import { grid, gridCell } from "./classes/grid";
import { EString } from "./classes/utility/eString";
import { obb } from "./classes/utility/obb";
import { EArray } from "./classes/utility/eArray";
import { EObject } from "./classes/utility/eObject";
import { game } from "./game/game";
import { keyManager } from "./game/keyManager";
import { eventManager } from "./game/main";
import { dataManager } from "./game/dataManager";
declare const eMath: {
    /**
     * @deprecated Use `import { E } from "emath.js"` instead.
     */
    E: {
        (x?: import("./eMath").ESource | undefined): import("./E/e").default;
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
        fromNumber(value: number): import("./E/e").default; /**
         * @deprecated Use `import { currency } from "emath.js"` instead.
         */
        fromString(value: string): import("./E/e").default;
        fromValue(value: import("./eMath").ESource): import("./E/e").default;
        fromValue_noAlloc(value: import("./eMath").ESource): Readonly<import("./E/e").default>;
        abs(value: import("./eMath").ESource): import("./E/e").default;
        neg(value: import("./eMath").ESource): import("./E/e").default;
        negate(value: import("./eMath").ESource): import("./E/e").default;
        negated(value: import("./eMath").ESource): import("./E/e").default;
        sign(value: import("./eMath").ESource): number;
        sgn(value: import("./eMath").ESource): number;
        round(value: import("./eMath").ESource): import("./E/e").default;
        floor(value: import("./eMath").ESource): import("./E/e").default; /**
         * @deprecated Use `import { gridCell } from "emath.js"` instead.
         */
        ceil(value: import("./eMath").ESource): import("./E/e").default;
        trunc(value: import("./eMath").ESource): import("./E/e").default;
        add(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").default;
        plus(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").default;
        sub(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").default;
        subtract(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").default;
        minus(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").default;
        mul(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").default;
        multiply(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").default;
        times(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").default; /**
         * @deprecated Use `import { game } from "emath.js"` instead.
         */
        div(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").default;
        divide(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").default;
        recip(value: import("./eMath").ESource): import("./E/e").default;
        reciprocal(value: import("./eMath").ESource): import("./E/e").default;
        reciprocate(value: import("./eMath").ESource): import("./E/e").default;
        cmp(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").CompareResult;
        cmpabs(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").CompareResult;
        compare(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").CompareResult;
        isNaN(value: import("./eMath").ESource): boolean;
        isFinite(value: import("./eMath").ESource): boolean;
        eq(value: import("./eMath").ESource, other: import("./eMath").ESource): boolean;
        equals(value: import("./eMath").ESource, other: import("./eMath").ESource): boolean;
        neq(value: import("./eMath").ESource, other: import("./eMath").ESource): boolean;
        notEquals(value: import("./eMath").ESource, other: import("./eMath").ESource): boolean;
        lt(value: import("./eMath").ESource, other: import("./eMath").ESource): boolean;
        lte(value: import("./eMath").ESource, other: import("./eMath").ESource): boolean;
        gt(value: import("./eMath").ESource, other: import("./eMath").ESource): boolean;
        gte(value: import("./eMath").ESource, other: import("./eMath").ESource): boolean;
        max(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").default;
        min(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").default;
        minabs(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").default;
        maxabs(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").default;
        clamp(value: import("./eMath").ESource, min: import("./eMath").ESource, max: import("./eMath").ESource): import("./E/e").default;
        clampMin(value: import("./eMath").ESource, min: import("./eMath").ESource): import("./E/e").default;
        clampMax(value: import("./eMath").ESource, max: import("./eMath").ESource): import("./E/e").default;
        cmp_tolerance(value: import("./eMath").ESource, other: import("./eMath").ESource, tolerance: number): import("./E/e").CompareResult;
        compare_tolerance(value: import("./eMath").ESource, other: import("./eMath").ESource, tolerance: number): import("./E/e").CompareResult;
        eq_tolerance(value: import("./eMath").ESource, other: import("./eMath").ESource, tolerance: number): boolean;
        equals_tolerance(value: import("./eMath").ESource, other: import("./eMath").ESource, tolerance: number): boolean;
        neq_tolerance(value: import("./eMath").ESource, other: import("./eMath").ESource, tolerance: number): boolean;
        notEquals_tolerance(value: import("./eMath").ESource, other: import("./eMath").ESource, tolerance: number): boolean;
        lt_tolerance(value: import("./eMath").ESource, other: import("./eMath").ESource, tolerance: number): boolean;
        lte_tolerance(value: import("./eMath").ESource, other: import("./eMath").ESource, tolerance: number): boolean;
        gt_tolerance(value: import("./eMath").ESource, other: import("./eMath").ESource, tolerance: number): boolean;
        gte_tolerance(value: import("./eMath").ESource, other: import("./eMath").ESource, tolerance: number): boolean;
        pLog10(value: import("./eMath").ESource): import("./E/e").default;
        absLog10(value: import("./eMath").ESource): import("./E/e").default;
        log10(value: import("./eMath").ESource): import("./E/e").default;
        log(value: import("./eMath").ESource, base: import("./eMath").ESource): import("./E/e").default;
        log2(value: import("./eMath").ESource): import("./E/e").default;
        ln(value: import("./eMath").ESource): import("./E/e").default;
        logarithm(value: import("./eMath").ESource, base: import("./eMath").ESource): import("./E/e").default;
        pow(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").default;
        pow10(value: import("./eMath").ESource): import("./E/e").default;
        root(value: import("./eMath").ESource, other: import("./eMath").ESource): import("./E/e").default;
        factorial(value: import("./eMath").ESource, _other?: undefined): import("./E/e").default;
        gamma(value: import("./eMath").ESource, _other?: undefined): import("./E/e").default;
        lngamma(value: import("./eMath").ESource, _other?: undefined): import("./E/e").default;
        exp(value: import("./eMath").ESource): import("./E/e").default;
        sqr(value: import("./eMath").ESource): import("./E/e").default;
        sqrt(value: import("./eMath").ESource): import("./E/e").default;
        cube(value: import("./eMath").ESource): import("./E/e").default;
        cbrt(value: import("./eMath").ESource): import("./E/e").default;
        tetrate(value: import("./eMath").ESource, height?: number | undefined, payload?: import("./eMath").ESource | undefined): import("./E/e").default;
        iteratedexp(value: import("./eMath").ESource, height?: number | undefined, payload?: import("./E/e").default | undefined): import("./E/e").default;
        iteratedlog(value: import("./eMath").ESource, base?: import("./eMath").ESource | undefined, times?: number | undefined): import("./E/e").default;
        layeradd10(value: import("./eMath").ESource, diff: import("./eMath").ESource): import("./E/e").default;
        layeradd(value: import("./eMath").ESource, diff: number, base?: number | undefined): import("./E/e").default;
        slog(value: import("./eMath").ESource, base?: number | undefined): import("./E/e").default;
        lambertw(value: import("./eMath").ESource): import("./E/e").default;
        ssqrt(value: import("./eMath").ESource): import("./E/e").default;
        pentate(value: import("./eMath").ESource, height?: number | undefined, payload?: import("./eMath").ESource | undefined): import("./E/e").default;
        affordGeometricSeries(resourcesAvailable: import("./eMath").ESource, priceStart: import("./eMath").ESource, priceRatio: import("./eMath").ESource, currentOwned: import("./eMath").ESource): import("./E/e").default;
        sumGeometricSeries(numItems: import("./eMath").ESource, priceStart: import("./eMath").ESource, priceRatio: import("./eMath").ESource, currentOwned: import("./eMath").ESource): import("./E/e").default;
        affordArithmeticSeries(resourcesAvailable: import("./eMath").ESource, priceStart: import("./eMath").ESource, priceAdd: import("./eMath").ESource, currentOwned: import("./eMath").ESource): import("./E/e").default;
        sumArithmeticSeries(numItems: import("./eMath").ESource, priceStart: import("./eMath").ESource, priceAdd: import("./eMath").ESource, currentOwned: import("./eMath").ESource): import("./E/e").default;
        efficiencyOfPurchase(cost: import("./eMath").ESource, currentRpS: import("./eMath").ESource, deltaRpS: import("./eMath").ESource): import("./E/e").default;
        randomDecimalForTesting(maxLayers: number): import("./E/e").default;
        affordGeometricSeries_core(resourcesAvailable: import("./E/e").default, priceStart: import("./E/e").default, priceRatio: import("./E/e").default, currentOwned: import("./eMath").ESource): import("./E/e").default;
        sumGeometricSeries_core(numItems: import("./eMath").ESource, priceStart: import("./E/e").default, priceRatio: import("./E/e").default, currentOwned: import("./eMath").ESource): import("./E/e").default;
        affordArithmeticSeries_core(resourcesAvailable: import("./E/e").default, priceStart: import("./E/e").default, priceAdd: import("./E/e").default, currentOwned: import("./E/e").default): import("./E/e").default;
        sumArithmeticSeries_core(numItems: import("./E/e").default, priceStart: import("./E/e").default, priceAdd: import("./E/e").default, currentOwned: import("./E/e").default): import("./E/e").default;
        efficiencyOfPurchase_core(cost: import("./E/e").default, currentRpS: import("./E/e").default, deltaRpS: import("./E/e").default): import("./E/e").default;
        slog_critical(base: number, height: number): number;
        tetrate_critical(base: number, height: number): number;
        critical_section(base: number, height: number, grid: number[][]): number;
        smoothDamp(current: import("./eMath").ESource, target: import("./eMath").ESource, smoothing: import("./eMath").ESource, deltaTime: import("./eMath").ESource): import("./E/e").default;
        format(e: import("./eMath").ESource, acc?: number | undefined, max?: number | undefined): string;
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
        /**
         * @deprecated Use `import { EString } from "emath.js"` instead.
         */
        EString: typeof EString;
        /**
         * @deprecated Use `import { EArray } from "emath.js"` instead.
         */
        EArray: typeof EArray;
        /**
         * @deprecated Use `import { EObject } from "emath.js"` instead.
         */
        EObject: typeof EObject;
        /**
         * @deprecated Use `import { obb } from "emath.js"` instead.
         */
        obb: typeof obb;
    };
    /**
     * @deprecated Use `import { game } from "emath.js"` instead.
     */
    game: typeof game;
    managers: {
        /**
         * @deprecated Use `import { keyManager } from "emath.js"` instead.
         */
        keyManager: typeof keyManager;
        /**
         * @deprecated Use `import { eventManager } from "emath.js"` instead.
         */
        eventManager: typeof eventManager;
        /**
         * @deprecated Use `import { dataManager } from "emath.js"` instead.
         */
        dataManager: typeof dataManager;
    };
    getFast: (object: any, id: string) => object | null;
    get: (object: any, id: string) => object | null;
    randomNumber: (min: number, max: number, round?: boolean | undefined) => number;
    randomString64: (times: number, type: boolean) => string | number;
    randomString: (length: number) => string;
};
export { eMath, E, boost, currency, currencyStatic, attribute, grid, gridCell, EString, EArray, EObject, obb, game, keyManager, eventManager, dataManager, };
