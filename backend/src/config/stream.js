import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

const StreamChatClient = StreamChat.getInstance(
  ENV.STREAM_API_KEY,
  ENV.STREAM_API_SECRET
);

export const upsertStreamuser = async (userData) => {
  try {
    await StreamChatClient.upsertUser(userData);
    console.log("Upserted user to Stream:", userData);
    return userData;
  } catch (error) {
    console.log("Error upserting user to Stream:", error);
  }
};

export const deleteStreamuser = async (userId) => {
  try {
    await StreamChatClient.deletetUser(userId);
    console.log("Deleted user from Stream:", userId);
  } catch (error) {
    console.log("Error deleting user from Stream:", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    return StreamChatClient.createToken(userId.toString());
  } catch (error) {
    console.log("Error generating Stream token:", error);
  }
};
