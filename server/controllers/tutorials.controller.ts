import { Request, Response } from "express";
import Responder from "../helpers/responder";
import TutorialsModel, { ITutorials } from "../models/tutorials.model";
import TutorialsValidator from "../validators/tutorials.validator";

const tutorialsModel = new TutorialsModel();
const Tutorials = tutorialsModel.getModel();

const tutorialsValidator = new TutorialsValidator();

const responder = new Responder();

/**
 * TutorialsController
 */
class TutorialsController {
  /**
   * @param  {Request} req
   * @param  {Response} res
   * @return {Promise<void>}
   */
  public async getAll(req: Request, res: Response): Promise<void> {
    // res.status(200).send({ message: "this is the list of all tutorials" });
    try {
      const _tutorials: Array<ITutorials> = await Tutorials.find();

      if (_tutorials.length > 0) {
        responder.success(200, "successfully got tutorials list", _tutorials);
        responder.send(res);
      } else {
        responder.success(200, "No tutorials found");
        responder.send(res);
      }
    } catch (err) {
      res.status(200).send({
        type: "error",
        message: `${err.message} in ${err.file} at ${err.line}`,
      });
    }
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @return {Promise<void>}
   */
  public async create(req: Request, res: Response): Promise<void> {
    try {
      // * validation
      const { error, value } = tutorialsValidator
          .createValidation(req.body);

      if (!error) {
        // * Two different ways of creating a tutorial
        // const createdTutorial = await Tutorials.create(value);// * #1
        const createdTutorial = await new Tutorials(value).save(); // * #2

        responder.success(200, "Tutorial succesfully created", createdTutorial);
        responder.send(res);
      } else {
        const _err = [];
        for (const e of error.details) {
          _err.push(e.message);
        }

        responder.error(400, _err);
        responder.send(res);
      }
    } catch (err) {
      res.status(200).send({
        type: "error",
        message: err.message,
      });
    }
  }
}

export default TutorialsController;
