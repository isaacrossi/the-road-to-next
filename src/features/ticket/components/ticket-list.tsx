import { Placeholder } from "@/components/placeholder";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTickets } from "@/features/ticket/queries/get-tickets";
import { ParsedSearchParams } from "@/features/ticket/search-params";
import { TicketPagination } from "./ticket-pagination";
import { TicketSearchInput } from "./ticket-search-input";
import { TicketSortSelect } from "./ticket-sort-select";

type TicketListProps = {
  userId?: string;
  searchParams: Promise<ParsedSearchParams>;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets(userId, await searchParams);

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <div className="max-w-105 w-full flex gap-x-2">
        <TicketSearchInput placeholder="Search..." />
        <TicketSortSelect
          options={[
            { sortKey: "createdAt", sortValue: "desc", label: "Newest" },
            { sortKey: "createdAt", sortValue: "asc", label: "Oldest" },
            { sortKey: "bounty", sortValue: "desc", label: "Bounty" },
          ]}
        />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found!" />
      )}

      <div className="max-w-105 w-full">
        <TicketPagination />
      </div>
    </div>
  );
};

export { TicketList };
