/**
 * @file
 */

import type { ClassType, UnknownObject } from "../../common/types";

type DescribeSerialize<T> = {
    [K in keyof T]?: SerializeFunction<unknown> | SerializableClass<unknown>;
};

interface SerializableClass<T> {
    getSerializer(): DescribeSerialize<T>;
}

type SerializeFunction<T> = (value: unknown) => T;

type Serializer<T = unknown> = SerializableClass<T> | SerializeFunction<T>;

/**
 *
 * @param value
 * @param serializer
 */
function parseValue<TSerializer extends Serializer<unknown> = Serializer>(
    value: unknown,
    serializer: TSerializer,
): unknown {
    //

    if (
        value &&
        typeof value == "object" &&
        typeof serializer == "object" &&
        typeof serializer.getSerializer !== "undefined"
    ) {
        return parseSerializerClassValue(value, serializer.getSerializer());
    }

    if (typeof serializer == "function") {
        return serializer(value);
    }

    return value;
}

/**
 *
 * @param value
 * @param serializer
 */
function parseSerializerClassValue<TSerializer extends DescribeSerialize<unknown> = DescribeSerialize<unknown>>(
    value: object,
    serializer: TSerializer,
) {
    
}

/**
 *
 * @param valueClass
 */
function classSerializer(valueClass: ClassType): SerializeFunction<unknown> {
    return (value: unknown) => {};
}

/**
 *
 * @param valueClass
 */
function recordTypeSerializer(valueClass: ClassType): SerializeFunction<unknown> {
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

export type { SerializableClass, DescribeSerialize };
