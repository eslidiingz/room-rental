import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql/schemas';
import { resolvers } from './graphql/resolvers';
import { verifyToken } from './utils/jwt';
import { GraphQLError } from 'graphql';

const GRAPHQL_PORT = Number(process.env.GRAPHQL_PORT) || 4000;


async function startApolloServer() {
  const server = new ApolloServer<any>({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || '';

      if (token) {
        try {
          const rawToken = token.replace('Bearer ', '');
          const user = await verifyToken(rawToken);

          return { user };
        } catch (error) {
          console.error('JWT verification error:', error);
          throw new GraphQLError('Token invalid or expired', {
            extensions: {
              code: 'UNAUTHENTICATED',
              http: { status: 401 },
            }
          });
        }
      }


      return { token }
    },
    listen: { port: GRAPHQL_PORT },
  });

  console.log(`🚀  Server ready at: ${url}`);

}

export default startApolloServer;