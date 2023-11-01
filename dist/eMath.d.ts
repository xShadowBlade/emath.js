declare module "format" {
    /**
     * MIT License
     *
     * Copyright (c) 2023 MrRedShark77
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    import Decimal from "break_eternity.js";
    function toSubscript(value: number): string;
    function toSuperscript(value: number): string;
    function formatST(ex: number | Decimal | string, acc?: number, max?: number, type?: string): string;
    function format(ex: number | Decimal | string, acc?: number, max?: number, type?: string): string;
    function formatGain(amt: Decimal, gain: Decimal): string;
    function formatTime(ex: number | Decimal | string, acc?: number, type?: string): string;
    function formatReduction(ex: number | Decimal | string): string;
    function formatPercent(ex: number | Decimal | string): string;
    function formatMult(ex: number | Decimal | string, acc?: number): string;
    function expMult(a: number | Decimal | string, b: number | Decimal | string, base?: number): Decimal;
    function metric(num: number | Decimal | string, type: number): string;
    function ev(num: number | Decimal | string, c2?: boolean): string;
    const _default: {
        toSubscript: typeof toSubscript;
        toSuperscript: typeof toSuperscript;
        formatST: typeof formatST;
        format: typeof format;
        formatGain: typeof formatGain;
        formatTime: typeof formatTime;
        formatReduction: typeof formatReduction;
        formatPercent: typeof formatPercent;
        formatMult: typeof formatMult;
        expMult: typeof expMult;
        metric: typeof metric;
        ev: typeof ev;
        omega: {
            config: {
                greek: string;
                infinity: string;
            };
            format(value: Decimal): string;
        };
        omega_short: {
            config: {
                greek: string;
                infinity: string;
            };
            format(value: Decimal): string;
        };
        elemental: {
            config: {
                element_lists: string[][];
            };
            getOffset(group: number): number;
            getAbbreviation(group: number, progress: number): string;
            beyondOg(x: number): string;
            abbreviationLength(group: number): number;
            getAbbreviationAndValue(x: Decimal): (string | Decimal)[];
            formatElementalPart(abbreviation: string, n: Decimal): string;
            format(value: Decimal, acc: number): string;
        };
        old_sc: {
            format(ex: string | number | Decimal, acc: number): string;
        };
        eng: {
            format(ex: string | number | Decimal, acc: number): string;
        };
        mixed_sc: {
            format(ex: string | number | Decimal, acc: number, max: number): string;
        };
        layer: {
            layers: string[];
            format(ex: string | number | Decimal, acc: number, max: number): string;
        };
        standard: {
            tier1(x: number): string;
            tier2(x: number): string;
        };
        inf: {
            format(ex: string | number | Decimal, acc: number, max: number): string;
        };
    };
    export default _default;
}
declare module "eMath" {
    import Decimal from "break_eternity.js";
    const E: any;
    const eMath: {};
    type E = Decimal;
    export { eMath, E };
}
declare module "classes/boost" {
    import { E } from "eMath";
    /**
     * Represents a boost manager that applies various effects to a base value.
     *
     * @class
     * @param {number|E} baseEffect - The base effect value to which boosts are applied.
     * @param {...Object} boosts - An array of boost objects to initialize with.
     * @example
     * const myboost = new Game.classes.boost(100, {
     *   id: "reallyCoolboost124",
     *   name: "buff this",
     *   desc: "really cool lol",
     *   type: "add",
     *   value: E(124),
     * });
     */
    interface boostsObject {
        id: string;
        name: string;
        desc?: string;
        type: "add" | "mul" | "pow" | "tetr" | "pent";
        value: (input: E) => E;
        order?: number;
        index: number;
    }
    class boost {
        /**
         * An array of boost objects.
         * @type {boostsObject[]}
         */
        boostArray: boostsObject[];
        /**
         * The base effect value.
         * @type {E}
         */
        baseEffect: E;
        /**
         * Constructs a new boost manager.
         *
         * @constructor
         * @param {number} [baseEffect] - The base effect value to which boosts are applied.
         * @param {...boostsObject} boosts - An array of boost objects to initialize with.
         */
        constructor(baseEffect?: number | E, boosts?: boostsObject[]);
        /**
         * Gets a boost object by its ID.
         *
         * @param {string} id - The ID of the boost to retrieve.
         * @returns {boostsObject|null} The boost object if found, or null if not found.
         */
        bGet(id: string): boostsObject | null;
        /**
         * Removes a boost by its ID.
         *
         * @param {string} id - The ID of the boost to remove.
         */
        bRemove(id: string): void;
        /**
         * Sets or updates a boost with the given parameters.
         *
         * @param {string} id - The ID of the boost.
         * @param {string} name - The name of the boost.
         * @param {string} desc - The description of the boost.
         * @param {function} value - The value of the boost (function).
         * @param {number} order - The order of the boost (higher order are go first)
         */
        bSet(id: string, name: string, desc: string, type: "add" | "mul" | "pow" | "tetr" | "pent", value: () => E, order: number): void;
        /**
         * Sets or updates multiple boosts with advanced parameters.
         *
         * @param {...boostsObject} x - boost objects to set or update.
         */
        bSetAdvanced(...x: boostsObject[]): void;
        /**
         * Calculates the cumulative effect of all boosts on the base effect.
         *
         * @param {number|E} [base=this.baseEffect] - The base effect value to calculate with.
         * @returns {E} The calculated effect after applying boosts.
         */
        calculate(base?: number | E): E;
    }
    export { boost };
}
declare module "classes/currency" {
    import { E } from "eMath";
    import { boost } from "classes/boost";
    /**
     * Upgrades
     *
     * @property {string} [id] - id
     * @property {string} [name] - name
     * @property {E} cost - The cost of the first upgrade (deprecated)
     * @property {function} costScaling - Scalar function for cost with param level
     * @property {E} [maxLevel] - Max level
     * @property {function} [effect] - Function to call after the upgrade is bought with param upgrade.level and param context
     */
    interface upgradeInit {
        id?: string | number;
        name?: string;
        cost?: E;
        costScaling: (input: E) => E;
        maxLevel: E;
        effect: (level?: E, context?: any) => any;
        level?: E;
    }
    interface upgrade extends upgradeInit {
        getLevel: () => E;
        setLevel: (n: E) => void;
        level: E;
    }
    /**
     * Represents the frontend READONLY for a currency. (unless you want to hack in currency or smth)
     *
     * @class
     */
    class currency {
        /**
         * The current value of the currency.
         * @type {E}
         */
        value: E;
        /**
         * An array that represents upgrades and their levels.
         * @type {Array}
         */
        upgrades: upgrade[];
        /**
         * Constructs a new currency object with an initial value of 0 and a boost.
         *
         * @constructor
         */
        constructor();
    }
    /**
     * Represents the backend for a currency in the game.
     *
     * @class
     */
    class currencyStatic {
        /**
         * An array that represents upgrades, their costs, and their effects.
         * @type {Array}
         */
        upgrades: upgrade[];
        /**
         * A function that returns the pointer of the data
         * @type {function}
         */
        pointer: () => currency;
        /**
         * A boost object that affects the currency gain.
         * @type {boost}
         */
        boost: boost;
        /**
         * @constructor
         * @param {function} pointer - returns Game.classes.currency
         */
        constructor(pointer: () => currency);
        /**
         * The new currency value after applying the boost.
         * @type {E}
         * @param {number|E} [dt=1000] Deltatime
         * @returns {E}
         */
        gain(dt?: number | E): E;
        /**
         * Create new upgrades
         *
         * @typedef {Object} currencyUpgrade
         * @property {string} [id] - id
         * @property {string} [name] - name
         * @property {E} cost - The cost of the first upgrade
         * @property {function} costScaling - Scalar function for cost with param level
         * @property {E} maxLevel - Max level
         * @property {function} [effect] - Function to call after the upgrade is bought with param upgrade.level and param context
         *
         * @param {Array<currencyUpgrade>} upgrades - An array of upgrade objects.
         * @param {boolean} [runEffectInstantly] - Whether to run the effect immediately
         */
        addUpgrade(upgrades: upgradeInit[], runEffectInstantly?: boolean): void;
        /**
         * Calculates the cost and how many upgrades you can buy
         *
         * @param {*} id
         * @param {*} target
         * @param {boolean} [el=false] - ie Endless: Flag to exclude the sum calculation and only perform binary search.
         * @returns {array} - [amount, cost]
         */
        calculateUpgrade(id: string | number, target: E, el?: boolean): [E, E] | E | Boolean;
        /**
         * Buys an upgrade based on its ID or array position,
         * if enough currency is available.
         *
         * @param {string|number} id - The ID or position of the upgrade to buy or upgrade.
         * If a string is provided, it is treated as the upgrade's ID. If a number is provided, it is treated as the upgrade's array position (starting from 0).
         * @param {E} target - The target level or quantity to reach for the upgrade.
         * This represents how many upgrades to buy or upgrade.
         *
         * @returns {boolean} Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
         *
         */
        buyUpgrade(id: string | number, target: E): boolean;
    }
    export { currency, currencyStatic };
}
declare module "classes/attribute" {
    import { E } from "eMath";
    import { boost } from "classes/boost";
    /**
     * Represents a static attribute in the game.
     *
     * @class
     */
    class attribute {
        /**
         * The inital value of the attribute.
         * @type {E}
         */
        initial: E | number;
        /**
         * The current value of the attribute.
         * @type {E}
         */
        value: E;
        /**
         * A boost object that affects the attribute.
         * @type {boost}
         */
        boost: boost;
        /**
         * Constructs a static attribute with an initial effect.
         *
         * @constructor
         * @param {E|Number} initial - The inital value of the attribute.
         */
        constructor(initial: E | number);
        /**
         * Updates the value of the attribute based on the provided effect function and initial value.
         *
         * @param {function} effect - The effect function to apply to the attribute.
         * @returns {E} The updated value of the attribute after applying the effect.
         */
        update(effect: Function): E;
    }
    export { attribute };
}
declare module "classes/grid" {
    /**
     * Represents a grid cell with coordinates.
     * @class
     */
    class gridCell {
        x: number;
        y: number;
        [key: string]: any;
        /**
         * Initializes a new instance of the grid cell.
         * @constructor
         * @param {number} x - The x-coordinate.
         * @param {number} y - The y-coordinate.
         */
        constructor(x: number, y: number);
        /**
         * Sets the value of a property on the cell.
         * @param {string} name - The name of the property.
         * @param {any} value - The value to set.
         * @returns {any} - The set value.
         */
        setValue(name: string, value: any): any;
        /**
         * Calculates the distance from the cell to a specified point.
         * @param {number} x - The x-coordinate of the target point.
         * @param {number} y - The y-coordinate of the target point.
         * @returns {number} - The distance between the cell and the target point.
         */
        getDistance(x: number, y: number): number;
    }
    /**
     * Represents a grid with cells.
     * @class
     */
    class grid {
        x_size: number;
        y_size: number;
        /**
         * Represents the cells of the grid.
         * @type {gridCell[][]}
         */
        [key: number]: gridCell[];
        /**
         * Initializes a new instance of the grid.
         * @constructor
         * @param {number} x_size - The size of the grid along the x-axis.
         * @param {number} y_size - The size of the grid along the y-axis.
         */
        constructor(x_size: number, y_size: number);
        /**
         * Gets an array containing all cells in the grid.
         * @returns {gridCell[]} - An array of all cells.
         */
        all(): gridCell[];
        /**
         * Gets an array containing all cells that have the same x coordinate.
         * @returns {gridCell[]} - An array of all cells.
         * @param {number} x - The x coordinate to check.
         */
        allX(x: number): gridCell[];
        /**
         * Gets an array containing all cells that have the same y coordinate.
         * @returns {gridCell[]} - An array of all cells.
         * @param {number} y - The y coordinate to check.
         */
        allY(y: number): gridCell[];
        /**
         * Gets a cell.
         * @returns {gridCell} - The cell.
         * @param {number} x - The x coordinate to check.
         * @param {number} y - The y coordinate to check.
         */
        getCell(x: number, y: number): gridCell;
        /**
         * Gets an array containing all cells adjacent to a specific cell.
         * @returns {gridCell[]} - An array of all cells.
         * @param {number} x - The x coordinate to check.
         * @param {number} y - The y coordinate to check.
         */
        getAdjacent(x: number, y: number): gridCell[];
        /**
         * Gets an array containing all cells diagonal from a specific cell.
         * @returns {gridCell[]} - An array of all cells.
         * @param {number} x - The x coordinate to check.
         * @param {number} y - The y coordinate to check.
         */
        getDiagonal(x: number, y: number): gridCell[];
        /**
         * Gets an array containing all cells that surround a cell.
         * @returns {gridCell[]} - An array of all cells.
         * @param {number} x - The x coordinate to check.
         * @param {number} y - The y coordinate to check.
         */
        getEncircling(x: number, y: number): gridCell[];
    }
    /**
     * Exports the gridCell and grid classes.
     * @module
     */
    export { gridCell, grid };
}
declare module "index" {
    import { boost } from "classes/boost";
    import { currency, currencyStatic } from "classes/currency";
    import { attribute } from "classes/attribute";
    import { grid } from "classes/grid";
    const eMath: {
        E: any;
        classes: {
            boost: typeof boost;
            currency: typeof currency;
            currencyStatic: typeof currencyStatic;
            attribute: typeof attribute;
            grid: typeof grid;
        };
    };
    export default eMath;
}
