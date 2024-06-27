/**
 * @file Declares the gridCell and grid classes.
 */
import type { UnknownObject } from "../common/types";

type Directions = "up" | "right" | "down" | "left";

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
    constructor (x: number, y: number, props: P = {} as P, gridSymbol: symbol) {
        this.x = x;
        this.y = y;
        this.properties = props;
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
     * Gets the cell in a specific direction from the current cell.
     * @param direction - The direction to move.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cell in the specified direction.
     */
    public direction (direction: Directions, distance = 1): GridCell<P> {
        const grid = Grid.getInstance(this.gridSymbol);

        switch (direction) {
            case "up":
                return grid.getCell(this.x, this.y - distance) as GridCell<P>;
            case "right":
                return grid.getCell(this.x + distance, this.y) as GridCell<P>;
            case "down":
                return grid.getCell(this.x, this.y + distance) as GridCell<P>;
            case "left":
                return grid.getCell(this.x - distance, this.y) as GridCell<P>;
            default:
                throw new Error("Invalid direction");
        }
    }

    /**
     * Gets the cell to the right of the current cell. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cell to the right.
     */
    public up (distance = 1): GridCell<P> {
        // Return the cell
        return this.direction("up", distance);
    }

    /**
     * Gets the cell to the right of the current cell. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cell to the right.
     */
    public right (distance = 1): GridCell<P> {
        // Return the cell
        return this.direction("right", distance);
    }

    /**
     * Gets the cell below the current cell. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cell below.
     */
    public down (distance = 1): GridCell<P> {
        // Return the cell
        return this.direction("down", distance);
    }

    /**
     * Gets the cell to the left of the current cell. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cell to the left.
     */
    public left (distance = 1): GridCell<P> {
        // Return the cell
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

    public static getInstance (key: symbol): Grid {
        return Grid.instances[key];
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
    constructor (xSize: number, ySize?: number, starterProps?: P) {
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
     */
    public getAdjacent (x: number, y: number): GridCellCollection<P> {
        return new GridCellCollection([
            this.getCell(x, y + 1),
            this.getCell(x + 1, y),
            this.getCell(x, y - 1),
            this.getCell(x - 1, y),
        ]);
    }

    /**
     * Gets an array containing all cells diagonally adjacent from a specific cell.
     * @returns - An array of all cells.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     */
    public getDiagonal (x: number, y: number): GridCellCollection<P> {
        return new GridCellCollection([
            this.getCell(x - 1, y + 1),
            this.getCell(x + 1, y + 1),
            this.getCell(x + 1, y - 1),
            this.getCell(x - 1, y - 1),
        ]);
    }

    /**
     * Gets an array containing all cells that surround a cell.
     * @returns - An array of all cells.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     */
    public getEncircling (x: number, y: number): GridCellCollection<P> {
        return new GridCellCollection([
            ...this.getAdjacent(x, y),
            ...this.getDiagonal(x, y),
        ]);
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
// const grid = new Grid(5);
// const cell = grid.get(2, 2);

// const newCell = cell.up(3);

// console.log(cell, newCell);
