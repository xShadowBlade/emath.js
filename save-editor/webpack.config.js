/**
 * @file Webpack configuration file.
 */
/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { EsbuildPlugin } = require("esbuild-loader");
const webpack = require("webpack");
// in case you run into any typescript error when configuring `devServer`
require("webpack-dev-server");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env, argv) => {
    console.log("Args:", argv);
    const mode = argv.mode;
    /**
     * @type {import("webpack").Configuration}
     */
    const options = {
        entry: "./src/index.tsx", // Entry point of your application
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "bundle.js", // Output bundle file name
        },
        resolve: {
            extensions: [".css", ".tsx", ".ts", ".js", "..."],
            alias: {
                // "@": path.resolve(__dirname, "src"),
                // Uncomment the following if you use emath.js
                "emath.js": "emath.js/ts",
                "emath.js/game": "emath.js/ts/game",
            },
        },
        // watch: true,
        // watchOptions: {
        //     ignored: "**/node_modules",
        // },
        module: {
            rules: [
            // Use esbuild to compile JavaScript & TypeScript
                {
                // Match `.js`, `.jsx`, `.ts` or `.tsx` files
                    test: /\.[jt]sx?$/,
                    exclude: /node_modules/,
                    loader: "esbuild-loader",
                    options: {
                    // JavaScript version to compile to
                        target: "es2015",
                        tsconfig: "./tsconfig.json",
                    },
                },
                {
                    // If you enable `experiments.css` or `experiments.futureDefaults`, please uncomment line below
                    // type: "javascript/auto",
                    test: /\.(sa|sc|c)ss$/i,
                    use: [
                        mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
                        "css-loader",
                        // "postcss-loader",
                        // "sass-loader",
                    ],
                },
            ],
        },
        optimization: {
            minimizer: [
                new EsbuildPlugin({
                    target: "es2015", // Syntax to transpile to (see options below for possible values)
                }),
                new CssMinimizerPlugin(),
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html", // Use this HTML file as a template
            }),
            // new webpack.DefinePlugin({
            //     // "%PUBLIC_URL%": JSON.stringify(mode === "production" ? "../public/" : "./"),
            //     MODE: JSON.stringify(mode),
            // }),
            new EsbuildPlugin({
                define: {
                    // "%PUBLIC_URL%": JSON.stringify(mode === "production" ? "../public/" : "./"),
                    MODE: JSON.stringify(mode),
                },
            }),
            new HtmlReplaceWebpackPlugin([
                {
                    pattern: "%PUBLIC_URL%",
                    // ! This is the public path of your app
                    replacement: mode === "production" ? "./public/" : "./",
                },
            ]),
        ],
    };
    if (mode === "production") {
        options.plugins.push(
            // new webpack.optimize.LimitChunkCountPlugin({
            //     maxChunks: 1,
            // }),
            // Copies public folder to dist folder
            new CopyPlugin({
                patterns: [
                    {
                        from: "public",
                        to: "public",
                        globOptions: {
                            ignore: ["**/index.html"],
                        },
                    },
                ],
            }),
            new MiniCssExtractPlugin(),
        );
    } else if (mode === "development") {
        options.devtool = "eval-cheap-module-source-map";
        // options.devServer = {
        //     contentBase: path.join(__dirname, "build"),
        //     compress: true,
        //     port: 3000,
        //     historyApiFallback: true,
        // };
    }
    return options;
};