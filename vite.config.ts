import dts from "vite-plugin-dts";
import { defineConfig } from "vite-plus";
import oxfmtConfig from "./.oxfmtrc.json";
import packageJson from "./package.json";

export default defineConfig({
    plugins: [
        dts({
            outDirs: "dist/types",
        }),
    ],
    define: {
        PKG_VERSION: JSON.stringify(packageJson.version),
    },
    fmt: oxfmtConfig as any,
    lint: {
        jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
        rules: { "vite-plus/prefer-vite-plus-imports": "error" },
        options: { typeAware: true, typeCheck: true },
    },
    build: {
        sourcemap: true,
        lib: {
            entry: {
                emath: "src/index.ts",
                "emath.game": "src/game/index.ts",
                "emath.presets": "src/presets/index.ts",
            },
            formats: ["es", "cjs"],
            name: "eMath",
            fileName: (format, entryName) =>
                `${entryName}.${format === "es" ? "mjs" : format === "cjs" ? "js" : "min.js"}`,
        },
    },
});
