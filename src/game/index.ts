/**
 * @file Exports the game module
 */
// Saving
import "reflect-metadata";

import { hookGame } from "./hookGame";
hookGame();

export * from "./game";
export * from "./managers/keyManager";
export * from "./managers/eventManager";
export * from "./managers/dataManager";