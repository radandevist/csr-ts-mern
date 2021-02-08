import { Request, Response } from "express";
import { getValidationErrorMessages } from "../helpers/errorHandlers";
import Responder from "../helpers/responder";
import RolesModel, { IRoles } from "../models/roles.model";
import UsersModel from "../models/users.model";
import AuthValidator from "../validators/auth.validator";

// const usersModel = new UsersModel();
// const Users = usersModel.getModel();
const Users = UsersModel.getModel();
const Roles = RolesModel.getModel();

const authValidator = new AuthValidator();

const responder = new Responder();

/**
 * AuthController
 */
class AuthController {
  /**
   * @param  {Request} req
   * @param  {Response} res
   * @return {void}
   */
  public async register(req: Request, res: Response): Promise<void> {
    try {
      // eslint-disable-next-line max-len
      const { error: validationError, value } = authValidator.registerValidation(req.body);

      if (!validationError) {
        const userFound = await Users.findOne({ email: value.email });

        if (!userFound) {
          const foundRole: IRoles = await Roles.findOne({ name: value.role });

          if (foundRole) {
            const roleID = foundRole.id;
            value.role = roleID;
            const createdUser = await Users.create(value);

            responder.success(200, "user registered", createdUser);
            responder.send(res);
          } else {// * something that should never happen
            responder.error(400, `role ${value.role} does not exists`);
            responder.send(res);
          }
        } else {
          responder.error(400, "email address already in use");
          responder.send(res);
        }
      } else {
        responder.error(400, getValidationErrorMessages(validationError));
        responder.send(res);
      }
    } catch (err) {
      responder.error(400, err.message);
      responder.send(res);
    }
  }
}

export default AuthController;
