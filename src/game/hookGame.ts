/**
 * @file Declares a function that hooks the game to the window object.
 */

import { game } from "./game";
import { keyManager } from "./managers/keyManager";
import { eventManager } from "./managers/eventManager";
import { dataManager } from "./managers/dataManager";

// import type { eMathHook } from "../hookMain";

/**
 * Hooks the game to the window object.
 */
export function hookGame () {
    // @ts-ignore
    if (!(typeof process! !== "object" && typeof window! !== "undefined")) {
        // Environment is not a browser.
        return;
    }
    if (!(window as any)["eMath"]) {
        console.error("eMath.js/game: eMath.js is not loaded. See https://github.com/xShadowBlade/emath.js for instructions. \n This requirement might be removed in the future.");
    }
    // (window as any)["eMath"] = eMath;
    /**
     * @deprecated Use `import { game } from "emath.js/game"` instead.
     */
    (window as any)["eMath"].game = game;
    (window as any)["eMath"].managers = {
        /**
         * @deprecated Use `import { keyManager } from "emath.js/game"` instead.
         */
        keyManager,

        /**
         * @deprecated Use `import { eventManager } from "emath.js/game"` instead.
         */
        eventManager,

        /**
         * @deprecated Use `import { dataManager } from "emath.js/game"` instead.
         */
        dataManager,
    };
}