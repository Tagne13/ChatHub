const db = require("../config/connection");
const { Conversation } = require("../models");

const conversationData = require("./conversationData.json");

db.once("open", async () => {
  await Conversation.deleteMany({});

  const conversation = await Conversation.create(conversationData);

  console.log("Conversation seeded", conversation);
  process.exit(0);
});
