import express from "express";
import userRouter from "./Infrastructure/adapters/http/routes/UserRouter";
import treasureRouter from "./Infrastructure/adapters/http/routes/TreasureRouter";
import authRouter from "./Infrastructure/adapters/http/routes/AuthRouter";
import cors from "cors";
import dotenv from "dotenv";
import { authenticate } from "./Infrastructure/adapters/http/routes/authMiddleware";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.options("*", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.FRONTEND_URL || "http://localhost:3000"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).end();
});

app.use("/api/auth", authRouter);
app.use("/api/treasures", treasureRouter);
app.use("/api/users", authenticate, userRouter);

const startServer = () => {
  try {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

startServer();
