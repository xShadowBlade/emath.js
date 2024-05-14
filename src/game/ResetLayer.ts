/**
 * @file This file contains all the reset layer related classes.
 */
// import type { game } from "./game";
// import type { gameCurrency } from "./game";
import type { GameCurrency } from "./GameCurrency";

/**
 * Represents a game reset.
 */
class GameReset {
    /** The unique identifier for the game reset to prevent infinite loops. */
    private readonly id: symbol;

    /** The currencies to reset. */
    public readonly currenciesToReset: GameCurrency[];

    /** The extender for the game reset. */
    public readonly extender: GameReset[];

    /**
     * Custom code to run after {@link reset} is called but BEFORE the currencies are reset
     * @param resetContext - The reset context that the reset is called in.
     */
    public onReset?: (resetContext: GameReset) => void;

    /**
     * Creates a new instance of the game reset.
     * @param currenciesToReset The currencies to reset.
     * @param extender The extender for the game reset. WARNING: Do not set this to the same object, as it will cause an infinite loop.
     */
    constructor (currenciesToReset: GameCurrency | GameCurrency[], extender?: GameReset | GameReset[]) {
        this.currenciesToReset = Array.isArray(currenciesToReset) ? currenciesToReset : [currenciesToReset];
        this.extender = Array.isArray(extender) ? extender : extender ? [extender] : [];
        this.id = Symbol();
    }

    /**
     * Resets a currency to its default value, and runs the extender's reset function if it exists (recursively).
     */
    public reset (): void {
        this.onReset?.(this);

        this.currenciesToReset.forEach((currency) => {
            currency.static.reset();
        });

        // this.extender?.reset();
        this.extender.forEach((extender) => {
            if (extender.id !== this.id) {
                extender.reset();
            }
        });
    }
}

export { GameReset };