interface PaginationProps {
    pagenum: number;
    totalnum: number;
    onPageChange: (page: string) => void;
  }
  
  export const Pagination = ({ pagenum, totalnum, onPageChange }: PaginationProps) => {
    const getPageButton = (page: number) => (
      <button
        key={page}
        className="join-item btn btn-outline text-black text-sm sm:text-base"
        onClick={() => onPageChange(page.toString())}
      >
        {page}
      </button>
    );
  
    const pageButtons = [];
    for (let i = -2; i <= 2; i++) {
      const page = pagenum + i;
      if (page > 0 && page <= totalnum) {
        pageButtons.push(
          page === pagenum ? (
            <button
              key={page}
              className="join-item btn btn-outline text-black text-sm sm:text-base"
              disabled
            >
              {page}
            </button>
          ) : (
            getPageButton(page)
          )
        );
      }
    }
  
    return (
      <div id="pagination" className="flex flex-wrap gap-2 sm:gap-4 justify-center items-center mt-4">
        <button
          hidden={pagenum <= 1}
          className="join-item btn btn-outline text-black text-sm sm:text-base"
          onClick={() => onPageChange("Previous")}
        >
          Previous
        </button>
  
        {pageButtons}
  
        <button
          hidden={pagenum >= totalnum}
          className="join-item btn btn-outline text-black text-sm sm:text-base"
          onClick={() => onPageChange("Next")}
        >
          Next
        </button>
      </div>
    );
  };
  