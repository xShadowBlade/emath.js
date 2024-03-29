(function (g, f) {
    var hasExports = typeof exports === 'object';
    if (typeof define === "function" && define.amd) {
      define([], f);
    } else if (typeof module === "object" && module.exports) {
      module.exports = f();
    } else {
      var m = hasExports ? f() : f();
      var root = hasExports ? exports : g;
      for(var i in m) root[i] = m[i];
    }}(typeof self !== 'undefined' ? self : this, () => {
  var exports = {};
  var module = { exports };
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/presets/index.ts
var presets_exports = {};
__export(presets_exports, {
  GameFormatClass: () => GameFormatClass,
  formatOptions: () => formatOptions,
  formatTimeOptions: () => formatTimeOptions,
  gameFormat: () => gameFormat,
  gameFormatGain: () => gameFormatGain
});
module.exports = __toCommonJS(presets_exports);

// node_modules/class-transformer/esm5/enums/transformation-type.enum.js
var TransformationType;
(function(TransformationType2) {
  TransformationType2[TransformationType2["PLAIN_TO_CLASS"] = 0] = "PLAIN_TO_CLASS";
  TransformationType2[TransformationType2["CLASS_TO_PLAIN"] = 1] = "CLASS_TO_PLAIN";
  TransformationType2[TransformationType2["CLASS_TO_CLASS"] = 2] = "CLASS_TO_CLASS";
})(TransformationType || (TransformationType = {}));

// node_modules/class-transformer/esm5/MetadataStorage.js
var MetadataStorage = (
  /** @class */
  function() {
    function MetadataStorage2() {
      this._typeMetadatas = /* @__PURE__ */ new Map();
      this._transformMetadatas = /* @__PURE__ */ new Map();
      this._exposeMetadatas = /* @__PURE__ */ new Map();
      this._excludeMetadatas = /* @__PURE__ */ new Map();
      this._ancestorsMap = /* @__PURE__ */ new Map();
    }
    MetadataStorage2.prototype.addTypeMetadata = function(metadata) {
      if (!this._typeMetadatas.has(metadata.target)) {
        this._typeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
      }
      this._typeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
    };
    MetadataStorage2.prototype.addTransformMetadata = function(metadata) {
      if (!this._transformMetadatas.has(metadata.target)) {
        this._transformMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
      }
      if (!this._transformMetadatas.get(metadata.target).has(metadata.propertyName)) {
        this._transformMetadatas.get(metadata.target).set(metadata.propertyName, []);
      }
      this._transformMetadatas.get(metadata.target).get(metadata.propertyName).push(metadata);
    };
    MetadataStorage2.prototype.addExposeMetadata = function(metadata) {
      if (!this._exposeMetadatas.has(metadata.target)) {
        this._exposeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
      }
      this._exposeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
    };
    MetadataStorage2.prototype.addExcludeMetadata = function(metadata) {
      if (!this._excludeMetadatas.has(metadata.target)) {
        this._excludeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
      }
      this._excludeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
    };
    MetadataStorage2.prototype.findTransformMetadatas = function(target, propertyName, transformationType) {
      return this.findMetadatas(this._transformMetadatas, target, propertyName).filter(function(metadata) {
        if (!metadata.options)
          return true;
        if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
          return true;
        if (metadata.options.toClassOnly === true) {
          return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
        }
        if (metadata.options.toPlainOnly === true) {
          return transformationType === TransformationType.CLASS_TO_PLAIN;
        }
        return true;
      });
    };
    MetadataStorage2.prototype.findExcludeMetadata = function(target, propertyName) {
      return this.findMetadata(this._excludeMetadatas, target, propertyName);
    };
    MetadataStorage2.prototype.findExposeMetadata = function(target, propertyName) {
      return this.findMetadata(this._exposeMetadatas, target, propertyName);
    };
    MetadataStorage2.prototype.findExposeMetadataByCustomName = function(target, name) {
      return this.getExposedMetadatas(target).find(function(metadata) {
        return metadata.options && metadata.options.name === name;
      });
    };
    MetadataStorage2.prototype.findTypeMetadata = function(target, propertyName) {
      return this.findMetadata(this._typeMetadatas, target, propertyName);
    };
    MetadataStorage2.prototype.getStrategy = function(target) {
      var excludeMap = this._excludeMetadatas.get(target);
      var exclude = excludeMap && excludeMap.get(void 0);
      var exposeMap = this._exposeMetadatas.get(target);
      var expose = exposeMap && exposeMap.get(void 0);
      if (exclude && expose || !exclude && !expose)
        return "none";
      return exclude ? "excludeAll" : "exposeAll";
    };
    MetadataStorage2.prototype.getExposedMetadatas = function(target) {
      return this.getMetadata(this._exposeMetadatas, target);
    };
    MetadataStorage2.prototype.getExcludedMetadatas = function(target) {
      return this.getMetadata(this._excludeMetadatas, target);
    };
    MetadataStorage2.prototype.getExposedProperties = function(target, transformationType) {
      return this.getExposedMetadatas(target).filter(function(metadata) {
        if (!metadata.options)
          return true;
        if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
          return true;
        if (metadata.options.toClassOnly === true) {
          return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
        }
        if (metadata.options.toPlainOnly === true) {
          return transformationType === TransformationType.CLASS_TO_PLAIN;
        }
        return true;
      }).map(function(metadata) {
        return metadata.propertyName;
      });
    };
    MetadataStorage2.prototype.getExcludedProperties = function(target, transformationType) {
      return this.getExcludedMetadatas(target).filter(function(metadata) {
        if (!metadata.options)
          return true;
        if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
          return true;
        if (metadata.options.toClassOnly === true) {
          return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
        }
        if (metadata.options.toPlainOnly === true) {
          return transformationType === TransformationType.CLASS_TO_PLAIN;
        }
        return true;
      }).map(function(metadata) {
        return metadata.propertyName;
      });
    };
    MetadataStorage2.prototype.clear = function() {
      this._typeMetadatas.clear();
      this._exposeMetadatas.clear();
      this._excludeMetadatas.clear();
      this._ancestorsMap.clear();
    };
    MetadataStorage2.prototype.getMetadata = function(metadatas, target) {
      var metadataFromTargetMap = metadatas.get(target);
      var metadataFromTarget;
      if (metadataFromTargetMap) {
        metadataFromTarget = Array.from(metadataFromTargetMap.values()).filter(function(meta) {
          return meta.propertyName !== void 0;
        });
      }
      var metadataFromAncestors = [];
      for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
        var ancestor = _a[_i];
        var ancestorMetadataMap = metadatas.get(ancestor);
        if (ancestorMetadataMap) {
          var metadataFromAncestor = Array.from(ancestorMetadataMap.values()).filter(function(meta) {
            return meta.propertyName !== void 0;
          });
          metadataFromAncestors.push.apply(metadataFromAncestors, metadataFromAncestor);
        }
      }
      return metadataFromAncestors.concat(metadataFromTarget || []);
    };
    MetadataStorage2.prototype.findMetadata = function(metadatas, target, propertyName) {
      var metadataFromTargetMap = metadatas.get(target);
      if (metadataFromTargetMap) {
        var metadataFromTarget = metadataFromTargetMap.get(propertyName);
        if (metadataFromTarget) {
          return metadataFromTarget;
        }
      }
      for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
        var ancestor = _a[_i];
        var ancestorMetadataMap = metadatas.get(ancestor);
        if (ancestorMetadataMap) {
          var ancestorResult = ancestorMetadataMap.get(propertyName);
          if (ancestorResult) {
            return ancestorResult;
          }
        }
      }
      return void 0;
    };
    MetadataStorage2.prototype.findMetadatas = function(metadatas, target, propertyName) {
      var metadataFromTargetMap = metadatas.get(target);
      var metadataFromTarget;
      if (metadataFromTargetMap) {
        metadataFromTarget = metadataFromTargetMap.get(propertyName);
      }
      var metadataFromAncestorsTarget = [];
      for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
        var ancestor = _a[_i];
        var ancestorMetadataMap = metadatas.get(ancestor);
        if (ancestorMetadataMap) {
          if (ancestorMetadataMap.has(propertyName)) {
            metadataFromAncestorsTarget.push.apply(metadataFromAncestorsTarget, ancestorMetadataMap.get(propertyName));
          }
        }
      }
      return metadataFromAncestorsTarget.slice().reverse().concat((metadataFromTarget || []).slice().reverse());
    };
    MetadataStorage2.prototype.getAncestors = function(target) {
      if (!target)
        return [];
      if (!this._ancestorsMap.has(target)) {
        var ancestors = [];
        for (var baseClass = Object.getPrototypeOf(target.prototype.constructor); typeof baseClass.prototype !== "undefined"; baseClass = Object.getPrototypeOf(baseClass.prototype.constructor)) {
          ancestors.push(baseClass);
        }
        this._ancestorsMap.set(target, ancestors);
      }
      return this._ancestorsMap.get(target);
    };
    return MetadataStorage2;
  }()
);

// node_modules/class-transformer/esm5/storage.js
var defaultMetadataStorage = new MetadataStorage();

// node_modules/class-transformer/esm5/decorators/exclude.decorator.js
function Exclude(options) {
  if (options === void 0) {
    options = {};
  }
  return function(object, propertyName) {
    defaultMetadataStorage.addExcludeMetadata({
      target: object instanceof Function ? object : object.constructor,
      propertyName,
      options
    });
  };
}

// node_modules/class-transformer/esm5/decorators/expose.decorator.js
function Expose(options) {
  if (options === void 0) {
    options = {};
  }
  return function(object, propertyName) {
    defaultMetadataStorage.addExposeMetadata({
      target: object instanceof Function ? object : object.constructor,
      propertyName,
      options
    });
  };
}

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
var D = function D2(value) {
  return Decimal.fromValue_noAlloc(value);
};
var FC = function(sign, layer, mag) {
  return Decimal.fromComponents(sign, layer, mag);
};
var FC_NN = function FC_NN2(sign, layer, mag) {
  return Decimal.fromComponents_noNormalize(sign, layer, mag);
};
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
var Decimal = class {
  constructor(value) {
    this.sign = 0;
    this.mag = 0;
    this.layer = 0;
    if (value instanceof Decimal) {
      this.fromDecimal(value);
    } else if (typeof value === "number") {
      this.fromNumber(value);
    } else if (typeof value === "string") {
      this.fromString(value);
    }
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
  /**
   * Turns the given components into a valid Decimal.
   */
  static fromComponents(sign, layer, mag) {
    return new Decimal().fromComponents(sign, layer, mag);
  }
  /**
   * Turns the given components into a Decimal, but not necessarily a valid one (it's only valid if the components would already create a valid Decimal without normalization). Users of this library should not use this function.
   */
  static fromComponents_noNormalize(sign, layer, mag) {
    return new Decimal().fromComponents_noNormalize(sign, layer, mag);
  }
  /**
   * Turns the mantissa and exponent into a valid Decimal with value mantissa * 10^exponent.
   */
  static fromMantissaExponent(mantissa, exponent) {
    return new Decimal().fromMantissaExponent(mantissa, exponent);
  }
  /**
   * Turns the mantissa and exponent into a Decimal, but not necessarily a valid one. Users of this library should not use this function.
   */
  static fromMantissaExponent_noNormalize(mantissa, exponent) {
    return new Decimal().fromMantissaExponent_noNormalize(mantissa, exponent);
  }
  /**
   * Creates a deep copy of the provided value.
   */
  static fromDecimal(value) {
    return new Decimal().fromDecimal(value);
  }
  /**
   * Converts a floating-point number into a Decimal.
   */
  static fromNumber(value) {
    return new Decimal().fromNumber(value);
  }
  /**
   * Converts a string into a Decimal.
   *
   * If linearhyper4 is true, then strings like "10^^8.5" will use the linear approximation of tetration even for bases <= 10.
   */
  static fromString(value, linearhyper4 = false) {
    return new Decimal().fromString(value, linearhyper4);
  }
  /**
   * The function used by new Decimal() to create a new Decimal. Accepts a DecimalSource: uses fromNumber if given a number, uses fromString if given a string, and uses fromDecimal if given a Decimal.
   */
  static fromValue(value) {
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
  static fromValue_noAlloc(value) {
    if (value instanceof Decimal) {
      return value;
    } else if (typeof value === "string") {
      const cached = Decimal.fromStringCache.get(value);
      if (cached !== void 0) {
        return cached;
      }
      return Decimal.fromString(value);
    } else if (typeof value === "number") {
      return Decimal.fromNumber(value);
    } else {
      return Decimal.dZero;
    }
  }
  /**
   * Absolute value function: returns 'value' if 'value' >= 0, returns the negative of 'value' if 'value' < 0.
   */
  static abs(value) {
    return D(value).abs();
  }
  /**
   * Returns the negative of the given value.
   */
  static neg(value) {
    return D(value).neg();
  }
  /**
   * Returns the negative of the given value.
   */
  static negate(value) {
    return D(value).neg();
  }
  /**
   * Returns the negative of the given value.
   */
  static negated(value) {
    return D(value).neg();
  }
  /**
   * Returns the sign of the given value.
   */
  static sign(value) {
    return D(value).sign;
  }
  /**
   * Returns the sign of the given value.
   */
  static sgn(value) {
    return D(value).sign;
  }
  /**
   * Rounds the value to the nearest integer.
   */
  static round(value) {
    return D(value).round();
  }
  /**
   * "Rounds" the value to the nearest integer that's less than or equal to it.
   */
  static floor(value) {
    return D(value).floor();
  }
  /**
   * "Rounds" the value to the nearest integer that's greater than or equal to it.
   */
  static ceil(value) {
    return D(value).ceil();
  }
  /**
   * Extracts the integer part of the Decimal and returns it. Behaves like floor on positive numbers, but behaves like ceiling on negative numbers.
   */
  static trunc(value) {
    return D(value).trunc();
  }
  /**
   * Addition: returns the sum of the two Decimals.
   */
  static add(value, other) {
    return D(value).add(other);
  }
  /**
   * Addition: returns the sum of the two Decimals.
   */
  static plus(value, other) {
    return D(value).add(other);
  }
  /**
   * Subtraction: returns the difference between 'value' and 'other'.
   */
  static sub(value, other) {
    return D(value).sub(other);
  }
  /**
   * Subtraction: returns the difference between 'value' and 'other'.
   */
  static subtract(value, other) {
    return D(value).sub(other);
  }
  /**
   * Subtraction: returns the difference between 'value' and 'other'.
   */
  static minus(value, other) {
    return D(value).sub(other);
  }
  /**
   * Multiplication: returns the product of the two Decimals.
   */
  static mul(value, other) {
    return D(value).mul(other);
  }
  /**
   * Multiplication: returns the product of the two Decimals.
   */
  static multiply(value, other) {
    return D(value).mul(other);
  }
  /**
   * Multiplication: returns the product of the two Decimals.
   */
  static times(value, other) {
    return D(value).mul(other);
  }
  /**
   * Division: returns the quotient of 'value' and 'other'.
   */
  static div(value, other) {
    return D(value).div(other);
  }
  /**
   * Division: returns the quotient of 'value' and 'other'.
   */
  static divide(value, other) {
    return D(value).div(other);
  }
  /**
   * Returns the reciprocal (1 / X) of the given value.
   */
  static recip(value) {
    return D(value).recip();
  }
  /**
   * Returns the reciprocal (1 / X) of the given value.
   */
  static reciprocal(value) {
    return D(value).recip();
  }
  /**
   * Returns the reciprocal (1 / X) of the given value.
   */
  static reciprocate(value) {
    return D(value).reciprocate();
  }
  /**
   * Returns the remainder of 'value' divided by 'other': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
   * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
   */
  static mod(value, other) {
    return D(value).mod(other);
  }
  /**
   * Returns the remainder of 'value' divided by 'other': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
   * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
   */
  static modulo(value, other) {
    return D(value).modulo(other);
  }
  /**
   * Returns the remainder of 'value' divided by 'other': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
   * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
   */
  static modular(value, other) {
    return D(value).modular(other);
  }
  /**
   * Returns 1 if 'value' > 'other', returns -1 if 'value' < 'other', returns 0 if 'value' == 'other'.
   */
  static cmp(value, other) {
    return D(value).cmp(other);
  }
  /**
   * Compares the absolute values of this and value.
   * Returns 1 if |'value'| > |'other'|, returns -1 if |'value'| < |'other'|, returns 0 if |'value'| == |'other'|.
   */
  static cmpabs(value, other) {
    return D(value).cmpabs(other);
  }
  /**
   * Returns 1 if 'value' > 'other', returns -1 if 'value' < 'other', returns 0 if 'value' == 'other'.
   */
  static compare(value, other) {
    return D(value).cmp(other);
  }
  /**
   * Returns true if the given value is an NaN value.
   */
  static isNaN(value) {
    value = D(value);
    return isNaN(value.sign) || isNaN(value.layer) || isNaN(value.mag);
  }
  /**
   * Returns true if the given value is finite (by Decimal standards, not by floating point standards - a humongous Decimal like 10^^10^100 is still finite!)
   */
  static isFinite(value) {
    value = D(value);
    return isFinite(value.sign) && isFinite(value.layer) && isFinite(value.mag);
  }
  /**
   * The Decimal equivalent of ==. Returns true if 'value' and 'other' have equal values.
   */
  static eq(value, other) {
    return D(value).eq(other);
  }
  /**
   * Returns true if 'value' and 'other' have equal values.
   */
  static equals(value, other) {
    return D(value).eq(other);
  }
  /**
   * The Decimal equivalent of !=. Returns true if 'value' and 'other' do not have equal values.
   */
  static neq(value, other) {
    return D(value).neq(other);
  }
  /**
   * Returns true if 'value' and 'other' do not have equal values.
   */
  static notEquals(value, other) {
    return D(value).notEquals(other);
  }
  /**
   * The Decimal equivalent of <. Returns true if 'value' is less than 'other'.
   */
  static lt(value, other) {
    return D(value).lt(other);
  }
  /**
   * The Decimal equivalent of <=. Returns true if 'value' is less than or equal to 'other'.
   */
  static lte(value, other) {
    return D(value).lte(other);
  }
  /**
   * The Decimal equivalent of >. Returns true if 'value' is greater than 'other'.
   */
  static gt(value, other) {
    return D(value).gt(other);
  }
  /**
   * The Decimal equivalent of >=. Returns true if 'value' is greater than or equal to 'other'.
   */
  static gte(value, other) {
    return D(value).gte(other);
  }
  /**
   * Returns whichever of 'value' and 'other' is higher.
   */
  static max(value, other) {
    return D(value).max(other);
  }
  /**
   * Returns whichever of 'value' and 'other' is lower.
   */
  static min(value, other) {
    return D(value).min(other);
  }
  /**
   * Returns whichever of 'value' and 'other' has a larger absolute value.
   */
  static minabs(value, other) {
    return D(value).minabs(other);
  }
  /**
   * Returns whichever of 'value' and 'other' has a smaller absolute value.
   */
  static maxabs(value, other) {
    return D(value).maxabs(other);
  }
  /**
   * A combination of minimum and maximum: the value returned by clamp is normally 'value', but it won't go below 'min' and it won't go above 'max'.
   * Therefore, if 'value' < 'min', then 'min' is returned, and if 'value' > 'max', then 'max' is returned.
   */
  static clamp(value, min, max) {
    return D(value).clamp(min, max);
  }
  /**
   * Returns 'value', unless 'value' is less than 'min', in which case 'min' is returned.
   */
  static clampMin(value, min) {
    return D(value).clampMin(min);
  }
  /**
   * Returns 'value', unless 'value' is greater than 'max', in which case 'max' is returned.
   */
  static clampMax(value, max) {
    return D(value).clampMax(max);
  }
  /**
   * Returns 1 if 'value' is greater than 'other', returns -1 if 'value' is less than 'other', returns 0 if 'value' is equal to 'other'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static cmp_tolerance(value, other, tolerance) {
    return D(value).cmp_tolerance(other, tolerance);
  }
  /**
   * Returns 1 if 'value' is greater than 'other', returns -1 if 'value' is less than 'other', returns 0 if 'value' is equal to 'other'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static compare_tolerance(value, other, tolerance) {
    return D(value).cmp_tolerance(other, tolerance);
  }
  /**
   * Tests whether two Decimals are approximately equal, up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static eq_tolerance(value, other, tolerance) {
    return D(value).eq_tolerance(other, tolerance);
  }
  /**
   * Tests whether two Decimals are approximately equal, up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static equals_tolerance(value, other, tolerance) {
    return D(value).eq_tolerance(other, tolerance);
  }
  /**
   * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static neq_tolerance(value, other, tolerance) {
    return D(value).neq_tolerance(other, tolerance);
  }
  /**
   * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static notEquals_tolerance(value, other, tolerance) {
    return D(value).notEquals_tolerance(other, tolerance);
  }
  /**
   * Returns true if 'value' is less than 'other'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static lt_tolerance(value, other, tolerance) {
    return D(value).lt_tolerance(other, tolerance);
  }
  /**
   * Returns true if 'value' is less than or equal to 'other'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static lte_tolerance(value, other, tolerance) {
    return D(value).lte_tolerance(other, tolerance);
  }
  /**
   * Returns true if 'value' is greater than 'other'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static gt_tolerance(value, other, tolerance) {
    return D(value).gt_tolerance(other, tolerance);
  }
  /**
   * Returns true if 'value' is greater than or equal to 'other'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static gte_tolerance(value, other, tolerance) {
    return D(value).gte_tolerance(other, tolerance);
  }
  /**
   * "Positive log10": Returns the base-10 logarithm of nonnegative Decimals, but returns 0 for negative Decimals.
   */
  static pLog10(value) {
    return D(value).pLog10();
  }
  /**
   * Returns the base-10 logarithm of abs('value').
   */
  static absLog10(value) {
    return D(value).absLog10();
  }
  /**
   * Base-10 logarithm: returns the Decimal X such that 10^X = 'value'.
   * For numbers above layer 0, this is equivalent to subtracting 1 from layer and normalizing.
   */
  static log10(value) {
    return D(value).log10();
  }
  /**
   * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'value'.
   */
  static log(value, base) {
    return D(value).log(base);
  }
  /**
   * Base-2 logarithm: returns the Decimal X such that 2^X = 'value'.
   */
  static log2(value) {
    return D(value).log2();
  }
  /**
   * Base-e logarithm, also known as the "natural" logarithm: returns the Decimal X such that e^X = 'value'.
   */
  static ln(value) {
    return D(value).ln();
  }
  /**
   * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'value'.
   */
  static logarithm(value, base) {
    return D(value).logarithm(base);
  }
  /**
   * Exponentiation: Returns the result of 'value' ^ 'other' (often written as 'value' ** 'other' in programming languages).
   */
  static pow(value, other) {
    return D(value).pow(other);
  }
  /**
   * Raises 10 to the power of 'value', i.e. (10^'value'). For positive numbers above 1, this is equivalent to adding 1 to the value's layer and normalizing.
   */
  static pow10(value) {
    return D(value).pow10();
  }
  /**
   * Roots are one of the inverses of exponentiation: this function finds the Decimal X such that X ^ 'other' = 'value'.
   * Equivalent to 'value' ^ (1 / 'other'), which is written here as value.pow(other.recip()).
   */
  static root(value, other) {
    return D(value).root(other);
  }
  /**
   * For positive integers, X factorial (written as X!) equals X * (X - 1) * (X - 2) *... * 3 * 2 * 1. 0! equals 1.
   * This can be extended to real numbers (except for negative integers) via the gamma function, which is what this function does.
   */
  static factorial(value, _other) {
    return D(value).factorial();
  }
  /**
   * The gamma function extends the idea of factorials to non-whole numbers using some calculus.
   * Gamma(x) is defined as the integral of t^(x-1) * e^-t dt from t = 0 to t = infinity,
   * and gamma(x) = (x - 1)! for nonnegative integer x, so the factorial for non-whole numbers is defined using the gamma function.
   */
  static gamma(value, _other) {
    return D(value).gamma();
  }
  /**
   * Returns the natural (base-e) logarithm of Gamma('value').
   */
  static lngamma(value, _other) {
    return D(value).lngamma();
  }
  /**
   * Base-e exponentiation: returns e^'value'.
   */
  static exp(value) {
    return D(value).exp();
  }
  /**
   * Squaring a number means multiplying it by itself, a.k.a. raising it to the second power.
   */
  static sqr(value) {
    return D(value).sqr();
  }
  /**
   * Square root: finds the Decimal X such that X * X, a.k.a X^2, equals 'value'. Equivalent to X^(1/2).
   */
  static sqrt(value) {
    return D(value).sqrt();
  }
  /**
   * Cubing a number means raising it to the third power.
   */
  static cube(value) {
    return D(value).cube();
  }
  /**
   * Cube root: finds the Decimal X such that X^3 equals 'value'. Equivalent to X^(1/3).
   */
  static cbrt(value) {
    return D(value).cbrt();
  }
  /**
   *
   * Tetration: The result of exponentiating 'value' to 'value' 'height' times in a row.  https://en.wikipedia.org/wiki/Tetration
   *
   * If payload != 1, then this is 'iterated exponentiation', the result of exping 'payload' to base 'value' 'height' times. https://andydude.github.io/tetration/archives/tetration2/ident.html
   *
   * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
  static tetrate(value, height = 2, payload = FC_NN(1, 0, 1), linear = false) {
    return D(value).tetrate(height, payload, linear);
  }
  /**
   * Iterated exponentiation, the result of exping 'payload' to base 'value' 'height' times. https://andydude.github.io/tetration/archives/tetration2/ident.html
   *
   * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   *
   * Identical to tetrate.
   */
  static iteratedexp(value, height = 2, payload = FC_NN(1, 0, 1), linear = false) {
    return D(value).iteratedexp(height, payload, linear);
  }
  /**
   * iterated log/repeated log: The result of applying log(base) 'times' times in a row. Approximately equal to subtracting 'times' from the number's slog representation. Equivalent to tetrating to a negative height.
   *
   * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
  static iteratedlog(value, base = 10, times = 1, linear = false) {
    return D(value).iteratedlog(base, times, linear);
  }
  /**
   * Adds/removes layers from a Decimal, even fractional layers (e.g. its slog10 representation). Very similar to tetrate base 10 and iterated log base 10.
   *
   * Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
  static layeradd10(value, diff, linear = false) {
    return D(value).layeradd10(diff, linear);
  }
  /**
   * layeradd: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 'base' and iterated log base 'base'.
   *
   * Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
  static layeradd(value, diff, base = 10, linear = false) {
    return D(value).layeradd(diff, base, linear);
  }
  /**
   * Super-logarithm, one of tetration's inverses, tells you what size power tower you'd have to tetrate 'base' to to get 'value'. https://en.wikipedia.org/wiki/Super-logarithm
   *
   * By definition, will never be higher than 1.8e308 in break_eternity.js, since a power tower 1.8e308 numbers tall is the largest representable number.
   *
   * Accepts a number of iterations (default is 100), and use binary search to, after making an initial guess, hone in on the true value, assuming tetration as the ground truth.
   *
   * Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
  static slog(value, base = 10, linear = false) {
    return D(value).slog(base, 100, linear);
  }
  /**
   * The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
   * https://en.wikipedia.org/wiki/Lambert_W_function
   */
  static lambertw(value) {
    return D(value).lambertw();
  }
  /**
   * The super square-root function - what number, tetrated to height 2, equals 'value'? https://en.wikipedia.org/wiki/Tetration#Super-root
   */
  static ssqrt(value) {
    return D(value).ssqrt();
  }
  /**
   * Super-root, one of tetration's inverses - what number, tetrated to height 'degree', equals 'value'? https://en.wikipedia.org/wiki/Tetration#Super-root
   *
   * Only works with the linear approximation of tetration, as starting with analytic and then switching to linear would result in inconsistent behavior for super-roots.
   * This only matters for non-integer degrees.
   */
  static linear_sroot(value, degree) {
    return D(value).linear_sroot(degree);
  }
  /**
   * Pentation/pentate: The result of tetrating 'height' times in a row. An absurdly strong operator - Decimal.pentate(2, 4.28) and Decimal.pentate(10, 2.37) are already too huge for break_eternity.js!
   * https://en.wikipedia.org/wiki/Pentation
   *
   * Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   *
   * For non-whole pentation heights, the linear approximation of pentation is always used, as there is no defined analytic approximation of pentation.
   */
  static pentate(value, height = 2, payload = FC_NN(1, 0, 1), linear = false) {
    return D(value).pentate(height, payload, linear);
  }
  /**
   * The sine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
   */
  static sin(value) {
    return D(value).sin();
  }
  /**
   * The cosine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
   */
  static cos(value) {
    return D(value).cos();
  }
  /**
   * The tangent function, equal to sine divided by cosine. Behaves periodically with period pi.
   */
  static tan(value) {
    return D(value).tan();
  }
  /**
   * The arcsine function, the inverse of the sine function.
   */
  static asin(value) {
    return D(value).asin();
  }
  /**
   * The arccosine function, the inverse of the cosine function.
   */
  static acos(value) {
    return D(value).acos();
  }
  /**
   * The arctangent function, the inverse of the tangent function.
   */
  static atan(value) {
    return D(value).atan();
  }
  /**
   * Hyperbolic sine: sinh(X) = (e^x - e^-x)/2.
   */
  static sinh(value) {
    return D(value).sinh();
  }
  /**
   * Hyperbolic cosine: cosh(x) = (e^x + e^-x)/2.
   */
  static cosh(value) {
    return D(value).cosh();
  }
  /**
   * Hyperbolic tangent: tanh(x) = sinh(x)/cosh(x).
   */
  static tanh(value) {
    return D(value).tanh();
  }
  /**
   * Hyperbolic arcsine, the inverse of hyperbolic sine.
   */
  static asinh(value) {
    return D(value).asinh();
  }
  /**
   * Hyperbolic arccosine, the inverse of hyperbolic cosine.
   */
  static acosh(value) {
    return D(value).acosh();
  }
  /**
   * Hyperbolic arcctangent, the inverse of hyperbolic tangent.
   */
  static atanh(value) {
    return D(value).atanh();
  }
  /**
   * If you're willing to spend 'resourcesAvailable' and want to buy something
   * with exponentially increasing cost each purchase (start at priceStart,
   * multiply by priceRatio, already own currentOwned), how much of it can you buy?
   * Adapted from Trimps source code.
   */
  static affordGeometricSeries(resourcesAvailable, priceStart, priceRatio, currentOwned) {
    return this.affordGeometricSeries_core(
      D(resourcesAvailable),
      D(priceStart),
      D(priceRatio),
      currentOwned
    );
  }
  /**
   * How much resource would it cost to buy (numItems) items if you already have currentOwned,
   * the initial price is priceStart and it multiplies by priceRatio each purchase?
   */
  static sumGeometricSeries(numItems, priceStart, priceRatio, currentOwned) {
    return this.sumGeometricSeries_core(numItems, D(priceStart), D(priceRatio), currentOwned);
  }
  /**
   * If you're willing to spend 'resourcesAvailable' and want to buy something with additively
   * increasing cost each purchase (start at priceStart, add by priceAdd, already own currentOwned),
   * how much of it can you buy?
   */
  static affordArithmeticSeries(resourcesAvailable, priceStart, priceAdd, currentOwned) {
    return this.affordArithmeticSeries_core(
      D(resourcesAvailable),
      D(priceStart),
      D(priceAdd),
      D(currentOwned)
    );
  }
  /**
   * How much resource would it cost to buy (numItems) items if you already have currentOwned,
   * the initial price is priceStart and it adds priceAdd each purchase?
   * Adapted from http://www.mathwords.com/a/arithmetic_series.htm
   */
  static sumArithmeticSeries(numItems, priceStart, priceAdd, currentOwned) {
    return this.sumArithmeticSeries_core(D(numItems), D(priceStart), D(priceAdd), D(currentOwned));
  }
  /**
   * When comparing two purchases that cost (resource) and increase your resource/sec by (deltaRpS),
   * the lowest efficiency score is the better one to purchase.
   * From Frozen Cookies:
   * http://cookieclicker.wikia.com/wiki/Frozen_Cookies_(JavaScript_Add-on)#Efficiency.3F_What.27s_that.3F
   */
  static efficiencyOfPurchase(cost, currentRpS, deltaRpS) {
    return this.efficiencyOfPurchase_core(D(cost), D(currentRpS), D(deltaRpS));
  }
  static randomDecimalForTesting(maxLayers) {
    if (Math.random() * 20 < 1) {
      return FC_NN(0, 0, 0);
    }
    const randomsign = Math.random() > 0.5 ? 1 : -1;
    if (Math.random() * 20 < 1) {
      return FC_NN(randomsign, 0, 1);
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
    return FC(randomsign, layer, randommag);
  }
  static affordGeometricSeries_core(resourcesAvailable, priceStart, priceRatio, currentOwned) {
    const actualStart = priceStart.mul(priceRatio.pow(currentOwned));
    return Decimal.floor(
      resourcesAvailable.div(actualStart).mul(priceRatio.sub(1)).add(1).log10().div(priceRatio.log10())
    );
  }
  static sumGeometricSeries_core(numItems, priceStart, priceRatio, currentOwned) {
    return priceStart.mul(priceRatio.pow(currentOwned)).mul(Decimal.sub(1, priceRatio.pow(numItems))).div(Decimal.sub(1, priceRatio));
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
  /**
   * Turns the Decimal into a valid Decimal. This function is meant for internal purposes - users of this library should not need to use normalize.
   *
   * Note: this function mutates the Decimal it is called on.
   */
  normalize() {
    if (this.sign === 0 || this.mag === 0 && this.layer === 0 || this.mag === Number.NEGATIVE_INFINITY && this.layer > 0 && Number.isFinite(this.layer)) {
      this.sign = 0;
      this.mag = 0;
      this.layer = 0;
      return this;
    }
    if (this.layer === 0 && this.mag < 0) {
      this.mag = -this.mag;
      this.sign = -this.sign;
    }
    if (this.mag === Number.POSITIVE_INFINITY || this.layer === Number.POSITIVE_INFINITY || this.mag === Number.NEGATIVE_INFINITY || this.layer === Number.NEGATIVE_INFINITY) {
      if (this.sign == 1) {
        this.mag = Number.POSITIVE_INFINITY;
        this.layer = Number.POSITIVE_INFINITY;
      } else if (this.sign == -1) {
        this.mag = Number.NEGATIVE_INFINITY;
        this.layer = Number.NEGATIVE_INFINITY;
      }
      return this;
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
    if (Number.isNaN(this.sign) || Number.isNaN(this.layer) || Number.isNaN(this.mag)) {
      this.sign = Number.NaN;
      this.layer = Number.NaN;
      this.mag = Number.NaN;
    }
    return this;
  }
  /**
   * Turns the given components into a valid Decimal.
   *
   * Note: this function mutates the Decimal it is called on.
   */
  fromComponents(sign, layer, mag) {
    this.sign = sign;
    this.layer = layer;
    this.mag = mag;
    this.normalize();
    return this;
  }
  /**
   * Turns the given components into a Decimal, but not necessarily a valid one (it's only valid if the components would already create a valid Decimal without normalization). Users of this library should not use this function.
   *
   * Note: this function mutates the Decimal it is called on.
   */
  fromComponents_noNormalize(sign, layer, mag) {
    this.sign = sign;
    this.layer = layer;
    this.mag = mag;
    return this;
  }
  /**
   * Turns the mantissa and exponent into a valid Decimal with value mantissa * 10^exponent.
   *
   * Note: this function mutates the Decimal it is called on.
   */
  fromMantissaExponent(mantissa, exponent) {
    this.layer = 1;
    this.sign = Math.sign(mantissa);
    mantissa = Math.abs(mantissa);
    this.mag = exponent + Math.log10(mantissa);
    this.normalize();
    return this;
  }
  /**
   * Turns the mantissa and exponent into a Decimal, but not necessarily a valid one. Users of this library should not use this function.
   *
   * Note: this function mutates the Decimal it is called on.
   */
  fromMantissaExponent_noNormalize(mantissa, exponent) {
    this.fromMantissaExponent(mantissa, exponent);
    return this;
  }
  /**
   * Turns the Decimal that this function is called on into a deep copy of the provided value.
   *
   * Note: this function mutates the Decimal it is called on.
   */
  fromDecimal(value) {
    this.sign = value.sign;
    this.layer = value.layer;
    this.mag = value.mag;
    return this;
  }
  /**
   * Converts a floating-point number into a Decimal.
   *
   * Note: this function mutates the Decimal it is called on.
   */
  fromNumber(value) {
    this.mag = Math.abs(value);
    this.sign = Math.sign(value);
    this.layer = 0;
    this.normalize();
    return this;
  }
  /**
   * Converts a string into a Decimal.
   *
   * If linearhyper4 is true, then strings like "10^^8.5" will use the linear approximation of tetration even for bases <= 10.
   *
   * Note: this function mutates the Decimal it is called on.
   */
  fromString(value, linearhyper4 = false) {
    const originalValue = value;
    const cached = Decimal.fromStringCache.get(originalValue);
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
        const result = Decimal.pentate(base2, height2, payload, linearhyper4);
        this.sign = result.sign;
        this.layer = result.layer;
        this.mag = result.mag;
        if (Decimal.fromStringCache.maxSize >= 1) {
          Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
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
        const result = Decimal.tetrate(base2, height2, payload, linearhyper4);
        this.sign = result.sign;
        this.layer = result.layer;
        this.mag = result.mag;
        if (Decimal.fromStringCache.maxSize >= 1) {
          Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
        }
        return this;
      }
    }
    const powparts = value.split("^");
    if (powparts.length === 2) {
      const base2 = parseFloat(powparts[0]);
      const exponent2 = parseFloat(powparts[1]);
      if (isFinite(base2) && isFinite(exponent2)) {
        const result = Decimal.pow(base2, exponent2);
        this.sign = result.sign;
        this.layer = result.layer;
        this.mag = result.mag;
        if (Decimal.fromStringCache.maxSize >= 1) {
          Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
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
        const result = Decimal.tetrate(base, height, payload, linearhyper4);
        this.sign = result.sign;
        this.layer = result.layer;
        this.mag = result.mag;
        if (Decimal.fromStringCache.maxSize >= 1) {
          Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
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
        const result = Decimal.tetrate(base, height, payload, linearhyper4);
        this.sign = result.sign;
        this.layer = result.layer;
        this.mag = result.mag;
        if (Decimal.fromStringCache.maxSize >= 1) {
          Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
        }
        return this;
      }
    }
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
        const result = Decimal.tetrate(base, height, payload, linearhyper4);
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
      const numberAttempt = parseFloat(value);
      if (isFinite(numberAttempt) && numberAttempt !== 0) {
        this.fromNumber(numberAttempt);
        if (Decimal.fromStringCache.maxSize >= 1) {
          Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
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
        const result = Decimal.mul(FC(1, 2, exponent), D(mantissa));
        this.sign = result.sign;
        this.layer = result.layer;
        this.mag = result.mag;
        if (Decimal.fromStringCache.maxSize >= 1) {
          Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
        }
        return this;
      } else {
        this.mag = exponent;
      }
    }
    this.normalize();
    if (Decimal.fromStringCache.maxSize >= 1) {
      Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
    }
    return this;
  }
  /**
   * The function used by new Decimal() to create a new Decimal. Accepts a DecimalSource: uses fromNumber if given a number, uses fromString if given a string, and uses fromDecimal if given a Decimal.
   *
   * Note: this function mutates the Decimal it is called on.
   */
  fromValue(value) {
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
  /**
   * Returns the numeric value of the Decimal it's called on. Will return Infinity (or -Infinity for negatives) for Decimals that are larger than Number.MAX_VALUE.
   */
  toNumber() {
    if (this.mag === Number.POSITIVE_INFINITY && this.layer === Number.POSITIVE_INFINITY && this.sign === 1) {
      return Number.POSITIVE_INFINITY;
    }
    if (this.mag === Number.NEGATIVE_INFINITY && this.layer === Number.NEGATIVE_INFINITY && this.sign === -1) {
      return Number.NEGATIVE_INFINITY;
    }
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
  /**
   * Returns a string representation of the Decimal it's called on.
   * This string is written as a plain number for most layer 0 numbers, in scientific notation for layer 1 numbers (and layer 0 numbers below 1e-6),
   * in "ee...X" form for numbers from layers 2 to 5, and in (e^N)X form for layer > 5.
   */
  toString() {
    if (isNaN(this.layer) || isNaN(this.sign) || isNaN(this.mag)) {
      return "NaN";
    }
    if (this.mag === Number.POSITIVE_INFINITY || this.layer === Number.POSITIVE_INFINITY || this.mag === Number.NEGATIVE_INFINITY || this.layer === Number.NEGATIVE_INFINITY) {
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
  /**
   * Absolute value function: returns 'this' if 'this' >= 0, returns the negative of 'this' if this < 0.
   */
  abs() {
    return FC_NN(this.sign === 0 ? 0 : 1, this.layer, this.mag);
  }
  /**
   * Negates the Decimal it's called on: in other words, when given X, returns -X.
   */
  neg() {
    return FC_NN(-this.sign, this.layer, this.mag);
  }
  /**
   * Negates the Decimal it's called on: in other words, when given X, returns -X.
   */
  negate() {
    return this.neg();
  }
  /**
   * Negates the Decimal it's called on: in other words, when given X, returns -X.
   */
  negated() {
    return this.neg();
  }
  // public sign () {
  //     return this.sign;
  //   }
  /**
   * Returns the sign of the Decimal it's called on. (Though, since sign is a public data member of Decimal, you might as well just call .sign instead of .sgn())
   */
  sgn() {
    return this.sign;
  }
  /**
   * Rounds the Decimal it's called on to the nearest integer.
   */
  round() {
    if (this.mag < 0) {
      return Decimal.dZero;
    }
    if (this.layer === 0) {
      return FC(this.sign, 0, Math.round(this.mag));
    }
    return this;
  }
  /**
   * "Rounds" the Decimal it's called on to the nearest integer that's less than or equal to it.
   */
  floor() {
    if (this.mag < 0) {
      if (this.sign === -1)
        return Decimal.dNegOne;
      else
        return Decimal.dZero;
    }
    if (this.sign === -1)
      return this.neg().ceil().neg();
    if (this.layer === 0) {
      return FC(this.sign, 0, Math.floor(this.mag));
    }
    return this;
  }
  /**
   * "Rounds" the Decimal it's called on to the nearest integer that's greater than or equal to it.
   */
  ceil() {
    if (this.mag < 0) {
      if (this.sign === 1)
        return Decimal.dOne;
      else
        return Decimal.dZero;
    }
    if (this.sign === -1)
      return this.neg().floor().neg();
    if (this.layer === 0) {
      return FC(this.sign, 0, Math.ceil(this.mag));
    }
    return this;
  }
  /**
   * Extracts the integer part of the Decimal and returns it. Behaves like floor on positive numbers, but behaves like ceiling on negative numbers.
   */
  trunc() {
    if (this.mag < 0) {
      return Decimal.dZero;
    }
    if (this.layer === 0) {
      return FC(this.sign, 0, Math.trunc(this.mag));
    }
    return this;
  }
  /**
   * Addition: returns the sum of 'this' and 'value'.
   */
  add(value) {
    const decimal = D(value);
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
      return FC_NN(0, 0, 0);
    }
    let a;
    let b;
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
    if (layera - layerb >= 2) {
      return a;
    }
    if (layera === 0 && layerb === -1) {
      if (Math.abs(b.mag - Math.log10(a.mag)) > MAX_SIGNIFICANT_DIGITS) {
        return a;
      } else {
        const magdiff = Math.pow(10, Math.log10(a.mag) - b.mag);
        const mantissa = b.sign + a.sign * magdiff;
        return FC(Math.sign(mantissa), 1, b.mag + Math.log10(Math.abs(mantissa)));
      }
    }
    if (layera === 1 && layerb === 0) {
      if (Math.abs(a.mag - Math.log10(b.mag)) > MAX_SIGNIFICANT_DIGITS) {
        return a;
      } else {
        const magdiff = Math.pow(10, a.mag - Math.log10(b.mag));
        const mantissa = b.sign + a.sign * magdiff;
        return FC(Math.sign(mantissa), 1, Math.log10(b.mag) + Math.log10(Math.abs(mantissa)));
      }
    }
    if (Math.abs(a.mag - b.mag) > MAX_SIGNIFICANT_DIGITS) {
      return a;
    } else {
      const magdiff = Math.pow(10, a.mag - b.mag);
      const mantissa = b.sign + a.sign * magdiff;
      return FC(Math.sign(mantissa), 1, b.mag + Math.log10(Math.abs(mantissa)));
    }
    throw Error("Bad arguments to add: " + this + ", " + value);
  }
  /**
   * Addition: returns the sum of 'this' and 'value'.
   */
  plus(value) {
    return this.add(value);
  }
  /**
   * Subtraction: returns the difference between 'this' and 'value'.
   */
  sub(value) {
    return this.add(D(value).neg());
  }
  /**
   * Subtraction: returns the difference between 'this' and 'value'.
   */
  subtract(value) {
    return this.sub(value);
  }
  /**
   * Subtraction: returns the difference between 'this' and 'value'.
   */
  minus(value) {
    return this.sub(value);
  }
  /**
   * Multiplication: returns the product of 'this' and 'value'.
   */
  mul(value) {
    const decimal = D(value);
    if (!Number.isFinite(this.layer)) {
      return this;
    }
    if (!Number.isFinite(decimal.layer)) {
      return decimal;
    }
    if (this.sign === 0 || decimal.sign === 0) {
      return FC_NN(0, 0, 0);
    }
    if (this.layer === decimal.layer && this.mag === -decimal.mag) {
      return FC_NN(this.sign * decimal.sign, 0, 1);
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
      return Decimal.fromNumber(a.sign * b.sign * a.mag * b.mag);
    }
    if (a.layer >= 3 || a.layer - b.layer >= 2) {
      return FC(a.sign * b.sign, a.layer, a.mag);
    }
    if (a.layer === 1 && b.layer === 0) {
      return FC(a.sign * b.sign, 1, a.mag + Math.log10(b.mag));
    }
    if (a.layer === 1 && b.layer === 1) {
      return FC(a.sign * b.sign, 1, a.mag + b.mag);
    }
    if (a.layer === 2 && b.layer === 1) {
      const newmag = FC(Math.sign(a.mag), a.layer - 1, Math.abs(a.mag)).add(
        FC(Math.sign(b.mag), b.layer - 1, Math.abs(b.mag))
      );
      return FC(a.sign * b.sign, newmag.layer + 1, newmag.sign * newmag.mag);
    }
    if (a.layer === 2 && b.layer === 2) {
      const newmag = FC(Math.sign(a.mag), a.layer - 1, Math.abs(a.mag)).add(
        FC(Math.sign(b.mag), b.layer - 1, Math.abs(b.mag))
      );
      return FC(a.sign * b.sign, newmag.layer + 1, newmag.sign * newmag.mag);
    }
    throw Error("Bad arguments to mul: " + this + ", " + value);
  }
  /**
   * Multiplication: returns the product of 'this' and 'value'.
   */
  multiply(value) {
    return this.mul(value);
  }
  /**
   * Multiplication: returns the product of 'this' and 'value'.
   */
  times(value) {
    return this.mul(value);
  }
  /**
   * Division: returns the quotient of 'this' and 'value'.
   */
  div(value) {
    const decimal = D(value);
    return this.mul(decimal.recip());
  }
  /**
   * Division: returns the quotient of 'this' and 'value'.
   */
  divide(value) {
    return this.div(value);
  }
  /**
   * Division: returns the quotient of 'this' and 'value'.
   */
  divideBy(value) {
    return this.div(value);
  }
  /**
   * Division: returns the quotient of 'this' and 'value'.
   */
  dividedBy(value) {
    return this.div(value);
  }
  /**
   * Returns the reciprocal (1 / X) of the Decimal it's called on.
   */
  recip() {
    if (this.mag === 0) {
      return Decimal.dNaN;
    } else if (this.layer === 0) {
      return FC(this.sign, 0, 1 / this.mag);
    } else {
      return FC(this.sign, this.layer, -this.mag);
    }
  }
  /**
   * Returns the reciprocal (1 / X) of the Decimal it's called on.
   */
  reciprocal() {
    return this.recip();
  }
  /**
   * Returns the reciprocal (1 / X) of the Decimal it's called on.
   */
  reciprocate() {
    return this.recip();
  }
  /**
   * Returns the remainder of 'this' divided by 'value': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
   * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
   */
  // Taken from OmegaNum.js, with a couple touch-ups
  mod(value) {
    const decimal = D(value).abs();
    if (decimal.eq(Decimal.dZero))
      return Decimal.dZero;
    const num_this = this.toNumber();
    const num_decimal = decimal.toNumber();
    if (isFinite(num_this) && isFinite(num_decimal) && num_this != 0 && num_decimal != 0) {
      return new Decimal(num_this % num_decimal);
    }
    if (this.sub(decimal).eq(this)) {
      return Decimal.dZero;
    }
    if (decimal.sub(this).eq(decimal)) {
      return this;
    }
    if (this.sign == -1)
      return this.abs().mod(decimal).neg();
    return this.sub(this.div(decimal).floor().mul(decimal));
  }
  /**
   * Returns the remainder of 'this' divided by 'value': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
   * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
   */
  modulo(value) {
    return this.mod(value);
  }
  /**
   * Returns the remainder of this / value: for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
   * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
   */
  modular(value) {
    return this.mod(value);
  }
  /**
   * Returns 1 if 'this' > 'value', returns -1 if 'this' < 'value', returns 0 if 'this' == 'value'.
   */
  cmp(value) {
    const decimal = D(value);
    if (this.sign > decimal.sign) {
      return 1;
    }
    if (this.sign < decimal.sign) {
      return -1;
    }
    return this.sign * this.cmpabs(value);
  }
  /**
   * Compares the absolute values of this and value.
   * Returns 1 if |'this'| > |'value'|, returns -1 if |'this'| < |'value'|, returns 0 if |'this'| == |'value'|.
   */
  cmpabs(value) {
    const decimal = D(value);
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
  /**
   * Returns 1 if 'this' > 'value', returns -1 if 'this' < 'value', returns 0 if 'this' == 'value'.
   */
  compare(value) {
    return this.cmp(value);
  }
  /**
   * Returns true if the Decimal is an NaN value.
   */
  isNan() {
    return isNaN(this.sign) || isNaN(this.layer) || isNaN(this.mag);
  }
  /**
   * Returns true if the Decimal is finite (by Decimal standards, not by floating point standards - a humongous Decimal like 10^^10^100 is still finite!)
   */
  isFinite() {
    return isFinite(this.sign) && isFinite(this.layer) && isFinite(this.mag);
  }
  /**
   * The Decimal equivalent of ==. Returns true if 'this' and 'value' have equal values.
   */
  eq(value) {
    const decimal = D(value);
    return this.sign === decimal.sign && this.layer === decimal.layer && this.mag === decimal.mag;
  }
  /**
   * Returns true if 'this' and 'value' have equal values.
   */
  equals(value) {
    return this.eq(value);
  }
  /**
   * The Decimal equivalent of !=. Returns true if 'this' and 'value' do not have equal values.
   */
  neq(value) {
    return !this.eq(value);
  }
  /**
   * Returns true if 'this' and 'value' do not have equal values.
   */
  notEquals(value) {
    return this.neq(value);
  }
  /**
   * The Decimal equivalent of <. Returns true if 'this' is less than 'value'.
   */
  lt(value) {
    return this.cmp(value) === -1;
  }
  /**
   * The Decimal equivalent of <=. Returns true if 'this' is less than or equal to 'value'.
   */
  lte(value) {
    return !this.gt(value);
  }
  /**
   * The Decimal equivalent of >. Returns true if 'this' is greater than 'value'.
   */
  gt(value) {
    return this.cmp(value) === 1;
  }
  /**
   * The Decimal equivalent of >=. Returns true if 'this' is greater than or equal to 'value'.
   */
  gte(value) {
    return !this.lt(value);
  }
  /**
   * Returns whichever of 'this' and 'value' is higher.
   */
  max(value) {
    const decimal = D(value);
    return this.lt(decimal) ? decimal : this;
  }
  /**
   * Returns whichever of 'this' and 'value' is lower.
   */
  min(value) {
    const decimal = D(value);
    return this.gt(decimal) ? decimal : this;
  }
  /**
   * Returns whichever of 'this' and 'value' has a larger absolute value.
   */
  maxabs(value) {
    const decimal = D(value);
    return this.cmpabs(decimal) < 0 ? decimal : this;
  }
  /**
   * Returns whichever of 'this' and 'value' has a smaller absolute value.
   */
  minabs(value) {
    const decimal = D(value);
    return this.cmpabs(decimal) > 0 ? decimal : this;
  }
  /**
   * A combination of minimum and maximum: the value returned by clamp is normally 'this', but it won't go below 'min' and it won't go above 'max'.
   * Therefore, if 'this' < 'min', then 'min' is returned, and if 'this' > 'max', then 'max' is returned.
   */
  clamp(min, max) {
    return this.max(min).min(max);
  }
  /**
   * Returns 'this', unless 'this' is less than 'min', in which case 'min' is returned.
   */
  clampMin(min) {
    return this.max(min);
  }
  /**
   * Returns 'this', unless 'this' is greater than 'max', in which case 'max' is returned.
   */
  clampMax(max) {
    return this.min(max);
  }
  /**
   * Returns 1 if 'this' is greater than 'value', returns -1 if 'this' is less than 'value', returns 0 if 'this' is equal to 'value'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  cmp_tolerance(value, tolerance) {
    const decimal = D(value);
    return this.eq_tolerance(decimal, tolerance) ? 0 : this.cmp(decimal);
  }
  /**
   * Returns 1 if 'this' is greater than 'value', returns -1 if 'this' is less than 'value', returns 0 if 'this' is equal to 'value'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  compare_tolerance(value, tolerance) {
    return this.cmp_tolerance(value, tolerance);
  }
  /**
   * Tests whether two Decimals are approximately equal, up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  eq_tolerance(value, tolerance) {
    const decimal = D(value);
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
  /**
   * Tests whether two Decimals are approximately equal, up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  equals_tolerance(value, tolerance) {
    return this.eq_tolerance(value, tolerance);
  }
  /**
   * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  neq_tolerance(value, tolerance) {
    return !this.eq_tolerance(value, tolerance);
  }
  /**
   * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  notEquals_tolerance(value, tolerance) {
    return this.neq_tolerance(value, tolerance);
  }
  /**
   * Returns true if 'this' is less than 'value'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  lt_tolerance(value, tolerance) {
    const decimal = D(value);
    return !this.eq_tolerance(decimal, tolerance) && this.lt(decimal);
  }
  /**
   * Returns true if 'this' is less than or equal to 'value'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  lte_tolerance(value, tolerance) {
    const decimal = D(value);
    return this.eq_tolerance(decimal, tolerance) || this.lt(decimal);
  }
  /**
   * Returns true if 'this' is greater than 'value'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  gt_tolerance(value, tolerance) {
    const decimal = D(value);
    return !this.eq_tolerance(decimal, tolerance) && this.gt(decimal);
  }
  /**
   * Returns true if 'this' is greater than or equal to 'value'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  gte_tolerance(value, tolerance) {
    const decimal = D(value);
    return this.eq_tolerance(decimal, tolerance) || this.gt(decimal);
  }
  /**
   * "Positive log10": Returns the base-10 logarithm of nonnegative Decimals, but returns 0 for negative Decimals.
   */
  pLog10() {
    if (this.lt(Decimal.dZero)) {
      return Decimal.dZero;
    }
    return this.log10();
  }
  /**
   * Returns the base-10 logarithm of abs('this').
   */
  absLog10() {
    if (this.sign === 0) {
      return Decimal.dNaN;
    } else if (this.layer > 0) {
      return FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
    } else {
      return FC(1, 0, Math.log10(this.mag));
    }
  }
  /**
   * Base-10 logarithm: returns the Decimal X such that 10^X = 'this'.
   * For numbers above layer 0, this is equivalent to subtracting 1 from layer and normalizing.
   */
  log10() {
    if (this.sign <= 0) {
      return Decimal.dNaN;
    } else if (this.layer > 0) {
      return FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
    } else {
      return FC(this.sign, 0, Math.log10(this.mag));
    }
  }
  /**
   * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'this'.
   */
  log(base) {
    base = D(base);
    if (this.sign <= 0) {
      return Decimal.dNaN;
    }
    if (base.sign <= 0) {
      return Decimal.dNaN;
    }
    if (base.sign === 1 && base.layer === 0 && base.mag === 1) {
      return Decimal.dNaN;
    } else if (this.layer === 0 && base.layer === 0) {
      return FC(this.sign, 0, Math.log(this.mag) / Math.log(base.mag));
    }
    return Decimal.div(this.log10(), base.log10());
  }
  /**
   * Base-2 logarithm: returns the Decimal X such that 2^X = 'this'.
   */
  log2() {
    if (this.sign <= 0) {
      return Decimal.dNaN;
    } else if (this.layer === 0) {
      return FC(this.sign, 0, Math.log2(this.mag));
    } else if (this.layer === 1) {
      return FC(Math.sign(this.mag), 0, Math.abs(this.mag) * 3.321928094887362);
    } else if (this.layer === 2) {
      return FC(Math.sign(this.mag), 1, Math.abs(this.mag) + 0.5213902276543247);
    } else {
      return FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
    }
  }
  /**
   * Base-e logarithm, also known as the "natural" logarithm: returns the Decimal X such that e^X = 'this'.
   */
  ln() {
    if (this.sign <= 0) {
      return Decimal.dNaN;
    } else if (this.layer === 0) {
      return FC(this.sign, 0, Math.log(this.mag));
    } else if (this.layer === 1) {
      return FC(Math.sign(this.mag), 0, Math.abs(this.mag) * 2.302585092994046);
    } else if (this.layer === 2) {
      return FC(Math.sign(this.mag), 1, Math.abs(this.mag) + 0.36221568869946325);
    } else {
      return FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
    }
  }
  /**
   * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'this'.
   */
  logarithm(base) {
    return this.log(base);
  }
  /**
   * Exponentiation: Returns the result of 'this' ^ 'value' (often written as 'this' ** 'value' in programming languages).
   */
  pow(value) {
    const decimal = D(value);
    const a = this;
    const b = decimal;
    if (a.sign === 0) {
      return b.eq(0) ? FC_NN(1, 0, 1) : a;
    }
    if (a.sign === 1 && a.layer === 0 && a.mag === 1) {
      return a;
    }
    if (b.sign === 0) {
      return FC_NN(1, 0, 1);
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
      return Decimal.dNaN;
    }
    return result;
  }
  /**
   * Raises 10 to the power of 'this', i.e. (10^'this'). For positive numbers above 1, this is equivalent to adding 1 to layer and normalizing.
   */
  pow10() {
    if (!Number.isFinite(this.layer) || !Number.isFinite(this.mag)) {
      return Decimal.dNaN;
    }
    let a = this;
    if (a.layer === 0) {
      const newmag = Math.pow(10, a.sign * a.mag);
      if (Number.isFinite(newmag) && Math.abs(newmag) >= 0.1) {
        return FC(1, 0, newmag);
      } else {
        if (a.sign === 0) {
          return Decimal.dOne;
        } else {
          a = FC_NN(a.sign, a.layer + 1, Math.log10(a.mag));
        }
      }
    }
    if (a.sign > 0 && a.mag >= 0) {
      return FC(a.sign, a.layer + 1, a.mag);
    }
    if (a.sign < 0 && a.mag >= 0) {
      return FC(-a.sign, a.layer + 1, -a.mag);
    }
    return Decimal.dOne;
  }
  /**
   * Exponentiation: Returns the result of 'value' ^ 'this' (often written as 'value' ** 'this' in programming languages).
   */
  pow_base(value) {
    return D(value).pow(this);
  }
  /**
   * Roots are one of the inverses of exponentiation: this function finds the Decimal X such that X ^ 'value' = 'this'.
   * Equivalent to 'this' ^ (1 / 'value'), which is written here as this.pow(value.recip()).
   */
  root(value) {
    const decimal = D(value);
    return this.pow(decimal.recip());
  }
  /**
   * For positive integers, X factorial (written as X!) equals X * (X - 1) * (X - 2) *... * 3 * 2 * 1. 0! equals 1.
   * This can be extended to real numbers (except for negative integers) via the gamma function, which is what this function does.
   */
  factorial() {
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
  /**
   * The gamma function extends the idea of factorials to non-whole numbers using some calculus.
   * Gamma(x) is defined as the integral of t^(x-1) * e^-t dt from t = 0 to t = infinity,
   * and gamma(x) = (x - 1)! for nonnegative integer x, so the factorial for non-whole numbers is defined using the gamma function.
   */
  // from HyperCalc source code
  gamma() {
    if (this.mag < 0) {
      return this.recip();
    } else if (this.layer === 0) {
      if (this.lt(FC_NN(1, 0, 24))) {
        return Decimal.fromNumber(f_gamma(this.sign * this.mag));
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
  /**
   * Returns the natural logarithm of Gamma('this').
   */
  lngamma() {
    return this.gamma().ln();
  }
  /**
   * Base-e exponentiation: returns e^'this'.
   */
  exp() {
    if (this.mag < 0) {
      return Decimal.dOne;
    }
    if (this.layer === 0 && this.mag <= 709.7) {
      return Decimal.fromNumber(Math.exp(this.sign * this.mag));
    } else if (this.layer === 0) {
      return FC(1, 1, this.sign * Math.log10(Math.E) * this.mag);
    } else if (this.layer === 1) {
      return FC(1, 2, this.sign * (Math.log10(0.4342944819032518) + this.mag));
    } else {
      return FC(1, this.layer + 1, this.sign * this.mag);
    }
  }
  /**
   * Squaring a number means multiplying it by itself, a.k.a. raising it to the second power.
   */
  sqr() {
    return this.pow(2);
  }
  /**
   * Square root: finds the Decimal X such that X * X, a.k.a X^2, equals 'this'. Equivalent to X^(1/2).
   */
  sqrt() {
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.sqrt(this.sign * this.mag));
    } else if (this.layer === 1) {
      return FC(1, 2, Math.log10(this.mag) - 0.3010299956639812);
    } else {
      const result = Decimal.div(FC_NN(this.sign, this.layer - 1, this.mag), FC_NN(1, 0, 2));
      result.layer += 1;
      result.normalize();
      return result;
    }
  }
  /**
   * Cubing a number means raising it to the third power.
   */
  cube() {
    return this.pow(3);
  }
  /**
   * Cube root: finds the Decimal X such that X^3 equals 'this'. Equivalent to X^(1/3).
   */
  cbrt() {
    return this.pow(1 / 3);
  }
  /**
   *
   * Tetration: The result of exponentiating 'this' to 'this' 'height' times in a row.  https://en.wikipedia.org/wiki/Tetration
   *
   * If payload != 1, then this is 'iterated exponentiation', the result of exping 'payload' to base 'this' 'height' times. https://andydude.github.io/tetration/archives/tetration2/ident.html
   *
   * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
  tetrate(height = 2, payload = FC_NN(1, 0, 1), linear = false) {
    if (height === 1) {
      return Decimal.pow(this, payload);
    }
    if (height === 0) {
      return new Decimal(payload);
    }
    if (this.eq(Decimal.dOne)) {
      return Decimal.dOne;
    }
    if (this.eq(-1)) {
      return Decimal.pow(this, payload);
    }
    if (height === Number.POSITIVE_INFINITY) {
      const this_num = this.toNumber();
      if (this_num <= 1.444667861009766 && this_num >= 0.06598803584531254) {
        if (this_num > 1.444667861009099) {
          return Decimal.fromNumber(Math.E);
        }
        const negln = Decimal.ln(this).neg();
        return negln.lambertw().div(negln);
      } else if (this_num > 1.444667861009766) {
        return Decimal.fromNumber(Number.POSITIVE_INFINITY);
      } else {
        return Decimal.dNaN;
      }
    }
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
    payload = D(payload);
    const oldheight = height;
    height = Math.trunc(height);
    const fracheight = oldheight - height;
    if (this.gt(Decimal.dZero) && this.lte(1.444667861009766) && (oldheight > 1e4 || !linear)) {
      height = Math.min(1e4, height);
      for (let i = 0; i < height; ++i) {
        const old_payload = payload;
        payload = this.pow(payload);
        if (old_payload.eq(payload)) {
          return payload;
        }
      }
      if (fracheight != 0 || oldheight > 1e4) {
        const next_payload = this.pow(payload);
        if (oldheight <= 1e4 || Math.ceil(oldheight) % 2 == 0) {
          return payload.mul(1 - fracheight).add(next_payload.mul(fracheight));
        } else {
          return payload.mul(fracheight).add(next_payload.mul(1 - fracheight));
        }
      }
      return payload;
    }
    if (fracheight !== 0) {
      if (payload.eq(Decimal.dOne)) {
        if (this.gt(10) || linear) {
          payload = this.pow(fracheight);
        } else {
          payload = Decimal.fromNumber(Decimal.tetrate_critical(this.toNumber(), fracheight));
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
      if (!isFinite(payload.layer) || !isFinite(payload.mag)) {
        return payload.normalize();
      }
      if (payload.layer - this.layer > 3) {
        return FC_NN(payload.sign, payload.layer + (height - i - 1), payload.mag);
      }
      if (i > 1e4) {
        return payload;
      }
    }
    return payload;
  }
  /**
   * Iterated exponentiation, the result of exping 'payload' to base 'this' 'height' times. https://andydude.github.io/tetration/archives/tetration2/ident.html
   *
   * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   *
   * Identical to tetrate.
   */
  iteratedexp(height = 2, payload = FC_NN(1, 0, 1), linear = false) {
    return this.tetrate(height, payload, linear);
  }
  /**
   * iterated log/repeated log: The result of applying log(base) 'times' times in a row. Approximately equal to subtracting 'times' from the number's slog representation. Equivalent to tetrating to a negative height.
   *
   * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
  iteratedlog(base = 10, times = 1, linear = false) {
    if (times < 0) {
      return Decimal.tetrate(base, -times, this, linear);
    }
    base = D(base);
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
      if (!isFinite(result.layer) || !isFinite(result.mag)) {
        return result.normalize();
      }
      if (i > 1e4) {
        return result;
      }
    }
    if (fraction > 0 && fraction < 1) {
      if (base.eq(10)) {
        result = result.layeradd10(-fraction, linear);
      } else {
        result = result.layeradd(-fraction, base, linear);
      }
    }
    return result;
  }
  /**
   * Super-logarithm, one of tetration's inverses, tells you what size power tower you'd have to tetrate 'base' to to get 'this'. https://en.wikipedia.org/wiki/Super-logarithm
   *
   * By definition, will never be higher than 1.8e308 in break_eternity.js, since a power tower 1.8e308 numbers tall is the largest representable number.
   *
   * Accepts a number of iterations (default is 100), and use binary search to, after making an initial guess, hone in on the true value, assuming tetration as the ground truth.
   *
   * Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
  slog(base = 10, iterations = 100, linear = false) {
    let step_size = 1e-3;
    let has_changed_directions_once = false;
    let previously_rose = false;
    let result = this.slog_internal(base, linear).toNumber();
    for (let i = 1; i < iterations; ++i) {
      const new_decimal = new Decimal(base).tetrate(result, Decimal.dOne, linear);
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
    return Decimal.fromNumber(result);
  }
  slog_internal(base = 10, linear = false) {
    base = D(base);
    if (base.lte(Decimal.dZero)) {
      return Decimal.dNaN;
    }
    if (base.eq(Decimal.dOne)) {
      return Decimal.dNaN;
    }
    if (base.lt(Decimal.dOne)) {
      if (this.eq(Decimal.dOne)) {
        return Decimal.dZero;
      }
      if (this.eq(Decimal.dZero)) {
        return Decimal.dNegOne;
      }
      return Decimal.dNaN;
    }
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
        if (linear)
          return Decimal.fromNumber(result + copy.toNumber() - 1);
        else
          return Decimal.fromNumber(result + Decimal.slog_critical(base.toNumber(), copy.toNumber()));
      } else {
        result += 1;
        copy = Decimal.log(copy, base);
      }
    }
    return Decimal.fromNumber(result);
  }
  // background info and tables of values for critical functions taken here: https://github.com/Patashu/break_eternity.js/issues/22
  static slog_critical(base, height) {
    if (base > 10) {
      return height - 1;
    }
    return Decimal.critical_section(base, height, critical_slog_values);
  }
  static tetrate_critical(base, height) {
    return Decimal.critical_section(base, height, critical_tetr_values);
  }
  static critical_section(base, height, grid, linear = false) {
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
        lower = grid[i][Math.floor(height)];
        upper = grid[i][Math.ceil(height)];
        break;
      } else if (critical_headers[i] < base && critical_headers[i + 1] > base) {
        const basefrac = (base - critical_headers[i]) / (critical_headers[i + 1] - critical_headers[i]);
        lower = grid[i][Math.floor(height)] * (1 - basefrac) + grid[i + 1][Math.floor(height)] * basefrac;
        upper = grid[i][Math.ceil(height)] * (1 - basefrac) + grid[i + 1][Math.ceil(height)] * basefrac;
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
  /**
   * Adds/removes layers from a Decimal, even fractional layers (e.g. its slog10 representation). Very similar to tetrate base 10 and iterated log base 10.
   *
   * Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
  // Moved this over to use the same critical section as tetrate/slog.
  layeradd10(diff, linear = false) {
    diff = Decimal.fromValue_noAlloc(diff).toNumber();
    const result = Decimal.fromDecimal(this);
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
      return result.layeradd(diff, 10, linear);
    }
    return result;
  }
  /**
   * layeradd: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 'base' and iterated log base 'base'.
   *
   * Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
  layeradd(diff, base, linear = false) {
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
  /**
   * The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
   * https://en.wikipedia.org/wiki/Lambert_W_function
   */
  // Some special values, for testing: https://en.wikipedia.org/wiki/Lambert_W_function#Special_values
  lambertw() {
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
      return FC_NN(this.sign, this.layer - 1, this.mag);
    }
    throw "Unhandled behavior in lambertw()";
  }
  /**
   * The super square-root function - what number, tetrated to height 2, equals 'this'? https://en.wikipedia.org/wiki/Tetration#Super-root
   */
  ssqrt() {
    return this.linear_sroot(2);
  }
  /**
   * Super-root, one of tetration's inverses - what number, tetrated to height 'degree', equals 'this'? https://en.wikipedia.org/wiki/Tetration#Super-root
   *
   * Only works with the linear approximation of tetration, as starting with analytic and then switching to linear would result in inconsistent behavior for super-roots.
   * This only matters for non-integer degrees.
   */
  // Another reason this doesn't support analytic approximation because I don't know the structure of non-linear tetrations for inputs < 1
  // TODO: Optimize this like how slog is optimized (if it isn't already)
  linear_sroot(degree) {
    if (degree == 1) {
      return this;
    }
    if (this.eq(Decimal.dInf)) {
      return Decimal.dInf;
    }
    if (!this.isFinite()) {
      return Decimal.dNaN;
    }
    if (degree > 0 && degree < 1) {
      return this.root(degree);
    }
    if (degree > -2 && degree < -1) {
      return Decimal.fromNumber(degree).add(2).pow(this.recip());
    }
    if (degree <= 0) {
      return Decimal.dNaN;
    }
    if (degree == Number.POSITIVE_INFINITY) {
      const this_num = this.toNumber();
      if (this_num < Math.E && this_num > _EXPN1) {
        return this.pow(this.recip());
      } else {
        return Decimal.dNaN;
      }
    }
    if (this.eq(1)) {
      return Decimal.dOne;
    }
    if (this.lt(0)) {
      return Decimal.dNaN;
    }
    if (this.lte("1ee-16")) {
      if (degree % 2 == 1)
        return this;
      else
        return Decimal.dNaN;
    }
    if (this.gt(1)) {
      let upperBound = Decimal.dTen;
      if (this.gte(Decimal.tetrate(10, degree, 1, true))) {
        upperBound = this.iteratedlog(10, degree - 1, true);
      }
      if (degree <= 1) {
        upperBound = this.root(degree);
      }
      let lower = Decimal.dZero;
      const layer = upperBound.layer;
      let upper = upperBound.iteratedlog(10, layer, true);
      let previous = upper;
      let guess = upper.div(2);
      let loopGoing = true;
      while (loopGoing) {
        guess = lower.add(upper).div(2);
        if (Decimal.iteratedexp(10, layer, guess, true).tetrate(degree, 1, true).gt(this))
          upper = guess;
        else
          lower = guess;
        if (guess.eq(previous))
          loopGoing = false;
        else
          previous = guess;
      }
      return Decimal.iteratedexp(10, layer, guess, true);
    } else {
      let stage = 1;
      let minimum = FC(1, 10, 1);
      let maximum = FC(1, 10, 1);
      let lower = FC(1, 10, 1);
      let upper = FC(1, 1, -16);
      let prevspan = Decimal.dZero;
      let difference = FC(1, 10, 1);
      let upperBound = upper.pow10().recip();
      let distance = Decimal.dZero;
      let prevPoint = upperBound;
      let nextPoint = upperBound;
      const evenDegree = Math.ceil(degree) % 2 == 0;
      let range = 0;
      let lastValid = FC(1, 10, 1);
      let infLoopDetector = false;
      let previousUpper = Decimal.dZero;
      let decreasingFound = false;
      while (stage < 4) {
        if (stage == 2) {
          if (evenDegree)
            break;
          else {
            lower = FC(1, 10, 1);
            upper = minimum;
            stage = 3;
            difference = FC(1, 10, 1);
            lastValid = FC(1, 10, 1);
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
            range = -1;
            if (stage == 3)
              lastValid = upper;
          } else if (upper.pow10().recip().tetrate(degree, 1, true).eq(upper.pow10().recip()) && !evenDegree && upper.pow10().recip().lt(0.4)) {
            upperBound = upper.pow10().recip();
            prevPoint = upper.pow10().recip();
            nextPoint = upper.pow10().recip();
            distance = Decimal.dZero;
            range = 0;
          } else if (upper.pow10().recip().tetrate(degree, 1, true).eq(upper.pow10().recip().mul(2).tetrate(degree, 1, true))) {
            upperBound = upper.pow10().recip();
            prevPoint = Decimal.dZero;
            nextPoint = upperBound.mul(2);
            distance = upperBound;
            if (evenDegree)
              range = -1;
            else
              range = 0;
          } else {
            prevspan = upper.mul(12e-17);
            upperBound = upper.pow10().recip();
            prevPoint = upper.add(prevspan).pow10().recip();
            distance = upperBound.sub(prevPoint);
            nextPoint = upperBound.add(distance);
            while (prevPoint.tetrate(degree, 1, true).eq(upperBound.tetrate(degree, 1, true)) || nextPoint.tetrate(degree, 1, true).eq(upperBound.tetrate(degree, 1, true)) || prevPoint.gte(upperBound) || nextPoint.lte(upperBound)) {
              prevspan = prevspan.mul(2);
              prevPoint = upper.add(prevspan).pow10().recip();
              distance = upperBound.sub(prevPoint);
              nextPoint = upperBound.add(distance);
            }
            if (stage == 1 && (nextPoint.tetrate(degree, 1, true).gt(upperBound.tetrate(degree, 1, true)) && prevPoint.tetrate(degree, 1, true).gt(upperBound.tetrate(degree, 1, true))) || stage == 3 && (nextPoint.tetrate(degree, 1, true).lt(upperBound.tetrate(degree, 1, true)) && prevPoint.tetrate(degree, 1, true).lt(upperBound.tetrate(degree, 1, true)))) {
              lastValid = upper;
            }
            if (nextPoint.tetrate(degree, 1, true).lt(upperBound.tetrate(degree, 1, true))) {
              range = -1;
            } else if (evenDegree) {
              range = 1;
            } else if (stage == 3 && upper.gt_tolerance(minimum, 1e-8)) {
              range = 0;
            } else {
              while (prevPoint.tetrate(degree, 1, true).eq_tolerance(upperBound.tetrate(degree, 1, true), 1e-8) || nextPoint.tetrate(degree, 1, true).eq_tolerance(upperBound.tetrate(degree, 1, true), 1e-8) || prevPoint.gte(upperBound) || nextPoint.lte(upperBound)) {
                prevspan = prevspan.mul(2);
                prevPoint = upper.add(prevspan).pow10().recip();
                distance = upperBound.sub(prevPoint);
                nextPoint = upperBound.add(distance);
              }
              if (nextPoint.tetrate(degree, 1, true).sub(upperBound.tetrate(degree, 1, true)).lt(upperBound.tetrate(degree, 1, true).sub(prevPoint.tetrate(degree, 1, true)))) {
                range = 0;
              } else {
                range = 1;
              }
            }
          }
          if (range == -1)
            decreasingFound = true;
          if (stage == 1 && range == 1 || stage == 3 && range != 0) {
            if (lower.eq(FC(1, 10, 1))) {
              upper = upper.mul(2);
            } else {
              let cutOff = false;
              if (infLoopDetector && (range == 1 && stage == 1 || range == -1 && stage == 3))
                cutOff = true;
              upper = upper.add(lower).div(2);
              if (cutOff)
                break;
            }
          } else {
            if (lower.eq(FC(1, 10, 1))) {
              lower = upper;
              upper = upper.div(2);
            } else {
              let cutOff = false;
              if (infLoopDetector && (range == 1 && stage == 1 || range == -1 && stage == 3))
                cutOff = true;
              lower = lower.sub(difference);
              upper = upper.sub(difference);
              if (cutOff)
                break;
            }
          }
          if (lower.sub(upper).div(2).abs().gt(difference.mul(1.5)))
            infLoopDetector = true;
          difference = lower.sub(upper).div(2).abs();
          if (upper.gt("1e18"))
            break;
          if (upper.eq(previousUpper))
            break;
        }
        if (upper.gt("1e18"))
          break;
        if (!decreasingFound)
          break;
        if (lastValid == FC(1, 10, 1)) {
          break;
        }
        if (stage == 1)
          minimum = lastValid;
        else if (stage == 3)
          maximum = lastValid;
        stage++;
      }
      lower = minimum;
      upper = FC(1, 1, -18);
      let previous = upper;
      let guess = Decimal.dZero;
      let loopGoing = true;
      while (loopGoing) {
        if (lower.eq(FC(1, 10, 1)))
          guess = upper.mul(2);
        else
          guess = lower.add(upper).div(2);
        if (Decimal.pow(10, guess).recip().tetrate(degree, 1, true).gt(this))
          upper = guess;
        else
          lower = guess;
        if (guess.eq(previous))
          loopGoing = false;
        else
          previous = guess;
        if (upper.gt("1e18"))
          return Decimal.dNaN;
      }
      if (!guess.eq_tolerance(minimum, 1e-15)) {
        return guess.pow10().recip();
      } else {
        if (maximum.eq(FC(1, 10, 1))) {
          return Decimal.dNaN;
        }
        lower = FC(1, 10, 1);
        upper = maximum;
        previous = upper;
        guess = Decimal.dZero;
        loopGoing = true;
        while (loopGoing) {
          if (lower.eq(FC(1, 10, 1)))
            guess = upper.mul(2);
          else
            guess = lower.add(upper).div(2);
          if (Decimal.pow(10, guess).recip().tetrate(degree, 1, true).gt(this))
            upper = guess;
          else
            lower = guess;
          if (guess.eq(previous))
            loopGoing = false;
          else
            previous = guess;
          if (upper.gt("1e18"))
            return Decimal.dNaN;
        }
        return guess.pow10().recip();
      }
    }
  }
  /**
   * Pentation/pentate: The result of tetrating 'height' times in a row. An absurdly strong operator - Decimal.pentate(2, 4.28) and Decimal.pentate(10, 2.37) are already too huge for break_eternity.js!
   * https://en.wikipedia.org/wiki/Pentation
   *
   * Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   *
   * For non-whole pentation heights, the linear approximation of pentation is always used, as there is no defined analytic approximation of pentation.
   */
  pentate(height = 2, payload = FC_NN(1, 0, 1), linear = false) {
    payload = D(payload);
    const oldheight = height;
    height = Math.trunc(height);
    const fracheight = oldheight - height;
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
  /**
   * The sine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
   */
  sin() {
    if (this.mag < 0) {
      return this;
    }
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.sin(this.sign * this.mag));
    }
    return FC_NN(0, 0, 0);
  }
  /**
   * The cosine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
   */
  cos() {
    if (this.mag < 0) {
      return Decimal.dOne;
    }
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.cos(this.sign * this.mag));
    }
    return FC_NN(0, 0, 0);
  }
  /**
   * The tangent function, equal to sine divided by cosine. Behaves periodically with period pi.
   */
  tan() {
    if (this.mag < 0) {
      return this;
    }
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.tan(this.sign * this.mag));
    }
    return FC_NN(0, 0, 0);
  }
  /**
   * The arcsine function, the inverse of the sine function.
   */
  asin() {
    if (this.mag < 0) {
      return this;
    }
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.asin(this.sign * this.mag));
    }
    return FC_NN(Number.NaN, Number.NaN, Number.NaN);
  }
  /**
   * The arccosine function, the inverse of the cosine function.
   */
  acos() {
    if (this.mag < 0) {
      return Decimal.fromNumber(Math.acos(this.toNumber()));
    }
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.acos(this.sign * this.mag));
    }
    return FC_NN(Number.NaN, Number.NaN, Number.NaN);
  }
  /**
   * The arctangent function, the inverse of the tangent function.
   */
  atan() {
    if (this.mag < 0) {
      return this;
    }
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.atan(this.sign * this.mag));
    }
    return Decimal.fromNumber(Math.atan(this.sign * Infinity));
  }
  /**
   * Hyperbolic sine: sinh(X) = (e^x - e^-x)/2.
   */
  sinh() {
    return this.exp().sub(this.negate().exp()).div(2);
  }
  /**
   * Hyperbolic cosine: cosh(x) = (e^x + e^-x)/2.
   */
  cosh() {
    return this.exp().add(this.negate().exp()).div(2);
  }
  /**
   * Hyperbolic tangent: tanh(x) = sinh(x)/cosh(x).
   */
  tanh() {
    return this.sinh().div(this.cosh());
  }
  /**
   * Hyperbolic arcsine, the inverse of hyperbolic sine.
   */
  asinh() {
    return Decimal.ln(this.add(this.sqr().add(1).sqrt()));
  }
  /**
   * Hyperbolic arccosine, the inverse of hyperbolic cosine.
   */
  acosh() {
    return Decimal.ln(this.add(this.sqr().sub(1).sqrt()));
  }
  /**
   * Hyperbolic arcctangent, the inverse of hyperbolic tangent.
   */
  atanh() {
    if (this.abs().gte(1)) {
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    return Decimal.ln(this.add(1).div(Decimal.fromNumber(1).sub(this))).div(2);
  }
  /**
   * Joke function from Realm Grinder
   */
  ascensionPenalty(ascensions) {
    if (ascensions === 0) {
      return this;
    }
    return this.root(Decimal.pow(10, ascensions));
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
  static smoothDamp(current, target, smoothing, deltaTime) {
    return new Decimal(current).add(new Decimal(target).minus(new Decimal(current)).times(new Decimal(smoothing)).times(new Decimal(deltaTime)));
  }
  /**
   * Creates a clone of the E instance.
   * @deprecated
   * @returns A EClone instance that is a clone of the original.
   */
  clone() {
    return this;
  }
  /**
   * Creates a clone of the E instance. Helps with a webpack(?) bug
   * @alias Decimal.normalizeFromComponents
   * @param x - The number to clone
   * @returns - The cloned number
   */
  static clone(x) {
    return Decimal.fromComponents(x.sign, x.layer, x.mag);
  }
  /**
   * Applies a soft cap to a DecimalClone value using a specified soft cap function.
   * @param start - The value at which the soft cap starts.
   * @param power - The power or factor used in the soft cap calculation.
   * @param mode - The soft cap mode. Use "pow" for power soft cap, "mul" for multiplication soft cap,
   *                       or "exp" for exponential soft cap.
   * @returns - The DecimalClone value after applying the soft cap.
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
  static softcap(value, start, power, mode) {
    return new Decimal(value).softcap(start, power, mode);
  }
  /**
   * Scales a currency value using a specified scaling function.
   * @param s - The value at which scaling starts.
   * @param p - The scaling factor.
   * @param mode - The scaling mode. Use "pow" for power scaling or "exp" for exponential scaling.
   * @param [rev] - Whether to reverse the scaling operation (unscaling).
   * @returns - The scaled currency value.
   */
  scale(s, p, mode, rev = false) {
    s = new Decimal(s);
    p = new Decimal(p);
    let x = this.clone();
    if (x.gte(s)) {
      if ([0, "pow"].includes(mode)) {
        x = rev ? x.mul(s.pow(p.sub(1))).root(p) : (
          // (x * s^(p - 1))^(1 / p)
          x.pow(p).div(s.pow(p.sub(1)))
        );
      }
      if ([1, "exp"].includes(mode)) {
        x = rev ? x.div(s).max(1).log(p).add(s) : (
          // log_p((x / s).max(1)) + s
          Decimal.pow(p, x.sub(s)).mul(s)
        );
      }
    }
    return x;
  }
  static scale(value, s, p, mode, rev = false) {
    return new Decimal(value).scale(s, p, mode, rev);
  }
  /**
   * Formats the E instance with a specified accuracy and maximum decimal places.
   * @param [acc] - The desired accuracy (number of significant figures), defaults to `2`.
   * @param [max] - The maximum number of decimal places to display, defaults to `9`.
   * @param [type] - The type of format, defaults to `"mixed_sc"`.
   * @returns A string representing the formatted E value.
   */
  format(acc = 2, max = 9, type = "mixed_sc") {
    return formats.format(this.clone(), acc, max, type);
  }
  /**
   * Formats the E instance with a specified accuracy and maximum decimal places.
   * @param e - The E instance to format.
   * @param [acc] - The desired accuracy (number of significant figures), defaults to `2`.
   * @param [max] - The maximum number of decimal places to display, defaults to `9`.
   * @param [type] - The type of format, defaults to `"mixed_sc"`.
   * @returns A string representing the formatted E value.
   */
  static format(e, acc = 2, max = 9, type = "mixed_sc") {
    return formats.format(new Decimal(e), acc, max, type);
  }
  /**
   * Formats the E instance in standard leter notation with a specified accuracy and maximum decimal places.
   * @param [acc] - The desired accuracy (number of significant figures).
   * @param [max] - The maximum number of decimal places to display.
   * @param [type] - The type of format (default standard)
   * @returns A string representing the formatted E value.
   */
  formatST(acc = 2, max = 9, type = "st") {
    return formats.format(this.clone(), acc, max, type);
  }
  static formatST(value, acc = 2, max = 9, type = "st") {
    return formats.format(new Decimal(value), acc, max, type);
  }
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
  formatGain(gain, type = "mixed_sc", acc, max) {
    return formats.formatGain(this.clone(), gain, type, acc, max);
  }
  static formatGain(value, gain, type = "mixed_sc", acc, max) {
    return formats.formatGain(new Decimal(value), gain, type, acc, max);
  }
  /**
   * Converts the E instance to a Roman numeral representation.
   * @param [max] - Max before it returns the original
   * @returns A string representing the Roman numeral equivalent of the E value,
   * or the original E instance if it is greater than or equal to 5000 or less than 1.
   */
  toRoman(max = 5e3) {
    max = new Decimal(max);
    const num = this.clone();
    if (num.gte(max) || num.lt(1))
      return num;
    let newNum = num.toNumber();
    const roman = {
      M: 1e3,
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
    let str = "";
    for (const i of Object.keys(roman)) {
      const q = Math.floor(newNum / roman[i]);
      newNum -= q * roman[i];
      str += i.repeat(q);
    }
    return str;
  }
  static toRoman(value, max) {
    return new Decimal(value).toRoman(max);
  }
};
Decimal.dZero = FC_NN(0, 0, 0);
Decimal.dOne = FC_NN(1, 0, 1);
Decimal.dNegOne = FC_NN(-1, 0, 1);
Decimal.dTwo = FC_NN(1, 0, 2);
Decimal.dTen = FC_NN(1, 0, 10);
Decimal.dNaN = FC_NN(Number.NaN, Number.NaN, Number.NaN);
Decimal.dInf = FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
Decimal.dNegInf = FC_NN(-1, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
Decimal.dNumberMax = FC(1, 0, Number.MAX_VALUE);
Decimal.dNumberMin = FC(1, 0, Number.MIN_VALUE);
Decimal.fromStringCache = new LRUCache(DEFAULT_FROM_STRING_CACHE_SIZE);
__decorateClass([
  Expose()
], Decimal.prototype, "sign", 2);
__decorateClass([
  Expose()
], Decimal.prototype, "mag", 2);
__decorateClass([
  Expose()
], Decimal.prototype, "layer", 2);
Decimal = __decorateClass([
  Exclude()
], Decimal);
var ST_NAMES = [
  [
    // Tier 1 (0-1e3000)
    ["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"],
    ["", "Dc", "Vg", "Tg", "Qag", "Qtg", "Sxg", "Spg", "Ocg", "Nog"],
    ["", "Ce", "De", "Te", "Qae", "Qte", "Sxe", "Spe", "Oce", "Noe"]
  ],
  [
    // Higher tiers
    ["", "Mi", "Mc", "Na", "Pc", "Fm", "At", "Zp", "Yc", "Xn"],
    ["", "Me", "Du", "Tr", "Te", "Pe", "He", "Hp", "Ot", "En"],
    ["", "c", "Ic", "TCn", "TeC", "PCn", "HCn", "HpC", "OCn", "ECn"],
    ["", "Hc", "DHe", "THt", "TeH", "PHc", "HHe", "HpH", "OHt", "EHc"]
  ]
];
var FORMATS = {
  /** Omega format */
  omega: {
    config: {
      greek: "\u03B2\u03B6\u03BB\u03C8\u03A3\u0398\u03A8\u03C9",
      infinity: "\u03A9"
    },
    /**
     * Format the value into omega format
     * @param value - The value to format
     * @returns - The formatted value
     */
    format(value) {
      value = new Decimal(value);
      const step = Decimal.floor(value.div(1e3));
      const omegaAmount = Decimal.floor(step.div(FORMATS.omega.config.greek.length));
      let lastLetter = FORMATS.omega.config.greek[step.toNumber() % FORMATS.omega.config.greek.length] + toSubscript(value.toNumber() % 1e3);
      const beyondGreekArrayBounds = FORMATS.omega.config.greek[step.toNumber() % FORMATS.omega.config.greek.length] === void 0;
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
        return `\u03C9(${FORMATS.omega.format(omegaAmount)})^${lastLetter}`;
      } else if (omegaOrder < 6) {
        return `\u03C9(${FORMATS.omega.format(omegaAmount)})`;
      }
      const val = Decimal.pow(8e3, omegaOrder % 1);
      const orderStr = omegaOrder < 100 ? Math.floor(omegaOrder).toFixed(0) : FORMATS.omega.format(Decimal.floor(omegaOrder));
      return `\u03C9[${orderStr}](${FORMATS.omega.format(val)})`;
    }
  },
  /** Short omega format */
  omega_short: {
    config: {
      greek: "\u03B2\u03B6\u03BB\u03C8\u03A3\u0398\u03A8\u03C9",
      infinity: "\u03A9"
    },
    /**
     * Format the value into short omega format
     * @param value - The value to format
     * @returns - The formatted value
     */
    format(value) {
      value = new Decimal(value);
      const step = Decimal.floor(value.div(1e3));
      const omegaAmount = Decimal.floor(step.div(FORMATS.omega_short.config.greek.length));
      let lastLetter = FORMATS.omega_short.config.greek[step.toNumber() % FORMATS.omega_short.config.greek.length] + toSubscript(value.toNumber() % 1e3);
      const beyondGreekArrayBounds = FORMATS.omega_short.config.greek[step.toNumber() % FORMATS.omega_short.config.greek.length] === void 0;
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
      const orderStr = omegaOrder < 100 ? Math.floor(omegaOrder).toFixed(0) : FORMATS.omega_short.format(Decimal.floor(omegaOrder));
      return `\u03C9[${orderStr}](${FORMATS.omega_short.format(val)})`;
    }
  },
  elemental: {
    config: {
      /** The list of elements */
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
      const length = FORMATS.elemental.abbreviationLength(group);
      const elemRel = Math.floor(length * progress);
      const elem = elemRel + FORMATS.elemental.getOffset(group);
      return elem > 118 ? FORMATS.elemental.beyondOg(elem) : FORMATS.elemental.config.element_lists[group - 1][elemRel];
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
      const abbreviationLength = FORMATS.elemental.abbreviationLength(abbreviationListIndex);
      const abbreviationProgress = abbreviationListUnfloored - abbreviationListIndex + 1;
      const abbreviationIndex = Math.floor(abbreviationProgress * abbreviationLength);
      const abbreviation = FORMATS.elemental.getAbbreviation(abbreviationListIndex, abbreviationProgress);
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
        return "e" + FORMATS.elemental.format(value.log10(), acc);
      let log = value.log(118);
      const slog = log.log(118);
      const sslog = slog.log(118).toNumber();
      const max = Math.max(4 - sslog * 2, 1);
      const parts = [];
      while (log.gte(1) && parts.length < max) {
        const [abbreviation, value2] = FORMATS.elemental.getAbbreviationAndValue(log);
        const n = log.div(value2).floor();
        log = log.sub(n.mul(value2));
        parts.unshift([abbreviation, n]);
      }
      if (parts.length >= max) {
        return parts.map((x) => FORMATS.elemental.formatElementalPart(x[0], x[1])).join(" + ");
      }
      const formattedMantissa = new Decimal(118).pow(log).toFixed(parts.length === 1 ? 3 : acc);
      if (parts.length === 0) {
        return formattedMantissa;
      }
      if (parts.length === 1) {
        return `${formattedMantissa} \xD7 ${FORMATS.elemental.formatElementalPart(parts[0][0], parts[0][1])}`;
      }
      return `${formattedMantissa} \xD7 (${parts.map((x) => FORMATS.elemental.formatElementalPart(x[0], x[1])).join(" + ")})`;
    }
  },
  /** Old scientific format */
  old_sc: {
    /**
     * Format the value into old scientific format
     * @param ex - The value to format
     * @param acc - The accuracy
     * @returns - The formatted value
     */
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
          return (slog.gte(1e9) ? "" : new Decimal(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + FORMATS.old_sc.format(slog.floor(), 0);
        }
        const m = ex.div(new Decimal(10).pow(e));
        return (e.log10().gte(9) ? "" : m.toFixed(4)) + "e" + FORMATS.old_sc.format(e, 0);
      }
    }
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
          return (slog.gte(1e9) ? "" : new Decimal(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + FORMATS.eng.format(slog.floor(), 0);
        }
        const m = ex.div(new Decimal(1e3).pow(e.div(3).floor()));
        return (e.log10().gte(9) ? "" : m.toFixed(new Decimal(4).sub(e.sub(e.div(3).floor().mul(3))).toNumber())) + "e" + FORMATS.eng.format(e.div(3).floor().mul(3), 0);
      }
    }
  },
  /** Mixed scientific format */
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
    format(ex, acc, max) {
      ex = new Decimal(ex);
      const e = ex.log10().floor();
      if (e.lt(303) && e.gte(max))
        return format(ex, acc, max, "st");
      else
        return format(ex, acc, max, "sc");
    }
  },
  /** Layer format */
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
      return format(ex, Math.max(4, acc), max, "sc") + " " + (meta.gte(1) ? "meta" + (meta.gte(2) ? "^" + format(meta, 0, max, "sc") : "") + "-" : "") + (isNaN(layer_id) ? "nanity" : FORMATS.layer.layers[layer_id]);
    }
  },
  /** Standard (letter abbv) format */
  standard: {
    /**
     * Gets the letter abbreviation for a number (e.g. 1 -> K) (0-1e3000)
     * @param x - The number to get the letter abbreviation for
     * @returns - The letter abbreviation
     */
    tier1(x) {
      return ST_NAMES[0][0][x % 10] + ST_NAMES[0][1][Math.floor(x / 10) % 10] + ST_NAMES[0][2][Math.floor(x / 100)];
    },
    /**
     * Gets the tier 2 letter abbreviation for a number (e.g. 1 -> Mi) (1e3000+)
     * @param x - The number to get the letter abbreviation for
     * @returns - The letter abbreviation
     */
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
  /** Infinity format */
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
    case "scientific": {
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
    }
    case "st":
    case "standard": {
      let e3 = ex.log(1e3).floor();
      if (e3.lt(1)) {
        return neg + ex.toFixed(Math.max(Math.min(acc - e.toNumber(), acc), 0));
      }
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
      const fixedAmt = acc === 2 ? new Decimal(2).sub(e.sub(e3_mul)).add(1).toNumber() : acc;
      return neg + (ee.gte(10) ? "" : m.toFixed(fixedAmt) + " ") + final;
    }
    default:
      if (!FORMATS[type])
        console.error(`Invalid format type "`, type, `"`);
      return neg + FORMATS[type]?.format(ex, acc, max);
  }
}
function formatGain(amt, gain, type = "mixed_sc", acc, max) {
  amt = new Decimal(amt);
  gain = new Decimal(gain);
  const next = amt.add(gain);
  let rate;
  let ooms = next.div(amt);
  if (ooms.gte(10) && amt.gte(1e100)) {
    ooms = ooms.log10().mul(20);
    rate = "(+" + format(ooms, acc, max, type) + " OoMs/sec)";
  } else
    rate = "(+" + format(gain, acc, max, type) + "/sec)";
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
function formatTimeLong(ex, ms = false, acc = 0, max = 9, type = "mixed_sc") {
  const formatFn = (ex2) => format(ex2, acc, max, type);
  ex = new Decimal(ex);
  const mls = ex.mul(1e3).mod(1e3).floor();
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
  const abb = ((abbM) => {
    return abbM.map((x, i) => {
      return {
        name: x.name,
        altName: x.altName,
        value: Decimal.pow(1e3, new Decimal(i).add(1))
      };
    });
  })([
    {
      name: "K",
      altName: "Kilo"
    },
    {
      name: "M",
      altName: "Mega"
    },
    {
      name: "G",
      altName: "Giga"
    },
    {
      name: "T",
      altName: "Tera"
    },
    {
      name: "P",
      altName: "Peta"
    },
    {
      name: "E",
      altName: "Exa"
    },
    {
      name: "Z",
      altName: "Zetta"
    },
    {
      name: "Y",
      altName: "Yotta"
    },
    {
      name: "R",
      altName: "Ronna"
    },
    {
      name: "Q",
      altName: "Quetta"
    }
  ]);
  let output = "";
  const abbNum = num.lte(0) ? 0 : Decimal.min(Decimal.log(num, 1e3).sub(1), abb.length - 1).floor().toNumber();
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
  formatTimeLong,
  formatReduction,
  formatPercent,
  formatMult,
  expMult,
  metric,
  ev
} };
Decimal.formats = formats;

// src/E/eMain.ts
var E = (() => {
  const out = (x) => new Decimal(x);
  Object.getOwnPropertyNames(Decimal).filter((b) => !Object.getOwnPropertyNames(class {
  }).includes(b)).forEach((prop) => {
    out[prop] = Decimal[prop];
  });
  return out;
})();

// src/presets/gameFormats.ts
function gameFormat(value, settings) {
  settings = Object.assign({
    formatType: "mixed_sc",
    acc: 2,
    max: 9
  }, settings);
  const { formatType, acc, max, time, multi, formatTimeType } = settings;
  if (time) {
    switch (formatTimeType) {
      case "short":
        return E.formats.formatTime(value, acc, formatType);
      case "long":
        return E.formats.formatTimeLong(value, true, 0, max, formatType);
    }
  }
  if (multi) {
    return E.formats.formatMult(value, acc);
  }
  return E.format(value, acc, max, formatType);
}
function gameFormatGain(value, gain, settings) {
  const { formatType, acc, max } = settings;
  return E.formatGain(value, gain, formatType, acc, max);
}
var GameFormatClass = class {
  constructor(settings) {
    /**
     * Formats a game value based on the settings.
     * @param x - The value to format.
     * @returns The formatted value as a string.
     */
    this.format = (x) => gameFormat(x, this.settings);
    /**
     * Formats the gain of a game format based on the provided settings.
     * @param x - The value to format.
     * @param gain - The gain to apply.
     * @returns The formatted gain as a string.
     */
    this.gain = (x, gain) => gameFormatGain(x, gain, this.settings);
    /**
     * Formats a game value as a time based on the settings.
     * @param x - The value to format.
     * @returns The formatted value as a string.
     */
    this.time = (x) => gameFormat(x, { ...this.settings, time: true });
    /**
     * Formats a game value as a multiplier based on the settings.
     * @param x - The value to format.
     * @returns The formatted value as a string.
     */
    this.multi = (x) => gameFormat(x, { ...this.settings, multi: true });
    this.settingsFn = typeof settings === "function" ? settings : () => settings;
  }
  /**
   * @returns The settings to use for formatting.
   */
  get settings() {
    return this.settingsFn();
  }
};
var formatOptions = [
  {
    name: "Standard",
    value: "standard"
  },
  {
    name: "Scientific",
    value: "scientific"
  },
  {
    name: "Mixed Scientific (default)",
    value: "mixed_sc"
  },
  {
    name: "Old Scientific",
    value: "old_sc"
  },
  {
    name: "Engineering",
    value: "eng"
  },
  {
    name: "Infinity",
    value: "inf"
  },
  {
    name: "Omega",
    value: "omega"
  },
  {
    name: "Omega Short",
    value: "omega_short"
  },
  {
    name: "Elemental",
    value: "elemental"
  },
  {
    name: "Layer",
    value: "layer"
  }
].sort((a, b) => a.name.localeCompare(b.name));
var formatTimeOptions = [
  {
    name: "Short (default)",
    value: "short"
  },
  {
    name: "Long",
    value: "long"
  }
].sort((a, b) => a.name.localeCompare(b.name));
if (typeof module.exports == "object" && typeof exports == "object") {
    var __cp = (to, from, except, desc) => {
      if ((from && typeof from === "object") || typeof from === "function") {
        for (let key of Object.getOwnPropertyNames(from)) {
          if (!Object.prototype.hasOwnProperty.call(to, key) && key !== except)
          Object.defineProperty(to, key, {
            get: () => from[key],
            enumerable: !(desc = Object.getOwnPropertyDescriptor(from, key)) || desc.enumerable,
          });
        }
      }
      return to;
    };
    module.exports = __cp(module.exports, exports);
  }
  return module.exports;
  }))
