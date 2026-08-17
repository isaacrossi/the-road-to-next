import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CardCompact } from "@/components/card-compact";
import { Separator } from "@/components/ui/separator";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { homePath, ticketPath } from "@/paths";

type TicketEditPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  // get our currently authenticated user
  const { user } = await getAuth();
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  // we create this variable for readability's sake. It pairs with our isTicketOwner variable nicely
  // Set isTicket found to true if we successfully fetched a ticket by doulbe negating the ticket value
  const isTicketFound = !!ticket;
  // pass our user and the ticket entity to our isOwner function and save that result
  const isTicketOwner = isOwner(user, ticket);

  // if not ticket found and the user is not the owner of that ticket show the not found route
  if (!isTicketFound || !isTicketOwner) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        // the first item in the breadcrumbs array is the link to the home page
        // and the second item is the current page (ticket)
        breadcrumbs={[
          {
            title: "Tickets",
            href: homePath(),
          },
          {
            title: ticket.title,
            href: ticketPath(ticketId),
          },
          {
            title: "Edit",
          },
        ]}
      />

      <Separator />
      <div className="flex-1 flex flex-col justify-center items-center">
        <CardCompact
          title="Edit Ticket"
          description="Edit an existing ticket"
          className="w-full max-w-[420px] animate-fade-in-from-top"
          content={<TicketUpsertForm ticket={ticket} />}
        />
      </div>
    </div>
  );
};

export default TicketEditPage;
