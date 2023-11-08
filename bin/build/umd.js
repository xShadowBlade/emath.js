const esbuild = require("esbuild");
const umdWrapper = require("esbuild-plugin-umd-wrapper");

esbuild
    .build({
        entryPoints: ["../../src/index.ts"],
        outfile: "../../dist/eMath.umd.js",
        format: "umd",
        bundle: true,
        // treeShaking: false,
        plugins: [umdWrapper()],
    })
    .then((result) => console.log(result))
    .catch(() => process.exit(1));