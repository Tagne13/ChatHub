const { AuthenticationError } = require('apollo-server-express');
const { User, Conversation, Message } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      getUser: async (parent, { _id }) => {
        try {
          const user = await User.findById(_id).populate('messages');
          return user;
        } catch (err) {
            throw new Error("Couldn't find user with this id!");
        }
        },
        getConversation: async (parent, { _id }) => {
            try {
                const conversation = await Conversation.findById(_id).populate('participants');
                return conversation;
            } catch (err) {
                throw new Error("Couldn't find conversation with this id!");
            }
            },
        getMessages: async (parent, { conversation }) => {
            try {
                const messages = await Message.find({ conversation }).populate('sender');
                return messages;
            } catch (err) {
                throw new Error("Couldn't find messages for this conversation!");
            }
            },
    },


