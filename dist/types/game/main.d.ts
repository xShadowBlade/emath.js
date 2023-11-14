/**
 * Event system for managing intervals and timeouts.
 * @namespace
 */
import { E } from "../eMath";
import { RequiredDeep } from "./configManager";
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
    private events;
    private tickers;
    private static configManager;
    config: RequiredDeep<eventManagerConfig>;
    constructor(config?: eventManagerConfig);
    private tickerFunction;
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
    addEvent(name: string, type: "interval" | "timeout", delay: number | E, callbackFn: () => void): void;
}
export { eventManager };
