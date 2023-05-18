import Image from 'next/image';
import Link from 'next/link';
import close from '../assets/icons/close.svg';
import left from '../assets/icons/left.svg';
import right from '../assets/icons/right.svg';

type UserNavigationProps = {
  id: number;
};

export const UserNavigation = ({ id }: UserNavigationProps) => {
  return (
    <div className="flex items-center justify-between w-40">
      <Link href="/users?page=1" className="w-1/3">
        <button>
          <Image
            className="w-full hover:transform hover:scale-110 transition-all duration-300"
            priority
            src={close}
            alt="Back to Users List"
          />
        </button>
      </Link>
      {id > 1 && (
        <Link href={`${id - 1}`} className="w-1/5">
          <Image
            className="w-full hover:transform hover:scale-110 transition-all duration-300"
            priority
            src={left}
            alt="Previous User"
          />
        </Link>
      )}
      {id < 100 && (
        <Link href={`${id + 1}`} className="w-1/5">
          <Image
            className="w-full hover:transform hover:scale-110 transition-all duration-300"
            priority
            src={right}
            alt="Next User"
          />
        </Link>
      )}
    </div>
  );
};
