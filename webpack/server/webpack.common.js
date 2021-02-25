"use strict";

const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const CWD = process.cwd();

module.exports = {
  output: {
    path: path.join(CWD, "/dist/server"),
    filename: "server.bundle.js",
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [
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
};
