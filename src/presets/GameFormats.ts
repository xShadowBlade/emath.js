/**
 * @file Game formats class.
 */
import { E, ESource, FormatType } from "../E/eMain";
import type { Pointer } from "../game/Game";

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
function gameFormat (value: ESource, settings: FormatSettings): string {
    // Assign default settings (deprecated as default parameters are used instead)
    settings = Object.assign({
        formatType: "mixed_sc",
        acc: 2,
        max: 9,
    }, settings);

    // console.log("gameFormat settings", settings);

    const { formatType, acc, max, time, multi, formatTimeType } = settings;

    // Format time
    if (time) {
        switch (formatTimeType) {
            case "short":
                return E.formats.formatTime(value, acc, formatType);
            case "long":
                return E.formats.formatTimeLong(value, true, 0, max, formatType);
        }
    }

    // Format multi
    if (multi) {
        // TODO: Fix params
        return E.formats.formatMult(value, acc);
    }
    return E.format(value, acc, max, formatType);
};

/**
 * Formats the gain of a game format based on the provided settings.
 * @param value - The value to format.
 * @param gain - The gain to apply.
 * @param settings - The settings for formatting the gain.
 * @returns The formatted gain as a string.
 */
function gameFormatGain (value: ESource, gain: ESource, settings: FormatGainSettings): string {
    // return gameFormat(value, props.settings);
    const { formatType, acc, max } = settings;
    return E.formatGain(value, gain, formatType, acc, max);
}

/**
 * Class to represent a game format.
 */
class GameFormatClass {
    /**
     * A pointer to the settings to use for formatting.
     */
    private readonly settingsFn: () => FormatSettings;
    /**
     * @returns The settings to use for formatting.
     */
    public get settings (): FormatSettings {
        return this.settingsFn();
    }
    constructor (settings: Pointer<FormatSettings>) {
        // this.settings = settings;
        this.settingsFn = typeof settings === "function" ? settings : (): FormatSettings => settings;
    }

    /**
     * Formats a game value based on the settings.
     * @param x - The value to format.
     * @returns The formatted value as a string.
     */
    public format = (x: ESource): string => gameFormat(x, this.settings);

    /**
     * Formats the gain of a game format based on the provided settings.
     * @param x - The value to format.
     * @param gain - The gain to apply.
     * @returns The formatted gain as a string.
     */
    public gain = (x: ESource, gain: ESource): string => gameFormatGain(x, gain, this.settings);

    /**
     * Formats a game value as a time based on the settings.
     * @param x - The value to format.
     * @returns The formatted value as a string.
     */
    public time = (x: ESource): string => gameFormat(x, { ...this.settings, time: true });

    /**
     * Formats a game value as a multiplier based on the settings.
     * @param x - The value to format.
     * @returns The formatted value as a string.
     */
    public multi = (x: ESource): string => gameFormat(x, { ...this.settings, multi: true });
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
const formatOptions: FormatOption[] = ([
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
] as FormatOption[]).sort((a, b) => a.name.localeCompare(b.name));

/**
 * A list of format options with their display names and values for time.
 */
const formatTimeOptions: FormatOption<FormatTimeType>[] = ([
    {
        name: "Short (default)",
        value: "short",
    },
    {
        name: "Long",
        value: "long",
    },
] as FormatOption<FormatTimeType>[]).sort((a, b) => a.name.localeCompare(b.name));

export { GameFormatClass, formatOptions, formatTimeOptions, gameFormat, gameFormatGain };
export type { FormatGainSettings, FormatSettings, FormatTimeType, FormatOption };