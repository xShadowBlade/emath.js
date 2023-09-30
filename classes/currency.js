const { E, eMath } = require("../eMath.js");
const { boostStatic } = require("./boost.js");

/**
 * Represents a currency in the game.
 *
 * @class
 */
currency = class {
    /**
    * Constructs a new currency object with an initial value of 0 and a boost.
    *
    * @constructor
    */
    constructor () {
        /**
         * The current value of the currency.
         * @type {Decimal}
         */
        this.value = E(0);

        /**
         * A boost object that affects the currency gain.
         * @type {Game.classes.boost}
         */
        // this.boost = new Game.classes.boost(1);

        /**
         * An array that represents upgrades and their levels.
         * @type {Array}
         */
        this.upgrades = [];
    }

    /**
     * The new currency value after applying the boost.
     * @type {Decimal}
     * @returns {Decimal}
     */
    gain () { 
        this.value = this.value.add(this.boost.calculate());
        return this.value;
    }

    addUpgrade (upgrades) {
        upgrades = upgrades.level ? { level: upgrades.level } : { level: E(1) } ;
        this.upgrades.push(upgrades);
        return upgrades;
    }
}

/**
 * Represents the backend for a currency in the game.
 *
 * @class
 */
currencyStatic = class {
    /**
    * Constructs the backend for a currency
    *
    * @constructor
    * @param {function} pointer - returns Game.classes.currency
    */
    constructor (pointer) {
        /**
         * An array that represents upgrades, their costs, and their effects.
         * @type {Array}
         */
        this.upgrades = [];

        /**
         * A function that returns the pointer of the data
         * @type {function}
         */
        this.pointer = pointer;
    
        /**
         * A boost object that affects the currency gain.
         * @type {boostStatic}
         */
        this.boost = new boostStatic(1);
    }

    /**
     * The new currency value after applying the boost.
     * @type {Decimal}
     * @returns {Decimal}
     */
    gain () { 
        this.pointer().value = this.pointer().value.add(this.boost.calculate());
        return this.value;
    }

    /**
    * Create new upgrades
    * 
    * @typedef {Object} CurrencyUpgrade
    * @property {string} [id] - id
    * @property {string} [name] - name
    * @property {Decimal} cost - The cost of the first upgrade
    * @property {function} costScaling - Scalar function for cost with param level
    * @property {Decimal} maxLevel - Max level
    * @property {function} [effect] - Function to call after the upgrade is bought with param upgrade.level and param context
    *
    * @param {Array<CurrencyUpgrade>} upgrades - An array of upgrade objects.
    * @param {boolean} [runEffectInstantly] - Whether to run the effect immediately
    * @example
    * const myCurrency = new currency([
    *     {
    *         cost: E(10), // The cost of the first upgrade
    *         
    *         // Additional properties specific to this upgrade
    *     },
    *     // Add more upgrades here...
    * ]);
    */
    addUpgrade (upgrades, runEffectInstantly = true) {
        for (let i = 0; i < upgrades.length; i++) {
            this.pointer().addUpgrade(upgrades[i]);
            upgrades[i].getLevel = () => this.pointer().upgrades[i].level;
            upgrades[i].setLevel = (n) => this.pointer().upgrades[i].level = this.pointer().upgrades[i].level.add(n);
            if (runEffectInstantly) upgrades[i].effect(upgrades.level);
        }
        this.upgrades = this.upgrades.concat(upgrades);
    }

    /**
     * Calculates the cost and how many upgrades you can buy
     * 
     * @param {*} id 
     * @param {*} target 
     * @returns {array} - [amount, cost]
     */
    calculateUpgrade(id, target) {
        // Binary Search
        /**
         * Finds the highest value of 'b' for which the sum of 'f(n)' from 0 to 'b' is less than or equal to 'a'.
         *
         * @param {function} f - The function 'f(n)' to calculate the sum.
         * @param {number} a - The target sum value to compare against.
         * @returns {number} - The highest 'b' value for which the sum is less than or equal to 'a'.
         */
        function findHighestB(f, a) {
            let left = E(0);
            let right = E(1);
            let highestB = E(0);
        
            // Find an upper bound for 'b' by exponentially increasing it
            while (calculateSum(f, right).lt(a)) {
                highestB = right;
                right = right.mul(2);
            }
        
            // Perform binary search within the estimated range
            while (left.lt(right)) {
                const mid = Decimal.floor((left.add(right)).div(2));
                const sum = calculateSum(f, mid);
        
                if (sum.lt(a)) {
                    left = mid.add(1);
                } else {
                    right = mid;
                }
            }
        
            return [left, calculateSum(f, left.sub(1))];
        }
        
        /**
         * Calculates the sum of 'f(n)' from 0 to 'b'.
         *
         * @param {function} f - The function 'f(n)' to calculate the sum.
         * @param {number} b - The upper limit for the sum.
         * @returns {number} - The calculated sum of 'f(n)'.
         */
        function calculateSum(f, b) {
            let sum = E();
            for (let n = E(0); n.lte(b); n = n.add(1)) {
                sum = sum.add(f(n));
            }
            return sum;
        }
        
        //Example
        // console.log(findHighestB((n) => n.mul(n), 100))

        // Implementation logic to find the upgrade based on ID or position
        let upgrade;
        if (typeof id == "number") {
            upgrade = this.upgrades[id];
        } else if (typeof id == "string") {
            for (let i = 0; i < this.upgrades.length; i++) {
                if (this.upgrades[i].id == id) {
                    upgrade = this.upgrades[i];
                    break;
                } else continue;
            }
        } else {
            return false;
        }

        // Assuming you have found the upgrade object, calculate the maximum affordable quantity
        return findHighestB((level) => upgrade.costScaling(upgrade.getLevel().add(level)), this.pointer().value);
    }

    /**
     * Buys an upgrade based on its ID or array position, 
     * if enough currency is available.
     *
     * @param {string|number} id - The ID or position of the upgrade to buy or upgrade. 
     * If a string is provided, it is treated as the upgrade's ID. If a number is provided, it is treated as the upgrade's array position (starting from 0).
     * @param {Decimal} target - The target level or quantity to reach for the upgrade. 
     * This represents how many upgrades to buy or upgrade.
     * 
     * @returns {boolean} Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
     *
     */
    buyUpgrade (id, target) {
        // Implementation logic to find the upgrade based on ID or position
        let upgrade;
        if (typeof id == "number") {
            upgrade = this.upgrades[id];
        } else if (typeof id == "string") {
            for (let i = 0; i < this.upgrades.length; i++) {
                if (this.upgrades[i].id === id) {
                    upgrade = this.upgrades[i];
                    break;
                }
            }
        } else {
            return false;
        }

        // Check if an upgrade object was found
        if (!upgrade) {
            return false;
        }

        // Assuming you have found the upgrade object, calculate the maximum affordable quantity
        const maxAffordableQuantity = this.calculateUpgrade(id, target);

        // Check if maxAffordableQuantity is a valid array
        if (!Array.isArray(maxAffordableQuantity) || maxAffordableQuantity.length !== 2) {
            return false;
        }

        // Check if there's enough currency to afford any upgrades
        if (!maxAffordableQuantity[0].lte(0)) {
            // Determine the actual quantity to purchase based on 'target' and 'maxLevel'
            target = upgrade.getLevel().add(target).lte(upgrade.maxLevel) ? target : upgrade.maxLevel.sub(upgrade.getLevel());

            // Check if the calculated quantity exceeds the affordable quantity
            const condition = maxAffordableQuantity[0].lte(target);

            // Update the affordable quantity and cost if needed
            maxAffordableQuantity[0] = condition ? maxAffordableQuantity[0] : target;
            maxAffordableQuantity[1] = condition ? maxAffordableQuantity[1] : calculateSum(upgrade.costScaling, target);

            // Deduct the cost from available currency and increase the upgrade level
            this.pointer().value = this.pointer().value.sub(maxAffordableQuantity[1]);
            upgrade.setLevel(upgrade.getLevel().add(maxAffordableQuantity[0]));

            // Call the effect function if it exists
            if (typeof upgrade.effect === "function") {
                upgrade.effect(upgrade.getLevel(), upgrade);
            }

            // Return true to indicate a successful purchase or upgrade
            return true;
        } else {
            // Return false if unable to afford any upgrades
            return false;
        }
    }
}

module.exports = { currency, currencyStatic }