---
id: configManager
title: ConfigManager
sidebar_label: ConfigManager
---

[Link to auto generated docs](https://xshadowblade.github.io/emath.js/typedoc/classes/game_managers_ConfigManager.ConfigManager.html)

The `ConfigManager` class is a manager that handles configuration objects. It is essentially a wrapper around `Object.assign`. Unlike the other managers, it is not used / accessable by default in the game instance.

## Uses

To create and manage configuration objects, do

```js title="configManager.js" showLineNumbers
import { ConfigManager } from "emath.js/game";

// Define a template for the configuration object
const configOptionTemplate = {
    option1: "default value",
    option2: 5,
    option3: {
        subOption1: "default value",
        subOption2: 10,
    },
};

// Create a new config manager with the template
const myConfigManager = new ConfigManager(configOptionTemplate);

// Parse a configuration object
const myConfig = myConfigManager.parse({
    option1: "new value",
    option3: {
        subOption2: 20,
    },
});

console.log(myConfig); // { option1: "new value", option2: 5, option3: { subOption1: "default value", subOption2: 20 } }
```
