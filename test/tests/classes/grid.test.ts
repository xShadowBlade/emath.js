/**
 * @file Test suite for the Grid class
 */
import { describe, it, beforeEach } from "mocha";
import { assert } from "chai";

import { Grid, GridCell } from "emath.js";

describe("Grid", () => {
    let grid: Grid;

    beforeEach(() => {
        grid = new Grid(3, 3);
    });

    describe("constructor", () => {
        it("should initialize a grid with the correct size", () => {
            assert.equal(grid.xSize, 3);
            assert.equal(grid.ySize, 3);
            assert.equal(grid.cells.length, 3);
            assert.equal(grid.cells[0].length, 3);
        });
    });

    describe("getAll", () => {
        it("should return all cells in the grid", () => {
            const allCells = grid.getAll();
            assert.equal(allCells.length, 9);
            assert(allCells[0] instanceof GridCell);
        });
    });

    describe("getAllX", () => {
        it("should return all cells with the same x coordinate", () => {
            const cells = grid.getAllX(1);
            assert.equal(cells.length, 3);
            assert(cells[0] instanceof GridCell);
        });
    });

    describe("getAllY", () => {
        it("should return all cells with the same y coordinate", () => {
            const cells = grid.getAllY(1);
            assert.equal(cells.length, 3);
            assert(cells[0] instanceof GridCell);
        });
    });

    describe("getCell", () => {
        it("should get a cell at the specified coordinates", () => {
            const cell = grid.getCell(1, 1);
            assert(cell instanceof GridCell);
        });
    });

    describe("setCell", () => {
        it("should set the value of a cell", () => {
            const cell = new GridCell(0, 0);
            grid.setCell(1, 1, cell);
            assert.equal(grid.getCell(1, 1), cell);
        });
    });

    describe("getAdjacent", () => {
        it("should return all cells adjacent to a specific cell", () => {
            const cells = grid.getAdjacent(1, 1);
            assert.equal(cells.length, 4);
            assert(cells[0] instanceof GridCell);
        });
    });

    describe("getDiagonal", () => {
        it("should return all cells diagonal from a specific cell", () => {
            const cells = grid.getDiagonal(1, 1);
            assert.equal(cells.length, 4);
            assert(cells[0] instanceof GridCell);
        });
    });

    describe("getEncircling", () => {
        it("should return all cells that surround a cell", () => {
            const cells = grid.getEncircling(1, 1);
            assert.equal(cells.length, 8);
            assert(cells[0] instanceof GridCell);
        });
    });
});