import React, { useState } from "react";
import { GET_MESSAGES } from "../../utils/queries";
import { useQuery } from "@apollo/client";

export default function Messages() {
  const { loading, data, error } = useQuery(GET_MESSAGES, {
    variables: { conversationId },
    // Think we will have to hard code this conversationID, since we will only have one.
  });

  if (loading) {
    return <p>Loading messages...</p>;
  }

  if (error) {
    return <p>Error fetching messages: {error.message}</p>;
  }

  return (
    <>
      <div>
        {data.messages.map((message) => (
          <div key={message._id}>
            <p>{message.content}</p>
            <p>Sender:{message.sender.username}</p>
            <p>{message.createdAt}</p>
          </div>
        ))}
      </div>
    </>
  );
}
