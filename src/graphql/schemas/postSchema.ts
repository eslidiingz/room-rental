// postSchema.ts

export const postTypeDefs = `
  type Post {
    id: String!
    title: String!
    content: String
    author: User!
    createdAt: String!
  }

  type Query {
    getPost(id: String!): Post
    getAllPosts: [Post!]!
  }

  type Mutation {
    createPost(title: String!, content: String, authorId: String!): Post!
  }
`;
