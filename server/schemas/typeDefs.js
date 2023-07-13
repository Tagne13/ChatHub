const { gql } = require('apollo-server-express');

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
    conversation: Conversation!
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
    getConversation(_id: ID!): Conversation
    getMessages(conversation: ID!): [Message!]!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    createConversation(name: String!, participants: [ID!]!): Conversation
    createMessage(content: String!, sender: ID!, conversation: ID!): Message
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = typeDefs;
