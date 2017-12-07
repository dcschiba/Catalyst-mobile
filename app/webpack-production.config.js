var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './index',
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  node: {
    fs: 'empty',
  },
  output: {
    path: path.join(__dirname, '..', 'www'),
    filename: 'bundle.js',
    publicPath: './',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      hash: false,
      filename: 'index.html',
      template: path.join(__dirname, 'index.template.ejs'),
      inject: 'body',
      environment: {
        NODE_ENV: process.env.NODE_ENV,
      },
    }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        use: ['url-loader'],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: ['react-svg-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'],
      },
      {
        test: /\.json$/,
        use: ['json-loader'],
      },
    ],
  },
};
