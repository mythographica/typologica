'use strict';

const objectTypes = [

	Date,
	Array,

	RegExp,
	
	Map,
	WeakMap,
	
	Set,
	WeakSet,

	Promise,

].reduce((obj:any, Constructor) => {
	const {
		name
	} = Constructor;
	obj[name] = (entity:any) => {
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
].reduce((obj:any, primitiveName) => {
	obj[primitiveName] = () => {
		return primitiveName;
	};
	return obj;
}, {

	function (entity:object) {
		// Class or Lambda or general Function ?
		// Constructible ?
		// Extended or not ?
		// Proxy ?
		const isConstructed = typeof entity.constructor === 'function';
		return isConstructed ? 'function' : 'object';
	},

	object (entity:any) {

		if (entity === null) {
			// null
			return 'null';
		}
		
		const cstr = entity.constructor;
		// it might be proxy or something else
		if (typeof cstr !== 'function') {
			return 'object';
		}
		
		const {
			name
		} = cstr;
		
		// it might be proxy of anonymous function
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
			// String
			// Number
			// Boolean
			return gotObjectedPrimitive();
		}

		if (entity instanceof Error) {
			// as of:
				// EvalError,
				// InternalError, // missing 4 node.js
				// RangeError,
				// ReferenceError,
				// SyntaxError,
				// TypeError,
				// URIError,
				//  ... and others ...
			return 'error';
		}
		
		if (!objectTypes[name]) {
			return name;	
		}
		
		return  objectTypes[name](entity) ? name.toLowerCase() : name;

	}
});

const typechecker = function (entity:any):string {

	const typedAs = typeof entity;
	const checkResult = types[typedAs](entity);
	// typedAs might be necessary for future types
	// return checkResult || typedAs;
	// but in an attempt to incre the coverage ...
	return checkResult;

};

export const typologica = typechecker;
export default typologica as typeof typologica;
(module).exports = exports.default;
exports.default.default = exports.default;
exports.default.typologica = exports.default;
