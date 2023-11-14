/**
 * Represents a configuration object.
 */
declare class configManager<T> {
    private configOptionTemplate;
    constructor(configOptionTemplate: T);
    /**
     * Parses the given configuration object and returns a new object with default values for any missing options.
     * @param config - The configuration object to parse.
     * @returns A new object with default values for any missing options.
     */
    parse(config?: object): T;
    get options(): T;
}
/**
 * Generic type that recursively makes all properties required
 */
type RequiredDeep<T> = {
    [P in keyof T]-?: RequiredDeep<T[P]>;
};
export { configManager, RequiredDeep };
