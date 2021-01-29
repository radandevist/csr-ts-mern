import { Response } from "express";

/**
 * [Description Responder]
 */
class Responder {
  private type!: string;

  private code!: number;

  private message!: string | Array<String>;

  private data: any = null;

  /**
   * @param  {number} code
   * @param  {string} message
   * @param  {any} data?
   * @return {Promise<void>}
   */
  public async success(
      code: number,
      message: string | Array<String>,
      data?: any): Promise<void> {
    this.type = "success";
    this.code = code;
    this.message = message;
    this.data = data;
  };

  /**
   * @param  {number} code
   * @param  {string} message
   * @return {Promise<void>}
   */
  public async error(
      code: number,
      message: string | Array<String>): Promise<void> {
    this.type = "error";
    this.code = code;
    this.message = message;
  };

  /**
   * @param  {Response} res
   * @return {Promise<void>}
   */
  public async send(res: Response): Promise<void> {
    let result: object;

    if (this.type === "success") {
      result = {
        status: this.type,
        message: this.message,
        data: this.data,
      };
    } else {
      result = {
        status: this.type,
        message: this.message,
      };
    }

    res.status(this.code).json(result);
  };
}

export default Responder;
