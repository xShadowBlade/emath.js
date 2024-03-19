/**
 * @file Declares a function that hooks the game to the window object.
 */
import "reflect-metadata";
import { Game } from "./game";
import { KeyManager } from "./managers/keyManager";
import { EventManager } from "./managers/eventManager";
import { DataManager } from "./managers/dataManager";
declare const eMathGameWeb: {
    game: typeof Game;
    managers: {
        keyManager: typeof KeyManager;
        eventManager: typeof EventManager;
        dataManager: typeof DataManager;
    };
    E: ((x?: import("index").ESource | undefined) => import("E/e").Decimal) & typeof import("E/e").Decimal;
    classes: {
        boost: typeof import("index").Boost;
        currency: typeof import("index").Currency;
        currencyStatic: typeof import("index").CurrencyStatic;
        attribute: typeof import("index").Attribute;
        grid: typeof import("index").Grid;
        gridCell: typeof import("index").GridCell;
    };
};
/**
 * Hooks the game to the window object.
 */
export { eMathGameWeb as eMath };
