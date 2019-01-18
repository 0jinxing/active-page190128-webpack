const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const development = process.env.NODE_ENV !== "production";

module.exports = {
  mode: development ? "development" : "production",
  entry: path.resolve("src", "index.js"),
  output: {
    path: path.resolve("dist"),
    filename: "[name].[hash:8].js"
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: {
        loader: 'html-loader'
      }
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        (development ? "style-loader" : MiniCssExtractPlugin.loader),
        { loader: "css-loader", options: { sourceMap: true } }
      ]
    }, {
      test: /\.(png|jpg|gif)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: "[hash:8].[name].[ext]"
        }
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "回家吃饭",
      template: path.resolve("src", "public", "index.html")
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000
  }
};