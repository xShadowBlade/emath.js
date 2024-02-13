(function (g, f) {
    var hasExports = typeof exports === 'object';
    if (typeof define === "function" && define.amd) {
      define([], f);
    } else if (typeof module === "object" && module.exports) {
      module.exports = f();
    } else {
      var m = hasExports ? f() : f();
      var root = hasExports ? exports : g;
      
    }}(typeof self !== 'undefined' ? self : this, () => {
  var exports = {};
  var module = { exports };
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// node_modules/reflect-metadata/Reflect.js
var require_Reflect = __commonJS({
  "node_modules/reflect-metadata/Reflect.js"() {
    var Reflect2;
    (function(Reflect3) {
      (function(factory) {
        var root = typeof globalThis === "object" ? globalThis : typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : sloppyModeThis();
        var exporter = makeExporter(Reflect3);
        if (typeof root.Reflect !== "undefined") {
          exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter, root);
        if (typeof root.Reflect === "undefined") {
          root.Reflect = Reflect3;
        }
        function makeExporter(target, previous) {
          return function(key, value) {
            Object.defineProperty(target, key, { configurable: true, writable: true, value });
            if (previous)
              previous(key, value);
          };
        }
        function functionThis() {
          try {
            return Function("return this;")();
          } catch (_) {
          }
        }
        function indirectEvalThis() {
          try {
            return (void 0, eval)("(function() { return this; })()");
          } catch (_) {
          }
        }
        function sloppyModeThis() {
          return functionThis() || indirectEvalThis();
        }
      })(function(exporter, root) {
        var hasOwn = Object.prototype.hasOwnProperty;
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function";
        var supportsProto = { __proto__: [] } instanceof Array;
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
          // create an object in dictionary mode (a.k.a. "slow" mode in v8)
          create: supportsCreate ? function() {
            return MakeDictionary(/* @__PURE__ */ Object.create(null));
          } : supportsProto ? function() {
            return MakeDictionary({ __proto__: null });
          } : function() {
            return MakeDictionary({});
          },
          has: downLevel ? function(map, key) {
            return hasOwn.call(map, key);
          } : function(map, key) {
            return key in map;
          },
          get: downLevel ? function(map, key) {
            return hasOwn.call(map, key) ? map[key] : void 0;
          } : function(map, key) {
            return map[key];
          }
        };
        var functionPrototype = Object.getPrototypeOf(Function);
        var _Map = typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        var registrySymbol = supportsSymbol ? Symbol.for("@reflect-metadata:registry") : void 0;
        var metadataRegistry = GetOrCreateMetadataRegistry();
        var metadataProvider = CreateMetadataProvider(metadataRegistry);
        function decorate(decorators, target, propertyKey, attributes) {
          if (!IsUndefined(propertyKey)) {
            if (!IsArray(decorators))
              throw new TypeError();
            if (!IsObject(target))
              throw new TypeError();
            if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
              throw new TypeError();
            if (IsNull(attributes))
              attributes = void 0;
            propertyKey = ToPropertyKey(propertyKey);
            return DecorateProperty(decorators, target, propertyKey, attributes);
          } else {
            if (!IsArray(decorators))
              throw new TypeError();
            if (!IsConstructor(target))
              throw new TypeError();
            return DecorateConstructor(decorators, target);
          }
        }
        exporter("decorate", decorate);
        function metadata(metadataKey, metadataValue) {
          function decorator(target, propertyKey) {
            if (!IsObject(target))
              throw new TypeError();
            if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
              throw new TypeError();
            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
          }
          return decorator;
        }
        exporter("metadata", metadata);
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        function hasMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        function hasOwnMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        function getMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        function getOwnMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        function getMetadataKeys(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        function getOwnMetadataKeys(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        function deleteMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          var provider = GetMetadataProvider(
            target,
            propertyKey,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return false;
          return provider.OrdinaryDeleteMetadata(metadataKey, target, propertyKey);
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
          for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
              if (!IsConstructor(decorated))
                throw new TypeError();
              target = decorated;
            }
          }
          return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
          for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target, propertyKey, descriptor);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
              if (!IsObject(decorated))
                throw new TypeError();
              descriptor = decorated;
            }
          }
          return descriptor;
        }
        function OrdinaryHasMetadata(MetadataKey, O, P) {
          var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
          if (hasOwn2)
            return true;
          var parent = OrdinaryGetPrototypeOf(O);
          if (!IsNull(parent))
            return OrdinaryHasMetadata(MetadataKey, parent, P);
          return false;
        }
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return false;
          return ToBoolean(provider.OrdinaryHasOwnMetadata(MetadataKey, O, P));
        }
        function OrdinaryGetMetadata(MetadataKey, O, P) {
          var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
          if (hasOwn2)
            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
          var parent = OrdinaryGetPrototypeOf(O);
          if (!IsNull(parent))
            return OrdinaryGetMetadata(MetadataKey, parent, P);
          return void 0;
        }
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return;
          return provider.OrdinaryGetOwnMetadata(MetadataKey, O, P);
        }
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*Create*/
            true
          );
          provider.OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P);
        }
        function OrdinaryMetadataKeys(O, P) {
          var ownKeys = OrdinaryOwnMetadataKeys(O, P);
          var parent = OrdinaryGetPrototypeOf(O);
          if (parent === null)
            return ownKeys;
          var parentKeys = OrdinaryMetadataKeys(parent, P);
          if (parentKeys.length <= 0)
            return ownKeys;
          if (ownKeys.length <= 0)
            return parentKeys;
          var set = new _Set();
          var keys = [];
          for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
            var key = ownKeys_1[_i];
            var hasKey = set.has(key);
            if (!hasKey) {
              set.add(key);
              keys.push(key);
            }
          }
          for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
            var key = parentKeys_1[_a];
            var hasKey = set.has(key);
            if (!hasKey) {
              set.add(key);
              keys.push(key);
            }
          }
          return keys;
        }
        function OrdinaryOwnMetadataKeys(O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*create*/
            false
          );
          if (!provider) {
            return [];
          }
          return provider.OrdinaryOwnMetadataKeys(O, P);
        }
        function Type2(x) {
          if (x === null)
            return 1;
          switch (typeof x) {
            case "undefined":
              return 0;
            case "boolean":
              return 2;
            case "string":
              return 3;
            case "symbol":
              return 4;
            case "number":
              return 5;
            case "object":
              return x === null ? 1 : 6;
            default:
              return 6;
          }
        }
        function IsUndefined(x) {
          return x === void 0;
        }
        function IsNull(x) {
          return x === null;
        }
        function IsSymbol(x) {
          return typeof x === "symbol";
        }
        function IsObject(x) {
          return typeof x === "object" ? x !== null : typeof x === "function";
        }
        function ToPrimitive(input, PreferredType) {
          switch (Type2(input)) {
            case 0:
              return input;
            case 1:
              return input;
            case 2:
              return input;
            case 3:
              return input;
            case 4:
              return input;
            case 5:
              return input;
          }
          var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
          var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
          if (exoticToPrim !== void 0) {
            var result = exoticToPrim.call(input, hint);
            if (IsObject(result))
              throw new TypeError();
            return result;
          }
          return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        function OrdinaryToPrimitive(O, hint) {
          if (hint === "string") {
            var toString_1 = O.toString;
            if (IsCallable(toString_1)) {
              var result = toString_1.call(O);
              if (!IsObject(result))
                return result;
            }
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
              var result = valueOf.call(O);
              if (!IsObject(result))
                return result;
            }
          } else {
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
              var result = valueOf.call(O);
              if (!IsObject(result))
                return result;
            }
            var toString_2 = O.toString;
            if (IsCallable(toString_2)) {
              var result = toString_2.call(O);
              if (!IsObject(result))
                return result;
            }
          }
          throw new TypeError();
        }
        function ToBoolean(argument) {
          return !!argument;
        }
        function ToString(argument) {
          return "" + argument;
        }
        function ToPropertyKey(argument) {
          var key = ToPrimitive(
            argument,
            3
            /* String */
          );
          if (IsSymbol(key))
            return key;
          return ToString(key);
        }
        function IsArray(argument) {
          return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
        }
        function IsCallable(argument) {
          return typeof argument === "function";
        }
        function IsConstructor(argument) {
          return typeof argument === "function";
        }
        function IsPropertyKey(argument) {
          switch (Type2(argument)) {
            case 3:
              return true;
            case 4:
              return true;
            default:
              return false;
          }
        }
        function SameValueZero(x, y) {
          return x === y || x !== x && y !== y;
        }
        function GetMethod(V, P) {
          var func = V[P];
          if (func === void 0 || func === null)
            return void 0;
          if (!IsCallable(func))
            throw new TypeError();
          return func;
        }
        function GetIterator(obj) {
          var method = GetMethod(obj, iteratorSymbol);
          if (!IsCallable(method))
            throw new TypeError();
          var iterator = method.call(obj);
          if (!IsObject(iterator))
            throw new TypeError();
          return iterator;
        }
        function IteratorValue(iterResult) {
          return iterResult.value;
        }
        function IteratorStep(iterator) {
          var result = iterator.next();
          return result.done ? false : result;
        }
        function IteratorClose(iterator) {
          var f = iterator["return"];
          if (f)
            f.call(iterator);
        }
        function OrdinaryGetPrototypeOf(O) {
          var proto = Object.getPrototypeOf(O);
          if (typeof O !== "function" || O === functionPrototype)
            return proto;
          if (proto !== functionPrototype)
            return proto;
          var prototype = O.prototype;
          var prototypeProto = prototype && Object.getPrototypeOf(prototype);
          if (prototypeProto == null || prototypeProto === Object.prototype)
            return proto;
          var constructor = prototypeProto.constructor;
          if (typeof constructor !== "function")
            return proto;
          if (constructor === O)
            return proto;
          return constructor;
        }
        function CreateMetadataRegistry() {
          var fallback;
          if (!IsUndefined(registrySymbol) && typeof root.Reflect !== "undefined" && !(registrySymbol in root.Reflect) && typeof root.Reflect.defineMetadata === "function") {
            fallback = CreateFallbackProvider(root.Reflect);
          }
          var first;
          var second;
          var rest;
          var targetProviderMap = new _WeakMap();
          var registry = {
            registerProvider,
            getProvider,
            setProvider
          };
          return registry;
          function registerProvider(provider) {
            if (!Object.isExtensible(registry)) {
              throw new Error("Cannot add provider to a frozen registry.");
            }
            switch (true) {
              case fallback === provider:
                break;
              case IsUndefined(first):
                first = provider;
                break;
              case first === provider:
                break;
              case IsUndefined(second):
                second = provider;
                break;
              case second === provider:
                break;
              default:
                if (rest === void 0)
                  rest = new _Set();
                rest.add(provider);
                break;
            }
          }
          function getProviderNoCache(O, P) {
            if (!IsUndefined(first)) {
              if (first.isProviderFor(O, P))
                return first;
              if (!IsUndefined(second)) {
                if (second.isProviderFor(O, P))
                  return first;
                if (!IsUndefined(rest)) {
                  var iterator = GetIterator(rest);
                  while (true) {
                    var next = IteratorStep(iterator);
                    if (!next) {
                      return void 0;
                    }
                    var provider = IteratorValue(next);
                    if (provider.isProviderFor(O, P)) {
                      IteratorClose(iterator);
                      return provider;
                    }
                  }
                }
              }
            }
            if (!IsUndefined(fallback) && fallback.isProviderFor(O, P)) {
              return fallback;
            }
            return void 0;
          }
          function getProvider(O, P) {
            var providerMap = targetProviderMap.get(O);
            var provider;
            if (!IsUndefined(providerMap)) {
              provider = providerMap.get(P);
            }
            if (!IsUndefined(provider)) {
              return provider;
            }
            provider = getProviderNoCache(O, P);
            if (!IsUndefined(provider)) {
              if (IsUndefined(providerMap)) {
                providerMap = new _Map();
                targetProviderMap.set(O, providerMap);
              }
              providerMap.set(P, provider);
            }
            return provider;
          }
          function hasProvider(provider) {
            if (IsUndefined(provider))
              throw new TypeError();
            return first === provider || second === provider || !IsUndefined(rest) && rest.has(provider);
          }
          function setProvider(O, P, provider) {
            if (!hasProvider(provider)) {
              throw new Error("Metadata provider not registered.");
            }
            var existingProvider = getProvider(O, P);
            if (existingProvider !== provider) {
              if (!IsUndefined(existingProvider)) {
                return false;
              }
              var providerMap = targetProviderMap.get(O);
              if (IsUndefined(providerMap)) {
                providerMap = new _Map();
                targetProviderMap.set(O, providerMap);
              }
              providerMap.set(P, provider);
            }
            return true;
          }
        }
        function GetOrCreateMetadataRegistry() {
          var metadataRegistry2;
          if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
            metadataRegistry2 = root.Reflect[registrySymbol];
          }
          if (IsUndefined(metadataRegistry2)) {
            metadataRegistry2 = CreateMetadataRegistry();
          }
          if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
            Object.defineProperty(root.Reflect, registrySymbol, {
              enumerable: false,
              configurable: false,
              writable: false,
              value: metadataRegistry2
            });
          }
          return metadataRegistry2;
        }
        function CreateMetadataProvider(registry) {
          var metadata2 = new _WeakMap();
          var provider = {
            isProviderFor: function(O, P) {
              var targetMetadata = metadata2.get(O);
              if (IsUndefined(targetMetadata))
                return false;
              return targetMetadata.has(P);
            },
            OrdinaryDefineOwnMetadata: OrdinaryDefineOwnMetadata2,
            OrdinaryHasOwnMetadata: OrdinaryHasOwnMetadata2,
            OrdinaryGetOwnMetadata: OrdinaryGetOwnMetadata2,
            OrdinaryOwnMetadataKeys: OrdinaryOwnMetadataKeys2,
            OrdinaryDeleteMetadata
          };
          metadataRegistry.registerProvider(provider);
          return provider;
          function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = metadata2.get(O);
            var createdTargetMetadata = false;
            if (IsUndefined(targetMetadata)) {
              if (!Create)
                return void 0;
              targetMetadata = new _Map();
              metadata2.set(O, targetMetadata);
              createdTargetMetadata = true;
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
              if (!Create)
                return void 0;
              metadataMap = new _Map();
              targetMetadata.set(P, metadataMap);
              if (!registry.setProvider(O, P, provider)) {
                targetMetadata.delete(P);
                if (createdTargetMetadata) {
                  metadata2.delete(O);
                }
                throw new Error("Wrong provider for target.");
              }
            }
            return metadataMap;
          }
          function OrdinaryHasOwnMetadata2(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return false;
            return ToBoolean(metadataMap.has(MetadataKey));
          }
          function OrdinaryGetOwnMetadata2(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return void 0;
            return metadataMap.get(MetadataKey);
          }
          function OrdinaryDefineOwnMetadata2(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              true
            );
            metadataMap.set(MetadataKey, MetadataValue);
          }
          function OrdinaryOwnMetadataKeys2(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
              var next = IteratorStep(iterator);
              if (!next) {
                keys.length = k;
                return keys;
              }
              var nextValue = IteratorValue(next);
              try {
                keys[k] = nextValue;
              } catch (e) {
                try {
                  IteratorClose(iterator);
                } finally {
                  throw e;
                }
              }
              k++;
            }
          }
          function OrdinaryDeleteMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return false;
            if (!metadataMap.delete(MetadataKey))
              return false;
            if (metadataMap.size === 0) {
              var targetMetadata = metadata2.get(O);
              if (!IsUndefined(targetMetadata)) {
                targetMetadata.delete(P);
                if (targetMetadata.size === 0) {
                  metadata2.delete(targetMetadata);
                }
              }
            }
            return true;
          }
        }
        function CreateFallbackProvider(reflect) {
          var defineMetadata2 = reflect.defineMetadata, hasOwnMetadata2 = reflect.hasOwnMetadata, getOwnMetadata2 = reflect.getOwnMetadata, getOwnMetadataKeys2 = reflect.getOwnMetadataKeys, deleteMetadata2 = reflect.deleteMetadata;
          var metadataOwner = new _WeakMap();
          var provider = {
            isProviderFor: function(O, P) {
              var metadataPropertySet = metadataOwner.get(O);
              if (!IsUndefined(metadataPropertySet)) {
                return metadataPropertySet.has(P);
              }
              if (getOwnMetadataKeys2(O, P).length) {
                if (IsUndefined(metadataPropertySet)) {
                  metadataPropertySet = new _Set();
                  metadataOwner.set(O, metadataPropertySet);
                }
                metadataPropertySet.add(P);
                return true;
              }
              return false;
            },
            OrdinaryDefineOwnMetadata: defineMetadata2,
            OrdinaryHasOwnMetadata: hasOwnMetadata2,
            OrdinaryGetOwnMetadata: getOwnMetadata2,
            OrdinaryOwnMetadataKeys: getOwnMetadataKeys2,
            OrdinaryDeleteMetadata: deleteMetadata2
          };
          return provider;
        }
        function GetMetadataProvider(O, P, Create) {
          var registeredProvider = metadataRegistry.getProvider(O, P);
          if (!IsUndefined(registeredProvider)) {
            return registeredProvider;
          }
          if (Create) {
            if (metadataRegistry.setProvider(O, P, metadataProvider)) {
              return metadataProvider;
            }
            throw new Error("Illegal state.");
          }
          return void 0;
        }
        function CreateMapPolyfill() {
          var cacheSentinel = {};
          var arraySentinel = [];
          var MapIterator = (
            /** @class */
            function() {
              function MapIterator2(keys, values, selector) {
                this._index = 0;
                this._keys = keys;
                this._values = values;
                this._selector = selector;
              }
              MapIterator2.prototype["@@iterator"] = function() {
                return this;
              };
              MapIterator2.prototype[iteratorSymbol] = function() {
                return this;
              };
              MapIterator2.prototype.next = function() {
                var index = this._index;
                if (index >= 0 && index < this._keys.length) {
                  var result = this._selector(this._keys[index], this._values[index]);
                  if (index + 1 >= this._keys.length) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                  } else {
                    this._index++;
                  }
                  return { value: result, done: false };
                }
                return { value: void 0, done: true };
              };
              MapIterator2.prototype.throw = function(error) {
                if (this._index >= 0) {
                  this._index = -1;
                  this._keys = arraySentinel;
                  this._values = arraySentinel;
                }
                throw error;
              };
              MapIterator2.prototype.return = function(value) {
                if (this._index >= 0) {
                  this._index = -1;
                  this._keys = arraySentinel;
                  this._values = arraySentinel;
                }
                return { value, done: true };
              };
              return MapIterator2;
            }()
          );
          var Map2 = (
            /** @class */
            function() {
              function Map3() {
                this._keys = [];
                this._values = [];
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }
              Object.defineProperty(Map3.prototype, "size", {
                get: function() {
                  return this._keys.length;
                },
                enumerable: true,
                configurable: true
              });
              Map3.prototype.has = function(key) {
                return this._find(
                  key,
                  /*insert*/
                  false
                ) >= 0;
              };
              Map3.prototype.get = function(key) {
                var index = this._find(
                  key,
                  /*insert*/
                  false
                );
                return index >= 0 ? this._values[index] : void 0;
              };
              Map3.prototype.set = function(key, value) {
                var index = this._find(
                  key,
                  /*insert*/
                  true
                );
                this._values[index] = value;
                return this;
              };
              Map3.prototype.delete = function(key) {
                var index = this._find(
                  key,
                  /*insert*/
                  false
                );
                if (index >= 0) {
                  var size = this._keys.length;
                  for (var i = index + 1; i < size; i++) {
                    this._keys[i - 1] = this._keys[i];
                    this._values[i - 1] = this._values[i];
                  }
                  this._keys.length--;
                  this._values.length--;
                  if (SameValueZero(key, this._cacheKey)) {
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                  }
                  return true;
                }
                return false;
              };
              Map3.prototype.clear = function() {
                this._keys.length = 0;
                this._values.length = 0;
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              };
              Map3.prototype.keys = function() {
                return new MapIterator(this._keys, this._values, getKey);
              };
              Map3.prototype.values = function() {
                return new MapIterator(this._keys, this._values, getValue);
              };
              Map3.prototype.entries = function() {
                return new MapIterator(this._keys, this._values, getEntry);
              };
              Map3.prototype["@@iterator"] = function() {
                return this.entries();
              };
              Map3.prototype[iteratorSymbol] = function() {
                return this.entries();
              };
              Map3.prototype._find = function(key, insert) {
                if (!SameValueZero(this._cacheKey, key)) {
                  this._cacheIndex = -1;
                  for (var i = 0; i < this._keys.length; i++) {
                    if (SameValueZero(this._keys[i], key)) {
                      this._cacheIndex = i;
                      break;
                    }
                  }
                }
                if (this._cacheIndex < 0 && insert) {
                  this._cacheIndex = this._keys.length;
                  this._keys.push(key);
                  this._values.push(void 0);
                }
                return this._cacheIndex;
              };
              return Map3;
            }()
          );
          return Map2;
          function getKey(key, _) {
            return key;
          }
          function getValue(_, value) {
            return value;
          }
          function getEntry(key, value) {
            return [key, value];
          }
        }
        function CreateSetPolyfill() {
          var Set2 = (
            /** @class */
            function() {
              function Set3() {
                this._map = new _Map();
              }
              Object.defineProperty(Set3.prototype, "size", {
                get: function() {
                  return this._map.size;
                },
                enumerable: true,
                configurable: true
              });
              Set3.prototype.has = function(value) {
                return this._map.has(value);
              };
              Set3.prototype.add = function(value) {
                return this._map.set(value, value), this;
              };
              Set3.prototype.delete = function(value) {
                return this._map.delete(value);
              };
              Set3.prototype.clear = function() {
                this._map.clear();
              };
              Set3.prototype.keys = function() {
                return this._map.keys();
              };
              Set3.prototype.values = function() {
                return this._map.keys();
              };
              Set3.prototype.entries = function() {
                return this._map.entries();
              };
              Set3.prototype["@@iterator"] = function() {
                return this.keys();
              };
              Set3.prototype[iteratorSymbol] = function() {
                return this.keys();
              };
              return Set3;
            }()
          );
          return Set2;
        }
        function CreateWeakMapPolyfill() {
          var UUID_SIZE = 16;
          var keys = HashMap.create();
          var rootKey = CreateUniqueKey();
          return (
            /** @class */
            function() {
              function WeakMap2() {
                this._key = CreateUniqueKey();
              }
              WeakMap2.prototype.has = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? HashMap.has(table, this._key) : false;
              };
              WeakMap2.prototype.get = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? HashMap.get(table, this._key) : void 0;
              };
              WeakMap2.prototype.set = function(target, value) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  true
                );
                table[this._key] = value;
                return this;
              };
              WeakMap2.prototype.delete = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? delete table[this._key] : false;
              };
              WeakMap2.prototype.clear = function() {
                this._key = CreateUniqueKey();
              };
              return WeakMap2;
            }()
          );
          function CreateUniqueKey() {
            var key;
            do
              key = "@@WeakMap@@" + CreateUUID();
            while (HashMap.has(keys, key));
            keys[key] = true;
            return key;
          }
          function GetOrCreateWeakMapTable(target, create) {
            if (!hasOwn.call(target, rootKey)) {
              if (!create)
                return void 0;
              Object.defineProperty(target, rootKey, { value: HashMap.create() });
            }
            return target[rootKey];
          }
          function FillRandomBytes(buffer, size) {
            for (var i = 0; i < size; ++i)
              buffer[i] = Math.random() * 255 | 0;
            return buffer;
          }
          function GenRandomBytes(size) {
            if (typeof Uint8Array === "function") {
              if (typeof crypto !== "undefined")
                return crypto.getRandomValues(new Uint8Array(size));
              if (typeof msCrypto !== "undefined")
                return msCrypto.getRandomValues(new Uint8Array(size));
              return FillRandomBytes(new Uint8Array(size), size);
            }
            return FillRandomBytes(new Array(size), size);
          }
          function CreateUUID() {
            var data = GenRandomBytes(UUID_SIZE);
            data[6] = data[6] & 79 | 64;
            data[8] = data[8] & 191 | 128;
            var result = "";
            for (var offset = 0; offset < UUID_SIZE; ++offset) {
              var byte = data[offset];
              if (offset === 4 || offset === 6 || offset === 8)
                result += "-";
              if (byte < 16)
                result += "0";
              result += byte.toString(16).toLowerCase();
            }
            return result;
          }
        }
        function MakeDictionary(obj) {
          obj.__ = void 0;
          delete obj.__;
          return obj;
        }
      });
    })(Reflect2 || (Reflect2 = {}));
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  E: () => E,
  FORMATS: () => FORMATS,
  FormatTypeList: () => FormatTypeList,
  attribute: () => attribute,
  attributeStatic: () => attributeStatic,
  boost: () => boost,
  boostObject: () => boostObject,
  calculateUpgrade: () => calculateUpgrade,
  currency: () => currency,
  currencyStatic: () => currencyStatic,
  grid: () => grid,
  gridCell: () => gridCell,
  upgradeData: () => upgradeData,
  upgradeStatic: () => upgradeStatic
});
module.exports = __toCommonJS(src_exports);
var import_reflect_metadata = __toESM(require_Reflect());

// src/E/lru-cache.ts
var LRUCache = class {
  /**
  * @param maxSize The maximum size for this cache. We recommend setting this
  * to be one less than a power of 2, as most hashtables - including V8's
  * Object hashtable (https://crsrc.org/c/v8/src/objects/ordered-hash-table.cc)
  * - uses powers of two for hashtable sizes. It can't exactly be a power of
  * two, as a .set() call could temporarily set the size of the map to be
  * maxSize + 1.
  */
  constructor(maxSize) {
    this.map = /* @__PURE__ */ new Map();
    // Invariant: Exactly one of the below is true before and after calling a
    // LRUCache method:
    // - first and last are both undefined, and map.size() is 0.
    // - first and last are the same object, and map.size() is 1.
    // - first and last are different objects, and map.size() is greater than 1.
    this.first = void 0;
    this.last = void 0;
    this.maxSize = maxSize;
  }
  get size() {
    return this.map.size;
  }
  /**
  * Gets the specified key from the cache, or undefined if it is not in the
  * cache.
  * @param key The key to get.
  * @returns The cached value, or undefined if key is not in the cache.
  */
  get(key) {
    const node = this.map.get(key);
    if (node === void 0) {
      return void 0;
    }
    if (node !== this.first) {
      if (node === this.last) {
        this.last = node.prev;
        this.last.next = void 0;
      } else {
        node.prev.next = node.next;
        node.next.prev = node.prev;
      }
      node.next = this.first;
      this.first.prev = node;
      this.first = node;
    }
    return node.value;
  }
  /**
  * Sets an entry in the cache.
  *
  * @param key The key of the entry.
  * @param value The value of the entry.
  * @throws Error, if the map already contains the key.
  */
  set(key, value) {
    if (this.maxSize < 1) {
      return;
    }
    if (this.map.has(key)) {
      throw new Error("Cannot update existing keys in the cache");
    }
    const node = new ListNode(key, value);
    if (this.first === void 0) {
      this.first = node;
      this.last = node;
    } else {
      node.next = this.first;
      this.first.prev = node;
      this.first = node;
    }
    this.map.set(key, node);
    while (this.map.size > this.maxSize) {
      const last = this.last;
      this.map.delete(last.key);
      this.last = last.prev;
      this.last.next = void 0;
    }
  }
};
var ListNode = class {
  constructor(key, value) {
    this.next = void 0;
    this.prev = void 0;
    this.key = key;
    this.value = value;
  }
};

// node_modules/class-transformer/esm5/enums/transformation-type.enum.js
var TransformationType;
(function(TransformationType2) {
  TransformationType2[TransformationType2["PLAIN_TO_CLASS"] = 0] = "PLAIN_TO_CLASS";
  TransformationType2[TransformationType2["CLASS_TO_PLAIN"] = 1] = "CLASS_TO_PLAIN";
  TransformationType2[TransformationType2["CLASS_TO_CLASS"] = 2] = "CLASS_TO_CLASS";
})(TransformationType || (TransformationType = {}));

// node_modules/class-transformer/esm5/MetadataStorage.js
var MetadataStorage = (
  /** @class */
  function() {
    function MetadataStorage2() {
      this._typeMetadatas = /* @__PURE__ */ new Map();
      this._transformMetadatas = /* @__PURE__ */ new Map();
      this._exposeMetadatas = /* @__PURE__ */ new Map();
      this._excludeMetadatas = /* @__PURE__ */ new Map();
      this._ancestorsMap = /* @__PURE__ */ new Map();
    }
    MetadataStorage2.prototype.addTypeMetadata = function(metadata) {
      if (!this._typeMetadatas.has(metadata.target)) {
        this._typeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
      }
      this._typeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
    };
    MetadataStorage2.prototype.addTransformMetadata = function(metadata) {
      if (!this._transformMetadatas.has(metadata.target)) {
        this._transformMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
      }
      if (!this._transformMetadatas.get(metadata.target).has(metadata.propertyName)) {
        this._transformMetadatas.get(metadata.target).set(metadata.propertyName, []);
      }
      this._transformMetadatas.get(metadata.target).get(metadata.propertyName).push(metadata);
    };
    MetadataStorage2.prototype.addExposeMetadata = function(metadata) {
      if (!this._exposeMetadatas.has(metadata.target)) {
        this._exposeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
      }
      this._exposeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
    };
    MetadataStorage2.prototype.addExcludeMetadata = function(metadata) {
      if (!this._excludeMetadatas.has(metadata.target)) {
        this._excludeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
      }
      this._excludeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
    };
    MetadataStorage2.prototype.findTransformMetadatas = function(target, propertyName, transformationType) {
      return this.findMetadatas(this._transformMetadatas, target, propertyName).filter(function(metadata) {
        if (!metadata.options)
          return true;
        if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
          return true;
        if (metadata.options.toClassOnly === true) {
          return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
        }
        if (metadata.options.toPlainOnly === true) {
          return transformationType === TransformationType.CLASS_TO_PLAIN;
        }
        return true;
      });
    };
    MetadataStorage2.prototype.findExcludeMetadata = function(target, propertyName) {
      return this.findMetadata(this._excludeMetadatas, target, propertyName);
    };
    MetadataStorage2.prototype.findExposeMetadata = function(target, propertyName) {
      return this.findMetadata(this._exposeMetadatas, target, propertyName);
    };
    MetadataStorage2.prototype.findExposeMetadataByCustomName = function(target, name) {
      return this.getExposedMetadatas(target).find(function(metadata) {
        return metadata.options && metadata.options.name === name;
      });
    };
    MetadataStorage2.prototype.findTypeMetadata = function(target, propertyName) {
      return this.findMetadata(this._typeMetadatas, target, propertyName);
    };
    MetadataStorage2.prototype.getStrategy = function(target) {
      var excludeMap = this._excludeMetadatas.get(target);
      var exclude = excludeMap && excludeMap.get(void 0);
      var exposeMap = this._exposeMetadatas.get(target);
      var expose = exposeMap && exposeMap.get(void 0);
      if (exclude && expose || !exclude && !expose)
        return "none";
      return exclude ? "excludeAll" : "exposeAll";
    };
    MetadataStorage2.prototype.getExposedMetadatas = function(target) {
      return this.getMetadata(this._exposeMetadatas, target);
    };
    MetadataStorage2.prototype.getExcludedMetadatas = function(target) {
      return this.getMetadata(this._excludeMetadatas, target);
    };
    MetadataStorage2.prototype.getExposedProperties = function(target, transformationType) {
      return this.getExposedMetadatas(target).filter(function(metadata) {
        if (!metadata.options)
          return true;
        if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
          return true;
        if (metadata.options.toClassOnly === true) {
          return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
        }
        if (metadata.options.toPlainOnly === true) {
          return transformationType === TransformationType.CLASS_TO_PLAIN;
        }
        return true;
      }).map(function(metadata) {
        return metadata.propertyName;
      });
    };
    MetadataStorage2.prototype.getExcludedProperties = function(target, transformationType) {
      return this.getExcludedMetadatas(target).filter(function(metadata) {
        if (!metadata.options)
          return true;
        if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
          return true;
        if (metadata.options.toClassOnly === true) {
          return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
        }
        if (metadata.options.toPlainOnly === true) {
          return transformationType === TransformationType.CLASS_TO_PLAIN;
        }
        return true;
      }).map(function(metadata) {
        return metadata.propertyName;
      });
    };
    MetadataStorage2.prototype.clear = function() {
      this._typeMetadatas.clear();
      this._exposeMetadatas.clear();
      this._excludeMetadatas.clear();
      this._ancestorsMap.clear();
    };
    MetadataStorage2.prototype.getMetadata = function(metadatas, target) {
      var metadataFromTargetMap = metadatas.get(target);
      var metadataFromTarget;
      if (metadataFromTargetMap) {
        metadataFromTarget = Array.from(metadataFromTargetMap.values()).filter(function(meta) {
          return meta.propertyName !== void 0;
        });
      }
      var metadataFromAncestors = [];
      for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
        var ancestor = _a[_i];
        var ancestorMetadataMap = metadatas.get(ancestor);
        if (ancestorMetadataMap) {
          var metadataFromAncestor = Array.from(ancestorMetadataMap.values()).filter(function(meta) {
            return meta.propertyName !== void 0;
          });
          metadataFromAncestors.push.apply(metadataFromAncestors, metadataFromAncestor);
        }
      }
      return metadataFromAncestors.concat(metadataFromTarget || []);
    };
    MetadataStorage2.prototype.findMetadata = function(metadatas, target, propertyName) {
      var metadataFromTargetMap = metadatas.get(target);
      if (metadataFromTargetMap) {
        var metadataFromTarget = metadataFromTargetMap.get(propertyName);
        if (metadataFromTarget) {
          return metadataFromTarget;
        }
      }
      for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
        var ancestor = _a[_i];
        var ancestorMetadataMap = metadatas.get(ancestor);
        if (ancestorMetadataMap) {
          var ancestorResult = ancestorMetadataMap.get(propertyName);
          if (ancestorResult) {
            return ancestorResult;
          }
        }
      }
      return void 0;
    };
    MetadataStorage2.prototype.findMetadatas = function(metadatas, target, propertyName) {
      var metadataFromTargetMap = metadatas.get(target);
      var metadataFromTarget;
      if (metadataFromTargetMap) {
        metadataFromTarget = metadataFromTargetMap.get(propertyName);
      }
      var metadataFromAncestorsTarget = [];
      for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
        var ancestor = _a[_i];
        var ancestorMetadataMap = metadatas.get(ancestor);
        if (ancestorMetadataMap) {
          if (ancestorMetadataMap.has(propertyName)) {
            metadataFromAncestorsTarget.push.apply(metadataFromAncestorsTarget, ancestorMetadataMap.get(propertyName));
          }
        }
      }
      return metadataFromAncestorsTarget.slice().reverse().concat((metadataFromTarget || []).slice().reverse());
    };
    MetadataStorage2.prototype.getAncestors = function(target) {
      if (!target)
        return [];
      if (!this._ancestorsMap.has(target)) {
        var ancestors = [];
        for (var baseClass = Object.getPrototypeOf(target.prototype.constructor); typeof baseClass.prototype !== "undefined"; baseClass = Object.getPrototypeOf(baseClass.prototype.constructor)) {
          ancestors.push(baseClass);
        }
        this._ancestorsMap.set(target, ancestors);
      }
      return this._ancestorsMap.get(target);
    };
    return MetadataStorage2;
  }()
);

// node_modules/class-transformer/esm5/storage.js
var defaultMetadataStorage = new MetadataStorage();

// node_modules/class-transformer/esm5/decorators/exclude.decorator.js
function Exclude(options) {
  if (options === void 0) {
    options = {};
  }
  return function(object, propertyName) {
    defaultMetadataStorage.addExcludeMetadata({
      target: object instanceof Function ? object : object.constructor,
      propertyName,
      options
    });
  };
}

// node_modules/class-transformer/esm5/decorators/expose.decorator.js
function Expose(options) {
  if (options === void 0) {
    options = {};
  }
  return function(object, propertyName) {
    defaultMetadataStorage.addExposeMetadata({
      target: object instanceof Function ? object : object.constructor,
      propertyName,
      options
    });
  };
}

// node_modules/class-transformer/esm5/decorators/type.decorator.js
function Type(typeFunction, options) {
  if (options === void 0) {
    options = {};
  }
  return function(target, propertyName) {
    var reflectedType = Reflect.getMetadata("design:type", target, propertyName);
    defaultMetadataStorage.addTypeMetadata({
      target: target.constructor,
      propertyName,
      reflectedType,
      typeFunction,
      options
    });
  };
}

// src/E/e.ts
var MAX_SIGNIFICANT_DIGITS = 17;
var EXP_LIMIT = 9e15;
var LAYER_DOWN = Math.log10(9e15);
var FIRST_NEG_LAYER = 1 / 9e15;
var NUMBER_EXP_MAX = 308;
var NUMBER_EXP_MIN = -324;
var MAX_ES_IN_A_ROW = 5;
var DEFAULT_FROM_STRING_CACHE_SIZE = (1 << 10) - 1;
var IGNORE_COMMAS = true;
var COMMAS_ARE_DECIMAL_POINTS = false;
var powerOf10 = function() {
  const powersOf10 = [];
  for (let i = NUMBER_EXP_MIN + 1; i <= NUMBER_EXP_MAX; i++) {
    powersOf10.push(Number("1e" + i));
  }
  const indexOf0InPowersOf10 = 323;
  return function(power) {
    return powersOf10[power + indexOf0InPowersOf10];
  };
}();
var critical_headers = [2, Math.E, 3, 4, 5, 6, 7, 8, 9, 10];
var critical_tetr_values = [
  [
    // Base 2 (using http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html )
    1,
    1.0891180521811203,
    1.1789767925673957,
    1.2701455431742086,
    1.3632090180450092,
    1.4587818160364217,
    1.5575237916251419,
    1.6601571006859253,
    1.767485818836978,
    1.8804192098842727,
    2
  ],
  [
    // Base E (using http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html )
    1,
    // 0.0
    1.1121114330934079,
    // 0.1
    1.231038924931609,
    // 0.2
    1.3583836963111375,
    // 0.3
    1.4960519303993531,
    // 0.4
    1.6463542337511945,
    // 0.5
    1.8121385357018724,
    // 0.6
    1.996971324618307,
    // 0.7
    2.2053895545527546,
    // 0.8
    2.4432574483385254,
    // 0.9
    Math.E
    // 1.0
  ],
  [
    // Base 3
    1,
    1.1187738849693603,
    1.2464963939368214,
    1.38527004705667,
    1.5376664685821402,
    1.7068895236551784,
    1.897001227148399,
    2.1132403089001035,
    2.362480153784171,
    2.6539010333870774,
    3
  ],
  [
    // Base 4
    1,
    1.1367350847096405,
    1.2889510672956703,
    1.4606478703324786,
    1.6570295196661111,
    1.8850062585672889,
    2.1539465047453485,
    2.476829779693097,
    2.872061932789197,
    3.3664204535587183,
    4
  ],
  [
    // Base 5
    1,
    1.1494592900767588,
    1.319708228183931,
    1.5166291280087583,
    1.748171114438024,
    2.0253263297298045,
    2.3636668498288547,
    2.7858359149579424,
    3.3257226212448145,
    4.035730287722532,
    5
  ],
  [
    // Base 6
    1,
    1.159225940787673,
    1.343712473580932,
    1.5611293155111927,
    1.8221199554561318,
    2.14183924486326,
    2.542468319282638,
    3.0574682501653316,
    3.7390572020926873,
    4.6719550537360774,
    6
  ],
  [
    // Base 7
    1,
    1.1670905356972596,
    1.3632807444991446,
    1.5979222279405536,
    1.8842640123816674,
    2.2416069644878687,
    2.69893426559423,
    3.3012632110403577,
    4.121250340630164,
    5.281493033448316,
    7
  ],
  [
    // Base 8
    1,
    1.1736630594087796,
    1.379783782386201,
    1.6292821855668218,
    1.9378971836180754,
    2.3289975651071977,
    2.8384347394720835,
    3.5232708454565906,
    4.478242031114584,
    5.868592169644505,
    8
  ],
  [
    // Base 9
    1,
    1.1793017514670474,
    1.394054150657457,
    1.65664127441059,
    1.985170999970283,
    2.4069682290577457,
    2.9647310119960752,
    3.7278665320924946,
    4.814462547283592,
    6.436522247411611,
    9
  ],
  [
    // Base 10 (using http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html )
    1,
    1.1840100246247336,
    1.4061375836156955,
    1.6802272208863964,
    2.026757028388619,
    2.4770056063449646,
    3.080525271755482,
    3.9191964192627284,
    5.135152840833187,
    6.989961179534715,
    10
  ]
];
var critical_slog_values = [
  [
    // Base 2
    -1,
    -0.9194161097107025,
    -0.8335625019330468,
    -0.7425599821143978,
    -0.6466611521029437,
    -0.5462617907227869,
    -0.4419033816638769,
    -0.3342645487554494,
    -0.224140440909962,
    -0.11241087890006762,
    0
  ],
  [
    // Base E
    -1,
    // 0.0
    -0.90603157029014,
    // 0.1
    -0.80786507256596,
    // 0.2
    -0.7064666939634,
    // 0.3
    -0.60294836853664,
    // 0.4
    -0.49849837513117,
    // 0.5
    -0.39430303318768,
    // 0.6
    -0.29147201034755,
    // 0.7
    -0.19097820800866,
    // 0.8
    -0.09361896280296,
    // 0.9
    0
    // 1.0
  ],
  [
    // Base 3
    -1,
    -0.9021579584316141,
    -0.8005762598234203,
    -0.6964780623319391,
    -0.5911906810998454,
    -0.486050182576545,
    -0.3823089430815083,
    -0.28106046722897615,
    -0.1831906535795894,
    -0.08935809204418144,
    0
  ],
  [
    // Base 4
    -1,
    -0.8917227442365535,
    -0.781258746326964,
    -0.6705130326902455,
    -0.5612813129406509,
    -0.4551067709033134,
    -0.35319256652135966,
    -0.2563741554088552,
    -0.1651412821106526,
    -0.0796919581982668,
    0
  ],
  [
    // Base 5
    -1,
    -0.8843387974366064,
    -0.7678744063886243,
    -0.6529563724510552,
    -0.5415870994657841,
    -0.4352842206588936,
    -0.33504449124791424,
    -0.24138853420685147,
    -0.15445285440944467,
    -0.07409659641336663,
    0
  ],
  [
    // Base 6
    -1,
    -0.8786709358426346,
    -0.7577735191184886,
    -0.6399546189952064,
    -0.527284921869926,
    -0.4211627631006314,
    -0.3223479611761232,
    -0.23107655627789858,
    -0.1472057700818259,
    -0.07035171210706326,
    0
  ],
  [
    // Base 7
    -1,
    -0.8740862815291583,
    -0.7497032990976209,
    -0.6297119746181752,
    -0.5161838335958787,
    -0.41036238255751956,
    -0.31277212146489963,
    -0.2233976621705518,
    -0.1418697367979619,
    -0.06762117662323441,
    0
  ],
  [
    // Base 8
    -1,
    -0.8702632331800649,
    -0.7430366914122081,
    -0.6213373075161548,
    -0.5072025698095242,
    -0.40171437727184167,
    -0.30517930701410456,
    -0.21736343968190863,
    -0.137710238299109,
    -0.06550774483471955,
    0
  ],
  [
    // Base 9
    -1,
    -0.8670016295947213,
    -0.7373984232432306,
    -0.6143173985094293,
    -0.49973884395492807,
    -0.394584953527678,
    -0.2989649949848695,
    -0.21245647317021688,
    -0.13434688362382652,
    -0.0638072667348083,
    0
  ],
  [
    // Base 10
    -1,
    -0.8641642839543857,
    -0.732534623168535,
    -0.6083127477059322,
    -0.4934049257184696,
    -0.3885773075899922,
    -0.29376029055315767,
    -0.2083678561173622,
    -0.13155653399373268,
    -0.062401588652553186,
    0
  ]
];
var decimalPlaces = function decimalPlaces2(value, places) {
  const len = places + 1;
  const numDigits = Math.ceil(Math.log10(Math.abs(value)));
  const rounded = Math.round(value * Math.pow(10, len - numDigits)) * Math.pow(10, numDigits - len);
  return parseFloat(rounded.toFixed(Math.max(len - numDigits, 0)));
};
var f_maglog10 = function(n) {
  return Math.sign(n) * Math.log10(Math.abs(n));
};
var f_gamma = function(n) {
  if (!isFinite(n)) {
    return n;
  }
  if (n < -50) {
    if (n === Math.trunc(n)) {
      return Number.NEGATIVE_INFINITY;
    }
    return 0;
  }
  let scal1 = 1;
  while (n < 10) {
    scal1 = scal1 * n;
    ++n;
  }
  n -= 1;
  let l = 0.9189385332046727;
  l = l + (n + 0.5) * Math.log(n);
  l = l - n;
  const n2 = n * n;
  let np = n;
  l = l + 1 / (12 * np);
  np = np * n2;
  l = l + 1 / (360 * np);
  np = np * n2;
  l = l + 1 / (1260 * np);
  np = np * n2;
  l = l + 1 / (1680 * np);
  np = np * n2;
  l = l + 1 / (1188 * np);
  np = np * n2;
  l = l + 691 / (360360 * np);
  np = np * n2;
  l = l + 7 / (1092 * np);
  np = np * n2;
  l = l + 3617 / (122400 * np);
  return Math.exp(l) / scal1;
};
var _EXPN1 = 0.36787944117144233;
var OMEGA = 0.5671432904097838;
var f_lambertw = function(z, tol = 1e-10) {
  let w;
  let wn;
  if (!Number.isFinite(z)) {
    return z;
  }
  if (z === 0) {
    return z;
  }
  if (z === 1) {
    return OMEGA;
  }
  if (z < 10) {
    w = 0;
  } else {
    w = Math.log(z) - Math.log(Math.log(z));
  }
  for (let i = 0; i < 100; ++i) {
    wn = (z * Math.exp(-w) + w * w) / (w + 1);
    if (Math.abs(wn - w) < tol * Math.abs(wn)) {
      return wn;
    } else {
      w = wn;
    }
  }
  throw Error(`Iteration failed to converge: ${z.toString()}`);
};
function d_lambertw(z, tol = 1e-10) {
  let w;
  let ew, wewz, wn;
  if (!Number.isFinite(z.mag)) {
    return z;
  }
  if (z.eq(Decimal.dZero)) {
    return z;
  }
  if (z.eq(Decimal.dOne)) {
    return Decimal.fromNumber(OMEGA);
  }
  w = Decimal.ln(z);
  for (let i = 0; i < 100; ++i) {
    ew = w.neg().exp();
    wewz = w.sub(z.mul(ew));
    wn = w.sub(wewz.div(w.add(1).sub(w.add(2).mul(wewz).div(Decimal.mul(2, w).add(2)))));
    if (Decimal.abs(wn.sub(w)).lt(Decimal.abs(wn).mul(tol))) {
      return wn;
    } else {
      w = wn;
    }
  }
  throw Error(`Iteration failed to converge: ${z.toString()}`);
}
var Decimal = class {
  constructor(value) {
    this.sign = 0;
    this.mag = 0;
    this.layer = 0;
    if (value instanceof Decimal) {
      this.fromDecimal(value);
    } else if (typeof value === "number") {
      this.fromNumber(value);
    } else if (typeof value === "string") {
      this.fromString(value);
    }
  }
  get m() {
    if (this.sign === 0) {
      return 0;
    } else if (this.layer === 0) {
      const exp = Math.floor(Math.log10(this.mag));
      let man;
      if (this.mag === 5e-324) {
        man = 5;
      } else {
        man = this.mag / powerOf10(exp);
      }
      return this.sign * man;
    } else if (this.layer === 1) {
      const residue = this.mag - Math.floor(this.mag);
      return this.sign * Math.pow(10, residue);
    } else {
      return this.sign;
    }
  }
  set m(value) {
    if (this.layer <= 2) {
      this.fromMantissaExponent(value, this.e);
    } else {
      this.sign = Math.sign(value);
      if (this.sign === 0) {
        this.layer = 0;
        this.exponent = 0;
      }
    }
  }
  get e() {
    if (this.sign === 0) {
      return 0;
    } else if (this.layer === 0) {
      return Math.floor(Math.log10(this.mag));
    } else if (this.layer === 1) {
      return Math.floor(this.mag);
    } else if (this.layer === 2) {
      return Math.floor(Math.sign(this.mag) * Math.pow(10, Math.abs(this.mag)));
    } else {
      return this.mag * Number.POSITIVE_INFINITY;
    }
  }
  set e(value) {
    this.fromMantissaExponent(this.m, value);
  }
  get s() {
    return this.sign;
  }
  set s(value) {
    if (value === 0) {
      this.sign = 0;
      this.layer = 0;
      this.mag = 0;
    } else {
      this.sign = value;
    }
  }
  // Object.defineProperty(Decimal.prototype, "mantissa", {
  get mantissa() {
    return this.m;
  }
  set mantissa(value) {
    this.m = value;
  }
  get exponent() {
    return this.e;
  }
  set exponent(value) {
    this.e = value;
  }
  static fromComponents(sign, layer, mag) {
    return new Decimal().fromComponents(sign, layer, mag);
  }
  static fromComponents_noNormalize(sign, layer, mag) {
    return new Decimal().fromComponents_noNormalize(sign, layer, mag);
  }
  static fromMantissaExponent(mantissa, exponent) {
    return new Decimal().fromMantissaExponent(mantissa, exponent);
  }
  static fromMantissaExponent_noNormalize(mantissa, exponent) {
    return new Decimal().fromMantissaExponent_noNormalize(mantissa, exponent);
  }
  static fromDecimal(value) {
    return new Decimal().fromDecimal(value);
  }
  static fromNumber(value) {
    return new Decimal().fromNumber(value);
  }
  static fromString(value) {
    return new Decimal().fromString(value);
  }
  static fromValue(value) {
    return new Decimal().fromValue(value);
  }
  /**
  * Converts a DecimalSource to a Decimal, without constructing a new Decimal
  * if the provided value is already a Decimal.
  *
  * As the return value could be the provided value itself, this function
  * returns a read-only Decimal to prevent accidental mutations of the value.
  * Use `new Decimal(value)` to explicitly create a writeable copy if mutation
  * is required.
  */
  static fromValue_noAlloc(value) {
    if (value instanceof Decimal) {
      return value;
    } else if (typeof value === "string") {
      const cached = Decimal.fromStringCache.get(value);
      if (cached !== void 0) {
        return cached;
      }
      return Decimal.fromString(value);
    } else if (typeof value === "number") {
      return Decimal.fromNumber(value);
    } else {
      return Decimal.dZero;
    }
  }
  static abs(value) {
    return Decimal.fromValue_noAlloc(value).abs();
  }
  static neg(value) {
    return Decimal.fromValue_noAlloc(value).neg();
  }
  static negate(value) {
    return Decimal.fromValue_noAlloc(value).neg();
  }
  static negated(value) {
    return Decimal.fromValue_noAlloc(value).neg();
  }
  static sign(value) {
    return Decimal.fromValue_noAlloc(value).sign;
  }
  static sgn(value) {
    return Decimal.fromValue_noAlloc(value).sign;
  }
  static round(value) {
    return Decimal.fromValue_noAlloc(value).round();
  }
  static floor(value) {
    return Decimal.fromValue_noAlloc(value).floor();
  }
  static ceil(value) {
    return Decimal.fromValue_noAlloc(value).ceil();
  }
  static trunc(value) {
    return Decimal.fromValue_noAlloc(value).trunc();
  }
  static add(value, other) {
    return Decimal.fromValue_noAlloc(value).add(other);
  }
  static plus(value, other) {
    return Decimal.fromValue_noAlloc(value).add(other);
  }
  static sub(value, other) {
    return Decimal.fromValue_noAlloc(value).sub(other);
  }
  static subtract(value, other) {
    return Decimal.fromValue_noAlloc(value).sub(other);
  }
  static minus(value, other) {
    return Decimal.fromValue_noAlloc(value).sub(other);
  }
  static mul(value, other) {
    return Decimal.fromValue_noAlloc(value).mul(other);
  }
  static multiply(value, other) {
    return Decimal.fromValue_noAlloc(value).mul(other);
  }
  static times(value, other) {
    return Decimal.fromValue_noAlloc(value).mul(other);
  }
  static div(value, other) {
    return Decimal.fromValue_noAlloc(value).div(other);
  }
  static divide(value, other) {
    return Decimal.fromValue_noAlloc(value).div(other);
  }
  static recip(value) {
    return Decimal.fromValue_noAlloc(value).recip();
  }
  static reciprocal(value) {
    return Decimal.fromValue_noAlloc(value).recip();
  }
  static reciprocate(value) {
    return Decimal.fromValue_noAlloc(value).reciprocate();
  }
  static mod(value, other) {
    return Decimal.fromValue_noAlloc(value).mod(other);
  }
  static modulo(value, other) {
    return Decimal.fromValue_noAlloc(value).modulo(other);
  }
  static modular(value, other) {
    return Decimal.fromValue_noAlloc(value).modular(other);
  }
  static cmp(value, other) {
    return Decimal.fromValue_noAlloc(value).cmp(other);
  }
  static cmpabs(value, other) {
    return Decimal.fromValue_noAlloc(value).cmpabs(other);
  }
  static compare(value, other) {
    return Decimal.fromValue_noAlloc(value).cmp(other);
  }
  static isNaN(value) {
    value = Decimal.fromValue_noAlloc(value);
    return isNaN(value.sign) || isNaN(value.layer) || isNaN(value.mag);
  }
  static isFinite(value) {
    value = Decimal.fromValue_noAlloc(value);
    return isFinite(value.sign) && isFinite(value.layer) && isFinite(value.mag);
  }
  static eq(value, other) {
    return Decimal.fromValue_noAlloc(value).eq(other);
  }
  static equals(value, other) {
    return Decimal.fromValue_noAlloc(value).eq(other);
  }
  static neq(value, other) {
    return Decimal.fromValue_noAlloc(value).neq(other);
  }
  static notEquals(value, other) {
    return Decimal.fromValue_noAlloc(value).notEquals(other);
  }
  static lt(value, other) {
    return Decimal.fromValue_noAlloc(value).lt(other);
  }
  static lte(value, other) {
    return Decimal.fromValue_noAlloc(value).lte(other);
  }
  static gt(value, other) {
    return Decimal.fromValue_noAlloc(value).gt(other);
  }
  static gte(value, other) {
    return Decimal.fromValue_noAlloc(value).gte(other);
  }
  static max(value, other) {
    return Decimal.fromValue_noAlloc(value).max(other);
  }
  static min(value, other) {
    return Decimal.fromValue_noAlloc(value).min(other);
  }
  static minabs(value, other) {
    return Decimal.fromValue_noAlloc(value).minabs(other);
  }
  static maxabs(value, other) {
    return Decimal.fromValue_noAlloc(value).maxabs(other);
  }
  static clamp(value, min, max) {
    return Decimal.fromValue_noAlloc(value).clamp(min, max);
  }
  static clampMin(value, min) {
    return Decimal.fromValue_noAlloc(value).clampMin(min);
  }
  static clampMax(value, max) {
    return Decimal.fromValue_noAlloc(value).clampMax(max);
  }
  static cmp_tolerance(value, other, tolerance) {
    return Decimal.fromValue_noAlloc(value).cmp_tolerance(other, tolerance);
  }
  static compare_tolerance(value, other, tolerance) {
    return Decimal.fromValue_noAlloc(value).cmp_tolerance(other, tolerance);
  }
  static eq_tolerance(value, other, tolerance) {
    return Decimal.fromValue_noAlloc(value).eq_tolerance(other, tolerance);
  }
  static equals_tolerance(value, other, tolerance) {
    return Decimal.fromValue_noAlloc(value).eq_tolerance(other, tolerance);
  }
  static neq_tolerance(value, other, tolerance) {
    return Decimal.fromValue_noAlloc(value).neq_tolerance(other, tolerance);
  }
  static notEquals_tolerance(value, other, tolerance) {
    return Decimal.fromValue_noAlloc(value).notEquals_tolerance(other, tolerance);
  }
  static lt_tolerance(value, other, tolerance) {
    return Decimal.fromValue_noAlloc(value).lt_tolerance(other, tolerance);
  }
  static lte_tolerance(value, other, tolerance) {
    return Decimal.fromValue_noAlloc(value).lte_tolerance(other, tolerance);
  }
  static gt_tolerance(value, other, tolerance) {
    return Decimal.fromValue_noAlloc(value).gt_tolerance(other, tolerance);
  }
  static gte_tolerance(value, other, tolerance) {
    return Decimal.fromValue_noAlloc(value).gte_tolerance(other, tolerance);
  }
  static pLog10(value) {
    return Decimal.fromValue_noAlloc(value).pLog10();
  }
  static absLog10(value) {
    return Decimal.fromValue_noAlloc(value).absLog10();
  }
  static log10(value) {
    return Decimal.fromValue_noAlloc(value).log10();
  }
  static log(value, base) {
    return Decimal.fromValue_noAlloc(value).log(base);
  }
  static log2(value) {
    return Decimal.fromValue_noAlloc(value).log2();
  }
  static ln(value) {
    return Decimal.fromValue_noAlloc(value).ln();
  }
  static logarithm(value, base) {
    return Decimal.fromValue_noAlloc(value).logarithm(base);
  }
  static pow(value, other) {
    return Decimal.fromValue_noAlloc(value).pow(other);
  }
  static pow10(value) {
    return Decimal.fromValue_noAlloc(value).pow10();
  }
  static root(value, other) {
    return Decimal.fromValue_noAlloc(value).root(other);
  }
  static factorial(value, _other) {
    return Decimal.fromValue_noAlloc(value).factorial();
  }
  static gamma(value, _other) {
    return Decimal.fromValue_noAlloc(value).gamma();
  }
  static lngamma(value, _other) {
    return Decimal.fromValue_noAlloc(value).lngamma();
  }
  static exp(value) {
    return Decimal.fromValue_noAlloc(value).exp();
  }
  static sqr(value) {
    return Decimal.fromValue_noAlloc(value).sqr();
  }
  static sqrt(value) {
    return Decimal.fromValue_noAlloc(value).sqrt();
  }
  static cube(value) {
    return Decimal.fromValue_noAlloc(value).cube();
  }
  static cbrt(value) {
    return Decimal.fromValue_noAlloc(value).cbrt();
  }
  static tetrate(value, height = 2, payload = Decimal.fromComponents_noNormalize(1, 0, 1), linear = false) {
    return Decimal.fromValue_noAlloc(value).tetrate(height, payload, linear);
  }
  static iteratedexp(value, height = 2, payload = Decimal.fromComponents_noNormalize(1, 0, 1), linear = false) {
    return Decimal.fromValue_noAlloc(value).iteratedexp(height, payload, linear);
  }
  static iteratedlog(value, base = 10, times = 1, linear = false) {
    return Decimal.fromValue_noAlloc(value).iteratedlog(base, times, linear);
  }
  static layeradd10(value, diff, linear = false) {
    return Decimal.fromValue_noAlloc(value).layeradd10(diff, linear);
  }
  static layeradd(value, diff, base = 10, linear = false) {
    return Decimal.fromValue_noAlloc(value).layeradd(diff, base, linear);
  }
  static slog(value, base = 10, linear = false) {
    return Decimal.fromValue_noAlloc(value).slog(base, 100, linear);
  }
  static lambertw(value) {
    return Decimal.fromValue_noAlloc(value).lambertw();
  }
  static ssqrt(value) {
    return Decimal.fromValue_noAlloc(value).ssqrt();
  }
  static linear_sroot(value, height) {
    return Decimal.fromValue_noAlloc(value).linear_sroot(height);
  }
  static pentate(value, height = 2, payload = Decimal.fromComponents_noNormalize(1, 0, 1), linear = false) {
    return Decimal.fromValue_noAlloc(value).pentate(height, payload, linear);
  }
  /**
  * If you're willing to spend 'resourcesAvailable' and want to buy something
  * with exponentially increasing cost each purchase (start at priceStart,
  * multiply by priceRatio, already own currentOwned), how much of it can you buy?
  * Adapted from Trimps source code.
  */
  static affordGeometricSeries(resourcesAvailable, priceStart, priceRatio, currentOwned) {
    return this.affordGeometricSeries_core(
      Decimal.fromValue_noAlloc(resourcesAvailable),
      Decimal.fromValue_noAlloc(priceStart),
      Decimal.fromValue_noAlloc(priceRatio),
      currentOwned
    );
  }
  /**
  * How much resource would it cost to buy (numItems) items if you already have currentOwned,
  * the initial price is priceStart and it multiplies by priceRatio each purchase?
  */
  static sumGeometricSeries(numItems, priceStart, priceRatio, currentOwned) {
    return this.sumGeometricSeries_core(numItems, Decimal.fromValue_noAlloc(priceStart), Decimal.fromValue_noAlloc(priceRatio), currentOwned);
  }
  /**
  * If you're willing to spend 'resourcesAvailable' and want to buy something with additively
  * increasing cost each purchase (start at priceStart, add by priceAdd, already own currentOwned),
  * how much of it can you buy?
  */
  static affordArithmeticSeries(resourcesAvailable, priceStart, priceAdd, currentOwned) {
    return this.affordArithmeticSeries_core(
      Decimal.fromValue_noAlloc(resourcesAvailable),
      Decimal.fromValue_noAlloc(priceStart),
      Decimal.fromValue_noAlloc(priceAdd),
      Decimal.fromValue_noAlloc(currentOwned)
    );
  }
  /**
  * How much resource would it cost to buy (numItems) items if you already have currentOwned,
  * the initial price is priceStart and it adds priceAdd each purchase?
  * Adapted from http://www.mathwords.com/a/arithmetic_series.htm
  */
  static sumArithmeticSeries(numItems, priceStart, priceAdd, currentOwned) {
    return this.sumArithmeticSeries_core(Decimal.fromValue_noAlloc(numItems), Decimal.fromValue_noAlloc(priceStart), Decimal.fromValue_noAlloc(priceAdd), Decimal.fromValue_noAlloc(currentOwned));
  }
  /**
  * When comparing two purchases that cost (resource) and increase your resource/sec by (deltaRpS),
  * the lowest efficiency score is the better one to purchase.
  * From Frozen Cookies:
  * http://cookieclicker.wikia.com/wiki/Frozen_Cookies_(JavaScript_Add-on)#Efficiency.3F_What.27s_that.3F
  */
  static efficiencyOfPurchase(cost, currentRpS, deltaRpS) {
    return this.efficiencyOfPurchase_core(Decimal.fromValue_noAlloc(cost), Decimal.fromValue_noAlloc(currentRpS), Decimal.fromValue_noAlloc(deltaRpS));
  }
  static randomDecimalForTesting(maxLayers) {
    if (Math.random() * 20 < 1) {
      return Decimal.fromComponents_noNormalize(0, 0, 0);
    }
    const randomsign = Math.random() > 0.5 ? 1 : -1;
    if (Math.random() * 20 < 1) {
      return Decimal.fromComponents_noNormalize(randomsign, 0, 1);
    }
    const layer = Math.floor(Math.random() * (maxLayers + 1));
    let randomexp = layer === 0 ? Math.random() * 616 - 308 : Math.random() * 16;
    if (Math.random() > 0.9) {
      randomexp = Math.trunc(randomexp);
    }
    let randommag = Math.pow(10, randomexp);
    if (Math.random() > 0.9) {
      randommag = Math.trunc(randommag);
    }
    return Decimal.fromComponents(randomsign, layer, randommag);
  }
  static affordGeometricSeries_core(resourcesAvailable, priceStart, priceRatio, currentOwned) {
    const actualStart = priceStart.mul(priceRatio.pow(currentOwned));
    return Decimal.floor(
      resourcesAvailable.div(actualStart).mul(priceRatio.sub(1)).add(1).log10().div(priceRatio.log10())
    );
  }
  static sumGeometricSeries_core(numItems, priceStart, priceRatio, currentOwned) {
    return priceStart.mul(priceRatio.pow(currentOwned)).mul(Decimal.sub(1, priceRatio.pow(numItems))).div(Decimal.sub(1, priceRatio));
  }
  static affordArithmeticSeries_core(resourcesAvailable, priceStart, priceAdd, currentOwned) {
    const actualStart = priceStart.add(currentOwned.mul(priceAdd));
    const b = actualStart.sub(priceAdd.div(2));
    const b2 = b.pow(2);
    return b.neg().add(b2.add(priceAdd.mul(resourcesAvailable).mul(2)).sqrt()).div(priceAdd).floor();
  }
  static sumArithmeticSeries_core(numItems, priceStart, priceAdd, currentOwned) {
    const actualStart = priceStart.add(currentOwned.mul(priceAdd));
    return numItems.div(2).mul(actualStart.mul(2).plus(numItems.sub(1).mul(priceAdd)));
  }
  static efficiencyOfPurchase_core(cost, currentRpS, deltaRpS) {
    return cost.div(currentRpS).add(cost.div(deltaRpS));
  }
  normalize() {
    if (this.sign === 0 || this.mag === 0 && this.layer === 0) {
      this.sign = 0;
      this.mag = 0;
      this.layer = 0;
      return this;
    }
    if (this.layer === 0 && this.mag < 0) {
      this.mag = -this.mag;
      this.sign = -this.sign;
    }
    if (this.layer === 0 && this.mag < FIRST_NEG_LAYER) {
      this.layer += 1;
      this.mag = Math.log10(this.mag);
      return this;
    }
    let absmag = Math.abs(this.mag);
    let signmag = Math.sign(this.mag);
    if (absmag >= EXP_LIMIT) {
      this.layer += 1;
      this.mag = signmag * Math.log10(absmag);
      return this;
    } else {
      while (absmag < LAYER_DOWN && this.layer > 0) {
        this.layer -= 1;
        if (this.layer === 0) {
          this.mag = Math.pow(10, this.mag);
        } else {
          this.mag = signmag * Math.pow(10, absmag);
          absmag = Math.abs(this.mag);
          signmag = Math.sign(this.mag);
        }
      }
      if (this.layer === 0) {
        if (this.mag < 0) {
          this.mag = -this.mag;
          this.sign = -this.sign;
        } else if (this.mag === 0) {
          this.sign = 0;
        }
      }
    }
    return this;
  }
  fromComponents(sign, layer, mag) {
    this.sign = sign;
    this.layer = layer;
    this.mag = mag;
    this.normalize();
    return this;
  }
  fromComponents_noNormalize(sign, layer, mag) {
    this.sign = sign;
    this.layer = layer;
    this.mag = mag;
    return this;
  }
  fromMantissaExponent(mantissa, exponent) {
    this.layer = 1;
    this.sign = Math.sign(mantissa);
    mantissa = Math.abs(mantissa);
    this.mag = exponent + Math.log10(mantissa);
    this.normalize();
    return this;
  }
  fromMantissaExponent_noNormalize(mantissa, exponent) {
    this.fromMantissaExponent(mantissa, exponent);
    return this;
  }
  fromDecimal(value) {
    this.sign = value.sign;
    this.layer = value.layer;
    this.mag = value.mag;
    return this;
  }
  fromNumber(value) {
    this.mag = Math.abs(value);
    this.sign = Math.sign(value);
    this.layer = 0;
    this.normalize();
    return this;
  }
  fromString(value) {
    const originalValue = value;
    const cached = Decimal.fromStringCache.get(originalValue);
    if (cached !== void 0) {
      return this.fromDecimal(cached);
    }
    if (IGNORE_COMMAS) {
      value = value.replace(",", "");
    } else if (COMMAS_ARE_DECIMAL_POINTS) {
      value = value.replace(",", ".");
    }
    const pentationparts = value.split("^^^");
    if (pentationparts.length === 2) {
      const base2 = parseFloat(pentationparts[0]);
      const height2 = parseFloat(pentationparts[1]);
      const heightparts = pentationparts[1].split(";");
      let payload = 1;
      if (heightparts.length === 2) {
        payload = parseFloat(heightparts[1]);
        if (!isFinite(payload)) {
          payload = 1;
        }
      }
      if (isFinite(base2) && isFinite(height2)) {
        const result = Decimal.pentate(base2, height2, payload);
        this.sign = result.sign;
        this.layer = result.layer;
        this.mag = result.mag;
        if (Decimal.fromStringCache.maxSize >= 1) {
          Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
        }
        return this;
      }
    }
    const tetrationparts = value.split("^^");
    if (tetrationparts.length === 2) {
      const base2 = parseFloat(tetrationparts[0]);
      const height2 = parseFloat(tetrationparts[1]);
      const heightparts = tetrationparts[1].split(";");
      let payload = 1;
      if (heightparts.length === 2) {
        payload = parseFloat(heightparts[1]);
        if (!isFinite(payload)) {
          payload = 1;
        }
      }
      if (isFinite(base2) && isFinite(height2)) {
        const result = Decimal.tetrate(base2, height2, payload);
        this.sign = result.sign;
        this.layer = result.layer;
        this.mag = result.mag;
        if (Decimal.fromStringCache.maxSize >= 1) {
          Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
        }
        return this;
      }
    }
    const powparts = value.split("^");
    if (powparts.length === 2) {
      const base2 = parseFloat(powparts[0]);
      const exponent2 = parseFloat(powparts[1]);
      if (isFinite(base2) && isFinite(exponent2)) {
        const result = Decimal.pow(base2, exponent2);
        this.sign = result.sign;
        this.layer = result.layer;
        this.mag = result.mag;
        if (Decimal.fromStringCache.maxSize >= 1) {
          Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
        }
        return this;
      }
    }
    value = value.trim().toLowerCase();
    let base;
    let height;
    let ptparts = value.split("pt");
    if (ptparts.length === 2) {
      base = 10;
      height = parseFloat(ptparts[0]);
      ptparts[1] = ptparts[1].replace("(", "");
      ptparts[1] = ptparts[1].replace(")", "");
      let payload = parseFloat(ptparts[1]);
      if (!isFinite(payload)) {
        payload = 1;
      }
      if (isFinite(base) && isFinite(height)) {
        const result = Decimal.tetrate(base, height, payload);
        this.sign = result.sign;
        this.layer = result.layer;
        this.mag = result.mag;
        if (Decimal.fromStringCache.maxSize >= 1) {
          Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
        }
        return this;
      }
    }
    ptparts = value.split("p");
    if (ptparts.length === 2) {
      base = 10;
      height = parseFloat(ptparts[0]);
      ptparts[1] = ptparts[1].replace("(", "");
      ptparts[1] = ptparts[1].replace(")", "");
      let payload = parseFloat(ptparts[1]);
      if (!isFinite(payload)) {
        payload = 1;
      }
      if (isFinite(base) && isFinite(height)) {
        const result = Decimal.tetrate(base, height, payload);
        this.sign = result.sign;
        this.layer = result.layer;
        this.mag = result.mag;
        if (Decimal.fromStringCache.maxSize >= 1) {
          Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
        }
        return this;
      }
    }
    ptparts = value.split("f");
    if (ptparts.length === 2) {
      base = 10;
      ptparts[0] = ptparts[0].replace("(", "");
      ptparts[0] = ptparts[0].replace(")", "");
      let payload = parseFloat(ptparts[0]);
      ptparts[1] = ptparts[1].replace("(", "");
      ptparts[1] = ptparts[1].replace(")", "");
      height = parseFloat(ptparts[1]);
      if (!isFinite(payload)) {
        payload = 1;
      }
      if (isFinite(base) && isFinite(height)) {
        const result = Decimal.tetrate(base, height, payload);
        this.sign = result.sign;
        this.layer = result.layer;
        this.mag = result.mag;
        if (Decimal.fromStringCache.maxSize >= 1) {
          Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
        }
        return this;
      }
    }
    const parts = value.split("e");
    const ecount = parts.length - 1;
    if (ecount === 0) {
      const numberAttempt = parseFloat(value);
      if (isFinite(numberAttempt)) {
        this.fromNumber(numberAttempt);
        if (Decimal.fromStringCache.size >= 1) {
          Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
        }
        return this;
      }
    } else if (ecount === 1) {
      const numberAttempt = parseFloat(value);
      if (isFinite(numberAttempt) && numberAttempt !== 0) {
        this.fromNumber(numberAttempt);
        if (Decimal.fromStringCache.maxSize >= 1) {
          Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
        }
        return this;
      }
    }
    const newparts = value.split("e^");
    if (newparts.length === 2) {
      this.sign = 1;
      if (newparts[0].charAt(0) == "-") {
        this.sign = -1;
      }
      let layerstring = "";
      for (let i = 0; i < newparts[1].length; ++i) {
        const chrcode = newparts[1].charCodeAt(i);
        if (chrcode >= 43 && chrcode <= 57 || chrcode === 101) {
          layerstring += newparts[1].charAt(i);
        } else {
          this.layer = parseFloat(layerstring);
          this.mag = parseFloat(newparts[1].substr(i + 1));
          this.normalize();
          if (Decimal.fromStringCache.maxSize >= 1) {
            Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
          }
          return this;
        }
      }
    }
    if (ecount < 1) {
      this.sign = 0;
      this.layer = 0;
      this.mag = 0;
      if (Decimal.fromStringCache.maxSize >= 1) {
        Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
      }
      return this;
    }
    const mantissa = parseFloat(parts[0]);
    if (mantissa === 0) {
      this.sign = 0;
      this.layer = 0;
      this.mag = 0;
      if (Decimal.fromStringCache.maxSize >= 1) {
        Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
      }
      return this;
    }
    let exponent = parseFloat(parts[parts.length - 1]);
    if (ecount >= 2) {
      const me = parseFloat(parts[parts.length - 2]);
      if (isFinite(me)) {
        exponent *= Math.sign(me);
        exponent += f_maglog10(me);
      }
    }
    if (!isFinite(mantissa)) {
      this.sign = parts[0] === "-" ? -1 : 1;
      this.layer = ecount;
      this.mag = exponent;
    } else if (ecount === 1) {
      this.sign = Math.sign(mantissa);
      this.layer = 1;
      this.mag = exponent + Math.log10(Math.abs(mantissa));
    } else {
      this.sign = Math.sign(mantissa);
      this.layer = ecount;
      if (ecount === 2) {
        const result = Decimal.mul(Decimal.fromComponents(1, 2, exponent), Decimal.fromValue_noAlloc(mantissa));
        this.sign = result.sign;
        this.layer = result.layer;
        this.mag = result.mag;
        if (Decimal.fromStringCache.maxSize >= 1) {
          Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
        }
        return this;
      } else {
        this.mag = exponent;
      }
    }
    this.normalize();
    if (Decimal.fromStringCache.maxSize >= 1) {
      Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
    }
    return this;
  }
  fromValue(value) {
    if (value instanceof Decimal) {
      return this.fromDecimal(value);
    }
    if (typeof value === "number") {
      return this.fromNumber(value);
    }
    if (typeof value === "string") {
      return this.fromString(value);
    }
    this.sign = 0;
    this.layer = 0;
    this.mag = 0;
    return this;
  }
  toNumber() {
    if (!Number.isFinite(this.layer)) {
      return Number.NaN;
    }
    if (this.layer === 0) {
      return this.sign * this.mag;
    } else if (this.layer === 1) {
      return this.sign * Math.pow(10, this.mag);
    } else {
      return this.mag > 0 ? this.sign > 0 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : 0;
    }
  }
  mantissaWithDecimalPlaces(places) {
    if (isNaN(this.m)) {
      return Number.NaN;
    }
    if (this.m === 0) {
      return 0;
    }
    return decimalPlaces(this.m, places);
  }
  magnitudeWithDecimalPlaces(places) {
    if (isNaN(this.mag)) {
      return Number.NaN;
    }
    if (this.mag === 0) {
      return 0;
    }
    return decimalPlaces(this.mag, places);
  }
  toString() {
    if (isNaN(this.layer) || isNaN(this.sign) || isNaN(this.mag)) {
      return "NaN";
    }
    if (this.mag === Number.POSITIVE_INFINITY || this.layer === Number.POSITIVE_INFINITY) {
      return this.sign === 1 ? "Infinity" : "-Infinity";
    }
    if (this.layer === 0) {
      if (this.mag < 1e21 && this.mag > 1e-7 || this.mag === 0) {
        return (this.sign * this.mag).toString();
      }
      return this.m + "e" + this.e;
    } else if (this.layer === 1) {
      return this.m + "e" + this.e;
    } else {
      if (this.layer <= MAX_ES_IN_A_ROW) {
        return (this.sign === -1 ? "-" : "") + "e".repeat(this.layer) + this.mag;
      } else {
        return (this.sign === -1 ? "-" : "") + "(e^" + this.layer + ")" + this.mag;
      }
    }
  }
  toExponential(places) {
    if (this.layer === 0) {
      return (this.sign * this.mag).toExponential(places);
    }
    return this.toStringWithDecimalPlaces(places);
  }
  toFixed(places) {
    if (this.layer === 0) {
      return (this.sign * this.mag).toFixed(places);
    }
    return this.toStringWithDecimalPlaces(places);
  }
  toPrecision(places) {
    if (this.e <= -7) {
      return this.toExponential(places - 1);
    }
    if (places > this.e) {
      return this.toFixed(places - this.exponent - 1);
    }
    return this.toExponential(places - 1);
  }
  valueOf() {
    return this.toString();
  }
  toJSON() {
    return this.toString();
  }
  toStringWithDecimalPlaces(places) {
    if (this.layer === 0) {
      if (this.mag < 1e21 && this.mag > 1e-7 || this.mag === 0) {
        return (this.sign * this.mag).toFixed(places);
      }
      return decimalPlaces(this.m, places) + "e" + decimalPlaces(this.e, places);
    } else if (this.layer === 1) {
      return decimalPlaces(this.m, places) + "e" + decimalPlaces(this.e, places);
    } else {
      if (this.layer <= MAX_ES_IN_A_ROW) {
        return (this.sign === -1 ? "-" : "") + "e".repeat(this.layer) + decimalPlaces(this.mag, places);
      } else {
        return (this.sign === -1 ? "-" : "") + "(e^" + this.layer + ")" + decimalPlaces(this.mag, places);
      }
    }
  }
  abs() {
    return Decimal.fromComponents_noNormalize(this.sign === 0 ? 0 : 1, this.layer, this.mag);
  }
  neg() {
    return Decimal.fromComponents_noNormalize(-this.sign, this.layer, this.mag);
  }
  negate() {
    return this.neg();
  }
  negated() {
    return this.neg();
  }
  // public sign () {
  //     return this.sign;
  //   }
  sgn() {
    return this.sign;
  }
  round() {
    if (this.mag < 0) {
      return Decimal.dZero;
    }
    if (this.layer === 0) {
      return Decimal.fromComponents(this.sign, 0, Math.round(this.mag));
    }
    return this;
  }
  floor() {
    if (this.mag < 0) {
      return Decimal.dZero;
    }
    if (this.layer === 0) {
      return Decimal.fromComponents(this.sign, 0, Math.floor(this.mag));
    }
    return this;
  }
  ceil() {
    if (this.mag < 0) {
      return Decimal.dZero;
    }
    if (this.layer === 0) {
      return Decimal.fromComponents(this.sign, 0, Math.ceil(this.mag));
    }
    return this;
  }
  trunc() {
    if (this.mag < 0) {
      return Decimal.dZero;
    }
    if (this.layer === 0) {
      return Decimal.fromComponents(this.sign, 0, Math.trunc(this.mag));
    }
    return this;
  }
  add(value) {
    const decimal = Decimal.fromValue_noAlloc(value);
    if (!Number.isFinite(this.layer)) {
      return this;
    }
    if (!Number.isFinite(decimal.layer)) {
      return decimal;
    }
    if (this.sign === 0) {
      return decimal;
    }
    if (decimal.sign === 0) {
      return this;
    }
    if (this.sign === -decimal.sign && this.layer === decimal.layer && this.mag === decimal.mag) {
      return Decimal.fromComponents_noNormalize(0, 0, 0);
    }
    let a;
    let b;
    if (this.layer >= 2 || decimal.layer >= 2) {
      return this.maxabs(decimal);
    }
    if (Decimal.cmpabs(this, decimal) > 0) {
      a = this;
      b = decimal;
    } else {
      a = decimal;
      b = this;
    }
    if (a.layer === 0 && b.layer === 0) {
      return Decimal.fromNumber(a.sign * a.mag + b.sign * b.mag);
    }
    const layera = a.layer * Math.sign(a.mag);
    const layerb = b.layer * Math.sign(b.mag);
    if (layera - layerb >= 2) {
      return a;
    }
    if (layera === 0 && layerb === -1) {
      if (Math.abs(b.mag - Math.log10(a.mag)) > MAX_SIGNIFICANT_DIGITS) {
        return a;
      } else {
        const magdiff = Math.pow(10, Math.log10(a.mag) - b.mag);
        const mantissa = b.sign + a.sign * magdiff;
        return Decimal.fromComponents(Math.sign(mantissa), 1, b.mag + Math.log10(Math.abs(mantissa)));
      }
    }
    if (layera === 1 && layerb === 0) {
      if (Math.abs(a.mag - Math.log10(b.mag)) > MAX_SIGNIFICANT_DIGITS) {
        return a;
      } else {
        const magdiff = Math.pow(10, a.mag - Math.log10(b.mag));
        const mantissa = b.sign + a.sign * magdiff;
        return Decimal.fromComponents(Math.sign(mantissa), 1, Math.log10(b.mag) + Math.log10(Math.abs(mantissa)));
      }
    }
    if (Math.abs(a.mag - b.mag) > MAX_SIGNIFICANT_DIGITS) {
      return a;
    } else {
      const magdiff = Math.pow(10, a.mag - b.mag);
      const mantissa = b.sign + a.sign * magdiff;
      return Decimal.fromComponents(Math.sign(mantissa), 1, b.mag + Math.log10(Math.abs(mantissa)));
    }
    throw Error("Bad arguments to add: " + this + ", " + value);
  }
  plus(value) {
    return this.add(value);
  }
  sub(value) {
    return this.add(Decimal.fromValue_noAlloc(value).neg());
  }
  subtract(value) {
    return this.sub(value);
  }
  minus(value) {
    return this.sub(value);
  }
  mul(value) {
    const decimal = Decimal.fromValue_noAlloc(value);
    if (!Number.isFinite(this.layer)) {
      return this;
    }
    if (!Number.isFinite(decimal.layer)) {
      return decimal;
    }
    if (this.sign === 0 || decimal.sign === 0) {
      return Decimal.fromComponents_noNormalize(0, 0, 0);
    }
    if (this.layer === decimal.layer && this.mag === -decimal.mag) {
      return Decimal.fromComponents_noNormalize(this.sign * decimal.sign, 0, 1);
    }
    let a;
    let b;
    if (this.layer > decimal.layer || this.layer == decimal.layer && Math.abs(this.mag) > Math.abs(decimal.mag)) {
      a = this;
      b = decimal;
    } else {
      a = decimal;
      b = this;
    }
    if (a.layer === 0 && b.layer === 0) {
      return Decimal.fromNumber(a.sign * b.sign * a.mag * b.mag);
    }
    if (a.layer >= 3 || a.layer - b.layer >= 2) {
      return Decimal.fromComponents(a.sign * b.sign, a.layer, a.mag);
    }
    if (a.layer === 1 && b.layer === 0) {
      return Decimal.fromComponents(a.sign * b.sign, 1, a.mag + Math.log10(b.mag));
    }
    if (a.layer === 1 && b.layer === 1) {
      return Decimal.fromComponents(a.sign * b.sign, 1, a.mag + b.mag);
    }
    if (a.layer === 2 && b.layer === 1) {
      const newmag = Decimal.fromComponents(Math.sign(a.mag), a.layer - 1, Math.abs(a.mag)).add(
        Decimal.fromComponents(Math.sign(b.mag), b.layer - 1, Math.abs(b.mag))
      );
      return Decimal.fromComponents(a.sign * b.sign, newmag.layer + 1, newmag.sign * newmag.mag);
    }
    if (a.layer === 2 && b.layer === 2) {
      const newmag = Decimal.fromComponents(Math.sign(a.mag), a.layer - 1, Math.abs(a.mag)).add(
        Decimal.fromComponents(Math.sign(b.mag), b.layer - 1, Math.abs(b.mag))
      );
      return Decimal.fromComponents(a.sign * b.sign, newmag.layer + 1, newmag.sign * newmag.mag);
    }
    throw Error("Bad arguments to mul: " + this + ", " + value);
  }
  multiply(value) {
    return this.mul(value);
  }
  times(value) {
    return this.mul(value);
  }
  div(value) {
    const decimal = Decimal.fromValue_noAlloc(value);
    return this.mul(decimal.recip());
  }
  divide(value) {
    return this.div(value);
  }
  divideBy(value) {
    return this.div(value);
  }
  dividedBy(value) {
    return this.div(value);
  }
  recip() {
    if (this.mag === 0) {
      return Decimal.dNaN;
    } else if (this.layer === 0) {
      return Decimal.fromComponents(this.sign, 0, 1 / this.mag);
    } else {
      return Decimal.fromComponents(this.sign, this.layer, -this.mag);
    }
  }
  reciprocal() {
    return this.recip();
  }
  reciprocate() {
    return this.recip();
  }
  /**
  * -1 for less than value, 0 for equals value, 1 for greater than value
  */
  cmp(value) {
    const decimal = Decimal.fromValue_noAlloc(value);
    if (this.sign > decimal.sign) {
      return 1;
    }
    if (this.sign < decimal.sign) {
      return -1;
    }
    return this.sign * this.cmpabs(value);
  }
  cmpabs(value) {
    const decimal = Decimal.fromValue_noAlloc(value);
    const layera = this.mag > 0 ? this.layer : -this.layer;
    const layerb = decimal.mag > 0 ? decimal.layer : -decimal.layer;
    if (layera > layerb) {
      return 1;
    }
    if (layera < layerb) {
      return -1;
    }
    if (this.mag > decimal.mag) {
      return 1;
    }
    if (this.mag < decimal.mag) {
      return -1;
    }
    return 0;
  }
  compare(value) {
    return this.cmp(value);
  }
  isNan() {
    return isNaN(this.sign) || isNaN(this.layer) || isNaN(this.mag);
  }
  isFinite() {
    return isFinite(this.sign) && isFinite(this.layer) && isFinite(this.mag);
  }
  eq(value) {
    const decimal = Decimal.fromValue_noAlloc(value);
    return this.sign === decimal.sign && this.layer === decimal.layer && this.mag === decimal.mag;
  }
  equals(value) {
    return this.eq(value);
  }
  neq(value) {
    return !this.eq(value);
  }
  notEquals(value) {
    return this.neq(value);
  }
  lt(value) {
    return this.cmp(value) === -1;
  }
  lte(value) {
    return !this.gt(value);
  }
  gt(value) {
    return this.cmp(value) === 1;
  }
  gte(value) {
    return !this.lt(value);
  }
  max(value) {
    const decimal = Decimal.fromValue_noAlloc(value);
    return this.lt(decimal) ? decimal : this;
  }
  min(value) {
    const decimal = Decimal.fromValue_noAlloc(value);
    return this.gt(decimal) ? decimal : this;
  }
  maxabs(value) {
    const decimal = Decimal.fromValue_noAlloc(value);
    return this.cmpabs(decimal) < 0 ? decimal : this;
  }
  minabs(value) {
    const decimal = Decimal.fromValue_noAlloc(value);
    return this.cmpabs(decimal) > 0 ? decimal : this;
  }
  clamp(min, max) {
    return this.max(min).min(max);
  }
  clampMin(min) {
    return this.max(min);
  }
  clampMax(max) {
    return this.min(max);
  }
  cmp_tolerance(value, tolerance) {
    const decimal = Decimal.fromValue_noAlloc(value);
    return this.eq_tolerance(decimal, tolerance) ? 0 : this.cmp(decimal);
  }
  compare_tolerance(value, tolerance) {
    return this.cmp_tolerance(value, tolerance);
  }
  /**
  * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
  * For example, if you put in 1e-9, then any number closer to the
  * larger number than (larger number)*1e-9 will be considered equal.
  */
  eq_tolerance(value, tolerance) {
    const decimal = Decimal.fromValue_noAlloc(value);
    if (tolerance == null) {
      tolerance = 1e-7;
    }
    if (this.sign !== decimal.sign) {
      return false;
    }
    if (Math.abs(this.layer - decimal.layer) > 1) {
      return false;
    }
    let magA = this.mag;
    let magB = decimal.mag;
    if (this.layer > decimal.layer) {
      magB = f_maglog10(magB);
    }
    if (this.layer < decimal.layer) {
      magA = f_maglog10(magA);
    }
    return Math.abs(magA - magB) <= tolerance * Math.max(Math.abs(magA), Math.abs(magB));
  }
  equals_tolerance(value, tolerance) {
    return this.eq_tolerance(value, tolerance);
  }
  neq_tolerance(value, tolerance) {
    return !this.eq_tolerance(value, tolerance);
  }
  notEquals_tolerance(value, tolerance) {
    return this.neq_tolerance(value, tolerance);
  }
  lt_tolerance(value, tolerance) {
    const decimal = Decimal.fromValue_noAlloc(value);
    return !this.eq_tolerance(decimal, tolerance) && this.lt(decimal);
  }
  lte_tolerance(value, tolerance) {
    const decimal = Decimal.fromValue_noAlloc(value);
    return this.eq_tolerance(decimal, tolerance) || this.lt(decimal);
  }
  gt_tolerance(value, tolerance) {
    const decimal = Decimal.fromValue_noAlloc(value);
    return !this.eq_tolerance(decimal, tolerance) && this.gt(decimal);
  }
  gte_tolerance(value, tolerance) {
    const decimal = Decimal.fromValue_noAlloc(value);
    return this.eq_tolerance(decimal, tolerance) || this.gt(decimal);
  }
  pLog10() {
    if (this.lt(Decimal.dZero)) {
      return Decimal.dZero;
    }
    return this.log10();
  }
  absLog10() {
    if (this.sign === 0) {
      return Decimal.dNaN;
    } else if (this.layer > 0) {
      return Decimal.fromComponents(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
    } else {
      return Decimal.fromComponents(1, 0, Math.log10(this.mag));
    }
  }
  log10() {
    if (this.sign <= 0) {
      return Decimal.dNaN;
    } else if (this.layer > 0) {
      return Decimal.fromComponents(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
    } else {
      return Decimal.fromComponents(this.sign, 0, Math.log10(this.mag));
    }
  }
  log(base) {
    base = Decimal.fromValue_noAlloc(base);
    if (this.sign <= 0) {
      return Decimal.dNaN;
    }
    if (base.sign <= 0) {
      return Decimal.dNaN;
    }
    if (base.sign === 1 && base.layer === 0 && base.mag === 1) {
      return Decimal.dNaN;
    } else if (this.layer === 0 && base.layer === 0) {
      return Decimal.fromComponents(this.sign, 0, Math.log(this.mag) / Math.log(base.mag));
    }
    return Decimal.div(this.log10(), base.log10());
  }
  log2() {
    if (this.sign <= 0) {
      return Decimal.dNaN;
    } else if (this.layer === 0) {
      return Decimal.fromComponents(this.sign, 0, Math.log2(this.mag));
    } else if (this.layer === 1) {
      return Decimal.fromComponents(Math.sign(this.mag), 0, Math.abs(this.mag) * 3.321928094887362);
    } else if (this.layer === 2) {
      return Decimal.fromComponents(Math.sign(this.mag), 1, Math.abs(this.mag) + 0.5213902276543247);
    } else {
      return Decimal.fromComponents(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
    }
  }
  ln() {
    if (this.sign <= 0) {
      return Decimal.dNaN;
    } else if (this.layer === 0) {
      return Decimal.fromComponents(this.sign, 0, Math.log(this.mag));
    } else if (this.layer === 1) {
      return Decimal.fromComponents(Math.sign(this.mag), 0, Math.abs(this.mag) * 2.302585092994046);
    } else if (this.layer === 2) {
      return Decimal.fromComponents(Math.sign(this.mag), 1, Math.abs(this.mag) + 0.36221568869946325);
    } else {
      return Decimal.fromComponents(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
    }
  }
  logarithm(base) {
    return this.log(base);
  }
  pow(value) {
    const decimal = Decimal.fromValue_noAlloc(value);
    const a = this;
    const b = decimal;
    if (a.sign === 0) {
      return b.eq(0) ? Decimal.fromComponents_noNormalize(1, 0, 1) : a;
    }
    if (a.sign === 1 && a.layer === 0 && a.mag === 1) {
      return a;
    }
    if (b.sign === 0) {
      return Decimal.fromComponents_noNormalize(1, 0, 1);
    }
    if (b.sign === 1 && b.layer === 0 && b.mag === 1) {
      return a;
    }
    const result = a.absLog10().mul(b).pow10();
    if (this.sign === -1) {
      if (Math.abs(b.toNumber() % 2) % 2 === 1) {
        return result.neg();
      } else if (Math.abs(b.toNumber() % 2) % 2 === 0) {
        return result;
      }
      return Decimal.dNaN;
    }
    return result;
  }
  pow10() {
    if (!Number.isFinite(this.layer) || !Number.isFinite(this.mag)) {
      return Decimal.dNaN;
    }
    let a = this;
    if (a.layer === 0) {
      const newmag = Math.pow(10, a.sign * a.mag);
      if (Number.isFinite(newmag) && Math.abs(newmag) >= 0.1) {
        return Decimal.fromComponents(1, 0, newmag);
      } else if (a.sign === 0) {
        return Decimal.dOne;
      } else {
        a = Decimal.fromComponents_noNormalize(a.sign, a.layer + 1, Math.log10(a.mag));
      }
    }
    if (a.sign > 0 && a.mag >= 0) {
      return Decimal.fromComponents(a.sign, a.layer + 1, a.mag);
    }
    if (a.sign < 0 && a.mag >= 0) {
      return Decimal.fromComponents(-a.sign, a.layer + 1, -a.mag);
    }
    return Decimal.dOne;
  }
  pow_base(value) {
    return Decimal.fromValue_noAlloc(value).pow(this);
  }
  root(value) {
    const decimal = Decimal.fromValue_noAlloc(value);
    return this.pow(decimal.recip());
  }
  factorial() {
    if (this.mag < 0) {
      return this.add(1).gamma();
    } else if (this.layer === 0) {
      return this.add(1).gamma();
    } else if (this.layer === 1) {
      return Decimal.exp(Decimal.mul(this, Decimal.ln(this).sub(1)));
    } else {
      return Decimal.exp(this);
    }
  }
  // from HyperCalc source code
  gamma() {
    if (this.mag < 0) {
      return this.recip();
    } else if (this.layer === 0) {
      if (this.lt(Decimal.fromComponents_noNormalize(1, 0, 24))) {
        return Decimal.fromNumber(f_gamma(this.sign * this.mag));
      }
      const t = this.mag - 1;
      let l = 0.9189385332046727;
      l = l + (t + 0.5) * Math.log(t);
      l = l - t;
      const n2 = t * t;
      let np = t;
      let lm = 12 * np;
      let adj = 1 / lm;
      let l2 = l + adj;
      if (l2 === l) {
        return Decimal.exp(l);
      }
      l = l2;
      np = np * n2;
      lm = 360 * np;
      adj = 1 / lm;
      l2 = l - adj;
      if (l2 === l) {
        return Decimal.exp(l);
      }
      l = l2;
      np = np * n2;
      lm = 1260 * np;
      let lt = 1 / lm;
      l = l + lt;
      np = np * n2;
      lm = 1680 * np;
      lt = 1 / lm;
      l = l - lt;
      return Decimal.exp(l);
    } else if (this.layer === 1) {
      return Decimal.exp(Decimal.mul(this, Decimal.ln(this).sub(1)));
    } else {
      return Decimal.exp(this);
    }
  }
  lngamma() {
    return this.gamma().ln();
  }
  exp() {
    if (this.mag < 0) {
      return Decimal.dOne;
    }
    if (this.layer === 0 && this.mag <= 709.7) {
      return Decimal.fromNumber(Math.exp(this.sign * this.mag));
    } else if (this.layer === 0) {
      return Decimal.fromComponents(1, 1, this.sign * Math.log10(Math.E) * this.mag);
    } else if (this.layer === 1) {
      return Decimal.fromComponents(1, 2, this.sign * (Math.log10(0.4342944819032518) + this.mag));
    } else {
      return Decimal.fromComponents(1, this.layer + 1, this.sign * this.mag);
    }
  }
  sqr() {
    return this.pow(2);
  }
  sqrt() {
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.sqrt(this.sign * this.mag));
    } else if (this.layer === 1) {
      return Decimal.fromComponents(1, 2, Math.log10(this.mag) - 0.3010299956639812);
    } else {
      const result = Decimal.div(Decimal.fromComponents_noNormalize(this.sign, this.layer - 1, this.mag), Decimal.fromComponents_noNormalize(1, 0, 2));
      result.layer += 1;
      result.normalize();
      return result;
    }
  }
  cube() {
    return this.pow(3);
  }
  cbrt() {
    return this.pow(1 / 3);
  }
  // Tetration/tetrate: The result of exponentiating 'this' to 'this' 'height' times in a row.  https://en.wikipedia.org/wiki/Tetration
  // If payload != 1, then this is 'iterated exponentiation', the result of exping (payload) to base (this) (height) times. https://andydude.github.io/tetration/archives/tetration2/ident.html
  // Works with negative and positive real heights.
  tetrate(height = 2, payload = Decimal.fromComponents_noNormalize(1, 0, 1), linear = false) {
    if (height === 1) {
      return Decimal.pow(this, payload);
    }
    if (height === 0) {
      return new Decimal(payload);
    }
    if (this.eq(Decimal.dOne)) {
      return Decimal.dOne;
    }
    if (this.eq(-1)) {
      return Decimal.pow(this, payload);
    }
    if (height === Number.POSITIVE_INFINITY) {
      const this_num = this.toNumber();
      if (this_num <= 1.444667861009766 && this_num >= 0.06598803584531254) {
        if (this_num > 1.444667861009099) {
          return Decimal.fromNumber(Math.E);
        }
        const negln = Decimal.ln(this).neg();
        return negln.lambertw().div(negln);
      } else if (this_num > 1.444667861009766) {
        return Decimal.fromNumber(Number.POSITIVE_INFINITY);
      } else {
        return Decimal.dNaN;
      }
    }
    if (this.eq(Decimal.dZero)) {
      let result = Math.abs((height + 1) % 2);
      if (result > 1) {
        result = 2 - result;
      }
      return Decimal.fromNumber(result);
    }
    if (height < 0) {
      return Decimal.iteratedlog(payload, this, -height, linear);
    }
    payload = Decimal.fromValue_noAlloc(payload);
    const oldheight = height;
    height = Math.trunc(height);
    const fracheight = oldheight - height;
    if (this.gt(Decimal.dZero) && this.lte(1.444667861009766) && (oldheight > 1e4 || !linear)) {
      height = Math.min(1e4, height);
      for (let i = 0; i < height; ++i) {
        const old_payload = payload;
        payload = this.pow(payload);
        if (old_payload.eq(payload)) {
          return payload;
        }
      }
      if (fracheight != 0 || oldheight > 1e4) {
        const next_payload = this.pow(payload);
        if (oldheight <= 1e4 || Math.ceil(oldheight) % 2 == 0) {
          return payload.mul(1 - fracheight).add(next_payload.mul(fracheight));
        } else {
          return payload.mul(fracheight).add(next_payload.mul(1 - fracheight));
        }
      }
      return payload;
    }
    if (fracheight !== 0) {
      if (payload.eq(Decimal.dOne)) {
        if (this.gt(10) || linear) {
          payload = this.pow(fracheight);
        } else {
          payload = Decimal.fromNumber(Decimal.tetrate_critical(this.toNumber(), fracheight));
          if (this.lt(2)) {
            payload = payload.sub(1).mul(this.minus(1)).plus(1);
          }
        }
      } else {
        if (this.eq(10)) {
          payload = payload.layeradd10(fracheight, linear);
        } else {
          payload = payload.layeradd(fracheight, this, linear);
        }
      }
    }
    for (let i = 0; i < height; ++i) {
      payload = this.pow(payload);
      if (!isFinite(payload.layer) || !isFinite(payload.mag)) {
        return payload.normalize();
      }
      if (payload.layer - this.layer > 3) {
        return Decimal.fromComponents_noNormalize(payload.sign, payload.layer + (height - i - 1), payload.mag);
      }
      if (i > 1e4) {
        return payload;
      }
    }
    return payload;
  }
  // iteratedexp/iterated exponentiation: - all cases handled in tetrate, so just call it
  iteratedexp(height = 2, payload = Decimal.fromComponents_noNormalize(1, 0, 1), linear = false) {
    return this.tetrate(height, payload, linear);
  }
  // iterated log/repeated log: The result of applying log(base) 'times' times in a row. Approximately equal to subtracting (times) from the number's slog representation. Equivalent to tetrating to a negative height.
  // Works with negative and positive real heights.
  iteratedlog(base = 10, times = 1, linear = false) {
    if (times < 0) {
      return Decimal.tetrate(base, -times, this, linear);
    }
    base = Decimal.fromValue_noAlloc(base);
    let result = Decimal.fromDecimal(this);
    const fulltimes = times;
    times = Math.trunc(times);
    const fraction = fulltimes - times;
    if (result.layer - base.layer > 3) {
      const layerloss = Math.min(times, result.layer - base.layer - 3);
      times -= layerloss;
      result.layer -= layerloss;
    }
    for (let i = 0; i < times; ++i) {
      result = result.log(base);
      if (!isFinite(result.layer) || !isFinite(result.mag)) {
        return result.normalize();
      }
      if (i > 1e4) {
        return result;
      }
    }
    if (fraction > 0 && fraction < 1) {
      if (base.eq(10)) {
        result = result.layeradd10(-fraction, linear);
      } else {
        result = result.layeradd(-fraction, base, linear);
      }
    }
    return result;
  }
  // Super-logarithm, one of tetration's inverses, tells you what size power tower you'd have to tetrate base to to get number. By definition, will never be higher than 1.8e308 in break_eternity.js, since a power tower 1.8e308 numbers tall is the largest representable number.
  // https://en.wikipedia.org/wiki/Super-logarithm
  // NEW: Accept a number of iterations, and use binary search to, after making an initial guess, hone in on the true value, assuming tetration as the ground truth.
  slog(base = 10, iterations = 100, linear = false) {
    let step_size = 1e-3;
    let has_changed_directions_once = false;
    let previously_rose = false;
    let result = this.slog_internal(base, linear).toNumber();
    for (let i = 1; i < iterations; ++i) {
      const new_decimal = new Decimal(base).tetrate(result, Decimal.dOne, linear);
      const currently_rose = new_decimal.gt(this);
      if (i > 1) {
        if (previously_rose != currently_rose) {
          has_changed_directions_once = true;
        }
      }
      previously_rose = currently_rose;
      if (has_changed_directions_once) {
        step_size /= 2;
      } else {
        step_size *= 2;
      }
      step_size = Math.abs(step_size) * (currently_rose ? -1 : 1);
      result += step_size;
      if (step_size === 0) {
        break;
      }
    }
    return Decimal.fromNumber(result);
  }
  slog_internal(base = 10, linear = false) {
    base = Decimal.fromValue_noAlloc(base);
    if (base.lte(Decimal.dZero)) {
      return Decimal.dNaN;
    }
    if (base.eq(Decimal.dOne)) {
      return Decimal.dNaN;
    }
    if (base.lt(Decimal.dOne)) {
      if (this.eq(Decimal.dOne)) {
        return Decimal.dZero;
      }
      if (this.eq(Decimal.dZero)) {
        return Decimal.dNegOne;
      }
      return Decimal.dNaN;
    }
    if (this.mag < 0 || this.eq(Decimal.dZero)) {
      return Decimal.dNegOne;
    }
    let result = 0;
    let copy = Decimal.fromDecimal(this);
    if (copy.layer - base.layer > 3) {
      const layerloss = copy.layer - base.layer - 3;
      result += layerloss;
      copy.layer -= layerloss;
    }
    for (let i = 0; i < 100; ++i) {
      if (copy.lt(Decimal.dZero)) {
        copy = Decimal.pow(base, copy);
        result -= 1;
      } else if (copy.lte(Decimal.dOne)) {
        if (linear)
          return Decimal.fromNumber(result + copy.toNumber() - 1);
        else
          return Decimal.fromNumber(result + Decimal.slog_critical(base.toNumber(), copy.toNumber()));
      } else {
        result += 1;
        copy = Decimal.log(copy, base);
      }
    }
    return Decimal.fromNumber(result);
  }
  // background info and tables of values for critical functions taken here: https://github.com/Patashu/break_eternity.js/issues/22
  static slog_critical(base, height) {
    if (base > 10) {
      return height - 1;
    }
    return Decimal.critical_section(base, height, critical_slog_values);
  }
  static tetrate_critical(base, height) {
    return Decimal.critical_section(base, height, critical_tetr_values);
  }
  static critical_section(base, height, grid2, linear = false) {
    height *= 10;
    if (height < 0) {
      height = 0;
    }
    if (height > 10) {
      height = 10;
    }
    if (base < 2) {
      base = 2;
    }
    if (base > 10) {
      base = 10;
    }
    let lower = 0;
    let upper = 0;
    for (let i = 0; i < critical_headers.length; ++i) {
      if (critical_headers[i] == base) {
        lower = grid2[i][Math.floor(height)];
        upper = grid2[i][Math.ceil(height)];
        break;
      } else if (critical_headers[i] < base && critical_headers[i + 1] > base) {
        const basefrac = (base - critical_headers[i]) / (critical_headers[i + 1] - critical_headers[i]);
        lower = grid2[i][Math.floor(height)] * (1 - basefrac) + grid2[i + 1][Math.floor(height)] * basefrac;
        upper = grid2[i][Math.ceil(height)] * (1 - basefrac) + grid2[i + 1][Math.ceil(height)] * basefrac;
        break;
      }
    }
    const frac = height - Math.floor(height);
    if (lower <= 0 || upper <= 0) {
      return lower * (1 - frac) + upper * frac;
    } else {
      return Math.pow(base, Math.log(lower) / Math.log(base) * (1 - frac) + Math.log(upper) / Math.log(base) * frac);
    }
  }
  // Function for adding/removing layers from a Decimal, even fractional layers (e.g. its slog10 representation).
  // Moved this over to use the same critical section as tetrate/slog.
  layeradd10(diff, linear = false) {
    diff = Decimal.fromValue_noAlloc(diff).toNumber();
    const result = Decimal.fromDecimal(this);
    if (diff >= 1) {
      if (result.mag < 0 && result.layer > 0) {
        result.sign = 0;
        result.mag = 0;
        result.layer = 0;
      } else if (result.sign === -1 && result.layer == 0) {
        result.sign = 1;
        result.mag = -result.mag;
      }
      const layeradd = Math.trunc(diff);
      diff -= layeradd;
      result.layer += layeradd;
    }
    if (diff <= -1) {
      const layeradd = Math.trunc(diff);
      diff -= layeradd;
      result.layer += layeradd;
      if (result.layer < 0) {
        for (let i = 0; i < 100; ++i) {
          result.layer++;
          result.mag = Math.log10(result.mag);
          if (!isFinite(result.mag)) {
            if (result.sign === 0) {
              result.sign = 1;
            }
            if (result.layer < 0) {
              result.layer = 0;
            }
            return result.normalize();
          }
          if (result.layer >= 0) {
            break;
          }
        }
      }
    }
    while (result.layer < 0) {
      result.layer++;
      result.mag = Math.log10(result.mag);
    }
    if (result.sign === 0) {
      result.sign = 1;
      if (result.mag === 0 && result.layer >= 1) {
        result.layer -= 1;
        result.mag = 1;
      }
    }
    result.normalize();
    if (diff !== 0) {
      return result.layeradd(diff, 10, linear);
    }
    return result;
  }
  // layeradd: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 'base' and iterated log base 'base'.
  layeradd(diff, base, linear = false) {
    const slogthis = this.slog(base).toNumber();
    const slogdest = slogthis + diff;
    if (slogdest >= 0) {
      return Decimal.tetrate(base, slogdest, Decimal.dOne, linear);
    } else if (!Number.isFinite(slogdest)) {
      return Decimal.dNaN;
    } else if (slogdest >= -1) {
      return Decimal.log(Decimal.tetrate(base, slogdest + 1, Decimal.dOne, linear), base);
    } else {
      return Decimal.log(Decimal.log(Decimal.tetrate(base, slogdest + 2, Decimal.dOne, linear), base), base);
    }
  }
  // The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
  // https://en.wikipedia.org/wiki/Lambert_W_function
  // Some special values, for testing: https://en.wikipedia.org/wiki/Lambert_W_function#Special_values
  lambertw() {
    if (this.lt(-0.3678794411710499)) {
      throw Error("lambertw is unimplemented for results less than -1, sorry!");
    } else if (this.mag < 0) {
      return Decimal.fromNumber(f_lambertw(this.toNumber()));
    } else if (this.layer === 0) {
      return Decimal.fromNumber(f_lambertw(this.sign * this.mag));
    } else if (this.layer === 1) {
      return d_lambertw(this);
    } else if (this.layer === 2) {
      return d_lambertw(this);
    }
    if (this.layer >= 3) {
      return Decimal.fromComponents_noNormalize(this.sign, this.layer - 1, this.mag);
    }
    throw "Unhandled behavior in lambertw()";
  }
  // The super square-root function - what number, tetrated to height 2, equals this?
  // Other sroots are possible to calculate probably through guess and check methods, this one is easy though.
  // https://en.wikipedia.org/wiki/Tetration#Super-root
  ssqrt() {
    if (this.sign == 1 && this.layer >= 3) {
      return Decimal.fromComponents_noNormalize(this.sign, this.layer - 1, this.mag);
    }
    const lnx = this.ln();
    return lnx.div(lnx.lambertw());
  }
  // Super-root, one of tetration's inverses - what number, tetrated to height (height), equals this?
  // Only works with the linear approximation, because I don't know the structure of non-linear tetrations for inputs < 1
  // TODO: Optimize this like how slog is optimized
  linear_sroot(degree) {
    if (degree == 1) {
      return this;
    }
    if (this.eq(Decimal.dInf)) {
      return Decimal.dInf;
    }
    if (!this.isFinite()) {
      return Decimal.dNaN;
    }
    if (degree == 2) {
      try {
        return this.ssqrt();
      } catch {
        return Decimal.dNaN;
      }
    }
    if (degree > 0 && degree < 1) {
      return this.root(degree);
    }
    if (degree > -2 && degree < -1) {
      return Decimal.fromNumber(degree).add(2).pow(this.recip());
    }
    if (degree <= 0) {
      return Decimal.dNaN;
    }
    if (degree == Number.POSITIVE_INFINITY) {
      const this_num = this.toNumber();
      if (this_num < Math.E && this_num > _EXPN1) {
        return this.pow(this.recip());
      } else {
        return Decimal.dNaN;
      }
    }
    if (this.eq(1)) {
      return Decimal.dOne;
    }
    if (this.lt(0)) {
      return Decimal.dNaN;
    }
    if (this.lte("1ee-16")) {
      if (degree % 2 == 1)
        return this;
      else
        return Decimal.dNaN;
    }
    if (this.gt(1)) {
      let upperBound = Decimal.dTen;
      if (this.gte(Decimal.tetrate(10, degree, 1, true))) {
        upperBound = this.iteratedlog(10, degree - 1, true);
      }
      if (degree <= 1) {
        upperBound = this.root(degree);
      }
      let lower = Decimal.dZero;
      const layer = upperBound.layer;
      let upper = upperBound.iteratedlog(10, layer, true);
      let previous = upper;
      let guess = upper.div(2);
      let loopGoing = true;
      while (loopGoing) {
        guess = lower.add(upper).div(2);
        if (Decimal.iteratedexp(10, layer, guess, true).tetrate(degree, 1, true).gt(this))
          upper = guess;
        else
          lower = guess;
        if (guess.eq(previous))
          loopGoing = false;
        else
          previous = guess;
      }
      return Decimal.iteratedexp(10, layer, guess, true);
    } else {
      let stage = 1;
      let minimum = Decimal.fromComponents(1, 10, 1);
      let maximum = Decimal.fromComponents(1, 10, 1);
      let lower = Decimal.fromComponents(1, 10, 1);
      let upper = Decimal.fromComponents(1, 1, -16);
      let prevspan = Decimal.dZero;
      let difference = Decimal.fromComponents(1, 10, 1);
      let upperBound = upper.pow10().recip();
      let distance = Decimal.dZero;
      let prevPoint = upperBound;
      let nextPoint = upperBound;
      const evenDegree = Math.ceil(degree) % 2 == 0;
      let range = 0;
      let lastValid = Decimal.fromComponents(1, 10, 1);
      let infLoopDetector = false;
      let previousUpper = Decimal.dZero;
      let decreasingFound = false;
      while (stage < 4) {
        if (stage == 2) {
          if (evenDegree)
            break;
          else {
            lower = Decimal.fromComponents(1, 10, 1);
            upper = minimum;
            stage = 3;
            difference = Decimal.fromComponents(1, 10, 1);
            lastValid = Decimal.fromComponents(1, 10, 1);
          }
        }
        infLoopDetector = false;
        while (upper.neq(lower)) {
          previousUpper = upper;
          if (upper.pow10().recip().tetrate(degree, 1, true).eq(1) && upper.pow10().recip().lt(0.4)) {
            upperBound = upper.pow10().recip();
            prevPoint = upper.pow10().recip();
            nextPoint = upper.pow10().recip();
            distance = Decimal.dZero;
            range = -1;
            if (stage == 3)
              lastValid = upper;
          } else if (upper.pow10().recip().tetrate(degree, 1, true).eq(upper.pow10().recip()) && !evenDegree && upper.pow10().recip().lt(0.4)) {
            upperBound = upper.pow10().recip();
            prevPoint = upper.pow10().recip();
            nextPoint = upper.pow10().recip();
            distance = Decimal.dZero;
            range = 0;
          } else if (upper.pow10().recip().tetrate(degree, 1, true).eq(upper.pow10().recip().mul(2).tetrate(degree, 1, true))) {
            upperBound = upper.pow10().recip();
            prevPoint = Decimal.dZero;
            nextPoint = upperBound.mul(2);
            distance = upperBound;
            if (evenDegree)
              range = -1;
            else
              range = 0;
          } else {
            prevspan = upper.mul(12e-17);
            upperBound = upper.pow10().recip();
            prevPoint = upper.add(prevspan).pow10().recip();
            distance = upperBound.sub(prevPoint);
            nextPoint = upperBound.add(distance);
            while (prevPoint.tetrate(degree, 1, true).eq(upperBound.tetrate(degree, 1, true)) || nextPoint.tetrate(degree, 1, true).eq(upperBound.tetrate(degree, 1, true)) || prevPoint.gte(upperBound) || nextPoint.lte(upperBound)) {
              prevspan = prevspan.mul(2);
              prevPoint = upper.add(prevspan).pow10().recip();
              distance = upperBound.sub(prevPoint);
              nextPoint = upperBound.add(distance);
            }
            if (stage == 1 && (nextPoint.tetrate(degree, 1, true).gt(upperBound.tetrate(degree, 1, true)) && prevPoint.tetrate(degree, 1, true).gt(upperBound.tetrate(degree, 1, true))) || stage == 3 && (nextPoint.tetrate(degree, 1, true).lt(upperBound.tetrate(degree, 1, true)) && prevPoint.tetrate(degree, 1, true).lt(upperBound.tetrate(degree, 1, true)))) {
              lastValid = upper;
            }
            if (nextPoint.tetrate(degree, 1, true).lt(upperBound.tetrate(degree, 1, true))) {
              range = -1;
            } else if (evenDegree) {
              range = 1;
            } else if (stage == 3 && upper.gt_tolerance(minimum, 1e-8)) {
              range = 0;
            } else {
              while (prevPoint.tetrate(degree, 1, true).eq_tolerance(upperBound.tetrate(degree, 1, true), 1e-8) || nextPoint.tetrate(degree, 1, true).eq_tolerance(upperBound.tetrate(degree, 1, true), 1e-8) || prevPoint.gte(upperBound) || nextPoint.lte(upperBound)) {
                prevspan = prevspan.mul(2);
                prevPoint = upper.add(prevspan).pow10().recip();
                distance = upperBound.sub(prevPoint);
                nextPoint = upperBound.add(distance);
              }
              if (nextPoint.tetrate(degree, 1, true).sub(upperBound.tetrate(degree, 1, true)).lt(upperBound.tetrate(degree, 1, true).sub(prevPoint.tetrate(degree, 1, true)))) {
                range = 0;
              } else {
                range = 1;
              }
            }
          }
          if (range == -1)
            decreasingFound = true;
          if (stage == 1 && range == 1 || stage == 3 && range != 0) {
            if (lower.eq(Decimal.fromComponents(1, 10, 1))) {
              upper = upper.mul(2);
            } else {
              let cutOff = false;
              if (infLoopDetector && (range == 1 && stage == 1 || range == -1 && stage == 3))
                cutOff = true;
              upper = upper.add(lower).div(2);
              if (cutOff)
                break;
            }
          } else {
            if (lower.eq(Decimal.fromComponents(1, 10, 1))) {
              lower = upper;
              upper = upper.div(2);
            } else {
              let cutOff = false;
              if (infLoopDetector && (range == 1 && stage == 1 || range == -1 && stage == 3))
                cutOff = true;
              lower = lower.sub(difference);
              upper = upper.sub(difference);
              if (cutOff)
                break;
            }
          }
          if (lower.sub(upper).div(2).abs().gt(difference.mul(1.5)))
            infLoopDetector = true;
          difference = lower.sub(upper).div(2).abs();
          if (upper.gt("1e18"))
            break;
          if (upper.eq(previousUpper))
            break;
        }
        if (upper.gt("1e18"))
          break;
        if (!decreasingFound)
          break;
        if (lastValid == Decimal.fromComponents(1, 10, 1)) {
          break;
        }
        if (stage == 1)
          minimum = lastValid;
        else if (stage == 3)
          maximum = lastValid;
        stage++;
      }
      lower = minimum;
      upper = Decimal.fromComponents(1, 1, -18);
      let previous = upper;
      let guess = Decimal.dZero;
      let loopGoing = true;
      while (loopGoing) {
        if (lower.eq(Decimal.fromComponents(1, 10, 1)))
          guess = upper.mul(2);
        else
          guess = lower.add(upper).div(2);
        if (Decimal.pow(10, guess).recip().tetrate(degree, 1, true).gt(this))
          upper = guess;
        else
          lower = guess;
        if (guess.eq(previous))
          loopGoing = false;
        else
          previous = guess;
        if (upper.gt("1e18"))
          return Decimal.dNaN;
      }
      if (!guess.eq_tolerance(minimum, 1e-15)) {
        return guess.pow10().recip();
      } else {
        if (maximum.eq(Decimal.fromComponents(1, 10, 1))) {
          return Decimal.dNaN;
        }
        lower = Decimal.fromComponents(1, 10, 1);
        upper = maximum;
        previous = upper;
        guess = Decimal.dZero;
        loopGoing = true;
        while (loopGoing) {
          if (lower.eq(Decimal.fromComponents(1, 10, 1)))
            guess = upper.mul(2);
          else
            guess = lower.add(upper).div(2);
          if (Decimal.pow(10, guess).recip().tetrate(degree, 1, true).gt(this))
            upper = guess;
          else
            lower = guess;
          if (guess.eq(previous))
            loopGoing = false;
          else
            previous = guess;
          if (upper.gt("1e18"))
            return Decimal.dNaN;
        }
        return guess.pow10().recip();
      }
    }
  }
  // Pentation/pentate: The result of tetrating 'height' times in a row. An absurdly strong operator - Decimal.pentate(2, 4.28) and Decimal.pentate(10, 2.37) are already too huge for break_eternity.js!
  // https://en.wikipedia.org/wiki/Pentation
  pentate(height = 2, payload = Decimal.fromComponents_noNormalize(1, 0, 1), linear = false) {
    payload = Decimal.fromValue_noAlloc(payload);
    const oldheight = height;
    height = Math.trunc(height);
    const fracheight = oldheight - height;
    if (fracheight !== 0) {
      if (payload.eq(Decimal.dOne)) {
        ++height;
        payload = Decimal.fromNumber(fracheight);
      } else {
        if (this.eq(10)) {
          payload = payload.layeradd10(fracheight, linear);
        } else {
          payload = payload.layeradd(fracheight, this, linear);
        }
      }
    }
    for (let i = 0; i < height; ++i) {
      payload = this.tetrate(payload.toNumber(), Decimal.dOne, linear);
      if (!isFinite(payload.layer) || !isFinite(payload.mag)) {
        return payload.normalize();
      }
      if (i > 10) {
        return payload;
      }
    }
    return payload;
  }
  // trig functions!
  sin() {
    if (this.mag < 0) {
      return this;
    }
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.sin(this.sign * this.mag));
    }
    return Decimal.fromComponents_noNormalize(0, 0, 0);
  }
  cos() {
    if (this.mag < 0) {
      return Decimal.dOne;
    }
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.cos(this.sign * this.mag));
    }
    return Decimal.fromComponents_noNormalize(0, 0, 0);
  }
  tan() {
    if (this.mag < 0) {
      return this;
    }
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.tan(this.sign * this.mag));
    }
    return Decimal.fromComponents_noNormalize(0, 0, 0);
  }
  asin() {
    if (this.mag < 0) {
      return this;
    }
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.asin(this.sign * this.mag));
    }
    return Decimal.fromComponents_noNormalize(Number.NaN, Number.NaN, Number.NaN);
  }
  acos() {
    if (this.mag < 0) {
      return Decimal.fromNumber(Math.acos(this.toNumber()));
    }
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.acos(this.sign * this.mag));
    }
    return Decimal.fromComponents_noNormalize(Number.NaN, Number.NaN, Number.NaN);
  }
  atan() {
    if (this.mag < 0) {
      return this;
    }
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.atan(this.sign * this.mag));
    }
    return Decimal.fromNumber(Math.atan(this.sign * Infinity));
  }
  sinh() {
    return this.exp().sub(this.negate().exp()).div(2);
  }
  cosh() {
    return this.exp().add(this.negate().exp()).div(2);
  }
  tanh() {
    return this.sinh().div(this.cosh());
  }
  asinh() {
    return Decimal.ln(this.add(this.sqr().add(1).sqrt()));
  }
  acosh() {
    return Decimal.ln(this.add(this.sqr().sub(1).sqrt()));
  }
  atanh() {
    if (this.abs().gte(1)) {
      return Decimal.fromComponents_noNormalize(Number.NaN, Number.NaN, Number.NaN);
    }
    return Decimal.ln(this.add(1).div(Decimal.fromNumber(1).sub(this))).div(2);
  }
  /**
   * Joke function from Realm Grinder
   */
  ascensionPenalty(ascensions) {
    if (ascensions === 0) {
      return this;
    }
    return this.root(Decimal.pow(10, ascensions));
  }
  /**
   * Joke function from Cookie Clicker. It's 'egg'
   */
  egg() {
    return this.add(9);
  }
  lessThanOrEqualTo(other) {
    return this.cmp(other) < 1;
  }
  lessThan(other) {
    return this.cmp(other) < 0;
  }
  greaterThanOrEqualTo(other) {
    return this.cmp(other) > -1;
  }
  greaterThan(other) {
    return this.cmp(other) > 0;
  }
  // return Decimal;
  /* BEGIN MOD */
  /**
   * Smoothly interpolates between the current value and the target value over time
   * using a smoothing factor and deltaTime.
   *
   * @param {Decimal} current - The current value to interpolate from.
   * @param {Decimal} target - The target value to interpolate towards.
   * @param {Decimal} smoothing - The smoothing factor controlling the interpolation speed.
   *                           A higher value results in slower interpolation.
   * @param {Decimal} deltaTime - The time elapsed since the last frame in seconds.
   * @returns {Decimal} - The interpolated value between `current` and `target`.
   */
  static smoothDamp(current, target, smoothing, deltaTime) {
    return new Decimal(current).add(new Decimal(target).minus(new Decimal(current)).times(new Decimal(smoothing)).times(new Decimal(deltaTime)));
  }
  /**
   * Creates a clone of the E instance.
   * @deprecated
   * @returns {Decimal} A EClone instance that is a clone of the original.
   */
  clone() {
    return this;
  }
  /**
   * Creates a clone of the E instance. Helps with a webpack(?) bug
   * @alias Decimal.normalizeFromComponents
   * @param x - The number to clone
   * @returns - The cloned number
   */
  static clone(x) {
    return Decimal.fromComponents(x.sign, x.layer, x.mag);
  }
  /**
   * Performs modular arithmetic on the DecimalClone instance.
   * @alias modular
   * @alias modulo
   * @param {DecimalSource} other - The number or DecimalClone instance to use for modular arithmetic.
   * @returns {Decimal} A EClone instance representing the result of the modular operation.
   */
  // Taken from OmegaNum.js, with a couple touch-ups
  // "Truncated division" modulo, like JavaScript's %
  mod(value) {
    const decimal = Decimal.fromValue_noAlloc(value).abs();
    if (decimal.eq(Decimal.dZero))
      return Decimal.dZero;
    const num_this = this.toNumber();
    const num_decimal = decimal.toNumber();
    if (isFinite(num_this) && isFinite(num_decimal) && num_this != 0 && num_decimal != 0) {
      return new Decimal(num_this % num_decimal);
    }
    if (this.sub(decimal).eq(this)) {
      return Decimal.dZero;
    }
    if (decimal.sub(this).eq(decimal)) {
      return this;
    }
    if (this.sign == -1)
      return this.abs().mod(decimal).neg();
    return this.sub(this.div(decimal).floor().mul(decimal));
  }
  modulo(value) {
    return this.mod(value);
  }
  modular(value) {
    return this.mod(value);
  }
  /**
  * Applies a soft cap to a DecimalClone value using a specified soft cap function.
  *
  * @param {DecimalSource} start - The value at which the soft cap starts.
  * @param {number} power - The power or factor used in the soft cap calculation.
  * @param {string} mode - The soft cap mode. Use "pow" for power soft cap, "mul" for multiplication soft cap,
  *                       or "exp" for exponential soft cap.
  * @returns {Decimal} - The DecimalClone value after applying the soft cap.
  */
  softcap(start, power, mode) {
    let x = this.clone();
    if (x.gte(start)) {
      if ([0, "pow"].includes(mode))
        x = x.div(start).pow(power).mul(start);
      if ([1, "mul"].includes(mode))
        x = x.sub(start).div(power).add(start);
    }
    return x;
  }
  static softcap(value, start, power, mode) {
    return new Decimal(value).softcap(start, power, mode);
  }
  /**
  * Scales a currency value using a specified scaling function.
  *
  * @param {DecimalSource} s - The value at which scaling starts.
  * @param {DecimalSource} p - The scaling factor.
  * @param {string} mode - The scaling mode. Use "pow" for power scaling or "exp" for exponential scaling.
  * @param {boolean} [rev=false] - Whether to reverse the scaling operation (unscaling).
  * @returns {Decimal} - The scaled currency value.
  */
  scale(s, p, mode, rev = false) {
    s = new Decimal(s);
    p = new Decimal(p);
    let x = this.clone();
    if (x.gte(s)) {
      if ([0, "pow"].includes(mode))
        x = rev ? x.mul(s.pow(p.sub(1))).root(p) : x.pow(p).div(s.pow(p.sub(1)));
      if ([1, "exp"].includes(mode))
        x = rev ? x.div(s).max(1).log(p).add(s) : Decimal.pow(p, x.sub(s)).mul(s);
    }
    return x;
  }
  static scale(value, s, p, mode, rev = false) {
    return new Decimal(value).scale(s, p, mode, rev);
  }
  /**
   * Formats the E instance with a specified accuracy and maximum decimal places.
   * @param {number} [acc=2] - The desired accuracy (number of significant figures), defaults to `2`.
   * @param {number} [max=9] - The maximum number of decimal places to display, defaults to `9`.
   * @param {string} [type="mixed_sc"] - The type of format, defaults to `"mixed_sc"`.
   * @returns {string} A string representing the formatted E value.
   */
  format(acc = 2, max = 9, type = "mixed_sc") {
    return formats.format(this.clone(), acc, max, type);
  }
  /**
   * Formats the E instance with a specified accuracy and maximum decimal places.
   * @param {DecimalSource} e - The E instance to format.
   * @param {number} [acc=2] - The desired accuracy (number of significant figures), defaults to `2`.
   * @param {number} [max=9] - The maximum number of decimal places to display, defaults to `9`.
   * @param {string} [type="mixed_sc"] - The type of format, defaults to `"mixed_sc"`.
   * @returns {string} A string representing the formatted E value.
   */
  static format(e, acc = 2, max = 9, type = "mixed_sc") {
    return formats.format(new Decimal(e), acc, max, type);
  }
  /**
   * Formats the E instance in standard leter notation with a specified accuracy and maximum decimal places.
   * @param {number} [acc=2] - The desired accuracy (number of significant figures).
   * @param {number} [max=9] - The maximum number of decimal places to display.
   * @param {string} [type="st"] - The type of format (default standard)
   * @returns {string} A string representing the formatted E value.
   */
  formatST(acc = 2, max = 9, type = "st") {
    return formats.format(this.clone(), acc, max, type);
  }
  static formatST(value, acc = 2, max = 9, type = "st") {
    return formats.format(new Decimal(value), acc, max, type);
  }
  /**
   * Formats the gain rate using the E instance.
   * @param {DecimalSource} gain - The gain value to compare
   * @param {boolean} [mass=false] - Indicates whether the gain represents a mass value.
   * @param {string} [type="mixed_sc"] - The type of format (default mixed scientific)
   * @returns {string} A string representing the formatted gain
   *
   * @example
   * const currency = new Decimal(100);
   * const currencyGain = new Decimal(12);
   * const formatted = currency.formats.formatGain(currencyGain);
   * console.log(formatted); // should return "(+12/sec)"
   */
  formatGain(gain, type = "mixed_sc") {
    return formats.formatGain(this.clone(), gain, type);
  }
  static formatGain(value, gain, type = "mixed_sc") {
    return formats.formatGain(new Decimal(value), gain, type);
  }
  /**
   * Converts the E instance to a Roman numeral representation.
   * @param {number|Decimal} [max=5000] - Max before it returns the original
   * @returns {string|Decimal} A string representing the Roman numeral equivalent of the E value,
   * or the original E instance if it is greater than or equal to 5000 or less than 1.
   */
  toRoman(max = 5e3) {
    max = new Decimal(max);
    const num = this.clone();
    if (num.gte(max) || num.lt(1))
      return num;
    let newNum = num.toNumber();
    const roman = {
      M: 1e3,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };
    let str = "";
    for (let i of Object.keys(roman)) {
      let q = Math.floor(newNum / roman[i]);
      newNum -= q * roman[i];
      str += i.repeat(q);
    }
    return str;
  }
  static toRoman(value, max) {
    return new Decimal(value).toRoman(max);
  }
};
Decimal.dZero = Decimal.fromComponents_noNormalize(0, 0, 0);
Decimal.dOne = Decimal.fromComponents_noNormalize(1, 0, 1);
Decimal.dNegOne = Decimal.fromComponents_noNormalize(-1, 0, 1);
Decimal.dTwo = Decimal.fromComponents_noNormalize(1, 0, 2);
Decimal.dTen = Decimal.fromComponents_noNormalize(1, 0, 10);
Decimal.dNaN = Decimal.fromComponents_noNormalize(Number.NaN, Number.NaN, Number.NaN);
Decimal.dInf = Decimal.fromComponents_noNormalize(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
Decimal.dNegInf = Decimal.fromComponents_noNormalize(-1, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
Decimal.dNumberMax = Decimal.fromComponents(1, 0, Number.MAX_VALUE);
Decimal.dNumberMin = Decimal.fromComponents(1, 0, Number.MIN_VALUE);
Decimal.fromStringCache = new LRUCache(DEFAULT_FROM_STRING_CACHE_SIZE);
__decorateClass([
  Expose()
], Decimal.prototype, "sign", 2);
__decorateClass([
  Expose()
], Decimal.prototype, "mag", 2);
__decorateClass([
  Expose()
], Decimal.prototype, "layer", 2);
Decimal = __decorateClass([
  Exclude()
], Decimal);
var ST_NAMES = [
  [
    // Tier 1 (0-1e3000)
    ["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"],
    ["", "Dc", "Vg", "Tg", "Qag", "Qtg", "Sxg", "Spg", "Ocg", "Nog"],
    ["", "Ce", "De", "Te", "Qae", "Qte", "Sxe", "Spe", "Oce", "Noe"]
  ],
  [
    // Higher tiers
    ["", "Mi", "Mc", "Na", "Pc", "Fm", "At", "Zp", "Yc", "Xn"],
    ["", "Me", "Du", "Tr", "Te", "Pe", "He", "Hp", "Ot", "En"],
    ["", "c", "Ic", "TCn", "TeC", "PCn", "HCn", "HpC", "OCn", "ECn"],
    ["", "Hc", "DHe", "THt", "TeH", "PHc", "HHe", "HpH", "OHt", "EHc"]
  ]
];
var FormatTypeList = ["st", "sc", "scientific", "omega", "omega_short", "elemental", "old_sc", "eng", "mixed_sc", "layer", "standard", "inf"];
var FORMATS = {
  /** Omega format */
  omega: {
    config: {
      greek: "\u03B2\u03B6\u03BB\u03C8\u03A3\u0398\u03A8\u03C9",
      infinity: "\u03A9"
    },
    /**
     * Format the value into omega format
     * @param value - The value to format
     * @returns - The formatted value
     */
    format(value) {
      value = new Decimal(value);
      const step = Decimal.floor(value.div(1e3));
      const omegaAmount = Decimal.floor(step.div(FORMATS.omega.config.greek.length));
      let lastLetter = FORMATS.omega.config.greek[step.toNumber() % FORMATS.omega.config.greek.length] + toSubscript(value.toNumber() % 1e3);
      const beyondGreekArrayBounds = FORMATS.omega.config.greek[step.toNumber() % FORMATS.omega.config.greek.length] === void 0;
      if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
        lastLetter = "\u03C9";
      }
      const omegaOrder = Decimal.log(value, 8e3).toNumber();
      if (omegaAmount.equals(0)) {
        return lastLetter;
      } else if (omegaAmount.gt(0) && omegaAmount.lte(3)) {
        const omegas = [];
        for (let i = 0; i < omegaAmount.toNumber(); i++) {
          omegas.push("\u03C9");
        }
        return `${omegas.join("^")}^${lastLetter}`;
      } else if (omegaAmount.gt(3) && omegaAmount.lt(10)) {
        return `\u03C9(${omegaAmount.toFixed(0)})^${lastLetter}`;
      } else if (omegaOrder < 3) {
        return `\u03C9(${FORMATS.omega.format(omegaAmount)})^${lastLetter}`;
      } else if (omegaOrder < 6) {
        return `\u03C9(${FORMATS.omega.format(omegaAmount)})`;
      }
      const val = Decimal.pow(8e3, omegaOrder % 1);
      const orderStr = omegaOrder < 100 ? Math.floor(omegaOrder).toFixed(0) : FORMATS.omega.format(Decimal.floor(omegaOrder));
      return `\u03C9[${orderStr}](${FORMATS.omega.format(val)})`;
    }
  },
  /** Short omega format */
  omega_short: {
    config: {
      greek: "\u03B2\u03B6\u03BB\u03C8\u03A3\u0398\u03A8\u03C9",
      infinity: "\u03A9"
    },
    /**
     * Format the value into short omega format
     * @param value - The value to format
     * @returns - The formatted value
     */
    format(value) {
      value = new Decimal(value);
      const step = Decimal.floor(value.div(1e3));
      const omegaAmount = Decimal.floor(step.div(FORMATS.omega_short.config.greek.length));
      let lastLetter = FORMATS.omega_short.config.greek[step.toNumber() % FORMATS.omega_short.config.greek.length] + toSubscript(value.toNumber() % 1e3);
      const beyondGreekArrayBounds = FORMATS.omega_short.config.greek[step.toNumber() % FORMATS.omega_short.config.greek.length] === void 0;
      if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
        lastLetter = "\u03C9";
      }
      const omegaOrder = Decimal.log(value, 8e3).toNumber();
      if (omegaAmount.equals(0)) {
        return lastLetter;
      } else if (omegaAmount.gt(0) && omegaAmount.lte(2)) {
        const omegas = [];
        for (let i = 0; i < omegaAmount.toNumber(); i++) {
          omegas.push("\u03C9");
        }
        return `${omegas.join("^")}^${lastLetter}`;
      } else if (omegaAmount.gt(2) && omegaAmount.lt(10)) {
        return `\u03C9(${omegaAmount.toFixed(0)})^${lastLetter}`;
      }
      const val = Decimal.pow(8e3, omegaOrder % 1);
      const orderStr = omegaOrder < 100 ? Math.floor(omegaOrder).toFixed(0) : FORMATS.omega_short.format(Decimal.floor(omegaOrder));
      return `\u03C9[${orderStr}](${FORMATS.omega_short.format(val)})`;
    }
  },
  elemental: {
    config: {
      /** The list of elements */
      element_lists: [
        ["H"],
        ["He", "Li", "Be", "B", "C", "N", "O", "F"],
        ["Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl"],
        [
          "Ar",
          "K",
          "Ca",
          "Sc",
          "Ti",
          "V",
          "Cr",
          "Mn",
          "Fe",
          "Co",
          "Ni",
          "Cu",
          "Zn",
          "Ga",
          "Ge",
          "As",
          "Se",
          "Br"
        ],
        [
          "Kr",
          "Rb",
          "Sr",
          "Y",
          "Zr",
          "Nb",
          "Mo",
          "Tc",
          "Ru",
          "Rh",
          "Pd",
          "Ag",
          "Cd",
          "In",
          "Sn",
          "Sb",
          "Te",
          "I"
        ],
        [
          "Xe",
          "Cs",
          "Ba",
          "La",
          "Ce",
          "Pr",
          "Nd",
          "Pm",
          "Sm",
          "Eu",
          "Gd",
          "Tb",
          "Dy",
          "Ho",
          "Er",
          "Tm",
          "Yb",
          "Lu",
          "Hf",
          "Ta",
          "W",
          "Re",
          "Os",
          "Ir",
          "Pt",
          "Au",
          "Hg",
          "Tl",
          "Pb",
          "Bi",
          "Po",
          "At"
        ],
        [
          "Rn",
          "Fr",
          "Ra",
          "Ac",
          "Th",
          "Pa",
          "U",
          "Np",
          "Pu",
          "Am",
          "Cm",
          "Bk",
          "Cf",
          "Es",
          "Fm",
          "Md",
          "No",
          "Lr",
          "Rf",
          "Db",
          "Sg",
          "Bh",
          "Hs",
          "Mt",
          "Ds",
          "Rg",
          "Cn",
          "Nh",
          "Fl",
          "Mc",
          "Lv",
          "Ts"
        ],
        ["Og"]
      ]
    },
    getOffset(group) {
      if (group == 1)
        return 1;
      const n = Math.floor(group / 2);
      let r = 2 * n * (n + 1) * (2 * n + 1) / 3 - 2;
      if (group % 2 == 1)
        r += 2 * Math.pow(n + 1, 2);
      return r;
    },
    getAbbreviation(group, progress) {
      const length = FORMATS.elemental.abbreviationLength(group);
      const elemRel = Math.floor(length * progress);
      const elem = elemRel + FORMATS.elemental.getOffset(group);
      return elem > 118 ? FORMATS.elemental.beyondOg(elem) : FORMATS.elemental.config.element_lists[group - 1][elemRel];
    },
    beyondOg(x) {
      const log = Math.floor(Math.log10(x));
      const list = ["n", "u", "b", "t", "q", "p", "h", "s", "o", "e"];
      let r = "";
      for (let i = log; i >= 0; i--) {
        const n = Math.floor(x / Math.pow(10, i)) % 10;
        if (r == "")
          r = list[n].toUpperCase();
        else
          r += list[n];
      }
      return r;
    },
    abbreviationLength(group) {
      return group == 1 ? 1 : Math.pow(Math.floor(group / 2) + 1, 2) * 2;
    },
    getAbbreviationAndValue(x) {
      const abbreviationListUnfloored = x.log(118).toNumber();
      const abbreviationListIndex = Math.floor(abbreviationListUnfloored) + 1;
      const abbreviationLength = FORMATS.elemental.abbreviationLength(abbreviationListIndex);
      const abbreviationProgress = abbreviationListUnfloored - abbreviationListIndex + 1;
      const abbreviationIndex = Math.floor(abbreviationProgress * abbreviationLength);
      const abbreviation = FORMATS.elemental.getAbbreviation(abbreviationListIndex, abbreviationProgress);
      const value = new Decimal(118).pow(abbreviationListIndex + abbreviationIndex / abbreviationLength - 1);
      return [abbreviation, value];
    },
    formatElementalPart(abbreviation, n) {
      if (n.eq(1)) {
        return abbreviation;
      }
      return `${n} ${abbreviation}`;
    },
    format(value, acc) {
      if (value.gt(new Decimal(118).pow(new Decimal(118).pow(new Decimal(118).pow(4)))))
        return "e" + FORMATS.elemental.format(value.log10(), acc);
      let log = value.log(118);
      const slog = log.log(118);
      const sslog = slog.log(118).toNumber();
      const max = Math.max(4 - sslog * 2, 1);
      const parts = [];
      while (log.gte(1) && parts.length < max) {
        const [abbreviation, value2] = FORMATS.elemental.getAbbreviationAndValue(log);
        const n = log.div(value2).floor();
        log = log.sub(n.mul(value2));
        parts.unshift([abbreviation, n]);
      }
      if (parts.length >= max) {
        return parts.map((x) => FORMATS.elemental.formatElementalPart(x[0], x[1])).join(" + ");
      }
      const formattedMantissa = new Decimal(118).pow(log).toFixed(parts.length === 1 ? 3 : acc);
      if (parts.length === 0) {
        return formattedMantissa;
      }
      if (parts.length === 1) {
        return `${formattedMantissa} \xD7 ${FORMATS.elemental.formatElementalPart(parts[0][0], parts[0][1])}`;
      }
      return `${formattedMantissa} \xD7 (${parts.map((x) => FORMATS.elemental.formatElementalPart(x[0], x[1])).join(" + ")})`;
    }
  },
  /** Old scientific format */
  old_sc: {
    /**
     * Format the value into old scientific format
     * @param ex - The value to format
     * @param acc - The accuracy
     * @returns - The formatted value
     */
    format(ex, acc) {
      ex = new Decimal(ex);
      const e = ex.log10().floor();
      if (e.lt(9)) {
        if (e.lt(3)) {
          return ex.toFixed(acc);
        }
        return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      } else {
        if (ex.gte("eeee10")) {
          const slog = ex.slog();
          return (slog.gte(1e9) ? "" : new Decimal(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + FORMATS.old_sc.format(slog.floor(), 0);
        }
        const m = ex.div(new Decimal(10).pow(e));
        return (e.log10().gte(9) ? "" : m.toFixed(4)) + "e" + FORMATS.old_sc.format(e, 0);
      }
    }
  },
  /** Engineering format */
  eng: {
    /**
     * Format the value into engineering format
     * @param ex - The value to format
     * @param acc - The accuracy
     * @returns - The formatted value
     * @example
     * console.log(FORMATS.eng.format(1e20, 2)); // 100.00e18
     */
    format(ex, acc) {
      ex = new Decimal(ex);
      const e = ex.log10().floor();
      if (e.lt(9)) {
        if (e.lt(3)) {
          return ex.toFixed(acc);
        }
        return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      } else {
        if (ex.gte("eeee10")) {
          const slog = ex.slog();
          return (slog.gte(1e9) ? "" : new Decimal(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + FORMATS.eng.format(slog.floor(), 0);
        }
        const m = ex.div(new Decimal(1e3).pow(e.div(3).floor()));
        return (e.log10().gte(9) ? "" : m.toFixed(new Decimal(4).sub(e.sub(e.div(3).floor().mul(3))))) + "e" + FORMATS.eng.format(e.div(3).floor().mul(3), 0);
      }
    }
  },
  mixed_sc: {
    /**
     * Format the value into mixed scientific format (standard or scientific depending on the value)
     * @param ex - The value to format
     * @param acc - The accuracy
     * @param max - The maximum value
     * @returns - The formatted value
     * @example
     * console.log(FORMATS.mixed_sc.format(1e20, 2, 9)); // 100.00 Qt
     * console.log(FORMATS.mixed_sc.format(1e400, 2, 303)); // 1.00e400
     */
    format(ex, acc, max) {
      ex = new Decimal(ex);
      const e = ex.log10().floor();
      if (e.lt(303) && e.gte(max))
        return format(ex, acc, max, "st");
      else
        return format(ex, acc, max, "sc");
    }
  },
  layer: {
    layers: ["infinity", "eternity", "reality", "equality", "affinity", "celerity", "identity", "vitality", "immunity", "atrocity"],
    format(ex, acc, max) {
      ex = new Decimal(ex);
      const layer = ex.max(1).log10().max(1).log(INFINITY_NUM.log10()).floor();
      if (layer.lte(0))
        return format(ex, acc, max, "sc");
      ex = new Decimal(10).pow(ex.max(1).log10().div(INFINITY_NUM.log10().pow(layer)).sub(layer.gte(1) ? 1 : 0));
      const meta = layer.div(10).floor();
      const layer_id = layer.toNumber() % 10 - 1;
      return format(ex, Math.max(4, acc), max, "sc") + " " + (meta.gte(1) ? "meta" + (meta.gte(2) ? "^" + format(meta, 0, max, "sc") : "") + "-" : "") + (isNaN(layer_id) ? "nanity" : FORMATS.layer.layers[layer_id]);
    }
  },
  /** Standard (letter abbv) format */
  standard: {
    /**
     * Gets the letter abbreviation for a number (e.g. 1 -> K) (0-1e3000)
     * @param x - The number to get the letter abbreviation for
     * @returns - The letter abbreviation
     */
    tier1(x) {
      return ST_NAMES[0][0][x % 10] + ST_NAMES[0][1][Math.floor(x / 10) % 10] + ST_NAMES[0][2][Math.floor(x / 100)];
    },
    /**
     * Gets the tier 2 letter abbreviation for a number (e.g. 1 -> Mi) (1e3000+)
     * @param x - The number to get the letter abbreviation for
     * @returns - The letter abbreviation
     */
    tier2(x) {
      const o = x % 10;
      const t = Math.floor(x / 10) % 10;
      const h = Math.floor(x / 100) % 10;
      let r = "";
      if (x < 10)
        return ST_NAMES[1][0][x];
      if (t == 1 && o == 0)
        r += "Vec";
      else
        r += ST_NAMES[1][1][o] + ST_NAMES[1][2][t];
      r += ST_NAMES[1][3][h];
      return r;
    }
  },
  inf: {
    format(ex, acc, max) {
      ex = new Decimal(ex);
      let meta = 0;
      const inf = new Decimal(Number.MAX_VALUE);
      const symbols = ["", "\u221E", "\u03A9", "\u03A8", "\u028A"];
      const symbols2 = ["", "", "m", "mm", "mmm"];
      while (ex.gte(inf)) {
        ex = ex.log(inf);
        meta++;
      }
      if (meta == 0)
        return format(ex, acc, max, "sc");
      if (ex.gte(3))
        return symbols2[meta] + symbols[meta] + "\u03C9^" + format(ex.sub(1), acc, max, "sc");
      if (ex.gte(2))
        return symbols2[meta] + "\u03C9" + symbols[meta] + "-" + format(inf.pow(ex.sub(2)), acc, max, "sc");
      return symbols2[meta] + symbols[meta] + "-" + format(inf.pow(ex.sub(1)), acc, max, "sc");
    }
  }
};
var INFINITY_NUM = new Decimal(2).pow(1024);
var SUBSCRIPT_NUMBERS = "\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089";
var SUPERSCRIPT_NUMBERS = "\u2070\xB9\xB2\xB3\u2074\u2075\u2076\u2077\u2078\u2079";
function toSubscript(value) {
  return value.toFixed(0).split("").map((x) => x === "-" ? "\u208B" : SUBSCRIPT_NUMBERS[parseInt(x, 10)]).join("");
}
function toSuperscript(value) {
  return value.toFixed(0).split("").map((x) => x === "-" ? "\u208B" : SUPERSCRIPT_NUMBERS[parseInt(x, 10)]).join("");
}
function formatST(ex, acc = 2, max = 9, type = "st") {
  return format(ex, acc, max, type);
}
function format(ex, acc = 2, max = 9, type = "mixed_sc") {
  ex = new Decimal(ex);
  const neg = ex.lt(0) ? "-" : "";
  if (ex.mag == Infinity)
    return neg + "Infinity";
  if (Number.isNaN(ex.mag))
    return neg + "NaN";
  if (ex.lt(0))
    ex = ex.mul(-1);
  if (ex.eq(0))
    return ex.toFixed(acc);
  const e = ex.log10().floor();
  switch (type) {
    case "sc":
    case "scientific":
      if (ex.log10().lt(Math.min(-acc, 0)) && acc > 1) {
        const e2 = ex.log10().ceil();
        const m = ex.div(e2.eq(-1) ? new Decimal(0.1) : new Decimal(10).pow(e2));
        const be = e2.mul(-1).max(1).log10().gte(9);
        return neg + (be ? "" : m.toFixed(2)) + "e" + format(e2, 0, max, "mixed_sc");
      } else if (e.lt(max)) {
        const a = Math.max(Math.min(acc - e.toNumber(), acc), 0);
        return neg + (a > 0 ? ex.toFixed(a) : ex.toFixed(a).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
      } else {
        if (ex.gte("eeee10")) {
          const slog = ex.slog();
          return (slog.gte(1e9) ? "" : new Decimal(10).pow(slog.sub(slog.floor())).toFixed(2)) + "F" + format(slog.floor(), 0);
        }
        const m = ex.div(new Decimal(10).pow(e));
        const be = e.log10().gte(9);
        return neg + (be ? "" : m.toFixed(2)) + "e" + format(e, 0, max, "mixed_sc");
      }
    case "st":
    case "standard": {
      let e3 = ex.log(1e3).floor();
      if (e3.lt(1)) {
        return neg + ex.toFixed(Math.max(Math.min(acc - e.toNumber(), acc), 0));
      } else {
        const e3_mul = e3.mul(3);
        const ee = e3.log10().floor();
        if (ee.gte(3e3))
          return "e" + format(e, acc, max, "st");
        let final = "";
        if (e3.lt(4))
          final = ["", "K", "M", "B"][Math.round(e3.toNumber())];
        else {
          let ee3 = Math.floor(e3.log(1e3).toNumber());
          if (ee3 < 100)
            ee3 = Math.max(ee3 - 1, 0);
          e3 = e3.sub(1).div(new Decimal(10).pow(ee3 * 3));
          while (e3.gt(0)) {
            const div1000 = e3.div(1e3).floor();
            const mod1000 = e3.sub(div1000.mul(1e3)).floor().toNumber();
            if (mod1000 > 0) {
              if (mod1000 == 1 && !ee3)
                final = "U";
              if (ee3)
                final = FORMATS.standard.tier2(ee3) + (final ? "-" + final : "");
              if (mod1000 > 1)
                final = FORMATS.standard.tier1(mod1000) + final;
            }
            e3 = div1000;
            ee3++;
          }
        }
        const m = ex.div(new Decimal(10).pow(e3_mul));
        return neg + (ee.gte(10) ? "" : m.toFixed(new Decimal(2).sub(e.sub(e3_mul)).add(1).toNumber()) + " ") + final;
      }
    }
    default:
      return neg + FORMATS[type].format(ex, acc, max);
  }
}
function formatGain(amt, gain, type = "mixed_sc") {
  amt = new Decimal(amt);
  gain = new Decimal(gain);
  const next = amt.add(gain);
  let rate;
  let ooms = next.div(amt);
  if (ooms.gte(10) && amt.gte(1e100)) {
    ooms = ooms.log10().mul(20);
    rate = "(+" + format(ooms, 2, 9, type) + " OoMs/sec)";
  } else
    rate = "(+" + format(gain, 2, 9, type) + "/sec)";
  return rate;
}
function formatTime(ex, acc = 2, type = "s") {
  ex = new Decimal(ex);
  if (ex.gte(86400))
    return format(ex.div(86400).floor(), 0, 12, "sc") + ":" + formatTime(ex.mod(86400), acc, "d");
  if (ex.gte(3600) || type == "d")
    return (ex.div(3600).gte(10) || type != "d" ? "" : "0") + format(ex.div(3600).floor(), 0, 12, "sc") + ":" + formatTime(ex.mod(3600), acc, "h");
  if (ex.gte(60) || type == "h")
    return (ex.div(60).gte(10) || type != "h" ? "" : "0") + format(ex.div(60).floor(), 0, 12, "sc") + ":" + formatTime(ex.mod(60), acc, "m");
  return (ex.gte(10) || type != "m" ? "" : "0") + format(ex, acc, 12, "sc");
}
function formatReduction(ex) {
  ex = new Decimal(ex);
  return format(new Decimal(1).sub(ex).mul(100)) + "%";
}
function formatPercent(ex) {
  ex = new Decimal(ex);
  return format(ex.mul(100)) + "%";
}
function formatMult(ex, acc = 2) {
  ex = new Decimal(ex);
  return ex.gte(1) ? "\xD7" + ex.format(acc) : "/" + ex.pow(-1).format(acc);
}
function expMult(a, b, base = 10) {
  return Decimal.gte(a, 10) ? Decimal.pow(base, Decimal.log(a, base).pow(b)) : new Decimal(a);
}
function metric(num, type) {
  num = new Decimal(num);
  const abb = ((abbM) => {
    return abbM.map((x, i) => {
      return {
        name: x.name,
        altName: x.altName,
        value: Decimal.pow(1e3, new Decimal(i).add(1))
      };
    });
  })([
    {
      name: "K",
      altName: "Kilo"
    },
    {
      name: "M",
      altName: "Mega"
    },
    {
      name: "G",
      altName: "Giga"
    },
    {
      name: "T",
      altName: "Tera"
    },
    {
      name: "P",
      altName: "Peta"
    },
    {
      name: "E",
      altName: "Exa"
    },
    {
      name: "Z",
      altName: "Zetta"
    },
    {
      name: "Y",
      altName: "Yotta"
    },
    {
      name: "R",
      altName: "Ronna"
    },
    {
      name: "Q",
      altName: "Quetta"
    }
  ]);
  let output = "";
  for (let i = 0; i < abb.length; i++) {
    if (num.greaterThanOrEqualTo(abb[i]["value"])) {
      if (i == abb.length - 1) {
        switch (type) {
          case 1:
            output = abb[i]["name"];
            break;
          case 2:
            output = `${num.divide(abb[i]["value"]).format()}`;
            break;
          case 3:
            output = abb[i]["altName"];
            break;
          case 0:
          default:
            output = `${num.divide(abb[i]["value"]).format()} ${abb[i]["name"]}`;
            break;
        }
      }
      continue;
    } else if (i == 0) {
      switch (type) {
        case 1:
          output = "";
          break;
        case 2:
        case 0:
        default:
          output = num.format();
          break;
      }
    } else {
      switch (type) {
        case 1:
          output = abb[i - 1]["name"];
          break;
        case 2:
          output = `${num.divide(abb[i - 1]["value"]).format()}`;
          break;
        case 3:
          output = abb[i - 1]["altName"];
          break;
        case 0:
        default:
          output = `${num.divide(abb[i - 1]["value"]).format()} ${abb[i - 1]["name"]}`;
          break;
      }
    }
  }
  return output;
}
function ev(num, c2 = false) {
  return `${metric(num, 2)} ${metric(num, 1)}eV${c2 ? "/c^2" : ""}`;
}
var formats = { ...FORMATS, ...{
  toSubscript,
  toSuperscript,
  formatST,
  format,
  formatGain,
  formatTime,
  formatReduction,
  formatPercent,
  formatMult,
  expMult,
  metric,
  ev
} };
Decimal.formats = formats;

// src/E/eMain.ts
var E = (() => {
  let out = (x) => new Decimal(x);
  Object.getOwnPropertyNames(Decimal).filter((b) => !Object.getOwnPropertyNames(class {
  }).includes(b)).forEach((prop) => {
    out[prop] = Decimal[prop];
  });
  return out;
})();

// src/classes/boost.ts
var boostObject = class {
  constructor(init) {
    this.id = init.id;
    this.name = init.name ?? "";
    this.desc = init.desc ?? "";
    this.value = init.value;
    this.order = init.order ?? 99;
  }
};
var boost = class {
  /**
   * Constructs a new boost manager.
   * @param baseEffect - The base effect value to which boosts are applied.
   * @param boosts - An array of boost objects to initialize with.
   */
  constructor(baseEffect = 1, boosts) {
    /**
     * @alias setBoost
     * @deprecated Use {@link setBoost} instead.
     */
    this.addBoost = this.setBoost;
    boosts = boosts ? Array.isArray(boosts) ? boosts : [boosts] : void 0;
    this.baseEffect = E(baseEffect);
    this.boostArray = [];
    if (boosts) {
      boosts.forEach((boostObj) => {
        this.boostArray.push(new boostObject(boostObj));
      });
    }
  }
  getBoosts(id, index) {
    const boostList = [];
    const indexList = [];
    for (let i = 0; i < this.boostArray.length; i++) {
      if (typeof id === "string" && id === this.boostArray[i].id || id instanceof RegExp && id.test(this.boostArray[i].id)) {
        boostList.push(this.boostArray[i]);
        indexList.push(i);
      }
    }
    return index ? [boostList, indexList] : boostList;
  }
  /**
   * Gets a boost object by its ID.
   * @deprecated Use {@link boost.getBoosts} instead.
   * @param id - The ID of the boost to retrieve.
   * @returns The boost object if found, or null if not found.
   */
  getBoost(id) {
    return this.getBoosts(id)[0] ?? null;
  }
  /**
   * Removes a boost by its ID. Only removes the first instance of the id.
   * @param id - The ID of the boost to remove.
   * @example
   * // Remove the boost with the ID "healthBoost"
   * boost.removeBoost("healthBoost");
   */
  removeBoost(id) {
    for (let i = 0; i < this.boostArray.length; i++) {
      if (id === this.boostArray[i].id) {
        this.boostArray.splice(i, 1);
        break;
      }
    }
  }
  setBoost(arg1, arg2, arg3, arg4, arg5) {
    if (!arg1)
      return;
    if (typeof arg1 === "string") {
      const id = arg1;
      const name = arg2 ?? "";
      const desc = arg3 ?? "";
      const value = arg4 ?? ((e) => e);
      const order = arg5;
      const bCheck = this.getBoosts(id, true);
      if (!bCheck[0][0]) {
        this.boostArray.push(new boostObject({ id, name, desc, value, order }));
      } else {
        this.boostArray[bCheck[1][0]] = new boostObject({ id, name, desc, value, order });
      }
    } else {
      arg1 = Array.isArray(arg1) ? arg1 : [arg1];
      for (let i = 0; i < arg1.length; i++) {
        const bCheck = this.getBoosts(arg1[i].id, true);
        if (!bCheck[0][0]) {
          this.boostArray = this.boostArray.concat(new boostObject(arg1[i]));
        } else {
          this.boostArray[bCheck[1][0]] = new boostObject(arg1[i]);
        }
      }
    }
  }
  /**
   * Calculates the cumulative effect of all boosts on the base effect.
   * @param base - The base effect value to calculate with. Defaults to the base effect of the boost manager.
   * @returns The calculated effect after applying boosts.
   * @example
   * // Calculate the effect of all boosts
   * const finalEffect = boost.calculate();
   */
  calculate(base = this.baseEffect) {
    let output = E(base);
    let boosts = this.boostArray;
    boosts = boosts.sort((a, b) => a.order - b.order);
    for (let i = 0; i < boosts.length; i++) {
      output = boosts[i].value(output);
    }
    return output;
  }
};

// src/classes/currency.ts
function calculateUpgrade(value, upgrade, target = 1, el = false) {
  target = E(target);
  if (target.lte(0)) {
    return [E(0), E(0)];
  }
  el = upgrade.el ?? el;
  if (target.eq(1)) {
    if (el) {
      const cost2 = upgrade.cost(upgrade.level);
      const canAfford2 = value.gte(cost2);
      return [canAfford2 ? E(1) : E(0), canAfford2 ? cost2 : E(0)];
    }
    const cost = upgrade.cost(upgrade.level);
    const canAfford = value.gte(cost);
    return [canAfford ? E(1) : E(0), canAfford ? cost : E(0)];
  }
  if (upgrade.costBulk) {
    const [cost, amount] = upgrade.costBulk(upgrade.level, target);
    const canAfford = value.gte(cost);
    return [canAfford ? amount : E(0), canAfford ? cost : E(0)];
  }
  function calculateSum(f, b) {
    let sum = E();
    for (let n = E(0); n.lte(b); n = n.add(1)) {
      sum = sum.add(f(n));
    }
    return sum;
  }
  function findHighestB(f, a) {
    if (el) {
      let left2 = E(0);
      let right2 = target;
      let result = E(0);
      while (left2.lessThanOrEqualTo(right2)) {
        const mid = left2.plus(right2).dividedBy(2).floor();
        const valueF = f(mid);
        if (valueF.lte(a)) {
          result = mid;
          left2 = mid.plus(1);
        } else {
          right2 = mid.minus(1);
        }
      }
      return [result, result.gt(0) ? f(result) : E(0)];
    }
    let left = E(0);
    let right = E(1);
    while (calculateSum(f, right).lt(a)) {
      right = right.mul(2);
    }
    while (left.lt(right)) {
      const mid = E.floor(left.add(right).div(2));
      const sum = calculateSum(f, mid);
      if (sum.lt(a)) {
        left = mid.add(1);
      } else {
        right = mid;
      }
    }
    return [left, left.gt(0) ? calculateSum(f, left.sub(1)) : E(0)];
  }
  return findHighestB(
    (level) => upgrade.cost(upgrade.level.add(level)),
    value
  );
}
var upgradeData = class {
  constructor(init) {
    init = init ?? {};
    this.id = init.id ?? -1;
    this.level = init.level ? E(init.level) : E(1);
  }
};
__decorateClass([
  Expose()
], upgradeData.prototype, "id", 2);
__decorateClass([
  Type(() => Decimal)
], upgradeData.prototype, "level", 2);
var upgradeStatic = class {
  get data() {
    return this.dataPointerFn();
  }
  /**
   * @param init - The upgrade object to initialize.
   * @param dataPointer - A function or reference that returns the pointer of the data / frontend.
   */
  constructor(init, dataPointer) {
    const data = typeof dataPointer === "function" ? dataPointer() : dataPointer;
    this.dataPointerFn = typeof dataPointer === "function" ? dataPointer : () => data;
    this.id = init.id;
    this.name = init.name ?? init.id;
    this.description = init.description ?? "";
    this.cost = init.cost;
    this.costBulk = init.costBulk;
    this.maxLevel = init.maxLevel ?? E(1);
    this.effect = init.effect;
    this.el = init.el;
  }
  /**
   * The current level of the upgrade.
   * @returns The current level of the upgrade.
   */
  get level() {
    return this.data.level;
  }
  set level(n) {
    this.data.level = E(n);
  }
};
var currency = class {
  // /** A boost object that affects the currency gain. */
  // @Expose()
  // public boost: boost;
  /** Constructs a new currency object with an initial value of 0. */
  constructor() {
    this.value = E(0);
    this.upgrades = [];
  }
};
__decorateClass([
  Type(() => Decimal)
], currency.prototype, "value", 2);
__decorateClass([
  Type(() => upgradeData)
], currency.prototype, "upgrades", 2);
var currencyStatic = class {
  get pointer() {
    return this.pointerFn();
  }
  /**
   * Updates / applies effects to the currency on load.
   */
  onLoadData() {
    this.upgrades.forEach((upgrade) => {
      if (upgrade.effect)
        upgrade.effect(upgrade.level, upgrade);
    });
  }
  /**
   * @param pointer - A function or reference that returns the pointer of the data / frontend.
   * @param defaultVal - The default value of the currency.
   * @param defaultBoost - The default boost of the currency.
   */
  constructor(pointer = new currency(), defaultVal = E(0), defaultBoost = E(1)) {
    this.defaultVal = E(defaultVal);
    this.defaultBoost = E(defaultBoost);
    this.upgrades = [];
    this.pointerFn = typeof pointer === "function" ? pointer : () => pointer;
    this.boost = new boost(defaultBoost);
    this.pointer.value = this.defaultVal;
  }
  /**
   * The current value of the currency.
   * @returns The current value of the currency.
   */
  get value() {
    return this.pointer.value;
  }
  set value(value) {
    this.pointer.value = value;
  }
  /**
   * Resets the currency and upgrade levels.
   * @param resetCurrency - Whether to reset the currency value. Default is true.
   * @param resetUpgradeLevels - Whether to reset the upgrade levels. Default is true.
   * @example
   * currency.reset();
   * console.log(currency.value); // E(0), or the default value
   */
  reset(resetCurrency = true, resetUpgradeLevels = true) {
    if (resetCurrency)
      this.value = this.defaultVal;
    if (resetUpgradeLevels) {
      this.upgrades.forEach((upgrade) => {
        upgrade.level = E(0);
      });
    }
    ;
  }
  /**
   * The new currency value after applying the boost.
   * @param dt Deltatime / multipler in milliseconds, assuming you gain once every second. Ex. 500 = 0.5 seconds = half gain.
   * @returns What you gained.
   * @example
   * currency.gain(Math.random() * 10000); // Gain a random number between 1 and 10.
   */
  gain(dt = 1e3) {
    const toAdd = this.boost.calculate().mul(E(dt).div(1e3));
    this.pointer.value = this.pointer.value.add(toAdd);
    return toAdd;
  }
  /**
   * Adds an upgrade to the upgrades array.
   * @param upgrades1 Upgrade to add
   * @returns The upgrade object.
   */
  pointerAddUpgrade(upgrades1) {
    const upgrades2 = new upgradeData(upgrades1);
    this.pointer.upgrades.push(upgrades2);
    return upgrades1;
  }
  /**
   * Retrieves an upgrade object based on the provided id.
   * @param id - The id of the upgrade to retrieve.
   * @returns The upgrade object if found, otherwise null.
   */
  pointerGetUpgrade(id) {
    let upgradeToGet = null;
    if (id === void 0) {
      return null;
    }
    for (let i = 0; i < this.pointer.upgrades.length; i++) {
      if (this.pointer.upgrades[i].id === id) {
        upgradeToGet = this.pointer.upgrades[i];
        break;
      }
    }
    return upgradeToGet;
  }
  /**
   * Retrieves an upgrade object based on the provided id.
   * @param id - The id of the upgrade to retrieve.
   * @returns The upgrade object if found, otherwise null.
   * @example
   * const upgrade = currency.getUpgrade("healthBoost");
   * console.log(upgrade); // upgrade object
   */
  getUpgrade(id) {
    let upgradeToGet = null;
    if (id === void 0) {
      return null;
    } else if (typeof id == "string") {
      for (let i = 0; i < this.upgrades.length; i++) {
        if (this.upgrades[i].id === id) {
          upgradeToGet = this.upgrades[i];
          break;
        }
      }
    }
    return upgradeToGet;
  }
  /**
   * Creates upgrades. To update an upgrade, use {@link updateUpgrade} instead.
   * @param upgrades - An array of upgrade objects.
   * @param runEffectInstantly - Whether to run the effect immediately. Defaults to `true`.
   * @example
   * currenct.addUpgrade({
   *     id: "healthBoost", // The ID of the upgrade, used to retrieve it later
   *     name: "Health Boost", // The name of the upgrade, for display purposes (optional, defaults to the ID)
   *     description: "Increases health by 10.", // The description of the upgrade, for display purposes (optional, defaults to "")
   *     cost: (level) => level.mul(10), // Cost of the upgrade, 10 times the level
   *     maxLevel: 10, // Maximum level of the upgrade (optional, defaults to 1)
   *     // Effect of the upgrade (runs when the upgrade is bought, and instantly if runEffectInstantly is true)
   *     effect: (level, context) => {
   *         // Set / update the boost
   *         // health: currencyStatic
   *         health.boost.setBoost(
   *             "healthBoost",
   *             "Health Boost",
   *             "Boosts health by 2x per level.",
   *             n => n.mul(E.pow(2, level.sub(1))),
   *             2,
   *         );
   *     }
   * });
   */
  addUpgrade(upgrades, runEffectInstantly = true) {
    if (!Array.isArray(upgrades))
      upgrades = [upgrades];
    const upgradesDefault = [];
    for (let i = 0; i < upgrades.length; i++) {
      this.pointerAddUpgrade(upgrades[i]);
      const currentLength = this.pointer.upgrades.length;
      const upgrade = new upgradeStatic(
        upgrades[i],
        () => this.pointerGetUpgrade(upgrades[i].id) ?? this.pointer.upgrades[currentLength - 1]
      );
      if (upgrade.effect && runEffectInstantly)
        upgrade.effect(upgrade.level, upgrade);
      upgradesDefault.push(upgrade);
    }
    this.upgrades = this.upgrades.concat(upgradesDefault);
  }
  /**
   * Updates an upgrade. To create an upgrade, use {@link addUpgrade} instead.
   * @param id - The id of the upgrade to update.
   * @param upgrade - The upgrade object to update.
   * @example
   * currency.updateUpgrade("healthBoost", {
   *     name: "New Health Boost".
   *     cost: (level) => level.mul(20),
   *     maxLevel: 20,
   *     effect: (level, context) => {
   *         console.log("Health Boost effect");
   *     }
   * });
   */
  updateUpgrade(id, upgrade) {
    const upgrade1 = this.getUpgrade(id);
    if (upgrade1 === null)
      return;
    upgrade1.name = upgrade.name ?? upgrade1.name;
    upgrade1.cost = upgrade.cost ?? upgrade1.cost;
    upgrade1.maxLevel = upgrade.maxLevel ?? upgrade1.maxLevel;
    upgrade1.effect = upgrade.effect ?? upgrade1.effect;
  }
  /**
   * Calculates the cost and how many upgrades you can buy
   * NOTE: This becomes very slow for higher levels. Use el=`true` to skip the sum calculation and speed up dramatically.
   * @deprecated Use {@link calculateUpgrade} instead.
   * @param id - The ID or position of the upgrade to calculate.
   * @param target - How many to buy
   * @param el - ie Endless: Flag to exclude the sum calculation and only perform binary search. (DEPRECATED, use `el` in the upgrade object instead)
   * @returns [amount, cost] - Returns the amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [E(0), E(0)].
   * @example
   * // Calculate how many healthBoost upgrades you can buy and the cost of the upgrades
   * const [amount, cost] = currency.calculateUpgrade("healthBoost", 10);
   */
  calculateUpgrade(id, target = 1, el = false) {
    const upgrade = this.getUpgrade(id);
    if (upgrade === null) {
      console.warn(`Upgrade "${id}" not found.`);
      return [E(0), E(0)];
    }
    return calculateUpgrade(this.value, upgrade, target, el);
  }
  /**
   * Calculates how much is needed for the next upgrade.
   * @param id - Index or ID of the upgrade
   * @param target - How many before the next upgrade
   * @param el - Endless: Flag to exclude the sum calculation and only perform binary search.
   * @returns The cost of the next upgrade.
   * @example
   * // Calculate the cost of the next healthBoost upgrade
   * const nextCost = currency.getNextCost("healthBoost");
   */
  getNextCost(id, target = 0, el = false) {
    const upgrade = this.getUpgrade(id);
    if (upgrade === null) {
      console.warn(`Upgrade "${id}" not found.`);
      return E(0);
    }
    const amount = calculateUpgrade(this.value, upgrade, target, el)[1];
    const nextCost = upgrade.cost(upgrade.level.add(amount));
    return nextCost;
  }
  /**
   * Buys an upgrade based on its ID or array position if enough currency is available.
   * @param id - The ID or position of the upgrade to buy or upgrade.
   * If a string is provided, it is treated as the upgrade's ID. If a number is provided, it is treated as the upgrade's array position (starting from 0).
   * @param target - The target level or quantity to reach for the upgrade.
   * This represents how many upgrades to buy or upgrade.
   * @returns Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
   * @example
   * // Attempt to buy up to 10 healthBoost upgrades at once
   * currency.buyUpgrade("healthBoost", 10);
   */
  buyUpgrade(id, target = 1) {
    const upgrade = this.getUpgrade(id);
    if (upgrade === null)
      return false;
    target = E(target);
    const maxAffordableQuantity = calculateUpgrade(
      this.value,
      upgrade,
      target
    );
    if (maxAffordableQuantity[0].lte(0)) {
      return false;
    }
    this.pointer.value = this.pointer.value.sub(maxAffordableQuantity[1]);
    upgrade.level = upgrade.level.add(maxAffordableQuantity[0]);
    if (typeof upgrade.effect === "function") {
      upgrade.effect(upgrade.level, upgrade);
    }
    return true;
  }
};

// src/classes/attribute.ts
var attribute = class {
  /**
   * Constructs a static attribute with an initial effect.
   * @param initial - The inital value of the attribute.
   */
  constructor(initial = 0) {
    this.value = E(initial);
  }
};
__decorateClass([
  Type(() => Decimal)
], attribute.prototype, "value", 2);
var attributeStatic = class {
  get pointer() {
    return this.pointerFn;
  }
  /**
   * Constructs a new instance of the Attribute class.
   * @param pointer - A function or an instance of the attribute class. Defaults to a new instance of the attribute class.
   * @param useBoost - Indicates whether to use boost for the attribute.
   * @param initial - The initial value of the attribute.
   */
  constructor(pointer, useBoost = true, initial = 0) {
    this.initial = E(initial);
    pointer = pointer ?? new attribute(this.initial);
    this.pointerFn = typeof pointer === "function" ? pointer() : pointer;
    if (useBoost)
      this.boost = new boost(this.initial);
  }
  /**
   * Updates the value of the attribute.
   * NOTE: This method must be called every time the boost is updated, else the value stored will not be updated.
   */
  update() {
    if (this.boost) {
      this.pointer.value = this.boost.calculate();
    }
  }
  /**
   * Gets the value of the attribute, and also updates the value stored.
   * NOTE: This getter must be called every time the boost is updated, else the value stored will not be updated.
   * @returns The calculated value of the attribute.
   */
  get value() {
    if (this.boost) {
      this.pointer.value = this.boost.calculate();
    }
    return this.pointer.value;
  }
  /**
   * Sets the value of the attribute.
   * NOTE: This setter should not be used when boost is enabled.
   * @param value - The value to set the attribute to.
   */
  set value(value) {
    if (this.boost) {
      throw new Error("Cannot set value of attributeStatic when boost is enabled.");
    }
    this.pointer.value = value;
  }
};

// src/classes/grid.ts
var gridCell = class {
  /**
   * Initializes a new instance of the grid cell.
   * @param x - The x-coordinate.
   * @param y - The y-coordinate.
   * @param props - The properties to initialize with.
   */
  constructor(x, y, props) {
    this.x = x;
    this.y = y;
    this.properties = props ? props : {};
  }
  /**
   * Sets the value of a property on the cell.
   * @param name - The name of the property.
   * @param value - The value to set.
   * @returns The set value.
   */
  setValue(name, value) {
    this.properties[name] = value;
    return value;
  }
  /**
   * Gets the value of a property on the cell.
   * @param name - The name of the property.
   * @returns - The value of the property.
   */
  getValue(name) {
    return this.properties[name];
  }
};
var grid = class {
  // Add this index signature
  /**
   * Initializes a new instance of the grid.
   * @param x_size - The size of the grid along the x-axis.
   * @param y_size - The size of the grid along the y-axis.
   * @param starterProps - The properties to initialize with.
   */
  constructor(x_size, y_size, starterProps) {
    this.x_size = x_size;
    this.y_size = y_size;
    this.cells = [];
    for (let a = 0; a < y_size; a++) {
      this.cells[a] = [];
      for (let b = 0; b < x_size; b++) {
        this.cells[a][b] = new gridCell(b, a, starterProps);
      }
    }
  }
  /**
   * Gets an array containing all cells in the grid.
   * @returns - An array of all cells.
   */
  getAll() {
    const output = [];
    for (let a = 0; a < this.y_size; a++) {
      for (let b = 0; b < this.x_size; b++) {
        output.push(this.cells[a][b]);
      }
    }
    return output;
  }
  /**
   * Returns an array of all grid cells.
   * @returns An array of all grid cells.
   * @deprecated Use getAll() instead.
   */
  all() {
    return this.getAll();
  }
  /**
   * Gets an array containing all cells that have the same x coordinate.
   * @returns - An array of all cells.
   * @param x - The x coordinate to check.
   */
  getAllX(x) {
    const output = [];
    for (let i = 0; i < this.y_size; i++) {
      output.push(this.cells[i][x]);
    }
    return output;
  }
  /**
   * Returns an array of all grid cells with the same x coordinate.
   * @param x The x coordinate to check.
   * @returns An array of all grid cells with the same x coordinate.
   * @deprecated Use getAllX() instead.
   */
  allX(x) {
    return this.getAllX(x);
  }
  /**
   * Gets an array containing all cells that have the same y coordinate.
   * @returns - An array of all cells.
   * @param y - The y coordinate to check.
   */
  getAllY(y) {
    const output = [];
    for (let i = 0; this.x_size; i++) {
      output.push(this.cells[y][i]);
    }
    return output;
  }
  /**
   * Returns an array of all grid cells with the same y coordinate.
   * @param y The y coordinate to check.
   * @returns An array of all grid cells with the same y coordinate.
   * @deprecated Use allY() instead.
   */
  allY(y) {
    return this.getAllY(y);
  }
  /**
   * Gets a cell.
   * @returns - The cell.
   * @param x - The x coordinate to check.
   * @param y - The y coordinate to check.
   */
  getCell(x, y) {
    return this.cells[y][x];
  }
  /**
   * Sets the value of a cell in the grid.
   * @param x The x-coordinate of the cell.
   * @param y The y-coordinate of the cell.
   * @param value The value to set for the cell.
   */
  setCell(x, y, value) {
    this.cells[y][x] = value;
  }
  /**
   * Gets an array containing all cells adjacent to a specific cell.
   * @returns - An array of all cells.
   * @param x - The x coordinate to check.
   * @param y - The y coordinate to check.
   */
  getAdjacent(x, y) {
    const output = [];
    output[0] = this.getCell(x, y + 1);
    output[1] = this.getCell(x + 1, y);
    output[2] = this.getCell(x, y - 1);
    output[3] = this.getCell(x - 1, y + 1);
    return output;
  }
  /**
   * Gets an array containing all cells diagonal from a specific cell.
   * @returns - An array of all cells.
   * @param x - The x coordinate to check.
   * @param y - The y coordinate to check.
   */
  getDiagonal(x, y) {
    const output = [];
    output[0] = this.getCell(x - 1, y + 1);
    output[1] = this.getCell(x + 1, y + 1);
    output[2] = this.getCell(x + 1, y - 1);
    output[3] = this.getCell(x - 1, y - 1);
    return output;
  }
  /**
   * Gets an array containing all cells that surround a cell.
   * @returns - An array of all cells.
   * @param x - The x coordinate to check.
   * @param y - The y coordinate to check.
   */
  getEncircling(x, y) {
    return this.getAdjacent(x, y).concat(this.getDiagonal(x, y));
  }
  /**
   * Calculates the distance between two points on the grid.
   * @deprecated Use your own distance function instead.
   * @param x1 - The x-coordinate of the first point.
   * @param y1 - The y-coordinate of the first point.
   * @param x2 - The x-coordinate of the second point.
   * @param y2 - The y-coordinate of the second point.
   * @returns The distance between the two points.
   */
  static getDistance(x1, y1, x2, y2) {
    return Math.abs(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
  }
};

// src/hookMain.ts
var eMathWeb = {
  /**
   * @deprecated Use `import { E } from "emath.js"` instead.
   */
  E,
  classes: {
    /**
     * @deprecated Use `import { boost } from "emath.js"` instead.
     */
    boost,
    /**
     * @deprecated Use `import { currency } from "emath.js"` instead.
     */
    currency,
    /**
     * @deprecated Use `import { currencyStatic } from "emath.js"` instead.
     */
    currencyStatic,
    /**
     * @deprecated Use `import { attribute } from "emath.js"` instead.
     */
    attribute,
    /**
     * @deprecated Use `import { grid } from "emath.js"` instead.
     */
    grid,
    /**
     * @deprecated Use `import { gridCell } from "emath.js"` instead.
     */
    gridCell
    // /**
    //  * @deprecated Use `import { skillNode } from "emath.js"` instead.
    //  */
    // skillNode,
    // /**
    //  * @deprecated Use `import { skillTree } from "emath.js"` instead.
    //  */
    // skillTree,
  }
  // /**
  //  * @deprecated Use `import { game } from "emath.js"` instead.
  //  */
  // game,
  // managers: {
  //     /**
  //      * @deprecated Use `import { keyManager } from "emath.js"` instead.
  //      */
  //     keyManager,
  //     /**
  //      * @deprecated Use `import { eventManager } from "emath.js"` instead.
  //      */
  //     eventManager,
  //     /**
  //      * @deprecated Use `import { dataManager } from "emath.js"` instead.
  //      */
  //     dataManager,
  // },
};
function hookMain() {
  if (typeof process !== "object" && typeof window !== "undefined") {
    window["eMath"] = eMathWeb;
  }
}

// src/index.ts
hookMain();
/*! Bundled license information:

reflect-metadata/Reflect.js:
  (*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)
*/
if (typeof module.exports == "object" && typeof exports == "object") {
    var __cp = (to, from, except, desc) => {
      if ((from && typeof from === "object") || typeof from === "function") {
        for (let key of Object.getOwnPropertyNames(from)) {
          if (!Object.prototype.hasOwnProperty.call(to, key) && key !== except)
          Object.defineProperty(to, key, {
            get: () => from[key],
            enumerable: !(desc = Object.getOwnPropertyDescriptor(from, key)) || desc.enumerable,
          });
        }
      }
      return to;
    };
    module.exports = __cp(module.exports, exports);
  }
  return module.exports;
  }))
