import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { generatePageNumbers, renderPageNumbers } from "@/components/common/pagination";

interface DestinationPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  createPageUrl?: (pageNumber: number | string) => string;
}

export default function DestinationPagination({ currentPage, totalPages, onPageChange, createPageUrl }: DestinationPaginationProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  if (totalPages < 1) return null;

  const handlePageChange = (page: number) => {
    if (!isDisabled) {
      setIsDisabled(true);
      onPageChange(page);
      setTimeout(() => {
        setIsDisabled(false);
      }, 800); // 무한 클릭 방지
    }
  };

  return (
    <Pagination className="flex justify-center mt-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageUrl ? createPageUrl(`${Math.max(currentPage - 1, 1)}`) : '#mainSection'}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(Math.max(currentPage - 1, 1));
            }}
            disabled={currentPage === 1 || isDisabled}
            aria-disabled={currentPage === 1 || isDisabled}
          />
        </PaginationItem>

        {/* 페이지 렌더링 UI */}
        {renderPageNumbers({ pageNumbers, currentPage, totalPages, onPageChange: handlePageChange, createPageUrl, isDisabled })}

        <PaginationItem>
          <PaginationNext
            className='sm:mx-0 ml-7 mr-3'
            href={createPageUrl ? createPageUrl(`${Math.min(currentPage + 1, totalPages)}`) : '#mainSection'}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(Math.min(currentPage + 1, totalPages));
            }}
            disabled={currentPage === totalPages || isDisabled}
            aria-disabled={currentPage === totalPages || isDisabled}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
