const path = require('path');

const resolve = (dir) => path.join(__dirname, dir);
const isProdMode = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: isProdMode ? '/vue-demo/' : '',
  outputDir: isProdMode ? 'vue-demo' : 'dist',
  assetsDir: '',
  filenameHashing: false,
  // 配置多入口文件
  // pages: {
  //   index: {
  //     entry: 'src/main.js',
  //     template: 'public/index.html',
  //     filename: 'index.html',
  //     title: 'Index Page',
  //     chunks: ['chunk-vendors', 'chunk-common', 'index'],
  //   },
  // },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components/'))
      .set('_as', resolve('src/assets/img/'));
  },
  lintOnSave: isProdMode ? false : 'warning',
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
    //   new webpack.ProvidePlugin({
    //     jQuery: 'jquery',
    //     $: 'jquery',
    //   }),
    ],
  },
};
