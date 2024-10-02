import prisma from '../../db';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/jwt';

export const userResolvers = {
  Query: {
    getUser: async (_: any, { id }: { id: string }, context: any) => {
      if (!context.user) throw new Error('Authentication required');
      return await prisma.user.findUnique({
        where: { id },
        include: { posts: true },
      });
    },
  },

  Mutation: {
    // User signup mutation
    signup: async (_: any, { name, email, password }: { name: string; email: string; password: string }) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const token = generateToken(user.id);

      return {
        token,
        user,
      };
    },

    // User login mutation
    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      const token = generateToken(user.id);

      return {
        token,
        user,
      };
    },
  },
};
