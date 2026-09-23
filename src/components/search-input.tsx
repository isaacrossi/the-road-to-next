"use client";

import { useQueryState } from "nuqs";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { searchParser } from "@/features/ticket/search-params";
import { Input } from "./ui/input";

type SearchInputProps = {
  placeholder: string;
};

const SearchInput = ({ placeholder }: SearchInputProps) => {
  // search state and setter for the search query param used for url state
  // then we provide the key for the url state and the searchParse which knows how to parse the query param
  // but also the default value and options for the query param
  const [search, setSearch] = useQueryState("search", searchParser);

  const handleSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    250,
  );

  return (
    <Input
      defaultValue={search}
      placeholder={placeholder}
      onChange={handleSearch}
    />
  );
};

export { SearchInput };
