"use client";

import { useQueryStates } from "nuqs";
import { SortSelect, SortSelectOption } from "@/components/sort-select";
import { sortOptions, sortParser } from "@/features/ticket/search-params";

type TicketSortSelectProps = {
  options: SortSelectOption[];
};

// destructure options which is SortSelectOption imported from SortSelect
const TicketSortSelect = ({ options }: TicketSortSelectProps) => {
  // We take this line from SortSelect as this is the only part that relies on the Ticket feature
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  // we need to pass these values to the child component SortSelect
  return <SortSelect options={options} value={sort} onChange={setSort} />;
};

export { TicketSortSelect };
