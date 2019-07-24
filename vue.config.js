module.exports = {
  publicPath: '/',
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 配置 webpack-dev-server 行为。
  devServer: {
    proxy: { // string | Object
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}