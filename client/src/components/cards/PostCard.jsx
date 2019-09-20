import React, { useContext } from "react"
import moment from "moment"
import { Link } from "react-router-dom"

import { AuthContext } from "../../context/auth"
import LikeButton from "../buttons/LikeButton"
import CommentButton from "../buttons/CommentButton"
import DeleteButton from "../buttons/DeleteButton"

import { Card, Image } from "semantic-ui-react"

const PostCard = ({ post }) => {
  const { body, createdAt, id, userName, likesCount, commentsCount, likes } = post
  const { user } = useContext(AuthContext)
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{userName}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description as={Link} to={`posts/${id}`}>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra style={{ opacity: "0.75" }}>
        <LikeButton
          postId={id}
          likes={likes}
          likesCount={likesCount}
          userName={user ? user.userName : null}
        />
        <CommentButton postId={id} commentsCount={commentsCount} />
        {user && user.userName && user.userName === userName && (
          <DeleteButton postId={id} />
        )}
      </Card.Content>
    </Card>
  )
}

export default PostCard
