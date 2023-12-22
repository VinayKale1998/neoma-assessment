import express from "express";
import { RequestValidationError } from "../errors/request-validation-error.js";

const currentUserRouter = express.Router();

currentUserRouter.get("/api/v1/users/currentuser", (req, res, next) => {
  throw new RequestValidationError();
});

export { currentUserRouter };
