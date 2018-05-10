const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 8100,
    historyApiFallback: true,
  },
  watch: true,
  devtool: 'source-map',
});
