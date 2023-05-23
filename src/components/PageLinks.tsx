import Link from 'next/link';
import { FC } from 'react';
import { getPagination } from '../utils/paginationUtils';

type PageLinksProps = {
  totalPages: number;
  currentPage: number;
};

export const dotts = '...';

export const PageLinks: FC<PageLinksProps> = ({ totalPages, currentPage }) => {
  const pages = getPagination(totalPages, currentPage);

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
