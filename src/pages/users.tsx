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
      <div className="grid grid-cols-5 gap-x-4 gap-y-8 p-12">
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
