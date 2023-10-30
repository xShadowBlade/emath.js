/**
 * The main eMath module.
 * @module eMath
 */

/**
 * The eMath namespace, which contains all the classes and functions.
 * @namespace eMath
 * @property {Object} classes - The classes namespace.
 * @property {Object} formats - The formats namespace.
 */

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
if (typeof process !== "object" && typeof window !== "undefined") {
    (window as any)["eMath"] = eMath;
}
export default eMath;