import request from "supertest";
import app from "../src/app";

describe("Singup controller", () => {
  beforeAll((done) => {
    request(app)
      .post("/api/auth/singup")
      .field("email", "test@test.com")
      .field("password", "1234567890qwerty")
      .field("nickname", "TestNickname")
      .expect(201, done);
  })

  afterAll((done) => {
    request(app)
      .delete("/api/user/2")
      .expect(200, done);
  })

  describe("SingUp", () => {
    it("POST /api/auth/signup with invalid email should return 422", (done) => {
      request(app)
        .post("/api/auth/signup")
        .field("email", "invalidEmail")
        .field("password", "1234567890qwerty")
        .field("nickname", "some_valid_nick")
        .expect(422, done);
    });

    it("POST /api/auth/signup with empty email should return 422", (done) => {
      request(app)
        .post("/api/auth/signup")
        .field("email", "")
        .field("password", "1234567890qwerty")
        .field("nickname", "some_valid_nick")
        .expect(422, done);
    });

    it("POST /api/auth/signup with invalid password should return 422", (done) => {
      request(app)
        .post("/api/auth/signup")
        .field("email", "validmail@validmail.com")
        .field("password", "123")
        .field("nickname", "some_valid_nick")
        .expect(422, done);
    });

    it("POST /api/auth/signup with empty password should return 422", (done) => {
      request(app)
        .post("/api/auth/signup")
        .field("email", "validmail@validmail.com")
        .field("password", "")
        .field("nickname", "some_valid_nick")
        .expect(422, done);
    });

    it("POST /api/auth/signup with invalid nickname should return 422", (done) => {
      request(app)
        .post("/api/auth/signup")
        .field("email", "validmail@validmail.com")
        .field("password", "1234567890qwerty")
        .field("nickname", "some")
        .expect(422, done);
    });

    it("POST /api/auth/signup with empty nickname should return 422", (done) => {
      request(app)
        .post("/api/auth/signup")
        .field("email", "validmail@validmail.com")
        .field("password", "1234567890qwerty")
        .field("nickname", "")
        .expect(422, done);
    });

    it("POST /api/auth/signup with valid fields should return 201", (done) => {
      request(app)
        .post("/api/auth/signup")
        .field("email", "validmail@validmail.com")
        .field("password", "1234567890qwerty")
        .field("nickname", "some_valid_nick")
        .expect(201, done);
    });
  })

  describe("Login", () => {
    it("POST /api/auth/login with invalid email should return 422", (done) => {
      request(app)
        .post("/api/auth/login")
        .field("email", "invalidEmail")
        .field("password", "1234567890qwerty")
        .expect(422, done);
    });

    it("POST /api/auth/login with empty email should return 422", (done) => {
      request(app)
        .post("/api/auth/login")
        .field("email", "")
        .field("password", "1234567890qwerty")
        .expect(422, done);
    });

    it("POST /api/auth/login with invalid password should return 422", (done) => {
      request(app)
        .post("/api/auth/login")
        .field("email", "validmail@validmail.com")
        .field("password", "123")
        .expect(422, done);
    });

    it("POST /api/auth/login with empty password should return 422", (done) => {
      request(app)
        .post("/api/auth/login")
        .field("email", "validmail@validmail.com")
        .field("password", "")
        .expect(422, done);
    });

    it("POST /api/auth/login with valid creds should return 200", (done) => {
      request(app)
        .post("/api/auth/login")
        .field("email", "test@test.com")
        .field("password", "1234567890qwerty")
        .expect(200, done);
    });
  })
});