import { eMath as eMathE } from "./utility/eMath";
import { E } from "./eMain";
import { boost } from "./classes/boost";
import { currency, currencyStatic } from "./classes/currency";
import { attribute } from "./classes/attribute";
import { grid, gridCell } from "./classes/grid";

import { EString } from "./utility/eString";
import { obb } from "./utility/obb";
import { EArray } from "./utility/eArray";
import { EObject } from "./utility/eObject";

// import { game } from "./game/game";
// import { keyManager } from "./game/managers/keyManager";
// import { eventManager } from "./game/main";
// import { dataManager } from "./game/managers/dataManager";
const eMathHook = { ...eMathE, ...{
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
},
};
/**
 * Attach eMath to the window object
 */
function hookMain () {
    // @ts-expect-error - node types are wrong
    if (typeof process! !== "object" && typeof window! !== "undefined") {
        (window as any)["eMath"] = eMathHook;
    }
}
export { hookMain };
// export type { eMathHook };