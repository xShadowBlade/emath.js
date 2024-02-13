/**
 * In this example, we will create a button
 * that when pressed gives you coins that you can use
 * on an upgrade that gives you more coins on gain.
 */

// Extract relevant classes from eMath
/** @type {import("../../../../../src/game/hookGame").eMathGameWeb} */
let eMath = window.eMath;
const { E, game } = eMath;

// Initialize game
const coinGame = new game();

// Initialize coins and static coins

const coins = coinGame.addCurrency("coins");

// Upgrades
coins.static.addUpgrade([
    {
        id: "boostUpg1Coins", // Unique ID
        name: "Basic Coin Boost",
        cost: level => level.mul(10),
        maxLevel: E(1000),
        effect: function (level) {
            coins.static.boost.setBoost(
                "boostUpg1Coins",
                "Basic Coin Boost",
                "Basic Coin Boost",
                n => n.plus(level).sub(1),
                1,
            );
        },
    },
]);

// Initialize / Load game

window.addEventListener("load", () => {
    // Create Coins Display

    const coinsDisplay = document.createElement("p");
    document.body.appendChild(coinsDisplay);
    coinsDisplay.id = "coinsDisplay";

    /** Function to update the coins display */
    function updateDisplay () {
        document.getElementById("coinsDisplay").innerHTML = `Coins: ${coins.value.format()} (x${coins.static.boost.calculate().format()})`; // Updates the display and shows the multiplier. Ex. "Coins: 2.00 (x1.0)"
    }
    updateDisplay();

    // Create gain button

    const gainButton = document.createElement("button");
    gainButton.innerHTML = "Gain Coins";
    document.body.appendChild(gainButton);
    gainButton.addEventListener("click", () => {
        // Triggers when button is pressed
        coins.static.gain(); // Gain
        updateDisplay(); // Updates the display for the amount of coins
        updateDisplayUpgrade();
    });

    // Buy Upgrades button

    const buyUpgradesButton = document.createElement("button");
    document.body.appendChild(buyUpgradesButton);
    buyUpgradesButton.id = "buyUpgradesButton";

    /** Function to update the upgrade display */
    function updateDisplayUpgrade () {
        document.getElementById("buyUpgradesButton").innerHTML = `Buy ${coins.static.calculateUpgrade("boostUpg1Coins", 1)[0]} Upgrades for ${coins.static.calculateUpgrade("boostUpg1Coins", 1)[1]} Coins`;
    }
    updateDisplayUpgrade();
    buyUpgradesButton.addEventListener("click", () => {
        coins.static.buyUpgrade("boostUpg1Coins", 100);
        updateDisplayUpgrade();
        updateDisplay();
    });
});