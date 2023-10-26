import Head from "next/head";
import Link from "next/link";

interface NavbarProps {
  active: "Example UI" | "Icons";
}

export default function Navbar({ active }: NavbarProps) {
  return (
    <>
      <Head>
        <title>IKONO</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="og:url" content="https://ikono.will-kelly.co.uk" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="IKONO" />
        <meta
          property="og:description"
          content="Free SVG icon pack with MIT license."
        />
        <meta property="og:title" content="IKONO" />
        <meta
          property="og:image"
          content="https://ikono.will-kelly.co.uk/banner.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@WillKelly__" />
        <meta name="twitter:title" content="IKONO" />
        <meta name="twitter:text:title" content="IKONO" />
        <meta
          name="twitter:description"
          content="Free SVG icon pack with MIT license"
        />
        <meta name="twitter:app:name:iphone" content="IKONO" />
        <meta name="twitter:app:name:ipad" content="IKONO" />
        <meta name="twitter:app:name:googleplay" content="IKONO" />
        <meta
          name="twitter:image"
          content="https://ikono.will-kelly.co.uk/banner.png"
        />

        <link
          rel="apple-touch-icon"
          href="/app_icons/apple-touch-icon-180x180.png"
          sizes="180x180"
        />
      </Head>
      <Link
        href="https://www.buymeacoffee.com/willk"
        className="flex items-center justify-between visible w-full gap-1 px-5 py-2 font-sans text-sm font-semibold tracking-tighter bg-yellow-400 shadow-sm sm:hidden shrink-0"
      >
        <div className="flex items-center">
          <svg
            height="24"
            width="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.429 7H4v6.6C4 16.35 6.856 18 9.714 18c2.858 0 5.715-1.65 5.715-4.4v-1.1m0-5.5C17.714 7 20 7.724 20 9.75s-1.143 3.3-4.571 2.75m0-5.5v5.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          Buy me a coffee
        </div>
        <svg
          height="24"
          width="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m12.5 18.5 5.646-5.646a.5.5 0 0 0 0-.708L12.5 6.5m6 6h-13"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </Link>

      <header className="flex items-center justify-between px-5 pt-10 sm:px-16 sm:pt-14">
        <Link href="/" className="text-xl font-bold text-blue-600 font-display">
          IKONO
        </Link>
        <nav className="flex flex-wrap items-center justify-end font-sans text-sm font-semibold tracking-tighter gap-x-10 gap-y-2">
          <Link
            href="https://www.buymeacoffee.com/willk"
            className="items-center hidden gap-1 px-5 py-1 bg-yellow-400 rounded-lg sm:flex shrink-0"
          >
            <svg
              height="24"
              width="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.429 7H4v6.6C4 16.35 6.856 18 9.714 18c2.858 0 5.715-1.65 5.715-4.4v-1.1m0-5.5C17.714 7 20 7.724 20 9.75s-1.143 3.3-4.571 2.75m0-5.5v5.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            Buy me a coffee
          </Link>
          <Link
            href="/"
            className={`${
              active === "Icons"
                ? "text-blue-600"
                : "transition-all hover:text-blue-600"
            }`}
          >
            Icons
          </Link>
          <Link
            href="/ui"
            className={`${
              active === "Example UI"
                ? "text-blue-600"
                : "transition-all hover:text-blue-600"
            }`}
          >
            Example UI
          </Link>
          <Link
            href="https://github.com/wkelly1/IKONO"
            className="transition-all hover:text-blue-600 "
          >
            React
          </Link>
        </nav>
      </header>
      <div className="px-5 mt-10 sm:px-16 ">
        <div className="flex flex-col justify-between px-10 py-6 bg-blue-600 h-60">
          <div></div>
          <div>
            <p className="text-3xl font-bold text-white">
              ICONS ARE EASIER THAN WORDS
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
