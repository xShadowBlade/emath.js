/**
 * @file This file contains all the reset layer related classes.
 */
import type { gameCurrency } from "./game";
/** Represents a game reset. */
declare class gameReset {
    /** The currencies to reset. */
    currenciesToReset: gameCurrency<string>[];
    /** The extender for the game reset. */
    extender?: gameReset;
    /** Custom code to run after {@link reset} is called but BEFORE the currencies are reset */
    onReset?: () => void;
    /**
     * Creates a new instance of the game reset.
     * @param currenciesToReset The currencies to reset.
     * @param extender The extender for the game reset. WARNING: Do not set this to the same object, as it will cause an infinite loop.
     */
    constructor(currenciesToReset: gameCurrency<string> | gameCurrency<string>[], extender?: gameReset);
    /**
     * Resets a currency to its default value, and runs the extender's reset function if it exists (recursively).
     */
    reset(): void;
}
export { gameReset };
