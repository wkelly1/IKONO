import { motion } from 'framer-motion';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <motion.footer
      layout
      className={twMerge(
        'dark:border-border-neutral-primary mt-10 flex h-32 w-full items-center justify-between bg-bg-accent-secondary px-5 py-10 dark:border-t-2 dark:bg-bg-primary sm:px-16 sm:py-14',
        className
      )}
    >
      <div
        className="flex items-center"
        role="img"
        aria-label="Will Kelly profile picture"
      >
        <Image
          className="mr-3 h-8 w-8 rounded-full dark:border-2"
          src="/images/profile_picture.webp"
          alt="Will Kelly profile picture"
          width={32}
          height={32}
        />
        <div className="text-sm leading-3 tracking-tighter text-fg-accent-secondary dark:text-fg-primary-accent">
          <p className="font-medium">Created by</p>
          <a
            className="cursor-pointer text-base font-semibold"
            href="https://www.will-kelly.co.uk"
          >
            Will Kelly
          </a>
        </div>
      </div>
      <div className="flex gap-4">
        <a
          className="cursor-pointer text-base font-semibold text-fg-accent-secondary dark:text-fg-primary-accent"
          href={`https://www.will-kelly.co.uk/legal/privacy-policy`}
        >
          Legal
        </a>
        <a
          className="cursor-pointer text-base font-semibold text-fg-accent-secondary dark:text-fg-primary-accent"
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
