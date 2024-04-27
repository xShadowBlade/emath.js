/**
 * @file Declares a function that hooks the game to the window object.
 */
import "reflect-metadata";
import { eMath } from "../hookMain";
import * as eMathGame from "./index";
declare const eMathGameWeb: {
    Game: typeof eMathGame.Game;
    gameDefaultConfig: import("./managers/ConfigManager").RequiredDeep<eMathGame.GameConfigOptions>;
    GameCurrency: typeof eMathGame.GameCurrency;
    GameAttribute: typeof eMathGame.GameAttribute;
    GameReset: typeof eMathGame.GameReset;
    KeyManager: typeof eMathGame.KeyManager;
    keys: string[];
    EventManager: typeof eMathGame.EventManager;
    EventTypes: typeof eMathGame.EventTypes;
    DataManager: typeof eMathGame.DataManager;
    LRUCache: typeof eMath.LRUCache;
    ListNode: typeof eMath.ListNode;
    E: ((x?: eMath.ESource | undefined) => import("../E/e").Decimal) & typeof import("../E/e").Decimal;
    FORMATS: {
        omega: {
            config: {
                greek: string;
                infinity: string;
            };
            format(value: eMath.ESource): string;
        };
        omega_short: {
            config: {
                greek: string;
                infinity: string;
            };
            format(value: eMath.ESource): string;
        };
        elemental: {
            config: {
                element_lists: string[][];
            };
            getOffset(group: number): number;
            getAbbreviation(group: number, progress: number): string;
            beyondOg(x: number): string;
            abbreviationLength(group: number): number;
            getAbbreviationAndValue(x: import("../E/e").Decimal): (string | import("../E/e").Decimal)[];
            formatElementalPart(abbreviation: string, n: import("../E/e").Decimal): string;
            format(value: import("../E/e").Decimal, acc?: number): string;
        };
        old_sc: {
            format(ex: eMath.ESource, acc: number): string;
        };
        eng: {
            format(ex: eMath.ESource, acc?: number): string;
        };
        mixed_sc: {
            format(ex: eMath.ESource, acc?: number | undefined, max?: number): string;
        };
        layer: {
            layers: string[];
            format(ex: eMath.ESource, acc?: number, max?: number | undefined): string;
        };
        standard: {
            tier1(x: number): string;
            tier2(x: number): string;
        };
        inf: {
            format(ex: eMath.ESource, acc?: number | undefined, max?: number | undefined): string;
        };
        alphabet: {
            config: {
                alphabet: string;
            };
            getAbbreviation(ex: eMath.ESource, start?: eMath.ESource, startDouble?: boolean, abbStart?: number): string;
            format(ex: eMath.ESource, acc?: number, max?: number, type?: eMath.FormatType, start?: eMath.ESource, startDouble?: boolean, abbStart?: number | undefined): string;
        };
    };
    FormatTypeList: eMath.FormatType[];
    Boost: typeof eMath.Boost;
    BoostObject: typeof eMath.BoostObject;
    UpgradeData: typeof eMath.UpgradeData;
    UpgradeStatic: typeof eMath.UpgradeStatic;
    calculateUpgrade: typeof eMath.calculateUpgrade;
    decimalToJSONString: typeof eMath.decimalToJSONString;
    upgradeToCacheNameEL: typeof eMath.upgradeToCacheNameEL;
    Currency: typeof eMath.Currency;
    CurrencyStatic: typeof eMath.CurrencyStatic;
    Attribute: typeof eMath.Attribute;
    AttributeStatic: typeof eMath.AttributeStatic;
    GridCell: typeof eMath.GridCell;
    Grid: typeof eMath.Grid;
    inverseFunctionApprox: typeof eMath.inverseFunctionApprox;
    calculateSumLoop: typeof eMath.calculateSumLoop;
    calculateSumApprox: typeof eMath.calculateSumApprox;
    calculateSum: typeof eMath.calculateSum;
    roundingBase: typeof eMath.roundingBase;
    DEFAULT_ITERATIONS: 25;
};
export { eMathGameWeb as eMath };
