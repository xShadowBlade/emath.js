/**
 * In this example, we will create a button
 * that when pressed gives you coins that you can use
 * on an upgrade that gives you more coins on gain.
 */
import { E } from "emath.js";
import { game } from "emath.js/game";

// Initialize game
const coinGame = new game({
    name: {
        title: "Coin Game",
        id: "coinGame",
    },
    settings: {
        framerate: 30, // 15 fps for testing
    },
});
(window as any).coinGame = coinGame; // For debugging

// Initialize coins and static coins

const coins = coinGame.addCurrency("coins");

// Upgrades
coins.static.addUpgrade({
    id: "boostUpg1Coins", // Unique ID
    name: "Basic Coin Boost",
    cost: level => level.mul(10), // Cost of 10 times the level
    costBulk: (coinsAmt, level, target) => { // Math - Optional, if not defined, it will use a binary search to find the max affordable. (slow for large numbers)
        // Summation of levels to target of 10 times the level
        const costFn = (a: E, b: E) => E(-5).mul(a.sub(b).sub(1)).mul(a.add(b));
        // \operatorname{floor}\left(\frac{-1+\sqrt{1+4\left(a^{2}-a+\frac{v}{5}\right)}}{2}\right)-a
        const discriminant = level.pow(2).sub(level).add(coinsAmt.div(5)).mul(4).add(1);
        let maxAffordable = E.floor(E.sqrt(discriminant).sub(1).div(2)).sub(level);
        maxAffordable = target.gt(0) ? E.min(maxAffordable, (target.sub(1))) : maxAffordable;
        const cost = costFn(level, maxAffordable.add(level));
        // console.log({ coinsAmt, level, target }); // Debugging
        // console.log({ cost, maxAffordable }); // Debugging
        return [cost, maxAffordable.add(1)] as [E, E];
    },
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
    buyUpgradesButton!.innerHTML = `Buy ${coins.static.calculateUpgrade("boostUpg1Coins", 25)[0]} Upgrades for ${coins.static.calculateUpgrade("boostUpg1Coins", 25)[1]} Coins (b)`;
}
updateDisplayUpgrade();

/** Function to buy upgrades */
function buyUpgrades () {
    coins.static.buyUpgrade("boostUpg1Coins", 25);
    updateDisplayUpgrade();
    updateDisplay();
}
buyUpgradesButton!.addEventListener("click", buyUpgrades);

// Hotkeys
coinGame.keyManager.addKey([
    {
        name: "Gain Coins",
        key: "g",
        onDownContinuous: gainCoins,
    },
    {
        name: "Buy Upgrades",
        key: "b",
        onDownContinuous: buyUpgrades,
    },
]);

// Saving and Loading
// window.addEventListener("beforeunload", () => {
//     coinGame.dataManager.saveData();
// });
// coinGame.eventManager.setEvent("autoSave", "interval", 30000, () => {
//     coinGame.dataManager.saveData();
//     console.log("Auto Saved!");
// });