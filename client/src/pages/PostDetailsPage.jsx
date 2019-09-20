import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import moment from "moment"

import { GET_POST_BY_ID } from "../graphql/posts"
import { AuthContext } from "../context/auth"
import LikeButton from "../components/buttons/LikeButton"
import CommentButton from "../components/buttons/CommentButton"
import DeleteButton from "../components/buttons/DeleteButton"

import { Card, Container, Grid, Image } from "semantic-ui-react"

const PostDetailsPage = ({ match }) => {
  const { postId } = match.params
  const { user } = useContext(AuthContext)
  const { loading, error, data } = useQuery(GET_POST_BY_ID, { variables: { postId } })
  const [post, setPost] = useState(null)
  useEffect(() => {
    if (!loading && data.post) {
      setPost(data.post)
    }
  }, [loading, data])
  return (
    <Container>
      {loading && <h1>Loading...</h1>}

      {!loading && error && (
        <>
          <h1>Error:</h1>
          <pre>{JSON.stringify(error, null, 4)}</pre>
        </>
      )}

      {post && (
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                size="small"
                float="right"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{post.userName}</Card.Header>
                  <Card.Meta>{moment(post.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{post.body}</Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra>
                  <LikeButton
                    postId={postId}
                    likes={post.likes}
                    likesCount={post.likesCount}
                    userName={user ? post.userName : null}
                  />
                  <CommentButton postId={postId} commentsCount={post.commentsCount} />
                  {user && user.userName && user.userName === post.userName && (
                    <DeleteButton postId={postId} />
                  )}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          {post.commentsCount > 0 && post.comments && (
            <Grid.Row>
              {post.comments.map(comment => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    <Card.Header>{comment.userName}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                  {user && user.userName && user.userName === comment.userName && (
                    <Card.Content extra>
                      <DeleteButton postId={postId} commentId={comment.id} />
                    </Card.Content>
                  )}
                </Card>
              ))}
            </Grid.Row>
          )}
        </Grid>
      )}

      {post && (
        <>
          <h1>Post Data:</h1>
          <pre>{JSON.stringify(post, null, 4)}</pre>
        </>
      )}
    </Container>
  )
}

export default PostDetailsPage
