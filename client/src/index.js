import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import ApolloClient from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { ApolloProvider } from "@apollo/react-hooks"
import { setContext } from "apollo-link-context"

import { AuthProvider, getAuthToken } from "./context/auth"

import "semantic-ui-css/semantic.min.css"
import "./index.css"

const httpLink = createHttpLink({
  uri: "http://localhost:5000"
})

const authLink = setContext(() => {
  const token = getAuthToken()
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById("root")
)
