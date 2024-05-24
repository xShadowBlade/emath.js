/* global eMath */

// /** @type {import("../../dist/types/game/hookGame").eMath} */
// const { E } = eMath;
// /** @type {import("../../dist/types/game/hookGame").eMath} */
// const { Boost, CurrencyStatic } = eMath;
// /** @type {import("../../dist/types/game/hookGame").eMath} */
// const { Game } = eMath;

// const myGame = new game();

// class testClass {
//     constructor (a) {
//         this.test = a;
//     }
// }
// const { dataManager } = myGame;

// dataManager.setData("test", {
//     "test2": "test1",
//     "testNumber": 1,
//     "testClass": new testClass(242),
//     "testArray": [1, 2, 3, 4, 5],
//     "testObject": {
//         "test": "test",
//     },
//     "testFunction": () => "test", // should not be saved?
//     "testE": E("123.45"),
//     "testBoost": new Boost(),
//     // "testCurrency": new currencyStatic(),
// });

// dataManager.setData("test2E", E("123.45"));

// myGame.addCurrency("testCurrency");

// dataManager.init();

// console.group("Data collection");
// console.log(dataManager.getData("test"));
// console.log(dataManager.getData("test").test2);
// console.log(dataManager.getData("test").testNumber);
// console.groupEnd();

// console.group("Saving");
// const save = dataManager.compileData();
// console.log("Compile", dataManager.compileDataRaw(), save);
// const decompiledData = dataManager.decompileData(save);
// console.log("Decompile", decompiledData);
// console.log("Load", dataManager.parseData(decompiledData));
// console.groupEnd();



// For CDN usage:
const { E, Game } = eMath; 

// Initialize game
const coinGame = new Game();

// Create a new currency with upgrades
const coins = coinGame.addCurrency("coins", [
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
]);

// Initialize / Load game
coinGame.init();
coinGame.dataManager.loadData();

// Gain coins
// coins.static.gain();
const gainCoins = () => {
    coins.static.gain();
};
document.getElementById("gainCoins").addEventListener("click", gainCoins);

// Buy (max) upgrades
// coins.static.buyUpgrade("upg1Coins");
const buyUpgrades = () => {
    coins.static.buyUpgrade("upg1Coins");
};
document.getElementById("buyUpgrades").addEventListener("click", buyUpgrades);

// Add display
const coinsDisplay = document.getElementById("coinsDisplay");


// Buy (max) upgrades
coins.static.buyUpgrade("upg1Coins");

// Add a render event that executes every frame
coinGame.eventManager.setEvent("render", "interval", 0, () => {
    coinsDisplay.innerHTML = `Coins: ${coins.static.value.format()}`;
});

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
