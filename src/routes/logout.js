import express from "express";
import { AuthenticationError } from "../errors/error-export.js";

const logoutRouter = express.Router();

logoutRouter.get("/api/v1/users/logout", (req, res) => {
  if (req.session) {
    req.session = null;
    return res.send({});
  }

  throw new AuthenticationError("User not logged in");
});

export { logoutRouter };
