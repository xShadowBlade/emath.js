/**
 * @file Game formats class.
 */
import type { DecimalSource, FormatType } from "../E/e";
import type { Pointer } from "../common/types";
/**
 * Interface for format gain settings.
 */
interface FormatGainSettings {
    /** The format type to be using */
    formatType?: FormatType;
    /** The number of decimal places to display */
    acc?: number;
    /** The maximum number of digits to display */
    max?: number;
}
/**
 * Interface for format settings.
 */
interface FormatSettings extends FormatGainSettings {
    /** Whether to format as time */
    time?: boolean;
    /** Whether to format as a multiplier */
    multi?: boolean;
    /** The format type to be using for time */
    formatTimeType?: FormatTimeType;
}
/**
 * Function to format a game value with various settings.
 * @param value - The value to format.
 * @param settings - The settings to use for formatting.
 * @returns The formatted value.
 */
declare function gameFormat(value: DecimalSource, settings: FormatSettings): string;
/**
 * Formats the gain of a game format based on the provided settings.
 * @param value - The value to format.
 * @param gain - The gain to apply.
 * @param settings - The settings for formatting the gain.
 * @returns The formatted gain as a string.
 */
declare function gameFormatGain(value: DecimalSource, gain: DecimalSource, settings: FormatGainSettings): string;
/**
 * Class to represent a game format.
 */
declare class GameFormatClass {
    /**
     * A pointer to the settings to use for formatting.
     */
    private readonly settingsFn;
    /**
     * @returns The settings to use for formatting.
     */
    get settings(): FormatSettings;
    constructor(settings: Pointer<FormatSettings>);
    /**
     * Formats a game value based on the settings.
     * @param x - The value to format.
     * @returns The formatted value as a string.
     */
    format: (x: DecimalSource) => string;
    /**
     * Formats the gain of a game format based on the provided settings.
     * @param x - The value to format.
     * @param gain - The gain to apply.
     * @returns The formatted gain as a string.
     */
    gain: (x: DecimalSource, gain: DecimalSource) => string;
    /**
     * Formats a game value as a time based on the settings.
     * @param x - The value to format.
     * @returns The formatted value as a string.
     */
    time: (x: DecimalSource) => string;
    /**
     * Formats a game value as a multiplier based on the settings.
     * @param x - The value to format.
     * @returns The formatted value as a string.
     */
    multi: (x: DecimalSource) => string;
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
declare const formatOptions: FormatOption[];
/**
 * A list of format options with their display names and values for time.
 */
declare const formatTimeOptions: FormatOption<FormatTimeType>[];
export { GameFormatClass, formatOptions, formatTimeOptions, gameFormat, gameFormatGain, };
export type { FormatGainSettings, FormatSettings, FormatTimeType, FormatOption, };
