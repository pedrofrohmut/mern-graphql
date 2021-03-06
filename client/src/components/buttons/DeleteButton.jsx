import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import { useMutation } from "@apollo/react-hooks"

import { DELETE_POST, GET_ALL_POSTS, GET_POST_BY_ID } from "../../graphql/posts"
import { DELETE_COMMENT } from "../../graphql/comments"

import { Button, Confirm, Popup } from "semantic-ui-react"

const DeleteButton = ({ postId, commentId, history }) => {
  const isComment = commentId !== undefined
  const [deletePost] = useMutation(DELETE_POST, {
    update: (proxy, result) => {
      const query = GET_ALL_POSTS
      const data = proxy.readQuery({
        query
      })
      proxy.writeQuery({
        query,
        data: {
          allPost: data.allPost.filter(post => post.id !== postId)
        }
      })
      if (history.location.pathname !== "/") {
        history.push("/")
      }
    },
    variables: { postId }
  })
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    update: (proxy, result) => {
      const query = GET_POST_BY_ID
      const data = proxy.readQuery({
        query,
        variables: { postId }
      })
      proxy.writeQuery({
        query,
        data: {
          post: {
            ...data.post,
            comments: data.post.comments.filter(comment => comment.id !== commentId)
          }
        }
      })
    },
    variables: { postId, commentId }
  })
  const [isModalOpen, setModalOpen] = useState(false)
  const handleClick = (postId, commentId) => {
    if (isComment) {
      deleteComment()
    } else {
      deletePost()
    }
    setModalOpen(false)
  }
  return (
    <>
      <Popup
        content={`Delete this ${isComment ? "comment" : "post"}`}
        inverted
        trigger={
          <Button
            color="orange"
            content=""
            icon="trash"
            size="mini"
            basic
            label={{ basic: false, color: "orange", pointing: "left", content: "X" }}
            onClick={() => setModalOpen(true)}
          />
        }
      />
      <Confirm
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={() => handleClick(postId, commentId)}
      />
    </>
  )
}

export default withRouter(DeleteButton)
