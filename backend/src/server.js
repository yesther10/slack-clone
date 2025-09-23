import "../instrument.mjs";
import expres from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { inngest, functions } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";
import * as Sentry from "@sentry/node";

const app = expres();

app.use(expres.json());

app.use(clerkMiddleware());

app.get("/debug-sentry", () => {
  throw new Error("My first Sentry error!");
});

app.get("/", (req, res) => {
  res.send("API is runnin aq...");
});

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

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
