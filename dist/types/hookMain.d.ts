/**
 * @file Declares a function that hooks the game to the window object.
 */
import "reflect-metadata";
import { Boost } from "./classes/Boost";
import { Currency, CurrencyStatic } from "./classes/Currency";
import { Attribute } from "./classes/Attribute";
import { Grid, GridCell } from "./classes/Grid";
declare const eMathWeb: {
    classes: {
        /**
         * @deprecated Use `import { boost } from "emath.js"` instead.
         */
        boost: typeof Boost;
        /**
         * @deprecated Use `import { currency } from "emath.js"` instead.
         */
        currency: typeof Currency;
        /**
         * @deprecated Use `import { currencyStatic } from "emath.js"` instead.
         */
        currencyStatic: typeof CurrencyStatic;
        /**
         * @deprecated Use `import { attribute } from "emath.js"` instead.
         */
        attribute: typeof Attribute;
        /**
         * @deprecated Use `import { grid } from "emath.js"` instead.
         */
        grid: typeof Grid;
        /**
         * @deprecated Use `import { gridCell } from "emath.js"` instead.
         */
        gridCell: typeof GridCell;
    };
};
/**
 * Attach eMath to the window object
 */
export { eMathWeb as eMath };
