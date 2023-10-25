"use strict";
/* global window */
import { eMath as eMathE, E, formats } from "./eMath";
import { boost } from "./classes/boost";
import { currency, currencyStatic } from "./classes/currency";
import { attribute } from "./classes/attribute";
import { grid } from "./classes/grid";
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