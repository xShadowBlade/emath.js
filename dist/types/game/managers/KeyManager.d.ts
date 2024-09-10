/**
 * @file Declares classes for managing key bindings.
 */
/**
 * The key binding interface.
 */
interface KeyBinding {
    /**
     * The id of the key binding, for use when updating.
     * Note: In versions before 8.2.0, `name` was used as the id.
     */
    id: string;
    /**
     * The name of the key binding. You can use this for display purposes.
     * Note: In versions before 8.2.0, this was used as the id.
     */
    name?: string;
    /** The key associated with the binding. */
    key: string;
    /** @deprecated Equivalent to {@link onDownContinuous}. Use either that or {@link onDown}, {@link onPress}, {@link onUp} instead. */
    fn?: (dt: number) => void;
    /**
     * A function that is executed every frame while the binding is being pressed.
     * @param dt - The time since the last frame, in milliseconds.
     */
    onDownContinuous?: (dt: number) => void;
    /**
     * The function executed when the binding is pressed down.
     * Uses the default "keydown" event (which is called once when the key is pressed down, has a slight delay, and then repeats if held down for a while).
     */
    onDown?: () => void;
    /**
     * The function executed when the binding is being pressed.
     */
    onPress?: () => void;
    /**
     * The function executed when the binding is released.
     */
    onUp?: () => void;
}
/**
 * The key manager configuration interface.
 */
interface KeyManagerConfig {
    /**
     * Whether or not to automatically add an interval
     * that checks and calls for keybindings.
     * Defaults to `true`.
     */
    autoAddInterval?: boolean;
    /**
     * The framerate to use for the interval.
     * Defaults to `30`.
     */
    fps?: number;
}
/**
 * An array of possible keys.
 * @deprecated Incomplete and not used (also afaik arrow keys don't register)
 */
declare const keys: string[];
/**
 * Game keys manager for handling key bindings and tracking pressed keys.
 */
declare class KeyManager {
    /** The keys currently being pressed */
    private readonly keysPressed;
    /** The configuration for the key manager */
    private readonly config;
    /** The configuration manager for the key manager */
    private static readonly configManager;
    /** The tickers for the key manager */
    private readonly tickers;
    /** The interval for the key manager */
    private tickerInterval?;
    /** The key bindings */
    readonly binds: KeyBinding[];
    /**
     * Creates a new key manager.
     * @param config - The configuration for the key manager.
     */
    constructor(config?: KeyManagerConfig);
    /**
     * Changes the framerate of the key manager.
     * @param fps - The new framerate to use.
     */
    changeFps(fps: number): void;
    /**
     * Adds keys to the list of keys pressed.
     * @param event - The event to add the key from.
     * @param type - Whether to add or remove the key. `true` to add, `false` to remove.
     */
    private logKey;
    /**
     * Manages onDown, onPress, and onUp events for all key bindings.
     * @param eventType - The type of event to call for.
     * @param keypress - The key that was pressed.
     */
    private onAll;
    /**
     * Checks if a specific key binding is currently being pressed.
     * @param id - The name of the key binding to check.
     * @returns True if the key binding is being pressed, otherwise false.
     */
    private isPressing;
    /**
     * Gets a key binding by its id.
     * @param id - The id of the key binding to get.
     * @returns The key binding, if found.
     */
    private getBind;
    /**
     * Adds or updates a key binding.
     * @deprecated Use the other overload instead, as it is more flexible.
     * @param id - The id of the key binding.
     * @param key - The key associated with the binding.
     * @param fn - The function executed when the binding is pressed
     * @example addKey("Move Up", "w", () => player.velocity.y += player.acceleration.y);
     */
    addKey(id: string, key: string, fn?: (dt: number) => void): void;
    /**
     * Adds or updates multiple key bindings.
     * @param keysToAdd - An array of key binding objects.
     * @example
     * const moveUpKeyBinding: KeyBinding = { name: "Move Up", key: "w", onDownContinuous: () => player.velocity.y += player.acceleration.y };
     * // Use either of the following:
     * addKey(moveUpKeyBinding);
     * // or
     * addKeys([
     *     moveUpKeyBinding,
     *     // Add more key bindings here...
     * ]);
     */
    addKey(keysToAdd: KeyBinding | KeyBinding[]): void;
    /** @deprecated Use {@link addKey} instead. */
    addKeys: {
        (id: string, key: string, fn?: (dt: number) => void): void;
        (keysToAdd: KeyBinding | KeyBinding[]): void;
    };
}
export type { KeyManagerConfig, KeyBinding };
export { KeyManager, keys };
