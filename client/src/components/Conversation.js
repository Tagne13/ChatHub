import React, { useState } from "react";
import Messages from "./Conversation/Messages";
import MessageInput from "./Conversation/MessageInput";
import Navbar from "./Conversation/Navbar";

export default function Conversation() {
  return (
    <>
      <Navbar />
      <Messages />
      <MessageInput />
    </>
  );
}
