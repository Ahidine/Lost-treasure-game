import request from "supertest";
import express from "express";
import treasureRouter from "./TreasureRouter";
import { TreasureController } from "../controller/TreasureController";

describe("TreasureController API", () => {
  let app: express.Application;
  const mockTreasure = {
    id: "treasure123",
    name: "Golden Chest",
    value: 1000,
    location: "Cave",
  };
  const mockTreasures = [mockTreasure];

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/treasures", treasureRouter);

    jest
      .spyOn(TreasureController.prototype, "getTreasures")
      .mockResolvedValue(mockTreasures);
    jest
      .spyOn(TreasureController.prototype, "saveTreasure")
      .mockResolvedValue(undefined);
  });

  it("should get all treasures", async () => {
    const response = await request(app).get("/treasures");

    expect(response.status).toBe(200);
    expect(response.body.treasures).toHaveLength(1);
    expect(response.body.treasures[0].id).toBe(mockTreasure.id);
    expect(response.body.treasures[0].name).toBe(mockTreasure.name);
  });

  it("should save a treasure", async () => {
    const treasureInput = {
      name: "Silver Chest",
      value: 500,
      location: "Forest",
    };

    const response = await request(app).post("/treasures").send(treasureInput);

    expect(response.status).toBe(201); // Created
  });

  it("should return a 500 error if something goes wrong while getting treasures", async () => {
    jest
      .spyOn(TreasureController.prototype, "getTreasures")
      .mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).get("/treasures");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Database error");
  });

  it("should return a 500 error if something goes wrong while saving a treasure", async () => {
    jest
      .spyOn(TreasureController.prototype, "saveTreasure")
      .mockRejectedValueOnce(new Error("Error while saving treasure"));

    const treasureInput = {
      name: "Silver Chest",
      value: 500,
      location: "Forest",
    };

    const response = await request(app).post("/treasures").send(treasureInput);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Error while saving treasure");
  });
});
