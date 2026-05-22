import { prisma } from "@/lib/prisma";

export const getTicket = async (id: string) => {
  console.log("getTicket", id);

  return await prisma.ticket.findUnique({
    where: {
      id,
    },
  });
};
