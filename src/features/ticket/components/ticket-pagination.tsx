// using a hook
"use client";

import { useQueryStates } from "nuqs";
import { Pagination } from "@/components/pagination";
import { paginationOptions, paginationParser } from "../search-params";

type TicketPaginationProps = {
  paginatedTicketMetaData: {
    count: number;
    hasNextPage: boolean;
  };
};

const TicketPagination = ({
  paginatedTicketMetaData,
}: TicketPaginationProps) => {
  // pagination contains page and size as that is what our paginationParser defines
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );

  // returns our generic pagination component
  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetaData={paginatedTicketMetaData}
    />
  );
};

export { TicketPagination };
