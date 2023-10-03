/* global describe */
/* global it */
const assert = require("assert");
const eMath = require("../src/index.js");
const { E } = eMath;
describe("currency", function () {
	describe("#new()", function () {
		it("should return 2", function () {
			const test = {
				cur: new eMath.classes.currency(),
				curl: new eMath.classes.currencyStatic(() => test.cur),
			};
			test.curl.addUpgrade([
				{
					name: "Basic Stat Boost",
					cost: E(100),
					costScaling: n => E.mul(3, E.pow(2, n)),
					maxLevel: E(1000),
					effect: () => {},
				},
			]);
			console.log(test.curl.calculateUpgrade(0, 10, true).format());
			assert.ok(test.curl.calculateUpgrade(0, 10, true)[0] == true);
		});
	});
});