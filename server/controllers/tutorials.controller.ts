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
      responder.error(400, err.message);
      responder.send(res);
    }
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @return {Promise<void>}
   */
  public async getByID(req: Request, res: Response): Promise<void> {
    try {
      const _id = req.params.id;

      const _tutorial = await Tutorials.findById(_id);

      if (_tutorial) {
        responder.success(200, `tutorial with id ${_id} found`, _tutorial);
        responder.send(res);
      } else {
        responder.error(400, `couldn't find tutorial with id ${_id}`);
        responder.send(res);
      }
    } catch (err) {
      responder.error(400, err.message);
      responder.send(res);
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
      const { error: validationError, value } = tutorialsValidator
          .createValidation(req.body);

      if (!validationError) {
        // * Two different ways of creating a tutorial
        // const createdTutorial = await Tutorials.create(value);// * #1
        const createdTutorial = await new Tutorials(value).save(); // * #2

        responder.success(200, "Tutorial succesfully created", createdTutorial);
        responder.send(res);
      } else {
        const _err = [];
        for (const e of validationError.details) {
          _err.push(e.message);
        }

        responder.error(400, _err);
        responder.send(res);
      }
    } catch (err) {
      responder.error(400, err.message);
      responder.send(res);
    }
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @return {Promise<void>}
   */
  public async updateByID(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const foundTut = await Tutorials.findById(id);

      if (foundTut) {
        // * validation
        const { error: validationError, value } = tutorialsValidator
            .updateValidation(req.body);

        if (!validationError) {
          const log = await Tutorials.updateOne({ _id: id }, value);

          const data = {
            updatedTut: foundTut,
            log: log,
          };

          responder.success(200, "Tutorial updated", data);
          responder.send(res);
        } else {
          const _err = [];
          for (const e of validationError.details) {
            _err.push(e.message);
          }

          responder.error(400, _err);
          responder.send(res);
        }
      } else {
        responder.error(400, "no tutorial with matching id found");
        responder.send(res);
      }
    } catch (err) {
      responder.error(400, err.message);
      responder.send(res);
    }
  }
}

export default TutorialsController;
