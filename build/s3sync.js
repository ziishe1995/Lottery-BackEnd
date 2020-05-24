const env = require('../env')
const s3sync = require('jac-s3-sync-aws')
const path = require('path')
const _ = require('lodash')
let bucketKey = process.argv.indexOf('-rc') > -1
  ? 'rc'
  : process.argv.indexOf('-stable') > -1
    ? 'stable'
    : 'test'

// const resolve = dir => path.join(__dirname, '..', dir)

const getParam = (key, defaultVal = '') => process.argv.indexOf(key) > -1
  ? process.argv[process.argv.indexOf(key) + 1]
  : defaultVal

const dir = getParam('-d', 'dist')

const dest = getParam('-D')

const params = _.pickBy({
  access: env.AWS_ACCESS_KEY,
  secret: env.AWS_SECRET_KEY,
  bucket: env.bucket[bucketKey],
  dest
})

s3sync(dir, params)