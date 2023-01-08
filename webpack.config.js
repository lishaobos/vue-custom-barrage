const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

module.exports = {
  entry: './src/index.js',
  // experiments: {
  //   outputModule: true,
  // },
  output: {
    path: path.resolve('./lib'),
    filename: 'index.js',
    library: {
      name: 'Barrage',
      type: 'umd',
      export: 'default'
      // type: 'module'
    }
  },
  externals: {
    'vue': 'Vue'
  },
  module: {
    rules: [
      {
        test: /\.vue/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}