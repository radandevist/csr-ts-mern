import express from "express";
import path from "path";
// ! comment these lines for production
// import { webpack } from "webpack";
// import webpackDevMiddleware from "webpack-dev-middleware";
// const config = require("../webpack/client/webpack.dev.js");
// ! ==========

// ! comment these lines for production
// const compiler = webpack(config);
// ! ==========

const app = express();

// ! comment these lines for production
// app.use(
//     webpackDevMiddleware(compiler, {
//       publicPath: config.output.publicPath,
//     }),
// );
// ! ==========

const CURRENT_WORKING_DIR = process.cwd();

app.use("/", express.static(path.join(CURRENT_WORKING_DIR, "dist/client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(CURRENT_WORKING_DIR, "dist/client/index.html"));
});

app.listen(3009, () => {
  console.info("Running on port 3009, bouuia!");
});
