import "./App.css";
import React from "react";
import Home from './components/Home';
import NotFound from "./components/NotFound"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
