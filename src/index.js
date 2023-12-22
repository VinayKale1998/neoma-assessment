import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import { errorHandler } from "./middlewares/error-handler.js";
import { signupRouter } from "./routes/signup.js";
import { NotFoundError } from "./errors/not-found-error.js";
import rateLimit from "express-rate-limit";
import { loginRouter } from "./routes/login.js";
import { logoutRouter } from "./routes/logout.js";
import { currentUserRouter } from "./routes/current-user.js";
import cookieSession from "cookie-session";
import mongoose from "mongoose";
import { currentUser } from "./middlewares/current-user.js";

//Intitializing dotenv to load env. variables from the .env file into process.env
dotenv.config();

const app = express();
app.use(express.json());

//using cors for ease of resource sharing
app.use(cors());

//setting ip and protocol trusts to allow client IP to be monitored for rate limiting
app.set("trust proxy", true);

//setting up the cookie session
//secure will be disabled in test as tests will be executed via http
app.use(
  cookieSession({
    signed: false,
    //secure set to false for development
    secure: false,
  })
);

//rate limiting to 100 requests in 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 100,
});

try {
  await mongoose.connect(process.env.MONGO_URI);
} catch (err) {
  throw err.message;
}

app.use(limiter);

// currentuser will always be checked against the session cookie but the api access decision will be taken in the routes using requireAuth middelware
app.use(currentUser);
//using routes
app.use(signupRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(currentUserRouter);

app.all("*", (req, res) => {
  /* 
for undefined routes, a generic not found error will be thrown
for all http methods
*/
  throw new NotFoundError();
});

//errors throw by all the above routes will be handled
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
//listening to the app

app
  .listen(PORT, () => {
    console.log(`App listening to port: ${PORT}`);
  })
  .on("error", (err) => {
    //consoling the error if there is an error on startup
    console.err(err);
    process.exit(0);
  });
