"use server";

import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

// server actions are always async
// it takes an id which we just call id because we are aware we are dealing with a ticket here because its in the action name
// it also takes a status which is a ticket status coming from our prisma client
export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  // get authenticated user, if not redirect to sign up page
  const { user } = await getAuthOrRedirect();

  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id,
      },
    });

    // if no ticket match or the user isn't the owner of the ticket, return an error state
    if (!ticket || !isOwner(user, ticket)) {
      return toActionState(
        "ERROR",
        "Ticket not found or you are not the owner",
      );
    }

    await prisma.ticket.update({
      where: {
        id,
      },

      data: {
        status,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  // revalidate the path so our cache gets updated
  revalidatePath(ticketsPath());

  // return the happy path
  return toActionState("SUCCESS", "Ticket status updated successfully");
};
