import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./modules/routes.exports";
import express from "express";

const app = express();

app.set("trust proxy", 1);
app.use(
    cors({
        origin: ["https://auth-access.vercel.app", "http://localhost:5173"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", routes.authRouter);
app.use("/user", routes.userRoutes);
app.use("/admin", routes.adminRoutes);

export default app;
