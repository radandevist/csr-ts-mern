"use strict";

const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");
const common = require("./webpack.common");

const CWD = process.cwd();

module.exports = merge(common, {
  mode: "development",
  entry: [
    "webpack/hot/poll?1000",
    path.join(CWD, "./server/index.ts"),
  ],
  externals: [
    nodeExternals({
      allowlist: ["webpack/hot/poll?1000"],
    }),
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new NodemonPlugin({
      verbose: true,
    }),
  ],
});
