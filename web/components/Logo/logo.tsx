import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/"
      className="font-display text-xl font-bold text-fg-primary-accent"
    >
      IKONO
    </Link>
  );
}
