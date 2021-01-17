/* eslint-disable */
'use strict';
const path = require('path');

const CURRENT_WORKING_DIR = process.cwd();

module.exports = {
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist/server'),
    filename: 'server.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
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
