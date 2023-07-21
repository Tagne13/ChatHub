import React from "react";
import Messages from "./conversation/Messages";
import MessageInput from "./conversation/MessageInput";
import Navbar from "./conversation/Navbar";

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
