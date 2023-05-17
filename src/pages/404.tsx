import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/users?page=1');
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/users?page=1"
        className=" text-zinc-300 py-8 px-4 bg-gray-800 rounded-lg hover:underline"
      >
        Back to Users Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
