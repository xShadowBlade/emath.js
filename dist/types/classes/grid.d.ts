/**
 * Represents a grid cell with coordinates and properties.
 * @class
 */
declare class gridCell {
    x: number;
    y: number;
    properties: any;
    /**
     * Initializes a new instance of the grid cell.
     * @constructor
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @param {any} [props] - The properties to initialize with.
     */
    constructor(x: number, y: number, props?: object);
    /**
     * Sets the value of a property on the cell.
     * @param {string} name - The name of the property.
     * @param {any} value - The value to set.
     * @returns {any} - The set value.
     */
    setValue(name: string, value: any): any;
    /**
     * Gets the value of a property on the cell.
     * @param {string} name - The name of the property.
     * @returns {any} - The value of the property.
     */
    getValue(name: string): any;
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
declare class grid {
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
     * @param {any} [starterProps] - The properties to initialize with.
     */
    constructor(x_size: number, y_size: number, starterProps?: object);
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
    /**
     * Calculates the distance between two points on the grid.
     * @param {number} x1 - The x-coordinate of the first point.
     * @param {number} y1 - The y-coordinate of the first point.
     * @param {number} x2 - The x-coordinate of the second point.
     * @param {number} y2 - The y-coordinate of the second point.
     * @returns {number} The distance between the two points.
     */
    static getDistance(x1: number, y1: number, x2: number, y2: number): number;
}
/**
 * Exports the gridCell and grid classes.
 * @module
 */
export { gridCell, grid };
