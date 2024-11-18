/* eslint-disable jsdoc/check-tag-names */
// @ts-check
/**
 * @file Config file for rollup
 */
import resolve from "@rollup/plugin-node-resolve";
import swc from "@rollup/plugin-swc";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

/**
 * The options for rollup.
 * Also includes the type of the build in the `type` property
 * (deleted before passing to rollup, used to determine if the build is for development or production)
 * @typedef {import("rollup").RollupOptions & { type: "development" | "production" }} RollupOptions
 */

/**
 * An array of options for rollup
 * @type {RollupOptions[]}
 */
const options = [
    // UMD "emath.js" (production)
    {
        type: "production",
        input: "./src/index.ts",
        output: {
            format: "umd",
            name: "eMath",
            file: "./dist/main/eMath.min.js",
        },
    },
    // UMD "emath.game.js" (production)
    {
        type: "production",
        input: "./src/game/index.ts",
        output: {
            format: "umd",
            name: "eMathGame",
            file: "./dist/game/eMath.game.min.js",
        },
    },
    // UMD "emath.presets.js" (production)
    {
        type: "production",
        input: "./src/presets/index.ts",
        output: {
            format: "umd",
            name: "eMathPresets",
            file: "./dist/presets/eMath.presets.min.js",
        },
    },

    // esm "emath.mjs" (development)
    {
        type: "development",
        input: "./src/index.ts",
        output: {
            format: "esm",
            file: "./dist/main/eMath.mjs",
        },
    },
    // esm "emath.game.mjs" (development)
    {
        type: "development",
        input: "./src/game/index.ts",
        output: {
            format: "esm",
            file: "./dist/game/eMath.game.mjs",
        },
    },
    // esm "emath.presets.mjs" (development)
    {
        type: "development",
        input: "./src/presets/index.ts",
        output: {
            format: "esm",
            file: "./dist/presets/eMath.presets.mjs",
        },
    },
];

/**
 * The plugins for rollup
 * @type {import("rollup").Plugin[]}
 */
const defaultPlugins = [
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
 * The default options for development
 * @type {import("rollup").RollupOptions}
 */
const optionsDev = {
    external: ["reflect-metadata", "class-transformer"],
    plugins: defaultPlugins,
};

/**
 * The default options for production
 * @type {import("rollup").RollupOptions}
 */
const optionsMin = {
    // external: ["reflect-metadata", "class-transformer"],
    plugins: [
        ...defaultPlugins,
        terser({
            format: {
                comments: false,
            },
        }),
    ],
};

/**
 * The configuration object for rollup
 * @type {import("rollup").RollupOptions[]}
 */
const config = options.map((option) => {
    /**
     * The temporary options for the current option
     * @type {RollupOptions}
     */
    const temporaryOptions = {
        // If the type is development, use the development options, otherwise use the production options
        ...(option.type === "development" ? optionsDev : optionsMin),

        // Add the options
        ...option,

        // Remove the type property
        // type: undefined,
    };

    // Delete the type property
    // @ts-expect-error - Attempting to delete a property
    delete temporaryOptions.type;

    return temporaryOptions;
});

export default config;
