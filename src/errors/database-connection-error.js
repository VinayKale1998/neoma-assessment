import { CustomError } from "./custom-error.js";

/*
General bad request error 
*/

export class DatabaseConnectionError extends CustomError {
  message = "Error connecting to the DB";
  statusCode = 500;
  constructor(message = "Unable to connect to the DB") {
    super(message);
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    /*using serialize errors to maintain a single error handler for throwing 
    a consistent error in the response by calling ErrorName.serialize errors
    as ths is a simple error there is no array to serialize over
    */
    return [{ message: this.message }];
  }
}
