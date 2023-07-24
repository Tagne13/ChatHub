import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation createMessage($content: String!, $conversation: ID!) {
    createMessage(content: $content, conversation: $conversation) {
      _id
      content
      createdAt
    }
  }
`;

export const ADD_CONVERSATION = gql`
  mutation createConversation($name: String!, $participants: [ID!]!) {
    createConversation(name: $name, participants: $participants) {
      _id
      name
      participants {
        _id
        username
      }
      messages {
        _id
        content
        sender {
          _id
          username
        }
        conversation {
          _id
          name
        }
        createdAt
      }
      createdAt
    }
  }
`;
