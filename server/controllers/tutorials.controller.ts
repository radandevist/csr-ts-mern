import { Request, Response } from "express";
import { getValidationErrorMessages } from "../helpers/errorHandlers";
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
      const tutsFound: Array<ITutorials> = await Tutorials.find();

      if (tutsFound.length > 0) {
        responder.success(200, "successfully got tutorials list", tutsFound);
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
      const id = req.params.id;

      const tutFound = await Tutorials.findById(id);

      if (tutFound) {
        responder.success(200, `tutorial with id ${id} found`, tutFound);
        responder.send(res);
      } else {
        responder.error(400, `couldn't find tutorial with id ${id}`);
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
  public async getPublished(req: Request, res: Response): Promise<void> {
    try {
      const tutsFound = await Tutorials.find({ published: true });

      if (tutsFound.length > 0) {
        responder.success(200, "Got all published tutorials", tutsFound);
        responder.send(res);
      } else {
        responder.error(400, "there are no published tutorials");
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
        responder.error(400, getValidationErrorMessages(validationError));
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
          const updatedTut = await Tutorials.findById(id);

          const data = {
            updatedTut: updatedTut,
            log: log,
          };

          responder.success(200, "Tutorial updated", data);
          responder.send(res);
        } else {
          responder.error(400, getValidationErrorMessages(validationError));
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

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @return {Promise<void>}
   */
  public async deleteByID(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const tutFound = await Tutorials.findById(req.params.id);

      if (tutFound) {
        const log = await Tutorials.deleteOne({ _id: id });

        const data = {
          deletedTut: tutFound,
          log: log,
        };

        responder.success(200, "tutorial deleted", data);
        responder.send(res);
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
