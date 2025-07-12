/**
 * @file Declares classes for managing configuration objects.
 */
import type { UnknownObject } from "../../common/types";
/**
 * Parses the given object and returns a new object with default values for any missing options.
 * @param obj - The object to parse.
 * @param template - The template to use for default values.
 * @param recurse - Whether to parse nested objects recursively. Defaults to `true`.
 * @returns A new object with default values for any missing options.
 */
declare function parseObject(obj: UnknownObject, template: UnknownObject, recurse?: boolean): UnknownObject;
/**
 * A class for managing configuration objects.
 * This class allows you to define a template for default values and then parse configuration objects to ensure that all required options are present.
 * @template T - The type of the configuration object.
 */
declare class ConfigManager<T extends UnknownObject | object> {
    /**
     * The template to use for default values.
     */
    private readonly configOptionTemplate;
    /**
     * Whether or not the configuration is being parsed recursively.
     */
    private readonly isParsingRecursive;
    /**
     * Constructs a new configuration manager.
     * @param configOptionTemplate - The template to use for default values.
     * @param isParsingRecursive - Whether or not the configuration is being parsed recursively. Defaults to `true`.
     */
    constructor(configOptionTemplate: T, isParsingRecursive?: boolean);
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
export { parseObject, ConfigManager };
export type { RequiredDeep };
