import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/"
      className="font-display text-xl font-bold text-blue-600 dark:text-blue-400"
    >
      IKONO
    </Link>
  );
}
