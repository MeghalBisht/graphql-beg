import React from 'react';
import ApolloClient from 'apollo-boost'
import BookList from './Components/BookList';
import { ApolloProvider } from '@apollo/react-hooks';
import AddBook from './Components/AddBook';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="main">
        <h1>Gamer's reading list</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
