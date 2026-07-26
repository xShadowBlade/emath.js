/**
 * @file Game formats class.
 */
import type { BoostObject } from "../classes/Boost";
import { OperationBoostOrder } from "../classes/Boost";
import type { DecimalSource, FormatType } from "../E/e";
import { Decimal } from "../E/e";

/**
 * Interface for format gain settings.
 */
interface FormatSettings {
    /**
     * The format type to be using
     */
    formatType: FormatType;

    /**
     * The format type to be using for time.
     */
    formatTimeType: FormatTimeType;

    /**
     * The number of decimal places/significant figures to display.
     */
    acc: number;

    /**
     * When in mixed scientific format, the maximum number of digits to display with commas before switching to abbreviations.
     */
    max: number;
}

/**
 * Class to represent a game format.
 */
class GameFormatClass {
    private static readonly defaultSettings: FormatSettings = {
        formatType: "mixed_sc",
        formatTimeType: "short",
        acc: 2,
        max: 9,
    };

    public readonly settings: FormatSettings;

    constructor(settings?: Partial<FormatSettings>) {
        this.settings = Object.assign({}, GameFormatClass.defaultSettings, settings);
    }

    /**
     * Formats a game value based on the settings.
     * @param x - The value to format.
     * @returns The formatted value as a string.
     */
    public format(x: DecimalSource): string {
        return Decimal.format(x, this.settings.acc, this.settings.max, this.settings.formatType);
    }

    /**
     * Formats a boost object based on its order/behavior and the provided input value.
     * @param boost - The boost object to format. Should have its {@link BoostObject.order} set to a {@link OperationBoostOrder} and {@link BoostObject.value} set.
     * @param inputValue - The input value to use for formatting. Recommended to leave undefined to use the default input value based on the boost order.
     * @returns The formatted boost object as a string.
     */
    public formatBoostObject(boost: BoostObject | undefined, inputValue?: DecimalSource): string {
        if (!boost) {
            console.warn("eMath.js: GameFormatClass.formatBoostObject: Boost object is undefined. Returning empty string.");
            return "";
        }

        // Determine the input value to use for formatting
        switch (boost.order) {
            case OperationBoostOrder.add:
            case OperationBoostOrder.set:
                inputValue ??= Decimal.dZero;
                break;
            case OperationBoostOrder.multiply:
            case OperationBoostOrder.exponential:
                inputValue ??= Decimal.dOne;
                break;
            case OperationBoostOrder.polynomial:
                inputValue ??= Decimal.dTen;
            break;
            default:
                console.warn(`eMath.js: GameFormatClass.formatBoostObject: Unrecognized/unsupported boost order ${boost.order} (${OperationBoostOrder[boost.order]}). Defaulting input value to 1.`);
                inputValue ??= Decimal.dOne;
        }

        inputValue = Decimal.fromValue_noAlloc(inputValue);
        const boostValue = boost.value(inputValue);

        switch (boost.order) {
            case OperationBoostOrder.set:
                return `=${this.format(boostValue)}`;
            case OperationBoostOrder.add:
                return `+${this.format(boostValue)}`;
            case OperationBoostOrder.multiply:
                return this.mult(boostValue);
            case OperationBoostOrder.polynomial:
                return `^${this.format(boostValue.absLog10())}`;
            case OperationBoostOrder.exponential:
                return `${this.format(boostValue)}^`;
            // Technically unsupported, but we can still format it
            case OperationBoostOrder.tetrate:
                return `^^${this.format(boostValue)}`;
            case OperationBoostOrder.pentate:
                return `^^^${this.format(boostValue)}`;
            default:
                return this.format(boostValue);
        }
    }

    public formatInteger(x: DecimalSource): string {
        return Decimal.formatInteger(
            x,
            new Decimal(this.settings.acc).pow10(),
            this.settings.acc,
            this.settings.max,
            this.settings.formatType,
        );
    }

    /**
     * Formats the gain of a game format based on the provided settings.
     * @param x - The value to format.
     * @param gain - The gain to apply.
     * @returns The formatted gain as a string.
     */
    public gain(x: DecimalSource, gain: DecimalSource): string {
        return Decimal.formatGain(x, gain, this.settings.formatType, this.settings.acc, this.settings.max);
    }

    /**
     * Formats a game value as a time based on the settings.
     * @param x - The value to format.
     * @returns The formatted value as a string.
     */
    public time(x: DecimalSource): string {
        return Decimal.formats.formatTime(x, this.settings.acc, this.settings.formatType);
    }

    /**
     * Formats a game value as a multiplier based on the settings.
     * @param x - The value to format.
     * @returns The formatted value as a string.
     */
    public mult(x: DecimalSource): string {
        return Decimal.formats.formatMult(x, this.settings.acc);
    }
}

/**
 * Interface for format options.
 * @template T - The type of the format option.
 */
interface FormatOption<T = FormatType> {
    name: string;
    value: T;
}

/** Type for time formats */
type FormatTimeType = "short" | "long";

/**
 * A list of format options with their display names and values.
 */
const formatOptions: FormatOption[] = (
    [
        {
            name: "Standard",
            value: "standard",
        },
        {
            name: "Scientific",
            value: "scientific",
        },
        {
            name: "Mixed Scientific (default)",
            value: "mixed_sc",
        },
        {
            name: "Old Scientific",
            value: "old_sc",
        },
        {
            name: "Engineering",
            value: "eng",
        },
        {
            name: "Infinity",
            value: "inf",
        },
        {
            name: "Omega",
            value: "omega",
        },
        {
            name: "Omega Short",
            value: "omega_short",
        },
        {
            name: "Elemental",
            value: "elemental",
        },
        {
            name: "Layer",
            value: "layer",
        },
    ] as FormatOption[]
).sort((a, b) => a.name.localeCompare(b.name));

/**
 * A list of format options with their display names and values for time.
 */
const formatTimeOptions: FormatOption<FormatTimeType>[] = (
    [
        {
            name: "Short (default)",
            value: "short",
        },
        {
            name: "Long",
            value: "long",
        },
    ] as FormatOption<FormatTimeType>[]
).sort((a, b) => a.name.localeCompare(b.name));

export { formatOptions, formatTimeOptions, GameFormatClass };
export type { FormatOption, FormatSettings, FormatTimeType };
