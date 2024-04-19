/**
 * @file Test suite for the Attribute class
 */
import { AttributeStatic, E } from "emath.js";
import assert from "assert";

// describe("AttributeStatic", () => {
//     describe("constructor", () => {
//         it("should create a new instance of AttributeStatic with default values", () => {
//             const attribute = new AttributeStatic();
//             assert(attribute.initial.eq(0));
//             assert.strictEqual(attribute.boost, undefined);
//         });

//         it("should create a new instance of AttributeStatic with custom values", () => {
//             const pointerFn = () => new AttributeStatic();
//             const useBoost = false;
//             const initial = 10;
//             const attribute = new AttributeStatic(pointerFn, useBoost, initial);
//             assert(attribute.initial.eq(initial));
//         });
//     });

//     describe("update", () => {
//         it("should update the value of the attribute when boost is enabled", () => {
//             const attribute = new AttributeStatic();
//             attribute.boost?.setBoost({
//                 id: "test",
//                 value: (e) => e.mul(2),
//             });
//             attribute.update();
//             assert(attribute.value.eq(2));
//         });

//         it("should not update the value of the attribute when boost is disabled", () => {
//             const attribute = new AttributeStatic();
//             attribute.update();
//             assert(attribute.value.eq(0));
//         });
//     });

//     describe("value", () => {
//         it("should get the value of the attribute and update the value stored when boost is enabled", () => {
//             const attribute = new AttributeStatic();
//             attribute.boost?.setBoost({
//                 id: "test",
//                 value: (e) => e.mul(2),
//             });
//             assert(attribute.value.eq(2));
//             assert(attribute.pointer.value.eq(2));
//         });

//         it("should set the value of the attribute when boost is disabled", () => {
//             const attribute = new AttributeStatic();
//             attribute.value = E(40);
//             assert(attribute.value.eq(40));
//             assert(attribute.pointer.value.eq(40));
//         });

//         it("should throw an error when trying to set the value of the attribute when boost is enabled", () => {
//             const attribute = new AttributeStatic();
//             attribute.boost?.setBoost({
//                 id: "test",
//                 value: (e) => e.mul(2),
//             });
//             assert.throws(() => {
//                 attribute.value = E(60);
//             }, Error, "Cannot set value of attributeStatic when boost is enabled.");
//         });
//     });
// });
