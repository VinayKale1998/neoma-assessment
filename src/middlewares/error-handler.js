import { CustomError } from "../errors/custom-error.js";

const errorHandler = (err, req, res, next) => {
  /*
 this middlewares catches the custom  errors thrown from the route handlers
a pertinent response will be sent to the client
*/
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  //as a fallback
  console.error(err);
  return res
    .status(500)
    .send({ errors: [{ message: "something went wrong" }] });
};
export { errorHandler };
