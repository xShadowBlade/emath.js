/**
 * @file CLI build script
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const esbuild = require("esbuild");
const { umdWrapper } = require("./umdPlugin.js");
const fs = require("fs/promises");
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

const externalIntFiles = [
    "./src/index.ts",
    "./src/hookMain.ts",

    // "./src/classes/*",
    "./src/classes/attribute.ts",
    "./src/classes/boost.ts",
    "./src/classes/currency.ts",
    "./src/classes/grid.ts",

    // "./src/E/*",
    "./src/E/e.ts",
    "./src/E/eMain.ts",
    "./src/E/lru-cache.ts",
];

/**
 */
const buildOptions = [
    {
        entryPoints: ["src/index.ts"],
        outfile: "dist/main/eMath.js",
        format: "umd",
        plugins: [umdWrapper()],
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
        // format: "umd",
        format: "cjs",
        external: externalIntFiles,
        // plugins: [umdWrapper()],
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
        external: ["pixi.js", ...externalIntFiles],
        format: "umd",
        plugins: [umdWrapper()],
    },
    {
        entryPoints: ["src/pixiGame/index.ts"],
        outfile: "dist/pixiGame/eMath.pixiGame.min.js",
        external: ["pixi.js", "./src/index.ts", "./src/hookMain.ts", "./src/classes/*", "./src/E/*"],
        format: "iife",
        minify: true,
    },
];

Promise.all(buildOptions.map(async function (option) {
    // option.external = ["pixi.js"];
    option.bundle = true;
    // option.plugins = [umdWrapper()];

    // Build
    /**
     * Fix import paths
     */
    async function replaceFileImports () {
        const fileData = await fs.readFile(option.outfile, "utf8");
        // console.log(fileData);
        const regex = /require\(['"]\.\.\/\.\.\/src\/[\w/]+\.ts['"]\)/g;
        // const regex = /.{44}/g; // test
        const replacement = "require(\"../main/emath.js\")";
        const matches = fileData.match(regex);
        if (!matches) {
            return;
        }
        // console.log(matches);
        const fileDataReplaced = fileData.replace(regex, replacement);
        // console.log(fileDataReplaced);
        await fs.writeFile(option.outfile, fileDataReplaced);
    }
    // console.log(option.outfile);
    const timeInit = Date.now();
    esbuild
        .build(option)
        .then(() => {
            // console.log(option.outfile, result);
            console.log(`${option.outfile}: ${Date.now() - timeInit}ms`);
            if (["src/game/index.ts", "src/pixiGame/index.ts"].includes(option.entryPoints[0])) {
                replaceFileImports();
            }
            // option.outfile
        })
        // .then(() => console.log(`${option.outfile}: ${Date.now() - timeInit}ms`))
        .catch(() => process.exit(1));
}));
