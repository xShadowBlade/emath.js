/**
 * @file Declares classes for managing key bindings.
 */
import type { Game } from "../Game";
import { ConfigManager } from "./ConfigManager";
import { GameIntervalEvent } from "./EventManager";

/**
 * The key binding interface.
 */
class KeyBinding {
    /**
     * The id of the key binding, for use when updating.
     */
    public id: string;

    /**
     * The key associated with the binding.
     * @see {@link KeyboardEvent.key} for a list of possible key values.
     */
    public key: string;

    /**
     * The name of the key binding. You can use this for display purposes.
     * Defaults to the id of the key binding if not provided.
     */
    public name: string = "";

    /**
     * Creates a new key binding.
     * @param id - The {@link id}.
     * @param key - The {@link key}.
     * @param name - The {@link name}. If not provided, defaults to the id of the key binding.
     */
    constructor(id: string, key: string, name?: string) {
        this.id = id;
        this.key = key;
        this.name = name ?? id;
    }

    /**
     * A function that is executed every frame while the binding is being pressed.
     * @param dt - The time since the last frame, in milliseconds.
     */
    public onDownContinuous?: (dt: number) => void;

    /**
     * The function executed when the binding is pressed down.
     * Uses the default "keydown" event (which is called once when the key is pressed down, has a slight delay, and then repeats if held down for a while).
     * @see {@link GlobalEventHandlers.onkeydown} for more information on the "keydown" event.
     */
    public onDown?: () => void;

    /**
     * The function executed when the binding is released.
     * @see {@link GlobalEventHandlers.onkeyup} for more information on the "keyup" event.
     */
    public onUp?: () => void;

    // Chainable setters
    /** @see {@link KeyBinding.onDownContinuous} */
    public withOnDownContinuous(fn: (dt: number) => void): this {
        this.onDownContinuous = fn;
        return this;
    }

    /** @see {@link KeyBinding.onDown} */
    public withOnDown(fn: () => void): this {
        this.onDown = fn;
        return this;
    }

    /** @see {@link KeyBinding.onUp} */
    public withOnUp(fn: () => void): this {
        this.onUp = fn;
        return this;
    }
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
}

const keyManagerDefaultConfig: Required<KeyManagerConfig> = {
    autoAddInterval: true,
};

/**
 * Handles key bindings and pressed keys.
 */
class KeyManager {
    /**
     * The configuration manager for the key manager.
     */
    protected static readonly configManager = new ConfigManager(keyManagerDefaultConfig, false);

    /**
     * The configuration for the key manager.
     */
    protected readonly config: Required<KeyManagerConfig>;

    /**
     * The keys currently being pressed.
     */
    protected readonly keysPressed: string[] = [];

    /**
     * The game reference.
     */
    protected readonly gameReference: Game;

    /**
     * The key bindings.
     */
    public readonly binds: KeyBinding[] = [];

    /**
     * Creates a new key manager.
     * @param gameRef - The game reference.
     * @param config - The configuration for the key manager.
     */
    constructor(gameRef: Game, config?: KeyManagerConfig) {
        this.gameReference = gameRef;

        this.config = KeyManager.configManager.parse(config);

        // Key event listeners
        if (typeof document === "undefined") {
            console.warn("eMath.js: document is undefined. Key events will not be registered.");
            return;
        }

        this.gameReference.eventManager.addEvent(
            new GameIntervalEvent("keyManager_ticker", 0, (dt) => {
                for (const bind of this.binds) {
                    if (this.isPressing(bind)) {
                        bind.onDownContinuous?.(dt);
                    }
                }
            }),
        );

        document.addEventListener("keydown", (keyboardEvent) => {
            this.logKey(keyboardEvent, true);
            this.onAll("down", keyboardEvent.key);
        });
        document.addEventListener("keyup", (keyboardEvent) => {
            this.logKey(keyboardEvent, false);
            this.onAll("up", keyboardEvent.key);
        });
    }

    /**
     * Adds keys to the list of keys pressed.
     * @param event - The event to add the key from.
     * @param type - Whether to add or remove the key. `true` to add, `false` to remove.
     */
    protected logKey(event: KeyboardEvent, type: boolean): void {
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
    protected onAll(eventType: "down" | "up", keypress: string): void {
        for (const bind of this.binds) {
            if (bind.key !== keypress) continue;

            switch (eventType) {
                case "down":
                    bind.onDown?.();
                    break;
                case "up":
                    bind.onUp?.();
                    break;
            }
        }
    }

    /**
     * Checks if a specific key binding is currently being pressed.
     * @param keyBinding - The key binding to check.
     * @returns `true` if the key binding is being pressed, otherwise `false`.
     */
    public isPressing(keyBinding: KeyBinding): boolean {
        return this.keysPressed.includes(keyBinding.key);
    }

    /**
     * Gets a key binding by its id.
     * @param id - The id of the key binding to get.
     * @returns The key binding, if found.
     */
    public getBind(id: string): KeyBinding | undefined {
        return this.binds.find((current) => current.id === id);
    }

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
    public addKey(keysToAdd: KeyBinding | KeyBinding[]): void {
        keysToAdd = Array.isArray(keysToAdd) ? keysToAdd : [keysToAdd];
        for (const key of keysToAdd) {
            const existingBind = this.getBind(key.id);
            if (existingBind) {
                this.removeKey(existingBind);
            }

            this.binds.push(key);
        }
    }

    public removeKey(idOrKey: string | KeyBinding): void {
        const id = typeof idOrKey === "string" ? idOrKey : idOrKey.id;
        const index = this.binds.findIndex((bind) => bind.id === id);

        if (index !== -1) {
            this.binds.splice(index, 1);
        }
    }
}

export { KeyBinding, KeyManager };
export type { KeyManagerConfig };
