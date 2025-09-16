import expres from "express";
import { ENV } from "../config/env.js";

const app = expres();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
