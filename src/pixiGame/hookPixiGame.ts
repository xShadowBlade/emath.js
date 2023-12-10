import { hookGame } from "../game/hookGame";
import { pixiGame } from "./pixiGame";
import { sprite } from "./sprite";

/**
 *
 */
export function hookPixiGame () {
    // @ts-expect-error - node types are wrong
    if (!(typeof process! !== "object" && typeof window! !== "undefined")) {
        // Environment is not a browser.
        return;
    }
    // @ts-expect-error - node types are wrong
    if (typeof process! !== "undefined") {
        // Environment is not a browser AND is not node.
        console.error("eMath.js/pixiGame is not supported in browser environments. \n This requirement might be removed in the future.");
        return;
    }
    // Environment is node.
    return;
    // if (!(window as any)["eMath"]) {
    //     console.error("eMath.js/pixiGame: eMath.js is not loaded. See https://github.com/xShadowBlade/emath.js for instructions. \n This requirement might be removed in the future.");
    //     return;
    // }
    // if (!(window as any)["PIXI"]) {
    //     console.error("eMath.js/pixiGame: PIXI.js is not loaded. See https://pixijs.com for instructions.");
    //     return;
    // }
    // hookGame();
    // delete (window as any)["eMath"].game;
    // (window as any)["eMath"].pixiGame = pixiGame;
    // (window as any)["eMath"].classes.sprite = sprite;
}