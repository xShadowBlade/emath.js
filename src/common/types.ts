/**
 * @file Declares shared/common types.
 */

/**
 * Determines if a type is a primitive string.
 *
 * Works by checking the intersection of `T` with a random string.
 *  - If `T` is a primitive string, the intersection will be the first random string, which does not extend `""`.
 *  - If `T` is is any other type, the intersection will be `never`. For some reason, `never` extends any type.
 * @template T - The type to check.
 * @example
 * type Test1 = IsPrimitiveString<string>; // true
 * type Test2 = IsPrimitiveString<"asdf">; // false
 * type Test3 = IsPrimitiveString<number>; // false
 */
type IsPrimitiveString<T> = "random string that no one should ever get randomly" & T extends "" ? false : true;

/**
 * Converts a readonly type to a mutable type.
 * @template T - The readonly type to convert.
 */
type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};

/** A class constructor */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClassType = new (...args: any[]) => any;

/** A plain object with unknown properties. */
type UnknownObject = Record<string, unknown>;

/** An object that can be constructed with the `new` keyword. */
type ConstructableObject = object & { constructor: ClassType };

/**
 * A pointer to a value or a function that returns a value by reference.
 * @template T - The type of the value to point to.
 */
type Pointer<T> = (() => T) | T;

export type { IsPrimitiveString, Mutable, ClassType, UnknownObject, ConstructableObject, Pointer };
