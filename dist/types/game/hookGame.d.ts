/**
 * @file Declares a function that hooks the game to the window object.
 */
import "reflect-metadata";
import eMathMain from "../hookMain";
import * as eMathGame from "./index";
declare const eMath: {
    Game: typeof eMathGame.Game;
    gameDefaultConfig: eMathGame.RequiredDeep<eMathGame.GameConfigOptions>;
    GameCurrency: typeof eMathGame.GameCurrency;
    GameAttribute: typeof eMathGame.GameAttribute;
    GameReset: typeof eMathGame.GameReset;
    KeyManager: typeof eMathGame.KeyManager;
    keys: string[];
    EventManager: typeof eMathGame.EventManager;
    EventTypes: typeof eMathGame.EventTypes;
    DataManager: typeof eMathGame.DataManager;
    ConfigManager: typeof eMathGame.ConfigManager;
    LRUCache: typeof eMathMain.LRUCache;
    ListNode: typeof eMathMain.ListNode;
    E: ((x?: eMathMain.ESource | undefined) => import("../E/e").Decimal) & typeof import("../E/e").Decimal;
    FORMATS: {
        omega: {
            config: {
                greek: string;
                infinity: string;
            };
            format(value: eMathMain.ESource): string;
        };
        omega_short: {
            config: {
                greek: string;
                infinity: string;
            };
            format(value: eMathMain.ESource): string;
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
            format(ex: eMathMain.ESource, acc: number): string;
        };
        eng: {
            format(ex: eMathMain.ESource, acc?: number): string;
        };
        mixed_sc: {
            format(ex: eMathMain.ESource, acc?: number | undefined, max?: number): string;
        };
        layer: {
            layers: string[];
            format(ex: eMathMain.ESource, acc?: number, max?: number | undefined): string;
        };
        standard: {
            tier1(x: number): string;
            tier2(x: number): string;
        };
        inf: {
            format(ex: eMathMain.ESource, acc?: number | undefined, max?: number | undefined): string;
        };
        alphabet: {
            config: {
                alphabet: string;
            };
            getAbbreviation(ex: eMathMain.ESource, start?: eMathMain.ESource, startDouble?: boolean, abbStart?: number): string;
            format(ex: eMathMain.ESource, acc?: number, max?: number, type?: eMathMain.FormatType, start?: eMathMain.ESource, startDouble?: boolean, abbStart?: number | undefined): string;
        };
    };
    FormatTypeList: eMathMain.FormatType[];
    Boost: typeof eMathMain.Boost;
    BoostObject: typeof eMathMain.BoostObject;
    UpgradeData: typeof eMathMain.UpgradeData;
    UpgradeStatic: typeof eMathMain.UpgradeStatic;
    calculateUpgrade: typeof eMathMain.calculateUpgrade;
    decimalToJSONString: typeof eMathMain.decimalToJSONString;
    upgradeToCacheNameEL: typeof eMathMain.upgradeToCacheNameEL;
    Currency: typeof eMathMain.Currency;
    CurrencyStatic: typeof eMathMain.CurrencyStatic;
    Attribute: typeof eMathMain.Attribute;
    AttributeStatic: typeof eMathMain.AttributeStatic;
    GridCell: typeof eMathMain.GridCell;
    Grid: typeof eMathMain.Grid;
    equalsTolerance: typeof eMathMain.equalsTolerance;
    inverseFunctionApprox: typeof eMathMain.inverseFunctionApprox;
    calculateSumLoop: typeof eMathMain.calculateSumLoop;
    calculateSumApprox: typeof eMathMain.calculateSumApprox;
    calculateSum: typeof eMathMain.calculateSum;
    roundingBase: typeof eMathMain.roundingBase;
    DEFAULT_ITERATIONS: 30;
};
export default eMath;
