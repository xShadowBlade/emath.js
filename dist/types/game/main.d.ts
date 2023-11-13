/**
 * Event system for managing intervals and timeouts.
 * @namespace
 */
import { E } from "../eMath";
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
declare class eventManager {
    /**
     * An array to store events.
     * @type {Array<object>}
     */
    private events;
    private tickers;
    private config;
    private static defaultConfig;
    constructor(config: eventManagerConfig);
    private tickerFunction;
    /**
     * Adds a new event to the event system.
     *
     * @param {string} name - The name of the event.
     * @param {string} type - The type of the event, either "interval" or "timeout".
     * @param {number|E} delay - The delay in milliseconds before the event triggers.
     * @param {function} callbackFn - The callback function to execute when the event triggers.
     */
    addEvent(name: string, type: "interval" | "timeout", delay: number | E, callbackFn: () => void): void;
}
export { eventManager };
