---
id: dataManager
title: DataManager
sidebar_label: DataManager
---

[Link to auto generated docs](https://xshadowblade.github.io/emath.js/typedoc/classes/game_managers_DataManager.DataManager.html)

The `DataManager` class is a manager that stores and manages data for the game. It is typically used to store and retrieve data for the game, such as player data, save data, or configuration data.

## Usage

The `DataManager` class is used by default in the game instance, and can be accessed using `<Game>.dataManager`.

```js title="dataManager.js" showLineNumbers
import { myGame } from "./game.js";

const dataManager = myGame.dataManager;

// Set a value
dataManager.setData("test", 5);

// Get a value
console.log(dataManager.getData("test")); // 5

// Once all data is set, call init
dataManager.init();

// Load data from `localStorage`, and check if it is valid (not tampered with using a save editor, for example)
const dataIsValid = dataManager.loadData();

// Save data to `localStorage`
dataManager.saveData();

// Export data as a text file
dataManager.exportData();

// ... or implement your own data export using `compileData`
prompt("Data:", dataManager.compileData());

```
