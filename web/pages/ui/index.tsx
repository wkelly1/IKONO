import Head from "next/head";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import { motion } from "framer-motion";
import Popup from "../../components/Popup/Popup";
import { useState } from "react";
import ui1 from "../../public/images/ui/ui1.png";
import ui2 from "../../public/images/ui/ui2.png";
import ui3 from "../../public/images/ui/ui3.png";
import ui4 from "../../public/images/ui/ui4.png";
import ui5 from "../../public/images/ui/ui5.png";
import ui6 from "../../public/images/ui/ui6.png";
import ui7 from "../../public/images/ui/ui7.png";
import ui8 from "../../public/images/ui/ui8.png";
import Navbar from "../../components/Navbar/Navbar";

interface UIImageProps {
  src: StaticImageData;
  date: string;
  title: string;
  alt: string;
}

function UIImage({ src, date, title, alt }: UIImageProps) {
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
              alt={alt}
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
      <Navbar active="Example UI" />
      <div className="flex flex-col items-center overflow-x-none">
        <main className="mt-10 px-5  sm:px-16 max-w-[2500px] w-full">
          <div className="pt-5">
            <p className="text-xl font-semibold text-blue-600">Example UIs</p>
            <p className="text-sm font-medium text-gray-500">
              A set of UI designs using the IKONO icons
            </p>
          </div>

          <div className="grid grid-flow-row grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr mt-7">
            <UIImage
              src={ui1}
              title="E-Commerce"
              date="Jan 22, 2023"
              alt="UI mockup for an E-Commerce site"
            />
            <UIImage
              src={ui2}
              title="Travel Planner"
              date="Jan 22, 2023"
              alt="UI mockup for a travel planner site"
            />
            <UIImage
              src={ui3}
              title="File Explorer"
              date="Jan 22, 2023"
              alt="UI mockup for a file exploring site"
            />
            <UIImage
              src={ui4}
              title="Product Page"
              date="Jan 22, 2023"
              alt="UI mockup for a product page"
            />
            <UIImage
              src={ui5}
              title="Signup Page"
              date="Jan 24, 2023"
              alt="UI mockup for a signup page"
            />
            <UIImage
              src={ui6}
              title="Dashboard"
              date="Jan 24, 2023"
              alt="UI mockup for a dashboard"
            />
            <UIImage
              src={ui7}
              title="Web Dashboard"
              date="Jan 24, 2023"
              alt="UI mockup for a web dashboard"
            />
            <UIImage
              src={ui8}
              title="Email Client"
              date="Jan 25, 2023"
              alt="UI mockup for an email client"
            />
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
