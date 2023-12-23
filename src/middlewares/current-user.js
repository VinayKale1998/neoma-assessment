import jwt from "jsonwebtoken";
import { AuthenticationError } from "../errors/error-export.js";

/*
middleware that checks for  the cookie in the  req object 
and sets the currentUser property to the payload consisting email and id
if the jwt is present and valid 
*/
export const currentUser = (req, res, next) => {
  // if no session or jwt property is present, the currentUser stays undefined and the control moves to the next middleware

  if (!req.session?.jwt) {
    return next();
  }

  //if jwt is present, the jwt is inspected for validity and  the payload is extracted
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET);
    req.currentUser = payload;
  } catch (err) {
    throw new AuthenticationError("Invalid session, kindly re-login");
  }

  next();
};
