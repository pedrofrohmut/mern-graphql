import React from "react"
import { Link } from "react-router-dom"

import { Button } from "semantic-ui-react"

const CommentButton = ({ postId, commentsCount }) => {
  return (
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
  )
}

export default CommentButton
