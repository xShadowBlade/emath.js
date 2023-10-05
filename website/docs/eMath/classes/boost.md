---
id: boost
title: Boost
---
### new boost(baseEffect, ...boosts)
Constructs a new boost manager.


| Param | Type | Description |
| --- | --- | --- |
| baseEffect | ``number`` \| ``E`` | The base effect value to which boosts are applied. |
| ...boosts | ``Object`` | An array of boost objects to initialize with. |

**Example**
```js
const myBoost = new Game.classes.boost(1);
```
<a name="boost+boost"></a>

### boost.boost : ``Array.&lt;Object&gt;``
An array of boost objects.

**Kind**: instance property of [``boost``](#boost)
<a name="boost+pointer"></a>

### boost.pointer : ``function``
A function that returns the pointer of the data

**Kind**: instance property of [``boost``](#boost)
<a name="boost+baseEffect"></a>

### boost.baseEffect : ``E``
The base effect value.

**Kind**: instance property of [``boost``](#boost)
<a name="boost+bGet"></a>

### boost.bGet(id) ⇒ ``Object`` \| ``null``
Gets a boost object by its ID.

**Kind**: instance method of [``boost``](#boost)
**Returns**: ``Object`` \| ``null`` - The boost object if found, or null if not found.

| Param | Type | Description |
| --- | --- | --- |
| id | ``string|number`` | The ID of the boost to retrieve. |

**Example**
```js
// Returns boost.boost from index 0
myBoost.bGet(0);
```

<a name="boost+bRemove"></a>

### boost.bRemove(id)
Removes a boost by its ID.

**Kind**: instance method of [``boost``](#boost)

| Param | Type | Description |
| --- | --- | --- |
| id | ``string|number`` | The ID of the boost to remove. |

**Example**
```js
// Removes the boost from index 0
myBoost.bGet(0);
```

<a name="boost+bSet"></a>

### boost.bSet(id, name, desc, value, order)
Sets or updates a boost with the given parameters.

**Kind**: instance method of [``boost``](#boost)

| Param | Type | Description |
| --- | --- | --- |
| id | ``string`` | The ID of the boost. |
| name | ``string`` | The name of the boost. |
| desc | ``string`` | The description of the boost. |
| value | ``function`` | The value of the boost (function). |
| order | ``number`` | The order of the boost (lower order go first) (typically: 1 = add, 2 = mul, 3 = pow, 4 = tetr, 5 = pent) |

**Example**
```js
// Creates a new boost
myBoost.bSet(
    "myBoost",
    "My Boost",
    "Your very own boost",
    (n) => E(n).plus(3),
    1,
);
```

<a name="boost+bSetAdvanced"></a>

### boost.bSetAdvanced(...x)
Sets or updates multiple boosts with advanced parameters.

**Kind**: instance method of [``boost``](#boost)

| Param | Type | Description |
| --- | --- | --- |
| ...x | ``Object`` | Boost objects to set or update. |

```js
// Creates a new boost
myBoost.bSetAdvanced([
    {
       id: "myBoost",
        name: "My Boost",
        desc: "Your very own boost",
        value: (n) => E(n).plus(3),
        order: 1, 
    },
    // Other boosts go here
]);
```

<a name="boost+calculate"></a>

### boost.calculate([base]) ⇒ ``E``
Calculates the cumulative effect of all boosts on the base effect.

**Kind**: instance method of [``boost``](#boost)
**Returns**: ``E`` - The calculated effect after applying boosts.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [base] | ``number`` \| ``E`` | ``this.baseEffect`` | The base effect value to calculate with. |


<!---
```javascript
const myBoost = new Game.classes.boost(100, {
  id: "reallyCoolBoost124",
  name: "buff this",
  desc: "really cool lol",
  type: "add",
  value: E(124),
});
const myBoost = new Game.classes.boost(1, pointer, myBoost);
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
myBoost.bSet("myBoostID", "My Boost", "Boost Description", valueFunction, 2);
```

### bSetAdvanced(...boosts)

Sets or updates multiple boosts with advanced parameters.

-   **Parameters:**
    -   `...boosts`: Boost objects to set or update.

```js
myBoost.bSetAdvanced(boost1, boost2, boost3);
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

const myBoost = new Game.classes.boost(1, pointer, myBoost);

// Set additional boosts
myBoost.bSet("anotherBoostID", "Another Boost", "Boost Description", valueFunction, 1);

// Calculate the cumulative effect
const calculatedEffect = myBoost.calculate();
```
-->
