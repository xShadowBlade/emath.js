/**
 * @file Declares classes for managing the event loop
 */
import type { Decimal } from "../../E/e";
import { ConfigManager } from "./ConfigManager";
// import type { Application } from "pixi.js";
import type { DataManager } from "./DataManager";

/**
 * The type of event
 * @deprecated The use of this enum is discouraged.
 */
// eslint-disable-next-line no-shadow
enum EventTypes {
    interval = "interval",
    timeout = "timeout",
}

/**
 * The event interface.
 * @deprecated Use {@link TimerEvent} instead. This is only here for backwards compatibility.
 */
type Event = TimerEvent;

/**
 * The event interface
 */
interface TimerEvent {
    /**
     * The name of the event
     */
    name: string;

    /**
     * The type of the event
     */
    type: EventTypes;

    /**
     * The delay before the event triggers
     */
    delay: number;

    /**
     * The callback function to execute when the event triggers
     * @param dt - The time since the last execution of the event in milliseconds
     */
    callback: (dt: number) => void;

    /**
     * The time the event was created, as a Unix timestamp
     */
    timeCreated: number;
}

/**
 * The callback event interface
 */
interface CallbackEvent {
    /**
     * The type/event of the callback. Used when it is dispatched.
     *
     * (Should have been named `on` or `event` but it is `type` for consistency with other event types)
     */
    type: string;

    /**
     * The callback function to execute when the event triggers
     */
    callback: () => void;
}

/**
 * The interval event interface
 */
interface IntervalEvent extends TimerEvent {
    // type: "interval";
    type: EventTypes.interval;
    /** The last time the event was executed */
    intervalLast: number;
}

/**
 * The timeout event interface
 */
type TimeoutEvent = TimerEvent

/**
 * The event manager configuration interface
 */
interface EventManagerConfig {
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
 * The default configuration for the event manager
 */
const eventManagerDefaultConfig: EventManagerConfig = {
    autoAddInterval: true,
    fps: 30,
};

/**
 * An interface that extends the event manager events so they have jsdoc comments.
 */
interface EventManagerEventsWithComments {
    /**
     * The event that is called before data is loaded (before {@link DataManager.decompileData}, which is called before {@link DataManager.loadData} with no arguments).
     */
    // beforeLoadData: "beforeLoadData";

    /**
     * The event that is called before data is compiled ({@link DataManager.compileData}).
     */
    beforeCompileData: "beforeCompileData";

    /**
     * The event that is called before data is saved ({@link DataManager.saveData}).
     */
    beforeSaveData: "beforeSaveData";

    /**
     * The event that is called when (after) data is saved ({@link DataManager.saveData}).
     */
    saveData: "saveData";

    /**
     * The event that is called when (after) data is loaded ({@link DataManager.loadData}).
     */
    loadData: "loadData";
}

/**
 * Default event manager events.
 * For more information, see {@link EventManagerEventsWithComments}.
 */
type EventManagerEvents = EventManagerEventsWithComments[keyof EventManagerEventsWithComments];

/**
 * The event manager class, used to manage events and execute them at the correct time.
 */
class EventManager<Events extends string = string> {
    /** The static config manager for the event manager */
    private static readonly configManager = new ConfigManager(eventManagerDefaultConfig);

    /** The timer events stored in the event manager */
    private readonly events: Record<string, (IntervalEvent | TimeoutEvent)>;

    /**
     * The callback events stored in the event manager.
     * Each event is stored as an array of callback functions, which are executed when the event is dispatched.
     */
    private readonly callbackEvents: Record<Events | EventManagerEvents, CallbackEvent[] | undefined>;

    /** The interval for the event manager */
    private tickerInterval?: ReturnType<typeof setInterval>;

    /** The config object */
    public readonly config: EventManagerConfig;

    /**
     * Creates a new event manager.
     * @param config - The config to use for this event manager.
     * @param events - The events to add to the event manager.
     * These events will be added to the event manager's callback events, although you could omit this and add events manually
     * (though this is not recommended as you won't get type checking).
     */
    constructor (config?: EventManagerConfig, events?: readonly Events[]) {
        this.config = EventManager.configManager.parse(config);
        this.events = {};

        // @ts-expect-error - callbackEvents is initialized later
        this.callbackEvents = {};

        // Add the events to the callback events.
        if (events) {
            for (const event of events) {
                this.callbackEvents[event] = [];
            }
        }

        if (this.config.autoAddInterval) {
            const fps = this.config.fps ?? 30;
            this.tickerInterval = setInterval(() => {
                this.tickerFunction();
            }, 1000 / fps);
        }
    }

    /**
     * Adds a callback to an event.
     * If you want to use a timer event, use {@link EventManager.setEvent} instead.
     * @param event - The event to add the callback to.
     * @param callback - The callback to add to the event.
     */
    public on (event: Events | EventManagerEvents, callback: () => void): void {
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
    public dispatch (event: Events | EventManagerEvents): void {
        // If the event does not exist, return.
        if (!this.callbackEvents[event]) {
            return;
        }

        // Execute all callbacks for the event.
        for (const callback of this.callbackEvents[event]) {
            callback.callback();
        }
    }

    /**
     * The function that is called every frame, executes all events.
     */
    protected tickerFunction (): void {
        const currentTime = Date.now();
        for (const event of Object.values(this.events)) {
            // const event = this.events[i];

            switch (event.type) {
                case EventTypes.interval: {
                // If interval
                    if (currentTime - (event as IntervalEvent).intervalLast >= event.delay) {
                        const dt = currentTime - (event as IntervalEvent).intervalLast;
                        event.callback(dt);
                        (event as IntervalEvent).intervalLast = currentTime;
                    }
                }; break;
                case EventTypes.timeout: {
                    const dt = currentTime - event.timeCreated;
                    // If timeout
                    if (currentTime - event.timeCreated >= event.delay) {
                        event.callback(dt);
                        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                        delete this.events[event.name];
                    // this.events.splice(i, 1);
                    // i--;
                    }
                }; break;
            }
        }
    }

    /**
     * Changes the framerate of the event manager.
     * @param fps - The new framerate to use.
     */
    public changeFps (fps: number): void {
        this.config.fps = fps;
        if (this.tickerInterval) {
            clearInterval(this.tickerInterval);
            this.tickerInterval = setInterval(() => {
                this.tickerFunction();
            }, 1000 / fps);
        }
    }

    /**
     * Warps time by a certain amount. Note: This will affect the stored creation time of timeout events.
     * @param dt - The time to warp by.
     */
    public timeWarp (dt: number): void {
        for (const event of Object.values(this.events)) {
            switch (event.type) {
                case EventTypes.interval: {
                    (event as IntervalEvent).intervalLast -= dt;
                }; break;
                case EventTypes.timeout: {
                // ! might cause issues
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                    (event as TimeoutEvent).timeCreated -= dt;
                }; break;
            }
        }
    }

    /**
     * Adds a new event or changes an existing event to the event system.
     * If you want to add a callback event, use {@link EventManager.on} instead.
     * @param name - The name of the event. If an event with this name already exists, it will be overwritten.
     * @param type - The type of the event, either "interval" or "timeout".
     * @param delay - The delay in milliseconds before the event triggers. (NOTE: If delay is less than the framerate, it will at trigger at max, once every frame.)
     * @param callbackFn - The callback function to execute when the event triggers.
     * @example
     * const myEventManger = new eventManager();
     * // Add an interval event that executes every 2 seconds.
     * myEventManger.addEvent("IntervalEvent", "interval", 2000, () => {
     *    console.log("Interval event executed.");
     * });
     *
     * // Add a timeout event that executes after 5 seconds.
     * myEventManger.addEvent("TimeoutEvent", "timeout", 5000, () => {
     *   console.log("Timeout event executed.");
     * });
     */
    public setEvent (name: string, type: EventTypes | "interval" | "timeout", delay: number | Decimal, callbackFn: (dt: number) => void): void {
        this.events[name] = ((): IntervalEvent | TimeoutEvent => {
            switch (type) {
                case "interval": {
                    const event: IntervalEvent = {
                        name,
                        type: type as EventTypes.interval,
                        delay: typeof delay === "number" ? delay : delay.toNumber(),
                        callback: callbackFn,
                        timeCreated: Date.now(),
                        intervalLast: Date.now(),
                    };
                    return event;
                    // eslint-disable-next-line no-unreachable
                }; break;
                case "timeout": default: {
                    const event: TimeoutEvent = {
                        name,
                        type: type as EventTypes.timeout,
                        delay: typeof delay === "number" ? delay : delay.toNumber(),
                        callback: callbackFn,
                        timeCreated: Date.now(),
                    };

                    return event;
                }
            }
        })();
    };

    /**
     * Adds a new event
     * @deprecated Use {@link EventManager.setEvent} instead.
     * @alias eventManager.setEvent
     */
    public addEvent = this.setEvent.bind(this);

    /**
     * Removes a timer event from the event manager.
     * Does not remove callback events.
     * @param name - The name of the event to remove.
     * @example
     * myEventManger.removeEvent("IntervalEvent"); // Removes the interval event with the name "IntervalEvent".
     */
    public removeEvent (name: string): void {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete this.events[name];
    }
};

export type { EventManagerConfig, IntervalEvent, TimeoutEvent, TimerEvent as Event };
export { EventManager, EventTypes };
