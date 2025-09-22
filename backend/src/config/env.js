import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT || 5001,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/slack-clone",
  NODE_ENV: process.env.NODE_ENV || "development",
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY || "",
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || "",
  STREAM_API_KEY: process.env.STREAM_API_KEY || "",
  STREAM_API_SECRET: process.env.STREAM_API_SECRET || "",
  SENTRY_DNS: process.env.SENTRY_DNS || "",
  INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY || "",
  INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY || "",
};
