#!/usr/bin/env node
'use strict'

const exec = require('child_process').exec
const build = require('../scripts/build')

function execute(command, env) {
  if (env) {
    process.env.NODE_ENV = env
  }

  exec(command, (error, stdout, stderr) => {
    if (stderr) {
      console.error(stderr)
    }
    if (stdout) {
      console.log(stdout)
    }
    process.env.NODE_ENV = 'development'
  })
}

const commands = {
  build: function() {
    process.env.NODE_ENV = 'production'
    build()
    process.env.NODE_ENV = 'development'
  },
  checkCoverage: function() {
    execute('nyc check-coverage --lines 95 --functions 95 --branches 95', 'test')
  },
  coverage: function() {
    execute('nyc report --reporter=text-lcov | codecov')
  },
  dev: function() {
    execute('ava --watch', 'test')
  },
  docs: function() {
    execute('cat dist/*.node.js | jsdoc2md > docs/api.md && git add docs/api.md')
  },
  lint: function() {
    execute('eslint *.js {lib,test}/{,**/}*.js')
  },
  seeCoverage: function() {
    execute('nyc report --reporter=html && open coverage/index.html')
  },
  test: function() {
    execute('nyc ava')
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
