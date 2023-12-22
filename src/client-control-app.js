import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import rateLimit from "express-rate-limit";
const clientControlApp = express();
clientControlApp.use(express.json());

//using cors for ease of resource sharing
clientControlApp.use(cors());

//as the app is not currently behind a proxy
clientControlApp.set("trust proxy", false);

//setting up the cookie session
clientControlApp.use(
  cookieSession({
    signed: false,
    httpOnly: true,
    //secure set to false for prod server
    secure: false,
  })
);

//rate limiting to 100 requests in 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

clientControlApp.use(limiter);

export { clientControlApp };
