import path from "path";
import express, { Application } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import bcrypt from "bcryptjs";
import config from "../config/config";
import ApiRoutes from "./routes/api";
import ClientRoutes from "./routes/client";
// import devBundle from "./devBundle";// ! comment out this line in production
import RolesModel, { PrimitiveRoles, IRoles } from "./models/roles.model";
import UsersModel from "./models/users.model";

const CWD = process.cwd(); // current working directory

const Roles = RolesModel.getModel();
const Users = UsersModel.getModel();

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
    // devBundle.compile(this.app);// ! comment out this line in production

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
   * and other initial documents setup
   */
  private async mongoDatabase(): Promise<void> {
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

      // initial
      // set essential documents collection
      await this.createPrimitiveRoles();
      console.info("Primitives roles set");

      await this.createParentAdmin();
      console.info("admin parent created");
    } catch (err) {
      console.error(`An error with the database occured:\n${err}`);
    }
  }

  /**
   * set the primitive roles
   * @return {Promise<void>}
   */
  private async createPrimitiveRoles(): Promise<void> {
    const primitiveRoles: Array<PrimitiveRoles> =
        ["user", "moderator", "admin"];

    for (const role of primitiveRoles) {
      if (!await Roles.findOne({ name: role })) Roles.create({ name: role });
    }
  }

  /**
   * set the first administrator
   * @return {Promise<void>}
   */
  public async createParentAdmin(): Promise<void> {
    let foundRole: IRoles;
    do {
      foundRole = await Roles.findOne({ name: "admin" }) as IRoles;
    } while (!foundRole);

    const { name: userName, email, password } = config.siteAdmin;

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    if (!await Users.findOne({ email })) {
      const toCreate = {
        userName,
        email,
        password: hashedPass,
        roleID: foundRole._id,
      };
      await Users.create(toCreate);
    };
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
