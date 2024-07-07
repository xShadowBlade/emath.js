![Header](https://raw.githubusercontent.com/xShadowBlade/emath.js/main/documentation/static/img/banner.png)

<div align="center">
eMath.js is a JavaScript library designed to provide tools for incremental game development, built upon <a href="https://github.com/Patashu/break_eternity.js">break_eternity.js</a>. It provides classes for upgrades, saving/loading, and more!

<br>
<!-- <a href="https://github.com/xShadowBlade/emath.js/commits/main" alt=""><img src="https://img.shields.io/github/last-commit/xShadowBlade/emath.js?label=last%20update&style=for-the-badge"></a>
<a href="https://github.com/xShadowBlade/emath.js/commits/main" alt=""><img src="https://img.shields.io/github/commit-activity/w/xShadowBlade/emath.js?label=updates&style=for-the-badge"></a> -->
<br>
<img src="https://img.shields.io/github/stars/xShadowBlade/emath.js?color=yellow&style=for-the-badge">
<a href="https://github.com/xShadowBlade/emath.js/issues" alt=""><img src="https://img.shields.io/github/issues/xShadowBlade/emath.js?style=for-the-badge"></a>
<br><img src="https://img.shields.io/github/v/release/xShadowBlade/emath.js?color=green&style=for-the-badge">
<br><img src="https://img.shields.io/badge/Discord%3A-%40.xshadowblade-blue?style=social&logo=discord">
</div>

## Abstract

This project started when I was trying to create my first incremental game. I found it difficult to implement certain systems like upgrades and saving. When I eventually made those systems, I wanted to make a package so I could streamline those tools. After a few months of development, I have finally developed it into a presentable state (I should have started it with v0.1.0 instead of v1.0.0 . . .).

Note: This package uses break_eternity.js by exporting the class `Decimal` directly. You should import the `Decimal` class from `emath.js` instead of `break_eternity.js`. For example,

```js
import { Decimal } from "emath.js";

const num1 = new Decimal(10);
const num2 = num1.add(5);

const num3 = new Decimal(20);
const num4 = Decimal.pow(num1, num3);
```

This was done in order to implement the saving/loading system using [`class-transformer`](https://github.com/typestack/class-transformer) and [`reflect-metadata`](https://github.com/rbuckton/reflect-metadata) (which are the only dependencies of this package).

You cannot import directly from `break_eternity.js` as the package [targets a version of javascript (es5)](https://github.com/Patashu/break_eternity.js/issues/114) that is not supported by `class-transformer` and `reflect-metadata`.

<!-- ## Features

- [**Currency System**]: Create currencies with upgrades and boosts (e.g. modifiers, multipliers, effect of upgrades, etc.)
- [**Upgrade System**]: Create upgrades for currencies with costs, effects, and more. -->

## Example Usage

This is a simple example of how to use the package. It creates a game with a currency called "coins" and an upgrade for that currency. It also includes hotkeys for gaining coins and buying upgrades, as well as saving and loading the game.

> Note: This example uses javascript. It is recommended to use typescript for better type checking.

```js
import { Decimal } from "emath.js";
import { Game } from "emath.js/game";

// For CDN usage:
// const { Decimal, Game } = eMath; 

// Initialize game
const coinGame = new Game();

// Create a new currency with upgrades
const coins = coinGame.addCurrency("coins", [
    {
        id: "upg1Coins", // Unique ID
        cost: level => level.mul(10), // Cost of 10 times the level
        maxLevel: new Decimal(1000),
        effect: (level, upgradeContext, currencyContext) => {
            // `level` is the level of the upgrade
            // `upgradeContext` is the context of the upgrade (this upgrade)
            // `currencyContext` is the context of the currency (coins in this case)

            // Access the `boost` object to add a boost
            currencyContext.boost.setBoost({
                id: "boostUpg1Coins", // Unique ID of the boost
                // Effect of the boost, which is additive, 11 times the level of the upgrade
                value: n => n.plus(level.mul(11)).sub(1),
            });
        },
    },
    // Add more upgrades here ...
]);

// Initialize / Load game
coinGame.init();
coinGame.dataManager.loadData();

// Gain coins
coins.static.gain();

// Buy (max) upgrades
coins.static.buyUpgrade("upg1Coins");

// Hotkeys
coinGame.keyManager.addKey([
    {
        id: "gainCoins",
        name: "Gain Coins",
        key: "g",
        onDownContinuous: () => coins.static.gain(),
    },
    {
        id: "buyUpgrades",
        name: "Buy Upgrades",
        key: "b",
        onDownContinuous: () => coins.static.buyUpgrade("upg1Coins"),
    },
]);

// Saving and Loading
window.addEventListener("beforeunload", () => {
    coinGame.dataManager.saveData();
});
coinGame.eventManager.setEvent("autoSave", "interval", 30000, () => {
    coinGame.dataManager.saveData();
    console.log("Auto Saved!");
});
```

## Installation

### Install via npm (recommended)

```bash
npm install emath.js
```

### Include using CDN

Include the following script in your HTML file. It will set the global variable `eMath` to the `window` object.

> Note: There is no development build for CDN, as it is used for nodejs.
> Replace `@latest` with the version you want to use. (e.g. `@8.3.0`), or use `@latest` for the latest version.

#### emath.js

```html
<script src="https://cdn.jsdelivr.net/npm/emath.js@latest/dist/main/eMath.min.js"></script>
```

#### emath.js/game

Also includes `"emath.js"` so you only need to include this script.

```html
<script src="https://cdn.jsdelivr.net/npm/emath.js@latest/dist/game/eMath.game.min.js"></script>
```

#### emath.js/presets

Sets the global variable `eMathPresets` to the `window` object.

> Note: This does not include either `"emath.js"` or `"emath.js/game"`.

```html
<script src="https://cdn.jsdelivr.net/npm/emath.js@latest/dist/presets/eMath.presets.min.js"></script>
```

---

Check out the [documentation](https://xshadowblade.github.io/emath.js/)!
