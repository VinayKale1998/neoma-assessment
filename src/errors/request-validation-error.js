import { CustomError } from "./custom-error.js";
/*
Error to be throw upon discrepancies in the the request 
*/

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(errors = []) {
    super("Invalid Request ");
    this.errors = errors;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    /*iterates through the errors object returned from express
     validator to form an array of error objects 
     */
    const formattedErrors = this.errors.map((error) => {
      if (error.type === "field") {
        return { message: error.msg, field: error.path };
      }
      return { message: error.msg };
    });

    return formattedErrors;
  }
}
