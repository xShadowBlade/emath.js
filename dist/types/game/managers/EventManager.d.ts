/**
 * @file Declares classes for managing the event loop
 */
import type { PickOptional } from "../../common/types";
import type { Decimal } from "../../E/e";
/**
 * The type of event.
 * The use of this enum is discouraged.
 */
declare enum EventTypes {
    interval = "interval",
    timeout = "timeout"
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
 * An event that is triggered after a certain delay.
 */
interface TimerEvent {
    /**
     * The name / identifier of the event.
     */
    name: string;
    /**
     * The type of the event.
     * @default "timeout"
     */
    type: EventTypes;
    /**
     * The delay before the event triggers, in milliseconds.
     * If the delay is less than the time between frames, it will trigger at most once every frame.
     * - A delay of `0` will cause the event to trigger every frame regardless of the framerate.
     * @example
     * 1000 // 1 second
     * @default 0
     */
    delay: number;
    /**
     * The callback function to execute when the event triggers.
     * @param dt - The time since the last execution of the event in milliseconds.
     * For timeout events, this will be the time since the event was created..
     * For interval events, this will be the time since the last execution of the event (based on the frame rate).
     */
    callback: (dt: number) => void;
    /**
     * The time the event was created, as a Unix timestamp.
     * Created automatically when the event is added to the event manager.
     */
    timeCreated: number;
    /**
     * The last time the event was executed.
     * Only used for interval events, but is still defined for all events.
     * Created automatically when the event is added to the event manager.
     */
    intervalLast: number;
}
/**
 * A callback that is executed when an event is dispatched.
 */
interface CallbackEvent {
    /**
     * The name of the event that will trigger the callback.
     */
    type: string;
    /**
     * The callback function to execute when the event triggers.
     */
    callback: () => void;
}
/**
 * An event that is triggered at a set interval.
 */
interface IntervalEvent extends TimerEvent {
    type: EventTypes.interval;
    /**
     * The last time the event was executed.
     */
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
 * An interface that extends the event manager events so they have jsdoc comments.
 */
interface EventManagerEventsWithComments {
    /**
     * The event that is called before data is loaded (before {@link DataManager.decompileData}, which is called before {@link DataManager.loadData} with no arguments).
     */
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
 * @template TEvents - Possible event names that can be used.
 */
declare class EventManager<TEvents extends string = string> {
    /** The static config manager for the event manager. */
    private static readonly configManager;
    /** The timer events stored in the event manager. */
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
    constructor(config?: EventManagerConfig, events?: readonly TEvents[]);
    /**
     * Adds a callback to an event.
     * If you want to use a timer event, use {@link EventManager.setEvent} instead.
     * @param event - The event to add the callback to.
     * @param callback - The callback to add to the event.
     */
    on(event: TEvents | EventManagerEvents, callback: () => void): void;
    /**
     * Dispatches / calls all callbacks for an event added with {@link EventManager.on}.
     * @param event - The event to dispatch.
     */
    dispatch(event: TEvents | EventManagerEvents): void;
    /**
     * The function that is called every frame, executes all events.
     */
    private tickerFunction;
    /**
     * Changes the framerate of the event manager.
     * @param fps - The new framerate to use.
     */
    changeFps(fps: number): void;
    /**
     * Warps time by a certain amount.
     * - Events will be triggered as if the time has passed.
     * - The stored creation time of timeout events will be adjusted.
     * @param dt - The time to warp by (in milliseconds).
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
    setEvent(event: EventInit): void;
    /**
     * Adds a new event.
     * Alias for {@link EventManager.setEvent}. Only here for backwards compatibility.
     * @deprecated Use {@link EventManager.setEvent} instead.
     */
    addEvent: {
        (name: string, type: EventTypes | "interval" | "timeout", delay: number | Decimal, callbackFn: (dt: number) => void): void;
        (event: EventInit): void;
    };
    /**
     * Removes a timer event from the event manager.
     * Does not remove callback events.
     * @param name - The name of the event to remove.
     * @example
     * myEventManger.removeEvent("IntervalEvent"); // Removes the interval event with the name "IntervalEvent".
     */
    removeEvent(name: string): void;
}
export type { EventManagerConfig, IntervalEvent, TimeoutEvent, TimerEvent, Event, EventInit, CallbackEvent, EventManagerEvents, };
export { EventManager, EventTypes };
