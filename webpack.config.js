const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script.js',
    environment: {
      arrowFunction: false,
    }
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
      }
      },
      {
        test: /\.(css|sccs)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    { 
                      config: path.resolve(__dirname, "./postcss.config.js")
                    },
                  ],
                ],
              },
            },
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader?name=/img/[name].[ext]"
          },
        ],
      },

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      scriptLoading: 'blocking',
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "style.min.css",
    }),
  ],
  
}