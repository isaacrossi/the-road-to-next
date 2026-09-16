import { Placeholder } from "@/components/placeholder";
import { SearchInput } from "@/components/search-input";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTickets } from "@/features/ticket/queries/get-tickets";
import { SearchParams } from "@/features/ticket/search-params";

type TicketListProps = {
  userId?: string;
  searchParams: Promise<SearchParams>;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets(userId, await searchParams);

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <div className="max-w-[420px] w-full">
        <SearchInput placeholder="Search tickets..." />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found!" />
      )}
    </div>
  );
};

export { TicketList };
