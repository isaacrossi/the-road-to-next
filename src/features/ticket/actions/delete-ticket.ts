"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import { ticketsPath } from "@/src/paths";

export const deleteTicket = async (id: string) => {
  await prisma.ticket.delete({ where: { id } });

  revalidatePath(ticketsPath());
  redirect(ticketsPath());
};
