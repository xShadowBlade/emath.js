import { E, boost, currency, currencyStatic, upgradeInit, upgradeStatic } from "../src/index";
import assert from "assert";

describe("currency", () => {
    let currencyObj: currency;

    beforeEach(() => {
        currencyObj = new currency();
    });

    it("should initialize with a value of 0", () => {
        assert.equal(currencyObj.value, E(0));
    });

    it("should initialize with an empty upgrades array", () => {
        assert.equal(currencyObj.upgrades, []);
    });

    it("should initialize with a boost object", () => {
        assert.ok(currencyObj.boost instanceof boost);
    });
});

describe("currencyStatic", () => {
    let currencyStaticObj: currencyStatic;

    beforeEach(() => {
        currencyStaticObj = new currencyStatic();
    });

    it("should initialize with an empty upgrades array", () => {
        assert.equal(currencyStaticObj.upgrades, []);
    });

    it("should initialize with a boost object", () => {
        assert.ok(currencyStaticObj.boost instanceof boost);
    });

    it("should set the default value and boost", () => {
        assert.equal(currencyStaticObj.value, E(0));
        assert.equal(currencyStaticObj.boost.calculate(), E(1));
    });

    it("should set the value", () => {
        currencyStaticObj.value = E(100);
        assert.equal(currencyStaticObj.value, E(100));
    });

    it("should reset the currency and upgrade levels", () => {
        currencyStaticObj.value = E(100);
        currencyStaticObj.addUpgrade({
            costScaling: (level: E) => E(10).mul(level),
            maxLevel: E(10),
            effect: () => console.log("effect"),
        });
        currencyStaticObj.buyUpgrade(0, E(5));

        currencyStaticObj.reset();

        assert.equal(currencyStaticObj.value, E(0));
        assert.equal(currencyStaticObj.upgrades[0].level, E(0));
    });

    it("should calculate the new currency value after applying the boost", () => {
        currencyStaticObj.value = E(100);

        const newValue = currencyStaticObj.gain(E(500_000));

        assert.equal(newValue, E(600));
        assert.equal(currencyStaticObj.value, E(600));
    });

    it("should add an upgrade to the upgrades array", () => {
        const upgrade: upgradeInit = {
            costScaling: (level: E) => E(10).mul(level),
            maxLevel: E(10),
            effect: () => console.log("effect"),
        };

        currencyStaticObj.addUpgrade(upgrade);

        assert.equal(currencyStaticObj.upgrades.length, 1);
        assert.ok(currencyStaticObj.upgrades[0].id !== undefined);
        assert.equal(currencyStaticObj.upgrades[0].level, E(1));
    });

    it("should get an upgrade by ID", () => {
        const upgrade: upgradeInit = {
            id: "upgrade1",
            costScaling: (level: E) => E(10).mul(level),
            maxLevel: E(10),
            effect: () => console.log("effect"),
        };

        currencyStaticObj.addUpgrade(upgrade);

        const retrievedUpgrade = currencyStaticObj.getUpgrade("upgrade1");

        assert.ok(retrievedUpgrade !== undefined);
        assert.equal(retrievedUpgrade?.id, "upgrade1");
    });

    it("should get an upgrade by array position", () => {
        const upgrade: upgradeInit = {
            costScaling: (level: E) => E(10).mul(level),
            maxLevel: E(10),
            effect: () => console.log("effect"),
        };

        currencyStaticObj.addUpgrade(upgrade);

        const retrievedUpgrade = currencyStaticObj.getUpgrade(0);

        assert.ok(retrievedUpgrade !== undefined);
        assert.ok(retrievedUpgrade?.id !== undefined);
    });

    it("should calculate the cost and quantity of upgrades that can be bought", () => {
        const upgrade: upgradeInit = {
            costScaling: (level: E) => E(10).mul(level),
            maxLevel: E(10),
            effect: () => console.log("effect"),
        };

        currencyStaticObj.addUpgrade(upgrade);

        const [quantity, cost] = currencyStaticObj.calculateUpgrade(0, E(50));

        assert.equal(quantity, E(5));
        assert.equal(cost, E(250));
    });

    it("should buy an upgrade if enough currency is available", () => {
        const upgrade: upgradeInit = {
            costScaling: (level: E) => E(10).mul(level),
            maxLevel: E(10),
            effect: () => console.log("effect"),
        };

        currencyStaticObj.addUpgrade(upgrade);

        const success = currencyStaticObj.buyUpgrade(0, E(5));

        assert.equal(success, true);
        assert.equal(currencyStaticObj.upgrades[0].level, E(5));
        assert.equal(currencyStaticObj.value, E(50));
    });

    it("should not buy an upgrade if not enough currency is available", () => {
        const upgrade: upgradeInit = {
            costScaling: (level: E) => E(10).mul(level),
            maxLevel: E(10),
            effect: () => console.log("effect"),
        };

        currencyStaticObj.addUpgrade(upgrade);

        const success = currencyStaticObj.buyUpgrade(0, E(100));

        assert.equal(success, false);
        assert.equal(currencyStaticObj.upgrades[0].level, E(0));
        assert.equal(currencyStaticObj.value, E(0));
    });
});
