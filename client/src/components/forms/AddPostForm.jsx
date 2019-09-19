import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { ADD_POST, GET_ALL_POSTS } from "../../graphql/posts"

import { Button, Form, Message } from "semantic-ui-react"

const INITIAL_FORM_DATA = {
  body: ""
}

const AddPostForm = ({ history }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState({})
  const [addPost, { loading }] = useMutation(ADD_POST, {
    update: (proxy, result) => {
      const query = GET_ALL_POSTS
      const data = proxy.readQuery({
        query
      })
      // data.allPost = [result.data.createPost, ...data.allPost]
      // proxy.writeQuery({ query: GET_ALL_POSTS, data })
      proxy.writeQuery({
        query,
        data: {
          allPost: [result.data.createPost, ...data.allPost]
        }
      })
      setFormData({ ...formData, body: "" })
      setErrors({})
    },
    onError: err => {
      const exceptions = err.graphQLErrors[0].extensions.exception.errors
      const message = err.graphQLErrors[0].message
      if (exceptions) {
        setErrors({ ...exceptions })
      } else {
        setErrors({ authorization: message })
      }
    },
    variables: formData
  })
  const handleSubmit = e => {
    e.preventDefault()
    addPost()
    history.push("/")
  }
  return (
    <div style={{ margin: "0 auto", maxWidth: "400px" }}>
      <Form onSubmit={handleSubmit} noValidate loading={loading}>
        <h1>Create a post</h1>
        <Form.Field>
          <Form.Input
            type="text"
            name="body"
            label="Post Body"
            placeholder="Say what"
            value={formData.body}
            onChange={e => setFormData({ ...formData, body: e.target.value })}
          />
        </Form.Field>
        <Button type="submit" color="teal">
          Post It!
        </Button>
      </Form>

      {errors && Object.keys(errors).length > 0 && <Message error list={Object.values(errors)} />}
    </div>
  )
}

export default AddPostForm
