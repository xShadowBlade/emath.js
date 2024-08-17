---
id: keyManager
title: KeyManager
sidebar_label: KeyManager
---

[Link to auto generated docs](https://xshadowblade.github.io/emath.js/typedoc/classes/game_managers_KeyManager.KeyManager.html)

The `KeyManager` class is a manager that handles key bindings and tracks pressed keys. It is typically used to create and manage key bindings for the game, such as movement keys or action keys.

## Usage

The `KeyManager` class is used by default in the game instance, and can be accessed using `<Game>.keyManager`.

```js title="keyManager.js" showLineNumbers
import { myGame } from "./game.js";

const keyManager = myGame.keyManager;

// Add a key binding (not recommeneded)
keyManager.addKey("Move Up", "w", () => player.velocity.y += player.acceleration.y);

// Add multiple key bindings
keyManager.addKeys([
    {
        id: "moveUp", // Required
        name: "Move Up", // Optional
        key: "w", // Key to press (required)
        onDownContinuous: () => player.velocity.y += player.acceleration.y,
    },
    {
        id: "moveUp",
        name: "Move Down",
        key: "s",
        onDownContinuous: () => player.velocity.y -= player.acceleration.y,
    },
    // Add more key bindings here...
]);
```
