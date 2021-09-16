const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pjson = require('./package.json');

/**
 * Webpack Config 使用插件
 * @param {object} MiniCssExtractPlugin  為每個包含CSS的JS文件創建一個單獨的CSS文件
 * @param {object} HtmlWebpackPlugin 簡化html文件, 設定favicon
 * @param {object} CleanWebpackPlugin 清除之前bundle的資料夾
 */
module.exports = () => {
  console.log('[webpack] NODE_ENV=', process.env.NODE_ENV);
  const envPath = process.env.NODE_ENV === 'development' ? './config/.env.development' : './config/.env.production';
  const dotenvConfig = dotenv.config({ path: envPath });
  console.log('[webpack] env打包內容:', dotenvConfig.parsed);
  console.log('[webpack] 版本寫入:', pjson.version);

  /**
   * @param {string} URL 網址
   * @param {string} RORT 端口
  */
  const {
    BASE_URL,
    PORT
  } = dotenvConfig.parsed;
  /**
   * @param {string} entry 前端入口
   * @param {string} output 打包位置
  */
  const entry = path.resolve(__dirname, './src/web/index.jsx');
  const output = path.resolve(__dirname, './dist');
  const dist = path.join(__dirname, 'dist');

  return {
    mode: process.env.NODE_ENV,
    entry,
    output: {
      path: output,
      filename: `bundle/bundle-${pjson.version}.js`,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: 'images/[hash]-[name].[ext]',
            },
          }],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: 'fonts/[hash]-[name].[ext]',
            },
          }],
        }
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
      new Dotenv(),
      new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin([dist]),
      new MiniCssExtractPlugin({
        filename: 'css/style.css',
      }),
      new HtmlWebpackPlugin({
        title: 'index首页',
        template: './public/index.html',
        favicon: './public/favicon.ico'
      }),
    ],
    devServer: {
      writeToDisk: true, // 保留dist
      contentBase: dist,
      host: BASE_URL,
      port: PORT,
      // hot: true,
      hotOnly: true, // 熱模塊, 修改失敗時不會重新刷新頁面, 方便debug
      open: true,
      inline: true,
    },
  };
};
