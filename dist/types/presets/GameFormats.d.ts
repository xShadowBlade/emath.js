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
declare class GameFormatClass {
    private static readonly defaultSettings;
    readonly settings: FormatSettings;
    constructor(settings?: Partial<FormatSettings>);
    /**
     * Formats a game value based on the settings.
     * @param x - The value to format.
     * @returns The formatted value as a string.
     */
    format(x: DecimalSource): string;
    formatInteger(x: DecimalSource): string;
    /**
     * Formats the gain of a game format based on the provided settings.
     * @param x - The value to format.
     * @param gain - The gain to apply.
     * @returns The formatted gain as a string.
     */
    gain(x: DecimalSource, gain: DecimalSource): string;
    /**
     * Formats a game value as a time based on the settings.
     * @param x - The value to format.
     * @returns The formatted value as a string.
     */
    time(x: DecimalSource): string;
    /**
     * Formats a game value as a multiplier based on the settings.
     * @param x - The value to format.
     * @returns The formatted value as a string.
     */
    mult(x: DecimalSource): string;
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
export { GameFormatClass, formatOptions, formatTimeOptions };
export type { FormatSettings, FormatTimeType, FormatOption };
