import { UsersTable } from '@/components/UsersTable';
import { getAllUsers } from '@/utils/userUtils';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { UserData } from '../../types';
import close from '../assets/icons/close.svg';

type TableProps = {
  users: UserData[];
};

export const getServerSideProps: GetServerSideProps<TableProps> = async () => {
  const users = await getAllUsers();
  return {
    props: {
      users,
    },
  };
};

const Table: FC<TableProps> = ({ users }) => {
  return (
    <>
      <div className="w-12 fixed top-12 right-12">
        <Link href="/users?page=1">
          <Image
            className="w-full hover:transform hover:scale-110 transition-all duration-300"
            priority
            src={close}
            alt="Back to Users List"
          />
        </Link>
      </div>
      <UsersTable users={users} />
    </>
  );
};

export default Table;
