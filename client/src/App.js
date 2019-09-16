import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Navbar from "./components/layout/Navbar"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"

const App = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/signin" exact component={SignInPage} />
      <Route path="/signup" exact component={SignUpPage} />
    </Switch>
  </Router>
)

export default App
