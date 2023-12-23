import { app } from "../../app.js";
import request from "supertest";

describe("testing signup scenarios", () => {
  it("returns 201 with valid email and password and unique username", async () => {
    await request(app)
      .post("/api/v1/users/signup")
      .send({
        email: "test@test.com",
        password: "test123",
        username: "testuser",
      })
      .expect(201);
  });

  it("returns 400 if on duplicate email registration attempt", async () => {
    //first user signup, 201 expected
    await request(app)
      .post("/api/v1/users/signup")
      .send({
        email: "test@test.com",
        password: "test123",
        username: "testuser",
      })
      .expect(201);

    //second attempt with the same email, 400 expected
    await request(app)
      .post("/api/v1/users/signup")
      .send({
        email: "test@test.com",
        password: "test123",
        username: "testuser",
      })
      .expect(400);
  });

  it("returns 400 if on duplicate username registration attempt", async () => {
    //first user signup, 201 expected
    await request(app)
      .post("/api/v1/users/signup")
      .send({
        email: "test@test.com",
        password: "test123",
        username: "testuser",
      })
      .expect(201);

    //second attempt with a different email,but same username 400 expected
    await request(app)
      .post("/api/v1/users/signup")
      .send({
        email: "test2@test.com",
        password: "test123",
        username: "testuser",
      })
      .expect(400);
  });
});
