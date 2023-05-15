import Image from 'next/image';

type UserCardProps = {
  image: string;
  firstName: string;
  lastName: string;
};

export const UserCard = ({ image, firstName, lastName }: UserCardProps) => {
  return (
    <div className="bg-white flex m-auto flex-col justify-center items-center rounded-full overflow-hidden shadow-md w-80 h-80 hover:shadow-black hover:shadow-lg">
      <div className="w-1/2">
        <Image
          src={image}
          alt="Photo"
          width={150}
          height={150}
          className="w-full hover:transform hover:scale-110 transition-all duration-300"
        />
      </div>
      <h2 className="text-2xl p-4 text-center font-bold mb-2 text-yellow-800">
        {firstName} {lastName}
      </h2>
    </div>
  );
};
