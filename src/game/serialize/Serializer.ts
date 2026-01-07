/**
 * @file 
 */

import type { ClassType } from "../../common/types";

type DescribeSerialize<T> = {
    [K in keyof T]: DescribeSerialize<any> | ClassType<T[K]>;
};

interface Serializable<T> {
    getSerializer(): DescribeSerialize<T>;
}

type SerializeFunction<T> = (value: unknown) => unknown;

function recordTypeSerializer(valueClass: ClassType): SerializeFunction<any> {
    return (value: unknown) => {
        // Assert that value is a record
        if (typeof value !== "object" || value === null) {
            throw new Error(`Expected object for record type serialization, got ${typeof value}`);
        }

        const result: Record<string, unknown> = {};
        for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
            result[key] = new valueClass(val);
        }
        return result;
    };
}

export type { Serializable, DescribeSerialize };
