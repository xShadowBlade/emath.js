/**
 * Declares an LRU Cache variant
 */
import { LRUCache } from "./LRUCache";
import { Decimal } from "./e";
import type { DecimalSource } from "./e";

type DecimalKey = `${number}/${number}/${number}`;

class DecimalLRUCache<V> extends LRUCache<DecimalKey, V> {
    /**
     * Converts a decimal number to a JSON string.
     * @deprecated Use an object index instead.
     * @param n - The decimal number to convert.
     * @returns The decimal number in the form of a string. `sign/mag/layer` See {@link DecimalJSONString}
     */
    public static decimalToKey(n: DecimalSource): DecimalKey {
        n = new Decimal(n);
        return `${n.sign}/${n.mag}/${n.layer}`;
    }

    public get(key: DecimalSource): V | undefined {
        key = new Decimal(key);

        return super.get(DecimalLRUCache.decimalToKey(key));
    }

    public set(key: DecimalSource, value: V): void {
        key = new Decimal(key);

        super.set(DecimalLRUCache.decimalToKey(key), value);
    }
}
