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
function parseObject(obj: UnknownObject, template: UnknownObject, recurse = true): UnknownObject {
    for (const key in template) {
        if (typeof obj[key] === "undefined") {
            obj[key] = template[key];
        } else if (
            recurse &&
            typeof obj[key] === "object" &&
            typeof template[key] === "object" &&
            !Array.isArray(obj[key]) &&
            !Array.isArray(template[key])
        ) {
            obj[key] = parseObject(
                (obj as Record<string, UnknownObject>)[key],
                (template as Record<string, UnknownObject>)[key],
            );
        }
    }
    return obj;
}

/**
 * A class for managing configuration objects.
 * This class allows you to define a template for default values and then parse configuration objects to ensure that all required options are present.
 * @template T - The type of the configuration object.
 */
class ConfigManager<T extends UnknownObject | object> {
    /**
     * The template to use for default values.
     */
    private readonly configOptionTemplate: T;

    /**
     * Whether or not the configuration is being parsed recursively.
     */
    private readonly isParsingRecursive: boolean;

    /**
     * Constructs a new configuration manager.
     * @param configOptionTemplate - The template to use for default values.
     * @param isParsingRecursive - Whether or not the configuration is being parsed recursively. Defaults to `true`.
     */
    constructor(configOptionTemplate: T, isParsingRecursive = true) {
        this.configOptionTemplate = configOptionTemplate;
        this.isParsingRecursive = isParsingRecursive;
    }

    /**
     * Parses the given configuration object and returns a new object with default values for any missing options.
     * @param config - The configuration object to parse.
     * @returns A new object with default values for any missing options.
     */
    public parse(config?: UnknownObject | object): T {
        // If the config is undefined, return the template directly.
        if (typeof config === "undefined") {
            return this.configOptionTemplate;
        }

        return parseObject(
            config as UnknownObject,
            this.configOptionTemplate as UnknownObject,
            this.isParsingRecursive,
        ) as T;
    }

    /**
     * @returns The template to use for default values.
     */
    get options(): T {
        return this.configOptionTemplate;
    }
}

/** Generic type that recursively makes all properties required */
type RequiredDeep<T> = {
    [P in keyof T]-?: RequiredDeep<T[P]>;
};

export { parseObject, ConfigManager };
export type { RequiredDeep };
