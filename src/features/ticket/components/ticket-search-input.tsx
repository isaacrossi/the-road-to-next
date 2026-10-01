"use client";

import { useQueryState } from "nuqs";
import { SearchInput } from "@/components/search-input";
import { searchParser } from "../search-params";

// define the props of this new component
type TicketSearchInputProps = {
  placeholder: string;
};

const TicketSearchInput = ({ placeholder }: TicketSearchInputProps) => {
  // we copy this over from the previous SearchInput component because this part
  // depends on the ticket feature
  const [search, setSearch] = useQueryState("search", searchParser);

  return (
    <SearchInput
      value={search}
      onChange={setSearch}
      placeholder={placeholder}
    />
  );
};

export { TicketSearchInput };
