/**
 * @file This file is the entry point for your project.
 */

import "./coinGame/index";
import "./nguformat";

void (async (): Promise<void> => {
    const keysToLoad = {
        eMath: await import("emath.js"),
        eMathGame: await import("emath.js/game"),
        eMathPresets: await import("emath.js/presets"),
        lzstring: await import("lz-string"),
        classTransformer: await import("class-transformer"),
    };

    Object.assign(window, keysToLoad);
})();
