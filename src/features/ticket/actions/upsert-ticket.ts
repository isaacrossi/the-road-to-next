"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import { ticketPath, ticketsPath } from "@/src/paths";

export const upsertTicket = async (
  id: string | undefined,
  _actionState: { message: string },
  formData: FormData,
) => {
  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  await prisma.ticket.upsert({
    where: { id: id || "" },
    update: data,
    create: data,
  });

  revalidatePath(ticketsPath());

  if (id) {
    redirect(ticketPath(id));
  }

  return { message: "Ticket created successfully." };
};
