# meta-dev

[![Greenkeeper badge](https://badges.greenkeeper.io/ngryman/meta-dev.svg)](https://greenkeeper.io/)

> Meta package for devDependencies.


**meta-dev** is a meta package of `devDependencies` needed for a simple node library. For more details please see the associated [article].

It includes the following packages:

 - [ava]: Test runner.
 - [babel-preset-node5]: Transpile to `es6` using already implemented stuff in `node 5+`.
 - [babel-register]: Used to transpile test files.
 - [codecov.io]: Code coverage reports.
 - [eslint]: Linter.
 - [eslint-config-ngryman]: Linter configuration.
 - [jsdoc-to-markdown]: Documentation generator.
 - [nyc]: Coverage analyzer.
 - [rollup]: Bundler.
 - [rollup-plugin-multi-entry]: Concat multiple files into one.

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


## Install

```bash
npm install --save meta-dev
```


## Usage

### `package.json`

```javascript
{
  "main": "dist/${packageName}.node.js",
  "browser": "dist/${packageName}.browser.js",
  "module": "index.js",
  "jsnext:main": "index.js",
  "engines": {
    "node": ">=5"
  },
  "files": [
    "index.js",
    "dist/"
  ],
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
    "build": "meta build",
    "prepublish": "npm run build -s"
  },
  "precommit": [
    "test",
    "check-coverage",
    "docs"
  ],
  "ava": {
    "require": [
      "babel-register"
    ]
  },
  "babel": {
    "env": {
      "test": {
        "presets": [
          "node5"
        ],
        "plugins": [
          "istanbul"
        ]
      }
    }
  },
  "eslintConfig": {
    "extends": "ngryman"
  },
  "nyc": {
    "require": [
      "babel-register"
    ],
    "sourceMap": false,
    "instrument": false
  },
  "dependencies": {},
  "devDependencies": {
    "meta-dev": "^0.4.0",
    "pre-commit": "^1.1.3"
  }
}
```


## License

MIT © [Nicolas Gryman](http://ngryman.sh)


[article]: https://medium.com/@ngryman/bundle-your-devdependencies-and-chill-421949bfd9a5
[ava]: https://github.com/avajs/ava
[babel-preset-node5]: https://github.com/leebenson/babel-preset-node5
[babel-register]: https://github.com/babel/babel/tree/master/packages/babel-register
[codecov.io]: https://github.com/cainus/codecov.io
[eslint]: https://github.com/eslint/eslint
[eslint-config-ngryman]: https://github.com/ngryman/eslint-config-ngryman
[jsdoc-to-markdown]: https://github.com/jsdoc2md/jsdoc-to-markdown
[nyc]: https://github.com/istanbuljs/nyc
[rollup]: https://github.com/rollup/rollup
[rollup-plugin-multi-entry]: https://github.com/rollup/rollup-plugin-multi-entry
