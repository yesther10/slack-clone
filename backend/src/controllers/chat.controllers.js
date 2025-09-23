import { generateStreamToken } from "../config/stream.js";

export const getStreamToken = (req, res) => {
  try {
    const token = generateStreamToken(req.auth().userId);
    return res.status(200).json({ token });
  } catch (error) {
    console.log("Error generating Stream token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
