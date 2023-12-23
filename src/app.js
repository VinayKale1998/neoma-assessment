import express from "express";
import "express-async-errors";
import { signupRouter } from "./routes/signup.js";
import { NotFoundError } from "./errors/not-found-error.js";
import { loginRouter } from "./routes/login.js";
import { logoutRouter } from "./routes/logout.js";
import { currentUser } from "./middlewares/current-user.js";
import { postsRouter } from "./routes/posts.js";
import { followRouter } from "./routes/follow.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./services/swagger-setup.js";
import { clientControlApp } from "./client-control-app.js";
import { errorHandler } from "./middlewares/error-handler.js";
const app = express();

//using secure app, that handles rate limiting, cookie-session initalization and cors
app.use(clientControlApp);

app.use(signupRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(postsRouter);
app.use(followRouter);

//swagger UI serving
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* 
for undefined routes, a generic not found error will be thrown
for all http methods
*/
app.all("*", (req, res) => {
  throw new NotFoundError();
});

//errors thrown in the app will be caught here
app.use(errorHandler);

//errors throw by all the above routes will be handled
app.use(errorHandler);

export { app };
