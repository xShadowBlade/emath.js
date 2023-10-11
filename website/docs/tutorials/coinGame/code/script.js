/*
* In this example, we will create a button
* that when pressed gives you coins that you can use
* on an upgrade that gives you more coins on gain.
*/

/* global window document eMath */
window.addEventListener("load", () => {
    const { E } = eMath;

    const currency = new eMath.classes.currency();
    const staticC = new eMath.classes.currencyStatic(() => currency);

    // Create Coins Display

    const coinsDisplay = document.createElement("p");
    document.body.appendChild(coinsDisplay);
    coinsDisplay.id = "coinsDisplay";
    function updateDisplay () {
        document.getElementById("coinsDisplay").innerHTML = `Coins: ${currency.value.format()} (x${staticC.boost.calculate().format()})`;
    }
    updateDisplay();

    // Create gain button

    const gainButton = document.createElement("button");
    gainButton.innerHTML = "Gain Coins";
    document.body.appendChild(gainButton);
    gainButton.addEventListener("click", () => {
        staticC.gain();
        updateDisplay();
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
