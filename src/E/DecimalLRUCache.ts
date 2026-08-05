/**
 * Declares an LRU Cache variant
 */
import { LRUCache } from "./LRUCache";
import type { DecimalSource } from "./e";
import { Decimal } from "./e";

type DecimalKey = `${number}/${number}/${number}`;

class DecimalLRUCache<V> extends LRUCache<DecimalKey, V> {
    /**
     * Converts a decimal number to a JSON string.
     * @param n - The decimal number to convert.
     * @returns The decimal number in the form of a string. `sign/mag/layer` See {@link DecimalJSONString}
     */
    public static decimalToKey(n: DecimalSource): DecimalKey {
        n = Decimal.fromValue_noAlloc(n);
        return `${n.sign}/${n.mag}/${n.layer}`;
    }

    public override get(key: DecimalSource): V | undefined {
        return super.get(DecimalLRUCache.decimalToKey(key));
    }

    public override set(key: DecimalSource, value: V): void {
        super.set(DecimalLRUCache.decimalToKey(key), value);
    }

    public override has(key: DecimalSource): boolean {
        return super.has(DecimalLRUCache.decimalToKey(key));
    }
}

export { DecimalLRUCache };
