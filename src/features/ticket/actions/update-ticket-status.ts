"use server";

import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

// server actions are always async
// it takes an id which we just call id because we are aware we are dealing with a ticket here because its in the action name
// it also takes a status which is a ticket status coming from our prisma client
export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  try {
    await prisma.ticket.update({
      // the where clause identifies which ticket we want to update
      where: {
        id,
      },
      // the data clause says what we want to update about that ticket, we're simply updating the status
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
