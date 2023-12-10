/**
 * @file index.ts
 * @description This is the entry point for the library and exports all relevant things.
 */
import { hookMain } from "hookMain";
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

export * from "./eMain";
export * from "./classes/boost";
export * from "./classes/currency";
export * from "./classes/attribute";
export * from "./classes/grid";

// export * from "./classes/utility/eString";
// export * from "./classes/utility/eArray";
// export * from "./classes/utility/eObject";
// export * from "./classes/utility/obb";

// export { E } from "./eMath";
// export { boost } from "./classes/boost";
// export { currency, currencyStatic } from "./classes/currency";
// export { attribute } from "./classes/attribute";
// export { grid, gridCell } from "./classes/grid";

// export { EString } from "./classes/utility/eString";
// export { obb } from "./classes/utility/obb";
// export { EArray } from "./classes/utility/eArray";
// export { EObject } from "./classes/utility/eObject";