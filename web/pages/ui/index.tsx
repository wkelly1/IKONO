import Footer from '../../components/Footer/Footer';
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
import Image, { StaticImageData } from 'next/image';
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
    <motion.div
      initial={{ y: 20, opacity: 0.6 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ stiffness: 100 }}
      viewport={{ once: true }}
      className="flex flex-col"
    >
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
        className="relative z-0 aspect-[1600/1200] w-full cursor-pointer rounded-lg bg-cover"
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
    </motion.div>
  );
}

export default function Home() {
  const images = [
    {
      src: ui1,
      title: 'E-Commerce',
      date: 'Jan 22, 2023',
      alt: 'UI mockup for an E-Commerce site'
    },
    {
      src: ui2,
      title: 'Travel Planner',
      date: 'Jan 22, 2023',
      alt: 'UI mockup for a travel planner site'
    },
    {
      src: ui3,
      title: 'File Explorer',
      date: 'Jan 22, 2023',
      alt: 'UI mockup for a file exploring site'
    },
    {
      src: ui4,
      title: 'Product Page',
      date: 'Jan 22, 2023',
      alt: 'UI mockup for a product page'
    },
    {
      src: ui5,
      title: 'Signup Page',
      date: 'Jan 24, 2023',
      alt: 'UI mockup for a signup page'
    },
    {
      src: ui6,
      title: 'Dashboard',
      date: 'Jan 24, 2023',
      alt: 'UI mockup for a dashboard'
    },
    {
      src: ui7,
      title: 'Web Dashboard',
      date: 'Jan 24, 2023',
      alt: 'UI mockup for a web dashboard'
    },
    {
      src: ui8,
      title: 'Email Client',
      date: 'Jan 25, 2023',
      alt: 'UI mockup for an email client'
    }
  ];
  return (
    <div
      className="flex min-h-screen flex-col justify-between font-sans"
      style={{ width: '100vw', overflowX: 'hidden' }}
    >
      <Navbar active="Example UI" />
      <div className="overflow-x-none flex flex-col items-center">
        <motion.main
          className="mt-10 w-full max-w-[2500px] px-5 sm:px-16"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ stiffness: 100 }}
        >
          <div className="pt-5">
            <p className="text-xl font-semibold text-blue-600">Example UIs</p>
            <p className="text-sm font-medium text-gray-500">
              A set of UI designs using the IKONO icons
            </p>
          </div>

          <div className="mt-7 grid grid-flow-row auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map(image => (
              <UIImage
                key={image.title}
                src={image.src}
                title={image.title}
                date={image.date}
                alt={image.alt}
              />
            ))}
          </div>
        </motion.main>
      </div>
      <Footer />
    </div>
  );
}

Home.getInitialProps = async ({ query }) => {
  const { s, selected } = query;

  return { s, selectedParam: selected };
};
