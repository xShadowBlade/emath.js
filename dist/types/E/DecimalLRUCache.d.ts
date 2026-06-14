/**
 * Declares an LRU Cache variant
 */
import { LRUCache } from "./LRUCache";
import type { DecimalSource } from "./e";
type DecimalKey = `${number}/${number}/${number}`;
declare class DecimalLRUCache<V> extends LRUCache<DecimalKey, V> {
    /**
     * Converts a decimal number to a JSON string.
     * @deprecated Use an object index instead.
     * @param n - The decimal number to convert.
     * @returns The decimal number in the form of a string. `sign/mag/layer` See {@link DecimalJSONString}
     */
    static decimalToKey(n: DecimalSource): DecimalKey;
    get(key: DecimalSource): V | undefined;
    set(key: DecimalSource, value: V): void;
    has(key: DecimalSource): boolean;
}
export { DecimalLRUCache };
