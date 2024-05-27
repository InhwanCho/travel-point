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
}

export default function DestinationPagination({ currentPage, totalPages, onPageChange }: DestinationPaginationProps) {
  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  return (
    
    <Pagination className="flex justify-center mt-5">
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

        {/* 페이지 렌더링 ui */}
        {renderPageNumbers(pageNumbers, currentPage, totalPages, onPageChange)}

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


