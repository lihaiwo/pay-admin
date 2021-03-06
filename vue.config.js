const path = require('path')
const fs = require('fs')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const devServer = require('./config/dev.env.js') // 反向代理所需要的hosturl
const BASE_URL = './'

module.exports = {
  publicPath: BASE_URL,
  devServer: devServer,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false

}
