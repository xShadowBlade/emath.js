/**
 * @file Declares a function that hooks the game to the window object.
 */
import "reflect-metadata";
import eMathMain from "../hookMain";
import * as eMathGame from "./index";
declare const eMath: {
    Game: typeof eMathGame.Game;
    gameDefaultConfig: {
        readonly mode: "production";
        readonly name: {
            readonly title: "";
            readonly id: "";
            readonly version: "0.0.0";
        };
        readonly settings: {
            readonly framerate: 30;
        };
        readonly initIntervalBasedManagers: true;
        readonly localStorage: Storage | undefined;
    };
    GameCurrency: typeof eMathGame.GameCurrency;
    GameAttribute: typeof eMathGame.GameAttribute;
    GameReset: typeof eMathGame.GameReset;
    KeyManager: typeof eMathGame.KeyManager;
    keys: string[];
    EventManager: typeof eMathGame.EventManager;
    EventTypes: typeof eMathGame.EventTypes;
    DataManager: typeof eMathGame.DataManager;
    ConfigManager: typeof eMathGame.ConfigManager;
    eMathMetadata: {
        version: string;
        "break_eternity.js": {
            version: string;
        };
    };
    LRUCache: typeof eMathMain.LRUCache;
    ListNode: typeof eMathMain.ListNode;
    formats: {
        toSubscript: (value: number) => string;
        toSuperscript: (value: number) => string;
        formatST: (ex: eMathMain.DecimalSource, acc?: number, max?: number, type?: "sc" | "st" | eMathMain.FormatType) => string;
        format: (ex: eMathMain.DecimalSource, acc?: number, max?: number, type?: eMathMain.FormatType) => string;
        formatGain: (amt: eMathMain.DecimalSource, gain: eMathMain.DecimalSource, type?: eMathMain.FormatType, acc?: number, max?: number) => string;
        formatTime: (ex: eMathMain.DecimalSource, acc?: number, type?: string) => string;
        formatTimeLong: (ex: eMathMain.DecimalSource, ms?: boolean, acc?: number, max?: number, type?: eMathMain.FormatType) => string;
        formatReduction: (ex: eMathMain.DecimalSource) => string;
        formatPercent: (ex: eMathMain.DecimalSource) => string;
        formatMult: (ex: eMathMain.DecimalSource, acc?: number) => string;
        expMult: (a: eMathMain.DecimalSource, b: eMathMain.DecimalSource, base?: number) => eMathMain.Decimal;
        metric: (num: eMathMain.DecimalSource, type?: 0 | 1 | 2 | 3) => string;
        ev: (num: eMathMain.DecimalSource, c2?: boolean) => string;
        omega: {
            config: {
                greek: string;
                infinity: string;
            };
            format(value: eMathMain.DecimalSource): string;
        };
        omega_short: {
            config: {
                greek: string;
                infinity: string;
            };
            format(value: eMathMain.DecimalSource): string;
        };
        elemental: {
            config: {
                element_lists: string[][];
            };
            getOffset(group: number): number;
            getAbbreviation(group: number, progress: number): string;
            beyondOg(x: number): string;
            abbreviationLength(group: number): number;
            getAbbreviationAndValue(x: eMathMain.Decimal): [string, eMathMain.Decimal];
            formatElementalPart(abbreviation: string, n: eMathMain.Decimal): string;
            format(value: eMathMain.Decimal, acc?: number): string;
        };
        old_sc: {
            format(ex: eMathMain.DecimalSource, acc: number): string;
        };
        eng: {
            format(ex: eMathMain.DecimalSource, acc?: number): string;
        };
        mixed_sc: {
            format(ex: eMathMain.DecimalSource, acc?: number, max?: number): string;
        };
        layer: {
            layers: string[];
            format(ex: eMathMain.DecimalSource, acc?: number, max?: number): string;
        };
        standard: {
            tier1(x: number): string;
            tier2(x: number): string;
        };
        inf: {
            format(ex: eMathMain.DecimalSource, acc?: number, max?: number): string;
        };
        alphabet: {
            config: {
                alphabet: string;
            };
            getAbbreviation(ex: eMathMain.DecimalSource, start?: eMathMain.DecimalSource, startDouble?: boolean, abbStart?: number): string;
            format(ex: eMathMain.DecimalSource, acc?: number, max?: number, type?: eMathMain.FormatType, start?: eMathMain.DecimalSource, startDouble?: boolean, abbStart?: number): string;
        };
    };
    FORMATS: {
        omega: {
            config: {
                greek: string;
                infinity: string;
            };
            format(value: eMathMain.DecimalSource): string;
        };
        omega_short: {
            config: {
                greek: string;
                infinity: string;
            };
            format(value: eMathMain.DecimalSource): string;
        };
        elemental: {
            config: {
                element_lists: string[][];
            };
            getOffset(group: number): number;
            getAbbreviation(group: number, progress: number): string;
            beyondOg(x: number): string;
            abbreviationLength(group: number): number;
            getAbbreviationAndValue(x: eMathMain.Decimal): [string, eMathMain.Decimal];
            formatElementalPart(abbreviation: string, n: eMathMain.Decimal): string;
            format(value: eMathMain.Decimal, acc?: number): string;
        };
        old_sc: {
            format(ex: eMathMain.DecimalSource, acc: number): string;
        };
        eng: {
            format(ex: eMathMain.DecimalSource, acc?: number): string;
        };
        mixed_sc: {
            format(ex: eMathMain.DecimalSource, acc?: number, max?: number): string;
        };
        layer: {
            layers: string[];
            format(ex: eMathMain.DecimalSource, acc?: number, max?: number): string;
        };
        standard: {
            tier1(x: number): string;
            tier2(x: number): string;
        };
        inf: {
            format(ex: eMathMain.DecimalSource, acc?: number, max?: number): string;
        };
        alphabet: {
            config: {
                alphabet: string;
            };
            getAbbreviation(ex: eMathMain.DecimalSource, start?: eMathMain.DecimalSource, startDouble?: boolean, abbStart?: number): string;
            format(ex: eMathMain.DecimalSource, acc?: number, max?: number, type?: eMathMain.FormatType, start?: eMathMain.DecimalSource, startDouble?: boolean, abbStart?: number): string;
        };
    };
    ST_NAMES: string[][][];
    FormatTypeList: eMathMain.FormatType[];
    Decimal: typeof eMathMain.Decimal;
    Boost: typeof eMathMain.Boost;
    BoostObject: typeof eMathMain.BoostObject;
    UpgradeData: typeof eMathMain.UpgradeData;
    UpgradeStatic: typeof eMathMain.UpgradeStatic;
    calculateUpgrade: typeof eMathMain.calculateUpgrade;
    decimalToJSONString: typeof eMathMain.decimalToJSONString;
    upgradeToCacheNameEL: typeof eMathMain.upgradeToCacheNameEL;
    Item: typeof eMathMain.Item;
    ItemData: typeof eMathMain.ItemData;
    calculateItem: typeof eMathMain.calculateItem;
    Currency: typeof eMathMain.Currency;
    CurrencyStatic: typeof eMathMain.CurrencyStatic;
    Attribute: typeof eMathMain.Attribute;
    AttributeStatic: typeof eMathMain.AttributeStatic;
    GridCell: typeof eMathMain.GridCell;
    GridCellCollection: typeof eMathMain.GridCellCollection;
    Grid: typeof eMathMain.Grid;
    mean(a: eMathMain.DecimalSource, b: eMathMain.DecimalSource, mode?: eMathMain.MeanMode): eMathMain.Decimal;
    equalsTolerance: typeof eMathMain.equalsTolerance;
    roundingBase: typeof eMathMain.roundingBase;
    DEFAULT_ITERATIONS: 30;
    DEFAULT_TOLERANCE: 0.001;
    calculateSumLoop: typeof eMathMain.calculateSumLoop;
    calculateSumApprox: typeof eMathMain.calculateSumApprox;
    calculateSum: typeof eMathMain.calculateSum;
    calculateSumApproxOld: typeof eMathMain.calculateSumApproxOld;
    calculateInverseFunction: typeof eMathMain.calculateInverseFunction;
    inverseFunctionApprox: typeof eMathMain.inverseFunctionApprox;
    E: ((x?: eMathMain.DecimalSource) => eMathMain.Decimal) & typeof eMathMain.Decimal;
};
export default eMath;
