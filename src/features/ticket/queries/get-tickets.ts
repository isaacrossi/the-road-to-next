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
      mode: "insensitive" as const,
    },
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;

  // we want to return our list of tickets and the total count of tickets
  // so, we save tickets as a constant
  const tickets = await prisma.ticket.findMany({
    where,
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

  // retrieve the count from the db using prismas count method and save as a constant
  // we pass the same where object defined above to prisma to retrieve the count
  // it is important its the same where object, so that for instance when we search by
  // title we get the count of those specific tickets. eg: searching for 1 will not return
  // the count of all tickets but only the count for tickets with 1 in the title
  const count = await prisma.ticket.count({ where });

  // return the tickets and count in an object
  // because this pagination pattern will be repeated across other features we want a common naming convention
  // instead of returning just tickets we return them in a list property as well as count in a
  // metadata property (which is another object) that also contains hasNextPage boolean flag
  return {
    // list is descriptive but generic keeing the property name the only thing tied to a feature
    list: tickets,
    metadata: {
      count,
      // refer to skip take visual if confused how this works
      hasNextPage: count > skip + take,
    },
  };
};
