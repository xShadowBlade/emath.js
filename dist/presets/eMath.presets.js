(function (g, f) {
    var hasExports = typeof exports === 'object';
    if (typeof define === "function" && define.amd) {
      define(['reflect-metadata', 'class-transformer', 'lz-string'], f);
    } else if (typeof module === "object" && module.exports) {
      module.exports = f(require('reflect-metadata'), require('class-transformer'), require('lz-string'));
    } else {
      var m = hasExports ? f(require('reflect-metadata'), require('class-transformer'), require('lz-string')) : f(g["reflect-metadata"], g["class-transformer"], g["lz-string"]);
      var root = hasExports ? exports : g;
      for(var i in m) root[i] = m[i];
    }}(typeof self !== 'undefined' ? self : this, (__da, __db, __dc) => {
  var exports = {};
  var module = { exports };
"use strict";
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
