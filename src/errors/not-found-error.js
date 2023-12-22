import { CustomError } from "./custom-error.js";
/*
Error to be thrown upon requesting an invalid route or something that is absent
*/
export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(message = "Not Found") {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    /*using serialize errors to maintain a single error handler for throwing 
    a consistent error in the response by calling ErrorName.serialize errors
    as ths is a simple error there is no array to serialize over
    */
    return [{ message: "Not found" }];
  }
}
