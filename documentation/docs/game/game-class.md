---
id: game
title: Game
sidebar_label: Game
---

[Link to auto generated docs](https://xshadowblade.github.io/emath.js/typedoc/classes/game_Game.Game.html)

The game class is the main export of this library. It contains classes and methods for saving/loading, currencies, keybindings, and more.

## Uses

To make a `Game`, do the following:

```js title="game.js"
import { Game } from "emath.js/Game";

// Create a game with settings (optional)
const myGame = new Game({
    name: {
        title: "My Game", // Replace with the name of your game
        id: "my-game", // ID of the game, for the name of the key in `localStorage`
    },
    settings: {
        framerate: 30, // Affects the speed of tickers in `eventManager` and `keyManager`
    },
});

export { myGame };
```

There are various managers/methods. Here are some examples:

```js title="gameExamples.js"
import { myGame } from "./game.js";

// See <GameCurrency>
const myCurrency = myGame.add

// See <EventManager>
myGame.eventManager.addEvent("IntervalEvent", "interval", 2000, () => {
   console.log("Interval event that is executed every two seconds.");
});

// See <KeyManager>
```

For for information on constructor parameters, see the interface [`GameConfigOptions`](https://xshadowblade.github.io/emath.js/typedoc/interfaces/game_Game.GameConfigOptions.html).