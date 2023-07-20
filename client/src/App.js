import "./index.css";
import React from "react";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Conversation from "./components/Conversation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/conversation" element={<Conversation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
