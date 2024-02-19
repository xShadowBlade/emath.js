/**
 * In this example, we will create a button
 * that when pressed gives you coins that you can use
 * on an upgrade that gives you more coins on gain.
 */

// Extract relevant classes from eMath
/** @type {import("../../../../../src/game/hookGame").eMathGameWeb} */
const eMath = window.eMath;
const { E, game } = eMath;

// Initialize game
/** @type {game} */
const coinGame = new game();

// Initialize coins and static coins

const coins = coinGame.addCurrency("coins");

// Upgrades
coins.static.addUpgrade({
    id: "boostUpg1Coins", // Unique ID
    name: "Basic Coin Boost",
    cost: level => level.mul(10), // Cost of 10 times the level
    costBulk: (coinsAmt, level, target) => { // Math - Optional, if not defined, it will use a binary search to find the max affordable. (slow for large numbers)
        // Summation of levels to target of 10 times the level
        const costFn = (a, b) => E(-5).mul(a.sub(b).sub(1)).mul(a.add(b));
        // \operatorname{floor}\left(\frac{-1+\sqrt{1+4\left(a^{2}-a+\frac{v}{5}\right)}}{2}\right)-a
        const discriminant = level.pow(2).sub(level).add(coinsAmt.div(5)).mul(4).add(1);
        const maxAffordable = E.floor(E.sqrt(discriminant).sub(1).div(2)).sub(level);
        const cost = costFn(level, maxAffordable.add(level));
        console.log({ coinsAmt, level, target }); // Debugging
        console.log({ cost, maxAffordable, discriminant }); // Debugging
        return [cost, maxAffordable];
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
        document.getElementById("buyUpgradesButton").innerHTML = `Buy ${coins.static.calculateUpgrade("boostUpg1Coins", 10)[0]} Upgrades for ${coins.static.calculateUpgrade("boostUpg1Coins", 10)[1]} Coins`;
    }
    updateDisplayUpgrade();
    buyUpgradesButton.addEventListener("click", () => {
        coins.static.buyUpgrade("boostUpg1Coins", 10);
        updateDisplayUpgrade();
        updateDisplay();
    });
});