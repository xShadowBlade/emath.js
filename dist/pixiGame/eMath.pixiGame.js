(function (g, f) {
    var hasExports = typeof exports === 'object';
    if (typeof define === "function" && define.amd) {
      define(['pixi.js'], f);
    } else if (typeof module === "object" && module.exports) {
      module.exports = f(require('pixi.js'));
    } else {
      var m = hasExports ? f(require('pixi.js')) : f(g["pixi.js"]);
      var root = hasExports ? exports : g;
      
    }}(typeof self !== 'undefined' ? self : this, (__da) => {
  var exports = {};
  var module = { exports };
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/lz-string/libs/lz-string.js
var require_lz_string = __commonJS({
  "node_modules/lz-string/libs/lz-string.js"(exports, module2) {
    var LZString2 = function() {
      var f = String.fromCharCode;
      var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
      var baseReverseDic = {};
      function getBaseValue(alphabet, character) {
        if (!baseReverseDic[alphabet]) {
          baseReverseDic[alphabet] = {};
          for (var i = 0; i < alphabet.length; i++) {
            baseReverseDic[alphabet][alphabet.charAt(i)] = i;
          }
        }
        return baseReverseDic[alphabet][character];
      }
      var LZString3 = {
        compressToBase64: function(input) {
          if (input == null)
            return "";
          var res = LZString3._compress(input, 6, function(a) {
            return keyStrBase64.charAt(a);
          });
          switch (res.length % 4) {
            default:
            case 0:
              return res;
            case 1:
              return res + "===";
            case 2:
              return res + "==";
            case 3:
              return res + "=";
          }
        },
        decompressFromBase64: function(input) {
          if (input == null)
            return "";
          if (input == "")
            return null;
          return LZString3._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrBase64, input.charAt(index));
          });
        },
        compressToUTF16: function(input) {
          if (input == null)
            return "";
          return LZString3._compress(input, 15, function(a) {
            return f(a + 32);
          }) + " ";
        },
        decompressFromUTF16: function(compressed) {
          if (compressed == null)
            return "";
          if (compressed == "")
            return null;
          return LZString3._decompress(compressed.length, 16384, function(index) {
            return compressed.charCodeAt(index) - 32;
          });
        },
        //compress into uint8array (UCS-2 big endian format)
        compressToUint8Array: function(uncompressed) {
          var compressed = LZString3.compress(uncompressed);
          var buf = new Uint8Array(compressed.length * 2);
          for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
            var current_value = compressed.charCodeAt(i);
            buf[i * 2] = current_value >>> 8;
            buf[i * 2 + 1] = current_value % 256;
          }
          return buf;
        },
        //decompress from uint8array (UCS-2 big endian format)
        decompressFromUint8Array: function(compressed) {
          if (compressed === null || compressed === void 0) {
            return LZString3.decompress(compressed);
          } else {
            var buf = new Array(compressed.length / 2);
            for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
              buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
            }
            var result = [];
            buf.forEach(function(c) {
              result.push(f(c));
            });
            return LZString3.decompress(result.join(""));
          }
        },
        //compress into a string that is already URI encoded
        compressToEncodedURIComponent: function(input) {
          if (input == null)
            return "";
          return LZString3._compress(input, 6, function(a) {
            return keyStrUriSafe.charAt(a);
          });
        },
        //decompress from an output of compressToEncodedURIComponent
        decompressFromEncodedURIComponent: function(input) {
          if (input == null)
            return "";
          if (input == "")
            return null;
          input = input.replace(/ /g, "+");
          return LZString3._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrUriSafe, input.charAt(index));
          });
        },
        compress: function(uncompressed) {
          return LZString3._compress(uncompressed, 16, function(a) {
            return f(a);
          });
        },
        _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
          if (uncompressed == null)
            return "";
          var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
          for (ii = 0; ii < uncompressed.length; ii += 1) {
            context_c = uncompressed.charAt(ii);
            if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
              context_dictionary[context_c] = context_dictSize++;
              context_dictionaryToCreate[context_c] = true;
            }
            context_wc = context_w + context_c;
            if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
              context_w = context_wc;
            } else {
              if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 8; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                } else {
                  value = 1;
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | value;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = 0;
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 16; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                }
                delete context_dictionaryToCreate[context_w];
              } else {
                value = context_dictionary[context_w];
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              context_dictionary[context_wc] = context_dictSize++;
              context_w = String(context_c);
            }
          }
          if (context_w !== "") {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
              if (context_w.charCodeAt(0) < 256) {
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 8; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              } else {
                value = 1;
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = 0;
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 16; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              delete context_dictionaryToCreate[context_w];
            } else {
              value = context_dictionary[context_w];
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
          }
          value = 2;
          for (i = 0; i < context_numBits; i++) {
            context_data_val = context_data_val << 1 | value & 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
          while (true) {
            context_data_val = context_data_val << 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data.push(getCharFromInt(context_data_val));
              break;
            } else
              context_data_position++;
          }
          return context_data.join("");
        },
        decompress: function(compressed) {
          if (compressed == null)
            return "";
          if (compressed == "")
            return null;
          return LZString3._decompress(compressed.length, 32768, function(index) {
            return compressed.charCodeAt(index);
          });
        },
        _decompress: function(length, resetValue, getNextValue) {
          var dictionary = [], next, enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c, data = { val: getNextValue(0), position: resetValue, index: 1 };
          for (i = 0; i < 3; i += 1) {
            dictionary[i] = i;
          }
          bits = 0;
          maxpower = Math.pow(2, 2);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          switch (next = bits) {
            case 0:
              bits = 0;
              maxpower = Math.pow(2, 8);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 1:
              bits = 0;
              maxpower = Math.pow(2, 16);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 2:
              return "";
          }
          dictionary[3] = c;
          w = c;
          result.push(c);
          while (true) {
            if (data.index > length) {
              return "";
            }
            bits = 0;
            maxpower = Math.pow(2, numBits);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            switch (c = bits) {
              case 0:
                bits = 0;
                maxpower = Math.pow(2, 8);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 1:
                bits = 0;
                maxpower = Math.pow(2, 16);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 2:
                return result.join("");
            }
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
            if (dictionary[c]) {
              entry = dictionary[c];
            } else {
              if (c === dictSize) {
                entry = w + w.charAt(0);
              } else {
                return null;
              }
            }
            result.push(entry);
            dictionary[dictSize++] = w + entry.charAt(0);
            enlargeIn--;
            w = entry;
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
          }
        }
      };
      return LZString3;
    }();
    if (typeof define === "function" && define.amd) {
      define(function() {
        return LZString2;
      });
    } else if (typeof module2 !== "undefined" && module2 != null) {
      module2.exports = LZString2;
    } else if (typeof angular !== "undefined" && angular != null) {
      angular.module("LZString", []).factory("LZString", function() {
        return LZString2;
      });
    }
  }
});

// src/pixiGame/index.ts
var pixiGame_exports = {};
__export(pixiGame_exports, {
  pixiGame: () => pixiGame,
  sprite: () => sprite
});
module.exports = __toCommonJS(pixiGame_exports);

// src/pixiGame/hookPixiGame.ts
function hookPixiGame() {
  if (!(typeof process !== "object" && typeof window !== "undefined")) {
    return;
  }
  if (typeof process !== "undefined") {
    console.error("eMath.js/pixiGame is not supported in browser environments. \n This requirement might be removed in the future.");
    return;
  }
  return;
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
  static mod(value, other) {
    return _Decimal.fromValue_noAlloc(value).mod(other);
  }
  static modulo(value, other) {
    return _Decimal.fromValue_noAlloc(value).modulo(other);
  }
  static modular(value, other) {
    return _Decimal.fromValue_noAlloc(value).modular(other);
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
  static tetrate(value, height = 2, payload = _Decimal.fromComponents_noNormalize(1, 0, 1), linear = false) {
    return _Decimal.fromValue_noAlloc(value).tetrate(height, payload, linear);
  }
  static iteratedexp(value, height = 2, payload = _Decimal.fromComponents_noNormalize(1, 0, 1), linear = false) {
    return _Decimal.fromValue_noAlloc(value).iteratedexp(height, payload, linear);
  }
  static iteratedlog(value, base = 10, times = 1, linear = false) {
    return _Decimal.fromValue_noAlloc(value).iteratedlog(base, times, linear);
  }
  static layeradd10(value, diff, linear = false) {
    return _Decimal.fromValue_noAlloc(value).layeradd10(diff, linear);
  }
  static layeradd(value, diff, base = 10, linear = false) {
    return _Decimal.fromValue_noAlloc(value).layeradd(diff, base, linear);
  }
  static slog(value, base = 10, linear = false) {
    return _Decimal.fromValue_noAlloc(value).slog(base, 100, linear);
  }
  static lambertw(value) {
    return _Decimal.fromValue_noAlloc(value).lambertw();
  }
  static ssqrt(value) {
    return _Decimal.fromValue_noAlloc(value).ssqrt();
  }
  static linear_sroot(value, height) {
    return _Decimal.fromValue_noAlloc(value).linear_sroot(height);
  }
  static pentate(value, height = 2, payload = _Decimal.fromComponents_noNormalize(1, 0, 1), linear = false) {
    return _Decimal.fromValue_noAlloc(value).pentate(height, payload, linear);
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
  tetrate(height = 2, payload = _Decimal.fromComponents_noNormalize(1, 0, 1), linear = false) {
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
      return _Decimal.iteratedlog(payload, this, -height, linear);
    }
    payload = _Decimal.fromValue_noAlloc(payload);
    const oldheight = height;
    height = Math.trunc(height);
    const fracheight = oldheight - height;
    if (this.gt(_Decimal.dZero) && this.lte(1.444667861009766) && (oldheight > 1e4 || !linear)) {
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
      if (payload.eq(_Decimal.dOne)) {
        if (this.gt(10) || linear) {
          payload = this.pow(fracheight);
        } else {
          payload = _Decimal.fromNumber(_Decimal.tetrate_critical(this.toNumber(), fracheight));
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
        return _Decimal.fromComponents_noNormalize(payload.sign, payload.layer + (height - i - 1), payload.mag);
      }
      if (i > 1e4) {
        return payload;
      }
    }
    return payload;
  }
  // iteratedexp/iterated exponentiation: - all cases handled in tetrate, so just call it
  iteratedexp(height = 2, payload = _Decimal.fromComponents_noNormalize(1, 0, 1), linear = false) {
    return this.tetrate(height, payload, linear);
  }
  // iterated log/repeated log: The result of applying log(base) 'times' times in a row. Approximately equal to subtracting (times) from the number's slog representation. Equivalent to tetrating to a negative height.
  // Works with negative and positive real heights.
  iteratedlog(base = 10, times = 1, linear = false) {
    if (times < 0) {
      return _Decimal.tetrate(base, -times, this, linear);
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
  slog(base = 10, iterations = 100, linear = false) {
    let step_size = 1e-3;
    let has_changed_directions_once = false;
    let previously_rose = false;
    let result = this.slog_internal(base, linear).toNumber();
    for (let i = 1; i < iterations; ++i) {
      const new_decimal = new _Decimal(base).tetrate(result, _Decimal.dOne, linear);
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
  slog_internal(base = 10, linear = false) {
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
        if (linear)
          return _Decimal.fromNumber(result + copy.toNumber() - 1);
        else
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
  // Function for adding/removing layers from a Decimal, even fractional layers (e.g. its slog10 representation).
  // Moved this over to use the same critical section as tetrate/slog.
  layeradd10(diff, linear = false) {
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
      return result.layeradd(diff, 10, linear);
    }
    return result;
  }
  // layeradd: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 'base' and iterated log base 'base'.
  layeradd(diff, base, linear = false) {
    const slogthis = this.slog(base).toNumber();
    const slogdest = slogthis + diff;
    if (slogdest >= 0) {
      return _Decimal.tetrate(base, slogdest, _Decimal.dOne, linear);
    } else if (!Number.isFinite(slogdest)) {
      return _Decimal.dNaN;
    } else if (slogdest >= -1) {
      return _Decimal.log(_Decimal.tetrate(base, slogdest + 1, _Decimal.dOne, linear), base);
    } else {
      return _Decimal.log(_Decimal.log(_Decimal.tetrate(base, slogdest + 2, _Decimal.dOne, linear), base), base);
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
  // Super-root, one of tetration's inverses - what number, tetrated to height (height), equals this?
  // Only works with the linear approximation, because I don't know the structure of non-linear tetrations for inputs < 1
  // TODO: Optimize this like how slog is optimized
  linear_sroot(degree) {
    if (degree == 1) {
      return this;
    }
    if (this.eq(_Decimal.dInf)) {
      return _Decimal.dInf;
    }
    if (!this.isFinite()) {
      return _Decimal.dNaN;
    }
    if (degree == 2) {
      try {
        return this.ssqrt();
      } catch {
        return _Decimal.dNaN;
      }
    }
    if (degree > 0 && degree < 1) {
      return this.root(degree);
    }
    if (degree > -2 && degree < -1) {
      return _Decimal.fromNumber(degree).add(2).pow(this.recip());
    }
    if (degree <= 0) {
      return _Decimal.dNaN;
    }
    if (degree == Number.POSITIVE_INFINITY) {
      const this_num = this.toNumber();
      if (this_num < Math.E && this_num > _EXPN1) {
        return this.pow(this.recip());
      } else {
        return _Decimal.dNaN;
      }
    }
    if (this.eq(1)) {
      return _Decimal.dOne;
    }
    if (this.lt(0)) {
      return _Decimal.dNaN;
    }
    if (this.lte("1ee-16")) {
      if (degree % 2 == 1)
        return this;
      else
        return _Decimal.dNaN;
    }
    if (this.gt(1)) {
      let upperBound = _Decimal.dTen;
      if (this.gte(_Decimal.tetrate(10, degree, 1, true))) {
        upperBound = this.iteratedlog(10, degree - 1, true);
      }
      if (degree <= 1) {
        upperBound = this.root(degree);
      }
      let lower = _Decimal.dZero;
      const layer = upperBound.layer;
      let upper = upperBound.iteratedlog(10, layer, true);
      let previous = upper;
      let guess = upper.div(2);
      let loopGoing = true;
      while (loopGoing) {
        guess = lower.add(upper).div(2);
        if (_Decimal.iteratedexp(10, layer, guess, true).tetrate(degree, 1, true).gt(this))
          upper = guess;
        else
          lower = guess;
        if (guess.eq(previous))
          loopGoing = false;
        else
          previous = guess;
      }
      return _Decimal.iteratedexp(10, layer, guess, true);
    } else {
      let stage = 1;
      let minimum = _Decimal.fromComponents(1, 10, 1);
      let maximum = _Decimal.fromComponents(1, 10, 1);
      let lower = _Decimal.fromComponents(1, 10, 1);
      let upper = _Decimal.fromComponents(1, 1, -16);
      let prevspan = _Decimal.dZero;
      let difference = _Decimal.fromComponents(1, 10, 1);
      let upperBound = upper.pow10().recip();
      let distance = _Decimal.dZero;
      let prevPoint = upperBound;
      let nextPoint = upperBound;
      const evenDegree = Math.ceil(degree) % 2 == 0;
      let range = 0;
      let lastValid = _Decimal.fromComponents(1, 10, 1);
      let infLoopDetector = false;
      let previousUpper = _Decimal.dZero;
      let decreasingFound = false;
      while (stage < 4) {
        if (stage == 2) {
          if (evenDegree)
            break;
          else {
            lower = _Decimal.fromComponents(1, 10, 1);
            upper = minimum;
            stage = 3;
            difference = _Decimal.fromComponents(1, 10, 1);
            lastValid = _Decimal.fromComponents(1, 10, 1);
          }
        }
        infLoopDetector = false;
        while (upper.neq(lower)) {
          previousUpper = upper;
          if (upper.pow10().recip().tetrate(degree, 1, true).eq(1) && upper.pow10().recip().lt(0.4)) {
            upperBound = upper.pow10().recip();
            prevPoint = upper.pow10().recip();
            nextPoint = upper.pow10().recip();
            distance = _Decimal.dZero;
            range = -1;
            if (stage == 3)
              lastValid = upper;
          } else if (upper.pow10().recip().tetrate(degree, 1, true).eq(upper.pow10().recip()) && !evenDegree && upper.pow10().recip().lt(0.4)) {
            upperBound = upper.pow10().recip();
            prevPoint = upper.pow10().recip();
            nextPoint = upper.pow10().recip();
            distance = _Decimal.dZero;
            range = 0;
          } else if (upper.pow10().recip().tetrate(degree, 1, true).eq(upper.pow10().recip().mul(2).tetrate(degree, 1, true))) {
            upperBound = upper.pow10().recip();
            prevPoint = _Decimal.dZero;
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
            if (lower.eq(_Decimal.fromComponents(1, 10, 1))) {
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
            if (lower.eq(_Decimal.fromComponents(1, 10, 1))) {
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
        if (lastValid == _Decimal.fromComponents(1, 10, 1)) {
          break;
        }
        if (stage == 1)
          minimum = lastValid;
        else if (stage == 3)
          maximum = lastValid;
        stage++;
      }
      lower = minimum;
      upper = _Decimal.fromComponents(1, 1, -18);
      let previous = upper;
      let guess = _Decimal.dZero;
      let loopGoing = true;
      while (loopGoing) {
        if (lower.eq(_Decimal.fromComponents(1, 10, 1)))
          guess = upper.mul(2);
        else
          guess = lower.add(upper).div(2);
        if (_Decimal.pow(10, guess).recip().tetrate(degree, 1, true).gt(this))
          upper = guess;
        else
          lower = guess;
        if (guess.eq(previous))
          loopGoing = false;
        else
          previous = guess;
        if (upper.gt("1e18"))
          return _Decimal.dNaN;
      }
      if (!guess.eq_tolerance(minimum, 1e-15)) {
        return guess.pow10().recip();
      } else {
        if (maximum.eq(_Decimal.fromComponents(1, 10, 1))) {
          return _Decimal.dNaN;
        }
        lower = _Decimal.fromComponents(1, 10, 1);
        upper = maximum;
        previous = upper;
        guess = _Decimal.dZero;
        loopGoing = true;
        while (loopGoing) {
          if (lower.eq(_Decimal.fromComponents(1, 10, 1)))
            guess = upper.mul(2);
          else
            guess = lower.add(upper).div(2);
          if (_Decimal.pow(10, guess).recip().tetrate(degree, 1, true).gt(this))
            upper = guess;
          else
            lower = guess;
          if (guess.eq(previous))
            loopGoing = false;
          else
            previous = guess;
          if (upper.gt("1e18"))
            return _Decimal.dNaN;
        }
        return guess.pow10().recip();
      }
    }
  }
  // Pentation/pentate: The result of tetrating 'height' times in a row. An absurdly strong operator - Decimal.pentate(2, 4.28) and Decimal.pentate(10, 2.37) are already too huge for break_eternity.js!
  // https://en.wikipedia.org/wiki/Pentation
  pentate(height = 2, payload = _Decimal.fromComponents_noNormalize(1, 0, 1), linear = false) {
    payload = _Decimal.fromValue_noAlloc(payload);
    const oldheight = height;
    height = Math.trunc(height);
    const fracheight = oldheight - height;
    if (fracheight !== 0) {
      if (payload.eq(_Decimal.dOne)) {
        ++height;
        payload = _Decimal.fromNumber(fracheight);
      } else {
        if (this.eq(10)) {
          payload = payload.layeradd10(fracheight, linear);
        } else {
          payload = payload.layeradd(fracheight, this, linear);
        }
      }
    }
    for (let i = 0; i < height; ++i) {
      payload = this.tetrate(payload.toNumber(), _Decimal.dOne, linear);
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
   * @name mod
   * @alias modular
   * @alias modulo
   * @param {DecimalSource} other - The number or DecimalClone instance to use for modular arithmetic.
   * @returns {Decimal} A EClone instance representing the result of the modular operation.
   */
  // Taken from OmegaNum.js, with a couple touch-ups
  // "Truncated division" modulo, like JavaScript's %
  mod(value) {
    const decimal = _Decimal.fromValue_noAlloc(value).abs();
    if (decimal.eq(_Decimal.dZero))
      return _Decimal.dZero;
    const num_this = this.toNumber();
    const num_decimal = decimal.toNumber();
    if (isFinite(num_this) && isFinite(num_decimal) && num_this != 0 && num_decimal != 0) {
      return new _Decimal(num_this % num_decimal);
    }
    if (this.sub(decimal).eq(this)) {
      return _Decimal.dZero;
    }
    if (decimal.sub(this).eq(decimal)) {
      return this;
    }
    if (this.sign == -1)
      return this.abs().mod(decimal).neg();
    return this.sub(this.div(decimal).floor().mul(decimal));
  }
  modulo(value) {
    return this.mod(value);
  }
  modular(value) {
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
    return new _Decimal(value).softcap(start, power, mode);
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
  static scale(value, s, p, mode, rev = false) {
    return new _Decimal(value).scale(s, p, mode, rev);
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
  static formatST(value, acc = 2, max = 9, type = "st") {
    return format(new _Decimal(value), acc, max, type);
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
  static formatGain(value, gain) {
    return formatGain(new _Decimal(value), gain);
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
  static toRoman(value, max) {
    return new _Decimal(value).toRoman(max);
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

// src/E/eMain.ts
var E = (x) => new e_default(x);
Object.getOwnPropertyNames(e_default).filter((b) => !Object.getOwnPropertyNames(class {
}).includes(b)).forEach((prop) => {
  E[prop] = e_default[prop];
});

// src/classes/boost.ts
var boostObject = class {
  constructor(init) {
    this.id = init.id;
    this.name = init.name;
    this.desc = init.desc ?? "";
    this.value = init.value;
    this.order = init.order ?? 99;
    this.index = init.index ?? -1;
  }
};
var boost = class {
  /**
   * Constructs a new boost manager.
   * @param baseEffect - The base effect value to which boosts are applied.
   * @param boosts - An array of boost objects to initialize with.
   */
  constructor(baseEffect, boosts) {
    /**
     * @alias {@link boost.getBoost}
     * @deprecated Use getBoost instead.
     */
    this.bGet = this.getBoost;
    /**
     * @alias {@link boost.removeBoost}
     * @deprecated Use removeBoost instead.
     */
    this.bRemove = this.removeBoost;
    /**
     * @alias {@link boost.setBoost}
     * @deprecated Use setBoost instead.
     */
    this.bSet = this.setBoost;
    /**
     * @alias {@link boost.setBoost}
     * @deprecated Use setBoost instead.
     */
    this.addBoost = this.setBoost;
    boosts = boosts ? Array.isArray(boosts) ? boosts : [boosts] : void 0;
    this.baseEffect = E(baseEffect ?? 1);
    this.boostArray = [];
    if (boosts) {
      boosts.forEach((boostObj) => {
        this.boostArray.push(new boostObject(boostObj));
      });
    }
  }
  /**
   * Gets a boost object by its ID.
   * @param id - The ID of the boost to retrieve.
   * @returns The boost object if found, or null if not found.
   */
  getBoost(id) {
    let output = null;
    for (let i = 0; i < this.boostArray.length; i++) {
      if (id === i || id == this.boostArray[i].id) {
        output = this.boostArray[i];
        output["index"] = i;
      }
    }
    return output;
  }
  /**
   * Removes a boost by its ID.
   * @param id - The ID of the boost to remove.
   */
  removeBoost(id) {
    const bCheck = this.bGet(id);
    if (bCheck) {
      delete this.boostArray[bCheck.index];
    }
  }
  setBoost(arg1, arg2, arg3, arg4, arg5) {
    if (typeof arg1 === "string") {
      const id = arg1;
      const name = arg2 ?? "";
      const desc = arg3 ?? "";
      const value = arg4 ?? (() => E(0));
      const order = arg5;
      const bCheck = this.bGet(id);
      if (!bCheck) {
        this.boostArray.push(new boostObject({ id, name, desc, value, order, index: this.boostArray.length }));
      } else {
        this.boostArray[bCheck.index] = new boostObject({ id, name, desc, value, order, index: this.boostArray.length });
      }
    } else {
      arg1 = Array.isArray(arg1) ? arg1 : [arg1];
      for (let i = 0; i < arg1.length; i++) {
        const bCheck = this.bGet(arg1[i].id);
        if (!bCheck) {
          this.boostArray = this.boostArray.concat(new boostObject(arg1[i]));
        } else {
          this.boostArray[bCheck.index] = new boostObject(arg1[i]);
        }
      }
    }
  }
  /**
   * Sets or updates multiple boosts with advanced parameters.
   * @alias {@link boost.setBoost}
   * @deprecated Use setBoost instead.
   * @param boostsArray - boost objects to set or update.
   */
  bSetArray(boostsArray) {
    this.setBoost(boostsArray);
  }
  /**
   * Sets or updates multiple boosts with advanced parameters.
   * @alias {@link boost.setBoost}
   * @deprecated Use setBoost instead.
   * @param boostsArray - boost objects to set or update.
   * @deprecated Use setBoost instead.
   */
  bSetAdvanced(...boostsArray) {
    this.setBoost(boostsArray);
  }
  /**
   * Calculates the cumulative effect of all boosts on the base effect.
   * @param base - The base effect value to calculate with.
   * @returns The calculated effect after applying boosts.
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
var upgradeData = class {
  constructor(init) {
    this.id = init.id ?? -1;
    this.level = init.level ? E(init.level) : E(1);
  }
};
var upgradeStatic = class {
  /**
   * @param init - The upgrade object to initialize.
   * @param dataPointer - A function or reference that returns the pointer of the data / frontend.
   */
  constructor(init, dataPointer) {
    const data = typeof dataPointer === "function" ? dataPointer() : dataPointer;
    this.data = data;
    this.id = init.id;
    this.name = init.name;
    this.costScaling = init.costScaling;
    this.maxLevel = init.maxLevel;
    this.effect = init.effect;
  }
  /**
   * The current level of the upgrade.
   * @returns The current level of the upgrade.
   */
  get level() {
    return this.data.level;
  }
  set level(n) {
    this.data.level = E(n);
  }
};
var currency = class {
  /**
   * Constructs a new currency object with an initial value of 0.
   */
  constructor() {
    this.value = E(0);
    this.upgrades = [];
    this.boost = new boost();
  }
};
var currencyStatic = class {
  /**
   * @param pointer - A function or reference that returns the pointer of the data / frontend.
   * @param defaultVal - The default value of the currency.
   * @param defaultBoost - The default boost of the currency.
   */
  constructor(pointer = new currency(), defaultVal = E(0), defaultBoost = E(1)) {
    this.defaultVal = E(defaultVal);
    this.defaultBoost = E(defaultBoost);
    this.upgrades = [];
    this.pointer = typeof pointer === "function" ? pointer() : pointer;
    this.boost = new boost(defaultBoost);
    this.pointer.value = this.defaultVal;
  }
  /**
   * The current value of the currency.
   * @returns The current value of the currency.
   */
  get value() {
    return this.pointer.value;
  }
  set value(value) {
    this.pointer.value = value;
  }
  /**
   * Resets the currency and upgrade levels.
   * @param resetCurrency - Whether to reset the currency value. Default is true.
   * @param resetUpgradeLevels - Whether to reset the upgrade levels. Default is true.
   */
  reset(resetCurrency = true, resetUpgradeLevels = true) {
    if (resetCurrency)
      this.value = this.defaultVal;
    if (resetUpgradeLevels) {
      this.upgrades.forEach((upgrade2) => {
        upgrade2.level = E(0);
      });
    }
    ;
  }
  /**
   * The new currency value after applying the boost.
   * @param dt Deltatime / multipler in milliseconds, assuming you gain once every second. Ex. 500 = 0.5 seconds = half gain.
   * @returns The new currency value after applying the boost.
   */
  gain(dt = 1e3) {
    console.log(this.boost.calculate(), E(dt).div(1e3), this.boost.calculate().mul(E(dt).div(1e3)));
    this.value = this.value.add(this.boost.calculate().mul(E(dt).div(1e3)));
    return this.value;
  }
  /**
   * Adds an upgrade to the upgrades array.
   * @param upgrades1 Upgrade to add
   * @returns The upgrade object.
   */
  pointerAddUpgrade(upgrades1) {
    const upgrades2 = new upgradeData(upgrades1);
    this.pointer.upgrades.push(upgrades2);
    return upgrades1;
  }
  /**
   * Retrieves an upgrade object based on the provided id.
   * @param id - The id of the upgrade to retrieve.
   * @returns The upgrade object if found, otherwise null.
   */
  getUpgrade(id) {
    let upgrade2 = null;
    if (id === void 0) {
      return null;
    } else if (typeof id == "number") {
      upgrade2 = this.upgrades[id];
    } else if (typeof id == "string") {
      for (let i = 0; i < this.upgrades.length; i++) {
        if (this.upgrades[i].id === id) {
          upgrade2 = this.upgrades[i];
          break;
        }
      }
    }
    return upgrade2;
  }
  /**
   * Creates upgrades. To update an upgrade, use {@link updateUpgrade} instead.
   * @param upgrades - An array of upgrade objects.
   * @param runEffectInstantly - Whether to run the effect immediately. Defaults to `true`.
   */
  addUpgrade(upgrades, runEffectInstantly = true) {
    if (!Array.isArray(upgrades))
      upgrades = [upgrades];
    const upgradesDefault = [];
    for (let i = 0; i < upgrades.length; i++) {
      if (!upgrades[i].id)
        upgrades[i].id = this.upgrades.length + i;
      this.pointerAddUpgrade(upgrades[i]);
      const upgrade2 = new upgradeStatic(upgrades[i], this.pointer.upgrades[this.pointer.upgrades.length - 1]);
      if (runEffectInstantly)
        upgrade2.effect(upgrade2.level, upgrade2);
      upgradesDefault.push(upgrade2);
    }
    this.upgrades = this.upgrades.concat(upgradesDefault);
  }
  /**
   * Updates an upgrade. To create an upgrade, use {@link addUpgrade} instead.
   * @param id - The id of the upgrade to update.
   * @param upgrade - The upgrade object to update.
   */
  updateUpgrade(id, upgrade2) {
    const upgrade1 = this.getUpgrade(id);
    if (upgrade1 === null)
      return;
    upgrade1.name = upgrade2.name ?? upgrade1.name;
    upgrade1.costScaling = upgrade2.costScaling ?? upgrade1.costScaling;
    upgrade1.maxLevel = upgrade2.maxLevel ?? upgrade1.maxLevel;
    upgrade1.effect = upgrade2.effect ?? upgrade1.effect;
  }
  /**
   * Calculates the cost and how many upgrades you can buy
   *
   * NOTE: This becomes very slow for higher levels. Use el=`true` to skip the sum calculation and speed up dramatically.
   * @param id - Index or ID of the upgrade
   * @param target - How many to buy
   * @param el - ie Endless: Flag to exclude the sum calculation and only perform binary search.
   * @returns [amount, cost] - Returns the amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [E(0), E(0)].
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
        while (calculateSum(f, right).lt(a)) {
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
        return [left, left.gt(0) ? calculateSum(f, left.sub(1)) : E(0)];
      } else {
        let left = E(0);
        let right = target;
        let result = E(0);
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
        return [result, result.gt(0) ? f(result) : E(0)];
      }
    }
    const upgrade2 = this.getUpgrade(id);
    if (upgrade2 === null)
      return [E(0), E(0)];
    return findHighestB(
      (level) => upgrade2.costScaling(upgrade2.level.add(level)),
      this.value
    );
  }
  /**
   * Buys an upgrade based on its ID or array position if enough currency is available.
   * @param id - The ID or position of the upgrade to buy or upgrade.
   * If a string is provided, it is treated as the upgrade's ID. If a number is provided, it is treated as the upgrade's array position (starting from 0).
   * @param target - The target level or quantity to reach for the upgrade.
   * This represents how many upgrades to buy or upgrade.
   * @returns Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
   */
  buyUpgrade(id, target) {
    const upgrade2 = this.getUpgrade(id);
    if (upgrade2 === null)
      return false;
    target = E(target);
    target = upgrade2.level.add(target).lte(upgrade2.maxLevel) ? target : upgrade2.maxLevel.sub(upgrade2.level);
    const maxAffordableQuantity = this.calculateUpgrade(
      id,
      target
    );
    if (maxAffordableQuantity[0].lte(0)) {
      return false;
    }
    this.value = this.value.sub(maxAffordableQuantity[1]);
    upgrade2.level = upgrade2.level.add(maxAffordableQuantity[0]);
    if (typeof upgrade2.effect === "function") {
      upgrade2.effect(upgrade2.level, upgrade2);
    }
    return true;
  }
};

// src/classes/attribute.ts
var attribute = class {
  /**
   * Constructs a static attribute with an initial effect.
   * @param initial - The inital value of the attribute.
   */
  constructor(initial) {
    this.value = E(initial);
  }
};
var attributeStatic = class {
  /**
   * Constructs a new instance of the Attribute class.
   * @param pointer - A function or an instance of the attribute class.
   * @param initial - The initial value of the attribute.
   * @param useBoost - Indicates whether to use boost for the attribute.
   */
  constructor(pointer, useBoost = true, initial = 0) {
    this.initial = E(initial);
    this.pointer = typeof pointer === "function" ? pointer() : pointer;
    this.boost = new boost(this.initial);
  }
  /**
   * Gets the value of the attribute, and also updates the value stored.
   * NOTE: This getter must be called every time the boost is updated, else the value stored will not be updated.
   * @returns The calculated value of the attribute.
   */
  get value() {
    if (this.boost) {
      this.pointer.value = this.boost.calculate();
    }
    return this.pointer.value;
  }
  /**
   * Sets the value of the attribute.
   * NOTE: This setter should not be used when boost is enabled.
   * @param value - The value to set the attribute to.
   */
  set value(value) {
    if (this.boost) {
      throw new Error("Cannot set value of attributeStatic when boost is enabled.");
    }
    this.pointer.value = value;
  }
};

// src/game/managers/configManager.ts
var configManager = class {
  constructor(configOptionTemplate) {
    this.configOptionTemplate = configOptionTemplate;
  }
  /**
   * Parses the given configuration object and returns a new object with default values for any missing options.
   * @param config - The configuration object to parse.
   * @returns A new object with default values for any missing options.
   */
  parse(config) {
    if (typeof config === "undefined") {
      return this.configOptionTemplate;
    }
    const parseObject = (obj, template) => {
      for (const key in template) {
        if (typeof obj[key] === "undefined") {
          obj[key] = template[key];
        } else if (typeof obj[key] === "object" && typeof template[key] === "object") {
          obj[key] = parseObject(obj[key], template[key]);
        }
      }
      return obj;
    };
    return parseObject(config, this.configOptionTemplate);
  }
  get options() {
    return this.configOptionTemplate;
  }
};

// src/game/managers/keyManager.ts
var keyManagerDefaultConfig = {
  autoAddInterval: true,
  fps: 30,
  pixiApp: void 0
};
var keyManager = class _keyManager {
  static {
    this.configManager = new configManager(keyManagerDefaultConfig);
  }
  constructor(config) {
    this.keysPressed = [];
    this.binds = [];
    this.tickers = [];
    this.config = _keyManager.configManager.parse(config);
    if (this.config.autoAddInterval) {
      if (this.config.pixiApp) {
        this.config.pixiApp.ticker.add((dt) => {
          for (const ticker of this.tickers) {
            ticker(dt);
          }
        });
      } else {
        const fps = this.config.fps ? this.config.fps : 30;
        setInterval(() => {
          for (const ticker of this.tickers) {
            ticker(1e3 / fps);
          }
        }, 1e3 / fps);
      }
    }
    if (typeof document === "undefined") {
      return;
    }
    document.addEventListener("keydown", (e) => this.logKey(e, true));
    document.addEventListener("keyup", (e) => this.logKey(e, false));
  }
  logKey(event, type) {
    const key = event.key;
    if (type && !this.keysPressed.includes(key))
      this.keysPressed.push(key);
    else if (!type && this.keysPressed.includes(key))
      this.keysPressed.splice(this.keysPressed.indexOf(key), 1);
  }
  /**
   * Checks if a specific key binding is currently being pressed.
   * @param name - The name of the key binding to check.
   * @returns True if the key binding is being pressed, otherwise false.
   */
  isPressing(name) {
    for (let i = 0; i < this.binds.length; i++) {
      const current = this.binds[i];
      if (current.name === name) {
        return this.keysPressed.includes(current.key);
      }
    }
    return false;
  }
  /**
   * Adds or updates a key binding.
   * @param name - The name of the key binding.
   * @param key - The key associated with the binding.
   * @param [fn] - The function executed when the binding is pressed
   * @example addKey("Move Up", "w", () => Game.player.velocity.y -= Game.player.acceleration);
   */
  addKey(name, key, fn) {
    for (let i = 0; i < this.binds.length; i++) {
      const current = this.binds[i];
      if (current.name === name) {
        current.key = key;
        return;
      }
    }
    this.binds.push({ name, key, fn });
    if (typeof fn == "function") {
      this.tickers.push((dt) => {
        if (this.isPressing(name))
          fn(dt);
      });
    }
  }
  /**
   * Adds or updates multiple key bindings.
   * @param keysToAdd - An array of key binding objects.
   * @example
   * addKeys([
   *     { name: "Move Up", key: "w", fn: () => Game.player.velocity.y -= Game.player.acceleration },
   *     // Add more key bindings here...
   * ]);
   */
  addKeys(keysToAdd) {
    for (const keyBinding of keysToAdd) {
      this.addKey(keyBinding.name, keyBinding.key, keyBinding.fn);
    }
  }
};

// src/game/managers/eventManager.ts
var eventManagerDefaultConfig = {
  autoAddInterval: true,
  fps: 30,
  pixiApp: void 0
};
var eventManager = class _eventManager {
  static {
    this.configManager = new configManager(eventManagerDefaultConfig);
  }
  constructor(config) {
    this.config = _eventManager.configManager.parse(config);
    this.events = [];
    if (this.config.autoAddInterval) {
      if (this.config.pixiApp) {
        this.config.pixiApp.ticker.add(() => {
          this.tickerFunction();
        });
      } else {
        const fps = this.config.fps ? this.config.fps : 30;
        setInterval(() => {
          this.tickerFunction();
        }, 1e3 / fps);
      }
    }
  }
  tickerFunction() {
    const currentTime = Date.now();
    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i];
      if (event.type === "interval") {
        if (currentTime - event.intervalLast >= event.delay) {
          event.callbackFn();
          event.intervalLast = currentTime;
        }
      } else if (event.type === "timeout") {
        if (currentTime - event.timeCreated >= event.delay) {
          event.callbackFn();
          this.events.splice(i, 1);
          i--;
        }
      }
    }
  }
  /**
   * Adds a new event to the event system.
   * @param name - The name of the event.
   * @param type - The type of the event, either "interval" or "timeout".
   * @param delay - The delay in milliseconds before the event triggers.
   * @param callbackFn - The callback function to execute when the event triggers.
   * @example
   * const myEventManger = new eventManager();
   * // Add an interval event that executes every 2 seconds.
   * myEventManger.addEvent("IntervalEvent", "interval", 2000, () => {
   *    console.log("Interval event executed.");
   * });
   *
   * // Add a timeout event that executes after 5 seconds.
   * myEventManger.addEvent("TimeoutEvent", "timeout", 5000, () => {
   *   console.log("Timeout event executed.");
   * });
   */
  addEvent(name, type, delay, callbackFn) {
    this.events.push((() => {
      switch (type) {
        case "interval":
          {
            const event = {
              name,
              type,
              delay: typeof delay === "number" ? delay : delay.toNumber(),
              callbackFn,
              timeCreated: Date.now(),
              intervalLast: Date.now()
            };
            return event;
          }
          ;
          break;
        case "timeout":
        default: {
          const event = {
            name,
            type,
            delay: typeof delay === "number" ? delay : delay.toNumber(),
            callbackFn,
            timeCreated: Date.now()
          };
          return event;
        }
      }
    })());
  }
};

// src/game/managers/dataManager.ts
var import_lz_string = __toESM(require_lz_string());

// node_modules/reflect-metadata/Reflect.js
var Reflect2;
(function(Reflect3) {
  (function(factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : Function("return this;")();
    var exporter = makeExporter(Reflect3);
    if (typeof root.Reflect === "undefined") {
      root.Reflect = Reflect3;
    } else {
      exporter = makeExporter(root.Reflect, exporter);
    }
    factory(exporter);
    function makeExporter(target, previous) {
      return function(key, value) {
        if (typeof target[key] !== "function") {
          Object.defineProperty(target, key, { configurable: true, writable: true, value });
        }
        if (previous)
          previous(key, value);
      };
    }
  })(function(exporter) {
    var hasOwn = Object.prototype.hasOwnProperty;
    var supportsSymbol = typeof Symbol === "function";
    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
    var supportsCreate = typeof Object.create === "function";
    var supportsProto = { __proto__: [] } instanceof Array;
    var downLevel = !supportsCreate && !supportsProto;
    var HashMap = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: supportsCreate ? function() {
        return MakeDictionary(/* @__PURE__ */ Object.create(null));
      } : supportsProto ? function() {
        return MakeDictionary({ __proto__: null });
      } : function() {
        return MakeDictionary({});
      },
      has: downLevel ? function(map, key) {
        return hasOwn.call(map, key);
      } : function(map, key) {
        return key in map;
      },
      get: downLevel ? function(map, key) {
        return hasOwn.call(map, key) ? map[key] : void 0;
      } : function(map, key) {
        return map[key];
      }
    };
    var functionPrototype = Object.getPrototypeOf(Function);
    var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
    var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
    var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    var Metadata = new _WeakMap();
    function decorate(decorators, target, propertyKey, attributes) {
      if (!IsUndefined(propertyKey)) {
        if (!IsArray(decorators))
          throw new TypeError();
        if (!IsObject(target))
          throw new TypeError();
        if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
          throw new TypeError();
        if (IsNull(attributes))
          attributes = void 0;
        propertyKey = ToPropertyKey(propertyKey);
        return DecorateProperty(decorators, target, propertyKey, attributes);
      } else {
        if (!IsArray(decorators))
          throw new TypeError();
        if (!IsConstructor(target))
          throw new TypeError();
        return DecorateConstructor(decorators, target);
      }
    }
    exporter("decorate", decorate);
    function metadata(metadataKey, metadataValue) {
      function decorator(target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
          throw new TypeError();
        OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }
      return decorator;
    }
    exporter("metadata", metadata);
    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
    }
    exporter("defineMetadata", defineMetadata);
    function hasMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasMetadata(metadataKey, target, propertyKey);
    }
    exporter("hasMetadata", hasMetadata);
    function hasOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
    }
    exporter("hasOwnMetadata", hasOwnMetadata);
    function getMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetMetadata(metadataKey, target, propertyKey);
    }
    exporter("getMetadata", getMetadata);
    function getOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
    }
    exporter("getOwnMetadata", getOwnMetadata);
    function getMetadataKeys(target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryMetadataKeys(target, propertyKey);
    }
    exporter("getMetadataKeys", getMetadataKeys);
    function getOwnMetadataKeys(target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryOwnMetadataKeys(target, propertyKey);
    }
    exporter("getOwnMetadataKeys", getOwnMetadataKeys);
    function deleteMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      var metadataMap = GetOrCreateMetadataMap(
        target,
        propertyKey,
        /*Create*/
        false
      );
      if (IsUndefined(metadataMap))
        return false;
      if (!metadataMap.delete(metadataKey))
        return false;
      if (metadataMap.size > 0)
        return true;
      var targetMetadata = Metadata.get(target);
      targetMetadata.delete(propertyKey);
      if (targetMetadata.size > 0)
        return true;
      Metadata.delete(target);
      return true;
    }
    exporter("deleteMetadata", deleteMetadata);
    function DecorateConstructor(decorators, target) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target);
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsConstructor(decorated))
            throw new TypeError();
          target = decorated;
        }
      }
      return target;
    }
    function DecorateProperty(decorators, target, propertyKey, descriptor) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target, propertyKey, descriptor);
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsObject(decorated))
            throw new TypeError();
          descriptor = decorated;
        }
      }
      return descriptor;
    }
    function GetOrCreateMetadataMap(O, P, Create) {
      var targetMetadata = Metadata.get(O);
      if (IsUndefined(targetMetadata)) {
        if (!Create)
          return void 0;
        targetMetadata = new _Map();
        Metadata.set(O, targetMetadata);
      }
      var metadataMap = targetMetadata.get(P);
      if (IsUndefined(metadataMap)) {
        if (!Create)
          return void 0;
        metadataMap = new _Map();
        targetMetadata.set(P, metadataMap);
      }
      return metadataMap;
    }
    function OrdinaryHasMetadata(MetadataKey, O, P) {
      var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn2)
        return true;
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent))
        return OrdinaryHasMetadata(MetadataKey, parent, P);
      return false;
    }
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
      var metadataMap = GetOrCreateMetadataMap(
        O,
        P,
        /*Create*/
        false
      );
      if (IsUndefined(metadataMap))
        return false;
      return ToBoolean(metadataMap.has(MetadataKey));
    }
    function OrdinaryGetMetadata(MetadataKey, O, P) {
      var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn2)
        return OrdinaryGetOwnMetadata(MetadataKey, O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent))
        return OrdinaryGetMetadata(MetadataKey, parent, P);
      return void 0;
    }
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
      var metadataMap = GetOrCreateMetadataMap(
        O,
        P,
        /*Create*/
        false
      );
      if (IsUndefined(metadataMap))
        return void 0;
      return metadataMap.get(MetadataKey);
    }
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
      var metadataMap = GetOrCreateMetadataMap(
        O,
        P,
        /*Create*/
        true
      );
      metadataMap.set(MetadataKey, MetadataValue);
    }
    function OrdinaryMetadataKeys(O, P) {
      var ownKeys = OrdinaryOwnMetadataKeys(O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (parent === null)
        return ownKeys;
      var parentKeys = OrdinaryMetadataKeys(parent, P);
      if (parentKeys.length <= 0)
        return ownKeys;
      if (ownKeys.length <= 0)
        return parentKeys;
      var set = new _Set();
      var keys = [];
      for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
        var key = ownKeys_1[_i];
        var hasKey = set.has(key);
        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }
      for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
        var key = parentKeys_1[_a];
        var hasKey = set.has(key);
        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }
      return keys;
    }
    function OrdinaryOwnMetadataKeys(O, P) {
      var keys = [];
      var metadataMap = GetOrCreateMetadataMap(
        O,
        P,
        /*Create*/
        false
      );
      if (IsUndefined(metadataMap))
        return keys;
      var keysObj = metadataMap.keys();
      var iterator = GetIterator(keysObj);
      var k = 0;
      while (true) {
        var next = IteratorStep(iterator);
        if (!next) {
          keys.length = k;
          return keys;
        }
        var nextValue = IteratorValue(next);
        try {
          keys[k] = nextValue;
        } catch (e) {
          try {
            IteratorClose(iterator);
          } finally {
            throw e;
          }
        }
        k++;
      }
    }
    function Type(x) {
      if (x === null)
        return 1;
      switch (typeof x) {
        case "undefined":
          return 0;
        case "boolean":
          return 2;
        case "string":
          return 3;
        case "symbol":
          return 4;
        case "number":
          return 5;
        case "object":
          return x === null ? 1 : 6;
        default:
          return 6;
      }
    }
    function IsUndefined(x) {
      return x === void 0;
    }
    function IsNull(x) {
      return x === null;
    }
    function IsSymbol(x) {
      return typeof x === "symbol";
    }
    function IsObject(x) {
      return typeof x === "object" ? x !== null : typeof x === "function";
    }
    function ToPrimitive(input, PreferredType) {
      switch (Type(input)) {
        case 0:
          return input;
        case 1:
          return input;
        case 2:
          return input;
        case 3:
          return input;
        case 4:
          return input;
        case 5:
          return input;
      }
      var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
      var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
      if (exoticToPrim !== void 0) {
        var result = exoticToPrim.call(input, hint);
        if (IsObject(result))
          throw new TypeError();
        return result;
      }
      return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
    }
    function OrdinaryToPrimitive(O, hint) {
      if (hint === "string") {
        var toString_1 = O.toString;
        if (IsCallable(toString_1)) {
          var result = toString_1.call(O);
          if (!IsObject(result))
            return result;
        }
        var valueOf = O.valueOf;
        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result))
            return result;
        }
      } else {
        var valueOf = O.valueOf;
        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result))
            return result;
        }
        var toString_2 = O.toString;
        if (IsCallable(toString_2)) {
          var result = toString_2.call(O);
          if (!IsObject(result))
            return result;
        }
      }
      throw new TypeError();
    }
    function ToBoolean(argument) {
      return !!argument;
    }
    function ToString(argument) {
      return "" + argument;
    }
    function ToPropertyKey(argument) {
      var key = ToPrimitive(
        argument,
        3
        /* String */
      );
      if (IsSymbol(key))
        return key;
      return ToString(key);
    }
    function IsArray(argument) {
      return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
    }
    function IsCallable(argument) {
      return typeof argument === "function";
    }
    function IsConstructor(argument) {
      return typeof argument === "function";
    }
    function IsPropertyKey(argument) {
      switch (Type(argument)) {
        case 3:
          return true;
        case 4:
          return true;
        default:
          return false;
      }
    }
    function GetMethod(V, P) {
      var func = V[P];
      if (func === void 0 || func === null)
        return void 0;
      if (!IsCallable(func))
        throw new TypeError();
      return func;
    }
    function GetIterator(obj) {
      var method = GetMethod(obj, iteratorSymbol);
      if (!IsCallable(method))
        throw new TypeError();
      var iterator = method.call(obj);
      if (!IsObject(iterator))
        throw new TypeError();
      return iterator;
    }
    function IteratorValue(iterResult) {
      return iterResult.value;
    }
    function IteratorStep(iterator) {
      var result = iterator.next();
      return result.done ? false : result;
    }
    function IteratorClose(iterator) {
      var f = iterator["return"];
      if (f)
        f.call(iterator);
    }
    function OrdinaryGetPrototypeOf(O) {
      var proto = Object.getPrototypeOf(O);
      if (typeof O !== "function" || O === functionPrototype)
        return proto;
      if (proto !== functionPrototype)
        return proto;
      var prototype = O.prototype;
      var prototypeProto = prototype && Object.getPrototypeOf(prototype);
      if (prototypeProto == null || prototypeProto === Object.prototype)
        return proto;
      var constructor = prototypeProto.constructor;
      if (typeof constructor !== "function")
        return proto;
      if (constructor === O)
        return proto;
      return constructor;
    }
    function CreateMapPolyfill() {
      var cacheSentinel = {};
      var arraySentinel = [];
      var MapIterator = (
        /** @class */
        function() {
          function MapIterator2(keys, values, selector) {
            this._index = 0;
            this._keys = keys;
            this._values = values;
            this._selector = selector;
          }
          MapIterator2.prototype["@@iterator"] = function() {
            return this;
          };
          MapIterator2.prototype[iteratorSymbol] = function() {
            return this;
          };
          MapIterator2.prototype.next = function() {
            var index = this._index;
            if (index >= 0 && index < this._keys.length) {
              var result = this._selector(this._keys[index], this._values[index]);
              if (index + 1 >= this._keys.length) {
                this._index = -1;
                this._keys = arraySentinel;
                this._values = arraySentinel;
              } else {
                this._index++;
              }
              return { value: result, done: false };
            }
            return { value: void 0, done: true };
          };
          MapIterator2.prototype.throw = function(error) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            throw error;
          };
          MapIterator2.prototype.return = function(value) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            return { value, done: true };
          };
          return MapIterator2;
        }()
      );
      return (
        /** @class */
        function() {
          function Map2() {
            this._keys = [];
            this._values = [];
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          }
          Object.defineProperty(Map2.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: true,
            configurable: true
          });
          Map2.prototype.has = function(key) {
            return this._find(
              key,
              /*insert*/
              false
            ) >= 0;
          };
          Map2.prototype.get = function(key) {
            var index = this._find(
              key,
              /*insert*/
              false
            );
            return index >= 0 ? this._values[index] : void 0;
          };
          Map2.prototype.set = function(key, value) {
            var index = this._find(
              key,
              /*insert*/
              true
            );
            this._values[index] = value;
            return this;
          };
          Map2.prototype.delete = function(key) {
            var index = this._find(
              key,
              /*insert*/
              false
            );
            if (index >= 0) {
              var size = this._keys.length;
              for (var i = index + 1; i < size; i++) {
                this._keys[i - 1] = this._keys[i];
                this._values[i - 1] = this._values[i];
              }
              this._keys.length--;
              this._values.length--;
              if (key === this._cacheKey) {
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }
              return true;
            }
            return false;
          };
          Map2.prototype.clear = function() {
            this._keys.length = 0;
            this._values.length = 0;
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          };
          Map2.prototype.keys = function() {
            return new MapIterator(this._keys, this._values, getKey);
          };
          Map2.prototype.values = function() {
            return new MapIterator(this._keys, this._values, getValue);
          };
          Map2.prototype.entries = function() {
            return new MapIterator(this._keys, this._values, getEntry);
          };
          Map2.prototype["@@iterator"] = function() {
            return this.entries();
          };
          Map2.prototype[iteratorSymbol] = function() {
            return this.entries();
          };
          Map2.prototype._find = function(key, insert) {
            if (this._cacheKey !== key) {
              this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
            }
            if (this._cacheIndex < 0 && insert) {
              this._cacheIndex = this._keys.length;
              this._keys.push(key);
              this._values.push(void 0);
            }
            return this._cacheIndex;
          };
          return Map2;
        }()
      );
      function getKey(key, _) {
        return key;
      }
      function getValue(_, value) {
        return value;
      }
      function getEntry(key, value) {
        return [key, value];
      }
    }
    function CreateSetPolyfill() {
      return (
        /** @class */
        function() {
          function Set2() {
            this._map = new _Map();
          }
          Object.defineProperty(Set2.prototype, "size", {
            get: function() {
              return this._map.size;
            },
            enumerable: true,
            configurable: true
          });
          Set2.prototype.has = function(value) {
            return this._map.has(value);
          };
          Set2.prototype.add = function(value) {
            return this._map.set(value, value), this;
          };
          Set2.prototype.delete = function(value) {
            return this._map.delete(value);
          };
          Set2.prototype.clear = function() {
            this._map.clear();
          };
          Set2.prototype.keys = function() {
            return this._map.keys();
          };
          Set2.prototype.values = function() {
            return this._map.values();
          };
          Set2.prototype.entries = function() {
            return this._map.entries();
          };
          Set2.prototype["@@iterator"] = function() {
            return this.keys();
          };
          Set2.prototype[iteratorSymbol] = function() {
            return this.keys();
          };
          return Set2;
        }()
      );
    }
    function CreateWeakMapPolyfill() {
      var UUID_SIZE = 16;
      var keys = HashMap.create();
      var rootKey = CreateUniqueKey();
      return (
        /** @class */
        function() {
          function WeakMap2() {
            this._key = CreateUniqueKey();
          }
          WeakMap2.prototype.has = function(target) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              false
            );
            return table !== void 0 ? HashMap.has(table, this._key) : false;
          };
          WeakMap2.prototype.get = function(target) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              false
            );
            return table !== void 0 ? HashMap.get(table, this._key) : void 0;
          };
          WeakMap2.prototype.set = function(target, value) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              true
            );
            table[this._key] = value;
            return this;
          };
          WeakMap2.prototype.delete = function(target) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              false
            );
            return table !== void 0 ? delete table[this._key] : false;
          };
          WeakMap2.prototype.clear = function() {
            this._key = CreateUniqueKey();
          };
          return WeakMap2;
        }()
      );
      function CreateUniqueKey() {
        var key;
        do
          key = "@@WeakMap@@" + CreateUUID();
        while (HashMap.has(keys, key));
        keys[key] = true;
        return key;
      }
      function GetOrCreateWeakMapTable(target, create) {
        if (!hasOwn.call(target, rootKey)) {
          if (!create)
            return void 0;
          Object.defineProperty(target, rootKey, { value: HashMap.create() });
        }
        return target[rootKey];
      }
      function FillRandomBytes(buffer, size) {
        for (var i = 0; i < size; ++i)
          buffer[i] = Math.random() * 255 | 0;
        return buffer;
      }
      function GenRandomBytes(size) {
        if (typeof Uint8Array === "function") {
          if (typeof crypto !== "undefined")
            return crypto.getRandomValues(new Uint8Array(size));
          if (typeof msCrypto !== "undefined")
            return msCrypto.getRandomValues(new Uint8Array(size));
          return FillRandomBytes(new Uint8Array(size), size);
        }
        return FillRandomBytes(new Array(size), size);
      }
      function CreateUUID() {
        var data = GenRandomBytes(UUID_SIZE);
        data[6] = data[6] & 79 | 64;
        data[8] = data[8] & 191 | 128;
        var result = "";
        for (var offset = 0; offset < UUID_SIZE; ++offset) {
          var byte = data[offset];
          if (offset === 4 || offset === 6 || offset === 8)
            result += "-";
          if (byte < 16)
            result += "0";
          result += byte.toString(16).toLowerCase();
        }
        return result;
      }
    }
    function MakeDictionary(obj) {
      obj.__ = void 0;
      delete obj.__;
      return obj;
    }
  });
})(Reflect2 || (Reflect2 = {}));

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

// node_modules/class-transformer/esm5/utils/get-global.util.js
function getGlobal() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof self !== "undefined") {
    return self;
  }
}

// node_modules/class-transformer/esm5/utils/is-promise.util.js
function isPromise(p) {
  return p !== null && typeof p === "object" && typeof p.then === "function";
}

// node_modules/class-transformer/esm5/TransformOperationExecutor.js
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
function instantiateArrayType(arrayType) {
  var array = new arrayType();
  if (!(array instanceof Set) && !("push" in array)) {
    return [];
  }
  return array;
}
var TransformOperationExecutor = (
  /** @class */
  function() {
    function TransformOperationExecutor2(transformationType, options) {
      this.transformationType = transformationType;
      this.options = options;
      this.recursionStack = /* @__PURE__ */ new Set();
    }
    TransformOperationExecutor2.prototype.transform = function(source, value, targetType, arrayType, isMap, level) {
      var _this = this;
      if (level === void 0) {
        level = 0;
      }
      if (Array.isArray(value) || value instanceof Set) {
        var newValue_1 = arrayType && this.transformationType === TransformationType.PLAIN_TO_CLASS ? instantiateArrayType(arrayType) : [];
        value.forEach(function(subValue, index) {
          var subSource = source ? source[index] : void 0;
          if (!_this.options.enableCircularCheck || !_this.isCircular(subValue)) {
            var realTargetType = void 0;
            if (typeof targetType !== "function" && targetType && targetType.options && targetType.options.discriminator && targetType.options.discriminator.property && targetType.options.discriminator.subTypes) {
              if (_this.transformationType === TransformationType.PLAIN_TO_CLASS) {
                realTargetType = targetType.options.discriminator.subTypes.find(function(subType) {
                  return subType.name === subValue[targetType.options.discriminator.property];
                });
                var options = { newObject: newValue_1, object: subValue, property: void 0 };
                var newType = targetType.typeFunction(options);
                realTargetType === void 0 ? realTargetType = newType : realTargetType = realTargetType.value;
                if (!targetType.options.keepDiscriminatorProperty)
                  delete subValue[targetType.options.discriminator.property];
              }
              if (_this.transformationType === TransformationType.CLASS_TO_CLASS) {
                realTargetType = subValue.constructor;
              }
              if (_this.transformationType === TransformationType.CLASS_TO_PLAIN) {
                subValue[targetType.options.discriminator.property] = targetType.options.discriminator.subTypes.find(function(subType) {
                  return subType.value === subValue.constructor;
                }).name;
              }
            } else {
              realTargetType = targetType;
            }
            var value_1 = _this.transform(subSource, subValue, realTargetType, void 0, subValue instanceof Map, level + 1);
            if (newValue_1 instanceof Set) {
              newValue_1.add(value_1);
            } else {
              newValue_1.push(value_1);
            }
          } else if (_this.transformationType === TransformationType.CLASS_TO_CLASS) {
            if (newValue_1 instanceof Set) {
              newValue_1.add(subValue);
            } else {
              newValue_1.push(subValue);
            }
          }
        });
        return newValue_1;
      } else if (targetType === String && !isMap) {
        if (value === null || value === void 0)
          return value;
        return String(value);
      } else if (targetType === Number && !isMap) {
        if (value === null || value === void 0)
          return value;
        return Number(value);
      } else if (targetType === Boolean && !isMap) {
        if (value === null || value === void 0)
          return value;
        return Boolean(value);
      } else if ((targetType === Date || value instanceof Date) && !isMap) {
        if (value instanceof Date) {
          return new Date(value.valueOf());
        }
        if (value === null || value === void 0)
          return value;
        return new Date(value);
      } else if (!!getGlobal().Buffer && (targetType === Buffer || value instanceof Buffer) && !isMap) {
        if (value === null || value === void 0)
          return value;
        return Buffer.from(value);
      } else if (isPromise(value) && !isMap) {
        return new Promise(function(resolve, reject) {
          value.then(function(data) {
            return resolve(_this.transform(void 0, data, targetType, void 0, void 0, level + 1));
          }, reject);
        });
      } else if (!isMap && value !== null && typeof value === "object" && typeof value.then === "function") {
        return value;
      } else if (typeof value === "object" && value !== null) {
        if (!targetType && value.constructor !== Object)
          if (!Array.isArray(value) && value.constructor === Array) {
          } else {
            targetType = value.constructor;
          }
        if (!targetType && source)
          targetType = source.constructor;
        if (this.options.enableCircularCheck) {
          this.recursionStack.add(value);
        }
        var keys = this.getKeys(targetType, value, isMap);
        var newValue = source ? source : {};
        if (!source && (this.transformationType === TransformationType.PLAIN_TO_CLASS || this.transformationType === TransformationType.CLASS_TO_CLASS)) {
          if (isMap) {
            newValue = /* @__PURE__ */ new Map();
          } else if (targetType) {
            newValue = new targetType();
          } else {
            newValue = {};
          }
        }
        var _loop_1 = function(key2) {
          if (key2 === "__proto__" || key2 === "constructor") {
            return "continue";
          }
          var valueKey = key2;
          var newValueKey = key2, propertyName = key2;
          if (!this_1.options.ignoreDecorators && targetType) {
            if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
              var exposeMetadata = defaultMetadataStorage.findExposeMetadataByCustomName(targetType, key2);
              if (exposeMetadata) {
                propertyName = exposeMetadata.propertyName;
                newValueKey = exposeMetadata.propertyName;
              }
            } else if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN || this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
              var exposeMetadata = defaultMetadataStorage.findExposeMetadata(targetType, key2);
              if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
                newValueKey = exposeMetadata.options.name;
              }
            }
          }
          var subValue = void 0;
          if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
            subValue = value[valueKey];
          } else {
            if (value instanceof Map) {
              subValue = value.get(valueKey);
            } else if (value[valueKey] instanceof Function) {
              subValue = value[valueKey]();
            } else {
              subValue = value[valueKey];
            }
          }
          var type = void 0, isSubValueMap = subValue instanceof Map;
          if (targetType && isMap) {
            type = targetType;
          } else if (targetType) {
            var metadata_1 = defaultMetadataStorage.findTypeMetadata(targetType, propertyName);
            if (metadata_1) {
              var options = { newObject: newValue, object: value, property: propertyName };
              var newType = metadata_1.typeFunction ? metadata_1.typeFunction(options) : metadata_1.reflectedType;
              if (metadata_1.options && metadata_1.options.discriminator && metadata_1.options.discriminator.property && metadata_1.options.discriminator.subTypes) {
                if (!(value[valueKey] instanceof Array)) {
                  if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                    type = metadata_1.options.discriminator.subTypes.find(function(subType) {
                      if (subValue && subValue instanceof Object && metadata_1.options.discriminator.property in subValue) {
                        return subType.name === subValue[metadata_1.options.discriminator.property];
                      }
                    });
                    type === void 0 ? type = newType : type = type.value;
                    if (!metadata_1.options.keepDiscriminatorProperty) {
                      if (subValue && subValue instanceof Object && metadata_1.options.discriminator.property in subValue) {
                        delete subValue[metadata_1.options.discriminator.property];
                      }
                    }
                  }
                  if (this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
                    type = subValue.constructor;
                  }
                  if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN) {
                    if (subValue) {
                      subValue[metadata_1.options.discriminator.property] = metadata_1.options.discriminator.subTypes.find(function(subType) {
                        return subType.value === subValue.constructor;
                      }).name;
                    }
                  }
                } else {
                  type = metadata_1;
                }
              } else {
                type = newType;
              }
              isSubValueMap = isSubValueMap || metadata_1.reflectedType === Map;
            } else if (this_1.options.targetMaps) {
              this_1.options.targetMaps.filter(function(map) {
                return map.target === targetType && !!map.properties[propertyName];
              }).forEach(function(map) {
                return type = map.properties[propertyName];
              });
            } else if (this_1.options.enableImplicitConversion && this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
              var reflectedType = Reflect.getMetadata("design:type", targetType.prototype, propertyName);
              if (reflectedType) {
                type = reflectedType;
              }
            }
          }
          var arrayType_1 = Array.isArray(value[valueKey]) ? this_1.getReflectedType(targetType, propertyName) : void 0;
          var subSource = source ? source[valueKey] : void 0;
          if (newValue.constructor.prototype) {
            var descriptor = Object.getOwnPropertyDescriptor(newValue.constructor.prototype, newValueKey);
            if ((this_1.transformationType === TransformationType.PLAIN_TO_CLASS || this_1.transformationType === TransformationType.CLASS_TO_CLASS) && // eslint-disable-next-line @typescript-eslint/unbound-method
            (descriptor && !descriptor.set || newValue[newValueKey] instanceof Function))
              return "continue";
          }
          if (!this_1.options.enableCircularCheck || !this_1.isCircular(subValue)) {
            var transformKey = this_1.transformationType === TransformationType.PLAIN_TO_CLASS ? newValueKey : key2;
            var finalValue = void 0;
            if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN) {
              finalValue = value[transformKey];
              finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
              finalValue = value[transformKey] === finalValue ? subValue : finalValue;
              finalValue = this_1.transform(subSource, finalValue, type, arrayType_1, isSubValueMap, level + 1);
            } else {
              if (subValue === void 0 && this_1.options.exposeDefaultValues) {
                finalValue = newValue[newValueKey];
              } else {
                finalValue = this_1.transform(subSource, subValue, type, arrayType_1, isSubValueMap, level + 1);
                finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
              }
            }
            if (finalValue !== void 0 || this_1.options.exposeUnsetFields) {
              if (newValue instanceof Map) {
                newValue.set(newValueKey, finalValue);
              } else {
                newValue[newValueKey] = finalValue;
              }
            }
          } else if (this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
            var finalValue = subValue;
            finalValue = this_1.applyCustomTransformations(finalValue, targetType, key2, value, this_1.transformationType);
            if (finalValue !== void 0 || this_1.options.exposeUnsetFields) {
              if (newValue instanceof Map) {
                newValue.set(newValueKey, finalValue);
              } else {
                newValue[newValueKey] = finalValue;
              }
            }
          }
        };
        var this_1 = this;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
          var key = keys_1[_i];
          _loop_1(key);
        }
        if (this.options.enableCircularCheck) {
          this.recursionStack.delete(value);
        }
        return newValue;
      } else {
        return value;
      }
    };
    TransformOperationExecutor2.prototype.applyCustomTransformations = function(value, target, key, obj, transformationType) {
      var _this = this;
      var metadatas = defaultMetadataStorage.findTransformMetadatas(target, key, this.transformationType);
      if (this.options.version !== void 0) {
        metadatas = metadatas.filter(function(metadata) {
          if (!metadata.options)
            return true;
          return _this.checkVersion(metadata.options.since, metadata.options.until);
        });
      }
      if (this.options.groups && this.options.groups.length) {
        metadatas = metadatas.filter(function(metadata) {
          if (!metadata.options)
            return true;
          return _this.checkGroups(metadata.options.groups);
        });
      } else {
        metadatas = metadatas.filter(function(metadata) {
          return !metadata.options || !metadata.options.groups || !metadata.options.groups.length;
        });
      }
      metadatas.forEach(function(metadata) {
        value = metadata.transformFn({ value, key, obj, type: transformationType, options: _this.options });
      });
      return value;
    };
    TransformOperationExecutor2.prototype.isCircular = function(object) {
      return this.recursionStack.has(object);
    };
    TransformOperationExecutor2.prototype.getReflectedType = function(target, propertyName) {
      if (!target)
        return void 0;
      var meta = defaultMetadataStorage.findTypeMetadata(target, propertyName);
      return meta ? meta.reflectedType : void 0;
    };
    TransformOperationExecutor2.prototype.getKeys = function(target, object, isMap) {
      var _this = this;
      var strategy = defaultMetadataStorage.getStrategy(target);
      if (strategy === "none")
        strategy = this.options.strategy || "exposeAll";
      var keys = [];
      if (strategy === "exposeAll" || isMap) {
        if (object instanceof Map) {
          keys = Array.from(object.keys());
        } else {
          keys = Object.keys(object);
        }
      }
      if (isMap) {
        return keys;
      }
      if (this.options.ignoreDecorators && this.options.excludeExtraneousValues && target) {
        var exposedProperties = defaultMetadataStorage.getExposedProperties(target, this.transformationType);
        var excludedProperties = defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
        keys = __spreadArray(__spreadArray([], exposedProperties, true), excludedProperties, true);
      }
      if (!this.options.ignoreDecorators && target) {
        var exposedProperties = defaultMetadataStorage.getExposedProperties(target, this.transformationType);
        if (this.transformationType === TransformationType.PLAIN_TO_CLASS) {
          exposedProperties = exposedProperties.map(function(key) {
            var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
            if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
              return exposeMetadata.options.name;
            }
            return key;
          });
        }
        if (this.options.excludeExtraneousValues) {
          keys = exposedProperties;
        } else {
          keys = keys.concat(exposedProperties);
        }
        var excludedProperties_1 = defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
        if (excludedProperties_1.length > 0) {
          keys = keys.filter(function(key) {
            return !excludedProperties_1.includes(key);
          });
        }
        if (this.options.version !== void 0) {
          keys = keys.filter(function(key) {
            var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
            if (!exposeMetadata || !exposeMetadata.options)
              return true;
            return _this.checkVersion(exposeMetadata.options.since, exposeMetadata.options.until);
          });
        }
        if (this.options.groups && this.options.groups.length) {
          keys = keys.filter(function(key) {
            var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
            if (!exposeMetadata || !exposeMetadata.options)
              return true;
            return _this.checkGroups(exposeMetadata.options.groups);
          });
        } else {
          keys = keys.filter(function(key) {
            var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
            return !exposeMetadata || !exposeMetadata.options || !exposeMetadata.options.groups || !exposeMetadata.options.groups.length;
          });
        }
      }
      if (this.options.excludePrefixes && this.options.excludePrefixes.length) {
        keys = keys.filter(function(key) {
          return _this.options.excludePrefixes.every(function(prefix) {
            return key.substr(0, prefix.length) !== prefix;
          });
        });
      }
      keys = keys.filter(function(key, index, self2) {
        return self2.indexOf(key) === index;
      });
      return keys;
    };
    TransformOperationExecutor2.prototype.checkVersion = function(since, until) {
      var decision = true;
      if (decision && since)
        decision = this.options.version >= since;
      if (decision && until)
        decision = this.options.version < until;
      return decision;
    };
    TransformOperationExecutor2.prototype.checkGroups = function(groups) {
      if (!groups)
        return true;
      return this.options.groups.some(function(optionGroup) {
        return groups.includes(optionGroup);
      });
    };
    return TransformOperationExecutor2;
  }()
);

// node_modules/class-transformer/esm5/constants/default-options.constant.js
var defaultOptions = {
  enableCircularCheck: false,
  enableImplicitConversion: false,
  excludeExtraneousValues: false,
  excludePrefixes: void 0,
  exposeDefaultValues: false,
  exposeUnsetFields: true,
  groups: void 0,
  ignoreDecorators: false,
  strategy: void 0,
  targetMaps: void 0,
  version: void 0
};

// node_modules/class-transformer/esm5/ClassTransformer.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var ClassTransformer = (
  /** @class */
  function() {
    function ClassTransformer2() {
    }
    ClassTransformer2.prototype.instanceToPlain = function(object, options) {
      var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_PLAIN, __assign(__assign({}, defaultOptions), options));
      return executor.transform(void 0, object, void 0, void 0, void 0, void 0);
    };
    ClassTransformer2.prototype.classToPlainFromExist = function(object, plainObject, options) {
      var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_PLAIN, __assign(__assign({}, defaultOptions), options));
      return executor.transform(plainObject, object, void 0, void 0, void 0, void 0);
    };
    ClassTransformer2.prototype.plainToInstance = function(cls, plain, options) {
      var executor = new TransformOperationExecutor(TransformationType.PLAIN_TO_CLASS, __assign(__assign({}, defaultOptions), options));
      return executor.transform(void 0, plain, cls, void 0, void 0, void 0);
    };
    ClassTransformer2.prototype.plainToClassFromExist = function(clsObject, plain, options) {
      var executor = new TransformOperationExecutor(TransformationType.PLAIN_TO_CLASS, __assign(__assign({}, defaultOptions), options));
      return executor.transform(clsObject, plain, void 0, void 0, void 0, void 0);
    };
    ClassTransformer2.prototype.instanceToInstance = function(object, options) {
      var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_CLASS, __assign(__assign({}, defaultOptions), options));
      return executor.transform(void 0, object, void 0, void 0, void 0, void 0);
    };
    ClassTransformer2.prototype.classToClassFromExist = function(object, fromObject, options) {
      var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_CLASS, __assign(__assign({}, defaultOptions), options));
      return executor.transform(fromObject, object, void 0, void 0, void 0, void 0);
    };
    ClassTransformer2.prototype.serialize = function(object, options) {
      return JSON.stringify(this.instanceToPlain(object, options));
    };
    ClassTransformer2.prototype.deserialize = function(cls, json, options) {
      var jsonObject = JSON.parse(json);
      return this.plainToInstance(cls, jsonObject, options);
    };
    ClassTransformer2.prototype.deserializeArray = function(cls, json, options) {
      var jsonObject = JSON.parse(json);
      return this.plainToInstance(cls, jsonObject, options);
    };
    return ClassTransformer2;
  }()
);

// node_modules/class-transformer/esm5/index.js
var classTransformer = new ClassTransformer();
function instanceToPlain(object, options) {
  return classTransformer.instanceToPlain(object, options);
}
function plainToInstance(cls, plain, options) {
  return classTransformer.plainToInstance(cls, plain, options);
}

// src/game/managers/dataManager.ts
var dataManager = class {
  /**
   * Creates a new instance of the game class.
   * @param gameRef - A function that returns the game instance.
   */
  constructor(gameRef) {
    if (typeof window === "undefined") {
      throw new Error("dataManager cannot be run on serverside");
    }
    this.gameRef = gameRef;
    this.normalData = gameRef.data;
    this.gameData = gameRef.data;
  }
  /**
   * Compresses the given game data to a base64-encoded string.
   * @param data The game data to be compressed. Defaults to the current game data.
   * @returns The compressed game data as a base64-encoded string.
   */
  compileData(data = this.gameData) {
    return import_lz_string.default.compressToBase64(JSON.stringify(instanceToPlain(data)));
  }
  /**
   * Decompiles the data stored in localStorage and returns the corresponding object.
   * @param data - The data to decompile. If not provided, it will be fetched from localStorage.
   * @returns The decompiled object, or null if the data is empty or invalid.
   */
  decompileData(data = localStorage.getItem(`${this.gameRef.config.name.id}-data`)) {
    return data ? plainToInstance(gameData, JSON.parse(import_lz_string.default.decompressFromBase64(data))) : null;
  }
  /**
   * Resets the game data to its initial state and saves it.
   * @param reload - Whether to reload the page after resetting the data. Defaults to false.
   */
  resetData(reload = false) {
    this.gameRef.data = this.normalData;
    this.saveData();
    if (reload)
      window.location.reload();
  }
  /**
   * Saves the game data to local storage.
   */
  saveData() {
    localStorage.setItem(`${this.gameRef.config.name.id}-data`, this.compileData());
  }
  /**
   * Compiles the game data and prompts the user to download it as a text file.
   */
  exportData() {
    const content = this.compileData();
    if (prompt("Download save data?:", content) != null) {
      const blob = new Blob([content], { type: "text/plain" });
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `${this.gameRef.config.name.id}-data.txt`;
      downloadLink.textContent = `Download ${this.gameRef.config.name.id}-data.txt file`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }
  /**
   * Loads game data and processes it.
   */
  loadData() {
    if (!this.gameData) {
      return;
    }
    function processObject(obj) {
      for (const prop in obj) {
        if (typeof obj[prop] === "string") {
          try {
            const processedValue = E(obj[prop]);
            obj[prop] = processedValue;
          } catch (error) {
            console.error(`Error processing value: ${obj[prop]}`);
          }
        } else if (typeof obj[prop] === "object" && obj[prop] !== null) {
          processObject(obj[prop]);
        }
      }
      return obj;
    }
    let loadedData = this.decompileData();
    console.log(loadedData);
    console.log(loadedData = processObject(loadedData));
    function deepMerge(source, target) {
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          if (!Object.prototype.hasOwnProperty.call(target, key)) {
            target[key] = source[key];
          } else if (typeof source[key] === "object" && typeof target[key] === "object") {
            deepMerge(source[key], target[key]);
          }
        }
      }
    }
    console.log(deepMerge(this.normalData, loadedData));
  }
};

// src/game/gameCurrency.ts
var gameCurrency = class {
  /**
   * Creates a new instance of the game class.
   * @param currencyPointer - A function that returns the current currency value.
   * @param staticPointer - A function that returns the static data for the game.
   * @param gamePointer A pointer to the game instance.
   */
  constructor(currencyPointer, staticPointer, gamePointer) {
    this.data = typeof currencyPointer === "function" ? currencyPointer() : currencyPointer;
    this.static = typeof staticPointer === "function" ? staticPointer() : staticPointer;
    this.game = gamePointer;
  }
  /**
   * Gets the value of the game currency.
   * @returns The value of the game currency.
   */
  get value() {
    return this.data.value;
  }
};

// src/game/gameAttribute.ts
var gameAttribute = class {
  /**
   * Creates a new instance of the attribute class.
   * @param attributePointer - A function that returns the current attribute value.
   * @param staticPointer - A function that returns the static data for the attribute.
   * @param gamePointer A pointer to the game instance.
   */
  constructor(attributePointer, staticPointer, gamePointer) {
    this.data = typeof attributePointer === "function" ? attributePointer() : attributePointer;
    this.static = typeof staticPointer === "function" ? staticPointer() : staticPointer;
    this.game = gamePointer;
  }
  /**
   * Gets the value of the attribute.
   * NOTE: This getter is sometimes inaccurate.
   * @returns The value of the attribute.
   */
  get value() {
    return this.static.value;
  }
  /**
   * Sets the value of the attribute.
   * NOTE: This setter should not be used when boost is enabled.
   * @param value - The value to set the attribute to.
   */
  set value(value) {
    this.data.value = value;
  }
};

// src/game/resetLayer.ts
var gameReset = class {
  /**
   * Creates a new instance of the game reset.
   * @param currenciesToReset The currencies to reset.
   * @param extender The extender for the game reset.
   */
  constructor(currenciesToReset, extender) {
    this.currenciesToReset = Array.isArray(currenciesToReset) ? currenciesToReset : [currenciesToReset];
    this.extender = extender;
  }
  /**
   * Resets a currency.
   */
  reset() {
    this.currenciesToReset.forEach((currency2) => {
      currency2.static.reset();
    });
    if (this.extender) {
      this.extender.reset();
    }
  }
};

// src/game/game.ts
var gameDefaultConfig = {
  mode: "production",
  name: {
    title: "",
    id: ""
  },
  settings: {
    framerate: 30
  },
  initIntervalBasedManagers: true
};
var gameStatic = class {
  constructor(staticData) {
    this.staticData = staticData ? staticData : {};
  }
  set(name, value) {
    this.staticData[name] = value;
  }
  get(name) {
    return this.staticData[name];
  }
};
var gameData = class {
  constructor(data) {
    this.data = data ? data : {};
  }
  set(name, value) {
    this.data[name] = value;
  }
  get(name) {
    return this.data[name];
  }
};
var game2 = class _game {
  static {
    this.configManager = new configManager(gameDefaultConfig);
  }
  /**
   * Creates a new instance of the game class.
   * @param config - The configuration object for the game.
   */
  constructor(config) {
    this.config = _game.configManager.parse(config);
    this.data = new gameData();
    this.static = new gameStatic();
    this.dataManager = new dataManager(this);
    this.keyManager = new keyManager({
      autoAddInterval: this.config.initIntervalBasedManagers,
      fps: this.config.settings.framerate
    });
    this.eventManager = new eventManager({
      autoAddInterval: this.config.initIntervalBasedManagers,
      fps: this.config.settings.framerate
    });
    this.tickers = [];
  }
  /**
   * Adds a new currency section to the game. {@link gameCurrency}
   * @param name - The name of the currency section.
   * @returns A new instance of the gameCurrency class.
   */
  addCurrency(name) {
    this.data.set(name, {
      currency: new currency()
    });
    this.static.set(name, {
      currency: new currencyStatic(this.data.get(name).currency)
      // attributes: {},
    });
    const classInstance = new gameCurrency(this.data.get(name).currency, this.static.get(name).currency, this);
    return classInstance;
  }
  /**
   * Adds a new currency group to the game.
   * @param name - The name of the currency group.
   * @param currencies - An array of currency names to add to the group.
   */
  addCurrencyGroup(name, currencies) {
    this.data.set(name, {});
    this.static.set(name, {
      attributes: {}
    });
    currencies.forEach((currencyName) => {
      this.data.get(name)[currencyName] = new currency();
      this.static.get(name)[currencyName] = new currencyStatic(this.data.get(name)[currencyName]);
    });
  }
  /**
   * Adds a new attribute to the game. {@link gameAttribute} is the class.
   * @param name - The name of the attribute.
   * @param useBoost - Indicates whether to use boost for the attribute.
   * @param initial - The initial value of the attribute.
   * @returns The newly created attribute.
   */
  addAttribute(name, useBoost = true, initial = 0) {
    this.data.set(name, new attribute(initial));
    this.static.set(name, new attributeStatic(this.data.get(name), useBoost, initial));
    const classInstance = new gameAttribute(this.data.get(name), this.static.get(name), this);
    return classInstance;
  }
  /**
   * Creates a new game reset object with the specified currencies to reset.
   * @param currenciesToReset - The currencies to reset.
   * @param extender - An optional object to extend the game reset object with.
   * @returns The newly created game reset object.
   */
  addReset(currenciesToReset, extender) {
    const reset = new gameReset(currenciesToReset, extender);
    return reset;
  }
};

// src/pixiGame/pixi-intersects.js
var Intersects = /* @__PURE__ */ function() {
  class Shape {
    /**
    * @param {object} [article] that uses this shape
    */
    constructor(article) {
      this.article = article;
    }
    update() {
    }
    /**
    * collides with this shape's AABB box
    * @param {object} AABB
    */
    AABBs(AABB) {
      const AABB2 = this.AABB;
      return !(AABB[2] < AABB2[0] || AABB2[2] < AABB[0] || AABB[3] < AABB2[1] || AABB2[3] < AABB[1]);
    }
    /**
    * point-polygon collision test based on this.vertices
    * based on http://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon/2922778#2922778
    * @param {Point} point
    * @return {boolean}
    */
    collidesPoint(point) {
      const vertices = this.vertices;
      const length = vertices.length;
      let c = false;
      for (let i = 0, j = length - 2; i < length; i += 2) {
        if (vertices[i + 1] > point.y !== vertices[j + 1] > point.y && point.x < (vertices[j] - vertices[i]) * (point.y - vertices[i + 1]) / (vertices[j + 1] - vertices[i + 1]) + vertices[i])
          c = !c;
        j = i;
      }
      return c;
    }
    collidesCircle() {
    }
    collidesRectangle() {
    }
    /**
    * Does Polygon collide Polygon or AABB?
    * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
    * @param {Array} polygon
    * @param {boolean} isAABB
    * @return {boolean}
    */
    collidesPolygon(polygon, isAABB) {
      const a = this.vertices;
      const b = isAABB ? polygon : polygon.vertices;
      const polygons = [a, b];
      let minA, maxA, projected, minB, maxB;
      for (let i = 0; i < polygons.length; i++) {
        const polygon2 = polygons[i];
        for (let i1 = 0; i1 < polygon2.length; i1 += 2) {
          const i2 = (i1 + 2) % polygon2.length;
          const normal = { x: polygon2[i2 + 1] - polygon2[i1 + 1], y: polygon2[i1] - polygon2[i2] };
          minA = maxA = null;
          for (let j = 0; j < a.length; j += 2) {
            projected = normal.x * a[j] + normal.y * a[j + 1];
            if (minA === null || projected < minA)
              minA = projected;
            if (maxA === null || projected > maxA)
              maxA = projected;
          }
          minB = maxB = null;
          for (let j = 0; j < b.length; j += 2) {
            projected = normal.x * b[j] + normal.y * b[j + 1];
            if (minB === null || projected < minB)
              minB = projected;
            if (maxB === null || projected > maxB)
              maxB = projected;
          }
          if (maxA < minB || maxB < minA)
            return false;
        }
      }
      return true;
    }
    /**
    * Does polygon collide Line?
    * @param {Point} p1
    * @param {Point} p2
    * @return {boolean}
    */
    collidesLine(p1, p2) {
      const vertices = this.vertices;
      const length = vertices.length;
      if (this.collidesPoint(p1))
        return true;
      for (let i = 0; i < length; i += 2) {
        const j = (i + 2) % length;
        if (Shape.lineLine(p1, p2, { x: vertices[i], y: vertices[i + 1] }, { x: vertices[j], y: vertices[j + 1] }))
          return true;
      }
      return false;
    }
    /** catch all for automatic collision checking */
    collides(shape) {
      return this["collides" + shape.SHAPE](shape);
    }
    /**
    * Do two lines intersect?
    * from http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
    * @param {Point} p1
    * @param {Point} p2
    * @param {Point} p3
    * @param {Point} p4
    * @return {boolean}
    */
    static lineLine(p1, p2, p3, p4) {
      const p0_x = p1.x;
      const p0_y = p1.y;
      const p1_x = p2.x;
      const p1_y = p2.y;
      const p2_x = p3.x;
      const p2_y = p3.y;
      const p3_x = p4.x;
      const p3_y = p4.y;
      const s1_x = p1_x - p0_x;
      const s1_y = p1_y - p0_y;
      const s2_x = p3_x - p2_x;
      const s2_y = p3_y - p2_y;
      const s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
      const t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);
      return s >= 0 && s <= 1 && t >= 0 && t <= 1;
    }
  }
  class Rectangle extends Shape {
    /**
    * @param {object} article that uses this shape
    * @param {object} [options] @see {@link Rectangle.set}
    */
    constructor(article, options) {
      super(article);
      this.SHAPE = "Rectangle";
      options = options || {};
      this._vertices = [];
      this.AABB = [0, 0, 0, 0];
      this.set(options);
    }
    /**
    * @param {object} options
    * @param {number} [options.width] width of object when aligned
    * @param {number} [options.height] height of object when aligned
    * @param {number} [options.square] side size of a square
    * @param {object} [options.center] object to use for position (and rotation, unless separately defined)
    * @param {object} [options.rotation] object to use for rotation instead of options.center or article
    * @param {boolean} [options.noRotate] object does not rotate (simplifies math)
    */
    set(options) {
      this.center = options.center || this.article;
      this.rotation = options.rotation ? options.rotation : options.center ? options.center : this.article;
      if (typeof options.square !== "undefined")
        this._width = this._height = options.square;
      else {
        this._width = options.width || this.article.width;
        this._height = options.height || this.article.height;
      }
      this.noRotate = options.noRotate;
      this.hw = this._width / 2;
      this.hh = this._height / 2;
      this.update();
    }
    /** width of rectangle */
    get width() {
      return this._width;
    }
    set width(value) {
      this._width = value;
      this.hw = value / 2;
    }
    /** height of rectangle */
    get height() {
      return this._height;
    }
    set height(value) {
      this._height = value;
      this.hh = value / 2;
    }
    /**
    * based on http://www.willperone.net/Code/coderr.php
    * update AABB and sets vertices to dirty
    */
    update() {
      const AABB = this.AABB;
      const center = this.center;
      if (this.noRotate) {
        const hw = this.hw;
        const hh = this.hh;
        AABB[0] = center.x - hw;
        AABB[1] = center.y - hh;
        AABB[2] = center.x + hw;
        AABB[3] = center.y + hh;
      } else {
        const s = Math.abs(Math.sin(this.rotation.rotation) / 2);
        const c = Math.abs(Math.cos(this.rotation.rotation) / 2);
        const width = this._width;
        const height = this._height;
        const ex = height * s + width * c;
        const ey = height * c + width * s;
        AABB[0] = center.x - ex;
        AABB[1] = center.y - ey;
        AABB[2] = center.x + ex;
        AABB[3] = center.y + ey;
      }
      this.verticesDirty = true;
    }
    /** updates vertices automatically when dirty */
    updateVertices() {
      const vertices = this._vertices;
      const center = this.center;
      const hw = this.hw;
      const hh = this.hh;
      if (this.noRotate) {
        const AABB = this.AABB;
        vertices[0] = AABB[0];
        vertices[1] = AABB[1];
        vertices[2] = AABB[2];
        vertices[3] = AABB[1];
        vertices[4] = AABB[2];
        vertices[5] = AABB[3];
        vertices[6] = AABB[0];
        vertices[7] = AABB[3];
      } else {
        const rotation = this.rotation.rotation;
        const sin = Math.sin(rotation);
        const cos = Math.cos(rotation);
        vertices[0] = center.x - hw * cos + hh * sin;
        vertices[1] = center.y - hw * sin - hh * cos;
        vertices[2] = center.x + hw * cos + hh * sin;
        vertices[3] = center.y + hw * sin - hh * cos;
        vertices[4] = center.x + hw * cos - hh * sin;
        vertices[5] = center.y + hw * sin + hh * cos;
        vertices[6] = center.x - hw * cos - hh * sin;
        vertices[7] = center.y - hw * sin + hh * cos;
      }
      this.verticesDirty = false;
    }
    /** sets vertices Array[8] */
    get vertices() {
      if (this.verticesDirty)
        this.updateVertices();
      return this._vertices;
    }
    /**
    * Does Rectangle collide Rectangle?
    * @param {Rectangle} rectangle
    * @return {boolean}
    */
    collidesRectangle(rectangle) {
      if (this.noRotate && rectangle.noRotate)
        return this.AABBs(rectangle.AABB);
      else
        return this.collidesPolygon(rectangle);
    }
    /**
    * Does Rectangle collide Circle?
    * @param {Circle} circle
    * @return {boolean}
    */
    collidesCircle(circle) {
      return circle.collidesRectangle(this);
    }
    static fromRectangle(x, y, width, height) {
      const center = { x: x + width / 2, y: y + height / 2 };
      return new Rectangle(center, { width, height, noRotate: true });
    }
  }
  class Polygon extends Shape {
    /**
    * @param {Article} article that uses this shape
    * @param {array} points in the form of [x, y, x2, y2, x3, y3, . . .]
    * @param {object} [options] @see {@link Polygon.set}
    */
    constructor(article, points, options) {
      super(article);
      this.SHAPE = "Polygon";
      options = options || {};
      this.points = points;
      this.vertices = [];
      this.AABB = [];
      this.set(options);
    }
    /**
    * @param {object} options
    * @param {PIXI.Point[]} options.points
    * @param {PIXI.DisplayObject} [options.center] - object to use for position (and rotation, unless separately defined)
    * @param {PIXI.DisplayObject} [options.rotation] - object to use for rotation instead of options.center or article
    */
    set(options) {
      if (options.point)
        this.points = options.points;
      this.center = options.center || this.article;
      this.rotation = options.rotation ? options.rotation : options.center ? options.center : this.article;
      this.update();
    }
    /**
    * based on http://www.willperone.net/Code/coderr.php
    */
    update() {
      const rotation = this.rotation.rotation;
      const sin = Math.sin(rotation);
      const cos = Math.cos(rotation);
      let minX = Infinity, maxX = 0, minY = Infinity, maxY = 0;
      const points = this.points;
      const count = points.length;
      const vertices = this.vertices;
      const center = this.center;
      for (let i = 0; i < count; i += 2) {
        const pointX = points[i];
        const pointY = points[i + 1];
        const x = vertices[i] = center.x + pointX * cos - pointY * sin;
        const y = vertices[i + 1] = center.y + pointX * sin + pointY * cos;
        minX = x < minX ? x : minX;
        maxX = x > maxX ? x : maxX;
        minY = y < minY ? y : minY;
        maxY = y > maxY ? y : maxY;
      }
      this.AABB[0] = minX;
      this.AABB[1] = minY;
      this.AABB[2] = maxX;
      this.AABB[3] = maxY;
      this.width = maxX - minX;
      this.height = maxY - minY;
      this.hw = (maxX - minX) / 2;
      this.hh = (maxY - minY) / 2;
    }
    /**
    * Does Rectangle collide Rectangle?
    * @param {Rectangle} rectangle
    * @return {boolean}
    */
    collidesRectangle(rectangle) {
      return this.collidesPolygon(rectangle);
    }
    /**
    * Does Rectangle collide Circle?
    * @param {Circle} circle
    * @return {boolean}
    */
    collidesCircle(circle) {
      return circle.collidesPolygon(this);
    }
  }
  class Circle extends Shape {
    /**
    * @param {Article} article that uses this shape
    * @param {object} [options] - @see {@link Circle.set}
    */
    constructor(article, options) {
      super(article);
      this.SHAPE = "Circle";
      this.AABB = [];
      options = options || {};
      this.set(options);
    }
    /**
    * @param {object} options
    * @param {object} [options.positionObject=this.article] use this to update position
    * @param {number} [options.radius] otherwise article.width / 2 is used as radius
    */
    set(options) {
      this.radius = options.radius || this.article.width / 2;
      this.radiusSquared = this.radius * this.radius;
      this.center = options.positionObject ? options.positionObject : this.article;
      this.update();
    }
    /** update AABB */
    update() {
      const AABB = this.AABB;
      const radius = this.radius;
      const center = this.center;
      AABB[0] = center.x - radius;
      AABB[1] = center.y - radius;
      AABB[2] = center.x + radius;
      AABB[3] = center.y + radius;
    }
    /**
    * Does Circle collide with Circle?
    * @param {Circle} circle
    * @return {boolean}
    */
    collidesCircle(circle) {
      const thisCenter = this.center;
      const center = circle.center;
      const x = center.x - thisCenter.x;
      const y = center.y - thisCenter.y;
      const radii = circle.radius + this.radius;
      return x * x + y * y <= radii * radii;
    }
    /**
    * Does Circle collide with point?
    * @param {Point} point
    * @return {boolean}
    */
    collidesPoint(point) {
      const x = point.x - this.center.x;
      const y = point.y - this.center.y;
      return x * x + y * y <= this.radiusSquared;
    }
    /**
    * Does Circle collide with a line?
    * from http://stackoverflow.com/a/10392860/1955997
    * @param {Point} p1
    * @param {Point} p2
    * @return {boolean}
    */
    collidesLine(p1, p2) {
      function dot(v1, v2) {
        return v1[0] * v2[0] + v1[1] * v2[1];
      }
      const center = this.center;
      const ac = [center.x - p1.x, center.y - p1.y];
      const ab = [p2.x - p1.x, p2.y - p1.y];
      const ab2 = dot(ab, ab);
      const acab = dot(ac, ab);
      let t = acab / ab2;
      t = t < 0 ? 0 : t;
      t = t > 1 ? 1 : t;
      const h = [ab[0] * t + p1.x - center.x, ab[1] * t + p1.y - center.y];
      const h2 = dot(h, h);
      return h2 <= this.radiusSquared;
    }
    /**
    * Does circle collide with Rectangle?
    * @param {Rectangle} rectangle
    */
    collidesRectangle(rectangle) {
      if (rectangle.noRotate) {
        const AABB = rectangle.AABB;
        const hw = (AABB[2] - AABB[0]) / 2;
        const hh = (AABB[3] - AABB[1]) / 2;
        const center = this.center;
        const radius = this.radius;
        const distX = Math.abs(center.x - AABB[0]);
        const distY = Math.abs(center.y - AABB[1]);
        if (distX > hw + radius || distY > hh + radius)
          return false;
        if (distX <= hw || distY <= hh)
          return true;
        const x = distX - hw;
        const y = distY - hh;
        return x * x + y * y <= this.radiusSquared;
      } else {
        const center = this.center;
        if (rectangle.collidesPoint(center))
          return true;
        const vertices = rectangle.vertices;
        return this.collidesLine({ x: vertices[0], y: vertices[1] }, { x: vertices[2], y: vertices[3] }) || this.collidesLine({ x: vertices[2], y: vertices[3] }, { x: vertices[4], y: vertices[5] }) || this.collidesLine({ x: vertices[4], y: vertices[5] }, { x: vertices[6], y: vertices[7] }) || this.collidesLine({ x: vertices[6], y: vertices[7] }, { x: vertices[0], y: vertices[1] });
      }
    }
    // from http://stackoverflow.com/a/402019/1955997
    collidesPolygon(polygon) {
      const center = this.center;
      if (polygon.collidesPoint(center))
        return true;
      const vertices = polygon.vertices;
      const count = vertices.length;
      for (let i = 0; i < count - 2; i += 2)
        if (this.collidesLine({ x: vertices[i], y: vertices[i + 1] }, { x: vertices[i + 2], y: vertices[i + 3] }))
          return true;
      return this.collidesLine({ x: vertices[0], y: vertices[1] }, { x: vertices[count - 2], y: vertices[count - 1] });
    }
  }
  return { Shape, Rectangle, Polygon, Circle };
}();
var pixi_intersects_default = Intersects;

// src/pixiGame/sprite.ts
var sprite = class {
  /**
   * Constructs a new game sprite.
   * @param gameRef - The game reference.
   * @param spr - The PIXI sprite to create the game sprite from.
   * @param collisionShape - The type of collision shape to use for the sprite.
   * Default: "Rectangle"
   * Allowed values: "Circle", "Polygon", "Rectangle", "Shape", "Line".
   */
  constructor(gameRef, spr, collisionShape = "Rectangle") {
    this.gameRef = gameRef;
    this.sprite = this.gameRef.PIXI.app.stage.addChild(spr);
    this.x = this.sprite.x;
    this.y = this.sprite.y;
    this.collisionShape = collisionShape;
    this.intersects = new pixi_intersects_default[this.collisionShape](this.sprite);
    this.gameRef.PIXI.app.ticker.add(this.tickerFn, this);
  }
  tickerFn() {
    this.sprite.x = this.x - this.gameRef.PIXI.camera.x;
    this.sprite.y = this.y - this.gameRef.PIXI.camera.y;
  }
  /**
   * Checks if this sprite collides with another sprite.
   * @param other - The other sprite to check for collision with.
   * @returns True if a collision occurs, otherwise false.
   */
  collides(other) {
    return this.intersects[`collides${other.collisionShape}`](other.intersects);
  }
  /**
   * Removes the sprite from its parent and optionally from an array.
   * @param parent - The parent object or array.
   */
  remove(parent) {
    this.x = this.y = Infinity;
    this.sprite.parent.removeChild(this.sprite);
    if (Array.isArray(parent)) {
      const index = parent.indexOf(this);
      if (index !== -1) {
        parent.splice(index, 1);
      }
    } else if (typeof parent == "object")
      delete this;
  }
  /**
   * Removes a sprite from its parent container.
   * @param sprite - The sprite to remove.
   * @param parent - The parent container from which to remove the sprite.
   */
  static remove(sprite2, parent) {
    sprite2.remove(parent);
  }
};

// src/pixiGame/pixiGame.ts
var import_pixi = require("pixi.js");
var pixiGameDefaultConfig = {
  ...gameDefaultConfig,
  initIntervalBasedManagers: false,
  pixi: {
    app: {
      background: 0,
      // @ts-expect-error - PIXI types are wrong
      resizeTo: window
    }
  }
};
var pixiGame = class _pixiGame extends game2 {
  constructor(config) {
    super(config);
    this.config = _pixiGame.configManager.parse(config);
    let app;
    if (this.config.pixi.app instanceof import_pixi.Application) {
      app = this.config.pixi.app;
    } else {
      app = new import_pixi.Application(this.config.pixi.app);
      app.stage.eventMode = "static";
      document.body.appendChild(app.view);
    }
    this.PIXI = {
      app,
      camera: {
        x: 0,
        y: 0
      }
    };
    this.keyManager = new keyManager({
      autoAddInterval: true,
      pixiApp: this.PIXI.app
    });
    this.eventManager = new eventManager({
      autoAddInterval: true,
      pixiApp: this.PIXI.app
    });
  }
  static {
    this.configManager = new configManager(pixiGameDefaultConfig);
  }
  addSprite(spriteToAdd, collisionShape = "Rectangle") {
    return new sprite(this, spriteToAdd, collisionShape);
  }
};

// src/pixiGame/index.ts
hookPixiGame();
/*! Bundled license information:

reflect-metadata/Reflect.js:
  (*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)
*/
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
