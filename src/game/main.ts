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

class eventManager {
    /**
     * An array to store events.
     * @type {Array<object>}
     */
    private events: (intervalEvent | timeoutEvent)[];
    private tickers: ((dt: number) => void)[];
    private config: eventManagerConfig;
    private static defaultConfig: eventManagerConfig = {
        autoAddInterval: true,
        fps: 30,
    };

    constructor (config: eventManagerConfig) {
        this.config = config;
        this.events = [];

        this.config = config ? config : eventManager.defaultConfig;

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
     * @param {string} name - The name of the event.
     * @param {string} type - The type of the event, either "interval" or "timeout".
     * @param {number|E} delay - The delay in milliseconds before the event triggers.
     * @param {function} callbackFn - The callback function to execute when the event triggers.
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

// Example usage:
// eventSystem.addEvent("IntervalEvent", "interval", 2000, () => {
//     console.log("Interval event executed.");
// });

// eventSystem.addEvent("TimeoutEvent", "timeout", 5000, () => {
//     console.log("Timeout event executed.");
// });

// Game.PIXI.app.ticker.add(function (dt: number) {
//     Game["data"].playtime.timewarp = E(); // reset timewarp

//     Game["static"].playtime.tActive.gain(dt);
//     Game["static"].playtime.tPassive.gain(dt);
//     Game["static"].playtime.active.gain(dt);
//     Game["static"].playtime.passive.gain(dt);
//     Game["static"].playtime.points.gain(dt);
// });

export { eventManager };