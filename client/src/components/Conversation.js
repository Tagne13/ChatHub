import React from "react";
import Messages from "./Conversation/Messages";
import MessageInput from "./Conversation/MessageInput";
// import Navbar from "./Conversation/Navbar";
import { GET_CONVERSATIONS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";

// Query the conversation.

function Conversation() {
  if (Auth.loggedIn()) {
  }
  const user = Auth.getProfile();

  const { loading, data, error } = useQuery(GET_CONVERSATIONS);

  if (loading) {
    return <p>Loading conversation...</p>;
  }
  if (error) {
    return <p>Error fetching: {error.message}</p>;
  }

  return (
    <>
      {/* <Navbar /> */}
      <Messages conversationId={data.getConversations[0]._id} />
      <MessageInput
        conversationId={data.getConversations[0]._id}
        senderId={user.data._id}
      />
    </>
  );
}

export default Conversation;
