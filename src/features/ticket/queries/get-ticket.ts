import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

export const getTicket = async (id: string) => {
  // we can use our utility function to check if the user is the owner of the ticket
  const { user } = await getAuth();

  // we cant append the isOwner flag to the ticket via the findUnique call
  // so we await the ticket and store it
  const ticket = await prisma.ticket.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  // if the ticket doesn't exist, return null
  if (!ticket) {
    return null;
  }

  // if it does, spread the ticket content and append the isOwner flag
  // we pass the currently authorised user as well as the ticket to our utility function
  // and return the result
  return { ...ticket, isOwner: isOwner(user, ticket) };
};
