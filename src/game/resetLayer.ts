/**
 * @file This file contains all the reset layer related classes.
 */
// import type { game } from "./game";
// import type { gameCurrency } from "./game";
import type { GameCurrency } from "./gameCurrency";

/** Represents a game reset. */
class GameReset {
    /** The unique identifier for the game reset to prevent infinite loops. */
    private id: symbol;

    /** The currencies to reset. */
    public currenciesToReset: GameCurrency<string>[];

    /** The extender for the game reset. */
    public extender?: GameReset;

    /** Custom code to run after {@link reset} is called but BEFORE the currencies are reset */
    public onReset?: () => void;

    /**
     * Creates a new instance of the game reset.
     * @param currenciesToReset The currencies to reset.
     * @param extender The extender for the game reset. WARNING: Do not set this to the same object, as it will cause an infinite loop.
     */
    constructor (currenciesToReset: GameCurrency<string> | GameCurrency<string>[], extender?: GameReset) {
        this.currenciesToReset = Array.isArray(currenciesToReset) ? currenciesToReset : [currenciesToReset];
        this.extender = extender;
        this.id = Symbol();
    }

    /**
     * Resets a currency to its default value, and runs the extender's reset function if it exists (recursively).
     */
    public reset (): void {
        this.onReset?.();

        this.currenciesToReset.forEach((currency) => {
            currency.static.reset();
        });

        // this.extender?.reset();
        if (this.extender && this.extender.id !== this.id) {
            this.extender.reset();
        }
    }
}

export { GameReset };