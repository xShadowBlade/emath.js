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

## Example Usage

```js
import { E } from "emath.js";
import { Game } from "emath.js/game";

// For CDN usage:
// const { E, Game } = eMath; 

// Initialize game
const coinGame = new Game();

// Create a new currency
const coins = coinGame.addCurrency("coins");

// Create upgrades
coins.static.addUpgrade({
    id: "upg1Coins", // Unique ID
    cost: level => level.mul(10), // Cost of 10 times the level
    maxLevel: E(1000),
    effect: (level) => {
        coins.static.boost.setBoost({
            id: "boostUpg1Coins",
            effect: n => n.plus(level.mul(11)).sub(1),
        });
    },
});

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

#### emath.js

```html
<script src="https://cdn.jsdelivr.net/gh/xShadowBlade/emath.js/dist/main/eMath.min.js"></script>
```

#### emath.js/game

```html
<script src="https://cdn.jsdelivr.net/gh/xShadowBlade/emath.js/dist/game/eMath.game.min.js"></script>
```

#### emath.js/pixiGame

> CDN usage for this module is not yet available.

---

Check out the [documentation](https://xshadowblade.github.io/emath.js/)!
