(function (g, f) {
    var hasExports = typeof exports === 'object';
    if (typeof define === "function" && define.amd) {
      define(['pixi.js', './src/index.ts', './src/hookMain.ts', './src/classes/attribute.ts', './src/classes/boost.ts', './src/classes/currency.ts', './src/classes/grid.ts', './src/E/e.ts', './src/E/eMain.ts', './src/E/lru-cache.ts'], f);
    } else if (typeof module === "object" && module.exports) {
      module.exports = f(require('pixi.js'), require('./src/index.ts'), require('./src/hookMain.ts'), require('./src/classes/attribute.ts'), require('./src/classes/boost.ts'), require('./src/classes/currency.ts'), require('./src/classes/grid.ts'), require('./src/E/e.ts'), require('./src/E/eMain.ts'), require('./src/E/lru-cache.ts'));
    } else {
      var m = hasExports ? f(require('pixi.js'), require('./src/index.ts'), require('./src/hookMain.ts'), require('./src/classes/attribute.ts'), require('./src/classes/boost.ts'), require('./src/classes/currency.ts'), require('./src/classes/grid.ts'), require('./src/E/e.ts'), require('./src/E/eMain.ts'), require('./src/E/lru-cache.ts')) : f(g["pixi.js"], g["./src/index.ts"], g["./src/hookMain.ts"], g["./src/classes/attribute.ts"], g["./src/classes/boost.ts"], g["./src/classes/currency.ts"], g["./src/classes/grid.ts"], g["./src/E/e.ts"], g["./src/E/eMain.ts"], g["./src/E/lru-cache.ts"]);
      var root = hasExports ? exports : g;
      
    }}(typeof self !== 'undefined' ? self : this, (__da, __db, __dc, __dd, __de, __df, __dg, __dh, __di, __dj) => {
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
          if (input == null)
            return "";
          var res = LZString2._compress(input, 6, function(a) {
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
          return LZString2._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrBase64, input.charAt(index));
          });
        },
        compressToUTF16: function(input) {
          if (input == null)
            return "";
          return LZString2._compress(input, 15, function(a) {
            return f(a + 32);
          }) + " ";
        },
        decompressFromUTF16: function(compressed) {
          if (compressed == null)
            return "";
          if (compressed == "")
            return null;
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
          if (input == null)
            return "";
          return LZString2._compress(input, 6, function(a) {
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

// src/game/game.ts
var import_currency2 = require("../main/emath.js");
var import_attribute2 = require("../main/emath.js");

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
  /**
   * @param config - The config to use for this event manager.
   */
  constructor(config) {
    /**
     * Adds a new event
     * @deprecated Use {@link eventManager.setEvent} instead.
     * @alias eventManager.setEvent
     */
    this.addEvent = this.setEvent;
    this.config = _eventManager.configManager.parse(config);
    this.events = {};
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
  static {
    this.configManager = new configManager(eventManagerDefaultConfig);
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
   */
  removeEvent(name) {
    delete this.events[name];
  }
};

// src/game/managers/dataManager.ts
var import_lz_string = __toESM(require_lz_string());

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
var import_currency = require("../main/emath.js");
var import_attribute = require("../main/emath.js");
var import_e = __toESM(require("../main/emath.js"));
function md5(_) {
  var $ = "0123456789abcdef";
  function n(_2) {
    var n2, r2 = "";
    for (n2 = 0; n2 <= 3; n2++)
      r2 += $.charAt(_2 >> 8 * n2 + 4 & 15) + $.charAt(_2 >> 8 * n2 & 15);
    return r2;
  }
  function r(_2, $2) {
    var n2 = (65535 & _2) + (65535 & $2);
    return (_2 >> 16) + ($2 >> 16) + (n2 >> 16) << 16 | 65535 & n2;
  }
  function t(_2, $2, n2, t2, u2, e2) {
    var f2, o2;
    return r((f2 = r(r($2, _2), r(t2, e2)), f2 << (o2 = u2) | f2 >>> 32 - o2), n2);
  }
  function u(_2, $2, n2, r2, u2, e2, f2) {
    return t($2 & n2 | ~$2 & r2, _2, $2, u2, e2, f2);
  }
  function e(_2, $2, n2, r2, u2, e2, f2) {
    return t($2 & r2 | n2 & ~r2, _2, $2, u2, e2, f2);
  }
  function f(_2, $2, n2, r2, u2, e2, f2) {
    return t($2 ^ n2 ^ r2, _2, $2, u2, e2, f2);
  }
  function o(_2, $2, n2, r2, u2, e2, f2) {
    return t(n2 ^ ($2 | ~r2), _2, $2, u2, e2, f2);
  }
  var F, c, a, i, h, v = function _2($2) {
    var n2, r2 = ($2.length + 8 >> 6) + 1, t2 = Array(16 * r2);
    for (n2 = 0; n2 < 16 * r2; n2++)
      t2[n2] = 0;
    for (n2 = 0; n2 < $2.length; n2++)
      t2[n2 >> 2] |= $2.charCodeAt(n2) << n2 % 4 * 8;
    return t2[n2 >> 2] |= 128 << n2 % 4 * 8, t2[16 * r2 - 2] = 8 * $2.length, t2;
  }("" + _), x = 1732584193, g = -271733879, l = -1732584194, d = 271733878;
  for (F = 0; F < v.length; F += 16)
    c = x, a = g, i = l, h = d, x = u(x, g, l, d, v[F + 0], 7, -680876936), d = u(d, x, g, l, v[F + 1], 12, -389564586), l = u(l, d, x, g, v[F + 2], 17, 606105819), g = u(g, l, d, x, v[F + 3], 22, -1044525330), x = u(x, g, l, d, v[F + 4], 7, -176418897), d = u(d, x, g, l, v[F + 5], 12, 1200080426), l = u(l, d, x, g, v[F + 6], 17, -1473231341), g = u(g, l, d, x, v[F + 7], 22, -45705983), x = u(x, g, l, d, v[F + 8], 7, 1770035416), d = u(d, x, g, l, v[F + 9], 12, -1958414417), l = u(l, d, x, g, v[F + 10], 17, -42063), g = u(g, l, d, x, v[F + 11], 22, -1990404162), x = u(x, g, l, d, v[F + 12], 7, 1804603682), d = u(d, x, g, l, v[F + 13], 12, -40341101), l = u(l, d, x, g, v[F + 14], 17, -1502002290), g = u(g, l, d, x, v[F + 15], 22, 1236535329), x = e(x, g, l, d, v[F + 1], 5, -165796510), d = e(d, x, g, l, v[F + 6], 9, -1069501632), l = e(l, d, x, g, v[F + 11], 14, 643717713), g = e(g, l, d, x, v[F + 0], 20, -373897302), x = e(x, g, l, d, v[F + 5], 5, -701558691), d = e(d, x, g, l, v[F + 10], 9, 38016083), l = e(l, d, x, g, v[F + 15], 14, -660478335), g = e(g, l, d, x, v[F + 4], 20, -405537848), x = e(x, g, l, d, v[F + 9], 5, 568446438), d = e(d, x, g, l, v[F + 14], 9, -1019803690), l = e(l, d, x, g, v[F + 3], 14, -187363961), g = e(g, l, d, x, v[F + 8], 20, 1163531501), x = e(x, g, l, d, v[F + 13], 5, -1444681467), d = e(d, x, g, l, v[F + 2], 9, -51403784), l = e(l, d, x, g, v[F + 7], 14, 1735328473), g = e(g, l, d, x, v[F + 12], 20, -1926607734), x = f(x, g, l, d, v[F + 5], 4, -378558), d = f(d, x, g, l, v[F + 8], 11, -2022574463), l = f(l, d, x, g, v[F + 11], 16, 1839030562), g = f(g, l, d, x, v[F + 14], 23, -35309556), x = f(x, g, l, d, v[F + 1], 4, -1530992060), d = f(d, x, g, l, v[F + 4], 11, 1272893353), l = f(l, d, x, g, v[F + 7], 16, -155497632), g = f(g, l, d, x, v[F + 10], 23, -1094730640), x = f(x, g, l, d, v[F + 13], 4, 681279174), d = f(d, x, g, l, v[F + 0], 11, -358537222), l = f(l, d, x, g, v[F + 3], 16, -722521979), g = f(g, l, d, x, v[F + 6], 23, 76029189), x = f(x, g, l, d, v[F + 9], 4, -640364487), d = f(d, x, g, l, v[F + 12], 11, -421815835), l = f(l, d, x, g, v[F + 15], 16, 530742520), g = f(g, l, d, x, v[F + 2], 23, -995338651), x = o(x, g, l, d, v[F + 0], 6, -198630844), d = o(d, x, g, l, v[F + 7], 10, 1126891415), l = o(l, d, x, g, v[F + 14], 15, -1416354905), g = o(g, l, d, x, v[F + 5], 21, -57434055), x = o(x, g, l, d, v[F + 12], 6, 1700485571), d = o(d, x, g, l, v[F + 3], 10, -1894986606), l = o(l, d, x, g, v[F + 10], 15, -1051523), g = o(g, l, d, x, v[F + 1], 21, -2054922799), x = o(x, g, l, d, v[F + 8], 6, 1873313359), d = o(d, x, g, l, v[F + 15], 10, -30611744), l = o(l, d, x, g, v[F + 6], 15, -1560198380), g = o(g, l, d, x, v[F + 13], 21, 1309151649), x = o(x, g, l, d, v[F + 4], 6, -145523070), d = o(d, x, g, l, v[F + 11], 10, -1120210379), l = o(l, d, x, g, v[F + 2], 15, 718787259), g = o(g, l, d, x, v[F + 9], 21, -343485551), x = r(x, c), g = r(g, a), l = r(l, i), d = r(d, h);
  return n(x) + n(g) + n(l) + n(d);
}
var dataManager = class {
  /**
   * Creates a new instance of the game class.
   * @param gameRef - A function that returns the game instance.
   */
  constructor(gameRef) {
    /**
     * The current game data.
     */
    this.data = {};
    /**
     * The static game data.
     */
    this.static = {};
    /** A queue of functions to call when the game data is loaded. */
    this.eventsOnLoad = [];
    this.gameRef = typeof gameRef === "function" ? gameRef() : gameRef;
  }
  /**
   * Adds an event to call when the game data is loaded.
   * @param event - The event to call when the game data is loaded.
   */
  addEventOnLoad(event) {
    this.eventsOnLoad.push(event);
  }
  /**
   * Sets the data for the given key.
   * @param key - The key to set the data for.
   * @param value - The value to set the data to.
   * @returns - The value that was set.
   */
  setData(key, value) {
    if (typeof this.data[key] === "undefined" && this.normalData) {
      console.warn("After initializing data, you should not add new properties to data.");
    }
    this.data[key] = value;
    return this.data[key];
  }
  /**
   * Gets the data for the given key.
   * @param key - The key to get the data for.
   * @returns - The data for the given key.
   */
  getData(key) {
    return this.data[key];
  }
  /**
   * Sets the static data for the given key.
   * @param key - The key to set the static data for.
   * @param value - The value to set the static data to.
   * @returns - The value that was set.
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
   * @param key - The key to get the static data for.
   * @returns - The static data for the given key.
   */
  getStatic(key) {
    return this.static[key];
  }
  /**
   * Initializes / sets data that is unmodified by the player.
   * This is used to merge the loaded data with the default data.
   * It should be called before you load data.
   * Note: This should only be called once, and after it is called, you should not add new properties to data.
   */
  init() {
    this.normalData = this.data;
  }
  /**
   * Compiles the given game data to a tuple containing the compressed game data and a hash.
   * @param data The game data to be compressed. Defaults to the current game data.
   * @returns [hash, data] - The compressed game data and a hash as a base64-encoded string to use for saving.
   */
  compileDataRaw(data = this.data) {
    const gameDataString = instanceToPlain(data);
    const hasedData = md5(JSON.stringify(gameDataString));
    return [hasedData, gameDataString];
  }
  /**
   * Compresses the given game data to a base64-encoded using lz-string, or btoa if lz-string is not available.
   * @param data The game data to be compressed. Defaults to the current game data.
   * @returns The compressed game data and a hash as a base64-encoded string to use for saving.
   */
  compileData(data = this.data) {
    const dataRawString = JSON.stringify(this.compileDataRaw(data));
    return import_lz_string.compressToBase64 ? (0, import_lz_string.compressToBase64)(dataRawString) : btoa(dataRawString);
  }
  /**
   * Decompiles the data stored in localStorage and returns the corresponding object.
   * @param data - The data to decompile. If not provided, it will be fetched from localStorage using the key `${game.config.name.id}-data`.
   * @returns The decompiled object, or null if the data is empty or invalid.
   */
  decompileData(data = localStorage.getItem(`${this.gameRef.config.name.id}-data`)) {
    if (!data)
      return null;
    const parsedData = JSON.parse(import_lz_string.decompressFromBase64 ? (0, import_lz_string.decompressFromBase64)(data) : atob(data));
    return parsedData;
  }
  /**
   * Validates the given data.
   * @param data - [hash, data] The data to validate.
   * @returns Whether the data is valid / unchanged. False means that the data has been tampered with / save edited.
   */
  validateData(data) {
    const [hashSave, gameDataToValidate] = data;
    const hashCheck = md5(JSON.stringify(gameDataToValidate));
    return hashSave === hashCheck;
  }
  /**
   * Resets the game data to its initial state and saves it.
   * @param reload - Whether to reload the page after resetting the data. Defaults to `false`.
   */
  resetData(reload = false) {
    if (!this.normalData) {
      throw new Error("dataManager.resetData(): You must call init() before writing to data.");
      return;
    }
    this.data = this.normalData;
    this.saveData();
    if (reload)
      window.location.reload();
  }
  /**
   * Saves the game data to local storage under the key `${game.config.name.id}-data`.
   * If you dont want to save to local storage, use {@link compileData} instead.
   */
  saveData() {
    localStorage.setItem(`${this.gameRef.config.name.id}-data`, this.compileData());
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
   * @returns The loaded data.
   */
  parseData(dataToParse = this.decompileData()) {
    if (!this.normalData)
      throw new Error("dataManager.loadData(): You must call init() before writing to data.");
    if (!dataToParse)
      return null;
    const [hash, loadedData] = dataToParse;
    function isPlainObject(obj) {
      return typeof obj === "object" && obj.constructor === Object;
    }
    function deepMerge(source, target) {
      const out = target;
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key) && !Object.prototype.hasOwnProperty.call(target, key)) {
          out[key] = source[key];
        } else if (isPlainObject(source[key]) && isPlainObject(target[key])) {
          out[key] = deepMerge(source[key], target[key]);
        }
      }
      return out;
    }
    let loadedDataProcessed = deepMerge(this.normalData, loadedData);
    const templateClasses = function(templateClassesInit) {
      const out = [];
      for (const templateClassConvert of templateClassesInit) {
        out.push({
          class: templateClassConvert.class,
          // subclasses: templateClassConvert.subclasses,
          properties: Object.getOwnPropertyNames(instanceToPlain(new templateClassConvert.class()))
        });
      }
      return out;
    }([
      {
        class: import_attribute.attribute
        // subclasses: {
        //     value: Decimal,
        // },
      },
      // {
      //     class: boost,
      //     subclasses: {
      //         baseEffect: Decimal,
      //         boostArray: [boostObject],
      //     },
      // },
      {
        class: import_currency.currency
        // subclasses: {
        //     // boost: boost,
        //     upgrades: [upgradeData],
        //     value: Decimal,
        // },
      },
      {
        class: import_e.default
      }
    ]);
    function compareArrays(arr1, arr2) {
      return arr1.length === arr2.length && arr1.every((val) => arr2.includes(val));
    }
    function convertTemplateClass(templateClass, plain) {
      let out = plainToInstance(templateClass.class, plain);
      if (!out)
        throw new Error(`Failed to convert ${templateClass.name} to class instance.`);
      return out;
    }
    function plainToInstanceRecursive(plain) {
      const out = plain;
      for (const key in plain) {
        if (!(plain[key] instanceof Object && plain[key].constructor === Object))
          continue;
        if ((() => {
          for (const templateClass of templateClasses) {
            if (compareArrays(Object.getOwnPropertyNames(plain[key]), templateClass.properties)) {
              out[key] = convertTemplateClass(templateClass, plain[key]);
              return false;
            }
          }
          return true;
        })()) {
          out[key] = plainToInstanceRecursive(plain[key]);
        }
      }
      return out;
    }
    loadedDataProcessed = plainToInstanceRecursive(loadedDataProcessed);
    return loadedDataProcessed;
  }
  /**
   * Loads game data and processes it.
   * @param dataToLoad - The data to load. If not provided, it will be fetched from localStorage using {@link decompileData}.
   * @returns Returns null if the data is empty or invalid, or false if the data is invalid / tampered with. Otherwise, returns true.
   */
  loadData(dataToLoad = this.decompileData()) {
    if (!dataToLoad)
      return null;
    const parsedData = this.parseData(dataToLoad);
    if (!parsedData)
      return null;
    const isDataValid = this.validateData(dataToLoad);
    this.data = parsedData;
    for (const obj of this.eventsOnLoad) {
      obj();
    }
    return isDataValid;
  }
};

// src/game/gameCurrency.ts
var gameCurrency = class {
  get data() {
    return this.dataPointer();
  }
  get static() {
    return this.staticPointer();
  }
  /**
   * Creates a new instance of the game class.
   * @param currencyPointer - A function that returns the current currency value.
   * @param staticPointer - A function that returns the static data for the game.
   * @param gamePointer A pointer to the game instance.
   */
  constructor(currencyPointer, staticPointer, gamePointer) {
    this.dataPointer = typeof currencyPointer === "function" ? currencyPointer : () => currencyPointer;
    this.staticPointer = typeof staticPointer === "function" ? staticPointer : () => staticPointer;
    this.game = gamePointer;
    this.game?.dataManager.addEventOnLoad(() => {
      this.static.onLoadData();
    });
  }
  /**
   * Gets the value of the game currency.
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
   * @param extender The extender for the game reset. WARNING: Do not set this to the same object, as it will cause an infinite loop.
   */
  constructor(currenciesToReset, extender) {
    this.currenciesToReset = Array.isArray(currenciesToReset) ? currenciesToReset : [currenciesToReset];
    this.extender = extender;
  }
  /** Resets a currency. */
  reset() {
    if (this.onReset) {
      this.onReset();
    }
    this.currenciesToReset.forEach((currency3) => {
      currency3.static.reset();
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
var game = class _game {
  static {
    this.configManager = new configManager(gameDefaultConfig);
  }
  /**
   * Creates a new instance of the game class.
   * @param config - The configuration object for the game.
   */
  constructor(config) {
    this.config = _game.configManager.parse(config);
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
  /** Initializes the game. Also initializes the data manager. */
  init() {
    this.dataManager.init();
  }
  /**
   * Adds a new currency section to the game. {@link gameCurrency}
   * @param name - The name of the currency section. This is also the name of the data and static objects, so it must be unique.
   * @returns A new instance of the gameCurrency class.
   */
  addCurrency(name) {
    this.dataManager.setData(name, {
      currency: new import_currency2.currency()
    });
    this.dataManager.setStatic(name, {
      currency: new import_currency2.currencyStatic(() => this.dataManager.getData(name).currency)
      // attributes: {},
    });
    const classInstance = new gameCurrency(() => this.dataManager.getData(name).currency, () => this.dataManager.getStatic(name).currency, this);
    return classInstance;
  }
  /**
   * Adds a new currency group to the game.
   * @param name - The name of the currency group.
   * @param currencies - An array of currency names to add to the group.
   */
  addCurrencyGroup(name, currencies) {
    this.dataManager.setData(name, {});
    this.dataManager.setStatic(name, {
      attributes: {}
    });
    currencies.forEach((currencyName) => {
      this.dataManager.getData(name)[currencyName] = new import_currency2.currency();
      this.dataManager.getStatic(name)[currencyName] = new import_currency2.currencyStatic(this.dataManager.getData(name)[currencyName]);
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
    this.dataManager.setData(name, new import_attribute2.attribute(initial));
    this.dataManager.setStatic(name, new import_attribute2.attributeStatic(this.dataManager.getData(name), useBoost, initial));
    const classInstance = new gameAttribute(this.dataManager.getData(name), this.dataManager.getStatic(name), this);
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
   * Removes the sprite from its parent container.
   */
  remove() {
    this.x = this.y = Infinity;
    this.sprite.parent.removeChild(this.sprite);
  }
};

// src/pixiGame/pixiGame.ts
var pixiGameDefaultConfig = {
  ...gameDefaultConfig,
  initIntervalBasedManagers: false,
  pixi: {
    app: null
  }
};
var pixiGame = class _pixiGame extends game {
  static {
    this.configManager = new configManager(pixiGameDefaultConfig);
  }
  constructor(config) {
    super(config);
    this.config = _pixiGame.configManager.parse(config);
    if (!this.config.pixi.app)
      throw new Error(`No PIXI app was provided in config: ${JSON.stringify(this.config)}`);
    const app = this.config.pixi.app;
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
  addSprite(spriteToAdd, collisionShape = "Rectangle") {
    return new sprite(this, spriteToAdd, collisionShape);
  }
};

// src/pixiGame/index.ts
hookPixiGame();
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
