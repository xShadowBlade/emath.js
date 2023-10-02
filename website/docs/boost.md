---
id: boost-static
title: Boost Static
---

# Boost Static

Represents a boost manager that applies various effects to a base value.

## Class: `boostStatic`

### Constructor

-   **Parameters:**
    -   `baseEffect` (optional): The base effect value to which boosts are applied. Default is `1`.
    -   `pointer`: A function that returns `Game.classes.boost`.
    -   `...boosts`: An array of boost objects to initialize with.

```javascript
const myBoost = new Game.classes.boost(100, {
  id: "reallyCoolBoost124",
  name: "buff this",
  desc: "really cool lol",
  type: "add",
  value: E(124),
});
const myBoostStatic = new Game.classes.boostStatic(1, pointer, myBoost);
```

## Methods

### `bGet(id)`

Gets a boost object by its ID.

-   **Parameters:**

    -   `id`: The ID of the boost to retrieve.

-   **Returns:**
    -   The boost object if found, or `null` if not found.

### `bRemove(id)`

Removes a boost by its ID.

-   **Parameters:**
    -   `id`: The ID of the boost to remove.

### `bSet(id, name, desc, value, order)`

Sets or updates a boost with the given parameters.

-   **Parameters:**
    -   `id`: The ID of the boost.
    -   `name`: The name of the boost.
    -   `desc`: The description of the boost.
    -   `value`: The value of the boost (function).
    -   `order`: The order of the boost (higher order goes first).

```js
myBoostStatic.bSet("myBoostID", "My Boost", "Boost Description", valueFunction, 2);
```

### bSetAdvanced(...boosts)

Sets or updates multiple boosts with advanced parameters.

-   **Parameters:**
    -   `...boosts`: Boost objects to set or update.

```js
myBoostStatic.bSetAdvanced(boost1, boost2, boost3);
```

### calculate(base)

Calculates the cumulative effect of all boosts on the base effect.

-   **Parameters:**
    -   `base` (optional): The base effect value to calculate with. Default is this.baseEffect
-   **Returns:**
    The calculated effect after applying boosts.

## Example Usage

```js
const myBoost = new Game.classes.boost(100, {
  id: "reallyCoolBoost124",
  name: "buff this",
  desc: "really cool lol",
  type: "add",
  value: E(124),
});

const myBoostStatic = new Game.classes.boostStatic(1, pointer, myBoost);

// Set additional boosts
myBoostStatic.bSet("anotherBoostID", "Another Boost", "Boost Description", valueFunction, 1);

// Calculate the cumulative effect
const calculatedEffect = myBoostStatic.calculate();
```
