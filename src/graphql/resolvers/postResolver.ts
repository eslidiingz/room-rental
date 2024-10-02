import prisma from '../../db';

export const postResolvers = {
  Query: {
    getPost: async (_: any, { id }: { id: string }) => {
      return await prisma.post.findUnique({
        where: { id },
        include: { author: true },
      });
    },
    getAllPosts: async () => {
      return await prisma.post.findMany({
        include: { author: true },
      });
    },
  },

  Mutation: {
    // Create a new post and return the post with the author information
    createPost: async (_: any, { title, content, authorId }: { title: string; content?: string; authorId: string }) => {
      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          author: { connect: { id: authorId } }, // Connects the post to an existing author by UUID
        },
        include: {
          author: true, // This will include the author information in the response
        },
      });

      // Ensure createdAt is returned as ISO 8601
      return {
        ...newPost,
        createdAt: newPost.createdAt.toISOString(),  // Convert to ISO 8601 format
      };
    },
  },
};
