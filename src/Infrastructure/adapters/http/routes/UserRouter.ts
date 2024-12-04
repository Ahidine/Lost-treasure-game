import express from "express";
import { UserService } from "@/Domain/services/UserService";
import { UserRepositoryImp } from "../../db/UserRepositoryImp";
import { UserController } from "../controller/UserController";

const userRouter = express.Router();
const userRepositoryImp = new UserRepositoryImp();
const userService = new UserService(userRepositoryImp);
const userController = new UserController(userService);

userRouter.get("/", async (_req, res) => {
  try {
    const users = await userController.getUsers();
    res.json({ users });
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
});
userRouter.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userController.getUserById(userId);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
});

userRouter.post("/:id/rewards", async (req, res) => {
  try {
    const rewards = req.body;
    const treasures = await userController.addRewardToUser(
      req.params.id,
      rewards
    );
    res.json(treasures);
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
});
userRouter.get("/:id/rewards", async (req, res) => {
  try {
    const rewards = await userController.getRewardsByUserId(req.params.id);
    res.json(rewards);
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
});

export default userRouter;
