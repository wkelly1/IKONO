import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";
import Popup from "../../components/Popup";
import { useState } from "react";
import ui1 from "../../public/images/ui/ui1.png";
import ui2 from "../../public/images/ui/ui2.png";
import ui3 from "../../public/images/ui/ui3.png";
import ui4 from "../../public/images/ui/ui4.png";
import ui5 from "../../public/images/ui/ui5.png";
import ui6 from "../../public/images/ui/ui6.png";
import ui7 from "../../public/images/ui/ui7.png";
import ui8 from "../../public/images/ui/ui8.png";

function UIImage({ src, date, title }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col ">
      <Popup
        header={
          <div className="flex flex-col ">
            <p className="leading-tight">{title}</p>
            <p className="text-xs font-medium leading-tight text-gray-500">
              {date}
            </p>
          </div>
        }
        show={open}
        close={() => setOpen(false)}
      >
        <div className="w-[100vw] h-[calc(100vh-3.2rem)] sm:h-auto sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:max-w-[1300px] p-0 pt-2 sm:p-2 md:p-5">
          <div className="relative w-full   bg-cover rounded-lg aspect-[1600/1200] ">
            <Image
              src={src}
              fill
              style={{ objectFit: "contain" }}
              placeholder="blur"
            />
          </div>
        </div>
      </Popup>
      <motion.div
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.2, type: "spring" },
        }}
        className="relative w-full aspect-[1600/1200]  bg-cover rounded-lg cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Image
          src={src}
          alt={title}
          style={{ objectFit: "cover" }}
          fill
          onLoadingComplete={() => {
            setLoading(false);
          }}
        />
        {loading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse z-100"></div>
        )}
      </motion.div>
      <div className="flex justify-between px-3 mt-3">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs font-normal">{date}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div
      className="flex flex-col justify-between min-h-screen font-sans "
      style={{ width: "100vw", overflowX: "hidden" }}
    >
      <div className="flex flex-col items-center overflow-x-none">
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

        <header className="flex items-center justify-between w-full px-5 pt-10 sm:px-16 sm:pt-14">
          <Link
            href="/"
            className="text-xl font-bold text-blue-600 font-display"
          >
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
            <Link href="/" className="hover:text-blue-600 ">
              Icons
            </Link>
            <Link href="/ui" className="text-blue-600 transition-all">
              Example UI
            </Link>
            <Link
              href="https://github.com/wkelly1/IKONO"
              alt="IKONO github"
              className="transition-all hover:text-blue-600 "
            >
              React
            </Link>
          </nav>
        </header>

        <main className="mt-10 px-5  sm:px-16 max-w-[2500px] w-full">
          <div className="flex flex-col justify-between px-10 py-6 bg-blue-600 h-60">
            <div></div>
            <div>
              <p className="text-3xl font-bold text-white">
                ICONS ARE EASIER THAN WORDS
              </p>
            </div>
          </div>

          <div className="pt-5">
            <p className="text-xl font-semibold text-blue-600">Example UIs</p>
            <p className="text-sm font-medium text-gray-500">
              A set of UI designs using the IKONO icons
            </p>
          </div>

          <div className="grid grid-flow-row grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr mt-7">
            <UIImage src={ui1} title="E-Commerce" date="Jan 22, 2023" />
            <UIImage src={ui2} title="Travel Planner" date="Jan 22, 2023" />
            <UIImage src={ui3} title="File Explorer" date="Jan 22, 2023" />
            <UIImage src={ui4} title="Product Page" date="Jan 22, 2023" />
            <UIImage src={ui5} title="Signup Page" date="Jan 24, 2023" />
            <UIImage src={ui6} title="Dashboard" date="Jan 24, 2023" />
            <UIImage src={ui7} title="Web Dashboard" date="Jan 24, 2023" />
            <UIImage src={ui8} title="Email Client" date="Jan 25, 2023" />
          </div>
        </main>
      </div>
      <motion.footer
        layout
        className="flex items-center justify-between w-full h-32 px-5 py-10 mt-10 bg-blue-200 sm:px-16 sm:py-14"
      >
        <div
          className="flex items-center"
          role="img"
          aria-label="Will Kelly profile picture"
        >
          <img
            className="w-8 h-8 mr-3 rounded-full "
            src="/images/profile_picture.webp"
            alt="Will Kelly profile picture"
          />
          <div className="text-sm leading-3 tracking-tighter">
            <p className="font-medium text-blue-500">Created by</p>
            <a
              className="text-base font-semibold text-blue-600 cursor-pointer"
              href="https://www.will-kelly.co.uk"
            >
              Will Kelly
            </a>
          </div>
        </div>
        <div className="flex gap-4">
          <a
            className="text-base font-semibold text-blue-600 cursor-pointer"
            href={`https://www.will-kelly.co.uk/legal/privacy-policy`}
          >
            Legal
          </a>
          <a
            className="text-base font-semibold text-blue-600 cursor-pointer"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              "Check out this icon pack IKONO by @WillKelly__ 😮"
            )}&url=${encodeURIComponent("https://ikono.will-kelly.co.uk")}`}
          >
            Share
          </a>
        </div>
      </motion.footer>
    </div>
  );
}

Home.getInitialProps = async ({ query }) => {
  const { s, selected } = query;

  return { s, selectedParam: selected };
};
