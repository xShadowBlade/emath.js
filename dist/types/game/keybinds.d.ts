/**
 * @file js/keybinds
 * @description
 * This TypeScript file defines and manages key bindings, tracks keyboard key states,
 * and provides functionality for customizing user input handling within a game or application.
 *
 * @module keybinds
 */
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
}
/**
 * Game keys manager for handling key bindings and tracking pressed keys.
 *
 * @namespace
 * @property {string[]} keysPressed - An array to track currently pressed keys.
 * @property {KeyBinding[]} binds - An array of key bindings, each specifying a name and associated key.
 */
declare class keyManager {
    private keysPressed;
    private config;
    private static defaultConfig;
    private tickers;
    binds: KeyBinding[];
    constructor(config?: keyManagerConfig);
    private logKey;
    /**
     * Checks if a specific key binding is currently being pressed.
     *
     * @param {string} name - The name of the key binding to check.
     * @returns {boolean} True if the key binding is being pressed, otherwise false.
     */
    isPressing(name: string): boolean;
    /**
     * Adds or updates a key binding.
     *
     * @param {string} name - The name of the key binding.
     * @param {string} key - The key associated with the binding.
     * @param {function} [fn] - The function executed when the binding is pressed
     * @example addKey("Move Up", "w", () => Game.player.velocity.y -= Game.player.acceleration);
     */
    addKey(name: string, key: string, fn?: (dt?: number) => void): void;
    /**
     * Adds or updates multiple key bindings.
     *
     * @param {KeyBinding[]} keysToAdd - An array of key binding objects.
     * @example
     * addKeys([
     *     { name: "Move Up", key: "w", fn: () => Game.player.velocity.y -= Game.player.acceleration },
     *     // Add more key bindings here...
     * ]);
     */
    addKeys(keysToAdd: KeyBinding[]): void;
}
export { keyManager };
