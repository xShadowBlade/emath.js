/**
 * @file Declares a function that hooks the game to the window object.
 */
import { game } from "./game";
import type { eMathWeb } from "../hookMain";
import { keyManager } from "./managers/keyManager";
import { eventManager } from "./managers/eventManager";
import { dataManager } from "./managers/dataManager";
/**
 * Hooks the game to the window object.
 */
export declare function hookGame(): void;
export type eMathGameWeb = typeof eMathWeb & {
    game: game;
    managers: {
        keyManager: keyManager;
        eventManager: eventManager;
        dataManager: dataManager;
    };
};
