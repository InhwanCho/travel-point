import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DestinationPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function DestinationPagination({ currentPage, totalPages, onPageChange }: DestinationPaginationProps) {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const showLeftEllipsis = currentPage > 3;
    const showRightEllipsis = currentPage < totalPages - 2;

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }

    return (
      <>
        {showLeftEllipsis && (
          <>
            <PaginationItem>
              <PaginationLink
                href="#mainSection"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <span className="px-3 py-1">...</span>
            </PaginationItem>
          </>
        )}
        {pageNumbers.map(number => (
          <PaginationItem key={number}>
            <PaginationLink
              href="#mainSection"
              isActive={number === currentPage}
              onClick={(e) => {
                e.preventDefault();
                if (number !== currentPage) {
                  onPageChange(number);
                }
              }}
              className={number === currentPage ? 'text-gray-500 cursor-not-allowed' : ''}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        {showRightEllipsis && (
          <>
            <PaginationItem>
              <span className="px-3 py-1">...</span>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#mainSection"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(totalPages);
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
      </>
    );
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#mainSection"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(Math.max(currentPage - 1, 1));
            }}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {renderPageNumbers()}

        <PaginationItem>
          <PaginationNext
            href="#mainSection"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(Math.min(currentPage + 1, totalPages));
            }}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
