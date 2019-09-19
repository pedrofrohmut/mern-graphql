import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

import { Button } from "semantic-ui-react"

const TOGGLE_LIKE_POST = gql`
  mutation ToggleLikePost($postId: ID!) {
    toggleLikePost(postId: $postId) {
      id
      body
      createdAt
      userName
      likes {
        id
        userName
      }
      likesCount
    }
  }
`

const LikeButton = ({ postId, likes, likesCount, userName }) => {
  const [liked, setLiked] = useState(false)
  useEffect(() => {
    if (userName && likes.some(like => like.userName === userName)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [userName, likes])
  const [toggleLikePost] = useMutation(TOGGLE_LIKE_POST, {
    variables: { postId }
  })
  if (userName) {
    return (
      <Button
        color="teal"
        content=""
        icon="heart"
        size="mini"
        basic={!liked}
        label={{ basic: true, color: "teal", pointing: "left", content: likesCount }}
        onClick={toggleLikePost}
      />
    )
  } else {
    return (
      <Button
        color="teal"
        content=""
        icon="heart"
        size="mini"
        basic
        label={{ basic: true, color: "teal", pointing: "left", content: likesCount }}
        as={Link}
        to="/signin"
      />
    )
  }
}

export default LikeButton
