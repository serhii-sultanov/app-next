import { getUserByName } from '@/api';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { UserData } from '../../types';
import rightarrow from '../assets/icons/rightarrow.svg';
import search from '../assets/icons/search.svg';

type SearchBarProps = {
  allUsers: UserData[];
};

export const SearchBar = ({ allUsers }: SearchBarProps) => {
  const [value, setValue] = useState('');

  const router = useRouter();

  const filteredUsers = useMemo(() => {
    return value
      ? allUsers.filter((user) =>
          user.firstName.toLowerCase().includes(value.toLowerCase()),
        )
      : [];
  }, [value, allUsers]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSearch = useCallback(
    async (searchTerm: string) => {
      const userByName = await getUserByName(searchTerm);
      router.push(`/user/${userByName.id}`);
      setValue('');
    },
    [getUserByName],
  );

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
        <div className="absolute top-14 left-0 w-full border border-gray-300 bg-white z-10">
          {filteredUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => onSearch(user.firstName)}
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {user.firstName} {user.lastName}
              <Image
                src={rightarrow}
                alt="to User"
                width={50}
                height={50}
                className="w-6"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
