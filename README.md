![Header](https://raw.githubusercontent.com/xShadowBlade/emath.js/main/documentation/static/img/banner.png)

<div align="center">
eMath.js is a JavaScript library designed to provide tools for incremental game development, built upon <a href="https://github.com/Patashu/break_eternity.js">break_eternity.js</a>. It provides classes for upgrades, saving/loading, and more!

**NOTE: THIS PACKAGE IS IN DEVELOPMENT AND IS SUBJECT TO MAJOR CHANGES**
<br>
<a href="https://github.com/xShadowBlade/emath.js/commits/main" alt=""><img src="https://img.shields.io/github/last-commit/xShadowBlade/emath.js?label=last%20update&style=for-the-badge"></a>
<a href="https://github.com/xShadowBlade/emath.js/commits/main" alt=""><img src="https://img.shields.io/github/commit-activity/w/xShadowBlade/emath.js?label=updates&style=for-the-badge"></a>
<br>
<img src="https://img.shields.io/github/stars/xShadowBlade/emath.js?color=yellow&style=for-the-badge">
<a href="https://github.com/xShadowBlade/emath.js/issues" alt=""><img src="https://img.shields.io/github/issues/xShadowBlade/emath.js?style=for-the-badge"></a>
 <br><img src="https://img.shields.io/github/v/release/xShadowBlade/emath.js?color=green&style=for-the-badge">
<br><img src="https://img.shields.io/badge/Made%20by%3A-xShadowBlade%232720-blue?style=social&logo=discord">
</div>

## Abstract

This project started when I was trying to create my first incremental game. I found it difficult to implement certain systems like upgrades and saving. When I eventually made those systems, I wanted to make a package so I could streamline those tools. After a few months of development, I have finally developed it into a presentable state (I should have started it with v0.1.0 instead of v1.0.0 . . .).

Note: This package uses break_eternity.js by exporting a function `E` which is used both to construct and use methods on numbers. For example,

```js
import { E } from "emath.js";

const num1 = E(10); // Equivalent to new Decimal(10)
const num2 = num1.add(5); // Equivalent to num.add(5)

const num3 = E(20);
const num4 = E.pow(num1, num3); // Equivalent to num1.pow(num3), or Decimal.pow(num1, num3)

// Also has built-in formatting
console.log(num4.format()); // 100 Qt
```

This feature was originally provided to make the package more concise and easier to use. However, it ended up being a bit confusing. It will be removed in the future.

## Example Usage

This is a simple example of how to use the package. It creates a game with a currency called "coins" and an upgrade for that currency. It also includes hotkeys for gaining coins and buying upgrades, as well as saving and loading the game.

> Note: This example uses javascript. It is recommended to use typescript for better type checking.

```js
import { E } from "emath.js";
import { Game } from "emath.js/game";

// For CDN usage:
// const { E, Game } = eMath; 

// Initialize game
const coinGame = new Game();

// Create a new currency with upgrades
const coins = coinGame.addCurrency("coins", [
    {
        id: "upg1Coins", // Unique ID
        cost: level => level.mul(10), // Cost of 10 times the level
        maxLevel: E(1000),
        effect: (level, upgradeContext, currencyContext) => {
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

> Note: There is no development build for CDN, as it is used for nodejs.
> Replace `@latest` with the version you want to use. (e.g. `@8.3.0`), or use `@latest` for the latest version.

#### emath.js

```html
<script src="https://cdn.jsdelivr.net/npm/emath.js@latest/dist/main/eMath.min.js"></script>
```

#### emath.js/game

```html
<script src="https://cdn.jsdelivr.net/npm/emath.js@latest/dist/game/eMath.game.min.js"></script>
```

---

Check out the [documentation](https://xshadowblade.github.io/emath.js/)!
