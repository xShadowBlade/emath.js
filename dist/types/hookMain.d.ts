/**
 * @file Declares a function that hooks the game to the window object.
 */
import "reflect-metadata";
import { Boost } from "./classes/boost";
import { Currency, CurrencyStatic } from "./classes/currency";
import { Attribute } from "./classes/attribute";
import { Grid, GridCell } from "./classes/grid";
declare const eMathWeb: {
    /**
     * @deprecated Use `import { E } from "emath.js"` instead.
     */
    E: ((x?: import("./E/e").DecimalSource | undefined) => import("./E/e").Decimal) & typeof import("./E/e").Decimal;
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
