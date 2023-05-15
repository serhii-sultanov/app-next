import { UserData } from '../../../types';
import { GetServerSideProps } from 'next';
import { getUserById } from '@/api';
import { SearchBar } from '@/components/SearchBar';
import { UserNavigation } from '@/components/UserNavigation';
import { UserInfo } from '@/components/UserInfo';



type UserDataProps = {
  user: UserData;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params || {};
  if (!id) {
    return {
      notFound: true,
    };
  }
  const user = await getUserById(+id);
  return { props: { user } };
};

const User = ({ user }: UserDataProps) => {
  return (
    <div className="min-h-screen">
      <div className="p-12 flex items-center">
        <UserNavigation id={user.id} />
        <SearchBar />
      </div>
      <UserInfo data={user} />
    </div>
  );
};

export default User;
