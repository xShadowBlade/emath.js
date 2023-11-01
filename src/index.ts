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
import { eMath as eMathE, E } from "./eMath";
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
},
};
if (typeof process !== "object" && typeof window !== "undefined") {
    (window as any)["eMath"] = eMath;
}
export default eMath;