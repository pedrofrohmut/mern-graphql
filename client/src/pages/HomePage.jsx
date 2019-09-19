import React, { useContext } from "react"
import { useQuery } from "@apollo/react-hooks"
import { GET_ALL_POSTS } from "../graphql/posts"

import { AuthContext } from "../context/auth"
import PostCard from "../components/cards/PostCard"
import AddPostForm from "../components/forms/AddPostForm"

import { Container, Grid } from "semantic-ui-react"

const HomePage = ({ history }) => {
  const { user } = useContext(AuthContext)
  const { loading, error, data } = useQuery(GET_ALL_POSTS)
  return (
    <Container>
      <Grid columns={3}>
        {loading && (
          <Grid.Row>
            <h1>Loading...</h1>
          </Grid.Row>
        )}

        {!loading && error && (
          <>
            <Grid.Row>
              <h1>Error has happened</h1>
            </Grid.Row>
            <Grid.Row>
              <pre>JSON.stringify(error, null, 4)</pre>
            </Grid.Row>
          </>
        )}

        {!loading && !error && data && data.allPost && data.allPost.length > 0 && (
          <>
            <Grid.Row>
              <h1>Recent Posts</h1>
            </Grid.Row>
            {user && (
              <Grid.Column>
                <AddPostForm history={history} />
              </Grid.Column>
            )}
            <Grid.Row>
              {data.allPost.map(post => (
                <Grid.Column key={post.id} style={{ marginBottom: "2rem" }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
            </Grid.Row>
          </>
        )}
      </Grid>
    </Container>
  )
}

export default HomePage
