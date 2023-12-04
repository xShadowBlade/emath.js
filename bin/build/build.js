const esbuild = require("esbuild");
const { umdWrapper } = require("./umdPlugin.js");
/*
"build-main": "run-p build-main:bundle build-main:minify build-main:esm build-main:cjs",
"build-main:bundle": "esbuild src/index.ts --bundle --format=iife --outfile=dist/main/eMath.bundle.js",
"build-main:minify": "esbuild src/index.ts --bundle --minify --format=iife --outfile=dist/main/eMath.min.js",
"build-main:esm": "esbuild src/index.ts --bundle --format=esm --outfile=dist/main/eMath.mjs",
"build-main:cjs": "esbuild src/index.ts --bundle --format=cjs --outfile=dist/main/eMath.cjs",

"build-game": "run-p build-game:bundle build-game:minify build-game:esm build-game:cjs",
"build-game:bundle": "esbuild src/game/index.ts --bundle --format=iife --outfile=dist/game/eMath.game.bundle.js",
"build-game:minify": "esbuild src/game/index.ts --bundle --minify --format=iife --outfile=dist/game/eMath.game.min.js",
"build-game:esm": "esbuild src/game/index.ts --bundle --format=esm --outfile=dist/game/eMath.game.mjs",
"build-game:cjs": "esbuild src/game/index.ts --bundle --format=cjs --outfile=dist/game/eMath.game.cjs",

"build-pixiGame": "run-p build-pixiGame:bundle build-pixiGame:minify build-pixiGame:esm build-pixiGame:cjs",
"build-pixiGame:bundle": "esbuild src/pixiGame/index.ts --bundle --format=iife --outfile=dist/pixiGame/eMath.pixiGame.bundle.js",
"build-pixiGame:minify": "esbuild src/pixiGame/index.ts --bundle --minify --format=iife --outfile=dist/pixiGame/eMath.pixiGame.min.js",
"build-pixiGame:esm": "esbuild src/pixiGame/index.ts --bundle --format=esm --outfile=dist/pixiGame/eMath.pixiGame.mjs",
"build-pixiGame:cjs": "esbuild src/pixiGame/index.ts --bundle --format=cjs --outfile=dist/pixiGame/eMath.pixiGame.cjs",
*/
/**
 * @type {(import('esbuild')).BuildOptions[]}
 */
const buildOptions = [
    {
        entryPoints: ["src/index.ts"],
        outfile: "dist/main/eMath.js",
        format: "umd",
    },
    {
        entryPoints: ["src/index.ts"],
        outfile: "dist/main/eMath.min.js",
        format: "iife",
        minify: true,
    },

    {
        entryPoints: ["src/game/index.ts"],
        outfile: "dist/game/eMath.game.js",
        format: "umd",
    },
    {
        entryPoints: ["src/game/index.ts"],
        outfile: "dist/game/eMath.game.min.js",
        format: "iife",
        minify: true,
    },

    {
        entryPoints: ["src/pixiGame/index.ts"],
        outfile: "dist/pixiGame/eMath.pixiGame.js",
        external: ["pixi.js"],
        format: "umd",
    },
    {
        entryPoints: ["src/pixiGame/index.ts"],
        outfile: "dist/pixiGame/eMath.pixiGame.min.js",
        external: ["pixi.js"],
        format: "iife",
        minify: true,
    },
];

buildOptions.forEach((option) => {
    // option.external = ["pixi.js"];
    option.bundle = true;
    option.plugins = [umdWrapper()];

    // Build

    // console.log(option.outfile);
    const timeInit = Date.now();
    esbuild
        .build(option)
        .then(() => console.log(`${option.outfile}: ${Date.now() - timeInit}ms`))
        .catch(() => process.exit(1));
});