'use strict';

var helpers = require('./helpers');
var buildManifest = helpers.buildManifest;
var includesTest = helpers.includesTest;
var excludesTest = helpers.excludesTest;

describe('lasso-modernizr', function () {
    it('only bundles the touchevents test', function () {
        return buildManifest()
            .then(includesTest('touchevents'))
            .then(excludesTest('csstransitions'));
    });

    it('includes custom tests', function () {
       return buildManifest().then(includesTest('ie'));
    });
});