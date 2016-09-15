#!/usr/bin/env node
'use strict'
const fs = require('fs')
const path = require('path')
const rollup = require('rollup').rollup
const babel = require('rollup-plugin-babel')
const multiEntry = require('rollup-plugin-multi-entry')

const rootPath = path.resolve(__dirname, '..', '..', '..')

bundle(readPackage(), (process.argv[3] || 'simple'))

/* -------------------------------------------------------------------------- */

function readPackage() {
  return require(path.join(rootPath, 'package.json'))
}

function bundle(pkg, type) {
  const options = ('simple' === type ?
    bundleSimpleOptions(pkg) :
    bundleLibOptions(pkg)
  )

  rollup(options)
  .then(bundle => Promise.all([
    bundle.write({
      dest: path.join(rootPath, 'index.es.js'),
      format: 'es'
    }),
    bundle.write({
      dest: path.join(rootPath, 'index.js'),
      format: 'umd',
      moduleName: pkg.name.replace(/-(\w)/, g => g[1].toUpperCase())
    })
  ]))
  .catch(err => console.log(err.message))
}

function bundleSimpleOptions(pkg) {
  return {
    entry: path.join(rootPath, 'lib', `${pkg.name}.js`),
    plugins: [
      babel({ exclude: 'node_modules/**' })
    ],
    onwarn: () => {}
  }
}

function bundleLibOptions(pkg) {
  return {
    entry: path.join(rootPath, 'lib', '*.js'),
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      multiEntry()
    ],
    onwarn: () => {}
  }
}
