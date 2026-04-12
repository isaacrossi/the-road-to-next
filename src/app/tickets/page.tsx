import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Heading } from "@/src/components/heading";
import { Placeholder } from "@/src/components/placeholder";
import { Spinner } from "@/src/components/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { TicketList } from "@/src/features/ticket/components/ticket-list";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets in one place" />

      <Card className="w-full max-w-[420px] self-center">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription>A new ticket will be created</CardDescription>
        </CardHeader>
        <CardContent>TicketCreateForm</CardContent>
      </Card>

      <ErrorBoundary fallback={<Placeholder label="Something went wrong!" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TicketsPage;
