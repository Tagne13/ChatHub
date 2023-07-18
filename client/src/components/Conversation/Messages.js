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
  ] = useMutation(ADD_MESSAGE);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (condition) {
      addMessage({
        variables: {
          content: newMessage,
          sender: data.sender._id,
          //   conversation: pull from route
        },
      });
    }
  };

  return (
    <>
      <div>{data}</div>
      <form>
        {/* <label></label> */}
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        ></input>
      </form>
    </>
  );
}
