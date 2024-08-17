---
id: grid
title: Grid
sidebar_label: Grid
---

[Link to auto generated docs](https://xshadowblade.github.io/emath.js/typedoc/classes/classes_Grid.Grid.html)

The `Grid` class is a class that represents a grid with cells. It is typically used to create and manage grids for the game, such as tile maps, or to simulate a game similar to Reactor Idle.

## Uses

To create and manage a grid, do the following:

```js title="grid.js" showLineNumbers
import { Grid } from "emath.js";

// Create a grid with a size of 10x10, and initialize with properties
const myGrid = new Grid(10, 10, {
    type: "empty",
    value: 0,
});

// Get all cells in the grid
const allCells = myGrid.getAll();

// Get a cell at a specific coordinate
const cell = myGrid.getCell(5, 5);

// Set a cell at a specific coordinate
myGrid.setCell(5, 5, new GridCell(5, 5, { type: "wall", value: 1 }));

// Get all cells adjacent to a specific cell
const adjacentCells = myGrid.getAdjacent(5, 5);
```
