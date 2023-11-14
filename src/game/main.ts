/*
Handling of:
Loop Events
Saving/loading
*/
/**
 * Event system for managing intervals and timeouts.
 * @namespace
 */

import { E } from "../eMath";
import { configManager, RequiredDeep } from "./configManager";

interface Event {
    name: string;
    type: "interval" | "timeout";
    delay: E;
    callbackFn: () => void;
    timeCreated: E;
}

interface intervalEvent extends Event {
    type: "interval";
    intervalLast: E;
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
}

const eventManagerDefaultConfig: RequiredDeep<eventManagerConfig> = {
    autoAddInterval: true,
    fps: 30,
};

class eventManager {
    private events: (intervalEvent | timeoutEvent)[];
    private tickers: ((dt: number) => void)[];

    private static configManager = new configManager(eventManagerDefaultConfig);
    public config: RequiredDeep<eventManagerConfig>;

    constructor (config?: eventManagerConfig) {
        this.config = eventManager.configManager.parse(config);
        this.events = [];

        this.tickers = [this.tickerFunction];
        if (this.config.autoAddInterval ? this.config.autoAddInterval : true) {
            const fps = this.config.fps ? this.config.fps : 30;
            setInterval(() => {
                for (const ticker of this.tickers) {
                    ticker(1000 / fps);
                }
            }, 1000 / fps);
        }
    }

    private tickerFunction () {
        const currentTime = E(Date.now());
        for (let i = 0; i < this.events.length; i++) {
            const event = this.events[i];

            if (event.type === "interval") {
                // If interval
                if (((currentTime.sub(((event as intervalEvent)).intervalLast)).gte(event.delay))) {
                    event.callbackFn();
                    (event as intervalEvent).intervalLast = currentTime;
                }
            } else if (event.type === "timeout") {
                // If timeout
                if (((currentTime.sub(event.timeCreated)).gte(event.delay))) {
                    event.callbackFn();
                    this.events.splice(i, 1);
                    i--;
                }
            }
        }
    }

    /**
     * Adds a new event to the event system.
     *
     * @param name - The name of the event.
     * @param type - The type of the event, either "interval" or "timeout".
     * @param delay - The delay in milliseconds before the event triggers.
     * @param callbackFn - The callback function to execute when the event triggers.
     *
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
                delay: E(delay),
                callbackFn,
                timeCreated: E(Date.now()),
                intervalLast: E(Date.now()),
            };
            return event;
        // eslint-disable-next-line no-unreachable
        }; break;
        case "timeout":
        default: {
            const event: timeoutEvent = {
                name,
                type,
                delay: E(delay),
                callbackFn,
                timeCreated: E(Date.now()),
            };

            return event;
        }
        }})());
    };
};

// Game.PIXI.app.ticker.add(function (dt: number) {
//     Game["data"].playtime.timewarp = E(); // reset timewarp

//     Game["static"].playtime.tActive.gain(dt);
//     Game["static"].playtime.tPassive.gain(dt);
//     Game["static"].playtime.active.gain(dt);
//     Game["static"].playtime.passive.gain(dt);
//     Game["static"].playtime.points.gain(dt);
// });

export { eventManager };