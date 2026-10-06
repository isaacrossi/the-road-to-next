// using a hook
"use client";

import { useQueryState, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";
import { Pagination } from "@/components/pagination";
import {
  paginationOptions,
  paginationParser,
  searchParser,
} from "../search-params";

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

  // we only need the search state value and not the updater function from the hook
  const [search] = useQueryState("search", searchParser);

  // store the previous search value in memory
  const prevSearch = useRef(search);

  useEffect(() => {
    // compare current search against most recent search
    // if no change just return
    if (search === prevSearch.current) return;

    // if search changes set previous search to the current search
    // so that the next time this hook runs we have the right prev search value stored
    prevSearch.current = search;

    // if search changes reset page to 0 and spread over the pagination object
    // to maintain size value
    setPagination({ ...pagination, page: 0 });
  }, [pagination, search, setPagination]);

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
