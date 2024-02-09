/**
 * @file This file contains all the reset layer related classes.
 */
// import type { game } from "./game";
import type { gameCurrency } from "./game";

/** Represents a game reset. */
class gameReset {
    /** The currencies to reset. */
    public currenciesToReset: gameCurrency[];

    /** The extender for the game reset. */
    public extender?: gameReset;

    /** Custom code to run after {@link reset} is called but BEFORE the currencies are reset */
    public onReset?: () => void;

    /**
     * Creates a new instance of the game reset.
     * @param currenciesToReset The currencies to reset.
     * @param extender The extender for the game reset. WARNING: Do not set this to the same object, as it will cause an infinite loop.
     */
    constructor (currenciesToReset: gameCurrency | gameCurrency[], extender?: gameReset) {
        this.currenciesToReset = Array.isArray(currenciesToReset) ? currenciesToReset : [currenciesToReset];
        this.extender = extender;
    }

    /**
     * Resets a currency to its default value, and runs the extender's reset function if it exists (recursively).
     */
    public reset (): void {
        if (this.onReset) {
            this.onReset();
        }

        this.currenciesToReset.forEach((currency) => {
            currency.static.reset();
        });

        if (this.extender) {
            this.extender.reset();
        }
    }
}

export { gameReset };