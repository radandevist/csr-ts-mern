import express from "express";
import path from "path";
import config from "../config/config";
// ! comment these lines for production
import devBundle from "./devBundle";
// ! ==========

const app = express();

// ! comment these lines for production
devBundle.compile(app);
// ! ==========

const CURRENT_WORKING_DIR = process.cwd();

app.use("/", express.static(path.join(CURRENT_WORKING_DIR, "dist/client")));

app.get("*", (req, res) => {// ? is this correct beside the future api routes?
  res
      .status(200)
      .sendFile(path.join(CURRENT_WORKING_DIR, "dist/client/index.html"));
});

app.listen(config.port, () => {
  console.info(`Started at port ${config.port}, bouuia!`);
});
