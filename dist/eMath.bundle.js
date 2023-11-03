"use strict";
(() => {
  // src/E/lru-cache.ts
  var LRUCache = class {
    /**
    * @param maxSize The maximum size for this cache. We recommend setting this
    * to be one less than a power of 2, as most hashtables - including V8's
    * Object hashtable (https://crsrc.org/c/v8/src/objects/ordered-hash-table.cc)
    * - uses powers of two for hashtable sizes. It can't exactly be a power of
    * two, as a .set() call could temporarily set the size of the map to be
    * maxSize + 1.
    */
    constructor(maxSize) {
      this.map = /* @__PURE__ */ new Map();
      // Invariant: Exactly one of the below is true before and after calling a
      // LRUCache method:
      // - first and last are both undefined, and map.size() is 0.
      // - first and last are the same object, and map.size() is 1.
      // - first and last are different objects, and map.size() is greater than 1.
      this.first = void 0;
      this.last = void 0;
      this.maxSize = maxSize;
    }
    get size() {
      return this.map.size;
    }
    /**
    * Gets the specified key from the cache, or undefined if it is not in the
    * cache.
    * @param key The key to get.
    * @returns The cached value, or undefined if key is not in the cache.
    */
    get(key) {
      const node = this.map.get(key);
      if (node === void 0) {
        return void 0;
      }
      if (node !== this.first) {
        if (node === this.last) {
          this.last = node.prev;
          this.last.next = void 0;
        } else {
          node.prev.next = node.next;
          node.next.prev = node.prev;
        }
        node.next = this.first;
        this.first.prev = node;
        this.first = node;
      }
      return node.value;
    }
    /**
    * Sets an entry in the cache.
    *
    * @param key The key of the entry.
    * @param value The value of the entry.
    * @throws Error, if the map already contains the key.
    */
    set(key, value) {
      if (this.maxSize < 1) {
        return;
      }
      if (this.map.has(key)) {
        throw new Error("Cannot update existing keys in the cache");
      }
      const node = new ListNode(key, value);
      if (this.first === void 0) {
        this.first = node;
        this.last = node;
      } else {
        node.next = this.first;
        this.first.prev = node;
        this.first = node;
      }
      this.map.set(key, node);
      while (this.map.size > this.maxSize) {
        const last = this.last;
        this.map.delete(last.key);
        this.last = last.prev;
        this.last.next = void 0;
      }
    }
  };
  var ListNode = class {
    constructor(key, value) {
      this.next = void 0;
      this.prev = void 0;
      this.key = key;
      this.value = value;
    }
  };

  // src/E/e.ts
  var MAX_SIGNIFICANT_DIGITS = 17;
  var EXP_LIMIT = 9e15;
  var LAYER_DOWN = Math.log10(9e15);
  var FIRST_NEG_LAYER = 1 / 9e15;
  var NUMBER_EXP_MAX = 308;
  var NUMBER_EXP_MIN = -324;
  var MAX_ES_IN_A_ROW = 5;
  var DEFAULT_FROM_STRING_CACHE_SIZE = (1 << 10) - 1;
  var IGNORE_COMMAS = true;
  var COMMAS_ARE_DECIMAL_POINTS = false;
  var powerOf10 = function() {
    const powersOf10 = [];
    for (let i = NUMBER_EXP_MIN + 1; i <= NUMBER_EXP_MAX; i++) {
      powersOf10.push(Number("1e" + i));
    }
    const indexOf0InPowersOf10 = 323;
    return function(power) {
      return powersOf10[power + indexOf0InPowersOf10];
    };
  }();
  var critical_headers = [2, Math.E, 3, 4, 5, 6, 7, 8, 9, 10];
  var critical_tetr_values = [
    [
      // Base 2 (using http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html )
      1,
      1.0891180521811203,
      1.1789767925673957,
      1.2701455431742086,
      1.3632090180450092,
      1.4587818160364217,
      1.5575237916251419,
      1.6601571006859253,
      1.767485818836978,
      1.8804192098842727,
      2
    ],
    [
      // Base E (using http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html )
      1,
      // 0.0
      1.1121114330934079,
      // 0.1
      1.231038924931609,
      // 0.2
      1.3583836963111375,
      // 0.3
      1.4960519303993531,
      // 0.4
      1.6463542337511945,
      // 0.5
      1.8121385357018724,
      // 0.6
      1.996971324618307,
      // 0.7
      2.2053895545527546,
      // 0.8
      2.4432574483385254,
      // 0.9
      Math.E
      // 1.0
    ],
    [
      // Base 3
      1,
      1.1187738849693603,
      1.2464963939368214,
      1.38527004705667,
      1.5376664685821402,
      1.7068895236551784,
      1.897001227148399,
      2.1132403089001035,
      2.362480153784171,
      2.6539010333870774,
      3
    ],
    [
      // Base 4
      1,
      1.1367350847096405,
      1.2889510672956703,
      1.4606478703324786,
      1.6570295196661111,
      1.8850062585672889,
      2.1539465047453485,
      2.476829779693097,
      2.872061932789197,
      3.3664204535587183,
      4
    ],
    [
      // Base 5
      1,
      1.1494592900767588,
      1.319708228183931,
      1.5166291280087583,
      1.748171114438024,
      2.0253263297298045,
      2.3636668498288547,
      2.7858359149579424,
      3.3257226212448145,
      4.035730287722532,
      5
    ],
    [
      // Base 6
      1,
      1.159225940787673,
      1.343712473580932,
      1.5611293155111927,
      1.8221199554561318,
      2.14183924486326,
      2.542468319282638,
      3.0574682501653316,
      3.7390572020926873,
      4.6719550537360774,
      6
    ],
    [
      // Base 7
      1,
      1.1670905356972596,
      1.3632807444991446,
      1.5979222279405536,
      1.8842640123816674,
      2.2416069644878687,
      2.69893426559423,
      3.3012632110403577,
      4.121250340630164,
      5.281493033448316,
      7
    ],
    [
      // Base 8
      1,
      1.1736630594087796,
      1.379783782386201,
      1.6292821855668218,
      1.9378971836180754,
      2.3289975651071977,
      2.8384347394720835,
      3.5232708454565906,
      4.478242031114584,
      5.868592169644505,
      8
    ],
    [
      // Base 9
      1,
      1.1793017514670474,
      1.394054150657457,
      1.65664127441059,
      1.985170999970283,
      2.4069682290577457,
      2.9647310119960752,
      3.7278665320924946,
      4.814462547283592,
      6.436522247411611,
      9
    ],
    [
      // Base 10 (using http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html )
      1,
      1.1840100246247336,
      1.4061375836156955,
      1.6802272208863964,
      2.026757028388619,
      2.4770056063449646,
      3.080525271755482,
      3.9191964192627284,
      5.135152840833187,
      6.989961179534715,
      10
    ]
  ];
  var critical_slog_values = [
    [
      // Base 2
      -1,
      -0.9194161097107025,
      -0.8335625019330468,
      -0.7425599821143978,
      -0.6466611521029437,
      -0.5462617907227869,
      -0.4419033816638769,
      -0.3342645487554494,
      -0.224140440909962,
      -0.11241087890006762,
      0
    ],
    [
      // Base E
      -1,
      // 0.0
      -0.90603157029014,
      // 0.1
      -0.80786507256596,
      // 0.2
      -0.7064666939634,
      // 0.3
      -0.60294836853664,
      // 0.4
      -0.49849837513117,
      // 0.5
      -0.39430303318768,
      // 0.6
      -0.29147201034755,
      // 0.7
      -0.19097820800866,
      // 0.8
      -0.09361896280296,
      // 0.9
      0
      // 1.0
    ],
    [
      // Base 3
      -1,
      -0.9021579584316141,
      -0.8005762598234203,
      -0.6964780623319391,
      -0.5911906810998454,
      -0.486050182576545,
      -0.3823089430815083,
      -0.28106046722897615,
      -0.1831906535795894,
      -0.08935809204418144,
      0
    ],
    [
      // Base 4
      -1,
      -0.8917227442365535,
      -0.781258746326964,
      -0.6705130326902455,
      -0.5612813129406509,
      -0.4551067709033134,
      -0.35319256652135966,
      -0.2563741554088552,
      -0.1651412821106526,
      -0.0796919581982668,
      0
    ],
    [
      // Base 5
      -1,
      -0.8843387974366064,
      -0.7678744063886243,
      -0.6529563724510552,
      -0.5415870994657841,
      -0.4352842206588936,
      -0.33504449124791424,
      -0.24138853420685147,
      -0.15445285440944467,
      -0.07409659641336663,
      0
    ],
    [
      // Base 6
      -1,
      -0.8786709358426346,
      -0.7577735191184886,
      -0.6399546189952064,
      -0.527284921869926,
      -0.4211627631006314,
      -0.3223479611761232,
      -0.23107655627789858,
      -0.1472057700818259,
      -0.07035171210706326,
      0
    ],
    [
      // Base 7
      -1,
      -0.8740862815291583,
      -0.7497032990976209,
      -0.6297119746181752,
      -0.5161838335958787,
      -0.41036238255751956,
      -0.31277212146489963,
      -0.2233976621705518,
      -0.1418697367979619,
      -0.06762117662323441,
      0
    ],
    [
      // Base 8
      -1,
      -0.8702632331800649,
      -0.7430366914122081,
      -0.6213373075161548,
      -0.5072025698095242,
      -0.40171437727184167,
      -0.30517930701410456,
      -0.21736343968190863,
      -0.137710238299109,
      -0.06550774483471955,
      0
    ],
    [
      // Base 9
      -1,
      -0.8670016295947213,
      -0.7373984232432306,
      -0.6143173985094293,
      -0.49973884395492807,
      -0.394584953527678,
      -0.2989649949848695,
      -0.21245647317021688,
      -0.13434688362382652,
      -0.0638072667348083,
      0
    ],
    [
      // Base 10
      -1,
      -0.8641642839543857,
      -0.732534623168535,
      -0.6083127477059322,
      -0.4934049257184696,
      -0.3885773075899922,
      -0.29376029055315767,
      -0.2083678561173622,
      -0.13155653399373268,
      -0.062401588652553186,
      0
    ]
  ];
  var decimalPlaces = function decimalPlaces2(value, places) {
    const len = places + 1;
    const numDigits = Math.ceil(Math.log10(Math.abs(value)));
    const rounded = Math.round(value * Math.pow(10, len - numDigits)) * Math.pow(10, numDigits - len);
    return parseFloat(rounded.toFixed(Math.max(len - numDigits, 0)));
  };
  var f_maglog10 = function(n) {
    return Math.sign(n) * Math.log10(Math.abs(n));
  };
  var f_gamma = function(n) {
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
    let l = 0.9189385332046727;
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
  var _twopi = 6.283185307179586;
  var _EXPN1 = 0.36787944117144233;
  var OMEGA = 0.5671432904097838;
  var f_lambertw = function(z, tol = 1e-10) {
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
  };
  function d_lambertw(z, tol = 1e-10) {
    let w;
    let ew, wewz, wn;
    if (!Number.isFinite(z.mag)) {
      return z;
    }
    if (z.eq(Decimal.dZero)) {
      return z;
    }
    if (z.eq(Decimal.dOne)) {
      return Decimal.fromNumber(OMEGA);
    }
    w = Decimal.ln(z);
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
  }
  var Decimal = class _Decimal {
    constructor(value) {
      this.sign = 0;
      this.mag = 0;
      this.layer = 0;
      if (value instanceof _Decimal) {
        this.fromDecimal(value);
      } else if (typeof value === "number") {
        this.fromNumber(value);
      } else if (typeof value === "string") {
        this.fromString(value);
      }
    }
    static {
      this.dZero = _Decimal.fromComponents_noNormalize(0, 0, 0);
    }
    static {
      this.dOne = _Decimal.fromComponents_noNormalize(1, 0, 1);
    }
    static {
      this.dNegOne = _Decimal.fromComponents_noNormalize(-1, 0, 1);
    }
    static {
      this.dTwo = _Decimal.fromComponents_noNormalize(1, 0, 2);
    }
    static {
      this.dTen = _Decimal.fromComponents_noNormalize(1, 0, 10);
    }
    static {
      this.dNaN = _Decimal.fromComponents_noNormalize(Number.NaN, Number.NaN, Number.NaN);
    }
    static {
      this.dInf = _Decimal.fromComponents_noNormalize(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    }
    static {
      this.dNegInf = _Decimal.fromComponents_noNormalize(-1, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
    }
    static {
      this.dNumberMax = _Decimal.fromComponents(1, 0, Number.MAX_VALUE);
    }
    static {
      this.dNumberMin = _Decimal.fromComponents(1, 0, Number.MIN_VALUE);
    }
    static {
      this.fromStringCache = new LRUCache(DEFAULT_FROM_STRING_CACHE_SIZE);
    }
    get m() {
      if (this.sign === 0) {
        return 0;
      } else if (this.layer === 0) {
        const exp = Math.floor(Math.log10(this.mag));
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
        return this.sign;
      }
    }
    set m(value) {
      if (this.layer <= 2) {
        this.fromMantissaExponent(value, this.e);
      } else {
        this.sign = Math.sign(value);
        if (this.sign === 0) {
          this.layer = 0;
          this.exponent = 0;
        }
      }
    }
    get e() {
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
    set e(value) {
      this.fromMantissaExponent(this.m, value);
    }
    get s() {
      return this.sign;
    }
    set s(value) {
      if (value === 0) {
        this.sign = 0;
        this.layer = 0;
        this.mag = 0;
      } else {
        this.sign = value;
      }
    }
    // Object.defineProperty(Decimal.prototype, "mantissa", {
    get mantissa() {
      return this.m;
    }
    set mantissa(value) {
      this.m = value;
    }
    get exponent() {
      return this.e;
    }
    set exponent(value) {
      this.e = value;
    }
    static fromComponents(sign, layer, mag) {
      return new _Decimal().fromComponents(sign, layer, mag);
    }
    static fromComponents_noNormalize(sign, layer, mag) {
      return new _Decimal().fromComponents_noNormalize(sign, layer, mag);
    }
    static fromMantissaExponent(mantissa, exponent) {
      return new _Decimal().fromMantissaExponent(mantissa, exponent);
    }
    static fromMantissaExponent_noNormalize(mantissa, exponent) {
      return new _Decimal().fromMantissaExponent_noNormalize(mantissa, exponent);
    }
    static fromDecimal(value) {
      return new _Decimal().fromDecimal(value);
    }
    static fromNumber(value) {
      return new _Decimal().fromNumber(value);
    }
    static fromString(value) {
      return new _Decimal().fromString(value);
    }
    static fromValue(value) {
      return new _Decimal().fromValue(value);
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
    static fromValue_noAlloc(value) {
      if (value instanceof _Decimal) {
        return value;
      } else if (typeof value === "string") {
        const cached = _Decimal.fromStringCache.get(value);
        if (cached !== void 0) {
          return cached;
        }
        return _Decimal.fromString(value);
      } else if (typeof value === "number") {
        return _Decimal.fromNumber(value);
      } else {
        return _Decimal.dZero;
      }
    }
    static abs(value) {
      return _Decimal.fromValue_noAlloc(value).abs();
    }
    static neg(value) {
      return _Decimal.fromValue_noAlloc(value).neg();
    }
    static negate(value) {
      return _Decimal.fromValue_noAlloc(value).neg();
    }
    static negated(value) {
      return _Decimal.fromValue_noAlloc(value).neg();
    }
    static sign(value) {
      return _Decimal.fromValue_noAlloc(value).sign;
    }
    static sgn(value) {
      return _Decimal.fromValue_noAlloc(value).sign;
    }
    static round(value) {
      return _Decimal.fromValue_noAlloc(value).round();
    }
    static floor(value) {
      return _Decimal.fromValue_noAlloc(value).floor();
    }
    static ceil(value) {
      return _Decimal.fromValue_noAlloc(value).ceil();
    }
    static trunc(value) {
      return _Decimal.fromValue_noAlloc(value).trunc();
    }
    static add(value, other) {
      return _Decimal.fromValue_noAlloc(value).add(other);
    }
    static plus(value, other) {
      return _Decimal.fromValue_noAlloc(value).add(other);
    }
    static sub(value, other) {
      return _Decimal.fromValue_noAlloc(value).sub(other);
    }
    static subtract(value, other) {
      return _Decimal.fromValue_noAlloc(value).sub(other);
    }
    static minus(value, other) {
      return _Decimal.fromValue_noAlloc(value).sub(other);
    }
    static mul(value, other) {
      return _Decimal.fromValue_noAlloc(value).mul(other);
    }
    static multiply(value, other) {
      return _Decimal.fromValue_noAlloc(value).mul(other);
    }
    static times(value, other) {
      return _Decimal.fromValue_noAlloc(value).mul(other);
    }
    static div(value, other) {
      return _Decimal.fromValue_noAlloc(value).div(other);
    }
    static divide(value, other) {
      return _Decimal.fromValue_noAlloc(value).div(other);
    }
    static recip(value) {
      return _Decimal.fromValue_noAlloc(value).recip();
    }
    static reciprocal(value) {
      return _Decimal.fromValue_noAlloc(value).recip();
    }
    static reciprocate(value) {
      return _Decimal.fromValue_noAlloc(value).reciprocate();
    }
    static cmp(value, other) {
      return _Decimal.fromValue_noAlloc(value).cmp(other);
    }
    static cmpabs(value, other) {
      return _Decimal.fromValue_noAlloc(value).cmpabs(other);
    }
    static compare(value, other) {
      return _Decimal.fromValue_noAlloc(value).cmp(other);
    }
    static isNaN(value) {
      value = _Decimal.fromValue_noAlloc(value);
      return isNaN(value.sign) || isNaN(value.layer) || isNaN(value.mag);
    }
    static isFinite(value) {
      value = _Decimal.fromValue_noAlloc(value);
      return isFinite(value.sign) && isFinite(value.layer) && isFinite(value.mag);
    }
    static eq(value, other) {
      return _Decimal.fromValue_noAlloc(value).eq(other);
    }
    static equals(value, other) {
      return _Decimal.fromValue_noAlloc(value).eq(other);
    }
    static neq(value, other) {
      return _Decimal.fromValue_noAlloc(value).neq(other);
    }
    static notEquals(value, other) {
      return _Decimal.fromValue_noAlloc(value).notEquals(other);
    }
    static lt(value, other) {
      return _Decimal.fromValue_noAlloc(value).lt(other);
    }
    static lte(value, other) {
      return _Decimal.fromValue_noAlloc(value).lte(other);
    }
    static gt(value, other) {
      return _Decimal.fromValue_noAlloc(value).gt(other);
    }
    static gte(value, other) {
      return _Decimal.fromValue_noAlloc(value).gte(other);
    }
    static max(value, other) {
      return _Decimal.fromValue_noAlloc(value).max(other);
    }
    static min(value, other) {
      return _Decimal.fromValue_noAlloc(value).min(other);
    }
    static minabs(value, other) {
      return _Decimal.fromValue_noAlloc(value).minabs(other);
    }
    static maxabs(value, other) {
      return _Decimal.fromValue_noAlloc(value).maxabs(other);
    }
    static clamp(value, min, max) {
      return _Decimal.fromValue_noAlloc(value).clamp(min, max);
    }
    static clampMin(value, min) {
      return _Decimal.fromValue_noAlloc(value).clampMin(min);
    }
    static clampMax(value, max) {
      return _Decimal.fromValue_noAlloc(value).clampMax(max);
    }
    static cmp_tolerance(value, other, tolerance) {
      return _Decimal.fromValue_noAlloc(value).cmp_tolerance(other, tolerance);
    }
    static compare_tolerance(value, other, tolerance) {
      return _Decimal.fromValue_noAlloc(value).cmp_tolerance(other, tolerance);
    }
    static eq_tolerance(value, other, tolerance) {
      return _Decimal.fromValue_noAlloc(value).eq_tolerance(other, tolerance);
    }
    static equals_tolerance(value, other, tolerance) {
      return _Decimal.fromValue_noAlloc(value).eq_tolerance(other, tolerance);
    }
    static neq_tolerance(value, other, tolerance) {
      return _Decimal.fromValue_noAlloc(value).neq_tolerance(other, tolerance);
    }
    static notEquals_tolerance(value, other, tolerance) {
      return _Decimal.fromValue_noAlloc(value).notEquals_tolerance(other, tolerance);
    }
    static lt_tolerance(value, other, tolerance) {
      return _Decimal.fromValue_noAlloc(value).lt_tolerance(other, tolerance);
    }
    static lte_tolerance(value, other, tolerance) {
      return _Decimal.fromValue_noAlloc(value).lte_tolerance(other, tolerance);
    }
    static gt_tolerance(value, other, tolerance) {
      return _Decimal.fromValue_noAlloc(value).gt_tolerance(other, tolerance);
    }
    static gte_tolerance(value, other, tolerance) {
      return _Decimal.fromValue_noAlloc(value).gte_tolerance(other, tolerance);
    }
    static pLog10(value) {
      return _Decimal.fromValue_noAlloc(value).pLog10();
    }
    static absLog10(value) {
      return _Decimal.fromValue_noAlloc(value).absLog10();
    }
    static log10(value) {
      return _Decimal.fromValue_noAlloc(value).log10();
    }
    static log(value, base) {
      return _Decimal.fromValue_noAlloc(value).log(base);
    }
    static log2(value) {
      return _Decimal.fromValue_noAlloc(value).log2();
    }
    static ln(value) {
      return _Decimal.fromValue_noAlloc(value).ln();
    }
    static logarithm(value, base) {
      return _Decimal.fromValue_noAlloc(value).logarithm(base);
    }
    static pow(value, other) {
      return _Decimal.fromValue_noAlloc(value).pow(other);
    }
    static pow10(value) {
      return _Decimal.fromValue_noAlloc(value).pow10();
    }
    static root(value, other) {
      return _Decimal.fromValue_noAlloc(value).root(other);
    }
    static factorial(value, _other) {
      return _Decimal.fromValue_noAlloc(value).factorial();
    }
    static gamma(value, _other) {
      return _Decimal.fromValue_noAlloc(value).gamma();
    }
    static lngamma(value, _other) {
      return _Decimal.fromValue_noAlloc(value).lngamma();
    }
    static exp(value) {
      return _Decimal.fromValue_noAlloc(value).exp();
    }
    static sqr(value) {
      return _Decimal.fromValue_noAlloc(value).sqr();
    }
    static sqrt(value) {
      return _Decimal.fromValue_noAlloc(value).sqrt();
    }
    static cube(value) {
      return _Decimal.fromValue_noAlloc(value).cube();
    }
    static cbrt(value) {
      return _Decimal.fromValue_noAlloc(value).cbrt();
    }
    static tetrate(value, height = 2, payload = _Decimal.fromComponents_noNormalize(1, 0, 1)) {
      return _Decimal.fromValue_noAlloc(value).tetrate(height, payload);
    }
    static iteratedexp(value, height = 2, payload = _Decimal.fromComponents_noNormalize(1, 0, 1)) {
      return _Decimal.fromValue_noAlloc(value).iteratedexp(height, payload);
    }
    static iteratedlog(value, base = 10, times = 1) {
      return _Decimal.fromValue_noAlloc(value).iteratedlog(base, times);
    }
    static layeradd10(value, diff) {
      return _Decimal.fromValue_noAlloc(value).layeradd10(diff);
    }
    static layeradd(value, diff, base = 10) {
      return _Decimal.fromValue_noAlloc(value).layeradd(diff, base);
    }
    static slog(value, base = 10) {
      return _Decimal.fromValue_noAlloc(value).slog(base);
    }
    static lambertw(value) {
      return _Decimal.fromValue_noAlloc(value).lambertw();
    }
    static ssqrt(value) {
      return _Decimal.fromValue_noAlloc(value).ssqrt();
    }
    static pentate(value, height = 2, payload = _Decimal.fromComponents_noNormalize(1, 0, 1)) {
      return _Decimal.fromValue_noAlloc(value).pentate(height, payload);
    }
    /**
    * If you're willing to spend 'resourcesAvailable' and want to buy something
    * with exponentially increasing cost each purchase (start at priceStart,
    * multiply by priceRatio, already own currentOwned), how much of it can you buy?
    * Adapted from Trimps source code.
    */
    static affordGeometricSeries(resourcesAvailable, priceStart, priceRatio, currentOwned) {
      return this.affordGeometricSeries_core(
        _Decimal.fromValue_noAlloc(resourcesAvailable),
        _Decimal.fromValue_noAlloc(priceStart),
        _Decimal.fromValue_noAlloc(priceRatio),
        currentOwned
      );
    }
    /**
    * How much resource would it cost to buy (numItems) items if you already have currentOwned,
    * the initial price is priceStart and it multiplies by priceRatio each purchase?
    */
    static sumGeometricSeries(numItems, priceStart, priceRatio, currentOwned) {
      return this.sumGeometricSeries_core(numItems, _Decimal.fromValue_noAlloc(priceStart), _Decimal.fromValue_noAlloc(priceRatio), currentOwned);
    }
    /**
    * If you're willing to spend 'resourcesAvailable' and want to buy something with additively
    * increasing cost each purchase (start at priceStart, add by priceAdd, already own currentOwned),
    * how much of it can you buy?
    */
    static affordArithmeticSeries(resourcesAvailable, priceStart, priceAdd, currentOwned) {
      return this.affordArithmeticSeries_core(
        _Decimal.fromValue_noAlloc(resourcesAvailable),
        _Decimal.fromValue_noAlloc(priceStart),
        _Decimal.fromValue_noAlloc(priceAdd),
        _Decimal.fromValue_noAlloc(currentOwned)
      );
    }
    /**
    * How much resource would it cost to buy (numItems) items if you already have currentOwned,
    * the initial price is priceStart and it adds priceAdd each purchase?
    * Adapted from http://www.mathwords.com/a/arithmetic_series.htm
    */
    static sumArithmeticSeries(numItems, priceStart, priceAdd, currentOwned) {
      return this.sumArithmeticSeries_core(_Decimal.fromValue_noAlloc(numItems), _Decimal.fromValue_noAlloc(priceStart), _Decimal.fromValue_noAlloc(priceAdd), _Decimal.fromValue_noAlloc(currentOwned));
    }
    /**
    * When comparing two purchases that cost (resource) and increase your resource/sec by (deltaRpS),
    * the lowest efficiency score is the better one to purchase.
    * From Frozen Cookies:
    * http://cookieclicker.wikia.com/wiki/Frozen_Cookies_(JavaScript_Add-on)#Efficiency.3F_What.27s_that.3F
    */
    static efficiencyOfPurchase(cost, currentRpS, deltaRpS) {
      return this.efficiencyOfPurchase_core(_Decimal.fromValue_noAlloc(cost), _Decimal.fromValue_noAlloc(currentRpS), _Decimal.fromValue_noAlloc(deltaRpS));
    }
    static randomDecimalForTesting(maxLayers) {
      if (Math.random() * 20 < 1) {
        return _Decimal.fromComponents_noNormalize(0, 0, 0);
      }
      const randomsign = Math.random() > 0.5 ? 1 : -1;
      if (Math.random() * 20 < 1) {
        return _Decimal.fromComponents_noNormalize(randomsign, 0, 1);
      }
      const layer = Math.floor(Math.random() * (maxLayers + 1));
      let randomexp = layer === 0 ? Math.random() * 616 - 308 : Math.random() * 16;
      if (Math.random() > 0.9) {
        randomexp = Math.trunc(randomexp);
      }
      let randommag = Math.pow(10, randomexp);
      if (Math.random() > 0.9) {
        randommag = Math.trunc(randommag);
      }
      return _Decimal.fromComponents(randomsign, layer, randommag);
    }
    static affordGeometricSeries_core(resourcesAvailable, priceStart, priceRatio, currentOwned) {
      const actualStart = priceStart.mul(priceRatio.pow(currentOwned));
      return _Decimal.floor(
        resourcesAvailable.div(actualStart).mul(priceRatio.sub(1)).add(1).log10().div(priceRatio.log10())
      );
    }
    static sumGeometricSeries_core(numItems, priceStart, priceRatio, currentOwned) {
      return priceStart.mul(priceRatio.pow(currentOwned)).mul(_Decimal.sub(1, priceRatio.pow(numItems))).div(_Decimal.sub(1, priceRatio));
    }
    static affordArithmeticSeries_core(resourcesAvailable, priceStart, priceAdd, currentOwned) {
      const actualStart = priceStart.add(currentOwned.mul(priceAdd));
      const b = actualStart.sub(priceAdd.div(2));
      const b2 = b.pow(2);
      return b.neg().add(b2.add(priceAdd.mul(resourcesAvailable).mul(2)).sqrt()).div(priceAdd).floor();
    }
    static sumArithmeticSeries_core(numItems, priceStart, priceAdd, currentOwned) {
      const actualStart = priceStart.add(currentOwned.mul(priceAdd));
      return numItems.div(2).mul(actualStart.mul(2).plus(numItems.sub(1).mul(priceAdd)));
    }
    static efficiencyOfPurchase_core(cost, currentRpS, deltaRpS) {
      return cost.div(currentRpS).add(cost.div(deltaRpS));
    }
    normalize() {
      if (this.sign === 0 || this.mag === 0 && this.layer === 0) {
        this.sign = 0;
        this.mag = 0;
        this.layer = 0;
        return this;
      }
      if (this.layer === 0 && this.mag < 0) {
        this.mag = -this.mag;
        this.sign = -this.sign;
      }
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
            this.mag = -this.mag;
            this.sign = -this.sign;
          } else if (this.mag === 0) {
            this.sign = 0;
          }
        }
      }
      return this;
    }
    fromComponents(sign, layer, mag) {
      this.sign = sign;
      this.layer = layer;
      this.mag = mag;
      this.normalize();
      return this;
    }
    fromComponents_noNormalize(sign, layer, mag) {
      this.sign = sign;
      this.layer = layer;
      this.mag = mag;
      return this;
    }
    fromMantissaExponent(mantissa, exponent) {
      this.layer = 1;
      this.sign = Math.sign(mantissa);
      mantissa = Math.abs(mantissa);
      this.mag = exponent + Math.log10(mantissa);
      this.normalize();
      return this;
    }
    fromMantissaExponent_noNormalize(mantissa, exponent) {
      this.fromMantissaExponent(mantissa, exponent);
      return this;
    }
    fromDecimal(value) {
      this.sign = value.sign;
      this.layer = value.layer;
      this.mag = value.mag;
      return this;
    }
    fromNumber(value) {
      this.mag = Math.abs(value);
      this.sign = Math.sign(value);
      this.layer = 0;
      this.normalize();
      return this;
    }
    fromString(value) {
      const originalValue = value;
      const cached = _Decimal.fromStringCache.get(originalValue);
      if (cached !== void 0) {
        return this.fromDecimal(cached);
      }
      if (IGNORE_COMMAS) {
        value = value.replace(",", "");
      } else if (COMMAS_ARE_DECIMAL_POINTS) {
        value = value.replace(",", ".");
      }
      const pentationparts = value.split("^^^");
      if (pentationparts.length === 2) {
        const base2 = parseFloat(pentationparts[0]);
        const height2 = parseFloat(pentationparts[1]);
        const heightparts = pentationparts[1].split(";");
        let payload = 1;
        if (heightparts.length === 2) {
          payload = parseFloat(heightparts[1]);
          if (!isFinite(payload)) {
            payload = 1;
          }
        }
        if (isFinite(base2) && isFinite(height2)) {
          const result = _Decimal.pentate(base2, height2, payload);
          this.sign = result.sign;
          this.layer = result.layer;
          this.mag = result.mag;
          if (_Decimal.fromStringCache.maxSize >= 1) {
            _Decimal.fromStringCache.set(originalValue, _Decimal.fromDecimal(this));
          }
          return this;
        }
      }
      const tetrationparts = value.split("^^");
      if (tetrationparts.length === 2) {
        const base2 = parseFloat(tetrationparts[0]);
        const height2 = parseFloat(tetrationparts[1]);
        const heightparts = tetrationparts[1].split(";");
        let payload = 1;
        if (heightparts.length === 2) {
          payload = parseFloat(heightparts[1]);
          if (!isFinite(payload)) {
            payload = 1;
          }
        }
        if (isFinite(base2) && isFinite(height2)) {
          const result = _Decimal.tetrate(base2, height2, payload);
          this.sign = result.sign;
          this.layer = result.layer;
          this.mag = result.mag;
          if (_Decimal.fromStringCache.maxSize >= 1) {
            _Decimal.fromStringCache.set(originalValue, _Decimal.fromDecimal(this));
          }
          return this;
        }
      }
      const powparts = value.split("^");
      if (powparts.length === 2) {
        const base2 = parseFloat(powparts[0]);
        const exponent2 = parseFloat(powparts[1]);
        if (isFinite(base2) && isFinite(exponent2)) {
          const result = _Decimal.pow(base2, exponent2);
          this.sign = result.sign;
          this.layer = result.layer;
          this.mag = result.mag;
          if (_Decimal.fromStringCache.maxSize >= 1) {
            _Decimal.fromStringCache.set(originalValue, _Decimal.fromDecimal(this));
          }
          return this;
        }
      }
      value = value.trim().toLowerCase();
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
          const result = _Decimal.tetrate(base, height, payload);
          this.sign = result.sign;
          this.layer = result.layer;
          this.mag = result.mag;
          if (_Decimal.fromStringCache.maxSize >= 1) {
            _Decimal.fromStringCache.set(originalValue, _Decimal.fromDecimal(this));
          }
          return this;
        }
      }
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
          const result = _Decimal.tetrate(base, height, payload);
          this.sign = result.sign;
          this.layer = result.layer;
          this.mag = result.mag;
          if (_Decimal.fromStringCache.maxSize >= 1) {
            _Decimal.fromStringCache.set(originalValue, _Decimal.fromDecimal(this));
          }
          return this;
        }
      }
      const parts = value.split("e");
      const ecount = parts.length - 1;
      if (ecount === 0) {
        const numberAttempt = parseFloat(value);
        if (isFinite(numberAttempt)) {
          this.fromNumber(numberAttempt);
          if (_Decimal.fromStringCache.size >= 1) {
            _Decimal.fromStringCache.set(originalValue, _Decimal.fromDecimal(this));
          }
          return this;
        }
      } else if (ecount === 1) {
        const numberAttempt = parseFloat(value);
        if (isFinite(numberAttempt) && numberAttempt !== 0) {
          this.fromNumber(numberAttempt);
          if (_Decimal.fromStringCache.maxSize >= 1) {
            _Decimal.fromStringCache.set(originalValue, _Decimal.fromDecimal(this));
          }
          return this;
        }
      }
      const newparts = value.split("e^");
      if (newparts.length === 2) {
        this.sign = 1;
        if (newparts[0].charAt(0) == "-") {
          this.sign = -1;
        }
        let layerstring = "";
        for (let i = 0; i < newparts[1].length; ++i) {
          const chrcode = newparts[1].charCodeAt(i);
          if (chrcode >= 43 && chrcode <= 57 || chrcode === 101) {
            layerstring += newparts[1].charAt(i);
          } else {
            this.layer = parseFloat(layerstring);
            this.mag = parseFloat(newparts[1].substr(i + 1));
            this.normalize();
            if (_Decimal.fromStringCache.maxSize >= 1) {
              _Decimal.fromStringCache.set(originalValue, _Decimal.fromDecimal(this));
            }
            return this;
          }
        }
      }
      if (ecount < 1) {
        this.sign = 0;
        this.layer = 0;
        this.mag = 0;
        if (_Decimal.fromStringCache.maxSize >= 1) {
          _Decimal.fromStringCache.set(originalValue, _Decimal.fromDecimal(this));
        }
        return this;
      }
      const mantissa = parseFloat(parts[0]);
      if (mantissa === 0) {
        this.sign = 0;
        this.layer = 0;
        this.mag = 0;
        if (_Decimal.fromStringCache.maxSize >= 1) {
          _Decimal.fromStringCache.set(originalValue, _Decimal.fromDecimal(this));
        }
        return this;
      }
      let exponent = parseFloat(parts[parts.length - 1]);
      if (ecount >= 2) {
        const me = parseFloat(parts[parts.length - 2]);
        if (isFinite(me)) {
          exponent *= Math.sign(me);
          exponent += f_maglog10(me);
        }
      }
      if (!isFinite(mantissa)) {
        this.sign = parts[0] === "-" ? -1 : 1;
        this.layer = ecount;
        this.mag = exponent;
      } else if (ecount === 1) {
        this.sign = Math.sign(mantissa);
        this.layer = 1;
        this.mag = exponent + Math.log10(Math.abs(mantissa));
      } else {
        this.sign = Math.sign(mantissa);
        this.layer = ecount;
        if (ecount === 2) {
          const result = _Decimal.mul(_Decimal.fromComponents(1, 2, exponent), _Decimal.fromValue_noAlloc(mantissa));
          this.sign = result.sign;
          this.layer = result.layer;
          this.mag = result.mag;
          if (_Decimal.fromStringCache.maxSize >= 1) {
            _Decimal.fromStringCache.set(originalValue, _Decimal.fromDecimal(this));
          }
          return this;
        } else {
          this.mag = exponent;
        }
      }
      this.normalize();
      if (_Decimal.fromStringCache.maxSize >= 1) {
        _Decimal.fromStringCache.set(originalValue, _Decimal.fromDecimal(this));
      }
      return this;
    }
    fromValue(value) {
      if (value instanceof _Decimal) {
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
    toNumber() {
      if (!Number.isFinite(this.layer)) {
        return Number.NaN;
      }
      if (this.layer === 0) {
        return this.sign * this.mag;
      } else if (this.layer === 1) {
        return this.sign * Math.pow(10, this.mag);
      } else {
        return this.mag > 0 ? this.sign > 0 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : 0;
      }
    }
    mantissaWithDecimalPlaces(places) {
      if (isNaN(this.m)) {
        return Number.NaN;
      }
      if (this.m === 0) {
        return 0;
      }
      return decimalPlaces(this.m, places);
    }
    magnitudeWithDecimalPlaces(places) {
      if (isNaN(this.mag)) {
        return Number.NaN;
      }
      if (this.mag === 0) {
        return 0;
      }
      return decimalPlaces(this.mag, places);
    }
    toString() {
      if (isNaN(this.layer) || isNaN(this.sign) || isNaN(this.mag)) {
        return "NaN";
      }
      if (this.mag === Number.POSITIVE_INFINITY || this.layer === Number.POSITIVE_INFINITY) {
        return this.sign === 1 ? "Infinity" : "-Infinity";
      }
      if (this.layer === 0) {
        if (this.mag < 1e21 && this.mag > 1e-7 || this.mag === 0) {
          return (this.sign * this.mag).toString();
        }
        return this.m + "e" + this.e;
      } else if (this.layer === 1) {
        return this.m + "e" + this.e;
      } else {
        if (this.layer <= MAX_ES_IN_A_ROW) {
          return (this.sign === -1 ? "-" : "") + "e".repeat(this.layer) + this.mag;
        } else {
          return (this.sign === -1 ? "-" : "") + "(e^" + this.layer + ")" + this.mag;
        }
      }
    }
    toExponential(places) {
      if (this.layer === 0) {
        return (this.sign * this.mag).toExponential(places);
      }
      return this.toStringWithDecimalPlaces(places);
    }
    toFixed(places) {
      if (this.layer === 0) {
        return (this.sign * this.mag).toFixed(places);
      }
      return this.toStringWithDecimalPlaces(places);
    }
    toPrecision(places) {
      if (this.e <= -7) {
        return this.toExponential(places - 1);
      }
      if (places > this.e) {
        return this.toFixed(places - this.exponent - 1);
      }
      return this.toExponential(places - 1);
    }
    valueOf() {
      return this.toString();
    }
    toJSON() {
      return this.toString();
    }
    toStringWithDecimalPlaces(places) {
      if (this.layer === 0) {
        if (this.mag < 1e21 && this.mag > 1e-7 || this.mag === 0) {
          return (this.sign * this.mag).toFixed(places);
        }
        return decimalPlaces(this.m, places) + "e" + decimalPlaces(this.e, places);
      } else if (this.layer === 1) {
        return decimalPlaces(this.m, places) + "e" + decimalPlaces(this.e, places);
      } else {
        if (this.layer <= MAX_ES_IN_A_ROW) {
          return (this.sign === -1 ? "-" : "") + "e".repeat(this.layer) + decimalPlaces(this.mag, places);
        } else {
          return (this.sign === -1 ? "-" : "") + "(e^" + this.layer + ")" + decimalPlaces(this.mag, places);
        }
      }
    }
    abs() {
      return _Decimal.fromComponents_noNormalize(this.sign === 0 ? 0 : 1, this.layer, this.mag);
    }
    neg() {
      return _Decimal.fromComponents_noNormalize(-this.sign, this.layer, this.mag);
    }
    negate() {
      return this.neg();
    }
    negated() {
      return this.neg();
    }
    // public sign () {
    //     return this.sign;
    //   }
    sgn() {
      return this.sign;
    }
    round() {
      if (this.mag < 0) {
        return _Decimal.dZero;
      }
      if (this.layer === 0) {
        return _Decimal.fromComponents(this.sign, 0, Math.round(this.mag));
      }
      return this;
    }
    floor() {
      if (this.mag < 0) {
        return _Decimal.dZero;
      }
      if (this.layer === 0) {
        return _Decimal.fromComponents(this.sign, 0, Math.floor(this.mag));
      }
      return this;
    }
    ceil() {
      if (this.mag < 0) {
        return _Decimal.dZero;
      }
      if (this.layer === 0) {
        return _Decimal.fromComponents(this.sign, 0, Math.ceil(this.mag));
      }
      return this;
    }
    trunc() {
      if (this.mag < 0) {
        return _Decimal.dZero;
      }
      if (this.layer === 0) {
        return _Decimal.fromComponents(this.sign, 0, Math.trunc(this.mag));
      }
      return this;
    }
    add(value) {
      const decimal = _Decimal.fromValue_noAlloc(value);
      if (!Number.isFinite(this.layer)) {
        return this;
      }
      if (!Number.isFinite(decimal.layer)) {
        return decimal;
      }
      if (this.sign === 0) {
        return decimal;
      }
      if (decimal.sign === 0) {
        return this;
      }
      if (this.sign === -decimal.sign && this.layer === decimal.layer && this.mag === decimal.mag) {
        return _Decimal.fromComponents_noNormalize(0, 0, 0);
      }
      let a;
      let b;
      if (this.layer >= 2 || decimal.layer >= 2) {
        return this.maxabs(decimal);
      }
      if (_Decimal.cmpabs(this, decimal) > 0) {
        a = this;
        b = decimal;
      } else {
        a = decimal;
        b = this;
      }
      if (a.layer === 0 && b.layer === 0) {
        return _Decimal.fromNumber(a.sign * a.mag + b.sign * b.mag);
      }
      const layera = a.layer * Math.sign(a.mag);
      const layerb = b.layer * Math.sign(b.mag);
      if (layera - layerb >= 2) {
        return a;
      }
      if (layera === 0 && layerb === -1) {
        if (Math.abs(b.mag - Math.log10(a.mag)) > MAX_SIGNIFICANT_DIGITS) {
          return a;
        } else {
          const magdiff = Math.pow(10, Math.log10(a.mag) - b.mag);
          const mantissa = b.sign + a.sign * magdiff;
          return _Decimal.fromComponents(Math.sign(mantissa), 1, b.mag + Math.log10(Math.abs(mantissa)));
        }
      }
      if (layera === 1 && layerb === 0) {
        if (Math.abs(a.mag - Math.log10(b.mag)) > MAX_SIGNIFICANT_DIGITS) {
          return a;
        } else {
          const magdiff = Math.pow(10, a.mag - Math.log10(b.mag));
          const mantissa = b.sign + a.sign * magdiff;
          return _Decimal.fromComponents(Math.sign(mantissa), 1, Math.log10(b.mag) + Math.log10(Math.abs(mantissa)));
        }
      }
      if (Math.abs(a.mag - b.mag) > MAX_SIGNIFICANT_DIGITS) {
        return a;
      } else {
        const magdiff = Math.pow(10, a.mag - b.mag);
        const mantissa = b.sign + a.sign * magdiff;
        return _Decimal.fromComponents(Math.sign(mantissa), 1, b.mag + Math.log10(Math.abs(mantissa)));
      }
      throw Error("Bad arguments to add: " + this + ", " + value);
    }
    plus(value) {
      return this.add(value);
    }
    sub(value) {
      return this.add(_Decimal.fromValue_noAlloc(value).neg());
    }
    subtract(value) {
      return this.sub(value);
    }
    minus(value) {
      return this.sub(value);
    }
    mul(value) {
      const decimal = _Decimal.fromValue_noAlloc(value);
      if (!Number.isFinite(this.layer)) {
        return this;
      }
      if (!Number.isFinite(decimal.layer)) {
        return decimal;
      }
      if (this.sign === 0 || decimal.sign === 0) {
        return _Decimal.fromComponents_noNormalize(0, 0, 0);
      }
      if (this.layer === decimal.layer && this.mag === -decimal.mag) {
        return _Decimal.fromComponents_noNormalize(this.sign * decimal.sign, 0, 1);
      }
      let a;
      let b;
      if (this.layer > decimal.layer || this.layer == decimal.layer && Math.abs(this.mag) > Math.abs(decimal.mag)) {
        a = this;
        b = decimal;
      } else {
        a = decimal;
        b = this;
      }
      if (a.layer === 0 && b.layer === 0) {
        return _Decimal.fromNumber(a.sign * b.sign * a.mag * b.mag);
      }
      if (a.layer >= 3 || a.layer - b.layer >= 2) {
        return _Decimal.fromComponents(a.sign * b.sign, a.layer, a.mag);
      }
      if (a.layer === 1 && b.layer === 0) {
        return _Decimal.fromComponents(a.sign * b.sign, 1, a.mag + Math.log10(b.mag));
      }
      if (a.layer === 1 && b.layer === 1) {
        return _Decimal.fromComponents(a.sign * b.sign, 1, a.mag + b.mag);
      }
      if (a.layer === 2 && b.layer === 1) {
        const newmag = _Decimal.fromComponents(Math.sign(a.mag), a.layer - 1, Math.abs(a.mag)).add(
          _Decimal.fromComponents(Math.sign(b.mag), b.layer - 1, Math.abs(b.mag))
        );
        return _Decimal.fromComponents(a.sign * b.sign, newmag.layer + 1, newmag.sign * newmag.mag);
      }
      if (a.layer === 2 && b.layer === 2) {
        const newmag = _Decimal.fromComponents(Math.sign(a.mag), a.layer - 1, Math.abs(a.mag)).add(
          _Decimal.fromComponents(Math.sign(b.mag), b.layer - 1, Math.abs(b.mag))
        );
        return _Decimal.fromComponents(a.sign * b.sign, newmag.layer + 1, newmag.sign * newmag.mag);
      }
      throw Error("Bad arguments to mul: " + this + ", " + value);
    }
    multiply(value) {
      return this.mul(value);
    }
    times(value) {
      return this.mul(value);
    }
    div(value) {
      const decimal = _Decimal.fromValue_noAlloc(value);
      return this.mul(decimal.recip());
    }
    divide(value) {
      return this.div(value);
    }
    divideBy(value) {
      return this.div(value);
    }
    dividedBy(value) {
      return this.div(value);
    }
    recip() {
      if (this.mag === 0) {
        return _Decimal.dNaN;
      } else if (this.layer === 0) {
        return _Decimal.fromComponents(this.sign, 0, 1 / this.mag);
      } else {
        return _Decimal.fromComponents(this.sign, this.layer, -this.mag);
      }
    }
    reciprocal() {
      return this.recip();
    }
    reciprocate() {
      return this.recip();
    }
    /**
    * -1 for less than value, 0 for equals value, 1 for greater than value
    */
    cmp(value) {
      const decimal = _Decimal.fromValue_noAlloc(value);
      if (this.sign > decimal.sign) {
        return 1;
      }
      if (this.sign < decimal.sign) {
        return -1;
      }
      return this.sign * this.cmpabs(value);
    }
    cmpabs(value) {
      const decimal = _Decimal.fromValue_noAlloc(value);
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
    compare(value) {
      return this.cmp(value);
    }
    isNan() {
      return isNaN(this.sign) || isNaN(this.layer) || isNaN(this.mag);
    }
    isFinite() {
      return isFinite(this.sign) && isFinite(this.layer) && isFinite(this.mag);
    }
    eq(value) {
      const decimal = _Decimal.fromValue_noAlloc(value);
      return this.sign === decimal.sign && this.layer === decimal.layer && this.mag === decimal.mag;
    }
    equals(value) {
      return this.eq(value);
    }
    neq(value) {
      return !this.eq(value);
    }
    notEquals(value) {
      return this.neq(value);
    }
    lt(value) {
      return this.cmp(value) === -1;
    }
    lte(value) {
      return !this.gt(value);
    }
    gt(value) {
      return this.cmp(value) === 1;
    }
    gte(value) {
      return !this.lt(value);
    }
    max(value) {
      const decimal = _Decimal.fromValue_noAlloc(value);
      return this.lt(decimal) ? decimal : this;
    }
    min(value) {
      const decimal = _Decimal.fromValue_noAlloc(value);
      return this.gt(decimal) ? decimal : this;
    }
    maxabs(value) {
      const decimal = _Decimal.fromValue_noAlloc(value);
      return this.cmpabs(decimal) < 0 ? decimal : this;
    }
    minabs(value) {
      const decimal = _Decimal.fromValue_noAlloc(value);
      return this.cmpabs(decimal) > 0 ? decimal : this;
    }
    clamp(min, max) {
      return this.max(min).min(max);
    }
    clampMin(min) {
      return this.max(min);
    }
    clampMax(max) {
      return this.min(max);
    }
    cmp_tolerance(value, tolerance) {
      const decimal = _Decimal.fromValue_noAlloc(value);
      return this.eq_tolerance(decimal, tolerance) ? 0 : this.cmp(decimal);
    }
    compare_tolerance(value, tolerance) {
      return this.cmp_tolerance(value, tolerance);
    }
    /**
    * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
    * For example, if you put in 1e-9, then any number closer to the
    * larger number than (larger number)*1e-9 will be considered equal.
    */
    eq_tolerance(value, tolerance) {
      const decimal = _Decimal.fromValue_noAlloc(value);
      if (tolerance == null) {
        tolerance = 1e-7;
      }
      if (this.sign !== decimal.sign) {
        return false;
      }
      if (Math.abs(this.layer - decimal.layer) > 1) {
        return false;
      }
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
    equals_tolerance(value, tolerance) {
      return this.eq_tolerance(value, tolerance);
    }
    neq_tolerance(value, tolerance) {
      return !this.eq_tolerance(value, tolerance);
    }
    notEquals_tolerance(value, tolerance) {
      return this.neq_tolerance(value, tolerance);
    }
    lt_tolerance(value, tolerance) {
      const decimal = _Decimal.fromValue_noAlloc(value);
      return !this.eq_tolerance(decimal, tolerance) && this.lt(decimal);
    }
    lte_tolerance(value, tolerance) {
      const decimal = _Decimal.fromValue_noAlloc(value);
      return this.eq_tolerance(decimal, tolerance) || this.lt(decimal);
    }
    gt_tolerance(value, tolerance) {
      const decimal = _Decimal.fromValue_noAlloc(value);
      return !this.eq_tolerance(decimal, tolerance) && this.gt(decimal);
    }
    gte_tolerance(value, tolerance) {
      const decimal = _Decimal.fromValue_noAlloc(value);
      return this.eq_tolerance(decimal, tolerance) || this.gt(decimal);
    }
    pLog10() {
      if (this.lt(_Decimal.dZero)) {
        return _Decimal.dZero;
      }
      return this.log10();
    }
    absLog10() {
      if (this.sign === 0) {
        return _Decimal.dNaN;
      } else if (this.layer > 0) {
        return _Decimal.fromComponents(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
      } else {
        return _Decimal.fromComponents(1, 0, Math.log10(this.mag));
      }
    }
    log10() {
      if (this.sign <= 0) {
        return _Decimal.dNaN;
      } else if (this.layer > 0) {
        return _Decimal.fromComponents(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
      } else {
        return _Decimal.fromComponents(this.sign, 0, Math.log10(this.mag));
      }
    }
    log(base) {
      base = _Decimal.fromValue_noAlloc(base);
      if (this.sign <= 0) {
        return _Decimal.dNaN;
      }
      if (base.sign <= 0) {
        return _Decimal.dNaN;
      }
      if (base.sign === 1 && base.layer === 0 && base.mag === 1) {
        return _Decimal.dNaN;
      } else if (this.layer === 0 && base.layer === 0) {
        return _Decimal.fromComponents(this.sign, 0, Math.log(this.mag) / Math.log(base.mag));
      }
      return _Decimal.div(this.log10(), base.log10());
    }
    log2() {
      if (this.sign <= 0) {
        return _Decimal.dNaN;
      } else if (this.layer === 0) {
        return _Decimal.fromComponents(this.sign, 0, Math.log2(this.mag));
      } else if (this.layer === 1) {
        return _Decimal.fromComponents(Math.sign(this.mag), 0, Math.abs(this.mag) * 3.321928094887362);
      } else if (this.layer === 2) {
        return _Decimal.fromComponents(Math.sign(this.mag), 1, Math.abs(this.mag) + 0.5213902276543247);
      } else {
        return _Decimal.fromComponents(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
      }
    }
    ln() {
      if (this.sign <= 0) {
        return _Decimal.dNaN;
      } else if (this.layer === 0) {
        return _Decimal.fromComponents(this.sign, 0, Math.log(this.mag));
      } else if (this.layer === 1) {
        return _Decimal.fromComponents(Math.sign(this.mag), 0, Math.abs(this.mag) * 2.302585092994046);
      } else if (this.layer === 2) {
        return _Decimal.fromComponents(Math.sign(this.mag), 1, Math.abs(this.mag) + 0.36221568869946325);
      } else {
        return _Decimal.fromComponents(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
      }
    }
    logarithm(base) {
      return this.log(base);
    }
    pow(value) {
      const decimal = _Decimal.fromValue_noAlloc(value);
      const a = this;
      const b = decimal;
      if (a.sign === 0) {
        return b.eq(0) ? _Decimal.fromComponents_noNormalize(1, 0, 1) : a;
      }
      if (a.sign === 1 && a.layer === 0 && a.mag === 1) {
        return a;
      }
      if (b.sign === 0) {
        return _Decimal.fromComponents_noNormalize(1, 0, 1);
      }
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
        return _Decimal.dNaN;
      }
      return result;
    }
    pow10() {
      if (!Number.isFinite(this.layer) || !Number.isFinite(this.mag)) {
        return _Decimal.dNaN;
      }
      let a = this;
      if (a.layer === 0) {
        const newmag = Math.pow(10, a.sign * a.mag);
        if (Number.isFinite(newmag) && Math.abs(newmag) >= 0.1) {
          return _Decimal.fromComponents(1, 0, newmag);
        } else if (a.sign === 0) {
          return _Decimal.dOne;
        } else {
          a = _Decimal.fromComponents_noNormalize(a.sign, a.layer + 1, Math.log10(a.mag));
        }
      }
      if (a.sign > 0 && a.mag >= 0) {
        return _Decimal.fromComponents(a.sign, a.layer + 1, a.mag);
      }
      if (a.sign < 0 && a.mag >= 0) {
        return _Decimal.fromComponents(-a.sign, a.layer + 1, -a.mag);
      }
      return _Decimal.dOne;
    }
    pow_base(value) {
      return _Decimal.fromValue_noAlloc(value).pow(this);
    }
    root(value) {
      const decimal = _Decimal.fromValue_noAlloc(value);
      return this.pow(decimal.recip());
    }
    factorial() {
      if (this.mag < 0) {
        return this.add(1).gamma();
      } else if (this.layer === 0) {
        return this.add(1).gamma();
      } else if (this.layer === 1) {
        return _Decimal.exp(_Decimal.mul(this, _Decimal.ln(this).sub(1)));
      } else {
        return _Decimal.exp(this);
      }
    }
    // from HyperCalc source code
    gamma() {
      if (this.mag < 0) {
        return this.recip();
      } else if (this.layer === 0) {
        if (this.lt(_Decimal.fromComponents_noNormalize(1, 0, 24))) {
          return _Decimal.fromNumber(f_gamma(this.sign * this.mag));
        }
        const t = this.mag - 1;
        let l = 0.9189385332046727;
        l = l + (t + 0.5) * Math.log(t);
        l = l - t;
        const n2 = t * t;
        let np = t;
        let lm = 12 * np;
        let adj = 1 / lm;
        let l2 = l + adj;
        if (l2 === l) {
          return _Decimal.exp(l);
        }
        l = l2;
        np = np * n2;
        lm = 360 * np;
        adj = 1 / lm;
        l2 = l - adj;
        if (l2 === l) {
          return _Decimal.exp(l);
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
        return _Decimal.exp(l);
      } else if (this.layer === 1) {
        return _Decimal.exp(_Decimal.mul(this, _Decimal.ln(this).sub(1)));
      } else {
        return _Decimal.exp(this);
      }
    }
    lngamma() {
      return this.gamma().ln();
    }
    exp() {
      if (this.mag < 0) {
        return _Decimal.dOne;
      }
      if (this.layer === 0 && this.mag <= 709.7) {
        return _Decimal.fromNumber(Math.exp(this.sign * this.mag));
      } else if (this.layer === 0) {
        return _Decimal.fromComponents(1, 1, this.sign * Math.log10(Math.E) * this.mag);
      } else if (this.layer === 1) {
        return _Decimal.fromComponents(1, 2, this.sign * (Math.log10(0.4342944819032518) + this.mag));
      } else {
        return _Decimal.fromComponents(1, this.layer + 1, this.sign * this.mag);
      }
    }
    sqr() {
      return this.pow(2);
    }
    sqrt() {
      if (this.layer === 0) {
        return _Decimal.fromNumber(Math.sqrt(this.sign * this.mag));
      } else if (this.layer === 1) {
        return _Decimal.fromComponents(1, 2, Math.log10(this.mag) - 0.3010299956639812);
      } else {
        const result = _Decimal.div(_Decimal.fromComponents_noNormalize(this.sign, this.layer - 1, this.mag), _Decimal.fromComponents_noNormalize(1, 0, 2));
        result.layer += 1;
        result.normalize();
        return result;
      }
    }
    cube() {
      return this.pow(3);
    }
    cbrt() {
      return this.pow(1 / 3);
    }
    // Tetration/tetrate: The result of exponentiating 'this' to 'this' 'height' times in a row.  https://en.wikipedia.org/wiki/Tetration
    // If payload != 1, then this is 'iterated exponentiation', the result of exping (payload) to base (this) (height) times. https://andydude.github.io/tetration/archives/tetration2/ident.html
    // Works with negative and positive real heights.
    tetrate(height = 2, payload = _Decimal.fromComponents_noNormalize(1, 0, 1)) {
      if (height === 1) {
        return _Decimal.pow(this, payload);
      }
      if (height === 0) {
        return new _Decimal(payload);
      }
      if (this.eq(_Decimal.dOne)) {
        return _Decimal.dOne;
      }
      if (this.eq(-1)) {
        return _Decimal.pow(this, payload);
      }
      if (height === Number.POSITIVE_INFINITY) {
        const this_num = this.toNumber();
        if (this_num <= 1.444667861009766 && this_num >= 0.06598803584531254) {
          if (this_num > 1.444667861009099) {
            return _Decimal.fromNumber(Math.E);
          }
          const negln = _Decimal.ln(this).neg();
          return negln.lambertw().div(negln);
        } else if (this_num > 1.444667861009766) {
          return _Decimal.fromNumber(Number.POSITIVE_INFINITY);
        } else {
          return _Decimal.dNaN;
        }
      }
      if (this.eq(_Decimal.dZero)) {
        let result = Math.abs((height + 1) % 2);
        if (result > 1) {
          result = 2 - result;
        }
        return _Decimal.fromNumber(result);
      }
      if (height < 0) {
        return _Decimal.iteratedlog(payload, this, -height);
      }
      payload = _Decimal.fromValue_noAlloc(payload);
      const oldheight = height;
      height = Math.trunc(height);
      const fracheight = oldheight - height;
      if (this.gt(_Decimal.dZero) && this.lte(1.444667861009766)) {
        height = Math.min(1e4, height);
        for (let i = 0; i < height; ++i) {
          const old_payload = payload;
          payload = this.pow(payload);
          if (old_payload.eq(payload)) {
            return payload;
          }
        }
        if (fracheight != 0) {
          const next_payload = this.pow(payload);
          return payload.mul(1 - fracheight).add(next_payload.mul(fracheight));
        }
        return payload;
      }
      if (fracheight !== 0) {
        if (payload.eq(_Decimal.dOne)) {
          if (this.gt(10)) {
            payload = this.pow(fracheight);
          } else {
            payload = _Decimal.fromNumber(_Decimal.tetrate_critical(this.toNumber(), fracheight));
            if (this.lt(2)) {
              payload = payload.sub(1).mul(this.minus(1)).plus(1);
            }
          }
        } else if (this.eq(10)) {
          payload = payload.layeradd10(fracheight);
        } else {
          payload = payload.layeradd(fracheight, this);
        }
      }
      for (let i = 0; i < height; ++i) {
        payload = this.pow(payload);
        if (!isFinite(payload.layer) || !isFinite(payload.mag)) {
          return payload.normalize();
        }
        if (payload.layer - this.layer > 3) {
          return _Decimal.fromComponents_noNormalize(payload.sign, payload.layer + (height - i - 1), payload.mag);
        }
        if (i > 1e4) {
          return payload;
        }
      }
      return payload;
    }
    // iteratedexp/iterated exponentiation: - all cases handled in tetrate, so just call it
    iteratedexp(height = 2, payload = _Decimal.fromComponents_noNormalize(1, 0, 1)) {
      return this.tetrate(height, payload);
    }
    // iterated log/repeated log: The result of applying log(base) 'times' times in a row. Approximately equal to subtracting (times) from the number's slog representation. Equivalent to tetrating to a negative height.
    // Works with negative and positive real heights.
    iteratedlog(base = 10, times = 1) {
      if (times < 0) {
        return _Decimal.tetrate(base, -times, this);
      }
      base = _Decimal.fromValue_noAlloc(base);
      let result = _Decimal.fromDecimal(this);
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
        if (!isFinite(result.layer) || !isFinite(result.mag)) {
          return result.normalize();
        }
        if (i > 1e4) {
          return result;
        }
      }
      if (fraction > 0 && fraction < 1) {
        if (base.eq(10)) {
          result = result.layeradd10(-fraction);
        } else {
          result = result.layeradd(-fraction, base);
        }
      }
      return result;
    }
    // Super-logarithm, one of tetration's inverses, tells you what size power tower you'd have to tetrate base to to get number. By definition, will never be higher than 1.8e308 in break_eternity.js, since a power tower 1.8e308 numbers tall is the largest representable number.
    // https://en.wikipedia.org/wiki/Super-logarithm
    // NEW: Accept a number of iterations, and use binary search to, after making an initial guess, hone in on the true value, assuming tetration as the ground truth.
    slog(base = 10, iterations = 100) {
      let step_size = 1e-3;
      let has_changed_directions_once = false;
      let previously_rose = false;
      let result = this.slog_internal(base).toNumber();
      for (let i = 1; i < iterations; ++i) {
        const new_decimal = new _Decimal(base).tetrate(result);
        const currently_rose = new_decimal.gt(this);
        if (i > 1) {
          if (previously_rose != currently_rose) {
            has_changed_directions_once = true;
          }
        }
        previously_rose = currently_rose;
        if (has_changed_directions_once) {
          step_size /= 2;
        } else {
          step_size *= 2;
        }
        step_size = Math.abs(step_size) * (currently_rose ? -1 : 1);
        result += step_size;
        if (step_size === 0) {
          break;
        }
      }
      return _Decimal.fromNumber(result);
    }
    slog_internal(base = 10) {
      base = _Decimal.fromValue_noAlloc(base);
      if (base.lte(_Decimal.dZero)) {
        return _Decimal.dNaN;
      }
      if (base.eq(_Decimal.dOne)) {
        return _Decimal.dNaN;
      }
      if (base.lt(_Decimal.dOne)) {
        if (this.eq(_Decimal.dOne)) {
          return _Decimal.dZero;
        }
        if (this.eq(_Decimal.dZero)) {
          return _Decimal.dNegOne;
        }
        return _Decimal.dNaN;
      }
      if (this.mag < 0 || this.eq(_Decimal.dZero)) {
        return _Decimal.dNegOne;
      }
      let result = 0;
      let copy = _Decimal.fromDecimal(this);
      if (copy.layer - base.layer > 3) {
        const layerloss = copy.layer - base.layer - 3;
        result += layerloss;
        copy.layer -= layerloss;
      }
      for (let i = 0; i < 100; ++i) {
        if (copy.lt(_Decimal.dZero)) {
          copy = _Decimal.pow(base, copy);
          result -= 1;
        } else if (copy.lte(_Decimal.dOne)) {
          return _Decimal.fromNumber(result + _Decimal.slog_critical(base.toNumber(), copy.toNumber()));
        } else {
          result += 1;
          copy = _Decimal.log(copy, base);
        }
      }
      return _Decimal.fromNumber(result);
    }
    // background info and tables of values for critical functions taken here: https://github.com/Patashu/break_eternity.js/issues/22
    static slog_critical(base, height) {
      if (base > 10) {
        return height - 1;
      }
      return _Decimal.critical_section(base, height, critical_slog_values);
    }
    static tetrate_critical(base, height) {
      return _Decimal.critical_section(base, height, critical_tetr_values);
    }
    static critical_section(base, height, grid2) {
      height *= 10;
      if (height < 0) {
        height = 0;
      }
      if (height > 10) {
        height = 10;
      }
      if (base < 2) {
        base = 2;
      }
      if (base > 10) {
        base = 10;
      }
      let lower = 0;
      let upper = 0;
      for (let i = 0; i < critical_headers.length; ++i) {
        if (critical_headers[i] == base) {
          lower = grid2[i][Math.floor(height)];
          upper = grid2[i][Math.ceil(height)];
          break;
        } else if (critical_headers[i] < base && critical_headers[i + 1] > base) {
          const basefrac = (base - critical_headers[i]) / (critical_headers[i + 1] - critical_headers[i]);
          lower = grid2[i][Math.floor(height)] * (1 - basefrac) + grid2[i + 1][Math.floor(height)] * basefrac;
          upper = grid2[i][Math.ceil(height)] * (1 - basefrac) + grid2[i + 1][Math.ceil(height)] * basefrac;
          break;
        }
      }
      const frac = height - Math.floor(height);
      if (lower <= 0 || upper <= 0) {
        return lower * (1 - frac) + upper * frac;
      } else {
        return Math.pow(base, Math.log(lower) / Math.log(base) * (1 - frac) + Math.log(upper) / Math.log(base) * frac);
      }
    }
    // Function for adding/removing layers from a Decimal, even fractional layers (e.g. its slog10 representation).
    // Moved this over to use the same critical section as tetrate/slog.
    layeradd10(diff) {
      diff = _Decimal.fromValue_noAlloc(diff).toNumber();
      const result = _Decimal.fromDecimal(this);
      if (diff >= 1) {
        if (result.mag < 0 && result.layer > 0) {
          result.sign = 0;
          result.mag = 0;
          result.layer = 0;
        } else if (result.sign === -1 && result.layer == 0) {
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
              if (result.sign === 0) {
                result.sign = 1;
              }
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
      if (result.sign === 0) {
        result.sign = 1;
        if (result.mag === 0 && result.layer >= 1) {
          result.layer -= 1;
          result.mag = 1;
        }
      }
      result.normalize();
      if (diff !== 0) {
        return result.layeradd(diff, 10);
      }
      return result;
    }
    // layeradd: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 'base' and iterated log base 'base'.
    layeradd(diff, base) {
      const slogthis = this.slog(base).toNumber();
      const slogdest = slogthis + diff;
      if (slogdest >= 0) {
        return _Decimal.tetrate(base, slogdest);
      } else if (!Number.isFinite(slogdest)) {
        return _Decimal.dNaN;
      } else if (slogdest >= -1) {
        return _Decimal.log(_Decimal.tetrate(base, slogdest + 1), base);
      } else {
        return _Decimal.log(_Decimal.log(_Decimal.tetrate(base, slogdest + 2), base), base);
      }
    }
    // The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
    // https://en.wikipedia.org/wiki/Lambert_W_function
    // Some special values, for testing: https://en.wikipedia.org/wiki/Lambert_W_function#Special_values
    lambertw() {
      if (this.lt(-0.3678794411710499)) {
        throw Error("lambertw is unimplemented for results less than -1, sorry!");
      } else if (this.mag < 0) {
        return _Decimal.fromNumber(f_lambertw(this.toNumber()));
      } else if (this.layer === 0) {
        return _Decimal.fromNumber(f_lambertw(this.sign * this.mag));
      } else if (this.layer === 1) {
        return d_lambertw(this);
      } else if (this.layer === 2) {
        return d_lambertw(this);
      }
      if (this.layer >= 3) {
        return _Decimal.fromComponents_noNormalize(this.sign, this.layer - 1, this.mag);
      }
      throw "Unhandled behavior in lambertw()";
    }
    // The super square-root function - what number, tetrated to height 2, equals this?
    // Other sroots are possible to calculate probably through guess and check methods, this one is easy though.
    // https://en.wikipedia.org/wiki/Tetration#Super-root
    ssqrt() {
      if (this.sign == 1 && this.layer >= 3) {
        return _Decimal.fromComponents_noNormalize(this.sign, this.layer - 1, this.mag);
      }
      const lnx = this.ln();
      return lnx.div(lnx.lambertw());
    }
    // Pentation/pentate: The result of tetrating 'height' times in a row. An absurdly strong operator - Decimal.pentate(2, 4.28) and Decimal.pentate(10, 2.37) are already too huge for break_eternity.js!
    // https://en.wikipedia.org/wiki/Pentation
    pentate(height = 2, payload = _Decimal.fromComponents_noNormalize(1, 0, 1)) {
      payload = _Decimal.fromValue_noAlloc(payload);
      const oldheight = height;
      height = Math.trunc(height);
      const fracheight = oldheight - height;
      if (fracheight !== 0) {
        if (payload.eq(_Decimal.dOne)) {
          ++height;
          payload = _Decimal.fromNumber(fracheight);
        } else if (this.eq(10)) {
          payload = payload.layeradd10(fracheight);
        } else {
          payload = payload.layeradd(fracheight, this);
        }
      }
      for (let i = 0; i < height; ++i) {
        payload = this.tetrate(payload.toNumber());
        if (!isFinite(payload.layer) || !isFinite(payload.mag)) {
          return payload.normalize();
        }
        if (i > 10) {
          return payload;
        }
      }
      return payload;
    }
    // trig functions!
    sin() {
      if (this.mag < 0) {
        return this;
      }
      if (this.layer === 0) {
        return _Decimal.fromNumber(Math.sin(this.sign * this.mag));
      }
      return _Decimal.fromComponents_noNormalize(0, 0, 0);
    }
    cos() {
      if (this.mag < 0) {
        return _Decimal.dOne;
      }
      if (this.layer === 0) {
        return _Decimal.fromNumber(Math.cos(this.sign * this.mag));
      }
      return _Decimal.fromComponents_noNormalize(0, 0, 0);
    }
    tan() {
      if (this.mag < 0) {
        return this;
      }
      if (this.layer === 0) {
        return _Decimal.fromNumber(Math.tan(this.sign * this.mag));
      }
      return _Decimal.fromComponents_noNormalize(0, 0, 0);
    }
    asin() {
      if (this.mag < 0) {
        return this;
      }
      if (this.layer === 0) {
        return _Decimal.fromNumber(Math.asin(this.sign * this.mag));
      }
      return _Decimal.fromComponents_noNormalize(Number.NaN, Number.NaN, Number.NaN);
    }
    acos() {
      if (this.mag < 0) {
        return _Decimal.fromNumber(Math.acos(this.toNumber()));
      }
      if (this.layer === 0) {
        return _Decimal.fromNumber(Math.acos(this.sign * this.mag));
      }
      return _Decimal.fromComponents_noNormalize(Number.NaN, Number.NaN, Number.NaN);
    }
    atan() {
      if (this.mag < 0) {
        return this;
      }
      if (this.layer === 0) {
        return _Decimal.fromNumber(Math.atan(this.sign * this.mag));
      }
      return _Decimal.fromNumber(Math.atan(this.sign * Infinity));
    }
    sinh() {
      return this.exp().sub(this.negate().exp()).div(2);
    }
    cosh() {
      return this.exp().add(this.negate().exp()).div(2);
    }
    tanh() {
      return this.sinh().div(this.cosh());
    }
    asinh() {
      return _Decimal.ln(this.add(this.sqr().add(1).sqrt()));
    }
    acosh() {
      return _Decimal.ln(this.add(this.sqr().sub(1).sqrt()));
    }
    atanh() {
      if (this.abs().gte(1)) {
        return _Decimal.fromComponents_noNormalize(Number.NaN, Number.NaN, Number.NaN);
      }
      return _Decimal.ln(this.add(1).div(_Decimal.fromNumber(1).sub(this))).div(2);
    }
    /**
    * Joke function from Realm Grinder
    */
    ascensionPenalty(ascensions) {
      if (ascensions === 0) {
        return this;
      }
      return this.root(_Decimal.pow(10, ascensions));
    }
    /**
    * Joke function from Cookie Clicker. It's 'egg'
    */
    egg() {
      return this.add(9);
    }
    lessThanOrEqualTo(other) {
      return this.cmp(other) < 1;
    }
    lessThan(other) {
      return this.cmp(other) < 0;
    }
    greaterThanOrEqualTo(other) {
      return this.cmp(other) > -1;
    }
    greaterThan(other) {
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
    static smoothDamp(current, target, smoothing, deltaTime) {
      return new _Decimal(current).add(new _Decimal(target).minus(new _Decimal(current)).times(new _Decimal(smoothing)).times(new _Decimal(deltaTime)));
    }
    /**
    * Formats the E instance with a specified accuracy and maximum decimal places.
    *
    * @function
    * @name format
    * @param {number} [acc=2] - The desired accuracy (number of significant figures).
    * @param {number} [max=9] - The maximum number of decimal places to display.
    * @returns {string} A string representing the formatted E value.
    */
    static format(e, acc = 2, max = 9) {
      return format(new _Decimal(e), acc, max);
    }
    // === //
    /**
     * Creates a clone of the E instance.
     *
     * @function
     * @name clone
     * @returns {Decimal} A EClone instance that is a clone of the original.
     */
    clone() {
      return this;
    }
    /**
     * Performs modular arithmetic on the DecimalClone instance.
     *
     * @function
     * @name modular
     * @alias mod
     * @param {DecimalSource} other - The number or DecimalClone instance to use for modular arithmetic.
     * @returns {Decimal} A EClone instance representing the result of the modular operation.
     */
    mod(other) {
      const other1 = new _Decimal(other);
      if (other1.eq(0))
        return new _Decimal(0);
      if (this.sign * other1.sign == -1)
        return this.abs().mod(other1.abs()).neg();
      if (this.sign == -1)
        return this.abs().mod(other1.abs());
      return this.sub(this.div(other1).floor().mul(other1));
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
    softcap(start, power, mode) {
      let x = this.clone();
      if (x.gte(start)) {
        if ([0, "pow"].includes(mode))
          x = x.div(start).pow(power).mul(start);
        if ([1, "mul"].includes(mode))
          x = x.sub(start).div(power).add(start);
      }
      return x;
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
    scale(s, p, mode, rev = false) {
      s = new _Decimal(s);
      p = new _Decimal(p);
      let x = this.clone();
      if (x.gte(s)) {
        if ([0, "pow"].includes(mode))
          x = rev ? x.mul(s.pow(p.sub(1))).root(p) : x.pow(p).div(s.pow(p.sub(1)));
        if ([1, "exp"].includes(mode))
          x = rev ? x.div(s).max(1).log(p).add(s) : _Decimal.pow(p, x.sub(s)).mul(s);
      }
      return x;
    }
    /**
     * Formats the E instance with a specified accuracy and maximum decimal places.
     *
     * @function
     * @name format
     * @param {number} [acc=2] - The desired accuracy (number of significant figures).
     * @param {number} [max=9] - The maximum number of decimal places to display.
     * @returns {string} A string representing the formatted E value.
     */
    format(acc = 2, max = 9) {
      return format(this.clone(), acc, max);
    }
    /**
     * Formats the E instance in standard leter notation with a specified accuracy and maximum decimal places.
     *
     * @function
     * @name formatST
     * @param {number} [acc=2] - The desired accuracy (number of significant figures).
     * @param {number} [max=9] - The maximum number of decimal places to display.
     * @param {string} [type="st"] - The type of format (default standard)
     * @returns {string} A string representing the formatted E value.
     */
    formatST(acc = 2, max = 9, type = "st") {
      return format(this.clone(), acc, max, type);
    }
    /**
     * Formats the gain rate using the E instance.
     *
     * @function
     * @name formatGain
     * @param {DecimalSource} gain - The gain value to compare
     * @param {boolean} [mass=false] - Indicates whether the gain represents a mass value.
     * @returns {string} A string representing the formatted gain
     *
     * @example
     * const currency = new Decimal(100);
     * const currencyGain = new Decimal(12);
     * const formatted = currency.formatGain(currencyGain);
     * console.log(formatted); // should return "(+12/sec)"
     */
    formatGain(gain) {
      return formatGain(this.clone(), gain);
    }
    /**
     * Converts the E instance to a Roman numeral representation.
     *
     * @function
     * @name toRoman
     * @param {number|Decimal} [max=5000] - Max before it returns the original
     * @returns {string|Decimal} A string representing the Roman numeral equivalent of the E value,
     * or the original E instance if it is greater than or equal to 5000.
     */
    toRoman(max) {
      max = max ? new _Decimal(max) : 5e3;
      const num = this.clone();
      if (num.gte(max))
        return num;
      const newNum = num.toNumber();
      const digits = String(+newNum).split("");
      const key = [
        "",
        "C",
        "CC",
        "CCC",
        "CD",
        "D",
        "DC",
        "DCC",
        "DCCC",
        "CM",
        "",
        "X",
        "XX",
        "XXX",
        "XL",
        "L",
        "LX",
        "LXX",
        "LXXX",
        "XC",
        "",
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX"
      ];
      let roman = "", i = 3;
      if (typeof digits.pop() !== "undefined") {
        while (i--) {
          roman = (key[+digits.pop() + i * 10] || "") + roman;
        }
        return Array(+digits.join("") + 1).join("M") + roman;
      } else {
        return "";
      }
    }
  };
  var ST_NAMES = [
    [
      ["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"],
      ["", "Dc", "Vg", "Tg", "Qag", "Qtg", "Sxg", "Spg", "Ocg", "Nog"],
      ["", "Ce", "De", "Te", "Qae", "Qte", "Sxe", "Spe", "Oce", "Noe"]
    ],
    [
      ["", "Mi", "Mc", "Na", "Pc", "Fm", "At", "Zp", "Yc", "Xn"],
      ["", "Me", "Du", "Tr", "Te", "Pe", "He", "Hp", "Ot", "En"],
      ["", "c", "Ic", "TCn", "TeC", "PCn", "HCn", "HpC", "OCn", "ECn"],
      ["", "Hc", "DHe", "THt", "TeH", "PHc", "HHe", "HpH", "OHt", "EHc"]
    ]
  ];
  var FORMATS = {
    omega: {
      config: {
        greek: "\u03B2\u03B6\u03BB\u03C8\u03A3\u0398\u03A8\u03C9",
        infinity: "\u03A9"
      },
      format(value) {
        const step = Decimal.floor(value.div(1e3));
        const omegaAmount = Decimal.floor(step.div(this.config.greek.length));
        let lastLetter = this.config.greek[step.toNumber() % this.config.greek.length] + toSubscript(value.toNumber() % 1e3);
        const beyondGreekArrayBounds = this.config.greek[step.toNumber() % this.config.greek.length] === void 0;
        if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
          lastLetter = "\u03C9";
        }
        const omegaOrder = Decimal.log(value, 8e3).toNumber();
        if (omegaAmount.equals(0)) {
          return lastLetter;
        } else if (omegaAmount.gt(0) && omegaAmount.lte(3)) {
          const omegas = [];
          for (let i = 0; i < omegaAmount.toNumber(); i++) {
            omegas.push("\u03C9");
          }
          return `${omegas.join("^")}^${lastLetter}`;
        } else if (omegaAmount.gt(3) && omegaAmount.lt(10)) {
          return `\u03C9(${omegaAmount.toFixed(0)})^${lastLetter}`;
        } else if (omegaOrder < 3) {
          return `\u03C9(${this.format(omegaAmount)})^${lastLetter}`;
        } else if (omegaOrder < 6) {
          return `\u03C9(${this.format(omegaAmount)})`;
        }
        const val = Decimal.pow(8e3, omegaOrder % 1);
        const orderStr = omegaOrder < 100 ? Math.floor(omegaOrder).toFixed(0) : this.format(Decimal.floor(omegaOrder));
        return `\u03C9[${orderStr}](${this.format(val)})`;
      }
    },
    omega_short: {
      config: {
        greek: "\u03B2\u03B6\u03BB\u03C8\u03A3\u0398\u03A8\u03C9",
        infinity: "\u03A9"
      },
      format(value) {
        const step = Decimal.floor(value.div(1e3));
        const omegaAmount = Decimal.floor(step.div(this.config.greek.length));
        let lastLetter = this.config.greek[step.toNumber() % this.config.greek.length] + toSubscript(value.toNumber() % 1e3);
        const beyondGreekArrayBounds = this.config.greek[step.toNumber() % this.config.greek.length] === void 0;
        if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
          lastLetter = "\u03C9";
        }
        const omegaOrder = Decimal.log(value, 8e3).toNumber();
        if (omegaAmount.equals(0)) {
          return lastLetter;
        } else if (omegaAmount.gt(0) && omegaAmount.lte(2)) {
          const omegas = [];
          for (let i = 0; i < omegaAmount.toNumber(); i++) {
            omegas.push("\u03C9");
          }
          return `${omegas.join("^")}^${lastLetter}`;
        } else if (omegaAmount.gt(2) && omegaAmount.lt(10)) {
          return `\u03C9(${omegaAmount.toFixed(0)})^${lastLetter}`;
        }
        const val = Decimal.pow(8e3, omegaOrder % 1);
        const orderStr = omegaOrder < 100 ? Math.floor(omegaOrder).toFixed(0) : this.format(Decimal.floor(omegaOrder));
        return `\u03C9[${orderStr}](${this.format(val)})`;
      }
    },
    elemental: {
      config: {
        element_lists: [
          ["H"],
          ["He", "Li", "Be", "B", "C", "N", "O", "F"],
          ["Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl"],
          [
            "Ar",
            "K",
            "Ca",
            "Sc",
            "Ti",
            "V",
            "Cr",
            "Mn",
            "Fe",
            "Co",
            "Ni",
            "Cu",
            "Zn",
            "Ga",
            "Ge",
            "As",
            "Se",
            "Br"
          ],
          [
            "Kr",
            "Rb",
            "Sr",
            "Y",
            "Zr",
            "Nb",
            "Mo",
            "Tc",
            "Ru",
            "Rh",
            "Pd",
            "Ag",
            "Cd",
            "In",
            "Sn",
            "Sb",
            "Te",
            "I"
          ],
          [
            "Xe",
            "Cs",
            "Ba",
            "La",
            "Ce",
            "Pr",
            "Nd",
            "Pm",
            "Sm",
            "Eu",
            "Gd",
            "Tb",
            "Dy",
            "Ho",
            "Er",
            "Tm",
            "Yb",
            "Lu",
            "Hf",
            "Ta",
            "W",
            "Re",
            "Os",
            "Ir",
            "Pt",
            "Au",
            "Hg",
            "Tl",
            "Pb",
            "Bi",
            "Po",
            "At"
          ],
          [
            "Rn",
            "Fr",
            "Ra",
            "Ac",
            "Th",
            "Pa",
            "U",
            "Np",
            "Pu",
            "Am",
            "Cm",
            "Bk",
            "Cf",
            "Es",
            "Fm",
            "Md",
            "No",
            "Lr",
            "Rf",
            "Db",
            "Sg",
            "Bh",
            "Hs",
            "Mt",
            "Ds",
            "Rg",
            "Cn",
            "Nh",
            "Fl",
            "Mc",
            "Lv",
            "Ts"
          ],
          ["Og"]
        ]
      },
      getOffset(group) {
        if (group == 1)
          return 1;
        const n = Math.floor(group / 2);
        let r = 2 * n * (n + 1) * (2 * n + 1) / 3 - 2;
        if (group % 2 == 1)
          r += 2 * Math.pow(n + 1, 2);
        return r;
      },
      getAbbreviation(group, progress) {
        const length = this.abbreviationLength(group);
        const elemRel = Math.floor(length * progress);
        const elem = elemRel + this.getOffset(group);
        return elem > 118 ? this.beyondOg(elem) : this.config.element_lists[group - 1][elemRel];
      },
      beyondOg(x) {
        const log = Math.floor(Math.log10(x));
        const list = ["n", "u", "b", "t", "q", "p", "h", "s", "o", "e"];
        let r = "";
        for (let i = log; i >= 0; i--) {
          const n = Math.floor(x / Math.pow(10, i)) % 10;
          if (r == "")
            r = list[n].toUpperCase();
          else
            r += list[n];
        }
        return r;
      },
      abbreviationLength(group) {
        return group == 1 ? 1 : Math.pow(Math.floor(group / 2) + 1, 2) * 2;
      },
      getAbbreviationAndValue(x) {
        const abbreviationListUnfloored = x.log(118).toNumber();
        const abbreviationListIndex = Math.floor(abbreviationListUnfloored) + 1;
        const abbreviationLength = this.abbreviationLength(abbreviationListIndex);
        const abbreviationProgress = abbreviationListUnfloored - abbreviationListIndex + 1;
        const abbreviationIndex = Math.floor(abbreviationProgress * abbreviationLength);
        const abbreviation = this.getAbbreviation(abbreviationListIndex, abbreviationProgress);
        const value = new Decimal(118).pow(abbreviationListIndex + abbreviationIndex / abbreviationLength - 1);
        return [abbreviation, value];
      },
      formatElementalPart(abbreviation, n) {
        if (n.eq(1)) {
          return abbreviation;
        }
        return `${n} ${abbreviation}`;
      },
      format(value, acc) {
        if (value.gt(new Decimal(118).pow(new Decimal(118).pow(new Decimal(118).pow(4)))))
          return "e" + this.format(value.log10(), acc);
        let log = value.log(118);
        const slog = log.log(118);
        const sslog = slog.log(118).toNumber();
        const max = Math.max(4 - sslog * 2, 1);
        const parts = [];
        while (log.gte(1) && parts.length < max) {
          const [abbreviation, value2] = this.getAbbreviationAndValue(log);
          const n = log.div(value2).floor();
          log = log.sub(n.mul(value2));
          parts.unshift([abbreviation, n]);
        }
        if (parts.length >= max) {
          return parts.map((x) => this.formatElementalPart(x[0], x[1])).join(" + ");
        }
        const formattedMantissa = new Decimal(118).pow(log).toFixed(parts.length === 1 ? 3 : acc);
        if (parts.length === 0) {
          return formattedMantissa;
        }
        if (parts.length === 1) {
          return `${formattedMantissa} \xD7 ${this.formatElementalPart(parts[0][0], parts[0][1])}`;
        }
        return `${formattedMantissa} \xD7 (${parts.map((x) => this.formatElementalPart(x[0], x[1])).join(" + ")})`;
      }
    },
    old_sc: {
      format(ex, acc) {
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
            return (slog.gte(1e9) ? "" : new Decimal(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + this.format(slog.floor(), 0);
          }
          const m = ex.div(new Decimal(10).pow(e));
          return (e.log10().gte(9) ? "" : m.toFixed(4)) + "e" + this.format(e, 0);
        }
      }
    },
    eng: {
      format(ex, acc) {
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
            return (slog.gte(1e9) ? "" : new Decimal(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + this.format(slog.floor(), 0);
          }
          const m = ex.div(new Decimal(1e3).pow(e.div(3).floor()));
          return (e.log10().gte(9) ? "" : m.toFixed(new Decimal(4).sub(e.sub(e.div(3).floor().mul(3))))) + "e" + this.format(e.div(3).floor().mul(3), 0);
        }
      }
    },
    mixed_sc: {
      format(ex, acc, max) {
        ex = new Decimal(ex);
        const e = ex.log10().floor();
        if (e.lt(303) && e.gte(max))
          return format(ex, acc, max, "st");
        else
          return format(ex, acc, max, "sc");
      }
    },
    layer: {
      layers: ["infinity", "eternity", "reality", "equality", "affinity", "celerity", "identity", "vitality", "immunity", "atrocity"],
      format(ex, acc, max) {
        ex = new Decimal(ex);
        const layer = ex.max(1).log10().max(1).log(INFINITY_NUM.log10()).floor();
        if (layer.lte(0))
          return format(ex, acc, max, "sc");
        ex = new Decimal(10).pow(ex.max(1).log10().div(INFINITY_NUM.log10().pow(layer)).sub(layer.gte(1) ? 1 : 0));
        const meta = layer.div(10).floor();
        const layer_id = layer.toNumber() % 10 - 1;
        return format(ex, Math.max(4, acc), max, "sc") + " " + (meta.gte(1) ? "meta" + (meta.gte(2) ? "^" + format(meta, 0, max, "sc") : "") + "-" : "") + (isNaN(layer_id) ? "nanity" : this.layers[layer_id]);
      }
    },
    standard: {
      tier1(x) {
        return ST_NAMES[0][0][x % 10] + ST_NAMES[0][1][Math.floor(x / 10) % 10] + ST_NAMES[0][2][Math.floor(x / 100)];
      },
      tier2(x) {
        const o = x % 10;
        const t = Math.floor(x / 10) % 10;
        const h = Math.floor(x / 100) % 10;
        let r = "";
        if (x < 10)
          return ST_NAMES[1][0][x];
        if (t == 1 && o == 0)
          r += "Vec";
        else
          r += ST_NAMES[1][1][o] + ST_NAMES[1][2][t];
        r += ST_NAMES[1][3][h];
        return r;
      }
    },
    inf: {
      format(ex, acc, max) {
        ex = new Decimal(ex);
        let meta = 0;
        const inf = new Decimal(Number.MAX_VALUE);
        const symbols = ["", "\u221E", "\u03A9", "\u03A8", "\u028A"];
        const symbols2 = ["", "", "m", "mm", "mmm"];
        while (ex.gte(inf)) {
          ex = ex.log(inf);
          meta++;
        }
        if (meta == 0)
          return format(ex, acc, max, "sc");
        if (ex.gte(3))
          return symbols2[meta] + symbols[meta] + "\u03C9^" + format(ex.sub(1), acc, max, "sc");
        if (ex.gte(2))
          return symbols2[meta] + "\u03C9" + symbols[meta] + "-" + format(inf.pow(ex.sub(2)), acc, max, "sc");
        return symbols2[meta] + symbols[meta] + "-" + format(inf.pow(ex.sub(1)), acc, max, "sc");
      }
    }
  };
  var INFINITY_NUM = new Decimal(2).pow(1024);
  var SUBSCRIPT_NUMBERS = "\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089";
  var SUPERSCRIPT_NUMBERS = "\u2070\xB9\xB2\xB3\u2074\u2075\u2076\u2077\u2078\u2079";
  function toSubscript(value) {
    return value.toFixed(0).split("").map((x) => x === "-" ? "\u208B" : SUBSCRIPT_NUMBERS[parseInt(x, 10)]).join("");
  }
  function toSuperscript(value) {
    return value.toFixed(0).split("").map((x) => x === "-" ? "\u208B" : SUPERSCRIPT_NUMBERS[parseInt(x, 10)]).join("");
  }
  function formatST(ex, acc = 2, max = 9, type = "st") {
    return format(ex, acc, max, type);
  }
  function format(ex, acc = 2, max = 9, type = "mixed_sc") {
    ex = new Decimal(ex);
    const neg = ex.lt(0) ? "-" : "";
    if (ex.mag == Infinity)
      return neg + "Infinity";
    if (Number.isNaN(ex.mag))
      return neg + "NaN";
    if (ex.lt(0))
      ex = ex.mul(-1);
    if (ex.eq(0))
      return ex.toFixed(acc);
    const e = ex.log10().floor();
    switch (type) {
      case "sc":
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
      case "st": {
        let e3 = ex.log(1e3).floor();
        if (e3.lt(1)) {
          return neg + ex.toFixed(Math.max(Math.min(acc - e.toNumber(), acc), 0));
        } else {
          const e3_mul = e3.mul(3);
          const ee = e3.log10().floor();
          if (ee.gte(3e3))
            return "e" + format(e, acc, max, "st");
          let final = "";
          if (e3.lt(4))
            final = ["", "K", "M", "B"][Math.round(e3.toNumber())];
          else {
            let ee3 = Math.floor(e3.log(1e3).toNumber());
            if (ee3 < 100)
              ee3 = Math.max(ee3 - 1, 0);
            e3 = e3.sub(1).div(new Decimal(10).pow(ee3 * 3));
            while (e3.gt(0)) {
              const div1000 = e3.div(1e3).floor();
              const mod1000 = e3.sub(div1000.mul(1e3)).floor().toNumber();
              if (mod1000 > 0) {
                if (mod1000 == 1 && !ee3)
                  final = "U";
                if (ee3)
                  final = FORMATS.standard.tier2(ee3) + (final ? "-" + final : "");
                if (mod1000 > 1)
                  final = FORMATS.standard.tier1(mod1000) + final;
              }
              e3 = div1000;
              ee3++;
            }
          }
          const m = ex.div(new Decimal(10).pow(e3_mul));
          return neg + (ee.gte(10) ? "" : m.toFixed(new Decimal(2).sub(e.sub(e3_mul)).add(1).toNumber()) + " ") + final;
        }
      }
      default:
        return neg + FORMATS[type].format(ex, acc, max);
    }
  }
  function formatGain(amt, gain) {
    amt = new Decimal(amt);
    gain = new Decimal(gain);
    const next = amt.add(gain);
    let rate;
    let ooms = next.div(amt);
    if (ooms.gte(10) && amt.gte(1e100)) {
      ooms = ooms.log10().mul(20);
      rate = "(+" + format(ooms) + " OoMs/sec)";
    } else
      rate = "(+" + format(gain) + "/sec)";
    return rate;
  }
  function formatTime(ex, acc = 2, type = "s") {
    ex = new Decimal(ex);
    if (ex.gte(86400))
      return format(ex.div(86400).floor(), 0, 12, "sc") + ":" + formatTime(ex.mod(86400), acc, "d");
    if (ex.gte(3600) || type == "d")
      return (ex.div(3600).gte(10) || type != "d" ? "" : "0") + format(ex.div(3600).floor(), 0, 12, "sc") + ":" + formatTime(ex.mod(3600), acc, "h");
    if (ex.gte(60) || type == "h")
      return (ex.div(60).gte(10) || type != "h" ? "" : "0") + format(ex.div(60).floor(), 0, 12, "sc") + ":" + formatTime(ex.mod(60), acc, "m");
    return (ex.gte(10) || type != "m" ? "" : "0") + format(ex, acc, 12, "sc");
  }
  function formatReduction(ex) {
    ex = new Decimal(ex);
    return format(new Decimal(1).sub(ex).mul(100)) + "%";
  }
  function formatPercent(ex) {
    ex = new Decimal(ex);
    return format(ex.mul(100)) + "%";
  }
  function formatMult(ex, acc = 2) {
    ex = new Decimal(ex);
    return ex.gte(1) ? "\xD7" + ex.format(acc) : "/" + ex.pow(-1).format(acc);
  }
  function expMult(a, b, base = 10) {
    return Decimal.gte(a, 10) ? Decimal.pow(base, Decimal.log(a, base).pow(b)) : new Decimal(a);
  }
  function metric(num, type) {
    num = new Decimal(num);
    const abb = [
      {
        name: "K",
        altName: "Kilo",
        value: new Decimal("1000")
      },
      {
        name: "M",
        altName: "Mega",
        value: new Decimal("1e6")
      },
      {
        name: "G",
        altName: "Giga",
        value: new Decimal("1e9")
      },
      {
        name: "T",
        altName: "Tera",
        value: new Decimal("1e12")
      },
      {
        name: "P",
        altName: "Peta",
        value: new Decimal("1e15")
      },
      {
        name: "E",
        altName: "Exa",
        value: new Decimal("1e18")
      },
      {
        name: "Z",
        altName: "Zetta",
        value: new Decimal("1e21")
      },
      {
        name: "Y",
        altName: "Yotta",
        value: new Decimal("1e24")
      },
      {
        name: "R",
        altName: "Ronna",
        value: new Decimal("1e27")
      },
      {
        name: "Q",
        altName: "Quetta",
        value: new Decimal("1e30")
      }
    ];
    let output;
    for (let i = 0; i < abb.length; i++) {
      if (num.greaterThanOrEqualTo(abb[i]["value"])) {
        if (i == abb.length - 1) {
          switch (type) {
            case 1:
              output = abb[i]["name"];
              break;
            case 2:
              output = `${num.divide(abb[i]["value"]).format()}`;
              break;
            case 3:
              output = abb[i]["altName"];
              break;
            case 0:
            default:
              output = `${num.divide(abb[i]["value"]).format()} ${abb[i]["name"]}`;
              break;
          }
        }
        continue;
      } else if (i == 0) {
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
      } else {
        switch (type) {
          case 1:
            output = abb[i - 1]["name"];
            break;
          case 2:
            output = `${num.divide(abb[i - 1]["value"]).format()}`;
            break;
          case 3:
            output = abb[i - 1]["altName"];
            break;
          case 0:
          default:
            output = `${num.divide(abb[i - 1]["value"]).format()} ${abb[i - 1]["name"]}`;
            break;
        }
      }
    }
    return output;
  }
  function ev(num, c2 = false) {
    return `${metric(num, 2)} ${metric(num, 1)}eV${c2 ? "/c^2" : ""}`;
  }
  var formats = { ...FORMATS, ...{
    toSubscript,
    toSuperscript,
    formatST,
    format,
    formatGain,
    formatTime,
    formatReduction,
    formatPercent,
    formatMult,
    expMult,
    metric,
    ev
  } };
  Decimal.formats = formats;
  var e_default = Decimal;

  // src/eMath.ts
  var E = (x) => new e_default(x);
  Object.getOwnPropertyNames(e_default).filter((b) => !Object.getOwnPropertyNames(class {
  }).includes(b)).forEach((prop) => {
    E[prop] = e_default[prop];
  });
  var eMath = {
    getFast: function(object, id) {
      object = JSON.stringify(object);
      const length = id.toString().replace(/\\/g, "").length;
      const searchIndex = object.search(id);
      let output = "";
      let offset = length + 2;
      let unclosedQdb = 0;
      let unclosedQsb = 0;
      let unclosedQib = 0;
      let unclosedB = 0;
      let unclosedCB = 0;
      function check() {
        const read = object[searchIndex + offset];
        if (object[searchIndex + offset - 1] != "\\") {
          switch (read) {
            case '"':
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
    get: function(object, id) {
      try {
        for (let i = 0; i < Object.keys(object).length; i++) {
          if (Object.keys(object)[i] == "sign")
            break;
          if (Object.keys(object)[i] == id) {
            return object[Object.keys(object)[i]];
          } else if (typeof object[Object.keys(object)[i]] == "object") {
            const output = this.get(object[Object.keys(object)[i]], id);
            if (output != null)
              return output;
          } else {
            continue;
          }
        }
        return null;
      } catch {
        return null;
      }
    }
  };

  // src/classes/boost.ts
  var boost = class {
    /**
     * Constructs a new boost manager.
     *
     * @constructor
     * @param {number} [baseEffect] - The base effect value to which boosts are applied.
     * @param {...boostsObject} boosts - An array of boost objects to initialize with.
     */
    constructor(baseEffect, boosts) {
      baseEffect = baseEffect ? E(baseEffect) : 1;
      this.boostArray = boosts ? boosts : [];
      this.baseEffect = E(baseEffect);
    }
    /**
     * Gets a boost object by its ID.
     *
     * @param {string} id - The ID of the boost to retrieve.
     * @returns {boostsObject|null} The boost object if found, or null if not found.
     */
    bGet(id) {
      let output = null;
      for (let i = 0; i < this.boostArray.length; i++) {
        if (i === this.boostArray.length)
          break;
        if (id === this.boostArray[i].id) {
          output = this.boostArray[i];
          output["index"] = i;
        }
      }
      return output;
    }
    /**
     * Removes a boost by its ID.
     *
     * @param {string} id - The ID of the boost to remove.
     */
    bRemove(id) {
      const bCheck = this.bGet(id);
      if (bCheck) {
        delete this.boostArray[bCheck.index];
      }
    }
    /**
     * Sets or updates a boost with the given parameters.
     *
     * @param {string} id - The ID of the boost.
     * @param {string} name - The name of the boost.
     * @param {string} desc - The description of the boost.
     * @param {function} value - The value of the boost (function).
     * @param {number} order - The order of the boost (higher order are go first)
     */
    bSet(id, name, desc, type, value, order) {
      const bCheck = this.bGet(id);
      if (!bCheck) {
        this.boostArray.push({ id, name, desc, type, value, order, index: this.boostArray.length });
      } else {
        this.boostArray[bCheck.index] = { id, name, desc, type, value, order, index: this.boostArray.length };
      }
    }
    /**
     * Sets or updates multiple boosts with advanced parameters.
     *
     * @param {...boostsObject} x - boost objects to set or update.
     */
    bSetAdvanced(...x) {
      for (let i = 0; i < x.length; i++) {
        const bCheck = this.bGet(x[i].id);
        if (!bCheck) {
          this.boostArray = this.boostArray.concat(x[i]);
        } else {
          console.log(i);
          this.boostArray[bCheck.index] = x[i];
        }
      }
    }
    /**
     * Calculates the cumulative effect of all boosts on the base effect.
     *
     * @param {number|E} [base=this.baseEffect] - The base effect value to calculate with.
     * @returns {E} The calculated effect after applying boosts.
     */
    calculate(base = this.baseEffect) {
      let output = E(base);
      const boosts = this.boostArray;
      boosts.sort((a, b) => a.order - b.order);
      for (let i = 0; i < boosts.length; i++) {
        output = boosts[i].value(output);
      }
      return output;
    }
  };

  // src/classes/currency.ts
  var currency = class {
    /**
     * Constructs a new currency object with an initial value of 0 and a boost.
     *
     * @constructor
     */
    constructor() {
      this.value = E(0);
      this.upgrades = [];
    }
  };
  var currencyStatic = class {
    /**
     * @constructor
     * @param {function} pointer - returns Game.classes.currency
     */
    constructor(pointer) {
      this.upgrades = [];
      this.pointer = pointer;
      this.boost = new boost(1);
    }
    /**
     * The new currency value after applying the boost.
     * @type {E}
     * @param {number|E} [dt=1000] Deltatime
     * @returns {E}
     */
    gain(dt = 1e3) {
      this.pointer().value = this.pointer().value.add(
        this.boost.calculate().mul(E(dt).div(1e3))
      );
      return this.pointer().value;
    }
    /**
     * Create new upgrades
     *
     * @typedef {Object} currencyUpgrade
     * @property {string} [id] - id
     * @property {string} [name] - name
     * @property {E} cost - The cost of the first upgrade
     * @property {function} costScaling - Scalar function for cost with param level
     * @property {E} maxLevel - Max level
     * @property {function} [effect] - Function to call after the upgrade is bought with param upgrade.level and param context
     *
     * @param {Array<currencyUpgrade>} upgrades - An array of upgrade objects.
     * @param {boolean} [runEffectInstantly] - Whether to run the effect immediately
     */
    addUpgrade(upgrades, runEffectInstantly = true) {
      const pointerAddUpgrade = (upgrades1) => {
        const upgrades2 = upgrades1.level ? { level: upgrades1.level } : { level: E(1) };
        this.pointer().upgrades.push(upgrades2);
        return upgrades1;
      };
      const upgradesDefault = [];
      for (let i = 0; i < upgrades.length; i++) {
        const upgrade = pointerAddUpgrade(upgrades[i]);
        upgrade.getLevel = () => this.pointer().upgrades[i].level ?? E(0);
        upgrade.setLevel = (n) => this.pointer().upgrades[i].level = this.pointer().upgrades[i].level?.add(n) ?? n;
        if (runEffectInstantly)
          upgrade.effect(upgrade.level);
        upgradesDefault.push(upgrade);
      }
      this.upgrades = this.upgrades.concat(upgradesDefault);
    }
    /**
     * Calculates the cost and how many upgrades you can buy
     *
     * @param {*} id
     * @param {*} target
     * @param {boolean} [el=false] - ie Endless: Flag to exclude the sum calculation and only perform binary search.
     * @returns {array} - [amount, cost]
     */
    calculateUpgrade(id, target, el = false) {
      target = E(target);
      function calculateSum(f, b) {
        let sum = E();
        for (let n = E(0); n.lte(b); n = n.add(1)) {
          sum = sum.add(f(n));
        }
        return sum;
      }
      function findHighestB(f, a, el1 = el) {
        if (!el1) {
          let left = E(0);
          let right = E(1);
          let highestB = E(0);
          while (calculateSum(f, right).lt(a)) {
            highestB = right;
            right = right.mul(2);
          }
          while (left.lt(right)) {
            const mid = E.floor(left.add(right).div(2));
            const sum = calculateSum(f, mid);
            if (sum.lt(a)) {
              left = mid.add(1);
            } else {
              right = mid;
            }
          }
          return [left, calculateSum(f, left.sub(1))];
        } else {
          let left = E(0);
          let right = target;
          let result = E(-1);
          while (left.lessThanOrEqualTo(right)) {
            const mid = left.plus(right).dividedBy(2).floor();
            const value = f(mid);
            if (value.lte(a)) {
              result = mid;
              left = mid.plus(1);
            } else {
              right = mid.minus(1);
            }
          }
          return result;
        }
      }
      let upgrade;
      if (typeof id == "number") {
        upgrade = this.upgrades[id];
      } else if (typeof id == "string") {
        for (let i = 0; i < this.upgrades.length; i++) {
          if (this.upgrades[i].id == id) {
            upgrade = this.upgrades[i];
            break;
          } else {
            continue;
          }
        }
      } else {
        return false;
      }
      return findHighestB(
        (level) => upgrade.costScaling(upgrade.getLevel().add(level)),
        this.pointer().value
      );
    }
    /**
     * Buys an upgrade based on its ID or array position,
     * if enough currency is available.
     *
     * @param {string|number} id - The ID or position of the upgrade to buy or upgrade.
     * If a string is provided, it is treated as the upgrade's ID. If a number is provided, it is treated as the upgrade's array position (starting from 0).
     * @param {E} target - The target level or quantity to reach for the upgrade.
     * This represents how many upgrades to buy or upgrade.
     *
     * @returns {boolean} Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
     *
     */
    buyUpgrade(id, target) {
      const upgrade = (() => {
        let output1;
        if (typeof id == "number") {
          output1 = this.upgrades[id];
        } else if (typeof id == "string") {
          for (let i = 0; i < this.upgrades.length; i++) {
            if (this.upgrades[i].id === id) {
              output1 = this.upgrades[i];
              break;
            }
          }
        } else {
          output1 = false;
        }
        return output1;
      })();
      if (typeof upgrade === "boolean")
        return false;
      const maxAffordableQuantity = this.calculateUpgrade(
        id,
        target
      );
      if (!Array.isArray(maxAffordableQuantity) || maxAffordableQuantity.length !== 2) {
        return false;
      }
      if (!maxAffordableQuantity[0].lte(0)) {
        target = upgrade.getLevel().add(target).lte(upgrade.maxLevel) ? target : upgrade.maxLevel.sub(upgrade.getLevel());
        const condition = maxAffordableQuantity[0].lte(target);
        this.pointer().value = this.pointer().value.sub(
          maxAffordableQuantity[1]
        );
        upgrade.setLevel(upgrade.getLevel().add(maxAffordableQuantity[0]));
        if (typeof upgrade.effect === "function") {
          upgrade.effect(upgrade.getLevel(), upgrade);
        }
        return true;
      } else {
        return false;
      }
    }
  };

  // src/classes/attribute.ts
  var attribute = class {
    /**
     * Constructs a static attribute with an initial effect.
     *
     * @constructor
     * @param {ESource} initial - The inital value of the attribute.
     */
    constructor(initial) {
      this.initial = E(initial);
      this.value = E(initial);
      this.boost = new boost(1);
    }
    /**
     * Updates the value of the attribute based on the provided effect function and initial value.
     *
     * @param {function} effect - The effect function to apply to the attribute.
     * @returns {E} The updated value of the attribute after applying the effect.
     */
    update(effect) {
      effect();
      this.value = this.boost.calculate(this.initial);
      return this.value;
    }
  };

  // src/classes/grid.ts
  var gridCell = class {
    /**
     * Initializes a new instance of the grid cell.
     * @constructor
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @param {any} [props] - The properties to initialize with.
     */
    constructor(x, y, props) {
      this.x = x;
      this.y = y;
      this.properties = props ? props : {};
    }
    /**
     * Sets the value of a property on the cell.
     * @param {string} name - The name of the property.
     * @param {any} value - The value to set.
     * @returns {any} - The set value.
     */
    setValue(name, value) {
      this.properties[name] = value;
      return value;
    }
    /**
     * Gets the value of a property on the cell.
     * @param {string} name - The name of the property.
     * @returns {any} - The value of the property.
     */
    getValue(name) {
      return this.properties[name];
    }
    /**
     * Calculates the distance from the cell to a specified point.
     * @param {number} x - The x-coordinate of the target point.
     * @param {number} y - The y-coordinate of the target point.
     * @returns {number} - The distance between the cell and the target point.
     */
    getDistance(x, y) {
      return Math.abs(Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)));
    }
  };
  var grid = class {
    // Add this index signature
    /**
     * Initializes a new instance of the grid.
     * @constructor
     * @param {number} x_size - The size of the grid along the x-axis.
     * @param {number} y_size - The size of the grid along the y-axis.
     * @param {any} [starterProps] - The properties to initialize with.
     */
    constructor(x_size, y_size, starterProps) {
      this.x_size = x_size;
      this.y_size = y_size;
      for (let a = 0; a < y_size; a++) {
        this[a] = [];
        for (let b = 0; b < x_size; b++) {
          this[a][b] = new gridCell(b, a, starterProps);
        }
      }
    }
    /**
     * Gets an array containing all cells in the grid.
     * @returns {gridCell[]} - An array of all cells.
     */
    all() {
      const output = [];
      for (let a = 0; a < this.y_size; a++) {
        for (let b = 0; b < this.x_size; b++) {
          output.push(this[a][b]);
        }
      }
      return output;
    }
    /**
     * Gets an array containing all cells that have the same x coordinate.
     * @returns {gridCell[]} - An array of all cells.
     * @param {number} x - The x coordinate to check.
     */
    allX(x) {
      const output = [];
      for (let i = 0; i < this.y_size; i++) {
        output.push(this[i][x]);
      }
      return output;
    }
    /**
     * Gets an array containing all cells that have the same y coordinate.
     * @returns {gridCell[]} - An array of all cells.
     * @param {number} y - The y coordinate to check.
     */
    allY(y) {
      const output = [];
      for (let i = 0; this.x_size; i++) {
        output.push(this[y][i]);
      }
      return output;
    }
    /**
     * Gets a cell.
     * @returns {gridCell} - The cell.
     * @param {number} x - The x coordinate to check.
     * @param {number} y - The y coordinate to check.
     */
    getCell(x, y) {
      return this[y][x];
    }
    /**
     * Gets an array containing all cells adjacent to a specific cell.
     * @returns {gridCell[]} - An array of all cells.
     * @param {number} x - The x coordinate to check.
     * @param {number} y - The y coordinate to check.
     */
    getAdjacent(x, y) {
      const output = [];
      output[0] = this.getCell(x, y + 1);
      output[1] = this.getCell(x + 1, y);
      output[2] = this.getCell(x, y - 1);
      output[3] = this.getCell(x - 1, y + 1);
      return output;
    }
    /**
     * Gets an array containing all cells diagonal from a specific cell.
     * @returns {gridCell[]} - An array of all cells.
     * @param {number} x - The x coordinate to check.
     * @param {number} y - The y coordinate to check.
     */
    getDiagonal(x, y) {
      const output = [];
      output[0] = this.getCell(x - 1, y + 1);
      output[1] = this.getCell(x + 1, y + 1);
      output[2] = this.getCell(x + 1, y - 1);
      output[3] = this.getCell(x - 1, y - 1);
      return output;
    }
    /**
     * Gets an array containing all cells that surround a cell.
     * @returns {gridCell[]} - An array of all cells.
     * @param {number} x - The x coordinate to check.
     * @param {number} y - The y coordinate to check.
     */
    getEncircling(x, y) {
      return this.getAdjacent(x, y).concat(this.getDiagonal(x, y));
    }
    /**
     * Calculates the distance between two points on the grid.
     * @param {number} x1 - The x-coordinate of the first point.
     * @param {number} y1 - The y-coordinate of the first point.
     * @param {number} x2 - The x-coordinate of the second point.
     * @param {number} y2 - The y-coordinate of the second point.
     * @returns {number} The distance between the two points.
     */
    static getDistance(x1, y1, x2, y2) {
      return Math.abs(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
    }
  };

  // src/classes/utility/eString.ts
  var EString = class extends String {
    constructor(value) {
      super(value);
      this.forEach = function(callbackfn) {
        for (let i = 0; i < this.length; i++) {
          callbackfn(this[i]);
        }
      };
      this.forEachAdvanced = function(callbackfn, start, end) {
        for (let i = start < 0 ? 0 : start; i < (end > this.length ? this.length : end < start ? this.length : end); i++) {
          callbackfn({
            value: this[i],
            index: i
          });
        }
      };
      this.toNumber = function() {
        let output = "";
        for (let i = 0; i < this.length; i++) {
          output += this.charCodeAt(i).toString();
        }
        return parseInt(output);
      };
      this.toArray = function() {
        const output = [];
        for (let i = 0; i < this.length; i++) {
          output.push(this[i]);
        }
        return output;
      };
      this.before = function(index) {
        let output = "";
        this.forEachAdvanced(function(char) {
          output += char.value;
        }, 0, index);
        return output;
      };
      this.after = function(index) {
        let output = "";
        this.forEachAdvanced(function(char) {
          output += char.value;
        }, index, -1);
        return output;
      };
      this.customSplit = function(index) {
        const output = [];
        output.push(this.before(index));
        output.push(this.after(index));
        return output;
      };
      this.random = function(qty) {
        const random = (min, max, round) => !(round != void 0 && !round) ? Math.round(Math.random() * (max > min ? max - min : min - max) + (max > min ? min : max)) : Math.random() * (max > min ? max - min : min - max) + (max > min ? min : max);
        let output = "";
        if (qty > 0) {
          for (let i = 0; i < qty; i++) {
            output += this.charAt(random(0, this.length));
          }
        } else {
          output = this.charAt(random(0, this.length));
        }
        return output;
      };
    }
  };
  ;

  // src/index.ts
  var eMath2 = {
    ...eMath,
    ...{
      E
    }
  };
  if (typeof process !== "object" && typeof window !== "undefined") {
    window["eMath"] = eMath2;
  }
  var src_default = eMath2;
})();
