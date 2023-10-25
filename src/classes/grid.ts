/**
 * Represents a grid cell with coordinates.
 * @class
 */
class gridCell {
    public x: number;
    public y: number;
    // eslint-disable-next-line no-undef
    [key: string]: any;
    /**
     * Initializes a new instance of the grid cell.
     * @constructor
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     */
    constructor (x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Sets the value of a property on the cell.
     * @param {string} name - The name of the property.
     * @param {any} value - The value to set.
     * @returns {any} - The set value.
     */
    public setValue (name: string, value: any): any {
        this[name] = value;
        return value;
    }

    /**
     * Calculates the distance from the cell to a specified point.
     * @param {number} x - The x-coordinate of the target point.
     * @param {number} y - The y-coordinate of the target point.
     * @returns {number} - The distance between the cell and the target point.
     */
    public getDistance (x: number, y: number): number {
        return Math.abs(Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)));
    }
}

/**
 * Represents a grid with cells.
 * @class
 */
class grid {
    public x_size: number;
    public y_size: number;
    /**
     * Represents the cells of the grid.
     * @type {gridCell[][]}
     */
    // eslint-disable-next-line no-undef
    [key: number]: gridCell[]; // Add this index signature
    /**
     * Initializes a new instance of the grid.
     * @constructor
     * @param {number} x_size - The size of the grid along the x-axis.
     * @param {number} y_size - The size of the grid along the y-axis.
     */
    constructor (x_size: number, y_size: number) {
        this.x_size = x_size;
        this.y_size = y_size;

        /**
         * Represents the cells of the grid.
         * @type {gridCell[][]}
         */
        for (let a = 0; a < y_size; a++) {
            this[a] = [];
            for (let b = 0; b < x_size; b++) {
                // iterates through every cell
                this[a][b] = new gridCell(b, a);
            }
        }
    }

    /**
     * Gets an array containing all cells in the grid.
     * @returns {gridCell[]} - An array of all cells.
     */
    public all (): gridCell[] {
        const output: gridCell[] = [];
        for (let a = 0; a < this.y_size; a++) {
            for (let b = 0; b < this.x_size; b++) {
                // iterates through every cell
                output.push(this[a][b]);
            }
        }
        return output;
    }

    /**
     * Gets an array containing all cells that have the same x coordinate.
     * @returns {gridCell[]} - An array of all cells.
     * @param {number} x - The x coordinate to check.
     */
    public allX (x: number): gridCell[] {
        const output: gridCell[] = [];
        for (let i = 0; i < this.y_size; i++) {
            output.push(this[i][x]);
        }
        return output;
    }

    /**
     * Gets an array containing all cells that have the same y coordinate.
     * @returns {gridCell[]} - An array of all cells.
     * @param {number} y - The y coordinate to check.
     */
    public allY (y: number): gridCell[] {
        const output: gridCell[] = [];
        for (let i = 0; this.x_size; i++) {
            output.push(this[y][i]);
        }
        return output;
    }

    /**
     * Gets a cell.
     * @returns {gridCell} - The cell.
     * @param {number} x - The x coordinate to check.
     * @param {number} y - The y coordinate to check.
     */
    public getCell (x: number, y: number): gridCell {
        return this[y][x];
    }

    /**
     * Gets an array containing all cells adjacent to a specific cell.
     * @returns {gridCell[]} - An array of all cells.
     * @param {number} x - The x coordinate to check.
     * @param {number} y - The y coordinate to check.
     */
    public getAdjacent (x: number, y: number): gridCell[] {
        const output: gridCell[] = [];
        output[0] = this.getCell(x, y + 1);
        output[1] = this.getCell(x + 1, y);
        output[2] = this.getCell(x, y - 1);
        output[3] = this.getCell(x - 1, y + 1);
        return output;
    }

    /**
     * Gets an array containing all cells diagonal from a specific cell.
     * @returns {gridCell[]} - An array of all cells.
     * @param {number} x - The x coordinate to check.
     * @param {number} y - The y coordinate to check.
     */
    public getDiagonal (x: number, y: number): gridCell[] {
        const output: gridCell[] = [];
        output[0] = this.getCell(x - 1, y + 1);
        output[1] = this.getCell(x + 1, y + 1);
        output[2] = this.getCell(x + 1, y - 1);
        output[3] = this.getCell(x - 1, y - 1);
        return output;
    }

    /**
     * Gets an array containing all cells that surround a cell.
     * @returns {gridCell[]} - An array of all cells.
     * @param {number} x - The x coordinate to check.
     * @param {number} y - The y coordinate to check.
     */
    public getEncircling (x: number, y: number): gridCell[] {
        return this.getAdjacent(x, y).concat(this.getDiagonal(x, y));
    }
}

/**
 * Exports the gridCell and grid classes.
 * @module
 */
export { gridCell, grid };
