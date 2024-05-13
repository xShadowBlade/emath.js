/**
 * @file Defines a LRU cache. From break_eternity.js (https://github.com/Patashu/break_eternity.js).
 */
/**
 * A LRU cache intended for caching pure functions.
 * @template K The type of the key.
 * @template V The type of the value.
 */
declare class LRUCache<K, V> {
    /** The map of keys to ListNodes. */
    private map;
    /** The first node in the list. */
    private first;
    /** The last node in the list. */
    private last;
    /** The maximum size of the cache. */
    readonly maxSize: number;
    /**
     * Constructs a new instance of the LRUCache class.
     * @param maxSize The maximum size for this cache. We recommend setting this
     * to be one less than a power of 2, as most hashtables - including V8's
     * Object hashtable (https://crsrc.org/c/v8/src/objects/ordered-hash-table.cc)
     * - uses powers of two for hashtable sizes. It can't exactly be a power of
     * two, as a .set() call could temporarily set the size of the map to be
     * maxSize + 1.
     */
    constructor(maxSize: number);
    /**
     * @returns The size of the cache
     */
    get size(): number;
    /**
     * Gets the specified key from the cache, or undefined if it is not in the
     * cache.
     * @param key The key to get.
     * @returns The cached value, or undefined if key is not in the cache.
     */
    get(key: K): V | undefined;
    /**
     * Sets an entry in the cache.
     * @param key The key of the entry.
     * @param value The value of the entry.
     * @throws Error, if the map already contains the key.
     */
    set(key: K, value: V): void;
}
/**
 * A node in a doubly linked list.
 * @template K The type of the key.
 * @template V The type of the value.
 */
declare class ListNode<K, V> {
    /** The key of the node. */
    readonly key: K;
    /** The value of the node. */
    readonly value: V;
    /** The next node in the list. */
    next: ListNode<K, V> | undefined;
    /** The previous node in the list. */
    prev: ListNode<K, V> | undefined;
    /**
     * Constructs a new instance of the ListNode class.
     * @param key - The key of the node.
     * @param value - The value of the node.
     */
    constructor(key: K, value: V);
}
export { LRUCache, ListNode };
