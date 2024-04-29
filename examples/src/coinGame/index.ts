/**
 * @file
 * In this example, we will create a button
 * that when pressed gives you coins that you can use
 * on an upgrade that gives you more coins on gain.
 */
import { E } from "emath.js";
import { Game } from "emath.js/game";

// Initialize game
const coinGame = new Game({
    name: {
        title: "Coin Game",
        id: "coinGame",
    },
    settings: {
        framerate: 30,
    },
});
(window as typeof window & { coinGame: typeof coinGame }).coinGame = coinGame; // For debugging

// Initialize coins and static coins

const coins = coinGame.addCurrency("coins");

// Upgrades
coins.static.addUpgrade({
    id: "upg1Coins", // Unique ID
    name: "Basic Coin Boost",
    cost: level => level.mul(10), // Cost of 10 times the level
    effect: function (level) {
        coins.static.boost.setBoost(
            "boostUpg1Coins",
            "Basic Coin Boost",
            "Basic Coin Boost",
            n => n.plus(level.mul(11)).sub(1),
            1,
        );
    },
});

// Initialize / Load game
coinGame.init();
console.log(coinGame.dataManager.loadData());

// Create Coins Display
const coinsDisplay = document.getElementById("coinsDisplay");

/** Function to update the coins display */
function updateDisplay () {
    coinsDisplay!.innerHTML = `Coins: ${coins.value.format()} (${E.formats.formatMult(coins.static.boost.calculate())})`; // Updates the display and shows the multiplier. Ex. "Coins: 2.00 (x1.0)"
}
updateDisplay();

// Create gain button
const gainButton = document.getElementById("coinGain");

/** Function to gain coins */
function gainCoins () {
    // Triggers when button is pressed
    coins.static.gain(); // Gain
    updateDisplay(); // Updates the display for the amount of coins
    updateDisplayUpgrade();
}
gainButton!.addEventListener("click", gainCoins);

// Buy Upgrades button
const buyUpgradesButton = document.getElementById("buyUpgradesButton");

/** Function to update the upgrade display */
function updateDisplayUpgrade () {
    buyUpgradesButton!.innerHTML = `Buy ${coins.static.calculateUpgrade("upg1Coins")[0].format()} Upgrades for ${coins.static.calculateUpgrade("upg1Coins")[1].format()} Coins (b)`;
}
updateDisplayUpgrade();

/** Function to buy upgrades */
function buyUpgrades () {
    coins.static.buyUpgrade("upg1Coins");
    updateDisplayUpgrade();
    updateDisplay();
}
buyUpgradesButton!.addEventListener("click", buyUpgrades);

// Hotkeys
coinGame.keyManager.addKey([
    {
        id: "Gain Coins",
        key: "g",
        onDownContinuous: gainCoins,
    },
    {
        id: "Buy Upgrades",
        key: "b",
        onDownContinuous: buyUpgrades,
    },
]);

// Saving and Loading
window.addEventListener("beforeunload", () => {
    coinGame.dataManager.saveData();
});
coinGame.eventManager.setEvent("autoSave", "interval", 30000, () => {
    coinGame.dataManager.saveData();
    console.log("Auto Saved!");
});
