import { hookGame } from "../game/hookGame";
import { pixiGame } from "./pixiGame";
import { sprite } from "./sprite";

export function hookPixiGame () {
    // @ts-ignore
    if (!(typeof process! !== "object" && typeof window! !== "undefined")) {
        // Environment is not a browser.
        return;
    }
    if (!(window as any)["eMath"]) {
        console.error("eMath.js/pixiGame: eMath.js is not loaded. See https://github.com/xShadowBlade/emath.js for instructions. \n This requirement might be removed in the future.");
    }
    if (!(window as any)["PIXI"]) {
        console.error("eMath.js/pixiGame: PIXI.js is not loaded. See https://pixijs.com for instructions.");
    }
    hookGame();
    // /**
    //  * @deprecated Use `import { game } from "emath.js/game"` instead.
    //  */
    // (window as any)["eMath"].game = game;
    // (window as any)["eMath"].managers = {
    //     /**
    //      * @deprecated Use `import { keyManager } from "emath.js/game"` instead.
    //      */
    //     keyManager,

    //     /**
    //      * @deprecated Use `import { eventManager } from "emath.js/game"` instead.
    //      */
    //     eventManager,

    //     /**
    //      * @deprecated Use `import { dataManager } from "emath.js/game"` instead.
    //      */
    //     dataManager,
    // };
    delete (window as any)["eMath"].game;
    (window as any)["eMath"].pixiGame = pixiGame;
    (window as any)["eMath"].classes.sprite = sprite;
}