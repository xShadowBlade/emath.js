/**
 * @file Declares classes for managing configuration objects.
 */

/**
 * Represents a configuration object.
 */
class configManager<T> {
    private configOptionTemplate: T;

    constructor (configOptionTemplate: T) {
        this.configOptionTemplate = configOptionTemplate;
    }

    /**
     * Parses the given configuration object and returns a new object with default values for any missing options.
     * @param config - The configuration object to parse.
     * @returns A new object with default values for any missing options.
     */
    public parse (config?: object): T {
        if (typeof config === "undefined") {
            return this.configOptionTemplate;
        }

        const parseObject = (obj: any, template: any) => {
            for (const key in template) {
                if (typeof obj[key] === "undefined") {
                    obj[key] = template[key];
                } else if (typeof obj[key] === "object" && typeof template[key] === "object") {
                    obj[key] = parseObject(obj[key], template[key]);
                }
            }
            return obj;
        };

        return parseObject(config, this.configOptionTemplate) as T;
    }

    get options (): T {
        return this.configOptionTemplate;
    }
}

/** Generic type that recursively makes all properties required */
type RequiredDeep<T> = {
    [P in keyof T]-?: RequiredDeep<T[P]>;
};

export { configManager, RequiredDeep };