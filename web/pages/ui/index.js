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
  return (
    <div className="flex flex-col ">
      <Popup
        header={
          <div className="flex flex-col ">
            <p className="leading-tight">{title}</p>
            <p className="text-xs font-medium text-gray-500 leading-tight">
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
        <Image src={src} alt={title} style={{ objectFit: "cover" }} fill />
      </motion.div>
      <div className="px-3 flex justify-between mt-3">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs font-normal">{date}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div
      className=" font-sans flex flex-col justify-between min-h-screen  "
      style={{ width: "100vw", overflowX: "hidden" }}
    >
      <div className="overflow-x-none flex items-center flex-col">
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

        <header
          className="flex items-center justify-between px-5 pt-10 sm:px-16 sm:pt-14 max-w-[2500px] "
          style={{ width: "100vw", overflowX: "hidden" }}
        >
          <Link
            href="/"
            className="text-blue-600 font-display font-bold text-xl"
          >
            IKONO
          </Link>
          <nav className="font-sans text-sm flex font-semibold tracking-tighter ">
            <Link href="/" className="px-5 hover:text-blue-600 transition-all">
              Icons
            </Link>
            <Link href="/ui" className="px-5 text-blue-600">
              Example UI
            </Link>
            <Link
              href="https://github.com/wkelly1/IKONO"
              alt="IKONO github"
              className="px-5"
            >
              React
            </Link>
          </nav>
        </header>

        <main className="mt-10 px-5  sm:px-16 max-w-[2500px] w-full">
          <div className="bg-blue-600 h-60 flex flex-col justify-between px-10 py-6">
            <div></div>
            <div>
              <p className="font-bold text-white text-3xl">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  auto-rows-fr grid-flow-row mt-7 gap-8">
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
        className="mt-10 bg-blue-200 h-32 w-full px-5 py-10 sm:px-16 sm:py-14 flex items-center justify-between"
      >
        <div
          className="flex items-center"
          role="img"
          aria-label="Will Kelly profile picture"
        >
          <img
            className=" mr-3 w-8 h-8 rounded-full"
            src="/images/profile_picture.webp"
            alt="Will Kelly profile picture"
          />
          <div className="text-sm tracking-tighter leading-3">
            <p className="font-medium text-blue-500">Created by</p>
            <a
              className="font-semibold text-blue-600 text-base cursor-pointer"
              href="https://www.will-kelly.co.uk"
            >
              Will Kelly
            </a>
          </div>
        </div>
        <a
          className="font-semibold text-blue-600 text-base cursor-pointer"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            "Check out this icon pack IKONO by @WillKelly__ 😮"
          )}&url=${encodeURIComponent("https://ikono.will-kelly.co.uk")}`}
        >
          Share
        </a>
      </motion.footer>
    </div>
  );
}

Home.getInitialProps = async ({ query }) => {
  const { s, selected } = query;

  return { s, selectedParam: selected };
};
