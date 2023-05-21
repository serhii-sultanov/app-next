import { getUserById } from '../../utils/userUtils';
import { SearchBar } from '@/components/SearchBar';
import { UserInfo } from '@/components/UserInfo';
// import { BackToUsersListLink } from '@/components/BackToUsersListLink';
import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { UserData } from '../../../types';

type UserDataProps = {
  user: UserData;
};

export const getServerSideProps: GetServerSideProps<UserDataProps> = async ({
  params,
}) => {
  const { id } = params || {};
  if (!id) {
    return {
      notFound: true,
    };
  }
  const user = await getUserById(+id);
  return { props: { user } };
};

const User: FC<UserDataProps> = ({ user }) => {
  return (
    <div className="min-h-screen">
      <div className="p-12 flex items-center">
        <SearchBar />
      </div>
      {/* <BackToUsersListLink /> */}
      <UserInfo data={user} />
    </div>
  );
};

export default User;
