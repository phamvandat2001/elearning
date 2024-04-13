const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env, argv) => {
  return {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.[contenthash:15].js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(css)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        }
      ]
    },
    devServer: {
      port: 5050,
      hot: true,
      open: true,
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({ 
        template: path.resolve(__dirname, 'public', 'index.html')
      }),
      new MiniCssExtractPlugin({
        filename: 'style.[contenthash:15].css',
      })
    ]
  };
}