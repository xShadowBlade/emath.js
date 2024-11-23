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
class GameReset {
    /**
     * Creates a new instance of the game reset from an object.
     * @param object - The object to create the game reset from.
     * @returns The newly created game reset.
     */
    public static fromObject(object: GameResetFromObject): GameReset {
        return new GameReset(object.currenciesToReset, object.extender, object.onReset, object.condition);
    }

    /** The unique identifier for the game reset to prevent infinite loops. */
    private readonly id: symbol;

    /** The currencies to reset. */
    public readonly currenciesToReset: GameCurrency[];

    /** The extender for the game reset. */
    public readonly extender: GameReset[];

    /**
     * Function to run after {@link reset} is called but BEFORE the currencies are reset
     * @param resetContext - The reset context that the reset is called in.
     */
    public onReset?: (resetContext: GameReset) => void;

    /**
     * A condition that must be met for the reset to occur. Can be a function or a boolean / getter.
     */
    public condition?: ((resetContext: GameReset) => boolean) | boolean;

    /**
     * Creates a new instance of the game reset.
     * @param currenciesToReset The currencies to reset.
     * @param extender The extender for the game reset.
     * @param onReset Function to run during {@link reset}.
     * @param condition A condition that must be met for the reset to occur.
     */
    constructor(
        currenciesToReset: GameCurrency | GameCurrency[],
        extender?: GameReset | GameReset[],
        onReset?: typeof GameReset.prototype.onReset,
        condition?: typeof GameReset.prototype.condition,
    ) {
        this.currenciesToReset = Array.isArray(currenciesToReset) ? currenciesToReset : [currenciesToReset];

        extender = extender ?? [];
        this.extender = Array.isArray(extender) ? extender : [extender];
        this.onReset = onReset;
        this.condition = condition;
        this.id = Symbol();
    }

    /**
     * Resets the currencies and upgrades.
     * 1. Resets the extenders (if any), see {@link extender}.
     * 2. Runs {@link onReset}
     * 3. Resets the currencies and upgrades, see {@link currenciesToReset}.
     * @param force - Whether to force the reset. Defaults to `false`.
     * @param forceExtenders - Whether to force the reset of the extenders. Defaults to `true`.
     * @param cached - The set of cached symbols to prevent infinite loops. Used internally.
     */
    public reset(force = false, forceExtenders = true, cached = new Set<symbol>()): void {
        // If there is a condition and it is not met, then return
        if (
            !force &&
            (typeof this.condition === "function" ? !this.condition(this) : !this.condition) &&
            typeof this.condition !== "undefined"
        ) {
            return;
        }

        /**
         * The function to reset this instance.
         */
        const resetThis = (): void => {
            // Call the onReset function
            this.onReset?.(this);

            // Reset the currencies
            this.currenciesToReset.forEach((currency) => {
                currency.reset();
            });
        };

        // If there are no extender, then reset the currencies
        if (this.extender.length === 0) {
            resetThis();
            return;
        }

        // If there are extenders, reset the extenders first, then reset the currencies
        this.extender.forEach((extender) => {
            // If the extender has already been reset, then return
            if (cached.has(extender.id)) {
                return;
            }

            // Add the extender to the cached set
            cached.add(extender.id);

            // Reset the extender
            extender.reset(forceExtenders || force, forceExtenders, cached);
        });

        resetThis();
    }
}

export { GameReset };
