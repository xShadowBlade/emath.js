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
    E: ((x?: import("..").ESource | undefined) => import("../E/e").Decimal) & typeof import("../E/e").Decimal;
    classes: {
        boost: typeof import("../classes/boost").boost;
        currency: typeof import("../classes/currency").currency;
        currencyStatic: typeof import("../classes/currency").currencyStatic;
        attribute: typeof import("../classes/attribute").attribute;
        grid: typeof import("../classes/grid").grid;
        gridCell: typeof import("../classes/grid").gridCell;
    };
};
/**
 * Hooks the game to the window object.
 */
export { eMathGameWeb as eMath };
