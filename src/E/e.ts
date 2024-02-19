/* eslint-disable max-statements-per-line */
/* eslint-disable no-shadow */
/* eslint-disable no-loss-of-precision */
/* eslint-disable no-unused-vars */
/* eslint-disable no-lonely-if */
/* eslint-disable */

import { LRUCache } from "./lru-cache";
import { Exclude, Expose } from "class-transformer";

export type CompareResult = -1 | 0 | 1;

const MAX_SIGNIFICANT_DIGITS = 17; // Maximum number of digits of precision to assume in Number

const EXP_LIMIT = 9e15; // If we're ABOVE this value, increase a layer. (9e15 is close to the largest integer that can fit in a Number.)

const LAYER_DOWN: number = Math.log10(9e15);

const FIRST_NEG_LAYER = 1 / 9e15; // At layer 0, smaller non-zero numbers than this become layer 1 numbers with negative mag. After that the pattern continues as normal.

const NUMBER_EXP_MAX = 308; // The largest exponent that can appear in a Number, though not all mantissas are valid here.

const NUMBER_EXP_MIN = -324; // The smallest exponent that can appear in a Number, though not all mantissas are valid here.

const MAX_ES_IN_A_ROW = 5; // For default toString behaviour, when to swap from eee... to (e^n) syntax.

const DEFAULT_FROM_STRING_CACHE_SIZE = (1 << 10) - 1; // The default size of the LRU cache used to cache Decimal.fromString.

const IGNORE_COMMAS = true;
const COMMAS_ARE_DECIMAL_POINTS = false;

const powerOf10 = (function () {
    // We need this lookup table because Math.pow(10, exponent)
    // when exponent's absolute value is large is slightly inaccurate.
    // You can fix it with the power of math... or just make a lookup table.
    // Faster AND simpler
    const powersOf10: number[] = [];

    for (let i = NUMBER_EXP_MIN + 1; i <= NUMBER_EXP_MAX; i++) {
        powersOf10.push(Number("1e" + i));
    }

    const indexOf0InPowersOf10 = 323;
    return function (power: number) {
        return powersOf10[power + indexOf0InPowersOf10];
    };
})();

// tetration/slog to real height stuff
// background info and tables of values for critical functions taken here: https://github.com/Patashu/break_eternity.js/issues/22
const critical_headers = [2, Math.E, 3, 4, 5, 6, 7, 8, 9, 10];
const critical_tetr_values = [
    [
    // Base 2 (using http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html )
        1, 1.0891180521811202527, 1.1789767925673958433, 1.2701455431742086633, 1.3632090180450091941,
        1.4587818160364217007, 1.5575237916251418333, 1.6601571006859253673, 1.7674858188369780435, 1.8804192098842727359,
        2,
    ],
    [
    // Base E (using http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html )
        1, // 0.0
        1.1121114330934078681, // 0.1
        1.2310389249316089299, // 0.2
        1.3583836963111376089, // 0.3
        1.4960519303993531879, // 0.4
        1.6463542337511945810, // 0.5
        1.8121385357018724464, // 0.6
        1.9969713246183068478, // 0.7
        2.2053895545527544330, // 0.8
        2.4432574483385252544, // 0.9
        Math.E, // 1.0
    ],
    [
    // Base 3
        1, 1.1187738849693603, 1.2464963939368214, 1.38527004705667, 1.5376664685821402,
        1.7068895236551784, 1.897001227148399, 2.1132403089001035, 2.362480153784171,
        2.6539010333870774, 3,
    ],
    [
    // Base 4
        1, 1.1367350847096405, 1.2889510672956703, 1.4606478703324786, 1.6570295196661111,
        1.8850062585672889, 2.1539465047453485, 2.476829779693097, 2.872061932789197,
        3.3664204535587183, 4,
    ],
    [
    // Base 5
        1, 1.1494592900767588, 1.319708228183931, 1.5166291280087583, 1.748171114438024,
        2.0253263297298045, 2.3636668498288547, 2.7858359149579424, 3.3257226212448145,
        4.035730287722532, 5,
    ],
    [
    // Base 6
        1, 1.159225940787673, 1.343712473580932, 1.5611293155111927, 1.8221199554561318,
        2.14183924486326, 2.542468319282638, 3.0574682501653316, 3.7390572020926873, 4.6719550537360774,
        6,
    ],
    [
    // Base 7
        1, 1.1670905356972596, 1.3632807444991446, 1.5979222279405536, 1.8842640123816674,
        2.2416069644878687, 2.69893426559423, 3.3012632110403577, 4.121250340630164, 5.281493033448316,
        7,
    ],
    [
    // Base 8
        1, 1.1736630594087796, 1.379783782386201, 1.6292821855668218, 1.9378971836180754,
        2.3289975651071977, 2.8384347394720835, 3.5232708454565906, 4.478242031114584,
        5.868592169644505, 8,
    ],
    [
    // Base 9
        1, 1.1793017514670474, 1.394054150657457, 1.65664127441059, 1.985170999970283,
        2.4069682290577457, 2.9647310119960752, 3.7278665320924946, 4.814462547283592,
        6.436522247411611, 9,
    ],
    [
    // Base 10 (using http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html )
        1, 1.1840100246247336579, 1.4061375836156954169, 1.6802272208863963918, 2.026757028388618927,
        2.4770056063449647580, 3.0805252717554819987, 3.9191964192627283911, 5.1351528408331864230,
        6.9899611795347148455, 10,
    ],
];
const critical_slog_values = [
    [
    // Base 2
        -1, -0.9194161097107025, -0.8335625019330468, -0.7425599821143978, -0.6466611521029437,
        -0.5462617907227869, -0.4419033816638769, -0.3342645487554494, -0.224140440909962,
        -0.11241087890006762, 0,
    ],
    [
    // Base E
        -1, // 0.0
        -0.90603157029014, // 0.1
        -0.80786507256596, // 0.2
        -0.7064666939634, // 0.3
        -0.60294836853664, // 0.4
        -0.49849837513117, // 0.5
        -0.39430303318768, // 0.6
        -0.29147201034755, // 0.7
        -0.19097820800866, // 0.8
        -0.09361896280296, // 0.9
        0, // 1.0
    ],
    [
    // Base 3
        -1, -0.9021579584316141, -0.8005762598234203, -0.6964780623319391, -0.5911906810998454,
        -0.486050182576545, -0.3823089430815083, -0.28106046722897615, -0.1831906535795894,
        -0.08935809204418144, 0,
    ],
    [
    // Base 4
        -1, -0.8917227442365535, -0.781258746326964, -0.6705130326902455, -0.5612813129406509,
        -0.4551067709033134, -0.35319256652135966, -0.2563741554088552, -0.1651412821106526,
        -0.0796919581982668, 0,
    ],
    [
    // Base 5
        -1, -0.8843387974366064, -0.7678744063886243, -0.6529563724510552, -0.5415870994657841,
        -0.4352842206588936, -0.33504449124791424, -0.24138853420685147, -0.15445285440944467,
        -0.07409659641336663, 0,
    ],
    [
    // Base 6
        -1, -0.8786709358426346, -0.7577735191184886, -0.6399546189952064, -0.527284921869926,
        -0.4211627631006314, -0.3223479611761232, -0.23107655627789858, -0.1472057700818259,
        -0.07035171210706326, 0,
    ],
    [
    // Base 7
        -1, -0.8740862815291583, -0.7497032990976209, -0.6297119746181752, -0.5161838335958787,
        -0.41036238255751956, -0.31277212146489963, -0.2233976621705518, -0.1418697367979619,
        -0.06762117662323441, 0,
    ],
    [
    // Base 8
        -1, -0.8702632331800649, -0.7430366914122081, -0.6213373075161548, -0.5072025698095242,
        -0.40171437727184167, -0.30517930701410456, -0.21736343968190863, -0.137710238299109,
        -0.06550774483471955, 0,
    ],
    [
    // Base 9
        -1, -0.8670016295947213, -0.7373984232432306, -0.6143173985094293, -0.49973884395492807,
        -0.394584953527678, -0.2989649949848695, -0.21245647317021688, -0.13434688362382652,
        -0.0638072667348083, 0,
    ],
    [
    // Base 10
        -1, -0.8641642839543857, -0.732534623168535, -0.6083127477059322, -0.4934049257184696,
        -0.3885773075899922, -0.29376029055315767, -0.2083678561173622, -0.13155653399373268,
        -0.062401588652553186, 0,
    ],
];

const decimalPlaces = function decimalPlaces (value: number, places: number): number {
    const len = places + 1;
    const numDigits = Math.ceil(Math.log10(Math.abs(value)));
    const rounded = Math.round(value * Math.pow(10, len - numDigits)) * Math.pow(10, numDigits - len);
    return parseFloat(rounded.toFixed(Math.max(len - numDigits, 0)));
};

const f_maglog10 = function (n: number) {
    return Math.sign(n) * Math.log10(Math.abs(n));
};

// from HyperCalc source code
const f_gamma = function (n: number) {
    if (!isFinite(n)) {
        return n;
    }
    if (n < -50) {
        if (n === Math.trunc(n)) {
            return Number.NEGATIVE_INFINITY;
        }
        return 0;
    }

    let scal1 = 1;
    while (n < 10) {
        scal1 = scal1 * n;
        ++n;
    }

    n -= 1;
    let l = 0.9189385332046727; // 0.5*Math.log(2*Math.PI)
    l = l + (n + 0.5) * Math.log(n);
    l = l - n;
    const n2 = n * n;
    let np = n;
    l = l + 1 / (12 * np);
    np = np * n2;
    l = l + 1 / (360 * np);
    np = np * n2;
    l = l + 1 / (1260 * np);
    np = np * n2;
    l = l + 1 / (1680 * np);
    np = np * n2;
    l = l + 1 / (1188 * np);
    np = np * n2;
    l = l + 691 / (360360 * np);
    np = np * n2;
    l = l + 7 / (1092 * np);
    np = np * n2;
    l = l + 3617 / (122400 * np);

    return Math.exp(l) / scal1;
};

const _twopi = 6.2831853071795864769252842; // 2*pi
const _EXPN1 = 0.36787944117144232159553; // exp(-1)
const OMEGA = 0.56714329040978387299997; // W(1, 0)
// from https://math.stackexchange.com/a/465183
// The evaluation can become inaccurate very close to the branch point
const f_lambertw = function (z: number, tol = 1e-10): number {
    let w;
    let wn;

    if (!Number.isFinite(z)) {
        return z;
    }
    if (z === 0) {
        return z;
    }
    if (z === 1) {
        return OMEGA;
    }

    if (z < 10) {
        w = 0;
    } else {
        w = Math.log(z) - Math.log(Math.log(z));
    }

    for (let i = 0; i < 100; ++i) {
        wn = (z * Math.exp(-w) + w * w) / (w + 1);
        if (Math.abs(wn - w) < tol * Math.abs(wn)) {
            return wn;
        } else {
            w = wn;
        }
    }

    throw Error(`Iteration failed to converge: ${z.toString()}`);
    // return Number.NaN;
};

// from https://github.com/scipy/scipy/blob/8dba340293fe20e62e173bdf2c10ae208286692f/scipy/special/lambertw.pxd
// The evaluation can become inaccurate very close to the branch point
// at ``-1/e``. In some corner cases, `lambertw` might currently
// fail to converge, or can end up on the wrong branch.
function d_lambertw (z: Decimal, tol = 1e-10): Decimal {
    let w;
    let ew, wewz, wn;

    if (!Number.isFinite(z.mag)) {
        return z;
    }
    if (z.eq(Decimal.dZero)) {
        return z;
    }
    if (z.eq(Decimal.dOne)) {
    // Split out this case because the asymptotic series blows up
        return Decimal.fromNumber(OMEGA);
    }

    // Get an initial guess for Halley's method
    w = Decimal.ln(z);

    // Halley's method; see 5.9 in [1]

    for (let i = 0; i < 100; ++i) {
        ew = w.neg().exp();
        wewz = w.sub(z.mul(ew));
        wn = w.sub(wewz.div(w.add(1).sub(w.add(2).mul(wewz).div(Decimal.mul(2, w).add(2)))));
        if (Decimal.abs(wn.sub(w)).lt(Decimal.abs(wn).mul(tol))) {
            return wn;
        } else {
            w = wn;
        }
    }

    throw Error(`Iteration failed to converge: ${z.toString()}`);
    // return Decimal.dNaN;
}

export type DecimalSource = Decimal | number | string;

/**
 * The value of the Decimal is sign * 10^10^10...^mag, with (layer) 10s. If the layer is not 0, then negative mag means it's the reciprocal of the corresponding number with positive mag.
 */
@Exclude()
class Decimal {
    public static readonly dZero = Decimal.fromComponents_noNormalize(0, 0, 0);
    public static readonly dOne = Decimal.fromComponents_noNormalize(1, 0, 1);
    public static readonly dNegOne = Decimal.fromComponents_noNormalize(-1, 0, 1);
    public static readonly dTwo = Decimal.fromComponents_noNormalize(1, 0, 2);
    public static readonly dTen = Decimal.fromComponents_noNormalize(1, 0, 10);
    public static readonly dNaN = Decimal.fromComponents_noNormalize(Number.NaN, Number.NaN, Number.NaN);
    public static readonly dInf = Decimal.fromComponents_noNormalize(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    public static readonly dNegInf = Decimal.fromComponents_noNormalize(-1, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
    public static readonly dNumberMax = Decimal.fromComponents(1, 0, Number.MAX_VALUE);
    public static readonly dNumberMin = Decimal.fromComponents(1, 0, Number.MIN_VALUE);

    static fromStringCache = new LRUCache<string, Decimal>(DEFAULT_FROM_STRING_CACHE_SIZE);

    @Expose() public sign = 0;
    @Expose() public mag = 0;
    @Expose() public layer = 0;
    static formats: typeof formats;

    constructor (value?: DecimalSource) {
        if (value instanceof Decimal) {
            this.fromDecimal(value);
        } else if (typeof value === "number") {
            this.fromNumber(value);
        } else if (typeof value === "string") {
            this.fromString(value);
        }
    }

    get m (): number {
        if (this.sign === 0) {
            return 0;
        } else if (this.layer === 0) {
            const exp = Math.floor(Math.log10(this.mag));
            // handle special case 5e-324
            let man;
            if (this.mag === 5e-324) {
                man = 5;
            } else {
                man = this.mag / powerOf10(exp);
            }
            return this.sign * man;
        } else if (this.layer === 1) {
            const residue = this.mag - Math.floor(this.mag);
            return this.sign * Math.pow(10, residue);
        } else {
            // mantissa stops being relevant past 1e9e15 / ee15.954
            return this.sign;
        }
    }

    set m (value: number) {
        if (this.layer <= 2) {
            this.fromMantissaExponent(value, this.e);
        } else {
            // don't even pretend mantissa is meaningful
            this.sign = Math.sign(value);
            if (this.sign === 0) {
                this.layer = 0;
                this.exponent = 0;
            }
        }
    }

    get e (): number {
        if (this.sign === 0) {
            return 0;
        } else if (this.layer === 0) {
            return Math.floor(Math.log10(this.mag));
        } else if (this.layer === 1) {
            return Math.floor(this.mag);
        } else if (this.layer === 2) {
            return Math.floor(Math.sign(this.mag) * Math.pow(10, Math.abs(this.mag)));
        } else {
            return this.mag * Number.POSITIVE_INFINITY;
        }
    }
    set e (value: number) {
        this.fromMantissaExponent(this.m, value);
    }

    get s (): number {
        return this.sign;
    }
    set s (value: number) {
        if (value === 0) {
            this.sign = 0;
            this.layer = 0;
            this.mag = 0;
        } else {
            this.sign = value;
        }
    }

    // Object.defineProperty(Decimal.prototype, "mantissa", {
    get mantissa (): number {
        return this.m;
    }

    set mantissa (value: number) {
        this.m = value;
    }

    get exponent (): number {
        return this.e;
    }
    set exponent (value: number) {
        this.e = value;
    }

    public static fromComponents (sign: number, layer: number, mag: number): Decimal {
        return new Decimal().fromComponents(sign, layer, mag);
    }

    public static fromComponents_noNormalize (sign: number, layer: number, mag: number): Decimal {
        return new Decimal().fromComponents_noNormalize(sign, layer, mag);
    }

    public static fromMantissaExponent (mantissa: number, exponent: number): Decimal {
        return new Decimal().fromMantissaExponent(mantissa, exponent);
    }

    public static fromMantissaExponent_noNormalize (mantissa: number, exponent: number): Decimal {
        return new Decimal().fromMantissaExponent_noNormalize(mantissa, exponent);
    }

    public static fromDecimal (value: Decimal): Decimal {
        return new Decimal().fromDecimal(value);
    }

    public static fromNumber (value: number): Decimal {
        return new Decimal().fromNumber(value);
    }

    public static fromString (value: string): Decimal {
        return new Decimal().fromString(value);
    }

    public static fromValue (value: DecimalSource): Decimal {
        return new Decimal().fromValue(value);
    }

    /**
   * Converts a DecimalSource to a Decimal, without constructing a new Decimal
   * if the provided value is already a Decimal.
   *
   * As the return value could be the provided value itself, this function
   * returns a read-only Decimal to prevent accidental mutations of the value.
   * Use `new Decimal(value)` to explicitly create a writeable copy if mutation
   * is required.
   */
    public static fromValue_noAlloc (value: DecimalSource): Readonly<Decimal> {
        if (value instanceof Decimal) {
            return value;
        } else if (typeof value === "string") {
            const cached = Decimal.fromStringCache.get(value);
            if (cached !== undefined) {
                return cached;
            }
            return Decimal.fromString(value);
        } else if (typeof value === "number") {
            return Decimal.fromNumber(value);
        } else {
            // This should never happen... but some users like Prestige Tree Rewritten
            // pass undefined values in as DecimalSources, so we should handle this
            // case to not break them.
            return Decimal.dZero;
        }
    }

    public static abs (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).abs();
    }

    public static neg (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).neg();
    }

    public static negate (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).neg();
    }

    public static negated (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).neg();
    }

    public static sign (value: DecimalSource): number {
        return Decimal.fromValue_noAlloc(value).sign;
    }

    public static sgn (value: DecimalSource): number {
        return Decimal.fromValue_noAlloc(value).sign;
    }

    public static round (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).round();
    }

    public static floor (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).floor();
    }

    public static ceil (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).ceil();
    }

    public static trunc (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).trunc();
    }

    public static add (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).add(other);
    }

    public static plus (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).add(other);
    }

    public static sub (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).sub(other);
    }

    public static subtract (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).sub(other);
    }

    public static minus (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).sub(other);
    }

    public static mul (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).mul(other);
    }

    public static multiply (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).mul(other);
    }

    public static times (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).mul(other);
    }

    public static div (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).div(other);
    }

    public static divide (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).div(other);
    }

    public static recip (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).recip();
    }

    public static reciprocal (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).recip();
    }

    public static reciprocate (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).reciprocate();
    }

    public static mod (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).mod(other);
    }

    public static modulo (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).modulo(other);
    }

    public static modular (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).modular(other);
    }

    public static cmp (value: DecimalSource, other: DecimalSource): CompareResult {
        return Decimal.fromValue_noAlloc(value).cmp(other);
    }

    public static cmpabs (value: DecimalSource, other: DecimalSource): CompareResult {
        return Decimal.fromValue_noAlloc(value).cmpabs(other);
    }

    public static compare (value: DecimalSource, other: DecimalSource): CompareResult {
        return Decimal.fromValue_noAlloc(value).cmp(other);
    }

    public static isNaN (value: DecimalSource): boolean {
        value = Decimal.fromValue_noAlloc(value);
        return isNaN(value.sign) || isNaN(value.layer) || isNaN(value.mag);
    }

    public static isFinite (value: DecimalSource): boolean {
        value = Decimal.fromValue_noAlloc(value);
        return isFinite(value.sign) && isFinite(value.layer) && isFinite(value.mag);
    }

    public static eq (value: DecimalSource, other: DecimalSource): boolean {
        return Decimal.fromValue_noAlloc(value).eq(other);
    }

    public static equals (value: DecimalSource, other: DecimalSource): boolean {
        return Decimal.fromValue_noAlloc(value).eq(other);
    }

    public static neq (value: DecimalSource, other: DecimalSource): boolean {
        return Decimal.fromValue_noAlloc(value).neq(other);
    }

    public static notEquals (value: DecimalSource, other: DecimalSource): boolean {
        return Decimal.fromValue_noAlloc(value).notEquals(other);
    }

    public static lt (value: DecimalSource, other: DecimalSource): boolean {
        return Decimal.fromValue_noAlloc(value).lt(other);
    }

    public static lte (value: DecimalSource, other: DecimalSource): boolean {
        return Decimal.fromValue_noAlloc(value).lte(other);
    }

    public static gt (value: DecimalSource, other: DecimalSource): boolean {
        return Decimal.fromValue_noAlloc(value).gt(other);
    }

    public static gte (value: DecimalSource, other: DecimalSource): boolean {
        return Decimal.fromValue_noAlloc(value).gte(other);
    }

    public static max (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).max(other);
    }

    public static min (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).min(other);
    }

    public static minabs (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).minabs(other);
    }

    public static maxabs (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).maxabs(other);
    }

    public static clamp (value: DecimalSource, min: DecimalSource, max: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).clamp(min, max);
    }

    public static clampMin (value: DecimalSource, min: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).clampMin(min);
    }

    public static clampMax (value: DecimalSource, max: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).clampMax(max);
    }

    public static cmp_tolerance (
        value: DecimalSource,
        other: DecimalSource,
        tolerance: number,
    ): CompareResult {
        return Decimal.fromValue_noAlloc(value).cmp_tolerance(other, tolerance);
    }

    public static compare_tolerance (
        value: DecimalSource,
        other: DecimalSource,
        tolerance: number,
    ): CompareResult {
        return Decimal.fromValue_noAlloc(value).cmp_tolerance(other, tolerance);
    }

    public static eq_tolerance (
        value: DecimalSource,
        other: DecimalSource,
        tolerance: number,
    ): boolean {
        return Decimal.fromValue_noAlloc(value).eq_tolerance(other, tolerance);
    }

    public static equals_tolerance (
        value: DecimalSource,
        other: DecimalSource,
        tolerance: number,
    ): boolean {
        return Decimal.fromValue_noAlloc(value).eq_tolerance(other, tolerance);
    }

    public static neq_tolerance (
        value: DecimalSource,
        other: DecimalSource,
        tolerance: number,
    ): boolean {
        return Decimal.fromValue_noAlloc(value).neq_tolerance(other, tolerance);
    }

    public static notEquals_tolerance (
        value: DecimalSource,
        other: DecimalSource,
        tolerance: number,
    ): boolean {
        return Decimal.fromValue_noAlloc(value).notEquals_tolerance(other, tolerance);
    }

    public static lt_tolerance (
        value: DecimalSource,
        other: DecimalSource,
        tolerance: number,
    ): boolean {
        return Decimal.fromValue_noAlloc(value).lt_tolerance(other, tolerance);
    }

    public static lte_tolerance (
        value: DecimalSource,
        other: DecimalSource,
        tolerance: number,
    ): boolean {
        return Decimal.fromValue_noAlloc(value).lte_tolerance(other, tolerance);
    }

    public static gt_tolerance (
        value: DecimalSource,
        other: DecimalSource,
        tolerance: number,
    ): boolean {
        return Decimal.fromValue_noAlloc(value).gt_tolerance(other, tolerance);
    }

    public static gte_tolerance (
        value: DecimalSource,
        other: DecimalSource,
        tolerance: number,
    ): boolean {
        return Decimal.fromValue_noAlloc(value).gte_tolerance(other, tolerance);
    }

    public static pLog10 (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).pLog10();
    }

    public static absLog10 (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).absLog10();
    }

    public static log10 (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).log10();
    }

    public static log (value: DecimalSource, base: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).log(base);
    }

    public static log2 (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).log2();
    }

    public static ln (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).ln();
    }

    public static logarithm (value: DecimalSource, base: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).logarithm(base);
    }

    public static pow (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).pow(other);
    }

    public static pow10 (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).pow10();
    }

    public static root (value: DecimalSource, other: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).root(other);
    }

    public static factorial (value: DecimalSource, _other?: never): Decimal {
        return Decimal.fromValue_noAlloc(value).factorial();
    }

    public static gamma (value: DecimalSource, _other?: never): Decimal {
        return Decimal.fromValue_noAlloc(value).gamma();
    }

    public static lngamma (value: DecimalSource, _other?: never): Decimal {
        return Decimal.fromValue_noAlloc(value).lngamma();
    }

    public static exp (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).exp();
    }

    public static sqr (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).sqr();
    }

    public static sqrt (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).sqrt();
    }

    public static cube (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).cube();
    }

    public static cbrt (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).cbrt();
    }

    public static tetrate (
        value: DecimalSource,
        height = 2,
        payload: DecimalSource = Decimal.fromComponents_noNormalize(1, 0, 1),
        linear = false,
    ): Decimal {
        return Decimal.fromValue_noAlloc(value).tetrate(height, payload, linear);
    }

    public static iteratedexp (value: DecimalSource, height = 2, payload = Decimal.fromComponents_noNormalize(1, 0, 1), linear = false): Decimal {
        return Decimal.fromValue_noAlloc(value).iteratedexp(height, payload, linear);
    }

    public static iteratedlog (value: DecimalSource, base: DecimalSource = 10, times = 1, linear = false): Decimal {
        return Decimal.fromValue_noAlloc(value).iteratedlog(base, times, linear);
    }

    public static layeradd10 (value: DecimalSource, diff: DecimalSource, linear = false): Decimal {
        return Decimal.fromValue_noAlloc(value).layeradd10(diff, linear);
    }

    public static layeradd (value: DecimalSource, diff: number, base = 10, linear = false): Decimal {
        return Decimal.fromValue_noAlloc(value).layeradd(diff, base, linear);
    }

    public static slog (value: DecimalSource, base = 10, linear = false): Decimal {
        return Decimal.fromValue_noAlloc(value).slog(base, 100, linear);
    }

    public static lambertw (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).lambertw();
    }

    public static ssqrt (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).ssqrt();
    }

    public static linear_sroot (value: DecimalSource, height: number): Decimal {
        return Decimal.fromValue_noAlloc(value).linear_sroot(height);
    }

    public static pentate (
        value: DecimalSource,
        height = 2,
        payload: DecimalSource = Decimal.fromComponents_noNormalize(1, 0, 1),
        linear = false,
    ): Decimal {
        return Decimal.fromValue_noAlloc(value).pentate(height, payload, linear);
    }

    /**
   * If you're willing to spend 'resourcesAvailable' and want to buy something
   * with exponentially increasing cost each purchase (start at priceStart,
   * multiply by priceRatio, already own currentOwned), how much of it can you buy?
   * Adapted from Trimps source code.
   */

    public static affordGeometricSeries (
        resourcesAvailable: DecimalSource,
        priceStart: DecimalSource,
        priceRatio: DecimalSource,
        currentOwned: DecimalSource,
    ): Decimal {
        return this.affordGeometricSeries_core(
            Decimal.fromValue_noAlloc(resourcesAvailable),
            Decimal.fromValue_noAlloc(priceStart),
            Decimal.fromValue_noAlloc(priceRatio),
            currentOwned,
        );
    }
    /**
   * How much resource would it cost to buy (numItems) items if you already have currentOwned,
   * the initial price is priceStart and it multiplies by priceRatio each purchase?
   */

    public static sumGeometricSeries (
        numItems: DecimalSource,
        priceStart: DecimalSource,
        priceRatio: DecimalSource,
        currentOwned: DecimalSource,
    ): Decimal {
        return this.sumGeometricSeries_core(numItems, Decimal.fromValue_noAlloc(priceStart), Decimal.fromValue_noAlloc(priceRatio), currentOwned);
    }
    /**
   * If you're willing to spend 'resourcesAvailable' and want to buy something with additively
   * increasing cost each purchase (start at priceStart, add by priceAdd, already own currentOwned),
   * how much of it can you buy?
   */

    public static affordArithmeticSeries (
        resourcesAvailable: DecimalSource,
        priceStart: DecimalSource,
        priceAdd: DecimalSource,
        currentOwned: DecimalSource,
    ): Decimal {
        return this.affordArithmeticSeries_core(
            Decimal.fromValue_noAlloc(resourcesAvailable),
            Decimal.fromValue_noAlloc(priceStart),
            Decimal.fromValue_noAlloc(priceAdd),
            Decimal.fromValue_noAlloc(currentOwned),
        );
    }
    /**
   * How much resource would it cost to buy (numItems) items if you already have currentOwned,
   * the initial price is priceStart and it adds priceAdd each purchase?
   * Adapted from http://www.mathwords.com/a/arithmetic_series.htm
   */

    public static sumArithmeticSeries (
        numItems: DecimalSource,
        priceStart: DecimalSource,
        priceAdd: DecimalSource,
        currentOwned: DecimalSource,
    ): Decimal {
        return this.sumArithmeticSeries_core(Decimal.fromValue_noAlloc(numItems), Decimal.fromValue_noAlloc(priceStart), Decimal.fromValue_noAlloc(priceAdd), Decimal.fromValue_noAlloc(currentOwned));
    }
    /**
   * When comparing two purchases that cost (resource) and increase your resource/sec by (deltaRpS),
   * the lowest efficiency score is the better one to purchase.
   * From Frozen Cookies:
   * http://cookieclicker.wikia.com/wiki/Frozen_Cookies_(JavaScript_Add-on)#Efficiency.3F_What.27s_that.3F
   */

    public static efficiencyOfPurchase (
        cost: DecimalSource,
        currentRpS: DecimalSource,
        deltaRpS: DecimalSource,
    ): Decimal {
        return this.efficiencyOfPurchase_core(Decimal.fromValue_noAlloc(cost), Decimal.fromValue_noAlloc(currentRpS), Decimal.fromValue_noAlloc(deltaRpS));
    }

    public static randomDecimalForTesting (maxLayers: number): Decimal {
    // NOTE: This doesn't follow any kind of sane random distribution, so use this for testing purposes only.
    // 5% of the time, return 0
        if (Math.random() * 20 < 1) {
            return Decimal.fromComponents_noNormalize(0, 0, 0);
        }

        const randomsign = Math.random() > 0.5 ? 1 : -1;

        // 5% of the time, return 1 or -1
        if (Math.random() * 20 < 1) {
            return Decimal.fromComponents_noNormalize(randomsign, 0, 1);
        }

        // pick a random layer
        const layer = Math.floor(Math.random() * (maxLayers + 1));

        let randomexp = layer === 0 ? Math.random() * 616 - 308 : Math.random() * 16;
        // 10% of the time, make it a simple power of 10
        if (Math.random() > 0.9) {
            randomexp = Math.trunc(randomexp);
        }
        let randommag = Math.pow(10, randomexp);
        // 10% of the time, trunc mag
        if (Math.random() > 0.9) {
            randommag = Math.trunc(randommag);
        }
        return Decimal.fromComponents(randomsign, layer, randommag);
    }

    public static affordGeometricSeries_core (
        resourcesAvailable: Decimal,
        priceStart: Decimal,
        priceRatio: Decimal,
        currentOwned: DecimalSource,
    ): Decimal {
        const actualStart = priceStart.mul(priceRatio.pow(currentOwned));
        return Decimal.floor(
            resourcesAvailable
                .div(actualStart)
                .mul(priceRatio.sub(1))
                .add(1)
                .log10()
                .div(priceRatio.log10()),
        );
    }

    public static sumGeometricSeries_core (
        numItems: DecimalSource,
        priceStart: Decimal,
        priceRatio: Decimal,
        currentOwned: DecimalSource,
    ): Decimal {
        return priceStart
            .mul(priceRatio.pow(currentOwned))
            .mul(Decimal.sub(1, priceRatio.pow(numItems)))
            .div(Decimal.sub(1, priceRatio));
    }

    public static affordArithmeticSeries_core (
        resourcesAvailable: Decimal,
        priceStart: Decimal,
        priceAdd: Decimal,
        currentOwned: Decimal,
    ): Decimal {
    // n = (-(a-d/2) + sqrt((a-d/2)^2+2dS))/d
    // where a is actualStart, d is priceAdd and S is resourcesAvailable
    // then floor it and you're done!
        const actualStart = priceStart.add(currentOwned.mul(priceAdd));
        const b = actualStart.sub(priceAdd.div(2));
        const b2 = b.pow(2);
        return b
            .neg()
            .add(b2.add(priceAdd.mul(resourcesAvailable).mul(2)).sqrt())
            .div(priceAdd)
            .floor();
    }

    public static sumArithmeticSeries_core (
        numItems: Decimal,
        priceStart: Decimal,
        priceAdd: Decimal,
        currentOwned: Decimal,
    ): Decimal {
        const actualStart = priceStart.add(currentOwned.mul(priceAdd)); // (n/2)*(2*a+(n-1)*d)

        return numItems.div(2).mul(actualStart.mul(2).plus(numItems.sub(1).mul(priceAdd)));
    }

    public static efficiencyOfPurchase_core (
        cost: Decimal,
        currentRpS: Decimal,
        deltaRpS: Decimal,
    ): Decimal {
        return cost.div(currentRpS).add(cost.div(deltaRpS));
    }

    public normalize (): this {
    /*
    PSEUDOCODE:
    Whenever we are partially 0 (sign is 0 or mag and layer is 0), make it fully 0.
    Whenever we are at or hit layer 0, extract sign from negative mag.
    If layer === 0 and mag < FIRST_NEG_LAYER (1/9e15), shift to 'first negative layer' (add layer, log10 mag).
    While abs(mag) > EXP_LIMIT (9e15), layer += 1, mag = maglog10(mag).
    While abs(mag) < LAYER_DOWN (15.954) and layer > 0, layer -= 1, mag = pow(10, mag).

    When we're done, all of the following should be true OR one of the numbers is not IsFinite OR layer is not IsInteger (error state):
    Any 0 is totally zero (0, 0, 0).
    Anything layer 0 has mag 0 OR mag > 1/9e15 and < 9e15.
    Anything layer 1 or higher has abs(mag) >= 15.954 and < 9e15.
    We will assume in calculations that all Decimals are either erroneous or satisfy these criteria. (Otherwise: Garbage in, garbage out.)
    */
        if (this.sign === 0 || (this.mag === 0 && this.layer === 0)) {
            this.sign = 0;
            this.mag = 0;
            this.layer = 0;
            return this;
        }

        if (this.layer === 0 && this.mag < 0) {
            // extract sign from negative mag at layer 0
            this.mag = -this.mag;
            this.sign = -this.sign;
        }

        // Handle shifting from layer 0 to negative layers.
        if (this.layer === 0 && this.mag < FIRST_NEG_LAYER) {
            this.layer += 1;
            this.mag = Math.log10(this.mag);
            return this;
        }

        let absmag = Math.abs(this.mag);
        let signmag = Math.sign(this.mag);

        if (absmag >= EXP_LIMIT) {
            this.layer += 1;
            this.mag = signmag * Math.log10(absmag);
            return this;
        } else {
            while (absmag < LAYER_DOWN && this.layer > 0) {
                this.layer -= 1;
                if (this.layer === 0) {
                    this.mag = Math.pow(10, this.mag);
                } else {
                    this.mag = signmag * Math.pow(10, absmag);
                    absmag = Math.abs(this.mag);
                    signmag = Math.sign(this.mag);
                }
            }
            if (this.layer === 0) {
                if (this.mag < 0) {
                    // extract sign from negative mag at layer 0
                    this.mag = -this.mag;
                    this.sign = -this.sign;
                } else if (this.mag === 0) {
                    // excessive rounding can give us all zeroes
                    this.sign = 0;
                }
            }
        }

        return this;
    }

    public fromComponents (sign: number, layer: number, mag: number): this {
        this.sign = sign;
        this.layer = layer;
        this.mag = mag;

        this.normalize();
        return this;
    }

    public fromComponents_noNormalize (sign: number, layer: number, mag: number): this {
        this.sign = sign;
        this.layer = layer;
        this.mag = mag;
        return this;
    }

    public fromMantissaExponent (mantissa: number, exponent: number): this {
        this.layer = 1;
        this.sign = Math.sign(mantissa);
        mantissa = Math.abs(mantissa);
        this.mag = exponent + Math.log10(mantissa);

        this.normalize();
        return this;
    }

    public fromMantissaExponent_noNormalize (mantissa: number, exponent: number): this {
    // The idea of 'normalizing' a break_infinity.js style Decimal doesn't really apply. So just do the same thing.
        this.fromMantissaExponent(mantissa, exponent);
        return this;
    }

    public fromDecimal (value: Decimal): this {
        this.sign = value.sign;
        this.layer = value.layer;
        this.mag = value.mag;
        return this;
    }

    public fromNumber (value: number): this {
        this.mag = Math.abs(value);
        this.sign = Math.sign(value);
        this.layer = 0;
        this.normalize();
        return this;
    }

    public fromString (value: string): Decimal {
        const originalValue = value;
        const cached = Decimal.fromStringCache.get(originalValue);
        if (cached !== undefined) {
            return this.fromDecimal(cached);
        }
        if (IGNORE_COMMAS) {
            value = value.replace(",", "");
        } else if (COMMAS_ARE_DECIMAL_POINTS) {
            value = value.replace(",", ".");
        }

        // Handle x^^^y format.
        const pentationparts = value.split("^^^");
        if (pentationparts.length === 2) {
            const base = parseFloat(pentationparts[0]);
            const height = parseFloat(pentationparts[1]);
            const heightparts = pentationparts[1].split(";");
            let payload = 1;
            if (heightparts.length === 2) {
                payload = parseFloat(heightparts[1]);
                if (!isFinite(payload)) {
                    payload = 1;
                }
            }
            if (isFinite(base) && isFinite(height)) {
                const result = Decimal.pentate(base, height, payload);
                this.sign = result.sign;
                this.layer = result.layer;
                this.mag = result.mag;
                if (Decimal.fromStringCache.maxSize >= 1) {
                    Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
                }
                return this;
            }
        }

        // Handle x^^y format.
        const tetrationparts = value.split("^^");
        if (tetrationparts.length === 2) {
            const base = parseFloat(tetrationparts[0]);
            const height = parseFloat(tetrationparts[1]);
            const heightparts = tetrationparts[1].split(";");
            let payload = 1;
            if (heightparts.length === 2) {
                payload = parseFloat(heightparts[1]);
                if (!isFinite(payload)) {
                    payload = 1;
                }
            }
            if (isFinite(base) && isFinite(height)) {
                const result = Decimal.tetrate(base, height, payload);
                this.sign = result.sign;
                this.layer = result.layer;
                this.mag = result.mag;
                if (Decimal.fromStringCache.maxSize >= 1) {
                    Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
                }
                return this;
            }
        }

        // Handle x^y format.
        const powparts = value.split("^");
        if (powparts.length === 2) {
            const base = parseFloat(powparts[0]);
            const exponent = parseFloat(powparts[1]);
            if (isFinite(base) && isFinite(exponent)) {
                const result = Decimal.pow(base, exponent);
                this.sign = result.sign;
                this.layer = result.layer;
                this.mag = result.mag;
                if (Decimal.fromStringCache.maxSize >= 1) {
                    Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
                }
                return this;
            }
        }

        // Handle various cases involving it being a Big Number.
        value = value.trim().toLowerCase();

        // handle X PT Y format.
        let base;
        let height;
        let ptparts = value.split("pt");
        if (ptparts.length === 2) {
            base = 10;
            height = parseFloat(ptparts[0]);
            ptparts[1] = ptparts[1].replace("(", "");
            ptparts[1] = ptparts[1].replace(")", "");
            let payload = parseFloat(ptparts[1]);
            if (!isFinite(payload)) {
                payload = 1;
            }
            if (isFinite(base) && isFinite(height)) {
                const result = Decimal.tetrate(base, height, payload);
                this.sign = result.sign;
                this.layer = result.layer;
                this.mag = result.mag;
                if (Decimal.fromStringCache.maxSize >= 1) {
                    Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
                }
                return this;
            }
        }

        // handle XpY format (it's the same thing just with p).
        ptparts = value.split("p");
        if (ptparts.length === 2) {
            base = 10;
            height = parseFloat(ptparts[0]);
            ptparts[1] = ptparts[1].replace("(", "");
            ptparts[1] = ptparts[1].replace(")", "");
            let payload = parseFloat(ptparts[1]);
            if (!isFinite(payload)) {
                payload = 1;
            }
            if (isFinite(base) && isFinite(height)) {
                const result = Decimal.tetrate(base, height, payload);
                this.sign = result.sign;
                this.layer = result.layer;
                this.mag = result.mag;
                if (Decimal.fromStringCache.maxSize >= 1) {
                    Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
                }
                return this;
            }
        }

        // handle XFY format
        ptparts = value.split("f");
        if (ptparts.length === 2) {
            base = 10;
            ptparts[0] = ptparts[0].replace("(", "");
            ptparts[0] = ptparts[0].replace(")", "");
            let payload = parseFloat(ptparts[0]);
            ptparts[1] = ptparts[1].replace("(", "");
            ptparts[1] = ptparts[1].replace(")", "");
            height = parseFloat(ptparts[1]);
            if (!isFinite(payload)) {
                payload = 1;
            }
            if (isFinite(base) && isFinite(height)) {
                const result = Decimal.tetrate(base, height, payload);
                this.sign = result.sign;
                this.layer = result.layer;
                this.mag = result.mag;
                if (Decimal.fromStringCache.maxSize >= 1) {
                    Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
                }
                return this;
            }
        }

        const parts = value.split("e");
        const ecount = parts.length - 1;

        // Handle numbers that are exactly floats (0 or 1 es).
        if (ecount === 0) {
            const numberAttempt = parseFloat(value);
            if (isFinite(numberAttempt)) {
                this.fromNumber(numberAttempt);
                if (Decimal.fromStringCache.size >= 1) {
                    Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
                }
                return this;
            }
        } else if (ecount === 1) {
            // Very small numbers ("2e-3000" and so on) may look like valid floats but round to 0.
            const numberAttempt = parseFloat(value);
            if (isFinite(numberAttempt) && numberAttempt !== 0) {
                this.fromNumber(numberAttempt);
                if (Decimal.fromStringCache.maxSize >= 1) {
                    Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
                }
                return this;
            }
        }

        // Handle new (e^N)X format.
        const newparts = value.split("e^");
        if (newparts.length === 2) {
            this.sign = 1;
            if (newparts[0].charAt(0) == "-") {
                this.sign = -1;
            }
            let layerstring = "";
            for (let i = 0; i < newparts[1].length; ++i) {
                const chrcode = newparts[1].charCodeAt(i);
                if ((chrcode >= 43 && chrcode <= 57) || chrcode === 101) {
                    // is "0" to "9" or "+" or "-" or "." or "e" (or "," or "/")
                    layerstring += newparts[1].charAt(i);
                } // we found the end of the layer count
                else {
                    this.layer = parseFloat(layerstring);
                    this.mag = parseFloat(newparts[1].substr(i + 1));
                    this.normalize();
                    if (Decimal.fromStringCache.maxSize >= 1) {
                        Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
                    }
                    return this;
                }
            }
        }

        if (ecount < 1) {
            this.sign = 0;
            this.layer = 0;
            this.mag = 0;
            if (Decimal.fromStringCache.maxSize >= 1) {
                Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
            }
            return this;
        }
        const mantissa = parseFloat(parts[0]);
        if (mantissa === 0) {
            this.sign = 0;
            this.layer = 0;
            this.mag = 0;
            if (Decimal.fromStringCache.maxSize >= 1) {
                Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
            }
            return this;
        }
        let exponent = parseFloat(parts[parts.length - 1]);
        // handle numbers like AeBeC and AeeeeBeC
        if (ecount >= 2) {
            const me = parseFloat(parts[parts.length - 2]);
            if (isFinite(me)) {
                exponent *= Math.sign(me);
                exponent += f_maglog10(me);
            }
        }

        // Handle numbers written like eee... (N es) X
        if (!isFinite(mantissa)) {
            this.sign = parts[0] === "-" ? -1 : 1;
            this.layer = ecount;
            this.mag = exponent;
        }
        // Handle numbers written like XeY
        else if (ecount === 1) {
            this.sign = Math.sign(mantissa);
            this.layer = 1;
            // Example: 2e10 is equal to 10^log10(2e10) which is equal to 10^(10+log10(2))
            this.mag = exponent + Math.log10(Math.abs(mantissa));
        }
        // Handle numbers written like Xeee... (N es) Y
        else {
            this.sign = Math.sign(mantissa);
            this.layer = ecount;
            if (ecount === 2) {
                const result = Decimal.mul(Decimal.fromComponents(1, 2, exponent), Decimal.fromValue_noAlloc(mantissa));
                this.sign = result.sign;
                this.layer = result.layer;
                this.mag = result.mag;
                if (Decimal.fromStringCache.maxSize >= 1) {
                    Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
                }
                return this;
            } else {
                // at eee and above, mantissa is too small to be recognizable!
                this.mag = exponent;
            }
        }

        this.normalize();
        if (Decimal.fromStringCache.maxSize >= 1) {
            Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
        }
        return this;
    }

    public fromValue (value: DecimalSource): Decimal {
        if (value instanceof Decimal) {
            return this.fromDecimal(value);
        }

        if (typeof value === "number") {
            return this.fromNumber(value);
        }

        if (typeof value === "string") {
            return this.fromString(value);
        }

        this.sign = 0;
        this.layer = 0;
        this.mag = 0;
        return this;
    }

    public toNumber (): number {
        if (!Number.isFinite(this.layer)) {
            return Number.NaN;
        }
        if (this.layer === 0) {
            return this.sign * this.mag;
        } else if (this.layer === 1) {
            return this.sign * Math.pow(10, this.mag);
        } // overflow for any normalized Decimal
        else {
            return this.mag > 0
                ? this.sign > 0
                    ? Number.POSITIVE_INFINITY
                    : Number.NEGATIVE_INFINITY
                : 0;
        }
    }

    public mantissaWithDecimalPlaces (places: number): number {
    // https://stackoverflow.com/a/37425022
        if (isNaN(this.m)) {
            return Number.NaN;
        }

        if (this.m === 0) {
            return 0;
        }

        return decimalPlaces(this.m, places);
    }

    public magnitudeWithDecimalPlaces (places: number): number {
    // https://stackoverflow.com/a/37425022
        if (isNaN(this.mag)) {
            return Number.NaN;
        }

        if (this.mag === 0) {
            return 0;
        }

        return decimalPlaces(this.mag, places);
    }

    public toString (): string {
        if (isNaN(this.layer) || isNaN(this.sign) || isNaN(this.mag)) {
            return "NaN";
        }
        if (this.mag === Number.POSITIVE_INFINITY || this.layer === Number.POSITIVE_INFINITY) {
            return this.sign === 1 ? "Infinity" : "-Infinity";
        }

        if (this.layer === 0) {
            if ((this.mag < 1e21 && this.mag > 1e-7) || this.mag === 0) {
                return (this.sign * this.mag).toString();
            }
            return this.m + "e" + this.e;
        } else if (this.layer === 1) {
            return this.m + "e" + this.e;
        } else {
            // layer 2+
            if (this.layer <= MAX_ES_IN_A_ROW) {
                return (this.sign === -1 ? "-" : "") + "e".repeat(this.layer) + this.mag;
            } else {
                return (this.sign === -1 ? "-" : "") + "(e^" + this.layer + ")" + this.mag;
            }
        }
    }

    public toExponential (places: number): string {
        if (this.layer === 0) {
            return (this.sign * this.mag).toExponential(places);
        }
        return this.toStringWithDecimalPlaces(places);
    }

    public toFixed (places: number): string {
        if (this.layer === 0) {
            return (this.sign * this.mag).toFixed(places);
        }
        return this.toStringWithDecimalPlaces(places);
    }

    public toPrecision (places: number): string {
        if (this.e <= -7) {
            return this.toExponential(places - 1);
        }

        if (places > this.e) {
            return this.toFixed(places - this.exponent - 1);
        }

        return this.toExponential(places - 1);
    }

    public valueOf (): string {
        return this.toString();
    }

    public toJSON (): string {
        return this.toString();
    }

    public toStringWithDecimalPlaces (places: number): string {
        if (this.layer === 0) {
            if ((this.mag < 1e21 && this.mag > 1e-7) || this.mag === 0) {
                return (this.sign * this.mag).toFixed(places);
            }
            return decimalPlaces(this.m, places) + "e" + decimalPlaces(this.e, places);
        } else if (this.layer === 1) {
            return decimalPlaces(this.m, places) + "e" + decimalPlaces(this.e, places);
        } else {
            // layer 2+
            if (this.layer <= MAX_ES_IN_A_ROW) {
                return (
                    (this.sign === -1 ? "-" : "") + "e".repeat(this.layer) + decimalPlaces(this.mag, places)
                );
            } else {
                return (
                    (this.sign === -1 ? "-" : "") + "(e^" + this.layer + ")" + decimalPlaces(this.mag, places)
                );
            }
        }
    }

    public abs (): Decimal {
        return Decimal.fromComponents_noNormalize(this.sign === 0 ? 0 : 1, this.layer, this.mag);
    }

    public neg (): Decimal {
        return Decimal.fromComponents_noNormalize(-this.sign, this.layer, this.mag);
    }

    public negate (): Decimal {
        return this.neg();
    }

    public negated (): Decimal {
        return this.neg();
    }

    // public sign () {
    //     return this.sign;
    //   }

    public sgn (): number {
        return this.sign;
    }

    public round (): this | Decimal {
        if (this.mag < 0) {
            return Decimal.dZero;
        }
        if (this.layer === 0) {
            return Decimal.fromComponents(this.sign, 0, Math.round(this.mag));
        }
        return this;
    }

    public floor (): this | Decimal {
        if (this.mag < 0) {
            return Decimal.dZero;
        }
        if (this.layer === 0) {
            return Decimal.fromComponents(this.sign, 0, Math.floor(this.mag));
        }
        return this;
    }

    public ceil (): this | Decimal {
        if (this.mag < 0) {
            return Decimal.dZero;
        }
        if (this.layer === 0) {
            return Decimal.fromComponents(this.sign, 0, Math.ceil(this.mag));
        }
        return this;
    }

    public trunc (): this | Decimal {
        if (this.mag < 0) {
            return Decimal.dZero;
        }
        if (this.layer === 0) {
            return Decimal.fromComponents(this.sign, 0, Math.trunc(this.mag));
        }
        return this;
    }

    public add (value: DecimalSource): this | Decimal {
        const decimal = Decimal.fromValue_noAlloc(value);

        // inf/nan check
        if (!Number.isFinite(this.layer)) {
            return this;
        }
        if (!Number.isFinite(decimal.layer)) {
            return decimal;
        }

        // Special case - if one of the numbers is 0, return the other number.
        if (this.sign === 0) {
            return decimal;
        }
        if (decimal.sign === 0) {
            return this;
        }

        // Special case - Adding a number to its negation produces 0, no matter how large.
        if (this.sign === -decimal.sign && this.layer === decimal.layer && this.mag === decimal.mag) {
            return Decimal.fromComponents_noNormalize(0, 0, 0);
        }

        let a;
        let b;

        // Special case: If one of the numbers is layer 2 or higher, just take the bigger number.
        if (this.layer >= 2 || decimal.layer >= 2) {
            return this.maxabs(decimal);
        }

        if (Decimal.cmpabs(this, decimal) > 0) {
            a = this;
            b = decimal;
        } else {
            a = decimal;
            b = this;
        }

        if (a.layer === 0 && b.layer === 0) {
            return Decimal.fromNumber(a.sign * a.mag + b.sign * b.mag);
        }

        const layera = a.layer * Math.sign(a.mag);
        const layerb = b.layer * Math.sign(b.mag);

        // If one of the numbers is 2+ layers higher than the other, just take the bigger number.
        if (layera - layerb >= 2) {
            return a;
        }

        if (layera === 0 && layerb === -1) {
            if (Math.abs(b.mag - Math.log10(a.mag)) > MAX_SIGNIFICANT_DIGITS) {
                return a;
            } else {
                const magdiff = Math.pow(10, Math.log10(a.mag) - b.mag);
                const mantissa = b.sign + a.sign * magdiff;
                return Decimal.fromComponents(Math.sign(mantissa), 1, b.mag + Math.log10(Math.abs(mantissa)));
            }
        }

        if (layera === 1 && layerb === 0) {
            if (Math.abs(a.mag - Math.log10(b.mag)) > MAX_SIGNIFICANT_DIGITS) {
                return a;
            } else {
                const magdiff = Math.pow(10, a.mag - Math.log10(b.mag));
                const mantissa = b.sign + a.sign * magdiff;
                return Decimal.fromComponents(Math.sign(mantissa), 1, Math.log10(b.mag) + Math.log10(Math.abs(mantissa)));
            }
        }

        if (Math.abs(a.mag - b.mag) > MAX_SIGNIFICANT_DIGITS) {
            return a;
        } else {
            const magdiff = Math.pow(10, a.mag - b.mag);
            const mantissa = b.sign + a.sign * magdiff;
            return Decimal.fromComponents(Math.sign(mantissa), 1, b.mag + Math.log10(Math.abs(mantissa)));
        }

        // eslint-disable-next-line no-unreachable
        throw Error("Bad arguments to add: " + this + ", " + value);
    }

    public plus (value: DecimalSource): Decimal {
        return this.add(value);
    }

    public sub (value: DecimalSource): Decimal {
        return this.add(Decimal.fromValue_noAlloc(value).neg());
    }

    public subtract (value: DecimalSource): Decimal {
        return this.sub(value);
    }

    public minus (value: DecimalSource): Decimal {
        return this.sub(value);
    }

    public mul (value: DecimalSource): Decimal {
        const decimal = Decimal.fromValue_noAlloc(value);

        // inf/nan check
        if (!Number.isFinite(this.layer)) {
            return this;
        }
        if (!Number.isFinite(decimal.layer)) {
            return decimal;
        }

        // Special case - if one of the numbers is 0, return 0.
        if (this.sign === 0 || decimal.sign === 0) {
            return Decimal.fromComponents_noNormalize(0, 0, 0);
        }

        // Special case - Multiplying a number by its own reciprocal yields +/- 1, no matter how large.
        if (this.layer === decimal.layer && this.mag === -decimal.mag) {
            return Decimal.fromComponents_noNormalize(this.sign * decimal.sign, 0, 1);
        }

        let a;
        let b;

        // Which number is bigger in terms of its multiplicative distance from 1?
        if (
            this.layer > decimal.layer ||
      (this.layer == decimal.layer && Math.abs(this.mag) > Math.abs(decimal.mag))
        ) {
            a = this;
            b = decimal;
        } else {
            a = decimal;
            b = this;
        }

        if (a.layer === 0 && b.layer === 0) {
            return Decimal.fromNumber(a.sign * b.sign * a.mag * b.mag);
        }

        // Special case: If one of the numbers is layer 3 or higher or one of the numbers is 2+ layers bigger than the other, just take the bigger number.
        if (a.layer >= 3 || a.layer - b.layer >= 2) {
            return Decimal.fromComponents(a.sign * b.sign, a.layer, a.mag);
        }

        if (a.layer === 1 && b.layer === 0) {
            return Decimal.fromComponents(a.sign * b.sign, 1, a.mag + Math.log10(b.mag));
        }

        if (a.layer === 1 && b.layer === 1) {
            return Decimal.fromComponents(a.sign * b.sign, 1, a.mag + b.mag);
        }

        if (a.layer === 2 && b.layer === 1) {
            const newmag = Decimal.fromComponents(Math.sign(a.mag), a.layer - 1, Math.abs(a.mag)).add(
                Decimal.fromComponents(Math.sign(b.mag), b.layer - 1, Math.abs(b.mag)),
            );
            return Decimal.fromComponents(a.sign * b.sign, newmag.layer + 1, newmag.sign * newmag.mag);
        }

        if (a.layer === 2 && b.layer === 2) {
            const newmag = Decimal.fromComponents(Math.sign(a.mag), a.layer - 1, Math.abs(a.mag)).add(
                Decimal.fromComponents(Math.sign(b.mag), b.layer - 1, Math.abs(b.mag)),
            );
            return Decimal.fromComponents(a.sign * b.sign, newmag.layer + 1, newmag.sign * newmag.mag);
        }

        throw Error("Bad arguments to mul: " + this + ", " + value);
    }

    public multiply (value: DecimalSource): Decimal {
        return this.mul(value);
    }

    public times (value: DecimalSource): Decimal {
        return this.mul(value);
    }

    public div (value: DecimalSource): Decimal {
        const decimal = Decimal.fromValue_noAlloc(value);
        return this.mul(decimal.recip());
    }

    public divide (value: DecimalSource): Decimal {
        return this.div(value);
    }

    public divideBy (value: DecimalSource): Decimal {
        return this.div(value);
    }

    public dividedBy (value: DecimalSource): Decimal {
        return this.div(value);
    }

    public recip (): Decimal {
        if (this.mag === 0) {
            return Decimal.dNaN;
        } else if (this.layer === 0) {
            return Decimal.fromComponents(this.sign, 0, 1 / this.mag);
        } else {
            return Decimal.fromComponents(this.sign, this.layer, -this.mag);
        }
    }

    public reciprocal (): Decimal {
        return this.recip();
    }

    public reciprocate (): Decimal {
        return this.recip();
    }

    /**
   * -1 for less than value, 0 for equals value, 1 for greater than value
   */
    public cmp (value: DecimalSource): CompareResult {
        const decimal = Decimal.fromValue_noAlloc(value);
        if (this.sign > decimal.sign) {
            return 1;
        }
        if (this.sign < decimal.sign) {
            return -1;
        }
        return (this.sign * this.cmpabs(value)) as CompareResult;
    }

    public cmpabs (value: DecimalSource): CompareResult {
        const decimal = Decimal.fromValue_noAlloc(value);
        const layera = this.mag > 0 ? this.layer : -this.layer;
        const layerb = decimal.mag > 0 ? decimal.layer : -decimal.layer;
        if (layera > layerb) {
            return 1;
        }
        if (layera < layerb) {
            return -1;
        }
        if (this.mag > decimal.mag) {
            return 1;
        }
        if (this.mag < decimal.mag) {
            return -1;
        }
        return 0;
    }

    public compare (value: DecimalSource): CompareResult {
        return this.cmp(value);
    }

    public isNan (): boolean {
        return isNaN(this.sign) || isNaN(this.layer) || isNaN(this.mag);
    }

    public isFinite (): boolean {
        return isFinite(this.sign) && isFinite(this.layer) && isFinite(this.mag);
    }

    public eq (value: DecimalSource): boolean {
        const decimal = Decimal.fromValue_noAlloc(value);
        return this.sign === decimal.sign && this.layer === decimal.layer && this.mag === decimal.mag;
    }

    public equals (value: DecimalSource): boolean {
        return this.eq(value);
    }

    public neq (value: DecimalSource): boolean {
        return !this.eq(value);
    }

    public notEquals (value: DecimalSource): boolean {
        return this.neq(value);
    }

    public lt (value: DecimalSource): boolean {
        return this.cmp(value) === -1;
    }

    public lte (value: DecimalSource): boolean {
        return !this.gt(value);
    }

    public gt (value: DecimalSource): boolean {
        return this.cmp(value) === 1;
    }

    public gte (value: DecimalSource): boolean {
        return !this.lt(value);
    }

    public max (value: DecimalSource): Decimal {
        const decimal = Decimal.fromValue_noAlloc(value);
        return this.lt(decimal) ? decimal : this;
    }

    public min (value: DecimalSource): Decimal {
        const decimal = Decimal.fromValue_noAlloc(value);
        return this.gt(decimal) ? decimal : this;
    }

    public maxabs (value: DecimalSource): Decimal {
        const decimal = Decimal.fromValue_noAlloc(value);
        return this.cmpabs(decimal) < 0 ? decimal : this;
    }

    public minabs (value: DecimalSource): Decimal {
        const decimal = Decimal.fromValue_noAlloc(value);
        return this.cmpabs(decimal) > 0 ? decimal : this;
    }

    public clamp (min: DecimalSource, max: DecimalSource): Decimal {
        return this.max(min).min(max);
    }

    public clampMin (min: DecimalSource): Decimal {
        return this.max(min);
    }

    public clampMax (max: DecimalSource): Decimal {
        return this.min(max);
    }

    public cmp_tolerance (value: DecimalSource, tolerance: number): CompareResult {
        const decimal = Decimal.fromValue_noAlloc(value);
        return this.eq_tolerance(decimal, tolerance) ? 0 : this.cmp(decimal);
    }

    public compare_tolerance (value: DecimalSource, tolerance: number): CompareResult {
        return this.cmp_tolerance(value, tolerance);
    }

    /**
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
    public eq_tolerance (value: DecimalSource, tolerance: number): boolean {
        const decimal = Decimal.fromValue_noAlloc(value); // https://stackoverflow.com/a/33024979
        if (tolerance == null) {
            tolerance = 1e-7;
        }
        // Numbers that are too far away are never close.
        if (this.sign !== decimal.sign) {
            return false;
        }
        if (Math.abs(this.layer - decimal.layer) > 1) {
            return false;
        }
        // return abs(a-b) <= tolerance * max(abs(a), abs(b))
        let magA = this.mag;
        let magB = decimal.mag;
        if (this.layer > decimal.layer) {
            magB = f_maglog10(magB);
        }
        if (this.layer < decimal.layer) {
            magA = f_maglog10(magA);
        }
        return Math.abs(magA - magB) <= tolerance * Math.max(Math.abs(magA), Math.abs(magB));
    }

    public equals_tolerance (value: DecimalSource, tolerance: number): boolean {
        return this.eq_tolerance(value, tolerance);
    }

    public neq_tolerance (value: DecimalSource, tolerance: number): boolean {
        return !this.eq_tolerance(value, tolerance);
    }

    public notEquals_tolerance (value: DecimalSource, tolerance: number): boolean {
        return this.neq_tolerance(value, tolerance);
    }

    public lt_tolerance (value: DecimalSource, tolerance: number): boolean {
        const decimal = Decimal.fromValue_noAlloc(value);
        return !this.eq_tolerance(decimal, tolerance) && this.lt(decimal);
    }

    public lte_tolerance (value: DecimalSource, tolerance: number): boolean {
        const decimal = Decimal.fromValue_noAlloc(value);
        return this.eq_tolerance(decimal, tolerance) || this.lt(decimal);
    }

    public gt_tolerance (value: DecimalSource, tolerance: number): boolean {
        const decimal = Decimal.fromValue_noAlloc(value);
        return !this.eq_tolerance(decimal, tolerance) && this.gt(decimal);
    }

    public gte_tolerance (value: DecimalSource, tolerance: number): boolean {
        const decimal = Decimal.fromValue_noAlloc(value);
        return this.eq_tolerance(decimal, tolerance) || this.gt(decimal);
    }

    public pLog10 (): Decimal {
        if (this.lt(Decimal.dZero)) {
            return Decimal.dZero;
        }
        return this.log10();
    }

    public absLog10 (): Decimal {
        if (this.sign === 0) {
            return Decimal.dNaN;
        } else if (this.layer > 0) {
            return Decimal.fromComponents(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
        } else {
            return Decimal.fromComponents(1, 0, Math.log10(this.mag));
        }
    }

    public log10 (): Decimal {
        if (this.sign <= 0) {
            return Decimal.dNaN;
        } else if (this.layer > 0) {
            return Decimal.fromComponents(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
        } else {
            return Decimal.fromComponents(this.sign, 0, Math.log10(this.mag));
        }
    }

    public log (base: DecimalSource): Decimal {
        base = Decimal.fromValue_noAlloc(base);
        if (this.sign <= 0) {
            return Decimal.dNaN;
        }
        if (base.sign <= 0) {
            return Decimal.dNaN;
        }
        if (base.sign === 1 && base.layer === 0 && base.mag === 1) {
            return Decimal.dNaN;
        } else if (this.layer === 0 && base.layer === 0) {
            return Decimal.fromComponents(this.sign, 0, Math.log(this.mag) / Math.log(base.mag));
        }

        return Decimal.div(this.log10(), base.log10());
    }

    public log2 (): Decimal {
        if (this.sign <= 0) {
            return Decimal.dNaN;
        } else if (this.layer === 0) {
            return Decimal.fromComponents(this.sign, 0, Math.log2(this.mag));
        } else if (this.layer === 1) {
            return Decimal.fromComponents(Math.sign(this.mag), 0, Math.abs(this.mag) * 3.321928094887362); // log2(10)
        } else if (this.layer === 2) {
            return Decimal.fromComponents(Math.sign(this.mag), 1, Math.abs(this.mag) + 0.5213902276543247); // -log10(log10(2))
        } else {
            return Decimal.fromComponents(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
        }
    }

    public ln (): Decimal {
        if (this.sign <= 0) {
            return Decimal.dNaN;
        } else if (this.layer === 0) {
            return Decimal.fromComponents(this.sign, 0, Math.log(this.mag));
        } else if (this.layer === 1) {
            return Decimal.fromComponents(Math.sign(this.mag), 0, Math.abs(this.mag) * 2.302585092994046); // ln(10)
        } else if (this.layer === 2) {
            return Decimal.fromComponents(Math.sign(this.mag), 1, Math.abs(this.mag) + 0.36221568869946325); // log10(log10(e))
        } else {
            return Decimal.fromComponents(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
        }
    }

    public logarithm (base: DecimalSource): Decimal {
        return this.log(base);
    }

    public pow (value: DecimalSource): Decimal {
        const decimal = Decimal.fromValue_noAlloc(value);
        const a = this;
        const b = decimal;

        // special case: if a is 0, then return 0 (UNLESS b is 0, then return 1)
        if (a.sign === 0) {
            return b.eq(0) ? Decimal.fromComponents_noNormalize(1, 0, 1) : a;
        }
        // special case: if a is 1, then return 1
        if (a.sign === 1 && a.layer === 0 && a.mag === 1) {
            return a;
        }
        // special case: if b is 0, then return 1
        if (b.sign === 0) {
            return Decimal.fromComponents_noNormalize(1, 0, 1);
        }
        // special case: if b is 1, then return a
        if (b.sign === 1 && b.layer === 0 && b.mag === 1) {
            return a;
        }

        const result = a.absLog10().mul(b).pow10();

        if (this.sign === -1) {
            if (Math.abs(b.toNumber() % 2) % 2 === 1) {
                return result.neg();
            } else if (Math.abs(b.toNumber() % 2) % 2 === 0) {
                return result;
            }
            return Decimal.dNaN;
        }

        return result;
    }

    public pow10 (): Decimal {
    /*
    There are four cases we need to consider:
    1) positive sign, positive mag (e15, ee15): +1 layer (e.g. 10^15 becomes e15, 10^e15 becomes ee15)
    2) negative sign, positive mag (-e15, -ee15): +1 layer but sign and mag sign are flipped (e.g. 10^-15 becomes e-15, 10^-e15 becomes ee-15)
    3) positive sign, negative mag (e-15, ee-15): layer 0 case would have been handled in the Math.pow check, so just return 1
    4) negative sign, negative mag (-e-15, -ee-15): layer 0 case would have been handled in the Math.pow check, so just return 1
    */

        if (!Number.isFinite(this.layer) || !Number.isFinite(this.mag)) {
            return Decimal.dNaN;
        }

        let a: Decimal = this;

        // handle layer 0 case - if no precision is lost just use Math.pow, else promote one layer
        if (a.layer === 0) {
            const newmag = Math.pow(10, a.sign * a.mag);
            if (Number.isFinite(newmag) && Math.abs(newmag) >= 0.1) {
                return Decimal.fromComponents(1, 0, newmag);
            } else if (a.sign === 0) {
                return Decimal.dOne;
            } else {
                a = Decimal.fromComponents_noNormalize(a.sign, a.layer + 1, Math.log10(a.mag));
            }
        }

        // handle all 4 layer 1+ cases individually
        if (a.sign > 0 && a.mag >= 0) {
            return Decimal.fromComponents(a.sign, a.layer + 1, a.mag);
        }
        if (a.sign < 0 && a.mag >= 0) {
            return Decimal.fromComponents(-a.sign, a.layer + 1, -a.mag);
        }
        // both the negative mag cases are identical: one +/- rounding error
        return Decimal.dOne;
    }

    public pow_base (value: DecimalSource): Decimal {
        return Decimal.fromValue_noAlloc(value).pow(this);
    }

    public root (value: DecimalSource): Decimal {
        const decimal = Decimal.fromValue_noAlloc(value);
        return this.pow(decimal.recip());
    }

    public factorial (): Decimal {
        if (this.mag < 0) {
            return this.add(1).gamma();
        } else if (this.layer === 0) {
            return this.add(1).gamma();
        } else if (this.layer === 1) {
            return Decimal.exp(Decimal.mul(this, Decimal.ln(this).sub(1)));
        } else {
            return Decimal.exp(this);
        }
    }

    // from HyperCalc source code
    public gamma (): Decimal {
        if (this.mag < 0) {
            return this.recip();
        } else if (this.layer === 0) {
            if (this.lt(Decimal.fromComponents_noNormalize(1, 0, 24))) {
                return Decimal.fromNumber(f_gamma(this.sign * this.mag));
            }

            const t = this.mag - 1;
            let l = 0.9189385332046727; // 0.5*Math.log(2*Math.PI)
            l = l + (t + 0.5) * Math.log(t);
            l = l - t;
            const n2 = t * t;
            let np = t;
            let lm = 12 * np;
            let adj = 1 / lm;
            let l2 = l + adj;
            if (l2 === l) {
                return Decimal.exp(l);
            }

            l = l2;
            np = np * n2;
            lm = 360 * np;
            adj = 1 / lm;
            l2 = l - adj;
            if (l2 === l) {
                return Decimal.exp(l);
            }

            l = l2;
            np = np * n2;
            lm = 1260 * np;
            let lt = 1 / lm;
            l = l + lt;
            np = np * n2;
            lm = 1680 * np;
            lt = 1 / lm;
            l = l - lt;
            return Decimal.exp(l);
        } else if (this.layer === 1) {
            return Decimal.exp(Decimal.mul(this, Decimal.ln(this).sub(1)));
        } else {
            return Decimal.exp(this);
        }
    }

    public lngamma (): Decimal {
        return this.gamma().ln();
    }

    public exp (): Decimal {
        if (this.mag < 0) {
            return Decimal.dOne;
        }
        if (this.layer === 0 && this.mag <= 709.7) {
            return Decimal.fromNumber(Math.exp(this.sign * this.mag));
        } else if (this.layer === 0) {
            return Decimal.fromComponents(1, 1, this.sign * Math.log10(Math.E) * this.mag);
        } else if (this.layer === 1) {
            return Decimal.fromComponents(1, 2, this.sign * (Math.log10(0.4342944819032518) + this.mag));
        } else {
            return Decimal.fromComponents(1, this.layer + 1, this.sign * this.mag);
        }
    }

    public sqr (): Decimal {
        return this.pow(2);
    }

    public sqrt (): Decimal {
        if (this.layer === 0) {
            return Decimal.fromNumber(Math.sqrt(this.sign * this.mag));
        } else if (this.layer === 1) {
            return Decimal.fromComponents(1, 2, Math.log10(this.mag) - 0.3010299956639812);
        } else {
            const result = Decimal.div(Decimal.fromComponents_noNormalize(this.sign, this.layer - 1, this.mag), Decimal.fromComponents_noNormalize(1, 0, 2));
            result.layer += 1;
            result.normalize();
            return result;
        }
    }

    public cube (): Decimal {
        return this.pow(3);
    }

    public cbrt (): Decimal {
        return this.pow(1 / 3);
    }

    // Tetration/tetrate: The result of exponentiating 'this' to 'this' 'height' times in a row.  https://en.wikipedia.org/wiki/Tetration
    // If payload != 1, then this is 'iterated exponentiation', the result of exping (payload) to base (this) (height) times. https://andydude.github.io/tetration/archives/tetration2/ident.html
    // Works with negative and positive real heights.
    public tetrate (height = 2, payload: DecimalSource = Decimal.fromComponents_noNormalize(1, 0, 1), linear = false): Decimal {
    // x^^1 == x
        if (height === 1) {
            return Decimal.pow(this, payload);
        }
        // x^^0 == 1
        if (height === 0) {
            return new Decimal(payload);
        }
        // 1^^x == 1
        if (this.eq(Decimal.dOne)) {
            return Decimal.dOne;
        }
        // -1^^x == -1
        if (this.eq(-1)) {
            return Decimal.pow(this, payload);
        }

        if (height === Number.POSITIVE_INFINITY) {
            const this_num = this.toNumber();
            // within the convergence range?
            if (this_num <= 1.44466786100976613366 && this_num >= 0.06598803584531253708) {
                // hotfix for the very edge of the number range not being handled properly
                if (this_num > 1.444667861009099) {
                    return Decimal.fromNumber(Math.E);
                }
                // Formula for infinite height power tower.
                const negln = Decimal.ln(this).neg();
                return negln.lambertw().div(negln);
            } else if (this_num > 1.44466786100976613366) {
                // explodes to infinity
                // TODO: replace this with Decimal.dInf
                return Decimal.fromNumber(Number.POSITIVE_INFINITY);
            } else {
                // 0.06598803584531253708 > this_num >= 0: never converges
                // this_num < 0: quickly becomes a complex number
                return Decimal.dNaN;
            }
        }

        // 0^^x oscillates if we define 0^0 == 1 (which in javascript land we do), since then 0^^1 is 0, 0^^2 is 1, 0^^3 is 0, etc. payload is ignored
        // using the linear approximation for height (TODO: don't know a better way to calculate it ATM, but it wouldn't surprise me if it's just NaN)
        if (this.eq(Decimal.dZero)) {
            let result = Math.abs((height + 1) % 2);
            if (result > 1) {
                result = 2 - result;
            }
            return Decimal.fromNumber(result);
        }

        if (height < 0) {
            return Decimal.iteratedlog(payload, this, -height, linear);
        }

        payload = Decimal.fromValue_noAlloc(payload);
        const oldheight = height;
        height = Math.trunc(height);
        const fracheight = oldheight - height;

        if (this.gt(Decimal.dZero) && this.lte(1.44466786100976613366) && (oldheight > 10000 || !linear)) {
            // similar to 0^^n, flip-flops between two values, converging slowly (or if it's below 0.06598803584531253708, never. so once again, the fractional part at the end will be a linear approximation (TODO: again pending knowledge of how to approximate better, although tbh I think it should in reality just be NaN)
            height = Math.min(10000, height);
            for (let i = 0; i < height; ++i) {
                const old_payload: Decimal = payload;
                payload = this.pow(payload);
                // stop early if we converge
                if (old_payload.eq(payload)) {
                    return payload;
                }
            }
            if (fracheight != 0 || oldheight > 10000) {
                const next_payload = this.pow(payload);
                if (oldheight <= 10000 || Math.ceil(oldheight) % 2 == 0) {
                    return payload.mul(1 - fracheight).add(next_payload.mul(fracheight));
                }
                else {
                    return payload.mul(fracheight).add(next_payload.mul(1 - fracheight));
                }
            }
            return payload;
        }
        // TODO: base < 0, but it's hard for me to reason about (probably all non-integer heights are NaN automatically?)

        if (fracheight !== 0) {
            if (payload.eq(Decimal.dOne)) {
                // If (linear), use linear approximation even for bases <= 10
                // TODO: for bases above 10, revert to old linear approximation until I can think of something better
                if (this.gt(10) || linear) {
                    payload = this.pow(fracheight);
                } else {
                    payload = Decimal.fromNumber(Decimal.tetrate_critical(this.toNumber(), fracheight));
                    // TODO: until the critical section grid can handle numbers below 2, scale them to the base
                    // TODO: maybe once the critical section grid has very large bases, this math can be appropriate for them too? I'll think about it
                    if (this.lt(2)) {
                        payload = payload.sub(1).mul(this.minus(1)).plus(1);
                    }
                }
            } else {
                if (this.eq(10)) {
                    payload = payload.layeradd10(fracheight, linear);
                } else {
                    payload = payload.layeradd(fracheight, this, linear);
                }
            }
        }

        for (let i = 0; i < height; ++i) {
            payload = this.pow(payload);
            // bail if we're NaN
            if (!isFinite(payload.layer) || !isFinite(payload.mag)) {
                return payload.normalize();
            }
            // shortcut
            if (payload.layer - this.layer > 3) {
                return Decimal.fromComponents_noNormalize(payload.sign, payload.layer + (height - i - 1), payload.mag);
            }
            // give up after 10000 iterations if nothing is happening
            if (i > 10000) {
                return payload;
            }
        }
        return payload;
    }

    // iteratedexp/iterated exponentiation: - all cases handled in tetrate, so just call it
    public iteratedexp (height = 2, payload = Decimal.fromComponents_noNormalize(1, 0, 1), linear = false): Decimal {
        return this.tetrate(height, payload, linear);
    }

    // iterated log/repeated log: The result of applying log(base) 'times' times in a row. Approximately equal to subtracting (times) from the number's slog representation. Equivalent to tetrating to a negative height.
    // Works with negative and positive real heights.
    public iteratedlog (base: DecimalSource = 10, times = 1, linear = false): Decimal {
        if (times < 0) {
            return Decimal.tetrate(base, -times, this, linear);
        }

        base = Decimal.fromValue_noAlloc(base);
        let result = Decimal.fromDecimal(this);
        const fulltimes = times;
        times = Math.trunc(times);
        const fraction = fulltimes - times;
        if (result.layer - base.layer > 3) {
            const layerloss = Math.min(times, result.layer - base.layer - 3);
            times -= layerloss;
            result.layer -= layerloss;
        }

        for (let i = 0; i < times; ++i) {
            result = result.log(base);
            // bail if we're NaN
            if (!isFinite(result.layer) || !isFinite(result.mag)) {
                return result.normalize();
            }
            // give up after 10000 iterations if nothing is happening
            if (i > 10000) {
                return result;
            }
        }

        // handle fractional part
        if (fraction > 0 && fraction < 1) {
            if (base.eq(10)) {
                result = result.layeradd10(-fraction, linear);
            } else {
                result = result.layeradd(-fraction, base, linear);
            }
        }

        return result;
    }

    // Super-logarithm, one of tetration's inverses, tells you what size power tower you'd have to tetrate base to to get number. By definition, will never be higher than 1.8e308 in break_eternity.js, since a power tower 1.8e308 numbers tall is the largest representable number.
    // https://en.wikipedia.org/wiki/Super-logarithm
    // NEW: Accept a number of iterations, and use binary search to, after making an initial guess, hone in on the true value, assuming tetration as the ground truth.
    public slog (base: DecimalSource = 10, iterations = 100, linear = false): Decimal {
        let step_size = 0.001;
        let has_changed_directions_once = false;
        let previously_rose = false;
        let result = this.slog_internal(base, linear).toNumber();
        for (let i = 1; i < iterations; ++i)
        {
            const new_decimal = new Decimal(base).tetrate(result, Decimal.dOne, linear);
            const currently_rose = new_decimal.gt(this);
            if (i > 1)
            {
                if (previously_rose != currently_rose)
                {
                    has_changed_directions_once = true;
                }
            }
            previously_rose = currently_rose;
            if (has_changed_directions_once)
            {
                step_size /= 2;
            }
            else
            {
                step_size *= 2;
            }
            step_size = Math.abs(step_size) * (currently_rose ? -1 : 1);
            result += step_size;
            if (step_size === 0) { break; }
        }
        return Decimal.fromNumber(result);
    }

    public slog_internal (base: DecimalSource = 10, linear = false): Decimal {
        base = Decimal.fromValue_noAlloc(base);

        // special cases:
        // slog base 0 or lower is NaN
        if (base.lte(Decimal.dZero)) {
            return Decimal.dNaN;
        }
        // slog base 1 is NaN
        if (base.eq(Decimal.dOne)) {
            return Decimal.dNaN;
        }
        // need to handle these small, wobbling bases specially
        if (base.lt(Decimal.dOne)) {
            if (this.eq(Decimal.dOne)) {
                return Decimal.dZero;
            }
            if (this.eq(Decimal.dZero)) {
                return Decimal.dNegOne;
            }
            // 0 < this < 1: ambiguous (happens multiple times)
            // this < 0: impossible (as far as I can tell)
            // this > 1: partially complex (http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html base 0.25 for proof)
            return Decimal.dNaN;
        }
        // slog_n(0) is -1
        if (this.mag < 0 || this.eq(Decimal.dZero)) {
            return Decimal.dNegOne;
        }

        let result = 0;
        let copy = Decimal.fromDecimal(this);
        if (copy.layer - base.layer > 3) {
            const layerloss = copy.layer - base.layer - 3;
            result += layerloss;
            copy.layer -= layerloss;
        }

        for (let i = 0; i < 100; ++i) {
            if (copy.lt(Decimal.dZero)) {
                copy = Decimal.pow(base, copy);
                result -= 1;
            } else if (copy.lte(Decimal.dOne)) {
                if (linear) return Decimal.fromNumber(result + copy.toNumber() - 1);
                else return Decimal.fromNumber(result + Decimal.slog_critical(base.toNumber(), copy.toNumber()));
            } else {
                result += 1;
                copy = Decimal.log(copy, base);
            }
        }
        return Decimal.fromNumber(result);
    }

    // background info and tables of values for critical functions taken here: https://github.com/Patashu/break_eternity.js/issues/22
    public static slog_critical (base: number, height: number): number {
    // TODO: for bases above 10, revert to old linear approximation until I can think of something better
        if (base > 10) {
            return height - 1;
        }
        return Decimal.critical_section(base, height, critical_slog_values);
    }

    public static tetrate_critical (base: number, height: number): number {
        return Decimal.critical_section(base, height, critical_tetr_values);
    }

    public static critical_section (base: number, height: number, grid: number[][], linear = false): number {
        // this part is simple at least, since it's just 0.1 to 0.9
        height *= 10;
        if (height < 0) {
            height = 0;
        }
        if (height > 10) {
            height = 10;
        }
        // have to do this complicated song and dance since one of the critical_headers is Math.E, and in the future I'd like 1.5 as well
        if (base < 2) {
            base = 2;
        }
        if (base > 10) {
            base = 10;
        }
        let lower = 0;
        let upper = 0;
        // basically, if we're between bases, we interpolate each bases' relevant values together
        // then we interpolate based on what the fractional height is.
        // accuracy could be improved by doing a non-linear interpolation (maybe), by adding more bases and heights (definitely) but this is AFAIK the best you can get without running some pari.gp or mathematica program to calculate exact values
        // however, do note http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html can do it for arbitrary heights but not for arbitrary bases (2, e, 10 present)
        for (let i = 0; i < critical_headers.length; ++i) {
            if (critical_headers[i] == base) {
            // exact match
                lower = grid[i][Math.floor(height)];
                upper = grid[i][Math.ceil(height)];
                break;
            } else if (critical_headers[i] < base && critical_headers[i + 1] > base) {
            // interpolate between this and the next
                const basefrac =
              (base - critical_headers[i]) / (critical_headers[i + 1] - critical_headers[i]);
                lower =
              grid[i][Math.floor(height)] * (1 - basefrac) + grid[i + 1][Math.floor(height)] * basefrac;
                upper =
              grid[i][Math.ceil(height)] * (1 - basefrac) + grid[i + 1][Math.ceil(height)] * basefrac;
                break;
            }
        }
        const frac = height - Math.floor(height);
        // improvement - you get more accuracy (especially around 0.9-1.0) by doing log, then frac, then powing the result
        // (we could pre-log the lookup table, but then fractional bases would get Weird)
        // also, use old linear for slog (values 0 or less in critical section). maybe something else is better but haven't thought about what yet
        if (lower <= 0 || upper <= 0)
        {
            return lower * (1 - frac) + upper * frac;
        }
        else
        {
            return Math.pow(base, (Math.log(lower) / Math.log(base)) * (1 - frac) + (Math.log(upper) / Math.log(base)) * frac);
        }
    }

    // Function for adding/removing layers from a Decimal, even fractional layers (e.g. its slog10 representation).
    // Moved this over to use the same critical section as tetrate/slog.
    public layeradd10 (diff: DecimalSource, linear = false): Decimal {
        diff = Decimal.fromValue_noAlloc(diff).toNumber();
        const result = Decimal.fromDecimal(this);
        if (diff >= 1) {
            // bug fix: if result is very smol (mag < 0, layer > 0) turn it into 0 first
            if (result.mag < 0 && result.layer > 0) {
                result.sign = 0;
                result.mag = 0;
                result.layer = 0;
            } else if (result.sign === -1 && result.layer == 0) {
            // bug fix - for stuff like -3.layeradd10(1) we need to move the sign to the mag
                result.sign = 1;
                result.mag = -result.mag;
            }
            const layeradd = Math.trunc(diff);
            diff -= layeradd;
            result.layer += layeradd;
        }
        if (diff <= -1) {
            const layeradd = Math.trunc(diff);
            diff -= layeradd;
            result.layer += layeradd;
            if (result.layer < 0) {
                for (let i = 0; i < 100; ++i) {
                    result.layer++;
                    result.mag = Math.log10(result.mag);
                    if (!isFinite(result.mag)) {
                        // another bugfix: if we hit -Infinity mag, then we should return negative infinity, not 0. 0.layeradd10(-1) h its this
                        if (result.sign === 0) {
                            result.sign = 1;
                        }
                        // also this, for 0.layeradd10(-2)
                        if (result.layer < 0) {
                            result.layer = 0;
                        }
                        return result.normalize();
                    }
                    if (result.layer >= 0) {
                        break;
                    }
                }
            }
        }

        while (result.layer < 0) {
            result.layer++;
            result.mag = Math.log10(result.mag);
        }
        // bugfix: before we normalize: if we started with 0, we now need to manually fix a layer ourselves!
        if (result.sign === 0) {
            result.sign = 1;
            if (result.mag === 0 && result.layer >= 1) {
                result.layer -= 1;
                result.mag = 1;
            }
        }
        result.normalize();

        // layeradd10: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 10 and iterated log base 10. Also equivalent to adding a fractional amount to the number's layer in its break_eternity.js representation.
        if (diff !== 0) {
            return result.layeradd(diff, 10, linear); // safe, only calls positive height 1 payload tetration, slog and log
        }

        return result;
    }

    // layeradd: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 'base' and iterated log base 'base'.
    public layeradd (diff: number, base: DecimalSource, linear = false): Decimal {
        const slogthis = this.slog(base).toNumber();
        const slogdest = slogthis + diff;
        if (slogdest >= 0) {
            return Decimal.tetrate(base, slogdest, Decimal.dOne, linear);
        } else if (!Number.isFinite(slogdest)) {
            return Decimal.dNaN;
        } else if (slogdest >= -1) {
            return Decimal.log(Decimal.tetrate(base, slogdest + 1, Decimal.dOne, linear), base);
        } else {
            return Decimal.log(Decimal.log(Decimal.tetrate(base, slogdest + 2, Decimal.dOne, linear), base), base);
        }
    }

    // The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
    // https://en.wikipedia.org/wiki/Lambert_W_function
    // Some special values, for testing: https://en.wikipedia.org/wiki/Lambert_W_function#Special_values
    public lambertw (): Decimal {
        if (this.lt(-0.3678794411710499)) {
            throw Error("lambertw is unimplemented for results less than -1, sorry!");
        } else if (this.mag < 0) {
            return Decimal.fromNumber(f_lambertw(this.toNumber()));
        } else if (this.layer === 0) {
            return Decimal.fromNumber(f_lambertw(this.sign * this.mag));
        } else if (this.layer === 1) {
            return d_lambertw(this);
        } else if (this.layer === 2) {
            return d_lambertw(this);
        }
        if (this.layer >= 3) {
            return Decimal.fromComponents_noNormalize(this.sign, this.layer - 1, this.mag);
        }

        throw "Unhandled behavior in lambertw()";
    }

    // The super square-root function - what number, tetrated to height 2, equals this?
    // Other sroots are possible to calculate probably through guess and check methods, this one is easy though.
    // https://en.wikipedia.org/wiki/Tetration#Super-root
    public ssqrt (): Decimal {
        if (this.sign == 1 && this.layer >= 3) {
            return Decimal.fromComponents_noNormalize(this.sign, this.layer - 1, this.mag);
        }
        const lnx = this.ln();
        return lnx.div(lnx.lambertw());
    }

    // Super-root, one of tetration's inverses - what number, tetrated to height (height), equals this?
    // Only works with the linear approximation, because I don't know the structure of non-linear tetrations for inputs < 1
    // TODO: Optimize this like how slog is optimized
    public linear_sroot (degree: number) : Decimal {
    // 1st-degree super root just returns its input
        if (degree == 1) {
            return this;
        }
        if (this.eq(Decimal.dInf)) {
            return Decimal.dInf;
        }
        if (!this.isFinite()) {
            return Decimal.dNaN;
        }
        // ssqrt handles square super-root faster
        if (degree == 2) {
            try {
                // ssqrt uses lambertw which throws an error if the number is too small
                return this.ssqrt();
            }
            catch {
                return Decimal.dNaN;
            }
        }
        // Using linear approximation, x^^n = x^n if 0 < n < 1
        if (degree > 0 && degree < 1) {
            return this.root(degree);
        }
        // Using the linear approximation, there actually is a single solution for super roots with -2 < degree <= -1
        if (degree > -2 && degree < -1) {
            return Decimal.fromNumber(degree).add(2).pow(this.recip());
        }
        // Super roots with -1 <= degree < 0 have either no solution or infinitely many solutions, and tetration with height <= -2 returns NaN, so super roots of degree <= -2 don't work
        if (degree <= 0) {
            return Decimal.dNaN;
        }
        // Infinite degree super-root is x^(1/x) between 1/e <= x <= e, undefined otherwise
        if (degree == Number.POSITIVE_INFINITY) {
            const this_num = this.toNumber();
            if (this_num < Math.E && this_num > _EXPN1) {
                return this.pow(this.recip());
            }
            else {
                return Decimal.dNaN;
            }
        }
        // Special case: any super-root of 1 is 1
        if (this.eq(1)) {
            return Decimal.dOne;
        }
        // TODO: base < 0 (It'll probably be NaN anyway)
        if (this.lt(0)) {
            return Decimal.dNaN;
        }
        // Treat all numbers of layer <= -2 as zero, because they effectively are
        if (this.lte("1ee-16")) {
            if (degree % 2 == 1) return this;
            else return Decimal.dNaN;
        }
        // this > 1
        if (this.gt(1)) {
            // Uses guess-and-check to find the super-root.
            // If this > 10^^(degree), then the answer is under iteratedlog(10, degree - 1): for example, ssqrt(x) < log(x, 10) as long as x > 10^10, and linear_sroot(x, 3) < log(log(x, 10), 10) as long as x > 10^10^10
            // On the other hand, if this < 10^^(degree), then clearly the answer is less than 10
            // Since the answer could be a higher-layered number itself (whereas slog's maximum is 1.8e308), the guess-and-check is scaled to the layer of the upper bound, so the guess is set to the average of some higher-layer exponents of the bounds rather than the bounds itself (as taking plain averages on tetrational-scale numbers would go nowhere)
            let upperBound = Decimal.dTen;
            if (this.gte(Decimal.tetrate(10, degree, 1, true))) {
                upperBound = this.iteratedlog(10, degree - 1, true);
            }
            if (degree <= 1) {
                upperBound = this.root(degree);
            }
            let lower = Decimal.dZero; // This is zero rather than one because we might be on a higher layer, so the lower bound might actually some 10^10^10...^0
            const layer = upperBound.layer;
            let upper = upperBound.iteratedlog(10, layer, true);
            let previous = upper;
            let guess = upper.div(2);
            let loopGoing = true;
            while (loopGoing) {
                guess = lower.add(upper).div(2);
                if (Decimal.iteratedexp(10, layer, guess, true).tetrate(degree, 1, true).gt(this)) upper = guess;
                else lower = guess;
                if (guess.eq(previous)) loopGoing = false;
                else previous = guess;
            }
            return Decimal.iteratedexp(10, layer, guess, true);
        }
        // 0 < this < 1
        else {
            // A tetration of decimal degree can potentially have three different portions, as shown at https://www.desmos.com/calculator/ayvqks6mxa, which is a graph of x^^2.05:
            // The portion where the function is increasing, extending from a minimum (which may be at x = 0 or at some x between 0 and 1) up to infinity (I'll call this the "increasing" range)
            // The portion where the function is decreasing (I'll call this the "decreasing" range)
            // A small, steep increasing portion very close to x = 0 (I'll call this the "zero" range)
            // If ceiling(degree) is even, then the tetration will either be strictly increasing, or it will have the increasing and decreasing ranges, but not the zero range (because if ceiling(degree) is even, 0^^degree == 1).
            // If ceiling(degree) is odd, then the tetration will either be strictly increasing, or it will have all three ranges (because if ceiling(degree) is odd, 0^^degree == 0).
            // The existence of these ranges means that a super-root could potentially have two or three valid answers.
            // Out of these, we'd prefer the increasing range value if it exists, otherwise we'll take the zero range value (it can't have a decreasing range value if it doesn't have an increasing range value) if the zero range exists.
            // It's possible to identify which range that "this" is in:
            // If the tetration is decreasing at that point, the point is in the decreasing range.
            // If the tetration is increasing at that point and ceiling(degree) is even, the point is in the increasing range since there is no zero range.
            // If the tetration is increasing at that point and ceiling(degree) is odd, look at the second derivative at that point. If the second derivative is positive, the point is in the increasing range. If the second derivative is negative, the point is the zero range.
            // We need to find the local minimum (separates decreasing and increasing ranges) and the local maximum (separates zero and decreasing ranges).
            // (stage) is which stage of the loop we're in: stage 1 is finding the minimum, stage 2 means we're between the stages, and stage 3 is finding the maximum.
            // The boundary between the decreasing range and the zero range can be very small, so we want to use layer -1 numbers. Therefore, all numbers involved are log10(recip()) of their actual values.
            let stage = 1;
            let minimum = Decimal.fromComponents(1, 10, 1);
            let maximum = Decimal.fromComponents(1, 10, 1);
            let lower = Decimal.fromComponents(1, 10, 1); // eeeeeeeee-10, which is effectively 0; I would use Decimal.dInf but its reciprocal is NaN
            let upper = Decimal.fromComponents(1, 1, -16); // ~ 1 - 1e-16
            let prevspan = Decimal.dZero;
            let difference = Decimal.fromComponents(1, 10, 1);
            let upperBound = upper.pow10().recip();
            let distance = Decimal.dZero;
            let prevPoint = upperBound;
            let nextPoint = upperBound;
            const evenDegree = (Math.ceil(degree) % 2 == 0);
            let range = 0;
            let lastValid = Decimal.fromComponents(1, 10, 1);
            let infLoopDetector = false;
            let previousUpper = Decimal.dZero;
            let decreasingFound = false;
            while (stage < 4) {
                if (stage == 2) {
                    // The minimum has been found. If ceiling(degree) is even, there's no zero range and thus no local maximum, so end the loop here. Otherwise, begin finding the maximum.
                    if (evenDegree) break;
                    else {
                        lower = Decimal.fromComponents(1, 10, 1);
                        upper = minimum;
                        stage = 3;
                        difference = Decimal.fromComponents(1, 10, 1);
                        lastValid = Decimal.fromComponents(1, 10, 1);
                    }
                }
                infLoopDetector = false;
                while (upper.neq(lower)) {
                    previousUpper = upper;
                    if (upper.pow10().recip().tetrate(degree, 1, true).eq(1) && upper.pow10().recip().lt(0.4)) {
                        upperBound = upper.pow10().recip();
                        prevPoint = upper.pow10().recip();
                        nextPoint = upper.pow10().recip();
                        distance = Decimal.dZero;
                        range = -1; // This would cause problems with degree < 1 in the linear approximation... but those are already covered as a special case
                        if (stage == 3) lastValid = upper;
                    }
                    else if (upper.pow10().recip().tetrate(degree, 1, true).eq(upper.pow10().recip()) && !evenDegree && upper.pow10().recip().lt(0.4)) {
                        upperBound = upper.pow10().recip();
                        prevPoint = upper.pow10().recip();
                        nextPoint = upper.pow10().recip();
                        distance = Decimal.dZero;
                        range = 0;
                    }
                    else if (upper.pow10().recip().tetrate(degree, 1, true).eq(upper.pow10().recip().mul(2).tetrate(degree, 1, true))) {
                        // If the upper bound is closer to zero than the next point with a discernable tetration, so surely it's in whichever range is closest to zero?
                        // This won't happen in a strictly increasing tetration, as there x^^degree ~= x as x approaches zero
                        upperBound = upper.pow10().recip();
                        prevPoint = Decimal.dZero;
                        nextPoint = upperBound.mul(2);
                        distance = upperBound;
                        if (evenDegree) range = -1;
                        else range = 0;
                    }
                    else {
                        // We want to use prevspan to find the "previous point" right before the upper bound and the "next point" right after the upper bound, as that will let us approximate derivatives
                        prevspan = upper.mul(1.2e-16);
                        upperBound = upper.pow10().recip();
                        prevPoint = upper.add(prevspan).pow10().recip();
                        distance = upperBound.sub(prevPoint);
                        nextPoint = upperBound.add(distance);
                        // ...but it's of no use to us while its tetration is equal to upper's tetration, so widen the difference until it's not
                        // We add prevspan and subtract nextspan because, since upper is log10(recip(upper bound)), the upper bound gets smaller as upper gets larger and vice versa
                        while (prevPoint.tetrate(degree, 1, true).eq(upperBound.tetrate(degree, 1, true)) || nextPoint.tetrate(degree, 1, true).eq(upperBound.tetrate(degree, 1, true)) || prevPoint.gte(upperBound) || nextPoint.lte(upperBound)) {
                            prevspan = prevspan.mul(2);
                            prevPoint = upper.add(prevspan).pow10().recip();
                            distance = upperBound.sub(prevPoint);
                            nextPoint = upperBound.add(distance);
                        }
                        if (
                            stage == 1 && (nextPoint.tetrate(degree, 1, true).gt(upperBound.tetrate(degree, 1, true)) && prevPoint.tetrate(degree, 1, true).gt(upperBound.tetrate(degree, 1, true)))
              ||
              stage == 3 && (nextPoint.tetrate(degree, 1, true).lt(upperBound.tetrate(degree, 1, true)) && prevPoint.tetrate(degree, 1, true).lt(upperBound.tetrate(degree, 1, true)))
                        ) {
                            lastValid = upper;
                        }
                        if (nextPoint.tetrate(degree, 1, true).lt(upperBound.tetrate(degree, 1, true))) {
                            // Derivative is negative, so we're in decreasing range
                            range = -1;
                        }
                        else if (evenDegree) {
                            // No zero range, so we're in increasing range
                            range = 1;
                        }
                        else if (stage == 3 && upper.gt_tolerance(minimum, 1e-8)) {
                            // We're already below the minimum, so we can't be in range 1
                            range = 0;
                        }
                        else {
                            // Number imprecision has left the second derivative somewhat untrustworthy, so we need to expand the bounds to ensure it's correct
                            while (prevPoint.tetrate(degree, 1, true).eq_tolerance(upperBound.tetrate(degree, 1, true), 1e-8) || nextPoint.tetrate(degree, 1, true).eq_tolerance(upperBound.tetrate(degree, 1, true), 1e-8) || prevPoint.gte(upperBound) || nextPoint.lte(upperBound)) {
                                prevspan = prevspan.mul(2);
                                prevPoint = upper.add(prevspan).pow10().recip();
                                distance = upperBound.sub(prevPoint);
                                nextPoint = upperBound.add(distance);
                            }
                            if (nextPoint.tetrate(degree, 1, true).sub(upperBound.tetrate(degree, 1, true)).lt(upperBound.tetrate(degree, 1, true).sub(prevPoint.tetrate(degree, 1, true)))) {
                                // Second derivative is negative, so we're in zero range
                                range = 0;
                            }
                            else {
                                // By process of elimination, we're in increasing range
                                range = 1;
                            }
                        }
                    }
                    if (range == -1) decreasingFound = true;
                    if ((stage == 1 && range == 1) || (stage == 3 && range != 0)) {
                        // The upper bound is too high
                        if (lower.eq(Decimal.fromComponents(1, 10, 1))) {
                            upper = upper.mul(2);
                        }
                        else {
                            let cutOff = false;
                            if (infLoopDetector && ((range == 1 && stage == 1) || (range == -1 && stage == 3))) cutOff = true; // Avoids infinite loops from floating point imprecision
                            upper = upper.add(lower).div(2);
                            if (cutOff) break;
                        }
                    }
                    else {
                        if (lower.eq(Decimal.fromComponents(1, 10, 1))) {
                            // We've now found an actual lower bound
                            lower = upper;
                            upper = upper.div(2);
                        }
                        else {
                            // The upper bound is too low, meaning last time we decreased the upper bound, we should have gone to the other half of the new range instead
                            let cutOff = false;
                            if (infLoopDetector && ((range == 1 && stage == 1) || (range == -1 && stage == 3))) cutOff = true; // Avoids infinite loops from floating point imprecision
                            lower = lower.sub(difference);
                            upper = upper.sub(difference);
                            if (cutOff) break;
                        }
                    }
                    if (lower.sub(upper).div(2).abs().gt(difference.mul(1.5))) infLoopDetector = true;
                    difference = lower.sub(upper).div(2).abs();
                    if (upper.gt("1e18")) break;
                    if (upper.eq(previousUpper)) break; // Another infinite loop catcher
                }
                if (upper.gt("1e18")) break;
                if (!decreasingFound) break; // If there's no decreasing range, then even if an error caused lastValid to gain a value, the minimum can't exist
                if (lastValid == Decimal.fromComponents(1, 10, 1)) {
                    // Whatever we're searching for, it doesn't exist. If there's no minimum, then there's no maximum either, so either way we can end the loop here.
                    break;
                }
                if (stage == 1) minimum = lastValid;
                else if (stage == 3) maximum = lastValid;
                stage++;
            }
            // Now we have the minimum and maximum, so it's time to calculate the actual super-root.
            // First, check if the root is in the increasing range.
            lower = minimum;
            upper = Decimal.fromComponents(1, 1, -18);
            let previous = upper;
            let guess = Decimal.dZero;
            let loopGoing = true;
            while (loopGoing) {
                if (lower.eq(Decimal.fromComponents(1, 10, 1))) guess = upper.mul(2);
                else guess = lower.add(upper).div(2);
                if (Decimal.pow(10, guess).recip().tetrate(degree, 1, true).gt(this)) upper = guess;
                else lower = guess;
                if (guess.eq(previous)) loopGoing = false;
                else previous = guess;
                if (upper.gt("1e18")) return Decimal.dNaN;
            }
            // using guess.neq(minimum) led to imprecision errors, so here's a fixed version of that
            if (!(guess.eq_tolerance(minimum, 1e-15))) {
                return guess.pow10().recip();
            }
            else {
                // If guess == minimum, we haven't actually found the super-root, the algorithm just kept going down trying to find a super-root that's not in the increasing range.
                // Check if the root is in the zero range.
                if (maximum.eq(Decimal.fromComponents(1, 10, 1))) {
                    // There is no zero range, so the super root doesn't exist
                    return Decimal.dNaN;
                }
                lower = Decimal.fromComponents(1, 10, 1);
                upper = maximum;
                previous = upper;
                guess = Decimal.dZero;
                loopGoing = true;
                while (loopGoing) {
                    if (lower.eq(Decimal.fromComponents(1, 10, 1))) guess = upper.mul(2);
                    else guess = lower.add(upper).div(2);
                    if (Decimal.pow(10, guess).recip().tetrate(degree, 1, true).gt(this)) upper = guess;
                    else lower = guess;
                    if (guess.eq(previous)) loopGoing = false;
                    else previous = guess;
                    if (upper.gt("1e18")) return Decimal.dNaN;
                }
                return guess.pow10().recip();
            }
        }
    }

    // Pentation/pentate: The result of tetrating 'height' times in a row. An absurdly strong operator - Decimal.pentate(2, 4.28) and Decimal.pentate(10, 2.37) are already too huge for break_eternity.js!
    // https://en.wikipedia.org/wiki/Pentation
    public pentate (height = 2, payload: DecimalSource = Decimal.fromComponents_noNormalize(1, 0, 1), linear = false): Decimal {
        payload = Decimal.fromValue_noAlloc(payload);
        const oldheight = height;
        height = Math.trunc(height);
        const fracheight = oldheight - height;

        // I have no idea if this is a meaningful approximation for pentation to continuous heights, but it is monotonic and continuous.
        if (fracheight !== 0) {
            if (payload.eq(Decimal.dOne)) {
                ++height;
                payload = Decimal.fromNumber(fracheight);
            } else {
                if (this.eq(10)) {
                    payload = payload.layeradd10(fracheight, linear);
                } else {
                    payload = payload.layeradd(fracheight, this, linear);
                }
            }
        }

        for (let i = 0; i < height; ++i) {
            payload = this.tetrate(payload.toNumber(), Decimal.dOne, linear);
            // bail if we're NaN
            if (!isFinite(payload.layer) || !isFinite(payload.mag)) {
                return payload.normalize();
            }
            // give up after 10 iterations if nothing is happening
            if (i > 10) {
                return payload;
            }
        }

        return payload;
    }

    // trig functions!
    public sin (): this | Decimal {
        if (this.mag < 0) {
            return this;
        }
        if (this.layer === 0) {
            return Decimal.fromNumber(Math.sin(this.sign * this.mag));
        }
        return Decimal.fromComponents_noNormalize(0, 0, 0);
    }

    public cos (): Decimal {
        if (this.mag < 0) {
            return Decimal.dOne;
        }
        if (this.layer === 0) {
            return Decimal.fromNumber(Math.cos(this.sign * this.mag));
        }
        return Decimal.fromComponents_noNormalize(0, 0, 0);
    }

    public tan (): this | Decimal {
        if (this.mag < 0) {
            return this;
        }
        if (this.layer === 0) {
            return Decimal.fromNumber(Math.tan(this.sign * this.mag));
        }
        return Decimal.fromComponents_noNormalize(0, 0, 0);
    }

    public asin (): this | Decimal {
        if (this.mag < 0) {
            return this;
        }
        if (this.layer === 0) {
            return Decimal.fromNumber(Math.asin(this.sign * this.mag));
        }
        return Decimal.fromComponents_noNormalize(Number.NaN, Number.NaN, Number.NaN);
    }

    public acos (): Decimal {
        if (this.mag < 0) {
            return Decimal.fromNumber(Math.acos(this.toNumber()));
        }
        if (this.layer === 0) {
            return Decimal.fromNumber(Math.acos(this.sign * this.mag));
        }
        return Decimal.fromComponents_noNormalize(Number.NaN, Number.NaN, Number.NaN);
    }

    public atan (): this | Decimal {
        if (this.mag < 0) {
            return this;
        }
        if (this.layer === 0) {
            return Decimal.fromNumber(Math.atan(this.sign * this.mag));
        }
        return Decimal.fromNumber(Math.atan(this.sign * 1.8e308));
    }

    public sinh (): Decimal {
        return this.exp().sub(this.negate().exp()).div(2);
    }

    public cosh (): Decimal {
        return this.exp().add(this.negate().exp()).div(2);
    }

    public tanh (): Decimal {
        return this.sinh().div(this.cosh());
    }

    public asinh (): Decimal {
        return Decimal.ln(this.add(this.sqr().add(1).sqrt()));
    }

    public acosh (): Decimal {
        return Decimal.ln(this.add(this.sqr().sub(1).sqrt()));
    }

    public atanh (): Decimal {
        if (this.abs().gte(1)) {
            return Decimal.fromComponents_noNormalize(Number.NaN, Number.NaN, Number.NaN);
        }

        return Decimal.ln(this.add(1).div(Decimal.fromNumber(1).sub(this))).div(2);
    }

    /**
     * Joke function from Realm Grinder
     */
    public ascensionPenalty (ascensions: DecimalSource): Decimal {
        if (ascensions === 0) {
            return this;
        }

        return this.root(Decimal.pow(10, ascensions));
    }

    /**
     * Joke function from Cookie Clicker. It's 'egg'
     */
    public egg (): Decimal {
        return this.add(9);
    }

    public lessThanOrEqualTo (other: DecimalSource): boolean {
        return this.cmp(other) < 1;
    }

    public lessThan (other: DecimalSource): boolean {
        return this.cmp(other) < 0;
    }

    public greaterThanOrEqualTo (other: DecimalSource): boolean {
        return this.cmp(other) > -1;
    }

    public greaterThan (other: DecimalSource): boolean {
        return this.cmp(other) > 0;
    }

    // return Decimal;

    /* BEGIN MOD */

    /**
     * Smoothly interpolates between the current value and the target value over time
     * using a smoothing factor and deltaTime.
     *
     * @param {Decimal} current - The current value to interpolate from.
     * @param {Decimal} target - The target value to interpolate towards.
     * @param {Decimal} smoothing - The smoothing factor controlling the interpolation speed.
     *                           A higher value results in slower interpolation.
     * @param {Decimal} deltaTime - The time elapsed since the last frame in seconds.
     * @returns {Decimal} - The interpolated value between `current` and `target`.
     */
    public static smoothDamp (current: DecimalSource, target: DecimalSource, smoothing: DecimalSource, deltaTime: DecimalSource): Decimal { return new Decimal(current).add(new Decimal(target).minus(new Decimal(current)).times(new Decimal(smoothing)).times(new Decimal(deltaTime))); };

    /**
     * Creates a clone of the E instance.
     * @deprecated
     * @returns {Decimal} A EClone instance that is a clone of the original.
     */
    public clone (): Decimal {
        return this;
    }

    /**
     * Creates a clone of the E instance. Helps with a webpack(?) bug
     * @alias Decimal.normalizeFromComponents
     * @param x - The number to clone
     * @returns - The cloned number
     */
    public static clone (x: Decimal): Decimal {
        return Decimal.fromComponents(x.sign, x.layer, x.mag);
    }

    /**
     * Performs modular arithmetic on the DecimalClone instance.
     * @alias modular
     * @alias modulo
     * @param {DecimalSource} other - The number or DecimalClone instance to use for modular arithmetic.
     * @returns {Decimal} A EClone instance representing the result of the modular operation.
     */
    // Taken from OmegaNum.js, with a couple touch-ups
    // "Truncated division" modulo, like JavaScript's %
    public mod (value: DecimalSource): Decimal {
        const decimal = Decimal.fromValue_noAlloc(value).abs();

        if (decimal.eq(Decimal.dZero)) return Decimal.dZero;
        const num_this = this.toNumber();
        const num_decimal = decimal.toNumber();
        // Special case: To avoid precision issues, if both numbers are valid JS numbers, just call % on those
        if (isFinite(num_this) && isFinite(num_decimal) && num_this != 0 && num_decimal != 0) {
            return new Decimal(num_this % num_decimal);
        }
        if (this.sub(decimal).eq(this)) {
            // decimal is too small to register to this
            return Decimal.dZero;
        }
        if (decimal.sub(this).eq(decimal)) {
            // this is too small to register to decimal
            return this;
        }
        if (this.sign == -1) return this.abs().mod(decimal).neg();
        return this.sub(this.div(decimal).floor().mul(decimal));
    }

    public modulo (value: DecimalSource) : Decimal {
        return this.mod(value);
    }

    public modular (value: DecimalSource) : Decimal {
        return this.mod(value);
    }

    /**
    * Applies a soft cap to a DecimalClone value using a specified soft cap function.
    *
    * @param {DecimalSource} start - The value at which the soft cap starts.
    * @param {number} power - The power or factor used in the soft cap calculation.
    * @param {string} mode - The soft cap mode. Use "pow" for power soft cap, "mul" for multiplication soft cap,
    *                       or "exp" for exponential soft cap.
    * @returns {Decimal} - The DecimalClone value after applying the soft cap.
    */
    public softcap (start: DecimalSource, power: number, mode: string): Decimal {
        let x = this.clone();
        if (x.gte(start)) {
            if ([0, "pow"].includes(mode)) x = x.div(start).pow(power).mul(start);
            if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start);
            // if ([2, "exp"].includes(mode)) x = expMult(x.div(start), power).mul(start);
        }
        return x;
    }
    public static softcap (value: DecimalSource, start: DecimalSource, power: number, mode: string): Decimal {
        return new Decimal(value).softcap(start, power, mode);
    }

    /**
    * Scales a currency value using a specified scaling function.
    *
    * @param {DecimalSource} s - The value at which scaling starts.
    * @param {DecimalSource} p - The scaling factor.
    * @param {string} mode - The scaling mode. Use "pow" for power scaling or "exp" for exponential scaling.
    * @param {boolean} [rev=false] - Whether to reverse the scaling operation (unscaling).
    * @returns {Decimal} - The scaled currency value.
    */
    public scale (s: DecimalSource, p: DecimalSource, mode: string | number, rev: boolean = false): Decimal {
        s = new Decimal(s);
        p = new Decimal(p);
        let x = this.clone();
        if (x.gte(s)) {
            if ([0, "pow"].includes(mode)) x = rev ? 
                x.mul(s.pow(p.sub(1))).root(p) : // (x * s^(p - 1))^(1 / p)
                x.pow(p).div(s.pow(p.sub(1))); // x^p / s^(p - 1)
            if ([1, "exp"].includes(mode)) x = rev ? 
                x.div(s).max(1).log(p).add(s) : // log_p((x / s).max(1)) + s
                Decimal.pow(p, x.sub(s)).mul(s); // p^(x - s) * s
        }
        return x;
    }
    public static scale (value: DecimalSource, s: DecimalSource, p: DecimalSource, mode: string | number, rev: boolean = false): Decimal {
        return new Decimal(value).scale(s, p, mode, rev);
    }

    /**
     * Formats the E instance with a specified accuracy and maximum decimal places.
     * @param {number} [acc=2] - The desired accuracy (number of significant figures), defaults to `2`.
     * @param {number} [max=9] - The maximum number of decimal places to display, defaults to `9`.
     * @param {string} [type="mixed_sc"] - The type of format, defaults to `"mixed_sc"`.
     * @returns {string} A string representing the formatted E value.
     */
    public format (acc: number = 2, max: number = 9, type: FormatType = "mixed_sc"): string { return formats.format(this.clone(), acc, max, type); }
    /**
     * Formats the E instance with a specified accuracy and maximum decimal places.
     * @param {DecimalSource} e - The E instance to format.
     * @param {number} [acc=2] - The desired accuracy (number of significant figures), defaults to `2`.
     * @param {number} [max=9] - The maximum number of decimal places to display, defaults to `9`.
     * @param {string} [type="mixed_sc"] - The type of format, defaults to `"mixed_sc"`.
     * @returns {string} A string representing the formatted E value.
     */
    public static format (e: DecimalSource, acc: number = 2, max: number = 9, type: FormatType = "mixed_sc"): string { return formats.format(new Decimal(e), acc, max, type); }

    /**
     * Formats the E instance in standard leter notation with a specified accuracy and maximum decimal places.
     * @param {number} [acc=2] - The desired accuracy (number of significant figures).
     * @param {number} [max=9] - The maximum number of decimal places to display.
     * @param {string} [type="st"] - The type of format (default standard)
     * @returns {string} A string representing the formatted E value.
     */
    public formatST (acc: number = 2, max: number = 9, type: FormatType = "st"): string { return formats.format(this.clone(), acc, max, type); }
    public static formatST (value: DecimalSource, acc: number = 2, max: number = 9, type: FormatType = "st"): string { return formats.format(new Decimal(value), acc, max, type); }

    /**
     * Formats the gain rate using the E instance.
     * @param {DecimalSource} gain - The gain value to compare
     * @param {boolean} [mass=false] - Indicates whether the gain represents a mass value.
     * @param {string} [type="mixed_sc"] - The type of format (default mixed scientific)
     * @returns {string} A string representing the formatted gain
     *
     * @example
     * const currency = new Decimal(100);
     * const currencyGain = new Decimal(12);
     * const formatted = currency.formats.formatGain(currencyGain);
     * console.log(formatted); // should return "(+12/sec)"
     */
    public formatGain (gain: DecimalSource, type: FormatType = "mixed_sc"): string { return formats.formatGain(this.clone(), gain, type); }
    public static formatGain (value: DecimalSource, gain: DecimalSource, type: FormatType = "mixed_sc"): string { return formats.formatGain(new Decimal(value), gain, type); }

    /**
     * Converts the E instance to a Roman numeral representation.
     * @param {number|Decimal} [max=5000] - Max before it returns the original
     * @returns {string|Decimal} A string representing the Roman numeral equivalent of the E value,
     * or the original E instance if it is greater than or equal to 5000 or less than 1.
     */
    public toRoman (max: DecimalSource = 5000): string | Decimal {
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
            I: 1
        };
        let str = '';
        
        for (let i of Object.keys(roman)) {
            let q = Math.floor(newNum / (roman as any)[i]);
            newNum -= q * (roman as any)[i];
            str += i.repeat(q);
        }
        
        return str;
    }
    public static toRoman (value: DecimalSource, max: DecimalSource): string | Decimal {
        return new Decimal(value).toRoman(max);
    }
}

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
        format (value: Decimal, acc: number): string {
            if (value.gt(new Decimal(118).pow(new Decimal(118).pow(new Decimal(118).pow(4))))) return "e" + FORMATS.elemental.format(value.log10(), acc);

            let log = value.log(118);
            const slog = log.log(118);
            const sslog = slog.log(118).toNumber();
            const max = Math.max(4 - sslog * 2, 1);
            const parts = [];
            while (log.gte(1) && parts.length < max) {
                const [abbreviation, value] = FORMATS.elemental.getAbbreviationAndValue(log);
                const n = log.div(value).floor();
                log = log.sub(n.mul(value));
                parts.unshift([abbreviation, n]);
            }
            if (parts.length >= max) {
                // @ts-ignore
                return parts.map((x) => FORMATS.elemental.formatElementalPart(x[0], x[1])).join(" + ");
            }
            const formattedMantissa = new Decimal(118).pow(log).toFixed(parts.length === 1 ? 3 : acc);
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
                    return (slog.gte(1e9) ? "" : new Decimal(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + FORMATS.eng.format(slog.floor(), 0);
                }
                const m = ex.div(new Decimal(1000).pow(e.div(3).floor()));
                // @ts-ignore
                return (e.log10().gte(9) ? "" : m.toFixed(new Decimal(4).sub(e.sub(e.div(3).floor().mul(3))))) + "e" + FORMATS.eng.format(e.div(3).floor().mul(3), 0);
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
            ex = new Decimal(ex);
            const e = ex.log10().floor();
            if (e.lt(303) && e.gte(max)) return format(ex, acc, max, "st");
            else return format(ex, acc, max, "sc");
        },
    },
    layer: {
        layers: ["infinity", "eternity", "reality", "equality", "affinity", "celerity", "identity", "vitality", "immunity", "atrocity"],
        format (ex: DecimalSource, acc: number, max: number): string {
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
    inf: {
        format (ex: DecimalSource, acc: number, max: number): string {
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
    case "scientific":
        if (ex.log10().lt(Math.min(-acc, 0)) && acc > 1) {
            const e = ex.log10().ceil();
            const m = ex.div(e.eq(-1) ? new Decimal(0.1) : new Decimal(10).pow(e));
            const be = e.mul(-1).max(1).log10().gte(9);
            return neg + (be ? "" : m.toFixed(2)) + "e" + format(e, 0, max, "mixed_sc");
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
            return neg + (ee.gte(10) ? "" : (m.toFixed(new Decimal(2).sub(e.sub(e3_mul)).add(1).toNumber())) + " ") + final;
        }
    }
    default:
        // Other formats
        return neg + FORMATS[type].format(ex, acc, max);
    }
}

/**
 * Format the gain
 * @param amt - The amount
 * @param gain - The gain
 * @returns - The formatted gain
 * @example
 * console.log(formatGain(1e20, 1e10)); // (+1.00e10/sec)
 * console.log(formatGain(1e200, 1e210)); // (+10.00 OoMs/sec)
 */
function formatGain (amt: DecimalSource, gain: DecimalSource, type: FormatType = "mixed_sc"): string {
    amt = new Decimal(amt);
    gain = new Decimal(gain);
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
    const formatFn = (ex: DecimalSource) => format(ex, acc, max, type);
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
function metric (num: DecimalSource, type: 0 | 1 | 2 | 3): string {
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
                value: Decimal.pow(1000, new Decimal(i).add(1))
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

// Test
/*
const testA = new Decimal(Math.random()).mul("1e" + Math.floor(Math.random() * 1e6));
console.log(testA);
const testB = new Decimal(Math.random()).mul("1e" + Math.floor(Math.random() * 1e6));
console.log(testB);

const testFormats = {
    toString: (x: DecimalSource) => new Decimal(x).toString(),
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
    expMult: [expMult],
};

console.table(Object.keys(testFormats).map((x) => {
    let value;
    try {
        if (Array.isArray((testFormats as any)[x])) {
            value = (testFormats as any)[x][0](testA, testB);
        } else {
            value = (testFormats as any)[x](testA);
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

export { formats, FORMATS, ST_NAMES, FormatType, FormatTypeList };

Decimal.formats = formats;

// export default Decimal;

export { Decimal };

// return Decimal;