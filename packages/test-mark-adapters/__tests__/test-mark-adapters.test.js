'use strict';

const testMarkAdapters = require('..');
const assert = require('assert').strict;

assert.strictEqual(testMarkAdapters(), 'Hello from testMarkAdapters');
console.info("testMarkAdapters tests passed");
