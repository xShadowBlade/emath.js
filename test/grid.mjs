/* global describe it */
import { ok } from "assert";
import eMath from "../dist/eMath.mjs";
const { E } = eMath;
const { grid } = eMath.classes;
// const { E } = eMath;
describe("grid good", function () {
    describe("#main()", function () {
        it("should be fine", function () {
            const testGrid = new grid(3, 3);

            console.log(testGrid.getAdjacent(1, 1));
        });
    });
});