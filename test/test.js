/* global describe */
/* global it */
const assert = require("assert");
const { E } = require("../dist/index.js");
describe("E", function () {
	describe("#new()", function () {
		it("should create a custom Decimal with elements", function () {
			const test = E();
			assert.ok(typeof test.clone == "function");
		});
	});
});