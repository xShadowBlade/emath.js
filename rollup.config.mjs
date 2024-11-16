/* eslint-disable jsdoc/check-tag-names */
// @ts-check
/**
 * @file Config file for rollup
 */
import resolve from "@rollup/plugin-node-resolve";
import swc from "@rollup/plugin-swc";
import commonjs from "@rollup/plugin-commonjs";

/**
 * An array of options for rollup
 * @type {import("rollup").RollupOptions[]}
 */
const options = [
    // Module "emath.js"
    {
        input: "./src/index.ts",
        output: {
            format: "umd",
            name: "eMath",
            file: "./dist/eMath.js",
        },
    },
    // Module "emath.game.js"
    {
        input: "./src/game/index.ts",
        output: {
            format: "umd",
            name: "eMathGame",
            file: "./dist/eMath.game.js",
        },
    },
    // Module "emath.presets.js"
    {
        input: "./src/presets/index.ts",
        output: {
            format: "umd",
            name: "eMathPresets",
            file: "./dist/eMath.presets.js",
        },
    },
];

/**
 * The default options for development
 * @type {import("rollup").RollupOptions}
 */
const optionsDev = {
    external: ["reflect-metadata", "class-transformer"],
};

/**
 * The plugins for rollup
 * @type {import("rollup").Plugin[]}
 */
const plugins = [
    // For resolving "./file-name" instead of "./file-name.ts" (I did *not* spend 3+ hours on this)
    resolve({
        extensions: [".js", ".ts", ".tsx"],
    }),

    swc({
        swc: {
            configFile: "./.swcrc",
        },
    }),

    // For some outside libraries that are not ES6 modules
    commonjs(),
];

/**
 * The configuration object for rollup
 * @type {import("rollup").RollupOptions[]}
 */
const config = options.map((option) => {
    return {
        ...optionsDev,
        plugins,
        ...option,
    };
});

export default config;
