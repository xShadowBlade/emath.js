/* global describe it */
import { ok } from "assert";
import eMath from "../src/index.js";
const { E } = eMath;
// const { E } = eMath;
describe("compile good", function () {
    describe("#main()", function () {
        it("should be fine", function () {
            console.log(E(23210));
            // console.log(eMath);
            ok(eMath);
        });
    });
});