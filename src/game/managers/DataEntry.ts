/**
 * @file Declares classes related to subscribable data entries.
 */
import type { DataManager } from "./DataManager";

/**
 * A class that represents a subscribable data entry.
 * Useful for {@link https://react.dev/reference/react/useSyncExternalStore useSyncExternalStore} in React.
 */
abstract class SubscribableDataEntry<T> {
    /**
     * Creates a entry based on a getter and setter.
     * @template T - The type of the data in the entry.
     * @param getter - A function that returns the current value of the data.
     * @param setter - A function that sets the value of the data and notifies all listeners.
     * @param shouldNotify - Whether to notify listeners after setting the value. Defaults to `true`.
     * @returns A new instance of SubscribableDataEntry that uses the provided getter and setter.
     */
    public static fromGetterSetter<T>(
        getter: () => T,
        setter: (value: T) => void,
        shouldNotify = true,
    ): SubscribableDataEntry<T> {
        return new (class extends SubscribableDataEntry<T> {
            constructor() {
                super();

                // Bind methods for callbacks
                this.get = this.get.bind(this);
                this.set = this.set.bind(this);
                this.subscribe = this.subscribe.bind(this);
                this.notifyListeners = this.notifyListeners.bind(this);
            }

            public get(): T {
                return getter();
            }

            public set(value: T): void {
                setter(value);
                if (shouldNotify) {
                    this.notifyListeners();
                }
            }
        })();
    }

    /**
     * A list of listeners that will be notified when the data changes.
     * Primarily useful for {@link https://react.dev/reference/react/useSyncExternalStore useSyncExternalStore} in React.
     */
    private readonly listeners: (() => void)[] = [];

    /**
     * Notifies all listeners that the data has changed.
     */
    public notifyListeners(): void {
        for (const listener of this.listeners) {
            listener();
        }
    }

    /**
     * Subscribes a listener to be notified when the data entry changes.
     * See {@link https://react.dev/reference/react/useSyncExternalStore useSyncExternalStore}.
     * @param listener - The listener function to subscribe.
     * @returns A function that can be called to unsubscribe the listener.
     */
    public subscribe(listener: () => void): () => void {
        this.listeners.push(listener);

        return () => {
            const index = this.listeners.indexOf(listener);
            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        };
    }

    /**
     * @returns The current value of the data entry.
     */
    public abstract get(): T;

    /**
     * Sets the value of the data entry.
     * Should call {@link notifyListeners} after setting the value to notify all listeners.
     * @param value - The new value to set.
     */
    public abstract set(value: T): void;

    public setCallback(callback: (previousValue: T) => T): void {
        this.set(callback(this.get()));
    }
}

/**
 * A class that represents a single entry in the data manager.
 * It is used to get and set the value of the entry, and to subscribe to changes in the entry.
 * @template T - The type of the data in the entry.
 */
class DataManagerEntry<T> extends SubscribableDataEntry<T> {
    private readonly dataManagerReference: DataManager;
    private readonly dataKey: string;

    constructor(dataManager: DataManager, dataKey: string) {
        super();

        this.dataManagerReference = dataManager;
        this.dataKey = dataKey;

        // Bind methods for callbacks
        this.get = this.get.bind(this);
        this.set = this.set.bind(this);
        this.subscribe = this.subscribe.bind(this);
    }

    public get(): T {
        // @ts-expect-error - Ignore readonly
        return this.dataManagerReference.data[this.dataKey] as T;
    }

    /**
     * Sets the value of the data entry and notifies all listeners.
     * @param value - The new value to set.
     */
    public set(value: T): void {
        // @ts-expect-error - Ignore readonly
        this.dataManagerReference.data[this.dataKey] = value;

        this.notifyListeners();
    }
}

export { SubscribableDataEntry, DataManagerEntry };
