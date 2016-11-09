'use strict';

const expect = require('chai').expect;
const lasso = require('lasso');
const lassoModernizrPlugin = require('../index');
const nodePath = require('path');
const fs = require('fs');

const plugins = [
    {
        plugin: lassoModernizrPlugin,
        config: {
            tests: ['touchevents'],
            customTests: ['test/custom-tests/ie-test.js']
        }
    }
];

const helpers = module.exports = {
    cleanManifest: function() {
        return new Promise((resolve, reject) => {
            cleanRequireCache();

            return removeBuiltManifest(reject, resolve);
        });
    },

    buildLassoPage: function(_plugins) {
        return () => {
            return new Promise((resolve, reject) => {
                const myLasso = lasso.create({
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
                }, (err, lassoPageResult) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(lassoPageResult);
                    }
                });
            });
        };
    },

    buildManifest: function(_plugins) {
        return helpers.cleanManifest().then(helpers.buildLassoPage(_plugins));
    },

    readManifest: function() {
        return fs.readFileSync(nodePath.join(__dirname, 'static/testPage.js'), { encoding: 'utf8' });
    },

    includesTest: function(testName) {
        return () => expect(helpers.readManifest()).to.contain(`Modernizr.addTest('${testName}'`);
    },

    excludesTest: function(testName) {
        return () => expect(helpers.readManifest()).to.not.contain(`Modernizr.addTest('${testName}'`);
    }
};

function cleanRequireCache() {
    Object.keys(require.cache).forEach(key => {
        delete require.cache[key];
    });
}

function removeBuiltManifest(reject, resolve) {
    return fs.unlink(nodePath.join(__dirname, 'static/testPage.js'), err => {
        if (err && err.code !== 'ENOENT') {
            reject(err);
        } else {
            resolve();
        }
    });
}
