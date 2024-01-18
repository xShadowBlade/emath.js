/* global eMath */

/** @type {import("../../dist/types/game/hookGame").eMathGameWeb} */
const { E } = eMath;
/** @type {import("../../dist/types/game/hookGame").eMathGameWeb} */
const { game } = eMath;

const myGame = new game();

class testClass {
    constructor (a) {
        this.test = a;
    }
}
const { dataManager } = myGame;

dataManager.setData("test", {
    "test2": "test1",
    "testNumber": 1,
    "testClass": new testClass(242),
    "testArray": [1, 2, 3, 4, 5],
    "testObject": {
        "test": "test",
    },
    "testFunction": () => "test", // should not be saved?
    "testE": E("123.45"),
});
dataManager.init();

console.group("Data collection");
console.log(dataManager.getData("test"));
console.log(dataManager.getData("test").test2);
console.log(dataManager.getData("test").testNumber);
console.groupEnd();

console.group("Saving");
let save = dataManager.compileData();
console.log("Compile", dataManager.compileDataRaw(), save);
console.log("Decompile", dataManager.decompileData(save));
console.groupEnd();