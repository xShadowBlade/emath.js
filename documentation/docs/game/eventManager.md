---
id: eventManager
title: EventManager
sidebar_label: EventManager
---

[Link to auto generated docs](https://xshadowblade.github.io/emath.js/typedoc/classes/game_managers_EventManager.EventManager.html)

The `EventManager` class is a manager that handles events and executes them at the correct time. It is typically used to create and manage events for the game, such as interval events or timeout events.

## Usage

The `EventManager` class is used by default in the game instance, and can be accessed using `<Game>.eventManager`.

```js title="eventManager.js" showLineNumbers
import { myGame } from "./game.js";

const eventManager = myGame.eventManager;

// Add an interval event that executes every 2 seconds.
eventManager.setEvent("IntervalEvent", "interval", 2000, () => {
    console.log("Interval event executed.");
});

// Add a timeout event that executes after 5 seconds.
eventManager.setEvent("TimeoutEvent", "timeout", 5000, () => {
    console.log("Timeout event executed.");
});

// Time warp by 1 second
eventManager.timeWarp(1000);
```
