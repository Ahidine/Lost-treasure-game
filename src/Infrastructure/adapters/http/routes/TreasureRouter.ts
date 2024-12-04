import express from "express";
import { TreasureRepositoryImp } from "../../db/TreasureRepositoryImp";
import { TreasureController } from "../controller/TreasureController";
import { TreasureService } from "@/Domain/services/TreasureService";

const treasureRouter = express.Router();
const treasureRepositoryImp = new TreasureRepositoryImp();
const treasureService = new TreasureService(treasureRepositoryImp);
const treasureController = new TreasureController(treasureService);

treasureRouter.get("/", async (req, res) => {
  try {
    const treasures = await treasureController.getTreasures();
    res.json({ treasures });
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
});

treasureRouter.post("/", async (req, res) => {
  try {
    const treasure = req.body;
    await treasureController.saveTreasure(treasure);
    res.status(201).send();
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
});

export default treasureRouter;
