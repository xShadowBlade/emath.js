/**
 * @file Declares classes for managing key bindings.
 */

import { configManager } from "./configManager";
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

const keyManagerDefaultConfig: keyManagerConfig = {
    autoAddInterval: true,
    fps: 30,
    pixiApp: undefined,
};

/**
 * An array of possible keys.
 * @deprecated Incomplete and not used (also afaik arrow keys dont register)
 */
const keys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ".split("").concat(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);

/**
 * Game keys manager for handling key bindings and tracking pressed keys.
 */
class keyManager {
    private keysPressed: string[];
    private config: keyManagerConfig;
    private static configManager = new configManager(keyManagerDefaultConfig);

    private tickers: ((dt: number) => void)[];
    private tickerInterval?: ReturnType<typeof setInterval>;

    /** The key bindings */
    public binds: KeyBinding[];

    /**
     * Creates a new key manager.
     * @param config - The configuration for the key manager.
     */
    constructor (config?: keyManagerConfig) {
        this.keysPressed = [];
        this.binds = [];
        this.tickers = [];

        this.config = keyManager.configManager.parse(config);

        if (this.config.autoAddInterval) {
            if (this.config.pixiApp) {
                this.config.pixiApp.ticker.add((dt) => {
                    for (const ticker of this.tickers) {
                        ticker(dt);
                    }
                });
            } else {
                const fps = this.config.fps ? this.config.fps : 30;
                this.tickerInterval = setInterval(() => {
                    for (const ticker of this.tickers) {
                        ticker(1000 / fps);
                    }
                }, 1000 / fps);
            }
        }

        // Key event listeners
        if (typeof document === "undefined") {
            return;
        }
        this.tickers.push((dt) => {
            for (const bind of this.binds) {
                // console.log(bind);
                if ((bind.onDownContinuous || bind.fn) && this.isPressing(bind.name)) {
                    bind.onDownContinuous?.(dt);
                    bind.fn?.(dt);
                }
            }
        });
        document.addEventListener("keydown", (e) => {
            this.logKey(e, true);
            // console.log("down", e.key);
            this.onAll("down", e.key);
        });
        document.addEventListener("keyup", (e) => {
            this.logKey(e, false);
            // console.log("up", e.key);
            this.onAll("up", e.key);
        });
        document.addEventListener("keypress", (e) => {
            // console.log("press", e.key);
            this.onAll("press", e.key);
        });
    }

    /**
     * Changes the framerate of the key manager.
     * @param fps - The new framerate to use.
     */
    public changeFps (fps: number): void {
        this.config.fps = fps;
        if (this.tickerInterval) {
            clearInterval(this.tickerInterval);
            this.tickerInterval = setInterval(() => {
                for (const ticker of this.tickers) {
                    ticker(1000 / fps);
                }
            }, 1000 / fps);
        } else if (this.config.pixiApp) {
            this.config.pixiApp.ticker.maxFPS = fps;
        }
    }

    /**
     * Adds keys to the list of keys pressed.
     * @param event - The event to add the key from.
     * @param type - Whether to add or remove the key. `true` to add, `false` to remove.
     */
    private logKey (this: keyManager, event: KeyboardEvent, type: boolean): void {
        const key = event.key;
        if (type && !this.keysPressed.includes(key)) this.keysPressed.push(key); else if (!type && this.keysPressed.includes(key)) this.keysPressed.splice(this.keysPressed.indexOf(key), 1);
    };

    /**
     * Manages onDown, onPress, and onUp events for all key bindings.
     * @param eventType - The type of event to call for.
     * @param keypress - The key that was pressed.
     */
    private onAll (eventType: "down" | "press" | "up", keypress: string): void {
        // const events = ["onDownContinuous", "onDown", "onPress", "onUp"];
        for (const bind of this.binds) {
            // for (const event of events) {
            //     if (this.isPressing(bind.name) && (bind as any)[event]) {
            //         (bind as any)[event](dt);
            //     }
            //     Handled by constructor
            //     if (event === "onDownContinuous" && bind.onDownContinuous && this.isPressing(bind.name)) {
            //         bind.onDownContinuous();
            //     }
            // }
            if (eventType === "down" && bind.key === keypress && bind.onDown) {
                bind.onDown();
            }
            if (eventType === "press" && bind.key === keypress && bind.onPress) {
                bind.onPress();
            }
            if (eventType === "up" && bind.key === keypress && bind.onUp) {
                bind.onUp();
            }
        }
    }

    /**
     * Checks if a specific key binding is currently being pressed.
     * @param name - The name of the key binding to check.
     * @returns True if the key binding is being pressed, otherwise false.
     */
    private isPressing (name: string): boolean {
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
     * Gets a key binding by its name.
     * @param name - The name of the key binding to get.
     * @returns The key binding, if found.
     */
    private getBind (name: string): KeyBinding | undefined {
        return this.binds.find((current) => current.name === name);
    }

    /**
     * Adds or updates a key binding.
     * @deprecated Use the other overload instead, as it is more flexible.
     * @param name - The name of the key binding.
     * @param key - The key associated with the binding.
     * @param fn - The function executed when the binding is pressed
     * @example addKey("Move Up", "w", () => player.velocity.y += player.acceleration.y);
     */
    public addKey (name: string, key: string, fn?: (dt: number) => void): void;
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
    public addKey (keysToAdd: KeyBinding | KeyBinding[]): void;
    public addKey (nameOrKeysToAdd: string | KeyBinding | KeyBinding[], key?: string, fn?: (dt: number) => void): void {
        nameOrKeysToAdd = typeof nameOrKeysToAdd === "string" ? [{ name: nameOrKeysToAdd, key: (key as string), fn }] : nameOrKeysToAdd;
        nameOrKeysToAdd = Array.isArray(nameOrKeysToAdd) ? nameOrKeysToAdd : [nameOrKeysToAdd];
        for (const keyBinding of nameOrKeysToAdd) {
            const existing = this.getBind(keyBinding.name);
            if (existing) {
                Object.assign(existing, keyBinding);
                continue;
            }
            this.binds.push(keyBinding);
        }
    }

    /** @deprecated Use {@link addKey} instead. */
    public addKeys = this.addKey;
};

// keys.addKey("Debug - Reload", "`", () => window.location.reload());

export { keyManager, keyManagerConfig, KeyBinding, keys };