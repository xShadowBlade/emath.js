(function (g, f) {
    var hasExports = typeof exports === 'object';
    if (typeof define === "function" && define.amd) {
      define([], f);
    } else if (typeof module === "object" && module.exports) {
      module.exports = f();
    } else {
      var m = hasExports ? f() : f();
      var root = hasExports ? exports : g;
      for(var i in m) root[i] = m[i];
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
          var keys2 = [];
          for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
            var key = ownKeys_1[_i];
            var hasKey = set.has(key);
            if (!hasKey) {
              set.add(key);
              keys2.push(key);
            }
          }
          for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
            var key = parentKeys_1[_a];
            var hasKey = set.has(key);
            if (!hasKey) {
              set.add(key);
              keys2.push(key);
            }
          }
          return keys2;
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
            var keys2 = [];
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return keys2;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
              var next = IteratorStep(iterator);
              if (!next) {
                keys2.length = k;
                return keys2;
              }
              var nextValue = IteratorValue(next);
              try {
                keys2[k] = nextValue;
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
              function MapIterator2(keys2, values, selector) {
                this._index = 0;
                this._keys = keys2;
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
          var keys2 = HashMap.create();
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
            while (HashMap.has(keys2, key));
            keys2[key] = true;
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

// node_modules/lz-string/libs/lz-string.js
var require_lz_string = __commonJS({
  "node_modules/lz-string/libs/lz-string.js"(exports, module2) {
    var LZString = function() {
      var f = String.fromCharCode;
      var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
      var baseReverseDic = {};
      function getBaseValue(alphabet, character) {
        if (!baseReverseDic[alphabet]) {
          baseReverseDic[alphabet] = {};
          for (var i = 0; i < alphabet.length; i++) {
            baseReverseDic[alphabet][alphabet.charAt(i)] = i;
          }
        }
        return baseReverseDic[alphabet][character];
      }
      var LZString2 = {
        compressToBase64: function(input) {
          if (input == null)
            return "";
          var res = LZString2._compress(input, 6, function(a) {
            return keyStrBase64.charAt(a);
          });
          switch (res.length % 4) {
            default:
            case 0:
              return res;
            case 1:
              return res + "===";
            case 2:
              return res + "==";
            case 3:
              return res + "=";
          }
        },
        decompressFromBase64: function(input) {
          if (input == null)
            return "";
          if (input == "")
            return null;
          return LZString2._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrBase64, input.charAt(index));
          });
        },
        compressToUTF16: function(input) {
          if (input == null)
            return "";
          return LZString2._compress(input, 15, function(a) {
            return f(a + 32);
          }) + " ";
        },
        decompressFromUTF16: function(compressed) {
          if (compressed == null)
            return "";
          if (compressed == "")
            return null;
          return LZString2._decompress(compressed.length, 16384, function(index) {
            return compressed.charCodeAt(index) - 32;
          });
        },
        //compress into uint8array (UCS-2 big endian format)
        compressToUint8Array: function(uncompressed) {
          var compressed = LZString2.compress(uncompressed);
          var buf = new Uint8Array(compressed.length * 2);
          for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
            var current_value = compressed.charCodeAt(i);
            buf[i * 2] = current_value >>> 8;
            buf[i * 2 + 1] = current_value % 256;
          }
          return buf;
        },
        //decompress from uint8array (UCS-2 big endian format)
        decompressFromUint8Array: function(compressed) {
          if (compressed === null || compressed === void 0) {
            return LZString2.decompress(compressed);
          } else {
            var buf = new Array(compressed.length / 2);
            for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
              buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
            }
            var result = [];
            buf.forEach(function(c) {
              result.push(f(c));
            });
            return LZString2.decompress(result.join(""));
          }
        },
        //compress into a string that is already URI encoded
        compressToEncodedURIComponent: function(input) {
          if (input == null)
            return "";
          return LZString2._compress(input, 6, function(a) {
            return keyStrUriSafe.charAt(a);
          });
        },
        //decompress from an output of compressToEncodedURIComponent
        decompressFromEncodedURIComponent: function(input) {
          if (input == null)
            return "";
          if (input == "")
            return null;
          input = input.replace(/ /g, "+");
          return LZString2._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrUriSafe, input.charAt(index));
          });
        },
        compress: function(uncompressed) {
          return LZString2._compress(uncompressed, 16, function(a) {
            return f(a);
          });
        },
        _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
          if (uncompressed == null)
            return "";
          var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
          for (ii = 0; ii < uncompressed.length; ii += 1) {
            context_c = uncompressed.charAt(ii);
            if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
              context_dictionary[context_c] = context_dictSize++;
              context_dictionaryToCreate[context_c] = true;
            }
            context_wc = context_w + context_c;
            if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
              context_w = context_wc;
            } else {
              if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 8; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                } else {
                  value = 1;
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | value;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = 0;
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 16; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                }
                delete context_dictionaryToCreate[context_w];
              } else {
                value = context_dictionary[context_w];
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              context_dictionary[context_wc] = context_dictSize++;
              context_w = String(context_c);
            }
          }
          if (context_w !== "") {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
              if (context_w.charCodeAt(0) < 256) {
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 8; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              } else {
                value = 1;
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = 0;
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 16; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              delete context_dictionaryToCreate[context_w];
            } else {
              value = context_dictionary[context_w];
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
          }
          value = 2;
          for (i = 0; i < context_numBits; i++) {
            context_data_val = context_data_val << 1 | value & 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
          while (true) {
            context_data_val = context_data_val << 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data.push(getCharFromInt(context_data_val));
              break;
            } else
              context_data_position++;
          }
          return context_data.join("");
        },
        decompress: function(compressed) {
          if (compressed == null)
            return "";
          if (compressed == "")
            return null;
          return LZString2._decompress(compressed.length, 32768, function(index) {
            return compressed.charCodeAt(index);
          });
        },
        _decompress: function(length, resetValue, getNextValue) {
          var dictionary = [], next, enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c, data = { val: getNextValue(0), position: resetValue, index: 1 };
          for (i = 0; i < 3; i += 1) {
            dictionary[i] = i;
          }
          bits = 0;
          maxpower = Math.pow(2, 2);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          switch (next = bits) {
            case 0:
              bits = 0;
              maxpower = Math.pow(2, 8);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 1:
              bits = 0;
              maxpower = Math.pow(2, 16);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 2:
              return "";
          }
          dictionary[3] = c;
          w = c;
          result.push(c);
          while (true) {
            if (data.index > length) {
              return "";
            }
            bits = 0;
            maxpower = Math.pow(2, numBits);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            switch (c = bits) {
              case 0:
                bits = 0;
                maxpower = Math.pow(2, 8);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 1:
                bits = 0;
                maxpower = Math.pow(2, 16);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 2:
                return result.join("");
            }
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
            if (dictionary[c]) {
              entry = dictionary[c];
            } else {
              if (c === dictSize) {
                entry = w + w.charAt(0);
              } else {
                return null;
              }
            }
            result.push(entry);
            dictionary[dictSize++] = w + entry.charAt(0);
            enlargeIn--;
            w = entry;
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
          }
        }
      };
      return LZString2;
    }();
    if (typeof define === "function" && define.amd) {
      define(function() {
        return LZString;
      });
    } else if (typeof module2 !== "undefined" && module2 != null) {
      module2.exports = LZString;
    } else if (typeof angular !== "undefined" && angular != null) {
      angular.module("LZString", []).factory("LZString", function() {
        return LZString;
      });
    }
  }
});

// src/game/index.ts
var game_exports = {};
__export(game_exports, {
  DataManager: () => DataManager,
  EventManager: () => EventManager,
  EventTypes: () => EventTypes,
  Game: () => Game,
  GameAttribute: () => GameAttribute,
  GameCurrency: () => GameCurrency,
  GameReset: () => GameReset,
  KeyManager: () => KeyManager,
  gameDefaultConfig: () => gameDefaultConfig,
  keys: () => keys
});
module.exports = __toCommonJS(game_exports);
var import_reflect_metadata4 = __toESM(require_Reflect());

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

// node_modules/class-transformer/esm5/utils/get-global.util.js
function getGlobal() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof self !== "undefined") {
    return self;
  }
}

// node_modules/class-transformer/esm5/utils/is-promise.util.js
function isPromise(p) {
  return p !== null && typeof p === "object" && typeof p.then === "function";
}

// node_modules/class-transformer/esm5/TransformOperationExecutor.js
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
function instantiateArrayType(arrayType) {
  var array = new arrayType();
  if (!(array instanceof Set) && !("push" in array)) {
    return [];
  }
  return array;
}
var TransformOperationExecutor = (
  /** @class */
  function() {
    function TransformOperationExecutor2(transformationType, options) {
      this.transformationType = transformationType;
      this.options = options;
      this.recursionStack = /* @__PURE__ */ new Set();
    }
    TransformOperationExecutor2.prototype.transform = function(source, value, targetType, arrayType, isMap, level) {
      var _this = this;
      if (level === void 0) {
        level = 0;
      }
      if (Array.isArray(value) || value instanceof Set) {
        var newValue_1 = arrayType && this.transformationType === TransformationType.PLAIN_TO_CLASS ? instantiateArrayType(arrayType) : [];
        value.forEach(function(subValue, index) {
          var subSource = source ? source[index] : void 0;
          if (!_this.options.enableCircularCheck || !_this.isCircular(subValue)) {
            var realTargetType = void 0;
            if (typeof targetType !== "function" && targetType && targetType.options && targetType.options.discriminator && targetType.options.discriminator.property && targetType.options.discriminator.subTypes) {
              if (_this.transformationType === TransformationType.PLAIN_TO_CLASS) {
                realTargetType = targetType.options.discriminator.subTypes.find(function(subType) {
                  return subType.name === subValue[targetType.options.discriminator.property];
                });
                var options = { newObject: newValue_1, object: subValue, property: void 0 };
                var newType = targetType.typeFunction(options);
                realTargetType === void 0 ? realTargetType = newType : realTargetType = realTargetType.value;
                if (!targetType.options.keepDiscriminatorProperty)
                  delete subValue[targetType.options.discriminator.property];
              }
              if (_this.transformationType === TransformationType.CLASS_TO_CLASS) {
                realTargetType = subValue.constructor;
              }
              if (_this.transformationType === TransformationType.CLASS_TO_PLAIN) {
                subValue[targetType.options.discriminator.property] = targetType.options.discriminator.subTypes.find(function(subType) {
                  return subType.value === subValue.constructor;
                }).name;
              }
            } else {
              realTargetType = targetType;
            }
            var value_1 = _this.transform(subSource, subValue, realTargetType, void 0, subValue instanceof Map, level + 1);
            if (newValue_1 instanceof Set) {
              newValue_1.add(value_1);
            } else {
              newValue_1.push(value_1);
            }
          } else if (_this.transformationType === TransformationType.CLASS_TO_CLASS) {
            if (newValue_1 instanceof Set) {
              newValue_1.add(subValue);
            } else {
              newValue_1.push(subValue);
            }
          }
        });
        return newValue_1;
      } else if (targetType === String && !isMap) {
        if (value === null || value === void 0)
          return value;
        return String(value);
      } else if (targetType === Number && !isMap) {
        if (value === null || value === void 0)
          return value;
        return Number(value);
      } else if (targetType === Boolean && !isMap) {
        if (value === null || value === void 0)
          return value;
        return Boolean(value);
      } else if ((targetType === Date || value instanceof Date) && !isMap) {
        if (value instanceof Date) {
          return new Date(value.valueOf());
        }
        if (value === null || value === void 0)
          return value;
        return new Date(value);
      } else if (!!getGlobal().Buffer && (targetType === Buffer || value instanceof Buffer) && !isMap) {
        if (value === null || value === void 0)
          return value;
        return Buffer.from(value);
      } else if (isPromise(value) && !isMap) {
        return new Promise(function(resolve, reject) {
          value.then(function(data) {
            return resolve(_this.transform(void 0, data, targetType, void 0, void 0, level + 1));
          }, reject);
        });
      } else if (!isMap && value !== null && typeof value === "object" && typeof value.then === "function") {
        return value;
      } else if (typeof value === "object" && value !== null) {
        if (!targetType && value.constructor !== Object)
          if (!Array.isArray(value) && value.constructor === Array) {
          } else {
            targetType = value.constructor;
          }
        if (!targetType && source)
          targetType = source.constructor;
        if (this.options.enableCircularCheck) {
          this.recursionStack.add(value);
        }
        var keys2 = this.getKeys(targetType, value, isMap);
        var newValue = source ? source : {};
        if (!source && (this.transformationType === TransformationType.PLAIN_TO_CLASS || this.transformationType === TransformationType.CLASS_TO_CLASS)) {
          if (isMap) {
            newValue = /* @__PURE__ */ new Map();
          } else if (targetType) {
            newValue = new targetType();
          } else {
            newValue = {};
          }
        }
        var _loop_1 = function(key2) {
          if (key2 === "__proto__" || key2 === "constructor") {
            return "continue";
          }
          var valueKey = key2;
          var newValueKey = key2, propertyName = key2;
          if (!this_1.options.ignoreDecorators && targetType) {
            if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
              var exposeMetadata = defaultMetadataStorage.findExposeMetadataByCustomName(targetType, key2);
              if (exposeMetadata) {
                propertyName = exposeMetadata.propertyName;
                newValueKey = exposeMetadata.propertyName;
              }
            } else if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN || this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
              var exposeMetadata = defaultMetadataStorage.findExposeMetadata(targetType, key2);
              if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
                newValueKey = exposeMetadata.options.name;
              }
            }
          }
          var subValue = void 0;
          if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
            subValue = value[valueKey];
          } else {
            if (value instanceof Map) {
              subValue = value.get(valueKey);
            } else if (value[valueKey] instanceof Function) {
              subValue = value[valueKey]();
            } else {
              subValue = value[valueKey];
            }
          }
          var type = void 0, isSubValueMap = subValue instanceof Map;
          if (targetType && isMap) {
            type = targetType;
          } else if (targetType) {
            var metadata_1 = defaultMetadataStorage.findTypeMetadata(targetType, propertyName);
            if (metadata_1) {
              var options = { newObject: newValue, object: value, property: propertyName };
              var newType = metadata_1.typeFunction ? metadata_1.typeFunction(options) : metadata_1.reflectedType;
              if (metadata_1.options && metadata_1.options.discriminator && metadata_1.options.discriminator.property && metadata_1.options.discriminator.subTypes) {
                if (!(value[valueKey] instanceof Array)) {
                  if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                    type = metadata_1.options.discriminator.subTypes.find(function(subType) {
                      if (subValue && subValue instanceof Object && metadata_1.options.discriminator.property in subValue) {
                        return subType.name === subValue[metadata_1.options.discriminator.property];
                      }
                    });
                    type === void 0 ? type = newType : type = type.value;
                    if (!metadata_1.options.keepDiscriminatorProperty) {
                      if (subValue && subValue instanceof Object && metadata_1.options.discriminator.property in subValue) {
                        delete subValue[metadata_1.options.discriminator.property];
                      }
                    }
                  }
                  if (this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
                    type = subValue.constructor;
                  }
                  if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN) {
                    if (subValue) {
                      subValue[metadata_1.options.discriminator.property] = metadata_1.options.discriminator.subTypes.find(function(subType) {
                        return subType.value === subValue.constructor;
                      }).name;
                    }
                  }
                } else {
                  type = metadata_1;
                }
              } else {
                type = newType;
              }
              isSubValueMap = isSubValueMap || metadata_1.reflectedType === Map;
            } else if (this_1.options.targetMaps) {
              this_1.options.targetMaps.filter(function(map) {
                return map.target === targetType && !!map.properties[propertyName];
              }).forEach(function(map) {
                return type = map.properties[propertyName];
              });
            } else if (this_1.options.enableImplicitConversion && this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
              var reflectedType = Reflect.getMetadata("design:type", targetType.prototype, propertyName);
              if (reflectedType) {
                type = reflectedType;
              }
            }
          }
          var arrayType_1 = Array.isArray(value[valueKey]) ? this_1.getReflectedType(targetType, propertyName) : void 0;
          var subSource = source ? source[valueKey] : void 0;
          if (newValue.constructor.prototype) {
            var descriptor = Object.getOwnPropertyDescriptor(newValue.constructor.prototype, newValueKey);
            if ((this_1.transformationType === TransformationType.PLAIN_TO_CLASS || this_1.transformationType === TransformationType.CLASS_TO_CLASS) && // eslint-disable-next-line @typescript-eslint/unbound-method
            (descriptor && !descriptor.set || newValue[newValueKey] instanceof Function))
              return "continue";
          }
          if (!this_1.options.enableCircularCheck || !this_1.isCircular(subValue)) {
            var transformKey = this_1.transformationType === TransformationType.PLAIN_TO_CLASS ? newValueKey : key2;
            var finalValue = void 0;
            if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN) {
              finalValue = value[transformKey];
              finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
              finalValue = value[transformKey] === finalValue ? subValue : finalValue;
              finalValue = this_1.transform(subSource, finalValue, type, arrayType_1, isSubValueMap, level + 1);
            } else {
              if (subValue === void 0 && this_1.options.exposeDefaultValues) {
                finalValue = newValue[newValueKey];
              } else {
                finalValue = this_1.transform(subSource, subValue, type, arrayType_1, isSubValueMap, level + 1);
                finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
              }
            }
            if (finalValue !== void 0 || this_1.options.exposeUnsetFields) {
              if (newValue instanceof Map) {
                newValue.set(newValueKey, finalValue);
              } else {
                newValue[newValueKey] = finalValue;
              }
            }
          } else if (this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
            var finalValue = subValue;
            finalValue = this_1.applyCustomTransformations(finalValue, targetType, key2, value, this_1.transformationType);
            if (finalValue !== void 0 || this_1.options.exposeUnsetFields) {
              if (newValue instanceof Map) {
                newValue.set(newValueKey, finalValue);
              } else {
                newValue[newValueKey] = finalValue;
              }
            }
          }
        };
        var this_1 = this;
        for (var _i = 0, keys_1 = keys2; _i < keys_1.length; _i++) {
          var key = keys_1[_i];
          _loop_1(key);
        }
        if (this.options.enableCircularCheck) {
          this.recursionStack.delete(value);
        }
        return newValue;
      } else {
        return value;
      }
    };
    TransformOperationExecutor2.prototype.applyCustomTransformations = function(value, target, key, obj, transformationType) {
      var _this = this;
      var metadatas = defaultMetadataStorage.findTransformMetadatas(target, key, this.transformationType);
      if (this.options.version !== void 0) {
        metadatas = metadatas.filter(function(metadata) {
          if (!metadata.options)
            return true;
          return _this.checkVersion(metadata.options.since, metadata.options.until);
        });
      }
      if (this.options.groups && this.options.groups.length) {
        metadatas = metadatas.filter(function(metadata) {
          if (!metadata.options)
            return true;
          return _this.checkGroups(metadata.options.groups);
        });
      } else {
        metadatas = metadatas.filter(function(metadata) {
          return !metadata.options || !metadata.options.groups || !metadata.options.groups.length;
        });
      }
      metadatas.forEach(function(metadata) {
        value = metadata.transformFn({ value, key, obj, type: transformationType, options: _this.options });
      });
      return value;
    };
    TransformOperationExecutor2.prototype.isCircular = function(object) {
      return this.recursionStack.has(object);
    };
    TransformOperationExecutor2.prototype.getReflectedType = function(target, propertyName) {
      if (!target)
        return void 0;
      var meta = defaultMetadataStorage.findTypeMetadata(target, propertyName);
      return meta ? meta.reflectedType : void 0;
    };
    TransformOperationExecutor2.prototype.getKeys = function(target, object, isMap) {
      var _this = this;
      var strategy = defaultMetadataStorage.getStrategy(target);
      if (strategy === "none")
        strategy = this.options.strategy || "exposeAll";
      var keys2 = [];
      if (strategy === "exposeAll" || isMap) {
        if (object instanceof Map) {
          keys2 = Array.from(object.keys());
        } else {
          keys2 = Object.keys(object);
        }
      }
      if (isMap) {
        return keys2;
      }
      if (this.options.ignoreDecorators && this.options.excludeExtraneousValues && target) {
        var exposedProperties = defaultMetadataStorage.getExposedProperties(target, this.transformationType);
        var excludedProperties = defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
        keys2 = __spreadArray(__spreadArray([], exposedProperties, true), excludedProperties, true);
      }
      if (!this.options.ignoreDecorators && target) {
        var exposedProperties = defaultMetadataStorage.getExposedProperties(target, this.transformationType);
        if (this.transformationType === TransformationType.PLAIN_TO_CLASS) {
          exposedProperties = exposedProperties.map(function(key) {
            var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
            if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
              return exposeMetadata.options.name;
            }
            return key;
          });
        }
        if (this.options.excludeExtraneousValues) {
          keys2 = exposedProperties;
        } else {
          keys2 = keys2.concat(exposedProperties);
        }
        var excludedProperties_1 = defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
        if (excludedProperties_1.length > 0) {
          keys2 = keys2.filter(function(key) {
            return !excludedProperties_1.includes(key);
          });
        }
        if (this.options.version !== void 0) {
          keys2 = keys2.filter(function(key) {
            var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
            if (!exposeMetadata || !exposeMetadata.options)
              return true;
            return _this.checkVersion(exposeMetadata.options.since, exposeMetadata.options.until);
          });
        }
        if (this.options.groups && this.options.groups.length) {
          keys2 = keys2.filter(function(key) {
            var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
            if (!exposeMetadata || !exposeMetadata.options)
              return true;
            return _this.checkGroups(exposeMetadata.options.groups);
          });
        } else {
          keys2 = keys2.filter(function(key) {
            var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
            return !exposeMetadata || !exposeMetadata.options || !exposeMetadata.options.groups || !exposeMetadata.options.groups.length;
          });
        }
      }
      if (this.options.excludePrefixes && this.options.excludePrefixes.length) {
        keys2 = keys2.filter(function(key) {
          return _this.options.excludePrefixes.every(function(prefix) {
            return key.substr(0, prefix.length) !== prefix;
          });
        });
      }
      keys2 = keys2.filter(function(key, index, self2) {
        return self2.indexOf(key) === index;
      });
      return keys2;
    };
    TransformOperationExecutor2.prototype.checkVersion = function(since, until) {
      var decision = true;
      if (decision && since)
        decision = this.options.version >= since;
      if (decision && until)
        decision = this.options.version < until;
      return decision;
    };
    TransformOperationExecutor2.prototype.checkGroups = function(groups) {
      if (!groups)
        return true;
      return this.options.groups.some(function(optionGroup) {
        return groups.includes(optionGroup);
      });
    };
    return TransformOperationExecutor2;
  }()
);

// node_modules/class-transformer/esm5/constants/default-options.constant.js
var defaultOptions = {
  enableCircularCheck: false,
  enableImplicitConversion: false,
  excludeExtraneousValues: false,
  excludePrefixes: void 0,
  exposeDefaultValues: false,
  exposeUnsetFields: true,
  groups: void 0,
  ignoreDecorators: false,
  strategy: void 0,
  targetMaps: void 0,
  version: void 0
};

// node_modules/class-transformer/esm5/ClassTransformer.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var ClassTransformer = (
  /** @class */
  function() {
    function ClassTransformer2() {
    }
    ClassTransformer2.prototype.instanceToPlain = function(object, options) {
      var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_PLAIN, __assign(__assign({}, defaultOptions), options));
      return executor.transform(void 0, object, void 0, void 0, void 0, void 0);
    };
    ClassTransformer2.prototype.classToPlainFromExist = function(object, plainObject, options) {
      var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_PLAIN, __assign(__assign({}, defaultOptions), options));
      return executor.transform(plainObject, object, void 0, void 0, void 0, void 0);
    };
    ClassTransformer2.prototype.plainToInstance = function(cls, plain, options) {
      var executor = new TransformOperationExecutor(TransformationType.PLAIN_TO_CLASS, __assign(__assign({}, defaultOptions), options));
      return executor.transform(void 0, plain, cls, void 0, void 0, void 0);
    };
    ClassTransformer2.prototype.plainToClassFromExist = function(clsObject, plain, options) {
      var executor = new TransformOperationExecutor(TransformationType.PLAIN_TO_CLASS, __assign(__assign({}, defaultOptions), options));
      return executor.transform(clsObject, plain, void 0, void 0, void 0, void 0);
    };
    ClassTransformer2.prototype.instanceToInstance = function(object, options) {
      var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_CLASS, __assign(__assign({}, defaultOptions), options));
      return executor.transform(void 0, object, void 0, void 0, void 0, void 0);
    };
    ClassTransformer2.prototype.classToClassFromExist = function(object, fromObject, options) {
      var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_CLASS, __assign(__assign({}, defaultOptions), options));
      return executor.transform(fromObject, object, void 0, void 0, void 0, void 0);
    };
    ClassTransformer2.prototype.serialize = function(object, options) {
      return JSON.stringify(this.instanceToPlain(object, options));
    };
    ClassTransformer2.prototype.deserialize = function(cls, json, options) {
      var jsonObject = JSON.parse(json);
      return this.plainToInstance(cls, jsonObject, options);
    };
    ClassTransformer2.prototype.deserializeArray = function(cls, json, options) {
      var jsonObject = JSON.parse(json);
      return this.plainToInstance(cls, jsonObject, options);
    };
    return ClassTransformer2;
  }()
);

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

// node_modules/class-transformer/esm5/index.js
var classTransformer = new ClassTransformer();
function instanceToPlain(object, options) {
  return classTransformer.instanceToPlain(object, options);
}
function plainToInstance(cls, plain, options) {
  return classTransformer.plainToInstance(cls, plain, options);
}

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
var D = function D2(value) {
  return Decimal.fromValue_noAlloc(value);
};
var FC = function(sign, layer, mag) {
  return Decimal.fromComponents(sign, layer, mag);
};
var FC_NN = function FC_NN2(sign, layer, mag) {
  return Decimal.fromComponents_noNormalize(sign, layer, mag);
};
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
  /**
   * Turns the given components into a valid Decimal.
   */
  static fromComponents(sign, layer, mag) {
    return new Decimal().fromComponents(sign, layer, mag);
  }
  /**
   * Turns the given components into a Decimal, but not necessarily a valid one (it's only valid if the components would already create a valid Decimal without normalization). Users of this library should not use this function.
   */
  static fromComponents_noNormalize(sign, layer, mag) {
    return new Decimal().fromComponents_noNormalize(sign, layer, mag);
  }
  /**
   * Turns the mantissa and exponent into a valid Decimal with value mantissa * 10^exponent.
   */
  static fromMantissaExponent(mantissa, exponent) {
    return new Decimal().fromMantissaExponent(mantissa, exponent);
  }
  /**
   * Turns the mantissa and exponent into a Decimal, but not necessarily a valid one. Users of this library should not use this function.
   */
  static fromMantissaExponent_noNormalize(mantissa, exponent) {
    return new Decimal().fromMantissaExponent_noNormalize(mantissa, exponent);
  }
  /**
   * Creates a deep copy of the provided value.
   */
  static fromDecimal(value) {
    return new Decimal().fromDecimal(value);
  }
  /**
   * Converts a floating-point number into a Decimal.
   */
  static fromNumber(value) {
    return new Decimal().fromNumber(value);
  }
  /**
   * Converts a string into a Decimal.
   *
   * If linearhyper4 is true, then strings like "10^^8.5" will use the linear approximation of tetration even for bases <= 10.
   */
  static fromString(value, linearhyper4 = false) {
    return new Decimal().fromString(value, linearhyper4);
  }
  /**
   * The function used by new Decimal() to create a new Decimal. Accepts a DecimalSource: uses fromNumber if given a number, uses fromString if given a string, and uses fromDecimal if given a Decimal.
   */
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
  /**
   * Absolute value function: returns 'value' if 'value' >= 0, returns the negative of 'value' if 'value' < 0.
   */
  static abs(value) {
    return D(value).abs();
  }
  /**
   * Returns the negative of the given value.
   */
  static neg(value) {
    return D(value).neg();
  }
  /**
   * Returns the negative of the given value.
   */
  static negate(value) {
    return D(value).neg();
  }
  /**
   * Returns the negative of the given value.
   */
  static negated(value) {
    return D(value).neg();
  }
  /**
   * Returns the sign of the given value.
   */
  static sign(value) {
    return D(value).sign;
  }
  /**
   * Returns the sign of the given value.
   */
  static sgn(value) {
    return D(value).sign;
  }
  /**
   * Rounds the value to the nearest integer.
   */
  static round(value) {
    return D(value).round();
  }
  /**
   * "Rounds" the value to the nearest integer that's less than or equal to it.
   */
  static floor(value) {
    return D(value).floor();
  }
  /**
   * "Rounds" the value to the nearest integer that's greater than or equal to it.
   */
  static ceil(value) {
    return D(value).ceil();
  }
  /**
   * Extracts the integer part of the Decimal and returns it. Behaves like floor on positive numbers, but behaves like ceiling on negative numbers.
   */
  static trunc(value) {
    return D(value).trunc();
  }
  /**
   * Addition: returns the sum of the two Decimals.
   */
  static add(value, other) {
    return D(value).add(other);
  }
  /**
   * Addition: returns the sum of the two Decimals.
   */
  static plus(value, other) {
    return D(value).add(other);
  }
  /**
   * Subtraction: returns the difference between 'value' and 'other'.
   */
  static sub(value, other) {
    return D(value).sub(other);
  }
  /**
   * Subtraction: returns the difference between 'value' and 'other'.
   */
  static subtract(value, other) {
    return D(value).sub(other);
  }
  /**
   * Subtraction: returns the difference between 'value' and 'other'.
   */
  static minus(value, other) {
    return D(value).sub(other);
  }
  /**
   * Multiplication: returns the product of the two Decimals.
   */
  static mul(value, other) {
    return D(value).mul(other);
  }
  /**
   * Multiplication: returns the product of the two Decimals.
   */
  static multiply(value, other) {
    return D(value).mul(other);
  }
  /**
   * Multiplication: returns the product of the two Decimals.
   */
  static times(value, other) {
    return D(value).mul(other);
  }
  /**
   * Division: returns the quotient of 'value' and 'other'.
   */
  static div(value, other) {
    return D(value).div(other);
  }
  /**
   * Division: returns the quotient of 'value' and 'other'.
   */
  static divide(value, other) {
    return D(value).div(other);
  }
  /**
   * Returns the reciprocal (1 / X) of the given value.
   */
  static recip(value) {
    return D(value).recip();
  }
  /**
   * Returns the reciprocal (1 / X) of the given value.
   */
  static reciprocal(value) {
    return D(value).recip();
  }
  /**
   * Returns the reciprocal (1 / X) of the given value.
   */
  static reciprocate(value) {
    return D(value).reciprocate();
  }
  /**
   * Returns the remainder of 'value' divided by 'other': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
   * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
   */
  static mod(value, other) {
    return D(value).mod(other);
  }
  /**
   * Returns the remainder of 'value' divided by 'other': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
   * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
   */
  static modulo(value, other) {
    return D(value).modulo(other);
  }
  /**
   * Returns the remainder of 'value' divided by 'other': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
   * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
   */
  static modular(value, other) {
    return D(value).modular(other);
  }
  /**
   * Returns 1 if 'value' > 'other', returns -1 if 'value' < 'other', returns 0 if 'value' == 'other'.
   */
  static cmp(value, other) {
    return D(value).cmp(other);
  }
  /**
   * Compares the absolute values of this and value.
   * Returns 1 if |'value'| > |'other'|, returns -1 if |'value'| < |'other'|, returns 0 if |'value'| == |'other'|.
   */
  static cmpabs(value, other) {
    return D(value).cmpabs(other);
  }
  /**
   * Returns 1 if 'value' > 'other', returns -1 if 'value' < 'other', returns 0 if 'value' == 'other'.
   */
  static compare(value, other) {
    return D(value).cmp(other);
  }
  /**
   * Returns true if the given value is an NaN value.
   */
  static isNaN(value) {
    value = D(value);
    return isNaN(value.sign) || isNaN(value.layer) || isNaN(value.mag);
  }
  /**
   * Returns true if the given value is finite (by Decimal standards, not by floating point standards - a humongous Decimal like 10^^10^100 is still finite!)
   */
  static isFinite(value) {
    value = D(value);
    return isFinite(value.sign) && isFinite(value.layer) && isFinite(value.mag);
  }
  /**
   * The Decimal equivalent of ==. Returns true if 'value' and 'other' have equal values.
   */
  static eq(value, other) {
    return D(value).eq(other);
  }
  /**
   * Returns true if 'value' and 'other' have equal values.
   */
  static equals(value, other) {
    return D(value).eq(other);
  }
  /**
   * The Decimal equivalent of !=. Returns true if 'value' and 'other' do not have equal values.
   */
  static neq(value, other) {
    return D(value).neq(other);
  }
  /**
   * Returns true if 'value' and 'other' do not have equal values.
   */
  static notEquals(value, other) {
    return D(value).notEquals(other);
  }
  /**
   * The Decimal equivalent of <. Returns true if 'value' is less than 'other'.
   */
  static lt(value, other) {
    return D(value).lt(other);
  }
  /**
   * The Decimal equivalent of <=. Returns true if 'value' is less than or equal to 'other'.
   */
  static lte(value, other) {
    return D(value).lte(other);
  }
  /**
   * The Decimal equivalent of >. Returns true if 'value' is greater than 'other'.
   */
  static gt(value, other) {
    return D(value).gt(other);
  }
  /**
   * The Decimal equivalent of >=. Returns true if 'value' is greater than or equal to 'other'.
   */
  static gte(value, other) {
    return D(value).gte(other);
  }
  /**
   * Returns whichever of 'value' and 'other' is higher.
   */
  static max(value, other) {
    return D(value).max(other);
  }
  /**
   * Returns whichever of 'value' and 'other' is lower.
   */
  static min(value, other) {
    return D(value).min(other);
  }
  /**
   * Returns whichever of 'value' and 'other' has a larger absolute value.
   */
  static minabs(value, other) {
    return D(value).minabs(other);
  }
  /**
   * Returns whichever of 'value' and 'other' has a smaller absolute value.
   */
  static maxabs(value, other) {
    return D(value).maxabs(other);
  }
  /**
   * A combination of minimum and maximum: the value returned by clamp is normally 'value', but it won't go below 'min' and it won't go above 'max'.
   * Therefore, if 'value' < 'min', then 'min' is returned, and if 'value' > 'max', then 'max' is returned.
   */
  static clamp(value, min, max) {
    return D(value).clamp(min, max);
  }
  /**
   * Returns 'value', unless 'value' is less than 'min', in which case 'min' is returned.
   */
  static clampMin(value, min) {
    return D(value).clampMin(min);
  }
  /**
   * Returns 'value', unless 'value' is greater than 'max', in which case 'max' is returned.
   */
  static clampMax(value, max) {
    return D(value).clampMax(max);
  }
  /**
   * Returns 1 if 'value' is greater than 'other', returns -1 if 'value' is less than 'other', returns 0 if 'value' is equal to 'other'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static cmp_tolerance(value, other, tolerance) {
    return D(value).cmp_tolerance(other, tolerance);
  }
  /**
   * Returns 1 if 'value' is greater than 'other', returns -1 if 'value' is less than 'other', returns 0 if 'value' is equal to 'other'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static compare_tolerance(value, other, tolerance) {
    return D(value).cmp_tolerance(other, tolerance);
  }
  /**
   * Tests whether two Decimals are approximately equal, up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static eq_tolerance(value, other, tolerance) {
    return D(value).eq_tolerance(other, tolerance);
  }
  /**
   * Tests whether two Decimals are approximately equal, up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static equals_tolerance(value, other, tolerance) {
    return D(value).eq_tolerance(other, tolerance);
  }
  /**
   * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static neq_tolerance(value, other, tolerance) {
    return D(value).neq_tolerance(other, tolerance);
  }
  /**
   * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static notEquals_tolerance(value, other, tolerance) {
    return D(value).notEquals_tolerance(other, tolerance);
  }
  /**
   * Returns true if 'value' is less than 'other'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static lt_tolerance(value, other, tolerance) {
    return D(value).lt_tolerance(other, tolerance);
  }
  /**
   * Returns true if 'value' is less than or equal to 'other'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static lte_tolerance(value, other, tolerance) {
    return D(value).lte_tolerance(other, tolerance);
  }
  /**
   * Returns true if 'value' is greater than 'other'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static gt_tolerance(value, other, tolerance) {
    return D(value).gt_tolerance(other, tolerance);
  }
  /**
   * Returns true if 'value' is greater than or equal to 'other'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  static gte_tolerance(value, other, tolerance) {
    return D(value).gte_tolerance(other, tolerance);
  }
  /**
   * "Positive log10": Returns the base-10 logarithm of nonnegative Decimals, but returns 0 for negative Decimals.
   */
  static pLog10(value) {
    return D(value).pLog10();
  }
  /**
   * Returns the base-10 logarithm of abs('value').
   */
  static absLog10(value) {
    return D(value).absLog10();
  }
  /**
   * Base-10 logarithm: returns the Decimal X such that 10^X = 'value'.
   * For numbers above layer 0, this is equivalent to subtracting 1 from layer and normalizing.
   */
  static log10(value) {
    return D(value).log10();
  }
  /**
   * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'value'.
   */
  static log(value, base) {
    return D(value).log(base);
  }
  /**
   * Base-2 logarithm: returns the Decimal X such that 2^X = 'value'.
   */
  static log2(value) {
    return D(value).log2();
  }
  /**
   * Base-e logarithm, also known as the "natural" logarithm: returns the Decimal X such that e^X = 'value'.
   */
  static ln(value) {
    return D(value).ln();
  }
  /**
   * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'value'.
   */
  static logarithm(value, base) {
    return D(value).logarithm(base);
  }
  /**
   * Exponentiation: Returns the result of 'value' ^ 'other' (often written as 'value' ** 'other' in programming languages).
   */
  static pow(value, other) {
    return D(value).pow(other);
  }
  /**
   * Raises 10 to the power of 'value', i.e. (10^'value'). For positive numbers above 1, this is equivalent to adding 1 to the value's layer and normalizing.
   */
  static pow10(value) {
    return D(value).pow10();
  }
  /**
   * Roots are one of the inverses of exponentiation: this function finds the Decimal X such that X ^ 'other' = 'value'.
   * Equivalent to 'value' ^ (1 / 'other'), which is written here as value.pow(other.recip()).
   */
  static root(value, other) {
    return D(value).root(other);
  }
  /**
   * For positive integers, X factorial (written as X!) equals X * (X - 1) * (X - 2) *... * 3 * 2 * 1. 0! equals 1.
   * This can be extended to real numbers (except for negative integers) via the gamma function, which is what this function does.
   */
  static factorial(value, _other) {
    return D(value).factorial();
  }
  /**
   * The gamma function extends the idea of factorials to non-whole numbers using some calculus.
   * Gamma(x) is defined as the integral of t^(x-1) * e^-t dt from t = 0 to t = infinity,
   * and gamma(x) = (x - 1)! for nonnegative integer x, so the factorial for non-whole numbers is defined using the gamma function.
   */
  static gamma(value, _other) {
    return D(value).gamma();
  }
  /**
   * Returns the natural (base-e) logarithm of Gamma('value').
   */
  static lngamma(value, _other) {
    return D(value).lngamma();
  }
  /**
   * Base-e exponentiation: returns e^'value'.
   */
  static exp(value) {
    return D(value).exp();
  }
  /**
   * Squaring a number means multiplying it by itself, a.k.a. raising it to the second power.
   */
  static sqr(value) {
    return D(value).sqr();
  }
  /**
   * Square root: finds the Decimal X such that X * X, a.k.a X^2, equals 'value'. Equivalent to X^(1/2).
   */
  static sqrt(value) {
    return D(value).sqrt();
  }
  /**
   * Cubing a number means raising it to the third power.
   */
  static cube(value) {
    return D(value).cube();
  }
  /**
   * Cube root: finds the Decimal X such that X^3 equals 'value'. Equivalent to X^(1/3).
   */
  static cbrt(value) {
    return D(value).cbrt();
  }
  /**
   *
   * Tetration: The result of exponentiating 'value' to 'value' 'height' times in a row.  https://en.wikipedia.org/wiki/Tetration
   *
   * If payload != 1, then this is 'iterated exponentiation', the result of exping 'payload' to base 'value' 'height' times. https://andydude.github.io/tetration/archives/tetration2/ident.html
   *
   * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
  static tetrate(value, height = 2, payload = FC_NN(1, 0, 1), linear = false) {
    return D(value).tetrate(height, payload, linear);
  }
  /**
   * Iterated exponentiation, the result of exping 'payload' to base 'value' 'height' times. https://andydude.github.io/tetration/archives/tetration2/ident.html
   *
   * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   *
   * Identical to tetrate.
   */
  static iteratedexp(value, height = 2, payload = FC_NN(1, 0, 1), linear = false) {
    return D(value).iteratedexp(height, payload, linear);
  }
  /**
   * iterated log/repeated log: The result of applying log(base) 'times' times in a row. Approximately equal to subtracting 'times' from the number's slog representation. Equivalent to tetrating to a negative height.
   *
   * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
  static iteratedlog(value, base = 10, times = 1, linear = false) {
    return D(value).iteratedlog(base, times, linear);
  }
  /**
   * Adds/removes layers from a Decimal, even fractional layers (e.g. its slog10 representation). Very similar to tetrate base 10 and iterated log base 10.
   *
   * Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
  static layeradd10(value, diff, linear = false) {
    return D(value).layeradd10(diff, linear);
  }
  /**
   * layeradd: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 'base' and iterated log base 'base'.
   *
   * Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
  static layeradd(value, diff, base = 10, linear = false) {
    return D(value).layeradd(diff, base, linear);
  }
  /**
   * Super-logarithm, one of tetration's inverses, tells you what size power tower you'd have to tetrate 'base' to to get 'value'. https://en.wikipedia.org/wiki/Super-logarithm
   *
   * By definition, will never be higher than 1.8e308 in break_eternity.js, since a power tower 1.8e308 numbers tall is the largest representable number.
   *
   * Accepts a number of iterations (default is 100), and use binary search to, after making an initial guess, hone in on the true value, assuming tetration as the ground truth.
   *
   * Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
  static slog(value, base = 10, linear = false) {
    return D(value).slog(base, 100, linear);
  }
  /**
   * The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
   * https://en.wikipedia.org/wiki/Lambert_W_function
   */
  static lambertw(value) {
    return D(value).lambertw();
  }
  /**
   * The super square-root function - what number, tetrated to height 2, equals 'value'? https://en.wikipedia.org/wiki/Tetration#Super-root
   */
  static ssqrt(value) {
    return D(value).ssqrt();
  }
  /**
   * Super-root, one of tetration's inverses - what number, tetrated to height 'degree', equals 'value'? https://en.wikipedia.org/wiki/Tetration#Super-root
   *
   * Only works with the linear approximation of tetration, as starting with analytic and then switching to linear would result in inconsistent behavior for super-roots.
   * This only matters for non-integer degrees.
   */
  static linear_sroot(value, degree) {
    return D(value).linear_sroot(degree);
  }
  /**
   * Pentation/pentate: The result of tetrating 'height' times in a row. An absurdly strong operator - Decimal.pentate(2, 4.28) and Decimal.pentate(10, 2.37) are already too huge for break_eternity.js!
   * https://en.wikipedia.org/wiki/Pentation
   *
   * Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   *
   * For non-whole pentation heights, the linear approximation of pentation is always used, as there is no defined analytic approximation of pentation.
   */
  static pentate(value, height = 2, payload = FC_NN(1, 0, 1), linear = false) {
    return D(value).pentate(height, payload, linear);
  }
  /**
   * The sine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
   */
  static sin(value) {
    return D(value).sin();
  }
  /**
   * The cosine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
   */
  static cos(value) {
    return D(value).cos();
  }
  /**
   * The tangent function, equal to sine divided by cosine. Behaves periodically with period pi.
   */
  static tan(value) {
    return D(value).tan();
  }
  /**
   * The arcsine function, the inverse of the sine function.
   */
  static asin(value) {
    return D(value).asin();
  }
  /**
   * The arccosine function, the inverse of the cosine function.
   */
  static acos(value) {
    return D(value).acos();
  }
  /**
   * The arctangent function, the inverse of the tangent function.
   */
  static atan(value) {
    return D(value).atan();
  }
  /**
   * Hyperbolic sine: sinh(X) = (e^x - e^-x)/2.
   */
  static sinh(value) {
    return D(value).sinh();
  }
  /**
   * Hyperbolic cosine: cosh(x) = (e^x + e^-x)/2.
   */
  static cosh(value) {
    return D(value).cosh();
  }
  /**
   * Hyperbolic tangent: tanh(x) = sinh(x)/cosh(x).
   */
  static tanh(value) {
    return D(value).tanh();
  }
  /**
   * Hyperbolic arcsine, the inverse of hyperbolic sine.
   */
  static asinh(value) {
    return D(value).asinh();
  }
  /**
   * Hyperbolic arccosine, the inverse of hyperbolic cosine.
   */
  static acosh(value) {
    return D(value).acosh();
  }
  /**
   * Hyperbolic arcctangent, the inverse of hyperbolic tangent.
   */
  static atanh(value) {
    return D(value).atanh();
  }
  /**
   * If you're willing to spend 'resourcesAvailable' and want to buy something
   * with exponentially increasing cost each purchase (start at priceStart,
   * multiply by priceRatio, already own currentOwned), how much of it can you buy?
   * Adapted from Trimps source code.
   */
  static affordGeometricSeries(resourcesAvailable, priceStart, priceRatio, currentOwned) {
    return this.affordGeometricSeries_core(
      D(resourcesAvailable),
      D(priceStart),
      D(priceRatio),
      currentOwned
    );
  }
  /**
   * How much resource would it cost to buy (numItems) items if you already have currentOwned,
   * the initial price is priceStart and it multiplies by priceRatio each purchase?
   */
  static sumGeometricSeries(numItems, priceStart, priceRatio, currentOwned) {
    return this.sumGeometricSeries_core(numItems, D(priceStart), D(priceRatio), currentOwned);
  }
  /**
   * If you're willing to spend 'resourcesAvailable' and want to buy something with additively
   * increasing cost each purchase (start at priceStart, add by priceAdd, already own currentOwned),
   * how much of it can you buy?
   */
  static affordArithmeticSeries(resourcesAvailable, priceStart, priceAdd, currentOwned) {
    return this.affordArithmeticSeries_core(
      D(resourcesAvailable),
      D(priceStart),
      D(priceAdd),
      D(currentOwned)
    );
  }
  /**
   * How much resource would it cost to buy (numItems) items if you already have currentOwned,
   * the initial price is priceStart and it adds priceAdd each purchase?
   * Adapted from http://www.mathwords.com/a/arithmetic_series.htm
   */
  static sumArithmeticSeries(numItems, priceStart, priceAdd, currentOwned) {
    return this.sumArithmeticSeries_core(D(numItems), D(priceStart), D(priceAdd), D(currentOwned));
  }
  /**
   * When comparing two purchases that cost (resource) and increase your resource/sec by (deltaRpS),
   * the lowest efficiency score is the better one to purchase.
   * From Frozen Cookies:
   * http://cookieclicker.wikia.com/wiki/Frozen_Cookies_(JavaScript_Add-on)#Efficiency.3F_What.27s_that.3F
   */
  static efficiencyOfPurchase(cost, currentRpS, deltaRpS) {
    return this.efficiencyOfPurchase_core(D(cost), D(currentRpS), D(deltaRpS));
  }
  static randomDecimalForTesting(maxLayers) {
    if (Math.random() * 20 < 1) {
      return FC_NN(0, 0, 0);
    }
    const randomsign = Math.random() > 0.5 ? 1 : -1;
    if (Math.random() * 20 < 1) {
      return FC_NN(randomsign, 0, 1);
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
    return FC(randomsign, layer, randommag);
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
  /**
   * Turns the Decimal into a valid Decimal. This function is meant for internal purposes - users of this library should not need to use normalize.
   *
   * Note: this function mutates the Decimal it is called on.
   */
  normalize() {
    if (this.sign === 0 || this.mag === 0 && this.layer === 0 || this.mag === Number.NEGATIVE_INFINITY && this.layer > 0 && Number.isFinite(this.layer)) {
      this.sign = 0;
      this.mag = 0;
      this.layer = 0;
      return this;
    }
    if (this.layer === 0 && this.mag < 0) {
      this.mag = -this.mag;
      this.sign = -this.sign;
    }
    if (this.mag === Number.POSITIVE_INFINITY || this.layer === Number.POSITIVE_INFINITY || this.mag === Number.NEGATIVE_INFINITY || this.layer === Number.NEGATIVE_INFINITY) {
      if (this.sign == 1) {
        this.mag = Number.POSITIVE_INFINITY;
        this.layer = Number.POSITIVE_INFINITY;
      } else if (this.sign == -1) {
        this.mag = Number.NEGATIVE_INFINITY;
        this.layer = Number.NEGATIVE_INFINITY;
      }
      return this;
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
    if (Number.isNaN(this.sign) || Number.isNaN(this.layer) || Number.isNaN(this.mag)) {
      this.sign = Number.NaN;
      this.layer = Number.NaN;
      this.mag = Number.NaN;
    }
    return this;
  }
  /**
   * Turns the given components into a valid Decimal.
   *
   * Note: this function mutates the Decimal it is called on.
   */
  fromComponents(sign, layer, mag) {
    this.sign = sign;
    this.layer = layer;
    this.mag = mag;
    this.normalize();
    return this;
  }
  /**
   * Turns the given components into a Decimal, but not necessarily a valid one (it's only valid if the components would already create a valid Decimal without normalization). Users of this library should not use this function.
   *
   * Note: this function mutates the Decimal it is called on.
   */
  fromComponents_noNormalize(sign, layer, mag) {
    this.sign = sign;
    this.layer = layer;
    this.mag = mag;
    return this;
  }
  /**
   * Turns the mantissa and exponent into a valid Decimal with value mantissa * 10^exponent.
   *
   * Note: this function mutates the Decimal it is called on.
   */
  fromMantissaExponent(mantissa, exponent) {
    this.layer = 1;
    this.sign = Math.sign(mantissa);
    mantissa = Math.abs(mantissa);
    this.mag = exponent + Math.log10(mantissa);
    this.normalize();
    return this;
  }
  /**
   * Turns the mantissa and exponent into a Decimal, but not necessarily a valid one. Users of this library should not use this function.
   *
   * Note: this function mutates the Decimal it is called on.
   */
  fromMantissaExponent_noNormalize(mantissa, exponent) {
    this.fromMantissaExponent(mantissa, exponent);
    return this;
  }
  /**
   * Turns the Decimal that this function is called on into a deep copy of the provided value.
   *
   * Note: this function mutates the Decimal it is called on.
   */
  fromDecimal(value) {
    this.sign = value.sign;
    this.layer = value.layer;
    this.mag = value.mag;
    return this;
  }
  /**
   * Converts a floating-point number into a Decimal.
   *
   * Note: this function mutates the Decimal it is called on.
   */
  fromNumber(value) {
    this.mag = Math.abs(value);
    this.sign = Math.sign(value);
    this.layer = 0;
    this.normalize();
    return this;
  }
  /**
   * Converts a string into a Decimal.
   *
   * If linearhyper4 is true, then strings like "10^^8.5" will use the linear approximation of tetration even for bases <= 10.
   *
   * Note: this function mutates the Decimal it is called on.
   */
  fromString(value, linearhyper4 = false) {
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
        const result = Decimal.pentate(base2, height2, payload, linearhyper4);
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
        const result = Decimal.tetrate(base2, height2, payload, linearhyper4);
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
        const result = Decimal.tetrate(base, height, payload, linearhyper4);
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
        const result = Decimal.tetrate(base, height, payload, linearhyper4);
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
        const result = Decimal.tetrate(base, height, payload, linearhyper4);
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
        const result = Decimal.mul(FC(1, 2, exponent), D(mantissa));
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
  /**
   * The function used by new Decimal() to create a new Decimal. Accepts a DecimalSource: uses fromNumber if given a number, uses fromString if given a string, and uses fromDecimal if given a Decimal.
   *
   * Note: this function mutates the Decimal it is called on.
   */
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
  /**
   * Returns the numeric value of the Decimal it's called on. Will return Infinity (or -Infinity for negatives) for Decimals that are larger than Number.MAX_VALUE.
   */
  toNumber() {
    if (this.mag === Number.POSITIVE_INFINITY && this.layer === Number.POSITIVE_INFINITY && this.sign === 1) {
      return Number.POSITIVE_INFINITY;
    }
    if (this.mag === Number.NEGATIVE_INFINITY && this.layer === Number.NEGATIVE_INFINITY && this.sign === -1) {
      return Number.NEGATIVE_INFINITY;
    }
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
  /**
   * Returns a string representation of the Decimal it's called on.
   * This string is written as a plain number for most layer 0 numbers, in scientific notation for layer 1 numbers (and layer 0 numbers below 1e-6),
   * in "ee...X" form for numbers from layers 2 to 5, and in (e^N)X form for layer > 5.
   */
  toString() {
    if (isNaN(this.layer) || isNaN(this.sign) || isNaN(this.mag)) {
      return "NaN";
    }
    if (this.mag === Number.POSITIVE_INFINITY || this.layer === Number.POSITIVE_INFINITY || this.mag === Number.NEGATIVE_INFINITY || this.layer === Number.NEGATIVE_INFINITY) {
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
  /**
   * Absolute value function: returns 'this' if 'this' >= 0, returns the negative of 'this' if this < 0.
   */
  abs() {
    return FC_NN(this.sign === 0 ? 0 : 1, this.layer, this.mag);
  }
  /**
   * Negates the Decimal it's called on: in other words, when given X, returns -X.
   */
  neg() {
    return FC_NN(-this.sign, this.layer, this.mag);
  }
  /**
   * Negates the Decimal it's called on: in other words, when given X, returns -X.
   */
  negate() {
    return this.neg();
  }
  /**
   * Negates the Decimal it's called on: in other words, when given X, returns -X.
   */
  negated() {
    return this.neg();
  }
  // public sign () {
  //     return this.sign;
  //   }
  /**
   * Returns the sign of the Decimal it's called on. (Though, since sign is a public data member of Decimal, you might as well just call .sign instead of .sgn())
   */
  sgn() {
    return this.sign;
  }
  /**
   * Rounds the Decimal it's called on to the nearest integer.
   */
  round() {
    if (this.mag < 0) {
      return Decimal.dZero;
    }
    if (this.layer === 0) {
      return FC(this.sign, 0, Math.round(this.mag));
    }
    return this;
  }
  /**
   * "Rounds" the Decimal it's called on to the nearest integer that's less than or equal to it.
   */
  floor() {
    if (this.mag < 0) {
      if (this.sign === -1)
        return Decimal.dNegOne;
      else
        return Decimal.dZero;
    }
    if (this.sign === -1)
      return this.neg().ceil().neg();
    if (this.layer === 0) {
      return FC(this.sign, 0, Math.floor(this.mag));
    }
    return this;
  }
  /**
   * "Rounds" the Decimal it's called on to the nearest integer that's greater than or equal to it.
   */
  ceil() {
    if (this.mag < 0) {
      if (this.sign === 1)
        return Decimal.dOne;
      else
        return Decimal.dZero;
    }
    if (this.sign === -1)
      return this.neg().floor().neg();
    if (this.layer === 0) {
      return FC(this.sign, 0, Math.ceil(this.mag));
    }
    return this;
  }
  /**
   * Extracts the integer part of the Decimal and returns it. Behaves like floor on positive numbers, but behaves like ceiling on negative numbers.
   */
  trunc() {
    if (this.mag < 0) {
      return Decimal.dZero;
    }
    if (this.layer === 0) {
      return FC(this.sign, 0, Math.trunc(this.mag));
    }
    return this;
  }
  /**
   * Addition: returns the sum of 'this' and 'value'.
   */
  add(value) {
    const decimal = D(value);
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
      return FC_NN(0, 0, 0);
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
        return FC(Math.sign(mantissa), 1, b.mag + Math.log10(Math.abs(mantissa)));
      }
    }
    if (layera === 1 && layerb === 0) {
      if (Math.abs(a.mag - Math.log10(b.mag)) > MAX_SIGNIFICANT_DIGITS) {
        return a;
      } else {
        const magdiff = Math.pow(10, a.mag - Math.log10(b.mag));
        const mantissa = b.sign + a.sign * magdiff;
        return FC(Math.sign(mantissa), 1, Math.log10(b.mag) + Math.log10(Math.abs(mantissa)));
      }
    }
    if (Math.abs(a.mag - b.mag) > MAX_SIGNIFICANT_DIGITS) {
      return a;
    } else {
      const magdiff = Math.pow(10, a.mag - b.mag);
      const mantissa = b.sign + a.sign * magdiff;
      return FC(Math.sign(mantissa), 1, b.mag + Math.log10(Math.abs(mantissa)));
    }
    throw Error("Bad arguments to add: " + this + ", " + value);
  }
  /**
   * Addition: returns the sum of 'this' and 'value'.
   */
  plus(value) {
    return this.add(value);
  }
  /**
   * Subtraction: returns the difference between 'this' and 'value'.
   */
  sub(value) {
    return this.add(D(value).neg());
  }
  /**
   * Subtraction: returns the difference between 'this' and 'value'.
   */
  subtract(value) {
    return this.sub(value);
  }
  /**
   * Subtraction: returns the difference between 'this' and 'value'.
   */
  minus(value) {
    return this.sub(value);
  }
  /**
   * Multiplication: returns the product of 'this' and 'value'.
   */
  mul(value) {
    const decimal = D(value);
    if (!Number.isFinite(this.layer)) {
      return this;
    }
    if (!Number.isFinite(decimal.layer)) {
      return decimal;
    }
    if (this.sign === 0 || decimal.sign === 0) {
      return FC_NN(0, 0, 0);
    }
    if (this.layer === decimal.layer && this.mag === -decimal.mag) {
      return FC_NN(this.sign * decimal.sign, 0, 1);
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
      return FC(a.sign * b.sign, a.layer, a.mag);
    }
    if (a.layer === 1 && b.layer === 0) {
      return FC(a.sign * b.sign, 1, a.mag + Math.log10(b.mag));
    }
    if (a.layer === 1 && b.layer === 1) {
      return FC(a.sign * b.sign, 1, a.mag + b.mag);
    }
    if (a.layer === 2 && b.layer === 1) {
      const newmag = FC(Math.sign(a.mag), a.layer - 1, Math.abs(a.mag)).add(
        FC(Math.sign(b.mag), b.layer - 1, Math.abs(b.mag))
      );
      return FC(a.sign * b.sign, newmag.layer + 1, newmag.sign * newmag.mag);
    }
    if (a.layer === 2 && b.layer === 2) {
      const newmag = FC(Math.sign(a.mag), a.layer - 1, Math.abs(a.mag)).add(
        FC(Math.sign(b.mag), b.layer - 1, Math.abs(b.mag))
      );
      return FC(a.sign * b.sign, newmag.layer + 1, newmag.sign * newmag.mag);
    }
    throw Error("Bad arguments to mul: " + this + ", " + value);
  }
  /**
   * Multiplication: returns the product of 'this' and 'value'.
   */
  multiply(value) {
    return this.mul(value);
  }
  /**
   * Multiplication: returns the product of 'this' and 'value'.
   */
  times(value) {
    return this.mul(value);
  }
  /**
   * Division: returns the quotient of 'this' and 'value'.
   */
  div(value) {
    const decimal = D(value);
    return this.mul(decimal.recip());
  }
  /**
   * Division: returns the quotient of 'this' and 'value'.
   */
  divide(value) {
    return this.div(value);
  }
  /**
   * Division: returns the quotient of 'this' and 'value'.
   */
  divideBy(value) {
    return this.div(value);
  }
  /**
   * Division: returns the quotient of 'this' and 'value'.
   */
  dividedBy(value) {
    return this.div(value);
  }
  /**
   * Returns the reciprocal (1 / X) of the Decimal it's called on.
   */
  recip() {
    if (this.mag === 0) {
      return Decimal.dNaN;
    } else if (this.layer === 0) {
      return FC(this.sign, 0, 1 / this.mag);
    } else {
      return FC(this.sign, this.layer, -this.mag);
    }
  }
  /**
   * Returns the reciprocal (1 / X) of the Decimal it's called on.
   */
  reciprocal() {
    return this.recip();
  }
  /**
   * Returns the reciprocal (1 / X) of the Decimal it's called on.
   */
  reciprocate() {
    return this.recip();
  }
  /**
   * Returns the remainder of 'this' divided by 'value': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
   * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
   */
  // Taken from OmegaNum.js, with a couple touch-ups
  mod(value) {
    const decimal = D(value).abs();
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
  /**
   * Returns the remainder of 'this' divided by 'value': for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
   * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
   */
  modulo(value) {
    return this.mod(value);
  }
  /**
   * Returns the remainder of this / value: for example, 5 mod 2 = 1, because the remainder of 5 / 2 is 1.
   * Uses the "truncated division" modulo, which is the same as JavaScript's native modulo operator (%).
   */
  modular(value) {
    return this.mod(value);
  }
  /**
   * Returns 1 if 'this' > 'value', returns -1 if 'this' < 'value', returns 0 if 'this' == 'value'.
   */
  cmp(value) {
    const decimal = D(value);
    if (this.sign > decimal.sign) {
      return 1;
    }
    if (this.sign < decimal.sign) {
      return -1;
    }
    return this.sign * this.cmpabs(value);
  }
  /**
   * Compares the absolute values of this and value.
   * Returns 1 if |'this'| > |'value'|, returns -1 if |'this'| < |'value'|, returns 0 if |'this'| == |'value'|.
   */
  cmpabs(value) {
    const decimal = D(value);
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
  /**
   * Returns 1 if 'this' > 'value', returns -1 if 'this' < 'value', returns 0 if 'this' == 'value'.
   */
  compare(value) {
    return this.cmp(value);
  }
  /**
   * Returns true if the Decimal is an NaN value.
   */
  isNan() {
    return isNaN(this.sign) || isNaN(this.layer) || isNaN(this.mag);
  }
  /**
   * Returns true if the Decimal is finite (by Decimal standards, not by floating point standards - a humongous Decimal like 10^^10^100 is still finite!)
   */
  isFinite() {
    return isFinite(this.sign) && isFinite(this.layer) && isFinite(this.mag);
  }
  /**
   * The Decimal equivalent of ==. Returns true if 'this' and 'value' have equal values.
   */
  eq(value) {
    const decimal = D(value);
    return this.sign === decimal.sign && this.layer === decimal.layer && this.mag === decimal.mag;
  }
  /**
   * Returns true if 'this' and 'value' have equal values.
   */
  equals(value) {
    return this.eq(value);
  }
  /**
   * The Decimal equivalent of !=. Returns true if 'this' and 'value' do not have equal values.
   */
  neq(value) {
    return !this.eq(value);
  }
  /**
   * Returns true if 'this' and 'value' do not have equal values.
   */
  notEquals(value) {
    return this.neq(value);
  }
  /**
   * The Decimal equivalent of <. Returns true if 'this' is less than 'value'.
   */
  lt(value) {
    return this.cmp(value) === -1;
  }
  /**
   * The Decimal equivalent of <=. Returns true if 'this' is less than or equal to 'value'.
   */
  lte(value) {
    return !this.gt(value);
  }
  /**
   * The Decimal equivalent of >. Returns true if 'this' is greater than 'value'.
   */
  gt(value) {
    return this.cmp(value) === 1;
  }
  /**
   * The Decimal equivalent of >=. Returns true if 'this' is greater than or equal to 'value'.
   */
  gte(value) {
    return !this.lt(value);
  }
  /**
   * Returns whichever of 'this' and 'value' is higher.
   */
  max(value) {
    const decimal = D(value);
    return this.lt(decimal) ? decimal : this;
  }
  /**
   * Returns whichever of 'this' and 'value' is lower.
   */
  min(value) {
    const decimal = D(value);
    return this.gt(decimal) ? decimal : this;
  }
  /**
   * Returns whichever of 'this' and 'value' has a larger absolute value.
   */
  maxabs(value) {
    const decimal = D(value);
    return this.cmpabs(decimal) < 0 ? decimal : this;
  }
  /**
   * Returns whichever of 'this' and 'value' has a smaller absolute value.
   */
  minabs(value) {
    const decimal = D(value);
    return this.cmpabs(decimal) > 0 ? decimal : this;
  }
  /**
   * A combination of minimum and maximum: the value returned by clamp is normally 'this', but it won't go below 'min' and it won't go above 'max'.
   * Therefore, if 'this' < 'min', then 'min' is returned, and if 'this' > 'max', then 'max' is returned.
   */
  clamp(min, max) {
    return this.max(min).min(max);
  }
  /**
   * Returns 'this', unless 'this' is less than 'min', in which case 'min' is returned.
   */
  clampMin(min) {
    return this.max(min);
  }
  /**
   * Returns 'this', unless 'this' is greater than 'max', in which case 'max' is returned.
   */
  clampMax(max) {
    return this.min(max);
  }
  /**
   * Returns 1 if 'this' is greater than 'value', returns -1 if 'this' is less than 'value', returns 0 if 'this' is equal to 'value'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  cmp_tolerance(value, tolerance) {
    const decimal = D(value);
    return this.eq_tolerance(decimal, tolerance) ? 0 : this.cmp(decimal);
  }
  /**
   * Returns 1 if 'this' is greater than 'value', returns -1 if 'this' is less than 'value', returns 0 if 'this' is equal to 'value'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  compare_tolerance(value, tolerance) {
    return this.cmp_tolerance(value, tolerance);
  }
  /**
   * Tests whether two Decimals are approximately equal, up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  eq_tolerance(value, tolerance) {
    const decimal = D(value);
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
  /**
   * Tests whether two Decimals are approximately equal, up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  equals_tolerance(value, tolerance) {
    return this.eq_tolerance(value, tolerance);
  }
  /**
   * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  neq_tolerance(value, tolerance) {
    return !this.eq_tolerance(value, tolerance);
  }
  /**
   * Tests whether two Decimals are not approximately equal, up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  notEquals_tolerance(value, tolerance) {
    return this.neq_tolerance(value, tolerance);
  }
  /**
   * Returns true if 'this' is less than 'value'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  lt_tolerance(value, tolerance) {
    const decimal = D(value);
    return !this.eq_tolerance(decimal, tolerance) && this.lt(decimal);
  }
  /**
   * Returns true if 'this' is less than or equal to 'value'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  lte_tolerance(value, tolerance) {
    const decimal = D(value);
    return this.eq_tolerance(decimal, tolerance) || this.lt(decimal);
  }
  /**
   * Returns true if 'this' is greater than 'value'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  gt_tolerance(value, tolerance) {
    const decimal = D(value);
    return !this.eq_tolerance(decimal, tolerance) && this.gt(decimal);
  }
  /**
   * Returns true if 'this' is greater than or equal to 'value'.
   * However, the two Decimals are considered equal if they're approximately equal up to a certain tolerance.
   * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
   * For example, if you put in 1e-9, then any number closer to the
   * larger number than (larger number)*1e-9 will be considered equal.
   */
  gte_tolerance(value, tolerance) {
    const decimal = D(value);
    return this.eq_tolerance(decimal, tolerance) || this.gt(decimal);
  }
  /**
   * "Positive log10": Returns the base-10 logarithm of nonnegative Decimals, but returns 0 for negative Decimals.
   */
  pLog10() {
    if (this.lt(Decimal.dZero)) {
      return Decimal.dZero;
    }
    return this.log10();
  }
  /**
   * Returns the base-10 logarithm of abs('this').
   */
  absLog10() {
    if (this.sign === 0) {
      return Decimal.dNaN;
    } else if (this.layer > 0) {
      return FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
    } else {
      return FC(1, 0, Math.log10(this.mag));
    }
  }
  /**
   * Base-10 logarithm: returns the Decimal X such that 10^X = 'this'.
   * For numbers above layer 0, this is equivalent to subtracting 1 from layer and normalizing.
   */
  log10() {
    if (this.sign <= 0) {
      return Decimal.dNaN;
    } else if (this.layer > 0) {
      return FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
    } else {
      return FC(this.sign, 0, Math.log10(this.mag));
    }
  }
  /**
   * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'this'.
   */
  log(base) {
    base = D(base);
    if (this.sign <= 0) {
      return Decimal.dNaN;
    }
    if (base.sign <= 0) {
      return Decimal.dNaN;
    }
    if (base.sign === 1 && base.layer === 0 && base.mag === 1) {
      return Decimal.dNaN;
    } else if (this.layer === 0 && base.layer === 0) {
      return FC(this.sign, 0, Math.log(this.mag) / Math.log(base.mag));
    }
    return Decimal.div(this.log10(), base.log10());
  }
  /**
   * Base-2 logarithm: returns the Decimal X such that 2^X = 'this'.
   */
  log2() {
    if (this.sign <= 0) {
      return Decimal.dNaN;
    } else if (this.layer === 0) {
      return FC(this.sign, 0, Math.log2(this.mag));
    } else if (this.layer === 1) {
      return FC(Math.sign(this.mag), 0, Math.abs(this.mag) * 3.321928094887362);
    } else if (this.layer === 2) {
      return FC(Math.sign(this.mag), 1, Math.abs(this.mag) + 0.5213902276543247);
    } else {
      return FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
    }
  }
  /**
   * Base-e logarithm, also known as the "natural" logarithm: returns the Decimal X such that e^X = 'this'.
   */
  ln() {
    if (this.sign <= 0) {
      return Decimal.dNaN;
    } else if (this.layer === 0) {
      return FC(this.sign, 0, Math.log(this.mag));
    } else if (this.layer === 1) {
      return FC(Math.sign(this.mag), 0, Math.abs(this.mag) * 2.302585092994046);
    } else if (this.layer === 2) {
      return FC(Math.sign(this.mag), 1, Math.abs(this.mag) + 0.36221568869946325);
    } else {
      return FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
    }
  }
  /**
   * Logarithms are one of the inverses of exponentiation: this function finds the Decimal X such that base^X = 'this'.
   */
  logarithm(base) {
    return this.log(base);
  }
  /**
   * Exponentiation: Returns the result of 'this' ^ 'value' (often written as 'this' ** 'value' in programming languages).
   */
  pow(value) {
    const decimal = D(value);
    const a = this;
    const b = decimal;
    if (a.sign === 0) {
      return b.eq(0) ? FC_NN(1, 0, 1) : a;
    }
    if (a.sign === 1 && a.layer === 0 && a.mag === 1) {
      return a;
    }
    if (b.sign === 0) {
      return FC_NN(1, 0, 1);
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
  /**
   * Raises 10 to the power of 'this', i.e. (10^'this'). For positive numbers above 1, this is equivalent to adding 1 to layer and normalizing.
   */
  pow10() {
    if (!Number.isFinite(this.layer) || !Number.isFinite(this.mag)) {
      return Decimal.dNaN;
    }
    let a = this;
    if (a.layer === 0) {
      const newmag = Math.pow(10, a.sign * a.mag);
      if (Number.isFinite(newmag) && Math.abs(newmag) >= 0.1) {
        return FC(1, 0, newmag);
      } else {
        if (a.sign === 0) {
          return Decimal.dOne;
        } else {
          a = FC_NN(a.sign, a.layer + 1, Math.log10(a.mag));
        }
      }
    }
    if (a.sign > 0 && a.mag >= 0) {
      return FC(a.sign, a.layer + 1, a.mag);
    }
    if (a.sign < 0 && a.mag >= 0) {
      return FC(-a.sign, a.layer + 1, -a.mag);
    }
    return Decimal.dOne;
  }
  /**
   * Exponentiation: Returns the result of 'value' ^ 'this' (often written as 'value' ** 'this' in programming languages).
   */
  pow_base(value) {
    return D(value).pow(this);
  }
  /**
   * Roots are one of the inverses of exponentiation: this function finds the Decimal X such that X ^ 'value' = 'this'.
   * Equivalent to 'this' ^ (1 / 'value'), which is written here as this.pow(value.recip()).
   */
  root(value) {
    const decimal = D(value);
    return this.pow(decimal.recip());
  }
  /**
   * For positive integers, X factorial (written as X!) equals X * (X - 1) * (X - 2) *... * 3 * 2 * 1. 0! equals 1.
   * This can be extended to real numbers (except for negative integers) via the gamma function, which is what this function does.
   */
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
  /**
   * The gamma function extends the idea of factorials to non-whole numbers using some calculus.
   * Gamma(x) is defined as the integral of t^(x-1) * e^-t dt from t = 0 to t = infinity,
   * and gamma(x) = (x - 1)! for nonnegative integer x, so the factorial for non-whole numbers is defined using the gamma function.
   */
  // from HyperCalc source code
  gamma() {
    if (this.mag < 0) {
      return this.recip();
    } else if (this.layer === 0) {
      if (this.lt(FC_NN(1, 0, 24))) {
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
  /**
   * Returns the natural logarithm of Gamma('this').
   */
  lngamma() {
    return this.gamma().ln();
  }
  /**
   * Base-e exponentiation: returns e^'this'.
   */
  exp() {
    if (this.mag < 0) {
      return Decimal.dOne;
    }
    if (this.layer === 0 && this.mag <= 709.7) {
      return Decimal.fromNumber(Math.exp(this.sign * this.mag));
    } else if (this.layer === 0) {
      return FC(1, 1, this.sign * Math.log10(Math.E) * this.mag);
    } else if (this.layer === 1) {
      return FC(1, 2, this.sign * (Math.log10(0.4342944819032518) + this.mag));
    } else {
      return FC(1, this.layer + 1, this.sign * this.mag);
    }
  }
  /**
   * Squaring a number means multiplying it by itself, a.k.a. raising it to the second power.
   */
  sqr() {
    return this.pow(2);
  }
  /**
   * Square root: finds the Decimal X such that X * X, a.k.a X^2, equals 'this'. Equivalent to X^(1/2).
   */
  sqrt() {
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.sqrt(this.sign * this.mag));
    } else if (this.layer === 1) {
      return FC(1, 2, Math.log10(this.mag) - 0.3010299956639812);
    } else {
      const result = Decimal.div(FC_NN(this.sign, this.layer - 1, this.mag), FC_NN(1, 0, 2));
      result.layer += 1;
      result.normalize();
      return result;
    }
  }
  /**
   * Cubing a number means raising it to the third power.
   */
  cube() {
    return this.pow(3);
  }
  /**
   * Cube root: finds the Decimal X such that X^3 equals 'this'. Equivalent to X^(1/3).
   */
  cbrt() {
    return this.pow(1 / 3);
  }
  /**
   *
   * Tetration: The result of exponentiating 'this' to 'this' 'height' times in a row.  https://en.wikipedia.org/wiki/Tetration
   *
   * If payload != 1, then this is 'iterated exponentiation', the result of exping 'payload' to base 'this' 'height' times. https://andydude.github.io/tetration/archives/tetration2/ident.html
   *
   * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
  tetrate(height = 2, payload = FC_NN(1, 0, 1), linear = false) {
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
    payload = D(payload);
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
        return FC_NN(payload.sign, payload.layer + (height - i - 1), payload.mag);
      }
      if (i > 1e4) {
        return payload;
      }
    }
    return payload;
  }
  /**
   * Iterated exponentiation, the result of exping 'payload' to base 'this' 'height' times. https://andydude.github.io/tetration/archives/tetration2/ident.html
   *
   * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   *
   * Identical to tetrate.
   */
  iteratedexp(height = 2, payload = FC_NN(1, 0, 1), linear = false) {
    return this.tetrate(height, payload, linear);
  }
  /**
   * iterated log/repeated log: The result of applying log(base) 'times' times in a row. Approximately equal to subtracting 'times' from the number's slog representation. Equivalent to tetrating to a negative height.
   *
   * Works with negative and positive real heights. Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
  iteratedlog(base = 10, times = 1, linear = false) {
    if (times < 0) {
      return Decimal.tetrate(base, -times, this, linear);
    }
    base = D(base);
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
  /**
   * Super-logarithm, one of tetration's inverses, tells you what size power tower you'd have to tetrate 'base' to to get 'this'. https://en.wikipedia.org/wiki/Super-logarithm
   *
   * By definition, will never be higher than 1.8e308 in break_eternity.js, since a power tower 1.8e308 numbers tall is the largest representable number.
   *
   * Accepts a number of iterations (default is 100), and use binary search to, after making an initial guess, hone in on the true value, assuming tetration as the ground truth.
   *
   * Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
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
    base = D(base);
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
  static critical_section(base, height, grid, linear = false) {
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
        lower = grid[i][Math.floor(height)];
        upper = grid[i][Math.ceil(height)];
        break;
      } else if (critical_headers[i] < base && critical_headers[i + 1] > base) {
        const basefrac = (base - critical_headers[i]) / (critical_headers[i + 1] - critical_headers[i]);
        lower = grid[i][Math.floor(height)] * (1 - basefrac) + grid[i + 1][Math.floor(height)] * basefrac;
        upper = grid[i][Math.ceil(height)] * (1 - basefrac) + grid[i + 1][Math.ceil(height)] * basefrac;
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
  /**
   * Adds/removes layers from a Decimal, even fractional layers (e.g. its slog10 representation). Very similar to tetrate base 10 and iterated log base 10.
   *
   * Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
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
  /**
   * layeradd: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 'base' and iterated log base 'base'.
   *
   * Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   */
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
  /**
   * The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
   * https://en.wikipedia.org/wiki/Lambert_W_function
   */
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
      return FC_NN(this.sign, this.layer - 1, this.mag);
    }
    throw "Unhandled behavior in lambertw()";
  }
  /**
   * The super square-root function - what number, tetrated to height 2, equals 'this'? https://en.wikipedia.org/wiki/Tetration#Super-root
   */
  ssqrt() {
    return this.linear_sroot(2);
  }
  /**
   * Super-root, one of tetration's inverses - what number, tetrated to height 'degree', equals 'this'? https://en.wikipedia.org/wiki/Tetration#Super-root
   *
   * Only works with the linear approximation of tetration, as starting with analytic and then switching to linear would result in inconsistent behavior for super-roots.
   * This only matters for non-integer degrees.
   */
  // Another reason this doesn't support analytic approximation because I don't know the structure of non-linear tetrations for inputs < 1
  // TODO: Optimize this like how slog is optimized (if it isn't already)
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
      let minimum = FC(1, 10, 1);
      let maximum = FC(1, 10, 1);
      let lower = FC(1, 10, 1);
      let upper = FC(1, 1, -16);
      let prevspan = Decimal.dZero;
      let difference = FC(1, 10, 1);
      let upperBound = upper.pow10().recip();
      let distance = Decimal.dZero;
      let prevPoint = upperBound;
      let nextPoint = upperBound;
      const evenDegree = Math.ceil(degree) % 2 == 0;
      let range = 0;
      let lastValid = FC(1, 10, 1);
      let infLoopDetector = false;
      let previousUpper = Decimal.dZero;
      let decreasingFound = false;
      while (stage < 4) {
        if (stage == 2) {
          if (evenDegree)
            break;
          else {
            lower = FC(1, 10, 1);
            upper = minimum;
            stage = 3;
            difference = FC(1, 10, 1);
            lastValid = FC(1, 10, 1);
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
            if (lower.eq(FC(1, 10, 1))) {
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
            if (lower.eq(FC(1, 10, 1))) {
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
        if (lastValid == FC(1, 10, 1)) {
          break;
        }
        if (stage == 1)
          minimum = lastValid;
        else if (stage == 3)
          maximum = lastValid;
        stage++;
      }
      lower = minimum;
      upper = FC(1, 1, -18);
      let previous = upper;
      let guess = Decimal.dZero;
      let loopGoing = true;
      while (loopGoing) {
        if (lower.eq(FC(1, 10, 1)))
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
        if (maximum.eq(FC(1, 10, 1))) {
          return Decimal.dNaN;
        }
        lower = FC(1, 10, 1);
        upper = maximum;
        previous = upper;
        guess = Decimal.dZero;
        loopGoing = true;
        while (loopGoing) {
          if (lower.eq(FC(1, 10, 1)))
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
  /**
   * Pentation/pentate: The result of tetrating 'height' times in a row. An absurdly strong operator - Decimal.pentate(2, 4.28) and Decimal.pentate(10, 2.37) are already too huge for break_eternity.js!
   * https://en.wikipedia.org/wiki/Pentation
   *
   * Tetration for non-integer heights does not have a single agreed-upon definition,
   * so this library uses an analytic approximation for bases <= 10, but it reverts to the linear approximation for bases > 10.
   * If you want to use the linear approximation even for bases <= 10, set the linear parameter to true.
   * Analytic approximation is not currently supported for bases > 10.
   *
   * For non-whole pentation heights, the linear approximation of pentation is always used, as there is no defined analytic approximation of pentation.
   */
  pentate(height = 2, payload = FC_NN(1, 0, 1), linear = false) {
    payload = D(payload);
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
  /**
   * The sine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
   */
  sin() {
    if (this.mag < 0) {
      return this;
    }
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.sin(this.sign * this.mag));
    }
    return FC_NN(0, 0, 0);
  }
  /**
   * The cosine function, one of the main two trigonometric functions. Behaves periodically with period 2*pi.
   */
  cos() {
    if (this.mag < 0) {
      return Decimal.dOne;
    }
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.cos(this.sign * this.mag));
    }
    return FC_NN(0, 0, 0);
  }
  /**
   * The tangent function, equal to sine divided by cosine. Behaves periodically with period pi.
   */
  tan() {
    if (this.mag < 0) {
      return this;
    }
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.tan(this.sign * this.mag));
    }
    return FC_NN(0, 0, 0);
  }
  /**
   * The arcsine function, the inverse of the sine function.
   */
  asin() {
    if (this.mag < 0) {
      return this;
    }
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.asin(this.sign * this.mag));
    }
    return FC_NN(Number.NaN, Number.NaN, Number.NaN);
  }
  /**
   * The arccosine function, the inverse of the cosine function.
   */
  acos() {
    if (this.mag < 0) {
      return Decimal.fromNumber(Math.acos(this.toNumber()));
    }
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.acos(this.sign * this.mag));
    }
    return FC_NN(Number.NaN, Number.NaN, Number.NaN);
  }
  /**
   * The arctangent function, the inverse of the tangent function.
   */
  atan() {
    if (this.mag < 0) {
      return this;
    }
    if (this.layer === 0) {
      return Decimal.fromNumber(Math.atan(this.sign * this.mag));
    }
    return Decimal.fromNumber(Math.atan(this.sign * Infinity));
  }
  /**
   * Hyperbolic sine: sinh(X) = (e^x - e^-x)/2.
   */
  sinh() {
    return this.exp().sub(this.negate().exp()).div(2);
  }
  /**
   * Hyperbolic cosine: cosh(x) = (e^x + e^-x)/2.
   */
  cosh() {
    return this.exp().add(this.negate().exp()).div(2);
  }
  /**
   * Hyperbolic tangent: tanh(x) = sinh(x)/cosh(x).
   */
  tanh() {
    return this.sinh().div(this.cosh());
  }
  /**
   * Hyperbolic arcsine, the inverse of hyperbolic sine.
   */
  asinh() {
    return Decimal.ln(this.add(this.sqr().add(1).sqrt()));
  }
  /**
   * Hyperbolic arccosine, the inverse of hyperbolic cosine.
   */
  acosh() {
    return Decimal.ln(this.add(this.sqr().sub(1).sqrt()));
  }
  /**
   * Hyperbolic arcctangent, the inverse of hyperbolic tangent.
   */
  atanh() {
    if (this.abs().gte(1)) {
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
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
  /**
   * Smoothly interpolates between the current value and the target value over time
   * using a smoothing factor and deltaTime.
   * @param current - The current value to interpolate from.
   * @param target - The target value to interpolate towards.
   * @param smoothing - The smoothing factor controlling the interpolation speed.
   *                           A higher value results in slower interpolation.
   * @param deltaTime - The time elapsed since the last frame in seconds.
   * @returns - The interpolated value between `current` and `target`.
   */
  static smoothDamp(current, target, smoothing, deltaTime) {
    return new Decimal(current).add(new Decimal(target).minus(new Decimal(current)).times(new Decimal(smoothing)).times(new Decimal(deltaTime)));
  }
  /**
   * Creates a clone of the E instance.
   * @deprecated
   * @returns A EClone instance that is a clone of the original.
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
   * Applies a soft cap to a DecimalClone value using a specified soft cap function.
   * @param start - The value at which the soft cap starts.
   * @param power - The power or factor used in the soft cap calculation.
   * @param mode - The soft cap mode. Use "pow" for power soft cap, "mul" for multiplication soft cap,
   *                       or "exp" for exponential soft cap.
   * @returns - The DecimalClone value after applying the soft cap.
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
   * @param s - The value at which scaling starts.
   * @param p - The scaling factor.
   * @param mode - The scaling mode. Use "pow" for power scaling or "exp" for exponential scaling.
   * @param [rev] - Whether to reverse the scaling operation (unscaling).
   * @returns - The scaled currency value.
   */
  scale(s, p, mode, rev = false) {
    s = new Decimal(s);
    p = new Decimal(p);
    let x = this.clone();
    if (x.gte(s)) {
      if ([0, "pow"].includes(mode)) {
        x = rev ? x.mul(s.pow(p.sub(1))).root(p) : (
          // (x * s^(p - 1))^(1 / p)
          x.pow(p).div(s.pow(p.sub(1)))
        );
      }
      if ([1, "exp"].includes(mode)) {
        x = rev ? x.div(s).max(1).log(p).add(s) : (
          // log_p((x / s).max(1)) + s
          Decimal.pow(p, x.sub(s)).mul(s)
        );
      }
    }
    return x;
  }
  static scale(value, s, p, mode, rev = false) {
    return new Decimal(value).scale(s, p, mode, rev);
  }
  /**
   * Formats the E instance with a specified accuracy and maximum decimal places.
   * @param [acc] - The desired accuracy (number of significant figures), defaults to `2`.
   * @param [max] - The maximum number of decimal places to display, defaults to `9`.
   * @param [type] - The type of format, defaults to `"mixed_sc"`.
   * @returns A string representing the formatted E value.
   */
  format(acc = 2, max = 9, type = "mixed_sc") {
    return formats.format(this.clone(), acc, max, type);
  }
  /**
   * Formats the E instance with a specified accuracy and maximum decimal places.
   * @param e - The E instance to format.
   * @param [acc] - The desired accuracy (number of significant figures), defaults to `2`.
   * @param [max] - The maximum number of decimal places to display, defaults to `9`.
   * @param [type] - The type of format, defaults to `"mixed_sc"`.
   * @returns A string representing the formatted E value.
   */
  static format(e, acc = 2, max = 9, type = "mixed_sc") {
    return formats.format(new Decimal(e), acc, max, type);
  }
  /**
   * Formats the E instance in standard leter notation with a specified accuracy and maximum decimal places.
   * @param [acc] - The desired accuracy (number of significant figures).
   * @param [max] - The maximum number of decimal places to display.
   * @param [type] - The type of format (default standard)
   * @returns A string representing the formatted E value.
   */
  formatST(acc = 2, max = 9, type = "st") {
    return formats.format(this.clone(), acc, max, type);
  }
  static formatST(value, acc = 2, max = 9, type = "st") {
    return formats.format(new Decimal(value), acc, max, type);
  }
  /**
   * Formats the gain rate using the E instance.
   * @param gain - The gain value to compare
   * @param [type] - The type of format (default mixed scientific)
   * @param [acc] - The desired accuracy (number of significant figures).
   * @param [max] - The maximum number of decimal places to display.
   * @returns A string representing the formatted gain
   * @example
   * const currency = new Decimal(100);
   * const currencyGain = new Decimal(12);
   * const formatted = currency.formats.formatGain(currencyGain);
   * console.log(formatted); // should return "(+12/sec)"
   */
  formatGain(gain, type = "mixed_sc", acc, max) {
    return formats.formatGain(this.clone(), gain, type, acc, max);
  }
  static formatGain(value, gain, type = "mixed_sc", acc, max) {
    return formats.formatGain(new Decimal(value), gain, type, acc, max);
  }
  /**
   * Converts the E instance to a Roman numeral representation.
   * @param [max] - Max before it returns the original
   * @returns A string representing the Roman numeral equivalent of the E value,
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
    for (const i of Object.keys(roman)) {
      const q = Math.floor(newNum / roman[i]);
      newNum -= q * roman[i];
      str += i.repeat(q);
    }
    return str;
  }
  static toRoman(value, max) {
    return new Decimal(value).toRoman(max);
  }
};
Decimal.dZero = FC_NN(0, 0, 0);
Decimal.dOne = FC_NN(1, 0, 1);
Decimal.dNegOne = FC_NN(-1, 0, 1);
Decimal.dTwo = FC_NN(1, 0, 2);
Decimal.dTen = FC_NN(1, 0, 10);
Decimal.dNaN = FC_NN(Number.NaN, Number.NaN, Number.NaN);
Decimal.dInf = FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
Decimal.dNegInf = FC_NN(-1, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
Decimal.dNumberMax = FC(1, 0, Number.MAX_VALUE);
Decimal.dNumberMin = FC(1, 0, Number.MIN_VALUE);
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
        return (e.log10().gte(9) ? "" : m.toFixed(new Decimal(4).sub(e.sub(e.div(3).floor().mul(3))).toNumber())) + "e" + FORMATS.eng.format(e.div(3).floor().mul(3), 0);
      }
    }
  },
  /** Mixed scientific format */
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
  /** Layer format */
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
  /** Infinity format */
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
    case "scientific": {
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
    }
    case "st":
    case "standard": {
      let e3 = ex.log(1e3).floor();
      if (e3.lt(1)) {
        return neg + ex.toFixed(Math.max(Math.min(acc - e.toNumber(), acc), 0));
      }
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
      const fixedAmt = acc === 2 ? new Decimal(2).sub(e.sub(e3_mul)).add(1).toNumber() : acc;
      return neg + (ee.gte(10) ? "" : m.toFixed(fixedAmt) + " ") + final;
    }
    default:
      if (!FORMATS[type])
        console.error(`Invalid format type "`, type, `"`);
      return neg + FORMATS[type]?.format(ex, acc, max);
  }
}
function formatGain(amt, gain, type = "mixed_sc", acc, max) {
  amt = new Decimal(amt);
  gain = new Decimal(gain);
  const next = amt.add(gain);
  let rate;
  let ooms = next.div(amt);
  if (ooms.gte(10) && amt.gte(1e100)) {
    ooms = ooms.log10().mul(20);
    rate = "(+" + format(ooms, acc, max, type) + " OoMs/sec)";
  } else
    rate = "(+" + format(gain, acc, max, type) + "/sec)";
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
function formatTimeLong(ex, ms = false, acc = 0, max = 9, type = "mixed_sc") {
  const formatFn = (ex2) => format(ex2, acc, max, type);
  ex = new Decimal(ex);
  const mls = ex.mul(1e3).mod(1e3).floor();
  const sec = ex.mod(60).floor();
  const min = ex.div(60).mod(60).floor();
  const hour = ex.div(3600).mod(24).floor();
  const day = ex.div(86400).mod(365.2425).floor();
  const year = ex.div(31556952).floor();
  const yearStr = year.eq(1) ? " year" : " years";
  const dayStr = day.eq(1) ? " day" : " days";
  const hourStr = hour.eq(1) ? " hour" : " hours";
  const minStr = min.eq(1) ? " minute" : " minutes";
  const secStr = sec.eq(1) ? " second" : " seconds";
  const mlsStr = mls.eq(1) ? " millisecond" : " milliseconds";
  return `${year.gt(0) ? formatFn(year) + yearStr + ", " : ""}${day.gt(0) ? formatFn(day) + dayStr + ", " : ""}${hour.gt(0) ? formatFn(hour) + hourStr + ", " : ""}${min.gt(0) ? formatFn(min) + minStr + ", " : ""}${sec.gt(0) ? formatFn(sec) + secStr + "," : ""}${ms && mls.gt(0) ? " " + formatFn(mls) + mlsStr : ""}`.replace(/,([^,]*)$/, "$1").trim();
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
  const abbNum = num.lte(0) ? 0 : Decimal.min(Decimal.log(num, 1e3).sub(1), abb.length - 1).floor().toNumber();
  const abbMax = abb[abbNum];
  if (abbNum === 0) {
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
  }
  switch (type) {
    case 1:
      output = abbMax["name"];
      break;
    case 2:
      output = `${num.divide(abbMax["value"]).format()}`;
      break;
    case 3:
      output = abbMax["altName"];
      break;
    case 0:
    default:
      output = `${num.divide(abbMax["value"]).format()} ${abbMax["name"]}`;
      break;
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
  formatTimeLong,
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
  const out = (x) => new Decimal(x);
  Object.getOwnPropertyNames(Decimal).filter((b) => !Object.getOwnPropertyNames(class {
  }).includes(b)).forEach((prop) => {
    out[prop] = Decimal[prop];
  });
  return out;
})();

// src/classes/currency.ts
var import_reflect_metadata = __toESM(require_Reflect());

// src/classes/boost.ts
var BoostObject = class {
  // eslint-disable-next-line jsdoc/require-returns
  /** @deprecated Use {@link description} instead */
  get desc() {
    return this.description;
  }
  get description() {
    return this.descriptionFn();
  }
  constructor(init) {
    this.id = init.id;
    this.name = init.name ?? "";
    this.descriptionFn = init.description ? typeof init.description === "function" ? init.description : () => init.description : () => "";
    this.value = init.value;
    this.order = init.order ?? 99;
  }
};
var Boost = class {
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
        this.boostArray.push(new BoostObject(boostObj));
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
   * @deprecated Use {@link getBoosts} instead.
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
        this.boostArray.push(new BoostObject({ id, name, desc, value, order }));
      } else {
        this.boostArray[bCheck[1][0]] = new BoostObject({ id, name, desc, value, order });
      }
    } else {
      arg1 = Array.isArray(arg1) ? arg1 : [arg1];
      for (let i = 0; i < arg1.length; i++) {
        const bCheck = this.getBoosts(arg1[i].id, true);
        if (!bCheck[0][0]) {
          this.boostArray.push(new BoostObject(arg1[i]));
        } else {
          this.boostArray[bCheck[1][0]] = new BoostObject(arg1[i]);
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

// src/classes/numericalAnalysis.ts
var DEFAULT_ITERATIONS = 15;
function inverseFunctionApprox(f, n, mode = "geometric", iterations = DEFAULT_ITERATIONS) {
  let lowerBound = E(1);
  let upperBound = E(n);
  if (f(upperBound).eq(0)) {
    return {
      value: E(0),
      lowerBound: E(0),
      upperBound: E(0)
    };
  }
  if (f(upperBound).lt(n)) {
    console.warn("The function is not monotonically increasing. (f(n) < n)");
    console.log({ lowerBound, upperBound, iterations, n, f: f(upperBound) });
    return {
      value: upperBound,
      lowerBound: upperBound,
      upperBound
    };
  }
  for (let i = 0; i < iterations; i++) {
    let mid;
    switch (mode) {
      case "arithmetic":
      case 1:
        mid = lowerBound.add(upperBound).div(2);
        break;
      case "geometric":
      case 2:
        mid = lowerBound.mul(upperBound).sqrt();
        break;
    }
    const midValue = f(mid);
    if (midValue.eq(n)) {
      return {
        value: mid,
        lowerBound: mid,
        upperBound: mid
      };
    } else if (midValue.lt(n)) {
      lowerBound = mid;
    } else {
      upperBound = mid;
    }
  }
  const out = {
    value: lowerBound,
    lowerBound,
    upperBound
  };
  return out;
}
function calculateSumLoop(f, b, a = 0, epsilon = E("1e-3")) {
  let sum = E();
  let n = E(b);
  for (; n.gte(a); n = n.sub(1)) {
    const initSum = sum;
    const value = f(n);
    sum = sum.add(value);
    const diff = initSum.div(sum);
    if (diff.lte(1) && diff.gt(E(1).sub(epsilon)))
      break;
  }
  return sum;
}
function calculateSumApprox(f, b, a = 0, iterations = DEFAULT_ITERATIONS) {
  a = E(a);
  b = E(b);
  let sum = E(0);
  const intervalWidth = b.sub(a).div(iterations);
  for (let i = 0; i < iterations; i++) {
    const x0 = a.add(intervalWidth.mul(i));
    const x1 = a.add(intervalWidth.mul(i + 1));
    sum = sum.add(f(x0).add(f(x1)).div(2).mul(intervalWidth));
  }
  return sum;
}
function calculateSum(f, b, a = 0, epsilon, iterations) {
  a = E(a);
  b = E(b);
  if (b.sub(a).lte(DEFAULT_ITERATIONS)) {
    return calculateSumLoop(f, b, a, epsilon);
  } else {
    return calculateSumApprox(f, b, a, iterations);
  }
}

// src/classes/currency.ts
function calculateUpgrade(value, upgrade, start, end, mode, iterations, el = false) {
  value = E(value);
  start = E(start ?? upgrade.level);
  end = E(end ?? value);
  const target = end.sub(start);
  if (target.lte(0)) {
    console.warn("calculateUpgrade: Invalid target: ", target);
    return [E(0), E(0)];
  }
  el = (typeof upgrade.el === "function" ? upgrade.el() : upgrade.el) ?? el;
  if (target.eq(1)) {
    const cost2 = upgrade.cost(upgrade.level);
    const canAfford = value.gte(cost2);
    let out = [E(0), E(0)];
    if (el) {
      out[0] = canAfford ? E(1) : E(0);
      return out;
    } else {
      out = [canAfford ? E(1) : E(0), canAfford ? cost2 : E(0)];
      return out;
    }
  }
  if (upgrade.costBulk) {
    const [amount, cost2] = upgrade.costBulk(value, upgrade.level, target);
    const canAfford = value.gte(cost2);
    const out = [canAfford ? amount : E(0), canAfford && !el ? cost2 : E(0)];
    if (el) {
    } else {
    }
    return out;
  }
  if (el) {
    const costTargetFn = (level) => upgrade.cost(level.add(start));
    const maxLevelAffordable2 = E.min(end, inverseFunctionApprox(costTargetFn, value, mode, iterations).value.floor());
    const cost2 = E(0);
    return [maxLevelAffordable2, cost2];
  }
  const maxLevelAffordable = inverseFunctionApprox(
    (x) => calculateSum(upgrade.cost, x, start),
    value,
    mode,
    iterations
  ).value.floor();
  const cost = calculateSum(upgrade.cost, maxLevelAffordable, start);
  const maxLevelAffordableActual = maxLevelAffordable.sub(start).add(1).max(0);
  return [maxLevelAffordableActual, cost];
}
function decimalToJSONString(n) {
  n = E(n);
  return `${n.sign}/${n.mag}/${n.layer}`;
}
function upgradeToCacheNameSum(start, end) {
  return `sum/${decimalToJSONString(start)}/${decimalToJSONString(end)}}`;
}
function upgradeToCacheNameEL(level) {
  return `el/${decimalToJSONString(level)}`;
}
var UpgradeData = class {
  constructor(init) {
    init = init ?? {};
    this.id = init.id;
    this.level = init.level ? E(init.level) : E(1);
  }
};
__decorateClass([
  Expose()
], UpgradeData.prototype, "id", 2);
__decorateClass([
  Type(() => Decimal)
], UpgradeData.prototype, "level", 2);
var UpgradeStatic = class _UpgradeStatic {
  static {
    /** The default size of the cache. Should be one less than a power of 2. */
    this.cacheSize = 63;
  }
  get description() {
    return this.descriptionFn();
  }
  getCached(type, start, end) {
    if (type === "sum") {
      return this.cache.get(upgradeToCacheNameSum(start, end));
    } else {
      return this.cache.get(upgradeToCacheNameEL(start));
    }
  }
  setCached(type, start, endOrStart, costSum) {
    const data = type === "sum" ? {
      id: this.id,
      el: false,
      start: E(start),
      end: E(endOrStart),
      cost: E(costSum)
    } : {
      id: this.id,
      el: true,
      level: E(start),
      cost: E(endOrStart)
    };
    if (type === "sum") {
      this.cache.set(upgradeToCacheNameSum(start, endOrStart), data);
    } else {
      this.cache.set(upgradeToCacheNameEL(start), data);
    }
    return data;
  }
  get data() {
    return this.dataPointerFn();
  }
  /**
   * @param init - The upgrade object to initialize.
   * @param dataPointer - A function or reference that returns the pointer of the data / frontend.
   * @param cacheSize - The size of the cache. Should be one less than a power of 2. See {@link upgradeCache}
   */
  constructor(init, dataPointer, cacheSize) {
    const data = typeof dataPointer === "function" ? dataPointer() : dataPointer;
    this.dataPointerFn = typeof dataPointer === "function" ? dataPointer : () => data;
    this.cache = new LRUCache(cacheSize ?? _UpgradeStatic.cacheSize);
    this.id = init.id;
    this.name = init.name ?? init.id;
    this.descriptionFn = init.description ? typeof init.description === "function" ? init.description : () => init.description : () => "";
    this.cost = init.cost;
    this.costBulk = init.costBulk;
    this.maxLevel = init.maxLevel;
    this.effect = init.effect;
    this.el = init.el;
  }
  /**
   * The current level of the upgrade.
   * @returns The current level of the upgrade.
   */
  get level() {
    return ((this ?? { data: { level: E(1) } }).data ?? { level: E(1) }).level;
  }
  set level(n) {
    this.data.level = E(n);
  }
};
var Currency = class {
  // /** A boost object that affects the currency gain. */
  // @Expose()
  // public boost: boost;
  /** Constructs a new currency object with an initial value of 0. */
  constructor() {
    this.value = E(0);
    this.upgrades = {};
  }
};
__decorateClass([
  Type(() => Decimal)
], Currency.prototype, "value", 2);
__decorateClass([
  Type(() => UpgradeData)
], Currency.prototype, "upgrades", 2);
var CurrencyStatic = class {
  /** @returns The pointer of the data. */
  get pointer() {
    return this.pointerFn();
  }
  /**
   * Updates / applies effects to the currency on load.
   */
  onLoadData() {
    for (const upgrade of Object.values(this.upgrades)) {
      upgrade.effect?.(upgrade.level, upgrade);
    }
  }
  /**
   * @param pointer - A function or reference that returns the pointer of the data / frontend.
   * @param upgrades - An array of upgrade objects.
   * @param defaults - The default value and boost of the currency.
   */
  constructor(pointer = new Currency(), upgrades, defaults = { defaultVal: E(0), defaultBoost: E(1) }) {
    this.defaultVal = defaults.defaultVal;
    this.defaultBoost = defaults.defaultBoost;
    this.upgrades = {
      // *[Symbol.iterator] () {
      //     for (const upgrade of Object.values(this)) {
      //         yield upgrade;
      //     }
      // },
    };
    if (upgrades)
      this.addUpgrade(upgrades);
    this.upgrades = this.upgrades;
    this.pointerFn = typeof pointer === "function" ? pointer : () => pointer;
    this.boost = new Boost(this.defaultBoost);
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
      for (const upgrade of Object.values(this.upgrades)) {
        upgrade.level = E(0);
      }
    }
    ;
  }
  /**
   * The new currency value after applying the boost.
   * @param dt Deltatime / multipler in milliseconds, assuming you gain once every second. Ex. 500 = 0.5 seconds = half gain.
   * @returns What was gained, NOT the new value.
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
    const upgrades2 = new UpgradeData(upgrades1);
    this.pointer.upgrades[upgrades2.id] = upgrades2;
    return upgrades2;
  }
  /**
   * Retrieves an upgrade object based on the provided id.
   * @deprecated Use the return value of {@link pointerAddUpgrade} instead.
   * @param id - The id of the upgrade to retrieve.
   * @returns The upgrade object if found, otherwise null.
   */
  pointerGetUpgrade(id) {
    let upgradeToGet = null;
    if (id === void 0) {
      return null;
    }
    upgradeToGet = this.pointer.upgrades[id] ?? null;
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
  // public getUpgrade (id: string): UpgradeStatic | null {
  getUpgrade(id) {
    return this.upgrades[id] ?? null;
  }
  /**
   * Creates upgrades. To update an upgrade, use {@link updateUpgrade} instead.
   * @param upgrades - An array of upgrade objects.
   * @param runEffectInstantly - Whether to run the effect immediately. Defaults to `true`.
   * @returns The added upgrades.
   * @example
   * currency.addUpgrade({
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
    console.log(upgrades);
    const addedUpgradeList = {};
    for (const upgrade of upgrades) {
      const addedUpgradeData = this.pointerAddUpgrade(upgrade);
      const addedUpgradeStatic = new UpgradeStatic(upgrade, () => addedUpgradeData);
      if (addedUpgradeStatic.effect && runEffectInstantly)
        addedUpgradeStatic.effect(addedUpgradeStatic.level, addedUpgradeStatic);
      addedUpgradeList[upgrade.id] = addedUpgradeStatic;
      this.upgrades[upgrade.id] = addedUpgradeStatic;
    }
    console.log(addedUpgradeList);
    return Object.values(addedUpgradeList);
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
   * Calculates the cost and how many upgrades you can buy.
   * See {@link calculateUpgrade} for more information.
   * @param id - The ID or position of the upgrade to calculate.
   * @param target - The target level or quantity to reach for the upgrade. If omitted, it calculates the maximum affordable quantity.
   * @param mode - See the argument in {@link calculateUpgrade}.
   * @param iterations - See the argument in {@link calculateUpgrade}.
   * @returns The amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [E(0), E(0)].
   * @example
   * // Calculate how many healthBoost upgrades you can buy and the cost of the upgrades
   * const [amount, cost] = currency.calculateUpgrade("healthBoost", 10);
   */
  // public calculateUpgrade (id: string, target: ESource = 1, el: boolean = false): [amount: E, cost: E] {
  calculateUpgrade(id, target, mode, iterations) {
    const upgrade = this.getUpgrade(id);
    if (upgrade === null) {
      console.warn(`Upgrade "${id}" not found.`);
      return [E(0), E(0)];
    }
    return calculateUpgrade(this.value, upgrade, upgrade.level, target ? upgrade.level.add(target) : void 0, mode, iterations);
  }
  /**
   * Calculates how much is needed for the next upgrade.
   * @param id - Index or ID of the upgrade
   * @param target - How many before the next upgrade
   * @param mode - See the argument in {@link calculateUpgrade}.
   * @param iterations - See the argument in {@link calculateUpgrade}.
   * @returns The cost of the next upgrade.
   * @example
   * // Calculate the cost of the next healthBoost upgrade
   * const nextCost = currency.getNextCost("healthBoost");
   */
  getNextCost(id, target = 0, mode, iterations) {
    const upgrade = this.getUpgrade(id);
    if (upgrade === null) {
      console.warn(`Upgrade "${id}" not found.`);
      return E(0);
    }
    const amount = calculateUpgrade(this.value, upgrade, upgrade.level, upgrade.level.add(target), mode, iterations)[1];
    const nextCost = upgrade.cost(upgrade.level.add(amount));
    return nextCost;
  }
  /**
   * Buys an upgrade based on its ID or array position if enough currency is available.
   * @param id - The ID or position of the upgrade to buy or upgrade.
   * @param target - The target level or quantity to reach for the upgrade. See the argument in {@link calculateUpgrade}.
   * @param mode - See the argument in {@link calculateUpgrade}.
   * @param iterations - See the argument in {@link calculateUpgrade}.
   * @returns Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
   * @example
   * // Attempt to buy up to 10 healthBoost upgrades at once
   * currency.buyUpgrade("healthBoost", 10);
   */
  buyUpgrade(id, target, mode, iterations) {
    const upgrade = this.getUpgrade(id);
    if (upgrade === null) {
      console.warn(`Upgrade "${id}" not found.`);
      return false;
    }
    const [amount, cost] = this.calculateUpgrade(id, target, mode, iterations);
    if (amount.lte(0)) {
      return false;
    }
    this.pointer.value = this.pointer.value.sub(cost);
    upgrade.level = upgrade.level.add(amount);
    upgrade.effect?.(upgrade.level, upgrade);
    return true;
  }
};

// src/classes/attribute.ts
var import_reflect_metadata2 = __toESM(require_Reflect());
var Attribute = class {
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
], Attribute.prototype, "value", 2);
var AttributeStatic = class {
  /** @returns The data for the attribute. */
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
    pointer = pointer ?? new Attribute(this.initial);
    this.pointerFn = typeof pointer === "function" ? pointer() : pointer;
    if (useBoost)
      this.boost = new Boost(this.initial);
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

// src/game/managers/configManager.ts
var ConfigManager = class {
  /**
   * Constructs a new configuration manager.
   * @param configOptionTemplate - The template to use for default values.
   */
  constructor(configOptionTemplate) {
    this.configOptionTemplate = configOptionTemplate;
  }
  /**
   * Parses the given configuration object and returns a new object with default values for any missing options.
   * @param config - The configuration object to parse.
   * @returns A new object with default values for any missing options.
   */
  parse(config) {
    if (typeof config === "undefined") {
      return this.configOptionTemplate;
    }
    function parseObject(obj, template) {
      for (const key in template) {
        if (typeof obj[key] === "undefined") {
          obj[key] = template[key];
        } else if (typeof obj[key] === "object" && typeof template[key] === "object" && !Array.isArray(obj[key]) && !Array.isArray(template[key])) {
          obj[key] = parseObject(obj[key], template[key]);
        }
      }
      return obj;
    }
    return parseObject(config, this.configOptionTemplate);
  }
  /**
   * @returns The template to use for default values.
   */
  get options() {
    return this.configOptionTemplate;
  }
};

// src/game/managers/keyManager.ts
var keyManagerDefaultConfig = {
  autoAddInterval: true,
  fps: 30,
  pixiApp: void 0
};
var keys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ".split("").concat(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
var KeyManager = class _KeyManager {
  /**
   * Creates a new key manager.
   * @param config - The configuration for the key manager.
   */
  constructor(config) {
    /** @deprecated Use {@link addKey} instead. */
    this.addKeys = this.addKey;
    this.keysPressed = [];
    this.binds = [];
    this.tickers = [];
    this.config = _KeyManager.configManager.parse(config);
    if (this.config.autoAddInterval) {
      if (this.config.pixiApp) {
        this.config.pixiApp.ticker.add((dt) => {
          for (const ticker of this.tickers) {
            ticker(dt);
          }
        });
      } else {
        const fps = this.config.fps ? this.config.fps : 30;
        this.tickerInterval = setInterval(() => {
          for (const ticker of this.tickers) {
            ticker(1e3 / fps);
          }
        }, 1e3 / fps);
      }
    }
    if (typeof document === "undefined") {
      return;
    }
    this.tickers.push((dt) => {
      for (const bind of this.binds) {
        if ((bind.onDownContinuous || bind.fn) && this.isPressing(bind.name)) {
          bind.onDownContinuous?.(dt);
          bind.fn?.(dt);
        }
      }
    });
    document.addEventListener("keydown", (e) => {
      this.logKey(e, true);
      this.onAll("down", e.key);
    });
    document.addEventListener("keyup", (e) => {
      this.logKey(e, false);
      this.onAll("up", e.key);
    });
    document.addEventListener("keypress", (e) => {
      this.onAll("press", e.key);
    });
  }
  static {
    /** The configuration manager for the key manager */
    this.configManager = new ConfigManager(keyManagerDefaultConfig);
  }
  /**
   * Changes the framerate of the key manager.
   * @param fps - The new framerate to use.
   */
  changeFps(fps) {
    this.config.fps = fps;
    if (this.tickerInterval) {
      clearInterval(this.tickerInterval);
      this.tickerInterval = setInterval(() => {
        for (const ticker of this.tickers) {
          ticker(1e3 / fps);
        }
      }, 1e3 / fps);
    } else if (this.config.pixiApp) {
      this.config.pixiApp.ticker.maxFPS = fps;
    }
  }
  /**
   * Adds keys to the list of keys pressed.
   * @param event - The event to add the key from.
   * @param type - Whether to add or remove the key. `true` to add, `false` to remove.
   */
  logKey(event, type) {
    const key = event.key;
    if (type && !this.keysPressed.includes(key))
      this.keysPressed.push(key);
    else if (!type && this.keysPressed.includes(key))
      this.keysPressed.splice(this.keysPressed.indexOf(key), 1);
  }
  /**
   * Manages onDown, onPress, and onUp events for all key bindings.
   * @param eventType - The type of event to call for.
   * @param keypress - The key that was pressed.
   */
  onAll(eventType, keypress) {
    for (const bind of this.binds) {
      if (eventType === "down" && bind.key === keypress && bind.onDown) {
        bind.onDown();
      }
      if (eventType === "press" && bind.key === keypress && bind.onPress) {
        bind.onPress();
      }
      if (eventType === "up" && bind.key === keypress && bind.onUp) {
        bind.onUp();
      }
    }
  }
  /**
   * Checks if a specific key binding is currently being pressed.
   * @param name - The name of the key binding to check.
   * @returns True if the key binding is being pressed, otherwise false.
   */
  isPressing(name) {
    for (let i = 0; i < this.binds.length; i++) {
      const current = this.binds[i];
      if (current.name === name) {
        return this.keysPressed.includes(current.key);
      }
    }
    return false;
  }
  /**
   * Gets a key binding by its name.
   * @param name - The name of the key binding to get.
   * @returns The key binding, if found.
   */
  getBind(name) {
    return this.binds.find((current) => current.name === name);
  }
  addKey(nameOrKeysToAdd, key, fn) {
    nameOrKeysToAdd = typeof nameOrKeysToAdd === "string" ? [{ name: nameOrKeysToAdd, key, fn }] : nameOrKeysToAdd;
    nameOrKeysToAdd = Array.isArray(nameOrKeysToAdd) ? nameOrKeysToAdd : [nameOrKeysToAdd];
    for (const keyBinding of nameOrKeysToAdd) {
      const existing = this.getBind(keyBinding.name);
      if (existing) {
        Object.assign(existing, keyBinding);
        continue;
      }
      this.binds.push(keyBinding);
    }
  }
};

// src/game/managers/eventManager.ts
var EventTypes = /* @__PURE__ */ ((EventTypes2) => {
  EventTypes2["interval"] = "interval";
  EventTypes2["timeout"] = "timeout";
  return EventTypes2;
})(EventTypes || {});
var eventManagerDefaultConfig = {
  autoAddInterval: true,
  fps: 30,
  pixiApp: void 0
};
var EventManager = class _EventManager {
  /**
   * Creates a new event manager.
   * @param config - The config to use for this event manager.
   */
  constructor(config) {
    /**
     * Adds a new event
     * @deprecated Use {@link EventManager.setEvent} instead.
     * @alias eventManager.setEvent
     */
    this.addEvent = this.setEvent;
    this.config = _EventManager.configManager.parse(config);
    this.events = {};
    if (this.config.autoAddInterval) {
      if (this.config.pixiApp) {
        this.config.pixiApp.ticker.add(() => {
          this.tickerFunction();
        });
      } else {
        const fps = this.config.fps ?? 30;
        this.tickerInterval = setInterval(() => {
          this.tickerFunction();
        }, 1e3 / fps);
      }
    }
  }
  static {
    /** The static config manager for the event manager */
    this.configManager = new ConfigManager(eventManagerDefaultConfig);
  }
  /**
   * The function that is called every frame, executes all events.
   */
  tickerFunction() {
    const currentTime = Date.now();
    for (const event of Object.values(this.events)) {
      if (event.type === "interval") {
        if (currentTime - event.intervalLast >= event.delay) {
          const dt = currentTime - event.intervalLast;
          event.callbackFn(dt);
          event.intervalLast = currentTime;
        }
      } else if (event.type === "timeout") {
        const dt = currentTime - event.timeCreated;
        if (currentTime - event.timeCreated >= event.delay) {
          event.callbackFn(dt);
          delete this.events[event.name];
        }
      }
    }
  }
  /**
   * Changes the framerate of the event manager.
   * @param fps - The new framerate to use.
   */
  changeFps(fps) {
    this.config.fps = fps;
    if (this.tickerInterval) {
      clearInterval(this.tickerInterval);
      this.tickerInterval = setInterval(() => {
        this.tickerFunction();
      }, 1e3 / fps);
    } else if (this.config.pixiApp) {
      this.config.pixiApp.ticker.maxFPS = fps;
    }
  }
  /**
   * Warps time by a certain amount. Note: This will affect the stored creation time of timeout events.
   * @param dt - The time to warp by.
   */
  timeWarp(dt) {
    for (const event of Object.values(this.events)) {
      if (event.type === "interval") {
        event.intervalLast -= dt;
      }
      if (event.type === "timeout") {
        event.timeCreated -= dt;
      }
    }
  }
  /**
   * Adds a new event or changes an existing event to the event system.
   * @param name - The name of the event. If an event with this name already exists, it will be overwritten.
   * @param type - The type of the event, either "interval" or "timeout".
   * @param delay - The delay in milliseconds before the event triggers. (NOTE: If delay is less than the framerate, it will at trigger at max, once every frame.)
   * @param callbackFn - The callback function to execute when the event triggers.
   * @example
   * const myEventManger = new eventManager();
   * // Add an interval event that executes every 2 seconds.
   * myEventManger.addEvent("IntervalEvent", "interval", 2000, () => {
   *    console.log("Interval event executed.");
   * });
   *
   * // Add a timeout event that executes after 5 seconds.
   * myEventManger.addEvent("TimeoutEvent", "timeout", 5000, () => {
   *   console.log("Timeout event executed.");
   * });
   */
  setEvent(name, type, delay, callbackFn) {
    this.events[name] = (() => {
      switch (type) {
        case "interval":
          {
            const event = {
              name,
              type,
              delay: typeof delay === "number" ? delay : delay.toNumber(),
              callbackFn,
              timeCreated: Date.now(),
              intervalLast: Date.now()
            };
            return event;
          }
          ;
          break;
        case "timeout":
        default: {
          const event = {
            name,
            type,
            delay: typeof delay === "number" ? delay : delay.toNumber(),
            callbackFn,
            timeCreated: Date.now()
          };
          return event;
        }
      }
    })();
  }
  /**
   * Removes an event from the event system.
   * @param name - The name of the event to remove.
   * @example
   * myEventManger.removeEvent("IntervalEvent"); // Removes the interval event with the name "IntervalEvent".
   */
  removeEvent(name) {
    delete this.events[name];
  }
};

// src/game/managers/dataManager.ts
var import_reflect_metadata3 = __toESM(require_Reflect());
var import_lz_string = __toESM(require_lz_string());
function md5(_) {
  var $ = "0123456789abcdef";
  function n(_2) {
    var n2, r2 = "";
    for (n2 = 0; n2 <= 3; n2++)
      r2 += $.charAt(_2 >> 8 * n2 + 4 & 15) + $.charAt(_2 >> 8 * n2 & 15);
    return r2;
  }
  function r(_2, $2) {
    var n2 = (65535 & _2) + (65535 & $2);
    return (_2 >> 16) + ($2 >> 16) + (n2 >> 16) << 16 | 65535 & n2;
  }
  function t(_2, $2, n2, t2, u2, e2) {
    var f2, o2;
    return r((f2 = r(r($2, _2), r(t2, e2)), f2 << (o2 = u2) | f2 >>> 32 - o2), n2);
  }
  function u(_2, $2, n2, r2, u2, e2, f2) {
    return t($2 & n2 | ~$2 & r2, _2, $2, u2, e2, f2);
  }
  function e(_2, $2, n2, r2, u2, e2, f2) {
    return t($2 & r2 | n2 & ~r2, _2, $2, u2, e2, f2);
  }
  function f(_2, $2, n2, r2, u2, e2, f2) {
    return t($2 ^ n2 ^ r2, _2, $2, u2, e2, f2);
  }
  function o(_2, $2, n2, r2, u2, e2, f2) {
    return t(n2 ^ ($2 | ~r2), _2, $2, u2, e2, f2);
  }
  var F, c, a, i, h, v = function _2($2) {
    var n2, r2 = ($2.length + 8 >> 6) + 1, t2 = Array(16 * r2);
    for (n2 = 0; n2 < 16 * r2; n2++)
      t2[n2] = 0;
    for (n2 = 0; n2 < $2.length; n2++)
      t2[n2 >> 2] |= $2.charCodeAt(n2) << n2 % 4 * 8;
    return t2[n2 >> 2] |= 128 << n2 % 4 * 8, t2[16 * r2 - 2] = 8 * $2.length, t2;
  }("" + _), x = 1732584193, g = -271733879, l = -1732584194, d = 271733878;
  for (F = 0; F < v.length; F += 16)
    c = x, a = g, i = l, h = d, x = u(x, g, l, d, v[F + 0], 7, -680876936), d = u(d, x, g, l, v[F + 1], 12, -389564586), l = u(l, d, x, g, v[F + 2], 17, 606105819), g = u(g, l, d, x, v[F + 3], 22, -1044525330), x = u(x, g, l, d, v[F + 4], 7, -176418897), d = u(d, x, g, l, v[F + 5], 12, 1200080426), l = u(l, d, x, g, v[F + 6], 17, -1473231341), g = u(g, l, d, x, v[F + 7], 22, -45705983), x = u(x, g, l, d, v[F + 8], 7, 1770035416), d = u(d, x, g, l, v[F + 9], 12, -1958414417), l = u(l, d, x, g, v[F + 10], 17, -42063), g = u(g, l, d, x, v[F + 11], 22, -1990404162), x = u(x, g, l, d, v[F + 12], 7, 1804603682), d = u(d, x, g, l, v[F + 13], 12, -40341101), l = u(l, d, x, g, v[F + 14], 17, -1502002290), g = u(g, l, d, x, v[F + 15], 22, 1236535329), x = e(x, g, l, d, v[F + 1], 5, -165796510), d = e(d, x, g, l, v[F + 6], 9, -1069501632), l = e(l, d, x, g, v[F + 11], 14, 643717713), g = e(g, l, d, x, v[F + 0], 20, -373897302), x = e(x, g, l, d, v[F + 5], 5, -701558691), d = e(d, x, g, l, v[F + 10], 9, 38016083), l = e(l, d, x, g, v[F + 15], 14, -660478335), g = e(g, l, d, x, v[F + 4], 20, -405537848), x = e(x, g, l, d, v[F + 9], 5, 568446438), d = e(d, x, g, l, v[F + 14], 9, -1019803690), l = e(l, d, x, g, v[F + 3], 14, -187363961), g = e(g, l, d, x, v[F + 8], 20, 1163531501), x = e(x, g, l, d, v[F + 13], 5, -1444681467), d = e(d, x, g, l, v[F + 2], 9, -51403784), l = e(l, d, x, g, v[F + 7], 14, 1735328473), g = e(g, l, d, x, v[F + 12], 20, -1926607734), x = f(x, g, l, d, v[F + 5], 4, -378558), d = f(d, x, g, l, v[F + 8], 11, -2022574463), l = f(l, d, x, g, v[F + 11], 16, 1839030562), g = f(g, l, d, x, v[F + 14], 23, -35309556), x = f(x, g, l, d, v[F + 1], 4, -1530992060), d = f(d, x, g, l, v[F + 4], 11, 1272893353), l = f(l, d, x, g, v[F + 7], 16, -155497632), g = f(g, l, d, x, v[F + 10], 23, -1094730640), x = f(x, g, l, d, v[F + 13], 4, 681279174), d = f(d, x, g, l, v[F + 0], 11, -358537222), l = f(l, d, x, g, v[F + 3], 16, -722521979), g = f(g, l, d, x, v[F + 6], 23, 76029189), x = f(x, g, l, d, v[F + 9], 4, -640364487), d = f(d, x, g, l, v[F + 12], 11, -421815835), l = f(l, d, x, g, v[F + 15], 16, 530742520), g = f(g, l, d, x, v[F + 2], 23, -995338651), x = o(x, g, l, d, v[F + 0], 6, -198630844), d = o(d, x, g, l, v[F + 7], 10, 1126891415), l = o(l, d, x, g, v[F + 14], 15, -1416354905), g = o(g, l, d, x, v[F + 5], 21, -57434055), x = o(x, g, l, d, v[F + 12], 6, 1700485571), d = o(d, x, g, l, v[F + 3], 10, -1894986606), l = o(l, d, x, g, v[F + 10], 15, -1051523), g = o(g, l, d, x, v[F + 1], 21, -2054922799), x = o(x, g, l, d, v[F + 8], 6, 1873313359), d = o(d, x, g, l, v[F + 15], 10, -30611744), l = o(l, d, x, g, v[F + 6], 15, -1560198380), g = o(g, l, d, x, v[F + 13], 21, 1309151649), x = o(x, g, l, d, v[F + 4], 6, -145523070), d = o(d, x, g, l, v[F + 11], 10, -1120210379), l = o(l, d, x, g, v[F + 2], 15, 718787259), g = o(g, l, d, x, v[F + 9], 21, -343485551), x = r(x, c), g = r(g, a), l = r(l, i), d = r(d, h);
  return n(x) + n(g) + n(l) + n(d);
}
var DataManager = class {
  /**
   * Creates a new instance of the game class.
   * @param gameRef - A function that returns the game instance.
   */
  constructor(gameRef) {
    /**
     * The current game data.
     */
    this.data = {};
    /**
     * The static game data.
     */
    this.static = {};
    /** A queue of functions to call when the game data is loaded. */
    this.eventsOnLoad = [];
    this.gameRef = typeof gameRef === "function" ? gameRef() : gameRef;
  }
  /**
   * Adds an event to call when the game data is loaded.
   * @param event - The event to call when the game data is loaded.
   * @example dataManager.addEventOnLoad(() => console.log("Data loaded!"));
   */
  addEventOnLoad(event) {
    this.eventsOnLoad.push(event);
  }
  /**
   * Sets the data for the given key.
   * @template s - The key to set the data for.
   * @template t - The value to set the data to.
   * @param key - The key to set the data for.
   * @param value - The value to set the data to.
   * @returns An object with a single entry of the name of the key and the value of the data. This is a getter and setter.
   * @example
   * // ! WARNING: Do not destruct the `value` property, as it will remove the getter and setter.
   * const testData = dataManager.setData("test", 5);
   * console.log(testData.value); // 5
   * testData.value = 10; // Also sets the data
   * console.log(testData.value); // 10
   */
  setData(key, value) {
    if (typeof this.data[key] === "undefined" && this.normalData) {
      console.warn("After initializing data, you should not add new properties to data.");
    }
    this.data[key] = value;
    const thisData = () => this.data;
    return {
      get value() {
        return thisData()[key];
      },
      set value(valueToSet) {
        thisData()[key] = valueToSet;
      },
      setValue(valueToSet) {
        thisData()[key] = valueToSet;
      }
    };
  }
  /**
   * Gets the data for the given key.
   * @deprecated Set the return value of {@link setData} to a variable instead, as that is a getter and provides type checking.
   * @param key - The key to get the data for.
   * @returns The data for the given key.
   */
  getData(key) {
    return this.data[key];
  }
  /**
   * Sets the static data for the given key.
   * @param key - The key to set the static data for.
   * @param value - The value to set the static data to.
   * @returns A getter for the static data.
   */
  setStatic(key, value) {
    if (typeof this.static[key] === "undefined" && this.normalData) {
      console.warn("After initializing data, you should not add new properties to staticData.");
    }
    this.static[key] = value;
    const getter = {
      // get a () {
      //     // console.log("Getter called", key, thisStatic[key]);
      //     return this.static[key] as t | undefined;
      // },
      // a: this.static[key] as t | undefined,
      // get a (): t | undefined {
      //     throw new Error("Access getter before it is defined");
      // },
    };
    Object.defineProperty(getter, "a", {
      get: () => {
        return this.static[key];
      }
    });
    return getter?.a;
  }
  /**
   * Gets the static data for the given key.
   * @deprecated Set the return value of {@link setStatic} to a variable instead, as that is a getter and provides type checking.
   * @param key - The key to get the static data for.
   * @returns The static data for the given key.
   */
  getStatic(key) {
    return this.static[key];
  }
  /**
   * Initializes / sets data that is unmodified by the player.
   * This is used to merge the loaded data with the default data.
   * It should be called before you load data.
   * Note: This should only be called once, and after it is called, you should not add new properties to data.
   * @example dataManager.init(); // Call this after setting the initial data.
   */
  init() {
    this.normalData = this.data;
    this.normalDataPlain = instanceToPlain(this.data);
  }
  /**
   * Compiles the given game data to a tuple containing the compressed game data and a hash.
   * @param data The game data to be compressed. Defaults to the current game data.
   * @returns [hash, data] - The compressed game data and a hash as a base64-encoded string to use for saving.
   */
  compileDataRaw(data = this.data) {
    const gameDataString = instanceToPlain(data);
    const hasedData = md5(`${this.gameRef.config.name.id}/${JSON.stringify(gameDataString)}`);
    return [hasedData, gameDataString];
  }
  /**
   * Compresses the given game data to a base64-encoded using lz-string, or btoa if lz-string is not available.
   * @param data The game data to be compressed. Defaults to the current game data.
   * @returns The compressed game data and a hash as a base64-encoded string to use for saving.
   */
  compileData(data = this.data) {
    const dataRawString = JSON.stringify(this.compileDataRaw(data));
    return import_lz_string.compressToBase64 ? (0, import_lz_string.compressToBase64)(dataRawString) : btoa(dataRawString);
  }
  /**
   * Decompiles the data stored in localStorage and returns the corresponding object.
   * @param data - The data to decompile. If not provided, it will be fetched from localStorage using the key `${game.config.name.id}-data`.
   * @returns The decompiled object, or null if the data is empty or invalid.
   */
  decompileData(data = localStorage.getItem(`${this.gameRef.config.name.id}-data`)) {
    if (!data)
      return null;
    let parsedData;
    try {
      parsedData = JSON.parse(import_lz_string.decompressFromBase64 ? (0, import_lz_string.decompressFromBase64)(data) : atob(data));
      return parsedData;
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(`Failed to decompile data (corrupted) "${data}":`, error);
      } else {
        throw error;
      }
      return null;
    }
  }
  /**
   * Validates the given data using a hashing algorithm (md5)
   * @param data - [hash, data] The data to validate.
   * @returns Whether the data is valid / unchanged. False means that the data has been tampered with / save edited.
   */
  validateData(data) {
    const [hashSave, gameDataToValidate] = data;
    const hashCheck = md5(`${this.gameRef.config.name.id}/${JSON.stringify(gameDataToValidate)}`);
    return hashSave === hashCheck;
  }
  /**
   * Resets the game data to its initial state and saves it.
   * @param reload - Whether to reload the page after resetting the data. Defaults to `false`.
   */
  resetData(reload = false) {
    if (!this.normalData) {
      throw new Error("dataManager.resetData(): You must call init() before writing to data.");
      return;
    }
    this.data = this.normalData;
    this.saveData();
    if (reload)
      window.location.reload();
  }
  /**
   * Saves the game data to local storage under the key `${game.config.name.id}-data`.
   * If you dont want to save to local storage, use {@link compileData} instead.
   * @param dataToSave - The data to save. If not provided, it will be fetched from localStorage using {@link compileData}.
   */
  saveData(dataToSave = this.compileData()) {
    localStorage.setItem(`${this.gameRef.config.name.id}-data`, dataToSave);
  }
  /**
   * Compiles the game data and prompts the user to download it as a text file using {@link window.prompt}.
   * If you want to implement a custom data export, use {@link compileData} instead.
   */
  exportData() {
    const content = this.compileData();
    if (prompt("Download save data?:", content) != null) {
      const blob = new Blob([content], { type: "text/plain" });
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `${this.gameRef.config.name.id}-data.txt`;
      downloadLink.textContent = `Download ${this.gameRef.config.name.id}-data.txt file`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }
  /**
   * Loads game data and processes it.
   * @param dataToParse - The data to load. If not provided, it will be fetched from localStorage using {@link decompileData}.
   * @param mergeData - Whether to merge the loaded data with the normal data. Defaults to `true`.
   * Warning: If set to `false`, the loaded data may have missing properties and may cause errors.
   * @returns The loaded data.
   */
  parseData(dataToParse = this.decompileData(), mergeData = true) {
    if (mergeData && (!this.normalData || !this.normalDataPlain))
      throw new Error("dataManager.parseData(): You must call init() before writing to data.");
    if (!dataToParse)
      return null;
    const [, loadedData] = dataToParse;
    function isPlainObject(obj) {
      return typeof obj === "object" && obj?.constructor === Object;
    }
    const objectHasOwnProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
    function deepMerge(sourcePlain, source, target) {
      const out = target;
      for (const key in sourcePlain) {
        if (objectHasOwnProperty(sourcePlain, key) && !objectHasOwnProperty(target, key)) {
          out[key] = sourcePlain[key];
        }
        if (source[key] instanceof Currency) {
          console.log("Merging currency: ", source[key], target[key]);
          const sourceCurrency = source[key];
          const targetCurrency = target[key];
          if (Array.isArray(targetCurrency.upgrades)) {
            const upgrades = targetCurrency.upgrades;
            targetCurrency.upgrades = {};
            for (const upgrade of upgrades) {
              targetCurrency.upgrades[upgrade.id] = upgrade.level;
            }
          }
          targetCurrency.upgrades = { ...sourceCurrency.upgrades, ...targetCurrency.upgrades };
          out[key] = targetCurrency;
        } else if (isPlainObject(sourcePlain[key]) && isPlainObject(target[key])) {
          out[key] = deepMerge(sourcePlain[key], source[key], target[key]);
        }
      }
      return out;
    }
    let loadedDataProcessed = !mergeData ? loadedData : deepMerge(this.normalDataPlain, this.normalData, loadedData);
    const templateClasses = function(templateClassesInit) {
      const out = [];
      for (const templateClassConvert of templateClassesInit) {
        out.push({
          class: templateClassConvert.class,
          name: templateClassConvert.name,
          // subclasses: templateClassConvert.subclasses,
          properties: Object.getOwnPropertyNames(instanceToPlain(new templateClassConvert.class()))
        });
      }
      return out;
    }([
      {
        class: Attribute,
        name: "attribute"
        // subclasses: {
        //     value: Decimal,
        // },
      },
      // {
      //     class: boost,
      //     subclasses: {
      //         baseEffect: Decimal,
      //         boostArray: [boostObject],
      //     },
      // },
      {
        class: Currency,
        name: "currency"
        // subclasses: {
        //     // boost: boost,
        //     upgrades: [upgradeData],
        //     value: Decimal,
        // },
      },
      {
        class: Decimal,
        name: "Decimal"
      }
    ]);
    function compareArrays(arr1, arr2) {
      return arr1.length === arr2.length && arr1.every((val) => arr2.includes(val));
    }
    function convertTemplateClass(templateClassToConvert, plain) {
      const out = plainToInstance(templateClassToConvert.class, plain);
      if (!out)
        throw new Error(`Failed to convert ${templateClassToConvert.name} to class instance.`);
      return out;
    }
    function plainToInstanceRecursive(plain) {
      const out = plain;
      for (const key in plain) {
        if (!(plain[key] instanceof Object && plain[key].constructor === Object))
          continue;
        if ((() => {
          for (const templateClassR of templateClasses) {
            if (compareArrays(Object.getOwnPropertyNames(plain[key]), templateClassR.properties)) {
              out[key] = convertTemplateClass(templateClassR, plain[key]);
              return false;
            }
          }
          return true;
        })()) {
          out[key] = plainToInstanceRecursive(plain[key]);
        }
      }
      return out;
    }
    loadedDataProcessed = plainToInstanceRecursive(loadedDataProcessed);
    return loadedDataProcessed;
  }
  /**
   * Loads game data and processes it.
   * @param dataToLoad - The data to load. If not provided, it will be fetched from localStorage using {@link decompileData}.
   * @returns Returns null if the data is empty or invalid, or false if the data is tampered with. Otherwise, returns true.
   */
  loadData(dataToLoad = this.decompileData()) {
    dataToLoad = typeof dataToLoad === "string" ? this.decompileData(dataToLoad) : dataToLoad;
    if (!dataToLoad)
      return null;
    const isDataValid = this.validateData([dataToLoad[0], instanceToPlain(dataToLoad[1])]);
    const parsedData = this.parseData(dataToLoad);
    if (!parsedData)
      return null;
    this.data = parsedData;
    for (const obj of this.eventsOnLoad) {
      obj();
    }
    return isDataValid;
  }
};

// src/game/gameCurrency.ts
var GameCurrency = class {
  /** @returns The data for the currency. */
  get data() {
    return this.dataPointer();
  }
  /** @returns The static data for the currency. */
  get static() {
    return this.staticPointer();
  }
  /**
   * Creates a new instance of the game class.
   * @param currencyPointer - A function that returns the current currency value.
   * @param staticPointer - A function that returns the static data for the game.
   * @param gamePointer A pointer to the game instance.
   * @param name - The name of the currency. This is optional, and you can use it for display purposes.
   */
  constructor(currencyPointer, staticPointer, gamePointer, name) {
    this.dataPointer = typeof currencyPointer === "function" ? currencyPointer : () => currencyPointer;
    this.staticPointer = typeof staticPointer === "function" ? staticPointer : () => staticPointer;
    this.game = gamePointer;
    this.name = name;
    this.game?.dataManager.addEventOnLoad(() => {
      this.static.onLoadData();
    });
  }
  /**
   * Gets the value of the game currency.
   * Note: There is no setter for this property. To change the value of the currency, use the corresponding methods in the static class.
   * @returns The value of the game currency.
   */
  get value() {
    return this.data.value;
  }
  // /**
  //  * Changes the pointer to the currency data. Warning: Do not use this unless you know what you're doing.
  //  * @param currencyPointer - A function or pointer that returns the current currency value.
  //  */
  // public updateDataPointer (currencyPointer: (() => currency) | currency): void {
  //     this.data = typeof currencyPointer === "function" ? currencyPointer() : currencyPointer;
  // }
};

// src/game/gameAttribute.ts
var GameAttribute = class {
  /**
   * Creates a new instance of the attribute class.
   * @param attributePointer - A function that returns the current attribute value.
   * @param staticPointer - A function that returns the static data for the attribute.
   * @param gamePointer A pointer to the game instance.
   */
  constructor(attributePointer, staticPointer, gamePointer) {
    this.data = typeof attributePointer === "function" ? attributePointer() : attributePointer;
    this.static = typeof staticPointer === "function" ? staticPointer() : staticPointer;
    this.game = gamePointer;
  }
  /**
   * Gets the value of the attribute.
   * NOTE: This getter is sometimes inaccurate.
   * @returns The value of the attribute.
   */
  get value() {
    return this.static.value;
  }
  /**
   * Sets the value of the attribute.
   * NOTE: This setter should not be used when boost is enabled.
   * @param value - The value to set the attribute to.
   */
  set value(value) {
    this.data.value = value;
  }
};

// src/game/resetLayer.ts
var GameReset = class {
  /**
   * Creates a new instance of the game reset.
   * @param currenciesToReset The currencies to reset.
   * @param extender The extender for the game reset. WARNING: Do not set this to the same object, as it will cause an infinite loop.
   */
  constructor(currenciesToReset, extender) {
    this.currenciesToReset = Array.isArray(currenciesToReset) ? currenciesToReset : [currenciesToReset];
    this.extender = extender;
    this.id = Symbol();
  }
  /**
   * Resets a currency to its default value, and runs the extender's reset function if it exists (recursively).
   */
  reset() {
    this.onReset?.();
    this.currenciesToReset.forEach((currency) => {
      currency.static.reset();
    });
    if (this.extender && this.extender.id !== this.id) {
      this.extender.reset();
    }
  }
};

// src/game/game.ts
var gameDefaultConfig = {
  mode: "production",
  name: {
    title: "",
    id: "",
    version: "0.0.0"
  },
  settings: {
    framerate: 30
  },
  initIntervalBasedManagers: true
};
var Game = class _Game {
  static {
    /** The static config manager for the game. */
    this.configManager = new ConfigManager(gameDefaultConfig);
  }
  /**
   * Creates a new instance of the game class.
   * @param config - The configuration object for the game.
   * @example
   * const myGame = new game({
   *     name: {
   *         title: "My Game",
   *         id: "my-game",
   *     },
   *     // Additional options here
   * });
   */
  constructor(config) {
    this.config = _Game.configManager.parse(config);
    this.dataManager = new DataManager(this);
    this.keyManager = new KeyManager({
      autoAddInterval: this.config.initIntervalBasedManagers,
      fps: this.config.settings.framerate
    });
    this.eventManager = new EventManager({
      autoAddInterval: this.config.initIntervalBasedManagers,
      fps: this.config.settings.framerate
    });
    this.tickers = [];
  }
  /** Initializes the game. Also initializes the data manager. */
  init() {
    this.dataManager.init();
  }
  /**
   * Changes the framerate of the game.
   * @param fps - The new framerate to use.
   */
  changeFps(fps) {
    this.keyManager.changeFps(fps);
    this.eventManager.changeFps(fps);
  }
  /**
   * Adds a new currency section to the game. {@link GameCurrency} is the class.
   * It automatically adds the currency and currencyStatic objects to the data and static objects for saving and loading.
   * @param name - The name of the currency section. This is also the name of the data and static objects, so it must be unique.
   * @returns A new instance of the gameCurrency class.
   * @example
   * const currency = game.addCurrency("currency");
   * currency.static.gain();
   * console.log(currency.value); // E(1)
   */
  addCurrency(name) {
    this.dataManager.setData(name, {
      currency: new Currency()
    });
    this.dataManager.setStatic(name, {
      // @ts-expect-error - fix this
      currency: new CurrencyStatic(() => this.dataManager.getData(name).currency)
      // attributes: {},
    });
    const classInstance = new GameCurrency(() => this.dataManager.getData(name).currency, () => this.dataManager.getStatic(name).currency, this, name);
    return classInstance;
  }
  /**
   * Adds a new attribute to the game. {@link GameAttribute} is the class.
   * It automatically adds the attribute and attributeStatic objects to the data and static objects for saving and loading.
   * @param name - The name of the attribute.
   * @param useBoost - Indicates whether to use boost for the attribute.
   * @param initial - The initial value of the attribute.
   * @returns The newly created attribute.
   * @example
   * const myAttribute = game.addAttribute("myAttribute");
   */
  addAttribute(name, useBoost = true, initial = 0) {
    const dataRef = this.dataManager.setData(name, new Attribute(initial));
    const staticRef = this.dataManager.setStatic(name, new AttributeStatic(this.dataManager.getData(name), useBoost, initial));
    const classInstance = new GameAttribute(this.dataManager.getData(name), this.dataManager.getStatic(name), this);
    return classInstance;
  }
  /**
   * Creates a new game reset object with the specified currencies to reset.
   * @param currenciesToReset - The currencies to reset.
   * @param extender - An optional object to extend the game reset object with.
   * @returns The newly created game reset object.
   */
  addReset(currenciesToReset, extender) {
    const reset = new GameReset(currenciesToReset, extender);
    return reset;
  }
};
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
