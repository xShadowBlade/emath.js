/**
 * @file Setup the game for testing
 */
import { Game, gameDefaultConfig } from "emath.js/game";
import type { GameConfigOptions } from "emath.js/game";

import { localStorageTest } from "../shared/utils";

/**
 * The game configuration for testing
 */
const gameConfig: GameConfigOptions = {
    mode: "development",
    name: {
        title: "Test Game",
        id: "test-game",
        version: "1.0.0",
    },
    settings: {
        framerate: 10,
    },

    // Separate localStorage for testing in node
    localStorage: localStorageTest,
};

/**
 * The game instance for testing
 */
const testGame = new Game(gameConfig);

export { testGame, gameConfig, gameDefaultConfig };
