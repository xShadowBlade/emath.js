const { eMath, Decimal, E } = require("../src/eMath.js");
const { boostStatic } = require("../src/classes/boost.js");
const { currency, currencyStatic } = require("../src/classes/currency.js");
const { staticAttribute } = require("../src/classes/attribute.js");
const format = require("../src/formatE.js");
const eMathClone = { ...eMath , ...{
	Decimal,
	E,
	classes: {
		boostStatic,

		currency,
		currencyStatic,

		staticAttribute,
	},
	format
}};
if (typeof window != "undefined") {
	// eslint-disable-next-line no-undef
	window["eMath"] = eMathClone;
}
module.exports = eMathClone;