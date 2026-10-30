"use server";

import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

// we only need the offset because the take value will always stay the same
const getComments = async (ticketId: string, offset?: number) => {
  const { user } = await getAuth();

  // provided skip value or 0 if not provided
  const skip = offset ?? 0;
  // we will always fetch 2 comments at a time (usually more in a larger application)
  const take = 2;

  // extract where clause as its used in two places
  const where = {
    ticketId,
  };

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      skip,
      take,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.comment.count({
      where,
    }),
  ]);

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};

export { getComments };
