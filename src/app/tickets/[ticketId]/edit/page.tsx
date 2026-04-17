import { CardCompact } from "@/src/components/card-compact";
import { getTicket } from "@/src/features/ticket/queries/get-ticket";
import notFound from "../not-found";

type TicketEditPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Edit Ticket"
        description="Edit an existing ticket"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<></>}
      />
    </div>
  );
};

export default TicketEditPage;
