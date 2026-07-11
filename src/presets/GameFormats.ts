/**
 * @file Game formats class.
 */
import { Decimal } from "../E/e";
import type { DecimalSource, FormatType } from "../E/e";

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

export { GameFormatClass, formatOptions, formatTimeOptions };
export type { FormatSettings, FormatTimeType, FormatOption };
