import { gql } from "@apollo/client";

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
    getMessages(conversation: $conversationId) {
      _id
      content
      createdAt
    }
  }
`;

// export const GET_CONVERSATION = gql`
//   query getConversation($userId: ID!) {
//     conversation(userId: $userId) {
//       _id
//       name
//       participants {
//         _id
//         username
//       }
//     }
//   }
// `;

export const GET_CONVERSATIONS = gql`
  query getConversations {
    getConversations {
      _id
      name
    }
  }
`;

// sender {
//   _id
//   username
// }
