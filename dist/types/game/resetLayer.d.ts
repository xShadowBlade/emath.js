import type { gameCurrency } from "./game";
/**
 * Represents a game reset.
 */
declare class gameReset {
    /**
     * The currencies to reset.
     */
    currenciesToReset: gameCurrency[];
    /**
     * The extender for the game reset.
     */
    extender?: gameReset;
    /**
     * Creates a new instance of the game reset.
     * @param currenciesToReset The currencies to reset.
     * @param extender The extender for the game reset.
     */
    constructor(currenciesToReset: gameCurrency | gameCurrency[], extender?: gameReset);
    /**
     * Resets a currency.
     */
    reset(): void;
}
export { gameReset };
