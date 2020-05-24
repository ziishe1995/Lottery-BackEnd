const path = require('path')
const webpackConfig = require('./webpack.config')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

// 設定請參考 https://github.com/vuejs/vue-cli/tree/dev/docs/config
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  lintOnSave: true,
  assetsDir: 'static',
  // compiler: true,
  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  chainWebpack: () => {
  },
  configureWebpack: webpackConfig,
  devServer: {
    disableHostCheck: true,
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8088,
    https: false,
    hotOnly: false,
    before: (app) => {
      // 加入靜態資源
      const express = require('express') // vue-cli-service 自帶 express
      app.use('/resource', express.static(resolve('resource')))
    }
  }
}
