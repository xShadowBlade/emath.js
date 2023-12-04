/**
 * @file Declares classes for managing key bindings.
 */
import type { Application } from "pixi.js";
interface KeyBinding {
    name: string;
    key: string;
    fn?: (dt?: number) => void;
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
    /**
     * The PIXI application to use for the interval, if you want to use it instead of an interval.
     */
    pixiApp?: Application;
}
/**
 * Game keys manager for handling key bindings and tracking pressed keys.
 */
declare class keyManager {
    private keysPressed;
    private config;
    private static configManager;
    private tickers;
    binds: KeyBinding[];
    constructor(config?: keyManagerConfig);
    private logKey;
    /**
     * Checks if a specific key binding is currently being pressed.
     * @param name - The name of the key binding to check.
     * @returns True if the key binding is being pressed, otherwise false.
     */
    isPressing(name: string): boolean;
    /**
     * Adds or updates a key binding.
     * @param name - The name of the key binding.
     * @param key - The key associated with the binding.
     * @param [fn] - The function executed when the binding is pressed
     * @example addKey("Move Up", "w", () => Game.player.velocity.y -= Game.player.acceleration);
     */
    addKey(name: string, key: string, fn?: (dt?: number) => void): void;
    /**
     * Adds or updates multiple key bindings.
     * @param keysToAdd - An array of key binding objects.
     * @example
     * addKeys([
     *     { name: "Move Up", key: "w", fn: () => Game.player.velocity.y -= Game.player.acceleration },
     *     // Add more key bindings here...
     * ]);
     */
    addKeys(keysToAdd: KeyBinding[]): void;
}
export { keyManager };
