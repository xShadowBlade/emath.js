---
id: currency
title: Currency
---
## Classes

<dl>
<dt><a href="#currency">currency</a></dt>
<dd><p>Represents the frontend for a currency.</p>
</dd>
<dt><a href="#currencyStatic">currencyStatic</a></dt>
<dd><p>Represents the backend for a currency in the game.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#CurrencyUpgrade">CurrencyUpgrade</a> : <code>Object</code></dt>
<dd><p>Create new upgrades</p>
</dd>
</dl>

<a name="currency"></a>

## currency
Represents the frontend for a currency.

**Kind**: global class

* [currency](#currency)
    * [new currency()](#new_currency_new)
    * [.value](#currency+value) : <code>E</code>
    * [.upgrades](#currency+upgrades) : <code>Array</code>
    * [.gain()](#currency+gain) ⇒ <code>E</code>

<a name="new_currency_new"></a>

### new currency()
Constructs a new currency object with an initial value of 0 and a boost.

<a name="currency+value"></a>

### currency.value : <code>E</code>
The current value of the currency.

**Kind**: instance property of [<code>currency</code>](#currency)
<a name="currency+upgrades"></a>

### currency.upgrades : <code>Array</code>
An array that represents upgrades and their levels.

**Kind**: instance property of [<code>currency</code>](#currency)
<a name="currency+gain"></a>

### currency.gain() ⇒ <code>E</code>
The new currency value after applying the boost.

**Kind**: instance method of [<code>currency</code>](#currency)
<a name="currencyStatic"></a>

## currencyStatic
Represents the backend for a currency in the game.

**Kind**: global class

* [currencyStatic](#currencyStatic)
    * [new currencyStatic(pointer)](#new_currencyStatic_new)
    * [.upgrades](#currencyStatic+upgrades) : <code>Array</code>
    * [.pointer](#currencyStatic+pointer) : <code>function</code>
    * [.boost](#currencyStatic+boost) : <code>boostStatic</code>
    * [.gain()](#currencyStatic+gain) ⇒ <code>E</code>
    * [.calculateUpgrade(id, target, [el])](#currencyStatic+calculateUpgrade) ⇒ <code>array</code>
    * [.buyUpgrade(id, target)](#currencyStatic+buyUpgrade) ⇒ <code>boolean</code>

<a name="new_currencyStatic_new"></a>

### new currencyStatic(pointer)

| Param | Type | Description |
| --- | --- | --- |
| pointer | <code>function</code> | returns Game.classes.currency |

<a name="currencyStatic+upgrades"></a>

### currencyStatic.upgrades : <code>Array</code>
An array that represents upgrades, their costs, and their effects.

**Kind**: instance property of [<code>currencyStatic</code>](#currencyStatic)
<a name="currencyStatic+pointer"></a>

### currencyStatic.pointer : <code>function</code>
A function that returns the pointer of the data

**Kind**: instance property of [<code>currencyStatic</code>](#currencyStatic)
<a name="currencyStatic+boost"></a>

### currencyStatic.boost : <code>boostStatic</code>
A boost object that affects the currency gain.

**Kind**: instance property of [<code>currencyStatic</code>](#currencyStatic)
<a name="currencyStatic+gain"></a>

### currencyStatic.gain() ⇒ <code>E</code>
The new currency value after applying the boost.

**Kind**: instance method of [<code>currencyStatic</code>](#currencyStatic)
<a name="currencyStatic+calculateUpgrade"></a>

### currencyStatic.calculateUpgrade(id, target, [el]) ⇒ <code>array</code>
Calculates the cost and how many upgrades you can buy

**Kind**: instance method of [<code>currencyStatic</code>](#currencyStatic)
**Returns**: <code>array</code> - - [amount, cost]

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>\*</code> |  |  |
| target | <code>\*</code> |  |  |
| [el] | <code>boolean</code> | <code>false</code> | Flag to exclude the sum calculation and only perform binary search. |

<a name="currencyStatic+buyUpgrade"></a>

### currencyStatic.buyUpgrade(id, target) ⇒ <code>boolean</code>
if enough currency is available.or array position,

**Kind**: instance method of [<code>currencyStatic</code>](#currencyStatic)
**Returns**: <code>boolean</code> - Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> \| <code>number</code> | The ID or position of the upgrade to buy or upgrade. If a string is provided, it is treated as the upgrade's ID. If a number is provided, it is treated as the upgrade's array position (starting from 0). |
| target | <code>E</code> | The target level or quantity to reach for the upgrade. This represents how many upgrades to buy or upgrade. |

<a name="CurrencyUpgrade"></a>

## CurrencyUpgrade : <code>Object</code>
Create new upgrades

**Kind**: global typedef

| Param | Type | Description |
| --- | --- | --- |
| upgrades | [<code>Array.&lt;CurrencyUpgrade&gt;</code>](#CurrencyUpgrade) | An array of upgrade objects. |
| [runEffectInstantly] | <code>boolean</code> | Whether to run the effect immediately |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [id] | <code>string</code> | id |
| [name] | <code>string</code> | name |
| cost | <code>E</code> | The cost of the first upgrade |
| costScaling | <code>function</code> | Scalar function for cost with param level |
| maxLevel | <code>E</code> | Max level |
| [effect] | <code>function</code> | Function to call after the upgrade is bought with param upgrade.level and param context |
```js
myCurrency.addUpgrade([
	{
		id: "newUpgrade", // ID to reference
		name: "My New Upgrade", // Display Name
		cost: E(10), // Initial cost of 10
		costScaling: n => E(n).pow(2), // n^2
		maxLevel: E(100), // Max level of 100
		effect: (level) => console.log(level.format())
	},
	// Add more upgrades here...
]);
```
