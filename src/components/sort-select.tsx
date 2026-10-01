"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type SortSelectOption = {
  sortKey: string;
  sortValue: string;
  label: string;
};

type SortObject = {
  sortKey: string;
  sortValue: string;
};

// define our new props coming from the TicketSortSelect
// we define value as a SortObject which is defined above
// we define onChange as a function that takes a SortObject and returns void
// we define options as an array of SortSelectOption which is defined above
type SortSelectProps = {
  value: SortObject;
  onChange: (sort: SortObject) => void;
  options: SortSelectOption[];
};

// destructure our new props
const SortSelect = ({ value, onChange, options }: SortSelectProps) => {
  // we tell nuqs we are no longer using a primitive data type here by changing to useQueryStates
  // sortParser becomes the first option because sortParser already defines the keys
  // the second value becomes the sort options coming from search-params

  const handleSort = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split("_");

    onChange({ sortKey, sortValue });
  };

  return (
    // defaultValue will be the latest value of sortKey from our url state
    // so we will get the correct sort selected from the start but also retain the latest sort value for future renders
    <Select
      onValueChange={handleSort}
      defaultValue={value.sortKey + "_" + value.sortValue}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          // we also use sortKey for the value because we want to know if its sorted by createdAt or bounty, see options passed in TicketList
          <SelectItem
            key={option.sortKey + option.sortValue}
            value={option.sortKey + "_" + option.sortValue}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { SortSelect };
