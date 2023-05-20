import { getAllUsers, getUserById } from '@/api';
import { SearchBar } from '@/components/SearchBar';
import { UserInfo } from '@/components/UserInfo';
import { UserNavigation } from '@/components/UserNavigation';
import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { UserData } from '../../../types';

type UserDataProps = {
  user: UserData;
  allUsers: UserData[];
};

export const getServerSideProps: GetServerSideProps<UserDataProps> = async ({
  params,
}) => {
  const allUsers = await getAllUsers();
  const { id } = params || {};
  if (!id) {
    return {
      notFound: true,
    };
  }
  const user = await getUserById(+id);
  return { props: { allUsers, user } };
};

const User: FC<UserDataProps> = ({ allUsers, user }) => {
  return (
    <div className="min-h-screen">
      <div className="p-12 flex items-center">
        <UserNavigation id={user.id} />
        <SearchBar allUsers={allUsers} />
      </div>
      <UserInfo data={user} />
    </div>
  );
};

export default User;
