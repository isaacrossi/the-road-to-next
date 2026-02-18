import Link from "next/link";
import { initialTickets } from "@/src/data";
import { ticketPath } from "@/src/paths";

const TICKET_ICONS = {
  OPEN: "O",
  DONE: "X",
  IN_PROGRESS: ">",
};

const TicketsPage = () => {
  return (
    <div>
      {initialTickets.map((ticket) => (
        <div key={ticket.id}>
          <div>{TICKET_ICONS[ticket.status]}</div>
          <h2 className="text-lg">{ticket.title}</h2>
          <Link href={ticketPath(ticket.id)} className="text-sm underline">
            View{" "}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TicketsPage;
