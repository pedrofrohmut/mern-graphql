import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Navbar from "./components/layout/Navbar"
import HomePage from "./pages/HomePage"
import PostDetailsPage from "./pages/PostDetailsPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import AuthRoute from "./components/routes/AuthRoute"

const App = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/posts/:postId" component={PostDetailsPage} />
      <AuthRoute path="/signin" exact component={SignInPage} />
      <AuthRoute path="/signup" exact component={SignUpPage} />
    </Switch>
  </Router>
)

export default App
