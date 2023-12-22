import { CustomError } from "../errors/custom-error.js";

const errorHandler = (err, req, res, next) => {
  /*
the custom  errors thrown from the route handlers will be caught
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
