/**
 * @file Declares classes for managing the event loop
 */
import type { Decimal } from "../../E/e";
/**
 * The type of event
 * @deprecated The use of this enum is discouraged.
 */
declare enum EventTypes {
    interval = "interval",
    timeout = "timeout"
}
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
 * The interval event interface
 */
interface IntervalEvent extends TimerEvent {
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
 * An interface that extends the event manager events so they have jsdoc comments.
 */
interface EventManagerEventsWithComments {
    /**
     * The event that is called before data is loaded (before {@link DataManager.decompileData}, which is called before {@link DataManager.loadData} with no arguments).
     */
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
declare class EventManager<Events extends string = string> {
    /** The static config manager for the event manager */
    private static readonly configManager;
    /** The timer events stored in the event manager */
    private readonly events;
    /**
     * The callback events stored in the event manager.
     * Each event is stored as an array of callback functions, which are executed when the event is dispatched.
     */
    private readonly callbackEvents;
    /** The interval for the event manager */
    private tickerInterval?;
    /** The config object */
    readonly config: EventManagerConfig;
    /**
     * Creates a new event manager.
     * @param config - The config to use for this event manager.
     * @param events - The events to add to the event manager.
     * These events will be added to the event manager's callback events, although you could omit this and add events manually
     * (though this is not recommended as you won't get type checking).
     */
    constructor(config?: EventManagerConfig, events?: readonly Events[]);
    /**
     * Adds a callback to an event.
     * If you want to use a timer event, use {@link EventManager.setEvent} instead.
     * @param event - The event to add the callback to.
     * @param callback - The callback to add to the event.
     */
    on(event: Events | EventManagerEvents, callback: () => void): void;
    /**
     * Dispatches / calls all callbacks for an event added with {@link EventManager.on}.
     * @param event - The event to dispatch.
     */
    dispatch(event: Events | EventManagerEvents): void;
    /**
     * The function that is called every frame, executes all events.
     */
    protected tickerFunction(): void;
    /**
     * Changes the framerate of the event manager.
     * @param fps - The new framerate to use.
     */
    changeFps(fps: number): void;
    /**
     * Warps time by a certain amount. Note: This will affect the stored creation time of timeout events.
     * @param dt - The time to warp by.
     */
    timeWarp(dt: number): void;
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
    setEvent(name: string, type: EventTypes | "interval" | "timeout", delay: number | Decimal, callbackFn: (dt: number) => void): void;
    /**
     * Adds a new event
     * @deprecated Use {@link EventManager.setEvent} instead.
     * @alias eventManager.setEvent
     */
    addEvent: (name: string, type: EventTypes | "interval" | "timeout", delay: number | Decimal, callbackFn: (dt: number) => void) => void;
    /**
     * Removes a timer event from the event manager.
     * Does not remove callback events.
     * @param name - The name of the event to remove.
     * @example
     * myEventManger.removeEvent("IntervalEvent"); // Removes the interval event with the name "IntervalEvent".
     */
    removeEvent(name: string): void;
}
export type { EventManagerConfig, IntervalEvent, TimeoutEvent, TimerEvent as Event, };
export { EventManager, EventTypes };
