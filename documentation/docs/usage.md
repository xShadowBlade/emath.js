---
id: usage
title: Usage Guide
sidebar_label: Usage
sidebar_position: 3
---

---

After you have installed it via [npm](./install#install-via-npm) or [HTML CDN](./install#include-using-cdn), use as the following:

### Node.js Usage

The ESM package currently exports 3 packages: `emath.js`, `emath.js/game`, and `emath.js/presets`.
There are also corresponding typescript versions of those packages (`emath.js/ts`, `emath.js/ts/game`, and `emath.js/presets/ts`) if you want to use your own build tool to compile from source.

Here is an example usage:

```js title="index.js"
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
coins.gain();

// Buy (max) upgrades
coins.buyUpgrade("upg1Coins");

// Hotkeys
coinGame.keyManager.addKey([
    {
        id: "gainCoins",
        name: "Gain Coins",
        key: "g",
        onDownContinuous: () => coins.gain(),
    },
    {
        id: "buyUpgrades",
        name: "Buy Upgrades",
        key: "b",
        onDownContinuous: () => coins.buyUpgrade("upg1Coins"),
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

### HTML Usage

The package exports a variable ``eMath`` and sets it to the window, so you don't need to import it. If you want to use `emath.js/game`, you do not need to import `emath.js` as it is already included in the game package.

```html title="index.html"
<script src="https://cdn.jsdelivr.net/npm/emath.js@latest/dist/game/eMath.game.min.js"></script>
```

This will set the `eMath` variable to the `window` object. You can then use it as follows:

```js title="index.js"
const { Decimal, Currency, Game } = eMath;

// rest of code here ...
```

For further information, [visit the auto generated documentation](https://xshadowblade.github.io/emath.js/typedoc/index.html)
