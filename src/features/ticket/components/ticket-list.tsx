import { SearchInput } from "@/components/search-input";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTickets } from "@/features/ticket/queries/get-tickets";

type TicketListProps = {
  userId?: string;
};

const TicketList = async ({ userId }: TicketListProps) => {
  const tickets = await getTickets(userId);

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <div className="max-w-[420px] w-full">
        <SearchInput placeholder="Search tickets..." />
      </div>
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export { TicketList };
