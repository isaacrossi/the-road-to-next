import { prisma } from "@/src/lib/prisma";

export const getTicket = async (id: string) => {
  return await prisma.ticket.findUnique({
    where: {
      id,
    },
  });
};
