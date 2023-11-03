/* global describe it beforeEach */
import { grid, gridCell } from "../src/index";

// @ts-ignore
import assert from "assert";

describe("grid", () => {
    let testGrid: grid;

    beforeEach(() => {
        testGrid = new grid(3, 3);
    });

    describe("constructor", () => {
        it("should create a grid with the correct size", () => {
            assert.equal(testGrid.x_size, 3);
            assert.equal(testGrid.y_size, 3);
        });

        it("should create a grid with the correct number of cells", () => {
            assert.equal(testGrid.all().length, 9);
        });

        it("should create a grid with the correct cells", () => {
            const expectedCells: gridCell[] = [
                new gridCell(0, 0),
                new gridCell(1, 0),
                new gridCell(2, 0),

                new gridCell(0, 1),
                new gridCell(1, 1),
                new gridCell(2, 1),

                new gridCell(0, 2),
                new gridCell(1, 2),
                new gridCell(2, 2),
            ];
            assert.equal(testGrid.all(), expectedCells);
        });
    });

    describe("all", () => {
        it("should return all cells in the grid", () => {
            const allCells = testGrid.all();
            assert.equal(allCells.length, 9);
            assert.equal(allCells[0], testGrid.getCell(0, 0));
            assert.equal(allCells[8], testGrid.getCell(2, 2));
        });
    });

    describe("allX", () => {
        it("should return all cells with the same x coordinate", () => {
            const cells = testGrid.allX(1);
            assert.equal(cells.length, 3);
            assert.equal(cells[0], testGrid.getCell(1, 0));
            assert.equal(cells[2], testGrid.getCell(1, 2));
        });
    });

    describe("allY", () => {
        it("should return all cells with the same y coordinate", () => {
            const cells = testGrid.allY(1);
            assert.equal(cells.length, 3);
            assert.equal(cells[0], testGrid.getCell(0, 1));
            assert.equal(cells[2], testGrid.getCell(2, 1));
        });
    });

    describe("getCell", () => {
        it("should return the correct cell", () => {
            const cell = testGrid.getCell(1, 1);
            assert.equal(cell, new gridCell(1, 1));
        });
    });

    describe("getAdjacent", () => {
        it("should return the correct adjacent cells", () => {
            const cells = testGrid.getAdjacent(1, 1);
            assert.equal(cells.length, 4);
            assert.equal(cells[0], testGrid.getCell(1, 2));
            assert.equal(cells[1], testGrid.getCell(2, 1));
            assert.equal(cells[2], testGrid.getCell(1, 0));
            assert.equal(cells[3], testGrid.getCell(0, 1));
        });
    });

    describe("getDiagonal", () => {
        it("should return the correct diagonal cells", () => {
            const cells = testGrid.getDiagonal(1, 1);
            assert.equal(cells.length, 4);
            assert.equal(cells[0], testGrid.getCell(0, 2));
            assert.equal(cells[1], testGrid.getCell(2, 2));
            assert.equal(cells[2], testGrid.getCell(2, 0));
            assert.equal(cells[3], testGrid.getCell(0, 0));
        });
    });

    describe("getEncircling", () => {
        it("should return the correct encircling cells", () => {
            const cells = testGrid.getEncircling(1, 1);
            assert.equal(cells.length, 8);
            assert.equal(cells[0], testGrid.getCell(1, 2));
            assert.equal(cells[1], testGrid.getCell(2, 1));
            assert.equal(cells[2], testGrid.getCell(1, 0));
            assert.equal(cells[3], testGrid.getCell(0, 1));
            assert.equal(cells[4], testGrid.getCell(0, 2));
            assert.equal(cells[5], testGrid.getCell(2, 2));
            assert.equal(cells[6], testGrid.getCell(2, 0));
            assert.equal(cells[7], testGrid.getCell(0, 0));
        });
    });
});