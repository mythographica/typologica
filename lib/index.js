'use strict';
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, '__esModule', { value : true });
exports.typologica = void 0;
var objectTypes = [
    Date,
    Array,
    RegExp,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Promise,
].reduce(function (obj, Constructor) {
    var {name} = Constructor;
    obj[name] = function (entity) {
        return entity instanceof Constructor;
    };
    return obj;
}, {});
var types = [
    'undefined',
    'boolean',
    'string',
    'number',
    'symbol',
    'bigint',
].reduce(function (obj, primitiveName) {
    obj[primitiveName] = function () {
        return primitiveName;
    };
    return obj;
}, {
    function : function (entity) {
        var isConstructed = typeof entity.constructor === 'function';
        return isConstructed ? 'function' : 'object';
    },
    object : function (entity) {
        if (entity === null) {
            return 'null';
        }
        var cstr = entity.constructor;
        if (typeof cstr !== 'function') {
            return 'object';
        }
        var {name} = cstr;
        if (!name.length) {
            return 'object';
        }
        var sname = name.split('');
        var lname = __spreadArrays([sname[0].toLowerCase()], sname.slice(1)).join('');
        if (lname === 'object') {
            return 'object';
        }
        var gotObjectedPrimitive = types[lname];
        if (gotObjectedPrimitive) {
            return gotObjectedPrimitive();
        }
        if (entity instanceof Error) {
            return 'error';
        }
        if (!objectTypes[name]) {
            return name;
        }
        return objectTypes[name](entity) ? name.toLowerCase() : name;
    }
});
var typechecker = function (entity) {
    var typedAs = typeof entity;
    var checkResult = types[typedAs](entity);
    return checkResult;
};
exports.typologica = typechecker;
exports.default = exports.typologica;
(module).exports = exports.default;
exports.default.default = exports.default;
exports.default.typologica = exports.default;
