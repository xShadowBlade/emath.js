---
id: usage
title: Usage Guide
sidebar_label: Usage
sidebar_position: 3
---

---

After you have installed it via [npm](./install#install-via-npm) or [HTML CDN](./install#include-using-cdn), use as the following:

### Node.js Usage

The ESM package currently exports 4 packages: `emath.js`, `emath.js/game`, `emath.js/presets`, and `emath.js/pixiGame` (deprecated).
There are also corresponding typescript versions of those packages (`emath.js/ts`, `emath.js/game/ts`, `emath.js/presets/ts`, and `emath.js/pixiGame/ts`) if you want to use your own build tool.

Here is an example usage:

```js title="index.js"
import { E } from "emath.js";
import { Game } from "emath.js/game";

// Alternatively, do this for commonjs
// const { E } = require("emath.js");
// const { Game } = require("emath.js/Game");

// Initialize game
const game = new Game();

// Create a new currency
const coins = game.addCurrency("coins");

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
game.init();
game.dataManager.loadData();

// Gain coins
coins.static.gain();

// Buy (max) upgrades
coins.static.buyUpgrade("upg1Coins");

// Hotkeys
game.keyManager.addKey([
    {
        name: "Gain Coins",
        key: "g",
        onDownContinuous: () => coins.static.gain(),
    },
    {
        name: "Buy Upgrades",
        key: "b",
        onDownContinuous: () => coins.static.buyUpgrade("upg1Coins"),
    },
]);

// Saving and Loading
window.addEventListener("beforeunload", () => {
    game.dataManager.saveData();
});
game.eventManager.setEvent("autoSave", "interval", 30000, () => {
    game.dataManager.saveData();
    console.log("Auto Saved!");
});
```

### HTML Usage

The package exports a variable ``eMath`` and sets it to the window, so you don't need to import it. If you want to use `emath.js/game`, include `emath.js` first.

```html title="index.html"
<script src="https://cdn.jsdelivr.net/gh/xShadowBlade/emath.js/dist/main/eMath.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/xShadowBlade/emath.js/dist/game/eMath.game.min.js"></script>
```

This will set the `eMath` variable to the `window`, and augments it with the game variables.

```js title="index.js"
const { E, Currency, Game } = eMath;

// rest of code here ...
```

For further information, [visit the auto generated documentation](https://xshadowblade.github.io/emath.js/typedoc/index.html)