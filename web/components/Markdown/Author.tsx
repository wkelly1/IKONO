import Link from 'next/link';
import { twJoin } from 'tailwind-merge';

interface AuthorProps {
  name: string;
  twitter: string;
  className?: string;
}

export default function Author({ name, twitter, className }: AuthorProps) {
  return (
    <div className={twJoin(className, 'flex items-center gap-2')}>
      <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-blue-600 text-white">
        {name.split(' ').map(subName => subName.charAt(0))}
      </div>
      <div className="flex flex-col leading-5">
        <p className="m-0">{name}</p>
        <Link
          href={`https://x.com/${twitter}`}
          className="m-0 tracking-tight text-blue-600 dark:text-blue-400"
        >
          @{twitter}
        </Link>
      </div>
    </div>
  );
}
