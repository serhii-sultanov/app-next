import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { UserData } from '../../types';

type TableProps = {
  users: UserData[];
};

type Sorting = {
  column: keyof UserData | 'name' | '';
  order: 'asc' | 'desc' | '';
};

export const UsersTable: FC<TableProps> = ({ users }) => {
  const router = useRouter();
  const { query } = router;
  const [sorting, setSorting] = useState<Sorting>({ column: '', order: '' });

  useEffect(() => {
    const sortBy = query.sortBy as keyof UserData | 'name' | undefined;
    const sortOrder = query.sortOrder as 'asc' | 'desc' | undefined;

    if (sortBy && sortOrder) {
      setSorting({ column: sortBy, order: sortOrder });
    }
  }, [query]);

  const handleColumnClick = (column: keyof UserData | 'name') => {
    let order: 'desc' | 'asc' = 'desc';

    if (column === sorting.column) {
      order = sorting.order === 'desc' ? 'asc' : 'desc';
    }

    setSorting({ column, order });

    router.push({
      pathname: '/table',
      query: { ...query, sortBy: column, sortOrder: order },
    });
  };

  const sortedUsers = users.sort((a, b) => {
    if (sorting.column === 'name') {
      if (sorting.order === 'asc') {
        return a.firstName.localeCompare(b.firstName);
      } else {
        return b.firstName.localeCompare(a.firstName);
      }
    } else {
      const column = sorting.column as keyof UserData;
      if (sorting.order === 'asc') {
        return Number(a[column]) - Number(b[column]);
      } else {
        return Number(b[column]) - Number(a[column]);
      }
    }
  });

  return (
    <table className="table-fixed w-full md:w-3/4 m-auto">
      <thead>
        <tr className="border-b border-b-slate-300 bg-slate-200 text-slate-900 uppercase text-lg">
          <th
            className="py-3 hover:cursor-pointer"
            onClick={() => handleColumnClick('name')}
          >
            Name
          </th>
          <th
            className="py-3 hover:cursor-pointer"
            onClick={() => handleColumnClick('age')}
          >
            Age <span>&#10607;</span>
          </th>
          <th
            className="py-3 hover:cursor-pointer"
            onClick={() => handleColumnClick('weight')}
          >
            Weight <span>&#10607;</span>
          </th>
          <th
            className="py-3 hover:cursor-pointer"
            onClick={() => handleColumnClick('height')}
          >
            Height <span>&#10607;</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr
            key={user.id}
            className="border-b border-b-slate-300 bg-slate-50 text-center"
          >
            <td className="text-base text-slate-900 font-semibold py-3">{`${user.firstName} ${user.lastName}`}</td>
            <td className="text-base text-slate-900 py-3">{user.age}</td>
            <td className="text-base text-slate-900 py-3">{user.weight}</td>
            <td className="text-base text-slate-900 py-3">{user.height}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
