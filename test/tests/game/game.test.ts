/**
 * @file Game test suite
 */
import { describe, it } from "mocha";
import { assert } from "chai";

import { Game, gameDefaultConfig } from "emath.js/game";

import { testGame, gameConfig } from "./setupGame";

describe("Game", () => {
    describe("Game constructor", () => {
        // The game constructor should create a new game
        it("should create a new game instance", () => {
            assert.instanceOf(testGame, Game);
        });

        // The game instance should have the correct config, also with the default values
        it("should have the correct config", () => {
            // assert.deepEqual(testGame.config, gameConfig);
            assert.deepEqual(testGame.config, {
                ...(gameDefaultConfig as typeof Game.configManager.options),
                ...(gameConfig as typeof Game.configManager.options),
            });
        });
    });
});
