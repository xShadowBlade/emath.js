/**
 * @file This file contains all the reset layer related classes.
 */
import type { GameCurrency } from "./GameCurrency";

type GameResetFromObject = Pick<
    Partial<GameReset>,
    "currenciesToReset" | "extender" | "onReset" | "condition"
> & {
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
        return new GameReset(
            object.currenciesToReset,
            object.extender,
            object.onReset,
            object.condition,
        );
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
        this.currenciesToReset = Array.isArray(currenciesToReset)
            ? currenciesToReset
            : [currenciesToReset];

        extender = extender ?? [];
        this.extender = Array.isArray(extender) ? extender : [extender];
        this.onReset = onReset;
        this.condition = condition;
        this.id = Symbol();
    }

    /**
     * Resets the extenders (if any), then runs {@link onReset} and resets the currencies and upgrades.
     * @param force Whether to force the reset. Defaults to `false`.
     * @param forceExtenders Whether to force the reset of the extenders. Defaults to `true`.
     * @param cached The set of cached symbols to prevent infinite loops.
     */
    public reset(
        force = false,
        forceExtenders = true,
        cached = new Set<symbol>(),
    ): void {
        // If there is a condition and it is not met, then return
        if (
            force ||
            ((typeof this.condition === "function"
                ? !this.condition(this)
                : !this.condition) &&
                typeof this.condition !== "undefined")
        ) {
            return;
        }

        const resetThis = (): void => {
            this.onReset?.(this);

            this.currenciesToReset.forEach((currency) => {
                currency.static.reset();
            });
        };

        // If there are no extender, then reset the currencies
        if (this.extender.length === 0) {
            resetThis();
            return;
        }

        // If there are extenders, reset the extenders first, then reset the currencies
        this.extender.forEach((extender) => {
            if (!cached.has(extender.id)) {
                cached.add(extender.id);
                extender.reset(forceExtenders || force, forceExtenders, cached);
            }
        });

        resetThis();
    }
}

export { GameReset };
