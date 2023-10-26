import Navbar from '../../components/Navbar/Navbar';
import Popup from '../../components/Popup/Popup';
import ui1 from '../../public/images/ui/ui1.png';
import ui2 from '../../public/images/ui/ui2.png';
import ui3 from '../../public/images/ui/ui3.png';
import ui4 from '../../public/images/ui/ui4.png';
import ui5 from '../../public/images/ui/ui5.png';
import ui6 from '../../public/images/ui/ui6.png';
import ui7 from '../../public/images/ui/ui7.png';
import ui8 from '../../public/images/ui/ui8.png';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
        <div className="h-[calc(100vh-3.2rem)] w-[100vw] p-0 pt-2 sm:h-auto sm:w-[80vw] sm:p-2 md:w-[70vw] md:p-5 lg:w-[60vw] xl:max-w-[1300px]">
          <div className="relative aspect-[1600/1200]   w-full rounded-lg bg-cover ">
            <Image
              alt={alt}
              src={src}
              fill
              style={{ objectFit: 'contain' }}
              placeholder="blur"
            />
          </div>
        </div>
      </Popup>
      <motion.div
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.2, type: 'spring' }
        }}
        className="relative aspect-[1600/1200] w-full  cursor-pointer rounded-lg bg-cover"
        onClick={() => setOpen(true)}
      >
        <Image
          src={src}
          alt={title}
          style={{ objectFit: 'cover' }}
          fill
          onLoadingComplete={() => {
            setLoading(false);
          }}
        />
        {loading && (
          <div className="z-100 absolute inset-0 animate-pulse bg-gray-100"></div>
        )}
      </motion.div>
      <div className="mt-3 flex justify-between px-3">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs font-normal">{date}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div
      className="flex min-h-screen flex-col justify-between font-sans"
      style={{ width: '100vw', overflowX: 'hidden' }}
    >
      <Navbar active="Example UI" />
      <div className="overflow-x-none flex flex-col items-center">
        <main className="mt-10 w-full max-w-[2500px] px-5 sm:px-16">
          <div className="pt-5">
            <p className="text-xl font-semibold text-blue-600">Example UIs</p>
            <p className="text-sm font-medium text-gray-500">
              A set of UI designs using the IKONO icons
            </p>
          </div>

          <div className="mt-7 grid grid-flow-row auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        className="mt-10 flex h-32 w-full items-center justify-between bg-blue-200 px-5 py-10 sm:px-16 sm:py-14"
      >
        <div
          className="flex items-center"
          role="img"
          aria-label="Will Kelly profile picture"
        >
          <img
            className="mr-3 h-8 w-8 rounded-full "
            src="/images/profile_picture.webp"
            alt="Will Kelly profile picture"
          />
          <div className="text-sm leading-3 tracking-tighter">
            <p className="font-medium text-blue-500">Created by</p>
            <a
              className="cursor-pointer text-base font-semibold text-blue-600"
              href="https://www.will-kelly.co.uk"
            >
              Will Kelly
            </a>
          </div>
        </div>
        <div className="flex gap-4">
          <a
            className="cursor-pointer text-base font-semibold text-blue-600"
            href={`https://www.will-kelly.co.uk/legal/privacy-policy`}
          >
            Legal
          </a>
          <a
            className="cursor-pointer text-base font-semibold text-blue-600"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              'Check out this icon pack IKONO by @WillKelly__ 😮'
            )}&url=${encodeURIComponent('https://ikono.will-kelly.co.uk')}`}
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
