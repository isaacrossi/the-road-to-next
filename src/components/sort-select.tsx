"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Option = {
  label: string;
  value: string;
};

type SortSelectProps = {
  defaultValue: string;
  options: Option[];
};

const SortSelect = ({ defaultValue, options }: SortSelectProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // onValueChange passes the selected option's value string directly to our handleSort function (shadcn ui),
  // so we type the 'value' parameter as string rather than an event object (see search-input.tsx for the difference).
  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);

    // we only update the search params if the value is not the default value
    if (value === defaultValue) {
      params.delete("sort");
    } else if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Select
      onValueChange={handleSort}
      // if we have a sort value in the url set the default value to that value else set it to the default value passed in
      // This prevents the select from resetting to the default value when the page is re-rendered
      defaultValue={searchParams.get("sort")?.toString() || defaultValue}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { SortSelect };
