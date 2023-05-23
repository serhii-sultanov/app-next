import Link from 'next/link';
import { FC } from 'react';
import { PaginationProps } from '../../types';
import { usePagination } from '../hooks/usePagination';

export const dotts = '...';

export const PageLinks: FC<PaginationProps> = ({ totalPages, currentPage }) => {
  const pages = usePagination(totalPages, currentPage);

  return (
    <div className="flex items-center justify-center my-8">
      {pages.map((pageNumber, i) =>
        pageNumber === dotts ? (
          <span
            key={i}
            className="px-4 py-2 rounded-full text-sm font-semibold text-black"
          >
            {pageNumber}
          </span>
        ) : (
          <Link
            key={i}
            href={`/users?page=${pageNumber}`}
            className={`p-2 mx-1 text-lg rounded-full hover:bg-neutral-600 ${
              pageNumber === currentPage ? 'bg-black text-white' : ''
            }`}
          >
            {pageNumber}
          </Link>
        ),
      )}
    </div>
  );
};
