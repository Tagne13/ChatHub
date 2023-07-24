const { AuthenticationError } = require("apollo-server-express");
const { User, Conversation, Message } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getUser: async (parent, { _id }) => {
      try {
        const user = await User.findById(_id).populate("messages");
        return user;
      } catch (err) {
        throw new Error("Couldn't find user with this id!");
      }
    },
    // getConversation: async (parent, { _id }) => {
    //   try {
    //     const conversation = await Conversation.findById(_id).populate(
    //       "participants"
    //     );
    //     return conversation;
    //   } catch (err) {
    //     // throw new Error("Couldn't find conversation with this id!");
    //     return err;
    //   }
    // },
    getConversations: async () => {
      return Conversation.find({});
    },
    getMessages: async (parent, { conversation }) => {
      try {
        const messages = await Message.find({
          conversation: conversation,
        });
        return messages;
      } catch (err) {
        throw new Error("Couldn't find messages for this conversation!");
      }
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    }, //done
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    }, //not MVP
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findOneAndDelete({ _id: context.user._id });
      }

      throw new AuthenticationError("Not logged in");
    }, //not MVP
    createConversation: async (parent, args, context) => {
      if (context.user) {
        const conversation = await Conversation.create(args);
        return args;
        await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { conversations: conversation } },
          { new: true }
        );
        return conversation;
      }
      throw new AuthenticationError("User is not logged in");
    }, //priority, need front end functionality to see the user interaction
    updateConversation: async (parent, args, context) => {
      if (context.user) {
        return await Conversation.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("User is not logged in");
    }, //not MVP
    deleteConversation: async (parent, args, context) => {
      if (context.user) {
        return await Conversation.findOneAndDelete({ _id: context.user._id });
      }

      throw new AuthenticationError("User is not logged in");
    }, //maybe
    addUserToConversation: async (
      parent,
      { userId, conversation },
      context
    ) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { conversations: conversation } },
          { new: true }
        );
      }

      throw new AuthenticationError("User is not logged in");
    }, // priority, however how does this work with socket? SocketIO problem
    removeUserFromConversation: async (parent, { conversation }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { conversations: conversation } },
          { new: true }
        );
      }

      throw new AuthenticationError("User is not logged in");
    }, // priority, also involves socketIO
    createMessage: async (parent, args, context) => {
      console.log(args);
      // if (context.user) {
      const message = await Message.create({
        content: args.content,
        conversation: args.conversation,
      });
      console.log(message);

      await Conversation.findOneAndUpdate(
        { _id: args.conversation },
        { $addToSet: { messages: message } },
        { new: true }
      );

      return message;
      // }
    }, // second-tier priority, messages can be stored as history for a user, check socketIO examples on this, maybe not the most necessary ?
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect email/password");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);

      return { token, user };
    }, // done
  },
};

module.exports = resolvers;
