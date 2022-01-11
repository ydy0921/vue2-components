module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'vue2-components'
        return args
      })
  },
  // postcss-plugin-px2rem
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 20,
            mediaQuery: false,
            minPixelValue: 2
          })
        ]
      }
    }
  }
}
