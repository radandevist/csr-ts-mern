import path from "path";
import express, { Application } from "express";
import mongoose from "mongoose";
import config from "../config/config";
// ! Optional: comment out this line in production for a better bundle
import { compile } from "./devBundle";

const CURRENT_WORKING_DIR = process.cwd();

/**
 * Main Application class
 */
class MainApp {
  public app: Application = express();

  public PORT: Number = Number(config.port) || 3000;

  private mongoUri: string = (config.env == "development") ?
    config.database.mongodb.url.dev :
    config.database.mongodb.url.prod;

  // eslint-disable-next-line require-jsdoc
  constructor() {
    if (config.env == "development") {
      this.compileClientBundle();
    }

    this.mongoDatabase();

    this.serveStaticFiles();

    this.routes();
  }

  /**
   * webpack dev middleware for the frontend
   */
  public compileClientBundle(): void {
    // ! Optional: comment out this line in production for a better bundle
    compile(this.app);
  }

  /**
   * Serve the static files
   */
  public serveStaticFiles(): void {
    this.app.use(
        "/",
        express.static(path.join(CURRENT_WORKING_DIR, "dist/client")),
    );
  }

  /**
   * Routes definition
   */
  public routes(): void {
    // ? is this correct beside the future api routes?
    this.app.get("*", (req, res) => {
      res
          .status(200)
          .sendFile(path.join(CURRENT_WORKING_DIR, "dist/client/index.html"));
    });
  }

  /**
   * Connection to  mongodb
   */
  async mongoDatabase(): Promise<void> {
    try {
      await mongoose.connect(
          this.mongoUri,
          {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
          },
      );

      console.info("Connected to the database");
    } catch (err) {
      console.error(`A connection error occured:\n${err}`);
    }
  }

  /**
   * Serve this application
   * @param  {MainApp} mainApp
   */
  public serve():void {
    this.app.listen(
        this.PORT,
        () => console.info(`Started at port ${this.PORT}, bouuia!`),
    );
  }
}

export default MainApp;
