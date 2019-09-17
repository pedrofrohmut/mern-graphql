import React from "react"
import moment from "moment"
import { Link } from "react-router-dom"

import { Button, Card, Image } from "semantic-ui-react"

const toggleLikePost = () => console.log("Like Post")

const commentPost = () => console.log("Comment Post")

const PostCard = ({ post }) => {
  const { body, createdAt, id, userName, likesCount, commentsCount, likes } = post
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
      <Card.Content extra>
        <Button
          color="teal"
          content=" "
          icon="heart"
          size="mini"
          basic
          label={{ basic: true, color: "teal", pointing: "left", content: likesCount }}
          onClick={toggleLikePost}
        />
        <Button
          color="teal"
          content=" "
          icon="comment"
          size="mini"
          basic
          label={{ basic: true, color: "teal", pointing: "left", content: commentsCount }}
          onClick={commentPost}
        />
      </Card.Content>
    </Card>
  )
}

export default PostCard
