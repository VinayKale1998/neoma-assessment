/* defining  custom-error class to act as the  superclass for all the
custom errors to differenciate between custom error instances 
and Error instances at the final errorhandler middleware
*/

export class CustomError extends Error {
  constructor(message) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
