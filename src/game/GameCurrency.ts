/**
 * @file Declares the game currency class.
 */
import type { Decimal } from "../E/e";
import type { Currency, CurrencyStatic } from "../classes/Currency";
import type { UpgradeInit } from "../classes/Upgrade";
import type { Game } from "./Game";
import type { Pointer } from "../common/types";

/**
 * Represents a game currency. {@link Currency} is the data class and {@link CurrencyStatic} is the static class where all the useful functions are.
 * To use, destruct the `data` and `static` properties from the class.
 * @template N - The name of the currency. This is optional, and you can use it for display purposes.
 * @template U - The upgrade names for the currency. See {@link CurrencyStatic} for more information.
 */
class GameCurrency<N extends string = string, U extends UpgradeInit[] = []> {
    /** A function that returns the data for the currency. */
    protected readonly dataPointer: () => Currency;

    /** A function that returns the static data for the currency. */
    protected readonly staticPointer: () => CurrencyStatic<U>;

    /** The name of the currency. This is optional, and you can use it for display purposes. */
    public readonly name: N;

    /** @returns The data for the currency. */
    get data (): Currency {
        return this.dataPointer();
    }

    /** @returns The static data for the currency. */
    get static (): CurrencyStatic<U> {
        return this.staticPointer();
    }

    /** The game pointer/reference */
    public readonly game?: Game;

    /**
     * Creates a new instance of the game class.
     * @param currencyPointer - A function that returns the current currency value.
     * @param staticPointer - A function that returns the static data for the game.
     * @param gamePointer A pointer to the game instance.
     * @param name - The name of the currency. This is optional, and you can use it for display purposes.
     */
    constructor (currencyPointer: Pointer<Currency>, staticPointer: Pointer<CurrencyStatic<U>>, gamePointer: Game, name: N) {
        // Set the data and static pointers
        this.dataPointer = typeof currencyPointer === "function" ? currencyPointer : (): Currency => currencyPointer;
        this.staticPointer = typeof staticPointer === "function" ? staticPointer : (): CurrencyStatic<U> => staticPointer;

        this.game = gamePointer;
        this.name = name;

        // Add an event on load to update upgrade effects
        this.game.dataManager.addEventOnLoad(() => {
            this.static.onLoadData();
        });
    }

    /**
     * Gets the value of the game currency.
     * Note: There is no setter for this property. To change the value of the currency, use the corresponding methods in the static class.
     * @returns The value of the game currency.
     */
    get value (): Decimal {
        return this.data.value;
    }
}

export { GameCurrency };
