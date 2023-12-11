import * as PIXI from "pixi.js";

/**
 * @deprecated A different method of loading PIXI is being considered.
 * @returns The PIXI namespace.
 */
export function loadPIXI (): typeof PIXI {
    if (!(typeof process! !== "object" && typeof window! !== "undefined")) {
        // Environment is not a browser.
        return PIXI;
    }
    if (!(window as any)["eMath"]) {
        console.error("eMath.js/pixiGame: eMath.js is not loaded. See https://github.com/xShadowBlade/emath.js for instructions. \n This requirement might be removed in the future.");
        throw new Error("");
    }
    if (!(window as any)["PIXI"]) {
        console.error("eMath.js/pixiGame: PIXI.js is not loaded. See https://pixijs.com for instructions.");
        throw new Error("");
    }
    return (window as any).PIXI as typeof PIXI;
}