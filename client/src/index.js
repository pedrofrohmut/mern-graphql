import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import ApolloClient from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { ApolloProvider } from "@apollo/react-hooks"

import { AuthProvider } from "./context/auth"

import "semantic-ui-css/semantic.min.css"
import "./index.css"

const httpLink = createHttpLink({
  uri: "http://localhost:5000"
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById("root")
)
