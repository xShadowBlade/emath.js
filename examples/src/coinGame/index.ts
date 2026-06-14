/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * @file
 * In this example, we will create a button
 * that when pressed gives you coins that you can use
 * on an upgrade that gives you more coins on gain.
 */
import { Decimal, Currency, Upgrade, BoostObject } from "emath.js";
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

// For debugging
Object.assign(window, { coinGame });

// Initialize coins and static coins
// const coinsUpgrades = [
//     {
//         id: "upg1Coins", // Unique ID
//         name: "Basic Coin Boost",
//         cost: (level): Decimal => level.mul(2).pow(1.1), // Cost of 10 times the level

//         // The bounds of the upgrade. The first value is the lower bound and the second value is the upper bound.
//         // Must satisfy: 0 < lowerBound < inverseCost(currency) < upperBound < currency
//         bounds: (currency) => [
//             currency.pow(Decimal.reciprocal(1.2)).div(2),
//             currency.pow(Decimal.reciprocal(1.1)).mul(2),
//         ],

//         effect: function (level, _, currency): void {
//             currency.boost.setBoost(
//                 "boostUpg1Coins",
//                 "Basic Coin Boost",
//                 "Basic Coin Boost",
//                 (n) => n.plus(level.mul(11)).sub(1),
//                 1,
//             );
//         },
//         // maxLevel: new Decimal(1000), // Max level of 1000
//     },
// ] as const satisfies UpgradeInit[];

// const coins = coinGame.addCurrency("coins", coinsUpgrades, items);

const coins = new Currency("coins");
coins.addUpgrade(
    new Upgrade("upg1Coins")
        .withName("Basic Coin Boost")
        .withCost((level) => level.mul(2).pow(1.1))
        .withBounds((currency) => [
            currency.pow(Decimal.reciprocal(1.2)).div(2),
            currency.pow(Decimal.reciprocal(1.1)).mul(2),
        ])
        .withEffectOnAdd(function (upgrade, currency): void {
            currency.boost.addBoost(
                new BoostObject("boostUpg1Coins")
                    .withName("Basic Coin Boost")
                    .withValue((n) => n.plus(upgrade.level.mul(11)).sub(1))
                    .withOrder(1),
            );
        }),
);

coinGame.addData(coins);

// Debug
Object.assign(window, { coins });

// Initialize / Load game
coinGame.init();
console.log(coinGame.dataManager.loadData());

// Create Coins Display
const coinsDisplay = document.getElementById("coinsDisplay");

/** Function to update the coins display */
function updateDisplay(): void {
    // Updates the display and shows the multiplier. Ex. "Coins: 2.00 (x1.0)"
    coinsDisplay!.innerHTML = `
        Coins: ${coins.value.format()} (${Decimal.formats.formatMult(coins.boost.calculate())})
        <br>
        Upgrade 1 Level: ${coins.getUpgrade("upg1Coins")!.level.format()}
    `;
}
updateDisplay();

// Create gain button
const gainButton = document.getElementById("coinGain");

/** Function to gain coins */
function gainCoins(): void {
    // Triggers when button is pressed
    coins.gain(); // Gain
    updateDisplay(); // Updates the display for the amount of coins
    updateDisplayUpgrade();;
}
gainButton!.addEventListener("click", gainCoins);

// Buy Upgrades button
const buyUpgradesButton = document.getElementById("buyUpgradesButton");

/** Function to update the upgrade display */
function updateDisplayUpgrade(): void {
    const calculatedUpg = coins.calculateUpgrade("upg1Coins");

    buyUpgradesButton!.innerHTML = `Buy ${calculatedUpg[0].format()} Upgrades for ${calculatedUpg[1].format()} Coins (b)`;
}
updateDisplayUpgrade();

/** Function to buy upgrades */
function buyUpgrades(): void {
    coins.buyUpgrade("upg1Coins");
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
    }
]);

// Saving and Loading
window.addEventListener("beforeunload", () => {
    coinGame.dataManager.saveData();
});
coinGame.eventManager.setEvent("autoSave", "interval", 30000, () => {
    coinGame.dataManager.saveData();
    console.log("Auto Saved!");
});
