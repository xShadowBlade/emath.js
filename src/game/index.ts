/**
 * @file Exports the game module
 */
// Saving
import "reflect-metadata";

// import { hookGame } from "./hookGame";
// hookGame();

// Module augmentation
import "../E/eMain";

export * from "./game";
export * from "./gameCurrency";
export * from "./gameAttribute";
export * from "./resetLayer";
export * from "./managers/keyManager";
export * from "./managers/eventManager";
export * from "./managers/dataManager";