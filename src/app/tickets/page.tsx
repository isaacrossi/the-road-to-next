import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CardCompact } from "@/src/components/card-compact";
import { Heading } from "@/src/components/heading";
import { Placeholder } from "@/src/components/placeholder";
import { Spinner } from "@/src/components/spinner";
import { TicketList } from "@/src/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/src/features/ticket/components/ticket-upsert-form";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets in one place" />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created"
        className="w-full max-w-[420px] self-center"
        content={<TicketUpsertForm />}
      />

      <ErrorBoundary fallback={<Placeholder label="Something went wrong!" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TicketsPage;
