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
      <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-bg-accent-primary text-xs font-bold text-fg-accent-primary">
        {name.split(' ').map(subName => subName.charAt(0))}
      </div>
      <div className="flex flex-col leading-5">
        <p className="m-0">{name}</p>
        <Link
          href={`https://x.com/${twitter}`}
          className="m-0 tracking-tight text-fg-primary-accent"
        >
          @{twitter}
        </Link>
      </div>
    </div>
  );
}
