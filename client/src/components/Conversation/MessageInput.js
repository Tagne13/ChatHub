import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_MESSAGE } from "../../utils/mutations";

// need to figure out how to send the senderId as a prop to this component.
function MessageInput({ conversationId, refetchMessages }) {
  const [content, setContent] = useState("");
  const [addMessage, { loading, error }] = useMutation(ADD_MESSAGE);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addMessage({
        variables: {
          content: content,
          conversation: conversationId,
        },
      });

      console.log("Message created:", data.createMessage);

      setContent("");
      refetchMessages();
    } catch (error) {
      console.error("Error creating message:", error);
    }
  };

  if (loading) {
    return <p>Creating message...</p>;
  }

  if (error) {
    return <p>Error creating message: {error.message}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type here"
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageInput;
