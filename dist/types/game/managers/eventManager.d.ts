/**
 * @file Declares classes for managing the event loop
 */
import { E } from "../../E/eMain";
import type { Application } from "pixi.js";
interface Event {
    name: string;
    type: "interval" | "timeout";
    delay: number;
    callbackFn: (dt: number) => void;
    timeCreated: number;
}
interface intervalEvent extends Event {
    type: "interval";
    intervalLast: number;
}
interface timeoutEvent extends Event {
}
interface eventManagerConfig {
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
    /**
     * The PIXI application to use for the interval, if you want to use it instead of an interval.
     */
    pixiApp?: Application;
}
/**
 * The event manager class, used to manage events and execute them at the correct time.
 */
declare class eventManager {
    private events;
    private tickerInterval?;
    private static configManager;
    /** The config object */
    config: eventManagerConfig;
    /**
     * @param config - The config to use for this event manager.
     */
    constructor(config?: eventManagerConfig);
    /** The function that is called every frame, executes all events. */
    protected tickerFunction(): void;
    /**
     * Changes the framerate of the event manager.
     * @param fps - The new framerate to use.
     */
    changeFps(fps: number): void;
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
    setEvent(name: string, type: "interval" | "timeout", delay: number | E, callbackFn: (dt: number) => void): void;
    /**
     * Adds a new event
     * @deprecated Use {@link eventManager.setEvent} instead.
     * @alias eventManager.setEvent
     */
    addEvent: (name: string, type: "interval" | "timeout", delay: number | E, callbackFn: (dt: number) => void) => void;
    /**
     * Removes an event from the event system.
     * @param name - The name of the event to remove.
     * @example
     * myEventManger.removeEvent("IntervalEvent"); // Removes the interval event with the name "IntervalEvent".
     */
    removeEvent(name: string): void;
}
export { eventManager, eventManagerConfig, intervalEvent, timeoutEvent, Event };
