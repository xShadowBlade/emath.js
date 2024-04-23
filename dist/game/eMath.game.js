(function (g, f) {
    var hasExports = typeof exports === 'object';
    if (typeof define === "function" && define.amd) {
      define(['reflect-metadata', 'class-transformer', 'lz-string'], f);
    } else if (typeof module === "object" && module.exports) {
      module.exports = f(require('reflect-metadata'), require('class-transformer'), require('lz-string'));
    } else {
      var m = hasExports ? f(require('reflect-metadata'), require('class-transformer'), require('lz-string')) : f(g["reflect-metadata"], g["class-transformer"], g["lz-string"]);
      var root = hasExports ? exports : g;
      for(var i in m) root[i] = m[i];
    }}(typeof self !== 'undefined' ? self : this, (__da, __db, __dc) => {
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
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

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
            if (imod4 == 0)
              continue;
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

// src/game/index.ts
var game_exports = {};
__export(game_exports, {
  DataManager: () => DataManager,
  EventManager: () => EventManager,
  EventTypes: () => EventTypes,
  Game: () => Game,
  GameAttribute: () => GameAttribute,
  GameCurrency: () => GameCurrency,
  GameReset: () => GameReset,
  KeyManager: () => KeyManager,
  gameDefaultConfig: () => gameDefaultConfig,
  keys: () => keys
});
module.exports = __toCommonJS(game_exports);
var import_reflect_metadata5 = require("reflect-metadata");

// src/classes/Currency.ts
var import_reflect_metadata2 = require("reflect-metadata");
var import_class_transformer2 = require("class-transformer");

// node_modules/break_eternity.js/dist/break_eternity.esm.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
var LRUCache = /* @__PURE__ */ function() {
  function LRUCache3(maxSize) {
    _classCallCheck(this, LRUCache3);
    this.map = /* @__PURE__ */ new Map();
    this.first = void 0;
    this.last = void 0;
    this.maxSize = maxSize;
  }
  _createClass(LRUCache3, [{
    key: "size",
    get: function get() {
      return this.map.size;
    }
    /**
     * Gets the specified key from the cache, or undefined if it is not in the
     * cache.
     * @param key The key to get.
     * @returns The cached value, or undefined if key is not in the cache.
     */
  }, {
    key: "get",
    value: function get(key) {
      var node = this.map.get(key);
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
  }, {
    key: "set",
    value: function set(key, value) {
      if (this.maxSize < 1) {
        return;
      }
      if (this.map.has(key)) {
        throw new Error("Cannot update existing keys in the cache");
      }
      var node = new ListNode(key, value);
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
        var last = this.last;
        this.map["delete"](last.key);
        this.last = last.prev;
        this.last.next = void 0;
      }
    }
  }]);
  return LRUCache3;
}();
var ListNode = /* @__PURE__ */ _createClass(function ListNode2(key, value) {
  _classCallCheck(this, ListNode2);
  this.next = void 0;
  this.prev = void 0;
  this.key = key;
  this.value = value;
});
var MAX_SIGNIFICANT_DIGITS = 17;
var EXP_LIMIT = 9e15;
var LAYER_DOWN = Math.log10(9e15);
var FIRST_NEG_LAYER = 1 / 9e15;
var NUMBER_EXP_MAX = 308;
var NUMBER_EXP_MIN = -324;
var MAX_ES_IN_A_ROW = 5;
var DEFAULT_FROM_STRING_CACHE_SIZE = (1 << 10) - 1;
var powerOf10 = function() {
  var powersOf10 = [];
  for (var i = NUMBER_EXP_MIN + 1; i <= NUMBER_EXP_MAX; i++) {
    powersOf10.push(Number("1e" + i));
  }
  var indexOf0InPowersOf10 = 323;
  return function(power) {
    return powersOf10[power + indexOf0InPowersOf10];
  };
}();
var critical_headers = [2, Math.E, 3, 4, 5, 6, 7, 8, 9, 10];
var critical_tetr_values = [[
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
], [
  // Base E (using http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html )
  1,
  1.1121114330934079,
  1.231038924931609,
  1.3583836963111375,
  1.4960519303993531,
  1.6463542337511945,
  1.8121385357018724,
  1.996971324618307,
  2.2053895545527546,
  2.4432574483385254,
  Math.E
  //1.0
], [
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
], [
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
], [
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
], [
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
], [
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
], [
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
], [
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
], [
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
]];
var critical_slog_values = [[
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
], [
  // Base E
  -1,
  -0.90603157029014,
  -0.80786507256596,
  -0.7064666939634,
  -0.60294836853664,
  -0.49849837513117,
  -0.39430303318768,
  -0.29147201034755,
  -0.19097820800866,
  -0.09361896280296,
  0
  //1.0
], [
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
], [
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
], [
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
], [
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
], [
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
], [
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
], [
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
], [
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
]];
var D = function D2(value) {
  return Decimal.fromValue_noAlloc(value);
};
var FC = function FC2(sign, layer, mag) {
  return Decimal.fromComponents(sign, layer, mag);
};
var FC_NN = function FC_NN2(sign, layer, mag) {
  return Decimal.fromComponents_noNormalize(sign, layer, mag);
};
var decimalPlaces = function decimalPlaces2(value, places) {
  var len = places + 1;
  var numDigits = Math.ceil(Math.log10(Math.abs(value)));
  var rounded = Math.round(value * Math.pow(10, len - numDigits)) * Math.pow(10, numDigits - len);
  return parseFloat(rounded.toFixed(Math.max(len - numDigits, 0)));
};
var f_maglog10 = function f_maglog102(n) {
  return Math.sign(n) * Math.log10(Math.abs(n));
};
var f_gamma = function f_gamma2(n) {
  if (!isFinite(n)) {
    return n;
  }
  if (n < -50) {
    if (n === Math.trunc(n)) {
      return Number.NEGATIVE_INFINITY;
    }
    return 0;
  }
  var scal1 = 1;
  while (n < 10) {
    scal1 = scal1 * n;
    ++n;
  }
  n -= 1;
  var l = 0.9189385332046727;
  l = l + (n + 0.5) * Math.log(n);
  l = l - n;
  var n2 = n * n;
  var np = n;
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
var f_lambertw = function f_lambertw2(z) {
  var tol = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e-10;
  var w;
  var wn;
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
  for (var i = 0; i < 100; ++i) {
    wn = (z * Math.exp(-w) + w * w) / (w + 1);
    if (Math.abs(wn - w) < tol * Math.abs(wn)) {
      return wn;
    } else {
      w = wn;
    }
  }
  throw Error("Iteration failed to converge: ".concat(z.toString()));
};
function d_lambertw(z) {
  var tol = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e-10;
  var w;
  var ew, wewz, wn;
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
  for (var i = 0; i < 100; ++i) {
    ew = w.neg().exp();
    wewz = w.sub(z.mul(ew));
    wn = w.sub(wewz.div(w.add(1).sub(w.add(2).mul(wewz).div(Decimal.mul(2, w).add(2)))));
    if (Decimal.abs(wn.sub(w)).lt(Decimal.abs(wn).mul(tol))) {
      return wn;
    } else {
      w = wn;
    }
  }
  throw Error("Iteration failed to converge: ".concat(z.toString()));
}
var Decimal = /* @__PURE__ */ function() {
  function Decimal2(value) {
    _classCallCheck(this, Decimal2);
    this.sign = 0;
    this.mag = 0;
    this.layer = 0;
    if (value instanceof Decimal2) {
      this.fromDecimal(value);
    } else if (typeof value === "number") {
      this.fromNumber(value);
    } else if (typeof value === "string") {
      this.fromString(value);
    }
  }
  _createClass(Decimal2, [{
    key: "m",
    get: function get() {
      if (this.sign === 0) {
        return 0;
      } else if (this.layer === 0) {
        var exp = Math.floor(Math.log10(this.mag));
        var man;
        if (this.mag === 5e-324) {
          man = 5;
        } else {
          man = this.mag / powerOf10(exp);
        }
        return this.sign * man;
      } else if (this.layer === 1) {
        var residue = this.mag - Math.floor(this.mag);
        return this.sign * Math.pow(10, residue);
      } else {
        return this.sign;
      }
    },
    set: function set(value) {
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
  }, {
    key: "e",
    get: function get() {
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
    },
    set: function set(value) {
      this.fromMantissaExponent(this.m, value);
    }
  }, {
    key: "s",
    get: function get() {
      return this.sign;
    },
    set: function set(value) {
      if (value === 0) {
        this.sign = 0;
        this.layer = 0;
        this.mag = 0;
      } else {
        this.sign = value;
      }
    }
    // Object.defineProperty(Decimal.prototype, "mantissa", {
  }, {
    key: "mantissa",
    get: function get() {
      return this.m;
    },
    set: function set(value) {
      this.m = value;
    }
  }, {
    key: "exponent",
    get: function get() {
      return this.e;
    },
    set: function set(value) {
      this.e = value;
    }
    /**
     * Turns the given components into a valid Decimal.
     */
  }, {
    key: "normalize",
    value: (
      /**
       * Turns the Decimal into a valid Decimal. This function is meant for internal purposes - users of this library should not need to use normalize.
       *
       * Note: this function mutates the Decimal it is called on.
       */
      function normalize() {
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
        var absmag = Math.abs(this.mag);
        var signmag = Math.sign(this.mag);
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
    )
    /**
     * Turns the given components into a valid Decimal.
     *
     * Note: this function mutates the Decimal it is called on.
     */
  }, {
    key: "fromComponents",
    value: function fromComponents(sign, layer, mag) {
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
  }, {
    key: "fromComponents_noNormalize",
    value: function fromComponents_noNormalize(sign, layer, mag) {
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
  }, {
    key: "fromMantissaExponent",
    value: function fromMantissaExponent(mantissa, exponent) {
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
  }, {
    key: "fromMantissaExponent_noNormalize",
    value: function fromMantissaExponent_noNormalize(mantissa, exponent) {
      this.fromMantissaExponent(mantissa, exponent);
      return this;
    }
    /**
     * Turns the Decimal that this function is called on into a deep copy of the provided value.
     *
     * Note: this function mutates the Decimal it is called on.
     */
  }, {
    key: "fromDecimal",
    value: function fromDecimal(value) {
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
  }, {
    key: "fromNumber",
    value: function fromNumber(value) {
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
  }, {
    key: "fromString",
    value: function fromString(value) {
      var linearhyper4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var originalValue = value;
      var cached = Decimal2.fromStringCache.get(originalValue);
      if (cached !== void 0) {
        return this.fromDecimal(cached);
      }
      {
        value = value.replace(",", "");
      }
      var pentationparts = value.split("^^^");
      if (pentationparts.length === 2) {
        var _base = parseFloat(pentationparts[0]);
        var _height = parseFloat(pentationparts[1]);
        var heightparts = pentationparts[1].split(";");
        var payload = 1;
        if (heightparts.length === 2) {
          payload = parseFloat(heightparts[1]);
          if (!isFinite(payload)) {
            payload = 1;
          }
        }
        if (isFinite(_base) && isFinite(_height)) {
          var result = Decimal2.pentate(_base, _height, payload, linearhyper4);
          this.sign = result.sign;
          this.layer = result.layer;
          this.mag = result.mag;
          if (Decimal2.fromStringCache.maxSize >= 1) {
            Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
          }
          return this;
        }
      }
      var tetrationparts = value.split("^^");
      if (tetrationparts.length === 2) {
        var _base2 = parseFloat(tetrationparts[0]);
        var _height2 = parseFloat(tetrationparts[1]);
        var _heightparts = tetrationparts[1].split(";");
        var _payload = 1;
        if (_heightparts.length === 2) {
          _payload = parseFloat(_heightparts[1]);
          if (!isFinite(_payload)) {
            _payload = 1;
          }
        }
        if (isFinite(_base2) && isFinite(_height2)) {
          var _result = Decimal2.tetrate(_base2, _height2, _payload, linearhyper4);
          this.sign = _result.sign;
          this.layer = _result.layer;
          this.mag = _result.mag;
          if (Decimal2.fromStringCache.maxSize >= 1) {
            Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
          }
          return this;
        }
      }
      var powparts = value.split("^");
      if (powparts.length === 2) {
        var _base3 = parseFloat(powparts[0]);
        var _exponent = parseFloat(powparts[1]);
        if (isFinite(_base3) && isFinite(_exponent)) {
          var _result2 = Decimal2.pow(_base3, _exponent);
          this.sign = _result2.sign;
          this.layer = _result2.layer;
          this.mag = _result2.mag;
          if (Decimal2.fromStringCache.maxSize >= 1) {
            Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
          }
          return this;
        }
      }
      value = value.trim().toLowerCase();
      var base;
      var height;
      var ptparts = value.split("pt");
      if (ptparts.length === 2) {
        base = 10;
        height = parseFloat(ptparts[0]);
        ptparts[1] = ptparts[1].replace("(", "");
        ptparts[1] = ptparts[1].replace(")", "");
        var _payload2 = parseFloat(ptparts[1]);
        if (!isFinite(_payload2)) {
          _payload2 = 1;
        }
        if (isFinite(base) && isFinite(height)) {
          var _result3 = Decimal2.tetrate(base, height, _payload2, linearhyper4);
          this.sign = _result3.sign;
          this.layer = _result3.layer;
          this.mag = _result3.mag;
          if (Decimal2.fromStringCache.maxSize >= 1) {
            Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
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
        var _payload3 = parseFloat(ptparts[1]);
        if (!isFinite(_payload3)) {
          _payload3 = 1;
        }
        if (isFinite(base) && isFinite(height)) {
          var _result4 = Decimal2.tetrate(base, height, _payload3, linearhyper4);
          this.sign = _result4.sign;
          this.layer = _result4.layer;
          this.mag = _result4.mag;
          if (Decimal2.fromStringCache.maxSize >= 1) {
            Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
          }
          return this;
        }
      }
      ptparts = value.split("f");
      if (ptparts.length === 2) {
        base = 10;
        ptparts[0] = ptparts[0].replace("(", "");
        ptparts[0] = ptparts[0].replace(")", "");
        var _payload4 = parseFloat(ptparts[0]);
        ptparts[1] = ptparts[1].replace("(", "");
        ptparts[1] = ptparts[1].replace(")", "");
        height = parseFloat(ptparts[1]);
        if (!isFinite(_payload4)) {
          _payload4 = 1;
        }
        if (isFinite(base) && isFinite(height)) {
          var _result5 = Decimal2.tetrate(base, height, _payload4, linearhyper4);
          this.sign = _result5.sign;
          this.layer = _result5.layer;
          this.mag = _result5.mag;
          if (Decimal2.fromStringCache.maxSize >= 1) {
            Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
          }
          return this;
        }
      }
      var parts = value.split("e");
      var ecount = parts.length - 1;
      if (ecount === 0) {
        var numberAttempt = parseFloat(value);
        if (isFinite(numberAttempt)) {
          this.fromNumber(numberAttempt);
          if (Decimal2.fromStringCache.size >= 1) {
            Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
          }
          return this;
        }
      } else if (ecount === 1) {
        var _numberAttempt = parseFloat(value);
        if (isFinite(_numberAttempt) && _numberAttempt !== 0) {
          this.fromNumber(_numberAttempt);
          if (Decimal2.fromStringCache.maxSize >= 1) {
            Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
          }
          return this;
        }
      }
      var newparts = value.split("e^");
      if (newparts.length === 2) {
        this.sign = 1;
        if (newparts[0].charAt(0) == "-") {
          this.sign = -1;
        }
        var layerstring = "";
        for (var i = 0; i < newparts[1].length; ++i) {
          var chrcode = newparts[1].charCodeAt(i);
          if (chrcode >= 43 && chrcode <= 57 || chrcode === 101) {
            layerstring += newparts[1].charAt(i);
          } else {
            this.layer = parseFloat(layerstring);
            this.mag = parseFloat(newparts[1].substr(i + 1));
            this.normalize();
            if (Decimal2.fromStringCache.maxSize >= 1) {
              Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
            }
            return this;
          }
        }
      }
      if (ecount < 1) {
        this.sign = 0;
        this.layer = 0;
        this.mag = 0;
        if (Decimal2.fromStringCache.maxSize >= 1) {
          Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
        }
        return this;
      }
      var mantissa = parseFloat(parts[0]);
      if (mantissa === 0) {
        this.sign = 0;
        this.layer = 0;
        this.mag = 0;
        if (Decimal2.fromStringCache.maxSize >= 1) {
          Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
        }
        return this;
      }
      var exponent = parseFloat(parts[parts.length - 1]);
      if (ecount >= 2) {
        var me = parseFloat(parts[parts.length - 2]);
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
          var _result6 = Decimal2.mul(FC(1, 2, exponent), D(mantissa));
          this.sign = _result6.sign;
          this.layer = _result6.layer;
          this.mag = _result6.mag;
          if (Decimal2.fromStringCache.maxSize >= 1) {
            Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
          }
          return this;
        } else {
          this.mag = exponent;
        }
      }
      this.normalize();
      if (Decimal2.fromStringCache.maxSize >= 1) {
        Decimal2.fromStringCache.set(originalValue, Decimal2.fromDecimal(this));
      }
      return this;
    }
    /**
     * The function used by new Decimal() to create a new Decimal. Accepts a DecimalSource: uses fromNumber if given a number, uses fromString if given a string, and uses fromDecimal if given a Decimal.
     *
     * Note: this function mutates the Decimal it is called on.
     */
  }, {
    key: "fromValue",
    value: function fromValue(value) {
      if (value instanceof Decimal2) {
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
  }, {
    key: "toNumber",
    value: function toNumber() {
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
  }, {
    key: "mantissaWithDecimalPlaces",
    value: function mantissaWithDecimalPlaces(places) {
      if (isNaN(this.m)) {
        return Number.NaN;
      }
      if (this.m === 0) {
        return 0;
      }
      return decimalPlaces(this.m, places);
    }
  }, {
    key: "magnitudeWithDecimalPlaces",
    value: function magnitudeWithDecimalPlaces(places) {
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
  }, {
    key: "toString",
    value: function toString() {
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
  }, {
    key: "toExponential",
    value: function toExponential(places) {
      if (this.layer === 0) {
        return (this.sign * this.mag).toExponential(places);
      }
      return this.toStringWithDecimalPlaces(places);
    }
  }, {
    key: "toFixed",
    value: function toFixed(places) {
      if (this.layer === 0) {
        return (this.sign * this.mag).toFixed(places);
      }
      return this.toStringWithDecimalPlaces(places);
    }
  }, {
    key: "toPrecision",
    value: function toPrecision(places) {
      if (this.e <= -7) {
        return this.toExponential(places - 1);
      }
      if (places > this.e) {
        return this.toFixed(places - this.exponent - 1);
      }
      return this.toExponential(places - 1);
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.toString();
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.toString();
    }
  }, {
    key: "toStringWithDecimalPlaces",
    value: function toStringWithDecimalPlaces(places) {
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
  }, {
    key: "abs",
    value: function abs() {
      return FC_NN(this.sign === 0 ? 0 : 1, this.layer, this.mag);
    }
    /**
     * Negates the Decimal it's called on: in other words, when given X, returns -X.
     */
  }, {
    key: "neg",
    value: function neg() {
      return FC_NN(-this.sign, this.layer, this.mag);
    }
    /**
     * Negates the Decimal it's called on: in other words, when given X, returns -X.
     */
  }, {
    key: "negate",
    value: function negate() {
      return this.neg();
    }
    /**
     * Negates the Decimal it's called on: in other words, when given X, returns -X.
     */
  }, {
    key: "negated",
    value: function negated() {
      return this.neg();
    }
    // public sign () {
    //     return this.sign;
    //   }
    /**
     * Returns the sign of the Decimal it's called on. (Though, since sign is a public data member of Decimal, you might as well just call .sign instead of .sgn())
     */
  }, {
    key: "sgn",
    value: function sgn() {
      return this.sign;
    }
    /**
     * Rounds the Decimal it's called on to the nearest integer.
     */
  }, {
    key: "round",
    value: function round() {
      if (this.mag < 0) {
        return Decimal2.dZero;
      }
      if (this.layer === 0) {
        return FC(this.sign, 0, Math.round(this.mag));
      }
      return this;
    }
    /**
     * "Rounds" the Decimal it's called on to the nearest integer that's less than or equal to it.
     */
  }, {
    key: "floor",
    value: function floor() {
      if (this.mag < 0) {
        if (this.sign === -1)
          return Decimal2.dNegOne;
        else
          return Decimal2.dZero;
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
  }, {
    key: "ceil",
    value: function ceil() {
      if (this.mag < 0) {
        if (this.sign === 1)
          return Decimal2.dOne;
        else
          return Decimal2.dZero;
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
  }, {
    key: "trunc",
    value: function trunc() {
      if (this.mag < 0) {
        return Decimal2.dZero;
      }
      if (this.layer === 0) {
        return FC(this.sign, 0, Math.trunc(this.mag));
      }
      return this;
    }
    /**
     * Addition: returns the sum of 'this' and 'value'.
     */
  }, {
    key: "add",
    value: function add(value) {
      var decimal = D(value);
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
      var a;
      var b;
      if (this.layer >= 2 || decimal.layer >= 2) {
        return this.maxabs(decimal);
      }
      if (Decimal2.cmpabs(this, decimal) > 0) {
        a = this;
        b = decimal;
      } else {
        a = decimal;
        b = this;
      }
      if (a.layer === 0 && b.layer === 0) {
        return Decimal2.fromNumber(a.sign * a.mag + b.sign * b.mag);
      }
      var layera = a.layer * Math.sign(a.mag);
      var layerb = b.layer * Math.sign(b.mag);
      if (layera - layerb >= 2) {
        return a;
      }
      if (layera === 0 && layerb === -1) {
        if (Math.abs(b.mag - Math.log10(a.mag)) > MAX_SIGNIFICANT_DIGITS) {
          return a;
        } else {
          var magdiff = Math.pow(10, Math.log10(a.mag) - b.mag);
          var mantissa = b.sign + a.sign * magdiff;
          return FC(Math.sign(mantissa), 1, b.mag + Math.log10(Math.abs(mantissa)));
        }
      }
      if (layera === 1 && layerb === 0) {
        if (Math.abs(a.mag - Math.log10(b.mag)) > MAX_SIGNIFICANT_DIGITS) {
          return a;
        } else {
          var _magdiff = Math.pow(10, a.mag - Math.log10(b.mag));
          var _mantissa = b.sign + a.sign * _magdiff;
          return FC(Math.sign(_mantissa), 1, Math.log10(b.mag) + Math.log10(Math.abs(_mantissa)));
        }
      }
      if (Math.abs(a.mag - b.mag) > MAX_SIGNIFICANT_DIGITS) {
        return a;
      } else {
        var _magdiff2 = Math.pow(10, a.mag - b.mag);
        var _mantissa2 = b.sign + a.sign * _magdiff2;
        return FC(Math.sign(_mantissa2), 1, b.mag + Math.log10(Math.abs(_mantissa2)));
      }
    }
    /**
     * Addition: returns the sum of 'this' and 'value'.
     */
  }, {
    key: "plus",
    value: function plus(value) {
      return this.add(value);
    }
    /**
     * Subtraction: returns the difference between 'this' and 'value'.
     */
  }, {
    key: "sub",
    value: function sub(value) {
      return this.add(D(value).neg());
    }
    /**
     * Subtraction: returns the difference between 'this' and 'value'.
     */
  }, {
    key: "subtract",
    value: function subtract(value) {
      return this.sub(value);
    }
    /**
     * Subtraction: returns the difference between 'this' and 'value'.
     */
  }, {
    key: "minus",
    value: function minus(value) {
      return this.sub(value);
    }
    /**
     * Multiplication: returns the product of 'this' and 'value'.
     */
  }, {
    key: "mul",
    value: function mul(value) {
      var decimal = D(value);
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
      var a;
      var b;
      if (this.layer > decimal.layer || this.layer == decimal.layer && Math.abs(this.mag) > Math.abs(decimal.mag)) {
        a = this;
        b = decimal;
      } else {
        a = decimal;
        b = this;
      }
      if (a.layer === 0 && b.layer === 0) {
        return Decimal2.fromNumber(a.sign * b.sign * a.mag * b.mag);
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
        var newmag = FC(Math.sign(a.mag), a.layer - 1, Math.abs(a.mag)).add(FC(Math.sign(b.mag), b.layer - 1, Math.abs(b.mag)));
        return FC(a.sign * b.sign, newmag.layer + 1, newmag.sign * newmag.mag);
      }
      if (a.layer === 2 && b.layer === 2) {
        var _newmag = FC(Math.sign(a.mag), a.layer - 1, Math.abs(a.mag)).add(FC(Math.sign(b.mag), b.layer - 1, Math.abs(b.mag)));
        return FC(a.sign * b.sign, _newmag.layer + 1, _newmag.sign * _newmag.mag);
      }
      throw Error("Bad arguments to mul: " + this + ", " + value);
    }
    /**
     * Multiplication: returns the product of 'this' and 'value'.
     */
  }, {
    key: "multiply",
    value: function multiply(value) {
      return this.mul(value);
    }
    /**
     * Multiplication: returns the product of 'this' and 'value'.
     */
  }, {
    key: "times",
    value: function times(value) {
      return this.mul(value);
    }
    /**
     * Division: returns the quotient of 'this' and 'value'.
     */
  }, {
    key: "div",
    value: function div(value) {
      var decimal = D(value);
      return this.mul(decimal.recip());
    }
    /**
     * Division: returns the quotient of 'this' and 'value'.
     */
  }, {
    key: "divide",
    value: function divide(value) {
      return this.div(value);
    }
    /**
     * Division: returns the quotient of 'this' and 'value'.
     */
  }, {
    key: "divideBy",
    value: function divideBy(value) {
      return this.div(value);
    }
    /**
     * Division: returns the quotient of 'this' and 'value'.
     */
  }, {
    key: "dividedBy",
    value: function dividedBy(value) {
      return this.div(value);
    }
    /**
     * Returns the reciprocal (1 / X) of the Decimal it's called on.
     */
  }, {
    key: "recip",
    value: function recip() {
      if (this.mag === 0) {
        return Decimal2.dNaN;
      } else if (this.layer === 0) {
        return FC(this.sign, 0, 1 / this.mag);
      } else {
        return FC(this.sign, this.layer, -this.mag);
      }
    }
    /**
     * Returns the reciprocal (1 / X) of the Decimal it's called on.
     */
  }, {
    key: "reciprocal",
    value: function reciprocal() {
      return this.recip();
    }
    /**
     * Returns the reciprocal (1 / X) of the Decimal it's called on.
     */
  }, {
    key: "reciprocate",
    value: function reciprocate() {
      return this.recip();
    }
    /**
     * Returns the remainder of 'this' divided by 'value': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
    //Taken from OmegaNum.js, with a couple touch-ups
  }, {
    key: "mod",
    value: function mod(value) {
      var decimal = D(value).abs();
      if (decimal.eq(Decimal2.dZero))
        return Decimal2.dZero;
      var num_this = this.toNumber();
      var num_decimal = decimal.toNumber();
      if (isFinite(num_this) && isFinite(num_decimal) && num_this != 0 && num_decimal != 0) {
        return new Decimal2(num_this % num_decimal);
      }
      if (this.sub(decimal).eq(this)) {
        return Decimal2.dZero;
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
  }, {
    key: "modulo",
    value: function modulo(value) {
      return this.mod(value);
    }
    /**
     * Returns the remainder of this / value: for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
  }, {
    key: "modular",
    value: function modular(value) {
      return this.mod(value);
    }
    /**
     * Returns 1 if 'this' > 'value', returns -1 if 'this' < 'value', returns 0 if 'this' == 'value'.
     */
  }, {
    key: "cmp",
    value: function cmp(value) {
      var decimal = D(value);
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
  }, {
    key: "cmpabs",
    value: function cmpabs(value) {
      var decimal = D(value);
      var layera = this.mag > 0 ? this.layer : -this.layer;
      var layerb = decimal.mag > 0 ? decimal.layer : -decimal.layer;
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
  }, {
    key: "compare",
    value: function compare(value) {
      return this.cmp(value);
    }
    /**
     * Returns true if the Decimal is an NaN value.
     */
  }, {
    key: "isNan",
    value: function isNan() {
      return isNaN(this.sign) || isNaN(this.layer) || isNaN(this.mag);
    }
    /**
     * Returns true if the Decimal is finite (by Decimal standards, not by floating point standards - a humongous Decimal like 10^^10^100 is still finite!)
     */
  }, {
    key: "isFinite",
    value: function(_isFinite2) {
      function isFinite2() {
        return _isFinite2.apply(this, arguments);
      }
      isFinite2.toString = function() {
        return _isFinite2.toString();
      };
      return isFinite2;
    }(
      function() {
        return isFinite(this.sign) && isFinite(this.layer) && isFinite(this.mag);
      }
      /**
       * The Decimal equivalent of ==. Returns true if 'this' and 'value' have equal values.
       */
    )
  }, {
    key: "eq",
    value: function eq(value) {
      var decimal = D(value);
      return this.sign === decimal.sign && this.layer === decimal.layer && this.mag === decimal.mag;
    }
    /**
     * Returns true if 'this' and 'value' have equal values.
     */
  }, {
    key: "equals",
    value: function equals(value) {
      return this.eq(value);
    }
    /**
     * The Decimal equivalent of !=. Returns true if 'this' and 'value' do not have equal values.
     */
  }, {
    key: "neq",
    value: function neq(value) {
      return !this.eq(value);
    }
    /**
     * Returns true if 'this' and 'value' do not have equal values.
     */
  }, {
    key: "notEquals",
    value: function notEquals(value) {
      return this.neq(value);
    }
    /**
     * The Decimal equivalent of <. Returns true if 'this' is less than 'value'.
     */
  }, {
    key: "lt",
    value: function lt(value) {
      return this.cmp(value) === -1;
    }
    /**
     * The Decimal equivalent of <=. Returns true if 'this' is less than or equal to 'value'.
     */
  }, {
    key: "lte",
    value: function lte(value) {
      return !this.gt(value);
    }
    /**
     * The Decimal equivalent of >. Returns true if 'this' is greater than 'value'.
     */
  }, {
    key: "gt",
    value: function gt(value) {
      return this.cmp(value) === 1;
    }
    /**
     * The Decimal equivalent of >=. Returns true if 'this' is greater than or equal to 'value'.
     */
  }, {
    key: "gte",
    value: function gte(value) {
      return !this.lt(value);
    }
    /**
     * Returns whichever of 'this' and 'value' is higher.
     */
  }, {
    key: "max",
    value: function max(value) {
      var decimal = D(value);
      return this.lt(decimal) ? decimal : this;
    }
    /**
     * Returns whichever of 'this' and 'value' is lower.
     */
  }, {
    key: "min",
    value: function min(value) {
      var decimal = D(value);
      return this.gt(decimal) ? decimal : this;
    }
    /**
     * Returns whichever of 'this' and 'value' has a larger absolute value.
     */
  }, {
    key: "maxabs",
    value: function maxabs(value) {
      var decimal = D(value);
      return this.cmpabs(decimal) < 0 ? decimal : this;
    }
    /**
     * Returns whichever of 'this' and 'value' has a smaller absolute value.
     */
  }, {
    key: "minabs",
    value: function minabs(value) {
      var decimal = D(value);
      return this.cmpabs(decimal) > 0 ? decimal : this;
    }
    /**
     * A combination of minimum and maximum: the value returned by clamp is normally 'this', but it won't go below 'min' and it won't go above 'max'.
     * Therefore, if 'this' < 'min', then 'min' is returned, and if 'this' > 'max', then 'max' is returned.
     */
  }, {
    key: "clamp",
    value: function clamp(min, max) {
      return this.max(min).min(max);
    }
    /**
     * Returns 'this', unless 'this' is less than 'min', in which case 'min' is returned.
     */
  }, {
    key: "clampMin",
    value: function clampMin(min) {
      return this.max(min);
    }
    /**
     * Returns 'this', unless 'this' is greater than 'max', in which case 'max' is returned.
     */
  }, {
    key: "clampMax",
    value: function clampMax(max) {
      return this.min(max);
    }
    /**
     * Returns 1 if 'this' is greater than 'value', returns -1 if 'this' is less than 'value', returns 0 if 'this' is equal to 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "cmp_tolerance",
    value: function cmp_tolerance(value, tolerance) {
      var decimal = D(value);
      return this.eq_tolerance(decimal, tolerance) ? 0 : this.cmp(decimal);
    }
    /**
     * Returns 1 if 'this' is greater than 'value', returns -1 if 'this' is less than 'value', returns 0 if 'this' is equal to 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "compare_tolerance",
    value: function compare_tolerance(value, tolerance) {
      return this.cmp_tolerance(value, tolerance);
    }
    /**
     * Tests whether two Decimals are approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "eq_tolerance",
    value: function eq_tolerance(value, tolerance) {
      var decimal = D(value);
      if (tolerance == null) {
        tolerance = 1e-7;
      }
      if (this.sign !== decimal.sign) {
        return false;
      }
      if (Math.abs(this.layer - decimal.layer) > 1) {
        return false;
      }
      var magA = this.mag;
      var magB = decimal.mag;
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
  }, {
    key: "equals_tolerance",
    value: function equals_tolerance(value, tolerance) {
      return this.eq_tolerance(value, tolerance);
    }
    /**
     * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "neq_tolerance",
    value: function neq_tolerance(value, tolerance) {
      return !this.eq_tolerance(value, tolerance);
    }
    /**
     * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "notEquals_tolerance",
    value: function notEquals_tolerance(value, tolerance) {
      return this.neq_tolerance(value, tolerance);
    }
    /**
     * Returns true if 'this' is less than 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "lt_tolerance",
    value: function lt_tolerance(value, tolerance) {
      var decimal = D(value);
      return !this.eq_tolerance(decimal, tolerance) && this.lt(decimal);
    }
    /**
     * Returns true if 'this' is less than or equal to 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "lte_tolerance",
    value: function lte_tolerance(value, tolerance) {
      var decimal = D(value);
      return this.eq_tolerance(decimal, tolerance) || this.lt(decimal);
    }
    /**
     * Returns true if 'this' is greater than 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "gt_tolerance",
    value: function gt_tolerance(value, tolerance) {
      var decimal = D(value);
      return !this.eq_tolerance(decimal, tolerance) && this.gt(decimal);
    }
    /**
     * Returns true if 'this' is greater than or equal to 'value'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "gte_tolerance",
    value: function gte_tolerance(value, tolerance) {
      var decimal = D(value);
      return this.eq_tolerance(decimal, tolerance) || this.gt(decimal);
    }
    /**
     * "Positive log10": Returns the base-10 logarithm of nonnegative Decimals, but returns 0 for negative Decimals.
     */
  }, {
    key: "pLog10",
    value: function pLog10() {
      if (this.lt(Decimal2.dZero)) {
        return Decimal2.dZero;
      }
      return this.log10();
    }
    /**
     * Returns the base-10 logarithm of abs('this').
     */
  }, {
    key: "absLog10",
    value: function absLog10() {
      if (this.sign === 0) {
        return Decimal2.dNaN;
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
  }, {
    key: "log10",
    value: function log10() {
      if (this.sign <= 0) {
        return Decimal2.dNaN;
      } else if (this.layer > 0) {
        return FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
      } else {
        return FC(this.sign, 0, Math.log10(this.mag));
      }
    }
    /**
     * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'this'.
     */
  }, {
    key: "log",
    value: function log(base) {
      base = D(base);
      if (this.sign <= 0) {
        return Decimal2.dNaN;
      }
      if (base.sign <= 0) {
        return Decimal2.dNaN;
      }
      if (base.sign === 1 && base.layer === 0 && base.mag === 1) {
        return Decimal2.dNaN;
      } else if (this.layer === 0 && base.layer === 0) {
        return FC(this.sign, 0, Math.log(this.mag) / Math.log(base.mag));
      }
      return Decimal2.div(this.log10(), base.log10());
    }
    /**
     * Base-2 logarithm: returns the Decimal X such that 2^X = 'this'.
     */
  }, {
    key: "log2",
    value: function log2() {
      if (this.sign <= 0) {
        return Decimal2.dNaN;
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
  }, {
    key: "ln",
    value: function ln() {
      if (this.sign <= 0) {
        return Decimal2.dNaN;
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
  }, {
    key: "logarithm",
    value: function logarithm(base) {
      return this.log(base);
    }
    /**
     * Exponentiation: Returns the result of 'this' ^ 'value' (often written as 'this' ** 'value' in programming languages).
     */
  }, {
    key: "pow",
    value: function pow(value) {
      var decimal = D(value);
      var a = this;
      var b = decimal;
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
      var result = a.absLog10().mul(b).pow10();
      if (this.sign === -1) {
        if (Math.abs(b.toNumber() % 2) % 2 === 1) {
          return result.neg();
        } else if (Math.abs(b.toNumber() % 2) % 2 === 0) {
          return result;
        }
        return Decimal2.dNaN;
      }
      return result;
    }
    /**
     * Raises 10 to the power of 'this', i.e. (10^'this'). For positive numbers above 1, this is equivalent to adding 1 to layer and normalizing.
     */
  }, {
    key: "pow10",
    value: function pow10() {
      if (!Number.isFinite(this.layer) || !Number.isFinite(this.mag)) {
        return Decimal2.dNaN;
      }
      var a = this;
      if (a.layer === 0) {
        var newmag = Math.pow(10, a.sign * a.mag);
        if (Number.isFinite(newmag) && Math.abs(newmag) >= 0.1) {
          return FC(1, 0, newmag);
        } else {
          if (a.sign === 0) {
            return Decimal2.dOne;
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
      return Decimal2.dOne;
    }
    /**
     * Exponentiation: Returns the result of 'value' ^ 'this' (often written as 'value' ** 'this' in programming languages).
     */
  }, {
    key: "pow_base",
    value: function pow_base(value) {
      return D(value).pow(this);
    }
    /**
     * Roots are one of the inverses of exponentiation: this function finds the Decimal X such that X ^ 'value' = 'this'.
     * Equivalent to 'this' ^ (1 / 'value'), which is written here as this.pow(value.recip()).
     */
  }, {
    key: "root",
    value: function root(value) {
      var decimal = D(value);
      return this.pow(decimal.recip());
    }
    /**
     * For positive integers, X factorial (written as X!) equals X * (X - 1) * (X - 2) *... * 3 * 2 * 1. 0! equals 1.
     * This can be extended to real numbers (except for negative integers) via the gamma function, which is what this function does.
     */
  }, {
    key: "factorial",
    value: function factorial() {
      if (this.mag < 0) {
        return this.add(1).gamma();
      } else if (this.layer === 0) {
        return this.add(1).gamma();
      } else if (this.layer === 1) {
        return Decimal2.exp(Decimal2.mul(this, Decimal2.ln(this).sub(1)));
      } else {
        return Decimal2.exp(this);
      }
    }
    /**
     * The gamma function extends the idea of factorials to non-whole numbers using some calculus.
     * Gamma(x) is defined as the integral of t^(x-1) * e^-t dt from t = 0 to t = infinity,
     * and gamma(x) = (x - 1)! for nonnegative integer x, so the factorial for non-whole numbers is defined using the gamma function.
     */
    //from HyperCalc source code
  }, {
    key: "gamma",
    value: function gamma() {
      if (this.mag < 0) {
        return this.recip();
      } else if (this.layer === 0) {
        if (this.lt(FC_NN(1, 0, 24))) {
          return Decimal2.fromNumber(f_gamma(this.sign * this.mag));
        }
        var t = this.mag - 1;
        var l = 0.9189385332046727;
        l = l + (t + 0.5) * Math.log(t);
        l = l - t;
        var n2 = t * t;
        var np = t;
        var lm = 12 * np;
        var adj = 1 / lm;
        var l2 = l + adj;
        if (l2 === l) {
          return Decimal2.exp(l);
        }
        l = l2;
        np = np * n2;
        lm = 360 * np;
        adj = 1 / lm;
        l2 = l - adj;
        if (l2 === l) {
          return Decimal2.exp(l);
        }
        l = l2;
        np = np * n2;
        lm = 1260 * np;
        var lt = 1 / lm;
        l = l + lt;
        np = np * n2;
        lm = 1680 * np;
        lt = 1 / lm;
        l = l - lt;
        return Decimal2.exp(l);
      } else if (this.layer === 1) {
        return Decimal2.exp(Decimal2.mul(this, Decimal2.ln(this).sub(1)));
      } else {
        return Decimal2.exp(this);
      }
    }
    /**
     * Returns the natural logarithm of Gamma('this').
     */
  }, {
    key: "lngamma",
    value: function lngamma() {
      return this.gamma().ln();
    }
    /**
     * Base-e exponentiation: returns e^'this'.
     */
  }, {
    key: "exp",
    value: function exp() {
      if (this.mag < 0) {
        return Decimal2.dOne;
      }
      if (this.layer === 0 && this.mag <= 709.7) {
        return Decimal2.fromNumber(Math.exp(this.sign * this.mag));
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
  }, {
    key: "sqr",
    value: function sqr() {
      return this.pow(2);
    }
    /**
     * Square root: finds the Decimal X such that X * X, a.k.a X^2, equals 'this'. Equivalent to X^(1/2).
     */
  }, {
    key: "sqrt",
    value: function sqrt() {
      if (this.layer === 0) {
        return Decimal2.fromNumber(Math.sqrt(this.sign * this.mag));
      } else if (this.layer === 1) {
        return FC(1, 2, Math.log10(this.mag) - 0.3010299956639812);
      } else {
        var result = Decimal2.div(FC_NN(this.sign, this.layer - 1, this.mag), FC_NN(1, 0, 2));
        result.layer += 1;
        result.normalize();
        return result;
      }
    }
    /**
     * Cubing a number means raising it to the third power.
     */
  }, {
    key: "cube",
    value: function cube() {
      return this.pow(3);
    }
    /**
     * Cube root: finds the Decimal X such that X^3 equals 'this'. Equivalent to X^(1/3).
     */
  }, {
    key: "cbrt",
    value: function cbrt() {
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
  }, {
    key: "tetrate",
    value: function tetrate() {
      var height = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 2;
      var payload = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : FC_NN(1, 0, 1);
      var linear = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      if (height === 1) {
        return Decimal2.pow(this, payload);
      }
      if (height === 0) {
        return new Decimal2(payload);
      }
      if (this.eq(Decimal2.dOne)) {
        return Decimal2.dOne;
      }
      if (this.eq(-1)) {
        return Decimal2.pow(this, payload);
      }
      if (height === Number.POSITIVE_INFINITY) {
        var this_num = this.toNumber();
        if (this_num <= 1.444667861009766 && this_num >= 0.06598803584531254) {
          if (this_num > 1.444667861009099) {
            return Decimal2.fromNumber(Math.E);
          }
          var negln = Decimal2.ln(this).neg();
          return negln.lambertw().div(negln);
        } else if (this_num > 1.444667861009766) {
          return Decimal2.fromNumber(Number.POSITIVE_INFINITY);
        } else {
          return Decimal2.dNaN;
        }
      }
      if (this.eq(Decimal2.dZero)) {
        var result = Math.abs((height + 1) % 2);
        if (result > 1) {
          result = 2 - result;
        }
        return Decimal2.fromNumber(result);
      }
      if (height < 0) {
        return Decimal2.iteratedlog(payload, this, -height, linear);
      }
      payload = D(payload);
      var oldheight = height;
      height = Math.trunc(height);
      var fracheight = oldheight - height;
      if (this.gt(Decimal2.dZero) && this.lte(1.444667861009766) && (oldheight > 1e4 || !linear)) {
        height = Math.min(1e4, height);
        for (var i = 0; i < height; ++i) {
          var old_payload = payload;
          payload = this.pow(payload);
          if (old_payload.eq(payload)) {
            return payload;
          }
        }
        if (fracheight != 0 || oldheight > 1e4) {
          var next_payload = this.pow(payload);
          if (oldheight <= 1e4 || Math.ceil(oldheight) % 2 == 0) {
            return payload.mul(1 - fracheight).add(next_payload.mul(fracheight));
          } else {
            return payload.mul(fracheight).add(next_payload.mul(1 - fracheight));
          }
        }
        return payload;
      }
      if (fracheight !== 0) {
        if (payload.eq(Decimal2.dOne)) {
          if (this.gt(10) || linear) {
            payload = this.pow(fracheight);
          } else {
            payload = Decimal2.fromNumber(Decimal2.tetrate_critical(this.toNumber(), fracheight));
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
      for (var _i = 0; _i < height; ++_i) {
        payload = this.pow(payload);
        if (!isFinite(payload.layer) || !isFinite(payload.mag)) {
          return payload.normalize();
        }
        if (payload.layer - this.layer > 3) {
          return FC_NN(payload.sign, payload.layer + (height - _i - 1), payload.mag);
        }
        if (_i > 1e4) {
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
  }, {
    key: "iteratedexp",
    value: function iteratedexp() {
      var height = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 2;
      var payload = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : FC_NN(1, 0, 1);
      var linear = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
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
  }, {
    key: "iteratedlog",
    value: function iteratedlog() {
      var base = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
      var times = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
      var linear = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      if (times < 0) {
        return Decimal2.tetrate(base, -times, this, linear);
      }
      base = D(base);
      var result = Decimal2.fromDecimal(this);
      var fulltimes = times;
      times = Math.trunc(times);
      var fraction = fulltimes - times;
      if (result.layer - base.layer > 3) {
        var layerloss = Math.min(times, result.layer - base.layer - 3);
        times -= layerloss;
        result.layer -= layerloss;
      }
      for (var i = 0; i < times; ++i) {
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
  }, {
    key: "slog",
    value: function slog() {
      var base = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
      var iterations = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      var linear = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      var step_size = 1e-3;
      var has_changed_directions_once = false;
      var previously_rose = false;
      var result = this.slog_internal(base, linear).toNumber();
      for (var i = 1; i < iterations; ++i) {
        var new_decimal = new Decimal2(base).tetrate(result, Decimal2.dOne, linear);
        var currently_rose = new_decimal.gt(this);
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
      return Decimal2.fromNumber(result);
    }
  }, {
    key: "slog_internal",
    value: function slog_internal() {
      var base = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
      var linear = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      base = D(base);
      if (base.lte(Decimal2.dZero)) {
        return Decimal2.dNaN;
      }
      if (base.eq(Decimal2.dOne)) {
        return Decimal2.dNaN;
      }
      if (base.lt(Decimal2.dOne)) {
        if (this.eq(Decimal2.dOne)) {
          return Decimal2.dZero;
        }
        if (this.eq(Decimal2.dZero)) {
          return Decimal2.dNegOne;
        }
        return Decimal2.dNaN;
      }
      if (this.mag < 0 || this.eq(Decimal2.dZero)) {
        return Decimal2.dNegOne;
      }
      var result = 0;
      var copy = Decimal2.fromDecimal(this);
      if (copy.layer - base.layer > 3) {
        var layerloss = copy.layer - base.layer - 3;
        result += layerloss;
        copy.layer -= layerloss;
      }
      for (var i = 0; i < 100; ++i) {
        if (copy.lt(Decimal2.dZero)) {
          copy = Decimal2.pow(base, copy);
          result -= 1;
        } else if (copy.lte(Decimal2.dOne)) {
          if (linear)
            return Decimal2.fromNumber(result + copy.toNumber() - 1);
          else
            return Decimal2.fromNumber(result + Decimal2.slog_critical(base.toNumber(), copy.toNumber()));
        } else {
          result += 1;
          copy = Decimal2.log(copy, base);
        }
      }
      return Decimal2.fromNumber(result);
    }
    //background info and tables of values for critical functions taken here: https://github.com/Patashu/break_eternity.js/issues/22
  }, {
    key: "layeradd10",
    value: (
      /**
       * Adds/removes layers from a Decimal, even fractional layers (e.g. its slog10 representation). Very similar to tetrate base 10 and iterated log base 10.
       *
       * Tetration for non-integer heights does not have a single agreed-upon definition,
       * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
       * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
       * Analytic approximation is not currently supported for bases > 10.
       */
      //Moved this over to use the same critical section as tetrate/slog.
      function layeradd10(diff) {
        var linear = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        diff = Decimal2.fromValue_noAlloc(diff).toNumber();
        var result = Decimal2.fromDecimal(this);
        if (diff >= 1) {
          if (result.mag < 0 && result.layer > 0) {
            result.sign = 0;
            result.mag = 0;
            result.layer = 0;
          } else if (result.sign === -1 && result.layer == 0) {
            result.sign = 1;
            result.mag = -result.mag;
          }
          var layeradd = Math.trunc(diff);
          diff -= layeradd;
          result.layer += layeradd;
        }
        if (diff <= -1) {
          var _layeradd = Math.trunc(diff);
          diff -= _layeradd;
          result.layer += _layeradd;
          if (result.layer < 0) {
            for (var i = 0; i < 100; ++i) {
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
    )
    /**
     * layeradd: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 'base' and iterated log base 'base'.
     *
     * Tetration for non-integer heights does not have a single agreed-upon definition,
     * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
     * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
     * Analytic approximation is not currently supported for bases > 10.
     */
  }, {
    key: "layeradd",
    value: function layeradd(diff, base) {
      var linear = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      var slogthis = this.slog(base).toNumber();
      var slogdest = slogthis + diff;
      if (slogdest >= 0) {
        return Decimal2.tetrate(base, slogdest, Decimal2.dOne, linear);
      } else if (!Number.isFinite(slogdest)) {
        return Decimal2.dNaN;
      } else if (slogdest >= -1) {
        return Decimal2.log(Decimal2.tetrate(base, slogdest + 1, Decimal2.dOne, linear), base);
      } else {
        return Decimal2.log(Decimal2.log(Decimal2.tetrate(base, slogdest + 2, Decimal2.dOne, linear), base), base);
      }
    }
    /**
     * The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
     * https://en.wikipedia.org/wiki/Lambert_W_function
     */
    //Some special values, for testing: https://en.wikipedia.org/wiki/Lambert_W_function#Special_values
  }, {
    key: "lambertw",
    value: function lambertw() {
      if (this.lt(-0.3678794411710499)) {
        throw Error("lambertw is unimplemented for results less than -1, sorry!");
      } else if (this.mag < 0) {
        return Decimal2.fromNumber(f_lambertw(this.toNumber()));
      } else if (this.layer === 0) {
        return Decimal2.fromNumber(f_lambertw(this.sign * this.mag));
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
  }, {
    key: "ssqrt",
    value: function ssqrt() {
      return this.linear_sroot(2);
    }
    /**
     * Super-root, one of tetration's inverses - what number, tetrated to height 'degree', equals 'this'? https://en.wikipedia.org/wiki/Tetration#Super-root
     *
     * Only works with the linear approximation of tetration, as starting with analytic and then switching to linear would result in inconsistent behavior for super-roots.
     * This only matters for non-integer degrees.
     */
    //Another reason this doesn't support analytic approximation because I don't know the structure of non-linear tetrations for inputs < 1
    //TODO: Optimize this like how slog is optimized (if it isn't already)
  }, {
    key: "linear_sroot",
    value: function linear_sroot(degree) {
      if (degree == 1) {
        return this;
      }
      if (this.eq(Decimal2.dInf)) {
        return Decimal2.dInf;
      }
      if (!this.isFinite()) {
        return Decimal2.dNaN;
      }
      if (degree > 0 && degree < 1) {
        return this.root(degree);
      }
      if (degree > -2 && degree < -1) {
        return Decimal2.fromNumber(degree).add(2).pow(this.recip());
      }
      if (degree <= 0) {
        return Decimal2.dNaN;
      }
      if (degree == Number.POSITIVE_INFINITY) {
        var this_num = this.toNumber();
        if (this_num < Math.E && this_num > _EXPN1) {
          return this.pow(this.recip());
        } else {
          return Decimal2.dNaN;
        }
      }
      if (this.eq(1)) {
        return Decimal2.dOne;
      }
      if (this.lt(0)) {
        return Decimal2.dNaN;
      }
      if (this.lte("1ee-16")) {
        if (degree % 2 == 1)
          return this;
        else
          return Decimal2.dNaN;
      }
      if (this.gt(1)) {
        var upperBound = Decimal2.dTen;
        if (this.gte(Decimal2.tetrate(10, degree, 1, true))) {
          upperBound = this.iteratedlog(10, degree - 1, true);
        }
        if (degree <= 1) {
          upperBound = this.root(degree);
        }
        var lower = Decimal2.dZero;
        var layer = upperBound.layer;
        var upper = upperBound.iteratedlog(10, layer, true);
        var previous = upper;
        var guess = upper.div(2);
        var loopGoing = true;
        while (loopGoing) {
          guess = lower.add(upper).div(2);
          if (Decimal2.iteratedexp(10, layer, guess, true).tetrate(degree, 1, true).gt(this))
            upper = guess;
          else
            lower = guess;
          if (guess.eq(previous))
            loopGoing = false;
          else
            previous = guess;
        }
        return Decimal2.iteratedexp(10, layer, guess, true);
      } else {
        var stage = 1;
        var minimum = FC(1, 10, 1);
        var maximum = FC(1, 10, 1);
        var _lower = FC(1, 10, 1);
        var _upper = FC(1, 1, -16);
        var prevspan = Decimal2.dZero;
        var difference = FC(1, 10, 1);
        var _upperBound = _upper.pow10().recip();
        var distance = Decimal2.dZero;
        var prevPoint = _upperBound;
        var nextPoint = _upperBound;
        var evenDegree = Math.ceil(degree) % 2 == 0;
        var range = 0;
        var lastValid = FC(1, 10, 1);
        var infLoopDetector = false;
        var previousUpper = Decimal2.dZero;
        var decreasingFound = false;
        while (stage < 4) {
          if (stage == 2) {
            if (evenDegree)
              break;
            else {
              _lower = FC(1, 10, 1);
              _upper = minimum;
              stage = 3;
              difference = FC(1, 10, 1);
              lastValid = FC(1, 10, 1);
            }
          }
          infLoopDetector = false;
          while (_upper.neq(_lower)) {
            previousUpper = _upper;
            if (_upper.pow10().recip().tetrate(degree, 1, true).eq(1) && _upper.pow10().recip().lt(0.4)) {
              _upperBound = _upper.pow10().recip();
              prevPoint = _upper.pow10().recip();
              nextPoint = _upper.pow10().recip();
              distance = Decimal2.dZero;
              range = -1;
              if (stage == 3)
                lastValid = _upper;
            } else if (_upper.pow10().recip().tetrate(degree, 1, true).eq(_upper.pow10().recip()) && !evenDegree && _upper.pow10().recip().lt(0.4)) {
              _upperBound = _upper.pow10().recip();
              prevPoint = _upper.pow10().recip();
              nextPoint = _upper.pow10().recip();
              distance = Decimal2.dZero;
              range = 0;
            } else if (_upper.pow10().recip().tetrate(degree, 1, true).eq(_upper.pow10().recip().mul(2).tetrate(degree, 1, true))) {
              _upperBound = _upper.pow10().recip();
              prevPoint = Decimal2.dZero;
              nextPoint = _upperBound.mul(2);
              distance = _upperBound;
              if (evenDegree)
                range = -1;
              else
                range = 0;
            } else {
              prevspan = _upper.mul(12e-17);
              _upperBound = _upper.pow10().recip();
              prevPoint = _upper.add(prevspan).pow10().recip();
              distance = _upperBound.sub(prevPoint);
              nextPoint = _upperBound.add(distance);
              while (prevPoint.tetrate(degree, 1, true).eq(_upperBound.tetrate(degree, 1, true)) || nextPoint.tetrate(degree, 1, true).eq(_upperBound.tetrate(degree, 1, true)) || prevPoint.gte(_upperBound) || nextPoint.lte(_upperBound)) {
                prevspan = prevspan.mul(2);
                prevPoint = _upper.add(prevspan).pow10().recip();
                distance = _upperBound.sub(prevPoint);
                nextPoint = _upperBound.add(distance);
              }
              if (stage == 1 && nextPoint.tetrate(degree, 1, true).gt(_upperBound.tetrate(degree, 1, true)) && prevPoint.tetrate(degree, 1, true).gt(_upperBound.tetrate(degree, 1, true)) || stage == 3 && nextPoint.tetrate(degree, 1, true).lt(_upperBound.tetrate(degree, 1, true)) && prevPoint.tetrate(degree, 1, true).lt(_upperBound.tetrate(degree, 1, true))) {
                lastValid = _upper;
              }
              if (nextPoint.tetrate(degree, 1, true).lt(_upperBound.tetrate(degree, 1, true))) {
                range = -1;
              } else if (evenDegree) {
                range = 1;
              } else if (stage == 3 && _upper.gt_tolerance(minimum, 1e-8)) {
                range = 0;
              } else {
                while (prevPoint.tetrate(degree, 1, true).eq_tolerance(_upperBound.tetrate(degree, 1, true), 1e-8) || nextPoint.tetrate(degree, 1, true).eq_tolerance(_upperBound.tetrate(degree, 1, true), 1e-8) || prevPoint.gte(_upperBound) || nextPoint.lte(_upperBound)) {
                  prevspan = prevspan.mul(2);
                  prevPoint = _upper.add(prevspan).pow10().recip();
                  distance = _upperBound.sub(prevPoint);
                  nextPoint = _upperBound.add(distance);
                }
                if (nextPoint.tetrate(degree, 1, true).sub(_upperBound.tetrate(degree, 1, true)).lt(_upperBound.tetrate(degree, 1, true).sub(prevPoint.tetrate(degree, 1, true)))) {
                  range = 0;
                } else {
                  range = 1;
                }
              }
            }
            if (range == -1)
              decreasingFound = true;
            if (stage == 1 && range == 1 || stage == 3 && range != 0) {
              if (_lower.eq(FC(1, 10, 1))) {
                _upper = _upper.mul(2);
              } else {
                var cutOff = false;
                if (infLoopDetector && (range == 1 && stage == 1 || range == -1 && stage == 3))
                  cutOff = true;
                _upper = _upper.add(_lower).div(2);
                if (cutOff)
                  break;
              }
            } else {
              if (_lower.eq(FC(1, 10, 1))) {
                _lower = _upper;
                _upper = _upper.div(2);
              } else {
                var _cutOff = false;
                if (infLoopDetector && (range == 1 && stage == 1 || range == -1 && stage == 3))
                  _cutOff = true;
                _lower = _lower.sub(difference);
                _upper = _upper.sub(difference);
                if (_cutOff)
                  break;
              }
            }
            if (_lower.sub(_upper).div(2).abs().gt(difference.mul(1.5)))
              infLoopDetector = true;
            difference = _lower.sub(_upper).div(2).abs();
            if (_upper.gt("1e18"))
              break;
            if (_upper.eq(previousUpper))
              break;
          }
          if (_upper.gt("1e18"))
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
        _lower = minimum;
        _upper = FC(1, 1, -18);
        var _previous = _upper;
        var _guess = Decimal2.dZero;
        var _loopGoing = true;
        while (_loopGoing) {
          if (_lower.eq(FC(1, 10, 1)))
            _guess = _upper.mul(2);
          else
            _guess = _lower.add(_upper).div(2);
          if (Decimal2.pow(10, _guess).recip().tetrate(degree, 1, true).gt(this))
            _upper = _guess;
          else
            _lower = _guess;
          if (_guess.eq(_previous))
            _loopGoing = false;
          else
            _previous = _guess;
          if (_upper.gt("1e18"))
            return Decimal2.dNaN;
        }
        if (!_guess.eq_tolerance(minimum, 1e-15)) {
          return _guess.pow10().recip();
        } else {
          if (maximum.eq(FC(1, 10, 1))) {
            return Decimal2.dNaN;
          }
          _lower = FC(1, 10, 1);
          _upper = maximum;
          _previous = _upper;
          _guess = Decimal2.dZero;
          _loopGoing = true;
          while (_loopGoing) {
            if (_lower.eq(FC(1, 10, 1)))
              _guess = _upper.mul(2);
            else
              _guess = _lower.add(_upper).div(2);
            if (Decimal2.pow(10, _guess).recip().tetrate(degree, 1, true).gt(this))
              _upper = _guess;
            else
              _lower = _guess;
            if (_guess.eq(_previous))
              _loopGoing = false;
            else
              _previous = _guess;
            if (_upper.gt("1e18"))
              return Decimal2.dNaN;
          }
          return _guess.pow10().recip();
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
  }, {
    key: "pentate",
    value: function pentate() {
      var height = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 2;
      var payload = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : FC_NN(1, 0, 1);
      var linear = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      payload = D(payload);
      var oldheight = height;
      height = Math.trunc(height);
      var fracheight = oldheight - height;
      if (fracheight !== 0) {
        if (payload.eq(Decimal2.dOne)) {
          ++height;
          payload = Decimal2.fromNumber(fracheight);
        } else {
          if (this.eq(10)) {
            payload = payload.layeradd10(fracheight, linear);
          } else {
            payload = payload.layeradd(fracheight, this, linear);
          }
        }
      }
      for (var i = 0; i < height; ++i) {
        payload = this.tetrate(payload.toNumber(), Decimal2.dOne, linear);
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
  }, {
    key: "sin",
    value: function sin() {
      if (this.mag < 0) {
        return this;
      }
      if (this.layer === 0) {
        return Decimal2.fromNumber(Math.sin(this.sign * this.mag));
      }
      return FC_NN(0, 0, 0);
    }
    /**
     * The cosine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
     */
  }, {
    key: "cos",
    value: function cos() {
      if (this.mag < 0) {
        return Decimal2.dOne;
      }
      if (this.layer === 0) {
        return Decimal2.fromNumber(Math.cos(this.sign * this.mag));
      }
      return FC_NN(0, 0, 0);
    }
    /**
     * The tangent function, equal to sine divided by cosine. Behaves periodically with period pi.
     */
  }, {
    key: "tan",
    value: function tan() {
      if (this.mag < 0) {
        return this;
      }
      if (this.layer === 0) {
        return Decimal2.fromNumber(Math.tan(this.sign * this.mag));
      }
      return FC_NN(0, 0, 0);
    }
    /**
     * The arcsine function, the inverse of the sine function.
     */
  }, {
    key: "asin",
    value: function asin() {
      if (this.mag < 0) {
        return this;
      }
      if (this.layer === 0) {
        return Decimal2.fromNumber(Math.asin(this.sign * this.mag));
      }
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    /**
     * The arccosine function, the inverse of the cosine function.
     */
  }, {
    key: "acos",
    value: function acos() {
      if (this.mag < 0) {
        return Decimal2.fromNumber(Math.acos(this.toNumber()));
      }
      if (this.layer === 0) {
        return Decimal2.fromNumber(Math.acos(this.sign * this.mag));
      }
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    }
    /**
     * The arctangent function, the inverse of the tangent function.
     */
  }, {
    key: "atan",
    value: function atan() {
      if (this.mag < 0) {
        return this;
      }
      if (this.layer === 0) {
        return Decimal2.fromNumber(Math.atan(this.sign * this.mag));
      }
      return Decimal2.fromNumber(Math.atan(this.sign * Infinity));
    }
    /**
     * Hyperbolic sine: sinh(X) = (e^x - e^-x)/2.
     */
  }, {
    key: "sinh",
    value: function sinh() {
      return this.exp().sub(this.negate().exp()).div(2);
    }
    /**
     * Hyperbolic cosine: cosh(x) = (e^x + e^-x)/2.
     */
  }, {
    key: "cosh",
    value: function cosh() {
      return this.exp().add(this.negate().exp()).div(2);
    }
    /**
     * Hyperbolic tangent: tanh(x) = sinh(x)/cosh(x).
     */
  }, {
    key: "tanh",
    value: function tanh() {
      return this.sinh().div(this.cosh());
    }
    /**
     * Hyperbolic arcsine, the inverse of hyperbolic sine.
     */
  }, {
    key: "asinh",
    value: function asinh() {
      return Decimal2.ln(this.add(this.sqr().add(1).sqrt()));
    }
    /**
     * Hyperbolic arccosine, the inverse of hyperbolic cosine.
     */
  }, {
    key: "acosh",
    value: function acosh() {
      return Decimal2.ln(this.add(this.sqr().sub(1).sqrt()));
    }
    /**
     * Hyperbolic arcctangent, the inverse of hyperbolic tangent.
     */
  }, {
    key: "atanh",
    value: function atanh() {
      if (this.abs().gte(1)) {
        return FC_NN(Number.NaN, Number.NaN, Number.NaN);
      }
      return Decimal2.ln(this.add(1).div(Decimal2.fromNumber(1).sub(this))).div(2);
    }
    /**
     * Joke function from Realm Grinder
     */
  }, {
    key: "ascensionPenalty",
    value: function ascensionPenalty(ascensions) {
      if (ascensions === 0) {
        return this;
      }
      return this.root(Decimal2.pow(10, ascensions));
    }
    /**
     * Joke function from Cookie Clicker. It's 'egg'
     */
  }, {
    key: "egg",
    value: function egg() {
      return this.add(9);
    }
  }, {
    key: "lessThanOrEqualTo",
    value: function lessThanOrEqualTo(other) {
      return this.cmp(other) < 1;
    }
  }, {
    key: "lessThan",
    value: function lessThan(other) {
      return this.cmp(other) < 0;
    }
  }, {
    key: "greaterThanOrEqualTo",
    value: function greaterThanOrEqualTo(other) {
      return this.cmp(other) > -1;
    }
  }, {
    key: "greaterThan",
    value: function greaterThan(other) {
      return this.cmp(other) > 0;
    }
  }], [{
    key: "fromComponents",
    value: function fromComponents(sign, layer, mag) {
      return new Decimal2().fromComponents(sign, layer, mag);
    }
    /**
     * Turns the given components into a Decimal, but not necessarily a valid one (it's only valid if the components would already create a valid Decimal without normalization). Users of this library should not use this function.
     */
  }, {
    key: "fromComponents_noNormalize",
    value: function fromComponents_noNormalize(sign, layer, mag) {
      return new Decimal2().fromComponents_noNormalize(sign, layer, mag);
    }
    /**
     * Turns the mantissa and exponent into a valid Decimal with value mantissa * 10^exponent.
     */
  }, {
    key: "fromMantissaExponent",
    value: function fromMantissaExponent(mantissa, exponent) {
      return new Decimal2().fromMantissaExponent(mantissa, exponent);
    }
    /**
     * Turns the mantissa and exponent into a Decimal, but not necessarily a valid one. Users of this library should not use this function.
     */
  }, {
    key: "fromMantissaExponent_noNormalize",
    value: function fromMantissaExponent_noNormalize(mantissa, exponent) {
      return new Decimal2().fromMantissaExponent_noNormalize(mantissa, exponent);
    }
    /**
     * Creates a deep copy of the provided value.
     */
  }, {
    key: "fromDecimal",
    value: function fromDecimal(value) {
      return new Decimal2().fromDecimal(value);
    }
    /**
     * Converts a floating-point number into a Decimal.
     */
  }, {
    key: "fromNumber",
    value: function fromNumber(value) {
      return new Decimal2().fromNumber(value);
    }
    /**
     * Converts a string into a Decimal.
     *
     * If linearhyper4 is true, then strings like "10^^8.5" will use the linear approximation of tetration even for bases <= 10.
     */
  }, {
    key: "fromString",
    value: function fromString(value) {
      var linearhyper4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      return new Decimal2().fromString(value, linearhyper4);
    }
    /**
     * The function used by new Decimal() to create a new Decimal. Accepts a DecimalSource: uses fromNumber if given a number, uses fromString if given a string, and uses fromDecimal if given a Decimal.
     */
  }, {
    key: "fromValue",
    value: function fromValue(value) {
      return new Decimal2().fromValue(value);
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
  }, {
    key: "fromValue_noAlloc",
    value: function fromValue_noAlloc(value) {
      if (value instanceof Decimal2) {
        return value;
      } else if (typeof value === "string") {
        var cached = Decimal2.fromStringCache.get(value);
        if (cached !== void 0) {
          return cached;
        }
        return Decimal2.fromString(value);
      } else if (typeof value === "number") {
        return Decimal2.fromNumber(value);
      } else {
        return Decimal2.dZero;
      }
    }
    /**
     * Absolute value function: returns 'value' if 'value' >= 0, returns the negative of 'value' if 'value' < 0.
     */
  }, {
    key: "abs",
    value: function abs(value) {
      return D(value).abs();
    }
    /**
     * Returns the negative of the given value.
     */
  }, {
    key: "neg",
    value: function neg(value) {
      return D(value).neg();
    }
    /**
     * Returns the negative of the given value.
     */
  }, {
    key: "negate",
    value: function negate(value) {
      return D(value).neg();
    }
    /**
     * Returns the negative of the given value.
     */
  }, {
    key: "negated",
    value: function negated(value) {
      return D(value).neg();
    }
    /**
     * Returns the sign of the given value.
     */
  }, {
    key: "sign",
    value: function sign(value) {
      return D(value).sign;
    }
    /**
     * Returns the sign of the given value.
     */
  }, {
    key: "sgn",
    value: function sgn(value) {
      return D(value).sign;
    }
    /**
     * Rounds the value to the nearest integer.
     */
  }, {
    key: "round",
    value: function round(value) {
      return D(value).round();
    }
    /**
     * "Rounds" the value to the nearest integer that's less than or equal to it.
     */
  }, {
    key: "floor",
    value: function floor(value) {
      return D(value).floor();
    }
    /**
     * "Rounds" the value to the nearest integer that's greater than or equal to it.
     */
  }, {
    key: "ceil",
    value: function ceil(value) {
      return D(value).ceil();
    }
    /**
     * Extracts the integer part of the Decimal and returns it. Behaves like floor on positive numbers, but behaves like ceiling on negative numbers.
     */
  }, {
    key: "trunc",
    value: function trunc(value) {
      return D(value).trunc();
    }
    /**
     * Addition: returns the sum of the two Decimals.
     */
  }, {
    key: "add",
    value: function add(value, other) {
      return D(value).add(other);
    }
    /**
     * Addition: returns the sum of the two Decimals.
     */
  }, {
    key: "plus",
    value: function plus(value, other) {
      return D(value).add(other);
    }
    /**
     * Subtraction: returns the difference between 'value' and 'other'.
     */
  }, {
    key: "sub",
    value: function sub(value, other) {
      return D(value).sub(other);
    }
    /**
     * Subtraction: returns the difference between 'value' and 'other'.
     */
  }, {
    key: "subtract",
    value: function subtract(value, other) {
      return D(value).sub(other);
    }
    /**
     * Subtraction: returns the difference between 'value' and 'other'.
     */
  }, {
    key: "minus",
    value: function minus(value, other) {
      return D(value).sub(other);
    }
    /**
     * Multiplication: returns the product of the two Decimals.
     */
  }, {
    key: "mul",
    value: function mul(value, other) {
      return D(value).mul(other);
    }
    /**
     * Multiplication: returns the product of the two Decimals.
     */
  }, {
    key: "multiply",
    value: function multiply(value, other) {
      return D(value).mul(other);
    }
    /**
     * Multiplication: returns the product of the two Decimals.
     */
  }, {
    key: "times",
    value: function times(value, other) {
      return D(value).mul(other);
    }
    /**
     * Division: returns the quotient of 'value' and 'other'.
     */
  }, {
    key: "div",
    value: function div(value, other) {
      return D(value).div(other);
    }
    /**
     * Division: returns the quotient of 'value' and 'other'.
     */
  }, {
    key: "divide",
    value: function divide(value, other) {
      return D(value).div(other);
    }
    /**
     * Returns the reciprocal (1 / X) of the given value.
     */
  }, {
    key: "recip",
    value: function recip(value) {
      return D(value).recip();
    }
    /**
     * Returns the reciprocal (1 / X) of the given value.
     */
  }, {
    key: "reciprocal",
    value: function reciprocal(value) {
      return D(value).recip();
    }
    /**
     * Returns the reciprocal (1 / X) of the given value.
     */
  }, {
    key: "reciprocate",
    value: function reciprocate(value) {
      return D(value).reciprocate();
    }
    /**
     * Returns the remainder of 'value' divided by 'other': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
  }, {
    key: "mod",
    value: function mod(value, other) {
      return D(value).mod(other);
    }
    /**
     * Returns the remainder of 'value' divided by 'other': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
  }, {
    key: "modulo",
    value: function modulo(value, other) {
      return D(value).modulo(other);
    }
    /**
     * Returns the remainder of 'value' divided by 'other': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
     * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
     */
  }, {
    key: "modular",
    value: function modular(value, other) {
      return D(value).modular(other);
    }
    /**
     * Returns 1 if 'value' > 'other', returns -1 if 'value' < 'other', returns 0 if 'value' == 'other'.
     */
  }, {
    key: "cmp",
    value: function cmp(value, other) {
      return D(value).cmp(other);
    }
    /**
     * Compares the absolute values of this and value.
     * Returns 1 if |'value'| > |'other'|, returns -1 if |'value'| < |'other'|, returns 0 if |'value'| == |'other'|.
     */
  }, {
    key: "cmpabs",
    value: function cmpabs(value, other) {
      return D(value).cmpabs(other);
    }
    /**
     * Returns 1 if 'value' > 'other', returns -1 if 'value' < 'other', returns 0 if 'value' == 'other'.
     */
  }, {
    key: "compare",
    value: function compare(value, other) {
      return D(value).cmp(other);
    }
    /**
     * Returns true if the given value is an NaN value.
     */
  }, {
    key: "isNaN",
    value: function(_isNaN) {
      function isNaN2(_x) {
        return _isNaN.apply(this, arguments);
      }
      isNaN2.toString = function() {
        return _isNaN.toString();
      };
      return isNaN2;
    }(
      function(value) {
        value = D(value);
        return isNaN(value.sign) || isNaN(value.layer) || isNaN(value.mag);
      }
      /**
       * Returns true if the given value is finite (by Decimal standards, not by floating point standards - a humongous Decimal like 10^^10^100 is still finite!)
       */
    )
  }, {
    key: "isFinite",
    value: function(_isFinite) {
      function isFinite2(_x2) {
        return _isFinite.apply(this, arguments);
      }
      isFinite2.toString = function() {
        return _isFinite.toString();
      };
      return isFinite2;
    }(
      function(value) {
        value = D(value);
        return isFinite(value.sign) && isFinite(value.layer) && isFinite(value.mag);
      }
      /**
       * The Decimal equivalent of ==. Returns true if 'value' and 'other' have equal values.
       */
    )
  }, {
    key: "eq",
    value: function eq(value, other) {
      return D(value).eq(other);
    }
    /**
     * Returns true if 'value' and 'other' have equal values.
     */
  }, {
    key: "equals",
    value: function equals(value, other) {
      return D(value).eq(other);
    }
    /**
     * The Decimal equivalent of !=. Returns true if 'value' and 'other' do not have equal values.
     */
  }, {
    key: "neq",
    value: function neq(value, other) {
      return D(value).neq(other);
    }
    /**
     * Returns true if 'value' and 'other' do not have equal values.
     */
  }, {
    key: "notEquals",
    value: function notEquals(value, other) {
      return D(value).notEquals(other);
    }
    /**
     * The Decimal equivalent of <. Returns true if 'value' is less than 'other'.
     */
  }, {
    key: "lt",
    value: function lt(value, other) {
      return D(value).lt(other);
    }
    /**
     * The Decimal equivalent of <=. Returns true if 'value' is less than or equal to 'other'.
     */
  }, {
    key: "lte",
    value: function lte(value, other) {
      return D(value).lte(other);
    }
    /**
     * The Decimal equivalent of >. Returns true if 'value' is greater than 'other'.
     */
  }, {
    key: "gt",
    value: function gt(value, other) {
      return D(value).gt(other);
    }
    /**
     * The Decimal equivalent of >=. Returns true if 'value' is greater than or equal to 'other'.
     */
  }, {
    key: "gte",
    value: function gte(value, other) {
      return D(value).gte(other);
    }
    /**
     * Returns whichever of 'value' and 'other' is higher.
     */
  }, {
    key: "max",
    value: function max(value, other) {
      return D(value).max(other);
    }
    /**
     * Returns whichever of 'value' and 'other' is lower.
     */
  }, {
    key: "min",
    value: function min(value, other) {
      return D(value).min(other);
    }
    /**
     * Returns whichever of 'value' and 'other' has a larger absolute value.
     */
  }, {
    key: "minabs",
    value: function minabs(value, other) {
      return D(value).minabs(other);
    }
    /**
     * Returns whichever of 'value' and 'other' has a smaller absolute value.
     */
  }, {
    key: "maxabs",
    value: function maxabs(value, other) {
      return D(value).maxabs(other);
    }
    /**
     * A combination of minimum and maximum: the value returned by clamp is normally 'value', but it won't go below 'min' and it won't go above 'max'.
     * Therefore, if 'value' < 'min', then 'min' is returned, and if 'value' > 'max', then 'max' is returned.
     */
  }, {
    key: "clamp",
    value: function clamp(value, min, max) {
      return D(value).clamp(min, max);
    }
    /**
     * Returns 'value', unless 'value' is less than 'min', in which case 'min' is returned.
     */
  }, {
    key: "clampMin",
    value: function clampMin(value, min) {
      return D(value).clampMin(min);
    }
    /**
     * Returns 'value', unless 'value' is greater than 'max', in which case 'max' is returned.
     */
  }, {
    key: "clampMax",
    value: function clampMax(value, max) {
      return D(value).clampMax(max);
    }
    /**
     * Returns 1 if 'value' is greater than 'other', returns -1 if 'value' is less than 'other', returns 0 if 'value' is equal to 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "cmp_tolerance",
    value: function cmp_tolerance(value, other, tolerance) {
      return D(value).cmp_tolerance(other, tolerance);
    }
    /**
     * Returns 1 if 'value' is greater than 'other', returns -1 if 'value' is less than 'other', returns 0 if 'value' is equal to 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "compare_tolerance",
    value: function compare_tolerance(value, other, tolerance) {
      return D(value).cmp_tolerance(other, tolerance);
    }
    /**
     * Tests whether two Decimals are approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "eq_tolerance",
    value: function eq_tolerance(value, other, tolerance) {
      return D(value).eq_tolerance(other, tolerance);
    }
    /**
     * Tests whether two Decimals are approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "equals_tolerance",
    value: function equals_tolerance(value, other, tolerance) {
      return D(value).eq_tolerance(other, tolerance);
    }
    /**
     * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "neq_tolerance",
    value: function neq_tolerance(value, other, tolerance) {
      return D(value).neq_tolerance(other, tolerance);
    }
    /**
     * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "notEquals_tolerance",
    value: function notEquals_tolerance(value, other, tolerance) {
      return D(value).notEquals_tolerance(other, tolerance);
    }
    /**
     * Returns true if 'value' is less than 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "lt_tolerance",
    value: function lt_tolerance(value, other, tolerance) {
      return D(value).lt_tolerance(other, tolerance);
    }
    /**
     * Returns true if 'value' is less than or equal to 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "lte_tolerance",
    value: function lte_tolerance(value, other, tolerance) {
      return D(value).lte_tolerance(other, tolerance);
    }
    /**
     * Returns true if 'value' is greater than 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "gt_tolerance",
    value: function gt_tolerance(value, other, tolerance) {
      return D(value).gt_tolerance(other, tolerance);
    }
    /**
     * Returns true if 'value' is greater than or equal to 'other'.
     * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
  }, {
    key: "gte_tolerance",
    value: function gte_tolerance(value, other, tolerance) {
      return D(value).gte_tolerance(other, tolerance);
    }
    /**
     * "Positive log10": Returns the base-10 logarithm of nonnegative Decimals, but returns 0 for negative Decimals.
     */
  }, {
    key: "pLog10",
    value: function pLog10(value) {
      return D(value).pLog10();
    }
    /**
     * Returns the base-10 logarithm of abs('value').
     */
  }, {
    key: "absLog10",
    value: function absLog10(value) {
      return D(value).absLog10();
    }
    /**
     * Base-10 logarithm: returns the Decimal X such that 10^X = 'value'.
     * For numbers above layer 0, this is equivalent to subtracting 1 from layer and normalizing.
     */
  }, {
    key: "log10",
    value: function log10(value) {
      return D(value).log10();
    }
    /**
     * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'value'.
     */
  }, {
    key: "log",
    value: function log(value, base) {
      return D(value).log(base);
    }
    /**
     * Base-2 logarithm: returns the Decimal X such that 2^X = 'value'.
     */
  }, {
    key: "log2",
    value: function log2(value) {
      return D(value).log2();
    }
    /**
     * Base-e logarithm, also known as the "natural" logarithm: returns the Decimal X such that e^X = 'value'.
     */
  }, {
    key: "ln",
    value: function ln(value) {
      return D(value).ln();
    }
    /**
     * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'value'.
     */
  }, {
    key: "logarithm",
    value: function logarithm(value, base) {
      return D(value).logarithm(base);
    }
    /**
     * Exponentiation: Returns the result of 'value' ^ 'other' (often written as 'value' ** 'other' in programming languages).
     */
  }, {
    key: "pow",
    value: function pow(value, other) {
      return D(value).pow(other);
    }
    /**
     * Raises 10 to the power of 'value', i.e. (10^'value'). For positive numbers above 1, this is equivalent to adding 1 to the value's layer and normalizing.
     */
  }, {
    key: "pow10",
    value: function pow10(value) {
      return D(value).pow10();
    }
    /**
     * Roots are one of the inverses of exponentiation: this function finds the Decimal X such that X ^ 'other' = 'value'.
     * Equivalent to 'value' ^ (1 / 'other'), which is written here as value.pow(other.recip()).
     */
  }, {
    key: "root",
    value: function root(value, other) {
      return D(value).root(other);
    }
    /**
     * For positive integers, X factorial (written as X!) equals X * (X - 1) * (X - 2) *... * 3 * 2 * 1. 0! equals 1.
     * This can be extended to real numbers (except for negative integers) via the gamma function, which is what this function does.
     */
  }, {
    key: "factorial",
    value: function factorial(value, _other) {
      return D(value).factorial();
    }
    /**
     * The gamma function extends the idea of factorials to non-whole numbers using some calculus.
     * Gamma(x) is defined as the integral of t^(x-1) * e^-t dt from t = 0 to t = infinity,
     * and gamma(x) = (x - 1)! for nonnegative integer x, so the factorial for non-whole numbers is defined using the gamma function.
     */
  }, {
    key: "gamma",
    value: function gamma(value, _other) {
      return D(value).gamma();
    }
    /**
     * Returns the natural (base-e) logarithm of Gamma('value').
     */
  }, {
    key: "lngamma",
    value: function lngamma(value, _other) {
      return D(value).lngamma();
    }
    /**
     * Base-e exponentiation: returns e^'value'.
     */
  }, {
    key: "exp",
    value: function exp(value) {
      return D(value).exp();
    }
    /**
     * Squaring a number means multiplying it by itself, a.k.a. raising it to the second power.
     */
  }, {
    key: "sqr",
    value: function sqr(value) {
      return D(value).sqr();
    }
    /**
     * Square root: finds the Decimal X such that X * X, a.k.a X^2, equals 'value'. Equivalent to X^(1/2).
     */
  }, {
    key: "sqrt",
    value: function sqrt(value) {
      return D(value).sqrt();
    }
    /**
     * Cubing a number means raising it to the third power.
     */
  }, {
    key: "cube",
    value: function cube(value) {
      return D(value).cube();
    }
    /**
     * Cube root: finds the Decimal X such that X^3 equals 'value'. Equivalent to X^(1/3).
     */
  }, {
    key: "cbrt",
    value: function cbrt(value) {
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
  }, {
    key: "tetrate",
    value: function tetrate(value) {
      var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
      var payload = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : FC_NN(1, 0, 1);
      var linear = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
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
  }, {
    key: "iteratedexp",
    value: function iteratedexp(value) {
      var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
      var payload = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : FC_NN(1, 0, 1);
      var linear = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
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
  }, {
    key: "iteratedlog",
    value: function iteratedlog(value) {
      var base = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 10;
      var times = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
      var linear = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
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
  }, {
    key: "layeradd10",
    value: function layeradd10(value, diff) {
      var linear = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
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
  }, {
    key: "layeradd",
    value: function layeradd(value, diff) {
      var base = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 10;
      var linear = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
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
  }, {
    key: "slog",
    value: function slog(value) {
      var base = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 10;
      var linear = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      return D(value).slog(base, 100, linear);
    }
    /**
     * The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
     * https://en.wikipedia.org/wiki/Lambert_W_function
     */
  }, {
    key: "lambertw",
    value: function lambertw(value) {
      return D(value).lambertw();
    }
    /**
     * The super square-root function - what number, tetrated to height 2, equals 'value'? https://en.wikipedia.org/wiki/Tetration#Super-root
     */
  }, {
    key: "ssqrt",
    value: function ssqrt(value) {
      return D(value).ssqrt();
    }
    /**
     * Super-root, one of tetration's inverses - what number, tetrated to height 'degree', equals 'value'? https://en.wikipedia.org/wiki/Tetration#Super-root
     *
     * Only works with the linear approximation of tetration, as starting with analytic and then switching to linear would result in inconsistent behavior for super-roots.
     * This only matters for non-integer degrees.
     */
  }, {
    key: "linear_sroot",
    value: function linear_sroot(value, degree) {
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
  }, {
    key: "pentate",
    value: function pentate(value) {
      var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
      var payload = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : FC_NN(1, 0, 1);
      var linear = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
      return D(value).pentate(height, payload, linear);
    }
    /**
     * The sine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
     */
  }, {
    key: "sin",
    value: function sin(value) {
      return D(value).sin();
    }
    /**
     * The cosine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
     */
  }, {
    key: "cos",
    value: function cos(value) {
      return D(value).cos();
    }
    /**
     * The tangent function, equal to sine divided by cosine. Behaves periodically with period pi.
     */
  }, {
    key: "tan",
    value: function tan(value) {
      return D(value).tan();
    }
    /**
     * The arcsine function, the inverse of the sine function.
     */
  }, {
    key: "asin",
    value: function asin(value) {
      return D(value).asin();
    }
    /**
     * The arccosine function, the inverse of the cosine function.
     */
  }, {
    key: "acos",
    value: function acos(value) {
      return D(value).acos();
    }
    /**
     * The arctangent function, the inverse of the tangent function.
     */
  }, {
    key: "atan",
    value: function atan(value) {
      return D(value).atan();
    }
    /**
     * Hyperbolic sine: sinh(X) = (e^x - e^-x)/2.
     */
  }, {
    key: "sinh",
    value: function sinh(value) {
      return D(value).sinh();
    }
    /**
     * Hyperbolic cosine: cosh(x) = (e^x + e^-x)/2.
     */
  }, {
    key: "cosh",
    value: function cosh(value) {
      return D(value).cosh();
    }
    /**
     * Hyperbolic tangent: tanh(x) = sinh(x)/cosh(x).
     */
  }, {
    key: "tanh",
    value: function tanh(value) {
      return D(value).tanh();
    }
    /**
     * Hyperbolic arcsine, the inverse of hyperbolic sine.
     */
  }, {
    key: "asinh",
    value: function asinh(value) {
      return D(value).asinh();
    }
    /**
     * Hyperbolic arccosine, the inverse of hyperbolic cosine.
     */
  }, {
    key: "acosh",
    value: function acosh(value) {
      return D(value).acosh();
    }
    /**
     * Hyperbolic arcctangent, the inverse of hyperbolic tangent.
     */
  }, {
    key: "atanh",
    value: function atanh(value) {
      return D(value).atanh();
    }
    /**
     * If you're willing to spend 'resourcesAvailable' and want to buy something
     * with exponentially increasing cost each purchase (start at priceStart,
     * multiply by priceRatio, already own currentOwned), how much of it can you buy?
     * Adapted from Trimps source code.
     */
  }, {
    key: "affordGeometricSeries",
    value: function affordGeometricSeries(resourcesAvailable, priceStart, priceRatio, currentOwned) {
      return this.affordGeometricSeries_core(D(resourcesAvailable), D(priceStart), D(priceRatio), currentOwned);
    }
    /**
     * How much resource would it cost to buy (numItems) items if you already have currentOwned,
     * the initial price is priceStart and it multiplies by priceRatio each purchase?
     */
  }, {
    key: "sumGeometricSeries",
    value: function sumGeometricSeries(numItems, priceStart, priceRatio, currentOwned) {
      return this.sumGeometricSeries_core(numItems, D(priceStart), D(priceRatio), currentOwned);
    }
    /**
     * If you're willing to spend 'resourcesAvailable' and want to buy something with additively
     * increasing cost each purchase (start at priceStart, add by priceAdd, already own currentOwned),
     * how much of it can you buy?
     */
  }, {
    key: "affordArithmeticSeries",
    value: function affordArithmeticSeries(resourcesAvailable, priceStart, priceAdd, currentOwned) {
      return this.affordArithmeticSeries_core(D(resourcesAvailable), D(priceStart), D(priceAdd), D(currentOwned));
    }
    /**
     * How much resource would it cost to buy (numItems) items if you already have currentOwned,
     * the initial price is priceStart and it adds priceAdd each purchase?
     * Adapted from http://www.mathwords.com/a/arithmetic_series.htm
     */
  }, {
    key: "sumArithmeticSeries",
    value: function sumArithmeticSeries(numItems, priceStart, priceAdd, currentOwned) {
      return this.sumArithmeticSeries_core(D(numItems), D(priceStart), D(priceAdd), D(currentOwned));
    }
    /**
     * When comparing two purchases that cost (resource) and increase your resource/sec by (deltaRpS),
     * the lowest efficiency score is the better one to purchase.
     * From Frozen Cookies:
     * http://cookieclicker.wikia.com/wiki/Frozen_Cookies_(JavaScript_Add-on)#Efficiency.3F_What.27s_that.3F
     */
  }, {
    key: "efficiencyOfPurchase",
    value: function efficiencyOfPurchase(cost, currentRpS, deltaRpS) {
      return this.efficiencyOfPurchase_core(D(cost), D(currentRpS), D(deltaRpS));
    }
  }, {
    key: "randomDecimalForTesting",
    value: function randomDecimalForTesting(maxLayers) {
      if (Math.random() * 20 < 1) {
        return FC_NN(0, 0, 0);
      }
      var randomsign = Math.random() > 0.5 ? 1 : -1;
      if (Math.random() * 20 < 1) {
        return FC_NN(randomsign, 0, 1);
      }
      var layer = Math.floor(Math.random() * (maxLayers + 1));
      var randomexp = layer === 0 ? Math.random() * 616 - 308 : Math.random() * 16;
      if (Math.random() > 0.9) {
        randomexp = Math.trunc(randomexp);
      }
      var randommag = Math.pow(10, randomexp);
      if (Math.random() > 0.9) {
        randommag = Math.trunc(randommag);
      }
      return FC(randomsign, layer, randommag);
    }
  }, {
    key: "affordGeometricSeries_core",
    value: function affordGeometricSeries_core(resourcesAvailable, priceStart, priceRatio, currentOwned) {
      var actualStart = priceStart.mul(priceRatio.pow(currentOwned));
      return Decimal2.floor(resourcesAvailable.div(actualStart).mul(priceRatio.sub(1)).add(1).log10().div(priceRatio.log10()));
    }
  }, {
    key: "sumGeometricSeries_core",
    value: function sumGeometricSeries_core(numItems, priceStart, priceRatio, currentOwned) {
      return priceStart.mul(priceRatio.pow(currentOwned)).mul(Decimal2.sub(1, priceRatio.pow(numItems))).div(Decimal2.sub(1, priceRatio));
    }
  }, {
    key: "affordArithmeticSeries_core",
    value: function affordArithmeticSeries_core(resourcesAvailable, priceStart, priceAdd, currentOwned) {
      var actualStart = priceStart.add(currentOwned.mul(priceAdd));
      var b = actualStart.sub(priceAdd.div(2));
      var b2 = b.pow(2);
      return b.neg().add(b2.add(priceAdd.mul(resourcesAvailable).mul(2)).sqrt()).div(priceAdd).floor();
    }
  }, {
    key: "sumArithmeticSeries_core",
    value: function sumArithmeticSeries_core(numItems, priceStart, priceAdd, currentOwned) {
      var actualStart = priceStart.add(currentOwned.mul(priceAdd));
      return numItems.div(2).mul(actualStart.mul(2).plus(numItems.sub(1).mul(priceAdd)));
    }
  }, {
    key: "efficiencyOfPurchase_core",
    value: function efficiencyOfPurchase_core(cost, currentRpS, deltaRpS) {
      return cost.div(currentRpS).add(cost.div(deltaRpS));
    }
  }, {
    key: "slog_critical",
    value: function slog_critical(base, height) {
      if (base > 10) {
        return height - 1;
      }
      return Decimal2.critical_section(base, height, critical_slog_values);
    }
  }, {
    key: "tetrate_critical",
    value: function tetrate_critical(base, height) {
      return Decimal2.critical_section(base, height, critical_tetr_values);
    }
  }, {
    key: "critical_section",
    value: function critical_section(base, height, grid) {
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
      var lower = 0;
      var upper = 0;
      for (var i = 0; i < critical_headers.length; ++i) {
        if (critical_headers[i] == base) {
          lower = grid[i][Math.floor(height)];
          upper = grid[i][Math.ceil(height)];
          break;
        } else if (critical_headers[i] < base && critical_headers[i + 1] > base) {
          var basefrac = (base - critical_headers[i]) / (critical_headers[i + 1] - critical_headers[i]);
          lower = grid[i][Math.floor(height)] * (1 - basefrac) + grid[i + 1][Math.floor(height)] * basefrac;
          upper = grid[i][Math.ceil(height)] * (1 - basefrac) + grid[i + 1][Math.ceil(height)] * basefrac;
          break;
        }
      }
      var frac = height - Math.floor(height);
      if (lower <= 0 || upper <= 0) {
        return lower * (1 - frac) + upper * frac;
      } else {
        return Math.pow(base, Math.log(lower) / Math.log(base) * (1 - frac) + Math.log(upper) / Math.log(base) * frac);
      }
    }
  }]);
  return Decimal2;
}();
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
D = Decimal.fromValue_noAlloc;
FC = Decimal.fromComponents;
FC_NN = Decimal.fromComponents_noNormalize;
Decimal.fromMantissaExponent;
Decimal.fromMantissaExponent_noNormalize;

// src/classes/Boost.ts
var BoostObject = class {
  // eslint-disable-next-line jsdoc/require-returns
  /** @deprecated Use {@link description} instead */
  get desc() {
    return this.description;
  }
  get description() {
    return this.descriptionFn();
  }
  constructor(init) {
    this.id = init.id;
    this.name = init.name ?? "";
    this.descriptionFn = init.description ? typeof init.description === "function" ? init.description : () => init.description : () => "";
    this.value = init.value;
    this.order = init.order ?? 99;
  }
};
var Boost = class {
  /**
   * Constructs a new boost manager.
   * @param baseEffect - The base effect value to which boosts are applied.
   * @param boosts - An array of boost objects to initialize with.
   */
  constructor(baseEffect = 1, boosts) {
    /**
     * @alias setBoost
     * @deprecated Use {@link setBoost} instead.
     */
    this.addBoost = this.setBoost;
    boosts = boosts ? Array.isArray(boosts) ? boosts : [boosts] : void 0;
    this.baseEffect = new Decimal(baseEffect);
    this.boostArray = [];
    if (boosts) {
      boosts.forEach((boostObj) => {
        this.boostArray.push(new BoostObject(boostObj));
      });
    }
  }
  getBoosts(id, index) {
    const boostList = [];
    const indexList = [];
    for (let i = 0; i < this.boostArray.length; i++) {
      if (typeof id === "string" && id === this.boostArray[i].id || id instanceof RegExp && id.test(this.boostArray[i].id)) {
        boostList.push(this.boostArray[i]);
        indexList.push(i);
      }
    }
    return index ? [boostList, indexList] : boostList;
  }
  /**
   * Gets a boost object by its ID.
   * @deprecated Use {@link getBoosts} instead.
   * @param id - The ID of the boost to retrieve.
   * @returns The boost object if found, or null if not found.
   */
  getBoost(id) {
    return this.getBoosts(id)[0] ?? null;
  }
  /**
   * Removes a boost by its ID. Only removes the first instance of the id.
   * @param id - The ID of the boost to remove.
   * @example
   * // Remove the boost with the ID "healthBoost"
   * boost.removeBoost("healthBoost");
   */
  removeBoost(id) {
    for (let i = 0; i < this.boostArray.length; i++) {
      if (id === this.boostArray[i].id) {
        this.boostArray.splice(i, 1);
        break;
      }
    }
  }
  setBoost(arg1, arg2, arg3, arg4, arg5) {
    if (!arg1)
      return;
    if (typeof arg1 === "string") {
      const id = arg1;
      const name = arg2 ?? "";
      const description = arg3 ?? "";
      const value = arg4 ?? ((e) => e);
      const order = arg5;
      const bCheck = this.getBoosts(id, true);
      if (!bCheck[0][0]) {
        this.boostArray.push(new BoostObject({ id, name, description, value, order }));
      } else {
        this.boostArray[bCheck[1][0]] = new BoostObject({ id, name, description, value, order });
      }
    } else {
      arg1 = Array.isArray(arg1) ? arg1 : [arg1];
      for (let i = 0; i < arg1.length; i++) {
        const bCheck = this.getBoosts(arg1[i].id, true);
        if (!bCheck[0][0]) {
          this.boostArray.push(new BoostObject(arg1[i]));
        } else {
          this.boostArray[bCheck[1][0]] = new BoostObject(arg1[i]);
        }
      }
    }
  }
  /**
   * Calculates the cumulative effect of all boosts on the base effect.
   * @param base - The base effect value to calculate with. Defaults to the base effect of the boost manager.
   * @returns The calculated effect after applying boosts.
   * @example
   * // Calculate the effect of all boosts
   * const finalEffect = boost.calculate();
   */
  calculate(base = this.baseEffect) {
    let output = new Decimal(base);
    let boosts = this.boostArray;
    boosts = boosts.sort((a, b) => a.order - b.order);
    for (let i = 0; i < boosts.length; i++) {
      output = boosts[i].value(output);
    }
    return output;
  }
};

// src/classes/Upgrade.ts
var import_reflect_metadata = require("reflect-metadata");
var import_class_transformer = require("class-transformer");

// src/E/lru-cache.ts
var LRUCache2 = class {
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
    const node = new ListNode3(key, value);
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
var ListNode3 = class {
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

// src/classes/numericalAnalysis.ts
var DEFAULT_ITERATIONS = 25;
function inverseFunctionApprox(f, n, mode = "geometric", iterations = DEFAULT_ITERATIONS) {
  let lowerBound = new Decimal(1);
  let upperBound = new Decimal(n);
  if (f(upperBound).eq(0)) {
    return {
      value: new Decimal(0),
      lowerBound: new Decimal(0),
      upperBound: new Decimal(0)
    };
  }
  if (f(upperBound).lt(n)) {
    console.warn("The function is not monotonically increasing. (f(n) < n)");
    return {
      value: upperBound,
      lowerBound: upperBound,
      upperBound
    };
  }
  for (let i = 0; i < iterations; i++) {
    let mid;
    switch (mode) {
      case "arithmetic":
      case 1:
        mid = lowerBound.add(upperBound).div(2);
        break;
      case "geometric":
      case 2:
        mid = lowerBound.mul(upperBound).sqrt();
        break;
    }
    const midValue = f(mid);
    if (midValue.eq(n)) {
      return {
        value: mid,
        lowerBound: mid,
        upperBound: mid
      };
    } else if (midValue.lt(n)) {
      lowerBound = mid;
    } else {
      upperBound = mid;
    }
  }
  const out = {
    value: lowerBound,
    lowerBound,
    upperBound
  };
  return out;
}
function calculateSumLoop(f, b, a = 0, epsilon = new Decimal("1e-3")) {
  let sum = new Decimal();
  let n = new Decimal(b);
  for (; n.gte(a); n = n.sub(1)) {
    const initSum = sum;
    const value = f(n);
    sum = sum.add(value);
    const diff = initSum.div(sum);
    if (diff.lte(1) && diff.gt(new Decimal(1).sub(epsilon)))
      break;
  }
  return sum;
}
function calculateSumApprox(f, b, a = 0, iterations = DEFAULT_ITERATIONS) {
  a = new Decimal(a);
  b = new Decimal(b);
  let sum = new Decimal(0);
  const intervalWidth = b.sub(a).div(iterations);
  for (let i = 0; i < iterations; i++) {
    const x0 = a.add(intervalWidth.mul(i));
    const x1 = a.add(intervalWidth.mul(i + 1));
    sum = sum.add(f(x0).add(f(x1)).div(2).mul(intervalWidth));
  }
  return sum;
}
function calculateSum(f, b, a = 0, epsilon, iterations) {
  a = new Decimal(a);
  b = new Decimal(b);
  if (b.sub(a).lte(DEFAULT_ITERATIONS)) {
    return calculateSumLoop(f, b, a, epsilon);
  } else {
    return calculateSumApprox(f, b, a, iterations);
  }
}

// src/classes/Upgrade.ts
function calculateUpgrade(value, upgrade, start, end, mode, iterations, el = false) {
  value = new Decimal(value);
  start = new Decimal(start ?? upgrade.level);
  end = new Decimal(end ?? value);
  const target = end.sub(start);
  if (target.lte(0)) {
    console.warn("calculateUpgrade: Invalid target: ", target);
    return [new Decimal(0), new Decimal(0)];
  }
  el = (typeof upgrade.el === "function" ? upgrade.el() : upgrade.el) ?? el;
  if (target.eq(1)) {
    const cost2 = upgrade.cost(upgrade.level);
    const canAfford = value.gte(cost2);
    let out = [new Decimal(0), new Decimal(0)];
    if (el) {
      out[0] = canAfford ? new Decimal(1) : new Decimal(0);
      return out;
    } else {
      out = [canAfford ? new Decimal(1) : new Decimal(0), canAfford ? cost2 : new Decimal(0)];
      return out;
    }
  }
  if (upgrade.costBulk) {
    const [amount, cost2] = upgrade.costBulk(value, upgrade.level, target);
    const canAfford = value.gte(cost2);
    const out = [canAfford ? amount : new Decimal(0), canAfford && !el ? cost2 : new Decimal(0)];
    if (el) {
    } else {
    }
    return out;
  }
  if (el) {
    const costTargetFn = (level) => upgrade.cost(level.add(start));
    const maxLevelAffordable2 = Decimal.min(end, inverseFunctionApprox(costTargetFn, value, mode, iterations).value.floor());
    const cost2 = new Decimal(0);
    return [maxLevelAffordable2, cost2];
  }
  const maxLevelAffordable = inverseFunctionApprox(
    (x) => calculateSum(upgrade.cost, x, start),
    value,
    mode,
    iterations
  ).value.floor();
  const cost = calculateSum(upgrade.cost, maxLevelAffordable, start);
  const maxLevelAffordableActual = maxLevelAffordable.sub(start).add(1).max(0);
  return [maxLevelAffordableActual, cost];
}
function decimalToJSONString(n) {
  n = new Decimal(n);
  return `${n.sign}/${n.mag}/${n.layer}`;
}
function upgradeToCacheNameSum(start, end) {
  return `sum/${decimalToJSONString(start)}/${decimalToJSONString(end)}}`;
}
function upgradeToCacheNameEL(level) {
  return `el/${decimalToJSONString(level)}`;
}
var UpgradeData = class {
  /**
   * Constructs a new upgrade object with an initial level of 1 (or the provided level)
   * @param init - The upgrade object to initialize.
   */
  constructor(init) {
    init = init ?? {};
    this.id = init.id;
    this.level = init.level ? new Decimal(init.level) : new Decimal(1);
  }
};
__decorateClass([
  (0, import_class_transformer.Expose)()
], UpgradeData.prototype, "id", 2);
__decorateClass([
  (0, import_class_transformer.Type)(() => Decimal)
], UpgradeData.prototype, "level", 2);
var UpgradeStatic = class _UpgradeStatic {
  static {
    /** The default size of the cache. Should be one less than a power of 2. */
    this.cacheSize = 63;
  }
  /** @returns The data of the upgrade. */
  get data() {
    return this.dataPointerFn();
  }
  get description() {
    return this.descriptionFn();
  }
  /**
   * The current level of the upgrade.
   * @returns The current level of the upgrade.
   */
  get level() {
    return ((this ?? { data: { level: new Decimal(1) } }).data ?? { level: new Decimal(1) }).level;
  }
  set level(n) {
    this.data.level = new Decimal(n);
  }
  /**
   * Constructs a new static upgrade object.
   * @param init - The upgrade object to initialize.
   * @param dataPointer - A function or reference that returns the pointer of the data / frontend.
   * @param cacheSize - The size of the cache. Should be one less than a power of 2. See {@link cache}
   */
  constructor(init, dataPointer, cacheSize) {
    const data = typeof dataPointer === "function" ? dataPointer() : dataPointer;
    this.dataPointerFn = typeof dataPointer === "function" ? dataPointer : () => data;
    this.cache = new LRUCache2(cacheSize ?? _UpgradeStatic.cacheSize);
    this.id = init.id;
    this.name = init.name ?? init.id;
    this.descriptionFn = init.description ? typeof init.description === "function" ? init.description : () => init.description : () => "";
    this.cost = init.cost;
    this.costBulk = init.costBulk;
    this.maxLevel = init.maxLevel;
    this.effect = init.effect;
    this.el = init.el;
  }
  getCached(type, start, end) {
    if (type === "sum") {
      return this.cache.get(upgradeToCacheNameSum(start, end));
    } else {
      return this.cache.get(upgradeToCacheNameEL(start));
    }
  }
  setCached(type, start, endOrStart, costSum) {
    const data = type === "sum" ? {
      id: this.id,
      el: false,
      start: new Decimal(start),
      end: new Decimal(endOrStart),
      cost: new Decimal(costSum)
    } : {
      id: this.id,
      el: true,
      level: new Decimal(start),
      cost: new Decimal(endOrStart)
    };
    if (type === "sum") {
      this.cache.set(upgradeToCacheNameSum(start, endOrStart), data);
    } else {
      this.cache.set(upgradeToCacheNameEL(start), data);
    }
    return data;
  }
};

// src/classes/Currency.ts
var Currency = class {
  // public upgrades: UpgradeData<string>[];
  // /** A boost object that affects the currency gain. */
  // @Expose()
  // public boost: boost;
  /**
   * Constructs a new currency object with an initial value of 0.
   */
  constructor() {
    this.value = new Decimal(0);
    this.upgrades = {};
  }
};
__decorateClass([
  (0, import_class_transformer2.Type)(() => Decimal)
], Currency.prototype, "value", 2);
__decorateClass([
  (0, import_class_transformer2.Type)(() => UpgradeData)
], Currency.prototype, "upgrades", 2);
var CurrencyStatic = class {
  /** @returns The pointer of the data. */
  get pointer() {
    return this.pointerFn();
  }
  /**
   * The current value of the currency.
   * Note: If you want to change the value, use {@link gain} instead.
   * @returns The current value of the currency.
   */
  get value() {
    return this.pointer.value;
  }
  set value(value) {
    this.pointer.value = value;
  }
  /**
   * @param pointer - A function or reference that returns the pointer of the data / frontend.
   * @param upgrades - An array of upgrade objects.
   * @param defaults - The default value and boost of the currency.
   */
  constructor(pointer = new Currency(), upgrades, defaults = { defaultVal: new Decimal(0), defaultBoost: new Decimal(1) }) {
    this.defaultVal = defaults.defaultVal;
    this.defaultBoost = defaults.defaultBoost;
    this.pointerFn = typeof pointer === "function" ? pointer : () => pointer;
    this.boost = new Boost(this.defaultBoost);
    this.pointer.value = this.defaultVal;
    this.upgrades = {
      // *[Symbol.iterator] () {
      //     for (const upgrade of Object.values(this)) {
      //         yield upgrade;
      //     }
      // },
    };
    if (upgrades)
      this.addUpgrade(upgrades);
    this.upgrades = this.upgrades;
  }
  /**
   * Updates / applies effects to the currency on load.
   */
  onLoadData() {
    for (const upgrade of Object.values(this.upgrades)) {
      upgrade.effect?.(upgrade.level, upgrade);
    }
  }
  /**
   * Resets the currency and upgrade levels.
   * @param resetCurrency - Whether to reset the currency value. Default is true.
   * @param resetUpgradeLevels - Whether to reset the upgrade levels. Default is true.
   * @example
   * currency.reset();
   * console.log(currency.value); // new Decimal(0), or the default value
   */
  reset(resetCurrency = true, resetUpgradeLevels = true) {
    if (resetCurrency)
      this.value = this.defaultVal;
    if (resetUpgradeLevels) {
      for (const upgrade of Object.values(this.upgrades)) {
        upgrade.level = new Decimal(0);
      }
    }
    ;
  }
  /**
   * The new currency value after applying the boost.
   * @param dt - Deltatime / multipler in milliseconds, assuming you gain once every second. Ex. 500 = 0.5 seconds = half gain.
   * @returns What was gained, NOT the new value.
   * @example
   * // Gain a random number between 1 and 10, and return the amount gained.
   * currency.gain(Math.random() * 10000);
   */
  gain(dt = 1e3) {
    const toAdd = this.boost.calculate().mul(new Decimal(dt).div(1e3));
    this.pointer.value = this.pointer.value.add(toAdd);
    return toAdd;
  }
  /**
   * Adds an upgrade to the data class.
   * @param upgrades - Upgrade to add
   * @returns The upgrade object.
   */
  pointerAddUpgrade(upgrades) {
    const upgradesToAdd = new UpgradeData(upgrades);
    this.pointer.upgrades[upgradesToAdd.id] = upgradesToAdd;
    return upgradesToAdd;
  }
  /**
   * Retrieves an upgrade object from the data pointer based on the provided id.
   * @param id - The id of the upgrade to retrieve.
   * @returns The upgrade object if found, otherwise null.
   */
  pointerGetUpgrade(id) {
    return this.pointer.upgrades[id] ?? null;
  }
  /**
   * Retrieves an upgrade object based on the provided id.
   * @param id - The id of the upgrade to retrieve.
   * @returns The upgrade object if found, otherwise null.
   * @example
   * const upgrade = currency.getUpgrade("healthBoost");
   * console.log(upgrade); // upgrade object
   */
  // public getUpgrade (id: string): UpgradeStatic | null {
  getUpgrade(id) {
    return this.upgrades[id] ?? null;
  }
  /**
   * Creates upgrades. To update an upgrade, use {@link updateUpgrade} instead.
   * @param upgrades - An array of upgrade objects.
   * @param runEffectInstantly - Whether to run the effect immediately. Defaults to `true`.
   * @returns The added upgrades.
   * @example
   * currency.addUpgrade({
   *     id: "healthBoost", // The ID of the upgrade, used to retrieve it later
   *     name: "Health Boost", // The name of the upgrade, for display purposes (optional, defaults to the ID)
   *     description: "Increases health by 10.", // The description of the upgrade, for display purposes (optional, defaults to "")
   *     cost: (level) => level.mul(10), // Cost of the upgrade, 10 times the level
   *     maxLevel: 10, // Maximum level of the upgrade (optional, defaults to 1)
   *     // Effect of the upgrade (runs when the upgrade is bought, and instantly if runEffectInstantly is true)
   *     effect: (level, context) => {
   *         // Set / update the boost
   *         // health: currencyStatic
   *         health.boost.setBoost(
   *             "healthBoost",
   *             "Health Boost",
   *             "Boosts health by 2x per level.",
   *             n => n.mul(Decimal.pow(2, level.sub(1))),
   *             2,
   *         );
   *     }
   * });
   */
  addUpgrade(upgrades, runEffectInstantly = true) {
    if (!Array.isArray(upgrades))
      upgrades = [upgrades];
    const addedUpgradeList = {};
    for (const upgrade of upgrades) {
      const addedUpgradeData = this.pointerAddUpgrade(upgrade);
      const addedUpgradeStatic = new UpgradeStatic(upgrade, () => this.pointerGetUpgrade(upgrade.id));
      if (addedUpgradeStatic.effect && runEffectInstantly)
        addedUpgradeStatic.effect(addedUpgradeStatic.level, addedUpgradeStatic);
      addedUpgradeList[upgrade.id] = addedUpgradeStatic;
      this.upgrades[upgrade.id] = addedUpgradeStatic;
    }
    return Object.values(addedUpgradeList);
  }
  /**
   * Updates an upgrade. To create an upgrade, use {@link addUpgrade} instead.
   * @param id - The id of the upgrade to update.
   * @param upgrade - The upgrade object to update.
   * @example
   * currency.updateUpgrade("healthBoost", {
   *     name: "New Health Boost".
   *     cost: (level) => level.mul(20),
   *     maxLevel: 20,
   *     effect: (level, context) => {
   *         console.log("Health Boost effect");
   *     }
   * });
   */
  updateUpgrade(id, upgrade) {
    const upgrade1 = this.getUpgrade(id);
    if (upgrade1 === null)
      return;
    upgrade1.name = upgrade.name ?? upgrade1.name;
    upgrade1.cost = upgrade.cost ?? upgrade1.cost;
    upgrade1.maxLevel = upgrade.maxLevel ?? upgrade1.maxLevel;
    upgrade1.effect = upgrade.effect ?? upgrade1.effect;
  }
  /**
   * Calculates the cost and how many upgrades you can buy.
   * See {@link calculateUpgrade} for more information.
   * @param id - The ID or position of the upgrade to calculate.
   * @param target - The target level or quantity to reach for the upgrade. If omitted, it calculates the maximum affordable quantity.
   * @param mode - See the argument in {@link calculateUpgrade}.
   * @param iterations - See the argument in {@link calculateUpgrade}.
   * @returns The amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [new Decimal(0), new Decimal(0)].
   * @example
   * // Calculate how many healthBoost upgrades you can buy and the cost of the upgrades
   * const [amount, cost] = currency.calculateUpgrade("healthBoost", 10);
   */
  // public calculateUpgrade (id: string, target: DecimalSource = 1, el: boolean = false): [amount: Decimal, cost: Decimal] {
  calculateUpgrade(id, target, mode, iterations) {
    const upgrade = this.getUpgrade(id);
    if (upgrade === null) {
      console.warn(`Upgrade "${id}" not found.`);
      return [new Decimal(0), new Decimal(0)];
    }
    return calculateUpgrade(this.value, upgrade, upgrade.level, target ? upgrade.level.add(target) : void 0, mode, iterations);
  }
  /**
   * Calculates how much is needed for the next upgrade.
   * @param id - Index or ID of the upgrade
   * @param target - How many before the next upgrade
   * @param mode - See the argument in {@link calculateUpgrade}.
   * @param iterations - See the argument in {@link calculateUpgrade}.
   * @returns The cost of the next upgrade.
   * @example
   * // Calculate the cost of the next healthBoost upgrade
   * const nextCost = currency.getNextCost("healthBoost");
   */
  getNextCost(id, target = 0, mode, iterations) {
    const upgrade = this.getUpgrade(id);
    if (upgrade === null) {
      console.warn(`Upgrade "${id}" not found.`);
      return new Decimal(0);
    }
    const amount = calculateUpgrade(this.value, upgrade, upgrade.level, upgrade.level.add(target), mode, iterations)[1];
    const nextCost = upgrade.cost(upgrade.level.add(amount));
    return nextCost;
  }
  /**
   * Buys an upgrade based on its ID or array position if enough currency is available.
   * @param id - The ID or position of the upgrade to buy or upgrade.
   * @param target - The target level or quantity to reach for the upgrade. See the argument in {@link calculateUpgrade}.
   * @param mode - See the argument in {@link calculateUpgrade}.
   * @param iterations - See the argument in {@link calculateUpgrade}.
   * @returns Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
   * @example
   * // Attempt to buy up to 10 healthBoost upgrades at once
   * currency.buyUpgrade("healthBoost", 10);
   */
  buyUpgrade(id, target, mode, iterations) {
    const upgrade = this.getUpgrade(id);
    if (upgrade === null) {
      console.warn(`Upgrade "${id}" not found.`);
      return false;
    }
    const [amount, cost] = this.calculateUpgrade(id, target, mode, iterations);
    if (amount.lte(0)) {
      return false;
    }
    this.pointer.value = this.pointer.value.sub(cost);
    upgrade.level = upgrade.level.add(amount);
    upgrade.effect?.(upgrade.level, upgrade);
    return true;
  }
};

// src/classes/Attribute.ts
var import_reflect_metadata3 = require("reflect-metadata");
var import_class_transformer3 = require("class-transformer");
var Attribute = class {
  /**
   * Constructs a static attribute with an initial effect.
   * @param initial - The inital value of the attribute.
   */
  constructor(initial = 0) {
    this.value = new Decimal(initial);
  }
};
__decorateClass([
  (0, import_class_transformer3.Type)(() => Decimal)
], Attribute.prototype, "value", 2);
var AttributeStatic = class {
  /** @returns The data for the attribute. */
  get pointer() {
    return this.pointerFn();
  }
  /**
   * Constructs a new instance of the Attribute class.
   * @param pointer - A function or an instance of the attribute class. Defaults to a new instance of the attribute class.
   * @param useBoost - Indicates whether to use boost for the attribute. Defaults to true. (hint: if you don't use boost, don't use this class and use Decimal directly)
   * @param initial - The initial value of the attribute. Defaults to 0.
   */
  constructor(pointer, useBoost = true, initial = 0) {
    this.initial = new Decimal(initial);
    pointer ??= new Attribute(this.initial);
    this.pointerFn = typeof pointer === "function" ? pointer : () => pointer;
    this.boost = useBoost ? new Boost(this.initial) : null;
  }
  /**
   * Updates the value of the attribute.
   * NOTE: This method must be called every time the boost is updated, else the value stored will not be updated.
   * @deprecated This is automatically called when the value is accessed. It will be removed in the future.
   */
  update() {
    console.warn("AttributeStatic.update is deprecated and will be removed in the future. The value is automatically updated when accessed.");
    if (this.boost) {
      this.pointer.value = this.boost.calculate();
    }
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

// src/game/managers/ConfigManager.ts
var ConfigManager = class {
  /**
   * Constructs a new configuration manager.
   * @param configOptionTemplate - The template to use for default values.
   */
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
    function parseObject(obj, template) {
      for (const key in template) {
        if (typeof obj[key] === "undefined") {
          obj[key] = template[key];
        } else if (typeof obj[key] === "object" && typeof template[key] === "object" && !Array.isArray(obj[key]) && !Array.isArray(template[key])) {
          obj[key] = parseObject(obj[key], template[key]);
        }
      }
      return obj;
    }
    return parseObject(config, this.configOptionTemplate);
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
  fps: 30,
  pixiApp: void 0
};
var keys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ".split("").concat(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
var KeyManager = class _KeyManager {
  /**
   * Creates a new key manager.
   * @param config - The configuration for the key manager.
   */
  constructor(config) {
    /** @deprecated Use {@link addKey} instead. */
    this.addKeys = this.addKey;
    this.keysPressed = [];
    this.binds = [];
    this.tickers = [];
    this.config = _KeyManager.configManager.parse(config);
    if (this.config.autoAddInterval) {
      if (this.config.pixiApp) {
        this.config.pixiApp.ticker.add((dt) => {
          for (const ticker of this.tickers) {
            ticker(dt);
          }
        });
      } else {
        const fps = this.config.fps ? this.config.fps : 30;
        this.tickerInterval = setInterval(() => {
          for (const ticker of this.tickers) {
            ticker(1e3 / fps);
          }
        }, 1e3 / fps);
      }
    }
    if (typeof document === "undefined") {
      return;
    }
    this.tickers.push((dt) => {
      for (const bind of this.binds) {
        if ((bind.onDownContinuous || bind.fn) && this.isPressing(bind.name)) {
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
    } else if (this.config.pixiApp) {
      this.config.pixiApp.ticker.maxFPS = fps;
    }
  }
  /**
   * Adds keys to the list of keys pressed.
   * @param event - The event to add the key from.
   * @param type - Whether to add or remove the key. `true` to add, `false` to remove.
   */
  logKey(event, type) {
    const key = event.key;
    if (type && !this.keysPressed.includes(key))
      this.keysPressed.push(key);
    else if (!type && this.keysPressed.includes(key))
      this.keysPressed.splice(this.keysPressed.indexOf(key), 1);
  }
  /**
   * Manages onDown, onPress, and onUp events for all key bindings.
   * @param eventType - The type of event to call for.
   * @param keypress - The key that was pressed.
   */
  onAll(eventType, keypress) {
    for (const bind of this.binds) {
      if (eventType === "down" && bind.key === keypress && bind.onDown) {
        bind.onDown();
      }
      if (eventType === "press" && bind.key === keypress && bind.onPress) {
        bind.onPress();
      }
      if (eventType === "up" && bind.key === keypress && bind.onUp) {
        bind.onUp();
      }
    }
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
   * Gets a key binding by its name.
   * @param name - The name of the key binding to get.
   * @returns The key binding, if found.
   */
  getBind(name) {
    return this.binds.find((current) => current.name === name);
  }
  addKey(nameOrKeysToAdd, key, fn) {
    nameOrKeysToAdd = typeof nameOrKeysToAdd === "string" ? [{ name: nameOrKeysToAdd, key, fn }] : nameOrKeysToAdd;
    nameOrKeysToAdd = Array.isArray(nameOrKeysToAdd) ? nameOrKeysToAdd : [nameOrKeysToAdd];
    for (const keyBinding of nameOrKeysToAdd) {
      const existing = this.getBind(keyBinding.name);
      if (existing) {
        Object.assign(existing, keyBinding);
        continue;
      }
      this.binds.push(keyBinding);
    }
  }
};

// src/game/managers/EventManager.ts
var EventTypes = /* @__PURE__ */ ((EventTypes2) => {
  EventTypes2["interval"] = "interval";
  EventTypes2["timeout"] = "timeout";
  return EventTypes2;
})(EventTypes || {});
var eventManagerDefaultConfig = {
  autoAddInterval: true,
  fps: 30,
  pixiApp: void 0
};
var EventManager = class _EventManager {
  /**
   * Creates a new event manager.
   * @param config - The config to use for this event manager.
   */
  constructor(config) {
    /**
     * Adds a new event
     * @deprecated Use {@link EventManager.setEvent} instead.
     * @alias eventManager.setEvent
     */
    this.addEvent = this.setEvent;
    this.config = _EventManager.configManager.parse(config);
    this.events = {};
    if (this.config.autoAddInterval) {
      if (this.config.pixiApp) {
        this.config.pixiApp.ticker.add(() => {
          this.tickerFunction();
        });
      } else {
        const fps = this.config.fps ?? 30;
        this.tickerInterval = setInterval(() => {
          this.tickerFunction();
        }, 1e3 / fps);
      }
    }
  }
  static {
    /** The static config manager for the event manager */
    this.configManager = new ConfigManager(eventManagerDefaultConfig);
  }
  /**
   * The function that is called every frame, executes all events.
   */
  tickerFunction() {
    const currentTime = Date.now();
    for (const event of Object.values(this.events)) {
      if (event.type === "interval") {
        if (currentTime - event.intervalLast >= event.delay) {
          const dt = currentTime - event.intervalLast;
          event.callbackFn(dt);
          event.intervalLast = currentTime;
        }
      } else if (event.type === "timeout") {
        const dt = currentTime - event.timeCreated;
        if (currentTime - event.timeCreated >= event.delay) {
          event.callbackFn(dt);
          delete this.events[event.name];
        }
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
    } else if (this.config.pixiApp) {
      this.config.pixiApp.ticker.maxFPS = fps;
    }
  }
  /**
   * Warps time by a certain amount. Note: This will affect the stored creation time of timeout events.
   * @param dt - The time to warp by.
   */
  timeWarp(dt) {
    for (const event of Object.values(this.events)) {
      if (event.type === "interval") {
        event.intervalLast -= dt;
      }
      if (event.type === "timeout") {
        event.timeCreated -= dt;
      }
    }
  }
  /**
   * Adds a new event or changes an existing event to the event system.
   * @param name - The name of the event. If an event with this name already exists, it will be overwritten.
   * @param type - The type of the event, either "interval" or "timeout".
   * @param delay - The delay in milliseconds before the event triggers. (NOTE: If delay is less than the framerate, it will at trigger at max, once every frame.)
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
  setEvent(name, type, delay, callbackFn) {
    this.events[name] = (() => {
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
    })();
  }
  /**
   * Removes an event from the event system.
   * @param name - The name of the event to remove.
   * @example
   * myEventManger.removeEvent("IntervalEvent"); // Removes the interval event with the name "IntervalEvent".
   */
  removeEvent(name) {
    delete this.events[name];
  }
};

// src/game/managers/DataManager.ts
var import_reflect_metadata4 = require("reflect-metadata");
var import_class_transformer4 = require("class-transformer");
var import_lz_string = require("lz-string");
var import_md5 = __toESM(require_md5());
var DataManager = class {
  /**
   * Creates a new instance of the game class.
   * @param gameRef - A function that returns the game instance.
   */
  constructor(gameRef) {
    /** The current game data. */
    this.data = {};
    /** The static game data. */
    this.static = {};
    /** A queue of functions to call when the game data is loaded. */
    this.eventsOnLoad = [];
    this.gameRef = typeof gameRef === "function" ? gameRef() : gameRef;
  }
  /**
   * Adds an event to call when the game data is loaded.
   * @param event - The event to call when the game data is loaded.
   * @example dataManager.addEventOnLoad(() => console.log("Data loaded!"));
   */
  addEventOnLoad(event) {
    this.eventsOnLoad.push(event);
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
    if (typeof this.data[key] === "undefined" && this.normalData) {
      console.warn("After initializing data, you should not add new properties to data.");
    }
    this.data[key] = value;
    const thisData = () => this.data;
    return {
      get value() {
        return thisData()[key];
      },
      set value(valueToSet) {
        thisData()[key] = valueToSet;
      },
      setValue(valueToSet) {
        thisData()[key] = valueToSet;
      }
    };
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
   * Sets the static data for the given key.
   * This data is not affected by data loading and saving, and is mainly used internally.
   * @param key - The key to set the static data for.
   * @param value - The value to set the static data to.
   * @returns A getter for the static data.
   */
  setStatic(key, value) {
    if (typeof this.static[key] === "undefined" && this.normalData) {
      console.warn("After initializing data, you should not add new properties to staticData.");
    }
    this.static[key] = value;
    return this.static[key];
  }
  /**
   * Gets the static data for the given key.
   * @deprecated Set the return value of {@link setStatic} to a variable instead, as that is a getter and provides type checking.
   * @param key - The key to get the static data for.
   * @returns The static data for the given key.
   */
  getStatic(key) {
    return this.static[key];
  }
  /**
   * Initializes / sets data that is unmodified by the player.
   * This is used to merge the loaded data with the default data.
   * It should be called before you load data.
   * Note: This should only be called once, and after it is called, you should not add new properties to data.
   * @example dataManager.init(); // Call this after setting the initial data.
   */
  init() {
    this.normalData = this.data;
    this.normalDataPlain = (0, import_class_transformer4.instanceToPlain)(this.data);
  }
  /**
   * Compiles the given game data to a tuple containing the compressed game data and a hash.
   * @param data The game data to be compressed. Defaults to the current game data.
   * @returns [hash, data] - The compressed game data and a hash as a base64-encoded string to use for saving.
   */
  compileDataRaw(data = this.data) {
    const gameDataString = (0, import_class_transformer4.instanceToPlain)(data);
    const hasedData = (0, import_md5.default)(`${this.gameRef.config.name.id}/${JSON.stringify(gameDataString)}`);
    let version;
    try {
      version = "8.0.0";
    } catch (error) {
      version = "8.0.0";
    }
    const saveMetadata = {
      hash: hasedData,
      game: {
        title: this.gameRef.config.name.title,
        id: this.gameRef.config.name.id,
        version: this.gameRef.config.name.version
      },
      emath: {
        version
      }
    };
    return [saveMetadata, gameDataString];
  }
  /**
   * Compresses the given game data to a base64-encoded using lz-string.
   * @param data The game data to be compressed. Defaults to the current game data.
   * @returns The compressed game data and a hash as a base64-encoded string to use for saving.
   */
  compileData(data = this.data) {
    const dataRawString = JSON.stringify(this.compileDataRaw(data));
    return (0, import_lz_string.compressToBase64)(dataRawString);
  }
  /**
   * Decompiles the data stored in localStorage and returns the corresponding object.
   * @param data - The data to decompile. If not provided, it will be fetched from localStorage using the key `${game.config.name.id}-data`.
   * @returns The decompiled object, or null if the data is empty or invalid.
   */
  decompileData(data = window?.localStorage.getItem(`${this.gameRef.config.name.id}-data`)) {
    if (!data)
      return null;
    let parsedData;
    try {
      parsedData = JSON.parse((0, import_lz_string.decompressFromBase64)(data));
      return parsedData;
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(`Failed to decompile data (corrupted) "${data}":`, error);
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
   */
  resetData(reload = false) {
    if (!this.normalData)
      throw new Error("dataManager.resetData(): You must call init() before writing to data.");
    this.data = this.normalData;
    this.saveData();
    if (reload)
      window?.location.reload();
  }
  /**
   * Saves the game data to local storage under the key `${game.config.name.id}-data`.
   * If you dont want to save to local storage, use {@link compileData} instead.
   * @param dataToSave - The data to save. If not provided, it will be fetched from localStorage using {@link compileData}.
   */
  saveData(dataToSave = this.compileData()) {
    if (!dataToSave)
      throw new Error("dataManager.saveData(): Data to save is empty.");
    if (!window.localStorage)
      throw new Error("dataManager.saveData(): Local storage is not supported. You can use compileData() instead to implement a custom save system.");
    window.localStorage.setItem(`${this.gameRef.config.name.id}-data`, dataToSave);
  }
  /**
   * Compiles the game data and prompts the user to download it as a text file using {@link window.prompt}.
   * If you want to implement a custom data export, use {@link compileData} instead.
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
   * @param dataToParse - The data to load. If not provided, it will be fetched from localStorage using {@link decompileData}.
   * @param mergeData - Whether to merge the loaded data with the normal data. Defaults to `true`.
   * Warning: If set to `false`, the loaded data may have missing properties and may cause errors.
   * @returns The loaded data.
   */
  parseData(dataToParse = this.decompileData(), mergeData = true) {
    if (mergeData && (!this.normalData || !this.normalDataPlain))
      throw new Error("dataManager.parseData(): You must call init() before writing to data.");
    if (!dataToParse)
      return null;
    const [, loadedData] = dataToParse;
    function isPlainObject(obj) {
      return typeof obj === "object" && obj?.constructor === Object;
    }
    const objectHasOwnProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
    function deepMerge(sourcePlain, source, target) {
      const out = target;
      for (const key in sourcePlain) {
        if (objectHasOwnProperty(sourcePlain, key) && !objectHasOwnProperty(target, key)) {
          out[key] = sourcePlain[key];
        }
        if (source[key] instanceof Currency) {
          const sourceCurrency = sourcePlain[key];
          const targetCurrency = target[key];
          if (Array.isArray(targetCurrency.upgrades)) {
            const upgrades = targetCurrency.upgrades;
            targetCurrency.upgrades = {};
            for (const upgrade of upgrades) {
              targetCurrency.upgrades[upgrade.id] = upgrade.level;
            }
          }
          targetCurrency.upgrades = { ...sourceCurrency.upgrades, ...targetCurrency.upgrades };
          out[key] = targetCurrency;
        } else if (isPlainObject(sourcePlain[key]) && isPlainObject(target[key])) {
          out[key] = deepMerge(sourcePlain[key], source[key], target[key]);
        }
      }
      return out;
    }
    let loadedDataProcessed = !mergeData ? loadedData : deepMerge(this.normalDataPlain, this.normalData, loadedData);
    const upgradeDataProperties = Object.getOwnPropertyNames(new UpgradeData({ id: "", level: new Decimal(0) }));
    function convertTemplateClass(templateClassToConvert, plain) {
      const out = (0, import_class_transformer4.plainToInstance)(templateClassToConvert, plain);
      if (out instanceof Currency) {
        for (const upgradeName in out.upgrades) {
          const upgrade = out.upgrades[upgradeName];
          if (!upgrade || !upgradeDataProperties.every((prop) => Object.getOwnPropertyNames(upgrade).includes(prop))) {
            delete out.upgrades[upgradeName];
            continue;
          }
          out.upgrades[upgradeName] = (0, import_class_transformer4.plainToInstance)(UpgradeData, upgrade);
        }
      }
      if (!out)
        throw new Error(`Failed to convert ${templateClassToConvert.name} to class instance.`);
      return out;
    }
    function plainToInstanceRecursive(normal, plain) {
      const out = plain;
      for (const key in normal) {
        if (!plain[key]) {
          console.warn(`Missing property "${key}" in loaded data.`);
          continue;
        }
        if (!isPlainObject(plain[key]))
          continue;
        const normalDataClass = normal[key].constructor;
        if (normalDataClass === Object) {
          out[key] = plainToInstanceRecursive(normal[key], plain[key]);
          continue;
        }
        out[key] = convertTemplateClass(normalDataClass, plain[key]);
      }
      return out;
    }
    loadedDataProcessed = plainToInstanceRecursive(this.normalData, loadedDataProcessed);
    return loadedDataProcessed;
  }
  /**
   * Loads game data and processes it.
   * @param dataToLoad - The data to load. If not provided, it will be fetched from localStorage using {@link decompileData}.
   * @returns Returns null if the data is empty or invalid, or false if the data is tampered with. Otherwise, returns true.
   */
  loadData(dataToLoad = this.decompileData()) {
    dataToLoad = typeof dataToLoad === "string" ? this.decompileData(dataToLoad) : dataToLoad;
    if (!dataToLoad)
      return null;
    const isDataValid = this.validateData([dataToLoad[0], (0, import_class_transformer4.instanceToPlain)(dataToLoad[1])]);
    const parsedData = this.parseData(dataToLoad);
    if (!parsedData)
      return null;
    this.data = parsedData;
    for (const obj of this.eventsOnLoad) {
      obj();
    }
    return isDataValid;
  }
};

// src/game/GameCurrency.ts
var GameCurrency = class {
  /** @returns The data for the currency. */
  get data() {
    return this.dataPointer();
  }
  /** @returns The static data for the currency. */
  get static() {
    return this.staticPointer();
  }
  /**
   * Creates a new instance of the game class.
   * @param currencyPointer - A function that returns the current currency value.
   * @param staticPointer - A function that returns the static data for the game.
   * @param gamePointer A pointer to the game instance.
   * @param name - The name of the currency. This is optional, and you can use it for display purposes.
   */
  constructor(currencyPointer, staticPointer, gamePointer, name) {
    this.dataPointer = typeof currencyPointer === "function" ? currencyPointer : () => currencyPointer;
    this.staticPointer = typeof staticPointer === "function" ? staticPointer : () => staticPointer;
    this.game = gamePointer;
    this.name = name;
    this.game?.dataManager.addEventOnLoad(() => {
      this.static.onLoadData();
    });
  }
  /**
   * Gets the value of the game currency.
   * Note: There is no setter for this property. To change the value of the currency, use the corresponding methods in the static class.
   * @returns The value of the game currency.
   */
  get value() {
    return this.data.value;
  }
  // /**
  //  * Changes the pointer to the currency data. Warning: Do not use this unless you know what you're doing.
  //  * @param currencyPointer - A function or pointer that returns the current currency value.
  //  */
  // public updateDataPointer (currencyPointer: (() => currency) | currency): void {
  //     this.data = typeof currencyPointer === "function" ? currencyPointer() : currencyPointer;
  // }
};

// src/game/GameAttribute.ts
var GameAttribute = class {
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

// src/game/ResetLayer.ts
var GameReset = class {
  /**
   * Creates a new instance of the game reset.
   * @param currenciesToReset The currencies to reset.
   * @param extender The extender for the game reset. WARNING: Do not set this to the same object, as it will cause an infinite loop.
   */
  constructor(currenciesToReset, extender) {
    this.currenciesToReset = Array.isArray(currenciesToReset) ? currenciesToReset : [currenciesToReset];
    this.extender = Array.isArray(extender) ? extender : extender ? [extender] : [];
    this.id = Symbol();
  }
  /**
   * Resets a currency to its default value, and runs the extender's reset function if it exists (recursively).
   */
  reset() {
    this.onReset?.();
    this.currenciesToReset.forEach((currency) => {
      currency.static.reset();
    });
    this.extender.forEach((extender) => {
      if (extender && extender.id !== this.id) {
        extender.reset();
      }
    });
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
  initIntervalBasedManagers: true
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
    this.dataManager = new DataManager(this);
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
  /** Initializes the game. Also initializes the data manager. */
  init() {
    this.dataManager.init();
  }
  /**
   * Changes the framerate of the game.
   * @param fps - The new framerate to use.
   */
  changeFps(fps) {
    this.keyManager.changeFps(fps);
    this.eventManager.changeFps(fps);
  }
  /**
   * Adds a new currency section to the game. {@link GameCurrency} is the class.
   * It automatically adds the currency and currencyStatic objects to the data and static objects for saving and loading.
   * @template N - The name
   * @param name - The name of the currency section. This is also the name of the data and static objects, so it must be unique.
   * @returns A new instance of the gameCurrency class.
   * @example
   * const currency = game.addCurrency("currency");
   * currency.static.gain();
   * console.log(currency.value); // new Decimal(1)
   */
  addCurrency(name) {
    this.dataManager.setData(name, {
      currency: new Currency()
    });
    this.dataManager.setStatic(name, {
      // @ts-expect-error - fix this
      currency: new CurrencyStatic(() => this.dataManager.getData(name).currency)
      // attributes: {},
    });
    const classInstance = new GameCurrency(() => this.dataManager.getData(name).currency, () => this.dataManager.getStatic(name).currency, this, name);
    return classInstance;
  }
  /**
   * Adds a new attribute to the game. {@link GameAttribute} is the class.
   * It automatically adds the attribute and attributeStatic objects to the data and static objects for saving and loading.
   * @param name - The name of the attribute.
   * @param useBoost - Indicates whether to use boost for the attribute.
   * @param initial - The initial value of the attribute.
   * @returns The newly created attribute.
   * @example
   * const myAttribute = game.addAttribute("myAttribute");
   */
  addAttribute(name, useBoost = true, initial = 0) {
    const dataRef = this.dataManager.setData(name, new Attribute(initial));
    const staticRef = this.dataManager.setStatic(name, new AttributeStatic(this.dataManager.getData(name), useBoost, initial));
    const classInstance = new GameAttribute(this.dataManager.getData(name), this.dataManager.getStatic(name), this);
    return classInstance;
  }
  /**
   * Creates a new game reset object with the specified currencies to reset.
   * @param currenciesToReset - The currencies to reset.
   * @param extender - An optional object to extend the game reset object with.
   * @returns The newly created game reset object.
   */
  addReset(currenciesToReset, extender) {
    const reset = new GameReset(currenciesToReset, extender);
    return reset;
  }
};
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
