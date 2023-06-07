import { getAllUsers } from '@/utils/userUtils';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { UserData } from '../../types';

type UserDataKey = keyof UserData | 'name';
type SortOrder = 'asc' | 'desc' | '';

type TableProps = {
  users: UserData[];
  sorting: {
    column: UserDataKey | '';
    order: SortOrder;
  };
};

export const getServerSideProps: GetServerSideProps<TableProps> = async (
  context,
) => {
  const sortBy = context.query.sortBy as UserDataKey | undefined;
  const sortOrder = context.query.sortOrder as SortOrder | undefined;

  let users = await getAllUsers();

  if (sortBy && sortOrder) {
    users = users.sort((a, b) => {
      if (sortBy === 'name') {
        if (sortOrder === 'asc') {
          return a.firstName.localeCompare(b.firstName);
        } else {
          return b.firstName.localeCompare(a.firstName);
        }
      } else {
        const column = sortBy as keyof UserData;
        if (sortOrder === 'asc') {
          return (a[column] as number) - (b[column] as number);
        } else {
          return (b[column] as number) - (a[column] as number);
        }
      }
    });
  }

  return {
    props: {
      users,
      sorting: {
        column: sortBy || '',
        order: sortOrder || '',
      },
    },
  };
};

const Table: FC<TableProps> = ({ users, sorting }) => {
  const columns: UserDataKey[] = ['name', 'age', 'weight', 'height'];

  const router = useRouter();

  const handleColumnClick = (column: keyof UserData | 'name') => () => {
    const order = sorting.order === 'asc' ? 'desc' : 'asc';
    router.push({
      pathname: '/table',
      query: { sortBy: column, sortOrder: order },
    });
  };

  return (
    <table className="table-fixed w-full md:w-3/4 m-auto">
      <thead>
        <tr className="border-b border-b-slate-300 bg-slate-200 text-slate-900 uppercase text-lg">
          {columns.map((column) => (
            <th
              key={column}
              className="py-3 hover:cursor-pointer"
              onClick={handleColumnClick(column)}
            >
              {column} <span>&#10607;</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
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

export default Table;
