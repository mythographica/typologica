'use strict';
exports.__esModule = true;
var __1 = require('..');
var chai_1 = require('chai');
require('mocha');
describe('ts type checking for "import typologica from \'..\';" works', function () {
    it('test for string', function () {
        chai_1.expect(__1['default']('asdf')).equal('string');
    });
});
