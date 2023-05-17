import Link from 'next/link';
import Image from 'next/image';
import left from '../assets/icons/left.svg';
import right from '../assets/icons/right.svg';

type PaginationBarProps = {
  totalUsers: number;
  currentPage: number;
};

const PAGE_LIMIT = 10;

export const PaginationBar = ({
  totalUsers,
  currentPage,
}: PaginationBarProps) => {
  const totalPages = Math.ceil(totalUsers / PAGE_LIMIT);

  const pageLinks = [];

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  for (let i = 1; i <= totalPages; i++) {
    let link;
    const shownLink = (
      <Link
        key={i}
        href={`/users?page=${i}`}
        className={`p-2 mx-1 text-lg rounded-full hover:bg-neutral-600 ${
          i === currentPage && 'bg-black text-white'
        }`}
      >
        {i}
      </Link>
    );
    const unshownLink = (
      <Link key={i} href={`/users?page=${i}`} className="p-2 mx-1 text-lg">
        .
      </Link>
    );

    switch (true) {
      case i === 1:
      case i === totalPages:
      case i === currentPage:
      case i >= currentPage - 1 && i <= currentPage + 1:
        link = shownLink;
        break;

      default:
        link = unshownLink;
        break;
    }

    pageLinks.push(link);
  }

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
      <ul className="mx-4">
        <li>{pageLinks}</li>
      </ul>
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
