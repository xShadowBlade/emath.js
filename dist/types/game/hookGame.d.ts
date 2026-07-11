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
    GameReset: typeof eMathGame.GameReset;
    KeyManager: typeof eMathGame.KeyManager;
    keys: string[];
    EventManager: typeof eMathGame.EventManager;
    EventTypes: typeof eMathGame.EventTypes;
    DataManager: typeof eMathGame.DataManager;
    DataManagerEntry: typeof eMathGame.DataManagerEntry;
    SubscribableDataEntry: typeof eMathGame.SubscribableDataEntry;
    parseObject: typeof eMathGame.parseObject;
    ConfigManager: typeof eMathGame.ConfigManager;
    eMathMetadata: {
        version: string;
        "break_eternity.js": {
            version: string;
        };
    };
    Boost: typeof eMathMain.Boost;
    BoostObject: typeof eMathMain.BoostObject;
    OperationBoostOrder: typeof eMathMain.OperationBoostOrder;
    Currency: typeof eMathMain.Currency;
    CurrencyData: typeof eMathMain.CurrencyData;
    GridCell: typeof eMathMain.GridCell;
    GridCellCollection: typeof eMathMain.GridCellCollection;
    Grid: typeof eMathMain.Grid;
    InvalidDecimalProtections: typeof eMathMain.InvalidDecimalProtections;
    calculateInverseFunction: typeof eMathMain.calculateInverseFunction;
    inverseFunctionApprox: typeof eMathMain.inverseFunctionApprox;
    inverseFunctionApproxUsingNewtonRaphson: typeof eMathMain.inverseFunctionApproxUsingNewtonRaphson;
    mean(a: eMathMain.DecimalSource, b: eMathMain.DecimalSource, mode?: eMathMain.MeanMode): eMathMain.Decimal;
    geometricEqualsTolerance: typeof eMathMain.geometricEqualsTolerance;
    approximateDerivative: typeof eMathMain.approximateDerivative;
    newtonRaphson: typeof eMathMain.newtonRaphson;
    decimalMagDifference: typeof eMathMain.decimalMagDifference;
    roundingBase: typeof eMathMain.roundingBase;
    DEFAULT_ITERATIONS: 30;
    DEFAULT_ITERATIONS_AS_DECIMAL: Readonly<eMathMain.Decimal>;
    DEFAULT_TOLERANCE: 0.0001;
    MeanMode: typeof eMathMain.MeanMode;
    gaussianRandom: typeof eMathMain.gaussianRandom;
    poissonRandom: typeof eMathMain.poissonRandom;
    sampleFromBinomialDistribution: typeof eMathMain.sampleFromBinomialDistribution;
    calculateSumLoop: typeof eMathMain.calculateSumLoop;
    calculateSumApprox: typeof eMathMain.calculateSumApprox;
    calculateSum: typeof eMathMain.calculateSum;
    SelectionMethod: typeof eMathMain.SelectionMethod;
    RandomSelector: typeof eMathMain.RandomSelector;
    RarestFirstCascadeSelectionMethod: typeof eMathMain.RarestFirstCascadeSelectionMethod;
    SkillNode: typeof eMathMain.SkillNode;
    Upgrade: typeof eMathMain.Upgrade;
    UpgradeData: typeof eMathMain.UpgradeData;
    CachedUpgradeLookupMode: typeof eMathMain.CachedUpgradeLookupMode;
    CachedUpgradeTreeNode: typeof eMathMain.CachedUpgradeTreeNode;
    LowerCachedUpgradeLookup: typeof eMathMain.LowerCachedUpgradeLookup;
    DecimalArray: typeof eMathMain.DecimalArray;
    EXP_LIMIT: 9000000000000000;
    LAYER_DOWN: number;
    NUMBER_EXP_MAX: 308;
    f_maglog10: (n: number) => number;
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
        formatMult: (ex: eMathMain.DecimalSource, acc?: number, max?: number) => string;
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
    LRUCache: typeof eMathMain.LRUCache;
    ListNode: typeof eMathMain.ListNode;
    E: ((x?: eMathMain.DecimalSource) => eMathMain.Decimal) & typeof eMathMain.Decimal;
    getSupplierFromPointer: typeof eMathMain.getSupplierFromPointer;
};
export default eMath;
