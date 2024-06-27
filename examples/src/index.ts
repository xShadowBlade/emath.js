/**
 * @file This file is the entry point for your project.
 */

// import { E } from "emath.js";

// console.log(E(69420).format());

import "./nguformat";
// import "./latexToE";
import "./coinGame/index";

void (async (): Promise<void> => {
    const keysToLoad = {
        eMath: await import("emath.js"),
        eMathGame: await import("emath.js/game"),
        eMathPresets: await import("emath.js/presets"),
        lzstring: await import("lz-string"),
    };

    Object.assign(window, keysToLoad);
})();
