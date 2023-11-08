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
import { obb } from "./classes/utility/obb";
import { EArray } from "./classes/utility/eArray";
import { EObject } from "./classes/utility/eObject";
const eMath = { ...eMathE, ...{
    /**
     * @deprecated Use `import { E } from "emath.js"` instead.
     */
    E: E,
    classes: {
        /**
         * @deprecated Use `import { boost } from "emath.js"` instead.
         */
        boost,

        /**
         * @deprecated Use `import { currency } from "emath.js"` instead.
         */
        currency,

        /**
         * @deprecated Use `import { currencyStatic } from "emath.js"` instead.
         */
        currencyStatic,

        /**
         * @deprecated Use `import { attribute } from "emath.js"` instead.
         */
        attribute,

        /**
         * @deprecated Use `import { grid } from "emath.js"` instead.
         */
        grid,

        /**
         * @deprecated Use `import { gridCell } from "emath.js"` instead.
         */
        gridCell,

        /**
         * @deprecated Use `import { EString } from "emath.js"` instead.
         */
        EString,

        /**
         * @deprecated Use `import { EArray } from "emath.js"` instead.
         */
        EArray,

        /**
         * @deprecated Use `import { EObject } from "emath.js"` instead.
         */
        EObject,

        /**
         * @deprecated Use `import { obb } from "emath.js"` instead.
         */
        obb,
    },
},
};
// @ts-ignore
if (typeof process !== "object" && typeof window !== "undefined") {
    (window as any)["eMath"] = eMath;
}


export {
    eMath,

    E,
    boost,
    currency,
    currencyStatic,
    attribute,
    grid,
    gridCell,
    EString,
    EArray,
    EObject,
    obb,
};

// export { E } from "./eMath";
// export { boost } from "./classes/boost";
// export { currency, currencyStatic } from "./classes/currency";
// export { attribute } from "./classes/attribute";
// export { grid, gridCell } from "./classes/grid";

// export { EString } from "./classes/utility/eString";
// export { obb } from "./classes/utility/obb";
// export { EArray } from "./classes/utility/eArray";
// export { EObject } from "./classes/utility/eObject";