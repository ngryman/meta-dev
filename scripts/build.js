#!/usr/bin/env node
'use strict'
const fs = require('fs')
const path = require('path')
const rollup = require('rollup').rollup
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')

const rootPath = path.resolve(__dirname, '..', '..', '..')

function optionsFor(pkg, target, external) {
  return {
    entry: path.join(rootPath, 'index.js'),
    external: external ? Object.keys(pkg.dependencies) : null,
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        presets: [
          ['node' === target ? 'node5' : 'es2015', { modules: false }]
        ]
      })
    ],
    onwarn: function() {}
  }
}

function bundle(pkg, target, format, external) {
  return rollup(optionsFor(pkg, target, external)).then(function(bundle) {
    return bundle.write({
      dest: path.join(rootPath, 'dist', `${pkg.name}.${target}.js`),
      format: format,
      moduleName: pkg.name.replace(/-(\w)/, g => g[1].toUpperCase())
    })
  })
  .catch(function(err) { console.log(err.message) })
}

function build() {
  const pkg = require(path.join(rootPath, 'package.json'))

  return Promise.all([
    bundle(pkg, 'node', 'cjs', true),
    bundle(pkg, 'browser', 'umd', false)
  ])
}

module.exports = build
