import express from "express";
import { RequestValidationError } from "../errors/request-validation-error.js";

const logoutRouter = express.Router();

logoutRouter.get("/api/v1/users/logout", (req, res, next) => {
  throw new RequestValidationError();
});

export { logoutRouter };
