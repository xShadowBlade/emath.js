/**
 * @file Document configuration for Docusaurus.
 */
import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
    title: "eMath.js Documentation",
    tagline: "Elevating incremental game dev with management for various game classes.",
    favicon: "img/favicon.ico",

    // Set the production url of your site here
    url: "https://xshadowblade.github.io",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/emath.js/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "xShadowBlade", // Usually your GitHub org/user name.
    projectName: "emath.js", // Usually your repo name.

    onBrokenLinks: "warn",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    webpack: {
        jsLoader: (isServer) => ({
            loader: require.resolve("esbuild-loader"),
            options: {
                loader: "tsx",
                format: isServer ? "cjs" : undefined,
                target: isServer ? "node12" : "es2017",
            },
        }),
    },

    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarPath: "./sidebars.ts",
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                    "https://github.com/xShadowBlade/emath.js/tree/main/documentation/",
                },
                blog: false,
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: "img/docusaurus-social-card.jpg",
        navbar: {
            title: "Home",
            logo: {
                alt: "eMath.js Site Logo",
                src: "img/favicon.ico",
            },
            items: [
                {
                    href: "https://xshadowblade.github.io/emath.js/typedoc/index.html",
                    label: "Documentation",
                    position: "left",
                },
                {
                    type: "docSidebar",
                    sidebarId: "tutorialSidebar",
                    position: "left",
                    label: "Guides",
                },
                {
                    href: "https://github.com/xShadowBlade/emath.js",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Docs",
                    items: [
                        {
                            label: "Documentation",
                            // to: "/docs/tutorials/coinGame/intro",
                            href: "https://xshadowblade.github.io/emath.js/typedoc/index.html",
                        },
                        {
                            label: "Guides",
                            to: "/docs/intro",
                        },
                    ],
                },
                {
                    title: "Community (WIP)",
                    items: [
                        // {
                        //     label: "Discord (WIP)",
                        //     href: "https://discord.com/channels/@me",
                        // },
                    ],
                },
                {
                    title: "More",
                    items: [
                        {
                            label: "GitHub",
                            href: "https://github.com/xShadowBlade/emath.js",
                        },
                        {
                            label: "npm",
                            href: "https://www.npmjs.com/package/emath.js",
                        },
                    ],
                },
            ],
            copyright: `WIP. Copyright © ${new Date().getFullYear()} xShadowBlade. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
