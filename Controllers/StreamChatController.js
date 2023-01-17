import { StreamChat } from "stream-chat";
const express = require("express");
const StreamRouter = express.Router();

const client = StreamChat.getInstance("YOUR_API_KEY", "API_KEY_SECRET");

// type ChatChannel = { image: string, category?: string };
// type ChatUser1 = { nickname: string, age: number, admin?: boolean };
// type ChatUser2 = { nickname: string, avatar?: string };
// type UserMessage = { country?: string };
// type AdminMessage = { priorityLevel: number };
// type ChatAttachment = { originalURL?: string };
// type CustomReaction = { size?: number };
// type ChatEvent = { quitChannel?: boolean };
// type CustomCommands = "giphy";

// type StreamType = {
//   attachmentType: ChatAttachment,
//   channelType: ChatChannel,
//   commandType: CustomCommands,
//   eventType: ChatEvent,
//   messageType: UserMessage | AdminMessage,
//   reactionType: CustomReaction,
//   userType: ChatUser1 | ChatUser2,
// };

// Create channel
const channel = client.channel("messaging", "TestChannel");
await channel.create();

// Create user
await client.upsertUser({
  id: "vishal-1",
  name: "Vishal",
});

// Send message
const { message } = await channel.sendMessage({ text: `Test message` });

// Send reaction
await channel.sendReaction(message.id, {
  type: "love",
  user: { id: "vishal-1" },
});
