import { RequestValidationError } from "../errors/request-validation-error.js";
import { validationResult } from "express-validator";

/* 
middleware used to check for validation routes
that will be instilled into the req object by 
the validators in the route and will throw error if 
error present, else will move to the next middelware
*/

const validationCapture = (req, res, next) => {
  //will catch the errors set by the validatonCriteria middleware in the respective route
  const errors = validationResult(req);

  // throwing an error if errors are present
  if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
  next();
};

export { validationCapture };
