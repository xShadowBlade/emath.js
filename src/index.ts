/**
 * @file index.ts
 * @description This is the entry point for the library and exports all relevant things.
 */
// import "reflect-metadata";
import { hookMain } from "./hookMain";
// Attach eMath to the window object.
hookMain();

// export {
//     eMath,

//     E,
//     boost,
//     currency,
//     currencyStatic,
//     attribute,
//     grid,
//     gridCell,
//     EString,
//     EArray,
//     EObject,
//     obb,

//     // game,
//     // keyManager,
//     // eventManager,
//     // dataManager,
// };

export * from "./E/eMain";
export * from "./classes/boost";
export * from "./classes/currency";
export * from "./classes/attribute";
export * from "./classes/grid";
// export * from "./classes/skillTree";

// export { E } from "./eMath";
// export { boost } from "./classes/boost";
// export { currency, currencyStatic } from "./classes/currency";
// export { attribute } from "./classes/attribute";
// export { grid, gridCell } from "./classes/grid";