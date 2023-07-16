const { AuthenticationError } = require('apollo-server-express');
const { User, Conversation, Message } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      
    },
    Mutation: {
      createUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
        
        return { token, user };
      },
      updateUser: async (parent, args, context) => {
        if (context.user) {
          return await User.findByIdAndUpdate(context.user._id, args, { new: true });
        }
    
        throw new AuthenticationError('Not logged in');
      },
      deleteUser: async (parent, args, context) => {
        if (context.user) {
          return await User.findOneAndDelete({ _id: context.user._id });
        }

        throw new AuthenticationError('Not logged in');
      },
      createConversation: async (parent, args, context) => {
        if (context.user) {
          const conversation = await Conversation.create(args);

          return conversation;
        }
        throw new AuthenticationError('User is not logged in');
      },
      updateConversation: async (parent, args, context) => {
        if (context.user) {
          return await Conversation.findByIdAndUpdate(context.user._id, args, {new: true });
        }

        throw new AuthenticationError('User is not logged in');
      },
      deleteConversation: async (parent, args, context) => {
        if (context.user) {
          return await Conversation.findOneAndDelete({ _id: context.user._id });
        }

        throw new AuthenticationError('User is not logged in');
      },
      addUserToConversation: async (parent, { userId, conversation }, context) => {
        if (context.user) {
          return await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { conversations: conversation} },
            { new: true }
          )
        }

        throw new AuthenticationError('User is not logged in');
      },
      removeUserFromConversation: async (parent, { conversation }, context) => {
        if (context.user) {
          return await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { conversations: conversation } },
            { new: true }
          )
        }

        throw new AuthenticationError('User is not logged in')
      },
      createMessage: async (parent, args, context) => {
        if (context.user) {
          const message = await Message.create(args);

          return message;
        }
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
    
        if (!user) {
          throw new AuthenticationError('Incorrect email/password');
        }
    
        const correctPw = await user.isCorrectPassword(password);
    
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password');
        }
    
        const token = signToken(user);
    
        return { token, user };
      }
    }
};

module.exports = resolvers;