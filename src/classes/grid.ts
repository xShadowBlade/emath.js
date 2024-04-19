/**
 * @file Declares the gridCell and grid classes.
 */

import type { UnknownObject } from "../game/managers/dataManager";

/** Represents a grid cell with coordinates and properties. */
class GridCell {
    public x: number;
    public y: number;
    public properties: UnknownObject;
    /**
     * Initializes a new instance of the grid cell.
     * @param x - The x-coordinate.
     * @param y - The y-coordinate.
     * @param props - The properties to initialize with.
     */
    constructor (x: number, y: number, props?: UnknownObject) {
        this.x = x;
        this.y = y;
        this.properties = props ? props : {};
    }

    /**
     * Sets the value of a property on the cell.
     * @param name - The name of the property.
     * @param value - The value to set.
     * @returns The set value.
     */
    public setValue (name: string, value: unknown): typeof value {
        this.properties[name] = value;
        return value;
    }

    /**
     * Gets the value of a property on the cell.
     * @param name - The name of the property.
     * @returns - The value of the property.
     */
    public getValue (name: string): unknown {
        return this.properties[name];
    }
}

/**
 * Represents a grid with cells.
 */
class Grid {
    public xSize: number;
    public ySize: number;
    /**
     * Represents the cells of the grid.
     */
    public cells: GridCell[][]; // Add this index signature
    /**
     * Initializes a new instance of the grid.
     * @param x_size - The size of the grid along the x-axis.
     * @param y_size - The size of the grid along the y-axis.
     * @param starterProps - The properties to initialize with.
     */
    constructor (x_size: number, y_size: number, starterProps?: UnknownObject) {
        this.xSize = x_size;
        this.ySize = y_size;
        this.cells = [];

        for (let a = 0; a < y_size; a++) {
            this.cells[a] = [];
            for (let b = 0; b < x_size; b++) {
                // iterates through every cell
                this.cells[a][b] = new GridCell(b, a, starterProps);
            }
        }
    }

    /**
     * Gets an array containing all cells in the grid.
     * @returns - An array of all cells.
     */
    public getAll (): GridCell[] {
        const output: GridCell[] = [];
        for (let a = 0; a < this.ySize; a++) {
            for (let b = 0; b < this.xSize; b++) {
                // iterates through every cell
                output.push(this.cells[a][b]);
            }
        }
        return output;
    }
    /**
     * Returns an array of all grid cells.
     * @returns An array of all grid cells.
     * @deprecated Use getAll() instead.
     */
    public all (): GridCell[] {
        return this.getAll();
    }

    /**
     * Gets an array containing all cells that have the same x coordinate.
     * @returns - An array of all cells.
     * @param x - The x coordinate to check.
     */
    public getAllX (x: number): GridCell[] {
        const output: GridCell[] = [];
        for (let i = 0; i < this.ySize; i++) {
            output.push(this.cells[i][x]);
        }
        return output;
    }
    /**
     * Returns an array of all grid cells with the same x coordinate.
     * @param x The x coordinate to check.
     * @returns An array of all grid cells with the same x coordinate.
     * @deprecated Use getAllX() instead.
     */
    public allX (x: number): GridCell[] {
        return this.getAllX(x);
    }

    /**
     * Gets an array containing all cells that have the same y coordinate.
     * @returns - An array of all cells.
     * @param y - The y coordinate to check.
     */
    public getAllY (y: number): GridCell[] {
        return this.cells[y];
    }
    /**
     * Returns an array of all grid cells with the same y coordinate.
     * @param y The y coordinate to check.
     * @returns An array of all grid cells with the same y coordinate.
     * @deprecated Use allY() instead.
     */
    public allY (y: number): GridCell[] {
        return this.getAllY(y);
    }

    /**
     * Gets a cell.
     * @returns - The cell.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     */
    public getCell (x: number, y: number): GridCell {
        return this.cells[y][x];
    }

    /**
     * Sets the value of a cell in the grid.
     * @param x The x-coordinate of the cell.
     * @param y The y-coordinate of the cell.
     * @param value The value to set for the cell.
     */
    public setCell (x: number, y: number, value: GridCell): void {
        this.cells[y][x] = value;
    }

    /**
     * Gets an array containing all cells adjacent to a specific cell.
     * @returns - An array of all cells.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     */
    public getAdjacent (x: number, y: number): GridCell[] {
        const output: GridCell[] = [];
        output[0] = this.getCell(x, y + 1);
        output[1] = this.getCell(x + 1, y);
        output[2] = this.getCell(x, y - 1);
        output[3] = this.getCell(x - 1, y + 1);
        return output;
    }

    /**
     * Gets an array containing all cells diagonal from a specific cell.
     * @returns - An array of all cells.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     */
    public getDiagonal (x: number, y: number): GridCell[] {
        const output: GridCell[] = [];
        output[0] = this.getCell(x - 1, y + 1);
        output[1] = this.getCell(x + 1, y + 1);
        output[2] = this.getCell(x + 1, y - 1);
        output[3] = this.getCell(x - 1, y - 1);
        return output;
    }

    /**
     * Gets an array containing all cells that surround a cell.
     * @returns - An array of all cells.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     */
    public getEncircling (x: number, y: number): GridCell[] {
        return this.getAdjacent(x, y).concat(this.getDiagonal(x, y));
    }

    /**
     * Calculates the distance between two points on the grid.
     * @deprecated Use your own distance function instead.
     * @param x1 - The x-coordinate of the first point.
     * @param y1 - The y-coordinate of the first point.
     * @param x2 - The x-coordinate of the second point.
     * @param y2 - The y-coordinate of the second point.
     * @returns The distance between the two points.
     */
    public static getDistance (x1: number, y1: number, x2: number, y2: number): number {
        return Math.abs(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
    }
}
export { GridCell, Grid };