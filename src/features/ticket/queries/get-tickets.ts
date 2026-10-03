import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../search-params";

export const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams,
) => {
  const where = {
    userId,
    title: {
      contains: searchParams.search,
      // as const infers the type for the 'mode' property to be strictly 'insensitive'
      // This fixes the TypeScript error Type 'string' is not assignable to type 'QueryMode | undefined'
      // because string is broader than "default" | "insensitive" (for example, "hello" is a string but
      // not a valid QueryMode), TypeScript rejects string with error
      mode: "insensitive" as const,
    },
  };

  // skip is the result of take times page starting at an index of 0
  const skip = searchParams.page * searchParams.size;

  // you would always take the amount of items as defined in search params size
  const take = searchParams.size;

  return await prisma.ticket.findMany({
    where,
    // prisma has a concept of skip and take
    // take is how many tickets should be retrieved from the db
    // skip is how many tickets should be skipped from the db before retrieving the tickets
    // this is used for pagination
    skip,
    take,
    orderBy: {
      [searchParams.sortKey]: searchParams.sortValue,
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
