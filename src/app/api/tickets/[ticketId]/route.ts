import { getTicket } from "@/features/ticket/queries/get-ticket";

export async function GET(
  // first param is the request itself. In our case we don't need any info from this object
  _request: Request,
  // destructure params from the context object that Next.js creates and passes to your
  // API route function and type params as params: { ticketId: string }
  { params }: { params: Promise<{ ticketId: string }> },
) {
  // get the ticket from the database using our previously defined getTicket function
  // and passing the id from the params. The params object is a Promise so we need to await it.

  // destructure ticketId from params and await params
  // ticketId comes from the dynamic segment in our folder name
  const { ticketId } = await params;

  // pass ticketId to our getTicket function and return the result as JSON
  const ticket = await getTicket(ticketId);

  return Response.json(ticket);
}
