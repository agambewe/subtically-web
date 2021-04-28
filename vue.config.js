module.exports = {
  devServer: { proxy: 'http://127.0.0.1:8000/api/'},
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Cache-Control': null,
  //   'X-Requested-With': null,
  //   'Content-Type': 'text/html'
  //   },
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    // your config
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options['transformAssetUrls'] = {
          // [...]
          'b-embed': ['src', 'poster'],
          source: 'src',
          track: 'src',
        }

        return options
      })

    // adjusting the media rule to include vtt files
    config.module
      .rule('media')
      .test(/\.(vtt|mp4|webm|ogg|mp3|wav|flac|aac|png)(\?.*)?$/)
  },
}