"use strict";
/* global window */
import { eMath as eMathE, E, formats } from "./eMath.js";
import { boost } from "./classes/boost.js";
import { currency, currencyStatic } from "./classes/currency.js";
import { attribute } from "./classes/attribute.js";
import { grid } from "./classes/grid.js";
const eMath = { ...eMathE, ...{
    E,
    classes: {
        boost,

        currency,
        currencyStatic,

        attribute,
        grid,
    },
    formats,
},
};
if (typeof window != "undefined") {
    window["eMath"] = eMath;
}
export default eMath;