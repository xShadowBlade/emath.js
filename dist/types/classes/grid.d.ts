/**
 * Represents a grid cell with coordinates and properties.
 * @class
 */
declare class gridCell {
    x: number;
    y: number;
    properties: object;
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
    setValue(name: string, value: unknown): typeof value;
    /**
     * Gets the value of a property on the cell.
     * @param {string} name - The name of the property.
     * @returns {any} - The value of the property.
     */
    getValue(name: string): unknown;
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
    cells: gridCell[][];
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
    getAll(): gridCell[];
    /**
     * Returns an array of all grid cells.
     * @returns {gridCell[]} An array of all grid cells.
     * @deprecated Use getAll() instead.
     */
    all(): gridCell[];
    /**
     * Gets an array containing all cells in the grid.
     * @param {grid} grid - The grid to get the cells from.
     * @returns {gridCell[]} - An array of all cells.
     */
    static getAll(grid: grid): gridCell[];
    /**
     * Gets an array containing all cells that have the same x coordinate.
     * @returns {gridCell[]} - An array of all cells.
     * @param {number} x - The x coordinate to check.
     */
    getAllX(x: number): gridCell[];
    /**
     * Returns an array of all grid cells with the same x coordinate.
     * @returns {gridCell[]} An array of all grid cells with the same x coordinate.
     * @deprecated Use getAllX() instead.
     */
    allX(x: number): gridCell[];
    /**
     * Gets an array containing all cells that have the same x coordinate.
     * @param {grid} grid - The grid to get the cells from.
     * @returns {gridCell[]} - An array of all cells.
     * @param {number} x - The x coordinate to check.
     */
    static getAllX(grid: grid, x: number): gridCell[];
    /**
     * Gets an array containing all cells that have the same y coordinate.
     * @returns {gridCell[]} - An array of all cells.
     * @param {number} y - The y coordinate to check.
     */
    getAllY(y: number): gridCell[];
    /**
     * Returns an array of all grid cells with the same y coordinate.
     * @returns {gridCell[]} An array of all grid cells with the same y coordinate.
     * @deprecated Use allY() instead.
     */
    allY(y: number): gridCell[];
    /**
     * Gets an array containing all cells that have the same y coordinate.
     * @returns {gridCell[]} - An array of all cells.
     * @param {grid} grid - The grid to get the cells from.
     * @param {number} y - The y coordinate to check.
     */
    static getAllY(grid: grid, y: number): gridCell[];
    /**
     * Gets a cell.
     * @returns {gridCell} - The cell.
     * @param {number} x - The x coordinate to check.
     * @param {number} y - The y coordinate to check.
     */
    getCell(x: number, y: number): gridCell;
    /**
     * Gets a cell.
     * @returns {gridCell} - The cell.
     * @param {grid} grid - The grid to get the cell from.
     * @param {number} x - The x coordinate to check.
     * @param {number} y - The y coordinate to check.
     */
    static getCell(grid: grid, x: number, y: number): gridCell;
    /**
    * Sets the value of a cell in the grid.
    * @param {number} x The x-coordinate of the cell.
    * @param {number} y The y-coordinate of the cell.
    * @param {gridCell} value The value to set for the cell.
    */
    setCell(x: number, y: number, value: gridCell): void;
    /**
     * Gets a cell.
     * @returns {gridCell} - The cell.
     * @param {grid} grid - The grid to get the cell from.
     * @param {number} x - The x coordinate to check.
     * @param {number} y - The y coordinate to check.
     * @param {gridCell} value The value to set for the cell.
     */
    static setCell(grid: grid, x: number, y: number, value: gridCell): void;
    /**
     * Gets an array containing all cells adjacent to a specific cell.
     * @returns {gridCell[]} - An array of all cells.
     * @param {number} x - The x coordinate to check.
     * @param {number} y - The y coordinate to check.
     */
    getAdjacent(x: number, y: number): gridCell[];
    /**
     * Gets an array containing all cells adjacent to a specific cell.
     * @returns {gridCell[]} - An array of all cells.
     * @param {grid} grid - The grid to get the cells from.
     * @param {number} x - The x coordinate to check.
     * @param {number} y - The y coordinate to check.
     */
    static getAdjacent(grid: grid, x: number, y: number): gridCell[];
    /**
     * Gets an array containing all cells diagonal from a specific cell.
     * @returns {gridCell[]} - An array of all cells.
     * @param {number} x - The x coordinate to check.
     * @param {number} y - The y coordinate to check.
     */
    getDiagonal(x: number, y: number): gridCell[];
    /**
     * Gets an array containing all cells diagonal from a specific cell.
     * @returns {gridCell[]} - An array of all cells.
     * @param {grid} grid - The grid to get the cells from.
     * @param {number} x - The x coordinate to check.
     * @param {number} y - The y coordinate to check.
     */
    static getDiagonal(grid: grid, x: number, y: number): gridCell[];
    /**
     * Gets an array containing all cells that surround a cell.
     * @returns {gridCell[]} - An array of all cells.
     * @param {number} x - The x coordinate to check.
     * @param {number} y - The y coordinate to check.
     */
    getEncircling(x: number, y: number): gridCell[];
    /**
     * Gets an array containing all cells that surround a cell.
     * @returns {gridCell[]} - An array of all cells.
     * @param {grid} grid - The grid to get the cells from.
     * @param {number} x - The x coordinate to check.
     * @param {number} y - The y coordinate to check.
     */
    static getEncircling(grid: grid, x: number, y: number): gridCell[];
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
