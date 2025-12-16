import express from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

export default app;
