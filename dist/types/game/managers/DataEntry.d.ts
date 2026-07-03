/**
 * @file Declares classes related to subscribable data entries.
 */
import type { DataManager } from "./DataManager";
/**
 * A class that represents a subscribable data entry.
 * Useful for {@link https://react.dev/reference/react/useSyncExternalStore useSyncExternalStore} in React.
 */
declare abstract class SubscribableDataEntry<T> {
    /**
     * Creates a entry based on a getter and setter.
     * @template T - The type of the data in the entry.
     * @param getter - A function that returns the current value of the data.
     * @param setter - A function that sets the value of the data and notifies all listeners.
     * @param shouldNotify - Whether to notify listeners after setting the value. Defaults to `true`.
     * @returns A new instance of SubscribableDataEntry that uses the provided getter and setter.
     */
    static fromGetterSetter<T>(getter: () => T, setter: (value: T) => void, shouldNotify?: boolean): SubscribableDataEntry<T>;
    /**
     * A list of listeners that will be notified when the data changes.
     * Primarily useful for {@link https://react.dev/reference/react/useSyncExternalStore useSyncExternalStore} in React.
     */
    private readonly listeners;
    /**
     * Notifies all listeners that the data has changed.
     */
    notifyListeners(): void;
    /**
     * Subscribes a listener to be notified when the data entry changes.
     * See {@link https://react.dev/reference/react/useSyncExternalStore useSyncExternalStore}.
     * @param listener - The listener function to subscribe.
     * @returns A function that can be called to unsubscribe the listener.
     */
    subscribe(listener: () => void): () => void;
    /**
     * @returns The current value of the data entry.
     */
    abstract get(): T;
    /**
     * Sets the value of the data entry.
     * Should call {@link notifyListeners} after setting the value to notify all listeners.
     * @param value - The new value to set.
     */
    abstract set(value: T): void;
    setCallback(callback: (previousValue: T) => T): void;
}
/**
 * A class that represents a single entry in the data manager.
 * It is used to get and set the value of the entry, and to subscribe to changes in the entry.
 * @template T - The type of the data in the entry.
 */
declare class DataManagerEntry<T> extends SubscribableDataEntry<T> {
    private readonly dataManagerReference;
    private readonly dataKey;
    constructor(dataManager: DataManager, dataKey: string);
    get(): T;
    /**
     * Sets the value of the data entry and notifies all listeners.
     * @param value - The new value to set.
     */
    set(value: T): void;
}
export { SubscribableDataEntry, DataManagerEntry };
