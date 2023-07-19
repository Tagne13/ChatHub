import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser($userId: ID!) {
    user(id: $userId) {
      _id
      username
      email
    }
  }
`;

export const GET_MESSAGES = gql`
  query getMessages($conversationId: ID!) {
    messages(conversationId: $conversationId) {
      _id
      content
      sender {
        _id
        username
      }
      createdAt
    }
  }
`;

export const GET_CONVERSATIONS = gql`
  query getConversations($userId: ID!) {
    conversations(userId: $userId) {
      _id
      name
      participants {
        _id
        username
      }
    }
  }
`;
