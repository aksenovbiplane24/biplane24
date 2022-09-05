'use strict';

const testUserAdapters = require('..');
const assert = require('assert').strict;

assert.strictEqual(testUserAdapters(), 'Hello from testUserAdapters');
console.info("testUserAdapters tests passed");
