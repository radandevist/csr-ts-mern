import { Request, Response, Router } from "express";
import path from "path";

const CWD = process.cwd(); // current working directory

/**
 * All routes that should be rendered by react
 */
class ClientRoutes {
  // eslint-disable-next-line max-len
  // TODO: move these routes on a separate file shared by both react-router and express router
  private arrayRoutes = ["/", "/form"];

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
    this.arrayRoutes.forEach((route) => {
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
