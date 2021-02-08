import { Router } from "express";
import AuthController from "../../controllers/auth.controller";

const authController = new AuthController();

/**
 * Users CRUD endpoints
 */
class AuthRoutes {
  public static prefixPath: string = "/auth";

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
    this.register();
    // this.login();
  }

  /**
   * @return {Router}
   */
  public static getRouter(): Router {
    const instance = new AuthRoutes();
    return instance.router;
  }

  /**
   * Index route for {...}/users path
   * Get a list of users
   * @return {void}
   */
  private register(): void {
    this.router.post("/register", authController.register);
  }
}

export default AuthRoutes;
