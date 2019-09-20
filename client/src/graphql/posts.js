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

export const GET_POST_BY_ID = gql`
  query GetPostById($postId: ID!) {
    post(postId: $postId) {
      id
      body
      userName
      createdAt
      comments {
        id
        body
        userName
        createdAt
      }
      commentsCount
      likes {
        id
        userName
      }
      likesCount
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

export const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`
