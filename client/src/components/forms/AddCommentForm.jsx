import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { ADD_COMMENT } from "../../graphql/comments"

import { Button, Card, Form, Message } from "semantic-ui-react"

const INITIAL_FORM_DATA = {
  body: ""
}

const AddCommentForm = ({ postId }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState({})
  const [addComment, { loading }] = useMutation(ADD_COMMENT, {
    update: (proxy, result) => {
      setErrors({})
      setFormData({ ...formData, body: "" })
    },
    onError: err => {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: { postId, body: formData.body }
  })
  const handleSubmit = e => {
    e.preventDefault()
    addComment()
  }
  return (
    <div style={{ width: "100%" }}>
      <Card fluid>
        <Card.Content>
          <Form onSubmit={handleSubmit} noValidate loading={loading}>
            <h1>Add a comment</h1>
            <Form.Field>
              <Form.Input
                type="text"
                name="body"
                label="Comment Content Body"
                placeholder="Insert your comment on this post here"
                value={formData.body}
                onChange={e => setFormData({ ...formData, body: e.target.value })}
              />
            </Form.Field>
            <Button type="submit" color="teal">
              Submit
            </Button>
          </Form>
        </Card.Content>
      </Card>

      {errors && Object.keys(errors).length > 0 && <Message error list={Object.values(errors)} />}
    </div>
  )
}

export default AddCommentForm
