'use strict';

var modernizr = require('customizr-custom-tests');
var extend = require('raptor-util').extend;

module.exports = function (lasso, config) {
    var defaults = {
        cache: true,
        dest: false, /* Don't write the file to disk, just give us a string back */
        options: [],
        uglify: false, /* Don't minify! Let Lasso.js do that! */
        tests: [],
        excludeTests: [],
        crawl: true,
        useBuffers: false,
        files: {
            src: [
                '*[^(g|G)runt(file)?].{js,css,scss}',
                '**[^node_modules]/**/*.{js,css,scss}',
                '!lib/**/*'
            ]
        },
        customTests: []
    };

    lasso.dependencies.registerJavaScriptType('modernizr', {
        init: function (lassoContext, callback) {
            callback();
        },

        cacheConfig: {
            cacheable: true,
            static: true
        },

        getDir: function () {
            return null;
        },

        read: function (context, callback) {
            modernizr(extend(defaults, config), function(customBuild) {
                callback(null, customBuild.result);
            });
        },

        getSourceFile: function () {
            return null;
        },

        getLastModified: function (lassoContext, callback) {
            return callback(null, -1);
        }
    });
};
