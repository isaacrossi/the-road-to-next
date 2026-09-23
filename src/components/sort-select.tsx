"use client";
import { useQueryStates } from "nuqs";
import { sortOptions, sortParser } from "@/features/ticket/search-params";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Option = {
  sortKey: string;
  sortValue: string;
  label: string;
};

type SortSelectProps = {
  options: Option[];
};

const SortSelect = ({ options }: SortSelectProps) => {
  // we tell nuqs we are no longer using a primitive data type here by changing to useQueryStates
  // sortParser becomes the first option because sortParser already defines the keys
  // the second value becomes the sort options coming from search-params
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  const handleSort = (sortKey: string) => {
    // we hardcoded the sort value in the options prop when calling this component in TicketList
    // we can find the sort value by looking for the option with the same sortKey
    const sortValue = options.find(
      (option) => option.sortKey === sortKey,
    )?.sortValue;

    setSort({ sortKey, sortValue });
  };

  return (
    // defaultValue will be the latest value of sortKey from our url state
    // so we will get the correct sort selected from the start but also retain the latest sort value for future renders
    <Select onValueChange={handleSort} defaultValue={sort.sortKey}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          // we also use sortKey for the value because we want to know if its sorted by createdAt or bounty, see options passed in TicketList
          <SelectItem key={option.sortKey} value={option.sortKey}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { SortSelect };
