/* global define */

'use strict';

define(['Modernizr'], function(Modernizr) {
    Modernizr.addTest('ie', function () {
        return /MSIE/i.test(navigator.userAgent) ||
            /rv:\d/i.test(navigator.userAgent) ||
            /Edge\/\d./i.test(navigator.userAgent);
    });
});
