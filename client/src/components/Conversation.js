import React from "react";
import Messages from "./Conversation/Messages";
import MessageInput from "./Conversation/MessageInput";
// import Navbar from "./Conversation/Navbar";
import { GET_CONVERSATIONS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import jwt_decode from "jwt-decode";
import Auth from "../utils/auth";

// Query the conversation.

function Conversation() {
  if (Auth.loggedIn()) {
  }
  const user = Auth.getProfile();
  console.log(user.data._id);

  const { loading, data, error } = useQuery(GET_CONVERSATIONS, {
    variables: { userId: user.data._id },
  });

  if (loading) {
    return <p>Loading conversation...</p>;
  }
  if (error) {
    return <p>Error fetching messages: {error.name}</p>;
  }

  return (
    <>
      {/* <Navbar /> */}
      <Messages />
      <MessageInput />
    </>
  );
}

export default Conversation;
