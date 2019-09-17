import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

import { Container, Grid } from "semantic-ui-react"

import PostCard from "../components/cards/PostCard"

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    allPost {
      id
      body
      createdAt
      userName
      commentsCount
      comments {
        id
        body
        userName
        createdAt
      }
      likesCount
      likes {
        id
        userName
      }
    }
  }
`

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS)
  if (!loading && !data) {
    return null
  }
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

        {!loading && !error && data.allPost && data.allPost.length > 0 && (
          <>
            <Grid.Row>
              <h1>Recent Posts</h1>
            </Grid.Row>
            {/*
            <Grid.Row>
              <pre>{JSON.stringify(data, null, 4)}</pre>
              </Grid.Row>
              */}
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
