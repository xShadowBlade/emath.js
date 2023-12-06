import { E, boost } from "../src/index";
import assert from "assert";

describe("boost", () => {
    let testBoost: boost;

    beforeEach(() => {
        testBoost = new boost();
    });

    describe("constructor", () => {
        it("should create a boost with default values", () => {
            assert.equal(testBoost.baseEffect.equals(E(1)), true);
            assert.equal(testBoost.boostArray.length, 0);
        });

        it("should create a boost with specified base effect and boosts", () => {
            const b1 = { id: "b1", name: "Boost 1", desc: "Description 1", value: (x: E) => x.add(2), order: 1 };
            const b2 = { id: "b2", name: "Boost 2", desc: "Description 2", value: (x: E) => x.add(3), order: 2 };
            const b3 = { id: "b3", name: "Boost 3", desc: "Description 3", value: (x: E) => x.add(4), order: 3 };
            testBoost = new boost(10, [b1, b2, b3]);
            assert.equal(testBoost.baseEffect.equals(E(10)), true);
            assert.equal(testBoost.boostArray.length, 3);
            assert.equal(testBoost.boostArray[0].id, "b1");
            assert.equal(testBoost.boostArray[1].id, "b2");
            assert.equal(testBoost.boostArray[2].id, "b3");
        });
    });

    describe("bGet", () => {
        it("should return null if boost is not found", () => {
            const b = testBoost.bGet("nonexistent");
            assert.equal(b, null);
        });

        it("should return the boost object if found", () => {
            const b1 = { id: "b1", name: "Boost 1", desc: "Description 1", value: (x: E) => x.add(2), order: 1 };
            const b2 = { id: "b2", name: "Boost 2", desc: "Description 2", value: (x: E) => x.add(3), order: 2 };
            testBoost = new boost(10, [b1, b2]);
            const b = testBoost.bGet("b2");
            assert.equal(b?.id, "b2");
            assert.equal(b?.name, "Boost 2");
            assert.equal(b?.desc, "Description 2");
            assert.equal(b?.value(E(0)).equals(E(3)), true);
            assert.equal(b?.order, 2);
        });
    });

    describe("bRemove", () => {
        it("should not remove anything if boost is not found", () => {
            const b1 = { id: "b1", name: "Boost 1", desc: "Description 1", value: (x: E) => x.add(2), order: 1 };
            const b2 = { id: "b2", name: "Boost 2", desc: "Description 2", value: (x: E) => x.add(3), order: 2 };
            testBoost = new boost(10, [b1, b2]);
            testBoost.bRemove("nonexistent");
            assert.equal(testBoost.boostArray.length, 2);
        });

        it("should remove the boost if found", () => {
            const b1 = { id: "b1", name: "Boost 1", desc: "Description 1", value: (x: E) => x.add(2), order: 1 };
            const b2 = { id: "b2", name: "Boost 2", desc: "Description 2", value: (x: E) => x.add(3), order: 2 };
            testBoost = new boost(10, [b1, b2]);
            testBoost.bRemove("b1");
            assert.equal(testBoost.boostArray.length, 1);
            assert.equal(testBoost.boostArray[0].id, "b2");
        });
    });

    describe("bSet", () => {
        it("should add a new boost if it doesn't exist", () => {
            testBoost.bSet("b1", "Boost 1", "Description 1", () => E(2), 1);
            assert.equal(testBoost.boostArray.length, 1);
            assert.equal(testBoost.boostArray[0].id, "b1");
            assert.equal(testBoost.boostArray[0].name, "Boost 1");
            assert.equal(testBoost.boostArray[0].desc, "Description 1");
            assert.equal(testBoost.boostArray[0].value(E(0)).equals(E(2)), true);
            assert.equal(testBoost.boostArray[0].order, 1);
        });

        it("should update an existing boost if it exists", () => {
            testBoost.bSet("b1", "Boost 1", "Description 1", () => E(2), 1);
            testBoost.bSet("b1", "Boost 1 Updated", "Description 1 Updated", () => E(3), 2);
            assert.equal(testBoost.boostArray.length, 1);
            assert.equal(testBoost.boostArray[0].id, "b1");
            assert.equal(testBoost.boostArray[0].name, "Boost 1 Updated");
            assert.equal(testBoost.boostArray[0].desc, "Description 1 Updated");
            assert.equal(testBoost.boostArray[0].value(E(0)).equals(E(3)), true);
            assert.equal(testBoost.boostArray[0].order, 2);
        });
    });

    describe("bSetAdvanced", () => {
        it("should add new boosts if they don't exist", () => {
            const b1 = { id: "b1", name: "Boost 1", desc: "Description 1", value: (x: E) => x.add(2), order: 1 };
            const b2 = { id: "b2", name: "Boost 2", desc: "Description 2", value: (x: E) => x.add(3), order: 2 };
            testBoost.bSetAdvanced(b1, b2);
            assert.equal(testBoost.boostArray.length, 2);
            assert.equal(testBoost.boostArray[0].id, "b1");
            assert.equal(testBoost.boostArray[1].id, "b2");
        });

        it("should update existing boosts if they exist", () => {
            const b1 = { id: "b1", name: "Boost 1", desc: "Description 1", value: (x: E) => x.add(2), order: 1 };
            const b2 = { id: "b2", name: "Boost 2", desc: "Description 2", value: (x: E) => x.add(3), order: 2 };
            const b3 = { id: "b1", name: "Boost 1 Updated", desc: "Description 1 Updated", value: (x: E) => x.add(4), order: 3 };
            testBoost.bSetAdvanced(b1, b2, b3);
            assert.equal(testBoost.boostArray.length, 2);
            assert.equal(testBoost.boostArray[0].id, "b1");
            assert.equal(testBoost.boostArray[0].name, "Boost 1 Updated");
            assert.equal(testBoost.boostArray[0].desc, "Description 1 Updated");
            assert.equal(testBoost.boostArray[0].value(E(0)).equals(E(4)), true);
            assert.equal(testBoost.boostArray[0].order, 3);
            assert.equal(testBoost.boostArray[1].id, "b2");
        });
    });

    describe("calculate", () => {
        it("should return the base effect if there are no boosts", () => {
            const result = testBoost.calculate(10);
            assert.equal(result.equals(E(10)), true);
        });

        it("should apply boosts in order of increasing order", () => {
            const b1 = { id: "b1", name: "Boost 1", desc: "Description 1", value: (x: E) => x.add(2), order: 2 };
            const b2 = { id: "b2", name: "Boost 2", desc: "Description 2", value: (x: E) => x.mul(3), order: 1 };
            const b3 = { id: "b3", name: "Boost 3", desc: "Description 3", value: (x: E) => x.pow(2), order: 3 };
            testBoost = new boost(1, [b1, b2, b3]);
            const result = testBoost.calculate();
            assert.equal(result.equals(E(25)), true);
        });
    });
});