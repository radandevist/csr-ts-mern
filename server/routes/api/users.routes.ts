import { Router } from "express";
import AuthController from "../../controllers/auth.controller";
import UsersController from "../../controllers/users.controller";

const usersController = new UsersController();
const authController = new AuthController();

/**
 * Users CRUD endpoints
 */
class UserRoutes {
  public static prefixPath: string = "/users";

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
    this.userBoard();
    // this.create();
    // this.getOne();
    // this.update();
    // this.delete();
    // this.updatePassword();// ?
  }

  /**
   * @return {Router}
   */
  public static getRouter(): Router {
    const instance = new UserRoutes();
    return instance.router;
  }

  /**
   * Index route for {...}/users path
   * Get a list of users
   * @return {void}
   */
  private getAll(): void {
    this.router.get("/", usersController.getAll);
  }

  /**
   * User's board
   * Only accessible to signed in users
   * @return {void}
   */
  private userBoard(): void {
    this.router.get(
        "/userboard",
        authController.verifyToken,
        usersController.userBoard,
    );
  }

  /**
   * User's board
   * Only accessible to signed in users
   * @return {void}
   */
  private moderatorBoard(): void {
    this.router.get(
        "/moderatorboard",
        authController.verifyToken,
        authController.isModerator,
        usersController.moderatorBoard,
    );
  }
}

export default UserRoutes;
