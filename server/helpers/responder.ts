import { Response } from "express";

interface Result {
  status: string;
  message: string | Array<string>;
  data?: any
};

/**
 * [Description Responder]
 */
class Responder {
  private type!: string;

  private code!: number;

  private message!: string | Array<string>;

  private data: any = null;

  /**
   * @param  {number} code
   * @param  {string} message
   * @param  {any} data?
   * @return {Promise<void>}
   */
  public async success(
      code: number,
      message: string | Array<string>,
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
      message: string | Array<string>): Promise<void> {
    this.type = "error";
    this.code = code;
    this.message = message;
  };

  /**
   * @param  {Response} res
   * @return {Promise<void>}
   */
  public async send(res: Response): Promise<void> {
    let result: Result;

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
