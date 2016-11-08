'use strict';

var expect = require('chai').expect;
var lasso = require('lasso');
var lassoModernizrPlugin = require('../index');
var nodePath = require('path');
var fs = require('fs');

var plugins = [
    {
        plugin: lassoModernizrPlugin,
        config: {
            tests: ['touchevents'],
            customTests: ['test/custom-tests/ie-test.js']
        }
    }
];

var helpers = module.exports = {
    cleanManifest: function () {
        return new Promise(function (resolve, reject) {
            // Clean require cache
            for (var k in require.cache) {
                if (require.cache.hasOwnProperty(k)) {
                    delete require.cache[k];
                }
            }

            // Remove built manifest
            return fs.unlink(nodePath.join(__dirname, 'static/testPage.js'), function (err) {
                if (err && err.code !== 'ENOENT') {
                    return reject(err);
                }

                resolve();
            });
        });
    },

    buildLassoPage: function (_plugins) {
        return function () {
            return new Promise(function (resolve, reject) {
                var myLasso = lasso.create({
                    fileWriter: {
                        fingerprintsEnabled: false,
                        outputDir: nodePath.join(__dirname, 'static')
                    },
                    bundlingEnabled: true,
                    plugins: _plugins || plugins
                });

                myLasso.lassoPage({
                    name: 'testPage',
                    dependencies: [{ type: 'modernizr', inline: false }]
                }, function (err, lassoPageResult) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(lassoPageResult);
                });
            });
        };
    },

    buildManifest: function (_plugins) {
        return helpers.cleanManifest().then(helpers.buildLassoPage(_plugins));
    },

    readManifest: function () {
        return fs.readFileSync(nodePath.join(__dirname, 'static/testPage.js'), {encoding: 'utf8'})
    },

    includesTest: function (testName) {
        return function () {
            expect(helpers.readManifest()).to.contain('Modernizr.addTest(\'' + testName + '\'');
        };
    },

    excludesTest: function (testName) {
        return function () {
            expect(helpers.readManifest()).to.not.contain('Modernizr.addTest(\'' + testName + '\'');
        };
    }
};