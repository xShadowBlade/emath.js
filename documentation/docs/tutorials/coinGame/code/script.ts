/**
 * @file Coin Game tutorial code (typescript)
 */
// Import from CDN
// const { E, Game } = window.eMath;

// Import from NPM
// import { E } from "emath.js";
// import { Game } from "emath.js/game";

// Import from local build
// [projectRoot]/src/index is `emath.js`, [projectRoot]/src/game/index is `emath.js/game`
import { E } from "../../../../../src/index";
import { Game } from "../../../../../src/game/index";
import type { UpgradeInit } from "../../../../../src/index";
import type { GameConfigOptions } from "../../../../../src/game/index";

// Initialize game with options
const gameOptions: GameConfigOptions = {
    // Name of the game (optional)
    name: {
        id: "coinGame", // ID of the game, used for saving and loading
        title: "Coin Game", // Name of the game, cosmetic
        version: "0.1.0", // Version of the game
    },
};

const coinGame = new Game(gameOptions);

// Currency and Upgrades

// Upgrades for the currency
const coinUpgrades = [
    {
        id: "upg1Coins", // Unique ID
        cost: (level): E => level.mul(10), // Cost of 10 times the level
        maxLevel: E(1000), // Maximum level of 1000
        effect: (level, upgradeContext, currencyContext): void => {
            // `currencyContext` is the context of the currency (coins in this case)

            // Access the `boost` object to add a boost
            currencyContext.boost.setBoost({
                id: "boostUpg1Coins", // Unique ID of the boost
                // Effect of the boost, which is additive, 11 times the level of the upgrade
                value: n => n.plus(level.mul(11)).sub(1),
            });
        },
    },
    // Add more upgrades here ...
] as const satisfies UpgradeInit[]; // Type assertion to provide upgrade type checking

// Create a new currency with upgrades
const coins = coinGame.addCurrency("coins", coinUpgrades);

// Initialize / Load game
// Only do this after all currencies and upgrades are added
coinGame.init();
coinGame.dataManager.loadData();

// Display

// Gain coins button
const gainCoins = (): void => {
    coins.static.gain();
};
document.getElementById("gainCoins").addEventListener("click", gainCoins);

// Buy (max) upgrades button
const buyUpgrades = (): void => {
    coins.static.buyUpgrade("upg1Coins");
};
document.getElementById("buyUpgrades").addEventListener("click", buyUpgrades);

// Add display
const coinsDisplay = document.getElementById("coinsDisplay");

// Add a render event that executes every frame
coinGame.eventManager.setEvent("render", "interval", 0, () => {
    coinsDisplay.innerHTML = `Coins: ${coins.static.value.format()}`;
});

// Advanced

// Hotkeys
coinGame.keyManager.addKey([
    {
        id: "gainCoins",
        name: "Gain Coins",
        key: "g",
        onDownContinuous: (): void => void coins.static.gain(),
    },
    {
        id: "buyUpgrades",
        name: "Buy Upgrades",
        key: "b",
        onDownContinuous: (): void => void coins.static.buyUpgrade("upg1Coins"),
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
