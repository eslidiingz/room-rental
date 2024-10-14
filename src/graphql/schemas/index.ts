// Combines all schemas

import { companyTypeDefs } from "../company/company.schema";


// import { companyTypeDefs } from './companySchema';
// import { postTypeDefs } from './postSchema';
// import { userTypeDefs } from './userSchema';


export const typeDefs = [companyTypeDefs];
// export const typeDefs = [userTypeDefs, postTypeDefs];
