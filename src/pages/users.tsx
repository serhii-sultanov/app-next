import { getUsersPerPage } from '../utils/userUtils';
import { PaginationBar } from '@/components/PaginationBar';
import { SearchBar } from '@/components/SearchBar';
import { UserCard } from '@/components/UserCard';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { UserData } from '../../types';

type UserProps = {
  users: UserData[];
  currentPage: number;
};

const PAGE_LIMIT = 10;

export const getServerSideProps: GetServerSideProps<UserProps> = async ({
  query,
}) => {
  const currentPage = Number(query.page) || 1;
  const skip = (currentPage - 1) * PAGE_LIMIT;

  try {
    const response = await getUsersPerPage(PAGE_LIMIT, skip);

    return {
      props: {
        users: response.users,
        currentPage,
      },
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      notFound: true,
    };
  }
};

const Users: FC<UserProps> = ({ users, currentPage }) => {
  return (
    <div className="min-h-screen p-12">
      <SearchBar />
      <Link
        href="/table"
        className="absolute right-32 top-10 p-4 underline rounded-full text-stone-800 hover:bg-slate-100 duration-1000"
      >
        Users Table
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-4 gap-y-8 p-12">
        {users.map((user) => (
          <Link key={user.id} href={`user/${user.id}`} className="rounded-full">
            <UserCard
              firstName={user.firstName}
              lastName={user.lastName}
              image={user.image}
            />
          </Link>
        ))}
      </div>
      <PaginationBar totalPages={10} currentPage={currentPage} />
    </div>
  );
};

export default Users;
