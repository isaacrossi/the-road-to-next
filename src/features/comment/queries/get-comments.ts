import { prisma } from "@/lib/prisma";

const getComments = async (ticketId: string) => {
  const comments = await prisma.comment.findMany({
    where: {
      ticketId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  return { list: comments };
};

export { getComments };
