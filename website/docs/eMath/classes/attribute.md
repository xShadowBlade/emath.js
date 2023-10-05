---
id: attribute
title: Attribute
---

## attribute
Represents a static attribute in the game.

**Kind**: global class  

* [attribute](#attribute)
    * [new attribute(initial)](#new_attribute_new)
    * [.initial](#attribute+initial) : ``E``
    * [.value](#attribute+value) : ``E``
    * [.boost](#attribute+boost) : ``Game.classes.boost``
    * [.update(effect)](#attribute+update) ⇒ ``E``

<a name="new_attribute_new"></a>

### new attribute(initial)
Constructs a static attribute with an initial effect.


| Param | Type | Description |
| --- | --- | --- |
| initial | ``E`` \| ``Number`` | The inital value of the attribute. |

<a name="attribute+initial"></a>

### attribute.initial : ``E``
The inital value of the attribute.

**Kind**: instance property of [``attribute``](#attribute)
<a name="attribute+value"></a>

### attribute.value : ``E``
The current value of the attribute.

**Kind**: instance property of [``attribute``](#attribute)
<a name="attribute+boost"></a>

### attribute.boost : ``Game.classes.boost``
A boost object that affects the attribute.

**Kind**: instance property of [``attribute``](#attribute)
<a name="attribute+update"></a>

### attribute.update(effect) ⇒ ``E``
Updates the value of the attribute based on the provided effect function and initial value.

**Kind**: instance method of [``attribute``](#attribute)
**Returns**: ``E`` - The updated value of the attribute after applying the effect.

| Param | Type | Description |
| --- | --- | --- |
| effect | ``function`` | The effect function to apply to the attribute. |