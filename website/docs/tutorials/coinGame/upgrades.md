---
id: upgrades
title: Setting up Upgrading
sidebar_label: Upgrades
---

---

Welcome to the final part of this basics tutorial.

WIP coming soon ;\)

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
        updateDisplayUpgrade();
    });

    // Upgrades

    staticC.addUpgrade([
        {
            name: "Basic Coin Boost",
            cost: E(10),
            costScaling: n => n.mul(2),
            maxLevel: E(1000),
            effect: function () {
                console.log(this);
                const level = this.getLevel();
                console.log(level);

                staticC.boost.bSet(
                    "boostUpg1Coins",
                    "Basic Coin Boost",
                    "Basic Coin Boost",
                    n => E(n).plus(level).sub(1),
                    1,
                );
            },
        },
    ]);

    // Buy Upgrades button

    const buyUpgradesButton = document.createElement("button");
    document.body.appendChild(buyUpgradesButton);
    buyUpgradesButton.id = "buyUpgradesButton";
    function updateDisplayUpgrade () {
        document.getElementById("buyUpgradesButton").innerHTML = `Buy ${staticC.calculateUpgrade(0, 1)[0]} Upgrades for ${staticC.calculateUpgrade(0, 1)[1]} Coins`;
    }
    updateDisplayUpgrade();
    buyUpgradesButton.addEventListener("click", () => {
        staticC.buyUpgrade(0, 100);
        updateDisplayUpgrade();
        updateDisplay();
    });
});
```