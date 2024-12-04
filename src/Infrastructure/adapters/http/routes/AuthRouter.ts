import express from "express";
import { UserRepositoryImp } from "../../db/UserRepositoryImp";
import { AuthService } from "@/Domain/services/AuthService";
import { AuthController } from "../controller/AuthController";

const authRouter = express.Router();
const authRepositoryImp = new UserRepositoryImp();
const authService = new AuthService(authRepositoryImp);
const authController = new AuthController(authService);

authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Invalid input" });
    }
    const { user, token } = await authController.register(
      name,
      email,
      password
    );
    res.json({ user, token });
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid input" });
    }
    const { user, token } = await authController.login(email, password);
    res.json({ user, token });
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
});
authRouter.post("/logout", async (_req, res) => {
  try {
    await authController.logout();
    res.status(201).send();
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
});

export default authRouter;
