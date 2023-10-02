const alias = require("@rollup/plugin-alias");

module.exports = {
	input: "src/index.js", // Update with your entry file
	output: {
		format: "cjs", // CommonJS format
		dir: "dist",
	},
	extendRollupConfig: (config) => {
		config.plugins = [
			alias({
				entries: [
					{ find: "@src", replacement: "../src" },
				],
			}),
		];
		return config;
	},
};