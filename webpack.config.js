const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './src/index.js',
  // experiments: {
  //   outputModule: true,
  // },
  output: {
    path: __dirname + '/lib',
    filename: 'index.js',
    library: {
      name: 'Barrage',
      type: 'umd'
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