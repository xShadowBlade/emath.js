/**
 * @file Declares classes for managing key bindings.
 */
import type { Application } from "pixi.js";
interface KeyBinding {
    name: string;
    key: string;
    fn?: (dt: number) => void;
}
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
/** An array of possible keys. (incomplete) */
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
    private logKey;
    /**
     * Checks if a specific key binding is currently being pressed.
     * @param name - The name of the key binding to check.
     * @returns True if the key binding is being pressed, otherwise false.
     */
    private isPressing;
    /**
     * Adds or updates a key binding.
     * @param name - The name of the key binding.
     * @param key - The key associated with the binding.
     * @param [fn] - The function executed when the binding is pressed
     * @example addKey("Move Up", "w", () => Game.player.velocity.y -= Game.player.acceleration);
     */
    addKey(name: string, key: string, fn?: (dt: number) => void): void;
    /**
     * Adds or updates multiple key bindings.
     * @param keysToAdd - An array of key binding objects.
     * @deprecated Use {@link addKey} instead.
     * @example
     * addKeys([
     *     { name: "Move Up", key: "w", fn: () => Game.player.velocity.y -= Game.player.acceleration },
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
