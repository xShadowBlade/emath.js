---
id: format
title: Format
---

---

The ``E.format()`` function is the main way to convert ``E`` to a ``string``.

### Usage

After you create a new ``E``, you can call the ``format()`` method.
```js
const { E } = eMath;

const newNum = E(2300); // Number with value 2300
newNum.format(); // "2,300"
```

Alternatively, you can use the static ``E.format()`` method.
```js
const { E } = eMath;

const newNum2 = E(2000); // Number with value 2000
E.format(newNum2); // "2,300"
```

### Outputs

After you reach 1,000,000,000 (1 billion), the format is automatically converted into letter form.

```js
const { E } = eMath;

const newNum3 = E(1.23e9); // Number with value 1.23 billion
E.format(newNum2); // "1.23 B"
```

After you reach 1e+300 (1 novemnonagintillion), the format is automatically converted into scientific form.

```js
const { E } = eMath;

const newNum3 = E(1.32e303); // Number with value 1.23 billion
E.format(newNum2); // "1.32e303"
```

