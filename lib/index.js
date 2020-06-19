'use strict';
Object.defineProperty(exports, '__esModule', { value : true });
const objectTypes = [
    Date,
    Array,
    RegExp,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Promise,
].reduce((obj, Constructor) => {
    const { name } = Constructor;
    obj[name] = (entity) => {
        return entity instanceof Constructor;
    };
    return obj;
}, {});
const types = [
    'undefined',
    'boolean',
    'string',
    'number',
    'symbol',
    'bigint',
].reduce((obj, primitiveName) => {
    obj[primitiveName] = () => {
        return primitiveName;
    };
    return obj;
}, {
    function (entity) {
        const isConstructed = typeof entity.constructor === 'function';
        return isConstructed ? 'function' : 'object';
    },
    object (entity) {
        if (entity === null) {
            return 'null';
        }
        const cstr = entity.constructor;
        if (typeof cstr !== 'function') {
            return 'object';
        }
        const { name } = cstr;
        if (!name.length) {
            return 'object';
        }
        const sname = name.split('');
        const lname = [sname[0].toLowerCase(), ...sname.slice(1)].join('');
        if (lname === 'object') {
            return 'object';
        }
        const gotObjectedPrimitive = types[lname];
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
const checker = (entity) => {
    const typedAs = typeof entity;
    const checkResult = types[typedAs](entity);
    return checkResult;
};
exports.default = checker;
module.exports = checker;
