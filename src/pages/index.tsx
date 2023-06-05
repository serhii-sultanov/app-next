import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Link
        href="/users?page=1"
        className="p-16 bg-stone-800 text-slate-100 rounded-full hover:text-stone-800 hover:bg-slate-100 duration-1000"
      >
        Users Page
      </Link>
      <Link
        href="/table"
        className="p-16 bg-stone-800 text-slate-100 rounded-full hover:text-stone-800 hover:bg-slate-100 duration-1000"
      >
        Users Table
      </Link>
    </main>
  );
}
