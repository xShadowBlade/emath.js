"use strict";
/* global window */
import { eMath, E, formats } from "../src/eMath.js";
import { boost } from "../src/classes/boost.js";
import { currency, currencyStatic } from "../src/classes/currency.js";
import { attribute } from "../src/classes/attribute.js";
const eMathClone = { ...eMath, ...{
    E,
    classes: {
        boost,

        currency,
        currencyStatic,

        attribute,
    },
    formats,
}};
if (typeof window != "undefined") {
    window["eMath"] = eMathClone;
}
export default eMathClone;