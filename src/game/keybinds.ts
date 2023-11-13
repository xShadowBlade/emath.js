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
class keyManager {
    private keysPressed: string[];
    private config: keyManagerConfig;
    private static defaultConfig: keyManagerConfig = {
        autoAddInterval: true,
        fps: 30,
    };
    private tickers: ((dt: number) => void)[];

    public binds: KeyBinding[];

    constructor (config?: keyManagerConfig) {
        this.keysPressed = [];
        this.binds = [];
        this.tickers = [];

        this.config = config ? config : keyManager.defaultConfig;

        if (this.config.autoAddInterval ? this.config.autoAddInterval : true) {
            const fps = this.config.fps ? this.config.fps : 30;
            setInterval(() => {
                for (const ticker of this.tickers) {
                    ticker(1000 / fps);
                }
            }, 1000 / fps);
        }

        // Key event listeners
        if (typeof document === "undefined") {
            return;
        }
        document.addEventListener("keydown", (e) => this.logKey(e, true));
        document.addEventListener("keyup", (e) => this.logKey(e, false));
    }

    private logKey (this: keyManager, event: KeyboardEvent, type: boolean): void {
        const key = event.key;
        if (type && !this.keysPressed.includes(key)) this.keysPressed.push(key); else if (!type && this.keysPressed.includes(key)) this.keysPressed.splice(this.keysPressed.indexOf(key), 1);
    };

    /**
     * Checks if a specific key binding is currently being pressed.
     *
     * @param {string} name - The name of the key binding to check.
     * @returns {boolean} True if the key binding is being pressed, otherwise false.
     */
    public isPressing (name: string): boolean {
        for (let i = 0; i < this.binds.length; i++) {
            const current = this.binds[i];
            // console.log(current);
            if (current.name === name) {
                return this.keysPressed.includes(current.key);
            }
        }
        return false;
    }

    /**
     * Adds or updates a key binding.
     *
     * @param {string} name - The name of the key binding.
     * @param {string} key - The key associated with the binding.
     * @param {function} [fn] - The function executed when the binding is pressed
     * @example addKey("Move Up", "w", () => Game.player.velocity.y -= Game.player.acceleration);
     */
    public addKey (name: string, key: string, fn?: (dt?: number) => void): void {
        for (let i = 0; i < this.binds.length; i++) {
            const current = this.binds[i];
            if (current.name === name) {
                current.key = key;
                return;
            }
        }
        // if not found (new keybind entirely)
        this.binds.push({ name, key, fn });
        if (typeof fn == "function") {
            this.tickers.push((dt) => {
                if (this.isPressing(name)) fn(dt);
            });
        }
    }

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
    public addKeys (keysToAdd: KeyBinding[]): void {
        for (const keyBinding of keysToAdd) {
            this.addKey(keyBinding.name, keyBinding.key, keyBinding.fn);
        }
    }
};

// keys.addKey("Debug - Reload", "`", () => window.location.reload());

export { keyManager };