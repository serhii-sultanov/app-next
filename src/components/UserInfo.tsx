import Image from 'next/image';
import { FC } from 'react';
import { UserData } from '../../types';

type UserInfoProps = {
  data: UserData;
};
export const UserInfo: FC<UserInfoProps> = ({ data }) => {
  return (
    <div className="bg-white flex m-auto justify-center items-center rounded-full overflow-hidden shadow-md w-1/2">
      <div className="w-1/2">
        <Image
          src={data.image}
          alt="Photo"
          width={500}
          height={500}
          className="w-full"
        />
      </div>
      <div>
        <p className=" text-4xl p-4 text-center font-bold mb-2 text-yellow-800">
          {data.firstName}
        </p>
        <p className=" text-4xl p-4 text-center font-bold mb-2 text-yellow-800">
          {data.lastName}
        </p>
        <p className="text-gray-600 text-lg italic">
          {data.address?.address}, {data.address?.city},{' '}
          {data.address?.postalCode}, {data.address?.state}
        </p>
      </div>
    </div>
  );
};
