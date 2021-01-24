import { Application } from "express";
import { webpack } from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../config/config";
const webpackDevClientconfig = require("../webpack/client/webpack.dev.js");

export const compile = (app: Application): void => {
  if (config.env == "development") {
    const compiler = webpack(webpackDevClientconfig);
    const middleWare = webpackDevMiddleware(compiler, {
      publicPath: webpackDevClientconfig.output.publicPath,
      // writeToDisk: true,
    });

    app.use(middleWare);
    app.use(webpackHotMiddleware(compiler));
  }
};

export default { compile };
