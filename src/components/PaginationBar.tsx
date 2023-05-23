import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import left from '../assets/icons/left.svg';
import right from '../assets/icons/right.svg';
import { PageLinks } from './PageLinks';

type PaginationBarProps = {
  totalPages: number;
  currentPage: number;
};

export const PaginationBar: FC<PaginationBarProps> = ({
  totalPages,
  currentPage,
}) => {
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  return (
    <div className="flex justify-center items-center space-x-2">
      {currentPage > 1 ? (
        <Link href={`/users?page=${prevPage}`} className="w-12">
          <Image
            className="w-full hover:transform hover:scale-110 transition-all duration-200"
            priority
            src={left}
            alt="Previous Page"
          />
        </Link>
      ) : null}

      <PageLinks totalPages={totalPages} currentPage={currentPage} />

      {currentPage < totalPages ? (
        <Link href={`/users?page=${nextPage}`} className="w-12">
          <Image
            className="w-full hover:transform hover:scale-110 transition-all duration-200"
            priority
            src={right}
            alt="Next User"
          />
        </Link>
      ) : null}
    </div>
  );
};
