/**
 * @file Declares classes for managing the event loop
 */
import { E } from "../../E/eMain";
import { configManager, RequiredDeep } from "./configManager";
import type { Application } from "pixi.js";

interface Event {
    name: string;
    type: "interval" | "timeout";
    delay: number;
    callbackFn: () => void;
    timeCreated: number;
}

interface intervalEvent extends Event {
    type: "interval";
    intervalLast: number;
}

interface timeoutEvent extends Event {}

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

const eventManagerDefaultConfig: eventManagerConfig = {
    autoAddInterval: true,
    fps: 30,
    pixiApp: undefined,
};

class eventManager {
    private events: (intervalEvent | timeoutEvent)[];

    private static configManager = new configManager(eventManagerDefaultConfig);
    public config: eventManagerConfig;

    constructor (config?: eventManagerConfig) {
        this.config = eventManager.configManager.parse(config);
        this.events = [];
        if (this.config.autoAddInterval) {
            if (this.config.pixiApp) {
                this.config.pixiApp.ticker.add(() => {
                    this.tickerFunction();
                });
            } else {
                const fps = this.config.fps ? this.config.fps : 30;
                setInterval(() => {
                    this.tickerFunction();
                }, 1000 / fps);
            }
        }
    }

    private tickerFunction () {
        const currentTime = Date.now();
        for (let i = 0; i < this.events.length; i++) {
            const event = this.events[i];

            if (event.type === "interval") {
                // If interval
                if (currentTime - (event as intervalEvent).intervalLast >= event.delay) {
                    event.callbackFn();
                    (event as intervalEvent).intervalLast = currentTime;
                }
            } else if (event.type === "timeout") {
                // If timeout
                if (currentTime - event.timeCreated >= event.delay) {
                    event.callbackFn();
                    this.events.splice(i, 1);
                    i--;
                }
            }
        }
    }

    /**
     * Adds a new event to the event system.
     * @param name - The name of the event.
     * @param type - The type of the event, either "interval" or "timeout".
     * @param delay - The delay in milliseconds before the event triggers.
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
    public addEvent (name: string, type: "interval" | "timeout", delay: number | E, callbackFn: () => void) {
        this.events.push((() => {switch (type) {
        case "interval": {
            const event: intervalEvent = {
                name,
                type,
                delay: typeof delay === "number" ? delay : delay.toNumber(),
                callbackFn,
                timeCreated: Date.now(),
                intervalLast: Date.now(),
            };
            return event;
        // eslint-disable-next-line no-unreachable
        }; break;
        case "timeout":
        default: {
            const event: timeoutEvent = {
                name,
                type,
                delay: typeof delay === "number" ? delay : delay.toNumber(),
                callbackFn,
                timeCreated: Date.now(),
            };

            return event;
        }
        }})());
    };
};

export { eventManager };