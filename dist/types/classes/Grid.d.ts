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
declare class GridCell<P extends object = UnknownObject> {
    /** The x-coordinate of the cell. */
    x: number;
    /** The y-coordinate of the cell. */
    y: number;
    /** The grid instance the cell belongs to. */
    private gridSymbol;
    /** The properties of the cell. */
    properties: P;
    /**
     * Initializes a new instance of the grid cell.
     * @param x - The x-coordinate.
     * @param y - The y-coordinate.
     * @param props - The properties to initialize with.
     * @param gridSymbol - The symbol of the grid the cell belongs to.
     */
    constructor(x: number, y: number, props: P | undefined, gridSymbol: symbol);
    /**
     * Sets the value of a property on the cell.
     * @param name - The name of the property.
     * @param value - The value to set.
     * @returns The set value.
     */
    set(name: keyof P, value: P[keyof P]): typeof value;
    /** @deprecated Use {@link set} instead. */
    setValue: (name: keyof P, value: P[keyof P]) => typeof value;
    /**
     * Gets the value of a property on the cell.
     * @param name - The name of the property.
     * @returns - The value of the property.
     */
    get(name: keyof P): P[keyof P];
    /** @deprecated Use {@link get} instead. */
    getValue: (name: keyof P) => P[keyof P];
    /**
     * Gets the cell in a specific direction from the current cell.
     * @param direction - The direction to move.
     * @param distance - The distance to move. Defaults to 1.
     * @param fill - Whether to fill the cells. Defaults to `false`.
     * @returns - The cell in the specified direction.
     */
    direction<D extends Directions>(direction: D, distance?: number, fill?: boolean): D extends DirectionCollection ? GridCellCollection<P> : GridCell<P>;
    /**
     * Gets the cell to the right of the current cell. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cell to the right.
     */
    up(distance?: number): GridCell<P>;
    /**
     * Gets the cell to the right of the current cell. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cell to the right.
     */
    right(distance?: number): GridCell<P>;
    /**
     * Gets the cell below the current cell. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cell below.
     */
    down(distance?: number): GridCell<P>;
    /**
     * Gets the cell to the left of the current cell. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cell to the left.
     */
    left(distance?: number): GridCell<P>;
}
/**
 * Represents a collection of grid cells.
 * @template P - The type of the properties of the grid cells.
 */
declare class GridCellCollection<P extends object = UnknownObject> extends Array<GridCell<P>> {
    /**
     * Initializes a new instance of the grid cell collection.
     * @param cells - The cells to initialize with.
     */
    constructor(cells: GridCell<P> | GridCell<P>[]);
    /**
     * Removes duplicate cells from the collection.
     * Modifies the array in place.
     */
    removeDuplicates(): void;
    /**
     * Gets the cells in a specific direction from the current cells.
     * @param direction - The direction to move.
     * @param distance - The distance to move. Defaults to 1.
     * @param fill - Whether to fill the cells. Defaults to `false`.
     * @returns - The cells in the specified direction.
     */
    direction(direction: Directions, distance?: number, fill?: boolean): GridCellCollection<P>;
    /**
     * Gets the cells above the current cells. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cells above.
     */
    up(distance?: number): GridCellCollection<P>;
    /**
     * Gets the cells to the right of the current cells. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cells to the right.
     */
    right(distance?: number): GridCellCollection<P>;
    /**
     * Gets the cells below the current cells. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cells below.
     */
    down(distance?: number): GridCellCollection<P>;
    /**
     * Gets the cells to the left of the current cells. Can be chained.
     * @param distance - The distance to move. Defaults to 1.
     * @returns - The cells to the left.
     */
    left(distance?: number): GridCellCollection<P>;
    /**
     * Gets the cells adjacent to the current cells. Can be chained.
     * Note: Can be slow with large collections.
     * @param distance - The distance to move. Defaults to 1.
     * @param fill - Whether to fill the cells. Defaults to `false`.
     * @returns - The cells adjacent.
     */
    adjacent(distance?: number, fill?: boolean): GridCellCollection<P>;
    /**
     * Gets the cells diagonally from the current cells. Can be chained.
     * Note: Can be slow with large collections.
     * @param distance - The distance to move. Defaults to 1.
     * @param fill - Whether to fill the cells. Defaults to `false`.
     * @returns - The cells diagonally.
     */
    diagonal(distance?: number, fill?: boolean): GridCellCollection<P>;
    /**
     * Gets the cells encircling the current cells. Can be chained.
     * Note: Can be slow with large collections.
     * @param distance - The distance to move. Defaults to 1.
     * @param fill - Whether to fill the cells. Defaults to `false`.
     * @returns - The cells encircling.
     */
    encircling(distance?: number, fill?: boolean): GridCellCollection<P>;
}
/**
 * Represents a grid with cells.
 * @template P - The type of the properties of the grid cells.
 */
declare class Grid<P extends object = UnknownObject> {
    /** A map of grid instances. */
    private static instances;
    static getInstance(key: symbol): Grid;
    /** The size of the grid along the x-axis. */
    xSize: number;
    /** The size of the grid along the x-axis. */
    ySize: number;
    /** Represents the cells of the grid. */
    cells: GridCell<P>[][];
    /** A symbol to store the grid instance. */
    private gridSymbol;
    /**
     * Initializes a new instance of the grid.
     * @param xSize - The size of the grid along the x-axis.
     * @param ySize - The size of the grid along the y-axis. Defaults to `xSize`.
     * @param starterProps - The properties to initialize with.
     */
    constructor(xSize: number, ySize?: number, starterProps?: P);
    /**
     * Gets an array containing all cells in the grid.
     * @returns - An array of all cells.
     */
    getAll(): GridCellCollection<P>;
    /** @deprecated Use {@link getAll} instead. */
    all: () => GridCellCollection<P>;
    /**
     * Gets an array containing all cells that have the same x coordinate.
     * @returns - An array of all cells.
     * @param x - The x coordinate to check.
     */
    getAllX(x: number): GridCellCollection<P>;
    /** @deprecated Use {@link getAllX} instead. */
    allX: (x: number) => GridCellCollection<P>;
    /**
     * Gets an array containing all cells that have the same y coordinate.
     * @returns - An array of all cells.
     * @param y - The y coordinate to check.
     */
    getAllY(y: number): GridCellCollection<P>;
    /** @deprecated Use {@link getAllY} instead. */
    allY: (y: number) => GridCellCollection<P>;
    /**
     * Gets a cell.
     * @returns - The cell.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     * @param overflow - Whether to allow overflow. Defaults to `true`.
     */
    getCell(x: number, y: number, overflow?: boolean): GridCell<P>;
    /** @deprecated Use {@link getCell} instead. */
    get: (x: number, y: number, overflow?: boolean) => GridCell<P>;
    /**
     * Sets the value of a cell in the grid.
     * @param x The x-coordinate of the cell.
     * @param y The y-coordinate of the cell.
     * @param value The value to set for the cell.
     */
    setCell(x: number, y: number, value: GridCell<P>): void;
    /** @deprecated Use {@link setCell} instead. */
    set: (x: number, y: number, value: GridCell<P>) => void;
    /**
     * Gets an array containing all cells orthagonally adjacent to a specific cell.
     * @returns - An array of all cells.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     * @param distance - The distance to check. Defaults to 1.
     * @param fill - Whether to fill the adjacent cells. Defaults to `false`.
     */
    getAdjacent(x: number, y: number, distance?: number, fill?: boolean): GridCellCollection<P>;
    /**
     * Gets an array containing all cells diagonally adjacent from a specific cell.
     * @returns - An array of all cells.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     * @param distance - The distance to check. Defaults to 1.
     * @param fill - Whether to fill the diagonal. Defaults to `false`.
     */
    getDiagonal(x: number, y: number, distance?: number, fill?: boolean): GridCellCollection<P>;
    /**
     * Gets an array containing all cells that surround a cell at a specific distance.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     * @param distance - The distance to check.
     * @returns - An array of all cells.
     */
    private getEncirclingAtDistance;
    /**
     * Gets an array containing all cells that surround a cell.
     * @returns - An array of all cells.
     * @param x - The x coordinate to check.
     * @param y - The y coordinate to check.
     * @param distance - The distance to check. Defaults to 1.
     * @param fill - Whether to fill the surrounding cells. Defaults to `false`.
     */
    getEncircling(x: number, y: number, distance?: number, fill?: boolean): GridCellCollection<P>;
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
export { GridCell, GridCellCollection, Grid };
