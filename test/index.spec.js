'use strict';

const helpers = require('./helpers');
const buildManifest = helpers.buildManifest;
const includesTest = helpers.includesTest;
const excludesTest = helpers.excludesTest;

describe('lasso-modernizr', () => {
    it('only bundles the touchevents test', () => {
        return buildManifest()
            .then(includesTest('touchevents'))
            .then(excludesTest('csstransitions'));
    });

    it('includes custom tests', () => {
        return buildManifest().then(includesTest('ie'));
    });
});
