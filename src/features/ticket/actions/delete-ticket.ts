"use server";

import { prisma } from "@/src/lib/prisma";

export const deleteTicket = async (id: string) => {
  await prisma.ticket.delete({ where: { id } });
};
