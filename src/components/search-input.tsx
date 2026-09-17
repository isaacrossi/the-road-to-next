"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";

type SearchInputProps = {
  placeholder: string;
};

const SearchInput = ({ placeholder }: SearchInputProps) => {
  // allows you to get the url query params
  const searchParams = useSearchParams();
  // allows you to get the url path
  const pathname = usePathname();
  // allows you to replace/modify the url
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      // create a new URLSearchParams object with the current search params
      const params = new URLSearchParams(searchParams);

      // if we have a search value set it as a search param else remove the search param
      // search is the key and value is coming from the input field
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      // eg if current url is /tickets and user searches 3 we will get /tickets?search=3
      // if user searches again and value is 3 we will get /tickets (removes search param)
      // if user searches again and value is 33 we will get /tickets?search=33
      // this is used to update the url without reloading the page
      // params is only a url search params instance but when we use to string() it becomes a string
      // the replace method is used to replace the current url with the new url
      replace(`${pathname}?${params.toString()}`, {
        // users stays on current scroll position
        scroll: false,
      });
    },
    250,
  );

  return <Input placeholder={placeholder} onChange={handleSearch} />;
};

export { SearchInput };
