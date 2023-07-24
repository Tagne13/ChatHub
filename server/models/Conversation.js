const { Schema, model } = require("mongoose");

const conversationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // participants: [{
  //     type: Schema.Types.ObjectId,
  //     ref: 'User',
  // }],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Conversation = model("Conversation", conversationSchema);

module.exports = Conversation;
