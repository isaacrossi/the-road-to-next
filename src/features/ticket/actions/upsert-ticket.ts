"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";
import { toCent } from "@/utils/currency";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is Required"),
  bounty: z.coerce.number().positive(),
});

export const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  try {
    // check if its an update operation by passing the id. (if not an edit operation we wouldn't have an id for the ticket yet)
    if (id) {
      // get the ticket from the db that matches the passed ticket id
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
    }

    // otherwise, continue with our business logic we had in place before
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      deadline: formData.get("deadline"),
      bounty: formData.get("bounty"),
    });

    const dbData = {
      ...data,
      userId: user.id,
      bounty: toCent(data.bounty),
    };

    await prisma.ticket.upsert({
      where: { id: id || "" },
      update: dbData,
      create: dbData,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());

  if (id) {
    await setCookieByKey("toast", "Ticket updated");
    redirect(ticketPath(id));
  }

  return toActionState("SUCCESS", "Ticket created");
};
