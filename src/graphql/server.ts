import { ApolloServer } from '@apollo/server';
import { typeDefs } from './schemas';  // Import your GraphQL schema definitions
import { resolvers } from './resolvers'; // Import your GraphQL resolvers
import { verifyToken } from '../utils/jwt'; // JWT utility for token verification
import { IncomingMessage } from 'http';

// Initialize Apollo Server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
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

export default apolloServer;
