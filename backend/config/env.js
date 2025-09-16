import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT || 5001,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/slack-clone",
  NODE_ENV: process.env.NODE_ENV || "development",
};
