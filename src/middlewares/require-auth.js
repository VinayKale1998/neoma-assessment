import { AuthenticationError } from "../errors/error-export";

/*
    middeware that always comes after the currentuser middleware, which  processes the cookie and checks if jwt is present in the cookie
     the currentUser is either defined or undefined, if it's undefined, this middleware will throw an authentication error, 
     therefore if requireAuth is used as a middlelware in any route, that route  will be auth secured
 */
export const requireAuth = (req, res, next) => {
  //throwing an error if currentUser is not defined, meaning there was no jwt in the cookie session
  if (!req.currentUser) {
    throw new AuthenticationError("Error authenticating, please login");
  }

  next();
};
