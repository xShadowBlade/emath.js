import * as PIXI from "pixi.js";

export function loadPIXI (): typeof PIXI {
    // @ts-ignore
    if (!(typeof process! !== "object" && typeof window! !== "undefined")) {
        // Environment is not a browser.
        return PIXI;
    }
    // if (!(window as any)["eMath"]) {
    //     console.error("eMath.js/pixiGame: eMath.js is not loaded. See https://github.com/xShadowBlade/emath.js for instructions. \n This requirement might be removed in the future.");
    // }
    if (!(window as any)["PIXI"]) {
        console.error("eMath.js/pixiGame: PIXI.js is not loaded. See https://pixijs.com for instructions.");
    }
    return (window as any).PIXI as typeof PIXI;
}