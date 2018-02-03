# Subsume JSON support for Acorn

[![NPM version](https://img.shields.io/npm/v/acorn-json-superset.svg)](https://www.npmjs.org/package/acorn-json-superset)

This is a plugin for [Acorn](http://marijnhaverbeke.nl/acorn/) - a tiny, fast JavaScript parser, written completely in JavaScript.

It implements the stage 3 proposal [Subsume JSON](https://github.com/tc39/proposal-json-superset).

## Usage

You can use this module directly in order to get an Acorn instance with the plugin installed:

```javascript
var acorn = require('acorn-json-superset');
```

Or you can use `inject.js` for injecting the plugin into your own version of Acorn like this:

```javascript
var acorn = require('acorn-json-superset/inject')(require('./custom-acorn'));
```

Then, use the `plugins` option to enable the plugiin:

```javascript
var ast = acorn.parse(code, {
  ecmaVersion: 9,
  plugins: { jsonSuperset: true }
});
```

## License

This plugin is released under the [GNU Affero General Public License](./LICENSE).
