import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { generatePageNumbers, renderPageNumbers } from "@/components/common/pagination";

interface DestinationPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  createPageUrl: (pageNumber: number | string) => string;
}

export default function DestinationPagination({ currentPage, totalPages, onPageChange, createPageUrl }: DestinationPaginationProps) {
  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  return (
    <Pagination className="flex justify-center mt-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageUrl(`${Math.max(currentPage - 1, 1)}`)}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(Math.max(currentPage - 1, 1));
            }}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {/* 페이지 렌더링 UI */}
        {renderPageNumbers({ pageNumbers, currentPage, totalPages, onPageChange, createPageUrl })}

        <PaginationItem>
          <PaginationNext
            href={createPageUrl(Math.min(currentPage + 1, totalPages))}
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
