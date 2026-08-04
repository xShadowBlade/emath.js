/**
 * @file
 */
import type { FormatType } from "../E/e";
import type { Game } from "../game";
import type { SubscribableDataEntry } from "../game/managers/DataEntry";
import type { FormatSettings, FormatTimeType } from "./GameFormats";

const defaultBaseSettings = {
    formatType: "mixed_sc" as FormatType,
    formatTimeType: "short" as FormatTimeType,
    formatAcc: 2,
    formatMax: 9,
} satisfies FormatSettings;

type RecordToDataEntry<TSettings> = {
    [K in keyof TSettings]: SubscribableDataEntry<TSettings[K]>;
};

/**
 * Creates a record of {@link SubscribableDataEntry} instances for each property in the provided settings object.
 * @template TSettings - The type of the settings object.
 * @param gameInstance - The instance of the game; its data manager will be used to create the data entries.
 * @param settings - The settings object.
 * @param prefix - An optional prefix for the data keys in the data manager. Defaults to `"settings_"`.
 * @returns A record where each key corresponds to a property in the settings object, and each value is a {@link SubscribableDataEntry} for that property.
 * @example
 * const settings = {
 *     ...defaultBaseSettings,
 *     theme: "dark" as "dark" | "light",
 * }
 *
 * const dataEntries = createDataEntriesForRecord(gameInstance, settings);
 * // { (...), theme: SubscribableDataEntry<"dark" | "light"> }
 */
function createDataEntriesForRecord<TSettings extends Record<string, unknown>>(
    gameInstance: Game,
    settings: TSettings,
    prefix: string = "settings_",
): RecordToDataEntry<TSettings> {
    const result: RecordToDataEntry<TSettings> = {} as RecordToDataEntry<TSettings>;

    for (const key in settings) {
        if (Object.prototype.hasOwnProperty.call(settings, key)) {
            result[key] = gameInstance.dataManager.useDataEntry(`${prefix}${key}`, settings[key]);
        }
    }

    return result;
}

export { createDataEntriesForRecord, defaultBaseSettings };
export type { RecordToDataEntry };
