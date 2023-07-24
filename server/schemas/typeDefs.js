const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    messages: [Message!]!
    conversations: [Conversation!]!
  }

  type Message {
    _id: ID!
    content: String!
    sender: User!
    conversation: ID!
    createdAt: String!
  }

  type Conversation {
    _id: ID!
    name: String!
    participants: [User!]!
    messages: [Message!]!
    createdAt: String!
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query {
    getUser(_id: ID!): User
    getConversations: [Conversation]
    getMessages(conversation: ID!): [Message!]!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    deleteUser(_id: ID!): User
    createConversation(name: String!, participants: [ID!]!): Conversation
    updateConversation(
      _id: ID!
      name: String
      participants: [ID!]
    ): Conversation
    deleteConversation(_id: ID!): Conversation
    addUserToConversation(_id: ID!, user: ID!): Conversation
    removeUserFromConversation(_id: ID!, user: ID!): Conversation
    createMessage(content: String!, conversation: ID!): Message
    login(email: String!, password: String!): Auth
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = typeDefs;
