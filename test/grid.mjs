import eMath from "../dist/eMath.mjs";

const { grid } = eMath.classes

const testGrid = new grid(3, 3);

console.log(testGrid.getAdjacent(1, 1));