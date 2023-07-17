import "./App.css";
import React from "react";
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';


const client = new ApolloClient ({
  uri: '/graphql' ,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client ={ client}>
      <Router>
        <div>
          <Routes>
            {/* <Route path='/' element={<Home />}/> */}
            <Route path='/register' element={<Register />}/>
            {/* <Route path='*' element={<NotFound />}/> */}
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App;