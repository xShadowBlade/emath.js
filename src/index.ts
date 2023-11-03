/**
 * The main eMath module.
 * @module eMath
 */
"use strict";
/* global window */
import { eMath as eMathE, E } from "./eMath";
import { boost } from "./classes/boost";
import { currency, currencyStatic } from "./classes/currency";
import { attribute } from "./classes/attribute";
import { grid, gridCell } from "./classes/grid";

import { EString } from "./classes/utility/eString";
/**
 * @deprecated Use `import { ${className} } from "emath.js"` instead.
 */
const eMath = { ...eMathE, ...{
    /**
     * @deprecated Use `import { ${className} } from "emath.js"` instead.
     */
    E: E,
    classes: {
        boost,
        currency,
        currencyStatic,
        attribute,
        grid,
        gridCell,
        EString,
    },
},
};
// @ts-expect-error
if (typeof process !== "object" && typeof window !== "undefined") {
    (window as any)["eMath"] = eMath;
}
export default eMath;

export {
    E,
    boost,
    currency,
    currencyStatic,
    attribute,
    grid,
    gridCell,
    EString,
};