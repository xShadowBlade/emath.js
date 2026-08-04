/**
 * @file Declares classes for managing the event loop
 */
import { ConfigManager } from "./ConfigManager";
// oxlint-disable-next-line @typescript-eslint/no-unused-vars
import type { DataManager } from "./DataManager";

/**
 * An event that could be executed by the event manager.
 * Each event has a {@link shouldTrigger} method that determines if the event should be executed, and a {@link callback} method that is executed when the event is triggered.
 */
abstract class GameEvent {
    /**
     * The name / identifier of the event.
     */
    public id: string;

    /**
     * The callback function to execute when the event triggers.
     * @param dt - The time since the last execution of the event in milliseconds.
     * For timeout events, this will be the time since the event was created..
     * For interval events, this will be the time since the last execution of the event (based on the frame rate).
     */
    public callback: (dt: number) => void;

    protected constructor(id: string, callback: (dt: number) => void) {
        this.id = id;
        this.callback = callback;
    }

    /**
     * Whether or not the event should trigger. Called every frame by the event manager.
     * @param currentTime - The current time in milliseconds (`performance.now()`).
     * @returns The time since the last execution of the event (delta time) in milliseconds, or `false` if the event should not trigger.
     */
    public abstract shouldTrigger(currentTime: number): false | number;

    /**
     * Simulates the passage of time for the event, as if `dt` milliseconds have passed.
     * - For timeout events, this will adjust the time the event was created.
     * - For interval events, this will adjust the last time the event was executed.
     * @param dt - The time to warp by (in milliseconds).
     */
    public abstract timeWarp(dt: number): void;
}

class GameIntervalEvent extends GameEvent {
    /**
     * The delay before the event triggers, in milliseconds.
     * If the delay is less than the time between frames, it will trigger at most once every frame.
     * - A delay of `0` will cause the event to trigger every frame (at the framerate of the event manager).
     * @example
     * 1000 // 1 second
     * @default 0
     */
    public delaySupplier: () => number = () => 0;

    public get delay(): number {
        return this.delaySupplier();
    }
    public set delay(value: number | (() => number)) {
        this.delaySupplier = typeof value === "function" ? value : () => value;
    }

    /**
     * The last time the event was executed.
     * Only used for interval events, but is still defined for all events.
     * Created automatically when the event is added to the event manager.
     * @default performance.now()
     */
    public lastIntervalTime: number;

    /**
     * Creates a new interval event with a dynamic delay.
     * @param id - The name / identifier of the event.
     * @param delaySupplier - A function that returns the delay before the event triggers, in milliseconds.
     * @param callback - The callback function to execute when the event triggers.
     */
    constructor(id: string, delaySupplier: () => number, callback: (dt: number) => void);
    /**
     * Creates a new interval event with a static delay.
     * @param id - The name / identifier of the event.
     * @param delay - The delay before the event triggers, in milliseconds.
     * @param callback - The callback function to execute when the event triggers.
     */
    constructor(id: string, delay: number, callback: (dt: number) => void);

    constructor(id: string, delayOrSupplier: number | (() => number), callback: (dt: number) => void) {
        super(id, callback);
        this.delay = delayOrSupplier;
        this.lastIntervalTime = performance.now();
    }

    public shouldTrigger(currentTime: number): false | number {
        if (currentTime - this.lastIntervalTime < this.delay) {
            return false;
        }

        const dt = currentTime - this.lastIntervalTime;
        this.lastIntervalTime = currentTime;
        return dt;
    }

    public timeWarp(dt: number): void {
        this.lastIntervalTime -= dt;
    }
}

class GameTimeoutEvent extends GameEvent {
    /**
     * The delay before the event triggers, in milliseconds.
     * @example
     * 1000 // 1 second
     * @default 0
     */
    public delay: number;

    /**
     * The time the event was created, in milliseconds.
     * @default performance.now()
     */
    public timeCreated: number;

    constructor(id: string, delay: number, callback: (dt: number) => void) {
        super(id, callback);
        this.delay = delay;
        this.timeCreated = performance.now();
    }

    public shouldTrigger(currentTime: number): false | number {
        if (currentTime - this.timeCreated >= this.delay) {
            const dt = currentTime - this.timeCreated;
            return dt;
        }
        return false;
    }

    public timeWarp(dt: number): void {
        this.timeCreated -= dt;
    }
}

/**
 * A callback that is executed when an event is dispatched.
 */
interface CallbackEvent {
    /**
     * The name of the event that will trigger the callback.
     */
    type: string | EventManagerInternalEvents;

    /**
     * The callback function to execute when the event triggers.
     */
    callback: () => void;
}

/**
 * The event manager configuration interface
 */
interface EventManagerConfig {
    /**
     * Whether or not to automatically add an interval that checks and calls for keybindings.
     * @default true
     */
    autoAddInterval?: boolean;

    /**
     * The framerate at which the event manager will run.
     * Note that events will only trigger at most once every frame.
     * @default 30
     */
    fps?: number;
}

/**
 * The default configuration for the event manager.
 */
const eventManagerDefaultConfig: Required<EventManagerConfig> = {
    autoAddInterval: true,
    fps: 30,
};

/**
 * Special events that are automatically dispatched by the game internally.
 */
enum EventManagerInternalEvents {
    /**
     * The event that is called before data is compiled ({@link DataManager.compileData}).
     */
    beforeCompileData,

    /**
     * The event that is called before data is saved ({@link DataManager.saveData}) but after it is compiled ({@link DataManager.compileData}).
     */
    beforeSaveData,

    /**
     * The event that is called when (after) data is saved ({@link DataManager.saveData}).
     */
    saveData,

    /**
     * The event that is called when (after) data is loaded ({@link DataManager.loadData}).
     */
    loadData,
}

/**
 * The event manager class, used to manage events and execute them at the correct time.
 * @template TEvents - Possible event names that can be used.
 */
class EventManager<TEvents extends string = string> {
    public static readonly defaultFramerateSampleSize = 60;

    /**
     * The static config manager for the event manager.
     */
    protected static readonly configManager = new ConfigManager(eventManagerDefaultConfig, false);

    /**
     * The timed events stored in the event manager.
     */
    protected readonly events: GameEvent[] = [];

    /**
     * The callback events stored in the event manager.
     * Each event is stored as an array of callback functions, which are executed when the event is dispatched.
     */
    protected readonly callbackEvents: Partial<Record<TEvents | EventManagerInternalEvents, CallbackEvent[]>> =
        Object.create(null);

    /**
     * The interval for the event manager.
     */
    protected tickerInterval: number | undefined = undefined;

    /**
     * The request animation frame ID for the event manager.
     */
    protected requestAnimationFrameId: number | undefined = undefined;

    /**
     * The config object.
     */
    public readonly config: Required<EventManagerConfig>;

    protected vsyncEnabled: boolean = false;

    // Framerate calculation
    protected emaAverage: number | undefined = undefined;
    protected lastFrameTime: number | undefined = undefined;

    /**
     * The number of samples to use for the framerate calculation.
     */
    public framerateSampleSize = EventManager.defaultFramerateSampleSize;
    protected get alpha(): number {
        return 2 / (this.framerateSampleSize + 1);
    }

    /**
     * Creates a new event manager.
     * @param config - The config to use for this event manager.
     * @param callbackEventNames - If using callback events, the names of the events to add to the event manager.
     * These events will be added to the event manager's callback events, although you could omit this and add events manually
     * (though this is not recommended as you won't get type checking).
     */
    constructor(config?: EventManagerConfig, callbackEventNames?: readonly TEvents[]) {
        this.config = EventManager.configManager.parse(config);

        // Add the events to the callback events.
        if (callbackEventNames) {
            for (const event of callbackEventNames) {
                this.callbackEvents[event] = [];
            }
        }

        if (this.config.autoAddInterval) {
            this.tickerInterval = setInterval(() => {
                this.tickerFunction();
            }, 1000 / this.config.fps);
        }
    }

    public isVsyncEnabled(): boolean {
        return this.vsyncEnabled;
    }

    public setVsyncEnabled(enabled: boolean): void {
        // Previously disabled, now enabled
        if (enabled && !this.vsyncEnabled) {
            if (this.tickerInterval === undefined) {
                console.warn("eMath.js: VSync enabled but previously defined tickerInterval is undefined.");
            } else {
                clearInterval(this.tickerInterval);
                this.tickerInterval = undefined;
            }

            this.vsyncEnabled = true;
            this.vsyncTickerFunction();
            return;
        }

        // Previously enabled, now disabled
        if (!enabled && this.vsyncEnabled) {
            if (this.requestAnimationFrameId === undefined) {
                console.warn("eMath.js: VSync disabled but previously defined requestAnimationFrameId is undefined.");
            } else {
                cancelAnimationFrame(this.requestAnimationFrameId);
                this.requestAnimationFrameId = undefined;
            }

            this.vsyncEnabled = false;
            this.tickerInterval = setInterval(() => {
                this.tickerFunction();
            }, 1000 / this.config.fps);
            return;
        }
    }

    public getAverageFrameTimeMs(): number {
        if (this.emaAverage === undefined) {
            return 0;
        }
        return this.emaAverage;
    }

    public getFramerate(): number {
        if (this.emaAverage === undefined) {
            return 0;
        }
        return 1000 / this.emaAverage;
    }

    /**
     * Adds a callback to an event.
     * If you want to use a timer event, use {@link EventManager.setEvent} instead.
     * @param event - The event to add the callback to.
     * @param callback - The callback to add to the event.
     */
    public on(event: TEvents | EventManagerInternalEvents, callback: () => void): void {
        // If the event does not exist, create it.
        if (!this.callbackEvents[event]) {
            this.callbackEvents[event] = [];
        }

        // Add the callback to the event.
        this.callbackEvents[event].push({ type: event, callback });
    }

    /**
     * Dispatches / calls all callbacks for an event added with {@link EventManager.on}.
     * @param event - The event to dispatch.
     */
    public dispatch(event: TEvents | EventManagerInternalEvents): void {
        // If the event does not exist, return.
        if (!this.callbackEvents[event]) {
            return;
        }

        // Execute all callbacks for the event.
        for (const callback of this.callbackEvents[event]) {
            callback.callback();
        }
    }

    protected handleEvent(event: GameEvent, currentTime: number): void {
        const dt = event.shouldTrigger(currentTime);
        if (dt === false) {
            return;
        }

        event.callback(dt);
    }

    protected addFrameTimeSample(dt: number): void {
        if (this.emaAverage === undefined) {
            this.emaAverage = dt;
        }

        this.emaAverage = this.alpha * dt + (1 - this.alpha) * this.emaAverage;
    }

    /**
     * The function that is called on each animation frame.
     */
    protected vsyncTickerFunction(): void {
        if (typeof window === "undefined" || typeof window.requestAnimationFrame === "undefined") {
            console.warn("eMath.js: window or window.requestAnimationFrame is undefined. VSync will not work.");
            return;
        }

        this.requestAnimationFrameId = window.requestAnimationFrame((currentTime) => {
            this.tickerFunction(currentTime);
            this.vsyncTickerFunction();
        });
    }

    /**
     * The function that is called every frame, executes all events.
     */
    protected tickerFunction(currentTime: number = performance.now()): void {
        // Iterate through all events and execute them if they should trigger.
        for (const event of this.events) {
            this.handleEvent(event, currentTime);
        }

        // Update the framerate calculation.
        if (this.lastFrameTime === undefined) {
            this.lastFrameTime = currentTime;
            return;
        }

        const dt = currentTime - this.lastFrameTime;

        this.addFrameTimeSample(dt);

        this.lastFrameTime = currentTime;
    }

    /**
     * Changes the framerate of the event manager.
     * @param fps - The new framerate to use.
     */
    public changeFps(fps: number): void {
        // Change the framerate in the config.
        this.config.fps = fps;

        if (this.vsyncEnabled) {
            console.warn(
                `eMath.js: VSync is enabled. Framerate change to "${fps}" will apply the next time VSync is disabled.`,
            );
            return;
        }

        if (!this.tickerInterval) {
            console.warn("eMath.js: Ticker interval is undefined. Cannot change framerate.");
            return;
        }

        // Clear the old interval and create a new one with the new framerate.
        clearInterval(this.tickerInterval);

        this.tickerInterval = setInterval(() => {
            this.tickerFunction();
        }, 1000 / fps);
    }

    /**
     * Warps time by a certain amount.
     * - Events will be triggered as if the time has passed.
     * - The stored creation time of timeout events will be adjusted.
     * @param dt - The time to warp by (in milliseconds).
     */
    public timeWarp(dt: number): void {
        // Iterate through all events and warp the time.
        for (const event of this.events) {
            event.timeWarp(dt);
        }

        this.tickerFunction();
    }

    /**
     * Adds a new event or changes an existing event to the event system.
     * If you want to add a callback event, use {@link EventManager.on} instead.
     * @param event - The event to add or change. If an event with the same name already exists, it will be replaced.
     */
    public addEvent(event: GameEvent): void {
        // If the event already exists, remove it
        this.removeEvent(event);

        this.events.push(event);
    }

    /**
     * Adds a new event.
     * Alias for {@link EventManager.setEvent}. Only here for backwards compatibility.
     * @deprecated Use {@link EventManager.setEvent} instead.
     */
    public setEvent = this.addEvent.bind(this);

    /**
     * Removes a timer event from the event manager.
     * Does not remove callback events.
     * @param name - The name or reference of the event to remove.
     */
    public removeEvent(event: string | GameEvent): void {
        const eventName = typeof event === "string" ? event : event.id;
        const index = this.events.findIndex((e) => e.id === eventName);
        if (index !== -1) {
            this.events.splice(index, 1);
        }
    }
}

export { EventManager, EventManagerInternalEvents, GameEvent, GameIntervalEvent, GameTimeoutEvent };
export type { CallbackEvent, EventManagerConfig };
