# lasso-modernizr plugin

Lasso.js plugin for custom builds of [Modernizr](https://modernizr.com)

## Installation

```sh
npm install lasso-modernizr --save
```

The `lasso-modernizr` plugin will then need to be registered (and configured) as shown below:

```javascript
require('lasso').configure({
    ...
    plugins: [
        'lasso-modernizr',
        ...
    ]
});
```

## Basic Usage

Include the generated file name into the dependencies of the page where you intend to use Modernizr.

**browser.json**

```json
{
    "dependencies": [
        "./util/modernizr-custom.min.js"
    ]
}
```

You can inline Modernizr into HTML. That's recommended when you want to reduce the amount of rerenders in cases when you use:
- `setClasses` - set classes on HTML element for conditional CSS behaviour
- `html5printshiv` - fix HTML5 elements for IE8 and below

```json
{
    "dependencies": [
        { "path": "./util/modernizr-custom.min.js", "inline": true },
    ]
}
```

Don't forget to exclude modernizr-custom.min.js (or even *.min.js) from linting.

## Modernizr Configuration

You should pass Modernizr configuration options through the `config` object directly to Modernizr. For example:

```js
require('lasso').configure({
    ...
    plugins: [
        {
            plugin: 'lasso-modernizr',
            config: {
                dest: './util/modernizr-custom.min.js',
                crawl: false,
                tests: [
                    'csstransitions',
                    'flexbox'
                ]
            }
        }
    ]
});
```

Now just use it like `Modernizr.flexbox === true`

Default options:

```js
    ...
    config: {
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
    }
```

`Crawl` and `files` options mean that these files will be automtically parsed for Modernizr usage.

## Custom Modernizr tests

For custom tests use `addTest` option:

```js
    ...
    config: {
        ...
        options: [
            'addTest'
        ] ,
        customTests: [
            './util/modernizr-tests.js'
        ]
    }
```

**modernizr-tests.js**

```js
    Modernizr.addTest('ios', function(){
        return Boolean(navigator.userAgent.match(/(iPad|iPhone|iPod)/g))
    });
```

Now you can use it like `Modernizr.ios === true`

Other Modernizr options description can be found [here](https://github.com/Modernizr/customizr#config-file).