/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * @file
 * In this example, we will create a button
 * that when pressed gives you coins that you can use
 * on an upgrade that gives you more coins on gain.
 */
import { Decimal } from "emath.js";
import type { UpgradeInit, ItemInit } from "emath.js";
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
Object.assign(window, { coinGame }); // For debugging

// Initialize coins and static coins
const coinsUpgrades = [
    {
        id: "upg1Coins", // Unique ID
        name: "Basic Coin Boost",
        cost: (level): Decimal => level.mul(2).pow(1.1), // Cost of 10 times the level

        // The bounds of the upgrade. The first value is the lower bound and the second value is the upper bound.
        // Must satisfy: 0 < lowerBound < inverseCost(currency) < upperBound < currency
        bounds: (currency) => [
            currency.pow(Decimal.reciprocal(1.2)).div(2),
            currency.pow(Decimal.reciprocal(1.1)).mul(2),
        ],

        effect: function (level, _, currency): void {
            currency.boost.setBoost(
                "boostUpg1Coins",
                "Basic Coin Boost",
                "Basic Coin Boost",
                n => n.plus(level.mul(11)).sub(1),
                1,
            );
        },
        // maxLevel: new Decimal(1000), // Max level of 1000
    },
] as const satisfies UpgradeInit[];

const items = [
    {
        id: "item1",
        name: "Gold Coin",
        description: "A coin made of gold. (Cosmetic)",
        effect: (amount, _, currency): void => {
            // currency.gain(amount);
        },
        cost: (): Decimal => new Decimal(1000),
    },
] as const satisfies ItemInit[];

const coins = coinGame.addCurrency("coins", coinsUpgrades, items);

// Debug
Object.assign(window, { coins });

// Add item
coins.addItem(items);

// Initialize / Load game
coinGame.init();
console.log(coinGame.dataManager.loadData());

// Create Coins Display
const coinsDisplay = document.getElementById("coinsDisplay");

/** Function to update the coins display */
function updateDisplay (): void {
    // Updates the display and shows the multiplier. Ex. "Coins: 2.00 (x1.0)"
    coinsDisplay!.innerHTML = `
        Coins: ${coins.value.format()} (${Decimal.formats.formatMult(coins.boost.calculate())})
        <br>
        Upgrade 1 Level: ${coins.getUpgrade("upg1Coins").level.format()}
        <br>
        Item 1: ${coins.getItem("item1").amount.format()}
    `;
}
updateDisplay();

// Create gain button
const gainButton = document.getElementById("coinGain");

/** Function to gain coins */
function gainCoins (): void {
    // Triggers when button is pressed
    coins.gain(); // Gain
    updateDisplay(); // Updates the display for the amount of coins
    updateDisplayUpgrade();
    updateDisplayItem();
}
gainButton!.addEventListener("click", gainCoins);

// Buy Upgrades button
const buyUpgradesButton = document.getElementById("buyUpgradesButton");

/** Function to update the upgrade display */
function updateDisplayUpgrade (): void {
    const calculatedUpg = coins.calculateUpgrade("upg1Coins");

    buyUpgradesButton!.innerHTML = `Buy ${calculatedUpg[0].format()} Upgrades for ${calculatedUpg[1].format()} Coins (b)`;
}
updateDisplayUpgrade();

/** Function to buy upgrades */
function buyUpgrades (): void {
    coins.buyUpgrade("upg1Coins");
    updateDisplayUpgrade();
    updateDisplay();
}
buyUpgradesButton!.addEventListener("click", buyUpgrades);

const buyItem1Button = document.getElementById("buyItem1Button");

function updateDisplayItem (): void {
    const calculatedItem = coins.calculateItem("item1");

    buyItem1Button!.innerHTML = `Buy ${calculatedItem[0].format()} Gold Coins for ${calculatedItem[1].format()} Coins`;
}
updateDisplayItem();

/** Function to buy items */
function buyItems (): void {
    coins.buyItem("item1");
    updateDisplayItem();
    updateDisplay();
}
buyItem1Button?.addEventListener("click", buyItems);

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
    {
        id: "Buy Items",
        key: "n",
        onDownContinuous: buyItems,
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
