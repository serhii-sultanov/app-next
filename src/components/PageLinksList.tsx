import { useMemo } from 'react';
import Link from 'next/link';

type PageLinksProps = {
  totalPages: number;
  currentPage: number;
};

export const PageLinksList = ({ totalPages, currentPage }: PageLinksProps) => {
  const pageLinks = useMemo(() => {
    const links = Array(totalPages)
      .fill(null)
      .map((_, index) => {
        const pageNumber = index + 1;
        const shownLink = (
          <Link
            key={pageNumber}
            href={`/users?page=${pageNumber}`}
            className={`p-2 mx-1 text-lg rounded-full hover:bg-neutral-600 ${
              pageNumber === currentPage ? 'bg-black text-white' : ''
            }`}
          >
            {pageNumber}
          </Link>
        );
        const unshownLink = (
          <Link key={pageNumber} href={`/users?page=${pageNumber}`}>
            .
          </Link>
        );

        switch (true) {
          case pageNumber === 1:
          case pageNumber === totalPages:
          case pageNumber === currentPage:
          case pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1:
            return shownLink;
          default:
            return unshownLink;
        }
      });

    return links;
  }, [totalPages, currentPage]);

  return (
    <ul className="mx-4">
      <li>{pageLinks}</li>
    </ul>
  );
};
