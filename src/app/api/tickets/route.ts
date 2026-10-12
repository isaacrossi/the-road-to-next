import { getTickets } from "@/features/ticket/queries/get-tickets";
import { searchParamsCache } from "@/features/ticket/search-params";

export async function GET(request: Request) {
  // we pass request.url to this URL class constructor and destructure the
  // searchParams property from the url obj.
  // Note: this is not a standard js object!
  const { searchParams } = new URL(request.url);

  // We need to convert it to a standard js object to use it with
  // our getTickets function, we do this using Object.fromEntries
  const untypedSearchParams = Object.fromEntries(searchParams);

  // we can then get our types search params by parsing the untyped search params
  // with our searchParamsCache.parse method. This will also validate the
  // search params against the searchParamsSchema
  // typedSearch params automatically typed from our searchParamsCache.parse methods
  // return { search: "", sortKey: "createdAt", sortValue: "desc", page: 0, size: 5 }
  const typedSearchParams = searchParamsCache.parse(untypedSearchParams);

  // curl -X GET "http://localhost:3000/api/tickets?search=tickety&size=5&page=0&sortKey=createdAt&sortValue=desc"
  // will log the properly typed search params and if we omit any params it will log the defaults from nuqs
  console.log(typedSearchParams);

  // if we look in our getTickets function we can see it expects the parsed search params
  // so we get no complaints from ts
  const { list, metadata } = await getTickets(undefined, typedSearchParams);

  return Response.json({ list, metadata });
}
