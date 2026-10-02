import { Button } from "./ui/button";

type PageAndSize = {
  page: number;
  size: number;
};

type PaginationProps = {
  pagination: PageAndSize;
  // onPagination expects a pagination object which again, is page and size
  // Hence we defined PageAndSize above so we could reuse it
  // when Pagination component below updates pagination with new size and page we expect TicketPagination to accept it
  // and call the onPagination function to set the pagination in the url state
  onPagination: (pagination: PageAndSize) => void;
};

const Pagination = ({ pagination, onPagination }: PaginationProps) => {
  // eg: page 0 with size of 2 will give us 0 + 1 which is 1 (Remember, 2 is our default value for size in the paginationParser)
  //     page 1 with size of 2 will give us 2 + 1 which is 3; we are skipping the first 2
  //     tickets since page starts at 0 so if size is 2 and page is 1; we've already seen 2 tickets
  //     on the previous page
  const startOffset = pagination.page * pagination.size + 1;

  // eg: page 0 with size of 2 will give us 1 - 1 + 2 which is 2
  //     page 1 with size of 2 will give us 3 - 1 + 2 which is 4
  //     so if size is 2 and page is 1; we are displaying tickets 3 and 4
  const endOffset = startOffset - 1 + pagination.size;

  // label will tell us which range of tickets we are displaying of how many in total
  const label = `${startOffset}-${endOffset} of X`;

  //
  const handlePreviousPage = () => {
    // we spread the pagination object as we are keeping the default size fixed and
    // only update the page number
    onPagination({ ...pagination, page: pagination.page - 1 });
  };

  const handleNextPage = () => {
    onPagination({ ...pagination, page: pagination.page + 1 });
  };

  const previousButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={pagination.page < 1}
      onClick={handlePreviousPage}
    >
      Previous
    </Button>
  );

  const nextButton = (
    <Button
      variant="outline"
      size="sm"
      // TODO:
      // disabled={false}
      onClick={handleNextPage}
    >
      Next
    </Button>
  );

  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex gap-x-2">
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
};

export { Pagination };
