(function (g, f) {
    var hasExports = typeof exports === 'object';
    if (typeof define === "function" && define.amd) {
      define(['reflect-metadata', 'class-transformer'], f);
    } else if (typeof module === "object" && module.exports) {
      module.exports = f(require('reflect-metadata'), require('class-transformer'));
    } else {
      var m = hasExports ? f(require('reflect-metadata'), require('class-transformer')) : f(g["reflect-metadata"], g["class-transformer"]);
      var root = hasExports ? exports : g;
      for(var i in m) root[i] = m[i];
    }}(typeof self !== 'undefined' ? self : this, (__da, __db) => {
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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// node_modules/lz-string/libs/lz-string.js
var require_lz_string = __commonJS({
  "node_modules/lz-string/libs/lz-string.js"(exports, module2) {
    var LZString = function() {
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
      var LZString2 = {
        compressToBase64: function(input) {
          if (input == null) return "";
          var res = LZString2._compress(input, 6, function(a) {
            return keyStrBase64.charAt(a);
          });
          switch (res.length % 4) {
            // To produce valid Base64
            default:
            // When could this happen ?
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
          if (input == null) return "";
          if (input == "") return null;
          return LZString2._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrBase64, input.charAt(index));
          });
        },
        compressToUTF16: function(input) {
          if (input == null) return "";
          return LZString2._compress(input, 15, function(a) {
            return f(a + 32);
          }) + " ";
        },
        decompressFromUTF16: function(compressed) {
          if (compressed == null) return "";
          if (compressed == "") return null;
          return LZString2._decompress(compressed.length, 16384, function(index) {
            return compressed.charCodeAt(index) - 32;
          });
        },
        //compress into uint8array (UCS-2 big endian format)
        compressToUint8Array: function(uncompressed) {
          var compressed = LZString2.compress(uncompressed);
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
            return LZString2.decompress(compressed);
          } else {
            var buf = new Array(compressed.length / 2);
            for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
              buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
            }
            var result = [];
            buf.forEach(function(c) {
              result.push(f(c));
            });
            return LZString2.decompress(result.join(""));
          }
        },
        //compress into a string that is already URI encoded
        compressToEncodedURIComponent: function(input) {
          if (input == null) return "";
          return LZString2._compress(input, 6, function(a) {
            return keyStrUriSafe.charAt(a);
          });
        },
        //decompress from an output of compressToEncodedURIComponent
        decompressFromEncodedURIComponent: function(input) {
          if (input == null) return "";
          if (input == "") return null;
          input = input.replace(/ /g, "+");
          return LZString2._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrUriSafe, input.charAt(index));
          });
        },
        compress: function(uncompressed) {
          return LZString2._compress(uncompressed, 16, function(a) {
            return f(a);
          });
        },
        _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
          if (uncompressed == null) return "";
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
            } else context_data_position++;
          }
          return context_data.join("");
        },
        decompress: function(compressed) {
          if (compressed == null) return "";
          if (compressed == "") return null;
          return LZString2._decompress(compressed.length, 32768, function(index) {
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
      return LZString2;
    }();
    if (typeof define === "function" && define.amd) {
      define(function() {
        return LZString;
      });
    } else if (typeof module2 !== "undefined" && module2 != null) {
      module2.exports = LZString;
    } else if (typeof angular !== "undefined" && angular != null) {
      angular.module("LZString", []).factory("LZString", function() {
        return LZString;
      });
    }
  }
});

// node_modules/crypt/crypt.js
var require_crypt = __commonJS({
  "node_modules/crypt/crypt.js"(exports, module2) {
    (function() {
      var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", crypt = {
        // Bit-wise rotation left
        rotl: function(n, b) {
          return n << b | n >>> 32 - b;
        },
        // Bit-wise rotation right
        rotr: function(n, b) {
          return n << 32 - b | n >>> b;
        },
        // Swap big-endian to little-endian and vice versa
        endian: function(n) {
          if (n.constructor == Number) {
            return crypt.rotl(n, 8) & 16711935 | crypt.rotl(n, 24) & 4278255360;
          }
          for (var i = 0; i < n.length; i++)
            n[i] = crypt.endian(n[i]);
          return n;
        },
        // Generate an array of any length of random bytes
        randomBytes: function(n) {
          for (var bytes = []; n > 0; n--)
            bytes.push(Math.floor(Math.random() * 256));
          return bytes;
        },
        // Convert a byte array to big-endian 32-bit words
        bytesToWords: function(bytes) {
          for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
            words[b >>> 5] |= bytes[i] << 24 - b % 32;
          return words;
        },
        // Convert big-endian 32-bit words to a byte array
        wordsToBytes: function(words) {
          for (var bytes = [], b = 0; b < words.length * 32; b += 8)
            bytes.push(words[b >>> 5] >>> 24 - b % 32 & 255);
          return bytes;
        },
        // Convert a byte array to a hex string
        bytesToHex: function(bytes) {
          for (var hex = [], i = 0; i < bytes.length; i++) {
            hex.push((bytes[i] >>> 4).toString(16));
            hex.push((bytes[i] & 15).toString(16));
          }
          return hex.join("");
        },
        // Convert a hex string to a byte array
        hexToBytes: function(hex) {
          for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
          return bytes;
        },
        // Convert a byte array to a base-64 string
        bytesToBase64: function(bytes) {
          for (var base64 = [], i = 0; i < bytes.length; i += 3) {
            var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
            for (var j = 0; j < 4; j++)
              if (i * 8 + j * 6 <= bytes.length * 8)
                base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 63));
              else
                base64.push("=");
          }
          return base64.join("");
        },
        // Convert a base-64 string to a byte array
        base64ToBytes: function(base64) {
          base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");
          for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
            if (imod4 == 0) continue;
            bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
          }
          return bytes;
        }
      };
      module2.exports = crypt;
    })();
  }
});

// node_modules/charenc/charenc.js
var require_charenc = __commonJS({
  "node_modules/charenc/charenc.js"(exports, module2) {
    var charenc = {
      // UTF-8 encoding
      utf8: {
        // Convert a string to a byte array
        stringToBytes: function(str) {
          return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
        },
        // Convert a byte array to a string
        bytesToString: function(bytes) {
          return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
        }
      },
      // Binary encoding
      bin: {
        // Convert a string to a byte array
        stringToBytes: function(str) {
          for (var bytes = [], i = 0; i < str.length; i++)
            bytes.push(str.charCodeAt(i) & 255);
          return bytes;
        },
        // Convert a byte array to a string
        bytesToString: function(bytes) {
          for (var str = [], i = 0; i < bytes.length; i++)
            str.push(String.fromCharCode(bytes[i]));
          return str.join("");
        }
      }
    };
    module2.exports = charenc;
  }
});

// node_modules/is-buffer/index.js
var require_is_buffer = __commonJS({
  "node_modules/is-buffer/index.js"(exports, module2) {
    module2.exports = function(obj) {
      return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
    };
    function isBuffer(obj) {
      return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
    }
    function isSlowBuffer(obj) {
      return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));
    }
  }
});

// node_modules/md5/md5.js
var require_md5 = __commonJS({
  "node_modules/md5/md5.js"(exports, module2) {
    (function() {
      var crypt = require_crypt(), utf8 = require_charenc().utf8, isBuffer = require_is_buffer(), bin = require_charenc().bin, md52 = function(message, options) {
        if (message.constructor == String)
          if (options && options.encoding === "binary")
            message = bin.stringToBytes(message);
          else
            message = utf8.stringToBytes(message);
        else if (isBuffer(message))
          message = Array.prototype.slice.call(message, 0);
        else if (!Array.isArray(message) && message.constructor !== Uint8Array)
          message = message.toString();
        var m = crypt.bytesToWords(message), l = message.length * 8, a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
        for (var i = 0; i < m.length; i++) {
          m[i] = (m[i] << 8 | m[i] >>> 24) & 16711935 | (m[i] << 24 | m[i] >>> 8) & 4278255360;
        }
        m[l >>> 5] |= 128 << l % 32;
        m[(l + 64 >>> 9 << 4) + 14] = l;
        var FF = md52._ff, GG = md52._gg, HH = md52._hh, II = md52._ii;
        for (var i = 0; i < m.length; i += 16) {
          var aa = a, bb = b, cc = c, dd = d;
          a = FF(a, b, c, d, m[i + 0], 7, -680876936);
          d = FF(d, a, b, c, m[i + 1], 12, -389564586);
          c = FF(c, d, a, b, m[i + 2], 17, 606105819);
          b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
          a = FF(a, b, c, d, m[i + 4], 7, -176418897);
          d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
          c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
          b = FF(b, c, d, a, m[i + 7], 22, -45705983);
          a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
          d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
          c = FF(c, d, a, b, m[i + 10], 17, -42063);
          b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
          a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
          d = FF(d, a, b, c, m[i + 13], 12, -40341101);
          c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
          b = FF(b, c, d, a, m[i + 15], 22, 1236535329);
          a = GG(a, b, c, d, m[i + 1], 5, -165796510);
          d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
          c = GG(c, d, a, b, m[i + 11], 14, 643717713);
          b = GG(b, c, d, a, m[i + 0], 20, -373897302);
          a = GG(a, b, c, d, m[i + 5], 5, -701558691);
          d = GG(d, a, b, c, m[i + 10], 9, 38016083);
          c = GG(c, d, a, b, m[i + 15], 14, -660478335);
          b = GG(b, c, d, a, m[i + 4], 20, -405537848);
          a = GG(a, b, c, d, m[i + 9], 5, 568446438);
          d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
          c = GG(c, d, a, b, m[i + 3], 14, -187363961);
          b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
          a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
          d = GG(d, a, b, c, m[i + 2], 9, -51403784);
          c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
          b = GG(b, c, d, a, m[i + 12], 20, -1926607734);
          a = HH(a, b, c, d, m[i + 5], 4, -378558);
          d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
          c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
          b = HH(b, c, d, a, m[i + 14], 23, -35309556);
          a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
          d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
          c = HH(c, d, a, b, m[i + 7], 16, -155497632);
          b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
          a = HH(a, b, c, d, m[i + 13], 4, 681279174);
          d = HH(d, a, b, c, m[i + 0], 11, -358537222);
          c = HH(c, d, a, b, m[i + 3], 16, -722521979);
          b = HH(b, c, d, a, m[i + 6], 23, 76029189);
          a = HH(a, b, c, d, m[i + 9], 4, -640364487);
          d = HH(d, a, b, c, m[i + 12], 11, -421815835);
          c = HH(c, d, a, b, m[i + 15], 16, 530742520);
          b = HH(b, c, d, a, m[i + 2], 23, -995338651);
          a = II(a, b, c, d, m[i + 0], 6, -198630844);
          d = II(d, a, b, c, m[i + 7], 10, 1126891415);
          c = II(c, d, a, b, m[i + 14], 15, -1416354905);
          b = II(b, c, d, a, m[i + 5], 21, -57434055);
          a = II(a, b, c, d, m[i + 12], 6, 1700485571);
          d = II(d, a, b, c, m[i + 3], 10, -1894986606);
          c = II(c, d, a, b, m[i + 10], 15, -1051523);
          b = II(b, c, d, a, m[i + 1], 21, -2054922799);
          a = II(a, b, c, d, m[i + 8], 6, 1873313359);
          d = II(d, a, b, c, m[i + 15], 10, -30611744);
          c = II(c, d, a, b, m[i + 6], 15, -1560198380);
          b = II(b, c, d, a, m[i + 13], 21, 1309151649);
          a = II(a, b, c, d, m[i + 4], 6, -145523070);
          d = II(d, a, b, c, m[i + 11], 10, -1120210379);
          c = II(c, d, a, b, m[i + 2], 15, 718787259);
          b = II(b, c, d, a, m[i + 9], 21, -343485551);
          a = a + aa >>> 0;
          b = b + bb >>> 0;
          c = c + cc >>> 0;
          d = d + dd >>> 0;
        }
        return crypt.endian([a, b, c, d]);
      };
      md52._ff = function(a, b, c, d, x, s, t) {
        var n = a + (b & c | ~b & d) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      md52._gg = function(a, b, c, d, x, s, t) {
        var n = a + (b & d | c & ~d) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      md52._hh = function(a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      md52._ii = function(a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      md52._blocksize = 16;
      md52._digestsize = 16;
      module2.exports = function(message, options) {
        if (message === void 0 || message === null)
          throw new Error("Illegal argument " + message);
        var digestbytes = crypt.wordsToBytes(md52(message, options));
        return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt.bytesToHex(digestbytes);
      };
    })();
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Boost: () => Boost,
  BoostObject: () => BoostObject,
  CachedUpgradeLookupMode: () => CachedUpgradeLookupMode,
  CachedUpgradeTreeNode: () => CachedUpgradeTreeNode,
  Currency: () => Currency,
  CurrencyData: () => CurrencyData,
  DEFAULT_ITERATIONS: () => DEFAULT_ITERATIONS,
  DEFAULT_ITERATIONS_AS_DECIMAL: () => DEFAULT_ITERATIONS_AS_DECIMAL,
  DEFAULT_TOLERANCE: () => DEFAULT_TOLERANCE,
  Decimal: () => Decimal,
  DecimalArray: () => DecimalArray,
  E: () => E,
  EXP_LIMIT: () => EXP_LIMIT,
  FORMATS: () => FORMATS,
  FormatTypeList: () => formatTypeList,
  Grid: () => Grid,
  GridCell: () => GridCell,
  GridCellCollection: () => GridCellCollection,
  InvalidDecimalProtections: () => InvalidDecimalProtections,
  LAYER_DOWN: () => LAYER_DOWN,
  LRUCache: () => LRUCache,
  ListNode: () => ListNode,
  LowerCachedUpgradeLookup: () => LowerCachedUpgradeLookup,
  MeanMode: () => MeanMode,
  NUMBER_EXP_MAX: () => NUMBER_EXP_MAX,
  OperationBoostOrder: () => OperationBoostOrder,
  RandomSelector: () => RandomSelector,
  RarestFirstCascadeSelectionMethod: () => RarestFirstCascadeSelectionMethod,
  ST_NAMES: () => ST_NAMES,
  SelectionMethod: () => SelectionMethod,
  SkillNode: () => SkillNode,
  Upgrade: () => Upgrade,
  UpgradeData: () => UpgradeData,
  approximateDerivative: () => approximateDerivative,
  calculateInverseFunction: () => calculateInverseFunction,
  calculateSum: () => calculateSum,
  calculateSumApprox: () => calculateSumApprox,
  calculateSumLoop: () => calculateSumLoop,
  decimalMagDifference: () => decimalMagDifference,
  eMathMetadata: () => eMathMetadata,
  f_maglog10: () => f_maglog10,
  formats: () => formats,
  gaussianRandom: () => gaussianRandom,
  geometricEqualsTolerance: () => geometricEqualsTolerance,
  inverseFunctionApprox: () => inverseFunctionApprox,
  inverseFunctionApproxUsingNewtonRaphson: () => inverseFunctionApproxUsingNewtonRaphson,
  mean: () => mean,
  newtonRaphson: () => newtonRaphson,
  poissonRandom: () => poissonRandom,
  roundingBase: () => roundingBase,
  sampleFromBinomialDistribution: () => sampleFromBinomialDistribution
});
module.exports = __toCommonJS(src_exports);
var import_reflect_metadata5 = require("reflect-metadata");

// src/metadata.ts
var eMathMetadata = {
  /**
   * The version of the library
   * @example "10.0.0"
   */
  version: (() => {
    try {
      return "9.6.0";
    } catch (error) {
      return "10.0.0";
    }
  })(),
  /**
   * The data about the Break Eternity library
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "break_eternity.js": {
    /**
     * The version of the Break Eternity library
     * @example "2.1.0"
     */
    version: "2.1.0"
  }
};

// src/E/e.ts
var import_class_transformer = require("class-transformer");

// src/E/LRUCache.ts
var LRUCache = class {
  /**
   * Constructs a new instance of the LRUCache class.
   * @param maxSize The maximum size for this cache. We recommend setting this
   * to be one less than a power of 2, as most hashtables - including V8's
   * Object hashtable (https://crsrc.org/c/v8/src/objects/ordered-hash-table.cc)
   * - uses powers of two for hashtable sizes. It can't exactly be a power of
   * two, as a .set() call could temporarily set the size of the map to be
   * maxSize + 1.
   */
  constructor(maxSize) {
    /** The map of keys to ListNodes. */
    this.map = /* @__PURE__ */ new Map();
    // Invariant: Exactly one of the below is true before and after calling a
    // LRUCache method:
    // - first and last are both undefined, and map.size() is 0.
    // - first and last are the same object, and map.size() is 1.
    // - first and last are different objects, and map.size() is greater than 1.
    /** The first node in the list. */
    this.first = void 0;
    /** The last node in the list. */
    this.last = void 0;
    this.maxSize = maxSize;
  }
  /**
   * @returns The size of the cache
   */
  get size() {
    return this.map.size;
  }
  /**
   * @param key The key to check.
   * @returns Whether the cache contains the specified key.
   */
  has(key) {
    return this.map.has(key);
  }
  /**
   * Clears the cache.
   */
  clear() {
    this.map.clear();
    this.first = void 0;
    this.last = void 0;
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
  /**
   * Constructs a new instance of the ListNode class.
   * @param key - The key of the node.
   * @param value - The value of the node.
   */
  constructor(key, value) {
    /** The next node in the list. */
    this.next = void 0;
    /** The previous node in the list. */
    this.prev = void 0;
    this.key = key;
    this.value = value;
  }
};

// src/E/format.ts
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
var formatTypeList = [
  "st",
  "sc",
  "scientific",
  "omega",
  "omega_short",
  "elemental",
  "old_sc",
  "eng",
  "mixed_sc",
  "layer",
  "standard",
  "inf",
  "alphabet"
];
function decimalFormatGenerator(Decimal2) {
  const FORMATS2 = {
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
        value = new Decimal2(value);
        const step = Decimal2.floor(value.div(1e3));
        const omegaAmount = Decimal2.floor(step.div(FORMATS2.omega.config.greek.length));
        let lastLetter = FORMATS2.omega.config.greek[step.toNumber() % FORMATS2.omega.config.greek.length] + toSubscript(value.toNumber() % 1e3);
        const beyondGreekArrayBounds = FORMATS2.omega.config.greek[step.toNumber() % FORMATS2.omega.config.greek.length] === void 0;
        if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
          lastLetter = "\u03C9";
        }
        const omegaOrder = Decimal2.log(value, 8e3).toNumber();
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
          return `\u03C9(${FORMATS2.omega.format(omegaAmount)})^${lastLetter}`;
        } else if (omegaOrder < 6) {
          return `\u03C9(${FORMATS2.omega.format(omegaAmount)})`;
        }
        const val = Decimal2.pow(8e3, omegaOrder % 1);
        const orderStr = omegaOrder < 100 ? Math.floor(omegaOrder).toFixed(0) : FORMATS2.omega.format(Decimal2.floor(omegaOrder));
        return `\u03C9[${orderStr}](${FORMATS2.omega.format(val)})`;
      }
    },
    /** Short omega format */
    // eslint-disable-next-line @typescript-eslint/naming-convention
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
        value = new Decimal2(value);
        const step = Decimal2.floor(value.div(1e3));
        const omegaAmount = Decimal2.floor(step.div(FORMATS2.omega_short.config.greek.length));
        let lastLetter = FORMATS2.omega_short.config.greek[step.toNumber() % FORMATS2.omega_short.config.greek.length] + toSubscript(value.toNumber() % 1e3);
        const beyondGreekArrayBounds = FORMATS2.omega_short.config.greek[step.toNumber() % FORMATS2.omega_short.config.greek.length] === void 0;
        if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
          lastLetter = "\u03C9";
        }
        const omegaOrder = Decimal2.log(value, 8e3).toNumber();
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
        const val = Decimal2.pow(8e3, omegaOrder % 1);
        const orderStr = omegaOrder < 100 ? Math.floor(omegaOrder).toFixed(0) : FORMATS2.omega_short.format(Decimal2.floor(omegaOrder));
        return `\u03C9[${orderStr}](${FORMATS2.omega_short.format(val)})`;
      }
    },
    elemental: {
      config: {
        /** The list of elements */
        /* eslint-disable prettier/prettier */
        // eslint-disable-next-line @typescript-eslint/naming-convention
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
        /* eslint-enable prettier/prettier */
      },
      getOffset(group) {
        if (group == 1) return 1;
        const n = Math.floor(group / 2);
        let r = 2 * n * (n + 1) * (2 * n + 1) / 3 - 2;
        if (group % 2 == 1) r += 2 * Math.pow(n + 1, 2);
        return r;
      },
      getAbbreviation(group, progress) {
        const length = FORMATS2.elemental.abbreviationLength(group);
        const elemRel = Math.floor(length * progress);
        const elem = elemRel + FORMATS2.elemental.getOffset(group);
        return elem > 118 ? FORMATS2.elemental.beyondOg(elem) : FORMATS2.elemental.config.element_lists[group - 1][elemRel];
      },
      beyondOg(x) {
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
      abbreviationLength(group) {
        return group == 1 ? 1 : Math.pow(Math.floor(group / 2) + 1, 2) * 2;
      },
      getAbbreviationAndValue(x) {
        const abbreviationListUnfloored = x.log(118).toNumber();
        const abbreviationListIndex = Math.floor(abbreviationListUnfloored) + 1;
        const abbreviationLength = FORMATS2.elemental.abbreviationLength(abbreviationListIndex);
        const abbreviationProgress = abbreviationListUnfloored - abbreviationListIndex + 1;
        const abbreviationIndex = Math.floor(abbreviationProgress * abbreviationLength);
        const abbreviation = FORMATS2.elemental.getAbbreviation(abbreviationListIndex, abbreviationProgress);
        const value = new Decimal2(118).pow(abbreviationListIndex + abbreviationIndex / abbreviationLength - 1);
        return [abbreviation, value];
      },
      formatElementalPart(abbreviation, n) {
        if (n.eq(1)) {
          return abbreviation;
        }
        return `${n.toString()} ${abbreviation}`;
      },
      format(value, acc = 2) {
        if (value.gt(new Decimal2(118).pow(new Decimal2(118).pow(new Decimal2(118).pow(4)))))
          return "e" + FORMATS2.elemental.format(value.log10(), acc);
        let log = value.log(118);
        const slog = log.log(118);
        const sslog = slog.log(118).toNumber();
        const max = Math.max(4 - sslog * 2, 1);
        const parts = [];
        while (log.gte(1) && parts.length < max) {
          const [abbreviation, value2] = FORMATS2.elemental.getAbbreviationAndValue(log);
          const n = log.div(value2).floor();
          log = log.sub(n.mul(value2));
          parts.unshift([abbreviation, n]);
        }
        if (parts.length >= max) {
          return parts.map(
            (x) => (
              // @ts-expect-error - x has both string and decimal for some reason
              FORMATS2.elemental.formatElementalPart(x[0], x[1])
            )
          ).join(" + ");
        }
        const formattedMantissa = new Decimal2(118).pow(log).toFixed(parts.length === 1 ? 3 : acc);
        if (parts.length === 0) {
          return formattedMantissa;
        }
        if (parts.length === 1) {
          return `${formattedMantissa} \xD7 ${FORMATS2.elemental.formatElementalPart(parts[0][0], parts[0][1])}`;
        }
        return `${formattedMantissa} \xD7 (${parts.map((x) => FORMATS2.elemental.formatElementalPart(x[0], x[1])).join(" + ")})`;
      }
    },
    /** Old scientific format */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    old_sc: {
      /**
       * Format the value into old scientific format
       * @param ex - The value to format
       * @param acc - The accuracy
       * @returns - The formatted value
       */
      format(ex, acc) {
        ex = new Decimal2(ex);
        const e = ex.log10().floor();
        if (e.lt(9)) {
          if (e.lt(3)) {
            return ex.toFixed(acc);
          }
          return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        } else {
          if (ex.gte("eeee10")) {
            const slog = ex.slog();
            return (slog.gte(1e9) ? "" : Decimal2.dTen.pow(slog.sub(slog.floor())).toFixed(4)) + "F" + FORMATS2.old_sc.format(slog.floor(), 0);
          }
          const m = ex.div(Decimal2.dTen.pow(e));
          return (e.log10().gte(9) ? "" : m.toFixed(4)) + "e" + FORMATS2.old_sc.format(e, 0);
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
      format(ex, acc = 2) {
        ex = new Decimal2(ex);
        const e = ex.log10().floor();
        if (e.lt(9)) {
          if (e.lt(3)) {
            return ex.toFixed(acc);
          }
          return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        } else {
          if (ex.gte("eeee10")) {
            const slog = ex.slog();
            return (slog.gte(1e9) ? "" : Decimal2.dTen.pow(slog.sub(slog.floor())).toFixed(4)) + "F" + FORMATS2.eng.format(slog.floor(), 0);
          }
          const m = ex.div(new Decimal2(1e3).pow(e.div(3).floor()));
          return (e.log10().gte(9) ? "" : m.toFixed(new Decimal2(4).sub(e.sub(e.div(3).floor().mul(3))).toNumber())) + "e" + FORMATS2.eng.format(e.div(3).floor().mul(3), 0);
        }
      }
    },
    /** Mixed scientific format */
    // eslint-disable-next-line @typescript-eslint/naming-convention
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
      format(ex, acc, max = 9) {
        ex = new Decimal2(ex);
        const e = ex.log10().floor();
        if (e.lt(303) && e.gte(max)) return format(ex, acc, max, "st");
        else return format(ex, acc, max, "sc");
      }
    },
    /** Layer format */
    layer: {
      layers: [
        "infinity",
        "eternity",
        "reality",
        "equality",
        "affinity",
        "celerity",
        "identity",
        "vitality",
        "immunity",
        "atrocity"
      ],
      format(ex, acc = 2, max) {
        ex = new Decimal2(ex);
        const layer = ex.max(1).log10().max(1).log(INFINITY_NUM.log10()).floor();
        if (layer.lte(0)) return format(ex, acc, max, "sc");
        ex = Decimal2.dTen.pow(
          ex.max(1).log10().div(INFINITY_NUM.log10().pow(layer)).sub(layer.gte(1) ? 1 : 0)
        );
        const meta = layer.div(10).floor();
        const layer_id = layer.toNumber() % 10 - 1;
        return format(ex, Math.max(4, acc), max, "sc") + " " + (meta.gte(1) ? "meta" + (meta.gte(2) ? "^" + format(meta, 0, max, "sc") : "") + "-" : "") + (isNaN(layer_id) ? "nanity" : FORMATS2.layer.layers[layer_id]);
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
        if (x < 10) return ST_NAMES[1][0][x];
        if (t == 1 && o == 0) r += "Vec";
        else r += ST_NAMES[1][1][o] + ST_NAMES[1][2][t];
        r += ST_NAMES[1][3][h];
        return r;
      }
    },
    /** Infinity format */
    inf: {
      format(ex, acc, max) {
        ex = new Decimal2(ex);
        let meta = 0;
        const inf = new Decimal2(Number.MAX_VALUE);
        const symbols = ["", "\u221E", "\u03A9", "\u03A8", "\u028A"];
        const symbols2 = ["", "", "m", "mm", "mmm"];
        while (ex.gte(inf)) {
          ex = ex.log(inf);
          meta++;
        }
        if (meta == 0) return format(ex, acc, max, "sc");
        if (ex.gte(3)) return symbols2[meta] + symbols[meta] + "\u03C9^" + format(ex.sub(1), acc, max, "sc");
        if (ex.gte(2))
          return symbols2[meta] + "\u03C9" + symbols[meta] + "-" + format(inf.pow(ex.sub(2)), acc, max, "sc");
        return symbols2[meta] + symbols[meta] + "-" + format(inf.pow(ex.sub(1)), acc, max, "sc");
      }
    },
    // Add more formats here
    /** Alphabet format */
    alphabet: {
      config: {
        alphabet: "abcdefghijklmnopqrstuvwxyz"
      },
      /**
       * Get the abbreviation for a number
       * @param ex - The value to get the abbreviation for
       * @param start - The starting value
       * @param startDouble - Whether to start at aa instead of a
       * @param abbStart - The starting value for abbreviations
       * @returns - The abbreviation
       */
      getAbbreviation(ex, start = new Decimal2(1e15), startDouble = false, abbStart = 9) {
        ex = new Decimal2(ex);
        start = new Decimal2(start).div(1e3);
        if (ex.lt(start.mul(1e3))) return "";
        const { alphabet } = FORMATS2.alphabet.config;
        const alphabetLength = alphabet.length;
        const exponent = ex.log(1e3).sub(start.log(1e3)).floor();
        const numLetters = exponent.add(1).log(alphabetLength + 1).ceil();
        let letters = "";
        const convertToLetters = (num, length) => {
          let remaining = num;
          let out = "";
          for (let i = 0; i < length.toNumber(); i++) {
            const letter = remaining.sub(1).mod(alphabetLength).toNumber();
            if (letter < 0 || letter >= alphabetLength) {
              return "\u03C9";
            }
            out = alphabet[letter] + out;
            remaining = remaining.sub(1).div(alphabetLength).floor();
          }
          return out;
        };
        if (numLetters.lt(abbStart)) {
          letters = convertToLetters(exponent, numLetters);
        } else {
          const trunc = numLetters.sub(abbStart).add(1);
          const truncExponent = exponent.div(Decimal2.pow(alphabetLength + 1, trunc.sub(1))).floor();
          const truncLetters = convertToLetters(truncExponent, new Decimal2(abbStart));
          letters = `${truncLetters}(${trunc.gt("1e9") ? trunc.format() : trunc.format(0)})`;
        }
        return letters;
      },
      /**
       * Format the value into alphabet format (a, b, c, ..., z, aa, ab, ac, ... aaa, aab, ... aaaa, ... aaaaaaaaaaaaaaa, ... aaaaaaaaaaaaaaa(2), aaaaaaaaaaaaaaa(3), ...)
       * Basically base 26 for the exponential part / 3
       * Work in progress
       * @param ex - The value to format
       * @param acc - The accuracy
       * @param max - The maximum value before switching to an abbreviation
       * @param type - The type of format to use
       * @param start - The starting value. Defaults to 1e15, or 1 quadrillion.
       * @param startDouble - Whether to start at aa instead of a. Defaults to false.
       * @param abbStart - The starting value for abbreviations. Defaults to 9.
       * @returns - The formatted value
       */
      format(ex, acc = 2, max = 9, type = "mixed_sc", start = new Decimal2(1e15), startDouble = false, abbStart) {
        ex = new Decimal2(ex);
        start = new Decimal2(start).div(1e3);
        if (ex.lt(start.mul(1e3))) return format(ex, acc, max, type);
        const letters = FORMATS2.alphabet.getAbbreviation(ex, start, startDouble, abbStart);
        const mantissa = ex.div(Decimal2.pow(1e3, ex.log(1e3).floor()));
        const isAbbreviation = letters.length > (abbStart ?? 9) + 2;
        return `${!isAbbreviation ? mantissa.toFixed(acc) + " " : ""}${letters}`;
      }
    }
  };
  const INFINITY_NUM = Decimal2.dTwo.pow(1024);
  const SUBSCRIPT_NUMBERS = "\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089";
  const SUPERSCRIPT_NUMBERS = "\u2070\xB9\xB2\xB3\u2074\u2075\u2076\u2077\u2078\u2079";
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
    ex = new Decimal2(ex);
    const neg = ex.lt(0) ? "-" : "";
    if (ex.mag == Infinity) return neg + "Infinity";
    if (Number.isNaN(ex.mag)) return neg + "NaN";
    if (ex.lt(0)) ex = ex.mul(-1);
    if (ex.eq(0)) return ex.toFixed(acc);
    const e = ex.log10().floor();
    switch (type) {
      case "sc":
      case "scientific": {
        if (ex.log10().lt(Math.min(-acc, 0)) && acc > 1) {
          const e2 = ex.log10().ceil();
          const m = ex.div(e2.eq(-1) ? new Decimal2(0.1) : Decimal2.dTen.pow(e2));
          const be = e2.mul(-1).max(1).log10().gte(9);
          return neg + (be ? "" : m.toFixed(2)) + "e" + format(e2, 0, max, "mixed_sc");
        } else if (e.lt(max)) {
          const a = Math.max(Math.min(acc - e.toNumber(), acc), 0);
          return neg + (a > 0 ? ex.toFixed(a) : ex.toFixed(a).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
        } else {
          if (ex.gte("eeee10")) {
            const slog = ex.slog();
            return (slog.gte(1e9) ? "" : Decimal2.dTen.pow(slog.sub(slog.floor())).toFixed(2)) + "F" + format(slog.floor(), 0);
          }
          const m = ex.div(Decimal2.dTen.pow(e));
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
        if (ee.gte(3e3)) return "e" + format(e, acc, max, "st");
        let final = "";
        if (e3.lt(4)) final = ["", "K", "M", "B"][Math.round(e3.toNumber())];
        else {
          let ee3 = Math.floor(e3.log(1e3).toNumber());
          if (ee3 < 100) ee3 = Math.max(ee3 - 1, 0);
          e3 = e3.sub(1).div(Decimal2.dTen.pow(ee3 * 3));
          while (e3.gt(0)) {
            const div1000 = e3.div(1e3).floor();
            const mod1000 = e3.sub(div1000.mul(1e3)).floor().toNumber();
            if (mod1000 > 0) {
              if (mod1000 == 1 && !ee3) final = "U";
              if (ee3) final = FORMATS2.standard.tier2(ee3) + (final ? "-" + final : "");
              if (mod1000 > 1) final = FORMATS2.standard.tier1(mod1000) + final;
            }
            e3 = div1000;
            ee3++;
          }
        }
        const m = ex.div(Decimal2.dTen.pow(e3_mul));
        const fixedAmt = acc === 2 ? Decimal2.dTwo.sub(e.sub(e3_mul)).add(1).toNumber() : acc;
        return neg + (ee.gte(10) ? "" : m.toFixed(fixedAmt) + " ") + final;
      }
      default:
        if (!FORMATS2[type]) console.error(`Invalid format type "`, type, `"`);
        return neg + FORMATS2[type].format(ex, acc, max);
    }
  }
  function formatGain(amt, gain, type = "mixed_sc", acc, max) {
    amt = new Decimal2(amt);
    gain = new Decimal2(gain);
    const next = amt.add(gain);
    let rate;
    let ooms = next.div(amt);
    if (ooms.gte(10) && amt.gte(1e100)) {
      ooms = ooms.log10().mul(20);
      rate = "(+" + format(ooms, acc, max, type) + " OoMs/sec)";
    } else rate = "(+" + format(gain, acc, max, type) + "/sec)";
    return rate;
  }
  function formatTime(ex, acc = 2, type = "s") {
    ex = new Decimal2(ex);
    if (ex.gte(86400))
      return format(ex.div(86400).floor(), 0, 12, "sc") + ":" + formatTime(ex.mod(86400), acc, "d");
    if (ex.gte(3600) || type == "d")
      return (ex.div(3600).gte(10) || type != "d" ? "" : "0") + format(ex.div(3600).floor(), 0, 12, "sc") + ":" + formatTime(ex.mod(3600), acc, "h");
    if (ex.gte(60) || type == "h")
      return (ex.div(60).gte(10) || type != "h" ? "" : "0") + format(ex.div(60).floor(), 0, 12, "sc") + ":" + formatTime(ex.mod(60), acc, "m");
    return (ex.gte(10) || type != "m" ? "" : "0") + format(ex, acc, 12, "sc");
  }
  function formatTimeLong(ex, ms = false, acc = 0, max = 9, type = "mixed_sc") {
    const formatFn = (exf) => format(exf, acc, max, type);
    ex = new Decimal2(ex);
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
    ex = new Decimal2(ex);
    return format(Decimal2.dOne.sub(ex).mul(100)) + "%";
  }
  function formatPercent(ex) {
    ex = new Decimal2(ex);
    return format(ex.mul(100)) + "%";
  }
  function formatMult(ex, acc = 2, max = 9) {
    ex = new Decimal2(ex);
    return ex.gte(1) ? "\xD7" + ex.format(acc, max) : "/" + ex.recip().format(acc, max);
  }
  function expMult(a, b, base = 10) {
    return Decimal2.gte(a, 10) ? Decimal2.pow(base, Decimal2.log(a, base).pow(b)) : new Decimal2(a);
  }
  function metric(num, type = 0) {
    num = new Decimal2(num);
    const abb = ((abbM) => {
      return abbM.map((x, i) => {
        return {
          name: x.name,
          altName: x.altName,
          value: Decimal2.pow(1e3, new Decimal2(i).add(1))
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
        name: "Decimal",
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
    const abbNum = num.lte(0) ? 0 : Decimal2.min(Decimal2.log(num, 1e3).sub(1), abb.length - 1).floor().toNumber();
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
        output = abbMax.name;
        break;
      case 2:
        output = num.divide(abbMax.value).format();
        break;
      case 3:
        output = abbMax.altName;
        break;
      case 0:
      default:
        output = `${num.divide(abbMax.value).format()} ${abbMax.name}`;
        break;
    }
    return output;
  }
  function ev(num, c2 = false) {
    return `${metric(num, 2)} ${metric(num, 1)}eV${c2 ? "/c^2" : ""}`;
  }
  const formats2 = {
    ...FORMATS2,
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
  };
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    FORMATS: FORMATS2,
    formats: formats2
  };
}

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
    // Base Decimal (using http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html )
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
    // Base Decimal
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
  l = l - 1 / (360 * np);
  np = np * n2;
  l = l + 1 / (1260 * np);
  np = np * n2;
  l = l - 1 / (1680 * np);
  np = np * n2;
  l = l + 1 / (1188 * np);
  np = np * n2;
  l = l - 691 / (360360 * np);
  np = np * n2;
  l = l + 7 / (1092 * np);
  np = np * n2;
  l = l - 3617 / (122400 * np);
  return Math.exp(l) / scal1;
};
var _EXPN1 = 0.36787944117144233;
var OMEGA = 0.5671432904097838;
var f_lambertw = function(z, tol = 1e-10, principal = true) {
  let w;
  let wn;
  if (!Number.isFinite(z)) {
    return z;
  }
  if (principal) {
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
  } else {
    if (z === 0) return -Infinity;
    if (z <= -0.1) {
      w = -2;
    } else {
      w = Math.log(-z) - Math.log(-Math.log(-z));
    }
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
function d_lambertw(z, tol = 1e-10, principal = true) {
  let w;
  let ew, wewz, wn;
  if (!Number.isFinite(z.mag)) {
    return new Decimal(z);
  }
  if (principal) {
    if (z.eq(Decimal.dZero)) {
      return FC_NN(0, 0, 0);
    }
    if (z.eq(Decimal.dOne)) {
      return Decimal.fromNumber(OMEGA);
    }
    w = Decimal.ln(z);
  } else {
    if (z.eq(Decimal.dZero)) {
      return FC_NN(-1, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
    }
    w = Decimal.ln(z.neg());
  }
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
      return FC_NN(0, 0, 0);
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
   * Returns the remainder of 'this' divided by 'value': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
   * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%)...
   * unless 'floored' is true, in which case it uses the "floored" modulo, which is closer to how modulo works in number theory.
   * These two forms of modulo are the same when only positive numbers are involved, but differ in how they work with negative numbers.
   */
  static mod(value, other, floored = false) {
    return D(value).mod(other, floored);
  }
  /**
   * Returns the remainder of 'this' divided by 'value': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
   * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%)...
   * unless 'floored' is true, in which case it uses the "floored" modulo, which is closer to how modulo works in number theory.
   * These two forms of modulo are the same when only positive numbers are involved, but differ in how they work with negative numbers.
   */
  static modulo(value, other, floored = false) {
    return D(value).modulo(other, floored);
  }
  /**
   * Returns the remainder of 'this' divided by 'value': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
   * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%)...
   * unless 'floored' is true, in which case it uses the "floored" modulo, which is closer to how modulo works in number theory.
   * These two forms of modulo are the same when only positive numbers are involved, but differ in how they work with negative numbers.
   */
  static modular(value, other, floored = false) {
    return D(value).modular(other, floored);
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
   *
   * This is a multi-valued function in the complex plane, but only two branches matter for real numbers: the "principal branch" W0, and the "non-principal branch" W_-1.
   * W_0 works for any number >= -1/e, but W_-1 only works for negative numbers >= -1/e.
   * The "principal" parameter, which is true by default, decides which branch we're looking for: W_0 is used if principal is true, W_-1 is used if principal is false.
   */
  static lambertw(value, principal) {
    return D(value).lambertw(principal);
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
   * Penta-logarithm, one of pentation's inverses, tells you what height you'd have to pentate 'base' to to get 'value'.
   * 
   * Grows incredibly slowly. For bases above 2, you won't be seeing a result greater than 5 out of this function.
   * 
   * Accepts a number of iterations (default is 100), and use binary search to, after making an initial guess, hone in on the true value, assuming pentation as the ground truth.
   * 
   * Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   * 
   * For non-whole pentation heights, the linear approximation of pentation is always used, as there is no defined analytic approximation of pentation.
   */
  static penta_log(value, base = 10, linear = false) {
    return D(value).penta_log(base, 100, linear);
  }
  /**
   * Penta-root, one of pentation's inverses - what number, pentated to height 'degree', equals 'value'?
   * 
   * Only works with the linear approximation of tetration, as starting with analytic and then switching to linear would result in inconsistent behavior for super-roots.
   */
  static linear_penta_root(value, degree) {
    return D(value).linear_penta_root(degree);
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
      this.mag = Number.POSITIVE_INFINITY;
      this.layer = Number.POSITIVE_INFINITY;
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
      let negative = false;
      if (ptparts[0].startsWith("-")) {
        negative = true;
        ptparts[0] = ptparts[0].slice(1);
      }
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
        if (negative) this.sign *= -1;
        return this;
      }
    }
    ptparts = value.split("p");
    if (ptparts.length === 2) {
      base = 10;
      let negative = false;
      if (ptparts[0].startsWith("-")) {
        negative = true;
        ptparts[0] = ptparts[0].slice(1);
      }
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
        if (negative) this.sign *= -1;
        return this;
      }
    }
    ptparts = value.split("f");
    if (ptparts.length === 2) {
      base = 10;
      let negative = false;
      if (ptparts[0].startsWith("-")) {
        negative = true;
        ptparts[0] = ptparts[0].slice(1);
      }
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
        if (negative) this.sign *= -1;
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
      if (newparts[0].startsWith("-")) {
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
          if (this.layer < 0 || this.layer % 1 != 0) {
            const result = Decimal.tetrate(10, this.layer, this.mag, linearhyper4);
            this.sign = result.sign;
            this.layer = result.layer;
            this.mag = result.mag;
          }
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
    if (this.mag === Number.POSITIVE_INFINITY && this.layer === Number.POSITIVE_INFINITY && this.sign === -1) {
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
      return FC_NN(0, 0, 0);
    }
    if (this.layer === 0) {
      return FC(this.sign, 0, Math.round(this.mag));
    }
    return new Decimal(this);
  }
  /**
   * "Rounds" the Decimal it's called on to the nearest integer that's less than or equal to it.
   */
  floor() {
    if (this.mag < 0) {
      if (this.sign === -1) return FC_NN(-1, 0, 1);
      else return FC_NN(0, 0, 0);
    }
    if (this.sign === -1) return this.neg().ceil().neg();
    if (this.layer === 0) {
      return FC(this.sign, 0, Math.floor(this.mag));
    }
    return new Decimal(this);
  }
  /**
   * "Rounds" the Decimal it's called on to the nearest integer that's greater than or equal to it.
   */
  ceil() {
    if (this.mag < 0) {
      if (this.sign === 1) return FC_NN(1, 0, 1);
      else return FC_NN(0, 0, 0);
    }
    if (this.sign === -1) return this.neg().floor().neg();
    if (this.layer === 0) {
      return FC(this.sign, 0, Math.ceil(this.mag));
    }
    return new Decimal(this);
  }
  /**
   * Extracts the integer part of the Decimal and returns it. Behaves like floor on positive numbers, but behaves like ceiling on negative numbers.
   */
  trunc() {
    if (this.mag < 0) {
      return FC_NN(0, 0, 0);
    }
    if (this.layer === 0) {
      return FC(this.sign, 0, Math.trunc(this.mag));
    }
    return new Decimal(this);
  }
  /**
   * Addition: returns the sum of 'this' and 'value'.
   */
  add(value) {
    const decimal = D(value);
    if (this.eq(Decimal.dInf) && decimal.eq(Decimal.dNegInf) || this.eq(Decimal.dNegInf) && decimal.eq(Decimal.dInf)) {
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    if (!Number.isFinite(this.layer)) {
      return new Decimal(this);
    }
    if (!Number.isFinite(decimal.layer)) {
      return new Decimal(decimal);
    }
    if (this.sign === 0) {
      return new Decimal(decimal);
    }
    if (decimal.sign === 0) {
      return new Decimal(this);
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
      a = new Decimal(this);
      b = new Decimal(decimal);
    } else {
      a = new Decimal(decimal);
      b = new Decimal(this);
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
    if (this.eq(Decimal.dInf) && decimal.eq(Decimal.dNegInf) || this.eq(Decimal.dNegInf) && decimal.eq(Decimal.dInf)) {
      return FC_NN(-1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    }
    if (this.mag == Number.POSITIVE_INFINITY && decimal.eq(Decimal.dZero) || this.eq(Decimal.dZero) && this.mag == Number.POSITIVE_INFINITY) {
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    if (!Number.isFinite(this.layer)) {
      return new Decimal(this);
    }
    if (!Number.isFinite(decimal.layer)) {
      return new Decimal(decimal);
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
      a = new Decimal(this);
      b = new Decimal(decimal);
    } else {
      a = new Decimal(decimal);
      b = new Decimal(this);
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
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    } else if (this.mag === Number.POSITIVE_INFINITY) {
      return FC_NN(0, 0, 0);
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
   * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%)...
   * unless 'floored' is true, in which case it uses the "floored" modulo, which is closer to how modulo works in number theory.
   * These two forms of modulo are the same when only positive numbers are involved, but differ in how they work with negative numbers.
   */
  // Taken from OmegaNum.js, with a couple touch-ups
  mod(value, floored = false) {
    const vd = D(value);
    const decimal = vd.abs();
    if (this.eq(Decimal.dZero) || decimal.eq(Decimal.dZero)) return FC_NN(0, 0, 0);
    if (floored) {
      let absmod = this.abs().mod(decimal);
      if (this.sign == -1 != (vd.sign == -1)) absmod = vd.abs().sub(absmod);
      return absmod.mul(vd.sign);
    }
    const num_this = this.toNumber();
    const num_decimal = decimal.toNumber();
    if (isFinite(num_this) && isFinite(num_decimal) && num_this != 0 && num_decimal != 0) {
      return new Decimal(num_this % num_decimal);
    }
    if (this.sub(decimal).eq(this)) {
      return FC_NN(0, 0, 0);
    }
    if (decimal.sub(this).eq(decimal)) {
      return new Decimal(this);
    }
    if (this.sign == -1) return this.abs().mod(decimal).neg();
    return this.sub(this.div(decimal).floor().mul(decimal));
  }
  /**
   * Returns the remainder of 'this' divided by 'value': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
   * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%)...
   * unless 'floored' is true, in which case it uses the "floored" modulo, which is closer to how modulo works in number theory.
   * These two forms of modulo are the same when only positive numbers are involved, but differ in how they work with negative numbers.
   */
  modulo(value, floored = false) {
    return this.mod(value, floored);
  }
  /**
   * Returns the remainder of 'this' divided by 'value': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
   * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%)...
   * unless 'floored' is true, in which case it uses the "floored" modulo, which is closer to how modulo works in number theory.
   * These two forms of modulo are the same when only positive numbers are involved, but differ in how they work with negative numbers.
   */
  modular(value, floored = false) {
    return this.mod(value, floored);
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
    return this.lt(decimal) ? new Decimal(decimal) : new Decimal(this);
  }
  /**
   * Returns whichever of 'this' and 'value' is lower.
   */
  min(value) {
    const decimal = D(value);
    return this.gt(decimal) ? new Decimal(decimal) : new Decimal(this);
  }
  /**
   * Returns whichever of 'this' and 'value' has a larger absolute value.
   */
  maxabs(value) {
    const decimal = D(value);
    return this.cmpabs(decimal) < 0 ? new Decimal(decimal) : new Decimal(this);
  }
  /**
   * Returns whichever of 'this' and 'value' has a smaller absolute value.
   */
  minabs(value) {
    const decimal = D(value);
    return this.cmpabs(decimal) > 0 ? new Decimal(decimal) : new Decimal(this);
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
      return FC_NN(0, 0, 0);
    }
    return this.log10();
  }
  /**
   * Returns the base-10 logarithm of abs('this').
   */
  absLog10() {
    if (this.sign === 0) {
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
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
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
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
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    if (base.sign <= 0) {
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    if (base.sign === 1 && base.layer === 0 && base.mag === 1) {
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
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
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
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
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
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
    const a = new Decimal(this);
    const b = new Decimal(decimal);
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
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    return result;
  }
  /**
   * Raises 10 to the power of 'this', i.e. (10^'this'). For positive numbers above 1, this is equivalent to adding 1 to layer and normalizing.
   */
  pow10() {
    if (this.eq(Decimal.dInf)) {
      return FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    }
    if (this.eq(Decimal.dNegInf)) {
      return FC_NN(0, 0, 0);
    }
    if (!Number.isFinite(this.layer) || !Number.isFinite(this.mag)) {
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    let a = new Decimal(this);
    if (a.layer === 0) {
      const newmag = Math.pow(10, a.sign * a.mag);
      if (Number.isFinite(newmag) && Math.abs(newmag) >= 0.1) {
        return FC(1, 0, newmag);
      } else {
        if (a.sign === 0) {
          return FC_NN(1, 0, 1);
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
    return FC_NN(1, 0, 1);
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
      return FC_NN(1, 0, 1);
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
      return FC_NN(1, 0, 1);
    }
    if (this.eq(-1)) {
      return Decimal.pow(this, payload);
    }
    if (height === Number.POSITIVE_INFINITY) {
      const this_num = this.toNumber();
      if (this_num <= 1.444667861009766 && this_num >= 0.06598803584531254) {
        const negln = Decimal.ln(this).neg();
        let lower = negln.lambertw().div(negln);
        if (this_num < 1) return lower;
        let upper = negln.lambertw(false).div(negln);
        if (this_num > 1.444667861009099) {
          lower = upper = Decimal.fromNumber(Math.E);
        }
        payload = D(payload);
        if (payload.eq(upper)) return upper;
        else if (payload.lt(upper)) return lower;
        else return FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
      } else if (this_num > 1.444667861009766) {
        return FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
      } else {
        return FC_NN(Number.NaN, Number.NaN, Number.NaN);
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
    payload = new Decimal(payload);
    const oldheight = height;
    height = Math.trunc(height);
    const fracheight = oldheight - height;
    if (this.gt(Decimal.dZero) && (this.lt(1) || this.lte(1.444667861009766) && payload.lte(Decimal.ln(this).neg().lambertw(false).div(Decimal.ln(this).neg()))) && (oldheight > 1e4 || !linear)) {
      const limitheight = Math.min(1e4, height);
      if (payload.eq(Decimal.dOne)) payload = this.pow(fracheight);
      else if (this.lt(1)) payload = payload.pow(1 - fracheight).mul(this.pow(payload).pow(fracheight));
      else payload = payload.layeradd(fracheight, this);
      for (let i = 0; i < limitheight; ++i) {
        const old_payload = payload;
        payload = this.pow(payload);
        if (old_payload.eq(payload)) {
          return payload;
        }
      }
      if (oldheight > 1e4 && Math.ceil(oldheight) % 2 == 1) {
        return this.pow(payload);
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
        } else if (this.lt(1)) {
          payload = payload.pow(1 - fracheight).mul(this.pow(payload).pow(fracheight));
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
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    if (base.eq(Decimal.dOne)) {
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    if (base.lt(Decimal.dOne)) {
      if (this.eq(Decimal.dOne)) {
        return FC_NN(0, 0, 0);
      }
      if (this.eq(Decimal.dZero)) {
        return FC_NN(-1, 0, 1);
      }
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    if (this.mag < 0 || this.eq(Decimal.dZero)) {
      return FC_NN(-1, 0, 1);
    }
    if (base.lt(1.444667861009766)) {
      const negln = Decimal.ln(base).neg();
      const infTower = negln.lambertw().div(negln);
      if (this.eq(infTower)) return FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
      if (this.gt(infTower)) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
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
    const baseD = D(base);
    if (baseD.gt(1) && baseD.lte(1.444667861009766)) {
      const excessSlog = Decimal.excess_slog(this, base, linear);
      const slogthis2 = excessSlog[0].toNumber();
      const range = excessSlog[1];
      const slogdest2 = slogthis2 + diff;
      const negln = Decimal.ln(base).neg();
      const lower = negln.lambertw().div(negln);
      const upper = negln.lambertw(false).div(negln);
      let slogzero = Decimal.dOne;
      if (range == 1) slogzero = lower.mul(upper).sqrt();
      else if (range == 2) slogzero = upper.mul(2);
      const slogone = baseD.pow(slogzero);
      const wholeheight = Math.floor(slogdest2);
      const fracheight = slogdest2 - wholeheight;
      const towertop = slogzero.pow(1 - fracheight).mul(slogone.pow(fracheight));
      return Decimal.tetrate(baseD, wholeheight, towertop, linear);
    }
    const slogthis = this.slog(base, 100, linear).toNumber();
    const slogdest = slogthis + diff;
    if (slogdest >= 0) {
      return Decimal.tetrate(base, slogdest, Decimal.dOne, linear);
    } else if (!Number.isFinite(slogdest)) {
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    } else if (slogdest >= -1) {
      return Decimal.log(Decimal.tetrate(base, slogdest + 1, Decimal.dOne, linear), base);
    } else {
      return Decimal.log(Decimal.log(Decimal.tetrate(base, slogdest + 2, Decimal.dOne, linear), base), base);
    }
  }
  // Apparently having something be private but not static breaks everything
  /**
   * A strange version of slog for bases between 1 and e^1/e which can handle values above base^^Infinity.
   * Returns a pair of a Decimal and a number, with the number always being 0, 1, or 2. The number indicates what range we're in:
   * 0 means we're below the lower solution of b^x = x, and so the normal slog is used.
   * 1 means we're between the two solutions of b^x = x, with the geometric mean of the two solutions arbitrarily chosen to be the value with a slog of 0.
   * 2 means we're above the upper solution of b^x = x, with (upper solution * 2) arbitrarily chosen to be the value with a slog of 0.
   *
   * The values returned by this function don't really have much mathematical meaning, but the difference between two values does.
   * Therefore, this function is kept private, but it's used for layeradd on these small bases.
   */
  static excess_slog(value, base, linear = false) {
    value = D(value);
    base = D(base);
    const baseD = base;
    base = base.toNumber();
    if (base == 1 || base <= 0) return [FC_NN(Number.NaN, Number.NaN, Number.NaN), 0];
    if (base > 1.444667861009766) return [value.slog(base, 100, linear), 0];
    const negln = Decimal.ln(base).neg();
    let lower = negln.lambertw().div(negln);
    let upper = Decimal.dInf;
    if (base > 1) upper = negln.lambertw(false).div(negln);
    if (base > 1.444667861009099) {
      lower = upper = Decimal.fromNumber(Math.E);
    }
    if (value.lt(lower)) return [value.slog(base, 100, linear), 0];
    if (value.eq(lower)) return [FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY), 0];
    if (value.eq(upper)) return [FC_NN(1, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY), 2];
    if (value.gt(upper)) {
      const slogzero = upper.mul(2);
      const slogone = baseD.pow(slogzero);
      let estimate = 0;
      if (value.gte(slogzero) && value.lt(slogone)) estimate = 0;
      else if (value.gte(slogone)) {
        let payload = slogone;
        estimate = 1;
        while (payload.lt(value)) {
          payload = baseD.pow(payload);
          estimate = estimate + 1;
          if (payload.layer > 3) {
            const layersleft = Math.floor(value.layer - payload.layer + 1);
            payload = baseD.iteratedexp(layersleft, payload, linear);
            estimate = estimate + layersleft;
          }
        }
        if (payload.gt(value)) {
          payload = payload.log(base);
          estimate = estimate - 1;
        }
      } else if (value.lt(slogzero)) {
        let payload = slogzero;
        estimate = 0;
        while (payload.gt(value)) {
          payload = payload.log(base);
          estimate = estimate - 1;
        }
      }
      let fracheight = 0;
      let tested = 0;
      let step_size = 0.5;
      let towertop = slogzero;
      let guess = Decimal.dZero;
      while (step_size > 1e-16) {
        tested = fracheight + step_size;
        towertop = slogzero.pow(1 - tested).mul(slogone.pow(tested));
        guess = Decimal.iteratedexp(base, estimate, towertop);
        if (guess.eq(value)) return [new Decimal(estimate + tested), 2];
        else if (guess.lt(value)) fracheight += step_size;
        step_size /= 2;
      }
      if (guess.neq_tolerance(value, 1e-7)) return [FC_NN(Number.NaN, Number.NaN, Number.NaN), 0];
      return [new Decimal(estimate + fracheight), 2];
    }
    if (value.lt(upper) && value.gt(lower)) {
      const slogzero = lower.mul(upper).sqrt();
      const slogone = baseD.pow(slogzero);
      let estimate = 0;
      if (value.lte(slogzero) && value.gt(slogone)) estimate = 0;
      else if (value.lte(slogone)) {
        let payload = slogone;
        estimate = 1;
        while (payload.gt(value)) {
          payload = baseD.pow(payload);
          estimate = estimate + 1;
        }
        if (payload.lt(value)) {
          payload = payload.log(base);
          estimate = estimate - 1;
        }
      } else if (value.gt(slogzero)) {
        let payload = slogzero;
        estimate = 0;
        while (payload.lt(value)) {
          payload = payload.log(base);
          estimate = estimate - 1;
        }
      }
      let fracheight = 0;
      let tested = 0;
      let step_size = 0.5;
      let towertop = slogzero;
      let guess = Decimal.dZero;
      while (step_size > 1e-16) {
        tested = fracheight + step_size;
        towertop = slogzero.pow(1 - tested).mul(slogone.pow(tested));
        guess = Decimal.iteratedexp(base, estimate, towertop);
        if (guess.eq(value)) return [new Decimal(estimate + tested), 1];
        else if (guess.gt(value)) fracheight += step_size;
        step_size /= 2;
      }
      if (guess.neq_tolerance(value, 1e-7)) return [FC_NN(Number.NaN, Number.NaN, Number.NaN), 0];
      return [new Decimal(estimate + fracheight), 1];
    }
    throw new Error("Unhandled behavior in excess_slog");
  }
  /**
   * The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
   * https://en.wikipedia.org/wiki/Lambert_W_function
   *
   * This is a multi-valued function in the complex plane, but only two branches matter for real numbers: the "principal branch" W0, and the "non-principal branch" W_-1.
   * W_0 works for any number >= -1/e, but W_-1 only works for nonpositive numbers >= -1/e.
   * The "principal" parameter, which is true by default, decides which branch we're looking for: W_0 is used if principal is true, W_-1 is used if principal is false.
   */
  // Some special values, for testing: https://en.wikipedia.org/wiki/Lambert_W_function#Special_values
  lambertw(principal = true) {
    if (this.lt(-0.3678794411710499)) {
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    } else if (principal) {
      if (this.abs().lt("1e-300")) return new Decimal(this);
      else if (this.mag < 0) {
        return Decimal.fromNumber(f_lambertw(this.toNumber()));
      } else if (this.layer === 0) {
        return Decimal.fromNumber(f_lambertw(this.sign * this.mag));
      } else if (this.lt("eee15")) {
        return d_lambertw(this);
      } else {
        return this.ln();
      }
    } else {
      if (this.sign === 1) {
        return FC_NN(Number.NaN, Number.NaN, Number.NaN);
      }
      if (this.layer === 0) {
        return Decimal.fromNumber(f_lambertw(this.sign * this.mag, 1e-10, false));
      } else if (this.layer == 1) {
        return d_lambertw(this, 1e-10, false);
      } else {
        return this.neg().recip().lambertw().neg();
      }
    }
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
      return FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    }
    if (!this.isFinite()) {
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    if (degree > 0 && degree < 1) {
      return this.root(degree);
    }
    if (degree > -2 && degree < -1) {
      return Decimal.fromNumber(degree).add(2).pow(this.recip());
    }
    if (degree <= 0) {
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    if (degree == Number.POSITIVE_INFINITY) {
      const this_num = this.toNumber();
      if (this_num < Math.E && this_num > _EXPN1) {
        return this.pow(this.recip());
      } else {
        return FC_NN(Number.NaN, Number.NaN, Number.NaN);
      }
    }
    if (this.eq(1)) {
      return FC_NN(1, 0, 1);
    }
    if (this.lt(0)) {
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    if (this.lte("1ee-16")) {
      if (degree % 2 == 1) return new Decimal(this);
      else return FC_NN(Number.NaN, Number.NaN, Number.NaN);
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
        if (Decimal.iteratedexp(10, layer, guess, true).tetrate(degree, 1, true).gt(this)) upper = guess;
        else lower = guess;
        if (guess.eq(previous)) loopGoing = false;
        else previous = guess;
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
          if (evenDegree) break;
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
            if (stage == 3) lastValid = upper;
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
            if (evenDegree) range = -1;
            else range = 0;
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
          if (range == -1) decreasingFound = true;
          if (stage == 1 && range == 1 || stage == 3 && range != 0) {
            if (lower.eq(FC(1, 10, 1))) {
              upper = upper.mul(2);
            } else {
              let cutOff = false;
              if (infLoopDetector && (range == 1 && stage == 1 || range == -1 && stage == 3)) cutOff = true;
              upper = upper.add(lower).div(2);
              if (cutOff) break;
            }
          } else {
            if (lower.eq(FC(1, 10, 1))) {
              lower = upper;
              upper = upper.div(2);
            } else {
              let cutOff = false;
              if (infLoopDetector && (range == 1 && stage == 1 || range == -1 && stage == 3)) cutOff = true;
              lower = lower.sub(difference);
              upper = upper.sub(difference);
              if (cutOff) break;
            }
          }
          if (lower.sub(upper).div(2).abs().gt(difference.mul(1.5))) infLoopDetector = true;
          difference = lower.sub(upper).div(2).abs();
          if (upper.gt("1e18")) break;
          if (upper.eq(previousUpper)) break;
        }
        if (upper.gt("1e18")) break;
        if (!decreasingFound) break;
        if (lastValid == FC(1, 10, 1)) {
          break;
        }
        if (stage == 1) minimum = lastValid;
        else if (stage == 3) maximum = lastValid;
        stage++;
      }
      lower = minimum;
      upper = FC(1, 1, -18);
      let previous = upper;
      let guess = Decimal.dZero;
      let loopGoing = true;
      while (loopGoing) {
        if (lower.eq(FC(1, 10, 1))) guess = upper.mul(2);
        else guess = lower.add(upper).div(2);
        if (Decimal.pow(10, guess).recip().tetrate(degree, 1, true).gt(this)) upper = guess;
        else lower = guess;
        if (guess.eq(previous)) loopGoing = false;
        else previous = guess;
        if (upper.gt("1e18")) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
      }
      if (!guess.eq_tolerance(minimum, 1e-15)) {
        return guess.pow10().recip();
      } else {
        if (maximum.eq(FC(1, 10, 1))) {
          return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        }
        lower = FC(1, 10, 1);
        upper = maximum;
        previous = upper;
        guess = Decimal.dZero;
        loopGoing = true;
        while (loopGoing) {
          if (lower.eq(FC(1, 10, 1))) guess = upper.mul(2);
          else guess = lower.add(upper).div(2);
          if (Decimal.pow(10, guess).recip().tetrate(degree, 1, true).gt(this)) upper = guess;
          else lower = guess;
          if (guess.eq(previous)) loopGoing = false;
          else previous = guess;
          if (upper.gt("1e18")) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        }
        return guess.pow10().recip();
      }
    }
  }
  /**
   * This function takes a Decimal => Decimal function as its argument (or DecimalSource => Decimal, that's fine too),
   * and it returns a DecimalSource => Decimal function that's an inverse of the first one, which uses binary search to find its target.
   * The resulting function will call the original many times, so it may be noticably slower than the original.
   * 
   * This function is only intended to be used on continuous, strictly increasing (or, using the decreasing parameter, strictly decreasing) functions.
   * Its resulting function may output erroneous results if the original function was not strictly increasing.
   * If the function is increasing but not strictly increasing, the inverse will, in ranges where the original function is constant, try to return the value closest to 0 out of the multiple correct values.
   * If the function is not continuous, the inverse should return the correct answer in cases where the given value is returned by some input to the original function, but it will return an erroneous result otherwise (the correct result would be to return NaN, but checking to ensure continuity is not implemented)
   * 
   * @param func The Decimal => Decimal function to create an inverse function of.
   * @param decreasing This parameter is false by default. If this parameter is true, the original function should be strictly decreasing instead of strictly increasing.
   * @param iterations The amount of iterations that the inverse function runs before it gives up and returns whatever value it's found thus far. Default is 120, which should be enough to always be as precise as floating point allows.
   * @param minX The original function is assumed to have this value as the lowest value in its domain. Is Decimal.dLayerMax.neg() by default, which means all negative finite values are allowed but infinity is not.
   * @param maxX The original function is assumed to have this value as the highest value in its domain. Is Decimal.dLayerMax by default, which means all positive finite values are allowed but infinity is not.
   * @param minY If the input to the inverse function is below this value, the inverse function assumes the input is not in the range and returns NaN. Is Decimal.dLayerMax.neg() by default, which means all negative finite values are allowed but infinity is not.
   * @param maxY If the input to the inverse function is above this value, the inverse function assumes the input is not in the range and returns NaN. Is Decimal.dLayerMax by default, which means all positive finite values are allowed but infinity is not.
   */
  static increasingInverse(func, decreasing = false, iterations = 120, minX = Decimal.dLayerMax.neg(), maxX = Decimal.dLayerMax, minY = Decimal.dLayerMax.neg(), maxY = Decimal.dLayerMax) {
    return function(value) {
      value = new Decimal(value);
      minX = new Decimal(minX);
      maxX = new Decimal(maxX);
      minY = new Decimal(minY);
      maxY = new Decimal(maxY);
      if (value.isNan() || maxX.lt(minX) || value.lt(minY) || value.gt(maxY)) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
      let rangeApply = function(value2) {
        return new Decimal(value2);
      };
      let currentCheck = true;
      if (maxX.lt(0)) currentCheck = false;
      else if (minX.gt(0)) currentCheck = true;
      else {
        let valCheck = func(Decimal.dZero);
        if (valCheck.eq(value)) return FC_NN(0, 0, 0);
        currentCheck = value.gt(valCheck);
        if (decreasing) currentCheck = !currentCheck;
      }
      let positive = currentCheck;
      let reciprocal;
      if (currentCheck) {
        if (maxX.lt(FIRST_NEG_LAYER)) currentCheck = true;
        else if (minX.gt(FIRST_NEG_LAYER)) currentCheck = false;
        else {
          let valCheck = func(new Decimal(FIRST_NEG_LAYER));
          currentCheck = value.lt(valCheck);
          if (decreasing) currentCheck = !currentCheck;
        }
        if (currentCheck) {
          reciprocal = true;
          let limit = Decimal.pow(10, EXP_LIMIT).recip();
          if (maxX.lt(limit)) currentCheck = false;
          else if (minX.gt(limit)) currentCheck = true;
          else {
            let valCheck = func(new Decimal(limit));
            currentCheck = value.gt(valCheck);
            if (decreasing) currentCheck = !currentCheck;
          }
          if (currentCheck) rangeApply = function(value2) {
            return Decimal.pow(10, value2).recip();
          };
          else {
            let limit2 = Decimal.tetrate(10, EXP_LIMIT);
            if (maxX.lt(limit2)) currentCheck = false;
            else if (minX.gt(limit2)) currentCheck = true;
            else {
              let valCheck = func(new Decimal(limit2));
              currentCheck = value.gt(valCheck);
              if (decreasing) currentCheck = !currentCheck;
            }
            if (currentCheck) rangeApply = function(value2) {
              return Decimal.tetrate(10, new Decimal(value2).toNumber()).recip();
            };
            else rangeApply = function(value2) {
              return new Decimal(value2).gt(Math.log10(Number.MAX_VALUE)) ? Decimal.dZero : Decimal.tetrate(10, Decimal.pow(10, value2).toNumber()).recip();
            };
          }
        } else {
          reciprocal = false;
          if (maxX.lt(EXP_LIMIT)) currentCheck = true;
          else if (minX.gt(EXP_LIMIT)) currentCheck = false;
          else {
            let valCheck = func(new Decimal(EXP_LIMIT));
            currentCheck = value.lt(valCheck);
            if (decreasing) currentCheck = !currentCheck;
          }
          if (currentCheck) rangeApply = function(value2) {
            return new Decimal(value2);
          };
          else {
            let limit = Decimal.pow(10, EXP_LIMIT);
            if (maxX.lt(limit)) currentCheck = true;
            else if (minX.gt(limit)) currentCheck = false;
            else {
              let valCheck = func(new Decimal(limit));
              currentCheck = value.lt(valCheck);
              if (decreasing) currentCheck = !currentCheck;
            }
            if (currentCheck) rangeApply = function(value2) {
              return Decimal.pow(10, value2);
            };
            else {
              let limit2 = Decimal.tetrate(10, EXP_LIMIT);
              if (maxX.lt(limit2)) currentCheck = true;
              else if (minX.gt(limit2)) currentCheck = false;
              else {
                let valCheck = func(new Decimal(limit2));
                currentCheck = value.lt(valCheck);
                if (decreasing) currentCheck = !currentCheck;
              }
              if (currentCheck) rangeApply = function(value2) {
                return Decimal.tetrate(10, new Decimal(value2).toNumber());
              };
              else rangeApply = function(value2) {
                return new Decimal(value2).gt(Math.log10(Number.MAX_VALUE)) ? Decimal.dInf : Decimal.tetrate(10, Decimal.pow(10, value2).toNumber());
              };
            }
          }
        }
      } else {
        reciprocal = true;
        if (maxX.lt(-FIRST_NEG_LAYER)) currentCheck = false;
        else if (minX.gt(-FIRST_NEG_LAYER)) currentCheck = true;
        else {
          let valCheck = func(new Decimal(-FIRST_NEG_LAYER));
          currentCheck = value.gt(valCheck);
          if (decreasing) currentCheck = !currentCheck;
        }
        if (currentCheck) {
          let limit = Decimal.pow(10, EXP_LIMIT).recip().neg();
          if (maxX.lt(limit)) currentCheck = true;
          else if (minX.gt(limit)) currentCheck = false;
          else {
            let valCheck = func(new Decimal(limit));
            currentCheck = value.lt(valCheck);
            if (decreasing) currentCheck = !currentCheck;
          }
          if (currentCheck) rangeApply = function(value2) {
            return Decimal.pow(10, value2).recip().neg();
          };
          else {
            let limit2 = Decimal.tetrate(10, EXP_LIMIT).neg();
            if (maxX.lt(limit2)) currentCheck = true;
            else if (minX.gt(limit2)) currentCheck = false;
            else {
              let valCheck = func(new Decimal(limit2));
              currentCheck = value.lt(valCheck);
              if (decreasing) currentCheck = !currentCheck;
            }
            if (currentCheck) rangeApply = function(value2) {
              return Decimal.tetrate(10, new Decimal(value2).toNumber()).recip().neg();
            };
            else rangeApply = function(value2) {
              return new Decimal(value2).gt(Math.log10(Number.MAX_VALUE)) ? Decimal.dZero : Decimal.tetrate(10, Decimal.pow(10, value2).toNumber()).recip().neg();
            };
          }
        } else {
          reciprocal = false;
          if (maxX.lt(-EXP_LIMIT)) currentCheck = false;
          else if (minX.gt(-EXP_LIMIT)) currentCheck = true;
          else {
            let valCheck = func(new Decimal(-EXP_LIMIT));
            currentCheck = value.gt(valCheck);
            if (decreasing) currentCheck = !currentCheck;
          }
          if (currentCheck) rangeApply = function(value2) {
            return Decimal.neg(value2);
          };
          else {
            let limit = Decimal.pow(10, EXP_LIMIT).neg();
            if (maxX.lt(limit)) currentCheck = false;
            else if (minX.gt(limit)) currentCheck = true;
            else {
              let valCheck = func(new Decimal(limit));
              currentCheck = value.gt(valCheck);
              if (decreasing) currentCheck = !currentCheck;
            }
            if (currentCheck) rangeApply = function(value2) {
              return Decimal.pow(10, value2).neg();
            };
            else {
              let limit2 = Decimal.tetrate(10, EXP_LIMIT).neg();
              if (maxX.lt(limit2)) currentCheck = false;
              else if (minX.gt(limit2)) currentCheck = true;
              else {
                let valCheck = func(new Decimal(limit2));
                currentCheck = value.gt(valCheck);
                if (decreasing) currentCheck = !currentCheck;
              }
              if (currentCheck) rangeApply = function(value2) {
                return Decimal.tetrate(10, new Decimal(value2).toNumber()).neg();
              };
              else rangeApply = function(value2) {
                return new Decimal(value2).gt(Math.log10(Number.MAX_VALUE)) ? Decimal.dNegInf : Decimal.tetrate(10, Decimal.pow(10, value2).toNumber()).neg();
              };
            }
          }
        }
      }
      let searchIncreasing = positive != reciprocal != decreasing;
      let comparative = searchIncreasing ? function(a, b) {
        return Decimal.gt(a, b);
      } : function(a, b) {
        return Decimal.lt(a, b);
      };
      let step_size = 1e-3;
      let has_changed_directions_once = false;
      let previously_rose = false;
      let result = 1;
      let appliedResult = Decimal.dOne;
      let oldresult = 0;
      let critical = false;
      for (var i = 1; i < iterations; ++i) {
        critical = false;
        oldresult = result;
        appliedResult = rangeApply(result);
        if (appliedResult.gt(maxX)) {
          appliedResult = maxX;
          critical = true;
        }
        if (appliedResult.lt(minX)) {
          appliedResult = minX;
          critical = true;
        }
        let new_decimal = func(appliedResult);
        if (new_decimal.eq(value) && !critical) {
          break;
        }
        let currently_rose = comparative(new_decimal, value);
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
        if (currently_rose != searchIncreasing && appliedResult.eq(maxX) || currently_rose == searchIncreasing && appliedResult.eq(minX)) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        step_size = Math.abs(step_size) * (currently_rose ? -1 : 1);
        result += step_size;
        if (step_size === 0 || oldresult == result) {
          break;
        }
      }
      return rangeApply(result);
    };
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
    payload = new Decimal(payload);
    const oldheight = height;
    height = Math.floor(height);
    const fracheight = oldheight - height;
    let prevpayload = Decimal.dZero;
    let prevtwopayload = Decimal.dZero;
    if (fracheight !== 0) {
      if (payload.eq(Decimal.dOne)) {
        ++height;
        payload = Decimal.fromNumber(fracheight);
      } else {
        return this.pentate(payload.penta_log(this, void 0, linear).plus(oldheight).toNumber(), 1, linear);
      }
    }
    if (height > 0) {
      for (let i = 0; i < height; ) {
        prevtwopayload = prevpayload;
        prevpayload = payload;
        payload = this.tetrate(payload.toNumber(), Decimal.dOne, linear);
        ++i;
        if (this.gt(0) && this.lte(1) && payload.gt(0) && payload.lte(1)) return this.tetrate(height - i, payload, linear);
        if (payload.eq(prevpayload) || payload.eq(prevtwopayload) && i % 2 == height % 2) return payload.normalize();
        if (!isFinite(payload.layer) || !isFinite(payload.mag)) {
          return payload.normalize();
        }
        if (i > 1e4) {
          return payload;
        }
      }
    } else {
      for (let i = 0; i < -height; ++i) {
        prevpayload = payload;
        payload = payload.slog(this, void 0, linear);
        if (payload.eq(prevpayload)) return payload.normalize();
        if (!isFinite(payload.layer) || !isFinite(payload.mag)) {
          return payload.normalize();
        }
        if (i > 100) {
          return payload;
        }
      }
    }
    return payload;
  }
  /**
   * Penta-logarithm, one of pentation's inverses, tells you what height you'd have to pentate 'base' to to get 'this'.
   * 
   * Grows incredibly slowly. For bases above 2, you won't be seeing a result greater than 5 out of this function.
   * 
   * Accepts a number of iterations (default is 100), and use binary search to, after making an initial guess, hone in on the true value, assuming pentation as the ground truth.
   * 
   * Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   * 
   * For non-whole pentation heights, the linear approximation of pentation is always used, as there is no defined analytic approximation of pentation.
   */
  // INCREDIBLY slow on numbers <= -1. Probably don't call it on those.
  // If you're here looking to port penta_log to OmegaNum, ExpantaNum, or something similar, then know that this implementation isn't sufficient for that purpose. The pentation functions here run loops without shortcuts, because in break_eternity the numbers don't get large enough to need those shortcuts.
  penta_log(base = 10, iterations = 100, linear = false) {
    base = new Decimal(base);
    if (base.lte(1)) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    if (this.eq(1)) return FC_NN(0, 0, 0);
    if (this.eq(Decimal.dInf)) return FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    let value = new Decimal(1);
    let result = 0;
    let step_size = 1;
    if (this.lt(-1)) {
      if (this.lte(-2)) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
      let limitcheck = base.tetrate(this.toNumber(), 1, linear);
      if (this.eq(limitcheck)) return FC_NN(-1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
      if (this.gt(limitcheck)) return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    if (this.gt(1)) {
      while (value.lt(this)) {
        result++;
        value = Decimal.tetrate(base, value.toNumber(), 1, linear);
        if (result > 1e3) {
          return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        }
      }
    } else {
      while (value.gt(this)) {
        result--;
        value = Decimal.slog(value, base, linear);
        if (result > 100) {
          return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        }
      }
    }
    for (var i = 1; i < iterations; ++i) {
      let new_decimal = base.pentate(result, Decimal.dOne, linear);
      if (new_decimal.eq(this)) break;
      let currently_rose = new_decimal.gt(this);
      step_size = Math.abs(step_size) * (currently_rose ? -1 : 1);
      result += step_size;
      step_size /= 2;
      if (step_size === 0) {
        break;
      }
    }
    return Decimal.fromNumber(result);
  }
  /**
   * Penta-root, one of pentation's inverses - what number, pentated to height 'degree', equals 'this'?
   * 
   * Only works with the linear approximation of tetration, as starting with analytic and then switching to linear would result in inconsistent behavior for super-roots.
   */
  linear_penta_root(degree) {
    if (degree == 1) {
      return this;
    }
    if (degree < 0) {
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    if (this.eq(Decimal.dInf)) {
      return FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    }
    if (!this.isFinite()) {
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    if (degree > 0 && degree < 1) {
      return this.root(degree);
    }
    if (this.eq(1)) {
      return FC_NN(1, 0, 1);
    }
    if (this.lt(0)) {
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    if (this.lt(1)) {
      return this.linear_sroot(degree);
    }
    return Decimal.increasingInverse(function(value) {
      return Decimal.pentate(value, degree, 1, true);
    })(this);
  }
  // trig functions!
  /**
   * The sine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
   */
  sin() {
    if (this.mag < 0) {
      return new Decimal(this);
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
      return FC_NN(1, 0, 1);
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
      return new Decimal(this);
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
      return new Decimal(this);
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
      return new Decimal(this);
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
      return new Decimal(this);
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
   * Creates a clone of the Decimal instance.
   * @deprecated
   * @returns A EClone instance that is a clone of the original.
   */
  clone() {
    return this;
  }
  /**
   * Creates a clone of the Decimal instance. Helps with a webpack(?) bug
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
      if ([0, "pow"].includes(mode)) x = x.div(start).pow(power).mul(start);
      if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start);
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
   * Formats the Decimal instance with a specified accuracy and maximum decimal places.
   * @param [acc] - The desired accuracy (number of significant figures), defaults to `2`.
   * @param [max] - The maximum number of decimal places to display, defaults to `9`.
   * @param [type] - The type of format, defaults to `"mixed_sc"`.
   * @returns A string representing the formatted Decimal value.
   */
  format(acc = 2, max = 9, type = "mixed_sc") {
    return formats.format(this.clone(), acc, max, type);
  }
  /**
   * Formats the Decimal instance with a specified accuracy and maximum decimal places.
   * @param e - The Decimal instance to format.
   * @param [acc] - The desired accuracy (number of significant figures), defaults to `2`.
   * @param [max] - The maximum number of decimal places to display, defaults to `9`.
   * @param [type] - The type of format, defaults to `"mixed_sc"`.
   * @returns A string representing the formatted Decimal value.
   */
  static format(e, acc = 2, max = 9, type = "mixed_sc") {
    return formats.format(new Decimal(e), acc, max, type);
  }
  /**
   * Formats the Decimal instance in standard leter notation with a specified accuracy and maximum decimal places.
   * @param [acc] - The desired accuracy (number of significant figures).
   * @param [max] - The maximum number of decimal places to display.
   * @param [type] - The type of format (default standard)
   * @returns A string representing the formatted Decimal value.
   */
  formatST(acc = 2, max = 9, type = "st") {
    return formats.format(this.clone(), acc, max, type);
  }
  static formatST(value, acc = 2, max = 9, type = "st") {
    return formats.format(new Decimal(value), acc, max, type);
  }
  /**
   * Formats the gain rate using the Decimal instance.
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
   * Formats a number as a string, truncating it if it's an integer and less than or equal to `max`.
   * If the number is not an integer, it is formatted as normal.
   * @param max - Above this value, the value is formatted as normal using {@link format}. Defaults to `100`.
   * @param formatAcc - See the parameter in {@link format}.
   * @param formatMax - See the parameter in {@link format}.
   * @param formatType - See the parameter in {@link format}.
   * @returns The formatted number as a string.
   */
  formatInteger(max = 100, formatAcc, formatMax, formatType) {
    const value = this.clone();
    return value.trunc().eq(value) && value.abs().lte(max) ? value.toFixed(0) : value.format(formatAcc, formatMax, formatType);
  }
  static formatInteger(value, max, formatAcc, formatMax, formatType) {
    return new Decimal(value).formatInteger(max, formatAcc, formatMax, formatType);
  }
  /**
   * Converts the Decimal instance to a Roman numeral representation.
   * @param [max] - Max before it returns the original
   * @returns A string representing the Roman numeral equivalent of the Decimal value,
   * or the original Decimal instance if it is greater than or equal to 5000 or less than 1.
   */
  toRoman(max = 5e3) {
    max = new Decimal(max);
    const num = this.clone();
    if (num.gte(max) || num.lt(1)) return num;
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
  /**
   * Returns a random Decimal value between the specified minimum and maximum values.
   * This suffers from floating point errors if you want to generate a random number close to either the minimum or the maximum.
   * @param [min] - The minimum value, defaults to `0`.
   * @param [max] - The maximum value, defaults to `1`.
   * @returns A random Decimal value between the minimum and maximum values.
   */
  static random(min = 0, max = 1) {
    min = new Decimal(min);
    max = new Decimal(max);
    min = min.lt(max) ? min : max;
    max = max.gt(min) ? max : min;
    return new Decimal(Math.random()).mul(max.sub(min)).add(min);
  }
  /**
   * Returns a random boolean value based on the specified probability.
   * @param rng - The probability of returning `true`. Must be between `0` and `1`.
   * @returns A boolean value based on the probability.
   * @example
   * randomProb(0.5); // 50% chance of returning true
   * randomProb(0.25); // 25% chance of returning true
   * randomProb(Decimal.dOne.div(1000)); // 1 in 1000 chance of returning true
   * // Anything less than ~1e-16 will always return false due to floating point errors
   */
  static randomProb(rng) {
    return new Decimal(Math.random()).lt(rng);
  }
};
/**
 * Represents the number 0.
 */
Decimal.dZero = FC_NN(0, 0, 0);
/**
 * Represents the number 1.
 */
Decimal.dOne = FC_NN(1, 0, 1);
/**
 * Represents the number -1.
 */
Decimal.dNegOne = FC_NN(-1, 0, 1);
/**
 * Represents the number 2.
 */
Decimal.dTwo = FC_NN(1, 0, 2);
/**
 * Represents the number 10.
 */
Decimal.dTen = FC_NN(1, 0, 10);
/**
 * Represents a NaN (Not A Number) value.
 */
Decimal.dNaN = FC_NN(Number.NaN, Number.NaN, Number.NaN);
/**
 * Represents positive infinity.
 */
Decimal.dInf = FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
/**
 * Represents negative infinity.
 */
Decimal.dNegInf = FC_NN(-1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
/**
 * Represents the largest value a JavaScript number can have, which is approximately 1.79 * 10^308.
 */
Decimal.dNumberMax = FC(1, 0, Number.MAX_VALUE);
/**
 * Represents the smallest value a JavaScript number can have, which is approximately 5 * 10^-324.
 */
Decimal.dNumberMin = FC(1, 0, Number.MIN_VALUE);
/**
 * Represents the largest Decimal where adding 1 to the layer is a safe operation
 * (Decimals larger than this are too big for pow/exp/log to affect, but tetrate/iteratedlog/slog can still affect them).
 * Approximately 10^^(9.007 * 10^15).
 */
Decimal.dLayerSafeMax = FC(1, Number.MAX_SAFE_INTEGER, EXP_LIMIT - 1);
/**
 * Represents the smallest Decimal where adding 1 to the layer is a safe operation. Approximately 1 / (10^^(9.007 * 10^15)).
 */
Decimal.dLayerSafeMin = FC(1, Number.MAX_SAFE_INTEGER, -(EXP_LIMIT - 1));
/**
 * Represents the largest finite value a Decimal can represent. Approximately 10^^(1.79 * 10^308).
 */
Decimal.dLayerMax = FC(1, Number.MAX_VALUE, EXP_LIMIT - 1);
/**
 * Represents the smallest non-zero value a Decimal can represent. Approximately 1 / (10^^(1.79 * 10^308)).
 */
Decimal.dLayerMin = FC(1, Number.MAX_VALUE, -(EXP_LIMIT - 1));
Decimal.fromStringCache = new LRUCache(DEFAULT_FROM_STRING_CACHE_SIZE);
__decorateClass([
  (0, import_class_transformer.Expose)()
], Decimal.prototype, "sign", 2);
__decorateClass([
  (0, import_class_transformer.Expose)()
], Decimal.prototype, "mag", 2);
__decorateClass([
  (0, import_class_transformer.Expose)()
], Decimal.prototype, "layer", 2);
Decimal = __decorateClass([
  (0, import_class_transformer.Exclude)()
], Decimal);
var { formats, FORMATS } = decimalFormatGenerator(Decimal);
Decimal.formats = formats;

// src/classes/Boost.ts
var OperationBoostOrder = /* @__PURE__ */ ((OperationBoostOrder2) => {
  OperationBoostOrder2[OperationBoostOrder2["set"] = 0] = "set";
  OperationBoostOrder2[OperationBoostOrder2["add"] = 1] = "add";
  OperationBoostOrder2[OperationBoostOrder2["multiply"] = 2] = "multiply";
  OperationBoostOrder2[OperationBoostOrder2["polynomial"] = 2.9] = "polynomial";
  OperationBoostOrder2[OperationBoostOrder2["exponential"] = 3] = "exponential";
  OperationBoostOrder2[OperationBoostOrder2["tetrate"] = 4] = "tetrate";
  OperationBoostOrder2[OperationBoostOrder2["pentate"] = 5] = "pentate";
  OperationBoostOrder2[OperationBoostOrder2["unset"] = 99] = "unset";
  return OperationBoostOrder2;
})(OperationBoostOrder || {});
var BoostObject = class {
  /**
   * Constructs a new boost object with the given id.
   * @param id - The {@link id} to use.
   */
  constructor(id) {
    /**
     * The name of the boost.
     */
    this.name = "";
    /**
     * The function that calculates the value of the boost.
     * @param input - The input value.
     * @returns The calculated value.
     * @example
     * // A boost that adds 10 to the input value.
     * (input) => input.add(10)
     *
     * // A boost that multiplies the input value by 2.
     * (input) => input.mul(2)
     */
    this.value = (input) => input;
    /**
     * The order at which the boost is applied.
     * Lower orders are applied first.
     */
    this.order = 99 /* unset */;
    /**
     * @returns The description of the boost based on this boost object.
     * @param boostContext - The boost object that this description is based on.
     * @example (boostContext) => `Increases health by x${boostContext.value(new Decimal(0)).format()}`
     */
    this.descriptionSupplier = () => "";
    this.id = id;
  }
  /**
   * @returns The description of the boost.
   */
  get description() {
    return this.descriptionSupplier(this);
  }
  // Setters
  /* eslint-disable jsdoc/require-param, jsdoc/require-returns */
  /** @see {@link BoostObject.prototype.name} */
  withName(name) {
    this.name = name;
    return this;
  }
  /** @see {@link BoostObject.value} */
  withValue(value) {
    this.value = value;
    return this;
  }
  /** @see {@link BoostObject.order} */
  withOrder(order) {
    this.order = order;
    return this;
  }
  /** @see {@link BoostObject.descriptionSupplier} */
  withDescriptionSupplier(descriptionSupplier) {
    this.descriptionSupplier = descriptionSupplier;
    return this;
  }
  /* eslint-enable jsdoc/require-param, jsdoc/require-returns */
};
var Boost = class {
  /**
   * Constructs a new boost manager.
   * @param baseEffect - The {@link baseEffect} value to use. Defaults to `1`.
   */
  constructor(baseEffect = Decimal.dOne) {
    /**
     * A list of all boost objects that have been added to this boost manager.
     */
    this.boostArray = [];
    this.baseEffect = new Decimal(baseEffect);
  }
  /**
   * Retrieves a boost object based on the provided id.
   * It is recommended to store a reference to the boost when it is created instead of using this method.
   * @param id - The id of the boost to retrieve.
   * @returns The boost object if found, otherwise null.
   */
  getBoost(id) {
    return this.boostArray.find((boost) => boost.id === id) ?? null;
  }
  /**
   * Removes a boost by its ID or reference. Only removes the first instance found.
   * @param id - The ID or reference of the boost to remove.
   */
  removeBoost(id) {
    if (typeof id === "string") {
      this.boostArray.splice(
        this.boostArray.findIndex((boost) => boost.id === id),
        1
      );
    } else {
      this.boostArray.splice(
        this.boostArray.findIndex((boost) => boost === id),
        1
      );
    }
    this.sortBoosts();
  }
  /**
   * Adds a boost with the given parameters.
   * @param boostToAdd - The boost object to add.
   * @returns The boost object that was added.
   * @example
   * boost.setBoost(
   *     new BoostObject("healthBoost")
   *         .withName("Health Boost")
   *         .withDescriptionSupplier(() => `Boosts health by x${Decimal.pow(2, level.sub(1)).format()}.`)
   *         .withValue((n) => n.mul(Decimal.pow(2, level.sub(1))))
   *         .withOrder(OperationBoostOrder.multiply)
   * );
   */
  addBoost(boostToAdd) {
    this.boostArray.push(boostToAdd);
    this.sortBoosts();
    return boostToAdd;
  }
  /**
   * Adds multiple boosts to the boost manager.
   * @param boostToAdd - An array of boost objects to add.
   * @returns The array of boost objects that were added.
   * @see {@link addBoost}
   */
  addBoosts(boostToAdd) {
    this.boostArray.push(...boostToAdd);
    this.sortBoosts();
    return boostToAdd;
  }
  /**
   * Clears all boosts from the boost manager.
   */
  clearBoosts() {
    this.boostArray.length = 0;
  }
  /**
   * Sorts the boosts in the boost manager by their order from lowest to highest.
   * Called automatically when a boost is added or removed,
   * but can be called manually if needed or if a boost object's order is changed after being added to the boost manager.
   */
  sortBoosts() {
    this.boostArray.sort((a, b) => a.order - b.order);
  }
  /**
   * Calculates the cumulative effect of all boosts on the base effect.
   * @param base - The base effect value to calculate with. Defaults to the {@link baseEffect} of the boost manager.
   * @returns The calculated effect after applying boosts.
   */
  calculate(base = this.baseEffect) {
    return this.boostArray.reduce(
      (accumulatedValue, currentBoost) => currentBoost.value(accumulatedValue),
      // Use a new Decimal instance to avoid mutating the original base value if the user supplied value function mutates the input.
      new Decimal(base)
    );
  }
};

// src/classes/Currency.ts
var import_class_transformer4 = require("class-transformer");
var import_reflect_metadata4 = require("reflect-metadata");

// src/game/managers/DataEntry.ts
var SubscribableDataEntry = class _SubscribableDataEntry {
  constructor() {
    /**
     * A list of listeners that will be notified when the data changes.
     * Primarily useful for {@link https://react.dev/reference/react/useSyncExternalStore useSyncExternalStore} in React.
     */
    this.listeners = [];
  }
  /**
   * Creates a entry based on a getter and setter.
   * @template T - The type of the data in the entry.
   * @param getter - A function that returns the current value of the data.
   * @param setter - A function that sets the value of the data and notifies all listeners.
   * @param shouldNotify - Whether to notify listeners after setting the value. Defaults to `true`.
   * @returns A new instance of SubscribableDataEntry that uses the provided getter and setter.
   */
  static fromGetterSetter(getter, setter, shouldNotify = true) {
    return new class extends _SubscribableDataEntry {
      constructor() {
        super();
        this.get = this.get.bind(this);
        this.set = this.set.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.notifyListeners = this.notifyListeners.bind(this);
      }
      get() {
        return getter();
      }
      set(value) {
        setter(value);
        if (shouldNotify) {
          this.notifyListeners();
        }
      }
    }();
  }
  /**
   * Notifies all listeners that the data has changed.
   */
  notifyListeners() {
    for (const listener of this.listeners) {
      listener();
    }
  }
  /**
   * Subscribes a listener to be notified when the data entry changes.
   * See {@link https://react.dev/reference/react/useSyncExternalStore useSyncExternalStore}.
   * @param listener - The listener function to subscribe.
   * @returns A function that can be called to unsubscribe the listener.
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index !== -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
  setCallback(callback) {
    this.set(callback(this.get()));
  }
};
var DataManagerEntry = class extends SubscribableDataEntry {
  constructor(dataManager, dataKey) {
    super();
    this.dataManagerReference = dataManager;
    this.dataKey = dataKey;
    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }
  get() {
    return this.dataManagerReference.data[this.dataKey];
  }
  /**
   * Sets the value of the data entry and notifies all listeners.
   * @param value - The new value to set.
   */
  set(value) {
    this.dataManagerReference.data[this.dataKey] = value;
    this.notifyListeners();
  }
};

// src/classes/InvalidDecimalProtections.ts
var InvalidDecimalProtections = class _InvalidDecimalProtections {
  /**
   * @param initialProtections - The protections to use for this instance.
   * Any properties not specified will default to {@link InvalidDecimalProtections.defaultProtections}.
   */
  constructor(initialProtections) {
    /**
     * The total number of warnings that have been issued by this instance. Once this reaches {@link InvalidDecimalProtections.maxTotalWarnings}, further warnings will be suppressed.
     */
    this.totalWarningCount = 0;
    this.protections = { ..._InvalidDecimalProtections.defaultProtections, ...initialProtections };
  }
  static {
    /**
     * The maximum total number of warnings that can be issued by this instance. Once this is reached, further warnings will be suppressed.
     */
    this.maxTotalWarnings = 100;
  }
  /**
   * Checks if the Decimal is negative. Assumes that the Decimal is already normalized, so it does not check for negative zero.
   * @param decimal - The value to check.
   * @returns true if the Decimal is negative, false otherwise.
   */
  static isDecimalNegative(decimal) {
    return decimal.sign === -1;
  }
  /**
   * Checks if the Decimal is zero. The Decimal does not need to be normalized.
   * Adapted from the zero check in {@link Decimal.normalize}.
   * Note that this also returns true for negative zero.
   * @param decimal - The value to check.
   * @returns true if the Decimal is zero, false otherwise.
   */
  static isDecimalZero(decimal) {
    return decimal.sign === 0 || decimal.mag === 0 && decimal.layer === 0 || decimal.mag === Number.NEGATIVE_INFINITY && decimal.layer > 0 && Number.isFinite(decimal.layer);
  }
  static {
    /**
     * The default protections for invalid Decimal values.
     * These can be overridden by passing a {@link DecimalProtectionsOptions} object to the constructor.
     */
    this.defaultProtections = {
      allowNaN: false,
      allowInfinite: false,
      allowNegative: true,
      allowZero: true,
      allowNonInteger: true
    };
  }
  fromDecimalSourceOrFailedToSerializeDecimal(value, context, ...toLogIfInvalid) {
    if (value instanceof Decimal) {
      return new Decimal(value).normalize();
    }
    if (typeof value === "number" || typeof value === "string") {
      return new Decimal(value);
    }
    if (typeof value === "object" && value !== null && "sign" in value && "mag" in value && "layer" in value) {
      const { sign, mag, layer } = value;
      if (typeof sign === "number" && typeof mag === "number" && typeof layer === "number") {
        this.warnInvalidValue(
          value,
          context,
          "plain Decimal-like object" /* failedToSerializeDecimal */,
          ...toLogIfInvalid
        );
        return Decimal.fromComponents(sign, layer, mag);
      }
    }
    this.warnInvalidValue(value, context, "non-Decimal" /* nonDecimal */, ...toLogIfInvalid);
    return void 0;
  }
  shouldWarn(context, type, ...toLog) {
    this.totalWarningCount++;
    if (this.totalWarningCount === _InvalidDecimalProtections.maxTotalWarnings) {
      console.error(
        `eMath.js: Maximum DecimalProtection total warnings reached. Further warnings will be suppressed for ${context}.`,
        ...toLog
      );
    }
    if (this.totalWarningCount >= _InvalidDecimalProtections.maxTotalWarnings) {
      return false;
    }
    return true;
  }
  warnInvalidValue(theInvalidValue, context, type, ...toLogIfInvalid) {
    if (!this.shouldWarn(context, type, ...toLogIfInvalid)) {
      return;
    }
    console.warn(`eMath.js: Attempted to set a ${type} value to ${context}:`, theInvalidValue, ...toLogIfInvalid);
  }
  /**
   * Checks if the value is valid according to the protections and warns if it is not.
   *
   * Intended to be used internally for setter methods in classes.
   * @param value - The value to check.
   * @param elseValue - The value to return if the value is invalid.
   * @param context - The context in which the value is being assigned, used for warning messages.
   * @param toLogIfInvalid - Additional values to log if the value is invalid.
   * @returns A transformed {@link value} if it is valid, otherwise {@link elseValue}.
   */
  validateValueOrElse(value, elseValue, context = "", ...toLogIfInvalid) {
    value = this.fromDecimalSourceOrFailedToSerializeDecimal(value, context, ...toLogIfInvalid);
    elseValue = this.fromDecimalSourceOrFailedToSerializeDecimal(elseValue, `${context} (elseValue)`, ...toLogIfInvalid);
    if (elseValue === void 0) {
      elseValue = new Decimal(Decimal.dOne);
    }
    if (value === void 0) {
      return elseValue;
    }
    if (!this.protections.allowNaN && value.isNan()) {
      this.warnInvalidValue(value, context, "NaN" /* nan */, ...toLogIfInvalid);
      return elseValue;
    }
    if (!this.protections.allowInfinite && !value.isFinite()) {
      this.warnInvalidValue(value, context, "infinite" /* infinite */, ...toLogIfInvalid);
      return elseValue;
    }
    if (!this.protections.allowNegative && _InvalidDecimalProtections.isDecimalNegative(value)) {
      this.warnInvalidValue(value, context, "negative" /* negative */, ...toLogIfInvalid);
      return elseValue;
    }
    if (!this.protections.allowZero && _InvalidDecimalProtections.isDecimalZero(value)) {
      this.warnInvalidValue(value, context, "zero" /* zero */, ...toLogIfInvalid);
      return elseValue;
    }
    if (!this.protections.allowNonInteger) {
      value = value.trunc();
    }
    return value;
  }
  /**
   * Modifies the protections for this instance. Any properties not specified will remain unchanged.
   * @param newProtections - The new protections to use for this instance.
   */
  setProtections(newProtections) {
    this.protections = { ...this.protections, ...newProtections };
  }
};

// src/classes/Upgrade.ts
var import_class_transformer3 = require("class-transformer");
var import_reflect_metadata3 = require("reflect-metadata");

// src/game/index.ts
var import_reflect_metadata2 = require("reflect-metadata");

// src/game/managers/ConfigManager.ts
function parseObject(obj, template, recurse = true) {
  for (const key in template) {
    if (typeof obj[key] === "undefined") {
      obj[key] = template[key];
    } else if (recurse && typeof obj[key] === "object" && typeof template[key] === "object" && !Array.isArray(obj[key]) && !Array.isArray(template[key])) {
      obj[key] = parseObject(
        obj[key],
        template[key]
      );
    }
  }
  return obj;
}
var ConfigManager = class {
  /**
   * Constructs a new configuration manager.
   * @param configOptionTemplate - The template to use for default values.
   * @param isParsingRecursive - Whether or not the configuration is being parsed recursively. Defaults to `true`.
   */
  constructor(configOptionTemplate, isParsingRecursive = true) {
    this.configOptionTemplate = configOptionTemplate;
    this.isParsingRecursive = isParsingRecursive;
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
    return parseObject(
      config,
      this.configOptionTemplate,
      this.isParsingRecursive
    );
  }
  /**
   * @returns The template to use for default values.
   */
  get options() {
    return this.configOptionTemplate;
  }
};

// src/game/managers/KeyManager.ts
var keyManagerDefaultConfig = {
  autoAddInterval: true,
  fps: 30
};
var keys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ".split("").concat(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
var KeyManager = class _KeyManager {
  /**
   * Creates a new key manager.
   * @param config - The configuration for the key manager.
   */
  constructor(config) {
    /** @deprecated Use {@link addKey} instead. */
    this.addKeys = this.addKey.bind(this);
    this.keysPressed = [];
    this.binds = [];
    this.tickers = [];
    this.config = _KeyManager.configManager.parse(config);
    if (this.config.autoAddInterval) {
      const fps = this.config.fps ? this.config.fps : 30;
      this.tickerInterval = setInterval(() => {
        for (const ticker of this.tickers) {
          ticker(1e3 / fps);
        }
      }, 1e3 / fps);
    }
    if (typeof document === "undefined") {
      return;
    }
    this.tickers.push((dt) => {
      for (const bind of this.binds) {
        if ((typeof bind.onDownContinuous !== "undefined" || typeof bind.fn !== "undefined") && this.isPressing(bind.id)) {
          bind.onDownContinuous?.(dt);
          bind.fn?.(dt);
        }
      }
    });
    document.addEventListener("keydown", (e) => {
      this.logKey(e, true);
      this.onAll("down", e.key);
    });
    document.addEventListener("keyup", (e) => {
      this.logKey(e, false);
      this.onAll("up", e.key);
    });
    document.addEventListener("keypress", (e) => {
      this.onAll("press", e.key);
    });
  }
  static {
    /** The configuration manager for the key manager */
    this.configManager = new ConfigManager(keyManagerDefaultConfig);
  }
  /**
   * Changes the framerate of the key manager.
   * @param fps - The new framerate to use.
   */
  changeFps(fps) {
    this.config.fps = fps;
    if (this.tickerInterval) {
      clearInterval(this.tickerInterval);
      this.tickerInterval = setInterval(() => {
        for (const ticker of this.tickers) {
          ticker(1e3 / fps);
        }
      }, 1e3 / fps);
    }
  }
  /**
   * Adds keys to the list of keys pressed.
   * @param event - The event to add the key from.
   * @param type - Whether to add or remove the key. `true` to add, `false` to remove.
   */
  logKey(event, type) {
    const key = event.key;
    if (type && !this.keysPressed.includes(key)) {
      this.keysPressed.push(key);
    } else if (!type && this.keysPressed.includes(key)) {
      this.keysPressed.splice(this.keysPressed.indexOf(key), 1);
    }
  }
  /**
   * Manages onDown, onPress, and onUp events for all key bindings.
   * @param eventType - The type of event to call for.
   * @param keypress - The key that was pressed.
   */
  onAll(eventType, keypress) {
    for (const bind of this.binds) {
      if (bind.key !== keypress) continue;
      switch (eventType) {
        case "down":
          bind.onDown?.();
          break;
        case "press":
        default:
          bind.onPress?.();
          break;
        case "up":
          bind.onUp?.();
          break;
      }
    }
  }
  /**
   * Checks if a specific key binding is currently being pressed.
   * @param id - The name of the key binding to check.
   * @returns True if the key binding is being pressed, otherwise false.
   */
  isPressing(id) {
    for (const current of this.binds) {
      if (current.id === id) {
        return this.keysPressed.includes(current.key);
      }
    }
    return false;
  }
  /**
   * Gets a key binding by its id.
   * @param id - The id of the key binding to get.
   * @returns The key binding, if found.
   */
  getBind(id) {
    return this.binds.find((current) => current.id === id);
  }
  addKey(nameOrKeysToAdd, key, fn) {
    nameOrKeysToAdd = typeof nameOrKeysToAdd === "string" ? {
      id: nameOrKeysToAdd,
      name: nameOrKeysToAdd,
      key: key ?? "",
      fn
    } : nameOrKeysToAdd;
    nameOrKeysToAdd = Array.isArray(nameOrKeysToAdd) ? nameOrKeysToAdd : [nameOrKeysToAdd];
    for (const keyBinding of nameOrKeysToAdd) {
      keyBinding.id = keyBinding.id ?? keyBinding.name;
      const existing = this.getBind(keyBinding.id);
      if (existing) {
        Object.assign(existing, keyBinding);
        continue;
      }
      this.binds.push(keyBinding);
    }
  }
};

// src/game/managers/EventManager.ts
var eventManagerDefaultConfig = {
  autoAddInterval: true,
  fps: 30
};
var EventManager = class _EventManager {
  /**
   * Creates a new event manager.
   * @param config - The config to use for this event manager.
   * @param events - The events to add to the event manager.
   * These events will be added to the event manager's callback events, although you could omit this and add events manually
   * (though this is not recommended as you won't get type checking).
   */
  constructor(config, events) {
    /** The timer events stored in the event manager. */
    this.events = /* @__PURE__ */ Object.create(null);
    /**
     * The callback events stored in the event manager.
     * Each event is stored as an array of callback functions, which are executed when the event is dispatched.
     */
    this.callbackEvents = /* @__PURE__ */ Object.create(null);
    /**
     * Adds a new event.
     * Alias for {@link EventManager.setEvent}. Only here for backwards compatibility.
     * @deprecated Use {@link EventManager.setEvent} instead.
     */
    this.addEvent = this.setEvent.bind(this);
    this.config = _EventManager.configManager.parse(config);
    if (events) {
      for (const event of events) {
        this.callbackEvents[event] = [];
      }
    }
    if (this.config.autoAddInterval) {
      const fps = this.config.fps ?? 30;
      this.tickerInterval = setInterval(() => {
        this.tickerFunction();
      }, 1e3 / fps);
    }
  }
  static {
    /** The static config manager for the event manager. */
    this.configManager = new ConfigManager(eventManagerDefaultConfig);
  }
  /**
   * Adds a callback to an event.
   * If you want to use a timer event, use {@link EventManager.setEvent} instead.
   * @param event - The event to add the callback to.
   * @param callback - The callback to add to the event.
   */
  on(event, callback) {
    if (!this.callbackEvents[event]) {
      this.callbackEvents[event] = [];
    }
    this.callbackEvents[event].push({ type: event, callback });
  }
  /**
   * Dispatches / calls all callbacks for an event added with {@link EventManager.on}.
   * @param event - The event to dispatch.
   */
  dispatch(event) {
    if (!this.callbackEvents[event]) {
      return;
    }
    for (const callback of this.callbackEvents[event]) {
      callback.callback();
    }
  }
  /**
   * The function that is called every frame, executes all events.
   */
  tickerFunction() {
    const currentTime = Date.now();
    for (const event of Object.values(this.events)) {
      switch (event.type) {
        // prettier-ignore
        case "interval" /* interval */:
          {
            if (currentTime - event.intervalLast >= event.delay) {
              const dt = currentTime - event.intervalLast;
              event.callback(dt);
              event.intervalLast = currentTime;
            }
          }
          break;
        // prettier-ignore
        case "timeout" /* timeout */:
          {
            if (currentTime - event.timeCreated >= event.delay) {
              const dt = currentTime - event.timeCreated;
              event.callback(dt);
              delete this.events[event.name];
            }
          }
          break;
      }
    }
  }
  /**
   * Changes the framerate of the event manager.
   * @param fps - The new framerate to use.
   */
  changeFps(fps) {
    this.config.fps = fps;
    if (this.tickerInterval) {
      clearInterval(this.tickerInterval);
      this.tickerInterval = setInterval(() => {
        this.tickerFunction();
      }, 1e3 / fps);
    }
  }
  /**
   * Warps time by a certain amount.
   * - Events will be triggered as if the time has passed.
   * - The stored creation time of timeout events will be adjusted.
   * @param dt - The time to warp by (in milliseconds).
   */
  timeWarp(dt) {
    for (const event of Object.values(this.events)) {
      switch (event.type) {
        case "interval" /* interval */:
          event.intervalLast -= dt;
          break;
        case "timeout" /* timeout */:
          event.timeCreated -= dt;
          break;
      }
    }
  }
  setEvent(nameOrEvent, type, delay, callbackFn) {
    const isEventInit = typeof nameOrEvent !== "string";
    const eventToAdd = {
      // Default values
      // name: Symbol(),
      type: "timeout" /* timeout */,
      delay: 0,
      // callback: () => {},
      // If the event is being initialized with an object, spread the object.
      // Otherwise, assign the values from the arguments.
      // prettier-ignore
      ...isEventInit ? nameOrEvent : {
        name: nameOrEvent,
        type,
        delay,
        callback: callbackFn
      },
      // Assign the default values.
      timeCreated: Date.now(),
      // If the event is an interval event, set the last interval time to now.
      intervalLast: type === "interval" ? Date.now() : 0
    };
    this.events[eventToAdd.name] = eventToAdd;
  }
  /**
   * Removes a timer event from the event manager.
   * Does not remove callback events.
   * @param name - The name of the event to remove.
   * @example
   * myEventManger.removeEvent("IntervalEvent"); // Removes the interval event with the name "IntervalEvent".
   */
  removeEvent(name) {
    delete this.events[name];
  }
};

// src/game/managers/DataManager.ts
var import_reflect_metadata = require("reflect-metadata");
var import_class_transformer2 = require("class-transformer");
var import_lz_string = __toESM(require_lz_string());
var import_md5 = __toESM(require_md5());
var DataManager = class {
  /**
   * Creates a new instance of the game class.
   * @param gameRef - A function that returns the game instance.
   * @param localStorage - The local storage object. Defaults to `window.localStorage`.
   */
  constructor(gameRef, localStorage) {
    /**
     * The current game data.
     * To access the data, use {@link DataManager.setData} and {@link DataManager.getData}.
     */
    this.data = /* @__PURE__ */ Object.create(null);
    this.dataEntryInstances = /* @__PURE__ */ Object.create(null);
    /**
     * A queue of functions to call when the game data is loaded.
     * These functions are called when calling {@link DataManager.loadData} and the data is loaded.
     * (they should have been added using class-transformer's decorators, but esbuild doesn't support decorators yet)
     */
    this.eventsOnLoad = [];
    this.allowDataToBeSaved = true;
    this.gameRef = gameRef;
    this.localStorage = localStorage ?? (() => {
      if (typeof window === "undefined") {
        console.warn(
          "eMath.js: Local storage is not supported. Methods that rely on local storage will not work. You can use compileData() and decompileData() instead to implement a custom save system."
        );
        return null;
      }
      return window.localStorage;
    })();
  }
  /**
   * Adds an event to call when the game data is loaded.
   * @param event - The event to call when the game data is loaded.
   * @example dataManager.addEventOnLoad(() => console.log("Data loaded!"));
   */
  addEventOnLoad(event) {
    this.eventsOnLoad.push(event);
  }
  setDataInternal(key, value) {
    this.data[key] = value;
    if (this.dataEntryInstances[key]) {
      this.dataEntryInstances[key].notifyListeners();
    }
  }
  /**
   * Sets the data for the given key.
   * The getter is a work in progress.
   * @template S - The key to set the data for.
   * @template T - The value to set the data to.
   * @param key - The key to set the data for.
   * @param value - The value to set the data to.
   * @returns An object with a single entry of the name of the key and the value of the data. This is a getter and setter.
   * @example
   * // ! WARNING: Do not destruct the `value` property, as it will remove the getter and setter.
   * const testData = dataManager.setData("test", 5);
   * console.log(testData.value); // 5
   * testData.value = 10; // Also sets the data
   * console.log(testData.value); // 10
   */
  setData(key, value) {
    this.setDataInternal(key, value);
    return () => this.data[key];
  }
  /**
   * Sets the data for the given key and returns a getter and setter for the data.
   * @param key - The key to set the data for.
   * @param value - The initial value to set the data to.
   * @returns A tuple containing a getter and a setter for the data. The getter returns the current value of the data, and the setter can be used to update the value of the data. The setter can take either a new value or a callback function that receives the previous value and returns the new value.
   * @example
   * const [getTestData, setTestData] = dataManager.useData("test", 5);
   * console.log(getTestData()); // 5
   * setTestData(10); // Sets the data to 10
   * console.log(getTestData()); // 10
   * setTestData((prev) => prev + 5); // Updates the data to 15 using a callback
   * console.log(getTestData()); // 15
   */
  useData(key, value) {
    this.setDataInternal(key, value);
    return [
      () => this.data[key],
      (newValueOrCallback) => {
        if (typeof newValueOrCallback === "function") {
          this.setDataInternal(key, newValueOrCallback(this.data[key]));
          return;
        }
        this.setDataInternal(key, newValueOrCallback);
      }
    ];
  }
  useDataEntry(key, value) {
    if (this.dataEntryInstances[key]) {
      return this.dataEntryInstances[key];
    }
    if (typeof value === "function") {
      console.warn(
        `eMath.js: useDataEntry(): The value for key "${key}" is a function. This may cause issues with setting the data entry`
      );
    }
    this.data[key] = value;
    const entry = new DataManagerEntry(this, key);
    this.dataEntryInstances[key] = entry;
    return entry;
  }
  /**
   * Gets the data for the given key.
   * @deprecated Set the return value of {@link setData} to a variable instead, as that is a getter and provides type checking.
   * @param key - The key to get the data for.
   * @returns The data for the given key.
   */
  getData(key) {
    return this.data[key];
  }
  /**
   * Adds a static class with data to the data manager. The class will be added to the data manager and its `onAddToDataManager` method will be called if it exists. When the data is loaded using {@link DataManager.loadData}, the class's `onLoadData` method will be called if it exists.
   * @param data - The static class with data to add to the data manager.
   */
  addCustomData(data) {
    data.onAddToDataManager?.(this);
    this.addEventOnLoad(() => data.onLoadData?.());
  }
  /**
   * Compiles the given game data to a tuple containing the compressed game data and a hash.
   * @param data The game data to be compressed. Defaults to the current game data.
   * @returns [hash, data] - The compressed game data and a hash as a base64-encoded string to use for saving.
   */
  compileDataRaw(data = this.data) {
    this.gameRef.eventManager.dispatch("beforeCompileData");
    const plainGameData = {};
    for (const key in data) {
      plainGameData[key] = (0, import_class_transformer2.instanceToPlain)(data[key]);
    }
    const hashedData = (0, import_md5.default)(`${this.gameRef.config.name.id}/${JSON.stringify(plainGameData)}`);
    const saveMetadata = {
      hash: hashedData,
      game: {
        title: this.gameRef.config.name.title,
        id: this.gameRef.config.name.id,
        version: this.gameRef.config.name.version
      },
      ...eMathMetadata
    };
    return [saveMetadata, plainGameData];
  }
  /**
   * Compresses the given game data to a UTF-16-encoded string using lz-string.
   * @param data The game data to be compressed. Defaults to the current game data.
   * @returns The compressed game data and a hash as a UTF-16-encoded string to use for saving.
   */
  compileData(data = this.data) {
    const dataRawString = JSON.stringify(this.compileDataRaw(data));
    return (0, import_lz_string.compressToUTF16)(dataRawString);
  }
  /**
   * Decompiles the data stored in localStorage and returns the corresponding object.
   * @param data - The data to decompile. If not provided, it will be fetched from localStorage using the key `${game.config.name.id}-data`.
   * @returns The decompiled object, or null if the data is empty or invalid.
   */
  decompileData(data) {
    if (!data) {
      if (!this.localStorage) {
        console.warn(
          "eMath.js: Local storage is not supported. Methods that rely on local storage will not work: decompileData() requires the data to be passed as an argument."
        );
        return null;
      }
      data = this.localStorage.getItem(`${this.gameRef.config.name.id}-data`);
    }
    if (!data) return null;
    let parsedData;
    try {
      parsedData = JSON.parse((0, import_lz_string.decompressFromUTF16)(data));
      return parsedData;
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(`eMath.js: Failed to decompile data (corrupted) "${data}":`, error);
      } else {
        throw error;
      }
      return null;
    }
  }
  /**
   * Validates the given data using a hashing algorithm (md5)
   * @param data - [hash, data] The data to validate.
   * @returns Whether the data is valid / unchanged. False means that the data has been tampered with / save edited.
   */
  validateData(data) {
    const [saveMetadata, gameDataToValidate] = data;
    if (typeof saveMetadata === "string") {
      return (0, import_md5.default)(`${this.gameRef.config.name.id}/${JSON.stringify(gameDataToValidate)}`) === saveMetadata;
    }
    const hashSave = saveMetadata.hash;
    const hashCheck = (0, import_md5.default)(`${this.gameRef.config.name.id}/${JSON.stringify(gameDataToValidate)}`);
    return hashSave === hashCheck;
  }
  /**
   * Resets the game data to its initial state and saves it.
   * @param reload - Whether to reload the page after resetting the data. Defaults to `false`.
   * (Reloading may help with some issues with saving data)
   */
  resetData(reload = false) {
    if (!reload) {
      console.warn(
        "eMath.js: resetData(): Resetting data without reloading is not fully supported yet and may cause issues. It is recommended to set reload to true or implement a custom reset system by calling saveData() with the initial data."
      );
    }
    if (typeof window === "undefined") {
      console.warn(
        "eMath.js: resetData(): Window is not defined. You can implement a custom reset system by calling saveData() with the initial data."
      );
      return;
    }
    this.saveData(null);
    this.allowDataToBeSaved = false;
    window.location.reload();
  }
  /**
   * Saves the game data to local storage under the key `${game.config.name.id}-data`.
   * If you don't want to save to local storage, use {@link compileData} instead.
   * @param dataToSave - The data to save. If not provided, it will be fetched from localStorage using {@link compileData}. If the data is null, the save will be cleared instead.
   */
  saveData(dataToSave = this.compileData()) {
    if (typeof dataToSave === "undefined" || dataToSave === "") {
      console.warn("eMath.js: saveData(): Data to save is empty.");
      return;
    }
    if (!this.localStorage) {
      console.warn(
        "eMath.js: saveData(): Local storage is not supported. You can use compileData() instead to implement a custom save system."
      );
      return;
    }
    if (!this.allowDataToBeSaved) {
      console.warn("eMath.js: saveData(): Saving data is currently not allowed.");
      return;
    }
    this.gameRef.eventManager.dispatch("beforeSaveData");
    if (dataToSave === null) {
      this.localStorage.removeItem(`${this.gameRef.config.name.id}-data`);
      return;
    }
    this.localStorage.setItem(`${this.gameRef.config.name.id}-data`, dataToSave);
    this.gameRef.eventManager.dispatch("saveData");
  }
  /**
   * Compiles the game data and prompts the user to download it as a text file using {@link window.prompt}.
   * If you want to implement a custom data export, use {@link compileData} instead.
   */
  exportData() {
    if (typeof document === "undefined") {
      console.warn(
        "eMath.js: exportData(): Document is not defined. You can use compileData() instead to implement a custom save system."
      );
      return;
    }
    const content = this.compileData();
    if (prompt("Download save data?:", content) != null) {
      const blob = new Blob([content], { type: "text/plain" });
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `${this.gameRef.config.name.id}-save.data`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadLink.href);
    }
  }
  /**
   * Loads game data and processes it.
   * @param dataToParse - The data to load. If not provided, it will be fetched from localStorage using {@link decompileData}.
   */
  parseData(dataToParse = this.decompileData()) {
    if (!dataToParse) return;
    const [, loadedData] = dataToParse;
    for (const key in loadedData) {
      if (typeof this.data[key] === "undefined") {
        console.warn(
          `eMath.js: Loaded data has a key "${key}" that does not exist in the current game data. Skipping this key.`
        );
        continue;
      }
      if (
        // TODO: currently only exists to make compiler happy, might have side effects
        this.data[key] == null || typeof this.data[key].constructor === "undefined"
      ) {
        this.setDataInternal(key, loadedData[key]);
        continue;
      }
      this.setDataInternal(
        key,
        (0, import_class_transformer2.plainToInstance)(this.data[key].constructor, loadedData[key])
      );
    }
  }
  /**
   * Loads game data and processes it.
   * @param dataToLoad - The data to load. If not provided, it will be fetched from localStorage using {@link decompileData}.
   * @returns Returns null if the data is empty or invalid, or false if the data is tampered with. Otherwise, returns true.
   */
  loadData(dataToLoad = this.decompileData()) {
    dataToLoad = typeof dataToLoad === "string" ? this.decompileData(dataToLoad) : dataToLoad;
    if (!dataToLoad) return null;
    const isDataValid = this.validateData([dataToLoad[0], (0, import_class_transformer2.instanceToPlain)(dataToLoad[1])]);
    this.parseData(dataToLoad);
    for (const obj of this.eventsOnLoad) {
      obj();
    }
    this.gameRef.eventManager.dispatch("loadData");
    return isDataValid;
  }
};

// src/game/Game.ts
var gameDefaultConfig = {
  mode: "production",
  name: {
    title: "",
    id: "",
    version: "0.0.0"
  },
  settings: {
    framerate: 30
  },
  initIntervalBasedManagers: true,
  localStorage: void 0
};
var Game = class _Game {
  static {
    /** The static config manager for the game. */
    this.configManager = new ConfigManager(gameDefaultConfig);
  }
  /**
   * Creates a new instance of the game class.
   * @param config - The configuration object for the game.
   * @example
   * const myGame = new game({
   *     name: {
   *         title: "My Game",
   *         id: "my-game",
   *     },
   *     // Additional options here
   * });
   */
  constructor(config) {
    this.config = _Game.configManager.parse(config);
    this.dataManager = new DataManager(this, this.config.localStorage);
    this.keyManager = new KeyManager({
      autoAddInterval: this.config.initIntervalBasedManagers,
      fps: this.config.settings.framerate
    });
    this.eventManager = new EventManager({
      autoAddInterval: this.config.initIntervalBasedManagers,
      fps: this.config.settings.framerate
    });
    this.tickers = [];
  }
  /**
   * Initializes the game. Also initializes the data manager.
   * See {@link DataManager.init} for more information.
   */
  init() {
  }
  /**
   * Changes the framerate of the game.
   * @param fps - The new framerate to use.
   */
  changeFps(fps) {
    this.keyManager.changeFps(fps);
    this.eventManager.changeFps(fps);
  }
  addData(dataToAdd) {
    this.dataManager.addCustomData(dataToAdd);
    return dataToAdd;
  }
  // TODO: Implement clearTickers
  // public clearTickers(): void {
  // }
  // /**
  //  * Adds a new currency section to the game. {@link GameCurrency} is the class.
  //  * It automatically adds the currency and currencyStatic objects to the data and static objects for saving and loading.
  //  * @template TCurrencyName - The name
  //  * @template U - The upgrade names for the currency. See {@link Currency} for more information.
  //  * @template I - The item names for the currency. See {@link Currency} for more information.
  //  * @param name - The name of the currency section. This is also the name of the data and static objects, so it must be unique.
  //  * @param upgrades - The upgrades for the currency.
  //  * @param items - The items for the currency.
  //  * @returns A new instance of the gameCurrency class.
  //  * @example
  //  * const currency = game.addCurrency("currency");
  //  * currency.static.gain();
  //  * console.log(currency.value); // Decimal.dOne
  //  */
  // public addCurrency<
  //     TCurrencyName extends string = string,
  //     TUpgradeIds extends string = string,
  //     TItemIds extends string = string,
  // >(
  //     name: TCurrencyName,
  //     upgrades?: UpgradeInit<TUpgradeIds>[],
  //     items?: ItemInit<TItemIds>[],
  // ): GameCurrency<TCurrencyName, TUpgradeIds, TItemIds> {
  //     // Create the class instance
  //     const classInstance = new GameCurrency(
  //         [this.dataManager.setData(name, new CurrencyData()), upgrades, items] as ConstructorParameters<
  //             typeof Currency
  //         >,
  //         this,
  //         name,
  //     );
  //     return classInstance;
  // }
  // /**
  //  * Adds a new attribute to the game. {@link GameAttribute} is the class.
  //  * It automatically adds the attribute and attributeStatic objects to the data and static objects for saving and loading.
  //  * @param name - The name of the attribute.
  //  * @param useBoost - Indicates whether to use boost for the attribute.
  //  * @param initial - The initial value of the attribute.
  //  * @returns The newly created attribute.
  //  * @example
  //  * const myAttribute = game.addAttribute("myAttribute");
  //  */
  // public addAttribute<TEnableBoost extends boolean = true>(
  //     name: string,
  //     useBoost: TEnableBoost = true as TEnableBoost,
  //     initial: DecimalSource = 0,
  // ): GameAttribute<TEnableBoost> {
  //     const classInstance = new GameAttribute(
  //         [this.dataManager.setData(name, new Attribute(initial)), useBoost, initial] as ConstructorParameters<
  //             typeof AttributeStatic
  //         >,
  //         this,
  //     );
  //     return classInstance;
  // }
  // /**
  //  * Adds a new skill tree to the game.
  //  * This method automatically adds the skill tree and skillTreeStatic objects to the data and static objects for saving and loading.
  //  * @template TSkillNames - The names of the skills in the skill tree.
  //  * @param name - The name of the skill tree. This is also the name of the data and static objects, so it must be unique.
  //  * @param skills - The skills to add to the skill tree. These are the skills that can be unlocked in the skill tree.
  //  * @returns A new instance of the game skill tree class.
  //  */
  // public addSkillTree<TSkillNames extends string = string>(
  //     name: string,
  //     skills: SkillInit<TSkillNames>[],
  // ): GameSkillTree<TSkillNames> {
  //     // Set the data and static objects
  //     this.dataManager.setData(name, {
  //         skillTree: new SkillTreeData(),
  //     });
  //     // Create the class instance
  //     const classInstance = new GameSkillTree<TSkillNames>(
  //         [
  //             skills,
  //             (): SkillTreeData => (this.dataManager.getData(name) as { skillTree: SkillTreeData }).skillTree,
  //         ] as ConstructorParameters<typeof SkillTreeStatic<TSkillNames>>,
  //         this,
  //         name,
  //     );
  //     return classInstance;
  // }
};

// src/classes/numericalAnalysis/numericalAnalysis.ts
var DEFAULT_ITERATIONS = 30;
var DEFAULT_ITERATIONS_AS_DECIMAL = new Decimal(DEFAULT_ITERATIONS);
var DEFAULT_TOLERANCE = 1e-4;
var MeanMode = /* @__PURE__ */ ((MeanMode2) => {
  MeanMode2[MeanMode2["arithmetic"] = 1] = "arithmetic";
  MeanMode2[MeanMode2["geometric"] = 2] = "geometric";
  MeanMode2[MeanMode2["harmonic"] = 3] = "harmonic";
  MeanMode2[MeanMode2["logarithmic"] = 4] = "logarithmic";
  return MeanMode2;
})(MeanMode || {});
var oneHalf = Decimal.dTwo.recip();
function mean(a, b, mode = 2 /* geometric */) {
  a = Decimal.fromValue_noAlloc(a);
  b = Decimal.fromValue_noAlloc(b);
  switch (mode) {
    case 1 /* arithmetic */:
      return a.add(b).mul(oneHalf);
    case 2 /* geometric */:
    default:
      return a.mul(b).sqrt();
    case 3 /* harmonic */:
      return Decimal.dTwo.div(a.reciprocal().add(b.reciprocal()));
    case 4 /* logarithmic */:
      return Decimal.pow10(a.log10().mul(b.log10()).sqrt());
  }
}
function geometricEqualsTolerance(a, b, tolerance = DEFAULT_TOLERANCE, verbose = false) {
  a = Decimal.fromValue_noAlloc(a);
  b = Decimal.fromValue_noAlloc(b);
  const diff = decimalMagDifference(a, b) - 1;
  const result = Math.abs(diff) < tolerance;
  if (verbose === true || verbose === "onlyOnFail" && !result) {
    console.log({ a, b, tolerance, diff, result });
  }
  return result;
}
function decimalMagDifference(a, b) {
  a = Decimal.fromValue_noAlloc(a);
  b = Decimal.fromValue_noAlloc(b);
  if (a.layer === b.layer) {
    return a.mag / b.mag;
  }
  if (a.layer - b.layer >= 2) {
    return Infinity;
  }
  if (a.layer - b.layer <= -2) {
    return 0;
  }
  if (a.layer > b.layer) {
    return a.mag / f_maglog10(b.mag);
  } else {
    return f_maglog10(a.mag) / b.mag;
  }
}
function roundingBase(x, base = Decimal.dTen, acc = Decimal.dZero) {
  x = Decimal.fromValue_noAlloc(x);
  base = Decimal.fromValue_noAlloc(base);
  acc = Decimal.fromValue_noAlloc(acc);
  if (base.lt(Decimal.dOne) || acc.lt(Decimal.dOne)) return Decimal.dNaN;
  const xSign = x.sign;
  x = x.abs();
  const isBaseTen = base.equals(Decimal.dTen);
  const powerN = isBaseTen ? x.log10().floor() : x.log(base).floor();
  const highestSignificantNumber = isBaseTen ? powerN.pow10() : base.pow(powerN);
  const factorToScaleWhenRounding = isBaseTen ? acc.pow10() : base.pow(acc);
  let out = x.div(highestSignificantNumber);
  out = out.mul(factorToScaleWhenRounding).round().div(factorToScaleWhenRounding);
  out = out.mul(highestSignificantNumber);
  out.sign = xSign;
  return out;
}
function approximateDerivative(f, x, epsilon = 1e-12) {
  x = Decimal.fromValue_noAlloc(x);
  const fX = f(x);
  let xPlusH = Decimal.fromComponents(x.sign, x.layer, x.mag * (1 + epsilon));
  let fXPlusH = f(xPlusH);
  while (fXPlusH.equals(fX) && epsilon < 1) {
    epsilon *= 10;
    xPlusH = Decimal.fromComponents(x.sign, x.layer, x.mag * (1 + epsilon));
    fXPlusH = f(xPlusH);
  }
  const deltaX = xPlusH.sub(x);
  return fXPlusH.sub(fX).div(deltaX);
}
function newtonRaphson(initialGuess, f, fPrime, tolerance = DEFAULT_TOLERANCE, maxIterations = DEFAULT_ITERATIONS) {
  let x = Decimal.fromValue_noAlloc(initialGuess);
  fPrime ??= (x2) => approximateDerivative(f, x2);
  for (let i = 0; i < maxIterations; i++) {
    const fx = f(x);
    const fxPrime = fPrime(x);
    if (fxPrime.equals(Decimal.dZero)) {
      console.warn("eMath.js: Derivative is zero. No solution found. Returning current approximation.");
      return x;
    }
    const xNext = x.sub(fx.div(fxPrime));
    if (geometricEqualsTolerance(xNext, x)) {
      return xNext;
    }
    x = xNext;
  }
  return x;
}

// src/classes/numericalAnalysis/inverseFunction.ts
function calculateInverseFunction(f, n, options = {}) {
  const { iterations, tolerance, lowerBound, upperBound, round, mode } = options;
  return inverseFunctionApprox(f, n, mode, iterations, tolerance, lowerBound, upperBound, round);
}
function inverseFunctionApprox(f, n, mode = 2 /* geometric */, iterations = DEFAULT_ITERATIONS, tolerance = DEFAULT_TOLERANCE, lowerBound = Decimal.dOne, upperBound = n, round = false) {
  lowerBound = Decimal.fromValue_noAlloc(lowerBound);
  lowerBound = round ? lowerBound.floor() : lowerBound;
  upperBound = Decimal.fromValue_noAlloc(upperBound);
  upperBound = round ? upperBound.ceil() : upperBound;
  n = Decimal.fromValue_noAlloc(n);
  const BOUND_THRESHOLD = 5;
  if (lowerBound.gt(upperBound)) {
    [lowerBound, upperBound] = [upperBound, lowerBound];
  }
  const fInitialLowerBound = f(lowerBound);
  const fInitialUpperBound = f(upperBound);
  if (fInitialUpperBound.eq(Decimal.dZero)) {
    return {
      value: Decimal.dZero,
      lowerBound: Decimal.dZero,
      upperBound: Decimal.dZero
    };
  }
  if (fInitialLowerBound.gt(n)) {
    console.warn("eMath.js: The interval does not contain the value. (f(lowerBound) > n)", {
      lowerBound,
      upperBound,
      n,
      /* eslint-disable @typescript-eslint/naming-convention */
      "f(lowerBound)": fInitialLowerBound,
      "f(upperBound)": fInitialUpperBound
      /* eslint-enable @typescript-eslint/naming-convention */
    });
    if (!lowerBound.eq(Decimal.dZero)) {
      return inverseFunctionApprox(f, n, mode, iterations, tolerance, Decimal.dZero, upperBound, round);
    }
    return {
      value: upperBound,
      lowerBound: upperBound,
      upperBound
    };
  }
  if (fInitialUpperBound.lt(n)) {
    console.warn("eMath.js: The interval does not contain the value. (f(upperBound) < n)", {
      lowerBound,
      upperBound,
      n,
      /* eslint-disable @typescript-eslint/naming-convention */
      "f(lowerBound)": fInitialLowerBound,
      "f(upperBound)": fInitialUpperBound
      /* eslint-enable @typescript-eslint/naming-convention */
    });
    if (!upperBound.eq(n)) {
      return inverseFunctionApprox(f, n, mode, iterations, tolerance, lowerBound, n, round);
    }
    return {
      value: upperBound,
      lowerBound: upperBound,
      upperBound
    };
  }
  let mid = Decimal.dZero;
  let midValue = Decimal.dZero;
  let nextMid = mean(lowerBound, upperBound, mode);
  for (let i = 0; i < iterations; i++) {
    mid = nextMid;
    mid = round ? mid.floor() : mid;
    midValue = f(mid);
    if (midValue.lt(n)) {
      lowerBound = mid;
    } else {
      upperBound = mid;
    }
    if (geometricEqualsTolerance(midValue, n, tolerance)) {
      break;
    }
    if (round && upperBound.sub(lowerBound).lte(BOUND_THRESHOLD)) {
      let closest = upperBound;
      let closestDiff = f(upperBound).sub(n).abs();
      for (let j = lowerBound; j.lte(upperBound); j = j.add(Decimal.dOne)) {
        const diff = f(j).sub(n).abs();
        if (diff.lt(closestDiff)) {
          closest = Decimal.fromValue_noAlloc(j);
          closestDiff = diff;
        }
      }
      return {
        value: closest,
        lowerBound,
        upperBound
      };
    }
    nextMid = mean(lowerBound, upperBound, mode);
  }
  const out = {
    value: lowerBound,
    lowerBound,
    upperBound
  };
  return out;
}
function inverseFunctionApproxUsingNewtonRaphson(f, n, fPrime, initialGuess, iterations = DEFAULT_ITERATIONS, tolerance = DEFAULT_TOLERANCE) {
  initialGuess = initialGuess ? Decimal.fromValue_noAlloc(initialGuess) : mean(Decimal.dOne, n, 2 /* geometric */);
  fPrime ??= (x) => approximateDerivative(f, x);
  return newtonRaphson(initialGuess, (x) => f(x).sub(n), fPrime, tolerance, iterations);
}

// src/classes/numericalAnalysis/sum.ts
function calculateSumLoop(f, b, a = Decimal.dZero, epsilon = DEFAULT_TOLERANCE) {
  let sum = Decimal.dZero;
  let n = Decimal.fromValue_noAlloc(b);
  for (; n.gte(a); n = n.add(Decimal.dNegOne)) {
    const initSum = sum;
    const value = f(n);
    sum = sum.add(value);
    if (geometricEqualsTolerance(initSum, sum, epsilon)) break;
  }
  return sum;
}
function calculateSumApprox(f, b, a = Decimal.dZero, iterations = DEFAULT_ITERATIONS - 10, bSubA) {
  a = Decimal.fromValue_noAlloc(a);
  b = Decimal.fromValue_noAlloc(b);
  let sum = Decimal.dZero;
  const intervalWidth = bSubA ? bSubA.div(iterations) : b.sub(a).div(iterations);
  let currentSample = b;
  for (let i = iterations - 1; i >= 0; i--) {
    const oldSum = sum;
    currentSample = currentSample.sub(intervalWidth);
    sum = sum.add(f(currentSample));
    if (geometricEqualsTolerance(oldSum, sum)) break;
  }
  return sum.mul(intervalWidth);
}
function calculateSum(f, b, a = Decimal.dZero, epsilon, iterations) {
  a = Decimal.fromValue_noAlloc(a);
  b = Decimal.fromValue_noAlloc(b);
  const bMinusA = b.sub(a);
  if (bMinusA.lte(DEFAULT_ITERATIONS_AS_DECIMAL)) {
    return calculateSumLoop(f, b, a, epsilon);
  } else {
    return calculateSumApprox(f, b, a, iterations, bMinusA);
  }
}

// src/E/DecimalArray.ts
var DecimalArray = class {
  /**
   * Creates a new DecimalArray with the specified size.
   * @param size - The number of Decimals to store in the array.
   * @param maxLayerThatCouldBeStored - The maximum layer that could be stored in the array.
   * This is used to determine the appropriate type for the layerAndSignArray.
   */
  constructor(size, maxLayerThatCouldBeStored = Infinity) {
    this.length = size;
    this.layerAndSignArray = new Int8Array(0);
    this.layerAndSignArrayType = 126 /* int8Array */;
    this.resizeLayerAndSignArray(maxLayerThatCouldBeStored);
    this.magArray = new Float64Array(size);
  }
  resizeLayerAndSignArray(maxLayerThatCouldBeStored = Infinity, fillFromExisting = true) {
    let newLayerAndSignArray;
    maxLayerThatCouldBeStored = Math.abs(maxLayerThatCouldBeStored);
    if (maxLayerThatCouldBeStored <= 126 /* int8Array */) {
      newLayerAndSignArray = new Int8Array(this.length);
      this.layerAndSignArrayType = 126 /* int8Array */;
    } else if (maxLayerThatCouldBeStored <= 32766 /* int16Array */) {
      newLayerAndSignArray = new Int16Array(this.length);
      this.layerAndSignArrayType = 32766 /* int16Array */;
    } else if (maxLayerThatCouldBeStored <= 2147483646 /* int32Array */) {
      newLayerAndSignArray = new Int32Array(this.length);
      this.layerAndSignArrayType = 2147483646 /* int32Array */;
    } else {
      newLayerAndSignArray = new Float64Array(this.length);
      this.layerAndSignArrayType = Infinity /* float64Array */;
    }
    if (fillFromExisting) {
      newLayerAndSignArray.set(this.layerAndSignArray);
    }
    this.layerAndSignArray = newLayerAndSignArray;
  }
  // TODO: rename
  resize(newSize) {
    const wouldOverflow = newSize < this.length;
    this.length = newSize;
    const oldMagArray = this.magArray;
    const oldLayerArray = this.layerAndSignArray;
    this.magArray = new Float64Array(newSize);
    this.resizeLayerAndSignArray(this.layerAndSignArrayType, !wouldOverflow);
    if (!wouldOverflow) {
      this.magArray.set(oldMagArray);
    } else {
      for (let i = 0; i < newSize; i++) {
        this.magArray[i] = oldMagArray[i];
        this.layerAndSignArray[i] = oldLayerArray[i];
      }
    }
  }
  /**
   * Modifies the existing Decimal at the given index to have the same value as the Decimal at the given index.
   * @param index - The index of the Decimal to get.
   * @param existingDecimal - The Decimal to modify.
   */
  getIntoExisting(index, existingDecimal) {
    if (index < 0 || index >= this.length) {
      console.warn(
        `eMath.js: Attempted to access index ${index} of DecimalArray of length ${this.length}. Returning NaN Decimal.`,
        { index, length: this.length, array: this }
      );
      existingDecimal.fromDecimal(Decimal.dNaN);
      return;
    }
    const layerAndSign = this.layerAndSignArray[index];
    const mag = this.magArray[index];
    const layer = layerAndSign === 0 ? 0 : Math.abs(layerAndSign) - 1;
    const sign = Math.sign(layerAndSign);
    existingDecimal.fromComponents_noNormalize(sign, layer, mag);
  }
  /**
   * Gets the Decimal at the given index.
   * @param index - The index of the Decimal to get.
   * @returns A new Decimal with the same value as the Decimal at the given index.
   */
  get(index) {
    const out = new Decimal();
    this.getIntoExisting(index, out);
    return out;
  }
  /**
   * Sets the Decimal at the given index to have the same value as the given Decimal.
   * @param index - The index of the Decimal to set.
   * @param decimal - The Decimal to set the value to.
   */
  set(index, decimal) {
    if (Math.abs(decimal.layer) > this.layerAndSignArrayType) {
      this.resizeLayerAndSignArray(decimal.layer);
    }
    this.layerAndSignArray[index] = decimal.sign === 0 ? 0 : (decimal.layer + 1) * decimal.sign;
    this.magArray[index] = decimal.mag;
  }
  /**
   * Compares the Decimal at the given index with the given Decimal.
   * Equal to `this.get(index).cmp(decimalToCompare)`, but more efficient because it doesn't create a new Decimal instance.
   * @param index - The index of the Decimal to compare.
   * @param decimalToCompare - The Decimal to compare with.
   * @returns -1 if the Decimal at the given index is less than the given Decimal, 0 if they are equal, and 1 if the Decimal at the given index is greater than the given Decimal.
   */
  compareAt(index, decimalToCompare) {
    const layerAndSign = this.layerAndSignArray[index];
    const mag = this.magArray[index];
    const layer = layerAndSign === 0 ? 0 : Math.abs(layerAndSign) - 1;
    const sign = Math.sign(layerAndSign);
    if (sign > decimalToCompare.sign) {
      return 1;
    }
    if (sign < decimalToCompare.sign) {
      return -1;
    }
    const normalizedSignedLayerA = mag > 0 ? layer : -layer;
    const normalizedSignedLayerB = decimalToCompare.mag > 0 ? decimalToCompare.layer : -decimalToCompare.layer;
    if (normalizedSignedLayerA > normalizedSignedLayerB) {
      return sign;
    }
    if (normalizedSignedLayerA < normalizedSignedLayerB) {
      return -sign;
    }
    if (mag > decimalToCompare.mag) {
      return sign;
    }
    if (mag < decimalToCompare.mag) {
      return -sign;
    }
    return 0;
  }
  /**
   * Binary searches for the given Decimal in the array.
   * Assumes the array is sorted in ascending order.
   * @param decimalToSearch - The Decimal to search for.
   * @returns The index of the Decimal if found, or an `integerIndex` + 0.5 if not found, where the `integerIndex` is the index of the largest Decimal in the array that is less than the given Decimal.
   */
  search(decimalToSearch) {
    let low = 0;
    let high = this.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const comparison = this.compareAt(mid, decimalToSearch);
      if (comparison === 0) {
        return mid;
      }
      if (comparison < 0) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return low - 0.5;
  }
  /**
   * @returns An iterator over the Decimals in the array.
  //  * Important: This method reuses the same Decimal instance for each value in the array.
  //  * If a reference to a Decimal in the array needs to be stored, it should be cloned first before storing the reference.
   */
  [Symbol.iterator]() {
    let index = 0;
    const size = this.layerAndSignArray.length;
    return {
      next: () => {
        if (index < size) {
          return { value: this.get(index++), done: false };
        } else {
          return { value: void 0, done: true };
        }
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  }
};

// src/classes/UpgradeCostTreeMap.ts
var CachedUpgradeTreeNode = class _CachedUpgradeTreeNode {
  /**
   * Creates a new CachedUpgradeTreeNode with the given level and cost.
   * @param level - The level of the upgrade at this node.
   * @param cost - The cost of the upgrade at this node.
   * @param costAtLevel - The cost of the upgrade at this node, calculated at the given level.
   */
  constructor(level = Decimal.dZero, cost = Decimal.dZero, costAtLevel = Decimal.dZero) {
    this.level = Decimal.fromValue_noAlloc(level);
    this.accumulatedCost = Decimal.fromValue_noAlloc(cost);
    this.costAtLevel = Decimal.fromValue_noAlloc(costAtLevel);
  }
  populate(targetDepth, generatorCostFn, lowerBound, upperBound, currentDepth = 1) {
    if (currentDepth >= targetDepth) {
      generatorCostFn.next(this);
      return;
    }
    this.left = new _CachedUpgradeTreeNode();
    this.left.populate(targetDepth, generatorCostFn, lowerBound, this, currentDepth + 1);
    generatorCostFn.next(this);
    this.right = new _CachedUpgradeTreeNode();
    this.right.populate(targetDepth, generatorCostFn, this, upperBound, currentDepth + 1);
  }
  /**
   * @param lookupMode - The mode to use for looking up the value.
   * @returns The value to look up based on the given lookup mode.
   */
  getLookupValue(lookupMode) {
    switch (lookupMode) {
      // case LookupMode.level:
      // default:
      //     return this.level;
      case 0 /* accumulatedCost */:
        return this.accumulatedCost;
      case 1 /* costAtLevel */:
        return this.costAtLevel;
    }
  }
};
var CachedUpgradeLookupMode = /* @__PURE__ */ ((CachedUpgradeLookupMode2) => {
  CachedUpgradeLookupMode2[CachedUpgradeLookupMode2["accumulatedCost"] = 0] = "accumulatedCost";
  CachedUpgradeLookupMode2[CachedUpgradeLookupMode2["costAtLevel"] = 1] = "costAtLevel";
  return CachedUpgradeLookupMode2;
})(CachedUpgradeLookupMode || {});
var LowerCachedUpgradeLookup = class _LowerCachedUpgradeLookup {
  constructor() {
    /**
     * Stores the accumulated cost to reach each level from the default level.
     */
    this.accumulatedCostArray = _LowerCachedUpgradeLookup.initialPlaceholderDecimalArray;
    /**
     * Stores the cost at each level from the default level. The cost at index 0 corresponds to the cost at defaultLevel + 1, index 1 corresponds to defaultLevel + 2, and so on.
     */
    this.costAtLevelArray = _LowerCachedUpgradeLookup.initialPlaceholderDecimalArray;
    /**
     * The level at which to start caching. The cost at index 0 of the arrays corresponds to the cost at this level + 1.
     */
    this.defaultLevel = Decimal.dZero;
  }
  static {
    /**
     * A placeholder DecimalArray used to initialize the accumulatedCostArray and costAtLevelArray properties before they are populated with actual values in the fill method.
     */
    this.initialPlaceholderDecimalArray = new DecimalArray(0);
  }
  /**
   * Fills the cache with the accumulated costs and costs at each level for a given size, cost function, and default level.
   * @param size - The number of levels to cache.
   * @param costFn - A function that takes a level and returns the cost to reach that level.
   * @param defaultLevel - The level at which to start caching. Defaults to 0.
   */
  fill(size, costFn, defaultLevel = Decimal.dZero) {
    defaultLevel = Decimal.fromValue_noAlloc(defaultLevel);
    this.defaultLevel = defaultLevel;
    const upperBoundCost = costFn(defaultLevel.add(size));
    this.accumulatedCostArray = new DecimalArray(size, upperBoundCost.layer);
    this.costAtLevelArray = new DecimalArray(size, upperBoundCost.layer);
    let currentAccumulatedCost = Decimal.dZero;
    for (let i = 0; i < size; i++) {
      const level = defaultLevel.add(i);
      const costAtLevel = costFn(level);
      currentAccumulatedCost = currentAccumulatedCost.add(costAtLevel);
      this.accumulatedCostArray.set(i, currentAccumulatedCost);
      this.costAtLevelArray.set(i, costAtLevel);
    }
  }
  /**
   * @returns Whether the cache has been populated with values (ie {@link fill} has been called).
   */
  hasBeenPopulated() {
    return this.accumulatedCostArray.length > 0 && this.costAtLevelArray.length > 0;
  }
  /**
   * @param index - The index of the level to get. 0 corresponds to the default level + 1.
   * @returns The level at the given index.
   */
  getLevelFromIndex(index) {
    return this.defaultLevel.add(index + 1);
  }
  /**
   * Looks up the cache for the given level or cost and returns the closest levels that are less than or equal to and greater than or equal to the given value.
   * @param x - The level or cost to look up.
   * @param lookupMode - The mode to use for looking up the value. Defaults to {@link CachedUpgradeLookupMode.accumulatedCost}.
   * @returns An object containing the closest levels that are less than or equal to and greater than or equal to the given value.
   */
  lookUp(x, lookupMode = 0 /* accumulatedCost */) {
    x = Decimal.fromValue_noAlloc(x);
    const arrayToSearch = lookupMode === 0 /* accumulatedCost */ ? this.accumulatedCostArray : this.costAtLevelArray;
    const result = arrayToSearch.search(x);
    return {
      lowerNode: this.getLevelFromIndex(Math.floor(result)),
      upperNode: this.getLevelFromIndex(Math.ceil(result))
    };
  }
  /**
   * Looks up the cache for the cost at the given level.
   * @param level - The level to look up the cost for.
   * @param lookupMode - The mode to use for looking up the value. Defaults to {@link CachedUpgradeLookupMode.accumulatedCost}.
   * @returns The cost at the given level, or 0 if the level is out of bounds of the cache.
   */
  getCostAtLevel(level, lookupMode = 0 /* accumulatedCost */) {
    level = Decimal.fromValue_noAlloc(level);
    const index = level.sub(this.defaultLevel).toNumber() - 1;
    if (index < 0 || index >= this.costAtLevelArray.length) {
      return Decimal.dZero;
    }
    if (lookupMode === 0 /* accumulatedCost */) {
      return this.accumulatedCostArray.get(index);
    } else {
      return this.costAtLevelArray.get(index);
    }
  }
  /**
   * Checks if the given level or cost is within the bounds of the cache.
   * @param x - The level or cost to check.
   * @param lookupMode - The mode to use for looking up the value. Defaults to {@link CachedUpgradeLookupMode.accumulatedCost}.
   * @returns Whether the given level or cost is within the bounds of the cache.
   */
  isWithinBounds(x, lookupMode = 0 /* accumulatedCost */) {
    x = Decimal.fromValue_noAlloc(x);
    if (lookupMode === 0 /* accumulatedCost */) {
      const accumulatedCostAtLevel = this.accumulatedCostArray.get(this.accumulatedCostArray.length - 1);
      return x.lte(accumulatedCostAtLevel);
    } else {
      const costAtLevelAtLevel = this.costAtLevelArray.get(this.costAtLevelArray.length - 1);
      return x.lte(costAtLevelAtLevel);
    }
  }
  /**
   * @returns The maximum level that can be reached with the current cache based on the {@link defaultLevel} and the length of the {@link costAtLevelArray}.
   */
  getMaxLevel() {
    return this.getLevelFromIndex(this.costAtLevelArray.length - 1);
  }
};

// src/classes/Upgrade.ts
var UpgradeData = class {
  constructor() {
    this.level = new Decimal(Decimal.dZero);
  }
  static {
    /**
     * A placeholder readonly upgrade data object that returns a level of 0.
     */
    this.placeholderUpgradeData = new class {
      get level() {
        return new Decimal(Decimal.dZero);
      }
      set level(level) {
        console.warn(
          "eMath.js: Attempted to set level on placeholder upgrade data. Possibly Upgrade dataSupplier has not been set yet."
        );
      }
    }();
  }
};
__decorateClass([
  (0, import_class_transformer3.Type)(() => Decimal)
], UpgradeData.prototype, "level", 2);
var Upgrade = class _Upgrade {
  /**
   * Creates a new upgrade object with the given id.
   * @param id - The {@link id} of the upgrade.
   */
  constructor(id) {
    /**
     * The name of the upgrade. Defaults to the ID.
     */
    this.name = "";
    /**
     * The cost of upgrades at a certain level.
     * - Should evaluate to a non-negative number for all levels above 0.
     * - Should be continuous for all levels above {@link lowerCache}'s {@link LowerCachedUpgradeLookup.getMaxLevel}. Non integer arguments to {@link level} will be passed to this function when calculating above the lower cache levels.
     * - Should be deterministic for cache calculations to work. If the cost function is not deterministic (not recommended), you should disable the cache by calling {@link withCacheSize} with `null` as the argument.
     *
     * Also, if you do not set your own `costBulk` function, the function should always be greater than the level.
     * @param level - The CURRENT (not next) level of the upgrade.
     * @returns The cost of the upgrade.
     * @example
     * // A cost function that returns twice the level.
     * (level) => level.mul(2)
     */
    this.cost = () => Decimal.dOne;
    /**
     * The maximum level of the upgrade.
     * If not set, the upgrade will have a maximum level of `Infinity` and can continue to increase indefinitely.
     */
    this.maxLevel = Decimal.dInf;
    /**
     * The effect of the upgrade. This runs when the upgrade is bought, and instantly if `runEffectInstantly` is true.
     * @param level - The current level of the upgrade.
     * @param upgradeContext - The upgrade object that the effect is being run on.
     * @param currencyContext - The currency static class that the upgrade is being run on.
     */
    this.effect = () => {
    };
    /**
     * The effect that runs only once when the upgrade is added to the data manager.
     * @param upgradeContext - The upgrade object that the effect is being run on.
     * @param currencyContext - The currency object that the upgrade is being run on.
     */
    this.effectOnAdd = () => {
    };
    /**
     * Endless / Everlasting: Flag for this upgrade to not take away currency when bought.
     * When buying max, the level would be set to the highest level that can be bought with the current currency.
     *
     * A function value is also allowed, and will be evaluated when the upgrade is bought or calculated.
     */
    this.el = false;
    /**
     * The level to set this upgrade when it is reset in {@link Currency.reset}.
     */
    this.defaultLevel = Decimal.dZero;
    /**
     * The protections for {@link level}.
     * @see {@link InvalidDecimalProtections}.
     */
    this.levelProtections = new InvalidDecimalProtections({
      allowNaN: false,
      allowInfinite: false,
      allowNegative: false
    });
    /**
     * The lower cache for the upgrade.
     * @see {@link LowerCachedUpgradeLookup}.
     */
    this.lowerCache = new LowerCachedUpgradeLookup();
    /**
     * @returns A reference to the data of the upgrade.
     * Before this upgrade is added to the data manager ({@link onAddToDataManager}) (can occur when the upgrade is initialized/{@link effectOnAdd} is called),
     * this will return the {@link UpgradeData.placeholderUpgradeData} object.
     */
    this.dataSupplier = () => UpgradeData.placeholderUpgradeData;
    /**
     * @returns A reference to the currency object that the upgrade is being run on.
     * Before this upgrade is added to the data manager ({@link onAddToDataManager}) (can occur when the upgrade is initialized/{@link effectOnAdd} is called),
     * this will return the {@link Currency.placeholderCurrency} object.
     */
    this.currencySupplier = () => Currency.placeholderCurrency;
    /**
     * @returns A description of the upgrade based on this upgrade and its currency.
     * Not used internally, but you can use it to display a description.
     * @param upgradeContext - The upgrade object that the description is being run on.
     * @param currencyContext - The currency object that the upgrade is being run on.
     * @example
     * const description = (upgrade) => `This upgrade is at level ${upgrade.level}`;
     *
     * const upgrade = new Upgrade(...);
     *
     * // Buy a level of the upgrade
     * upgrade.buyOne();
     *
     * // Getter property
     * console.log(upgrade.description); // "This upgrade is at level 1"
     */
    this.descriptionSupplier = () => "";
    /**
     * A {@link SubscribableDataEntry} for the {@link level} of this upgrade.
     * @see {@link SubscribableDataEntry}
     */
    this.levelDataEntry = SubscribableDataEntry.fromGetterSetter(
      () => this.level,
      (newLevel) => {
        this.level = newLevel;
      },
      false
    );
    this.id = id;
    this.name = id;
  }
  /**
   * A helper function to generate a costBulk function for upgrades with a non-scaling cost (cost is independent of the level).
   * @param cost - The cost of the upgrade.
   * @returns A costBulk function that can be used in the upgrade object.
   */
  static getCostBulkForNonScalingUpgrade(cost) {
    cost = new Decimal(cost);
    return (currencyValue, level, target) => {
      const amountBuyable = currencyValue.div(cost).floor().clamp(Decimal.dZero, target);
      return [amountBuyable, amountBuyable.mul(cost)];
    };
  }
  static {
    /**
     * The default size of the {@link lowerCache} when it is first created. Can be changed with {@link withCacheSize}.
     * @default 10000
     */
    this.defaultCacheSize = 1e4;
  }
  /**
   * @returns A reference to the data of the upgrade.
   * @see {@link dataSupplier}
   */
  get data() {
    return this.dataSupplier();
  }
  /**
   * @returns A reference to the currency object that the upgrade is being run on.
   * @see {@link currencySupplier}
   */
  get currency() {
    return this.currencySupplier();
  }
  /**
   * @returns A description of the upgrade.
   * @see {@link descriptionSupplier}
   */
  get description() {
    return this.descriptionSupplier(this, this.currencySupplier());
  }
  /**
   * The current level of the upgrade.
   * @returns The current level of the upgrade.
   */
  get level() {
    return this.data.level;
  }
  set level(level) {
    this.data.level = this.levelProtections.validateValueOrElse(
      level,
      this.data.level,
      `Upgrade "${this.id}" level`,
      this
    );
  }
  /**
   * @returns Whether this upgrade is currently el.
   * @see {@link el}
   */
  isEl() {
    return typeof this.el === "function" ? this.el() : this.el;
  }
  /**
   * Calls the {@link effect} function with the arguments for this and the currency.
   */
  runEffect() {
    this.effect(this.level, this, this.currency);
  }
  /**
   * Calls the {@link runEffectOnAdd} function with the arguments for this and the currency.
   */
  runEffectOnAdd() {
    this.effectOnAdd(this, this.currency);
  }
  /**
   * Called when the upgrade is added to the data manager.
   * Sets the {@link dataSupplier} and {@link currencySupplier} functions to return the correct data and currency.
   * @param dataManager - The data manager that the upgrade is being added to.
   * @param prefix - An optional prefix to add to the data key. If not provided, the data key will be the same as the upgrade id. If provided, the data key will be `${prefix}_${id}`.
   */
  onAddToDataManager(dataManager, prefix) {
    const dataKey = `${prefix ? prefix + "_" : ""}${this.id}`;
    this.dataSupplier = dataManager.setData(dataKey, new UpgradeData());
    if (this.lowerCache && !this.lowerCache.hasBeenPopulated()) {
      this.withCacheSize(_Upgrade.defaultCacheSize);
    }
  }
  /**
   * Called when the upgrade data is loaded from the data manager.
   */
  onLoadData() {
    this.level = this.data.level;
  }
  /**
   * @returns The cost to buy the next upgrade. Equal to the {@link cost} evaluated at the current {@link level}.
   */
  getNextCost() {
    return this.cost(this.level);
  }
  /**
   * Calculates the cost and how many upgrades you can buy.
   * If the {@link endLevel} is within the {@link lowerCache} bounds, it will use the {@link lowerCache} to calculate the cost and amount significantly faster.
   * Otherwise, it will use {@link calculateInverseFunction} and {@link calculateSum} (if applicable) to calculate the cost and amount.
   *
   * The priority is:
   * 1. `target === 1`: buy one, manual check next cost
   * 2. {@link costBulk} exists: use it
   * 3. `lowerCache.isWithinBounds()`: look up in cache
   * 4. `el === true`: use {@link calculateInverseFunction}
   * 5. Otherwise: use {@link calculateInverseFunction} and {@link calculateSum}.
   *
   * - For {@link endLevel}s within the {@link lowerCache} bounds, this function has a max time complexity of O(log(n)) where n is the size of the {@link lowerCache}.
   * - For sum upgrades, this function has a max time complexity of O(n^2) where n is the number of iterations ({@link maxUpperIterations}).
   * - For el upgrades, this function has a max time complexity of O(n) where n is the number of iterations ({@link maxUpperIterations}).
   * @param value - The current value of the currency. Defaults to the current value of the currency.
   * @param startLevel - The starting level of the upgrade. Defaults the current level of the upgrade.
   * @param endLevel - The ending level or quantity to reach for the upgrade. If not provided, it will buy the maximum amount of upgrades possible (using target = Infinity).
   * @param meanMode - The mode/mean method to use. See {@link MeanMode}
   * @param maxUpperIterations - The amount of iterations to perform. Defaults to `15`.
   * @returns a {@link UpgradeCalculationResult} or [amount, cost] - Returns the amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [0, 0].
   * @see {@link UpgradeCalculationResult}
   */
  calculate(value = this.currency.value, startLevel = this.level, endLevel = Decimal.dInf, meanMode, maxUpperIterations) {
    value = Decimal.fromValue_noAlloc(value);
    startLevel = Decimal.fromValue_noAlloc(startLevel);
    endLevel = Decimal.fromValue_noAlloc(endLevel).min(this.maxLevel);
    if (startLevel.gte(endLevel)) {
      return [this.level, Decimal.dZero];
    }
    const currentLevel = this.level;
    const targetDifference = endLevel.sub(startLevel);
    if (targetDifference.lt(Decimal.dZero)) {
      console.warn("eMath.js: Invalid target for calculateItem: ", targetDifference);
      return [currentLevel, Decimal.dZero];
    }
    const el = this.isEl();
    if (targetDifference.eq(Decimal.dOne)) {
      const cost2 = this.cost(this.level);
      const canAfford = value.gte(cost2);
      let out = [Decimal.dZero, Decimal.dZero];
      if (el) {
        out[0] = canAfford ? currentLevel.add(Decimal.dOne) : currentLevel;
        return out;
      } else {
        out = [canAfford ? currentLevel.add(Decimal.dOne) : currentLevel, canAfford ? cost2 : Decimal.dZero];
        return out;
      }
    }
    if (this.costBulk) {
      const [amount, cost2] = this.costBulk(value, startLevel, targetDifference);
      const canAfford = value.gte(cost2);
      const out = [
        canAfford ? amount : currentLevel,
        canAfford && !el ? cost2 : Decimal.dZero
      ];
      return out;
    }
    const lookupMode = el ? 1 /* costAtLevel */ : 0 /* accumulatedCost */;
    const adjustment = !el ? this.lowerCache ? this.lowerCache.getCostAtLevel(startLevel, 0 /* accumulatedCost */) : calculateSum(this.cost, startLevel, Decimal.dZero) : Decimal.dZero;
    const adjustedCurrencyValue = !el ? value.add(adjustment) : value;
    if (this.lowerCache && this.lowerCache.isWithinBounds(value, lookupMode)) {
      const lookupResult = this.lowerCache.lookUp(adjustedCurrencyValue, lookupMode);
      const resultLevel = lookupResult.lowerNode.min(endLevel);
      const cost2 = el ? Decimal.dZero : this.lowerCache.getCostAtLevel(resultLevel).sub(adjustment);
      return [resultLevel, cost2];
    }
    if (this.lowerCache && this.lowerCache.getMaxLevel().gte(this.maxLevel)) {
      const resultLevel = this.lowerCache.getMaxLevel().min(endLevel);
      const cost2 = el ? Decimal.dZero : this.lowerCache.getCostAtLevel(resultLevel).sub(adjustment);
      return [resultLevel, cost2];
    }
    const bounds = this.bounds ? this.bounds(adjustedCurrencyValue) : [Decimal.dZero, adjustedCurrencyValue];
    if (el) {
      const maxLevelAffordable2 = calculateInverseFunction(this.cost, value, {
        mode: meanMode,
        iterations: maxUpperIterations,
        lowerBound: bounds[0],
        upperBound: bounds[1]
      }).value.min(endLevel).floor();
      const cost2 = Decimal.dZero;
      return [maxLevelAffordable2, cost2];
    }
    const maxLevelAffordable = calculateInverseFunction(
      (x) => calculateSum(this.cost, x, Decimal.dZero),
      adjustedCurrencyValue,
      {
        mode: meanMode,
        iterations: maxUpperIterations,
        lowerBound: bounds[0],
        upperBound: bounds[1]
      }
    ).value.floor().clamp(Decimal.dZero, endLevel);
    const cost = calculateSum(this.cost, maxLevelAffordable, Decimal.dZero, void 0, DEFAULT_ITERATIONS).sub(
      adjustment
    );
    return [maxLevelAffordable, cost];
  }
  /**
   * Calculates the cost and how many upgrades you can buy with an end level that is the current level plus the {@link additiveLevelTarget}.
   * @param additiveLevelTarget - The additive level target to add to the current level.
   * @returns a {@link UpgradeCalculationResult}.
   * @see {@link calculate}
   */
  calculateWithAdditiveLevelTarget(additiveLevelTarget) {
    return this.calculate(void 0, void 0, this.level.add(additiveLevelTarget));
  }
  /**
   * Calculates the cost of the next upgrade after the maximum affordable quantity.
   * @param calculationResult - The result of {@link calculate}. If not provided, it will calculate it using the current currency value and level.
   * @returns The cost of the next upgrade. Equal to the cost of the upgrade at the level of `amountAffordable` plus the cost of the next upgrade
   * @example
   * // Calculate the cost of the next healthBoost upgrade
   * currency.gain(1e6); // Gain 1 thousand currency
   * console.log(currency.calculateUpgrade("healthBoost")); // The maximum affordable quantity and the cost of the upgrades. Ex. [new Decimal(100), new Decimal(1000)]
   * console.log(currency.getCumulativeSubsequentCost("healthBoost")); // The cost of the next upgrade after the maximum affordable quantity. (The cost of the 101st upgrade)
   */
  getCumulativeSubsequentCost(calculationResult = this.calculate()) {
    const nextCost = this.cost(calculationResult[0]).add(calculationResult[1]);
    return nextCost;
  }
  /**
   * Buys an upgrade based on its ID or array position if enough currency is available.
   * @param calculationResult - The result of {@link Upgrade.calculate}. If not provided, it will calculate it using the current currency value and level.
   * @returns Returns true if the purchase or upgrade is successful, or false if a level cannot be bought or the new level is less than the current level.
   * @example
   * // Attempt to buy up to 10 healthBoost upgrades at once
   * currency.buyUpgrade("healthBoost", 10);
   */
  buyMax(calculationResult = this.calculate()) {
    const [newLevel, cost] = calculationResult;
    if (newLevel.lte(this.level)) {
      return false;
    }
    this.currency.value = this.currency.value.sub(cost);
    this.level = newLevel;
    this.runEffect();
    return true;
  }
  /**
   * Buys one upgrade if enough currency is available.
   * @returns Returns true if enough currency is available and the 1 upgrade is bought, or false if there is not enough currency.
   */
  buyOne() {
    return this.buyMax(this.calculate(void 0, void 0, this.level.add(Decimal.dOne)));
  }
  // Chainable setters
  /**
   * A helper function to set the cost and costBulk functions for upgrades with a non-scaling cost (cost is independent of the level).
   * Functions same as the former `Item` from versions before v10.
   * @param cost - The cost of the upgrade.
   * @returns The upgrade object with the cost and costBulk functions set. The costBulk function is generated using {@link getCostBulkForNonScalingUpgrade}.
   */
  asNonScalingUpgrade(cost) {
    cost = new Decimal(cost);
    this.cost = () => cost;
    this.costBulk = _Upgrade.getCostBulkForNonScalingUpgrade(cost);
    return this;
  }
  /**
   * Sets the size or disables the lower cache for the upgrade.
   * @param cacheSize - The size of the lower cache. If `null`, the lower cache will be disabled.
   * @returns this
   */
  withCacheSize(cacheSize) {
    if (cacheSize === null) {
      this.lowerCache = null;
      return this;
    }
    this.lowerCache = new LowerCachedUpgradeLookup();
    this.lowerCache.fill(Math.min(this.maxLevel.toNumber(), cacheSize), this.cost, this.defaultLevel);
    return this;
  }
  /**
   * Changes the {@link levelProtections} options for this upgrade.
   * Equivalent to calling {@link InvalidDecimalProtections.setProtections} on the {@link levelProtections} object.
   * @param newLevelProtections - The new level protections to set.
   * @returns this
   */
  withLevelProtectionOptions(newLevelProtections) {
    this.levelProtections.setProtections(newLevelProtections);
    return this;
  }
  /* eslint-disable jsdoc/require-param, jsdoc/require-returns */
  /** @see {@link Upgrade.prototype.name} */
  withName(name) {
    this.name = name;
    return this;
  }
  /** @see {@link Upgrade.cost} */
  withCost(cost) {
    this.cost = cost;
    return this;
  }
  /** @see {@link Upgrade.costBulk} */
  withCostBulk(costBulk) {
    this.costBulk = costBulk;
    return this;
  }
  /** @see {@link Upgrade.maxLevel} */
  withMaxLevel(maxLevel) {
    this.maxLevel = maxLevel;
    return this;
  }
  /** @see {@link Upgrade.effect} */
  withEffect(effect) {
    this.effect = effect;
    return this;
  }
  /** @see {@link Upgrade.effectOnAdd} */
  withEffectOnAdd(effectOnAdd) {
    this.effectOnAdd = effectOnAdd;
    return this;
  }
  /** @see {@link Upgrade.el} */
  withEl(el) {
    this.el = el;
    return this;
  }
  /** @see {@link Upgrade.bounds} */
  withBounds(bounds) {
    this.bounds = bounds;
    return this;
  }
  /** @see {@link Upgrade.defaultLevel} */
  withDefaultLevel(defaultLevel) {
    this.defaultLevel = defaultLevel;
    return this;
  }
  /** @see {@link Upgrade.descriptionSupplier} */
  withDescriptionSupplier(descriptionSupplier) {
    this.descriptionSupplier = descriptionSupplier;
    return this;
  }
  /** @see {@link Upgrade.currencySupplier} */
  // Internal setter
  withCurrencySupplier(currencySupplier) {
    this.currencySupplier = currencySupplier;
    return this;
  }
  /* eslint-enable jsdoc/require-param, jsdoc/require-returns */
};
var SkillNode = class _SkillNode extends Upgrade {
  static fromUpgrade(upgrade) {
    const out = new _SkillNode(upgrade.id);
    Object.assign(out, upgrade);
    return out;
  }
  withRequirements(requirements) {
    this.requirements = requirements;
    return this;
  }
  /**
   * @returns If this skill is unlocked.
   */
  isUnlocked() {
    if (!this.requirements || this.requirements.length === 0) {
      return true;
    }
    const requiredSkills = typeof this.requirements === "function" ? this.requirements(this.currency, this) : this.requirements;
    if (typeof requiredSkills === "boolean") {
      return requiredSkills;
    }
    return requiredSkills.every((requiredSkill) => {
      if ("skill" in requiredSkill) {
        if (requiredSkill.skill instanceof _SkillNode) {
          return requiredSkill.skill.level.gte(requiredSkill.level) && requiredSkill.skill.isUnlocked();
        }
        return requiredSkill.skill.level.gte(requiredSkill.level);
      }
      return requiredSkill.isUnlocked();
    });
  }
};

// src/classes/Currency.ts
var CurrencyData = class {
  constructor() {
    this.value = new Decimal(Decimal.dZero);
  }
  static {
    /**
     * A placeholder readonly currency data object that returns a value of 0.
     */
    this.placeholderCurrencyData = new class {
      get value() {
        return new Decimal(Decimal.dZero);
      }
      set value(level) {
        console.warn(
          "eMath.js: Attempted to set value on placeholder currency data. Possibly Currency dataSupplier has not been set yet."
        );
      }
    }();
  }
};
__decorateClass([
  (0, import_class_transformer4.Type)(() => Decimal)
], CurrencyData.prototype, "value", 2);
var Currency = class _Currency {
  /**
   * Creates a new currency with the given id.
   * @param id - The {@link id} of the currency.
   */
  constructor(id) {
    /**
     * Stores a list of each of this currency's upgrades and their corresponding data.
     * To get an upgrade, either store a reference to the upgrade when it is created (recommended), or use {@link getUpgrade} to retrieve it by id.
     */
    this.upgrades = [];
    /**
     * @returns A reference to the data.
     */
    this.dataSupplier = () => {
      console.warn("emath.js: Currency dataSupplier has not set. Returning placeholder data.");
      return CurrencyData.placeholderCurrencyData;
    };
    /**
     * A boost that affects the currency gain in {@link gain}.
     * @see {@link Boost}
     */
    this.boost = new Boost();
    /**
     * The default value of the currency when it is {@link reset}.
     * Note: This is not the same as the default value of the currency when it is created, which is always `0`.
     * @see {@link reset}
     */
    this.defaultValue = Decimal.dZero;
    /**
     * The protections for {@link value}.
     * See {@link InvalidDecimalProtections}.
     */
    this.valueProtections = new InvalidDecimalProtections({
      allowNaN: false,
      allowInfinite: false
    });
    /**
     * A {@link SubscribableDataEntry} for the {@link value} of this currency.
     * @see {@link SubscribableDataEntry}
     */
    this.valueDataEntry = SubscribableDataEntry.fromGetterSetter(
      () => this.value,
      (newValue) => {
        this.value = newValue;
      },
      false
    );
    /**
     * A reference to the {@link DataManager} that this currency is added to and where its data is stored.
     * Set when {@link onAddToDataManager} is called.
     */
    this.dataManagerReference = null;
    this.id = id;
  }
  static {
    /**
     * A placeholder currency object that returns a value of 0.
     * Note: This is used for upgrades that are created before the currency is added to the data manager.
     */
    this.placeholderCurrency = (() => {
      const out = new _Currency("placeholderCurrency");
      out.dataSupplier = () => CurrencyData.placeholderCurrencyData;
      return out;
    })();
  }
  /**
   * @returns The pointer of the data.
   */
  get data() {
    return this.dataSupplier();
  }
  /**
   * The current value of the currency.
   * To add value to the currency based on its boost, use {@link gain} instead.
   * @returns The current value of the currency.
   */
  get value() {
    return this.data.value;
  }
  set value(value) {
    this.data.value = this.valueProtections.validateValueOrElse(
      value,
      this.data.value,
      `Currency "${this.id}" value`,
      this
    );
    this.valueDataEntry.notifyListeners();
  }
  onLoadData() {
    this.value = this.data.value;
    for (const upgrade of this.upgrades) {
      upgrade.runEffect();
    }
  }
  onAddToDataManager(dataManager) {
    this.dataManagerReference = dataManager;
    this.dataSupplier = dataManager.setData(this.id, new CurrencyData());
    for (const upgrade of this.upgrades) {
      upgrade.onAddToDataManager(dataManager, this.id);
    }
  }
  reset(resetCurrencyOrResetObj, resetUpgradeLevels, runUpgradeEffect) {
    const resetObj = {
      resetCurrency: true,
      resetUpgradeLevels: true,
      resetItemAmounts: true,
      runUpgradeEffect: true
    };
    if (typeof resetCurrencyOrResetObj === "object") {
      Object.assign(resetObj, resetCurrencyOrResetObj);
    } else {
      Object.assign(resetObj, {
        resetCurrency: resetCurrencyOrResetObj,
        resetUpgradeLevels,
        runUpgradeEffect
      });
    }
    if (resetObj.resetCurrency) this.value = this.defaultValue;
    if (resetObj.resetUpgradeLevels) {
      for (const upgrade of Object.values(this.upgrades)) {
        upgrade.level = new Decimal(upgrade.defaultLevel);
        if (resetObj.runUpgradeEffect) upgrade.runEffect();
      }
    }
  }
  /**
   * Adds to the currency value based on the {@link boost}'s {@link Boost.calculate}d value.
   * @param dtMultiplier - Delta time / multiplier, assuming you gain once every second. Ex. 0.5 = half gain.
   * @returns What was gained, NOT the new value.
   * @example
   * // Gain a random number between 1 and 10, and return the amount gained.
   * currency.gain(Math.random() * 10);
   */
  gain(dtMultiplier) {
    let toAdd = this.boost.calculate();
    if (dtMultiplier) {
      toAdd = toAdd.mul(dtMultiplier);
    }
    this.value = this.value.add(toAdd);
    return toAdd;
  }
  /**
   * Retrieves an upgrade object based on the provided id.
   * It is recommended to store a reference to the upgrade when it is created instead of using this method.
   * @param id - The id of the upgrade to retrieve.
   * @returns The upgrade object if found, otherwise null.
   * @example
   * const upgrade = currency.getUpgrade("healthBoost");
   * console.log(upgrade); // upgrade object
   */
  getUpgrade(id) {
    return this.upgrades.find((upgrade) => upgrade.id === id) ?? null;
  }
  /**
   * Retrieves an upgrade object as a {@link SkillNode} based on the provided id.
   * If the upgrade is not a {@link SkillNode}, it will return null.
   * It is recommended to store a reference to the skill node when it is created instead of using this method.
   * @param id - The id of the upgrade to retrieve.
   * @returns The upgrade object as a {@link SkillNode} if found and is a {@link SkillNode}, otherwise null.
   */
  getUpgradeAsSkillNode(id) {
    const upgrade = this.getUpgrade(id);
    if (!upgrade) {
      return null;
    }
    if (upgrade instanceof SkillNode) {
      return upgrade;
    }
    return null;
  }
  /**
   * Adds an upgrade to the currency and runs its effect if specified.
   * @param upgrade - The upgrade to add.
   * @param runEffectInstantly - Whether to run the effect immediately. Defaults to `true`.
   * @returns The added upgrades.
   * @example
   * const healthBoostUpgrade = currency.addUpgrade(
   *     new Upgrade("healthBoost")
   *         .withName("Health Boost")
   *         .withDescriptionSupplier((upgradeContext) => `Increases health by ${upgradeContext.level.mul(10).format()}.`)
   *         .withCost((level) => level.mul(10))
   *         .withMaxLevel(10)
   *         .withEffect((level, upgradeContext, currencyContext) => {
   *             // Set / update the boost
   *             // health: Currency
   *             health.boost.setBoost(
   *                 new BoostObject("healthBoost")
   *                     .withName("Health Boost")
   *                     .withDescriptionSupplier(() => `Boosts health by x${Decimal.pow(2, level.sub(1)).format()}.`)
   *                     .withValue((n) => n.mul(Decimal.pow(2, level.sub(1))))
   *                     .withOrder(OperationBoostOrder.multiply)
   *             );
   *         }
   * );
   */
  addUpgrade(upgrade, runEffectInstantly = true) {
    if (runEffectInstantly) upgrade.runEffect();
    upgrade.runEffectOnAdd();
    upgrade.withCurrencySupplier(() => this);
    this.upgrades.push(upgrade);
    if (this.dataManagerReference) {
      upgrade.onAddToDataManager(this.dataManagerReference, this.id);
    }
    return upgrade;
  }
  /**
   * Adds multiple upgrades to the currency and runs their effects if specified.
   * @param upgrades - The upgrades to add.
   * @param runEffectInstantly - Whether to run the effects immediately. Defaults to `true`.
   * @returns The added upgrades.
   * @see {@link addUpgrade}
   */
  addUpgrades(upgrades, runEffectInstantly = true) {
    for (const upgrade of upgrades) {
      this.addUpgrade(upgrade, runEffectInstantly);
    }
    return upgrades;
  }
  // Setters
  /**
   * Changes the {@link valueProtections} options for this currency.
   * Equivalent to calling {@link InvalidDecimalProtections.setProtections} on the {@link valueProtections} object.
   * @param newValueProtections - The new value protections to set.
   * @returns this
   */
  withValueProtectionOptions(newValueProtections) {
    this.valueProtections.setProtections(newValueProtections);
    return this;
  }
};

// src/classes/Grid.ts
var GridCell = class {
  /**
   * Initializes a new instance of the grid cell.
   * Note: The properties are copied using object spread to prevent reference sharing. This may break with getters and setters.
   * @param x - The x-coordinate.
   * @param y - The y-coordinate.
   * @param props - The properties to initialize with.
   * @param gridSymbol - The symbol of the grid the cell belongs to.
   */
  constructor(x, y, props = {}, gridSymbol) {
    /** @deprecated Use {@link set} instead. */
    this.setValue = this.set.bind(this);
    /** @deprecated Use {@link get} instead. */
    this.getValue = this.get.bind(this);
    this.x = x;
    this.y = y;
    this.gridSymbol = gridSymbol;
    this.properties = typeof props === "function" ? props(this) : { ...props };
  }
  /** @returns The grid instance the cell belongs to. */
  get grid() {
    return Grid.getInstance(this.gridSymbol);
  }
  /**
   * Sets the value of a property on the cell.
   * @param name - The name of the property.
   * @param value - The value to set.
   * @returns The set value.
   */
  set(name, value) {
    this.properties[name] = value;
    return value;
  }
  /**
   * Gets the value of a property on the cell.
   * @param name - The name of the property.
   * @returns - The value of the property.
   */
  get(name) {
    return this.properties[name];
  }
  // Directions
  /**
   * Gets the cell a specified distance away from the current cell.
   * @param x - The x distance to move
   * @param y - The y distance to move
   * @returns The translated cell
   */
  translate(x = 0, y = 0) {
    return Grid.getInstance(this.gridSymbol).getCell(this.x + x, this.y + y);
  }
  /**
   * Gets the cell in a specific direction from the current cell.
   * @param direction - The direction to move.
   * @param distance - The distance to move. Defaults to 1.
   * @param fill - Whether to fill the cells. Defaults to `false`.
   * @returns - The cell in the specified direction.
   */
  direction(direction, distance = 1, fill) {
    const grid = this.grid;
    const out = (() => {
      switch (direction) {
        case "up":
          return grid.getCell(this.x, this.y - distance);
        case "right":
          return grid.getCell(this.x + distance, this.y);
        case "down":
          return grid.getCell(this.x, this.y + distance);
        case "left":
          return grid.getCell(this.x - distance, this.y);
        case "adjacent":
          return grid.getAdjacent(this.x, this.y, distance, fill);
        case "diagonal":
          return grid.getDiagonal(this.x, this.y, distance, fill);
        case "encircling":
          return grid.getEncircling(this.x, this.y, distance, fill);
        default:
          throw new Error("Invalid direction");
      }
    })();
    return out;
  }
  /**
   * Gets the cell to the right of the current cell. Can be chained.
   * @param distance - The distance to move. Defaults to 1.
   * @returns - The cell to the right.
   */
  up(distance = 1) {
    return this.direction("up", distance);
  }
  /**
   * Gets the cell to the right of the current cell. Can be chained.
   * @param distance - The distance to move. Defaults to 1.
   * @returns - The cell to the right.
   */
  right(distance = 1) {
    return this.direction("right", distance);
  }
  /**
   * Gets the cell below the current cell. Can be chained.
   * @param distance - The distance to move. Defaults to 1.
   * @returns - The cell below.
   */
  down(distance = 1) {
    return this.direction("down", distance);
  }
  /**
   * Gets the cell to the left of the current cell. Can be chained.
   * @param distance - The distance to move. Defaults to 1.
   * @returns - The cell to the left.
   */
  left(distance = 1) {
    return this.direction("left", distance);
  }
};
function validateCoordinates(x, y, isSize = true) {
  const message = isSize ? "Size" : "Coordinates";
  if (typeof x !== "number" || typeof y !== "number") {
    throw new RangeError(`${message} must be numbers: ${x}, ${y}`);
  }
  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    throw new RangeError(`${message} must be integers: ${x}, ${y}`);
  }
  if (x < 0 || y < 0) {
    throw new RangeError(`${message} must be positive: ${x}, ${y}`);
  }
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    throw new RangeError(`${message} must be finite: ${x}, ${y}`);
  }
  if (!Number.isSafeInteger(x) || !Number.isSafeInteger(y)) {
    throw new RangeError(`${message} must be safe integers: ${x}, ${y}`);
  }
}
var GridCellCollection = class _GridCellCollection extends Array {
  /**
   * Initializes a new instance of the grid cell collection.
   * @param cells - The cells to initialize with.
   */
  constructor(cells) {
    cells = Array.isArray(cells) ? cells : [cells];
    cells = cells.filter((cell) => cell !== void 0);
    super(...cells);
    this.removeDuplicates();
  }
  /**
   * Removes duplicate cells from the collection.
   * Modifies the array in place.
   */
  removeDuplicates() {
    const duplicatedIndexes = [];
    this.forEach((cell, index) => {
      if (this.indexOf(cell) !== index) duplicatedIndexes.push(index);
    });
    duplicatedIndexes.forEach((index) => this.splice(index, 1));
  }
  // Directions
  /**
   * Gets the cells a specified distance away from the current cell.
   * @param x - The x distance to move
   * @param y - The y distance to move
   * @returns The translated cells
   */
  translate(x = 0, y = 0) {
    return new _GridCellCollection(this.map((cell) => cell.translate(x, y)));
  }
  /**
   * Gets the cells in a specific direction from the current cells.
   * @param direction - The direction to move.
   * @param distance - The distance to move. Defaults to 1.
   * @param fill - Whether to fill the cells. Defaults to `false`.
   * @returns - The cells in the specified direction.
   */
  direction(direction, distance, fill) {
    return new _GridCellCollection(this.flatMap((cell) => cell.direction(direction, distance, fill)));
  }
  /**
   * Gets the cells above the current cells. Can be chained.
   * @param distance - The distance to move. Defaults to 1.
   * @returns - The cells above.
   */
  up(distance) {
    return this.direction("up", distance);
  }
  /**
   * Gets the cells to the right of the current cells. Can be chained.
   * @param distance - The distance to move. Defaults to 1.
   * @returns - The cells to the right.
   */
  right(distance) {
    return this.direction("right", distance);
  }
  /**
   * Gets the cells below the current cells. Can be chained.
   * @param distance - The distance to move. Defaults to 1.
   * @returns - The cells below.
   */
  down(distance) {
    return this.direction("down", distance);
  }
  /**
   * Gets the cells to the left of the current cells. Can be chained.
   * @param distance - The distance to move. Defaults to 1.
   * @returns - The cells to the left.
   */
  left(distance) {
    return this.direction("left", distance);
  }
  // Other direction
  /**
   * Gets the cells adjacent to the current cells. Can be chained.
   * Note: Can be slow with large collections.
   * @param distance - The distance to move. Defaults to 1.
   * @param fill - Whether to fill the cells. Defaults to `false`.
   * @returns - The cells adjacent.
   */
  adjacent(distance, fill) {
    return this.direction("adjacent", distance, fill);
  }
  /**
   * Gets the cells diagonally from the current cells. Can be chained.
   * Note: Can be slow with large collections.
   * @param distance - The distance to move. Defaults to 1.
   * @param fill - Whether to fill the cells. Defaults to `false`.
   * @returns - The cells diagonally.
   */
  diagonal(distance, fill) {
    return this.direction("diagonal", distance, fill);
  }
  /**
   * Gets the cells encircling the current cells. Can be chained.
   * Note: Can be slow with large collections.
   * @param distance - The distance to move. Defaults to 1.
   * @param fill - Whether to fill the cells. Defaults to `false`.
   * @returns - The cells encircling.
   */
  encircling(distance, fill) {
    return this.direction("encircling", distance, fill);
  }
};
var Grid = class _Grid {
  /**
   * Initializes a new instance of the grid.
   * @param xSize - The size of the grid along the x-axis.
   * @param ySize - The size of the grid along the y-axis. Defaults to `xSize`.
   * @param starterProps - The properties to initialize with.
   */
  constructor(xSize, ySize, starterProps) {
    /** Represents the cells of the grid. */
    this.cells = [];
    /** A symbol to store the grid instance. */
    this.gridSymbol = Symbol();
    /** @deprecated Use {@link getAll} instead. */
    this.all = this.getAll.bind(this);
    /** @deprecated Use {@link getAllX} instead. */
    this.allX = this.getAllX.bind(this);
    /** @deprecated Use {@link getAllY} instead. */
    this.allY = this.getAllY.bind(this);
    /** @deprecated Use {@link getCell} instead. */
    this.get = this.getCell.bind(this);
    /** @deprecated Use {@link setCell} instead. */
    this.set = this.setCell.bind(this);
    _Grid.instances[this.gridSymbol] = this;
    this.starterProps = starterProps ?? {};
    this.xSize = xSize;
    this.ySize = ySize ?? xSize;
    validateCoordinates(this.xSize, this.ySize, true);
    for (let y = 0; y < this.ySize; y++) {
      this.cells[y] = [];
      for (let x = 0; x < this.xSize; x++) {
        this.cells[y][x] = new GridCell(x, y, starterProps, this.gridSymbol);
      }
    }
  }
  static {
    /** A map of grid instances. */
    // private static instances = new Map<symbol, Grid>();
    this.instances = {};
  }
  /**
   * Gets the grid instance with the specified key.
   * @param key - The key of the grid instance.
   * @returns - The grid instance.
   */
  static getInstance(key) {
    return _Grid.instances[key];
  }
  /**
   * Resizes the grid. Merges the cells if the new grid is bigger and truncates the cells if the new grid is smaller.
   * @param xSize - The new size of the grid along the x-axis.
   * @param ySize - The new size of the grid along the y-axis. Defaults to `xSize`.
   */
  resize(xSize, ySize) {
    const oldXSize = this.xSize;
    const oldYSize = this.ySize;
    this.xSize = xSize;
    this.ySize = ySize ?? xSize;
    validateCoordinates(this.xSize, this.ySize, true);
    (() => {
      if (this.ySize === oldYSize) return;
      if (this.ySize < oldYSize) {
        this.cells.length = this.ySize;
      }
      if (this.ySize > oldYSize) {
        for (let y = oldYSize; y < this.ySize; y++) {
          this.cells[y] = [];
          for (let x = 0; x < oldXSize; x++) {
            this.cells[y][x] = new GridCell(x, y, this.starterProps, this.gridSymbol);
          }
        }
      }
    })();
    (() => {
      if (this.xSize === oldXSize) return;
      if (this.xSize < oldXSize) {
        for (let y = 0; y < this.ySize; y++) {
          this.cells[y].length = this.xSize;
        }
      }
      if (this.xSize > oldXSize) {
        for (let y = 0; y < this.ySize; y++) {
          for (let x = oldXSize; x < this.xSize; x++) {
            this.cells[y][x] = new GridCell(x, y, this.starterProps, this.gridSymbol);
          }
        }
      }
    })();
  }
  /**
   * Gets an array containing all cells in the grid.
   * @returns - An array of all cells.
   */
  getAll() {
    return new GridCellCollection(this.cells.flat());
  }
  /**
   * Gets an array containing all cells that have the same x coordinate.
   * @returns - An array of all cells.
   * @param x - The x coordinate to check.
   */
  getAllX(x) {
    const output = [];
    for (let i = 0; i < this.ySize; i++) {
      output.push(this.cells[i][x]);
    }
    return new GridCellCollection(output);
  }
  /**
   * Gets an array containing all cells that have the same y coordinate.
   * @returns - An array of all cells.
   * @param y - The y coordinate to check.
   */
  getAllY(y) {
    return new GridCellCollection(this.cells[y]);
  }
  /**
   * Gets a cell.
   * @template TIsOverflow - Whether to allow overflow. Defaults to `true`. If `false`, the cell can exist or be `undefined`.
   * @param x - The x coordinate to check.
   * @param y - The y coordinate to check.
   * @param overflow - Whether to allow overflow. Defaults to `true`.
   * @returns - The cell.
   */
  getCell(x, y, overflow = true) {
    x = overflow ? (x + this.xSize) % this.xSize : x;
    y = overflow ? (y + this.ySize) % this.ySize : y;
    let out;
    try {
      out = this.cells[y][x];
    } catch (error) {
      return void 0;
    }
    if (!out) return void 0;
    return out;
  }
  /**
   * Sets the value of a cell in the grid.
   * @param x The x-coordinate of the cell.
   * @param y The y-coordinate of the cell.
   * @param value The value to set for the cell.
   */
  setCell(x, y, value) {
    this.cells[y][x] = value;
  }
  /**
   * Gets an array containing all cells orthogonally adjacent to a specific cell.
   * @param x - The x coordinate to check.
   * @param y - The y coordinate to check.
   * @param distance - The distance to check. Defaults to `1`.
   * @param fill - Whether to fill the adjacent cells. Defaults to `false`.
   * @param overflow - Whether to allow overflow. Defaults to `true`.
   * @returns - An array of all cells.
   */
  getAdjacent(x, y, distance = 1, fill = false, overflow = true) {
    if (distance === 1) {
      return new GridCellCollection([
        this.getCell(x, y + 1, overflow),
        this.getCell(x + 1, y, overflow),
        this.getCell(x, y - 1, overflow),
        this.getCell(x - 1, y, overflow)
      ]);
    }
    if (!fill) {
      return new GridCellCollection([
        this.getCell(x, y + distance, overflow),
        this.getCell(x + distance, y, overflow),
        this.getCell(x, y - distance, overflow),
        this.getCell(x - distance, y, overflow)
      ]);
    }
    const output = [this.getCell(x, y)];
    for (let i = 1; i <= distance; i++) {
      output.push(
        ...new GridCellCollection([
          this.getCell(x, y + i, overflow),
          this.getCell(x + i, y, overflow),
          this.getCell(x, y - i, overflow),
          this.getCell(x - i, y, overflow)
        ])
      );
    }
    return new GridCellCollection(output);
  }
  /**
   * Gets an array containing all cells diagonally adjacent from a specific cell.
   * @param x - The x coordinate to check.
   * @param y - The y coordinate to check.
   * @param distance - The distance to check. Defaults to `1`.
   * @param fill - Whether to fill the diagonal. Defaults to `false`.
   * @param overflow - Whether to allow overflow. Defaults to `true`.
   * @returns - An array of all cells.
   */
  getDiagonal(x, y, distance = 1, fill = false, overflow = true) {
    if (distance === 1) {
      return new GridCellCollection([
        this.getCell(x - 1, y + 1, overflow),
        this.getCell(x + 1, y + 1, overflow),
        this.getCell(x + 1, y - 1, overflow),
        this.getCell(x - 1, y - 1, overflow)
      ]);
    }
    if (!fill) {
      return new GridCellCollection([
        this.getCell(x - distance, y + distance, overflow),
        this.getCell(x + distance, y + distance, overflow),
        this.getCell(x + distance, y - distance, overflow),
        this.getCell(x - distance, y - distance, overflow)
      ]);
    }
    const output = [this.getCell(x, y)];
    for (let i = 1; i <= distance; i++) {
      output.push(
        ...new GridCellCollection([
          this.getCell(x - i, y + i, overflow),
          this.getCell(x + i, y + i, overflow),
          this.getCell(x + i, y - i, overflow),
          this.getCell(x - i, y - i, overflow)
        ])
      );
    }
    return new GridCellCollection(output);
  }
  /**
   * Gets an array containing all cells that surround a cell at a specific distance.
   * @param x - The x coordinate to check.
   * @param y - The y coordinate to check.
   * @param distance - The distance to check.
   * @param overflow - Whether to allow overflow. Defaults to `true`.
   * @returns - An array of all cells.
   */
  getEncirclingAtDistance(x, y, distance, overflow = true) {
    if (distance <= 1) {
      return new GridCellCollection([
        ...this.getAdjacent(x, y, 1, false, overflow),
        ...this.getDiagonal(x, y, 1, false, overflow)
      ]);
    }
    const output = [];
    for (let i = 1; i < distance * 2; i++) {
      output.push(
        ...new GridCellCollection([
          // Get the top row
          this.getCell(x - distance + i, y - distance, overflow),
          // Get the right column
          this.getCell(x + distance, y - distance + i, overflow),
          // Get the bottom row
          this.getCell(x + distance - i, y + distance, overflow),
          // Get the left column
          this.getCell(x - distance, y + distance - i, overflow)
        ])
      );
    }
    output.push(...this.getDiagonal(x, y, distance, false, overflow));
    return new GridCellCollection(output);
  }
  /**
   * Gets an array containing all cells that surround a cell.
   * @param x - The x coordinate to check.
   * @param y - The y coordinate to check.
   * @param distance - The distance to check. Defaults to `1`.
   * @param fill - Whether to fill the surrounding cells. Defaults to `false`.
   * @param overflow - Whether to allow overflow. Defaults to `true`.
   * @returns - An array of all cells.
   */
  getEncircling(x, y, distance = 1, fill = false, overflow = true) {
    if (distance === 1 || !fill) {
      return this.getEncirclingAtDistance(x, y, distance, overflow);
    }
    const output = [this.getCell(x, y)];
    for (let i = 1; i <= distance; i++) {
      output.push(...this.getEncirclingAtDistance(x, y, i, overflow));
    }
    return new GridCellCollection(output);
  }
  /**
   * @returns A random cell from the grid.
   */
  getRandomCell() {
    const x = Math.floor(Math.random() * this.xSize);
    const y = Math.floor(Math.random() * this.ySize);
    return this.getCell(x, y);
  }
  /**
   * Calculates the distance between two points on the grid.
   * @deprecated Use your own distance function instead.
   * @param x1 - The x-coordinate of the first point.
   * @param y1 - The y-coordinate of the first point.
   * @param x2 - The x-coordinate of the second point.
   * @param y2 - The y-coordinate of the second point.
   * @returns The distance between the two points.
   */
  static getDistance(x1, y1, x2, y2) {
    return Math.abs(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
  }
};

// src/classes/numericalAnalysis/sampling.ts
function gaussianRandom(mean2 = Decimal.dZero, standardDeviation = Decimal.dOne) {
  const u = 1 - Math.random();
  const v = Math.random();
  const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return new Decimal(z).mul(standardDeviation).add(mean2);
}
function poissonRandom(lambda) {
  const L = Decimal.fromValue_noAlloc(lambda).negate().exp();
  let k = Decimal.dZero;
  let prod = Decimal.dOne;
  do {
    k = k.add(Decimal.dOne);
    prod = prod.mul(Math.random());
  } while (prod.gt(L));
  return k.sub(Decimal.dOne);
}
function sampleFromBinomialDistribution(numberOfTrials, probabilityOfSuccess) {
  numberOfTrials = Decimal.fromValue_noAlloc(numberOfTrials);
  probabilityOfSuccess = Decimal.fromValue_noAlloc(probabilityOfSuccess);
  if (numberOfTrials.sign === -1 || probabilityOfSuccess.sign === -1 || probabilityOfSuccess.gt(Decimal.dOne)) {
    return null;
  }
  const np = numberOfTrials.mul(probabilityOfSuccess);
  if (np.gt(Decimal.dTen)) {
    return gaussianRandom(np, Decimal.sqrt(np.mul(Decimal.dOne.sub(probabilityOfSuccess)))).round().clamp(Decimal.dZero, numberOfTrials);
  }
  return poissonRandom(np).round().clamp(Decimal.dZero, numberOfTrials);
}

// src/E/DecimalLRUCache.ts
var DecimalLRUCache = class _DecimalLRUCache extends LRUCache {
  /**
   * Converts a decimal number to a JSON string.
   * @deprecated Use an object index instead.
   * @param n - The decimal number to convert.
   * @returns The decimal number in the form of a string. `sign/mag/layer` See {@link DecimalJSONString}
   */
  static decimalToKey(n) {
    n = new Decimal(n);
    return `${n.sign}/${n.mag}/${n.layer}`;
  }
  get(key) {
    key = new Decimal(key);
    return super.get(_DecimalLRUCache.decimalToKey(key));
  }
  set(key, value) {
    key = new Decimal(key);
    super.set(_DecimalLRUCache.decimalToKey(key), value);
  }
  has(key) {
    key = new Decimal(key);
    return super.has(_DecimalLRUCache.decimalToKey(key));
  }
};

// src/classes/RandomSelector.ts
var SelectionMethod = class {
  /**
   * Gets the normalized weights of the given entries based on the provided luck.
   * This has no impact on the functionality of the selector, but is useful for displaying a probability distribution.
   * @param entries - An array of objects representing the possible options. This array must be sorted from highest to lowest chance ({@link RandomArraySortedState.sortedHighestToLowestChance}).
   * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
   * @returns An array of objects representing the normalized weights of the entries. Should be sorted from lowest to highest weight ({@link RandomArraySortedState.sortedLowestToHighestWeight}). If the selection method does not support normalized weights, it should return `undefined`.
   */
  getNormalizedWeights(entries, luck) {
    return void 0;
  }
};
var RarestFirstCascadeSelectionMethod = class extends SelectionMethod {
  select(entries, luck) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (i === entries.length - 1) {
        return entry.name;
      }
      const newChance = entry.chance.div(luck);
      if (RandomSelector.getRandomBooleanWithChance(newChance)) {
        return entry.name;
      }
    }
    return void 0;
  }
  getNormalizedWeights(entries, luck) {
    const out = [];
    let cumulativePreviousChanceMultiplier = Decimal.dOne;
    let sumOfOutputWeights = Decimal.dZero;
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (luck.gte(entry.chance) || i === entries.length - 1) {
        out.push({
          name: entry.name,
          weight: Decimal.dOne.sub(sumOfOutputWeights)
        });
        for (let j = i + 1; j < entries.length; j++) {
          out.push({
            name: entries[j].name,
            weight: Decimal.dZero
          });
        }
        break;
      }
      const baseChanceInverted = luck.div(entry.chance);
      const outputWeight = baseChanceInverted.mul(cumulativePreviousChanceMultiplier);
      out.push({
        name: entry.name,
        weight: outputWeight
      });
      cumulativePreviousChanceMultiplier = cumulativePreviousChanceMultiplier.mul(
        Decimal.dOne.sub(baseChanceInverted)
      );
      sumOfOutputWeights = sumOfOutputWeights.add(outputWeight);
    }
    return out;
  }
};
var RandomSelector = class _RandomSelector {
  /**
   * Generates a random boolean based on a given chance.
   * - If the chance is less than or equal to 1, it will always return `true`.
   * This suffers from floating point precision issues when the chance is very unlikely.
   * @param chance - The chance of returning `true`. The higher the chance, the less likely it is to return `true`.
   * @returns - A random boolean value based on the given chance.
   * @example
   * RandomSelector.getRandomBooleanWithChance(new Decimal(1)); // Always returns true
   * RandomSelector.getRandomBooleanWithChance(new Decimal(2)); // 1 in 2 chance (50%) of returning true
   * RandomSelector.getRandomBooleanWithChance(new Decimal(5)); // 1 in 5 chance (20%)
   * RandomSelector.getRandomBooleanWithChance(new Decimal(3.5)); // 1 in 3.5 chance (~28.57%)
   */
  static getRandomBooleanWithChance(chance) {
    chance = Decimal.fromValue_noAlloc(chance);
    if (chance.lte(Decimal.dOne)) {
      return true;
    }
    return new Decimal(Math.random()).lt(chance.reciprocal());
  }
  /**
   * Converts the chances of each entry into a relative chance from 0 to 1 given the total weight.
   * @param entries - An array of {@link RandomOptionEntry} objects representing the possible options.
   * @param totalWeight - The total weight of all options, used to normalize chances. If not provided, it will be calculated as the sum of all chances.
   * @returns An array of {@link RandomOptionEntry} objects with normalized chances.
   * @example
   * const entries = [
   *   { name: "A", weight: new Decimal(1/2) },
   *   { name: "B", weight: new Decimal(1/5) },
   *   { name: "C", weight: new Decimal(1/10) },
   *   { name: "D", weight: new Decimal(1/20) },
   * ];
   *
   * // Will return chances normalized to the total weight (1/2 + 1/5 + 1/10 + 1/20).
   * // Resulting chances will be approximately: [0.58824, 0.23529, 0.11765, 0.058824]
   * const normalizedEntries = RandomSelector.normalizeWeights(entries);
   */
  static normalizeWeights(entries, totalWeight) {
    totalWeight = totalWeight ?? entries.reduce((sum, entry) => sum.add(entry.weight), Decimal.dZero);
    return entries.map((entry) => ({
      ...entry,
      weight: entry.weight.div(totalWeight)
    }));
  }
  /**
   * Selects an option from the given normalized weights.
   * Suffers from floating point precision issues when the weights are very small.
   * @param entries - An array of normalized {@link WeightOptionEntry} objects. Can be unsorted.
   * @param randomValue - A random value between 0 and 1 used to select an option. Defaults to `Math.random()`.
   * @returns The selected option name, or `null` if no option was selected.
   */
  static selectFromNormalizedWeights(entries, randomValue = Math.random()) {
    entries.sort((a, b) => a.weight.compare(b.weight));
    randomValue = Decimal.fromValue_noAlloc(randomValue);
    let cumulativeWeight = Decimal.dZero;
    for (const entry of entries) {
      cumulativeWeight = cumulativeWeight.add(entry.weight);
      if (randomValue.lte(cumulativeWeight)) {
        return entry.name;
      }
    }
    return void 0;
  }
  /**
   * Samples from a multinomial distribution based on the normalized weights of the entries.
   * Approximated using a binomial distribution for each entry. See {@link sampleFromBinomialDistribution} for more information.
   * @param entries - An array of normalized {@link WeightOptionEntry} objects. Must be sorted from highest to lowest weight.
   * @param numberOfSelections - The number of selections to make from the entries. This can be as large as you want. Defaults to 1.
   * @param onlyReturnNonZeroSelections - If true, only entries with a non-zero number of selections will be returned. Defaults to false.
   * @returns An array of {@link SelectedOptionEntry} objects representing the selected options and their counts. If {@link onlyReturnNonZeroSelections} is true, only entries with a non-zero number of selections will be included. Otherwise, it is returned in the same order as the input entries.
   * @example
   * const entries = [
   *     { name: "A", weight: new Decimal(0.5) },
   *     { name: "B", weight: new Decimal(0.3) },
   *     { name: "C", weight: new Decimal(0.2) },
   * ];
   *
   * const numberOfSelections = new Decimal(1000);
   *
   * // `selected` will contain an array of SelectedOptionEntry objects with the counts of each selected option.
   * // For example, it might return something like:
   * // [
   * //     { name: "A", numberOfSelections: new Decimal(493) },
   * //     { name: "B", numberOfSelections: new Decimal(302) },
   * //     { name: "C", numberOfSelections: new Decimal(205) },
   * // ]
   * const selected = RandomSelector.selectMultipleFromNormalizedWeights(entries, numberOfSelections);
   */
  static selectMultipleFromNormalizedWeights(entries, numberOfSelections = Decimal.dOne, onlyReturnNonZeroSelections = false) {
    const k = entries.length;
    const out = onlyReturnNonZeroSelections ? [] : entries.map((entry) => ({
      name: entry.name,
      numberOfSelections: Decimal.dZero
    }));
    let remainingTrials = Decimal.fromValue_noAlloc(numberOfSelections);
    let remainingProbMass = Decimal.dOne;
    for (let i = 0; i < k - 1; i++) {
      if (remainingTrials.lte(Decimal.dZero) || remainingProbMass.lte(Decimal.dZero)) break;
      const adjustedP = entries[i].weight.div(remainingProbMass);
      const x = sampleFromBinomialDistribution(remainingTrials, adjustedP) ?? Decimal.dZero;
      if (!onlyReturnNonZeroSelections) {
        out[i].numberOfSelections = x;
      } else if (x.gt(Decimal.dZero)) {
        out.push({
          name: entries[i].name,
          numberOfSelections: x
        });
      }
      remainingTrials = remainingTrials.sub(x);
      remainingProbMass = remainingProbMass.sub(entries[i].weight);
    }
    if (!onlyReturnNonZeroSelections) {
      out[k - 1].numberOfSelections = remainingTrials.max(Decimal.dZero);
    } else if (remainingTrials.gt(Decimal.dZero)) {
      out.push({
        name: entries[k - 1].name,
        numberOfSelections: remainingTrials.max(Decimal.dZero)
      });
    }
    return out;
  }
  static {
    /**
     * The default selection method used by the {@link RandomSelector} class.
     * Currently set to {@link RarestFirstCascadeSelectionMethod}.
     */
    this.defaultSelectionMethod = new RarestFirstCascadeSelectionMethod();
  }
  /**
   * @returns An array of {@link RandomOptionEntry} objects representing the possible options, sorted from highest to lowest chance.
   */
  get entries() {
    const entries = this.getEntries();
    entries.sort((a, b) => -a.chance.compare(b.chance));
    return entries;
  }
  /**
   * Creates a new RandomSelector with the given options.
   * @param options - An array of {@link RandomOptionEntry} objects or a function that returns that array representing the possible options. Can be in any order.
   * @param selectionMethod - The method used to select a random option from the list of entries. Defaults to {@link defaultSelectionMethod}.
   * @param cacheMaxSize - The maximum size of the cache used to store normalized weights. Set to `0` to disable caching. Defaults to `3`.
   */
  constructor(options, selectionMethod = _RandomSelector.defaultSelectionMethod, cacheMaxSize = 3) {
    this.selectionMethod = selectionMethod;
    this.getEntries = typeof options === "function" ? options : () => options;
    if (cacheMaxSize > 0) {
      this.weightCache = new DecimalLRUCache(cacheMaxSize);
    } else {
      this.weightCache = void 0;
    }
  }
  /**
   * Selects a random option from the list of entries based on their chances and the provided luck.
   * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
   * @returns A randomly selected option from the entries, or undefined if no options are available.
   */
  select(luck = Decimal.dOne) {
    luck = Decimal.fromValue_noAlloc(luck);
    return this.selectionMethod.select(this.entries, luck);
  }
  /**
   * Gets the normalized weights of the entries based on the provided luck.
   * If a cached value exists for the given luck, it will be returned instead of recalculating.
   * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
   * @returns An array of objects representing the normalized weights of the entries.
   */
  getNormalizedWeights(luck = Decimal.dOne) {
    luck = Decimal.fromValue_noAlloc(luck);
    if (!this.weightCache) {
      return this.selectionMethod.getNormalizedWeights(this.entries, luck);
    }
    const cachedWeights = this.getWeightsFromCache(luck);
    if (cachedWeights) return cachedWeights;
    return this.updateCache(luck);
  }
  /**
   * Selects multiple entries based on the normalized weights of the entries.
   * See {@link selectMultipleFromNormalizedWeights} for more information.
   * @param numberOfSelections - The number of selections to make from the entries. This can be as large as you want. Defaults to 1.
   * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
   * @param onlyReturnNonZeroSelections - If true, only entries with a non-zero number of selections will be returned. Defaults to false.
   * @returns An array of {@link SelectedOptionEntry} objects representing the selected options and their counts.
   */
  selectMultiple(numberOfSelections, luck, onlyReturnNonZeroSelections) {
    const normalizedWeights = this.getNormalizedWeights(luck);
    if (!normalizedWeights) {
      return [];
    }
    return _RandomSelector.selectMultipleFromNormalizedWeights(
      normalizedWeights,
      numberOfSelections,
      onlyReturnNonZeroSelections
    );
  }
  /**
   * Gets the cached normalized weights for the given luck, if they exist.
   * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
   * @returns The cached normalized weights for the given luck, or undefined if no cache exists or no cached value is found.
   */
  getWeightsFromCache(luck = Decimal.dOne) {
    if (!this.weightCache) return void 0;
    return this.weightCache.get(luck);
  }
  /**
   * Updates the cache of normalized weights for the given luck, and returns the newly set value.
   * Note: this does not overwrite existing cache entries or return them. To update an existing entry, you must first clear the entire cache using {@link clearCache}.
   * @param luck - A multiplier that affects the chances of each entry. Defaults to 1 (no multiplier).
   * @returns The newly calculated normalized weights for the given luck, or undefined if no cache exists or if the entry already exists in the cache.
   */
  updateCache(luck = Decimal.dOne) {
    if (!this.weightCache) return void 0;
    luck = Decimal.fromValue_noAlloc(luck);
    if (this.weightCache.has(luck)) {
      return void 0;
    }
    const normalizedWeights = this.selectionMethod.getNormalizedWeights(this.entries, luck);
    if (normalizedWeights) {
      this.weightCache.set(luck, normalizedWeights);
    }
    return normalizedWeights;
  }
  /**
   * Clears the weight cache.
   */
  clearCache() {
    if (this.weightCache) {
      this.weightCache.clear();
    }
  }
};
var testEntries = [
  { name: "Common", chance: new Decimal(2) },
  { name: "Rare", chance: new Decimal(5) },
  { name: "Epic", chance: new Decimal(10) },
  { name: "Legendary", chance: new Decimal(2e3) },
  { name: "Mythic", chance: new Decimal(1e6) }
];
var randomSelector = new RandomSelector(testEntries, new RarestFirstCascadeSelectionMethod());

// src/E/eMain.ts
var E = (() => {
  let shownWarning = false;
  const out = (x) => {
    if (!shownWarning) {
      console.warn("eMath.js: The E function is deprecated. Use the Decimal class directly.");
      shownWarning = true;
    }
    return new Decimal(x);
  };
  Object.getOwnPropertyNames(Decimal).filter((b) => !Object.getOwnPropertyNames(class {
  }).includes(b)).forEach((prop) => {
    out[prop] = Decimal[prop];
  });
  return out;
})();
/*! Bundled license information:

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
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
