import { Inngest } from "inngest";
import { connectDB } from "./db";
import { User } from "../models/user.model";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "slack-read-node" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      avatar: image_url,
    };

    await User.create(newUser);

    // TODO: more things to do when a user is created

    await step.run("Log Event", () => {
      console.log("New user created:", event.data);
    });
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "sdelete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    await connectDB();

    const { id } = event.data;

    await User.deleteOne({ clerkId: id });

    // TODO: more things to do when a user is created

    await step.run("Log Event", () => {
      console.log("Deleted user:", event.data);
    });
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUserFromDB];
