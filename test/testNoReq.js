(() => {
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __commonJS = (cb, mod) => function __require() {
	  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
	};
  
	// node_modules/break_eternity.js/dist/break_eternity.js
	var require_break_eternity = __commonJS({
	  "node_modules/break_eternity.js/dist/break_eternity.js"(exports, module) {
		(function(global, factory) {
		  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Decimal = factory());
		})(exports, function() {
		  "use strict";
		  function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
			  throw new TypeError("Cannot call a class as a function");
			}
		  }
		  function _defineProperties(target, props) {
			for (var i2 = 0; i2 < props.length; i2++) {
			  var descriptor = props[i2];
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
			function LRUCache2(maxSize) {
			  _classCallCheck(this, LRUCache2);
			  this.map = /* @__PURE__ */ new Map();
			  this.first = void 0;
			  this.last = void 0;
			  this.maxSize = maxSize;
			}
			_createClass(LRUCache2, [{
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
			return LRUCache2;
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
			for (var i2 = NUMBER_EXP_MIN + 1; i2 <= NUMBER_EXP_MAX; i2++) {
			  powersOf10.push(Number("1e" + i2));
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
			for (var i2 = 0; i2 < 100; ++i2) {
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
			for (var i2 = 0; i2 < 100; ++i2) {
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
			}, {
			  key: "normalize",
			  value: function normalize() {
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
				return this;
			  }
			}, {
			  key: "fromComponents",
			  value: function fromComponents(sign, layer, mag) {
				this.sign = sign;
				this.layer = layer;
				this.mag = mag;
				this.normalize();
				return this;
			  }
			}, {
			  key: "fromComponents_noNormalize",
			  value: function fromComponents_noNormalize(sign, layer, mag) {
				this.sign = sign;
				this.layer = layer;
				this.mag = mag;
				return this;
			  }
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
			}, {
			  key: "fromMantissaExponent_noNormalize",
			  value: function fromMantissaExponent_noNormalize(mantissa, exponent) {
				this.fromMantissaExponent(mantissa, exponent);
				return this;
			  }
			}, {
			  key: "fromDecimal",
			  value: function fromDecimal(value) {
				this.sign = value.sign;
				this.layer = value.layer;
				this.mag = value.mag;
				return this;
			  }
			}, {
			  key: "fromNumber",
			  value: function fromNumber(value) {
				this.mag = Math.abs(value);
				this.sign = Math.sign(value);
				this.layer = 0;
				this.normalize();
				return this;
			  }
			}, {
			  key: "fromString",
			  value: function fromString(value) {
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
					var result = Decimal2.pentate(_base, _height, payload);
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
					var _result = Decimal2.tetrate(_base2, _height2, _payload);
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
					var _result3 = Decimal2.tetrate(base, height, _payload2);
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
					var _result4 = Decimal2.tetrate(base, height, _payload3);
					this.sign = _result4.sign;
					this.layer = _result4.layer;
					this.mag = _result4.mag;
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
				  for (var i2 = 0; i2 < newparts[1].length; ++i2) {
					var chrcode = newparts[1].charCodeAt(i2);
					if (chrcode >= 43 && chrcode <= 57 || chrcode === 101) {
					  layerstring += newparts[1].charAt(i2);
					} else {
					  this.layer = parseFloat(layerstring);
					  this.mag = parseFloat(newparts[1].substr(i2 + 1));
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
					var _result5 = Decimal2.mul(FC(1, 2, exponent), D(mantissa));
					this.sign = _result5.sign;
					this.layer = _result5.layer;
					this.mag = _result5.mag;
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
			}, {
			  key: "toNumber",
			  value: function toNumber() {
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
			}, {
			  key: "toString",
			  value: function toString() {
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
			}, {
			  key: "abs",
			  value: function abs() {
				return FC_NN(this.sign === 0 ? 0 : 1, this.layer, this.mag);
			  }
			}, {
			  key: "neg",
			  value: function neg() {
				return FC_NN(-this.sign, this.layer, this.mag);
			  }
			}, {
			  key: "negate",
			  value: function negate() {
				return this.neg();
			  }
			}, {
			  key: "negated",
			  value: function negated() {
				return this.neg();
			  }
			  // public sign () {
			  //     return this.sign;
			  //   }
			}, {
			  key: "sgn",
			  value: function sgn() {
				return this.sign;
			  }
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
			}, {
			  key: "floor",
			  value: function floor() {
				if (this.mag < 0) {
				  return Decimal2.dZero;
				}
				if (this.layer === 0) {
				  return FC(this.sign, 0, Math.floor(this.mag));
				}
				return this;
			  }
			}, {
			  key: "ceil",
			  value: function ceil() {
				if (this.mag < 0) {
				  return Decimal2.dZero;
				}
				if (this.layer === 0) {
				  return FC(this.sign, 0, Math.ceil(this.mag));
				}
				return this;
			  }
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
			}, {
			  key: "plus",
			  value: function plus(value) {
				return this.add(value);
			  }
			}, {
			  key: "sub",
			  value: function sub(value) {
				return this.add(D(value).neg());
			  }
			}, {
			  key: "subtract",
			  value: function subtract(value) {
				return this.sub(value);
			  }
			}, {
			  key: "minus",
			  value: function minus(value) {
				return this.sub(value);
			  }
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
			}, {
			  key: "multiply",
			  value: function multiply(value) {
				return this.mul(value);
			  }
			}, {
			  key: "times",
			  value: function times(value) {
				return this.mul(value);
			  }
			}, {
			  key: "div",
			  value: function div(value) {
				var decimal = D(value);
				return this.mul(decimal.recip());
			  }
			}, {
			  key: "divide",
			  value: function divide(value) {
				return this.div(value);
			  }
			}, {
			  key: "divideBy",
			  value: function divideBy(value) {
				return this.div(value);
			  }
			}, {
			  key: "dividedBy",
			  value: function dividedBy(value) {
				return this.div(value);
			  }
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
			}, {
			  key: "reciprocal",
			  value: function reciprocal() {
				return this.recip();
			  }
			}, {
			  key: "reciprocate",
			  value: function reciprocate() {
				return this.recip();
			  }
			  /**
			   * -1 for less than value, 0 for equals value, 1 for greater than value
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
			}, {
			  key: "compare",
			  value: function compare(value) {
				return this.cmp(value);
			  }
			}, {
			  key: "isNan",
			  value: function isNan() {
				return isNaN(this.sign) || isNaN(this.layer) || isNaN(this.mag);
			  }
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
			  }(function() {
				return isFinite(this.sign) && isFinite(this.layer) && isFinite(this.mag);
			  })
			}, {
			  key: "eq",
			  value: function eq(value) {
				var decimal = D(value);
				return this.sign === decimal.sign && this.layer === decimal.layer && this.mag === decimal.mag;
			  }
			}, {
			  key: "equals",
			  value: function equals(value) {
				return this.eq(value);
			  }
			}, {
			  key: "neq",
			  value: function neq(value) {
				return !this.eq(value);
			  }
			}, {
			  key: "notEquals",
			  value: function notEquals(value) {
				return this.neq(value);
			  }
			}, {
			  key: "lt",
			  value: function lt(value) {
				return this.cmp(value) === -1;
			  }
			}, {
			  key: "lte",
			  value: function lte(value) {
				return !this.gt(value);
			  }
			}, {
			  key: "gt",
			  value: function gt(value) {
				return this.cmp(value) === 1;
			  }
			}, {
			  key: "gte",
			  value: function gte(value) {
				return !this.lt(value);
			  }
			}, {
			  key: "max",
			  value: function max(value) {
				var decimal = D(value);
				return this.lt(decimal) ? decimal : this;
			  }
			}, {
			  key: "min",
			  value: function min(value) {
				var decimal = D(value);
				return this.gt(decimal) ? decimal : this;
			  }
			}, {
			  key: "maxabs",
			  value: function maxabs(value) {
				var decimal = D(value);
				return this.cmpabs(decimal) < 0 ? decimal : this;
			  }
			}, {
			  key: "minabs",
			  value: function minabs(value) {
				var decimal = D(value);
				return this.cmpabs(decimal) > 0 ? decimal : this;
			  }
			}, {
			  key: "clamp",
			  value: function clamp(min, max) {
				return this.max(min).min(max);
			  }
			}, {
			  key: "clampMin",
			  value: function clampMin(min) {
				return this.max(min);
			  }
			}, {
			  key: "clampMax",
			  value: function clampMax(max) {
				return this.min(max);
			  }
			}, {
			  key: "cmp_tolerance",
			  value: function cmp_tolerance(value, tolerance) {
				var decimal = D(value);
				return this.eq_tolerance(decimal, tolerance) ? 0 : this.cmp(decimal);
			  }
			}, {
			  key: "compare_tolerance",
			  value: function compare_tolerance(value, tolerance) {
				return this.cmp_tolerance(value, tolerance);
			  }
			  /**
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
			}, {
			  key: "equals_tolerance",
			  value: function equals_tolerance(value, tolerance) {
				return this.eq_tolerance(value, tolerance);
			  }
			}, {
			  key: "neq_tolerance",
			  value: function neq_tolerance(value, tolerance) {
				return !this.eq_tolerance(value, tolerance);
			  }
			}, {
			  key: "notEquals_tolerance",
			  value: function notEquals_tolerance(value, tolerance) {
				return this.neq_tolerance(value, tolerance);
			  }
			}, {
			  key: "lt_tolerance",
			  value: function lt_tolerance(value, tolerance) {
				var decimal = D(value);
				return !this.eq_tolerance(decimal, tolerance) && this.lt(decimal);
			  }
			}, {
			  key: "lte_tolerance",
			  value: function lte_tolerance(value, tolerance) {
				var decimal = D(value);
				return this.eq_tolerance(decimal, tolerance) || this.lt(decimal);
			  }
			}, {
			  key: "gt_tolerance",
			  value: function gt_tolerance(value, tolerance) {
				var decimal = D(value);
				return !this.eq_tolerance(decimal, tolerance) && this.gt(decimal);
			  }
			}, {
			  key: "gte_tolerance",
			  value: function gte_tolerance(value, tolerance) {
				var decimal = D(value);
				return this.eq_tolerance(decimal, tolerance) || this.gt(decimal);
			  }
			}, {
			  key: "pLog10",
			  value: function pLog10() {
				if (this.lt(Decimal2.dZero)) {
				  return Decimal2.dZero;
				}
				return this.log10();
			  }
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
			}, {
			  key: "logarithm",
			  value: function logarithm(base) {
				return this.log(base);
			  }
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
			}, {
			  key: "pow_base",
			  value: function pow_base(value) {
				return D(value).pow(this);
			  }
			}, {
			  key: "root",
			  value: function root(value) {
				var decimal = D(value);
				return this.pow(decimal.recip());
			  }
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
			}, {
			  key: "lngamma",
			  value: function lngamma() {
				return this.gamma().ln();
			  }
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
			}, {
			  key: "sqr",
			  value: function sqr() {
				return this.pow(2);
			  }
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
			}, {
			  key: "cube",
			  value: function cube() {
				return this.pow(3);
			  }
			}, {
			  key: "cbrt",
			  value: function cbrt() {
				return this.pow(1 / 3);
			  }
			  //Tetration/tetrate: The result of exponentiating 'this' to 'this' 'height' times in a row.  https://en.wikipedia.org/wiki/Tetration
			  //If payload != 1, then this is 'iterated exponentiation', the result of exping (payload) to base (this) (height) times. https://andydude.github.io/tetration/archives/tetration2/ident.html
			  //Works with negative and positive real heights.
			}, {
			  key: "tetrate",
			  value: function tetrate() {
				var height = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 2;
				var payload = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : FC_NN(1, 0, 1);
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
				  return Decimal2.iteratedlog(payload, this, -height);
				}
				payload = D(payload);
				var oldheight = height;
				height = Math.trunc(height);
				var fracheight = oldheight - height;
				if (this.gt(Decimal2.dZero) && this.lte(1.444667861009766)) {
				  height = Math.min(1e4, height);
				  for (var i2 = 0; i2 < height; ++i2) {
					var old_payload = payload;
					payload = this.pow(payload);
					if (old_payload.eq(payload)) {
					  return payload;
					}
				  }
				  if (fracheight != 0) {
					var next_payload = this.pow(payload);
					return payload.mul(1 - fracheight).add(next_payload.mul(fracheight));
				  }
				  return payload;
				}
				if (fracheight !== 0) {
				  if (payload.eq(Decimal2.dOne)) {
					if (this.gt(10)) {
					  payload = this.pow(fracheight);
					} else {
					  payload = Decimal2.fromNumber(Decimal2.tetrate_critical(this.toNumber(), fracheight));
					  if (this.lt(2)) {
						payload = payload.sub(1).mul(this.minus(1)).plus(1);
					  }
					}
				  } else {
					if (this.eq(10)) {
					  payload = payload.layeradd10(fracheight);
					} else {
					  payload = payload.layeradd(fracheight, this);
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
			  //iteratedexp/iterated exponentiation: - all cases handled in tetrate, so just call it
			}, {
			  key: "iteratedexp",
			  value: function iteratedexp() {
				var height = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 2;
				var payload = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : FC_NN(1, 0, 1);
				return this.tetrate(height, payload);
			  }
			  //iterated log/repeated log: The result of applying log(base) 'times' times in a row. Approximately equal to subtracting (times) from the number's slog representation. Equivalent to tetrating to a negative height.
			  //Works with negative and positive real heights.
			}, {
			  key: "iteratedlog",
			  value: function iteratedlog() {
				var base = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
				var times = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
				if (times < 0) {
				  return Decimal2.tetrate(base, -times, this);
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
				for (var i2 = 0; i2 < times; ++i2) {
				  result = result.log(base);
				  if (!isFinite(result.layer) || !isFinite(result.mag)) {
					return result.normalize();
				  }
				  if (i2 > 1e4) {
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
			  //Super-logarithm, one of tetration's inverses, tells you what size power tower you'd have to tetrate base to to get number. By definition, will never be higher than 1.8e308 in break_eternity.js, since a power tower 1.8e308 numbers tall is the largest representable number.
			  // https://en.wikipedia.org/wiki/Super-logarithm
			  // NEW: Accept a number of iterations, and use binary search to, after making an initial guess, hone in on the true value, assuming tetration as the ground truth.
			}, {
			  key: "slog",
			  value: function slog() {
				var base = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
				var iterations = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 43;
				var step_size = 1e-3;
				var has_changed_directions_once = false;
				var previously_rose = false;
				var result = this.slog_internal(base).toNumber();
				for (var i2 = 1; i2 < iterations; ++i2) {
				  var new_decimal = new Decimal2(base).tetrate(result);
				  var currently_rose = new_decimal.gt(this);
				  if (iterations > 1) {
					if (previously_rose != currently_rose) {
					  has_changed_directions_once = true;
					}
				  }
				  previously_rose = currently_rose;
				  if (has_changed_directions_once) {
					step_size /= 2;
				  }
				  step_size = Math.abs(step_size) * (currently_rose ? -1 : 1);
				  result += step_size;
				}
				return Decimal2.fromNumber(result);
			  }
			}, {
			  key: "slog_internal",
			  value: function slog_internal() {
				var base = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
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
				for (var i2 = 0; i2 < 100; ++i2) {
				  if (copy.lt(Decimal2.dZero)) {
					copy = Decimal2.pow(base, copy);
					result -= 1;
				  } else if (copy.lte(Decimal2.dOne)) {
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
				//Function for adding/removing layers from a Decimal, even fractional layers (e.g. its slog10 representation).
				//Moved this over to use the same critical section as tetrate/slog.
				function layeradd10(diff) {
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
					  for (var i2 = 0; i2 < 100; ++i2) {
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
			  )
			  //layeradd: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 'base' and iterated log base 'base'.
			}, {
			  key: "layeradd",
			  value: function layeradd(diff, base) {
				var slogthis = this.slog(base).toNumber();
				var slogdest = slogthis + diff;
				if (slogdest >= 0) {
				  return Decimal2.tetrate(base, slogdest);
				} else if (!Number.isFinite(slogdest)) {
				  return Decimal2.dNaN;
				} else if (slogdest >= -1) {
				  return Decimal2.log(Decimal2.tetrate(base, slogdest + 1), base);
				} else {
				  return Decimal2.log(Decimal2.log(Decimal2.tetrate(base, slogdest + 2), base), base);
				}
			  }
			  //The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
			  // https://en.wikipedia.org/wiki/Lambert_W_function
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
			  //The super square-root function - what number, tetrated to height 2, equals this?
			  //Other sroots are possible to calculate probably through guess and check methods, this one is easy though.
			  // https://en.wikipedia.org/wiki/Tetration#Super-root
			}, {
			  key: "ssqrt",
			  value: function ssqrt() {
				if (this.sign == 1 && this.layer >= 3) {
				  return FC_NN(this.sign, this.layer - 1, this.mag);
				}
				var lnx = this.ln();
				return lnx.div(lnx.lambertw());
			  }
			  /*
				Unit tests for tetrate/iteratedexp/iteratedlog/layeradd10/layeradd/slog:
			  (note: these won't be exactly precise with the new slog implementation, but that's okay)
				for (var i = 0; i < 1000; ++i)
			  {
			  var first = Math.random()*100;
			  var both = Math.random()*100;
			  var expected = first+both+1;
			  var result = new Decimal(10).layeradd10(first).layeradd10(both).slog();
			  if (Number.isFinite(result.mag) && !Decimal.eq_tolerance(expected, result))
			  {
				  console.log(first + ", " + both);
			  }
			  }
				for (var i = 0; i < 1000; ++i)
			  {
			  var first = Math.random()*100;
			  var both = Math.random()*100;
			  first += both;
			  var expected = first-both+1;
			  var result = new Decimal(10).layeradd10(first).layeradd10(-both).slog();
			  if (Number.isFinite(result.mag) && !Decimal.eq_tolerance(expected, result))
			  {
				  console.log(first + ", " + both);
			  }
			  }
				for (var i = 0; i < 1000; ++i)
			  {
			  var first = Math.random()*100;
			  var both = Math.random()*100;
			  var base = Math.random()*8+2;
			  var expected = first+both+1;
			  var result = new Decimal(base).layeradd(first, base).layeradd(both, base).slog(base);
			  if (Number.isFinite(result.mag) && !Decimal.eq_tolerance(expected, result))
			  {
				  console.log(first + ", " + both);
			  }
			  }
				for (var i = 0; i < 1000; ++i)
			  {
			  var first = Math.random()*100;
			  var both = Math.random()*100;
			  var base = Math.random()*8+2;
			  first += both;
			  var expected = first-both+1;
			  var result = new Decimal(base).layeradd(first, base).layeradd(-both, base).slog(base);
			  if (Number.isFinite(result.mag) && !Decimal.eq_tolerance(expected, result))
			  {
				  console.log(first + ", " + both);
			  }
			  }
				for (var i = 0; i < 1000; ++i)
			  {
			  var first = Math.round((Math.random()*30))/10;
			  var both = Math.round((Math.random()*30))/10;
			  var tetrateonly = Decimal.tetrate(10, first);
			  var tetrateandlog = Decimal.tetrate(10, first+both).iteratedlog(10, both);
			  if (!Decimal.eq_tolerance(tetrateonly, tetrateandlog))
			  {
			  console.log(first + ", " + both);
			  }
			  }
				for (var i = 0; i < 1000; ++i)
			  {
			  var first = Math.round((Math.random()*30))/10;
			  var both = Math.round((Math.random()*30))/10;
			  var base = Math.random()*8+2;
			  var tetrateonly = Decimal.tetrate(base, first);
			  var tetrateandlog = Decimal.tetrate(base, first+both).iteratedlog(base, both);
			  if (!Decimal.eq_tolerance(tetrateonly, tetrateandlog))
			  {
			  console.log(first + ", " + both);
			  }
			  }
				for (var i = 0; i < 1000; ++i)
			  {
			  var first = Math.round((Math.random()*30))/10;
			  var both = Math.round((Math.random()*30))/10;
			  var base = Math.random()*8+2;
			  var tetrateonly = Decimal.tetrate(base, first, base);
			  var tetrateandlog = Decimal.tetrate(base, first+both, base).iteratedlog(base, both);
			  if (!Decimal.eq_tolerance(tetrateonly, tetrateandlog))
			  {
			  console.log(first + ", " + both);
			  }
			  }
				for (var i = 0; i < 1000; ++i)
			  {
			  var xex = new Decimal(-0.3678794411710499+Math.random()*100);
			  var x = Decimal.lambertw(xex);
			  if (!Decimal.eq_tolerance(xex, x.mul(Decimal.exp(x))))
			  {
				  console.log(xex);
			  }
			  }
				for (var i = 0; i < 1000; ++i)
			  {
			  var xex = new Decimal(-0.3678794411710499+Math.exp(Math.random()*100));
			  var x = Decimal.lambertw(xex);
			  if (!Decimal.eq_tolerance(xex, x.mul(Decimal.exp(x))))
			  {
				  console.log(xex);
			  }
			  }
				for (var i = 0; i < 1000; ++i)
			  {
			  var a = Decimal.randomDecimalForTesting(Math.random() > 0.5 ? 0 : 1);
			  var b = Decimal.randomDecimalForTesting(Math.random() > 0.5 ? 0 : 1);
			  if (Math.random() > 0.5) { a = a.recip(); }
			  if (Math.random() > 0.5) { b = b.recip(); }
			  var c = a.add(b).toNumber();
			  if (Number.isFinite(c) && !Decimal.eq_tolerance(c, a.toNumber()+b.toNumber()))
			  {
				  console.log(a + ", " + b);
			  }
			  }
				for (var i = 0; i < 100; ++i)
			  {
			  var a = Decimal.randomDecimalForTesting(Math.round(Math.random()*4));
			  var b = Decimal.randomDecimalForTesting(Math.round(Math.random()*4));
			  if (Math.random() > 0.5) { a = a.recip(); }
			  if (Math.random() > 0.5) { b = b.recip(); }
			  var c = a.mul(b).toNumber();
			  if (Number.isFinite(c) && Number.isFinite(a.toNumber()) && Number.isFinite(b.toNumber()) && a.toNumber() != 0 && b.toNumber() != 0 && c != 0 && !Decimal.eq_tolerance(c, a.toNumber()*b.toNumber()))
			  {
				  console.log("Test 1: " + a + ", " + b);
			  }
			  else if (!Decimal.mul(a.recip(), b.recip()).eq_tolerance(Decimal.mul(a, b).recip()))
			  {
				  console.log("Test 3: " + a + ", " + b);
			  }
			  }
				for (var i = 0; i < 10; ++i)
			  {
			  var a = Decimal.randomDecimalForTesting(Math.round(Math.random()*4));
			  var b = Decimal.randomDecimalForTesting(Math.round(Math.random()*4));
			  if (Math.random() > 0.5 && a.sign !== 0) { a = a.recip(); }
			  if (Math.random() > 0.5 && b.sign !== 0) { b = b.recip(); }
			  var c = a.pow(b);
			  var d = a.root(b.recip());
			  var e = a.pow(b.recip());
			  var f = a.root(b);
				  if (!c.eq_tolerance(d) && a.sign !== 0 && b.sign !== 0)
			  {
				console.log("Test 1: " + a + ", " + b);
			  }
			  if (!e.eq_tolerance(f) && a.sign !== 0 && b.sign !== 0)
			  {
				console.log("Test 2: " + a + ", " + b);
			  }
			  }
				for (var i = 0; i < 10; ++i)
			  {
			  var a = Math.round(Math.random()*18-9);
			  var b = Math.round(Math.random()*100-50);
			  var c = Math.round(Math.random()*18-9);
			  var d = Math.round(Math.random()*100-50);
			  console.log("Decimal.pow(Decimal.fromMantissaExponent(" + a + ", " + b + "), Decimal.fromMantissaExponent(" + c + ", " + d + ")).toString()");
			  }
				*/
			  //Pentation/pentate: The result of tetrating 'height' times in a row. An absurdly strong operator - Decimal.pentate(2, 4.28) and Decimal.pentate(10, 2.37) are already too huge for break_eternity.js!
			  // https://en.wikipedia.org/wiki/Pentation
			}, {
			  key: "pentate",
			  value: function pentate() {
				var height = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 2;
				var payload = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : FC_NN(1, 0, 1);
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
					  payload = payload.layeradd10(fracheight);
					} else {
					  payload = payload.layeradd(fracheight, this);
					}
				  }
				}
				for (var i2 = 0; i2 < height; ++i2) {
				  payload = this.tetrate(payload.toNumber());
				  if (!isFinite(payload.layer) || !isFinite(payload.mag)) {
					return payload.normalize();
				  }
				  if (i2 > 10) {
					return payload;
				  }
				}
				return payload;
			  }
			  // trig functions!
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
			}, {
			  key: "sinh",
			  value: function sinh() {
				return this.exp().sub(this.negate().exp()).div(2);
			  }
			}, {
			  key: "cosh",
			  value: function cosh() {
				return this.exp().add(this.negate().exp()).div(2);
			  }
			}, {
			  key: "tanh",
			  value: function tanh() {
				return this.sinh().div(this.cosh());
			  }
			}, {
			  key: "asinh",
			  value: function asinh() {
				return Decimal2.ln(this.add(this.sqr().add(1).sqrt()));
			  }
			}, {
			  key: "acosh",
			  value: function acosh() {
				return Decimal2.ln(this.add(this.sqr().sub(1).sqrt()));
			  }
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
			}, {
			  key: "fromComponents_noNormalize",
			  value: function fromComponents_noNormalize(sign, layer, mag) {
				return new Decimal2().fromComponents_noNormalize(sign, layer, mag);
			  }
			}, {
			  key: "fromMantissaExponent",
			  value: function fromMantissaExponent(mantissa, exponent) {
				return new Decimal2().fromMantissaExponent(mantissa, exponent);
			  }
			}, {
			  key: "fromMantissaExponent_noNormalize",
			  value: function fromMantissaExponent_noNormalize(mantissa, exponent) {
				return new Decimal2().fromMantissaExponent_noNormalize(mantissa, exponent);
			  }
			}, {
			  key: "fromDecimal",
			  value: function fromDecimal(value) {
				return new Decimal2().fromDecimal(value);
			  }
			}, {
			  key: "fromNumber",
			  value: function fromNumber(value) {
				return new Decimal2().fromNumber(value);
			  }
			}, {
			  key: "fromString",
			  value: function fromString(value) {
				return new Decimal2().fromString(value);
			  }
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
			}, {
			  key: "abs",
			  value: function abs(value) {
				return D(value).abs();
			  }
			}, {
			  key: "neg",
			  value: function neg(value) {
				return D(value).neg();
			  }
			}, {
			  key: "negate",
			  value: function negate(value) {
				return D(value).neg();
			  }
			}, {
			  key: "negated",
			  value: function negated(value) {
				return D(value).neg();
			  }
			}, {
			  key: "sign",
			  value: function sign(value) {
				return D(value).sign;
			  }
			}, {
			  key: "sgn",
			  value: function sgn(value) {
				return D(value).sign;
			  }
			}, {
			  key: "round",
			  value: function round(value) {
				return D(value).round();
			  }
			}, {
			  key: "floor",
			  value: function floor(value) {
				return D(value).floor();
			  }
			}, {
			  key: "ceil",
			  value: function ceil(value) {
				return D(value).ceil();
			  }
			}, {
			  key: "trunc",
			  value: function trunc(value) {
				return D(value).trunc();
			  }
			}, {
			  key: "add",
			  value: function add(value, other) {
				return D(value).add(other);
			  }
			}, {
			  key: "plus",
			  value: function plus(value, other) {
				return D(value).add(other);
			  }
			}, {
			  key: "sub",
			  value: function sub(value, other) {
				return D(value).sub(other);
			  }
			}, {
			  key: "subtract",
			  value: function subtract(value, other) {
				return D(value).sub(other);
			  }
			}, {
			  key: "minus",
			  value: function minus(value, other) {
				return D(value).sub(other);
			  }
			}, {
			  key: "mul",
			  value: function mul(value, other) {
				return D(value).mul(other);
			  }
			}, {
			  key: "multiply",
			  value: function multiply(value, other) {
				return D(value).mul(other);
			  }
			}, {
			  key: "times",
			  value: function times(value, other) {
				return D(value).mul(other);
			  }
			}, {
			  key: "div",
			  value: function div(value, other) {
				return D(value).div(other);
			  }
			}, {
			  key: "divide",
			  value: function divide(value, other) {
				return D(value).div(other);
			  }
			}, {
			  key: "recip",
			  value: function recip(value) {
				return D(value).recip();
			  }
			}, {
			  key: "reciprocal",
			  value: function reciprocal(value) {
				return D(value).recip();
			  }
			}, {
			  key: "reciprocate",
			  value: function reciprocate(value) {
				return D(value).reciprocate();
			  }
			}, {
			  key: "cmp",
			  value: function cmp(value, other) {
				return D(value).cmp(other);
			  }
			}, {
			  key: "cmpabs",
			  value: function cmpabs(value, other) {
				return D(value).cmpabs(other);
			  }
			}, {
			  key: "compare",
			  value: function compare(value, other) {
				return D(value).cmp(other);
			  }
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
			  }(function(value) {
				value = D(value);
				return isNaN(value.sign) || isNaN(value.layer) || isNaN(value.mag);
			  })
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
			  }(function(value) {
				value = D(value);
				return isFinite(value.sign) && isFinite(value.layer) && isFinite(value.mag);
			  })
			}, {
			  key: "eq",
			  value: function eq(value, other) {
				return D(value).eq(other);
			  }
			}, {
			  key: "equals",
			  value: function equals(value, other) {
				return D(value).eq(other);
			  }
			}, {
			  key: "neq",
			  value: function neq(value, other) {
				return D(value).neq(other);
			  }
			}, {
			  key: "notEquals",
			  value: function notEquals(value, other) {
				return D(value).notEquals(other);
			  }
			}, {
			  key: "lt",
			  value: function lt(value, other) {
				return D(value).lt(other);
			  }
			}, {
			  key: "lte",
			  value: function lte(value, other) {
				return D(value).lte(other);
			  }
			}, {
			  key: "gt",
			  value: function gt(value, other) {
				return D(value).gt(other);
			  }
			}, {
			  key: "gte",
			  value: function gte(value, other) {
				return D(value).gte(other);
			  }
			}, {
			  key: "max",
			  value: function max(value, other) {
				return D(value).max(other);
			  }
			}, {
			  key: "min",
			  value: function min(value, other) {
				return D(value).min(other);
			  }
			}, {
			  key: "minabs",
			  value: function minabs(value, other) {
				return D(value).minabs(other);
			  }
			}, {
			  key: "maxabs",
			  value: function maxabs(value, other) {
				return D(value).maxabs(other);
			  }
			}, {
			  key: "clamp",
			  value: function clamp(value, min, max) {
				return D(value).clamp(min, max);
			  }
			}, {
			  key: "clampMin",
			  value: function clampMin(value, min) {
				return D(value).clampMin(min);
			  }
			}, {
			  key: "clampMax",
			  value: function clampMax(value, max) {
				return D(value).clampMax(max);
			  }
			}, {
			  key: "cmp_tolerance",
			  value: function cmp_tolerance(value, other, tolerance) {
				return D(value).cmp_tolerance(other, tolerance);
			  }
			}, {
			  key: "compare_tolerance",
			  value: function compare_tolerance(value, other, tolerance) {
				return D(value).cmp_tolerance(other, tolerance);
			  }
			}, {
			  key: "eq_tolerance",
			  value: function eq_tolerance(value, other, tolerance) {
				return D(value).eq_tolerance(other, tolerance);
			  }
			}, {
			  key: "equals_tolerance",
			  value: function equals_tolerance(value, other, tolerance) {
				return D(value).eq_tolerance(other, tolerance);
			  }
			}, {
			  key: "neq_tolerance",
			  value: function neq_tolerance(value, other, tolerance) {
				return D(value).neq_tolerance(other, tolerance);
			  }
			}, {
			  key: "notEquals_tolerance",
			  value: function notEquals_tolerance(value, other, tolerance) {
				return D(value).notEquals_tolerance(other, tolerance);
			  }
			}, {
			  key: "lt_tolerance",
			  value: function lt_tolerance(value, other, tolerance) {
				return D(value).lt_tolerance(other, tolerance);
			  }
			}, {
			  key: "lte_tolerance",
			  value: function lte_tolerance(value, other, tolerance) {
				return D(value).lte_tolerance(other, tolerance);
			  }
			}, {
			  key: "gt_tolerance",
			  value: function gt_tolerance(value, other, tolerance) {
				return D(value).gt_tolerance(other, tolerance);
			  }
			}, {
			  key: "gte_tolerance",
			  value: function gte_tolerance(value, other, tolerance) {
				return D(value).gte_tolerance(other, tolerance);
			  }
			}, {
			  key: "pLog10",
			  value: function pLog10(value) {
				return D(value).pLog10();
			  }
			}, {
			  key: "absLog10",
			  value: function absLog10(value) {
				return D(value).absLog10();
			  }
			}, {
			  key: "log10",
			  value: function log10(value) {
				return D(value).log10();
			  }
			}, {
			  key: "log",
			  value: function log(value, base) {
				return D(value).log(base);
			  }
			}, {
			  key: "log2",
			  value: function log2(value) {
				return D(value).log2();
			  }
			}, {
			  key: "ln",
			  value: function ln(value) {
				return D(value).ln();
			  }
			}, {
			  key: "logarithm",
			  value: function logarithm(value, base) {
				return D(value).logarithm(base);
			  }
			}, {
			  key: "pow",
			  value: function pow(value, other) {
				return D(value).pow(other);
			  }
			}, {
			  key: "pow10",
			  value: function pow10(value) {
				return D(value).pow10();
			  }
			}, {
			  key: "root",
			  value: function root(value, other) {
				return D(value).root(other);
			  }
			}, {
			  key: "factorial",
			  value: function factorial(value, _other) {
				return D(value).factorial();
			  }
			}, {
			  key: "gamma",
			  value: function gamma(value, _other) {
				return D(value).gamma();
			  }
			}, {
			  key: "lngamma",
			  value: function lngamma(value, _other) {
				return D(value).lngamma();
			  }
			}, {
			  key: "exp",
			  value: function exp(value) {
				return D(value).exp();
			  }
			}, {
			  key: "sqr",
			  value: function sqr(value) {
				return D(value).sqr();
			  }
			}, {
			  key: "sqrt",
			  value: function sqrt(value) {
				return D(value).sqrt();
			  }
			}, {
			  key: "cube",
			  value: function cube(value) {
				return D(value).cube();
			  }
			}, {
			  key: "cbrt",
			  value: function cbrt(value) {
				return D(value).cbrt();
			  }
			}, {
			  key: "tetrate",
			  value: function tetrate(value) {
				var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
				var payload = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : FC_NN(1, 0, 1);
				return D(value).tetrate(height, payload);
			  }
			}, {
			  key: "iteratedexp",
			  value: function iteratedexp(value) {
				var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
				var payload = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : FC_NN(1, 0, 1);
				return D(value).iteratedexp(height, payload);
			  }
			}, {
			  key: "iteratedlog",
			  value: function iteratedlog(value) {
				var base = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 10;
				var times = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
				return D(value).iteratedlog(base, times);
			  }
			}, {
			  key: "layeradd10",
			  value: function layeradd10(value, diff) {
				return D(value).layeradd10(diff);
			  }
			}, {
			  key: "layeradd",
			  value: function layeradd(value, diff) {
				var base = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 10;
				return D(value).layeradd(diff, base);
			  }
			}, {
			  key: "slog",
			  value: function slog(value) {
				var base = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 10;
				return D(value).slog(base);
			  }
			}, {
			  key: "lambertw",
			  value: function lambertw(value) {
				return D(value).lambertw();
			  }
			}, {
			  key: "ssqrt",
			  value: function ssqrt(value) {
				return D(value).ssqrt();
			  }
			}, {
			  key: "pentate",
			  value: function pentate(value) {
				var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
				var payload = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : FC_NN(1, 0, 1);
				return D(value).pentate(height, payload);
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
				for (var i2 = 0; i2 < critical_headers.length; ++i2) {
				  if (critical_headers[i2] == base) {
					lower = grid[i2][Math.floor(height)];
					upper = grid[i2][Math.ceil(height)];
					break;
				  } else if (critical_headers[i2] < base && critical_headers[i2 + 1] > base) {
					var basefrac = (base - critical_headers[i2]) / (critical_headers[i2 + 1] - critical_headers[i2]);
					lower = grid[i2][Math.floor(height)] * (1 - basefrac) + grid[i2 + 1][Math.floor(height)] * basefrac;
					upper = grid[i2][Math.ceil(height)] * (1 - basefrac) + grid[i2 + 1][Math.ceil(height)] * basefrac;
					break;
				  }
				}
				var frac = height - Math.floor(height);
				var result = Math.pow(base, Math.log(lower) / Math.log(base) * (1 - frac) + Math.log(upper) / Math.log(base) * frac);
				return result;
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
		  return Decimal;
		});
	  }
	});
  
	// src/eMath.js
	var require_eMath = __commonJS({
	  "src/eMath.js"(exports, module) {
		var Decimal = require_break_eternity();
		var DecimalClone = Decimal;
		var eMath = {
		  // version: "etherealArithmetic Indev 0.4a",
		  // changeLogs: {
		  //     indev: {
		  //         "0.4": "Added changelogs, random() quantity, scuffed median",
		  //         "0.4a": "Added quick sort, moved onload to init"
		  //     }
		  // },
		  // settings: [
		  //     0, //notation: 0 = scientific; 1 = engineering
		  //     0, //display: 0 = (+); 1 = ()
		  // ],
		  time: function(funct, rep) {
			let timeStart = /* @__PURE__ */ new Date();
			for (i = 0; i < (rep ? rep : 1); i++) {
			  funct();
			}
			timeTaken = Date.now() - timeStart;
			console.log(`Function complete: Took ${timeTaken}ms`);
			return timeTaken;
		  },
		  // syncTime: function(func) {
		  //     return new Promise(func => setTimeout(func, this.time(func)))
		  // },
		  random: (min, max, round) => !(round != void 0 && !round) ? Math.round(Math.random() * (max > min ? max - min : min - max) + (max > min ? min : max)) : Math.random() * (max > min ? max - min : min - max) + (max > min ? min : max),
		  //rounds by default, can disable
		  string: (times, type) => {
			const stUpperBound = 35;
			const upperBound = 50;
			const errors = [
			  {
				type: "TypeError",
				value: typeof times != "number",
				display: `${times} is not a number`
			  },
			  {
				type: "Error",
				value: times < 1,
				display: `${times} is less than 1`
			  },
			  {
				type: "Error",
				value: times % 1 != 0,
				display: `${times} is not an integer`
			  },
			  {
				type: "Error",
				value: times > stUpperBound && !type,
				display: `${times} exceeds the maximum call size of ${stUpperBound}`
			  },
			  {
				type: "Error",
				value: times > upperBound && type,
				display: `${times} exceeds the maximum call size of ${upperBound}`
			  }
			];
			for (let x of errors) {
			  if (x.value) {
				throw `${x.type}: ${x.display}`;
			  }
			}
			let output = Math.random() * 1232311;
			for (i = 0; i < times; i++) {
			  output = btoa(output) + btoa(btoa(Math.random()));
			}
			return type ? output.length : output;
		  },
		  trueString: (length) => "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".random(length),
		  decimalFunctions: [
			{
			  name: "random",
			  value: (min, max, qty, round) => {
				min = E(min);
				max = E(max);
				if (qty) {
				  let out = [];
				  for (i = 0; i < qty; i++) {
					let output = E();
					output = output.plus(max > min ? min : max).plus(max > min ? max.minus(min).times(Math.random()) : min.minus(max).times(Math.random()));
					output = !(round != void 0 && !round) ? output.round() : output;
					out.push(output);
				  }
				  return out;
				} else {
				  let output = E();
				  output = output.plus(max > min ? min : max).plus(max > min ? max.minus(min).times(Math.random()) : min.minus(max).times(Math.random()));
				  output = !(round != void 0 && !round) ? output.round() : output;
				  return output;
				}
			  }
			},
			{
			  name: "mean",
			  value: (array) => {
				let sum = new DecimalClone();
				let total = 0;
				for (let x of array) {
				  total++;
				  sum = sum.plus(x);
				}
				return sum.divide(total);
			  }
			},
			{
			  name: "median",
			  //bugs
			  value: (array, sort = DecimalClone.sort, mean = DecimalClone.mean) => !array.length % 2 ? sort(array)[Math.floor(array.length / 2)] : mean([sort(array)[array.length], sort(array)[array.length - 1]])
			},
			{
			  name: "mode",
			  //also bugs
			  value: (array) => {
				const stor = [{ value: E(Infinity), frequency: 0 }];
				let stor2 = [];
				let output = [];
				for (let x of array) {
				  x = E(x);
				  for (let y of stor) {
					console.log(y.value, x);
					if (y.value.neq(x)) {
					  stor.push({
						value: x,
						frequency: 1
					  });
					  break;
					} else {
					  y.frequency++;
					  break;
					}
				  }
				}
				console.log(stor);
				for (let x of stor) {
				  stor2.push(x.frequency);
				}
				console.log(stor2);
				stor2 = eMath.decimal.sort(stor2)[stor2.length - 1];
				console.log(stor);
				for (let x of stor) {
				  console.log(x);
				  if (x.frequency == stor2) {
					output.push(x.value);
				  }
				}
				return output;
			  }
			},
			{
			  name: "sort",
			  //default sort
			  value: (array) => eMath.decimal.qtSort(array)
			},
			{
			  name: "bbSort",
			  //bubble sort
			  value: (array) => {
				for (let i2 = 0; i2 < array.length; i2++) {
				  for (let j = 0; j < array.length - i2 - 1; j++) {
					if (E(array[j]).gt(E(array[j + 1]))) {
					  let temp = array[j];
					  array[j] = array[j + 1];
					  array[j + 1] = temp;
					}
				  }
				}
				return array;
			  }
			},
			{
			  name: "qtSort",
			  //quick sort lr ptr
			  value: (array) => {
				if (array.length < 2) {
				  return array;
				}
				let pivot = E(array[Math.floor(Math.random() * array.length)]);
				let left = [];
				let right = [];
				let equal = [];
				for (let val of array) {
				  val = E(val);
				  if (val.lt(pivot)) {
					left.push(val);
				  } else if (val.gt(pivot)) {
					right.push(val);
				  } else {
					equal.push(val);
				  }
				}
				return [
				  ...eMath.decimal.qtSort(left),
				  ...equal,
				  ...eMath.decimal.qtSort(right)
				];
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
		  encrypt: function(string, key) {
			let output = "";
			let x = 0;
			string.forEach(function(char) {
			  if (x > key.length - 1) {
				x = 0;
			  }
			  output += char + key[x];
			  x++;
			});
			output = btoa(output);
			return output;
		  },
		  decrypt: function(string) {
			let output = atob(string);
			let x2 = 1;
			string.forEach(function(char) {
			  if (x2 == 1) {
				output += char;
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
		  smoothDamp: function(current, target, smoothing, deltaTime) {
			var difference = target - current;
			var change = difference * smoothing * deltaTime;
			return current + change;
		  }
		};
		eMath.getFast = function(object, id) {
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
		};
		eMath.get = function(object, id) {
		  try {
			for (let i2 = 0; i2 < Object.keys(object).length; i2++) {
			  if (Object.keys(object)[i2] == "sign")
				break;
			  if (Object.keys(object)[i2] == id) {
				return object[Object.keys(object)[i2]];
			  } else if (typeof object[Object.keys(object)[i2]] == "object") {
				let output = Object.get(object[Object.keys(object)[i2]], id);
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
		};
		eMath.decimal = {};
		for (let x of eMath.decimalFunctions) {
		  DecimalClone[x["name"]] = x["value"];
		  eMath.decimal[x["name"]] = x["value"];
		}
		function E(x) {
		  return new DecimalClone(x);
		}
		var TS = (x) => new Date(x != void 0 ? x : /* @__PURE__ */ new Date());
		var EINF = DecimalClone.dInf;
		DecimalClone.prototype.clone = function() {
		  return this;
		};
		DecimalClone.prototype.modular = DecimalClone.prototype.mod = function(other) {
		  other = E(other);
		  if (other.eq(0))
			return E(0);
		  if (this.sign * other.sign == -1)
			return this.abs().mod(other.abs()).neg();
		  if (this.sign == -1)
			return this.abs().mod(other.abs());
		  return this.sub(this.div(other).floor().mul(other));
		};
		DecimalClone.prototype.softcap = function(start, power, mode) {
		  var x = this.clone();
		  if (x.gte(start)) {
			if ([0, "pow"].includes(mode))
			  x = x.div(start).pow(power).mul(start);
			if ([1, "mul"].includes(mode))
			  x = x.sub(start).div(power).add(start);
			if ([2, "exp"].includes(mode))
			  x = expMult(x.div(start), power).mul(start);
		  }
		  return x;
		};
		DecimalClone.prototype.toRoman = function() {
		  let num = this.clone();
		  if (num.gte(5e3))
			return num;
		  num = num.toNumber();
		  var digits = String(+num).split(""), key = [
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
		  ], roman = "", i2 = 3;
		  while (i2--)
			roman = (key[+digits.pop() + i2 * 10] || "") + roman;
		  return Array(+digits.join("") + 1).join("M") + roman;
		};
		DecimalClone.prototype.scale = function(s, p, mode, rev = false) {
		  s = E(s);
		  p = E(p);
		  var x = this.clone();
		  if (x.gte(s)) {
			if ([0, "pow"].includes(mode))
			  x = rev ? x.mul(s.pow(p.sub(1))).root(p) : x.pow(p).div(s.pow(p.sub(1)));
			if ([1, "exp"].includes(mode))
			  x = rev ? x.div(s).max(1).log(p).add(s) : DecimalClone.pow(p, x.sub(s)).mul(s);
		  }
		  return x;
		};
		DecimalClone.prototype.format = function(acc = 2, max = 9) {
		  return format(this.clone(), acc, max);
		};
		DecimalClone.prototype.formatST = function(acc = 2, max = 9, type = "st") {
		  return format(this.clone(), acc, max, type);
		};
		DecimalClone.prototype.formatGain = function(gain, mass = false) {
		  return formatGain(this.clone(), gain, mass);
		};
		module.exports = { eMath, Decimal: DecimalClone, E, TS };
	  }
	});
  
	// src/classes/boost.js
	var require_boost = __commonJS({
	  "src/classes/boost.js"(exports, module) {
		var { E } = require_eMath();
		var boostStatic = class {
		  /**
			  * Constructs a new boost manager.
			  *
			  * @constructor
			  * @param {number} [baseEffect] - The base effect value to which boosts are applied.
			  * @param {function} pointer - returns Game.classes.boost
			  * @param {...Object} boosts - An array of boost objects to initialize with.
			  */
		  constructor(baseEffect = 1, pointer, ...boosts) {
			this.boost = boosts;
			this.pointer = pointer;
			this.baseEffect = E(baseEffect);
		  }
		  /**
			  * Gets a boost object by its ID.
			  *
			  * @param {string} id - The ID of the boost to retrieve.
			  * @returns {Object|null} The boost object if found, or null if not found.
			  */
		  bGet(id) {
			let output = null;
			for (let i2 = 0; i2 < this.boost.length; i2++) {
			  if (i2 == this.boost.length)
				break;
			  if (id == this.boost[i2].id) {
				output = this.boost[i2];
				output["index"] = i2;
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
		  bSet(id, name, desc, value, order) {
			const bCheck = this.bGet(id);
			console.log(this.bGet(id));
			if (!bCheck) {
			  this.boost.push({ id, name, desc, value, order });
			} else {
			  this.boost[bCheck.index] = { id, name, desc, value, order };
			}
		  }
		  /**
			  * Sets or updates multiple boosts with advanced parameters.
			  *
			  * @param {...Object} x - Boost objects to set or update.
			  */
		  bSetAdvanced(...x) {
			for (let i2 = 0; i2 < x.length; i2++) {
			  if (!this.bGet(x[i2].id)) {
				this.boost = this.boost.concat(x[i2]);
			  } else {
				console.log(i2);
				this.boost[this.bGet(x[i2].id).index] = x[i2];
			  }
			}
		  }
		  /**
			  * Calculates the cumulative effect of all boosts on the base effect.
			  *
			  * @param {number|Decimal} [base=this.baseEffect] - The base effect value to calculate with.
			  * @returns {Decimal} The calculated effect after applying boosts.
			  */
		  calculate(base = this.baseEffect) {
			let output = E(base);
			const boosts = this.boost;
			boosts.sort((a, b) => a.order - b.order);
			for (let i2 = 0; i2 < boosts.length; i2++) {
			  output = boosts[i2].value(output);
			}
			return output;
		  }
		};
		module.exports = { boostStatic };
	  }
	});
  
	// src/classes/currency.js
	var require_currency = __commonJS({
	  "src/classes/currency.js"(exports, module) {
		var { E, Decimal } = require_eMath();
		var { boostStatic } = require_boost();
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
		  /**
		   * The new currency value after applying the boost.
		   * @type {Decimal}
		   * @returns {Decimal}
		   */
		  gain() {
			this.value = this.value.add(this.boost.calculate());
			return this.value;
		  }
		  addUpgrade(upgrades) {
			upgrades = upgrades.level ? { level: upgrades.level } : { level: E(1) };
			this.upgrades.push(upgrades);
			return upgrades;
		  }
		};
		var currencyStatic = class {
		  /**
		   * Constructs the backend for a currency
		   *
		   * @constructor
		   * @param {function} pointer - returns Game.classes.currency
		   */
		  constructor(pointer) {
			this.upgrades = [];
			this.pointer = pointer;
			this.boost = new boostStatic(1);
		  }
		  /**
		   * The new currency value after applying the boost.
		   * @type {Decimal}
		   * @returns {Decimal}
		   */
		  gain() {
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
		  addUpgrade(upgrades, runEffectInstantly = true) {
			for (let i2 = 0; i2 < upgrades.length; i2++) {
			  this.pointer().addUpgrade(upgrades[i2]);
			  upgrades[i2].getLevel = () => this.pointer().upgrades[i2].level;
			  upgrades[i2].setLevel = (n) => this.pointer().upgrades[i2].level = this.pointer().upgrades[i2].level.add(n);
			  if (runEffectInstantly)
				upgrades[i2].effect(upgrades.level);
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
		  calculateUpgrade(id, target) {
			function findHighestB(f, a) {
			  let left = E(0);
			  let right = E(1);
			  let highestB = E(0);
			  while (calculateSum(f, right).lt(a)) {
				highestB = right;
				right = right.mul(2);
			  }
			  while (left.lt(right)) {
				const mid = Decimal.floor(left.add(right).div(2));
				const sum = calculateSum(f, mid);
				if (sum.lt(a)) {
				  left = mid.add(1);
				} else {
				  right = mid;
				}
			  }
			  return [left, calculateSum(f, left.sub(1))];
			}
			function calculateSum(f, b) {
			  let sum = E();
			  for (let n = E(0); n.lte(b); n = n.add(1)) {
				sum = sum.add(f(n));
			  }
			  return sum;
			}
			let upgrade;
			if (typeof id == "number") {
			  upgrade = this.upgrades[id];
			} else if (typeof id == "string") {
			  for (let i2 = 0; i2 < this.upgrades.length; i2++) {
				if (this.upgrades[i2].id == id) {
				  upgrade = this.upgrades[i2];
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
		   * @param {Decimal} target - The target level or quantity to reach for the upgrade.
		   * This represents how many upgrades to buy or upgrade.
		   *
		   * @returns {boolean} Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
		   *
		   */
		  buyUpgrade(id, target) {
			let upgrade;
			if (typeof id == "number") {
			  upgrade = this.upgrades[id];
			} else if (typeof id == "string") {
			  for (let i2 = 0; i2 < this.upgrades.length; i2++) {
				if (this.upgrades[i2].id === id) {
				  upgrade = this.upgrades[i2];
				  break;
				}
			  }
			} else {
			  return false;
			}
			if (!upgrade) {
			  return false;
			}
			const maxAffordableQuantity = this.calculateUpgrade(id, target);
			if (!Array.isArray(maxAffordableQuantity) || maxAffordableQuantity.length !== 2) {
			  return false;
			}
			if (!maxAffordableQuantity[0].lte(0)) {
			  target = upgrade.getLevel().add(target).lte(upgrade.maxLevel) ? target : upgrade.maxLevel.sub(upgrade.getLevel());
			  const condition = maxAffordableQuantity[0].lte(target);
			  maxAffordableQuantity[0] = condition ? maxAffordableQuantity[0] : target;
			  maxAffordableQuantity[1] = condition ? maxAffordableQuantity[1] : this.calculateSum(upgrade.costScaling, target);
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
		module.exports = { currency, currencyStatic };
	  }
	});
  
	// src/classes/attribute.js
	var require_attribute = __commonJS({
	  "src/classes/attribute.js"(exports, module) {
		var { E } = require_eMath();
		var { boostStatic } = require_boost();
		var staticAttribute = class {
		  /**
		   * Constructs a static attribute with an initial effect.
		   *
		   * @constructor
		   * @param {Decimal|Number} initial - The inital value of the attribute.
		   */
		  constructor(initial) {
			this.initial = initial;
			this.value = E(initial);
			this.boost = new boostStatic(1);
		  }
		  /**
		   * Updates the value of the attribute based on the provided effect function and initial value.
		   *
		   * @param {function} effect - The effect function to apply to the attribute.
		   * @returns {Decimal} The updated value of the attribute after applying the effect.
		   */
		  update(effect) {
			effect();
			this.value = this.boost.calculate(this.initial);
			return this.value;
		  }
		};
		module.exports = { staticAttribute };
	  }
	});
  
	// src/index.js
	var require_src = __commonJS({
	  "src/index.js"(exports, module) {
		var { eMath, Decimal, E } = require_eMath();
		var { boostStatic } = require_boost();
		var { currency, currencyStatic } = require_currency();
		var { staticAttribute } = require_attribute();
		var eMathClone = { ...eMath, ...{
		  Decimal,
		  E,
		  classes: {
			boostStatic,
			currency,
			currencyStatic,
			staticAttribute
		  }
		} };
		if (typeof window != "undefined") {
		  window["eMath"] = eMathClone;
		}
		module.exports = eMathClone;
	  }
	});
	require_src();
  })();
  console.log(module.exports);