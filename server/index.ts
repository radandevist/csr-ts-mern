import express from "express";
import path from "path";

const app = express();

const CURRENT_WORKING_DIR = process.cwd();

app.use("/", express.static(path.join(CURRENT_WORKING_DIR, "dist/client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(CURRENT_WORKING_DIR, "dist/client/index.html"));
});

app.listen(3009, () => {
  console.info("Running on port 3009, hum");
});
