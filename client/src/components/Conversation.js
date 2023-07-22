import React from "react";
import Messages from "./Conversation/Messages";
import MessageInput from "./Conversation/MessageInput";
import Navbar from "./Conversation/Navbar";

// Query the conversation.

function Conversation() {
  return (
    <>
      <Navbar />
      <Messages />
      <MessageInput />
    </>
  );
}

export default Conversation;
