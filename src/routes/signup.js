//modules
import express from "express";
import { BadRequestError } from "../errors/error-export.js";
import { User } from "../models/user-model.js";
import { validationCapture } from "../middlewares/validation-capture.js";
import { singupValidatonCriteria } from "../helpers/vaidation-criterias.js";
const signupRouter = express.Router();

//validation criteria to be passed as the first middleware followed by validation capturing middleware

/* Singup route 
Validates user request to check email and password sanity,
checks for duplication of email and username
saves user into the collection 
*/
signupRouter.post(
  "/api/v1/users/signup",
  singupValidatonCriteria,
  validationCapture,
  async (req, res, next) => {
    req.session = null;
    try {
      //request body  validated via middleware
      const { email, password, username } = req.body;

      //inspecting for duplicate email
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        throw new BadRequestError("Email already in use");
      }

      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        throw new BadRequestError("userame already in use");
      }

      //else continuing with user creation
      const user = new User({ email, password, username });

      // password hashing will be taken up by pre() mongoose hook defined in the model

      const savedUser = await user.save();
      res.status(201).send({ savedUser });
    } catch (err) {
      throw err;
    }
  }
);

export { signupRouter };
