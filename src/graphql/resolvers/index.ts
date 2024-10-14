// Combines all resolvers
// import { userResolvers } from './userResolver';
// import { postResolvers } from './postResolver';
import { companyResolvers } from './../company/company.resolver';

export const resolvers = {
  Query: {
    ...companyResolvers.Query,
    // ...userResolvers.Query,
    // ...postResolvers.Query,
  },
  Mutation: {
    ...companyResolvers.Mutation,
    // ...userResolvers.Mutation,
    // ...postResolvers.Mutation,
  }
};
