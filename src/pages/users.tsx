import Link from 'next/link';
import { UserData } from '../../types';
import { GetServerSideProps } from 'next';
import { getUsersPerPage } from '@/api';
import { PaginationBar } from '@/components/PaginationBar';
import { SearchBar } from '@/components/SearchBar';
import { UserCard } from '@/components/UserCard';
import { FC } from 'react';

type UserProps = {
  users: UserData[];
  total: number;
  currentPage: number;
};

const PAGE_LIMIT = 10;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const currentPage = Number(query.page) || 1;
  const skip = (currentPage - 1) * PAGE_LIMIT;
  try {
    const response = await getUsersPerPage(PAGE_LIMIT, skip);
    const { total } = response;
    return { props: { users: response.users, currentPage, total } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const Users: FC<UserProps> = ({ users, total, currentPage }) => {
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
      <PaginationBar totalUsers={total} currentPage={currentPage} />
    </div>
  );
};

export default Users;
