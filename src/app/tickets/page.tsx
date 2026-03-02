import { Suspense } from "react";
import { Heading } from "@/src/components/heading";
import { Spinner } from "@/src/components/spinner";
import { TicketList } from "@/src/features/ticket/components/ticket-list";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets in one place" />
      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
