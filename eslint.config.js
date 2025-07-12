/* eslint-disable @typescript-eslint/no-require-imports */
/* global require module */
// @ts-check

/**
 * @file ESLint configuration file
 */
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const jsdoc = require("eslint-plugin-jsdoc");

module.exports = tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    jsdoc.configs["flat/recommended-typescript"],
    eslintPluginPrettierRecommended,

    {
        plugins: {
            jsdoc,
        },
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.eslint.json",
                sourceType: "module",
                ecmaVersion: "latest",
            },
        },
        files: ["src/**/*.ts", "src/**/*.tsx", "examples/src/**/*.ts", "examples/src/**/*.tsx"],
        ignores: ["node_modules", "dist", "test"],
        rules: {
            "prettier/prettier": "warn",

            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/ban-ts-comment": "warn",
            "@typescript-eslint/explicit-function-return-type": "warn",
            "@typescript-eslint/restrict-template-expressions": ["warn", { allowNumber: true, allowBoolean: true }],
            "@typescript-eslint/consistent-type-exports": "warn",
            "@typescript-eslint/consistent-type-imports": "warn",
            "@typescript-eslint/naming-convention": [
                "warn",
                {
                    selector: "typeParameter",
                    format: ["PascalCase"],
                    prefix: ["T"],
                },
                {
                    selector: "default",
                    format: ["camelCase"],
                    leadingUnderscore: "allow",
                    trailingUnderscore: "allow",
                },
                {
                    selector: "import",
                    format: ["camelCase", "PascalCase"],
                },
                {
                    selector: "variable",
                    format: ["camelCase", "UPPER_CASE"],
                    leadingUnderscore: "allow",
                    trailingUnderscore: "allow",
                },
                {
                    selector: "typeLike",
                    format: ["PascalCase"],
                },
            ],

            "jsdoc/require-file-overview": 1,
        },
    },
);
