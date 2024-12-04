import request from "supertest";
import express from "express";
import { AuthController } from "../controller/AuthController";
import authRouter from "./AuthRouter";

describe("AuthController API", () => {
  let app: express.Application;
  const mockUser = {
    id: "user123",
    name: "John Doe",
    email: "john@example.com",
  };
  const mockToken = "mock-token";

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/auth", authRouter);

    jest
      .spyOn(AuthController.prototype, "register")
      .mockResolvedValue({ user: mockUser, token: mockToken });
    jest
      .spyOn(AuthController.prototype, "login")
      .mockResolvedValue({ user: mockUser, token: mockToken });
    jest.spyOn(AuthController.prototype, "logout").mockResolvedValue(undefined);
  });

  it("should register a user", async () => {
    const userInput = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };

    const response = await request(app).post("/auth/register").send(userInput);

    expect(response.status).toBe(200);
    expect(response.body.user.id).toBe(mockUser.id);
    expect(response.body.token).toBe(mockToken);
  });

  it("should login a user", async () => {
    const loginInput = {
      email: "john@example.com",
      password: "password123",
    };

    const response = await request(app).post("/auth/login").send(loginInput);

    expect(response.status).toBe(200);
    expect(response.body.user.id).toBe(mockUser.id);
    expect(response.body.token).toBe(mockToken);
  });

  it("should return 400 if input is invalid for login", async () => {
    const invalidLoginInput = { email: "john@example.com" };

    const response = await request(app)
      .post("/auth/login")
      .send(invalidLoginInput);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid input");
  });

  it("should logout a user", async () => {
    const response = await request(app).post("/auth/logout");

    expect(response.status).toBe(201); // Created
  });

  it("should return 500 error if logout fails", async () => {
    jest
      .spyOn(AuthController.prototype, "logout")
      .mockRejectedValueOnce(new Error("Logout failed"));

    const response = await request(app).post("/auth/logout");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Logout failed");
  });

  it("should return 500 error if registration fails", async () => {
    jest
      .spyOn(AuthController.prototype, "register")
      .mockRejectedValueOnce(new Error("Registration failed"));

    const userInput = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };

    const response = await request(app).post("/auth/register").send(userInput);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Registration failed");
  });

  it("should return 500 error if login fails", async () => {
    jest
      .spyOn(AuthController.prototype, "login")
      .mockRejectedValueOnce(new Error("Login failed"));

    const loginInput = {
      email: "john@example.com",
      password: "password123",
    };

    const response = await request(app).post("/auth/login").send(loginInput);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Login failed");
  });
});
