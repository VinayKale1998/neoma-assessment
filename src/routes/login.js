//modules
import express from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
//errors
import {
  RequestValidationError,
  AuthenticationError,
} from "../errors/error-export.js";
//models
import { User } from "../models/user-model.js";
//middlewares
import { validationCapture } from "../middlewares/validation-capture.js";
import { Password } from "../services/password.js";

const loginRouter = express.Router();

const validatonCriteria = [
  body("email").isEmail().withMessage("Email invalid"),
  body("password").not().isEmpty(),
];

loginRouter.post(
  "/api/v1/users/login",
  validatonCriteria,
  validationCapture,
  async (req, res, next) => {
    const { email, password } = req.body;

    try {
      //fetching the user from the db
      const existingUser = await User.findOne({ email });

      //if the user is undefined, user has not registered
      if (!existingUser)
        throw new AuthenticationError("Email not registered, please signup");

      //else
      if (!Password.compare(existingUser.password, password)) {
        console.log(Password.compare(existingUser.password, password));
        throw new AuthenticationError("Password Invalid");
      }

      //else
      const userJWT = jwt.sign(
        { id: existingUser._id, email: existingUser.email },
        process.env.JWT_SECRET
      );

      req.session = {
        jwt: userJWT,
      };

      console.log(req.session);

      return res.status(200).send(existingUser);
    } catch (err) {
      throw err;
    }
  }
);

export { loginRouter };
