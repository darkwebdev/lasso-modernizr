'use strict';

var modernizr = require('customizr');
var extend = require('raptor-util').extend;

module.exports = function (lasso, config) {
    var defaults = {
        cache: true,
        devFile: false,
        dest: './modernizr-custom.min.js',
        options: [],
        uglify: true,
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

    modernizr(extend(defaults, config));
};
