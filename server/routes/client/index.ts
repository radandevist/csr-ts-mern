import { Request, Response, Router } from "express";
import path from "path";
import routes from "./routes";

const CWD = process.cwd(); // current working directory

/**
 * All routes that should be rendered by react
 */
class ClientRoutes {
  public static prefixPath: string = "/";

  // eslint-disable-next-line new-cap
  private router = Router();

  // eslint-disable-next-line require-jsdoc
  constructor() {
    this.routes();
  }

  /**
   * @return {Router}
   */
  public static getRouter(): Router {
    const clientRoutes = new ClientRoutes();
    return clientRoutes.router;
  }

  /**
   * @return {void}
   */
  private routes(): void {
    routes.forEach((route) => {
      this.router.get(route, this.sendTemplate);
    });
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @return {void}
   */
  private sendTemplate(req: Request, res: Response): void {
    res
        .status(200)
        .sendFile(path.join(CWD, "dist/client/index.html"));
  }
}

export default ClientRoutes;
