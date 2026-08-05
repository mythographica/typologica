'use strict';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
        var lname = __spreadArray([sname[0].toLowerCase()], sname.slice(1), true).join('');
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
