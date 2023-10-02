'use strict';

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
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
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

/* eslint-disable */

var Decimal$2 = require("break_eternity.js");
var DecimalClone = Decimal$2;
var eMath$1 = {
  version: "etherealArithmetic Indev 0.4a",
  changeLogs: {
    indev: {
      "0.4": "Added changelogs, random() quantity, scuffed median",
      "0.4a": "Added quick sort, moved onload to init"
    }
  },
  settings: [0,
  //notation: 0 = scientific; 1 = engineering
  0 //display: 0 = (+); 1 = ()
  ],

  time: function time(funct, rep) {
    var timeStart = new Date();
    for (i = 0; i < (rep ? rep : 1); i++) {
      funct();
    }
    timeTaken = Date.now() - timeStart;
    console.log("Function complete: Took ".concat(timeTaken, "ms"));
    return timeTaken;
  },
  // syncTime: function(func) {
  //     return new Promise(func => setTimeout(func, this.time(func)))
  // },
  random: function random(min, max, round) {
    return !(round != undefined && !round) ? Math.round(Math.random() * (max > min ? max - min : min - max) + (max > min ? min : max)) : Math.random() * (max > min ? max - min : min - max) + (max > min ? min : max);
  },
  //rounds by default, can disable
  string: function string(times, type) {
    var stUpperBound = 35;
    var upperBound = 50;
    var errors = [{
      type: "TypeError",
      value: typeof times != "number",
      display: "".concat(times, " is not a number")
    }, {
      type: "Error",
      value: times < 1,
      display: "".concat(times, " is less than 1")
    }, {
      type: "Error",
      value: times % 1 != 0,
      display: "".concat(times, " is not an integer")
    }, {
      type: "Error",
      value: times > stUpperBound && !type,
      display: "".concat(times, " exceeds the maximum call size of ").concat(stUpperBound)
    }, {
      type: "Error",
      value: times > upperBound && type,
      display: "".concat(times, " exceeds the maximum call size of ").concat(upperBound)
    }];
    for (var _i = 0, _errors = errors; _i < _errors.length; _i++) {
      var x = _errors[_i];
      if (x.value) {
        throw "".concat(x.type, ": ").concat(x.display);
      }
    }
    var output = Math.random() * 1232311;
    for (i = 0; i < times; i++) {
      output = btoa(output) + btoa(btoa(Math.random()));
    }
    return type ? output.length : output;
  },
  trueString: function trueString(length) {
    return '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'.random(length);
  },
  decimalFunctions: [{
    name: "random",
    value: function value(min, max, qty, round) {
      min = E$4(min);
      max = E$4(max);
      if (qty) {
        var out = [];
        for (i = 0; i < qty; i++) {
          var output = E$4();
          output = output.plus(max > min ? min : max).plus(max > min ? max.minus(min).times(Math.random()) : min.minus(max).times(Math.random()));
          output = !(round != undefined && !round) ? output.round() : output;
          out.push(output);
        }
        return out;
      } else {
        var _output = E$4();
        _output = _output.plus(max > min ? min : max).plus(max > min ? max.minus(min).times(Math.random()) : min.minus(max).times(Math.random()));
        _output = !(round != undefined && !round) ? _output.round() : _output;
        return _output;
      }
    }
  }, {
    name: "mean",
    value: function value(array) {
      var sum = new DecimalClone();
      var total = 0;
      var _iterator = _createForOfIteratorHelper(array),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var x = _step.value;
          total++;
          sum = sum.plus(x);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return sum.divide(total);
    }
  }, {
    name: "median",
    //bugs
    value: function value(array) {
      var sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DecimalClone.sort;
      var mean = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DecimalClone.mean;
      return !array.length % 2 ? sort(array)[Math.floor(array.length / 2)] : mean([sort(array)[array.length], sort(array)[array.length - 1]]);
    }
  }, {
    name: "mode",
    //also bugs
    value: function value(array) {
      var stor = [{
        value: E$4(Infinity),
        frequency: 0
      }];
      var stor2 = [];
      var output = [];
      var _iterator2 = _createForOfIteratorHelper(array),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _x2 = _step2.value;
          //add all values of array into storage
          _x2 = E$4(_x2);
          var _iterator3 = _createForOfIteratorHelper(stor),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var y = _step3.value;
              console.log(y.value, _x2);
              if (y.value.neq(_x2)) {
                stor.push({
                  value: _x2,
                  frequency: 1
                });
                break;
              } else {
                y.frequency++;
                break;
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      console.log(stor); //debug
      for (var _i2 = 0, _stor = stor; _i2 < _stor.length; _i2++) {
        var x = _stor[_i2];
        stor2.push(x.frequency);
      } //make frequency array
      console.log(stor2); //debug
      stor2 = eMath$1.decimal.sort(stor2)[stor2.length - 1]; //sort frequency array
      console.log(stor); //debug
      for (var _i3 = 0, _stor2 = stor; _i3 < _stor2.length; _i3++) {
        var _x = _stor2[_i3];
        console.log(_x);
        if (_x.frequency == stor2) {
          output.push(_x.value);
        }
      }
      return output;
    }
  }, {
    name: "sort",
    //default sort
    value: function value(array) {
      return eMath$1.decimal.qtSort(array);
    }
  }, {
    name: "bbSort",
    //bubble sort
    value: function value(array) {
      for (var _i4 = 0; _i4 < array.length; _i4++) {
        // Last i elements are already in place 
        for (var j = 0; j < array.length - _i4 - 1; j++) {
          // Checking if the item at present iteration
          // is greater than the next iteration
          if (E$4(array[j]).gt(E$4(array[j + 1]))) {
            // If the condition is true then swap them
            var temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
          }
        }
      }
      return array;
    }
  }, {
    name: "qtSort",
    //quick sort lr ptr
    value: function value(array) {
      if (array.length < 2) {
        return array;
      }
      var pivot = E$4(array[Math.floor(Math.random() * array.length)]);
      var left = [];
      var right = [];
      var equal = [];
      var _iterator4 = _createForOfIteratorHelper(array),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var val = _step4.value;
          val = E$4(val);
          if (val.lt(pivot)) {
            left.push(val);
          } else if (val.gt(pivot)) {
            right.push(val);
          } else {
            equal.push(val);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      return [].concat(_toConsumableArray(eMath$1.decimal.qtSort(left)), equal, _toConsumableArray(eMath$1.decimal.qtSort(right)));
    }
  }

  /*
  How currencies above this work:
  (e^1000) = kiloverse (layer 1)
  (e^e^1000) = megaverse (layer 2)
    layer x = (e^...x...e^1000)
  */
  // logNum: class {
  //     constructor() {
  //         this.layer = new DecimalClone();
  //         this.mag0 = new Decimal(); //"lower number"
  //         this.mantissa = new Decimal(); //"upper number decimal"
  //         this.mag = new Decimal(); //"upper number tier/whole number"
  //     }
  //     static upperBoundLayer = new DecimalClone("(e^1000)1");
  //     update() {
  //         if (this.mag0.greaterThan(eMath.decimal.logNum.upperBoundLayer)) { //if is greater than e^1000
  //             this.mag = this.mag.plus("1");
  //             this.mag0 = new DecimalClone("0");
  //         }
  //         if (this.mag.greaterThan(eMath.decimal.logNum.upperBoundLayer)) { //if is greater than e^1000
  //             this.layer = this.mag.plus("1");
  //             this.mag = new DecimalClone("0");
  //         }
  //         this.mantissa = this.mag0.log(10).divide(eMath.decimal.logNum.upperBoundLayer);
  //     }
  //     toString() {
  //         return(`${this.layer.equals(0) ? "" : `L${this.layer.toString()}`}[${this.mag.toString()}{${this.mantissa.toString()}}]`);
  //     }
  // },
  ],

  encrypt: function encrypt(string, key) {
    var output = "";
    var x = 0;
    string.forEach(function (_char) {
      if (x > key.length - 1) {
        x = 0;
      }
      output += _char + key[x];
      x++;
    });
    output = btoa(output);
    return output;
  },
  decrypt: function decrypt(string) {
    var output = atob(string);
    var x2 = 1;
    string.forEach(function (_char2) {
      if (x2 == 1) {
        output += _char2;
        x2 = 0;
      } else {
        x2++;
      }
    });
    return output;
  },
  /**
   * Smoothly interpolates between the current value and the target value over time
   * using a smoothing factor and deltaTime.
   *
   * @param {number} current - The current value to interpolate from.
   * @param {number} target - The target value to interpolate towards.
   * @param {number} smoothing - The smoothing factor controlling the interpolation speed.
   *                           A higher value results in slower interpolation.
   * @param {number} deltaTime - The time elapsed since the last frame in seconds.
   * @returns {number} - The interpolated value between `current` and `target`.
   */
  smoothDamp: function smoothDamp(current, target, smoothing, deltaTime) {
    // Calculate the difference between current and target
    var difference = target - current;

    // Calculate the change based on smoothing and deltaTime
    var change = difference * smoothing * deltaTime;

    // Apply the change to the current value
    return current + change;
  }
};
/*
{ // String Prototypes
String.prototype.forEach = function(callbackfn) {
    for(i = 0; i < this.length; i++) {
        callbackfn(this[i]);
    }
}
String.prototype.forEachAdvanced = function(callbackfn, start, end) {
    for(i = (start < 0 ? 0 : start); i < (end > this.length ? this.length : (end < start ? this.length: end)); i++) {
        callbackfn({
            value: this[i],
            index: i,
        });
    }
}
String.prototype.toNumber = function() {
    let output = "";
    for(i = 0; i < this.length; i++) {
        output += this.charCodeAt(i).toString();
    }
    return output;
}
String.prototype.toArray = function() {
    let output = [];
    this.forEach(function(char) {
        output.push(char);
    });
    return output;
}
String.prototype.before = function(index) {
    let output = "";
    this.forEachAdvanced(function(char) {
        output += char.value;
    }, 0, index);
    return output;
}
String.prototype.after = function(index) {
    let output = "";
    this.forEachAdvanced(function(char) {
        output += char.value;
    }, index, -1);
    return output;
}
String.prototype.customSplit = function(index) {
    let output = [];
    output.push(this.before(index));
    output.push(this.after(index));
    return output;
}
String.prototype.random = function(qty) {
    let output = "";
    if(qty > 0){for (i = 0; i < qty; i++) {
        output += this.charAt(eMath.random(0, this.length));
    }} else {output = this.charAt(eMath.random(0, this.length))}
    return output;
}
}
// {
Array.prototype.random = function(qty) {
    let output = "";
    if(qty > 0){for (i = 0; i < qty; i++) {
        output += this[eMath.random(0, this.length)];
    }} else {output = this[eMath.random(0, this.length)]}
    return output;
}
*/
eMath$1.getFast = function (object, id) {
  // search by convert to string, fast but omits document and class data
  object = JSON.stringify(object);
  var length = id.toString().replace(/\\/g, "").length;
  var searchIndex = object.search(id);
  var output = "";
  var offset = length + 2;
  var unclosedQdb = 0; // ""
  var unclosedQsb = 0; // ''
  var unclosedQib = 0; // ``
  var unclosedB = 0; // []
  var unclosedCB = 0; // {}

  function check() {
    var read = object[searchIndex + offset];
    if (object[searchIndex + offset - 1] != "\\") {
      switch (read) {
        case "\"":
          if (unclosedQdb == 0) {
            unclosedQdb = 1;
          } else {
            unclosedQdb = 0;
          }
          break;
        case "\'":
          if (unclosedQsb == 0) {
            unclosedQsb = 1;
          } else {
            unclosedQsb = 0;
          }
          break;
        case "\`":
          if (unclosedQib == 0) {
            unclosedQib = 1;
          } else {
            unclosedQib = 0;
          }
          break;
        case "\[":
          unclosedB++;
          break;
        case "\]":
          unclosedB--;
          break;
        case "\{":
          unclosedCB++;
          break;
        case "\}":
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
};
// Object.prototype.getFast = function(id) { return Object.getF(this, id) };

eMath$1.get = function (object, id) {
  // recursive search
  try {
    for (var _i5 = 0; _i5 < Object.keys(object).length; _i5++) {
      if (Object.keys(object)[_i5] == "sign") break;
      if (Object.keys(object)[_i5] == id) {
        return object[Object.keys(object)[_i5]];
      } else if (_typeof(object[Object.keys(object)[_i5]]) == "object") {
        var output = Object.get(object[Object.keys(object)[_i5]], id);
        if (output != null) return output;
      } else {
        continue;
      }
    }
    return null;
  } catch (_unused) {
    return null;
  }
};
// Object.prototype.get = function (id) { return Object.get(this, id) }
// //Types
// String.prototype.isString = true;
// DecimalClone.prototype.isDecimal = true;
// Object.prototype.isObject = true;
// Array.prototype.isArray = true;
// Array.prototype.isObject = false; //this because all arrays are objects but not all objects are arrays for some reason
// }
eMath$1.decimal = {};
var _iterator5 = _createForOfIteratorHelper(eMath$1.decimalFunctions),
  _step5;
try {
  for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
    var x = _step5.value;
    DecimalClone[x["name"]] = x["value"];
    eMath$1.decimal[x["name"]] = x["value"];
  }
} catch (err) {
  _iterator5.e(err);
} finally {
  _iterator5.f();
}
function E$4(x) {
  return new DecimalClone(x);
}
var TS = function TS(x) {
  return new Date(x != undefined ? x : new Date());
};
DecimalClone.dInf;

// Math.lerp = function (value1, value2, amount) {
// 	amount = amount < 0 ? 0 : amount;
// 	amount = amount > 1 ? 1 : amount;
// 	return value1 + (value2 - value1) * amount;
// };

DecimalClone.prototype.clone = function () {
  return this;
};
DecimalClone.prototype.modular = DecimalClone.prototype.mod = function (other) {
  other = E$4(other);
  if (other.eq(0)) return E$4(0);
  if (this.sign * other.sign == -1) return this.abs().mod(other.abs()).neg();
  if (this.sign == -1) return this.abs().mod(other.abs());
  return this.sub(this.div(other).floor().mul(other));
};

/**
 * Applies a soft cap to a DecimalClone value using a specified soft cap function.
 *
 * @param {DecimalClone} start - The value at which the soft cap starts.
 * @param {number} power - The power or factor used in the soft cap calculation.
 * @param {string} mode - The soft cap mode. Use "pow" for power soft cap, "mul" for multiplication soft cap,
 *                       or "exp" for exponential soft cap.
 * @returns {DecimalClone} - The DecimalClone value after applying the soft cap.
 */
DecimalClone.prototype.softcap = function (start, power, mode) {
  var x = this.clone();
  if (x.gte(start)) {
    if ([0, "pow"].includes(mode)) x = x.div(start).pow(power).mul(start);
    if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start);
    if ([2, "exp"].includes(mode)) x = expMult(x.div(start), power).mul(start);
  }
  return x;
};
DecimalClone.prototype.toRoman = function () {
  var num = this.clone();
  if (num.gte(5000)) return num;
  num = num.toNumber();
  var digits = String(+num).split(""),
    key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
    roman = "",
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
};
DecimalClone.prototype.scale = function (s, p, mode) {
  var rev = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  s = E$4(s);
  p = E$4(p);
  var x = this.clone();
  if (x.gte(s)) {
    if ([0, "pow"].includes(mode)) x = rev ? x.mul(s.pow(p.sub(1))).root(p) : x.pow(p).div(s.pow(p.sub(1)));
    if ([1, "exp"].includes(mode)) x = rev ? x.div(s).max(1).log(p).add(s) : DecimalClone.pow(p, x.sub(s)).mul(s);
  }
  return x;
};
DecimalClone.prototype.format = function () {
  var acc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
  return format(this.clone(), acc, max);
};
DecimalClone.prototype.formatST = function () {
  var acc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "st";
  return format(this.clone(), acc, max, type);
};
DecimalClone.prototype.formatGain = function (gain) {
  var mass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return formatGain(this.clone(), gain, mass);
};
module.exports = {
  eMath: eMath$1,
  Decimal: DecimalClone,
  E: E$4,
  TS: TS
};

var eMath$2 = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var _require$2 = require("../src/eMath.js"),
  E$3 = _require$2.E; // actually ../../src/eMath.js

/**
 * Represents a boost manager that applies various effects to a base value.
 *
 * @class
 * @param {number|Decimal} baseEffect - The base effect value to which boosts are applied.
 * @param {...Object} boosts - An array of boost objects to initialize with.
 * @example
 * const myBoost = new Game.classes.boost(100, {
 *   id: "reallyCoolBoost124",
 *   name: "buff this",
 *   desc: "really cool lol",
 *   type: "add",
 *   value: E(124),
 * });
 */
var boostStatic$3 = /*#__PURE__*/function () {
  /**
      * Constructs a new boost manager.
      *
      * @constructor
      * @param {number} [baseEffect] - The base effect value to which boosts are applied.
      * @param {function} pointer - returns Game.classes.boost
      * @param {...Object} boosts - An array of boost objects to initialize with.
      */
  function boostStatic() {
    var baseEffect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var pointer = arguments.length > 1 ? arguments[1] : undefined;
    _classCallCheck(this, boostStatic);
    for (var _len = arguments.length, boosts = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      boosts[_key - 2] = arguments[_key];
    }
    /**
           * An array of boost objects.
           * @type {Object[]}
           */
    this.boost = boosts;

    /**
           * A function that returns the pointer of the data
           * @type {function}
           */
    this.pointer = pointer;

    /**
           * The base effect value.
           * @type {Decimal}
           */
    this.baseEffect = E$3(baseEffect);
  }

  /**
      * Gets a boost object by its ID.
      *
      * @param {string} id - The ID of the boost to retrieve.
      * @returns {Object|null} The boost object if found, or null if not found.
      */
  _createClass(boostStatic, [{
    key: "bGet",
    value: function bGet(id) {
      var output = null;
      for (var i = 0; i < this.boost.length; i++) {
        if (i == this.boost.length) break;
        if (id == this.boost[i].id) {
          output = this.boost[i];
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
  }, {
    key: "bRemove",
    value: function bRemove(id) {
      delete this.bGet(id);
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
  }, {
    key: "bSet",
    value: function bSet(id, name, desc, value, order) {
      var bCheck = this.bGet(id);
      console.log(this.bGet(id));
      if (!bCheck) {
        this.boost.push({
          id: id,
          name: name,
          desc: desc,
          value: value,
          order: order
        });
      } else {
        this.boost[bCheck.index] = {
          id: id,
          name: name,
          desc: desc,
          value: value,
          order: order
        };
      }
    }

    /**
        * Sets or updates multiple boosts with advanced parameters.
        *
        * @param {...Object} x - Boost objects to set or update.
        */
  }, {
    key: "bSetAdvanced",
    value: function bSetAdvanced() {
      for (var _len2 = arguments.length, x = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        x[_key2] = arguments[_key2];
      }
      for (var i = 0; i < x.length; i++) {
        if (!this.bGet(x[i].id)) {
          this.boost = this.boost.concat(x[i]);
        } else {
          console.log(i);
          this.boost[this.bGet(x[i].id).index] = x[i];
        }
      }
    }

    /**
        * Calculates the cumulative effect of all boosts on the base effect.
        *
        * @param {number|Decimal} [base=this.baseEffect] - The base effect value to calculate with.
        * @returns {Decimal} The calculated effect after applying boosts.
        */
  }, {
    key: "calculate",
    value: function calculate() {
      var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.baseEffect;
      var output = E$3(base);
      var boosts = this.boost;
      boosts.sort(function (a, b) {
        return a.order - b.order;
      });
      for (var i = 0; i < boosts.length; i++) {
        output = boosts[i].value(output);
      }
      return output;
    }
  }]);
  return boostStatic;
}();
// Game.classes.boost = class {

// }
module.exports = {
  boostStatic: boostStatic$3
};

var boost = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var _require$1 = require("../src/eMath.js"),
  E$2 = _require$1.E,
  Decimal$1 = _require$1.Decimal;
var _require2$1 = require("../src/classes/boost.js"),
  boostStatic$2 = _require2$1.boostStatic;

/**
 * Represents a currency in the game.
 *
 * @class
 */
var currency$1 = /*#__PURE__*/function () {
  /**
     * Constructs a new currency object with an initial value of 0 and a boost.
     *
     * @constructor
     */
  function currency() {
    _classCallCheck(this, currency);
    /**
           * The current value of the currency.
           * @type {Decimal}
           */
    this.value = E$2(0);

    /**
           * A boost object that affects the currency gain.
           * @type {Game.classes.boost}
           */
    // this.boost = new Game.classes.boost(1);

    /**
           * An array that represents upgrades and their levels.
           * @type {Array}
           */
    this.upgrades = [];
  }

  /**
      * The new currency value after applying the boost.
      * @type {Decimal}
      * @returns {Decimal}
      */
  _createClass(currency, [{
    key: "gain",
    value: function gain() {
      this.value = this.value.add(this.boost.calculate());
      return this.value;
    }
  }, {
    key: "addUpgrade",
    value: function addUpgrade(upgrades) {
      upgrades = upgrades.level ? {
        level: upgrades.level
      } : {
        level: E$2(1)
      };
      this.upgrades.push(upgrades);
      return upgrades;
    }
  }]);
  return currency;
}();

/**
 * Represents the backend for a currency in the game.
 *
 * @class
 */
var currencyStatic$1 = /*#__PURE__*/function () {
  /**
     * Constructs the backend for a currency
     *
     * @constructor
     * @param {function} pointer - returns Game.classes.currency
     */
  function currencyStatic(pointer) {
    _classCallCheck(this, currencyStatic);
    /**
           * An array that represents upgrades, their costs, and their effects.
           * @type {Array}
           */
    this.upgrades = [];

    /**
           * A function that returns the pointer of the data
           * @type {function}
           */
    this.pointer = pointer;

    /**
           * A boost object that affects the currency gain.
           * @type {boostStatic}
           */
    this.boost = new boostStatic$2(1);
  }

  /**
      * The new currency value after applying the boost.
      * @type {Decimal}
      * @returns {Decimal}
      */
  _createClass(currencyStatic, [{
    key: "gain",
    value: function gain() {
      this.pointer().value = this.pointer().value.add(this.boost.calculate());
      return this.value;
    }

    /**
       * Create new upgrades
       *
       * @typedef {Object} CurrencyUpgrade
       * @property {string} [id] - id
       * @property {string} [name] - name
       * @property {Decimal} cost - The cost of the first upgrade
       * @property {function} costScaling - Scalar function for cost with param level
       * @property {Decimal} maxLevel - Max level
       * @property {function} [effect] - Function to call after the upgrade is bought with param upgrade.level and param context
       *
       * @param {Array<CurrencyUpgrade>} upgrades - An array of upgrade objects.
       * @param {boolean} [runEffectInstantly] - Whether to run the effect immediately
       * @example
       * const myCurrency = new currency([
       *     {
       *         cost: E(10), // The cost of the first upgrade
       *
       *         // Additional properties specific to this upgrade
       *     },
       *     // Add more upgrades here...
       * ]);
       */
  }, {
    key: "addUpgrade",
    value: function addUpgrade(upgrades) {
      var _this = this;
      var runEffectInstantly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var _loop = function _loop(i) {
        _this.pointer().addUpgrade(upgrades[i]);
        upgrades[i].getLevel = function () {
          return _this.pointer().upgrades[i].level;
        };
        upgrades[i].setLevel = function (n) {
          return _this.pointer().upgrades[i].level = _this.pointer().upgrades[i].level.add(n);
        };
        if (runEffectInstantly) upgrades[i].effect(upgrades.level);
      };
      for (var i = 0; i < upgrades.length; i++) {
        _loop(i);
      }
      this.upgrades = this.upgrades.concat(upgrades);
    }

    /**
        * Calculates the cost and how many upgrades you can buy
        *
        * @param {*} id
        * @param {*} target
        * @returns {array} - [amount, cost]
        */
  }, {
    key: "calculateUpgrade",
    value: function calculateUpgrade(id, target) {
      // Binary Search
      /**
             * Finds the highest value of 'b' for which the sum of 'f(n)' from 0 to 'b' is less than or equal to 'a'.
             *
             * @param {function} f - The function 'f(n)' to calculate the sum.
             * @param {number} a - The target sum value to compare against.
             * @returns {number} - The highest 'b' value for which the sum is less than or equal to 'a'.
             */
      function findHighestB(f, a) {
        var left = E$2(0);
        var right = E$2(1);
        E$2(0);

        // Find an upper bound for 'b' by exponentially increasing it
        while (calculateSum(f, right).lt(a)) {
          right = right.mul(2);
        }

        // Perform binary search within the estimated range
        while (left.lt(right)) {
          var mid = Decimal$1.floor(left.add(right).div(2));
          var sum = calculateSum(f, mid);
          if (sum.lt(a)) {
            left = mid.add(1);
          } else {
            right = mid;
          }
        }
        return [left, calculateSum(f, left.sub(1))];
      }

      /**
             * Calculates the sum of 'f(n)' from 0 to 'b'.
             *
             * @param {function} f - The function 'f(n)' to calculate the sum.
             * @param {number} b - The upper limit for the sum.
             * @returns {number} - The calculated sum of 'f(n)'.
             */
      function calculateSum(f, b) {
        var sum = E$2();
        for (var n = E$2(0); n.lte(b); n = n.add(1)) {
          sum = sum.add(f(n));
        }
        return sum;
      }

      // Example
      // console.log(findHighestB((n) => n.mul(n), 100))

      // Implementation logic to find the upgrade based on ID or position
      var upgrade;
      if (typeof id == "number") {
        upgrade = this.upgrades[id];
      } else if (typeof id == "string") {
        for (var i = 0; i < this.upgrades.length; i++) {
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

      // Assuming you have found the upgrade object, calculate the maximum affordable quantity
      return findHighestB(function (level) {
        return upgrade.costScaling(upgrade.getLevel().add(level));
      }, this.pointer().value);
    }

    /**
        * Buys an upgrade based on its ID or array position,
        * if enough currency is available.
        *
        * @param {string|number} id - The ID or position of the upgrade to buy or upgrade.
        * If a string is provided, it is treated as the upgrade's ID. If a number is provided, it is treated as the upgrade's array position (starting from 0).
        * @param {Decimal} target - The target level or quantity to reach for the upgrade.
        * This represents how many upgrades to buy or upgrade.
        *
        * @returns {boolean} Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
        *
        */
  }, {
    key: "buyUpgrade",
    value: function buyUpgrade(id, target) {
      // Implementation logic to find the upgrade based on ID or position
      var upgrade;
      if (typeof id == "number") {
        upgrade = this.upgrades[id];
      } else if (typeof id == "string") {
        for (var i = 0; i < this.upgrades.length; i++) {
          if (this.upgrades[i].id === id) {
            upgrade = this.upgrades[i];
            break;
          }
        }
      } else {
        return false;
      }

      // Check if an upgrade object was found
      if (!upgrade) {
        return false;
      }

      // Assuming you have found the upgrade object, calculate the maximum affordable quantity
      var maxAffordableQuantity = this.calculateUpgrade(id, target);

      // Check if maxAffordableQuantity is a valid array
      if (!Array.isArray(maxAffordableQuantity) || maxAffordableQuantity.length !== 2) {
        return false;
      }

      // Check if there's enough currency to afford any upgrades
      if (!maxAffordableQuantity[0].lte(0)) {
        // Determine the actual quantity to purchase based on 'target' and 'maxLevel'
        target = upgrade.getLevel().add(target).lte(upgrade.maxLevel) ? target : upgrade.maxLevel.sub(upgrade.getLevel());

        // Check if the calculated quantity exceeds the affordable quantity
        var condition = maxAffordableQuantity[0].lte(target);

        // Update the affordable quantity and cost if needed
        maxAffordableQuantity[0] = condition ? maxAffordableQuantity[0] : target;
        maxAffordableQuantity[1] = condition ? maxAffordableQuantity[1] : this.calculateSum(upgrade.costScaling, target);

        // Deduct the cost from available currency and increase the upgrade level
        this.pointer().value = this.pointer().value.sub(maxAffordableQuantity[1]);
        upgrade.setLevel(upgrade.getLevel().add(maxAffordableQuantity[0]));

        // Call the effect function if it exists
        if (typeof upgrade.effect === "function") {
          upgrade.effect(upgrade.getLevel(), upgrade);
        }

        // Return true to indicate a successful purchase or upgrade
        return true;
      } else {
        // Return false if unable to afford any upgrades
        return false;
      }
    }
  }]);
  return currencyStatic;
}();
module.exports = {
  currency: currency$1,
  currencyStatic: currencyStatic$1
};

var currency$2 = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var _require = require("../src/eMath.js"),
  E$1 = _require.E; // actually ../../src/eMath.js
var _require2 = require("../src/classes/boost.js"),
  boostStatic$1 = _require2.boostStatic; // actually ../../src/classes/boost.js

/**
 * Represents a static attribute in the game.
 *
 * @class
 */
var staticAttribute$1 = /*#__PURE__*/function () {
  /**
      * Constructs a static attribute with an initial effect.
      *
      * @constructor
      * @param {Decimal|Number} initial - The inital value of the attribute.
      */
  function staticAttribute(initial) {
    _classCallCheck(this, staticAttribute);
    /**
           * The inital value of the attribute.
           * @type {Decimal}
           */
    this.initial = initial;

    /**
           * The current value of the attribute.
           * @type {Decimal}
           */
    this.value = E$1(initial);

    /**
           * A boost object that affects the attribute.
           * @type {Game.classes.boost}
           */
    this.boost = new boostStatic$1(1);
  }
  /**
      * Updates the value of the attribute based on the provided effect function and initial value.
      *
      * @param {function} effect - The effect function to apply to the attribute.
      * @returns {Decimal} The updated value of the attribute after applying the effect.
      */
  _createClass(staticAttribute, [{
    key: "update",
    value: function update(effect) {
      // Execute the provided effect function
      effect();

      // Calculate and set the new value using the initial value and boost factor
      this.value = this.boost.calculate(this.initial);

      // Return the updated attribute value
      return this.value;
    }
  }]);
  return staticAttribute;
}();
module.exports = {
  staticAttribute: staticAttribute$1
};

var attribute = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var eMath = eMath$2.eMath,
  Decimal = eMath$2.Decimal,
  E = eMath$2.E;
var boostStatic = boost.boostStatic;
var currency = currency$2.currency,
  currencyStatic = currency$2.currencyStatic;
var staticAttribute = attribute.staticAttribute;
var src = {
  eMath: eMath,
  Decimal: Decimal,
  E: E,
  boostStatic: boostStatic,
  currency: currency,
  currencyStatic: currencyStatic,
  staticAttribute: staticAttribute
};

module.exports = src;
