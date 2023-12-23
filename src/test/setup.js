import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../app";
import request from "supertest";

let mongo; //mongo server to be assigned

/*
setup file that will run before all the tests 
*/

//first test will be slightly delayed due to the mongo server
beforeAll(async () => {
  try {
    //initialzing a sperate mongo server for the tests
    process.env.JWT_KEY = "SOCIAL";
    const mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri, {});
  } catch (err) {
    console.log("Error at before all");
  }
});

beforeEach(async () => {
  //dropping all the collections to allow for test isolation
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.drop();
    console.log("collection dropped is ", collection.collectionName);
  }
});

afterAll(async () => {
  //closing the mongo connection after all the tests are done
  if (mongo) {
    await mongo.stop();
    console.log("Mongo server stopped");
  }
  await mongoose.connection.close();
  console.log("mongoose connection closed");
});

//declaring a global signup function for test pre-requisites
export const signup = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({ email, password });

  expect(response.status).toEqual(201);

  return response.get("Set-Cookie");
};
