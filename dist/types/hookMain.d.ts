/**
 * @file Declares a function that hooks the game to the window object.
 */
import "reflect-metadata";
import { boost } from "./classes/boost";
import { currency, currencyStatic } from "./classes/currency";
import { attribute } from "./classes/attribute";
import { grid, gridCell } from "./classes/grid";
declare const eMathWeb: {
    /**
     * @deprecated Use `import { E } from "emath.js"` instead.
     */
    E: ((x?: import("E/e").DecimalSource | undefined) => import("E/e").Decimal) & typeof import("E/e").Decimal;
    classes: {
        /**
         * @deprecated Use `import { boost } from "emath.js"` instead.
         */
        boost: typeof boost;
        /**
         * @deprecated Use `import { currency } from "emath.js"` instead.
         */
        currency: typeof currency;
        /**
         * @deprecated Use `import { currencyStatic } from "emath.js"` instead.
         */
        currencyStatic: typeof currencyStatic;
        /**
         * @deprecated Use `import { attribute } from "emath.js"` instead.
         */
        attribute: typeof attribute;
        /**
         * @deprecated Use `import { grid } from "emath.js"` instead.
         */
        grid: typeof grid;
        /**
         * @deprecated Use `import { gridCell } from "emath.js"` instead.
         */
        gridCell: typeof gridCell;
    };
};
/**
 * Attach eMath to the window object
 */
export { eMathWeb as eMath };
