const { eMath, E, TS, formats } = require("../src/eMath.js");
const { boostStatic } = require("../src/classes/boost.js");
const { currency, currencyStatic } = require("../src/classes/currency.js");
const { staticAttribute } = require("../src/classes/attribute.js");
const eMathClone = { ...eMath, ...{
	E,
	classes: {
		boostStatic,

		currency,
		currencyStatic,

		staticAttribute,
	},
	formats,
	TS,
}};
if (typeof window != "undefined") {
	// eslint-disable-next-line no-undef
	window["eMath"] = eMathClone;
}
module.exports = eMathClone;