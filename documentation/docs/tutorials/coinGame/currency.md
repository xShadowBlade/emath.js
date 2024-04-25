---
id: currency
title: Setting up Currencies
sidebar_label: Currencies
sidebar_position: 3
---

---

After you have set up the basics, now it's time to configure the currencies!

```js
window.addEventListener("load", () => {
    // ... (setup)

    // Initialize currency and static currency
    const currency = new eMath.classes.currency();
    const staticC = new eMath.classes.currencyStatic(() => currency);
});
```

Explanation:
- Creates instances of the `currency` and `currencyStatic` classes from the `eMath` library, setting up the fundamental components for managing in-game currency.

```js
window.addEventListener("load", () => {
    // ... (setup)
    // ... (currencies init)
    // Create Coins Display
    const coinsDisplay = document.createElement("p");
    document.body.appendChild(coinsDisplay);
    coinsDisplay.id = "coinsDisplay";
});
```

Explanation:
- Dynamically creates a paragraph element (`<p>`) to display the player's coin count.
- Appends the created element to the HTML body.
- Sets the ID of the created element to "coinsDisplay" for easy reference.

```js
window.addEventListener("load", () => {
    // ... (setup)
    // ... (currencies init)
    // ... (create coins display)

    // Function to update the coins display
    function updateDisplay () {
        document.getElementById("coinsDisplay").innerHTML = `Coins: ${currency.value.format()} (x${staticC.boost.calculate().format()})`; // Updates the display and shows the multiplier. Ex. "Coins: 2.00 (x1.0)"
    }
    updateDisplay();
});
    
```

Explanation:
- Defines a function named `updateDisplay` responsible for updating the displayed coin count.
- Uses the `innerHTML` property to set the content of the "coinsDisplay" element with the formatted coin value and boost multiplier.
- Invokes the `updateDisplay` function to set the initial display when the page loads.

```js
window.addEventListener("load", () => {
    // ... (setup)
    // ... (currencies init)
    // ... (create coins display)
    // ... (Function to update the coins display)

    // Create gain button

    const gainButton = document.createElement("button");
    gainButton.innerHTML = "Gain Coins";
    document.body.appendChild(gainButton);
    gainButton.addEventListener("click", () => {
        // Triggers when button is pressed
        staticC.gain(); // Gain
        updateDisplay(); // Updates the display for the amount of coins
        updateDisplayUpgrade(); // Next tutorial
    });
});
```

Explanation:
- It creates a button labeled "Gain Coins" and appends it to the HTML body.
- An event listener is attached to the button, triggering actions related to gaining coins and updating the display when the button is clicked.

Final code:

```js
window.addEventListener("load", () => {
    const { E } = eMath;

    // Initialize currency and static currency

    const currency = new eMath.classes.currency();
    const staticC = new eMath.classes.currencyStatic(() => currency);

    // Create Coins Display

    const coinsDisplay = document.createElement("p");
    document.body.appendChild(coinsDisplay);
    coinsDisplay.id = "coinsDisplay";

    // Function to update the coins display

    function updateDisplay () {
        document.getElementById("coinsDisplay").innerHTML = `Coins: ${currency.value.format()} (x${staticC.boost.calculate().format()})`; // Updates the display and shows the multiplier. Ex. "Coins: 2.00 (x1.0)"
    }
    updateDisplay();

    // Create gain button

    const gainButton = document.createElement("button");
    gainButton.innerHTML = "Gain Coins";
    document.body.appendChild(gainButton);
    gainButton.addEventListener("click", () => {
        // Triggers when button is pressed
        staticC.gain(); // Gain
        updateDisplay(); // Updates the display for the amount of coins
        updateDisplayUpgrade(); // Next tutorial
    });
});
```

In this section, we've set up the foundational elements for managing in-game currency, created a display for the player's coins, and initiated an update function to reflect changes in the displayed information. After you have setup the currencies, continue to the [upgrades tutorial](./upgrades).