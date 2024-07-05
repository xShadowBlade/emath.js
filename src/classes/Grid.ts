/**
 * @file Declares the gridCell and grid classes.
 */
import type { UnknownObject } from "../common/types";

type DirectionCollection = "adjacent" | "diagonal" | "encircling";
type Directions = "up" | "right" | "down" | "left" | DirectionCollection;

/**
 * Represents a grid cell with coordinates and properties.
 * @template P - The type of the properties of the grid cell.
 */
class GridCell<P extends object = UnknownObject> {
    /** The x-coordinate of the cell. */
    public x: number;

    /** The y-coordinate of the cell. */
    public y: number;

    /** The grid instance the cell belongs to. */
    private gridSymbol: symbol;

    /** The properties of the cell. */
    public properties: P;

    /**
     * Initializes a new instance of the grid cell.
     * @param x - The x-coordinate.
     * @param y - The y-coordinate.
     * @param props - The properties to initialize with.
     * @param gridSymbol - The symbol of the grid the cell belongs to.
     */
    constructor (x: number, y: number, props: P | ((grid: GridCell<P>) => P) = {} as P, gridSymbol: symbol) {
        this.x = x;
        this.y = y;

        // Object destructuring to prevent reference sharing
        this.properties = typeof props === "function" ? { ...props(this) } : { ...props };
        this.gridSymbol = gridSymbol;
    }

    /**
     * Sets the value of a property on the cell.
     * @param name - The name of the property.
     * @param value - The value to set.
     * @returns The set value.
     */
    public set (name: keyof P, value: P[keyof P]): typeof value {
        this.properties[name] = value;
        return value;
    }
    /** @deprecated Use {@link set} instead. */
    public setValue = this.set.bind(this);

    /**
     * Gets the value of a property on the cell.
     * @param name - The name of the property.
     * @returns - The value of the property.
     */
    public get (name: keyof P): P[keyof P] {
        return this.properties[name];
    }
    /** @deprecated Use {@link get} instead. */
    public getValue = this.get.bind(this);

    // Directions

    /**
     * Gets the cell a specified distance away from the current cell.
     * @param x - The x distance to move
     * @param y - The y distance to move
     * @returns The translated cell
     */
    public translate (x = 0, y = 0): GridCell<P> {
        return Grid.getInstance<P>(this.gridSymbol).getCell(this.x + x, this.y + y);
    }

    /**
     * Gets the cell in a specific direction from the current cell.
     * @param direction - The direction to move.
     * @param distance - The distance to move. Defaults to 1.
     * @param fill - Whether to fill the cells. Defaults to `false`.
     * @returns - The cell in the specified direction.
     */
    public direction<D extends Directions> (direction: D, distance = 1, fill?: boolean): D extends DirectionCollection ? GridCellCollection<P> : GridCell<P> {
        const grid = Grid.getInstance(this.gridSymbol);

        const out: GridCell | GridCellCollection = ((): typeof out => {
            switch (direction) {
                case "up":
                    return grid.getCell(this.x, this.y - distance);
                case "right":
                    return grid.getCell(this.x + distance, this.y);
                case "down":
                    return grid.getCell(this.x, this.y + distance);
                case "left":
                    return grid.getCell(this.x - distance, this.y);
                case "adjacent":
                    return grid.getAdjacent(this.x, this.y, distance, fill);
                case "diagonal":
                    return grid.getDiagonal(this.x, this.y, distance, fill);
                case "encircling":
                    return grid.getEncircling(this.x, this.y, distance, fill);
                default:
                    throw new Error("Invalid direction");
            }
        })();

        return out as D extends DirectionCollection ? GridCellCollection<P> : GridCell<P>;
    }

    /**
     * Gets the cell to the right of the current cell. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cell to the right.
     */
    public up (distance = 1): GridCell<P> {
        return this.direction("up", distance);
    }

    /**
     * Gets the cell to the right of the current cell. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cell to the right.
     */
    public right (distance = 1): GridCell<P> {
        return this.direction("right", distance);
    }

    /**
     * Gets the cell below the current cell. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cell below.
     */
    public down (distance = 1): GridCell<P> {
        return this.direction("down", distance);
    }

    /**
     * Gets the cell to the left of the current cell. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cell to the left.
     */
    public left (distance = 1): GridCell<P> {
        return this.direction("left", distance);
    }
}

/**
 * Represents a collection of grid cells.
 * @template P - The type of the properties of the grid cells.
 */
class GridCellCollection<P extends object = UnknownObject> extends Array<GridCell<P>> {
    /**
     * Initializes a new instance of the grid cell collection.
     * @param cells - The cells to initialize with.
     */
    constructor (cells: GridCell<P> | GridCell<P>[]) {
        // Normalize the input to an array of cells
        cells = Array.isArray(cells) ? cells : [cells];

        // Call the parent constructor with the cells
        super(...cells);

        // Remove duplicates
        this.removeDuplicates();
    }

    /**
     * Removes duplicate cells from the collection.
     * Modifies the array in place.
     */
    public removeDuplicates (): void {
        // Modify the array in place
        const duplicatedIndexes: number[] = [];

        // Iterate through each cell
        this.forEach((cell, index) => {
            // Check if the cell is duplicated
            if (this.indexOf(cell) !== index) duplicatedIndexes.push(index);
        });

        // Remove the duplicates
        duplicatedIndexes.forEach(index => this.splice(index, 1));
    }

    // Directions

    /**
     * Gets the cells a specified distance away from the current cell.
     * @param x - The x distance to move
     * @param y - The y distance to move
     * @returns The translated cells
     */
    public translate (x = 0, y = 0): GridCellCollection<P> {
        return new GridCellCollection(this.map(cell => cell.translate(x, y)));
    }

    /**
     * Gets the cells in a specific direction from the current cells.
     * @param direction - The direction to move.
     * @param distance - The distance to move. Defaults to 1.
     * @param fill - Whether to fill the cells. Defaults to `false`.
     * @returns - The cells in the specified direction.
     */
    public direction (direction: Directions, distance?: number, fill?: boolean): GridCellCollection<P> {
        return new GridCellCollection(this.flatMap(cell => cell.direction(direction, distance, fill)));
    }

    /**
     * Gets the cells above the current cells. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cells above.
     */
    public up (distance?: number): GridCellCollection<P> {
        return this.direction("up", distance);
    }

    /**
     * Gets the cells to the right of the current cells. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cells to the right.
     */
    public right (distance?: number): GridCellCollection<P> {
        return this.direction("right", distance);
    }

    /**
     * Gets the cells below the current cells. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cells below.
     */
    public down (distance?: number): GridCellCollection<P> {
        return this.direction("down", distance);
    }

    /**
     * Gets the cells to the left of the current cells. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cells to the left.
     */
    public left (distance?: number): GridCellCollection<P> {
        return this.direction("left", distance);
    }

    // Other direction

    /**
     * Gets the cells adjacent to the current cells. Can be chained.
     * Note: Can be slow with large collections.
     * @param distance - The distance to move. Defaults to 1.
     * @param fill - Whether to fill the cells. Defaults to `false`.
     * @returns - The cells adjacent.
     */
    public adjacent (distance?: number, fill?: boolean): GridCellCollection<P> {
        return this.direction("adjacent", distance, fill);
    }

    /**
     * Gets the cells diagonally from the current cells. Can be chained.
     * Note: Can be slow with large collections.
     * @param distance - The distance to move. Defaults to 1.
     * @param fill - Whether to fill the cells. Defaults to `false`.
     * @returns - The cells diagonally.
     */
    public diagonal (distance?: number, fill?: boolean): GridCellCollection<P> {
        return this.direction("diagonal", distance, fill);
    }

    /**
     * Gets the cells encircling the current cells. Can be chained.
     * Note: Can be slow with large collections.
     * @param distance - The distance to move. Defaults to 1.
     * @param fill - Whether to fill the cells. Defaults to `false`.
     * @returns - The cells encircling.
     */
    public encircling (distance?: number, fill?: boolean): GridCellCollection<P> {
        return this.direction("encircling", distance, fill);
    }
}

/**
 * Represents a grid with cells.
 * @template P - The type of the properties of the grid cells.
 */
class Grid<P extends object = UnknownObject> {
    /** A map of grid instances. */
    // private static instances = new Map<symbol, Grid>();
    private static instances: Record<symbol, Grid> = {};

    /**
     * Gets the grid instance with the specified key.
     * @param key - The key of the grid instance.
     * @returns - The grid instance.
     */
    public static getInstance<T extends object = UnknownObject> (key: symbol): Grid<T> {
        return Grid.instances[key] as Grid<T>;
    }

    /** The size of the grid along the x-axis. */
    public xSize: number;

    /** The size of the grid along the x-axis. */
    public ySize: number;

    /** Represents the cells of the grid. */
    public cells: GridCell<P>[][] = [];

    /** A symbol to store the grid instance. */
    private gridSymbol = Symbol();

    /**
     * Initializes a new instance of the grid.
     * @param xSize - The size of the grid along the x-axis.
     * @param ySize - The size of the grid along the y-axis. Defaults to `xSize`.
     * @param starterProps - The properties to initialize with.
     */
    constructor (xSize: number, ySize?: number, starterProps?: P | ((grid: GridCell<P>) => P)) {
        // @ts-expect-error - Generic class type
        Grid.instances[this.gridSymbol] = this;

        this.xSize = xSize;
        this.ySize = ySize ?? xSize;

        for (let a = 0; a < this.ySize; a++) {
            this.cells[a] = [];
            for (let b = 0; b < this.xSize; b++) {
                // iterates through every cell
                this.cells[a][b] = new GridCell(b, a, starterProps, this.gridSymbol);
            }
        }
    }

    /**
     * Gets an array containing all cells in the grid.
     * @returns - An array of all cells.
     */
    public getAll (): GridCellCollection<P> {
        return new GridCellCollection(this.cells.flat());
    }
    /** @deprecated Use {@link getAll} instead. */
    public all = this.getAll.bind(this);

    /**
     * Gets an array containing all cells that have the same x coordinate.
     * @returns - An array of all cells.
     * @param x - The x coordinate to check.
     */
    public getAllX (x: number): GridCellCollection<P> {
        const output: GridCell<P>[] = [];
        for (let i = 0; i < this.ySize; i++) {
            output.push(this.cells[i][x]);
        }
        return new GridCellCollection(output);
    }
    /** @deprecated Use {@link getAllX} instead. */
    public allX = this.getAllX.bind(this);

    /**
     * Gets an array containing all cells that have the same y coordinate.
     * @returns - An array of all cells.
     * @param y - The y coordinate to check.
     */
    public getAllY (y: number): GridCellCollection<P> {
        return new GridCellCollection(this.cells[y]);
    }
    /** @deprecated Use {@link getAllY} instead. */
    public allY = this.getAllY.bind(this);

    /**
     * Gets a cell.
     * @returns - The cell.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     * @param overflow - Whether to allow overflow. Defaults to `true`.
     */
    public getCell (x: number, y: number, overflow = true): GridCell<P> {
        x = overflow ? (x + this.xSize) % this.xSize : x;
        y = overflow ? (y + this.ySize) % this.ySize : y;

        const out = this.cells[y][x];
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!out) throw new Error(`Grid: Invalid cell coordinates: (${x}, ${y})`);
        return out;
    }
    /** @deprecated Use {@link getCell} instead. */
    public get = this.getCell.bind(this);

    /**
     * Sets the value of a cell in the grid.
     * @param x The x-coordinate of the cell.
     * @param y The y-coordinate of the cell.
     * @param value The value to set for the cell.
     */
    public setCell (x: number, y: number, value: GridCell<P>): void {
        this.cells[y][x] = value;
    }
    /** @deprecated Use {@link setCell} instead. */
    public set = this.setCell.bind(this);

    /**
     * Gets an array containing all cells orthagonally adjacent to a specific cell.
     * @returns - An array of all cells.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     * @param distance - The distance to check. Defaults to 1.
     * @param fill - Whether to fill the adjacent cells. Defaults to `false`.
     */
    public getAdjacent (x: number, y: number, distance = 1, fill = false): GridCellCollection<P> {
        // If the distance is 1, return the adjacent cells
        if (distance === 1) {
            return new GridCellCollection([
                this.getCell(x, y + 1),
                this.getCell(x + 1, y),
                this.getCell(x, y - 1),
                this.getCell(x - 1, y),
            ]);
        }

        // If the fill is false, return the adjacent cells at the distance
        if (!fill) {
            return new GridCellCollection([
                this.getCell(x, y + distance),
                this.getCell(x + distance, y),
                this.getCell(x, y - distance),
                this.getCell(x - distance, y),
            ]);
        }

        const output: GridCell<P>[] = [this.getCell(x, y)];

        // Iterate through the distance
        for (let i = 1; i <= distance; i++) {
            output.push(this.getCell(x, y + i));
            output.push(this.getCell(x + i, y));
            output.push(this.getCell(x, y - i));
            output.push(this.getCell(x - i, y));
        }

        return new GridCellCollection(output);
    }

    /**
     * Gets an array containing all cells diagonally adjacent from a specific cell.
     * @returns - An array of all cells.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     * @param distance - The distance to check. Defaults to 1.
     * @param fill - Whether to fill the diagonal. Defaults to `false`.
     */
    public getDiagonal (x: number, y: number, distance = 1, fill = false): GridCellCollection<P> {
        // If the distance is 1, return the diagonal cells
        if (distance === 1) {
            return new GridCellCollection([
                this.getCell(x - 1, y + 1),
                this.getCell(x + 1, y + 1),
                this.getCell(x + 1, y - 1),
                this.getCell(x - 1, y - 1),
            ]);
        }

        // If the fill is false, return the diagonal cells at the distance
        if (!fill) {
            return new GridCellCollection([
                this.getCell(x - distance, y + distance),
                this.getCell(x + distance, y + distance),
                this.getCell(x + distance, y - distance),
                this.getCell(x - distance, y - distance),
            ]);
        }

        const output: GridCell<P>[] = [this.getCell(x, y)];

        // Iterate through the distance
        for (let i = 1; i <= distance; i++) {
            output.push(this.getCell(x - i, y + i));
            output.push(this.getCell(x + i, y + i));
            output.push(this.getCell(x + i, y - i));
            output.push(this.getCell(x - i, y - i));
        }

        return new GridCellCollection(output);
    }

    /**
     * Gets an array containing all cells that surround a cell at a specific distance.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     * @param distance - The distance to check.
     * @returns - An array of all cells.
     */
    private getEncirclingAtDistance (x: number, y: number, distance: number): GridCellCollection<P> {
        // If the distance is 1, return the encircling cells
        if (distance <= 1) {
            return new GridCellCollection([
                ...this.getAdjacent(x, y),
                ...this.getDiagonal(x, y),
            ]);
        }

        // An encircling is basically the cells coordinates

        const output: GridCell<P>[] = [];

        // Get the top row
        for (let i = 1; i < distance * 2; i++) {
            output.push(this.getCell(x - distance + i, y - distance));
        }

        // Get the right column
        for (let i = 1; i < distance * 2; i++) {
            output.push(this.getCell(x + distance, y - distance + i));
        }

        // Get the bottom row
        for (let i = 1; i < distance * 2; i++) {
            output.push(this.getCell(x + distance - i, y + distance));
        }

        // Get the left column
        for (let i = 1; i < distance * 2; i++) {
            output.push(this.getCell(x - distance, y + distance - i));
        }

        // Get diagonal cells
        output.push(...this.getDiagonal(x, y, distance, false));

        return new GridCellCollection(output);
    }

    /**
     * Gets an array containing all cells that surround a cell.
     * @returns - An array of all cells.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     * @param distance - The distance to check. Defaults to 1.
     * @param fill - Whether to fill the surrounding cells. Defaults to `false`.
     */
    public getEncircling (x: number, y: number, distance = 1, fill = false): GridCellCollection<P> {
        // If the distance is 1, or fill is false return the encircling cells
        if (distance === 1 || !fill) {
            return this.getEncirclingAtDistance(x, y, distance);
        }

        const output: GridCell<P>[] = [this.getCell(x, y)];
        // Return all the distances
        for (let i = 1; i <= distance; i++) {
            output.push(...this.getEncirclingAtDistance(x, y, i));
        }

        return new GridCellCollection(output);
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

export { GridCell, GridCellCollection, Grid };

// test
// const grid = new Grid(100);

// // const newCell = grid.getAdjacent(5, 5, 2).adjacent(3, true).left();

// const newCell = grid.getAll();

// console.log(newCell.map(cell => ({
//     x: cell.x,
//     y: cell.y,
// }))
//     .sort((a, b) => a.x - b.x || a.y - b.y));
