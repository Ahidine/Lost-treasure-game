import request from "supertest";
import express from "express";
import userRouter from "./UserRouter";
import { UserController } from "../controller/UserController";

describe("UserController API", () => {
  let app: express.Application;
  const userId = "user123";
  const mockUser = {
    id: userId,
    name: "John Doe",
    email: "john@example.com",
    treasures: [],
  };
  const mockRewards = [
    {
      id: "reward1",
      name: "Gold Coin",
      date: "2021-09-01",
      attempts: 3,
    },
  ];

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/users", userRouter);
    jest
      .spyOn(UserController.prototype, "getUsers")
      .mockResolvedValue([mockUser]);
    jest
      .spyOn(UserController.prototype, "getUserById")
      .mockResolvedValue(mockUser);
    jest
      .spyOn(UserController.prototype, "getRewardsByUserId")
      .mockResolvedValue(mockRewards);
    jest
      .spyOn(UserController.prototype, "addRewardToUser")
      .mockResolvedValue(mockRewards);
  });

  it("should get all users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body.users).toHaveLength(1);
    expect(response.body.users[0].id).toBe(userId);
    expect(response.body.users[0].name).toBe("John Doe");
  });

  it("should get a user by id", async () => {
    const response = await request(app).get(`/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(userId);
    expect(response.body.name).toBe("John Doe");
  });

  it("should add a reward to a user", async () => {
    const reward = {
      id: "reward123",
      name: "Silver Coin",
      date: "2022-01-01",
      attempts: 1,
    };
    const response = await request(app)
      .post(`/users/${userId}/rewards`)
      .send(reward);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe("Gold Coin");
  });

  it("should get rewards for a user", async () => {
    const response = await request(app).get(`/users/${userId}/rewards`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe("Gold Coin");
  });

  it("should return a 500 error if something goes wrong", async () => {
    jest
      .spyOn(UserController.prototype, "getUsers")
      .mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).get("/users");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Database error");
  });

  it("should return a 500 error if user not found", async () => {
    jest
      .spyOn(UserController.prototype, "getUserById")
      .mockRejectedValueOnce(new Error("User not found"));

    const response = await request(app).get(`/users/${userId}`);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("User not found");
  });
});
