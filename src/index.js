import express from "express";
import "express-async-errors";
import { errorHandler } from "./middlewares/error-handler.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "./app.js";

const mainApp = express();

mainApp.use(app);
//connecting to an in inmemory mongodb to avoid external dependency for running the app
//kindly pardon the increased installation time due to the mongodb-memory-server package
try {
  const mongo = await MongoMemoryServer.create();
  const MONGO_URI = mongo.getUri();
  await mongoose.connect(MONGO_URI, {});
  console.log("Connected to mongoDB");
} catch (err) {
  throw err;
}

//errors thrown in the app will be caught here
mainApp.use(errorHandler);

const PORT = 3000;
//errors throw by all the above routes will be handled
mainApp.use(errorHandler);
//listening to a port
mainApp
  .listen(PORT, () => {
    console.log(`App listening to port: ${PORT}`);
  })
  .on("error", (err) => {
    //consoling the error if there is an error on startup
    console.error(err);
    process.exit(0);
  });
