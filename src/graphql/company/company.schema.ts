// company.schema.ts

export const companyTypeDefs = `
  type Company {
    id: ID!
    username: String!
    code: String!
    name: String!
    first_name: String!
    last_name: String!
    email: String!
    phone_number: String!
    line_id: String
    is_active: Boolean!
    email_verify_at: String
    created_at: String!
    updated_at: String
    deleted_at: String
  }

  input CompanySignUpInput {
    username: String!
    password: String!
    name: String!
    first_name: String!
    last_name: String!
    email: String!
    phone_number: String!
  }

  input CompanySignInInput {
    username: String!
    password: String!
  }

  type AuthPayload {
    access_token: String!
    refresh_token: String
  }

  type Query {
    getUser(id: String!): String!
    myCompany: Company!
  }

  type Mutation {
    companySignUp(companySignUpInput: CompanySignUpInput!): AuthPayload!
    signInCompany(companySignInInput: CompanySignInInput!): AuthPayload!
  }
`;