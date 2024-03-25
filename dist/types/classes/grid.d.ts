/**
 * @file Declares the gridCell and grid classes.
 */
import type { UnknownObject } from "../game/managers/dataManager";
/** Represents a grid cell with coordinates and properties. */
declare class GridCell {
    x: number;
    y: number;
    properties: UnknownObject;
    /**
     * Initializes a new instance of the grid cell.
     * @param x - The x-coordinate.
     * @param y - The y-coordinate.
     * @param props - The properties to initialize with.
     */
    constructor(x: number, y: number, props?: UnknownObject);
    /**
     * Sets the value of a property on the cell.
     * @param name - The name of the property.
     * @param value - The value to set.
     * @returns The set value.
     */
    setValue(name: string, value: unknown): typeof value;
    /**
     * Gets the value of a property on the cell.
     * @param name - The name of the property.
     * @returns - The value of the property.
     */
    getValue(name: string): unknown;
}
/**
 * Represents a grid with cells.
 */
declare class Grid {
    xSize: number;
    ySize: number;
    /**
     * Represents the cells of the grid.
     */
    cells: GridCell[][];
    /**
     * Initializes a new instance of the grid.
     * @param x_size - The size of the grid along the x-axis.
     * @param y_size - The size of the grid along the y-axis.
     * @param starterProps - The properties to initialize with.
     */
    constructor(x_size: number, y_size: number, starterProps?: UnknownObject);
    /**
     * Gets an array containing all cells in the grid.
     * @returns - An array of all cells.
     */
    getAll(): GridCell[];
    /**
     * Returns an array of all grid cells.
     * @returns An array of all grid cells.
     * @deprecated Use getAll() instead.
     */
    all(): GridCell[];
    /**
     * Gets an array containing all cells that have the same x coordinate.
     * @returns - An array of all cells.
     * @param x - The x coordinate to check.
     */
    getAllX(x: number): GridCell[];
    /**
     * Returns an array of all grid cells with the same x coordinate.
     * @param x The x coordinate to check.
     * @returns An array of all grid cells with the same x coordinate.
     * @deprecated Use getAllX() instead.
     */
    allX(x: number): GridCell[];
    /**
     * Gets an array containing all cells that have the same y coordinate.
     * @returns - An array of all cells.
     * @param y - The y coordinate to check.
     */
    getAllY(y: number): GridCell[];
    /**
     * Returns an array of all grid cells with the same y coordinate.
     * @param y The y coordinate to check.
     * @returns An array of all grid cells with the same y coordinate.
     * @deprecated Use allY() instead.
     */
    allY(y: number): GridCell[];
    /**
     * Gets a cell.
     * @returns - The cell.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     */
    getCell(x: number, y: number): GridCell;
    /**
     * Sets the value of a cell in the grid.
     * @param x The x-coordinate of the cell.
     * @param y The y-coordinate of the cell.
     * @param value The value to set for the cell.
     */
    setCell(x: number, y: number, value: GridCell): void;
    /**
     * Gets an array containing all cells adjacent to a specific cell.
     * @returns - An array of all cells.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     */
    getAdjacent(x: number, y: number): GridCell[];
    /**
     * Gets an array containing all cells diagonal from a specific cell.
     * @returns - An array of all cells.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     */
    getDiagonal(x: number, y: number): GridCell[];
    /**
     * Gets an array containing all cells that surround a cell.
     * @returns - An array of all cells.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     */
    getEncircling(x: number, y: number): GridCell[];
    /**
     * Calculates the distance between two points on the grid.
     * @deprecated Use your own distance function instead.
     * @param x1 - The x-coordinate of the first point.
     * @param y1 - The y-coordinate of the first point.
     * @param x2 - The x-coordinate of the second point.
     * @param y2 - The y-coordinate of the second point.
     * @returns The distance between the two points.
     */
    static getDistance(x1: number, y1: number, x2: number, y2: number): number;
}
export { GridCell, Grid };
