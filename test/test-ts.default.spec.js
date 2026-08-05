'use strict';
Object.defineProperty(exports, '__esModule', { value : true });
var __1 = require('..');
var chai_1 = require('chai');
require('mocha');
describe('ts type checking for "import typologica from \'..\';" works', function () {
    it('test for string', function () {
        (0, chai_1.expect)((0, __1.default)('asdf')).equal('string');
    });
});
