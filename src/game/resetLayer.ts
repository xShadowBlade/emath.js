/**
 * @file This file contains all the reset layer related classes.
 */
import type { game } from "./game";
import type { gameCurrency } from "./game";

/**
 * Represents a game reset.
 */
class gameReset {
    /**
     * The currencies to reset.
     */
    public currenciesToReset: gameCurrency[];

    /**
     * The extender for the game reset.
     */
    public extender?: gameReset;

    /**
     * Creates a new instance of the game reset.
     * @param currenciesToReset The currencies to reset.
     * @param extender The extender for the game reset.
     */
    constructor (currenciesToReset: gameCurrency[], extender?: gameReset) {
        this.currenciesToReset = currenciesToReset;
        this.extender = extender;
    }

    /**
     * Resets the game.
     */
    public reset (): void {
        this.currenciesToReset.forEach((currency) => {
            currency.static.reset();
        });

        if (this.extender) {
            this.extender.reset();
        }
    }
}

export { gameReset };