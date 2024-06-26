/**
 * @file Declares classes for managing configuration objects.
 */
import type { UnknownObject } from "../../common/types";
/**
 * Represents a configuration object.
 * @template T - The type of the configuration object.
 */
declare class ConfigManager<T extends UnknownObject | object> {
    /** The template to use for default values. */
    private readonly configOptionTemplate;
    /**
     * Constructs a new configuration manager.
     * @param configOptionTemplate - The template to use for default values.
     */
    constructor(configOptionTemplate: T);
    /**
     * Parses the given configuration object and returns a new object with default values for any missing options.
     * @param config - The configuration object to parse.
     * @returns A new object with default values for any missing options.
     */
    parse(config?: UnknownObject | object): T;
    /**
     * @returns The template to use for default values.
     */
    get options(): T;
}
/** Generic type that recursively makes all properties required */
type RequiredDeep<T> = {
    [P in keyof T]-?: RequiredDeep<T[P]>;
};
export { ConfigManager };
export type { RequiredDeep };
