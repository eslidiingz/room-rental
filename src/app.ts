import { Elysia } from "elysia";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { jwt } from "@elysiajs/jwt";
import { typeDefs } from './graphql/schemas';
import { resolvers } from './graphql/resolvers';

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  // context: () => ({ prisma }), // Pass Prisma client via context
  context: async ({ req }: { req: IncomingMessage }) => {
    const token = req.headers.authorization || '';

    if (token) {
      try {
        const { userId } = verifyToken(token.replace('Bearer ', ''));
        return { user: { id: userId } };
      } catch (error) {
        console.error('JWT verification error:', error);
        throw new Error('Invalid token');
      }
    }

    return { user: null };
  },
});

const { url } = await startStandaloneServer(graphqlServer, {
  listen: { port: 4000 },
});

console.log(`🚀 GraphQL Server is running at: ${url}`);


// REST API //
// Initialize Elysia server for any REST APIs you want to serve
const app = new Elysia()
  // .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET!, }))
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);



