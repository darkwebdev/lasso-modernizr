'use strict';

const modernizr = require('customizr-custom-tests');

module.exports = function(lasso, config) {
    const defaults = {
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
        init: function(lassoContext, callback) {
            callback();
        },

        cacheConfig: {
            cacheable: true,
            static: true
        },

        getDir: function() {
            return null;
        },

        read: function(context, callback) {
            modernizr(Object.assign(defaults, config), customBuild => callback(null, customBuild.result));
        },

        getSourceFile: function() {
            return null;
        },

        getLastModified: function(lassoContext, callback) {
            return callback(null, -1);
        }
    });
};
