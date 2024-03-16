/**
 * @file Declares classes for managing key bindings.
 */
import type { Application } from "pixi.js";
/**
 * The key binding interface.
 */
interface KeyBinding {
    /** The name of the key binding, for use when updating */
    name: string;
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
     * Uses the default "mousedown" event
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
interface keyManagerConfig {
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
    /** The PIXI application to use for the interval, if you want to use it instead of an interval. */
    pixiApp?: Application;
}
/**
 * An array of possible keys.
 * @deprecated Incomplete and not used (also afaik arrow keys dont register)
 */
declare const keys: string[];
/**
 * Game keys manager for handling key bindings and tracking pressed keys.
 */
declare class keyManager {
    private keysPressed;
    private config;
    private static configManager;
    private tickers;
    private tickerInterval?;
    /** The key bindings */
    binds: KeyBinding[];
    /**
     * Creates a new key manager.
     * @param config - The configuration for the key manager.
     */
    constructor(config?: keyManagerConfig);
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
     * @param name - The name of the key binding to check.
     * @returns True if the key binding is being pressed, otherwise false.
     */
    private isPressing;
    /**
     * Gets a key binding by its name.
     * @param name - The name of the key binding to get.
     * @returns The key binding, if found.
     */
    private getBind;
    /**
     * Adds or updates a key binding.
     * @deprecated Use the other overload instead, as it is more flexible.
     * @param name - The name of the key binding.
     * @param key - The key associated with the binding.
     * @param fn - The function executed when the binding is pressed
     * @example addKey("Move Up", "w", () => player.velocity.y += player.acceleration.y);
     */
    addKey(name: string, key: string, fn?: (dt: number) => void): void;
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
        (name: string, key: string, fn?: ((dt: number) => void) | undefined): void;
        (keysToAdd: KeyBinding | KeyBinding[]): void;
    };
}
export { keyManager, keyManagerConfig, KeyBinding, keys };
