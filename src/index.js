import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
  uri: process.env.REACT_APP_PRINTS_API_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          prints: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        }
      }
    }
  })
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </React.StrictMode>
);