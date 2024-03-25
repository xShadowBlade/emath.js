/**
 * @file Declares classes for managing the event loop
 */
import { E } from "../../E/eMain";
import { ConfigManager } from "./configManager";
import type { Application } from "pixi.js";

/**
 * The type of event
 */
// eslint-disable-next-line no-shadow
enum EventTypes {
    interval = "interval",
    timeout = "timeout",
}

/**
 * The event interface
 */
interface Event {
    /** The name of the event */
    name: string;
    // type: "interval" | "timeout";
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
    // type: "interval";
    type: EventTypes.interval;
    /** The last time the event was executed */
    intervalLast: number;
}

/**
 * The timeout event interface
 */
interface TimeoutEvent extends Event {}

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

    /**
     * The PIXI application to use for the interval, if you want to use it instead of an interval.
     */
    pixiApp?: Application;
}

const eventManagerDefaultConfig: EventManagerConfig = {
    autoAddInterval: true,
    fps: 30,
    pixiApp: undefined,
};

/**
 * The event manager class, used to manage events and execute them at the correct time.
 */
class EventManager {
    /** The events stored in the event manager */
    private readonly events: Record<string, (IntervalEvent | TimeoutEvent)>;

    /** The interval for the event manager */
    private tickerInterval?: ReturnType<typeof setInterval>;

    /** The static config manager for the event manager */
    private static readonly configManager = new ConfigManager(eventManagerDefaultConfig);

    /** The config object */
    public readonly config: EventManagerConfig;

    /**
     * Creates a new event manager.
     * @param config - The config to use for this event manager.
     */
    constructor (config?: EventManagerConfig) {
        this.config = EventManager.configManager.parse(config);
        this.events = {};
        if (this.config.autoAddInterval) {
            if (this.config.pixiApp) {
                this.config.pixiApp.ticker.add(() => {
                    this.tickerFunction();
                });
            } else {
                const fps = this.config.fps ?? 30;
                this.tickerInterval = setInterval(() => {
                    this.tickerFunction();
                }, 1000 / fps);
            }
        }
    }

    /**
     * The function that is called every frame, executes all events.
     */
    protected tickerFunction () {
        const currentTime = Date.now();
        for (const event of Object.values(this.events)) {
            // const event = this.events[i];
            if (event.type === "interval") {
                // If interval
                if (currentTime - (event as IntervalEvent).intervalLast >= event.delay) {
                    const dt = currentTime - (event as IntervalEvent).intervalLast;
                    event.callbackFn(dt);
                    (event as IntervalEvent).intervalLast = currentTime;
                }
            } else if (event.type === "timeout") {
                const dt = currentTime - event.timeCreated;
                // If timeout
                if (currentTime - event.timeCreated >= event.delay) {
                    event.callbackFn(dt);
                    delete this.events[event.name];
                    // this.events.splice(i, 1);
                    // i--;
                }
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
        } else if (this.config.pixiApp) {
            this.config.pixiApp.ticker.maxFPS = fps;
        }
    }

    /**
     * Warps time by a certain amount. Note: This will affect the stored creation time of timeout events.
     * @param dt - The time to warp by.
     */
    public timeWarp (dt: number): void {
        for (const event of Object.values(this.events)) {
            if (event.type === "interval") {
                (event as IntervalEvent).intervalLast -= dt;
            }
            if (event.type === "timeout") {
                // ! might cause issues
                (event as TimeoutEvent).timeCreated -= dt;
            }
        }
    }

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
    public setEvent (name: string, type: EventTypes | "interval" | "timeout", delay: number | E, callbackFn: (dt: number) => void) {
        this.events[name] = (() => {
            switch (type) {
            case "interval": {
                const event: IntervalEvent = {
                    name,
                    type: type as EventTypes.interval,
                    delay: typeof delay === "number" ? delay : delay.toNumber(),
                    callbackFn,
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
                    callbackFn,
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
    public addEvent = this.setEvent;

    /**
     * Removes an event from the event system.
     * @param name - The name of the event to remove.
     * @example
     * myEventManger.removeEvent("IntervalEvent"); // Removes the interval event with the name "IntervalEvent".
     */
    public removeEvent (name: string) {
        delete this.events[name];
    }
};

export { EventManager, EventManagerConfig, IntervalEvent, TimeoutEvent, Event, EventTypes };