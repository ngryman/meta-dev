# meta-dev

> Meta packages for devDependencies.

[![travis][travis-image]][travis-url] [![codecov][codecov-image]][codecov-url]

[travis-image]: https://img.shields.io/travis/ngryman/meta-dev.svg?style=flat
[travis-url]: https://travis-ci.org/ngryman/meta-dev
[codecov-image]: https://img.shields.io/codecov/c/github/ngryman/meta-dev.svg
[codecov-url]: https://codecov.io/github/ngryman/meta-dev


**meta-dev** is a meta package of `devDependencies` needed for a simple node library. For more details please see the associated [article].

It includes the following packages:

 - [ava]: Test runner.
 - [babel-plugin-transform-es2015-modules-commonjs]: Transpile `es6` imports to
 `commonjs` requires.
 - [babel-register]: Used to transpile test files.
 - [codecov.io]: Code coverage reports.
 - [eslint]: Linter.
 - [eslint-config-ngryman]: Linter configuration.
 - [jsdoc-to-markdown]: Documentation generator.
 - [nyc]: Coverage analyzer.
 - [rollup]: Bundler.

It expose a `meta` binary which executes common tasks:

Command               | Task
--------------------- | ----
`meta build`          | Build a `commonjs` version ([rollup]).
`meta check-coverage` | Check coverage is at least 95% ([nyc]).
`meta coverage`       | Submit coverage report to **codecov.io** ([codecov.io])
`meta dev`            | Watch for changes and run tests ([ava]).
`meta docs`           | Build documentation from `jsdoc` comments ([jsdoc-to-markdown])
`meta lint`           | Lint source files using `ngryman` configuration ([eslint]).
`meta see-coverage`   | Open the browser to visualize coverage report ([nyc]).
`meta test`           | Run the test suite ([ava], [nyc]).
```

## Install

```bash
npm install --save meta-dev
```

## Usage

### `package.json`

```javascript
{
  "main": "index.cjs",
  "jsnext:main": "index.js",
  "engines": {
    "node": ">=4"
  },
  "scripts": {
    "lint": "meta lint",
    "pretest": "npm run lint -s",
    "test": "meta test",
    "dev": "meta dev",
    "coverage": "meta coverage",
    "see-coverage": "meta see-coverage",
    "check-coverage": "meta check-coverage",
    "docs": "meta docs",
    "prebuild": "npm run lint -s",
    "build": "meta build"
  },
  "devDependencies": {
    "meta": "0.0.1"
  },
  "ava": {
    "require": [
      "babel-register"
    ]
  },
  "babel": {
    "plugins": [
      "babel-plugin-transform-es2015-modules-commonjs"
    ]
  }
}
```


## License

MIT © [Nicolas Gryman](http://ngryman.sh)


[article]: https://medium.com/@ngryman/bundle-your-devdependencies-and-chill-421949bfd9a5
[ava]: https://github.com/avajs/ava
[babel-plugin-transform-es2015-modules-commonjs]: https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-es2015-modules-commonjs
[babel-register]: https://github.com/babel/babel/tree/master/packages/babel-register
[codecov.io]: https://github.com/cainus/codecov.io
[eslint]: https://github.com/eslint/eslint
[eslint-config-ngryman]: https://github.com/ngryman/eslint-config-ngryman
[jsdoc-to-markdown]: https://github.com/jsdoc2md/jsdoc-to-markdown
[nyc]: https://github.com/istanbuljs/nyc
[rollup]: https://github.com/rollup/rollup
