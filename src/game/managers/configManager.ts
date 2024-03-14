/**
 * @file Declares classes for managing configuration objects.
 */
import type { UnknownObject } from "./dataManager";

/**
 * Represents a configuration object.
 * @template T - The type of the configuration object.
 */
class configManager<T extends UnknownObject | object> {
    /** The template to use for default values. */
    private configOptionTemplate: T;

    /**
     * Constructs a new configuration manager.
     * @param configOptionTemplate - The template to use for default values.
     */
    constructor (configOptionTemplate: T) {
        this.configOptionTemplate = configOptionTemplate;
    }

    /**
     * Parses the given configuration object and returns a new object with default values for any missing options.
     * @param config - The configuration object to parse.
     * @returns A new object with default values for any missing options.
     */
    public parse (config?: UnknownObject | object): T {
        if (typeof config === "undefined") {
            return this.configOptionTemplate;
        }

        /**
         * Parses the given object and returns a new object with default values for any missing options.
         * @param obj - The object to parse.
         * @param template - The template to use for default values.
         * @returns A new object with default values for any missing options.
         */
        function parseObject (obj: UnknownObject, template: UnknownObject) {
            for (const key in template) {
                if (typeof obj[key] === "undefined") {
                    obj[key] = template[key];
                } else if (typeof obj[key] === "object" && typeof template[key] === "object" && !Array.isArray(obj[key]) && !Array.isArray(template[key])) {
                    obj[key] = parseObject((obj as Record<string, UnknownObject>)[key], (template as Record<string, UnknownObject>)[key]);
                }
            }
            return obj;
        }

        return parseObject((config as UnknownObject), (this.configOptionTemplate as UnknownObject)) as T;
    }

    /**
     * @returns The template to use for default values.
     */
    get options (): T {
        return this.configOptionTemplate;
    }
}

/** Generic type that recursively makes all properties required */
type RequiredDeep<T> = {
    [P in keyof T]-?: RequiredDeep<T[P]>;
};

export { configManager };
export type { RequiredDeep };