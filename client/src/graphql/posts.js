import gql from "graphql-tag"

export const GET_ALL_POSTS = gql`
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

export const ADD_POST = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      userName
      likes {
        id
        userName
        createdAt
      }
      likesCount
      comments {
        id
        userName
        createdAt
      }
      commentsCount
    }
  }
`
