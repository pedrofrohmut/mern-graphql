import React, { useContext, useState } from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

import { AuthContext } from "../context/auth"

import { Button, Container, Form, Message } from "semantic-ui-react"

const SIGN_IN_USER = gql`
  mutation SignInUser($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      id
      email
      userName
      token
      createdAt
    }
  }
`

const INITIAL_FORM_DATA = {
  userName: "",
  password: ""
}

const SignInPage = ({ history }) => {
  const context = useContext(AuthContext)
  const [data, setData] = useState(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState({})
  const [signInUser, { loading }] = useMutation(SIGN_IN_USER, {
    update: (proxy, result) => {
      const userData = result.data.login
      context.signIn(userData)
      setErrors({})
    },
    onError: err => {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: data
  })
  const handleSubmit = e => {
    e.preventDefault()
    signInUser()
    history.push("/")
  }
  return (
    <Container>
      <div style={{ margin: "0 auto", maxWidth: "400px" }}>
        <Form onSubmit={handleSubmit} noValidate loading={loading}>
          <h1>Sign In User</h1>

          <Form.Input
            type="text"
            label="User Name"
            placeholder="inform the userName registered in this application"
            name="userName"
            value={data.userName}
            onChange={e => setData({ ...data, userName: e.target.value })}
            error={errors.userName ? true : false}
          />

          <Form.Input
            type="password"
            label="Password"
            placeholder="Inform your password for this account"
            name="password"
            value={data.password}
            onChange={e => setData({ ...data, password: e.target.value })}
            error={errors.password ? true : false}
          />

          <Button type="submit" primary>
            Sign In
          </Button>
        </Form>

        {Object.keys(errors).length > 0 && <Message error list={Object.values(errors)} />}
      </div>
    </Container>
  )
}

export default SignInPage
