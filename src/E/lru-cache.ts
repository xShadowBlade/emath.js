/**
 * @file Defines a LRU cache. From break_eternity.js (https://github.com/Patashu/break_eternity.js).
 */
/* eslint-disable @typescript-eslint/naming-convention */

/**
 * A LRU cache intended for caching pure functions.
 * @template K The type of the key.
 * @template V The type of the value.
 */
class LRUCache<K, V> {
    /** The maximum size of the cache. */
    public readonly maxSize: number;

    /** The map of keys to ListNodes. */
    private map = new Map<K, ListNode<K, V>>();
    // Invariant: Exactly one of the below is true before and after calling a
    // LRUCache method:
    // - first and last are both undefined, and map.size() is 0.
    // - first and last are the same object, and map.size() is 1.
    // - first and last are different objects, and map.size() is greater than 1.

    /** The first node in the list. */
    private first: ListNode<K, V> | undefined = undefined;

    /** The last node in the list. */
    private last: ListNode<K, V> | undefined = undefined;

    /**
     * Constructs a new instance of the LRUCache class.
     * @param maxSize The maximum size for this cache. We recommend setting this
     * to be one less than a power of 2, as most hashtables - including V8's
     * Object hashtable (https://crsrc.org/c/v8/src/objects/ordered-hash-table.cc)
     * - uses powers of two for hashtable sizes. It can't exactly be a power of
     * two, as a .set() call could temporarily set the size of the map to be
     * maxSize + 1.
     */
    constructor(maxSize: number) {
        this.maxSize = maxSize;
    }

    /**
     * @returns The size of the cache
     */
    public get size(): number {
        return this.map.size;
    }

    /**
     * @param key The key to check.
     * @returns Whether the cache contains the specified key.
     */
    public has(key: K): boolean {
        return this.map.has(key);
    }

    /**
     * Clears the cache.
     */
    public clear(): void {
        this.map.clear();
        this.first = undefined;
        this.last = undefined;
    }

    /**
     * Gets the specified key from the cache, or undefined if it is not in the
     * cache.
     * @param key The key to get.
     * @returns The cached value, or undefined if key is not in the cache.
     */
    public get(key: K): V | undefined {
        const node = this.map.get(key);
        if (node === undefined) {
            return undefined;
        }
        // It is guaranteed that there is at least one item in the cache.
        // Therefore, first and last are guaranteed to be a ListNode...
        // but if there is only one item, they might be the same.

        // Update the order of the list to make this node the first node in the
        // list.
        // This isn't needed if this node is already the first node in the list.
        if (node !== this.first) {
            // As this node is DIFFERENT from the first node, it is guaranteed that
            // there are at least two items in the cache.
            // However, this node could possibly be the last item.
            if (node === this.last) {
                // This node IS the last node.
                this.last = node.prev;
                // From the invariants, there must be at least two items in the cache,
                // so node - which is the original "last node" - must have a defined
                // previous node. Therefore, this.last - set above - must be defined
                // here.
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.last!.next = undefined;
            } else {
                // This node is somewhere in the middle of the list, so there must be at
                // least THREE items in the list, and this node's prev and next must be
                // defined here.
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                node.prev!.next = node.next;
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                node.next!.prev = node.prev;
            }
            node.next = this.first;
            // From the invariants, there must be at least two items in the cache, so
            // this.first must be a valid ListNode.
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.first!.prev = node;
            this.first = node;
        }
        return node.value;
    }

    /**
     * Sets an entry in the cache.
     * @param key The key of the entry.
     * @param value The value of the entry.
     * @throws Error, if the map already contains the key.
     */
    public set(key: K, value: V): void {
        // Ensure that this.maxSize >= 1.
        if (this.maxSize < 1) {
            return;
        }
        if (this.map.has(key)) {
            throw new Error("Cannot update existing keys in the cache");
        }
        const node = new ListNode(key, value);
        // Move node to the front of the list.
        if (this.first === undefined) {
            // If the first is undefined, the last is undefined too.
            // Therefore, this cache has no items in it.
            this.first = node;
            this.last = node;
        } else {
            // This cache has at least one item in it.
            node.next = this.first;
            this.first.prev = node;
            this.first = node;
        }
        this.map.set(key, node);

        while (this.map.size > this.maxSize) {
            // We are guaranteed that this.maxSize >= 1,
            // so this.map.size is guaranteed to be >= 2,
            // so this.first and this.last must be different valid ListNodes,
            // and this.last.prev must also be a valid ListNode (possibly this.first).
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const last = this.last!;
            this.map.delete(last.key);
            this.last = last.prev;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.last!.next = undefined;
        }
    }
}

/**
 * A node in a doubly linked list.
 * @template K The type of the key.
 * @template V The type of the value.
 */
class ListNode<K, V> {
    /** The key of the node. */
    public readonly key: K;
    /** The value of the node. */
    public readonly value: V;
    /** The next node in the list. */
    public next: ListNode<K, V> | undefined = undefined;
    /** The previous node in the list. */
    public prev: ListNode<K, V> | undefined = undefined;

    /**
     * Constructs a new instance of the ListNode class.
     * @param key - The key of the node.
     * @param value - The value of the node.
     */
    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
}

export { LRUCache, ListNode };
