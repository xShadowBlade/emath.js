/**
 * @file Declares a function that hooks the game to the window object.
 */
import "reflect-metadata";
import { game } from "./game";
import { keyManager } from "./managers/keyManager";
import { eventManager } from "./managers/eventManager";
import { dataManager } from "./managers/dataManager";
declare const eMathGameWeb: {
    game: typeof game;
    managers: {
        keyManager: typeof keyManager;
        eventManager: typeof eventManager;
        dataManager: typeof dataManager;
    };
    E: ((x?: import("index").ESource | undefined) => import("E/e").Decimal) & typeof import("E/e").Decimal;
    classes: {
        boost: typeof import("index").boost;
        currency: typeof import("index").currency;
        currencyStatic: typeof import("index").currencyStatic;
        attribute: typeof import("index").attribute;
        grid: typeof import("index").grid;
        gridCell: typeof import("index").gridCell;
    };
};
/**
 * Hooks the game to the window object.
 */
export { eMathGameWeb as eMath };
