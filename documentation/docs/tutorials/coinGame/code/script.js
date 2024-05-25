// Note: This is a simple example, and you should npm with typescript for a better development experience
// Import from CDN
const { E, Game } = window.eMath;

// Initialize game with options
const gameOptions = {
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
        cost: level => level.mul(10), // Cost of 10 times the level
        maxLevel: E(1000),
        effect: (level, upgradeContext, currencyContext) => {
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
];

// Create a new currency with upgrades
const coins = coinGame.addCurrency("coins", coinUpgrades);

// Reset Layer

// New currency
const gems = coinGame.addCurrency("gems");

// Add a boost to the currency
gems.static.boost.setBoost({
    id: "boostFromCoins",
    value: n => n.plus(coins.static.value.div(10)), // Gain 10% of coins
});

// Add a reset layer to the currency
const prestige = coinGame.addReset(coins);

prestige.onReset = () => {
    // Add a requirement to reset. In this case, the player needs at least 1000 coins to reset
    if (coins.static.value.lt(1000)) return;

    // Gain gems based on the amount of coins before reset (set by the boost)
    gems.static.gain();
};

// Call the reset layer
// prestige.reset();

// Display

// Gain coins button
const gainCoins = () => {
    coins.static.gain();
};
document.getElementById("gainCoins").addEventListener("click", gainCoins);

// Gain gems button
const gainGems = () => {
    prestige.reset();
};
document.getElementById("gainGems").addEventListener("click", gainGems);

// Buy (max) upgrades button
const buyUpgrades = () => {
    coins.static.buyUpgrade("upg1Coins");
};
document.getElementById("buyUpgrades").addEventListener("click", buyUpgrades);

// Add display
const coinsDisplay = document.getElementById("coinsDisplay");
const gemsDisplay = document.getElementById("gemsDisplay");

// Add a render event that executes every frame
coinGame.eventManager.setEvent("render", "interval", 0, () => {
    coinsDisplay.innerHTML = `Coins: ${coins.static.value.format()}`;
    gemsDisplay.innerHTML = `Gems: ${gems.static.value.format()}`;
});

// Advanced

// Data loading

// Initialize / Load game
// Only do this after all currencies and upgrades are added
coinGame.init();
coinGame.dataManager.loadData();

// Hotkeys
coinGame.keyManager.addKey([
    {
        id: "gainCoins",
        name: "Gain Coins",
        key: "g",
        onDownContinuous: () => coins.static.gain(),
    },
    {
        id: "buyUpgrades",
        name: "Buy Upgrades",
        key: "b",
        onDownContinuous: () => coins.static.buyUpgrade("upg1Coins"),
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
