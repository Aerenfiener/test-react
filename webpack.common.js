const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/App.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Test form',
      favicon: './assets/favicon.ico'
    })
  ],
  output: {
    filename: '[hash:8].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
        {
            test: /\.(gif|jpe?g|png)$/,
            loader: 'url-loader?limit=25000',
            query: {
                limit: 10000,
                name: 'static/media/images/[name].[hash:8].[ext]'
            }
        },
    ],
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react'],
          plugins: [],
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
    ],
  }
};
