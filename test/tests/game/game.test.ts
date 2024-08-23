/**
 * @file Game test suite
 */
import { describe, it, beforeEach } from "mocha";
import { assert } from "chai";

import { Game, gameDefaultConfig } from "emath.js/game";
import type { GameConfigOptions } from "emath.js/game";

describe("Game", () => {
    let gameConfig: GameConfigOptions;
    let testGame: Game;

    beforeEach(() => {
        // Set up the game config
        gameConfig = {
            mode: "development",
            name: {
                title: "Test Game",
                id: "test-game",
                version: "1.0.0",
            },
            settings: {
                framerate: 30,
            },
        } as GameConfigOptions;
        testGame = new Game(gameConfig);
    });

    describe("Game constructor", () => {
        // The game constructor should create a new game
        it("should create a new game instance", () => {
            assert.instanceOf(testGame, Game);
        });

        // The game instance should have the correct config, also with the default values
        it("should have the correct config", () => {
            // assert.deepEqual(testGame.config, gameConfig);
            assert.deepEqual(testGame.config, {
                ...gameDefaultConfig,
                ...gameConfig,
            });
        });
    });
});
