import Link from "next/link";
import { Placeholder } from "@/src/components/placeholder";
import { Button } from "@/src/components/ui/button";
import { ticketsPath } from "@/src/paths";

export default function NotFound() {
  return (
    <Placeholder
      label="Ticket not found"
      button={
        <Button asChild variant="outline">
          <Link href={ticketsPath()}>Go to Tickets</Link>
        </Button>
      }
    />
  );
}
