import path from "path";
import express, { Application } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import config from "../config/config";
import ApiRoutes from "./routes/api";
import ClientRoutes from "./routes/client";
import devBundle from "./devBundle";// ! comment out this line in production

const CWD = process.cwd(); // current working directory

/**
 * Main Application class
 */
class MainApp {
  private app: Application = express();

  public PORT: Number = Number(config.port) || 3000;

  private mongoUri: string = config.db.mongoUri;

  // private mongoUri: string = config.database.mongodb.url.dev;

  // eslint-disable-next-line require-jsdoc
  constructor() {
    this.mongoDatabase();
    // * Be aware of the order, this is important
    this.middlewares();
    this.routes();
  }

  /**
   * Set up all middleware
   * @return {void}
   */
  private middlewares(): void {
    // Bundle the client code
    devBundle.compile(this.app);// ! comment out this line in production

    // enable serving static files
    this.app.use("/", express.static(path.join(CWD, "dist/client")));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(compress());

    // secure apps by setting various HTTP headers
    this.app.use(helmet());

    // enable CORS - Cross Origin Resource Sharing
    this.app.use(cors());
  }

  /**
   * Routes definition
   */
  public routes(): void {
    this.app.use(ClientRoutes.prefixPath, ClientRoutes.getRouter());
    this.app.use(ApiRoutes.prefixPath, ApiRoutes.getRouter());
  }

  /**
   * Connection to  mongodb
   */
  private mongoDatabase(): void {
    try {
      mongoose.connect(
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
