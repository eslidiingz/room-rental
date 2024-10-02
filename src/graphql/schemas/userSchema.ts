// userSchema.ts

export const userTypeDefs = `
  type User {
    id: String!
    name: String!
    email: String!
    posts: [Post!]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getUser(id: String!): User
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;
