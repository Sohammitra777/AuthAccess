import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./modules/routes.exports";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", routes.authRouter);
app.use("/admin", routes.adminRoutes);

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Server running" });
});

app.post("/", (req: Request, res: Response) => {
    const { name, age } = req.body;
    console.log(name, age);
    res.json({ name, age });
});

export default app;
