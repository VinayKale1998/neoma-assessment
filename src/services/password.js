import bcrypt from "bcrypt";
import { BadRequestError } from "../errors/error-export.js";

/* class defined to abstract the password hashing
and comparing mechanism */
export class Password {
  static toHash(password) {
    try {
      const hash = bcrypt.hashSync(password, 10);
      return hash;
    } catch (err) {
      if (err instanceof Error) throw new BadRequestError(err.message);
    }
  }
  static compare(storedPassword, suppliedPassword) {
    return bcrypt.compareSync(suppliedPassword, storedPassword);
  }
}
