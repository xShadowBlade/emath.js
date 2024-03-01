/**
 * @file Declares a function that hooks the game to the window object.
 */
import "reflect-metadata";
import { game } from "./game";
import { eMath } from "../hookMain";
import { keyManager } from "./managers/keyManager";
import { eventManager } from "./managers/eventManager";
import { dataManager } from "./managers/dataManager";

// import type { eMathHook } from "../hookMain";

const eMathGameWeb = {
    // ...(window as any)["eMath"] as typeof eMathWeb,
    ...eMath,
    game,
    managers: {
        keyManager,
        eventManager,
        dataManager,
    },
};

/**
 * Hooks the game to the window object.
 */
// export function hookGame () {
//     if (!(typeof process! !== "object" && typeof window! !== "undefined")) {
//         // Environment is not a browser.
//         return;
//     }
//     if (!(window as any)["eMath"]) {
//         console.error("eMath.js/game: eMath.js is not loaded. See https://github.com/xShadowBlade/emath.js for instructions. \n This requirement might be removed in the future.");
//         return;
//     }
//     // (window as any)["eMath"] = eMath;
//     /**
//      * @deprecated Use `import { game } from "emath.js/game"` instead.
//      */
//     (window as any)["eMath"] = eMathGameWeb;
// }

// jsdoc is weird
export { eMathGameWeb as eMath };