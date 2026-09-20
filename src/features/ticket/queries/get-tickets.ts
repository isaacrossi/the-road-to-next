import { prisma } from "@/lib/prisma";
import { SearchParams } from "../search-params";

export const getTickets = async (
  userId: string | undefined,
  searchParams: SearchParams,
) => {
  console.log(searchParams.sort);

  return await prisma.ticket.findMany({
    where: {
      userId,
      title: {
        ...(typeof searchParams.search === "string" && {
          contains: searchParams.search,
          mode: "insensitive",
        }),
      },
    },
    // we conditionally destructure our configuration objects and pass the resulting object to the orderBy configuration
    orderBy: {
      ...(searchParams.sort === undefined && { createdAt: "desc" }),
      ...(searchParams.sort === "bounty" && { bounty: "desc" }),
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};
