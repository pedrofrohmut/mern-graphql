import React, { useContext } from "react"
import moment from "moment"
import { Link } from "react-router-dom"

import { AuthContext } from "../../context/auth"
import LikeButton from "../buttons/LikeButton"

import { Button, Card, Image } from "semantic-ui-react"

const handleDelete = id => console.log("Delete Post, postId = ", id)

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
        <Card.Description as={Link} to={`post/${id}`}>
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
        <Button
          color="teal"
          content=""
          icon="comment"
          size="mini"
          basic
          label={{ basic: true, color: "teal", pointing: "left", content: commentsCount }}
          as={Link}
          to={`/posts/${id}`}
        />
        {user && user.userName && user.userName === userName && (
          <Button
            color="orange"
            content=""
            icon="trash"
            size="mini"
            basic
            label={{ basic: false, color: "orange", pointing: "left", content: "X" }}
            onClick={() => handleDelete(id)}
          />
        )}
      </Card.Content>
    </Card>
  )
}

export default PostCard
