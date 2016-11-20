#!/usr/bin/env node
'use strict'
const fs = require('fs')
const exec = require('child_process').execFileSync
const path = require('path')

if (isStandalone() || hasHoistedDependencies()) {
  process.exit(0)
}

hoistDeps()

/* -------------------------------------------------------------------------- */

function isStandalone() {
  let ret

  try {
    const pkg = require(
      path.resolve(__dirname, '..', '..', '..', 'package.json')
    )
    ret = !('meta-dev' in pkg.devDependencies)
  }
  catch(err) {
    ret = true
  }

  return ret
}

function hasHoistedDependencies() {
  const version = exec('npm', ['--version'], { encoding: 'utf8' })
  return (Number(version[0]) >= 3)
}

function hoistDeps() {
  const modulesPath = path.resolve(__dirname, '..', 'node_modules')
  const parentModulesPath = path.resolve(__dirname, '..', '..')

  // dependencies have already been hoisted, useful when caching node_modules
  if (!fs.existsSync(modulesPath)) return

  const deps = fs.readdirSync(modulesPath)

  deps.forEach(dep => {
    if ('.bin' === dep) return

    const directory = path.join(modulesPath, dep)
    const hoistedDirectory = path.resolve(parentModulesPath, dep)

    if (!fs.existsSync(hoistedDirectory)) {
      fs.symlinkSync(directory, hoistedDirectory)
    }
  })
}
