/**
 * @file Declares a function that hooks the game to the window object.
 */
import "reflect-metadata";
import { E } from "./E/eMain";
import { Boost } from "./classes/boost";
import { currency, currencyStatic } from "./classes/currency";
import { Attribute } from "./classes/attribute";
import { Grid, GridCell } from "./classes/grid";
// import { skillNode, skillTree } from "classes/skillTree";

// import { game } from "./game/game";
// import { keyManager } from "./game/managers/keyManager";
// import { eventManager } from "./game/main";
// import { dataManager } from "./game/managers/dataManager";
const eMathWeb = {
    /**
     * @deprecated Use `import { E } from "emath.js"` instead.
     */
    E: E,
    classes: {
        /**
         * @deprecated Use `import { boost } from "emath.js"` instead.
         */
        boost: Boost,

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
        attribute: Attribute,

        /**
         * @deprecated Use `import { grid } from "emath.js"` instead.
         */
        grid: Grid,

        /**
         * @deprecated Use `import { gridCell } from "emath.js"` instead.
         */
        gridCell: GridCell,

        // /**
        //  * @deprecated Use `import { skillNode } from "emath.js"` instead.
        //  */
        // skillNode,

        // /**
        //  * @deprecated Use `import { skillTree } from "emath.js"` instead.
        //  */
        // skillTree,
    },

    // /**
    //  * @deprecated Use `import { game } from "emath.js"` instead.
    //  */
    // game,

    // managers: {
    //     /**
    //      * @deprecated Use `import { keyManager } from "emath.js"` instead.
    //      */
    //     keyManager,

    //     /**
    //      * @deprecated Use `import { eventManager } from "emath.js"` instead.
    //      */
    //     eventManager,

    //     /**
    //      * @deprecated Use `import { dataManager } from "emath.js"` instead.
    //      */
    //     dataManager,
    // },
};
/**
 * Attach eMath to the window object
 */
// function hookMain () {
//     if (typeof process! !== "object" && typeof window! !== "undefined") {
//         (window as any)["eMath"] = eMathWeb;
//     }
// }
// export { hookMain };
export { eMathWeb as eMath };