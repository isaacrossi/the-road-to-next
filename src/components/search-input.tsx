"use client";

import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";

// defines the new props of this component coming from the parent
type SearchInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

// destructure value and on change now as well as placeholder like before
const SearchInput = ({ placeholder, value, onChange }: SearchInputProps) => {
  // onChange is our setSearch in the parent component (TicketSearchInput)
  const handleSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    250,
  );

  // value is our search in the parent component (TicketSearchInput)
  return (
    <Input
      defaultValue={value}
      placeholder={placeholder}
      onChange={handleSearch}
    />
  );
};

export { SearchInput };
