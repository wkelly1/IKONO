import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Footer() {
  return (
    <motion.footer
      layout
      className="mt-10 flex h-32 w-full items-center justify-between bg-blue-200 px-5 py-10 sm:px-16 sm:py-14"
    >
      <div
        className="flex items-center"
        role="img"
        aria-label="Will Kelly profile picture"
      >
        <Image
          className="mr-3 h-8 w-8 rounded-full "
          src="/images/profile_picture.webp"
          alt="Will Kelly profile picture"
          width={32}
          height={32}
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
  );
}
