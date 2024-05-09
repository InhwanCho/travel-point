// DestinationPagination.tsx
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
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#mainSection"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#mainSection"
                isActive={page === currentPage}
                onClick={(e) => {
                  // 현재 페이지를 클릭했을 때 아무런 동작도 하지 않도록 합니다.
                  if (page !== currentPage) {
                    onPageChange(page);
                  } else {
                    e.preventDefault();
                  }
                }}
                // 현재 페이지에 대해 다른 스타일을 적용할 수도 있습니다.
                className={page === currentPage ? 'text-gray-500 cursor-not-allowed' : ''}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#mainSection"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
