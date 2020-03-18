'use strict';

const objectTypes = [

	Date,
	Array,

	RegExp,
	
	Map,
	WeakMap,
	
	Set,
	WeakSet,

	Proxy,
	Reflect,

	Promise,

].reduce((obj, Constructor) => {
	const {
		name
	} = Constructor;
	obj[name] = (entity) => {
		return entity instanceof Constructor;
	};
	return obj;
}, {});

const types = {

	undefined () {
		return 'undefined';
	},

	boolean () {
		return 'boolean';
	},

	string () {
		return 'string';
	},

	number () {
		return 'number';
	},

	symbol () {
		return 'symbol';
	},

	bigint () {
		return 'bigint';
	},

	function () {
		// Class or Lambda or general Function ?
		// Constructible ?
		// Extended or not ?
		return 'function';
	},

	object (entity) {

		if (entity === null) {
			// null
			return 'null';
		}

		const {
			name
		} = entity.constructor;

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
			return gotObjectedPrimitive;
		}

		if (entity instanceof Error) {
			// Error as of
			// 	EvalError,
			// 	InternalError, // missing 4 node.js
			// 	RangeError,
			// 	ReferenceError,
			// 	SyntaxError,
			// 	TypeError,
			// 	URIError,
			return 'error';
		}

		return objectTypes[name](entity) ? name.toLowerCase() : name;

	}
};


module.exports = (entity) => {

	const typedAs = typeof entity;
	return types[typedAs](entity) || 'undefined';

};
