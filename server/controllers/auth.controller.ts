import { NextFunction, Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../config/config";
import { getValidationErrorMessages } from "../helpers/errorHandlers";
import Responder from "../helpers/responder";
import RolesModel, { IRoles } from "../models/roles.model";
import UsersModel, { IUsers } from "../models/users.model";
import AuthValidator from "../validators/auth.validator";

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
          } else {// * something that should never happen
            responder.error(400, `role ${value.role} does not exists`);
          }
        } else {
          responder.error(400, "email address already in use");
        }
      } else {
        responder.error(400, getValidationErrorMessages(validationError));
      }

      responder.send(res);
    } catch (err) {
      responder.error(400, err.message);
      responder.send(res);
    }
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @return { Promise<void>}
   */
  public async login(req: Request, res: Response):
    Promise<any> {
    try {
      // eslint-disable-next-line max-len
      const { error: validationError, value } = authValidator.loginValidation(req.body);

      if (validationError) {
        responder.error(400, getValidationErrorMessages(validationError));
        return responder.send(res);
      }

      const foundUser: IUsers = await Users.findOne({ email: value.email });

      if (!foundUser) {
        responder.error(400, "no user with matching email");
        return responder.send(res);
      }

      const payload = { _id: foundUser._id };
      const signOptions: SignOptions = {
        algorithm: "HS256",
        expiresIn: config.jwt.tokenLife,
      };
      const token = jwt.sign(payload, config.jwt.secret, signOptions);

      const nowDate: Date = new Date();
      res.cookie("access_token", token, {
        // expires one day from its activation
        expires: new Date(nowDate.getTime() + config.jwt.cookieMaxAge),
      });

      const data = { token: token, user: foundUser };

      responder.success(200, "user logged in", data);
      responder.send(res);
    } catch (err) {
      responder.error(400, err.message);
      responder.send(res);
    }
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @param  {NextFunction} next
   * @return {Promise<void>}
   */
  public async verifyToken(req: Request, res: Response, next: NextFunction):
  Promise<any> {
    try {
      // const token = req.header("y-access-token");
      const token = req.cookies.access_token;

      if (!token) {
        responder.error(401, "access denied, you need to login");
        return responder.send(res);
      }

      const verified = jwt.verify(token, config.jwt.secret);

      if (!verified) {
        responder.error(400, "Invalid token");
        return responder.send(res);
      }

      req.user = verified;

      next();
    } catch (err) {
      responder.error(400, err.message);
      responder.send(res);
    }
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @param  {NextFunction} next
   * @return {Promise<void>}
   */
  public async isModerator(req: Request, res: Response, next: NextFunction):
  Promise<any> {
    try {
      
    } catch (err) {
      responder.error(400, err.message);
      responder.send(res);
    }
  }
}

export default AuthController;
