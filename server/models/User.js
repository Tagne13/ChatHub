const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  conversations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
    },
  ],
});

const User = model('User', userSchema);

module.exports = User;
