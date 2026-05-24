"use client";

import { format } from "date-fns";
import { LucideChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
};

const DatePicker = ({ id, name, defaultValue }: DatePickerProps) => {
  // We manage the selected date state locally, initializing it with the defaultValue prop if it exists
  // (otherwise defaulting to today)
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date(),
  );

  const [open, setOpen] = useState(false);

  const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpen(false); // Close the popover after selection
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* 
        We replaced a native HTML <input type="date"> (which automatically submitted its value)
        with shadcn's DatePicker (which only renders a trigger <button>).
        Since buttons do not submit form data, this hidden input acts as the bridge
        to send the selected date under the specified 'name' attribute.
      */}
      <input type="hidden" name={name} value={formattedStringDate} />
      <PopoverTrigger id={id} asChild>
        <Button
          type="button"
          variant="outline"
          data-empty={!date}
          className="justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          {/* this format function came with the date picker package form shadcn */}
          {formattedStringDate}
          <LucideChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
