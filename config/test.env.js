'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')
const config=require('../config')
module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})