import React from "react"
import { Link } from "react-router-dom"

import { Button, Popup } from "semantic-ui-react"

const CommentButton = ({ postId, commentsCount }) => {
  return (
    <Popup
      content="Comment on Post"
      inverted
      trigger={
        <Button
          color="teal"
          content=""
          icon="comment"
          size="mini"
          basic
          label={{
            basic: true,
            color: "teal",
            pointing: "left",
            content: commentsCount
          }}
          as={Link}
          to={`/posts/${postId}`}
        />
      }
    />
  )
}

export default CommentButton
