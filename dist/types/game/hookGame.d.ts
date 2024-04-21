/**
 * @file Declares a function that hooks the game to the window object.
 */
import "reflect-metadata";
import { Game } from "./Game";
import { KeyManager } from "./managers/KeyManager";
import { EventManager } from "./managers/EventManager";
import { DataManager } from "./managers/DataManager";
declare const eMathGameWeb: {
    game: typeof Game;
    managers: {
        keyManager: typeof KeyManager;
        eventManager: typeof EventManager;
        dataManager: typeof DataManager;
    };
    E: ((x?: import("..").ESource | undefined) => import("../E/e").Decimal) & typeof import("../E/e").Decimal;
    classes: {
        boost: typeof import("..").Boost;
        currency: typeof import("..").Currency;
        currencyStatic: typeof import("..").CurrencyStatic;
        attribute: typeof import("..").Attribute;
        grid: typeof import("..").Grid;
        gridCell: typeof import("..").GridCell;
    };
};
/**
 * Hooks the game to the window object.
 */
export { eMathGameWeb as eMath };
