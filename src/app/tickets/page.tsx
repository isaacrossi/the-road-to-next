"use client";

import { useEffect, useState } from "react";
import { Heading } from "@/src/components/heading";
import { TicketItem } from "@/src/features/ticket/components/ticket-item";
import { getTickets } from "@/src/features/ticket/queries/get-tickets";
import { Ticket } from "@/src/features/ticket/types";

const TicketsPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  //without react-query, we would have to do something like this to fetch the tickets on the client side
  useEffect(() => {
    const fetchTickets = async () => {
      const result = await getTickets();
      setTickets(result);
    };
    fetchTickets();
  }, []); //the empty dependency array means this effect will only run once when the component mounts

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets in one place" />
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
