/**
 * @file ESLint configuration file.
 */

// eslint-disable-next-line
const fs = require("fs");

/**
 * @type {import("eslint").Linter.Config.rules}
 */
let rules = {};
// Check if rules file exists
if (fs.existsSync("../../template-defaults/eslintrules.json")) {
    rules = require("../../template-defaults/eslintrules.json");
} else {
    rules = {
        "arrow-spacing": ["warn", { "before": true, "after": true }],
        "comma-dangle": ["warn", "always-multiline"],
        "comma-spacing": "warn",
        "comma-style": "warn",
        "curly": ["warn", "multi-line"],
        "dot-location": ["warn", "property"],
        "handle-callback-err": "off",
        "indent": ["warn", 4],
        "keyword-spacing": "warn",
        "max-nested-callbacks": ["warn", { "max": 4 }],
        "max-statements-per-line": ["warn", { "max": 2 }],
        "no-console": "off",
        "no-dupe-class-members": "off",
        "no-empty-function": "warn",
        "no-floating-decimal": "warn",
        "no-lonely-if": "warn",
        "no-multi-spaces": "warn",
        "no-multiple-empty-lines": ["warn", { "max": 2, "maxEOF": 1, "maxBOF": 0 }],
        "no-shadow": ["warn", { "allow": ["err", "resolve", "reject"] }],
        "no-trailing-spaces": ["warn"],
        "no-var": "warn",
        "no-unused-vars": "off",
        "prefer-const": "warn",
        "quotes": ["warn", "double", { "allowTemplateLiterals": true }],
        "semi": ["warn", "always"],
        "space-before-blocks": "warn",
        "space-before-function-paren": ["warn", "always"],
        "space-in-parens": "warn",
        "space-infix-ops": "warn",
        "space-unary-ops": "warn",
        "spaced-comment": "warn",
        "yoda": "warn",

        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/ban-ts-comment": "warn",

        "jsdoc/require-param-type": "off",
        "jsdoc/require-returns-type": "off",
        "jsdoc/require-file-overview": 1,
    };
}

/**
 * @type {import("eslint").Linter.Config}
 */
const options = {
    "extends": [
        "eslint:recommended",
        "prettier",
        "plugin:react/recommended",
        "react-app",
        "plugin:jsdoc/recommended-typescript",
        "plugin:@typescript-eslint/recommended",
    ],
    "env": {
        "node": true,
        "browser": true,
        "es6": true,
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": "latest",
    },
    "parser": "@typescript-eslint/parser",
    "rules": rules,
};
module.exports = options;