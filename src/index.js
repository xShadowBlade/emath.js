"use strict";
import { eMath, E, formats } from "../src/eMath.js";
import { boostStatic } from "../src/classes/boost.js";
import { currency, currencyStatic } from "../src/classes/currency.js";
import { staticAttribute } from "../src/classes/attribute.js";
const eMathClone = { ...eMath, ...{
    E,
    classes: {
        boostStatic,

        currency,
        currencyStatic,

        staticAttribute,
    },
    formats,
}};
if (typeof window != "undefined") {
    // eslint-disable-next-line no-undef
    window["eMath"] = eMathClone;
}
export default eMathClone;