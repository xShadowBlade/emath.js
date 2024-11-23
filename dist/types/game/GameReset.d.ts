/**
 * @file This file contains all the reset layer related classes.
 */
import type { GameCurrency } from "./GameCurrency";
/**
 * An object that represents a game reset.
 */
type GameResetFromObject = Pick<Partial<GameReset>, "currenciesToReset" | "extender" | "onReset" | "condition"> & {
    currenciesToReset: GameCurrency | GameCurrency[];
    extender?: GameReset | GameReset[];
};
/**
 * Represents a game reset.
 */
declare class GameReset {
    /**
     * Creates a new instance of the game reset from an object.
     * @param object - The object to create the game reset from.
     * @returns The newly created game reset.
     */
    static fromObject(object: GameResetFromObject): GameReset;
    /** The unique identifier for the game reset to prevent infinite loops. */
    private readonly id;
    /** The currencies to reset. */
    readonly currenciesToReset: GameCurrency[];
    /** The extender for the game reset. */
    readonly extender: GameReset[];
    /**
     * Function to run after {@link reset} is called but BEFORE the currencies are reset
     * @param resetContext - The reset context that the reset is called in.
     */
    onReset?: (resetContext: GameReset) => void;
    /**
     * A condition that must be met for the reset to occur. Can be a function or a boolean / getter.
     */
    condition?: ((resetContext: GameReset) => boolean) | boolean;
    /**
     * Creates a new instance of the game reset.
     * @param currenciesToReset The currencies to reset.
     * @param extender The extender for the game reset.
     * @param onReset Function to run during {@link reset}.
     * @param condition A condition that must be met for the reset to occur.
     */
    constructor(currenciesToReset: GameCurrency | GameCurrency[], extender?: GameReset | GameReset[], onReset?: typeof GameReset.prototype.onReset, condition?: typeof GameReset.prototype.condition);
    /**
     * Resets the currencies and upgrades.
     * 1. Resets the extenders (if any), see {@link extender}.
     * 2. Runs {@link onReset}
     * 3. Resets the currencies and upgrades, see {@link currenciesToReset}.
     * @param force - Whether to force the reset. Defaults to `false`.
     * @param forceExtenders - Whether to force the reset of the extenders. Defaults to `true`.
     * @param cached - The set of cached symbols to prevent infinite loops. Used internally.
     */
    reset(force?: boolean, forceExtenders?: boolean, cached?: Set<symbol>): void;
}
export { GameReset };
