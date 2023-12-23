import express from "express";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "../errors/error-export.js";
import { User } from "../models/user-model.js";
import { validationCapture } from "../middlewares/validation-capture.js";
import { Password } from "../services/password.js";
import { loginValidatonCriteria } from "../helpers/vaidation-criterias.js";

const loginRouter = express.Router();

/* this route validate the email validitiy, password correctness ,
      If validtation is posistive, generates a jwt token,
      sets the jwt token in the session object to allow for cookies
      */
loginRouter.post(
  "/api/v1/users/login",
  loginValidatonCriteria,
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
      if (!Password.compare(existingUser.password, password.trim())) {
        throw new AuthenticationError("Password Invalid");
      }

      //else

      process.env.JWT_SECRET = "SOCIAL"; //hard-coding to avoid .env dependency
      const userJWT = jwt.sign(
        { _id: existingUser._id, email: existingUser.email },
        process.env.JWT_SECRET
      );

      req.session = {
        jwt: userJWT,
      };

      return res.status(200).send(existingUser);
    } catch (err) {
      throw err;
    }
  }
);

export { loginRouter };
