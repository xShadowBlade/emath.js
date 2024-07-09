/**
 * @file Declares the game currency class.
 */
import type { Decimal } from "../E/e";
import { CurrencyStatic } from "../classes/Currency";
import type { Currency } from "../classes/Currency";
import type { UpgradeInit } from "../classes/Upgrade";
import type { Game } from "./Game";
import type { Pointer } from "../common/types";

/**
 * Represents a game currency. {@link Currency} is the data class. This class extends {@link CurrencyStatic} and adds additional functionality for {@link Game}.
 * @template N - The name of the currency. This is optional, and you can use it for display purposes.
 * @template U - The upgrade names for the currency. See CurrencyStatic for more information.
 */
class GameCurrency<N extends string = string, U extends UpgradeInit[] = []> extends CurrencyStatic<U> {
    /**
     * A function that returns the data for the currency.
     * @deprecated Use {@link pointerFn} instead. This property is only here for backwards compatibility.
     */
    // private readonly dataPointer: never;

    /**
     * A function that returns the static data for the currency.
     * @deprecated Use this class as a static class as it now has all the properties of {@link CurrencyStatic}. This property is only here for backwards compatibility.
     */
    // private readonly staticPointer: never;

    /** The name of the currency. This is optional, and you can use it for display purposes. */
    public readonly name: N;

    /**
     * @returns The data for the currency.
     * @deprecated Use {@link pointer} instead. This property is only here for backwards compatibility.
     */
    get data (): Currency {
        return this.pointer;
    }

    /**
     * @returns The static data for the currency.
     * @deprecated Use this class as a static class as it now has all the properties of {@link CurrencyStatic}. This property is only here for backwards compatibility.
     */
    get static (): this {
        return this;
    }

    /** The game pointer/reference */
    public readonly game?: Game;

    /**
     * Creates a new instance of the game class.
     * @param currencyStaticParams - The parameters for the currency static class.
     * @param gamePointer A pointer to the game instance.
     * @param name - The name of the currency. This is optional, and you can use it for display purposes.
     */
    constructor (currencyStaticParams: ConstructorParameters<typeof CurrencyStatic<U>>, gamePointer: Game, name: N) {
        // "backwards compatibility" lol
        if (typeof currencyStaticParams === "function") {
            throw new Error("GameCurrency constructor does not accept a function as the first parameter. Use the <Game>.addCurrency method instead.");
        }

        // Call the parent constructor
        super(...currencyStaticParams);

        this.game = gamePointer;
        this.name = name;

        // Add an event on load to update upgrade effects
        this.game.dataManager.addEventOnLoad(() => {
            this.static.onLoadData();
        });
    }
}

export { GameCurrency };
