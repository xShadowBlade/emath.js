/**
 * @file Test suite for the Boost class
 */
import { describe, it, beforeEach } from "mocha";
import { assert } from "chai";

import { Decimal, Boost } from "emath.js";
import type { BoostsObjectInit } from "emath.js";

describe("Boost", () => {
    let testBoost: Boost;

    beforeEach(() => {
        testBoost = new Boost();
    });

    describe("constructor", () => {
        it("should create a boost with default values", () => {
            assert(testBoost.baseEffect.equals(new Decimal(1)));
            assert.equal(testBoost.boostArray.length, 0);
        });

        it("should create a boost with specified base effect and boosts", () => {
            const b1: BoostsObjectInit = { id: "b1", name: "Boost 1", description: "Description 1", value: (x) => x.add(2), order: 1 };
            const b2: BoostsObjectInit = { id: "b2", name: "Boost 2", description: "Description 2", value: (x) => x.add(3), order: 2 };
            const b3: BoostsObjectInit = { id: "b3", name: "Boost 3", description: "Description 3", value: (x) => x.add(4), order: 3 };
            testBoost = new Boost(10, [b1, b2, b3]);
            assert(testBoost.baseEffect.equals(new Decimal(10)));
            assert.equal(testBoost.boostArray.length, 3);
            assert.equal(testBoost.boostArray[0].id, "b1");
            assert.equal(testBoost.boostArray[1].id, "b2");
            assert.equal(testBoost.boostArray[2].id, "b3");
        });
    });

    describe("getBoosts", () => {
        it("should return an array of boost objects with the given ID", () => {
            const b1: BoostsObjectInit = { id: "b1", name: "Boost 1", description: "Description 1", value: (x) => x.add(2), order: 1 };
            const b2: BoostsObjectInit = { id: "b2", name: "Boost 2", description: "Description 2", value: (x) => x.add(3), order: 2 };
            testBoost = new Boost(10, [b1, b2]);
            const boosts = testBoost.getBoosts("b2");
            assert.equal(boosts.length, 1);
            assert.equal(boosts[0].id, "b2");
            assert.equal(boosts[0].name, "Boost 2");
            assert.equal(boosts[0].description, "Description 2");
            assert(boosts[0].value(new Decimal(0)).equals(new Decimal(3)));
            assert.equal(boosts[0].order, 2);
        });

        it("should return an array of boost objects with the given ID and their indexes", () => {
            const b1: BoostsObjectInit = { id: "b1", name: "Boost 1", description: "Description 1", value: (x) => x.add(2), order: 1 };
            const b2: BoostsObjectInit = { id: "b2", name: "Boost 2", description: "Description 2", value: (x) => x.add(3), order: 2 };
            testBoost = new Boost(10, [b1, b2]);
            const [boosts, indexes] = testBoost.getBoosts("b2", true);
            assert.equal(boosts.length, 1);
            assert.equal(boosts[0].id, "b2");
            assert.equal(boosts[0].name, "Boost 2");
            assert.equal(boosts[0].description, "Description 2");
            assert(boosts[0].value(new Decimal(0)).equals(new Decimal(3)));
            assert.equal(boosts[0].order, 2);
            assert.equal(indexes.length, 1);
            assert.equal(indexes[0], 1);
        });

        it("should return an empty array if no boosts with the given ID are found", () => {
            const b1: BoostsObjectInit = { id: "b1", name: "Boost 1", description: "Description 1", value: (x) => x.add(2), order: 1 };
            const b2: BoostsObjectInit = { id: "b2", name: "Boost 2", description: "Description 2", value: (x) => x.add(3), order: 2 };
            testBoost = new Boost(10, [b1, b2]);
            const boosts = testBoost.getBoosts("nonexistent");
            assert.equal(boosts.length, 0);
        });
    });

    describe("getBoost", () => {
        it("should return the boost object with the given ID", () => {
            const b1: BoostsObjectInit = { id: "b1", name: "Boost 1", description: "Description 1", value: (x) => x.add(2), order: 1 };
            const b2: BoostsObjectInit = { id: "b2", name: "Boost 2", description: "Description 2", value: (x) => x.add(3), order: 2 };
            testBoost = new Boost(10, [b1, b2]);
            const boost = testBoost.getBoost("b2");
            assert.equal(boost?.id, "b2");
            assert.equal(boost?.name, "Boost 2");
            assert.equal(boost?.description, "Description 2");
            assert(boost?.value(new Decimal(0)).equals(new Decimal(3)));
            assert.equal(boost?.order, 2);
        });

        it("should return null if no boost with the given ID is found", () => {
            const b1: BoostsObjectInit = { id: "b1", name: "Boost 1", description: "Description 1", value: (x) => x.add(2), order: 1 };
            const b2: BoostsObjectInit = { id: "b2", name: "Boost 2", description: "Description 2", value: (x) => x.add(3), order: 2 };
            testBoost = new Boost(10, [b1, b2]);
            const boost = testBoost.getBoost("nonexistent");
            assert.equal(boost, null);
        });
    });

    describe("removeBoost", () => {
        it("should remove the boost with the given ID", () => {
            const b1: BoostsObjectInit = { id: "b1", name: "Boost 1", description: "Description 1", value: (x) => x.add(2), order: 1 };
            const b2: BoostsObjectInit = { id: "b2", name: "Boost 2", description: "Description 2", value: (x) => x.add(3), order: 2 };
            testBoost = new Boost(10, [b1, b2]);
            testBoost.removeBoost("b1");
            assert.equal(testBoost.boostArray.length, 1);
            assert.equal(testBoost.boostArray[0].id, "b2");
        });

        it("should not remove any boosts if no boost with the given ID is found", () => {
            const b1: BoostsObjectInit = { id: "b1", name: "Boost 1", description: "Description 1", value: (x) => x.add(2), order: 1 };
            const b2: BoostsObjectInit = { id: "b2", name: "Boost 2", description: "Description 2", value: (x) => x.add(3), order: 2 };
            testBoost = new Boost(10, [b1, b2]);
            testBoost.removeBoost("nonexistent");
            assert.equal(testBoost.boostArray.length, 2);
        });
    });

    describe("setBoost", () => {
        it("should add a new boost if it doesn't exist", () => {
            testBoost.setBoost("b1", "Boost 1", "Description 1", (x) => x.add(2), 1);
            assert.equal(testBoost.boostArray.length, 1);
            assert.equal(testBoost.boostArray[0].id, "b1");
            assert.equal(testBoost.boostArray[0].name, "Boost 1");
            assert.equal(testBoost.boostArray[0].description, "Description 1");
            assert(testBoost.boostArray[0].value(new Decimal(0)).equals(new Decimal(2)));
            assert.equal(testBoost.boostArray[0].order, 1);
        });

        it("should update an existing boost if it exists", () => {
            testBoost.setBoost("b1", "Boost 1", "Description 1", (x) => x.add(2), 1);
            testBoost.setBoost("b1", "Boost 1 Updated", "Description 1 Updated", (x) => x.add(3), 2);
            assert.equal(testBoost.boostArray.length, 1);
            assert.equal(testBoost.boostArray[0].id, "b1");
            assert.equal(testBoost.boostArray[0].name, "Boost 1 Updated");
            assert.equal(testBoost.boostArray[0].description, "Description 1 Updated");
            assert(testBoost.boostArray[0].value(new Decimal(0)).equals(new Decimal(3)));
            assert.equal(testBoost.boostArray[0].order, 2);
        });

        it("should add new boosts if they don't exist", () => {
            const b1: BoostsObjectInit = { id: "b1", name: "Boost 1", description: "Description 1", value: (x) => x.add(2), order: 1 };
            const b2: BoostsObjectInit = { id: "b2", name: "Boost 2", description: "Description 2", value: (x) => x.add(3), order: 2 };
            testBoost.setBoost([b1, b2]);
            assert.equal(testBoost.boostArray.length, 2);
            assert.equal(testBoost.boostArray[0].id, "b1");
            assert.equal(testBoost.boostArray[1].id, "b2");
        });

        it("should update existing boosts if they exist", () => {
            const b1: BoostsObjectInit = { id: "b1", name: "Boost 1", description: "Description 1", value: (x) => x.add(2), order: 1 };
            const b2: BoostsObjectInit = { id: "b2", name: "Boost 2", description: "Description 2", value: (x) => x.add(3), order: 2 };
            const b3: BoostsObjectInit = { id: "b1", name: "Boost 1 Updated", description: "Description 1 Updated", value: (x) => x.add(4), order: 3 };
            testBoost.setBoost([b1, b2, b3]);
            assert.equal(testBoost.boostArray.length, 2);
            assert.equal(testBoost.boostArray[0].id, "b1");
            assert.equal(testBoost.boostArray[0].name, "Boost 1 Updated");
            assert.equal(testBoost.boostArray[0].description, "Description 1 Updated");
            assert(testBoost.boostArray[0].value(new Decimal(0)).equals(new Decimal(4)));
            assert.equal(testBoost.boostArray[0].order, 3);
            assert.equal(testBoost.boostArray[1].id, "b2");
        });
    });

    describe("calculate", () => {
        it("should return the base effect if there are no boosts", () => {
            const result = testBoost.calculate(10);
            assert(result.eq(10));
        });

        it("should apply boosts in order of increasing order", () => {
            const b1 = { id: "b1", name: "Boost 1", description: "Description 1", value: (x) => x.add(2), order: 2 };
            const b2 = { id: "b2", name: "Boost 2", description: "Description 2", value: (x) => x.mul(3), order: 1 };
            const b3 = { id: "b3", name: "Boost 3", description: "Description 3", value: (x) => x.pow(2), order: 3 };
            testBoost = new Boost(1, [b1, b2, b3]);
            const result = testBoost.calculate();
            // assert(result.eq(25));
            assert.equal(result.round().toString(), "25");
        });
    });
});
