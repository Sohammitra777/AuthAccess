import "dotenv/config";
import app from "./app";
const PORT = process.env.PORT || 3000;

process.on("SIGTERM", () => {
  console.log("🛑 Shutting down...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Interrupted");
  process.exit(0);
});

app.listen(PORT, () => {
    console.log(`server fire at: http://localhost:${PORT}`);
});
