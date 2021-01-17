import express from "express";
import path from "path";
// ! comment these lines for production
import devBundle from "./devBundle";
// ! ==========

const app = express();

// ! comment these lines for production
devBundle.compile(app);
// ! ==========

const CURRENT_WORKING_DIR = process.cwd();

app.use("/", express.static(path.join(CURRENT_WORKING_DIR, "dist/client")));

app.get("/", (req, res) => {
  res
      .status(200)
      .sendFile(path.join(CURRENT_WORKING_DIR, "dist/client/index.html"));
});

const port = 3898;

app.listen(port, () => {
  console.info(`Started at port ${port}, bouuia!`);
});
