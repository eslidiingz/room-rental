// Combines all schemas
import { postTypeDefs } from './postSchema';
import { userTypeDefs } from './userSchema';


export const typeDefs = [userTypeDefs, postTypeDefs];
