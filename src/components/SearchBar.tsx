import { useDebounceValue } from '@/hooks/useDebounceValue';
import { searchUsersByQuery } from '@/utils/userUtils';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { UserData } from '../../types';
import search from '../assets/icons/search.svg';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<UserData[]>([]);
  const [cache, setCache] = useState<{ [query: string]: UserData[] }>({});

  const debouncedQuery = useDebounceValue(query, 500);

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = event.target.value;
      setQuery(searchValue);
    },
    [],
  );

  const fetchUsers = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const usersByQuery = await searchUsersByQuery(
        debouncedQuery,
        controller.signal,
      );
      if (!controller.signal.aborted) {
        setCache((prevCache) => ({
          ...prevCache,
          [debouncedQuery]: usersByQuery,
        }));
        setUsers(usersByQuery);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      abortControllerRef.current = null;
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (debouncedQuery.trim() !== '') {
      if (cache[debouncedQuery]) {
        setUsers(cache[debouncedQuery]);
      } else {
        fetchUsers();
      }
    } else {
      setUsers([]);
    }
  }, [debouncedQuery, cache, fetchUsers]);

  const handleClick = useCallback(() => {
    setQuery('');
  }, []);

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
          value={query}
          onChange={handleSearch}
          placeholder="search users"
          className="border border-gray-300 p-4 text-base text-slate-700 rounded-lg pl-16 w-full outline-none focus:ring-2 focus:ring-stone-700"
        />
      </div>
      {users ? (
        <div className="absolute top-14 left-0 w-full border border-gray-300 bg-white z-10">
          {users.map((user) => (
            <Link
              onClick={handleClick}
              key={user.id}
              href={`/user/${user.id}`}
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <Image
                  src={user.image}
                  alt="Photo"
                  width={20}
                  height={20}
                  className="w-fit mr-2 rounded-full bg-slate-700"
                />
                <span className="font-medium text-slate-900 text-base">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <span className=" text-lg font-bold text-slate-900">&gt;</span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};
