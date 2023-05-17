import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { UserData } from '../../types';
import Link from 'next/link';
import Image from 'next/image';
import { getAllUsers } from '@/api';
import rightarrow from '../assets/icons/rightarrow.svg';
import search from '../assets/icons/search.svg';

type SearchBarProps = {
  allUsers: UserData[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await getAllUsers();
    const  users  = response;
    return { props: { allusers: users } };
  } catch (error) {
    return {
      notFound: true,
    };
  }

}

export const SearchBar = ({allUsers}: SearchBarProps) => {
  const [value, setValue] = useState('');
  // const [users, setUsers] = useState<UserData[]>([]);

  // const getUsers = async () => {
  //   const gettedUsers = await getAllUsers();
  //   setUsers(gettedUsers);
  // };

  // useEffect(() => {
  //   getUsers();
  // }, []);

  const filteredUsers = value
    ? allUsers.filter((user: UserData) => {
        return user.firstName.toLowerCase().includes(value.toLowerCase());
      })
    : [];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setValue(searchValue);
  };

  return (
    <div className="w-1/2 m-auto relative">
      <div className="relative">
        <Image
          src={search}
          alt="search icon"
          width={50}
          height={50}
          className="w-6 absolute left-6 top-1/2 transform -translate-y-1/2"
        />
        <input
          type="text"
          value={value}
          onChange={handleSearch}
          placeholder="search users"
          className="border border-gray-300 p-4 rounded-lg pl-16 w-full outline-none focus:ring-2 focus:ring-stone-700"
        />
      </div>
      {filteredUsers ? (
        <ul className="absolute top-12 left-0 w-full border border-gray-300 bg-white z-10">
          {filteredUsers.map((user: UserData) => (
            <li
              key={user.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
            >
              <Link
                href={`/user/${user.id}`}
                className="w-full flex items-center justify-between"
              >
                {user.firstName} {user.lastName}
                <Image
                  src={rightarrow}
                  alt="to User"
                  width={50}
                  height={50}
                  className="w-6"
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
