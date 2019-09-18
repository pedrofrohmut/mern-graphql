import React, { useContext, useState } from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

import { AuthContext } from "../context/auth"

import { Button, Container, Form, Message } from "semantic-ui-react"

const SIGN_UP_USER = gql`
  mutation RegisterUser(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        userName: $userName
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      id
      email
      userName
      createdAt
      token
    }
  }
`

const INITIAL_FORM_DATA = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const SignUpPage = ({ history }) => {
  const context = useContext(AuthContext)
  const [data, setData] = useState(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState({})
  const [signUpUser, { loading }] = useMutation(SIGN_UP_USER, {
    update: (proxy, result) => {
      const userData = result.data.register
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
    signUpUser()
    history.push("/")
  }
  return (
    <Container>
      <div style={{ margin: "0 auto", maxWidth: "400px" }}>
        <Form onSubmit={handleSubmit} noValidate loading={loading}>
          <h1>Sign Up User</h1>

          <Form.Input
            type="text"
            label="User Name"
            placeholder="The username to identify yourself"
            name="userName"
            value={data.userName}
            onChange={e => setData({ ...data, userName: e.target.value })}
            error={errors.userName ? true : false}
          />

          <Form.Input
            type="text"
            label="E-mail"
            placeholder="Inform an active e-mail"
            name="email"
            value={data.email}
            onChange={e => setData({ ...data, email: e.target.value })}
            error={errors.email ? true : false}
          />

          <Form.Input
            type="password"
            label="Password"
            placeholder="Choose a secure password"
            name="password"
            value={data.password}
            onChange={e => setData({ ...data, password: e.target.value })}
            error={errors.password ? true : false}
          />

          <Form.Input
            type="password"
            label="Confirm Password"
            placeholder="Retype your password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={e => setData({ ...data, confirmPassword: e.target.value })}
            error={errors.confirmPassword ? true : false}
          />

          <Button type="submit" primary>
            Sign Up
          </Button>
        </Form>

        {Object.keys(errors).length > 0 && <Message error list={Object.values(errors)} />}
      </div>
    </Container>
  )
}

export default SignUpPage
