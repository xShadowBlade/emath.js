/**
 * @file This file contains all the reset layer related classes.
 */
import type { GameCurrency } from "./GameCurrency";
/**
 * Represents a game reset.
 */
declare class GameReset {
    /** The unique identifier for the game reset to prevent infinite loops. */
    private readonly id;
    /** The currencies to reset. */
    readonly currenciesToReset: GameCurrency[];
    /** The extender for the game reset. */
    readonly extender: GameReset[];
    /** Custom code to run after {@link reset} is called but BEFORE the currencies are reset */
    onReset?: () => void;
    /**
     * Creates a new instance of the game reset.
     * @param currenciesToReset The currencies to reset.
     * @param extender The extender for the game reset. WARNING: Do not set this to the same object, as it will cause an infinite loop.
     */
    constructor(currenciesToReset: GameCurrency | GameCurrency[], extender?: GameReset | GameReset[]);
    /**
     * Resets a currency to its default value, and runs the extender's reset function if it exists (recursively).
     */
    reset(): void;
}
export { GameReset };
