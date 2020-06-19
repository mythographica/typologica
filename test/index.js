'use strict';

// const {typologica: checker} = require('..');
const checker = require('..');

const {assert, expect} = require('chai');

describe('types tests', () => {

	it('void 0', () => {
		const result = checker(void 0);
		expect(result).equal('undefined');
	});
	it('undefined', () => {
		const result = checker(undefined);
		expect(result).equal('undefined');
	});
	it('boolean true', () => {
		const result = checker(true);
		expect(result).equal('boolean');
	});
	it('boolean false', () => {
		const result = checker(false);
		expect(result).equal('boolean');
	});
	it('string', () => {
		const result = checker('');
		expect(result).equal('string');
	});
	it('number 0', () => {
		const result = checker(0);
		expect(result).equal('number');
	});
	it('number -0', () => {
		const result = checker(-0);
		expect(result).equal('number');
	});
	it('number NaN', () => {
		const result = checker(NaN);
		expect(result).equal('number');
	});
	it('number Infinity', () => {
		const result = checker(Infinity);
		expect(result).equal('number');
	});
	it('number -Infinity', () => {
		const result = checker(-Infinity);
		expect(result).equal('number');
	});
	it('symbol', () => {
		const result = checker(Symbol('test symbol'));
		expect(result).equal('symbol');
	});
	it('bigint', () => {
		const result = checker(1n);
		expect(result).equal('bigint');
	});

});

describe('null test', () => {
	it('null', () => {
		const result = checker(null);
		expect(result).equal('null');
	});
});

describe('functions tests', () => {
	it('function', () => {
		const result = checker(function () {});
		expect(result).equal('function');
	});
	it('arrow function', () => {
		const result = checker(() => {});
		expect(result).equal('function');
	});
	it('class function', () => {
		const result = checker(class {});
		expect(result).equal('function');
	});
});

describe('simple objects tests', () => {

	it('simple object', () => {
		const result = checker({});
		expect(result).equal('object');
	});

	it('simple array', () => {
		const result = checker([]);
		expect(result).equal('array');
	});

});

describe('derived primitives tests', () => {
	it('boolean true', () => {
		const result = checker(new Boolean('false')); // true
		expect(result).equal('boolean');
	});
	it('boolean false', () => {
		const result = checker(new Boolean());
		expect(result).equal('boolean');
	});
	it('string', () => {
		const result = checker(new String);
		expect(result).equal('string');
	});
	it('number', () => {
		const result = checker(new Number);
		expect(result).equal('number');
	});
	it('bigint', () => {
		const result = checker(BigInt(1)); // there is no new for bigint
		expect(result).equal('bigint');
	});
});

describe('derived objects tests', () => {

	it('date', () => {
		const result = checker(new Date());
		expect(result).equal('date');
	});


	it('map', () => {
		const result = checker(new Map());
		expect(result).equal('map');
	});
	it('weakmap', () => {
		const result = checker(new WeakMap());
		expect(result).equal('weakmap');
	});

	it('set', () => {
		const result = checker(new Set());
		expect(result).equal('set');
	});
	it('weakset', () => {
		const result = checker(new WeakSet());
		expect(result).equal('weakset');
	});

});


describe('suggested as data coupled tests', () => {

	it('regexp inline', () => {
		const result = checker(/ /g);
		expect(result).equal('regexp');
	});

	it('regexp derived', () => {
		const result = checker(/ /g);
		expect(result).equal('regexp');
	});

	it('Promise', () => {
		const result = checker(Promise.resolve('test'));
		expect(result).equal('promise');
	});

});

describe('errors objects tests', () => {

	it('Error', () => {
		const result = checker(new Error('test'));
		expect(result).equal('error');
	});
	it('EvalError', () => {
		const result = checker(new EvalError('test'));
		expect(result).equal('error');
	});
	it('RangeError', () => {
		const result = checker(new RangeError('test'));
		expect(result).equal('error');
	});
	it('ReferenceError', () => {
		const result = checker(new ReferenceError('test'));
		expect(result).equal('error');
	});
	it('SyntaxError', () => {
		const result = checker(new SyntaxError('test'));
		expect(result).equal('error');
	});
	it('TypeError', () => {
		const result = checker(new TypeError('test'));
		expect(result).equal('error');
	});
	it('URIError', () => {
		const result = checker(new URIError('test'));
		expect(result).equal('error');
	});

});

describe('unsupported types', () => {

	it('"object"   : Proxy function true', () => {
		const proxy = new Proxy(function () {}, {
			get () {
				return true;
			}
		});
		const result = checker(proxy);
		expect(result).equal('object');
	});
	it('"object"   : Proxy function false', () => {
		const proxy = new Proxy(function () {}, {
			get () {
				return false;
			}
		});
		const result = checker(proxy);
		expect(result).equal('object');
	});
	it('"object"   : Proxy function null', () => {
		const proxy = new Proxy(function () {}, {
			get () {
				return null;
			}
		});
		const result = checker(proxy);
		expect(result).equal('object');
	});
	it('"object"   : Proxy function undefined', () => {
		const proxy = new Proxy(function () {}, {
			get () {
				return undefined;
			}
		});
		const result = checker(proxy);
		expect(result).equal('object');
	});
	it('"function" : Proxy function function', () => {
		const proxy = new Proxy(function () {}, {
			get () {
				return function () {};
			}
		});
		const result = checker(proxy);
		expect(result).equal('function');
	});
	it('"object"   : Proxy object true', () => {
		const proxy = new Proxy({}, {
			get () {
				return true;
			}
		});
		const result = checker(proxy);
		expect(result).equal('object');
	});
	it('"object"   : Proxy object false', () => {
		const proxy = new Proxy({}, {
			get () {
				return false;
			}
		});
		const result = checker(proxy);
		expect(result).equal('object');
	});
	it('"object"   : Proxy object null', () => {
		const proxy = new Proxy({}, {
			get () {
				return null;
			}
		});
		const result = checker(proxy);
		expect(result).equal('object');
	});
	it('"object"   : Proxy object undefined', () => {
		const proxy = new Proxy({}, {
			get () {
				return undefined;
			}
		});
		const result = checker(proxy);
		expect(result).equal('object');
	});
	it('"object"   : Proxy object function', () => {
		const proxy = new Proxy({}, {
			get () {
				return function () {};
			}
		});
		const result = checker(proxy);
		expect(result).equal('object');
	});
});

describe('something constructed with constructor.name', () => {

	it('MyConstructor', () => {
		function MyConstructor () {};
		const instance = new MyConstructor();
		const result = checker(instance);
		expect(result).equal('MyConstructor');
	});

	it('anonymous constructor : constructed without name', () => {
		const MyConstructor = (() => function () {})();
		const instance = new MyConstructor();
		const result = checker(instance);
		expect(result).equal('object');
	});

	it('constructor with name Array but not an Array instance', () => {
		function Array () {};
		const instance = new Array();
		const result = checker(instance);
		expect(result).equal('Array');
	});

});

