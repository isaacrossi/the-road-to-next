import { getTickets } from "@/features/ticket/queries/get-tickets";

export async function GET() {
  // getTickets expects a user id, but we pass undefined to get all tickets
  // and also the expected search params (hard coded for now)
  // we also destructure list and metadata so its more descriptive rather than just result
  const { list, metadata } = await getTickets(undefined, {
    search: "",
    sortKey: "createdAt",
    sortValue: "desc",
    page: 0,
    size: 5,
  });

  return Response.json({ list, metadata });
}
