import express from "express";
import cors from "cors";
import routes from "./modules/routes.exports";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", routes.authRouter);
app.use("/admin", routes.adminRoutes);

export default app;
