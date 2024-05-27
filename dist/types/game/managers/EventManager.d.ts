/**
 * @file Declares classes for managing the event loop
 */
import type { Decimal } from "../../E/e";
/**
 * The type of event
 */
declare enum EventTypes {
    interval = "interval",
    timeout = "timeout"
}
/**
 * The event interface
 */
interface Event {
    /** The name of the event */
    name: string;
    /** The type of the event */
    type: EventTypes;
    /** The delay before the event triggers */
    delay: number;
    /** The callback function to execute when the event triggers */
    callbackFn: (dt: number) => void;
    /** The time the event was created */
    timeCreated: number;
}
/**
 * The interval event interface
 */
interface IntervalEvent extends Event {
    type: EventTypes.interval;
    /** The last time the event was executed */
    intervalLast: number;
}
/**
 * The timeout event interface
 */
type TimeoutEvent = Event;
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
 * The event manager class, used to manage events and execute them at the correct time.
 */
declare class EventManager {
    /** The events stored in the event manager */
    private readonly events;
    /** The interval for the event manager */
    private tickerInterval?;
    /** The static config manager for the event manager */
    private static readonly configManager;
    /** The config object */
    readonly config: EventManagerConfig;
    /**
     * Creates a new event manager.
     * @param config - The config to use for this event manager.
     */
    constructor(config?: EventManagerConfig);
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
     * Removes an event from the event system.
     * @param name - The name of the event to remove.
     * @example
     * myEventManger.removeEvent("IntervalEvent"); // Removes the interval event with the name "IntervalEvent".
     */
    removeEvent(name: string): void;
}
export type { EventManagerConfig, IntervalEvent, TimeoutEvent, Event };
export { EventManager, EventTypes };
