#!/usr/bin/env node
'use strict'

const spawn = require('child_process').spawn
const exec = require('child_process').exec
const path = require('path')
const build = require('../scripts/build')

const rootPath = path.resolve(__dirname, '..', 'node_modules', '.bin')

function execute(command, args, env) {
  const child = spawn(command, args.split(' '), {
    env: {
      NODE_ENV: env,
      PATH: rootPath + ':' + process.env.PATH
    }
  })
}

const commands = {
  build: function() {
    process.env.NODE_ENV = 'production'
    build()
    process.env.NODE_ENV = 'development'
  },
  checkCoverage: function() {
    execute('nyc', 'check-coverage --lines 95 --functions 95 --branches 95')
  },
  coverage: function() {
    execute('nyc', 'report --reporter=text-lcov | codecov')
  },
  dev: function() {
    execute('ava', '--watch', 'test')
  },
  docs: function() {
    exec(
      'cat dist/*.node.js | jsdoc2md > docs/api.md && git add docs/api.md',
      function(error, stdout, stderr) {
        if (stderr) console.error(stderr)
        if (stdout) console.error(stdout)
      }
    )
  },
  lint: function() {
    execute('eslint', '*.js {lib,test}/{,**/}*.js')
  },
  seeCoverage: function() {
    execute('nyc', 'report --reporter=html && open coverage/index.html')
  },
  test: function() {
    execute('nyc', 'ava', 'test')
  }
}

/* ────────────────────────────────────────────────────────────────────────── */

const commandName = process.argv[2]
const command = commands[commandName]

if (null != command) {
  command()
}
else {
  console.error('Command not found: ' + commandName)
}
