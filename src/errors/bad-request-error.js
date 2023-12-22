import { CustomError } from "./custom-error.js";
/*
General bad request error 
*/

export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(message = "Bad Request") {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    /*using serialize errors to serialize the error into an array of error objects
    to call  ErrorNamee.serializeErrrors() at the final error handler for consistency in errror response
    as ths is a straight-forward error there is no array to serialize over
    */

    return [{ message: this.message }];
  }
}
