/**
 * @file This is the entry point for the library and exports all relevant things.
 */
import "reflect-metadata";

export * from "./metadata";

export * from "./E/lru-cache";
export * from "./E/e";
export * from "./classes/Boost";
export * from "./classes/Upgrade";
export * from "./classes/Item";
export * from "./classes/Currency";
export * from "./classes/Attribute";
export * from "./classes/Grid";
export * from "./classes/numericalAnalysis/numericalAnalysis";
export * from "./classes/numericalAnalysis/sum";
export * from "./classes/numericalAnalysis/inverseFunction";

export * from "./E/eMain";

export type * from "./common/types";

// Set `Decimal` to window (if window exists and Decimal is not already defined).
import { Decimal } from "./E/e";

/**
 * The window object with the Decimal library.
 * Used to set the Decimal library to the window object,
 * so you can use it with libraries that depend on it.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
type WindowWithDecimal = typeof window & { Decimal: typeof Decimal };

if (typeof window !== "undefined" && !(window as WindowWithDecimal).Decimal) {
    (window as WindowWithDecimal).Decimal = Decimal;
}
