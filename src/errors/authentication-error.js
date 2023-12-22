import { CustomError } from "./custom-error.js";

/*
Error to be throw upon  request failing authentication middelwares
*/

export class AuthenticationError extends CustomError {
  statusCode = 401;

  constructor(message = "Authentication error") {
    super(message);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
