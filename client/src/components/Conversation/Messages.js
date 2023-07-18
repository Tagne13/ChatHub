import React, { useState } from "react";
import { GET_MESSAGES } from "../../utils/queries";
import { ADD_MESSAGE } from "../../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { loading, data, error } = useQuery(GET_MESSAGES);

  const [
    addMessage,
    { data: dataMutation, loading: loadingMutation, error: errorMutation },
  ] = useMutation(ADD_MESSAGE, {
    refetchQueries: [{query: GET_MESSAGES}],
    onCompleted: () => {
      setNewMessage("")
    },
    onError: (error) =>{
      console.error("Error adding message:", error);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== "") {
      addMessage({
        variables: {
          content: newMessage,
          sender: data.sender._id,
          //   conversation: pull from route or hard code with the room ID.
        },
      });
    }
  };

  return (
    <>
      <div>{data}</div>
      <form onSubmit={handleSubmit}>
        {/* <label></label> */}
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        ></input>
        <button type="submit">Send</button>
      </form>
    </>
  );
}
