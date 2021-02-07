import { Router } from "express";
import TutorialsController from "../../controllers/tutorials.controller";

const tutorialsController = new TutorialsController();

/**
 * Tutorials CRUD endpoints
 */
class TutorialsRoutes {
  public static prefixPath: string = "/tutorials";

  // eslint-disable-next-line new-cap
  private router: Router = Router();

  // eslint-disable-next-line require-jsdoc
  private constructor() {
    this.routes();
  }

  /**
   * @return {void}
   */
  private routes(): void {
    this.getAll();
    this.create();
    this.getByID();
    this.updateByID();
    // this.delete();
    // this.updatePassword();// ?
  }

  /**
   * @return {Router}
   */
  public static getRouter(): Router {
    const instance = new TutorialsRoutes();
    return instance.router;
  }

  /**
   * Index route for {...}/tutorials path
   * @return {void}
   */
  private getAll(): void {
    this.router.get("/", tutorialsController.getAll);
  }

  /**
   * @return {void}
   */
  private create(): void {
    this.router.post("/", tutorialsController.create);
  }

  /**
   * @return {void}
   */
  private getByID(): void {
    this.router.get("/:id", tutorialsController.getByID);
  }

  /**
   * @return {void}
   */
  private updateByID(): void {
    this.router.put("/:id", tutorialsController.updateByID);
  }
}

export default TutorialsRoutes;
