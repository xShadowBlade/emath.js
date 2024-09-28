/**
 * @file Declares classes for managing the event loop
 */
import type { PickOptional } from "../../common/types";
import type { Decimal } from "../../E/e";
import { ConfigManager } from "./ConfigManager";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { DataManager } from "./DataManager";

/**
 * The type of event.
 * The use of this enum is discouraged.
 */
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
 * The interface used for initializing an event.
 * See {@link EventManager.setEvent}.
 */
type EventInit = PickOptional<Omit<TimerEvent, "timeCreated" | "intervalLast">, "type" | "delay">;

/**
 * The event interface
 */
interface TimerEvent {
    /**
     * The name / identifier of the event
     */
    name: string;

    /**
     * The type of the event
     * @default "timeout"
     */
    type: EventTypes;

    /**
     * The delay before the event triggers
     * @default 0
     */
    delay: number;

    /**
     * The callback function to execute when the event triggers
     * @param dt - The time since the last execution of the event in milliseconds
     * For timeout events, this will be the time since the event was created.
     * For interval events, this will be the time since the last execution of the event (based on the frame rate).
     */
    callback: (dt: number) => void;

    /**
     * The time the event was created, as a Unix timestamp/
     * Created automatically when the event is added to the event manager.
     */
    timeCreated: number;

    /**
     * The last time the event was executed
     * Only used for interval events, but is still defined for all events.
     * Created automatically when the event is added to the event manager.
     */
    intervalLast: number;
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
type TimeoutEvent = TimerEvent;

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
    beforeCompileData: true;

    /**
     * The event that is called before data is saved ({@link DataManager.saveData}).
     */
    beforeSaveData: true;

    /**
     * The event that is called when (after) data is saved ({@link DataManager.saveData}).
     */
    saveData: true;

    /**
     * The event that is called when (after) data is loaded ({@link DataManager.loadData}).
     */
    loadData: true;
}

/**
 * Default event manager events.
 * For more information, see {@link EventManagerEventsWithComments}.
 */
type EventManagerEvents = keyof EventManagerEventsWithComments & string;

/**
 * The event manager class, used to manage events and execute them at the correct time.
 */
class EventManager<Events extends string = string> {
    /** The static config manager for the event manager */
    private static readonly configManager = new ConfigManager(eventManagerDefaultConfig);

    /** The timer events stored in the event manager */
    private readonly events: Record<string, IntervalEvent | TimeoutEvent>;

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
    constructor(config?: EventManagerConfig, events?: readonly Events[]) {
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
    public on(event: Events | EventManagerEvents, callback: () => void): void {
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
    public dispatch(event: Events | EventManagerEvents): void {
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
    private tickerFunction(): void {
        /**
         * The current time in milliseconds.
         * Used to calculate the time since the last execution of the event,
         * and to check if the event should trigger.
         */
        const currentTime = Date.now();

        // Iterate through all events and execute them if they should trigger.
        for (const event of Object.values(this.events)) {
            switch (event.type) {
                // prettier-ignore
                case EventTypes.interval: {
                    // Check if the time since the last execution of the event is greater than the delay.
                    if (currentTime - event.intervalLast >= event.delay) {
                        // Calculate the time since the last execution of the event.
                        const dt = currentTime - event.intervalLast;

                        // Execute the event callback.
                        event.callback(dt);

                        // Update the last execution time of the event.
                        event.intervalLast = currentTime;
                    }
                }
                break;

                // prettier-ignore
                case EventTypes.timeout: {
                    // Check if the time since the event was created is greater than the delay.
                    if (currentTime - event.timeCreated >= event.delay) {
                        // Calculate the time since the last execution of the event.
                        const dt = currentTime - event.timeCreated;

                        // Execute the event callback.
                        event.callback(dt);

                        // Remove the event from the event manager.
                        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                        delete this.events[event.name];
                    }
                }
                break;
            }
        }
    }

    /**
     * Changes the framerate of the event manager.
     * @param fps - The new framerate to use.
     */
    public changeFps(fps: number): void {
        // Change the framerate in the config.
        this.config.fps = fps;

        // Clear the old interval and create a new one with the new framerate.
        if (this.tickerInterval) {
            clearInterval(this.tickerInterval);

            this.tickerInterval = setInterval(() => {
                this.tickerFunction();
            }, 1000 / fps);
        }
    }

    /**
     * Warps time by a certain amount. Note: This will affect the stored creation time of timeout events.
     * @param dt - The time to warp by (in milliseconds).
     */
    public timeWarp(dt: number): void {
        // Iterate through all events and warp the time.
        for (const event of Object.values(this.events)) {
            switch (event.type) {
                case EventTypes.interval:
                    // If interval event, subtract the time warped from the last interval time.
                    // This will cause the event to trigger as if the time has passed.
                    event.intervalLast -= dt;
                    break;

                case EventTypes.timeout:
                    // If timeout event, subtract the time warped from the time created.
                    // ! might cause issues
                    event.timeCreated -= dt;
                    break;
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
    public setEvent(
        name: string,
        type: EventTypes | "interval" | "timeout",
        delay: number | Decimal,
        callbackFn: (dt: number) => void,
    ): void;
    public setEvent(event: EventInit): void;

    public setEvent(
        nameOrEvent: string | EventInit,
        type?: EventTypes | "interval" | "timeout",
        delay?: number | Decimal,
        callbackFn?: (dt: number) => void,
    ): void {
        /**
         * - `true` if the event is being initialized with an object.
         */
        const isEventInit = typeof nameOrEvent !== "string";

        const eventToAdd: IntervalEvent | TimeoutEvent = {
            // Default values
            // name: Symbol(),
            type: EventTypes.timeout,
            delay: 0,
            // callback: () => {},

            // If the event is being initialized with an object, spread the object.
            // Otherwise, assign the values from the arguments.
            // prettier-ignore
            ...(isEventInit ? nameOrEvent : {
                name: nameOrEvent as string,
                type: type as EventTypes,
                delay : delay as number,
                callback: callbackFn as (dt: number) => void,
            } as EventInit),

            // Assign the default values.
            timeCreated: Date.now(),

            // If the event is an interval event, set the last interval time to now.
            intervalLast: type === "interval" ? Date.now() : 0,
        };

        this.events[eventToAdd.name] = eventToAdd;
    }

    /**
     * Adds a new event.
     * Alias for {@link EventManager.setEvent}. Only here for backwards compatibility.
     * @deprecated Use {@link EventManager.setEvent} instead.
     */
    public addEvent = this.setEvent.bind(this);

    /**
     * Removes a timer event from the event manager.
     * Does not remove callback events.
     * @param name - The name of the event to remove.
     * @example
     * myEventManger.removeEvent("IntervalEvent"); // Removes the interval event with the name "IntervalEvent".
     */
    public removeEvent(name: string): void {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete this.events[name];
    }
}

export type {
    EventManagerConfig,
    IntervalEvent,
    TimeoutEvent,
    TimerEvent,
    Event,
    EventInit,
    CallbackEvent,
    EventManagerEvents,
};
export { EventManager, EventTypes };
