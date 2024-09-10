/**
 * @file Declares classes for managing key bindings.
 */

import { ConfigManager } from "./ConfigManager";

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

const keyManagerDefaultConfig: KeyManagerConfig = {
    autoAddInterval: true,
    fps: 30,
};

/**
 * An array of possible keys.
 * @deprecated Incomplete and not used (also afaik arrow keys don't register)
 */
const keys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 "
    .split("")
    .concat(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);

/**
 * Game keys manager for handling key bindings and tracking pressed keys.
 */
class KeyManager {
    /** The keys currently being pressed */
    private readonly keysPressed: string[];

    /** The configuration for the key manager */
    private readonly config: KeyManagerConfig;

    /** The configuration manager for the key manager */
    private static readonly configManager = new ConfigManager(
        keyManagerDefaultConfig,
    );

    /** The tickers for the key manager */
    private readonly tickers: ((dt: number) => void)[];

    /** The interval for the key manager */
    private tickerInterval?: ReturnType<typeof setInterval>;

    /** The key bindings */
    public readonly binds: KeyBinding[];

    /**
     * Creates a new key manager.
     * @param config - The configuration for the key manager.
     */
    constructor(config?: KeyManagerConfig) {
        this.keysPressed = [];
        this.binds = [];
        this.tickers = [];

        this.config = KeyManager.configManager.parse(config);

        if (this.config.autoAddInterval) {
            const fps = this.config.fps ? this.config.fps : 30;
            this.tickerInterval = setInterval(() => {
                for (const ticker of this.tickers) {
                    ticker(1000 / fps);
                }
            }, 1000 / fps);
        }

        // Key event listeners
        if (typeof document === "undefined") {
            return;
        }

        this.tickers.push((dt) => {
            for (const bind of this.binds) {
                // console.log(bind);
                if (
                    (typeof bind.onDownContinuous !== "undefined" ||
                        typeof bind.fn !== "undefined") &&
                    this.isPressing(bind.id)
                ) {
                    bind.onDownContinuous?.(dt);
                    bind.fn?.(dt);
                }
            }
        });
        document.addEventListener("keydown", (e) => {
            this.logKey(e, true);
            this.onAll("down", e.key);
        });
        document.addEventListener("keyup", (e) => {
            this.logKey(e, false);
            this.onAll("up", e.key);
        });
        document.addEventListener("keypress", (e) => {
            this.onAll("press", e.key);
        });
    }

    /**
     * Changes the framerate of the key manager.
     * @param fps - The new framerate to use.
     */
    public changeFps(fps: number): void {
        this.config.fps = fps;
        if (this.tickerInterval) {
            clearInterval(this.tickerInterval);
            this.tickerInterval = setInterval(() => {
                for (const ticker of this.tickers) {
                    ticker(1000 / fps);
                }
            }, 1000 / fps);
        }
    }

    /**
     * Adds keys to the list of keys pressed.
     * @param event - The event to add the key from.
     * @param type - Whether to add or remove the key. `true` to add, `false` to remove.
     */
    private logKey(event: KeyboardEvent, type: boolean): void {
        const key = event.key;
        if (type && !this.keysPressed.includes(key)) {
            this.keysPressed.push(key);
        } else if (!type && this.keysPressed.includes(key)) {
            this.keysPressed.splice(this.keysPressed.indexOf(key), 1);
        }
    }

    /**
     * Manages onDown, onPress, and onUp events for all key bindings.
     * @param eventType - The type of event to call for.
     * @param keypress - The key that was pressed.
     */
    private onAll(eventType: "down" | "press" | "up", keypress: string): void {
        for (const bind of this.binds) {
            if (bind.key !== keypress) continue;

            switch (eventType) {
                case "down":
                    bind.onDown?.();
                    break;
                case "press":
                default:
                    bind.onPress?.();
                    break;
                case "up":
                    bind.onUp?.();
                    break;
            }
        }
    }

    /**
     * Checks if a specific key binding is currently being pressed.
     * @param id - The name of the key binding to check.
     * @returns True if the key binding is being pressed, otherwise false.
     */
    private isPressing(id: string): boolean {
        for (const current of this.binds) {
            if (current.id === id) {
                return this.keysPressed.includes(current.key);
            }
        }
        return false;
    }

    /**
     * Gets a key binding by its id.
     * @param id - The id of the key binding to get.
     * @returns The key binding, if found.
     */
    private getBind(id: string): KeyBinding | undefined {
        return this.binds.find((current) => current.id === id);
    }

    /**
     * Adds or updates a key binding.
     * @deprecated Use the other overload instead, as it is more flexible.
     * @param id - The id of the key binding.
     * @param key - The key associated with the binding.
     * @param fn - The function executed when the binding is pressed
     * @example addKey("Move Up", "w", () => player.velocity.y += player.acceleration.y);
     */
    public addKey(id: string, key: string, fn?: (dt: number) => void): void;
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
    public addKey(keysToAdd: KeyBinding | KeyBinding[]): void;
    public addKey(
        nameOrKeysToAdd: string | KeyBinding | KeyBinding[],
        key?: string,
        fn?: (dt: number) => void,
    ): void {
        nameOrKeysToAdd =
            typeof nameOrKeysToAdd === "string"
                ? {
                      id: nameOrKeysToAdd,
                      name: nameOrKeysToAdd,
                      key: key ?? "",
                      fn,
                  }
                : nameOrKeysToAdd;

        nameOrKeysToAdd = Array.isArray(nameOrKeysToAdd)
            ? nameOrKeysToAdd
            : [nameOrKeysToAdd];
        for (const keyBinding of nameOrKeysToAdd) {
            // Backwards compatibility: In versions before 8.2.0, `name` was used as the id.
            // If `id` is not provided, use `name` as the id.
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            keyBinding.id = keyBinding.id ?? keyBinding.name;

            const existing = this.getBind(keyBinding.id);
            if (existing) {
                // ! Not sure if this is works since it is assigned by reference
                Object.assign(existing, keyBinding);
                continue;
            }
            this.binds.push(keyBinding);
        }
    }

    /** @deprecated Use {@link addKey} instead. */
    public addKeys = this.addKey.bind(this);
}

export type { KeyManagerConfig, KeyBinding };
export { KeyManager, keys };
