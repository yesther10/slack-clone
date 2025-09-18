import expres from "express";
import { ENV } from "../config/env.js";
import { connectDB } from "../config/db.js";
import { clerkMiddlewarte } from "@clerk/clerk-sdk-node";
import { inngest, functions } from "../config/inngest.js";
import { serve } from "inngest/express";

const app = expres();

app.use(expres.json());

app.use(clerkMiddlewarte());

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const starkServer = async () => {
  await connectDB();

  try {
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log(`Server is running on port ${ENV.PORT}`);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

starkServer();

export default app;
