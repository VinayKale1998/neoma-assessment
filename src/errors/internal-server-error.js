import { CustomError } from "./custom-error.js";

/*
General bad request error 
*/

export class InternalServerError extends CustomError {
  statusCode = 500;

  constructor(message = "Oops! somethig went wrong") {
    super(message);

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    /*using serialize errors to maintain a single error handler for throwing 
    a consistent error in the response by calling ErrorName.serialize errors
    as ths is a simple error there is no array to serialize over
    */
    return [{ message: this.message }];
  }
}
