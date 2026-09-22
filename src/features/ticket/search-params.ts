import { createSearchParamsCache, parseAsString } from "nuqs/server";

// define caches searchparams with create searchparams cache
export const searchParamsCache = createSearchParamsCache({
  // we pass an empty string as the default value for search and sort
  // if a query is empty we don't have to worry about checking for null and setting an empty string
  // when using the params
  search: parseAsString.withDefault(""),
  sort: parseAsString.withDefault("newest"),
});

// .parse() returns a Promise containing the parsed searchParams
// (converting string | string[] | undefined -> string).
// Awaited<...> unwraps that Promise to give us the final resolved type. Specfically TYPE, we
// still must await these ParsedSearchParams in our component files where they are used
export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
