"use strict";

const path = require("path");
const { FileManagerPlugin } = require("@rogalski/webpack-file-manager");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const CWD = process.cwd();

module.exports = {
  target: "web",
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new FileManagerPlugin().copy(
        path.join(CWD, "/client/public"),
        path.join(CWD, "/dist/client"),
    ),
  ],
};
