import React, { useState } from "react";
import Messages from "./Conversation/Messages";
import MessageInput from "./Conversation/MessageInput";
// import Navbar from "./Conversation/Navbar";
import { GET_CONVERSATIONS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";

// Query the conversation.

function Conversation() {
  const [shouldRefetchMessages, setShouldRefetchMessages] = useState(false);

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

  const refetchMessages = () => {
    setShouldRefetchMessages(true);
  };

  const toggleRefetch = () => {
    setShouldRefetchMessages(false);
  };

  return (
    <>
      {/* <Navbar /> */}
      <Messages
        conversationId={data.getConversations[0]._id}
        shouldRefetchMessages={shouldRefetchMessages}
        setShouldRefetchMessages={toggleRefetch}
      />
      <MessageInput
        conversationId={data.getConversations[0]._id}
        refetchMessages={refetchMessages}
      />
    </>
  );
}

export default Conversation;
