/**
 * @file Declares the game currency class.
 */
import { CurrencyStatic } from "../classes/Currency";
import type { Currency } from "../classes/Currency";
import type { Game } from "./Game";

/**
 * Represents a game currency. {@link Currency} is the data class. This class extends {@link CurrencyStatic} and adds additional functionality for {@link Game}.
 * @template TCurrencyName - The name of the currency. This is optional, and you can use it for display purposes.
 * @template TUpgradeIds - The ids of the upgrades that can be bought with this currency.
 * @template TItemIds - The ids of the items that can be bought with this currency.
 */
class GameCurrency<
    TCurrencyName extends string = string,
    TUpgradeIds extends string = string,
    TItemIds extends string = string,
> extends CurrencyStatic<TUpgradeIds, TItemIds> {
    /** The name of the currency. This is optional, and you can use it for display purposes. */
    public readonly name: TCurrencyName;

    /**
     * @returns The data for the currency.
     * @deprecated Use {@link pointer} instead. This property is only here for backwards compatibility.
     */
    get data(): Currency {
        return this.pointer;
    }

    /**
     * @returns The static data for the currency.
     * @deprecated Use this class as a static class as it now has all the properties of {@link CurrencyStatic}. This property is only here for backwards compatibility.
     */
    get static(): this {
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
    constructor(
        currencyStaticParams: ConstructorParameters<typeof CurrencyStatic<TUpgradeIds, TItemIds>>,
        gamePointer: Game,
        name: TCurrencyName,
    ) {
        // "backwards compatibility" lol
        if (typeof currencyStaticParams === "function") {
            throw new Error(
                "GameCurrency constructor does not accept a function as the first parameter. Use the <Game>.addCurrency method instead.",
            );
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
