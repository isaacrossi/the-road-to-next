import { createSearchParamsCache, parseAsString } from "nuqs/server";

// shallow: will rerender our server components whenever the app router changes
// clear on default: when the value is the default value we want to remove it from the url. If we sort or search we will
// perform a url state update which will be picked up by our page components which recieve the params and can fetch new tickets
export const searchParser = parseAsString.withDefault("").withOptions({
  shallow: false,
  clearOnDefault: true,
});

export const sortParser = {
  sortKey: parseAsString.withDefault("createdAt"),
  sortValue: parseAsString.withDefault("desc"),
};

export const sortOptions = {
  shallow: false,
  clearOnDefault: true,
};

// define caches searchparams with create searchparams cache
export const searchParamsCache = createSearchParamsCache({
  // we pass an empty string as the default value for search and sort
  // if a query is empty we don't have to worry about checking for null and setting an empty string
  // when using the params
  search: searchParser,
  ...sortParser,
});

// .parse() returns a Promise containing the parsed searchParams
// (converting string | string[] | undefined -> string).
// Awaited<...> unwraps that Promise to give us the final resolved type. Specfically TYPE, we
// still must await these ParsedSearchParams in our component files where they are used
export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
