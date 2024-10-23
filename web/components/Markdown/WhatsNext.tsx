import Link from 'next/link';

export default function WhatsNext() {
  return (
    <>
      <h3>Whats next?</h3>
      <p>Check out what else IKONO Icons has to offer.</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <a
          href="https://www.npmjs.com/package/ikono"
          className="flex flex-col gap-1 rounded border border-border-neutral-primary p-4 no-underline hover:border-border-neutral-secondary dark:bg-bg-secondary"
        >
          <span className="tracking-tighter">SVG Library</span>
          <span className="text-sm font-light text-fg-primary-muted">
            A library of SVG icons for use in non-React applications.
          </span>
        </a>
        <Link
          href="https://www.figma.com/community/plugin/1230547475211377845/ikono-icons"
          className="flex flex-col gap-1 rounded border border-border-neutral-primary p-4 no-underline hover:border-border-neutral-secondary dark:bg-bg-secondary"
        >
          <span className="tracking-tighter">Figma plugin</span>
          <span className="text-sm font-light text-fg-primary-muted">
            View IKONO icons directly within Figma.
          </span>
        </Link>
        <Link
          href="/blog"
          className="flex flex-col gap-1 rounded border border-border-neutral-primary p-4 no-underline hover:border-border-neutral-secondary dark:bg-bg-secondary"
        >
          <span className="tracking-tighter">Blog</span>
          <span className="text-sm font-light text-fg-primary-muted">
            Get the latest information about IKONO.
          </span>
        </Link>
      </div>
    </>
  );
}
